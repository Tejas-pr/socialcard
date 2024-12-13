import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const LandingHero = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh] px-4 text-center">
      <div>
        <h1 className="text-5xl md:text-7xl font-bold">
          Share your social cards
        </h1>
      </div>
      <div className="my-4">
        <p className="text-md font-light md:text-base">
          Socialcard.co is the open-source link sharing platform to share
          socials in one place.
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <Button size={"lg"} className="w-full md:w-auto">
          <Link to="/signin">Start for free</Link>
        </Button>
        <Button variant="outline" size={"lg"} className="w-full md:w-auto">
          <Link to="/demo">Get a demo</Link>
        </Button>
      </div>
    </div>
  );
};

export default LandingHero;
