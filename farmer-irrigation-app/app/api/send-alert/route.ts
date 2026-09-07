import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      phone,
      email,
      crop = "Wheat",
      liters = 0,
      moisture = 35,
      temp = 30,
      rain = 5,
      area = 2,
      refId = "AGR-1001",
      twilioSid = process.env.TWILIO_ACCOUNT_SID,
      twilioToken = process.env.TWILIO_AUTH_TOKEN,
      twilioFrom = process.env.TWILIO_PHONE_NUMBER,
      gmailUser = process.env.GMAIL_USER,
      gmailPass = process.env.GMAIL_APP_PASSWORD,
    } = data;

    let smsSuccess = false;
    let smsMessage = "";
    let emailSuccess = false;
    let emailMessage = "";

    // 1. Direct Cellular SMS via Twilio REST API
    if (twilioSid && twilioToken && twilioFrom) {
      try {
        const formattedPhone = phone.startsWith("+") ? phone : `+91${phone.replace(/[^0-9]/g, "")}`;
        const smsBody = `AgroSense Alert [${refId}]: ${crop} (${area} ha) requires ${Number(liters).toLocaleString()} Liters water. Soil Moisture=${moisture}%, Temp=${temp}°C, Rain=${rain}mm.`;

        const authHeader = `Basic ${Buffer.from(`${twilioSid.trim()}:${twilioToken.trim()}`).toString("base64")}`;
        const params = new URLSearchParams({
          From: twilioFrom.trim(),
          To: formattedPhone,
          Body: smsBody,
        });

        const twilioRes = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${twilioSid.trim()}/Messages.json`,
          {
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
          }
        );

        const twilioData = await twilioRes.json();

        if (twilioRes.ok) {
          smsSuccess = true;
          smsMessage = `Twilio SMS sent successfully (SID: ${twilioData.sid}) to ${formattedPhone}`;
        } else {
          smsMessage = `Twilio Error: ${twilioData.message || twilioData.detail || "Failed to send SMS"}`;
        }
      } catch (err: any) {
        smsMessage = `Twilio Exception: ${err.message}`;
      }
    } else {
      smsMessage = "Twilio Credentials (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER) not configured.";
    }

    // 2. Direct Email Sending via Gmail SMTP / Web API if configured
    if (gmailUser && gmailPass) {
      try {
        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"AgroSense Smart Irrigation" <${gmailUser}>`,
          to: email,
          subject: `AgroSense Irrigation Report [${refId}] - ${crop}`,
          text: `Hi Farmer,\n\nHere is your AgroSense Water Requirement Report [${refId}]:\n\n- Crop: ${crop} (${area} ha)\n- Recommended Water: ${Number(liters).toLocaleString()} Liters\n- Soil Moisture: ${moisture}%\n- Temperature: ${temp}°C\n- Rainfall: ${rain} mm\n\nThank you,\nAgroSense Intelligence`,
        });

        emailSuccess = true;
        emailMessage = `Direct Gmail sent to ${email}`;
      } catch (err: any) {
        emailMessage = `Gmail SMTP Error: ${err.message}`;
      }
    } else {
      emailMessage = "Gmail credentials (GMAIL_USER, GMAIL_APP_PASSWORD) not configured.";
    }

    return NextResponse.json({
      success: smsSuccess || emailSuccess,
      sms: {
        sent: smsSuccess,
        details: smsMessage,
      },
      email: {
        sent: emailSuccess,
        details: emailMessage,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
