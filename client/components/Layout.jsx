import { Outlet } from "react-router";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="w-full h-screen lg:w-[1200px] mx-auto bg-[#070707]">
      <Navbar />
      <main className="py-10 px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
