import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="relative size-full">
      <Navbar />
      <main className="size-full">
        <Outlet />
      </main>
    </div>
  );
}
