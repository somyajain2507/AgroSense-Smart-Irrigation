import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'models/field_model.dart';
import 'models/user_model.dart';
import 'screens/calculator_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/my_fields_screen.dart';
import 'screens/settings_screen.dart';
import 'services/translation_service.dart';

void main() {
  runApp(const AgroSenseApp());
}

class AgroSenseApp extends StatelessWidget {
  const AgroSenseApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AgroSense Smart Farmer App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF047857),
          primary: const Color(0xFF047857),
          secondary: const Color(0xFF0D9488),
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.interTextTheme(),
      ),
      home: const MainHomeScreen(),
    );
  }
}

class MainHomeScreen extends StatefulWidget {
  const MainHomeScreen({Key? key}) : super(key: key);

  @override
  State<MainHomeScreen> createState() => _MainHomeScreenState();
}

class _MainHomeScreenState extends State<MainHomeScreen> {
  int _currentIndex = 0;
  int _notificationCount = 3;
  late FarmerUser currentUser;
  late List<FieldModel> fields;

  @override
  void initState() {
    super.initState();
    currentUser = FarmerUser.demo();
    fields = FieldModel.initialFields();
  }

  void _onUpdateFields(List<FieldModel> updated) {
    setState(() {
      fields = updated;
    });
  }

  void _onAddNotification(int count) {
    setState(() {
      _notificationCount += count;
    });
  }

  @override
  Widget build(BuildContext context) {
    final t = TranslationService.get;

    final List<Widget> screens = [
      CalculatorScreen(
        user: currentUser,
        onAddNotification: _onAddNotification,
      ),
      DashboardScreen(fields: fields),
      MyFieldsScreen(fields: fields, onUpdateFields: _onUpdateFields),
      SettingsScreen(
        user: currentUser,
        onLanguageChanged: () => setState(() {}),
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        elevation: 0,
        title: Row(
          children: [
            const Text('🌱 ', style: TextStyle(fontSize: 22)),
            Text(
              t('appName'),
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
            ),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(
                color: const Color(0xFF047857).withOpacity(0.2),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFF047857).withOpacity(0.4)),
              ),
              child: const Text('Smart AI',
                  style: TextStyle(
                      color: Color(0xFF10B981), fontSize: 10, fontWeight: FontWeight.bold)),
            )
          ],
        ),
        actions: [
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined),
                onPressed: () {
                  setState(() {
                    _notificationCount = 0;
                  });
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('All notifications marked as read.')),
                  );
                },
              ),
              if (_notificationCount > 0)
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                    ),
                    child: Text(
                      '$_notificationCount',
                      style: const TextStyle(
                          color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                )
            ],
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: IndexedStack(
        index: _currentIndex,
        children: screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        backgroundColor: Colors.white,
        indicatorColor: Colors.green.shade100,
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.calculate_outlined),
            selectedIcon: const Icon(Icons.calculate, color: Color(0xFF047857)),
            label: t('calculator'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.dashboard_outlined),
            selectedIcon: const Icon(Icons.dashboard, color: Color(0xFF047857)),
            label: t('dashboard'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.grass_outlined),
            selectedIcon: const Icon(Icons.grass, color: Color(0xFF047857)),
            label: t('myFields'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.settings_outlined),
            selectedIcon: const Icon(Icons.settings, color: Color(0xFF047857)),
            label: t('settings'),
          ),
        ],
      ),
    );
  }
}
