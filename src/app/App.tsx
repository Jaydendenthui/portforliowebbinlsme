import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Photography from "./pages/Photography"; // 1. Imported your new page

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Works />} />
          <Route path="works/:id" element={<WorkDetail />} />
          
          {/* 2. Added the Photography nested route */}
          <Route path="photography" element={<Photography />} />
          
          {/* Fallback for now */}
          <Route path="about" element={<div className="pt-32 text-center text-4xl">About Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}