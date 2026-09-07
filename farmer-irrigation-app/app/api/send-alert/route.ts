import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      phone = "8920299008",
      email = "jainsomya2507@gmail.com",
      crop = "Wheat",
      liters = 0,
      moisture = 35,
      temp = 30,
      rain = 5,
      area = 2,
      refId = `AGR-${Math.floor(1000 + Math.random() * 9000)}`,
      twilioSid = process.env.TWILIO_ACCOUNT_SID,
      twilioToken = process.env.TWILIO_AUTH_TOKEN,
      twilioFrom = process.env.TWILIO_PHONE_NUMBER,
      sendgridKey = process.env.SENDGRID_API_KEY,
      sendgridFrom = process.env.SENDGRID_FROM_EMAIL,
    } = data;

    let smsSuccess = false;
    let smsMessage = "";
    let emailSuccess = false;
    let emailMessage = "";

    // Format target phone number with country code (+91 for India)
    const cleanPhoneDigits = phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhoneDigits.length === 10 ? `+91${cleanPhoneDigits}` : cleanPhoneDigits.startsWith("+") ? cleanPhoneDigits : `+${cleanPhoneDigits}`;

    // 1. Send Direct Cellular SMS via Twilio REST API
    if (twilioSid && twilioToken && twilioFrom) {
      try {
        const smsBody = `AgroSense Alert [${refId}]: ${crop} (${area} ha) requires ${Number(liters).toLocaleString()} Liters water. Moisture=${moisture}%, Temp=${temp}°C, Rain=${rain}mm.`;
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
          smsMessage = `Twilio SMS sent to ${formattedPhone} (SID: ${twilioData.sid})`;
        } else {
          smsMessage = `Twilio Error ${twilioData.code || ""}: ${twilioData.message || "Failed to send SMS"}`;
        }
      } catch (err: any) {
        smsMessage = `Twilio Exception: ${err.message}`;
      }
    } else {
      smsMessage = "Twilio credentials missing.";
    }

    // 2. Send Direct Automated Email via SendGrid REST API
    if (sendgridKey && sendgridFrom) {
      try {
        const emailBodyText = `Hi Farmer,\n\nHere is your real-time AgroSense ML Water Prediction Report (Ref: #${refId}):\n\n- Crop: ${crop}\n- Farm Area: ${area} hectares\n- Recommended Water Volume: ${Number(liters).toLocaleString()} Liters\n- Soil Moisture: ${moisture}%\n- Temperature: ${temp}°C\n- Rainfall: ${rain} mm\n\nHappy Farming,\nAgroSense Intelligence Team`;
        const emailBodyHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; background-color: #f8fafc; border-radius: 12px;">
            <h2 style="color: #047857;">🌱 AgroSense Water Requirement Report</h2>
            <p><strong>Reference ID:</strong> #${refId}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0;" />
            <ul style="line-height: 1.8;">
              <li><strong>🌾 Crop:</strong> ${crop} (${area} ha)</li>
              <li><strong>💧 Recommended Water Volume:</strong> <span style="font-size: 18px; color: #047857; font-weight: bold;">${Number(liters).toLocaleString()} Liters</span></li>
              <li><strong>📊 Soil Moisture:</strong> ${moisture}%</li>
              <li><strong>🌡️ Temperature:</strong> ${temp}°C</li>
              <li><strong>🌧️ Rainfall:</strong> ${rain} mm</li>
            </ul>
            <p style="color: #64748b; font-size: 12px; margin-top: 20px;">Sent automatically by AgroSense Smart Irrigation System.</p>
          </div>
        `;

        const sendgridRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sendgridKey.trim()}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: email.trim() }],
                subject: `AgroSense Irrigation Report [${refId}] - ${crop}`,
              },
            ],
            from: { email: sendgridFrom.trim(), name: "AgroSense Smart Irrigation" },
            content: [
              { type: "text/plain", value: emailBodyText },
              { type: "text/html", value: emailBodyHtml },
            ],
          }),
        });

        if (sendgridRes.ok || sendgridRes.status === 202) {
          emailSuccess = true;
          emailMessage = `Direct SendGrid Email sent to ${email}`;
        } else {
          const sgErrorText = await sendgridRes.text();
          emailMessage = `SendGrid Error (${sendgridRes.status}): ${sgErrorText}`;
        }
      } catch (err: any) {
        emailMessage = `SendGrid Exception: ${err.message}`;
      }
    } else {
      emailMessage = "SendGrid credentials missing.";
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
      refId,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
