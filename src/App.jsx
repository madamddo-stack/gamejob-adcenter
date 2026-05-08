import { useState } from "react";
import LandingPage from "./LandingPage.jsx";
import AdCenter from "./AdCenter.jsx";

export default function App() {
  const [page, setPage] = useState("landing"); // "landing" | "adcenter"
  const [initialTab, setInitialTab] = useState("all");

  const handleEnter = (tab) => {
    setInitialTab(tab);
    setPage("adcenter");
  };

  if (page === "adcenter") {
    return <AdCenter initialTab={initialTab} onBack={() => setPage("landing")} />;
  }

  return <LandingPage onEnter={handleEnter} />;
}
