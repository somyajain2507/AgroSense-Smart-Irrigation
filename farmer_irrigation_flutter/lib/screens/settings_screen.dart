import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../services/translation_service.dart';

class SettingsScreen extends StatefulWidget {
  final FarmerUser user;
  final VoidCallback onLanguageChanged;

  const SettingsScreen({
    Key? key,
    required this.user,
    required this.onLanguageChanged,
  }) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool smsEnabled = true;
  bool emailEnabled = true;
  bool pushEnabled = true;

  @override
  Widget build(BuildContext context) {
    final t = TranslationService.get;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Profile Card
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 28,
                    backgroundColor: Colors.green.shade100,
                    child: const Text('👨‍🌾', style: TextStyle(fontSize: 28)),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(widget.user.name,
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16)),
                        Text('${widget.user.phone} • ${widget.user.email}',
                            style: TextStyle(color: Colors.grey.shade600, fontSize: 12)),
                        Text('${widget.user.location} (${widget.user.crop})',
                            style: const TextStyle(color: Color(0xFF047857), fontSize: 12)),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Language Switcher Card
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('🌐 Language / भाषा / ਭਾಷೆ / ਭਾਸ਼ਾ',
                      style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    alignment: WrapAlignment.spaceAround,
                    children: [
                      _buildLangBtn('en', 'English'),
                      _buildLangBtn('hi', 'हिंदी'),
                      _buildLangBtn('kn', 'ಕನ್ನಡ'),
                      _buildLangBtn('pa', 'ਪੰਜਾਬੀ'),
                    ],
                  )
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Notification Preferences
          Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
            child: Column(
              children: [
                SwitchListTile(
                  title: const Text('📱 SMS Water Alerts'),
                  subtitle: const Text('Receive SMS when moisture < 25%'),
                  value: smsEnabled,
                  activeColor: const Color(0xFF047857),
                  onChanged: (val) => setState(() => smsEnabled = val),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  title: const Text('📧 Gmail / Email Water Alerts'),
                  subtitle: const Text('Receive irrigation schedule reports'),
                  value: emailEnabled,
                  activeColor: const Color(0xFF047857),
                  onChanged: (val) => setState(() => emailEnabled = val),
                ),
                const Divider(height: 1),
                SwitchListTile(
                  title: const Text('🔔 Push Notifications'),
                  subtitle: const Text('Instant background alerts'),
                  value: pushEnabled,
                  activeColor: const Color(0xFF047857),
                  onChanged: (val) => setState(() => pushEnabled = val),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _buildLangBtn(String code, String label) {
    final isSelected = TranslationService.lang == code;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      selectedColor: const Color(0xFF047857),
      labelStyle: TextStyle(
          color: isSelected ? Colors.white : Colors.black, fontWeight: FontWeight.bold),
      onSelected: (selected) {
        if (selected) {
          setState(() {
            TranslationService.lang = code;
          });
          widget.onLanguageChanged();
        }
      },
    );
  }
}
