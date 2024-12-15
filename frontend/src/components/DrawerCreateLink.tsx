import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ArrowDown, CornerDownLeft, Link, ShieldQuestion } from "lucide-react";
import { Input } from "./ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const DrawerCreateLink = () => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Create Link</Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80%]">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex space-x-2 items-center justify-center text-4xl">
                <Link /> <span>New link</span>
              </div>
            </DrawerTitle>
            <DrawerDescription>
              <span className="flex space-x-2 items-center justify-center">
                <span>create your new link here</span> <ArrowDown />
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col space-x-2 items-center justify-center space-y-5">
            <div className="w-[70%] md:w-[40%]">
              <hr className="w-full h-px my-4 dark:bg-gray-400 border-0 bg-gray-500" />
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Social Name
                </span>
                <HoverCard>
                  <HoverCardTrigger className="ml-2">
                    <ShieldQuestion className="text-gray-500 text-xs sm:text-sm opacity-50 hover:opacity-100 cursor-pointer transition-opacity" />
                  </HoverCardTrigger>
                  <HoverCardContent className="text-xs bg-gray-100 dark:bg-gray-800 rounded p-2 shadow-md">
                    Name of the social, like LinkedIn, GitHub, Twitter, etc.
                  </HoverCardContent>
                </HoverCard>
              </div>
              <Input
                placeholder="github / twitter / linkedin / etc..."
                className="mt-2 text-sm sm:text-base"
              />
            </div>

            <div className="w-[70%] md:w-[40%]">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Social username
                </span>
              </div>
              <Input
                placeholder="username"
                className="mt-2 text-sm sm:text-base"
              />
            </div>

            <div className="w-[70%] md:w-[40%]">
              <div className="flex items-center">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Share
                  </span>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2 pl-10">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <label htmlFor="option-one">yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <label htmlFor="option-two">no</label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <div>
              <div className="flex space-x-2 items-center justify-center">
                <Button className="w-96">
                  Create link
                  <CornerDownLeft />
                </Button>
              </div>
            </div>
            <DrawerClose asChild>
              <div className="flex space-x-2 items-center justify-center">
                <Button variant={"outline"} className="w-96">
                  Close
                </Button>
              </div>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerCreateLink;
