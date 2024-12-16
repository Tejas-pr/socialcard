import BubbleText from "@/components/showcardTitle";
import UpgradeCard from "@/components/UpgradeCard";

const Upgrade = () => {
  return (
    <div className="bg-gradient-to-r from-black via-[#4d4ea4] to-black min-h-screen flex flex-col">
      <div className="flex flex-col items-center my-8">
        <div className="mb-4">
          <BubbleText />
        </div>
        <h1 className="text-4xl font-extrabold text-white">Get Pro</h1>
      </div>

      <section className="flex flex-grow items-center justify-center">
        <div className="flex flex-wrap justify-center gap-10">
          <UpgradeCard size="h-80 w-72" price={299} />

          <div className="transform translate-y-[-1.75rem]">
            <UpgradeCard size="h-80 w-72 md:h-96 md:w-80" price={599} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upgrade;
