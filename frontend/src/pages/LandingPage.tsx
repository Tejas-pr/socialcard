import LandingHero from "@/components/landingpage/LandingHero";
import LandingpageNavbar from "@/components/landingpage/LandingpageNavbar";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-t from-[#F9EEE3] via-[#FAF3E9] to-[#FAFAFA] h-screen w-full">
      <LandingpageNavbar />
      <LandingHero />
    </div>
  );
};

export default LandingPage;
