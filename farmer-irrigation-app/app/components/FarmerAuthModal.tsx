"use client";

import { useState } from "react";

export interface FarmerUser {
  name: string;
  phone: string;
  email: string;
  location: string;
  crop: string;
  farmArea: number;
  isLoggedIn: boolean;
}

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: FarmerUser) => void;
  t: any;
}

export default function FarmerAuthModal({ isOpen, onClose, onSuccess, t }: FarmerAuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  
  // Form fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [farmArea, setFarmArea] = useState(2.5);

  if (!isOpen) return null;

  const authT = t.auth || {
    login: "Farmer Login",
    signup: "Farmer Registration",
    loginSubtitle: "Access your field irrigation portal & alerts",
    signupSubtitle: "Join smart farmers saving water & boosting yields",
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
    accountCreated: "Farmer account created successfully!",
    loginSuccess: "Welcome back!",
  };

  const handleDemoLogin = () => {
    const demoUser: FarmerUser = {
      name: "Ramesh Kumar (Demo)",
      phone: "+91 98765 43210",
      email: "farmer.ramesh@gmail.com",
      location: "Mahendra Park, Delhi",
      crop: "Wheat",
      farmArea: 3.5,
      isLoggedIn: true,
    };
    localStorage.setItem("farmer_user", JSON.stringify(demoUser));
    onSuccess(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: FarmerUser = {
      name: mode === "signup" ? name || "Smart Farmer" : "Farmer " + (phone.slice(-4) || "User"),
      phone: phone || "+91 98765 43210",
      email: email || "farmer.ramesh@gmail.com",
      location: location || "North Zone Farm",
      crop: crop,
      farmArea: Number(farmArea) || 2.0,
      isLoggedIn: true,
    };
    localStorage.setItem("farmer_user", JSON.stringify(user));
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-emerald-100">
        {/* Header gradient */}
        <div className="bg-gradient-to-r from-emerald-800 via-green-700 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌱</span>
            <span className="text-xs uppercase tracking-wider bg-emerald-900/60 px-2.5 py-1 rounded-full text-emerald-200 font-semibold border border-emerald-500/30">
              Farmer Portal
            </span>
          </div>
          <h2 className="text-2xl font-bold">{mode === "login" ? authT.login : authT.signup}</h2>
          <p className="text-emerald-100 text-xs mt-1">{mode === "login" ? authT.loginSubtitle : authT.signupSubtitle}</p>

          {/* Mode Selector Tabs */}
          <div className="flex bg-black/20 rounded-xl p-1 mt-4 text-xs font-semibold">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-lg transition ${mode === "login" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:text-white"}`}
            >
              {authT.login}
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-lg transition ${mode === "signup" ? "bg-white text-emerald-900 shadow" : "text-emerald-100 hover:text-white"}`}
            >
              {authT.signup}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.fullName}</label>
              <input
                type="text"
                required
                placeholder="e.g. Sardar Harpreet Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.phone}</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.email}</label>
            <input
              type="email"
              placeholder="e.g. farmer.ramesh@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.password}</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.location}</label>
                <input
                  type="text"
                  placeholder="e.g. Village Karnal, Haryana"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.primaryCrop}</label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="Wheat">🌾 Wheat</option>
                    <option value="Rice">🌾 Rice</option>
                    <option value="Sugarcane">🎋 Sugarcane</option>
                    <option value="Cotton">☁️ Cotton</option>
                    <option value="Maize">🌽 Maize</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{authT.farmArea}</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.1"
                    value={farmArea}
                    onChange={(e) => setFarmArea(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full vibrant-btn text-white py-3 rounded-xl font-bold text-sm mt-2 shadow-lg hover:brightness-110 transition"
          >
            {mode === "login" ? authT.submitLogin : authT.submitSignup}
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <hr className="w-full border-gray-200" />
            <span className="bg-white px-3 text-xs text-gray-400 absolute">OR</span>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-2.5 rounded-xl font-semibold text-xs shadow hover:brightness-105 transition flex items-center justify-center gap-2"
          >
            <span>✨</span> {authT.demoAccount}
          </button>
        </form>
      </div>
    </div>
  );
}
