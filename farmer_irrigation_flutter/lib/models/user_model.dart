class FarmerUser {
  final String name;
  final String phone;
  final String email;
  final String location;
  final String crop;
  final double farmArea;
  final bool isLoggedIn;

  FarmerUser({
    required this.name,
    required this.phone,
    required this.email,
    required this.location,
    required this.crop,
    required this.farmArea,
    required this.isLoggedIn,
  });

  factory FarmerUser.demo() {
    return FarmerUser(
      name: "Ramesh Kumar (Demo)",
      phone: "+91 98765 43210",
      email: "farmer.ramesh@gmail.com",
      location: "Najafgarh, Delhi",
      crop: "Wheat",
      farmArea: 3.5,
      isLoggedIn: true,
    );
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'phone': phone,
        'email': email,
        'location': location,
        'crop': crop,
        'farmArea': farmArea,
        'isLoggedIn': isLoggedIn,
      };

  factory FarmerUser.fromJson(Map<String, dynamic> json) => FarmerUser(
        name: json['name'] ?? 'Smart Farmer',
        phone: json['phone'] ?? '+91 98765 43210',
        email: json['email'] ?? 'farmer.ramesh@gmail.com',
        location: json['location'] ?? 'North Zone Farm',
        crop: json['crop'] ?? 'Wheat',
        farmArea: (json['farmArea'] ?? 2.0).toDouble(),
        isLoggedIn: json['isLoggedIn'] ?? false,
      );
}
