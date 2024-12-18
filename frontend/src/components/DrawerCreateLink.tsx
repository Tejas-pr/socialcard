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
import { ArrowDown, CornerDownLeft, Link } from "lucide-react";
import { Input } from "./ui/input";

const DrawerCreateLink = () => {
  const handleCreateLink = () => {

  };
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Create Link</Button>
        </DrawerTrigger>
        <DrawerContent className="h-[90%] md:h-[80%]">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex space-x-2 items-center justify-center text-4xl">
                <Link /> <span>New Link</span>
              </div>
            </DrawerTitle>
            <DrawerDescription>
              <span className="flex space-x-2 items-center justify-center">
                <span>Create your new link here</span> <ArrowDown />
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col items-center justify-center space-x-2 space-y-2 md:space-x-4">
            {/* Card Name */}
            <div className="w-[70%] md:w-[50%]">
              <hr className="w-full h-px my-4 dark:bg-gray-400 border-0 bg-gray-500" />
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Card Name <span className="text-red-500">*</span>
                </span>
              </div>
              <Input
                placeholder="Resume Card"
                className="mt-1 text-sm sm:text-base"
              />
            </div>

            {/* Main Grid Section */}
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl p-4">
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      GitHub
                    </span>
                  </div>
                  <Input
                    placeholder="user123"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      LinkedIn
                    </span>
                  </div>
                  <Input
                    placeholder="user123"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      LeetCode
                    </span>
                  </div>
                  <Input
                    placeholder="user123"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Twitter
                    </span>
                  </div>
                  <Input
                    placeholder="user123"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </span>
                  </div>
                  <Input
                    placeholder="John@example.com"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>

                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Phone
                    </span>
                  </div>
                  <Input
                    placeholder="0000000000"
                    className="mt-1 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          <DrawerFooter>
            <div>
              <div className="flex space-x-2 items-center justify-center">
                <Button className="w-96" onClick={handleCreateLink}>
                  Create Link
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
