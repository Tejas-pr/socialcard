import DashboardHero from "@/components/DashboardHero";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="flex bg-slate-light">
      <div className="md:w-[20%] lg:w-[16%]">
        <Navbar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      </div>
      <div className="bg-white w-full rounded-tl-2xl md:mt-2 md:pl-12 pt-8">
        <DashboardHero toggleNav={toggleNav} />
      </div>
    </div>
  );
};

export default Dashboard;
