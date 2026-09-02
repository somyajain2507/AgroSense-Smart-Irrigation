"use client";

import { useState, useEffect } from "react";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "critical" | "weather" | "schedule" | "system";
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "🚨 Low Soil Moisture Alert",
    message: "Central Nursery (Zone E) moisture is at 22%. Immediate drip irrigation recommended.",
    time: "10 mins ago",
    type: "critical",
    read: false,
  },
  {
    id: "2",
    title: "🌧️ Rain Forecast Warning",
    message: "85% precipitation expected in your district tomorrow afternoon. Delay heavy watering.",
    time: "1 hour ago",
    type: "weather",
    read: false,
  },
  {
    id: "3",
    title: "💧 Irrigation Scheduled",
    message: "North Farm Block scheduled for 4,200 Liters at 06:00 AM tomorrow.",
    time: "3 hours ago",
    type: "schedule",
    read: false,
  },
  {
    id: "4",
    title: "🌾 Growth Stage Milestone",
    message: "Wheat crop in Zone A entered Flowering stage. Moisture target adjusted to 45%.",
    time: "Yesterday",
    type: "system",
    read: true,
  },
];

interface NotificationsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  t: any;
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  setNotifications,
  t,
}: NotificationsPopoverProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const notifT = t.notifications || {
    title: "Farm Alerts & Notifications",
    unread: "unread",
    markAllRead: "Mark all read",
    clearAll: "Clear all",
    testAlert: "🔔 Test Live Alert",
    noNotifications: "No new notifications right now.",
    testSent: "Test notification triggered!",
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markSingleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const triggerTestAlert = async () => {
    const newNotif: NotificationItem = {
      id: Date.now().toString(),
      title: "⚡ Live Sensor Simulation Alert",
      message: "Soil Moisture on East Greenhouse dropped to 24%. Instant alert broadcast active.",
      time: "Just now",
      type: "critical",
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    setToastMessage("🔔 Test Notification Triggered!");

    // Browser Notification API
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(newNotif.title, { body: newNotif.message, icon: "/favicon.ico" });
      } else if (Notification.permission !== "denied") {
        const perm = await Notification.requestPermission();
        if (perm === "granted") {
          new Notification(newNotif.title, { body: newNotif.message, icon: "/favicon.ico" });
        }
      }
    }

    setTimeout(() => setToastMessage(null), 3000);
  };

  const getTypeStyles = (type: NotificationItem["type"]) => {
    switch (type) {
      case "critical":
        return "bg-red-50 border-red-200 text-red-900 icon-red";
      case "weather":
        return "bg-blue-50 border-blue-200 text-blue-900 icon-blue";
      case "schedule":
        return "bg-emerald-50 border-emerald-200 text-emerald-900 icon-emerald";
      default:
        return "bg-gray-50 border-gray-200 text-gray-900 icon-gray";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 md:p-6 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 w-full max-w-md overflow-hidden mt-12 animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🔔</span>
              <h3 className="font-bold text-lg">{notifT.title}</h3>
              {notifications.filter((n) => !n.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {notifications.filter((n) => !n.read).length} {notifT.unread}
                </span>
              )}
            </div>
            <p className="text-emerald-200 text-xs mt-0.5">Real-time alerts for soil moisture & weather</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-8 h-8 flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        {/* Toast Alert popup if triggered */}
        {toastMessage && (
          <div className="bg-amber-500 text-white px-4 py-2 text-xs font-bold text-center animate-bounce">
            {toastMessage}
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-gray-50 border-b text-xs font-semibold text-gray-600">
          <div className="flex gap-3">
            <button onClick={markAllAsRead} className="hover:text-emerald-700 transition">
              {notifT.markAllRead}
            </button>
            <span>•</span>
            <button onClick={clearAll} className="hover:text-red-600 transition">
              {notifT.clearAll}
            </button>
          </div>
          <button
            onClick={triggerTestAlert}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1 rounded-full shadow transition text-[11px]"
          >
            {notifT.testAlert}
          </button>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 p-2">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-400 text-xs">
              <span className="text-3xl block mb-2">🌿</span>
              {notifT.noNotifications}
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markSingleRead(n.id)}
                className={`p-3.5 rounded-2xl transition cursor-pointer mb-1 border ${
                  getTypeStyles(n.type)
                } ${!n.read ? "ring-2 ring-emerald-500/20 font-medium" : "opacity-80"}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-xs">{n.title}</span>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">{n.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
