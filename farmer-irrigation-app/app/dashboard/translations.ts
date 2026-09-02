export type LangKey = "en" | "hi" | "kn" | "pa";

export const languageOptions: { code: LangKey; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
];

export interface TranslationSchema {
  appName: string;
  appTagline: string;
  nav: {
    dashboard: string;
    myFields: string;
    plans: string;
    sensors: string;
    alerts: string;
    weather: string;
    analytics: string;
    settings: string;
    calculator: string;
    features: string;
    login: string;
    profile: string;
  };
  subtitle: string;
  crop: string;
  soilType: string;
  season: string;
  growthStage: string;
  irrigationType: string;
  waterSource: string;
  soilMoisture: string;
  temperature: string;
  fieldArea: string;
  submit: string;
  myField: string;
  refresh: string;
  loading: string;
  error: string;
  stats: {
    fieldsMonitored: string;
    zonesActive: string;
    totalWater: string;
    liveModel: string;
    activeAlerts: string;
    critical: string;
    avgMoisture: string;
    optimal: string;
  };
  moistureByZone: string;
  predictedNeed: string;
  live: string;
  recentRecs: string;
  table: {
    field: string;
    zone: string;
    moisture: string;
    recommendation: string;
    nextSchedule: string;
    status: string;
  };
  status: {
    OK: string;
    Pending: string;
    Overdue: string;
    Watching: string;
  };
  actions: {
    urgent: string;
    soon: string;
    monitor: string;
    none: string;
  };
  myFieldsTitle: string;
  addField: string;
  remove: string;
  getIrrigationPlan: string;
  calculating: string;
  litersNeeded: string;
  fieldLabels: {
    crop: string;
    soilType: string;
    season: string;
    growthStage: string;
    irrigationType: string;
    waterSource: string;
    mulching: string;
    soilPh: string;
    moisture: string;
    temperature: string;
    humidity: string;
    rainfall: string;
    sunlight: string;
    wind: string;
    area: string;
    prevIrrigation: string;
  };
  plansTitle: string;
  plansNote: string;
  sensorsTitle: string;
  sensorsNote: string;
  criticalAlerts: string;
  noCritical: string;
  watching: string;
  noWatching: string;
  neededUrgently: string;
  weatherTitle: string;
  liveData: string;
  weatherStats: {
    temp: string;
    current: string;
    humidity: string;
    wind: string;
    precip: string;
    lastHour: string;
  };
  forecast: string;
  weatherTable: {
    date: string;
    max: string;
    min: string;
    rain: string;
  };
  trendTitle: string;
  trendNote: string;
  trendHint: string;
  waterByField: string;
  settingsTitle: string;
  apiUrlLabel: string;
  apiUrlNote: string;
  crops: { wheat: string; rice: string; sugarcane: string; cotton: string; maize: string };
  soils: { loamy: string; clay: string; sandy: string; silty: string };
  seasons: { summer: string; monsoon: string; winter: string };
  stages: { sowing: string; growing: string; flowering: string; harvest: string };
  irrigTypes: { drip: string; sprinkler: string; flood: string };
  waterSources: { borewell: string; canal: string; river: string };
  yesNo: { no: string; yes: string };
  landing: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    calculateBtn: string;
    recommendedVolume: string;
    totalWaterForField: string;
    suggestedSchedule: string;
    dispatcherTitle: string;
    phoneLabel: string;
    emailLabel: string;
    sendSmsBtn: string;
    sendWhatsAppBtn: string;
    sendGmailBtn: string;
    sendBothBtn: string;
    viewDashboard: string;
    featuresTitle: string;
    featuresSub: string;
    feature1Title: string;
    feature1Sub: string;
    feature2Title: string;
    feature2Sub: string;
    feature3Title: string;
    feature3Sub: string;
    feature4Title: string;
    feature4Sub: string;
  };
  auth: {
    login: string;
    signup: string;
    loginSubtitle: string;
    signupSubtitle: string;
    phone: string;
    email: string;
    password: string;
    fullName: string;
    location: string;
    primaryCrop: string;
    farmArea: string;
    submitLogin: string;
    submitSignup: string;
    demoAccount: string;
    verified: string;
    logout: string;
    profile: string;
    notLoggedIn: string;
    accountCreated: string;
    loginSuccess: string;
  };
  notifications: {
    title: string;
    unread: string;
    markAllRead: string;
    clearAll: string;
    testAlert: string;
    noNotifications: string;
    pushTitle: string;
    pushSub: string;
    smsTitle: string;
    smsSub: string;
    thresholdTitle: string;
    weatherAlertTitle: string;
    weatherAlertSub: string;
    testSent: string;
  };
}

export const translations = {
  en: {
    appName: "AgroSense",
    appTagline: "Smart Irrigation Intelligence",
    nav: { dashboard: "Dashboard", myFields: "My Fields", plans: "Irrigation Plans", sensors: "Sensor Data", alerts: "Alerts", weather: "Weather", analytics: "Analytics", settings: "Settings", calculator: "Calculator", features: "Features", login: "Farmer Login", profile: "Farmer Profile" },
    subtitle: "Real-time soil moisture & water management",
    crop: "Crop Type",
    soilType: "Soil Type",
    season: "Season",
    growthStage: "Crop Growth Stage",
    irrigationType: "Irrigation Type",
    waterSource: "Water Source",
    soilMoisture: "Soil Moisture (%)",
    temperature: "Temperature (°C)",
    fieldArea: "Field Area (Hectares)",
    submit: "Calculate Irrigation Plan",
    myField: "My Field",
    refresh: "Refresh",
    loading: "Loading real predictions from your model...",
    error: "Could not reach the API. Is the Colab server still running?",
    stats: { fieldsMonitored: "Fields Monitored", zonesActive: "zones active", totalWater: "Total Water Needed (L)", liveModel: "from live model prediction", activeAlerts: "Active Alerts", critical: "critical (moisture < 25%)", avgMoisture: "Avg Soil Moisture", optimal: "optimal 35-50%" },
    moistureByZone: "Soil Moisture by Zone (%)",
    predictedNeed: "Predicted Water Need",
    live: "Live",
    recentRecs: "Recent Irrigation Recommendations",
    table: { field: "Field", zone: "Zone", moisture: "Moisture", recommendation: "Recommendation", nextSchedule: "Next Schedule", status: "Status" },
    status: { OK: "OK", Pending: "Pending", Overdue: "Overdue", Watching: "Watching" },
    actions: { urgent: "Urgent irrigation needed", soon: "Irrigate soon", monitor: "Monitor closely", none: "No action needed" },
    myFieldsTitle: "My Fields",
    addField: "+ Add Field",
    remove: "Remove",
    getIrrigationPlan: "Get Irrigation Plan",
    calculating: "Calculating...",
    litersNeeded: "L needed",
    fieldLabels: { crop: "Crop", soilType: "Soil Type", season: "Season", growthStage: "Growth Stage", irrigationType: "Irrigation Type", waterSource: "Water Source", mulching: "Mulching", soilPh: "Soil pH", moisture: "Moisture (%)", temperature: "Temperature (°C)", humidity: "Humidity (%)", rainfall: "Rainfall (mm)", sunlight: "Sunlight (hrs)", wind: "Wind Speed (km/h)", area: "Field Area (ha)", prevIrrigation: "Previous Irrigation (mm)" },
    plansTitle: "Irrigation Schedule — Today",
    plansNote: "Schedule generated live by the schedule optimizer based on each field's moisture & temperature.",
    sensorsTitle: "Field Sensor Readings",
    sensorsNote: "Note: no physical sensors are connected yet — these are the current field values set in \"My Fields\", used as model input.",
    criticalAlerts: "Critical Alerts",
    noCritical: "No critical alerts right now.",
    watching: "Watching",
    noWatching: "Nothing to watch closely right now.",
    neededUrgently: "L needed urgently",
    weatherTitle: "Current Weather",
    liveData: "Live data from Open-Meteo",
    weatherStats: { temp: "Temperature", current: "current", humidity: "Humidity", wind: "Wind Speed", precip: "Precipitation", lastHour: "last hour" },
    forecast: "7-Day Forecast",
    weatherTable: { date: "Date", max: "Max Temp", min: "Min Temp", rain: "Rain" },
    trendTitle: "Water Usage Trend (this session)",
    trendNote: "Updates every time you click \"Refresh\". Not saved permanently yet.",
    trendHint: "Click \"Refresh\" a few times to build up a trend.",
    waterByField: "Water Need by Field (current)",
    settingsTitle: "Settings",
    apiUrlLabel: "Backend API URL",
    apiUrlNote: "Update this in the code whenever your Colab ngrok link changes.",
    crops: { wheat: "Wheat", rice: "Rice", sugarcane: "Sugarcane", cotton: "Cotton", maize: "Maize" },
    soils: { loamy: "Loamy", clay: "Clay", sandy: "Sandy", silty: "Silty" },
    seasons: { summer: "Summer", monsoon: "Monsoon", winter: "Winter" },
    stages: { sowing: "Sowing", growing: "Growing", flowering: "Flowering", harvest: "Harvest" },
    irrigTypes: { drip: "Drip", sprinkler: "Sprinkler", flood: "Flood" },
    waterSources: { borewell: "Borewell", canal: "Canal", river: "River" },
    yesNo: { no: "No", yes: "Yes" },
    landing: {
      heroBadge: "🌱 Smart Agriculture AI",
      heroTitle: "Precision Irrigation Water Requirement Calculator",
      heroSubtitle: "Enter your farm parameters to get instant AI-predicted water requirements in Liters and optimal daily schedule slots.",
      calculateBtn: "⚡ Calculate Water Requirement",
      recommendedVolume: "Recommended Water Volume",
      totalWaterForField: "Total water needed for field area",
      suggestedSchedule: "Suggested Schedule",
      dispatcherTitle: "Instant Notification Alert Dispatcher (Mobile SMS & Gmail)",
      phoneLabel: "Farmer Mobile Phone Number",
      emailLabel: "Farmer Gmail / Email Address",
      sendSmsBtn: "📲 Open Mobile SMS App",
      sendWhatsAppBtn: "💬 Send via WhatsApp",
      sendGmailBtn: "📧 Open Gmail Draft",
      sendBothBtn: "🚀 Send Dual Alert (SMS + Gmail)",
      viewDashboard: "📌 View in Full Dashboard",
      featuresTitle: "Why Smart Farmers Trust AgroSense",
      featuresSub: "Empowering Indian farmers with data-driven irrigation intelligence",
      feature1Title: "AI Machine Learning Model",
      feature1Sub: "Trained on real soil, moisture, crop & climate datasets.",
      feature2Title: "Real-time Field Sync",
      feature2Sub: "All additions and parameter changes instantly reflect across plans & telemetry.",
      feature3Title: "Dual SMS & Gmail Alerts",
      feature3Sub: "Receive critical water alerts on phone SMS & Gmail in your language.",
      feature4Title: "Water Conservation",
      feature4Sub: "Save up to 40% groundwater by irrigating only when crops actually need it.",
    },
    auth: {
      login: "Farmer Login",
      signup: "Farmer Registration",
      loginSubtitle: "Access your field irrigation portal & alerts",
      signupSubtitle: "Join 10,000+ smart farmers saving water & boosting yield",
      phone: "Mobile Number",
      email: "Gmail / Email Address",
      password: "Password",
      fullName: "Full Name",
      location: "Farm Location (Village / District)",
      primaryCrop: "Primary Crop",
      farmArea: "Total Farm Area (Hectares)",
      submitLogin: "Log In to Portal",
      submitSignup: "Create Farmer Account",
      demoAccount: "⚡ Instant Demo Farmer Login",
      verified: "Verified Smart Farmer",
      logout: "Log Out",
      profile: "Farmer Profile Settings",
      notLoggedIn: "Currently using Guest Mode",
      accountCreated: "Farmer account created successfully!",
      loginSuccess: "Welcome back!",
    },
    notifications: {
      title: "Farm Alerts & Notifications",
      unread: "unread",
      markAllRead: "Mark all read",
      clearAll: "Clear all",
      testAlert: "🔔 Test Live Alert",
      noNotifications: "No new notifications right now.",
      pushTitle: "Push Notifications",
      pushSub: "Receive real-time alerts directly on your browser",
      smsTitle: "SMS Water Alerts",
      smsSub: "Get SMS updates when soil moisture is critical",
      thresholdTitle: "Low Moisture Alert Threshold",
      weatherAlertTitle: "Rain Forecast Warnings",
      weatherAlertSub: "Notify when heavy rain is expected so you can delay irrigation",
      testSent: "Test notification triggered!",
    },
  },
  hi: {
    appName: "AgroSense",
    appTagline: "स्मार्ट सिंचाई इंटेलिजेंस",
    nav: { dashboard: "डैशबोर्ड", myFields: "मेरे खेत", plans: "सिंचाई योजनाएं", sensors: "सेंसर डेटा", alerts: "अलर्ट", weather: "मौसम", analytics: "एनालिटिक्स", settings: "सेटिंग्स", calculator: "कैलकुलेटर", features: "विशेषताएं", login: "किसान लॉगिन", profile: "किसान प्रोफाइल" },
    subtitle: "वास्तविक समय मिट्टी की नमी और जल प्रबंधन",
    crop: "फसल का प्रकार",
    soilType: "मिट्टी का प्रकार",
    season: "मौसम",
    growthStage: "फसल की वृद्धि अवस्था",
    irrigationType: "सिंचाई का प्रकार",
    waterSource: "जल स्रोत",
    soilMoisture: "मिट्टी की नमी (%)",
    temperature: "तापमान (°C)",
    fieldArea: "खेत का क्षेत्रफल (हेक्टेयर)",
    submit: "सिंचाई योजना प्राप्त करें",
    myField: "मेरा खेत",
    refresh: "रिफ्रेश करें",
    loading: "आपके मॉडल से वास्तविक भविष्यवाणी लोड हो रही है...",
    error: "API से संपर्क नहीं हो पाया। क्या Colab सर्वर अभी भी चल रहा है?",
    stats: { fieldsMonitored: "निगरानी किए गए खेत", zonesActive: "क्षेत्र सक्रिय", totalWater: "कुल जल आवश्यकता (लीटर)", liveModel: "लाइव मॉडल भविष्यवाणी से", activeAlerts: "सक्रिय अलर्ट", critical: "गंभीर (नमी < 25%)", avgMoisture: "औसत मिट्टी की नमी", optimal: "उपयुक्त 35-50%" },
    moistureByZone: "क्षेत्र अनुसार मिट्टी की नमी (%)",
    predictedNeed: "अनुमानित जल आवश्यकता",
    live: "लाइव",
    recentRecs: "हाल की सिंचाई सिफारिशें",
    table: { field: "खेत", zone: "क्षेत्र", moisture: "नमी", recommendation: "सिफारिश", nextSchedule: "अगला समय", status: "स्थिति" },
    status: { OK: "ठीक है", Pending: "लंबित", Overdue: "अतिदेय", Watching: "निगरानी में" },
    actions: { urgent: "तत्काल सिंचाई आवश्यक", soon: "जल्द सिंचाई करें", monitor: "बारीकी से निगरानी करें", none: "कोई कार्रवाई आवश्यक नहीं" },
    myFieldsTitle: "मेरे खेत",
    addField: "+ खेत जोड़ें",
    remove: "हटाएं",
    getIrrigationPlan: "सिंचाई योजना प्राप्त करें",
    calculating: "गणना हो रही है...",
    litersNeeded: "लीटर आवश्यक",
    fieldLabels: { crop: "फसल", soilType: "मिट्टी का प्रकार", season: "मौसम", growthStage: "वृद्धि अवस्था", irrigationType: "सिंचाई का प्रकार", waterSource: "जल स्रोत", mulching: "मल्चिंग", soilPh: "मिट्टी का pH", moisture: "नमी (%)", temperature: "तापमान (°C)", humidity: "आर्द्रता (%)", rainfall: "वर्षा (मिमी)", sunlight: "धूप (घंटे)", wind: "हवा की गति (किमी/घं)", area: "खेत क्षेत्रफल (हेक्टेयर)", prevIrrigation: "पिछली सिंचाई (मिमी)" },
    plansTitle: "सिंचाई अनुसूची — आज",
    plansNote: "यह अनुसूची प्रत्येक खेत की नमी और तापमान के आधार पर तैयार की जाती है।",
    sensorsTitle: "खेत सेंसर रीडिंग",
    sensorsNote: "ध्यान दें: अभी कोई भौतिक सेंसर जुड़ा नहीं है — ये वर्तमान खेत मान हैं।",
    criticalAlerts: "गंभीर अलर्ट",
    noCritical: "अभी कोई गंभीर अलर्ट नहीं है।",
    watching: "निगरानी में",
    noWatching: "अभी देखने के लिए कुछ नहीं है।",
    neededUrgently: "लीटर तत्काल आवश्यक",
    weatherTitle: "वर्तमान मौसम",
    liveData: "Open-Meteo से लाइव डेटा",
    weatherStats: { temp: "तापमान", current: "वर्तमान", humidity: "आर्द्रता", wind: "हवा की गति", precip: "वर्षा", lastHour: "पिछला घंटा" },
    forecast: "7-दिन का पूर्वानुमान",
    weatherTable: { date: "तारीख", max: "अधिकतम तापमान", min: "न्यूनतम तापमान", rain: "वर्षा" },
    trendTitle: "जल उपयोग रुझान (इस सत्र में)",
    trendNote: "जब भी आप \"रिफ्रेश\" दबाते हैं यह अपडेट होता है।",
    trendHint: "रुझान देखने के लिए \"रिफ्रेश\" दबाएं।",
    waterByField: "खेत अनुसार जल आवश्यकता (वर्तमान)",
    settingsTitle: "सेटिंग्स",
    apiUrlLabel: "बैकएंड API URL",
    apiUrlNote: "जब भी आपका Colab ngrok लिंक बदले, इसे अपडेट करें।",
    crops: { wheat: "गेहूं", rice: "चावल", sugarcane: "गन्ना", cotton: "कपास", maize: "मक्का" },
    soils: { loamy: "दोमट", clay: "चिकनी मिट्टी", sandy: "रेतीली", silty: "गादयुक्त" },
    seasons: { summer: "गर्मी", monsoon: "मानसून", winter: "सर्दी" },
    stages: { sowing: "बुआई", growing: "वृद्धि", flowering: "फूल आना", harvest: "कटाई" },
    irrigTypes: { drip: "ड्रिप", sprinkler: "स्प्रिंकलर", flood: "फ्लड" },
    waterSources: { borewell: "बोरवेल", canal: "नहर", river: "नदी" },
    yesNo: { no: "नहीं", yes: "हां" },
    landing: {
      heroBadge: "🌱 स्मार्ट कृषि एआई",
      heroTitle: "सटीक सिंचाई जल आवश्यकता कैलकुलेटर",
      heroSubtitle: "लीटर में अनुमानित जल आवश्यकता और इष्टतम समय सारणी प्राप्त करने के लिए अपने खेत के पैरामीटर दर्ज करें।",
      calculateBtn: "⚡ जल आवश्यकता की गणना करें",
      recommendedVolume: "अनुशंसित जल की मात्रा",
      totalWaterForField: "खेत के लिए आवश्यक कुल जल",
      suggestedSchedule: "सुझाई गई समयावधि",
      dispatcherTitle: "तत्काल अधिसूचना अलर्ट (मोबाइल एसएमएस और जीमेल)",
      phoneLabel: "किसान का मोबाइल नंबर",
      emailLabel: "किसान का जीमेल / ईमेल पता",
      sendSmsBtn: "📲 मोबाइल एसएमएस ऐप खोलें",
      sendWhatsAppBtn: "💬 व्हाट्सएप अलर्ट भेजें",
      sendGmailBtn: "📧 जीमेल ड्राफ्ट खोलें",
      sendBothBtn: "🚀 सभी अलर्ट भेजें (एसएमएस + जीमेल)",
      viewDashboard: "📌 पूर्ण डैशबोर्ड देखें",
      featuresTitle: "स्मार्ट किसान एग्रोसेंस पर भरोसा क्यों करते हैं",
      featuresSub: "भारतीय किसानों को डेटा-संचालित सिंचाई तकनीक से सशक्त बनाना",
      feature1Title: "एआई मशीन लर्निंग मॉडल",
      feature1Sub: "वास्तविक मिट्टी, नमी, फसल और जलवायु डेटा पर प्रशिक्षित।",
      feature2Title: "लाइव फील्ड सिंक",
      feature2Sub: "सभी बदलाव सिंचाई योजनाओं और डैशबोर्ड में तुरंत दिखते हैं।",
      feature3Title: "एसएमएस और जीमेल अलर्ट",
      feature3Sub: "अपनी भाषा में मोबाइल एसएमएस और जीमेल पर महत्वपूर्ण जल अलर्ट प्राप्त करें।",
      feature4Title: "जल संरक्षण",
      feature4Sub: "केवल आवश्यकता होने पर ही सिंचाई करके 40% तक भूजल बचाएं।",
    },
    auth: {
      login: "किसान लॉगिन",
      signup: "किसान पंजीकरण",
      loginSubtitle: "अपने खेत सिंचाई पोर्टल और अलर्ट तक पहुंचें",
      signupSubtitle: "10,000+ स्मार्ट किसानों के साथ जुड़ें",
      phone: "मोबाइल नंबर",
      email: "जीमेल / ईमेल पता",
      password: "पासवर्ड",
      fullName: "पूरा नाम",
      location: "खेत का स्थान (गांव / जिला)",
      primaryCrop: "मुख्य फसल",
      farmArea: "कुल खेत का क्षेत्रफल (हेक्टेयर)",
      submitLogin: "पोर्टल में लॉगिन करें",
      submitSignup: "किसान खाता बनाएं",
      demoAccount: "⚡ त्वरित डेमो किसान लॉगिन",
      verified: "सत्यापित स्मार्ट किसान",
      logout: "लॉग आउट करें",
      profile: "किसान प्रोफाइल सेटिंग्स",
      notLoggedIn: "गेस्ट मोड में हैं",
      accountCreated: "किसान खाता सफलतापूर्वक बनाया गया!",
      loginSuccess: "वापसी पर स्वागत है!",
    },
    notifications: {
      title: "खेत अलर्ट और सूचनाएं",
      unread: "अपठित",
      markAllRead: "सभी को पढ़ा हुआ चिन्हित करें",
      clearAll: "सभी साफ करें",
      testAlert: "🔔 लाइव अलर्ट टेस्ट करें",
      noNotifications: "अभी कोई नई सूचनाएं नहीं हैं।",
      pushTitle: "ब्राउज़र सूचनाएं",
      pushSub: "सीधे अपने ब्राउज़र पर रीयल-टाइम अलर्ट प्राप्त करें",
      smsTitle: "एसएमएस जल अलर्ट",
      smsSub: "मिट्टी की नमी कम होने पर एसएमएस प्राप्त करें",
      thresholdTitle: "कम नमी अलर्ट सीमा",
      weatherAlertTitle: "बारिश चेतावनी",
      weatherAlertSub: "भारी बारिश की संभावना पर सिंचाई स्थगित करने की सूचना दें",
      testSent: "टेस्ट अलर्ट भेजा गया!",
    },
  },
  kn: {
    appName: "AgroSense",
    appTagline: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ತಂತ್ರಜ್ಞಾನ",
    nav: { dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", myFields: "ನನ್ನ ಜಮೀನು", plans: "ನೀರಾವರಿ ಯೋಜನೆ", sensors: "ಸಂವೇದಕ ಡೇಟಾ", alerts: "ಎಚ್ಚರಿಕೆಗಳು", weather: "ಹವಾಮಾನ", analytics: "ವಿಶ್ಲೇಷಣೆ", settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು", calculator: "ಕ್ಯಾಲ್ಕುಲೇಟರ್", features: "ವೈಶಿಷ್ಟ್ಯಗಳು", login: "ರೈತರ ಲಾಗಿನ್", profile: "ರೈತರ ವಿವರ" },
    subtitle: "ನೈಜ ಸಮಯದಲ್ಲಿ ಮಣ್ಣಿನ ತೇವಾಂಶ ಮತ್ತು ನೀರಿನ ನಿರ್ವಹಣೆ",
    crop: "ಬೆಳೆಯ ಪ್ರಕಾರ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    season: "ಋತು",
    growthStage: "ಬೆಳೆಯ ಬೆಳವಣಿಗೆ ಹಂತ",
    irrigationType: "ನೀರಾವರಿ ಪ್ರಕಾರ",
    waterSource: "ನೀರಿನ ಮೂಲ",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ (%)",
    temperature: "ತಾಪಮಾನ (°C)",
    fieldArea: "ಹೊಲದ ವಿಸ್ತೀರ್ಣ (ಹೆಕ್ಟೇರ್)",
    submit: "ನೀರಾವರಿ ಯೋಜನೆ ಪಡೆಯಿರಿ",
    myField: "ನನ್ನ ಹೊಲ",
    refresh: "ರಿಫ್ರೆಶ್ ಮಾಡಿ",
    loading: "ನಿಮ್ಮ ಮಾದರಿಯಿಂದ ನೈಜ ಮುನ್ಸೂಚನೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    error: "API ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. Colab ಸರ್ವರ್ ಚಾಲನೆಯಲ್ಲಿದೆಯೇ?",
    stats: { fieldsMonitored: "ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿದ ಜಮೀನುಗಳು", zonesActive: "ಸಕ್ರಿಯ ವಲಯಗಳು", totalWater: "ಒಟ್ಟು ನೀರಿನ ಅಗತ್ಯತೆ (ಲೀಟರ್)", liveModel: "ನೈಜ ಮಾದರಿ ಮುನ್ಸೂಚನೆಯಿಂದ", activeAlerts: "ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು", critical: "ಅಪಾಯಕಾರಿ (ತೇವಾಂಶ < 25%)", avgMoisture: "ಸರಾಸರಿ ಮಣ್ಣಿನ ತೇವಾಂಶ", optimal: "ಸೂಕ್ತ 35-50%" },
    moistureByZone: "ವಲಯವಾರು ಮಣ್ಣಿನ ತೇವಾಂಶ (%)",
    predictedNeed: "ಅಂದಾಜು ನೀರಿನ ಅಗತ್ಯತೆ",
    live: "ಲೈವ್",
    recentRecs: "ಇತ್ತೀಚಿನ ನೀರಾವರಿ ಶಿಫಾರಸುಗಳು",
    table: { field: "ಜಮೀನು", zone: "ವಲಯ", moisture: "ತೇವಾಂಶ", recommendation: "ಶಿಫಾರಸು", nextSchedule: "ಮುಂದಿನ ಸಮಯ", status: "ಸ್ಥಿತಿ" },
    status: { OK: "ಸರಿ ಇದೆ", Pending: "ಬಾಕಿ ಇದೆ", Overdue: "ಮೀರಿದೆ", Watching: "ಗಮನದಲ್ಲಿದೆ" },
    actions: { urgent: "ತಕ್ಷಣ ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ", soon: "ಬೇಗ ನೀರು ಹಾಕಿ", monitor: "ಹತ್ತಿರದಿಂದ ಗಮನಿಸಿ", none: "ಯಾವುದೇ ಕ್ರಮ ಅಗತ್ಯವಿಲ್ಲ" },
    myFieldsTitle: "ನನ್ನ ಜಮೀನುಗಳು",
    addField: "+ ಜಮೀನು ಸೇರಿಸಿ",
    remove: "ತೆಗೆದುಹಾಕಿ",
    getIrrigationPlan: "ನೀರಾವರಿ ಯೋಜನೆ ಪಡೆಯಿರಿ",
    calculating: "ಲೆಕ್ಕಾಚಾರ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    litersNeeded: "ಲೀಟರ್ ಅಗತ್ಯವಿದೆ",
    fieldLabels: { crop: "ಬೆಳೆ", soilType: "ಮಣ್ಣಿನ ವಿಧ", season: "ಋತು", growthStage: "ಬೆಳವಣಿಗೆಯ ಹಂತ", irrigationType: "ನೀರಾವರಿ ವಿಧಾನ", waterSource: "ನೀರಿನ ಮೂಲ", mulching: "ಮಲ್ಚಿಂಗ್", soilPh: "ಮಣ್ಣಿನ pH", moisture: "ತೇವಾಂಶ (%)", temperature: "ತಾಪಮಾನ (°C)", humidity: "ಆರ್ಧ್ರತೆ (%)", rainfall: "ಮಳೆ (ಮಿಮೀ)", sunlight: "ಬಿಸಿಲು (ಗಂಟೆಗಳು)", wind: "ಗಾಳಿಯ ವೇಗ (ಕಿಮೀ/ಗಂ)", area: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಹೆಕ್ಟೇರ್)", prevIrrigation: "ಹಿಂದಿನ ನೀರಾವರಿ (ಮಿಮೀ)" },
    plansTitle: "ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ — ಇಂದು",
    plansNote: "ಪ್ರತಿ ಜಮೀನಿನ ತೇವಾಂಶ ಮತ್ತು ತಾಪಮಾನಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಈ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.",
    sensorsTitle: "ಸಂವೇದಕ ಡೇಟಾ",
    sensorsNote: "ಗಮನಿಸಿ: ಇವು ನನ್ನ ಜಮೀನು ವಿಭಾಗದಲ್ಲಿ ನಮೂದಿಸಿದ ಪ್ರಸ್ತುತ ಮೌಲ್ಯಗಳಾಗಿವೆ.",
    criticalAlerts: "ಅಪಾಯಕಾರಿ ಎಚ್ಚರಿಕೆಗಳು",
    noCritical: "ಪ್ರಸ್ತುತ ಯಾವುದೇ ಅಪಾಯಕಾರಿ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ.",
    watching: "ಗಮನದಲ್ಲಿರುವವು",
    noWatching: "ಗಮನಿಸಬೇಕಾದ ಯಾವುದೇ ಐಟಂ ಇಲ್ಲ.",
    neededUrgently: "ಲೀಟರ್ ತಕ್ಷಣ ಅಗತ್ಯವಿದೆ",
    weatherTitle: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
    liveData: "Open-Meteo ನಿಂದ ನೈಜ ಡೇಟಾ",
    weatherStats: { temp: "ತಾಪಮಾನ", current: "ಪ್ರಸ್ತುತ", humidity: "ಆರ್ಧ್ರತೆ", wind: "ಗಾಳಿಯ ವೇಗ", precip: "ಮಳೆ", lastHour: "ಕಳೆದ ಗಂಟೆ" },
    forecast: "7 ದಿನಗಳ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
    weatherTable: { date: "ದಿನಾಂಕ", max: "ಗರಿಷ್ಠ ತಾಪಮಾನ", min: "ಕನಿಷ್ಠ ತಾಪಮಾನ", rain: "ಮಳೆ" },
    trendTitle: "ನೀರಿನ ಬಳಕೆಯ ಪ್ರವೃತ್ತಿ",
    trendNote: "ನೀವು \"ರಿಫ್ರೆಶ್\" ಕ್ಲಿಕ್ ಮಾಡಿದಾಗಲೆಲ್ಲಾ ಇದು ನವೀಕರಣಗೊಳ್ಳುತ್ತದೆ.",
    trendHint: "ಪ್ರವೃತ್ತಿ ನೋಡಲು \"ರಿಫ್ರೆಶ್\" ಕ್ಲಿಕ್ ಮಾಡಿ.",
    waterByField: "ಜಮೀನುವಾರು ನೀರಿನ ಅಗತ್ಯತೆ",
    settingsTitle: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    apiUrlLabel: "ಬ್ಯಾಕೆಂಡ್ API URL",
    apiUrlNote: "Colab ngrok ಲಿಂಕ್ ಬದಲಾದಾಗ ಇದನ್ನು ನವೀಕರಿಸಿ.",
    crops: { wheat: "ಗೋಧಿ", rice: "ಭತ್ತ", sugarcane: "ಕಬ್ಬು", cotton: "ಹತ್ತಿ", maize: "ಮೆಕ್ಕೆಜೋಳ" },
    soils: { loamy: "ಮೆಕ್ಕಲು ಮಣ್ಣು", clay: "ಜೇಡಿ ಮಣ್ಣು", sandy: "ಮರಳು ಮಣ್ಣು", silty: "ಸೌದೆ ಮಣ್ಣು" },
    seasons: { summer: "ಬೇಸಿಗೆ", monsoon: "ಮಳೆಗಾಲ", winter: "ಚಳಿಗಾಲ" },
    stages: { sowing: "ಬಿತ್ತನೆ", growing: "ಬೆಳವಣಿಗೆ", flowering: "ಹೂವಾಡುವಿಕೆ", harvest: "ಕೊಯ್ಲು" },
    irrigTypes: { drip: "ಹನಿ ನೀರಾವರಿ", sprinkler: "ತುಂತುರು", flood: "ಕಾಲುವೆ ನೀರಾವರಿ" },
    waterSources: { borewell: "ಬೋರ್‌ವೆಲ್", canal: "ಕಾಲುವೆ", river: "ನದಿ" },
    yesNo: { no: "ಇಲ್ಲ", yes: "ಹೌದು" },
    landing: {
      heroBadge: "🌱 ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಎಐ",
      heroTitle: "ನಿಖರ ನೀರಾವರಿ ನೀರಿನ ಅಗತ್ಯತೆ ಲೆಕ್ಕಾಚಾರ",
      heroSubtitle: "ಲೀಟರ್‌ಗಳಲ್ಲಿ ನೀರಿನ ಅಗತ್ಯತೆ ಮತ್ತು ವೇಳಾಪಟ್ಟಿಯನ್ನು ಪಡೆಯಲು ನಿಮ್ಮ ಜಮೀನಿನ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.",
      calculateBtn: "⚡ ನೀರಿನ ಅಗತ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ",
      recommendedVolume: "ಶಿಫಾರಸು ಮಾಡಿದ ನೀರಿನ ಪ್ರಮಾಣ",
      totalWaterForField: "ಒಟ್ಟು ಅಗತ್ಯವಿರುವ ನೀರು",
      suggestedSchedule: "ಸಲಹೆ ನೀಡಿದ ವೇಳಾಪಟ್ಟಿ",
      dispatcherTitle: "ತಕ್ಷಣದ ಅಧಿಸೂಚನೆ ಎಚ್ಚರಿಕೆ (ಮೊಬೈಲ್ ಎಸ್‌ಎಮ್‌ಎಸ್ ಮತ್ತು ಜಿಮೇಲ್)",
      phoneLabel: "ರೈತರ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      emailLabel: "ರೈತರ ಜಿಮೇಲ್ / ಇಮೇಲ್ ವಿಳಾಸ",
      sendSmsBtn: "📲 ಮೊಬೈಲ್ SMS ಆ್ಯಪ್ ತೆರೆಯಿರಿ",
      sendWhatsAppBtn: "💬 ವಾಟ್ಸಾಪ್ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ",
      sendGmailBtn: "📧 ಜಿಮೇಲ್ ಡ್ರಾಫ್ಟ್ ತೆರೆಯಿರಿ",
      sendBothBtn: "🚀 ಎಲ್ಲವನ್ನೂ ಕಳುಹಿಸಿ (SMS + Gmail)",
      viewDashboard: "📌 ಸಂಪೂರ್ಣ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ವೀಕ್ಷಿಸಿ",
      featuresTitle: "ಸ್ಮಾರ್ಟ್ ರೈತರು ಆಗ್ರೋಸೆನ್ಸ್ ಅನ್ನು ಏಕೆ ನಂಬುತ್ತಾರೆ",
      featuresSub: "ಭಾರತೀಯ ರೈತರಿಗೆ ಡೇಟಾ ಆಧಾರಿತ ನೀರಾವರಿ ತಂತ್ರಜ್ಞಾನ",
      feature1Title: "ಎಐ ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಮಾದರಿ",
      feature1Sub: "ನೈಜ ಮಣ್ಣು, ತೇವಾಂಶ ಮತ್ತು ಬೆಳೆ ಡೇಟಾದ ಆಧಾರದ ಮೇಲೆ ತರಬೇತಿ.",
      feature2Title: "ಲೈವ್ ಫೀಲ್ಡ್ ಸಿಂಕ್",
      feature2Sub: "ಎಲ್ಲಾ ಬದಲಾವಣೆಗಳು ತಕ್ಷಣವೇ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ.",
      feature3Title: "ಎಸ್‌ಎಮ್‌ಎಸ್ ಮತ್ತು ಜಿಮೇಲ್ ಎಚ್ಚರಿಕೆ",
      feature3Sub: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮೊಬೈಲ್ ಮತ್ತು ಜಿಮೇಲ್‌ನಲ್ಲಿ ನೀರಾವರಿ ಎಚ್ಚರಿಕೆ ಪಡೆಯಿರಿ.",
      feature4Title: "ನೀರಿನ ಸಂರಕ್ಷಣೆ",
      feature4Sub: "ಅಗತ್ಯವಿದ್ದಾಗ ಮಾತ್ರ ನೀರು ಉಣಿಸುವ ಮೂಲಕ 40% ನೀರನ್ನು ಉಳಿಸಿ.",
    },
    auth: {
      login: "ರೈತರ ಲಾಗಿನ್",
      signup: "ರೈತರ ನೋಂದಣಿ",
      loginSubtitle: "ನಿಮ್ಮ ನೀರಾವರಿ ಪೋರ್ಟಲ್ ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
      signupSubtitle: "10,000+ ಸ್ಮಾರ್ಟ್ ರೈತರೊಂದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ",
      phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      email: "ಜಿಮೇಲ್ / ಇಮೇಲ್ ವಿಳಾಸ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      fullName: "ಪೂರ್ಣ ಹೆಸರು",
      location: "ಜಮೀನಿನ ಸ್ಥಳ (ಗ್ರಾಮ / ಜಿಲ್ಲೆ)",
      primaryCrop: "ಮುಖ್ಯ ಬೆಳೆ",
      farmArea: "ಒಟ್ಟು ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ (ಹೆಕ್ಟೇರ್)",
      submitLogin: "ಲಾಗಿನ್ ಮಾಡಿ",
      submitSignup: "ರೈತರ ಖಾತೆ ರಚಿಸಿ",
      demoAccount: "⚡ ಡೆಮೊ ಲಾಗಿನ್",
      verified: "ಪರಿಶೀಲಿಸಿದ ಸ್ಮಾರ್ಟ್ ರೈತ",
      logout: "ಲಾಗ್ ಔಟ್ ಮಾಡಿ",
      profile: "ರೈತರ ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      notLoggedIn: "ಅತಿಥಿ ಮೋಡ್‌ನಲ್ಲಿದ್ದೀರಿ",
      accountCreated: "ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ!",
      loginSuccess: "ಮರಳಿ ಸ್ವಾಗತ!",
    },
    notifications: {
      title: "ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಅಧಿಸೂಚನೆಗಳು",
      unread: "ಓದದಿರುವುದು",
      markAllRead: "ಎಲ್ಲವನ್ನೂ ಓದಿದಂತೆ ಗುರುತಿಸಿ",
      clearAll: "ಎಲ್ಲವನ್ನೂ ಅಳಿಸಿ",
      testAlert: "🔔 ಟೆಸ್ಟ್ ಎಚ್ಚರಿಕೆ",
      noNotifications: "ಯಾವುದೇ ಹೊಸ ಅಧಿಸೂಚನೆಗಳಿಲ್ಲ.",
      pushTitle: "ಬ್ರೌಸರ್ ಅಧಿಸೂಚನೆಗಳು",
      pushSub: "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ನೈಜ ಸಮಯದ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ",
      smsTitle: "ಎಸ್‌ಎಮ್‌ಎಸ್ ಎಚ್ಚರಿಕೆ",
      smsSub: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಕಡಿಮೆಯಾದಾಗ ಎಸ್‌ಎಮ್‌ಎಸ್ ಪಡೆಯಿರಿ",
      thresholdTitle: "ಕಡಿಮೆ ತೇವಾಂಶದ ಎಚ್ಚರಿಕೆ ಮಿತಿ",
      weatherAlertTitle: "ಮಳೆ ಮುನ್ಸೂಚನೆ ಎಚ್ಚರಿಕೆ",
      weatherAlertSub: "ಹೆಚ್ಚು ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ ಇದ್ದಾಗ ನೀರಾವರಿ ಮುಂದೂಡಿ",
      testSent: "ಟೆಸ್ಟ್ ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಲಾಗಿದೆ!",
    },
  },
  pa: {
    appName: "AgroSense",
    appTagline: "ਸਮਾਰਟ ਸਿੰਚਾਈ ਇੰਟੈਲੀਜੈਂਸ",
    nav: { dashboard: "ਡੈਸ਼ਬੋਰਡ", myFields: "ਮੇਰੇ ਖੇਤ", plans: "ਸਿੰਚਾਈ ਯੋਜਨਾਵਾਂ", sensors: "ਸੈਂਸਰ ਡਾਟਾ", alerts: "ਅਲਰਟ", weather: "ਮੌਸਮ", analytics: "ਐਨਾਲਿਟਿਕਸ", settings: "ਸੈਟਿੰਗਾਂ", calculator: "ਕੈਲਕੁਲੇਟਰ", features: "ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ", login: "ਕਿਸਾਨ ਲੌਗਇਨ", profile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ" },
    subtitle: "ਰੀਅਲ-ਟਾਈਮ ਮਿੱਟੀ ਦੀ ਨਮੀ ਅਤੇ ਪਾਣੀ ਪ੍ਰਬੰਧਨ",
    crop: "ਫਸਲ ਦੀ ਕਿਸਮ",
    soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
    season: "ਮੌਸਮ",
    growthStage: "ਫਸਲ ਦਾ ਵਾਧਾ ਪੜਾਅ",
    irrigationType: "ਸਿੰਚਾਈ ਦੀ ਕਿਸਮ",
    waterSource: "ਪਾਣੀ ਦਾ ਸਰੋਤ",
    soilMoisture: "ਮਿੱਟੀ ਦੀ ਨਮੀ (%)",
    temperature: "ਤਾਪਮਾਨ (°C)",
    fieldArea: "ਖੇਤ ਦਾ ਖੇਤਰਫਲ (ਹੈਕਟੇਅਰ)",
    submit: "ਸਿੰਚਾਈ ਯੋਜਨਾ ਪ੍ਰਾਪਤ ਕਰੋ",
    myField: "ਮੇਰਾ ਖੇਤ",
    refresh: "ਰਿਫ੍ਰੈਸ਼ ਕਰੋ",
    loading: "ਤੁਹਾਡੇ ਮਾਡਲ ਤੋਂ ਅਸਲ ਭਵਿੱਖਬਾਣੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    error: "API ਨਾਲ ਸੰਪਰਕ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਕੀ Colab ਸਰਵਰ ਚੱਲ ਰਿਹਾ ਹੈ?",
    stats: { fieldsMonitored: "ਨਿਗਰਾਨੀ ਕੀਤੇ ਖੇਤ", zonesActive: "ਖੇਤਰ ਸਰਗਰਮ", totalWater: "ਕੁੱਲ ਪਾਣੀ ਦੀ ਲੋੜ (ਲੀਟਰ)", liveModel: "ਲਾਈਵ ਮਾਡਲ ਭਵਿੱਖਬਾਣੀ ਤੋਂ", activeAlerts: "ਸਰਗਰਮ ਅਲਰਟ", critical: "ਗੰਭੀਰ (ਨਮੀ < 25%)", avgMoisture: "ਔਸਤ ਮਿੱਟੀ ਦੀ ਨਮੀ", optimal: "ਢੁਕਵੀਂ 35-50%" },
    moistureByZone: "ਖੇਤਰ ਅਨੁਸਾਰ ਮਿੱਟੀ ਦੀ ਨਮੀ (%)",
    predictedNeed: "ਅਨੁਮਾਨਿਤ ਪਾਣੀ ਦੀ ਲੋੜ",
    live: "ਲਾਈਵ",
    recentRecs: "ਹਾਲੀਆ ਸਿੰਚਾਈ ਸਿਫ਼ਾਰਸ਼ਾਂ",
    table: { field: "ਖੇਤ", zone: "ਖੇਤਰ", moisture: "ਨਮੀ", recommendation: "ਸਿਫ਼ਾਰਸ਼", nextSchedule: "ਅਗਲਾ ਸਮਾਂ", status: "ਸਥਿਤੀ" },
    status: { OK: "ਠੀਕ ਹੈ", Pending: "ਬਕਾਇਆ", Overdue: "ਮਿਆਦ ਪੁੱਗੀ", Watching: "ਨਿਗਰਾਨੀ ਹੇਠ" },
    actions: { urgent: "ਤੁਰੰਤ ਸਿੰਚਾਈ ਦੀ ਲੋੜ", soon: "ਜਲਦੀ ਸਿੰਚਾਈ ਕਰੋ", monitor: "ਧਿਆਨ ਨਾਲ ਦੇਖੋ", none: "ਕੋਈ ਕਾਰਵਾਈ ਦੀ ਲੋੜ ਨਹੀਂ" },
    myFieldsTitle: "ਮੇਰੇ ਖੇਤ",
    addField: "+ ਖੇਤ ਜੋੜੋ",
    remove: "ਹਟਾਓ",
    getIrrigationPlan: "ਸਿੰਚਾਈ ਯੋਜਨਾ ਪ੍ਰਾਪਤ ਕਰੋ",
    calculating: "ਗਣਨਾ ਹੋ ਰਹੀ ਹੈ...",
    litersNeeded: "ਲੀਟਰ ਲੋੜੀਂਦਾ",
    fieldLabels: { crop: "ਫਸਲ", soilType: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ", season: "ਮੌਸਮ", growthStage: "ਵਾਧਾ ਪੜਾਅ", irrigationType: "ਸਿੰਚਾਈ ਦੀ ਕਿਸਮ", waterSource: "ਪਾਣੀ ਦਾ ਸਰੋਤ", mulching: "ਮਲਚਿੰਗ", soilPh: "ਮਿੱਟੀ ਦੀ pH", moisture: "ਨਮੀ (%)", temperature: "ਤਾਪਮਾਨ (°C)", humidity: "ਨਮੀ (%)", rainfall: "ਮੀਂਹ (ਮਿ.ਮੀ.)", sunlight: "ਧੁੱਪ (ਘੰਟੇ)", wind: "ਹਵਾ ਦੀ ਗਤੀ (ਕਿਲੋਮੀਟਰ/ਘੰਟਾ)", area: "ਖੇਤ ਖੇਤਰਫਲ (ਹੈਕਟੇਅਰ)", prevIrrigation: "ਪਿਛਲੀ ਸਿੰਚਾਈ (ਮਿ.ਮੀ.)" },
    plansTitle: "ਸਿੰਚਾਈ ਸ਼ਡਿਊਲ — ਅੱਜ",
    plansNote: "ਇਹ ਸ਼ਡਿਊਲ ਹਰੇਕ ਖੇਤ ਦੀ ਨਮੀ ਅਤੇ ਤਾਪਮਾਨ ਦੇ ਆਧਾਰ 'ਤੇ ਤਿਆਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।",
    sensorsTitle: "ਖੇਤ ਸੈਂਸਰ ਰੀਡਿੰਗ",
    sensorsNote: "ਨੋਟ: ਇਹ ਮੇਰੇ ਖੇਤ ਭਾਗ ਵਿੱਚ ਸੈੱਟ ਕੀਤੇ ਵਰਤਮਾਨ ਮੁੱਲ ਹਨ।",
    criticalAlerts: "ਗੰਭੀਰ ਅਲਰਟ",
    noCritical: "ਫਿਲਹਾਲ ਕੋਈ ਗੰਭੀਰ ਅਲਰਟ ਨਹੀਂ ਹੈ।",
    watching: "ਨਿਗਰਾਨੀ ਹੇਠ",
    noWatching: "ਦੇਖਣ ਲਈ ਕੋਈ ਆਈਟਮ ਨਹੀਂ ਹੈ।",
    neededUrgently: "ਲੀਟਰ ਤੁਰੰਤ ਲੋੜੀਂਦਾ",
    weatherTitle: "ਵਰਤਮਾਨ ਮੌਸਮ",
    liveData: "Open-Meteo ਤੋਂ ਲਾਈਵ ਡਾਟਾ",
    weatherStats: { temp: "ਤਾਪਮਾਨ", current: "ਵਰਤਮਾਨ", humidity: "ਨਮੀ", wind: "ਹਵਾ ਦੀ ਗਤੀ", precip: "ਮੀਂਹ", lastHour: "ਪਿਛਲਾ ਘੰਟਾ" },
    forecast: "7-ਦਿਨਾਂ ਦਾ ਮੌਸਮ ਪੂਰਵ-ਅਨੁਮਾਨ",
    weatherTable: { date: "ਮਿਤੀ", max: "ਵੱਧ ਤੋਂ ਵੱਧ ਤਾਪਮਾਨ", min: "ਘੱਟ ਤੋਂ ਘੱਟ ਤਾਪਮਾਨ", rain: "ਮੀਂਹ" },
    trendTitle: "ਪਾਣੀ ਵਰਤੋਂ ਦਾ ਰੁਝਾਨ",
    trendNote: "ਜਦੋਂ ਵੀ ਤੁਸੀਂ \"ਰਿਫ੍ਰੈਸ਼\" ਦਬਾਉਂਦੇ ਹੋ ਇਹ ਅੱਪਡੇਟ ਹੁੰਦਾ ਹੈ।",
    trendHint: "ਰੁਝਾਨ ਦੇਖਣ ਲਈ \"ਰਿਫ੍ਰੈਸ਼\" ਦਬਾਓ।",
    waterByField: "ਖੇਤ ਅਨੁਸਾਰ ਪਾਣੀ ਦੀ ਲੋੜ",
    settingsTitle: "ਸੈਟਿੰਗਾਂ",
    apiUrlLabel: "ਬੈਕਐਂਡ API URL",
    apiUrlNote: "ਜਦੋਂ ਵੀ ਤੁਹਾਡਾ Colab ngrok ਲਿੰਕ ਬਦਲੇ, ਇਸਨੂੰ ਅੱਪਡੇਟ ਕਰੋ।",
    crops: { wheat: "ਕਣਕ", rice: "ਝੋਨਾ (ਚੌਲ)", sugarcane: "ਗੰਨਾ", cotton: "ਨਰਮਾ/ਕਪਾਹ", maize: "ਮੱਕੀ" },
    soils: { loamy: "ਮੈਰਾ ਮਿੱਟੀ", clay: "ਚੀਕਣੀ ਮਿੱਟੀ", sandy: "ਰੇਤਲੀ ਮਿੱਟੀ", silty: "ਗਾਰ ਵਾਲੀ ਮਿੱਟੀ" },
    seasons: { summer: "ਗਰਮੀ", monsoon: "ਝੜੀ/ਮਾਨਸੂਨ", winter: "ਸਰਦੀ" },
    stages: { sowing: "ਬਿਜਾਈ", growing: "ਵਾਧਾ", flowering: "ਫੁੱਲ ਆਉਣਾ", harvest: "ਵਾਢੀ" },
    irrigTypes: { drip: "ਡ੍ਰਿਪ ਸਿੰਚਾਈ", sprinkler: "ਫੁਹਾਰਾ ਸਿੰਚਾਈ", flood: "ਖਾਲੀ/ਨਹਿਰੀ ਸਿੰਚਾਈ" },
    waterSources: { borewell: "ਟਿਊਬਵੈੱਲ/ਬੋਰਵੈੱਲ", canal: "ਨਹਿਰ ਦਾ ਪਾਣੀ", river: "ਦਰਿਆ" },
    yesNo: { no: "ਨਹੀਂ", yes: "ਹਾਂ" },
    landing: {
      heroBadge: "🌱 ਸਮਾਰਟ ਖੇਤੀਬਾੜੀ AI",
      heroTitle: "ਸਟੀਕ ਸਿੰਚਾਈ ਪਾਣੀ ਦੀ ਲੋੜ ਕੈਲਕੁਲੇਟਰ",
      heroSubtitle: "ਲੀਟਰਾਂ ਵਿੱਚ ਅਨੁਮਾਨਿਤ ਪਾਣੀ ਦੀ ਲੋੜ ਅਤੇ ਸਮਾਂ-ਸਾਰਣੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣੇ ਖੇਤ ਦੇ ਪੈਰਾਮੀਟਰ ਦਰਜ ਕਰੋ।",
      calculateBtn: "⚡ ਪਾਣੀ ਦੀ ਲੋੜ ਦੀ ਗਣਨਾ ਕਰੋ",
      recommendedVolume: "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਪਾਣੀ ਦੀ ਮਾਤਰਾ",
      totalWaterForField: "ਖੇਤ ਲਈ ਲੋੜੀਂਦਾ ਕੁੱਲ ਪਾਣੀ",
      suggestedSchedule: "ਸੁਝਾਈ ਗਈ ਸਮਾਂ-ਸਾਰਣੀ",
      dispatcherTitle: "ਤੁਰੰਤ ਨੋਟੀਫਿਕੇਸ਼ਨ ਅਲਰਟ (ਮੋਬਾਈਲ SMS ਅਤੇ ਜੀਮੇਲ)",
      phoneLabel: "ਕਿਸਾਨ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ",
      emailLabel: "ਕਿਸਾਨ ਦਾ ਜੀਮੇਲ / ਈਮੇਲ ਪਤਾ",
      sendSmsBtn: "📲 ਮੋਬਾਈਲ SMS ਐਪ ਖੋਲ੍ਹੋ",
      sendWhatsAppBtn: "💬 ਵਟਸਐਪ ਅਲਰਟ ਭੇਜੋ",
      sendGmailBtn: "📧 ਜੀਮੇਲ ਡਰਾਫਟ ਖੋਲ੍ਹੋ",
      sendBothBtn: "🚀 ਸਾਰੇ ਅਲਰਟ ਭੇਜੋ (SMS + Gmail)",
      viewDashboard: "📌 ਪੂਰਾ ਡੈਸ਼ਬੋਰਡ ਦੇਖੋ",
      featuresTitle: "ਸਮਾਰਟ ਕਿਸਾਨ ਐਗਰੋਸੈਂਸ 'ਤੇ ਵਿਸ਼ਵਾਸ ਕਿਉਂ ਕਰਦੇ ਹਨ",
      featuresSub: "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਡਾਟਾ-ਅਧਾਰਿਤ ਸਿੰਚਾਈ ਤਕਨਾਲੋਜੀ ਨਾਲ ਸਮਰੱਥ ਬਣਾਉਣਾ",
      feature1Title: "AI ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਮਾਡਲ",
      feature1Sub: "ਅਸਲ ਮਿੱਟੀ, ਨਮੀ, ਫਸਲ ਅਤੇ ਜਲਵਾਯੂ ਡਾਟਾ 'ਤੇ ਸਿਖਲਾਈ ਪ੍ਰਾਪਤ।",
      feature2Title: "ਲਾਈਵ ਖੇਤ ਸਿੰਕ",
      feature2Sub: "ਸਾਰੇ ਬਦਲਾਅ ਡੈਸ਼ਬੋਰਡ ਅਤੇ ਯੋਜਨਾਵਾਂ ਵਿੱਚ ਤੁਰੰਤ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।",
      feature3Title: "SMS ਅਤੇ ਜੀਮੇਲ ਅਲਰਟ",
      feature3Sub: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਮੋਬਾਈਲ SMS ਅਤੇ ਜੀਮੇਲ 'ਤੇ ਮਹੱਤਵਪੂਰਨ ਪਾਣੀ ਦੇ ਅਲਰਟ ਪ੍ਰਾਪਤ ਕਰੋ।",
      feature4Title: "ਪਾਣੀ ਦੀ ਬਚਤ",
      feature4Sub: "ਕੇਵਲ ਲੋੜ ਸਮੇਂ ਸਿੰਚਾਈ ਕਰਕੇ 40% ਤੱਕ ਧਰਤੀ ਹੇਠਲਾ ਪਾਣੀ ਬਚਾਓ।",
    },
    auth: {
      login: "ਕਿਸਾਨ ਲੌਗਇਨ",
      signup: "ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
      loginSubtitle: "ਆਪਣੇ ਖੇਤ ਦੀ ਸਿੰਚਾਈ ਅਤੇ ਅਲਰਟ ਤੱਕ ਪਹੁੰਚੋ",
      signupSubtitle: "10,000+ ਸਮਾਰਟ ਕਿਸਾਨਾਂ ਨਾਲ ਜੁੜੋ",
      phone: "ਮੋਬਾਈਲ ਨੰਬਰ",
      email: "ਜੀਮੇਲ / ਈਮੇਲ ਪਤਾ",
      password: "ਪਾਸਵਰਡ",
      fullName: "ਪੂਰਾ ਨਾਮ",
      location: "ਖੇਤ ਦਾ ਸਥਾਨ (ਪਿੰਡ / ਜ਼ਿਲ੍ਹਾ)",
      primaryCrop: "ਮੁੱਖ ਫਸਲ",
      farmArea: "ਕੁੱਲ ਖੇਤ ਦਾ ਖੇਤਰਫਲ (ਹੈਕਟੇਅਰ)",
      submitLogin: "ਪੋਰਟਲ ਵਿੱਚ ਲੌਗਇਨ ਕਰੋ",
      submitSignup: "ਕਿਸਾਨ ਖਾਤਾ ਬਣਾਓ",
      demoAccount: "⚡ ਤੁਰੰਤ ਡੈਮੋ ਕਿਸਾਨ ਲੌਗਇਨ",
      verified: "ਸਤਿਆਪਿਤ ਸਮਾਰਟ ਕਿਸਾਨ",
      logout: "ਲੌਗ ਆਉਟ ਕਰੋ",
      profile: "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਸੈਟਿੰਗਾਂ",
      notLoggedIn: "ਗੇਸਟ ਮੋਡ ਵਿੱਚ ਹੋ",
      accountCreated: "ਕਿਸਾਨ ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ!",
      loginSuccess: "ਵਾਪਸੀ 'ਤੇ ਜੀ ਆਇਆਂ ਨੂੰ!",
    },
    notifications: {
      title: "ਖੇਤ ਅਲਰਟ ਅਤੇ ਨੋਟੀਫਿਕੇਸ਼ਨ",
      unread: "ਅਣਪੜ੍ਹੇ",
      markAllRead: "ਸਾਰੇ ਪੜ੍ਹੇ ਹੋਏ ਨਿਸ਼ਾਨਬੱਧ ਕਰੋ",
      clearAll: "ਸਾਰੇ ਸਾਫ਼ ਕਰੋ",
      testAlert: "🔔 ਲਾਈਵ ਅਲਰਟ ਟੈਸਟ ਕਰੋ",
      noNotifications: "ਫਿਲਹਾਲ ਕੋਈ ਨਵੇਂ ਨੋਟੀਫਿਕੇਸ਼ਨ ਨਹੀਂ ਹਨ।",
      pushTitle: "ਬ੍ਰਾਊਜ਼ਰ ਨੋਟੀਫਿਕੇਸ਼ਨ",
      pushSub: "ਸਿੱਧੇ ਆਪਣੇ ਬ੍ਰਾਊਜ਼ਰ 'ਤੇ ਰੀਅਲ-ਟਾਈਮ ਅਲਰਟ ਪ੍ਰਾਪਤ ਕਰੋ",
      smsTitle: "SMS ਪਾਣੀ ਅਲਰਟ",
      smsSub: "ਮਿੱਟੀ ਦੀ ਨਮੀ ਘਟਣ 'ਤੇ SMS ਪ੍ਰਾਪਤ ਕਰੋ",
      thresholdTitle: "ਘੱਟ ਨਮੀ ਅਲਰਟ ਸੀਮਾ",
      weatherAlertTitle: "ਮੀਂਹ ਦੀ ਚੇਤਾਵਨੀ",
      weatherAlertSub: "ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ 'ਤੇ ਸਿੰਚਾਈ ਮੁਲਤਵੀ ਕਰਨ ਦੀ ਸੂਚਨਾ ਦਿਓ",
      testSent: "ਟੈਸਟ ਅਲਰਟ ਭੇਜਿਆ ਗਿਆ!",
    },
  },
};
