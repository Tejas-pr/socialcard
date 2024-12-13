import { useState } from "react";
import NavNavigation from "@/components/landingpage/NavNavigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const LandingpageNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  return (
    <div className="relative">
      <div className="flex justify-between items-center p-6 md:mx-14">
        {/* Logo */}
        <div>
          <Link to="/" className="text-xl md:text-2xl font-bold">
            Social Card
          </Link>
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
          <Button className="w-full">
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button className="w-full" variant="outline">
            <Link to="/signin">Sign in</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md rounded-lg z-10">
          <div className="p-4 space-y-2">
            <Button variant="link" asChild>
              <Link to="/product">Product</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/resources">Resources</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/customers">Customers</Link>
            </Button>
            <Button variant="link" asChild>
              <Link to="/documentation">Documentation</Link>
            </Button>

            <Button className="w-full">
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button className="w-full" variant="outline">
              <Link to="/signin">Sign in</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingpageNavbar;
