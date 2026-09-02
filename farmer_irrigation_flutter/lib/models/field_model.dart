class FieldModel {
  String name;
  String zone;
  String crop;
  int cropType;
  int soilType;
  int season;
  int cropGrowthStage;
  int irrigationType;
  int waterSource;
  double soilPh;
  double soilMoisture;
  double temperatureC;
  double humidity;
  double rainfallMm;
  double sunlightHours;
  double windSpeedKmh;
  double fieldAreaHectare;
  int mulchingUsed;
  double previousIrrigationMm;
  double predictedLiters;
  List<Map<String, dynamic>> schedule;

  FieldModel({
    required this.name,
    required this.zone,
    required this.crop,
    required this.cropType,
    required this.soilType,
    required this.season,
    required this.cropGrowthStage,
    required this.irrigationType,
    required this.waterSource,
    required this.soilPh,
    required this.soilMoisture,
    required this.temperatureC,
    required this.humidity,
    required this.rainfallMm,
    required this.sunlightHours,
    required this.windSpeedKmh,
    required this.fieldAreaHectare,
    required this.mulchingUsed,
    required this.previousIrrigationMm,
    this.predictedLiters = 0.0,
    this.schedule = const [],
  });

  Map<String, dynamic> toApiPayload() {
    return {
      "Soil_Moisture": soilMoisture,
      "Temperature_C": temperatureC,
      "Humidity": humidity,
      "Rainfall_mm": rainfallMm,
      "Sunlight_Hours": sunlightHours,
      "Wind_Speed_kmh": windSpeedKmh,
      "Soil_pH": soilPh,
      "Crop_Type": cropType,
      "Crop_Growth_Stage": cropGrowthStage,
      "Season": season,
      "Irrigation_Type": irrigationType,
      "Water_Source": waterSource,
      "Field_Area_hectare": fieldAreaHectare,
      "Mulching_Used": mulchingUsed,
      "Previous_Irrigation_mm": previousIrrigationMm,
    };
  }

  static List<FieldModel> initialFields() {
    return [
      FieldModel(
        name: "North Wheat Block",
        zone: "Zone A",
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
      ),
      FieldModel(
        name: "East Paddy Field",
        zone: "Zone B",
        crop: "Rice",
        cropType: 2,
        soilType: 2,
        season: 2,
        cropGrowthStage: 2,
        irrigationType: 3,
        waterSource: 2,
        soilPh: 6.8,
        soilMoisture: 55.0,
        temperatureC: 32.0,
        humidity: 75.0,
        rainfallMm: 20.0,
        sunlightHours: 7.0,
        windSpeedKmh: 12.0,
        fieldAreaHectare: 1.5,
        mulchingUsed: 0,
        previousIrrigationMm: 30.0,
      ),
      FieldModel(
        name: "South Sugarcane Plantation",
        zone: "Zone C",
        crop: "Sugarcane",
        cropType: 3,
        soilType: 1,
        season: 1,
        cropGrowthStage: 3,
        irrigationType: 1,
        waterSource: 1,
        soilPh: 7.0,
        soilMoisture: 22.0,
        temperatureC: 35.0,
        humidity: 45.0,
        rainfallMm: 0.0,
        sunlightHours: 9.0,
        windSpeedKmh: 8.0,
        fieldAreaHectare: 4.0,
        mulchingUsed: 1,
        previousIrrigationMm: 10.0,
      ),
    ];
  }
}
