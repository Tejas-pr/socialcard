import { useState } from "react";
import NavNavigation from "@/components/landingpage/NavNavigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const LandingpageNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="relative">
      <div className="flex justify-between items-center p-6 md:mx-14">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Link to="/" className="text-xl md:text-2xl font-bold">
            Social Card
          </Link>
        </motion.div>

        <div className="md:hidden">
          <button onClick={toggleNav}>
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex space-x-2 items-center">
          <NavNavigation />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="hidden md:flex space-x-2 items-center"
        >
          <Button className="w-full">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button className="w-full" variant="outline">
            <Link to="/signin">Sign in</Link>
          </Button>
        </motion.div>
      </div>

      {isNavOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute top-full left-0 right-0 bg-white shadow-md rounded-lg z-10"
        >
          <div className="p-4 space-y-2">
            <Button variant="link">
              <Link to="/product">Product</Link>
            </Button>
            <Button variant="link">
              <Link to="/resources">Resources</Link>
            </Button>
            <Button variant="link">
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button variant="link">
              <Link to="/customers">Customers</Link>
            </Button>
            <Button variant="link">
              <Link to="/documentation">Documentation</Link>
            </Button>

            <Button className="w-full">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button className="w-full" variant="outline">
              <Link to="/signin">Sign in</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LandingpageNavbar;
