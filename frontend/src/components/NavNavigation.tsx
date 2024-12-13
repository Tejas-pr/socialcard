import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const NavNavigation = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="flex flex-col md:flex-row md:gap-2">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/product">Product</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/resources">Resources</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/pricing">Pricing</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/customers">Customers</Link>
            </NavigationMenuLink>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Link to="/documentation">Documentation</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavNavigation;
