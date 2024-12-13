import { useState } from "react";
import NavNavigation from "@/components/NavNavigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="bg-gradient-to-t from-[#F9EEE3] via-[#FAF3E9] to-[#FAFAFA] h-screen w-full">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div>
          <Link to="/">Social Card</Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleNav}>
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 items-center">
          <NavNavigation />
        </div>
        <div className="hidden md:flex space-x-2 items-center">
          <Button>Get Started</Button>
          <Button variant="outline">Sign in</Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden bg-white shadow-md">
          <NavNavigation />
          <div className="p-4 space-y-2">
            <Button className="w-full">Get Started</Button>
            <Button className="w-full" variant="outline">
              Sign in
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
