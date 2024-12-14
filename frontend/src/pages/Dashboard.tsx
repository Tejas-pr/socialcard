import DashboardHero from "@/components/DashboardHero";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-slate-light">
      <div className=" bg-slate-light w-[16%] h-screen p-4">
        <Navbar />
      </div>
      <div className="bg-white w-full rounded-tl-2xl mt-2 md:pl-12 pt-8">
        <DashboardHero />
      </div>
    </div>
  );
};

export default Dashboard;
