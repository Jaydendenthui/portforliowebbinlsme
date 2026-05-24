import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "motion/react";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Works />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          {/* Fallback for now */}
          <Route path="about" element={<div className="pt-32 text-center text-4xl">About Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}