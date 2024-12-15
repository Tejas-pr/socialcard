import { PanelRightClose } from "lucide-react";
import Cards from "./Cards";
import DrawerCreateLink from "./DrawerCreateLink";
import { Input } from "./ui/input";

const DashboardHero = ({ toggleNav }: { toggleNav: () => void }) => {
  return (
    <div>
      
      <div className="flex items-center justify-start md:space-x-1 pl-4 md:pl-0">
        <PanelRightClose onClick={toggleNav} className="md:hidden hover:cursor-pointer"/>
        <h1 className="text-3xl font-normal ml-2 md:ml-0">Links</h1>
      </div>

      <div className="flex justify-end px-2 md:px-10 mt-10 md:mt-0">

        <div className="hidden md:block"></div>

        <div className="flex space-x-2 md:space-x-4 md:p-2">
          <Input placeholder="Search" />
          <DrawerCreateLink />
        </div>

      </div>
      <div className="h-screen p-7">
        <Cards />
      </div>
    </div>
  );
};

export default DashboardHero;
