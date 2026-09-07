import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/api_service.dart';
import '../services/translation_service.dart';

class CalculatorScreen extends StatefulWidget {
  final FarmerUser user;
  final Function(int) onAddNotification;

  const CalculatorScreen({
    Key? key,
    required this.user,
    required this.onAddNotification,
  }) : super(key: key);

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  int cropType = 1;
  int soilType = 1;
  int season = 1;
  int cropGrowthStage = 1;
  int irrigationType = 1;
  int waterSource = 1;

  double soilMoisture = 35.0;
  double temperatureC = 30.0;
  double fieldAreaHectare = 2.0;
  double rainfallMm = 5.0;

  late TextEditingController phoneController;
  late TextEditingController emailController;

  bool isLoading = false;
  Map<String, dynamic>? result;
  String? statusMessage;

  final Map<int, String> cropsMap = {
    1: 'Wheat 🌾',
    2: 'Rice 🌾',
    3: 'Sugarcane 🎋',
    4: 'Cotton ☁️',
    5: 'Maize 🌽'
  };

  @override
  void initState() {
    super.initState();
    phoneController = TextEditingController(text: widget.user.phone);
    emailController = TextEditingController(text: widget.user.email);
  }

  Future<void> calculate() async {
    setState(() {
      isLoading = true;
      result = null;
      statusMessage = null;
    });

    try {
      final payload = {
        "Soil_Moisture": soilMoisture,
        "Temperature_C": temperatureC,
        "Humidity": 60.0,
        "Rainfall_mm": rainfallMm,
        "Sunlight_Hours": 8.0,
        "Wind_Speed_kmh": 10.0,
        "Soil_pH": 6.5,
        "Crop_Type": cropType,
        "Crop_Growth_Stage": cropGrowthStage,
        "Season": season,
        "Irrigation_Type": irrigationType,
        "Water_Source": waterSource,
        "Field_Area_hectare": fieldAreaHectare,
        "Mulching_Used": 0,
        "Previous_Irrigation_mm": 15.0
      };

      final data = await ApiService.predictWater(payload);
      setState(() {
        result = {
          'liters': (data['predicted_water_liters'] as num).round(),
          'schedule': data['irrigation_schedule'] ?? [],
          'moistureStatus': soilMoisture < 25
              ? 'LOW (CRITICAL)'
              : soilMoisture < 45
                  ? 'MEDIUM'
                  : 'OPTIMAL'
        };
      });
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error connecting to ML Server: $e')),
      );
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = TranslationService.get;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Banner Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF065F46), Color(0xFF047857), Color(0xFF0D9488)],
              ),
              borderRadius: BorderRadius.circular(24),
              boxShadow: [
                BoxShadow(
                  color: Colors.green.withOpacity(0.3),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                )
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text('🌱 ', style: TextStyle(fontSize: 20)),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.black26,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        t('appName'),
                        style: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    )
                  ],
                ),
                const SizedBox(height: 10),
                Text(
                  t('tagline'),
                  style: const TextStyle(
                      color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900),
                ),
                const SizedBox(height: 4),
                const Text(
                  'Enter farm parameters for instant AI ML prediction.',
                  style: TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Form Controls Card
          Card(
            elevation: 2,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('🌾 Crop & Soil Setup',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  const SizedBox(height: 12),

                  // Crop Selection
                  DropdownButtonFormField<int>(
                    value: cropType,
                    decoration: InputDecoration(
                      labelText: t('cropType'),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    items: cropsMap.entries
                        .map((e) => DropdownMenuItem(value: e.key, child: Text(e.value)))
                        .toList(),
                    onChanged: (val) => setState(() => cropType = val!),
                  ),
                  const SizedBox(height: 16),

                  // Soil Moisture Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(t('soilMoisture'), style: const TextStyle(fontWeight: FontWeight.bold)),
                      Chip(
                        label: Text('${soilMoisture.round()}%'),
                        backgroundColor: soilMoisture < 25 ? Colors.red.shade100 : Colors.green.shade100,
                      )
                    ],
                  ),
                  Slider(
                    value: soilMoisture,
                    min: 5,
                    max: 95,
                    divisions: 90,
                    activeColor: const Color(0xFF047857),
                    onChanged: (val) => setState(() => soilMoisture = val),
                  ),
                  const SizedBox(height: 12),

                  // Temperature Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(t('temperature'), style: const TextStyle(fontWeight: FontWeight.bold)),
                      Chip(label: Text('${temperatureC.round()}°C')),
                    ],
                  ),
                  Slider(
                    value: temperatureC,
                    min: 10,
                    max: 50,
                    divisions: 40,
                    activeColor: Colors.orange,
                    onChanged: (val) => setState(() => temperatureC = val),
                  ),
                  const SizedBox(height: 12),

                  // Field Area Slider
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(t('fieldArea'), style: const TextStyle(fontWeight: FontWeight.bold)),
                      Chip(label: Text('${fieldAreaHectare.toStringAsFixed(1)} ha')),
                    ],
                  ),
                  Slider(
                    value: fieldAreaHectare,
                    min: 0.5,
                    max: 20,
                    divisions: 39,
                    activeColor: Colors.teal,
                    onChanged: (val) => setState(() => fieldAreaHectare = val),
                  ),
                  const SizedBox(height: 16),

                  // Calculate Button
                  SizedBox(
                    width: double.infinity,
                    height: 52,
                    child: ElevatedButton(
                      onPressed: isLoading ? null : calculate,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF047857),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      child: isLoading
                          ? const CircularProgressIndicator(color: Colors.white)
                          : Text(
                              t('calculateBtn'),
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                            ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Output Result Card
          if (result != null) ...[
            const SizedBox(height: 20),
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '💧 ${t("waterNeeded")}',
                    style: const TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${(result!['liters'] as int).toString()} Liters',
                    style: const TextStyle(
                        color: Colors.white, fontSize: 32, fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Total water required for ${fieldAreaHectare.toStringAsFixed(1)} hectares.',
                    style: const TextStyle(color: Colors.white60, fontSize: 12),
                  ),
                  const SizedBox(height: 16),
                  const Divider(color: Colors.white24),
                  const SizedBox(height: 12),

                  // Contact Dispatcher Section
                  const Text('🔔 Contact Notification Dispatcher',
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 10),

                  TextField(
                    controller: phoneController,
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    decoration: InputDecoration(
                      labelText: '📱 Mobile Phone Number',
                      labelStyle: const TextStyle(color: Colors.green),
                      filled: true,
                      fillColor: Colors.white10,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 10),

                  TextField(
                    controller: emailController,
                    style: const TextStyle(color: Colors.white, fontSize: 13),
                    decoration: InputDecoration(
                      labelText: '📧 Gmail Address',
                      labelStyle: const TextStyle(color: Colors.amber),
                      filled: true,
                      fillColor: Colors.white10,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Native Launch Action Buttons
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      ElevatedButton.icon(
                        onPressed: () {
                          final nowStr = DateTime.now().toLocal().toString().split('.')[0];
                          final refId = (1000 + (DateTime.now().millisecondsSinceEpoch % 9000)).toString();
                          final msg =
                              "AgroSense Alert [Ref #AGR-$refId] ($nowStr): ${cropsMap[cropType]} (${fieldAreaHectare} ha) requires ${result!['liters']} Liters water. Moisture=${soilMoisture.round()}%, Temp=${temperatureC.round()}°C, Rain=${rainfallMm.round()}mm.";
                          ApiService.launchSms(phoneController.text, msg);
                          widget.onAddNotification(1);
                        },
                        icon: const Text('📲'),
                        label: Text(t('sendSms')),
                        style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF047857), foregroundColor: Colors.white),
                      ),
                      ElevatedButton.icon(
                        onPressed: () {
                          final nowStr = DateTime.now().toLocal().toString().split('.')[0];
                          final refId = (1000 + (DateTime.now().millisecondsSinceEpoch % 9000)).toString();
                          final msg =
                              "🌱 *AgroSense Smart Water Alert* [Ref #AGR-$refId]\n📅 *Timestamp:* $nowStr\n\n🌾 *Crop:* ${cropsMap[cropType]} (${fieldAreaHectare} ha)\n💧 *Water Needed:* ${result!['liters']} Liters\n📊 *Soil Moisture:* ${soilMoisture.round()}%\n🌡️ *Temperature:* ${temperatureC.round()}°C\n🌧️ *Rainfall:* ${rainfallMm.round()} mm\n\nIrrigate on time to optimize yield!";
                          ApiService.launchWhatsApp(phoneController.text, msg);
                          widget.onAddNotification(1);
                        },
                        icon: const Text('💬'),
                        label: Text(t('sendWhatsApp')),
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.teal.shade700, foregroundColor: Colors.white),
                      ),
                      ElevatedButton.icon(
                        onPressed: () {
                          final nowStr = DateTime.now().toLocal().toString().split('.')[0];
                          final refId = (1000 + (DateTime.now().millisecondsSinceEpoch % 9000)).toString();
                          final subject = "AgroSense Water Requirement Report [Ref #AGR-$refId]";
                          final body =
                              "Hi ${widget.user.name},\n\nYour field (${cropsMap[cropType]}, ${fieldAreaHectare} ha) requires ${result!['liters']} Liters of water.\n\nReport Timestamp: $nowStr\nReference ID: #AGR-$refId\nSoil Moisture: ${soilMoisture.round()}%\nTemperature: ${temperatureC.round()}°C\nRainfall: ${rainfallMm.round()} mm\n\nThank you for using AgroSense!";
                          ApiService.launchGmail(emailController.text, subject, body);
                          widget.onAddNotification(1);
                        },
                        icon: const Text('📧'),
                        label: Text(t('sendGmail')),
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.amber.shade700, foregroundColor: Colors.white),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ]
        ],
      ),
    );
  }
}
