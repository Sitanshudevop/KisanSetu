"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    "app.title": "Kisan Connect & Procurement",
    "nav.farmerPortal": "Farmer Portal",
    "nav.officerDashboard": "Officer Dashboard",
    "mandi.finder.title": "Nearest Mandis",
    "mandi.status.open": "Accepting Bookings",
    "mandi.status.closed": "Closed Today",
    "mandi.wait.time": "Estimated wait: {time} mins",
    "book.title": "Book a Slot",
    "book.selectMandi": "Select Mandi",
    "book.date": "Date",
    "book.time": "Time",
    "book.crop": "Crop Type",
    "book.quantity": "Estimated Quantity (Quintals)",
    "book.submit": "Confirm Booking",
    "book.success": "Booking Confirmed!",
    "track.title": "Track My Crop",
    "status.BOOKED": "Token Booked",
    "status.ARRIVED": "Arrived at Mandi",
    "status.WEIGHMENT": "Weighment Completed",
    "status.QUALITY_CHECK": "Quality Check Passed",
    "status.PURCHASE_ENTRY": "Purchase Entry Done",
    "status.PAYMENT_INITIATED": "Payment Initiated",
    "status.COMPLETED": "Completed",
  },
  hi: {
    "app.title": "किसान कनेक्ट और खरीद",
    "nav.farmerPortal": "किसान पोर्टल",
    "nav.officerDashboard": "अधिकारी डैशबोर्ड",
    "mandi.finder.title": "निकटतम मंडियां",
    "mandi.status.open": "बुकिंग स्वीकार कर रहे हैं",
    "mandi.status.closed": "आज बंद है",
    "mandi.wait.time": "अनुमानित प्रतीक्षा: {time} मिनट",
    "book.title": "स्लॉट बुक करें",
    "book.selectMandi": "मंडी चुनें",
    "book.date": "तारीख",
    "book.time": "समय",
    "book.crop": "फसल का प्रकार",
    "book.quantity": "अनुमानित मात्रा (क्विंटल)",
    "book.submit": "बुकिंग पक्की करें",
    "book.success": "बुकिंग पक्की हो गई!",
    "track.title": "मेरी फसल ट्रैक करें",
    "status.BOOKED": "टोकन बुक किया गया",
    "status.ARRIVED": "मंडी में पहुंचे",
    "status.WEIGHMENT": "तौल पूरी हुई",
    "status.QUALITY_CHECK": "गुणवत्ता जांच पास",
    "status.PURCHASE_ENTRY": "खरीद प्रविष्टि पूर्ण",
    "status.PAYMENT_INITIATED": "भुगतान शुरू किया गया",
    "status.COMPLETED": "पूरा हुआ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
