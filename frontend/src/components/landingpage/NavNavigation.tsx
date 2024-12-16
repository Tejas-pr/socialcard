import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const NavNavigation = () => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              className="flex flex-col md:flex-row justify-center items-center md:gap-2"
            >
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="/">Home</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="/upgrade">Pricing</Link>
              </NavigationMenuLink>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Link to="https://github.com/Tejas-pr/socialcard">
                  Documentation
                </Link>
              </NavigationMenuLink>
            </motion.div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavNavigation;
