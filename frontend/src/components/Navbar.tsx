import { Link2Icon, PanelRightOpen, Settings2, ShieldPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = ({
  isNavOpen,
  toggleNav,
}: {
  isNavOpen: boolean;
  toggleNav: () => void;
}) => {
  const location = useLocation();
  const clearToken = () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div
      className={`
        bg-[#F5F5F5]
        fixed top-0 ${isNavOpen ? "left-0" : "-left-full"} 
        w-[50%] lg:w-[13%] md:w-[16%] h-full 
        transition-all duration-300 ease-in-out
        z-50 
        md:left-0 
      `}
    >
      <div className="relative h-full flex flex-col justify-between">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-bold text-xl text-gray-700">Social Card</h1>
            <PanelRightOpen
              onClick={toggleNav}
              className="md:hidden text-gray-500 hover:cursor-pointer"
            />
          </div>

          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  className={`flex items-center p-3 bg-gray-100 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors ${
                    location.pathname === "/dashboard"
                      ? "bg-[#E0ECFC] text-[#2E69EC]"
                      : ""
                  }`}
                >
                  <Link2Icon className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="text-sm font-medium">Links</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#settings"
                  className={`flex items-center p-3 bg-gray-100 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors ${
                    location.pathname === "/settings"
                      ? "bg-[#E0ECFC] text-[#2E69EC]"
                      : ""
                  }`}
                >
                  <Settings2 className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="text-sm font-medium">Settings</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="p-4">
          <div className="space-y-3">
            <Link to="/upgrade">
              <Button className="w-full text-white rounded-lg shadow-md">
                Upgrade <ShieldPlus className="ml-1" />
              </Button>
            </Link>
            <Button
              onClick={clearToken}
              className="w-full text-white rounded-lg shadow-md"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
