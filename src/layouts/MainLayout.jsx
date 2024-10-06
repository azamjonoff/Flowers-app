//rrd
import { Outlet } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="w-full h-full flex">
          <Sidebar />
          <main className="bg-slate-50 p-5 grow">
            <div className="h-full w-full border bg-white p-5">
              <Outlet />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
