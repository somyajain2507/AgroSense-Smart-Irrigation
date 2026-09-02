import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import '../models/field_model.dart';

class ApiService {
  static const String baseUrl = "https://filled-preteen-census.ngrok-free.dev";

  static Future<Map<String, dynamic>> predictWater(Map<String, dynamic> payload) async {
    try {
      final response = await http.post(
        Uri.parse("$baseUrl/predict"),
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: jsonEncode(payload),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception("Server Error: ${response.statusCode}");
      }
    } catch (e) {
      print("API Error: $e");
      rethrow;
    }
  }

  // Launch Native Device SMS App
  static Future<void> launchSms(String phone, String message) async {
    final cleanPhone = phone.replaceAll(RegExp(r'[^0-9+]'), '');
    final uri = Uri.parse("sms:$cleanPhone?body=${Uri.encodeComponent(message)}");
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      print("Could not launch SMS app");
    }
  }

  // Launch WhatsApp Chat
  static Future<void> launchWhatsApp(String phone, String message) async {
    final cleanPhone = phone.replaceAll(RegExp(r'[^0-9]'), '');
    final formattedPhone = cleanPhone.length <= 10 ? '91$cleanPhone' : cleanPhone;
    final uri = Uri.parse("https://wa.me/$formattedPhone?text=${Uri.encodeComponent(message)}");
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      print("Could not launch WhatsApp");
    }
  }

  // Launch Gmail Compose Draft
  static Future<void> launchGmail(String email, String subject, String body) async {
    final uri = Uri.parse(
        "https://mail.google.com/mail/?view=cm&fs=1&to=$email&su=${Uri.encodeComponent(subject)}&body=${Uri.encodeComponent(body)}");
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    } else {
      print("Could not launch Gmail");
    }
  }
}
