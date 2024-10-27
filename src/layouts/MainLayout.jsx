//rrd
import { Outlet } from "react-router-dom";

// components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <>
      <div className="h-full flex flex-col">
        <Header />
        <div className="w-full h-full flex">
          <Sidebar />
          <main className="p-10 grow h-full">
            <div className="h-full w-full border rounded-md bg-white p-5">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default MainLayout;
