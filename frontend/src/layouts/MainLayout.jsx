import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 pt-16 h-full">
          <aside className="h-full overflow-y-auto overflow-x-hidden bg-white">
            <Sidebar />
          </aside>
          <main className="flex-1 h-full overflow-y-auto overflow-x-hidden px-2 pt-4 pb-8 bg-white w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}