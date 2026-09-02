import 'package:flutter/material.dart';
import '../models/field_model.dart';
import '../services/api_service.dart';
import '../services/translation_service.dart';

class MyFieldsScreen extends StatefulWidget {
  final List<FieldModel> fields;
  final Function(List<FieldModel>) onUpdateFields;

  const MyFieldsScreen({
    Key? key,
    required this.fields,
    required this.onUpdateFields,
  }) : super(key: key);

  @override
  State<MyFieldsScreen> createState() => _MyFieldsScreenState();
}

class _MyFieldsScreenState extends State<MyFieldsScreen> {
  void addField() {
    final nextId = widget.fields.length + 1;
    final newField = FieldModel(
      name: "New Field $nextId",
      zone: "Zone ${String.fromCharCode(65 + (nextId - 1) % 26)}",
      crop: "Wheat",
      cropType: 1,
      soilType: 1,
      season: 1,
      cropGrowthStage: 1,
      irrigationType: 1,
      waterSource: 1,
      soilPh: 6.5,
      soilMoisture: 35.0,
      temperatureC: 30.0,
      humidity: 60.0,
      rainfallMm: 5.0,
      sunlightHours: 8.0,
      windSpeedKmh: 10.0,
      fieldAreaHectare: 2.0,
      mulchingUsed: 0,
      previousIrrigationMm: 15.0,
    );

    final updated = List<FieldModel>.from(widget.fields)..add(newField);
    widget.onUpdateFields(updated);
  }

  void removeField(int index) {
    final updated = List<FieldModel>.from(widget.fields)..removeAt(index);
    widget.onUpdateFields(updated);
  }

  Future<void> calculateForField(FieldModel field) async {
    try {
      final data = await ApiService.predictWater(field.toApiPayload());
      setState(() {
        field.predictedLiters = (data['predicted_water_liters'] as num).toDouble();
        field.schedule = List<Map<String, dynamic>>.from(data['irrigation_schedule'] ?? []);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text(
                'Calculated ${field.predictedLiters.round()} Liters for ${field.name}!')),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed calculation: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final t = TranslationService.get;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Card
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFF0F172A),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('${t("myFields")} (${widget.fields.length})',
                        style: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                    const SizedBox(height: 4),
                    const Text('Changes automatically sync across app',
                        style: TextStyle(color: Colors.white60, fontSize: 11)),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: addField,
                  icon: const Icon(Icons.add, size: 16),
                  label: Text(t('addField')),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF047857),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                )
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Fields Cards List
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: widget.fields.length,
            itemBuilder: (context, i) {
              final field = widget.fields[i];
              return Card(
                margin: const EdgeInsets.only(bottom: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(field.name,
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          IconButton(
                            icon: const Icon(Icons.delete_outline, color: Colors.red),
                            onPressed: () => removeField(i),
                          )
                        ],
                      ),
                      const SizedBox(height: 8),

                      // Parameters Grid
                      Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: [
                          Chip(label: Text('Moisture: ${field.soilMoisture.round()}%')),
                          Chip(label: Text('Temp: ${field.temperatureC.round()}°C')),
                          Chip(label: Text('Area: ${field.fieldAreaHectare} ha')),
                          Chip(label: Text('Crop: ${field.crop}')),
                        ],
                      ),
                      const SizedBox(height: 12),

                      SizedBox(
                        width: double.infinity,
                        child: OutlinedButton.icon(
                          onPressed: () => calculateForField(field),
                          icon: const Icon(Icons.water_drop, color: Color(0xFF047857)),
                          label: const Text('Get Single Field Irrigation Plan'),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Color(0xFF047857)),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),

                      if (field.predictedLiters > 0) ...[
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                            color: Colors.green.shade50,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            '💧 Needed: ${field.predictedLiters.round()} Liters',
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, color: Color(0xFF047857)),
                          ),
                        )
                      ]
                    ],
                  ),
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
