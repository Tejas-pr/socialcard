import Cards from "./Cards";
import DrawerCreateLink from "./DrawerCreateLink";
import { Input } from "./ui/input";

const DashboardHero = () => {
  return (
    <div>
      <h1 className="text-2xl font-normal ml-10 md:ml-0">Links</h1>
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
