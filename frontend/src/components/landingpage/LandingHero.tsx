import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "motion/react";
const LandingHero = () => {
  return (
    <div className="flex justify-center items-center flex-col h-[80vh] px-4 text-center">
      <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.7,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      >
        <h1 className="text-5xl md:text-7xl font-bold">
          Share your social cards
        </h1>
      </motion.div>
      <motion.div 
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.9,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="my-4">
        <p className="text-md font-light md:text-base">
          Socialcard.co is the open-source link sharing platform to share
          socials in one place.
        </p>
      </motion.div>
      <motion.div 
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 1.1,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        <Button size={"lg"} className="w-full md:w-auto">
          <Link to="/signin">Start for free</Link>
        </Button>
        <Button variant="outline" size={"lg"} className="w-full md:w-auto">
          <Link to="#demo">Get a demo</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingHero;
