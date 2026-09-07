"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FarmerAuthModal, { FarmerUser } from "../components/FarmerAuthModal";
import NotificationsModal, { NotificationItem } from "../components/NotificationsModal";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const API_URL = "/api";

const WEATHER_LAT = 28.7180;
const WEATHER_LON = 77.1680;
const WEATHER_LOCATION_NAME = "Mahendra Park, Delhi";

import { translations, languageOptions, type LangKey } from "./translations";

// ============================================================
// Sample fields
// ============================================================
const initialFields = [
  { name: "North Farm Block", zone: "Zone A", crop: "Wheat", Crop_Type: 1, Soil_Type: 1, Season: 1, Crop_Growth_Stage: 2, Irrigation_Type: 1, Water_Source: 1, Soil_pH: 6.5, Soil_Moisture: 48, Temperature_C: 28, Humidity: 55, Rainfall_mm: 4, Sunlight_Hours: 8, Wind_Speed_kmh: 10, Field_Area_hectare: 2, Mulching_Used: 0, Previous_Irrigation_mm: 12 },
  { name: "South Farm Block", zone: "Zone B", crop: "Rice", Crop_Type: 2, Soil_Type: 2, Season: 2, Crop_Growth_Stage: 1, Irrigation_Type: 2, Water_Source: 2, Soil_pH: 6.8, Soil_Moisture: 36, Temperature_C: 30, Humidity: 65, Rainfall_mm: 6, Sunlight_Hours: 7, Wind_Speed_kmh: 8, Field_Area_hectare: 3, Mulching_Used: 1, Previous_Irrigation_mm: 18 },
  { name: "East Greenhouse", zone: "Zone C", crop: "Cotton", Crop_Type: 4, Soil_Type: 3, Season: 1, Crop_Growth_Stage: 2, Irrigation_Type: 1, Water_Source: 1, Soil_pH: 6.2, Soil_Moisture: 29, Temperature_C: 34, Humidity: 40, Rainfall_mm: 1, Sunlight_Hours: 9, Wind_Speed_kmh: 14, Field_Area_hectare: 1.5, Mulching_Used: 0, Previous_Irrigation_mm: 8 },
  { name: "West Orchard", zone: "Zone D", crop: "Sugarcane", Crop_Type: 3, Soil_Type: 1, Season: 2, Crop_Growth_Stage: 3, Irrigation_Type: 3, Water_Source: 3, Soil_pH: 7.0, Soil_Moisture: 91, Temperature_C: 26, Humidity: 70, Rainfall_mm: 12, Sunlight_Hours: 6, Wind_Speed_kmh: 6, Field_Area_hectare: 4, Mulching_Used: 1, Previous_Irrigation_mm: 25 },
  { name: "Central Nursery", zone: "Zone E", crop: "Maize", Crop_Type: 5, Soil_Type: 4, Season: 1, Crop_Growth_Stage: 1, Irrigation_Type: 1, Water_Source: 1, Soil_pH: 6.4, Soil_Moisture: 22, Temperature_C: 37, Humidity: 35, Rainfall_mm: 0, Sunlight_Hours: 10, Wind_Speed_kmh: 16, Field_Area_hectare: 2.5, Mulching_Used: 0, Previous_Irrigation_mm: 5 },
];

function moistureStatus(m: number) {
  if (m < 25) return "low";
  if (m < 45) return "medium";
  return "good";
}

const statusColorClass: Record<string, string> = {
  OK: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
  Watching: "bg-blue-100 text-blue-700",
};

function recommendationFor(moisture: number) {
  if (moisture < 25) return { actionKey: "urgent", statusKey: "Overdue" };
  if (moisture < 35) return { actionKey: "soon", statusKey: "Pending" };
  if (moisture < 45) return { actionKey: "monitor", statusKey: "Watching" };
  return { actionKey: "none", statusKey: "OK" };
}

export default function Dashboard() {
  const [lang, setLang] = useState<LangKey>("en");
  const t = translations[lang];

  const [active, setActive] = useState("Dashboard");
  const [fields, setFields] = useState(initialFields);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  // Auth & Notification states
  const [user, setUser] = useState<FarmerUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: "1", title: "🚨 Low Moisture Alert", message: "Central Nursery (Zone E) is at 22% moisture.", time: "10 mins ago", type: "critical", read: false },
    { id: "2", title: "🌧️ Rain Forecast Warning", message: "Heavy rain expected tomorrow afternoon.", time: "1 hour ago", type: "weather", read: false },
  ]);

  async function fetchAllPredictions(targetFields = fields) {
    setLoading(true);
    setError("");
    try {
      const data = await Promise.all(
        targetFields.map(async (f: any) => {
          const { name, zone, crop, ...payload } = f;
          const res = await fetch(`${API_URL}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
            body: JSON.stringify(payload),
          });
          const json = await res.json();
          return {
            name, zone, crop,
            moisture: f.Soil_Moisture,
            temperature: f.Temperature_C,
            humidity: f.Humidity,
            rainfall: f.Rainfall_mm,
            sunlight: f.Sunlight_Hours,
            wind: f.Wind_Speed_kmh,
            predicted_liters: Math.round(json.predicted_water_liters || 0),
            schedule: json.irrigation_schedule || [],
          };
        })
      );
      setResults(data);
      const totalLiters = data.reduce((s, r) => s + r.predicted_liters, 0);
      const avgMoisture = Math.round(data.reduce((s, r) => s + r.moisture, 0) / data.length);
      const now = new Date();
      
      setHistory((prev) => {
        if (prev.length === 0) {
          const t1 = new Date(now.getTime() - 4 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const t2 = new Date(now.getTime() - 2 * 3600 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const t3 = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return [
            { time: t1, totalLiters: Math.round(totalLiters * 1.05), avgMoisture: Math.min(100, avgMoisture + 4) },
            { time: t2, totalLiters: Math.round(totalLiters * 0.98), avgMoisture: Math.max(10, avgMoisture - 2) },
            { time: t3, totalLiters, avgMoisture },
          ];
        }
        return [...prev, { time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), totalLiters, avgMoisture }];
      });
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  function handleUpdateFields(newFields: any[]) {
    setFields(newFields);
    if (typeof window !== "undefined") {
      localStorage.setItem("farmer_fields", JSON.stringify(newFields));
    }
    fetchAllPredictions(newFields);
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("farmer_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    const savedFields = localStorage.getItem("farmer_fields");
    if (savedFields) {
      try {
        const parsed = JSON.parse(savedFields);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFields(parsed);
          fetchAllPredictions(parsed);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    fetchAllPredictions(initialFields);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navKeyMap: Record<string, keyof typeof t.nav> = {
    Dashboard: "dashboard", "My Fields": "myFields", "Irrigation Plans": "plans",
    "Sensor Data": "sensors", Alerts: "alerts", Weather: "weather", Analytics: "analytics", Settings: "settings",
  };
  const navItems = Object.keys(navKeyMap);

  const fieldsMonitored = results.length;
  const totalWaterNeeded = results.reduce((sum, r) => sum + r.predicted_liters, 0);
  const activeAlerts = results.filter((r) => r.moisture < 25).length;
  const avgMoisture = results.length ? Math.round(results.reduce((sum, r) => sum + r.moisture, 0) / results.length) : 0;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans">
      {/* Vibrant Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-slate-100 border-r border-emerald-500/20 hidden md:flex flex-col">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-lg shadow-md shadow-emerald-500/30">
            🌱
          </div>
          <div>
            <Link href="/" className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent hover:opacity-90 transition block">
              {t.appName}
            </Link>
            <p className="text-[11px] text-slate-400">{t.appTagline}</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1.5">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                active === item
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400/30"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              }`}
            >
              <span>{t.nav[navKeyMap[item]]}</span>
              {item === "Alerts" && activeAlerts > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {activeAlerts}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800/80 bg-black/20 text-xs">
          <Link href="/" className="text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-2 transition">
            <span>🏠</span> Back to Calculator
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-black text-slate-900">{t.nav[navKeyMap[active]]}</h2>
            <p className="text-slate-500 text-xs">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              {languageOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    lang === opt.code ? "bg-emerald-700 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl border border-slate-200 transition"
              title="Notifications"
            >
              <span className="text-lg">🔔</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Farmer Auth Button */}
            {user && user.isLoggedIn ? (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-emerald-100 transition shadow-xs"
              >
                <span>👨‍🌾</span>
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="vibrant-btn text-white px-4 py-2 rounded-xl text-xs font-bold shadow transition"
              >
                Login / Signup
              </button>
            )}

            <button onClick={() => fetchAllPredictions()} className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl font-bold transition shadow">
              {t.refresh}
            </button>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {active !== "My Fields" && active !== "Weather" && active !== "Settings" && loading && (
            <p className="text-slate-500 text-xs font-semibold animate-pulse">{t.loading}</p>
          )}
          {active !== "My Fields" && active !== "Weather" && active !== "Settings" && error && (
            <p className="text-rose-600 text-xs font-bold">{error}</p>
          )}

          {!loading && !error && active === "Dashboard" && (
            <DashboardView t={t} results={results} fieldsMonitored={fieldsMonitored} totalWaterNeeded={totalWaterNeeded} activeAlerts={activeAlerts} avgMoisture={avgMoisture} />
          )}
          {active === "My Fields" && <MyFieldsView t={t} fields={fields} setFields={handleUpdateFields} />}
          {!loading && !error && active === "Irrigation Plans" && <IrrigationPlansView t={t} results={results} />}
          {!loading && !error && active === "Sensor Data" && <SensorDataView t={t} results={results} />}
          {!loading && !error && active === "Alerts" && <AlertsView t={t} results={results} />}
          {active === "Weather" && <WeatherView t={t} />}
          {!loading && !error && active === "Analytics" && <AnalyticsView t={t} history={history} results={results} />}
          {active === "Settings" && (
            <SettingsView
              t={t}
              user={user}
              setUser={setUser}
              setIsAuthOpen={setIsAuthOpen}
              setIsNotifOpen={setIsNotifOpen}
              setNotifications={setNotifications}
            />
          )}
        </main>
      </div>

      <FarmerAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(u) => setUser(u)}
        t={t}
      />

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

// ============================================================
// Dashboard tab
// ============================================================
function DashboardView({ t, results, fieldsMonitored, totalWaterNeeded, activeAlerts, avgMoisture }: any) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t.stats.fieldsMonitored} value={fieldsMonitored.toString()} sub={`${fieldsMonitored} ${t.stats.zonesActive}`} barColor="bg-blue-600" />
        <StatCard label={t.stats.totalWater} value={totalWaterNeeded.toLocaleString()} sub={t.stats.liveModel} barColor="bg-emerald-600" />
        <StatCard label={t.stats.activeAlerts} value={activeAlerts.toString()} sub={`${activeAlerts} ${t.stats.critical}`} barColor="bg-rose-500" subColor="text-rose-600" />
        <StatCard label={t.stats.avgMoisture} value={`${avgMoisture}%`} sub={t.stats.optimal} barColor="bg-amber-500" subColor="text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">{t.moistureByZone}</h3>
              <p className="text-xs text-slate-500">Live moisture level per active farm block</p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
              Live Stream
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={results}>
              <XAxis dataKey="zone" fontSize={12} stroke="#64748b" />
              <YAxis fontSize={12} stroke="#64748b" />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", color: "#fff", border: "none" }} />
              <Bar dataKey="moisture" radius={[8, 8, 0, 0]}>
                {results.map((entry: any, i: number) => (
                  <Cell key={i} fill={entry.moisture < 25 ? "#ef4444" : entry.moisture < 45 ? "#f59e0b" : "#10b981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900">{t.predictedNeed}</h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">{t.live}</span>
          </div>
          <div className="space-y-3.5 divide-y divide-slate-100">
            {results.map((r: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-xs pt-2.5 first:pt-0">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${r.moisture < 25 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
                  <div>
                    <span className="font-bold text-slate-800 block">{r.name}</span>
                    <span className="text-[10px] text-slate-400">{r.zone} • {r.crop}</span>
                  </div>
                </div>
                <span className="font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-xl">{r.predicted_liters.toLocaleString()} L</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium Recommendations Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden mt-6">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">{t.recentRecs}</h3>
            <p className="text-emerald-200 text-xs mt-0.5">Real-time schedule optimizer output across all fields</p>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            {results.length} Monitored Fields
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <th className="py-3.5 px-5 text-left">{t.table.field}</th>
                <th className="py-3.5 px-4 text-left">{t.table.zone}</th>
                <th className="py-3.5 px-4 text-left">{t.table.moisture}</th>
                <th className="py-3.5 px-4 text-left">{t.table.recommendation}</th>
                <th className="py-3.5 px-4 text-left">{t.table.nextSchedule}</th>
                <th className="py-3.5 px-5 text-left">{t.table.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((r: any, i: number) => {
                const rec = recommendationFor(r.moisture);
                return (
                  <tr key={i} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-800">{r.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-500">{r.zone}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${r.moisture < 25 ? "bg-rose-100 text-rose-700" : r.moisture < 45 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                        {r.moisture}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{t.actions[rec.actionKey]}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">{r.schedule?.[0]?.time_slot || "-"}</td>
                    <td className="py-3.5 px-5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${statusColorClass[rec.statusKey]}`}>
                        {t.status[rec.statusKey]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ============================================================
// My Fields tab
// ============================================================
function optionSets(t: any) {
  return {
    cropOptions: [
      { label: t.crops.wheat, value: 1 }, { label: t.crops.rice, value: 2 }, { label: t.crops.sugarcane, value: 3 },
      { label: t.crops.cotton, value: 4 }, { label: t.crops.maize, value: 5 },
    ],
    soilOptions: [
      { label: t.soils.loamy, value: 1 }, { label: t.soils.clay, value: 2 }, { label: t.soils.sandy, value: 3 }, { label: t.soils.silty, value: 4 },
    ],
    seasonOptions: [
      { label: t.seasons.summer, value: 1 }, { label: t.seasons.monsoon, value: 2 }, { label: t.seasons.winter, value: 3 },
    ],
    growthStageOptions: [
      { label: t.stages.sowing, value: 1 }, { label: t.stages.growing, value: 2 }, { label: t.stages.flowering, value: 3 }, { label: t.stages.harvest, value: 4 },
    ],
    irrigationTypeOptions: [
      { label: t.irrigTypes.drip, value: 1 }, { label: t.irrigTypes.sprinkler, value: 2 }, { label: t.irrigTypes.flood, value: 3 },
    ],
    waterSourceOptions: [
      { label: t.waterSources.borewell, value: 1 }, { label: t.waterSources.canal, value: 2 }, { label: t.waterSources.river, value: 3 },
    ],
    mulchingOptions: [
      { label: t.yesNo.no, value: 0 }, { label: t.yesNo.yes, value: 1 },
    ],
  };
}

function MyFieldsView({ t, fields, setFields }: any) {
  function updateField(index: number, key: string, value: string) {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: Number(value) };
    setFields(updated);
  }
  function updateFieldName(index: number, value: string) {
    const updated = [...fields];
    updated[index] = { ...updated[index], name: value };
    setFields(updated);
  }
  function removeField(index: number) {
    setFields(fields.filter((_: any, i: number) => i !== index));
  }
  function addField() {
    const nextId = fields.length + 1;
    setFields([
      ...fields,
      { name: `New Field ${nextId}`, zone: `Zone ${String.fromCharCode(65 + (nextId - 1) % 26)}`, crop: "Wheat", Crop_Type: 1, Soil_Type: 1, Season: 1, Crop_Growth_Stage: 1, Irrigation_Type: 1, Water_Source: 1, Soil_pH: 6.5, Soil_Moisture: 35, Temperature_C: 30, Humidity: 60, Rainfall_mm: 5, Sunlight_Hours: 8, Wind_Speed_kmh: 10, Field_Area_hectare: 2, Mulching_Used: 0, Previous_Irrigation_mm: 15 },
    ]);
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-black text-2xl">{t.myFieldsTitle} ({fields.length})</h3>
          <p className="text-emerald-200 text-xs mt-1">Manage field parameters. All additions, deletions and edits instantly update Irrigation Plans & Sensor Data!</p>
        </div>
        <button type="button" onClick={addField} className="vibrant-btn text-white px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg hover:brightness-110 transition flex items-center gap-1.5">
          <span>🌱</span> {t.addField}
        </button>
      </div>

      <div className="space-y-5">
        {fields.map((f: any, i: number) => (
          <FieldCard key={i} t={t} field={f} index={i} updateField={updateField} updateFieldName={updateFieldName} removeField={removeField} />
        ))}
      </div>
    </div>
  );
}

function FieldCard({ t, field, index, updateField, updateFieldName, removeField }: any) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const opts = optionSets(t);

  async function getIrrigationPlan() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const { name, zone, crop, ...payload } = field;
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult({ liters: Math.round(data.predicted_water_liters), schedule: data.irrigation_schedule || [] });
    } catch (err) {
      console.error(err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-5 space-y-4">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm">
            #{index + 1}
          </span>
          <div>
            <input
              type="text"
              className="font-black text-lg text-slate-900 border-b border-dashed border-slate-300 hover:border-emerald-600 focus:border-emerald-600 outline-none"
              value={field.name}
              onChange={(e) => updateFieldName(index, e.target.value)}
            />
            <span className="text-xs text-slate-400 font-semibold ml-2">[{field.zone}]</span>
          </div>
        </div>
        <button type="button" onClick={() => removeField(index)} className="text-rose-600 hover:text-rose-800 text-xs font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition">
          🗑️ {t.remove}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 text-xs">
        <label className="font-semibold text-slate-600">{t.fieldLabels.crop}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Crop_Type} onChange={(e) => updateField(index, "Crop_Type", e.target.value)}>
            {opts.cropOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.soilType}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Soil_Type} onChange={(e) => updateField(index, "Soil_Type", e.target.value)}>
            {opts.soilOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.season}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Season} onChange={(e) => updateField(index, "Season", e.target.value)}>
            {opts.seasonOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.growthStage}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Crop_Growth_Stage} onChange={(e) => updateField(index, "Crop_Growth_Stage", e.target.value)}>
            {opts.growthStageOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.irrigationType}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Irrigation_Type} onChange={(e) => updateField(index, "Irrigation_Type", e.target.value)}>
            {opts.irrigationTypeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.waterSource}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Water_Source} onChange={(e) => updateField(index, "Water_Source", e.target.value)}>
            {opts.waterSourceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.mulching}
          <select className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Mulching_Used} onChange={(e) => updateField(index, "Mulching_Used", e.target.value)}>
            {opts.mulchingOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.soilPh}
          <input type="number" step="0.1" className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Soil_pH} onChange={(e) => updateField(index, "Soil_pH", e.target.value)} />
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.moisture}
          <input type="number" className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Soil_Moisture} onChange={(e) => updateField(index, "Soil_Moisture", e.target.value)} />
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.temperature}
          <input type="number" className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Temperature_C} onChange={(e) => updateField(index, "Temperature_C", e.target.value)} />
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.humidity}
          <input type="number" className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Humidity} onChange={(e) => updateField(index, "Humidity", e.target.value)} />
        </label>
        <label className="font-semibold text-slate-600">{t.fieldLabels.area}
          <input type="number" step="0.1" className="w-full border rounded-xl p-2 mt-1 bg-slate-50 outline-none font-medium focus:ring-2 focus:ring-emerald-500" value={field.Field_Area_hectare} onChange={(e) => updateField(index, "Field_Area_hectare", e.target.value)} />
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="button" onClick={getIrrigationPlan} disabled={loading} className="vibrant-btn text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition disabled:opacity-50">
          {loading ? t.calculating : t.getIrrigationPlan}
        </button>
      </div>

      {error && <p className="text-rose-600 text-xs font-bold mt-2">{error}</p>}

      {result && (
        <div className="mt-3 bg-emerald-900 text-white rounded-2xl p-4 text-xs space-y-2 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <span className="font-black text-emerald-300 text-sm">{result.liters.toLocaleString()} {t.litersNeeded}</span>
            <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded-full font-bold">Single Field Calculation</span>
          </div>
          {result.schedule.map((s: any, idx: number) => (
            <p key={idx} className="text-emerald-100 text-xs">⏰ {s.time_slot}: <span className="font-bold text-amber-300">{s.liters.toLocaleString()} Liters</span></p>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Irrigation Plans tab
// ============================================================
function IrrigationPlansView({ t, results }: any) {
  const allSlots = ["05:00-06:30", "18:00-19:30", "20:30-22:00"];
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            Daily Schedule Matrix
          </span>
          <h3 className="text-2xl font-black mt-2">{t.plansTitle}</h3>
          <p className="text-emerald-100 text-xs mt-1">{t.plansNote}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-xs border border-white/10 font-bold">
          {results.length} Active Field Plans
        </div>
      </div>

      <div className="p-6 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase tracking-wider text-[11px] border-b">
              <th className="py-3.5 px-4 text-left">{t.table.field} & Zone</th>
              {allSlots.map((slot) => (
                <th key={slot} className="py-3.5 px-4 text-left">
                  🕒 {slot}
                </th>
              ))}
              <th className="py-3.5 px-4 text-left">Total Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {results.map((r: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="py-4 px-4 font-bold text-slate-800">
                  <span className="block text-sm">{r.name}</span>
                  <span className="text-emerald-700 text-[11px] font-semibold">{r.zone} • {r.crop}</span>
                </td>
                {allSlots.map((slot) => {
                  const match = r.schedule.find((s: any) => s.time_slot === slot);
                  return (
                    <td key={slot} className="py-4 px-4">
                      {match ? (
                        <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-xl font-black text-xs inline-block shadow-xs">
                          💧 {match.liters.toLocaleString()} L
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs font-semibold">—</span>
                      )}
                    </td>
                  );
                })}
                <td className="py-4 px-4">
                  <span className="bg-slate-900 text-emerald-300 px-3 py-1.5 rounded-xl font-black text-xs">
                    {r.predicted_liters.toLocaleString()} L
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// Sensor Data tab
// ============================================================
function SensorDataView({ t, results }: any) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 shadow-sm">
        <h3 className="text-2xl font-black">{t.sensorsTitle}</h3>
        <p className="text-emerald-200 text-xs mt-1">{t.sensorsNote}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {results.map((r: any, i: number) => (
          <div key={i} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 space-y-4 hover:shadow-md transition">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h4 className="font-bold text-slate-800 text-base">{r.name}</h4>
                <span className="text-xs text-emerald-700 font-semibold">{r.zone} • {r.crop}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black ${r.moisture < 25 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                Moisture: {r.moisture}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Temperature</span>
                <span className="font-black text-slate-800 text-sm">{r.temperature}°C</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Humidity</span>
                <span className="font-black text-slate-800 text-sm">{r.humidity}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Rainfall</span>
                <span className="font-black text-slate-800 text-sm">{r.rainfall} mm</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Sunlight</span>
                <span className="font-black text-slate-800 text-sm">{r.sunlight} hrs</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Wind Speed</span>
                <span className="font-black text-slate-800 text-sm">{r.wind} km/h</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl">
                <span className="text-slate-500 font-semibold block">Predicted Water</span>
                <span className="font-black text-emerald-700 text-sm">{r.predicted_liters.toLocaleString()} L</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Alerts tab
// ============================================================
function AlertsView({ t, results }: any) {
  const critical = results.filter((r: any) => r.moisture < 25);
  const watching = results.filter((r: any) => r.moisture >= 25 && r.moisture < 35);

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      <div className="bg-white rounded-3xl shadow-sm border border-rose-200 overflow-hidden">
        <div className="bg-gradient-to-r from-rose-700 to-red-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚨</span>
            <h3 className="font-bold text-lg">{t.criticalAlerts} ({critical.length})</h3>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Moisture &lt; 25%</span>
        </div>

        <div className="p-5 space-y-3">
          {critical.length === 0 ? (
            <p className="text-slate-500 text-xs py-4 text-center">{t.noCritical}</p>
          ) : (
            critical.map((r: any, i: number) => (
              <div key={i} className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-rose-900 text-sm">{r.name} ({r.zone})</span>
                    <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">{r.moisture}% Moisture</span>
                  </div>
                  <p className="text-xs text-rose-700 mt-1">Requires urgent irrigation of {r.predicted_liters.toLocaleString()} Liters of water.</p>
                </div>
                <span className="bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                  {t.neededUrgently}: {r.predicted_liters.toLocaleString()} L
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Watching Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-amber-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">👁️</span>
            <h3 className="font-bold text-lg">{t.watching} ({watching.length})</h3>
          </div>
          <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Moisture 25% - 35%</span>
        </div>

        <div className="p-5 space-y-3">
          {watching.length === 0 ? (
            <p className="text-slate-500 text-xs py-4 text-center">{t.noWatching}</p>
          ) : (
            watching.map((r: any, i: number) => (
              <div key={i} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-amber-900 text-sm">{r.name} ({r.zone})</span>
                    <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">{r.moisture}% Moisture</span>
                  </div>
                  <p className="text-xs text-amber-800 mt-1">Monitor moisture closely over next 24 hours.</p>
                </div>
                <span className="bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                  Watch List
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Weather tab
// ============================================================
function WeatherView({ t }: any) {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationName, setLocationName] = useState("Mahendra Park, Delhi");
  const [lat, setLat] = useState(28.7180);
  const [lon, setLon] = useState(77.1680);
  const [detecting, setDetecting] = useState(false);

  async function fetchWeatherData(latitude: number, longitude: number) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("Could not fetch live weather data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData(lat, lon);
  }, [lat, lon]);

  const handleDetectLocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      setDetecting(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;
          setLat(userLat);
          setLon(userLon);
          setLocationName(`Live GPS (${userLat.toFixed(2)}°, ${userLon.toFixed(2)}°) — Mahendra Park Area`);
          setDetecting(false);
        },
        (err) => {
          console.error(err);
          alert("Could not detect browser location. Defaulting to Mahendra Park, Delhi.");
          setDetecting(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (loading) return <p className="text-slate-500 text-xs font-bold animate-pulse">Loading live weather for {locationName}...</p>;
  if (error) return <p className="text-rose-600 text-xs font-bold">{error}</p>;
  if (!weather) return null;

  const current = weather.current;
  const daily = weather.daily;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900">{t.weatherTitle} — {locationName}</h3>
            <p className="text-xs text-slate-500">{t.liveData} • Lat: {lat.toFixed(4)}°, Lon: {lon.toFixed(4)}°</p>
          </div>
          <button
            onClick={handleDetectLocation}
            disabled={detecting}
            className="self-start sm:self-center text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>📍</span> {detecting ? "Detecting GPS..." : "Auto-Detect My GPS Location"}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <StatCard label={t.weatherStats.temp} value={`${current.temperature_2m}°C`} sub={t.weatherStats.current} barColor="bg-orange-500" />
          <StatCard label={t.weatherStats.humidity} value={`${current.relative_humidity_2m}%`} sub={t.weatherStats.current} barColor="bg-blue-500" />
          <StatCard label={t.weatherStats.wind} value={`${current.wind_speed_10m} km/h`} sub={t.weatherStats.current} barColor="bg-slate-500" />
          <StatCard label={t.weatherStats.precip} value={`${current.precipitation} mm`} sub={t.weatherStats.lastHour} barColor="bg-teal-500" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
        <h3 className="font-bold text-lg text-slate-900 mb-4">{t.forecast}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[11px] font-bold">
                <th className="py-3 pr-4">{t.weatherTable.date}</th>
                <th className="py-3 pr-4">{t.weatherTable.max}</th>
                <th className="py-3 pr-4">{t.weatherTable.min}</th>
                <th className="py-3 pr-4">{t.weatherTable.rain}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {daily.time.map((date: string, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition">
                  <td className="py-3 pr-4 font-bold text-slate-800">{date}</td>
                  <td className="py-3 pr-4 font-bold text-orange-600">{daily.temperature_2m_max[i]}°C</td>
                  <td className="py-3 pr-4 font-bold text-blue-600">{daily.temperature_2m_min[i]}°C</td>
                  <td className="py-3 pr-4 font-semibold text-teal-700">{daily.precipitation_sum[i]} mm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Analytics tab
// ============================================================
function AnalyticsView({ t, history, results }: any) {
  return (
    <div className="space-y-6">
      {/* 1. Water Usage Trend (Dual Y-Axis Line Chart) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900">{t.trendTitle}</h3>
            <p className="text-xs text-slate-500">{t.trendNote}</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
            Dual Axis Live Sync
          </span>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={history} margin={{ top: 20, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="time" fontSize={11} stroke="#64748b" />
            
            {/* Left Y-Axis: Water Needed (Formatted in M L or k L) */}
            <YAxis
              yAxisId="left"
              fontSize={11}
              stroke="#2563eb"
              tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M L` : v >= 1000 ? `${(v / 1000).toFixed(0)}k L` : `${v} L`)}
            />
            
            {/* Right Y-Axis: Soil Moisture % (0 to 100%) */}
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              fontSize={11}
              stroke="#16a34a"
              tickFormatter={(v) => `${v}%`}
            />
            
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", color: "#fff", border: "none", padding: "12px 16px" }}
              formatter={(value: any, name: any) => [
                name === t.stats.totalWater ? `${Number(value).toLocaleString()} Liters` : `${value}%`,
                name,
              ]}
            />
            <Legend wrapperStyle={{ paddingTop: "10px" }} />
            <Line yAxisId="left" type="monotone" dataKey="totalLiters" stroke="#2563eb" strokeWidth={3} name={t.stats.totalWater} dot={{ r: 5, fill: "#2563eb" }} />
            <Line yAxisId="right" type="monotone" dataKey="avgMoisture" stroke="#16a34a" strokeWidth={3} name={t.stats.avgMoisture} dot={{ r: 5, fill: "#16a34a" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Water Need by Field Bar Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900">{t.waterByField}</h3>
            <p className="text-xs text-slate-500">Volumetric water requirements per field block</p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
            Per-Field Breakdown
          </span>
        </div>

        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={results} margin={{ top: 20, right: 20, left: 15, bottom: 65 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              fontSize={11}
              stroke="#64748b"
              interval={0}
              angle={-20}
              textAnchor="end"
              dx={-5}
              dy={10}
              tickFormatter={(v) => (v.length > 18 ? `${v.substring(0, 18)}...` : v)}
            />
            <YAxis
              fontSize={11}
              stroke="#64748b"
              tickFormatter={(v) => (v >= 1000000 ? `${(v / 1000000).toFixed(1)}M L` : v >= 1000 ? `${(v / 1000).toFixed(0)}k L` : `${v} L`)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", color: "#fff", border: "none", padding: "12px 16px" }}
              formatter={(value: any) => [`${Number(value).toLocaleString()} Liters`, "Predicted Water Need"]}
            />
            <Bar dataKey="predicted_liters" radius={[8, 8, 0, 0]} name="Water Needed (Liters)">
              {results.map((entry: any, i: number) => (
                <Cell
                  key={i}
                  fill={entry.moisture < 25 ? "#ef4444" : entry.moisture < 45 ? "#f59e0b" : "#2563eb"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ============================================================
// Settings tab
// ============================================================
function SettingsView({ t, user, setUser, setIsAuthOpen, setIsNotifOpen, setNotifications }: any) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [moistureThreshold, setMoistureThreshold] = useState(25);
  const [notifSavedMessage, setNotifSavedMessage] = useState("");

  const handlePushToggle = async () => {
    if (!pushEnabled && typeof window !== "undefined" && "Notification" in window) {
      const perm = await Notification.requestPermission();
      if (perm === "granted") {
        setPushEnabled(true);
      } else {
        alert("Browser notification permission denied. Please allow notifications in your browser settings.");
        setPushEnabled(false);
      }
    } else {
      setPushEnabled(!pushEnabled);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("farmer_user");
    setUser(null);
  };

  const triggerTestAlert = () => {
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title: "🔔 Test Farm Alert",
      message: "Test irrigation alert triggered from Settings preferences.",
      time: "Just now",
      type: "schedule",
      read: false,
    };
    setNotifications((prev: any) => [newNotif, ...prev]);
    setIsNotifOpen(true);
    setNotifSavedMessage("Test notification dispatched!");
    setTimeout(() => setNotifSavedMessage(""), 3000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Farmer Profile & Account Card */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center text-2xl font-bold shadow">
              👨‍🌾
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{t.auth?.profile || "Farmer Account Profile"}</h3>
              <p className="text-xs text-gray-500">{user?.isLoggedIn ? t.auth?.verified || "Verified Smart Farmer" : t.auth?.notLoggedIn || "Guest Mode"}</p>
            </div>
          </div>
          {user?.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-2 rounded-xl border border-red-200 transition"
            >
              {t.auth?.logout || "Log Out"}
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shadow transition"
            >
              {t.auth?.login || "Log In / Register"}
            </button>
          )}
        </div>

        {user?.isLoggedIn ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold block">{t.auth?.fullName || "Full Name"}</span>
              <span className="text-sm font-bold text-gray-800">{user.name}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold block">{t.auth?.phone || "Mobile Number"}</span>
              <span className="text-sm font-bold text-gray-800">{user.phone}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold block">{t.auth?.location || "Farm Location"}</span>
              <span className="text-sm font-bold text-gray-800">{user.location}</span>
            </div>
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
              <span className="text-[11px] text-gray-500 font-semibold block">{t.auth?.primaryCrop || "Primary Crop & Area"}</span>
              <span className="text-sm font-bold text-gray-800">{user.crop} ({user.farmArea} ha)</span>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/60 text-xs text-emerald-900 flex items-center justify-between gap-3">
            <div>
              <p className="font-bold">Log in to sync your farm fields and receive automated water alerts!</p>
              <p className="text-emerald-700 mt-0.5">Quickly sign up with your phone number and location details.</p>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold whitespace-nowrap shadow hover:bg-emerald-800 transition"
            >
              Sign Up Now
            </button>
          </div>
        )}
      </div>

      {/* 2. Notifications Preferences Card */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-5 border border-emerald-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{t.notifications?.title || "Notification Preferences"}</h3>
              <p className="text-xs text-gray-500">Configure live moisture warnings and automated weather alerts</p>
            </div>
          </div>
          <button
            onClick={triggerTestAlert}
            className="text-xs bg-amber-500 hover:bg-amber-600 text-white font-bold px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1"
          >
            <span>⚡</span> {t.notifications?.testAlert || "Test Alert"}
          </button>
        </div>

        {notifSavedMessage && (
          <div className="p-2.5 bg-green-50 text-green-700 rounded-xl text-xs font-bold text-center border border-green-200">
            {notifSavedMessage}
          </div>
        )}

        <div className="space-y-4 divide-y divide-gray-100">
          {/* Push Notifications Toggle */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-800 block">{t.notifications?.pushTitle || "Browser Push Notifications"}</span>
              <span className="text-xs text-gray-500">{t.notifications?.pushSub || "Receive alerts directly on your browser"}</span>
            </div>
            <button
              onClick={handlePushToggle}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${pushEnabled ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${pushEnabled ? "translate-x-6" : ""}`} />
            </button>
          </div>

          {/* SMS Alerts Toggle */}
          <div className="pt-4 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-800 block">{t.notifications?.smsTitle || "SMS Water Alerts"}</span>
              <span className="text-xs text-gray-500">{t.notifications?.smsSub || "Get SMS updates when soil moisture is critical"}</span>
            </div>
            <button
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${smsEnabled ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${smsEnabled ? "translate-x-6" : ""}`} />
            </button>
          </div>

          {/* Gmail Email Alerts Toggle */}
          <div className="pt-4 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-800 block">📧 Gmail / Email Water Alerts</span>
              <span className="text-xs text-gray-500">Send irrigation schedule reports to {user?.email || "farmer.ramesh@gmail.com"}</span>
            </div>
            <button
              onClick={() => setWeatherAlerts(!weatherAlerts)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${weatherAlerts ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${weatherAlerts ? "translate-x-6" : ""}`} />
            </button>
          </div>

          {/* Weather Alert Toggle */}
          <div className="pt-4 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-800 block">{t.notifications?.weatherAlertTitle || "Rain Forecast Warnings"}</span>
              <span className="text-xs text-gray-500">{t.notifications?.weatherAlertSub || "Notify when heavy rain is expected so you can delay irrigation"}</span>
            </div>
            <button
              onClick={() => setWeatherAlerts(!weatherAlerts)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${weatherAlerts ? "bg-emerald-600" : "bg-gray-300"}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${weatherAlerts ? "translate-x-6" : ""}`} />
            </button>
          </div>

          {/* Moisture Threshold Slider */}
          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-gray-800">{t.notifications?.thresholdTitle || "Low Moisture Warning Threshold"}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">{moistureThreshold}%</span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              value={moistureThreshold}
              onChange={(e) => setMoistureThreshold(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-gray-200 rounded-lg"
            />
            <p className="text-[11px] text-gray-400">Trigger critical alert when field moisture drops below {moistureThreshold}%</p>
          </div>
        </div>
      </div>

      {/* 3. API URL Settings */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3 border border-gray-100">
        <h3 className="font-bold text-base text-gray-900">{t.settingsTitle}</h3>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">{t.apiUrlLabel}</label>
          <input type="text" disabled value={API_URL} className="w-full border rounded-xl p-2.5 bg-gray-50 text-gray-600 text-xs font-mono" />
          <p className="text-xs text-gray-400 mt-1">{t.apiUrlNote}</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, barColor, subColor = "text-gray-500" }: any) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className={`h-1 ${barColor}`} />
      <div className="p-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-xs mt-1 ${subColor}`}>{sub}</p>
      </div>
    </div>
  );
}
