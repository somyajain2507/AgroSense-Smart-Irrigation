import 'package:flutter/material.dart';
import '../models/field_model.dart';
import '../services/translation_service.dart';

class DashboardScreen extends StatelessWidget {
  final List<FieldModel> fields;

  const DashboardScreen({Key? key, required this.fields}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final t = TranslationService.get;
    final fieldsMonitored = fields.length;
    final totalWaterNeeded = fields.fold<double>(0, (sum, f) => sum + f.predictedLiters);
    final activeAlerts = fields.where((f) => f.soilMoisture < 25).length;
    final avgMoisture = fields.isNotEmpty
        ? (fields.fold<double>(0, (sum, f) => sum + f.soilMoisture) / fields.length).round()
        : 0;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Stat Cards Grid
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
            childAspectRatio: 1.5,
            children: [
              _buildStatCard(t('fieldsMonitored'), '$fieldsMonitored active', Colors.blue),
              _buildStatCard(t('totalWater'), '${totalWaterNeeded.round()} L', const Color(0xFF047857)),
              _buildStatCard(t('activeAlerts'), '$activeAlerts critical', Colors.red),
              _buildStatCard(t('avgMoisture'), '$avgMoisture%', Colors.orange),
            ],
          ),
          const SizedBox(height: 20),

          // Zone Moisture Progress
          const Text('📊 Field Moisture Levels',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 12),
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: fields.map((f) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('${f.name} (${f.zone})',
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                            Text('${f.soilMoisture.round()}%',
                                style: TextStyle(
                                    color: f.soilMoisture < 25 ? Colors.red : const Color(0xFF047857),
                                    fontWeight: FontWeight.bold)),
                          ],
                        ),
                        const SizedBox(height: 6),
                        LinearProgressIndicator(
                          value: f.soilMoisture / 100.0,
                          backgroundColor: Colors.grey.shade200,
                          color: f.soilMoisture < 25 ? Colors.red : const Color(0xFF047857),
                          minHeight: 8,
                          borderRadius: BorderRadius.circular(4),
                        )
                      ],
                    ),
                  );
                }).toList(),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Recommendations Table Card
          const Text('📋 Recommendations Matrix',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          const SizedBox(height: 12),
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: const BoxDecoration(
                    color: Color(0xFF0F172A),
                    borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
                  ),
                  child: Row(
                    children: const [
                      Expanded(
                          child: Text('FIELD NAME',
                              style: TextStyle(
                                  color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold))),
                      Expanded(
                          child: Text('MOISTURE',
                              style: TextStyle(
                                  color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold))),
                      Expanded(
                          child: Text('WATER NEED',
                              style: TextStyle(
                                  color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold))),
                    ],
                  ),
                ),
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: fields.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, i) {
                    final f = fields[i];
                    return Padding(
                      padding: const EdgeInsets.all(14),
                      child: Row(
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(f.name,
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold, fontSize: 13)),
                                Text('${f.zone} • ${f.crop}',
                                    style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
                              ],
                            ),
                          ),
                          Expanded(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: f.soilMoisture < 25
                                    ? Colors.red.shade100
                                    : Colors.green.shade100,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                '${f.soilMoisture.round()}%',
                                style: TextStyle(
                                    color: f.soilMoisture < 25 ? Colors.red : const Color(0xFF047857),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12),
                              ),
                            ),
                          ),
                          Expanded(
                            child: Text(
                              '${f.predictedLiters.round()} L',
                              style: const TextStyle(
                                  fontWeight: FontWeight.w900, color: Colors.blueAccent),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildStatCard(String label, String value, Color color) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(label, style: TextStyle(color: Colors.grey.shade600, fontSize: 11)),
            const SizedBox(height: 4),
            Text(value,
                style: TextStyle(color: color, fontWeight: FontWeight.w900, fontSize: 18)),
          ],
        ),
      ),
    );
  }
}
