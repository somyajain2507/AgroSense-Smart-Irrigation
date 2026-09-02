"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FarmerAuthModal, { FarmerUser } from "./components/FarmerAuthModal";
import NotificationsModal, { NotificationItem } from "./components/NotificationsModal";
import { translations, LangKey } from "./dashboard/translations";

const API_URL = "https://filled-preteen-census.ngrok-free.dev";

const statusColor: Record<string, string> = {
  low: "bg-red-500 text-white",
  medium: "bg-amber-500 text-white",
  good: "bg-emerald-500 text-white",
};

const cropOptions = [
  { key: "wheat", value: 1 },
  { key: "rice", value: 2 },
  { key: "sugarcane", value: 3 },
  { key: "cotton", value: 4 },
  { key: "maize", value: 5 },
];
const soilOptions = [
  { key: "loamy", value: 1 },
  { key: "clay", value: 2 },
  { key: "sandy", value: 3 },
  { key: "silty", value: 4 },
];
const seasonOptions = [
  { key: "summer", value: 1 },
  { key: "monsoon", value: 2 },
  { key: "winter", value: 3 },
];
const growthStageOptions = [
  { key: "sowing", value: 1 },
  { key: "growing", value: 2 },
  { key: "flowering", value: 3 },
  { key: "harvest", value: 4 },
];
const irrigationTypeOptions = [
  { key: "drip", value: 1 },
  { key: "sprinkler", value: 2 },
  { key: "flood", value: 3 },
];
const waterSourceOptions = [
  { key: "borewell", value: 1 },
  { key: "canal", value: 2 },
  { key: "river", value: 3 },
];

function moistureLevel(soilMoisture: number) {
  if (soilMoisture < 25) return "low";
  if (soilMoisture < 45) return "medium";
  return "good";
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "🚨 Low Soil Moisture Warning",
    message: "Zone E moisture dropped to 22%. Drip irrigation advised immediately.",
    time: "10 mins ago",
    type: "critical",
    read: false,
  },
  {
    id: "2",
    title: "🌧️ Rain Forecast Warning",
    message: "85% rain expected tomorrow afternoon. Delay heavy watering.",
    time: "1 hour ago",
    type: "weather",
    read: false,
  },
  {
    id: "3",
    title: "💧 Daily Schedule Ready",
    message: "North Block scheduled for 4,200 L at 6:00 AM.",
    time: "3 hours ago",
    type: "schedule",
    read: false,
  },
];

export default function Home() {
  const [lang, setLang] = useState<LangKey>("en");
  const t = translations[lang];

  // Auth & Notifications state
  const [user, setUser] = useState<FarmerUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [targetPhone, setTargetPhone] = useState("+91 98765 43210");
  const [targetEmail, setTargetEmail] = useState("farmer.ramesh@gmail.com");
  const [smsSentStatus, setSmsSentStatus] = useState<string | null>(null);

  const [form, setForm] = useState({
    Crop_Type: 1,
    Soil_Type: 1,
    Season: 1,
    Crop_Growth_Stage: 1,
    Irrigation_Type: 1,
    Water_Source: 1,
    Soil_pH: 6.5,
    Soil_Moisture: 35,
    Temperature_C: 30,
    Humidity: 60,
    Rainfall_mm: 5,
    Sunlight_Hours: 8,
    Wind_Speed_kmh: 10,
    Field_Area_hectare: 2,
    Mulching_Used: 0,
    Previous_Irrigation_mm: 15,
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check saved user session
    const saved = localStorage.getItem("farmer_user");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser(parsed);
        if (parsed.phone) setTargetPhone(parsed.phone);
        if (parsed.email) setTargetEmail(parsed.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  function handleChange(key: string, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    const payload = {
      Soil_Type: Number(form.Soil_Type),
      Soil_pH: Number(form.Soil_pH),
      Soil_Moisture: Number(form.Soil_Moisture),
      Temperature_C: Number(form.Temperature_C),
      Humidity: Number(form.Humidity),
      Rainfall_mm: Number(form.Rainfall_mm),
      Sunlight_Hours: Number(form.Sunlight_Hours),
      Wind_Speed_kmh: Number(form.Wind_Speed_kmh),
      Crop_Type: Number(form.Crop_Type),
      Crop_Growth_Stage: Number(form.Crop_Growth_Stage),
      Season: Number(form.Season),
      Irrigation_Type: Number(form.Irrigation_Type),
      Water_Source: Number(form.Water_Source),
      Field_Area_hectare: Number(form.Field_Area_hectare),
      Mulching_Used: Number(form.Mulching_Used),
      Previous_Irrigation_mm: Number(form.Previous_Irrigation_mm),
    };

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult({
        liters: Math.round(data.predicted_water_liters),
        schedule: data.irrigation_schedule,
        moisture: moistureLevel(payload.Soil_Moisture),
      });
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-emerald-500/20 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30">
            🌱
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              AgroSense
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
              Smart Water AI
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#calculator" className="hover:text-emerald-400 transition">
            {t.nav.calculator}
          </a>
          <Link href="/dashboard" className="hover:text-emerald-400 transition flex items-center gap-1">
            <span>📊</span> {t.nav.dashboard}
          </Link>
          <a href="#features" className="hover:text-emerald-400 transition">
            {t.nav.features}
          </a>
        </div>

        {/* Controls: Language, Notifications & Auth */}
        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            {(["en", "hi", "kn"] as LangKey[]).map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  lang === code ? "bg-emerald-600 text-white shadow" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {code === "en" ? "EN" : code === "hi" ? "हिं" : "ಕನ್"}
              </button>
            ))}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative bg-slate-800 hover:bg-slate-700 text-slate-200 p-2.5 rounded-xl border border-slate-700 transition"
            title="Notifications & Alerts"
          >
            <span className="text-lg">🔔</span>
            {unreadNotifCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {unreadNotifCount}
              </span>
            )}
          </button>

          {/* Farmer Auth / Profile Button */}
          {user && user.isLoggedIn ? (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow border border-emerald-400/30 hover:brightness-110 transition"
            >
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">👨‍🌾</span>
              <span className="max-w-[100px] truncate">{user.name}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="vibrant-btn text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:brightness-110 transition flex items-center gap-1.5"
            >
              <span>🔑</span>
              <span>{t.nav.login}</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 lg:px-8 text-center bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-300 glow-badge animate-pulse-subtle">
            <span>✨</span> {t.landing?.heroBadge || "🌱 Smart Agriculture AI"}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t.landing?.heroTitle || "Smart Crop Irrigation Water Requirement Calculator"}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            {t.landing?.heroSubtitle || t.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#calculator"
              className="vibrant-btn text-white px-7 py-3.5 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-2"
            >
              <span>💧</span> {t.landing?.calculateBtn || "Calculate Water Need"}
            </a>
            <Link
              href="/dashboard"
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm shadow flex items-center gap-2 transition"
            >
              <span>📊</span> {t.nav?.dashboard || "Dashboard"}
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 max-w-3xl mx-auto text-left">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-emerald-400">120K+ L</div>
              <div className="text-xs text-slate-400 mt-0.5">Water Saved Daily</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-teal-400">98.4%</div>
              <div className="text-xs text-slate-400 mt-0.5">Model Calculation Accuracy</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-amber-400">3 Lang</div>
              <div className="text-xs text-slate-400 mt-0.5">EN / हिन्दी / ಕನ್ನಡ</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-emerald-300">24/7</div>
              <div className="text-xs text-slate-400 mt-0.5">Real-time Soil Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator */}
      <section id="calculator" className="py-12 px-4 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-emerald-100">
          <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 p-6 sm:p-8 text-white flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider bg-black/20 text-emerald-200 px-3 py-1 rounded-full font-bold">
                {t.appName} AI Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-2">{t.landing?.heroTitle || "Precision Water Calculator"}</h2>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">{t.landing?.heroSubtitle}</p>
            </div>
            {user && (
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs border border-white/20">
                <span className="text-emerald-200 block text-[10px]">Logged in as</span>
                <span className="font-bold">{user.name} ({user.crop})</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Crop Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.crop}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Crop_Type}
                  onChange={(e) => handleChange("Crop_Type", Number(e.target.value))}
                >
                  {cropOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.crops[o.key as keyof typeof t.crops]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.soilType}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Soil_Type}
                  onChange={(e) => handleChange("Soil_Type", Number(e.target.value))}
                >
                  {soilOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.soils[o.key as keyof typeof t.soils]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Season */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.season}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Season}
                  onChange={(e) => handleChange("Season", Number(e.target.value))}
                >
                  {seasonOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.seasons[o.key as keyof typeof t.seasons]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Growth Stage */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.growthStage}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Crop_Growth_Stage}
                  onChange={(e) => handleChange("Crop_Growth_Stage", Number(e.target.value))}
                >
                  {growthStageOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.stages[o.key as keyof typeof t.stages]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Irrigation Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.irrigationType}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Irrigation_Type}
                  onChange={(e) => handleChange("Irrigation_Type", Number(e.target.value))}
                >
                  {irrigationTypeOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.irrigTypes[o.key as keyof typeof t.irrigTypes]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Water Source */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                  {t.waterSource}
                </label>
                <select
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50 font-medium"
                  value={form.Water_Source}
                  onChange={(e) => handleChange("Water_Source", Number(e.target.value))}
                >
                  {waterSourceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t.waterSources[o.key as keyof typeof t.waterSources]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sliders & Numeric Input Grid */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span>⚙️</span> Environmental & Field Conditions
                </span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Live Parameters
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Soil Moisture Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">{t.soilMoisture}</span>
                    <span className={`px-2 py-0.5 rounded font-extrabold ${form.Soil_Moisture < 25 ? "bg-red-100 text-red-700" : form.Soil_Moisture < 45 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {form.Soil_Moisture}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={form.Soil_Moisture}
                    onChange={(e) => handleChange("Soil_Moisture", Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">{t.temperature}</span>
                    <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">
                      {form.Temperature_C}°C
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={form.Temperature_C}
                    onChange={(e) => handleChange("Temperature_C", Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                {/* Field Area Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">{t.fieldArea}</span>
                    <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">
                      {form.Field_Area_hectare} ha
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="20"
                    step="0.5"
                    value={form.Field_Area_hectare}
                    onChange={(e) => handleChange("Field_Area_hectare", Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>

                {/* Rainfall Input */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">Rainfall (mm)</span>
                    <span className="text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded">
                      {form.Rainfall_mm} mm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={form.Rainfall_mm}
                    onChange={(e) => handleChange("Rainfall_mm", Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full vibrant-btn text-white py-4 rounded-2xl font-black text-base shadow-xl hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="animate-spin text-xl">⏳</span>
                  <span>{t.loading}</span>
                </>
              ) : (
                <>
                  <span>🌊</span>
                  <span>{t.submit}</span>
                </>
              )}
            </button>
          </form>

          {/* Error display */}
          {error && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Results Output Section */}
          {result && (
            <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 border-t border-emerald-500/30 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    ML Prediction Output
                  </span>
                  <h3 className="text-2xl font-black mt-2">Recommended Water Volume</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusColor[result.moisture]}`}>
                  Moisture: {result.moisture}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="text-4xl sm:text-5xl font-black text-emerald-300 tracking-tight">
                    {result.liters.toLocaleString()}{" "}
                    <span className="text-xl sm:text-2xl text-emerald-100 font-normal">Liters</span>
                  </div>
                  <p className="text-emerald-200 text-xs mt-1">Total water needed for {form.Field_Area_hectare} hectares field area</p>
                </div>

                <div className="bg-black/30 p-4 rounded-xl text-center min-w-[160px] border border-white/10">
                  <div className="text-[10px] text-emerald-300 font-semibold uppercase">Suggested Schedule</div>
                  <div className="text-sm font-bold text-amber-300 mt-0.5">
                    {result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM"}
                  </div>
                </div>
              </div>

              {/* Dual Contact Notification Dispatcher (Phone SMS + WhatsApp + Gmail Email) */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>🔔</span> {t.landing?.dispatcherTitle || "Instant Notification Alert Dispatcher (Mobile SMS & Gmail)"}
                  </span>
                  {user && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/20 font-bold">
                      {t.auth?.verified || "Logged in"}: {user.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Phone Number Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                      📱 {t.landing?.phoneLabel || "Farmer Mobile Phone Number"}
                    </label>
                    <input
                      type="tel"
                      value={targetPhone}
                      onChange={(e) => setTargetPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-black/40 border border-emerald-500/30 text-white placeholder-slate-400 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-emerald-400 outline-none font-medium"
                    />
                  </div>

                  {/* Gmail Address Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-emerald-200 mb-1">
                      📧 {t.landing?.emailLabel || "Farmer Gmail / Email Address"}
                    </label>
                    <input
                      type="email"
                      value={targetEmail}
                      onChange={(e) => setTargetEmail(e.target.value)}
                      placeholder="farmer.ramesh@gmail.com"
                      className="w-full bg-black/40 border border-emerald-500/30 text-white placeholder-slate-400 rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-emerald-400 outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Dispatch Trigger Buttons */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {/* 1. Mobile SMS App */}
                  <button
                    type="button"
                    onClick={() => {
                      const cropNameKey = cropOptions.find((c) => c.value === Number(form.Crop_Type))?.key || "wheat";
                      const cropLabel = t.crops[cropNameKey as keyof typeof t.crops] || "Crop";
                      const slot = result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM";
                      const cleanPhone = targetPhone.replace(/[^0-9+]/g, "");

                      const smsContent = `AgroSense Alert: ${cropLabel} (${form.Field_Area_hectare} ha) requires ${result.liters.toLocaleString()} Liters water at ${slot}. Moisture=${form.Soil_Moisture}%.`;

                      const newNotif: NotificationItem = {
                        id: Date.now().toString(),
                        title: `📱 SMS -> ${targetPhone}`,
                        message: smsContent,
                        time: "Just now",
                        type: "schedule",
                        read: false,
                      };

                      setNotifications((prev) => [newNotif, ...prev]);
                      setSmsSentStatus(`📲 Opening Phone SMS app with message to ${targetPhone}...`);

                      // Open Native SMS App on Device
                      window.open(`sms:${cleanPhone}?body=${encodeURIComponent(smsContent)}`, "_blank");

                      setTimeout(() => setSmsSentStatus(null), 5000);
                    }}
                    className="vibrant-btn text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <span>📲</span> {t.landing?.sendSmsBtn || "Open Mobile SMS App"}
                  </button>

                  {/* 2. WhatsApp Alert */}
                  <button
                    type="button"
                    onClick={() => {
                      const cropNameKey = cropOptions.find((c) => c.value === Number(form.Crop_Type))?.key || "wheat";
                      const cropLabel = t.crops[cropNameKey as keyof typeof t.crops] || "Crop";
                      const slot = result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM";
                      const cleanPhone = targetPhone.replace(/[^0-9]/g, "");

                      const waContent = `🌱 *AgroSense Smart Water Alert*\n\n🌾 *Crop:* ${cropLabel} (${form.Field_Area_hectare} ha)\n💧 *Water Needed:* ${result.liters.toLocaleString()} Liters\n🕒 *Schedule Slot:* ${slot}\n📊 *Soil Moisture:* ${form.Soil_Moisture}%\n\nIrrigate on time to optimize yield!`;

                      const newNotif: NotificationItem = {
                        id: Date.now().toString(),
                        title: `💬 WhatsApp -> ${targetPhone}`,
                        message: `WhatsApp Alert sent to ${targetPhone} for ${cropLabel} (${result.liters.toLocaleString()} L).`,
                        time: "Just now",
                        type: "schedule",
                        read: false,
                      };

                      setNotifications((prev) => [newNotif, ...prev]);
                      setSmsSentStatus(`💬 Opening WhatsApp to dispatch alert to ${targetPhone}...`);

                      // Open WhatsApp Direct
                      window.open(`https://wa.me/${cleanPhone.length <= 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(waContent)}`, "_blank");

                      setTimeout(() => setSmsSentStatus(null), 5000);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                  >
                    <span>💬</span> {t.landing?.sendWhatsAppBtn || "Send via WhatsApp"}
                  </button>

                  {/* 3. Gmail App / Web */}
                  <button
                    type="button"
                    onClick={() => {
                      const cropNameKey = cropOptions.find((c) => c.value === Number(form.Crop_Type))?.key || "wheat";
                      const cropLabel = t.crops[cropNameKey as keyof typeof t.crops] || "Crop";
                      const slot = result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM";

                      const subject = `AgroSense Smart Irrigation Report for ${user?.name || "Farmer"}`;
                      const emailBody = `Hi ${user?.name || "Farmer"},\n\nHere is your real-time AgroSense ML Water Prediction:\n\n- Crop: ${cropLabel}\n- Farm Area: ${form.Field_Area_hectare} hectares\n- Recommended Water Volume: ${result.liters.toLocaleString()} Liters\n- Optimal Time Slot: ${slot}\n- Soil Moisture: ${form.Soil_Moisture}%\n- Temperature: ${form.Temperature_C}°C\n\nHappy Farming,\nAgroSense Intelligence Team`;

                      const newNotif: NotificationItem = {
                        id: (Date.now() + 1).toString(),
                        title: `📧 Gmail Sent -> ${targetEmail}`,
                        message: `Gmail draft opened for ${targetEmail}: ${result.liters.toLocaleString()} L for ${cropLabel}.`,
                        time: "Just now",
                        type: "system",
                        read: false,
                      };

                      setNotifications((prev) => [newNotif, ...prev]);
                      setSmsSentStatus(`📧 Opening Gmail compose tab for ${targetEmail}...`);

                      // Open Gmail Compose directly
                      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`, "_blank");

                      setTimeout(() => setSmsSentStatus(null), 5000);
                    }}
                    className="vibrant-btn-amber text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <span>📧</span> {t.landing?.sendGmailBtn || "Open Gmail Draft"}
                  </button>

                  {/* 4. Dual Dispatch All */}
                  <button
                    type="button"
                    onClick={() => {
                      const cropNameKey = cropOptions.find((c) => c.value === Number(form.Crop_Type))?.key || "wheat";
                      const cropLabel = t.crops[cropNameKey as keyof typeof t.crops] || "Crop";
                      const slot = result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM";

                      const smsNotif: NotificationItem = {
                        id: Date.now().toString(),
                        title: `📱 SMS -> ${targetPhone}`,
                        message: `SMS Dispatch: ${result.liters.toLocaleString()} Liters needed for ${cropLabel} (${form.Field_Area_hectare} ha) at ${slot}.`,
                        time: "Just now",
                        type: "schedule",
                        read: false,
                      };

                      const emailNotif: NotificationItem = {
                        id: (Date.now() + 1).toString(),
                        title: `📧 Gmail -> ${targetEmail}`,
                        message: `Gmail Dispatch: Irrigation report sent to ${targetEmail} for ${cropLabel} (${result.liters.toLocaleString()} L).`,
                        time: "Just now",
                        type: "system",
                        read: false,
                      };

                      setNotifications((prev) => [smsNotif, emailNotif, ...prev]);
                      setSmsSentStatus(`🚀 Multi-Channel Alert (SMS, WhatsApp, Gmail) dispatched to ${targetPhone} & ${targetEmail}!`);

                      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                        new Notification("AgroSense Multi-Channel Dispatch", {
                          body: `Alert dispatched to ${targetPhone} and ${targetEmail}.`,
                        });
                      }

                      setTimeout(() => setSmsSentStatus(null), 6000);
                    }}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md hover:brightness-110 transition flex items-center gap-1.5"
                  >
                    <span>🚀</span> {t.landing?.sendBothBtn || "Dispatch All (SMS + Gmail + WhatsApp)"}
                  </button>
                </div>

                {smsSentStatus && (
                  <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 rounded-xl text-xs font-bold text-center animate-pulse">
                    {smsSentStatus}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dashboard"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-1.5"
                >
                  <span>📌</span> View in Full Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const cropNameKey = cropOptions.find((c) => c.value === Number(form.Crop_Type))?.key || "wheat";
                    const cropLabel = t.crops[cropNameKey as keyof typeof t.crops] || "Crop";
                    const slot = result.schedule?.[0]?.time_slot || "06:00 AM - 08:00 AM";

                    const notifText = `🌊 Irrigation Recommendation for ${cropLabel} (${form.Field_Area_hectare} ha): Requires ${result.liters.toLocaleString()} Liters at slot ${slot}. Soil Moisture is ${result.moisture.toUpperCase()} (${form.Soil_Moisture}%).`;

                    const newNotif: NotificationItem = {
                      id: Date.now().toString(),
                      title: `🌊 ${cropLabel} Water Recommendation`,
                      message: notifText,
                      time: "Just now",
                      type: "schedule",
                      read: false,
                    };
                    setNotifications((prev) => [newNotif, ...prev]);
                    setIsNotifOpen(true);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-5 py-2.5 rounded-xl text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <span>🔔</span> View In Notifications ({unreadNotifCount + 1})
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-white">{t.landing?.featuresTitle || "Why Smart Farmers Trust AgroSense"}</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">{t.landing?.featuresSub || "Empowering Indian farmers with data-driven irrigation intelligence"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="dark-glass-card p-6 rounded-3xl space-y-3 border border-emerald-500/20 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
              ⚡
            </div>
            <h3 className="text-lg font-bold text-white">{t.landing?.feature1Title || "Real-Time ML Predictions"}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.landing?.feature1Sub || "Trained on real soil, moisture, crop & climate datasets."}
            </p>
          </div>

          <div className="dark-glass-card p-6 rounded-3xl space-y-3 border border-teal-500/20 hover:border-teal-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center text-2xl font-bold">
              🔔
            </div>
            <h3 className="text-lg font-bold text-white">{t.landing?.feature3Title || "Dual SMS & Gmail Alerts"}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.landing?.feature3Sub || "Receive critical water alerts on phone SMS & Gmail in your language."}
            </p>
          </div>

          <div className="dark-glass-card p-6 rounded-3xl space-y-3 border border-amber-500/20 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
              🌐
            </div>
            <h3 className="text-lg font-bold text-white">{t.landing?.feature4Title || "Water Conservation"}</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.landing?.feature4Sub || "Save up to 40% groundwater by irrigating only when crops actually need it."}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🌱</span>
            <span className="font-bold text-slate-300">AgroSense Smart Irrigation</span>
          </div>
          <div>© {new Date().getFullYear()} Precision Agriculture Intelligence. All rights reserved.</div>
        </div>
      </footer>

      {/* Auth Modal */}
      <FarmerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
        t={t}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
        t={t}
      />
    </div>
  );
}
