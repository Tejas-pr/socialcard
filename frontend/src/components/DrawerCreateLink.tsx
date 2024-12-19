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
import { useRef, useState } from "react";
import axios from "axios";
import { Spinner } from "./ui/Spinner";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const DrawerCreateLink = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const cardNameRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const leetcodeRef = useRef<HTMLInputElement>(null);
  const twitterRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCreateLink = async () => {
    setLoading(true);
    const cardName = cardNameRef.current?.value;
    const github = githubRef.current?.value;
    const linkedin = linkedinRef.current?.value;
    const leetcode = leetcodeRef.current?.value;
    const twitter = twitterRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/add-card`,
        {
          cardName,
          github,
          linkedin,
          leetcode,
          twitter,
          email,
          phone,
        },
        {
          headers: {
            "Content-Type": "Application/json",
            authorization: token,
          },
        }
      );

      console.log(response);
      if(response.data.status === 201) {
        toast({
          description: "Card added successfully!",
        });
      }
      setLoading(false);
      setIsOpen(false);      
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };
  return (
    <div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button onClick={() => setIsOpen(true)} >Create Link</Button>
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
                ref={cardNameRef}
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
                    ref={githubRef}
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
                    ref={linkedinRef}
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
                    ref={leetcodeRef}
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
                    ref={twitterRef}
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
                    ref={emailRef}
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
                    ref={phoneRef}
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
                  {loading ? (
                    <Spinner size="medium" className="text-white" />
                  ) : (
                    <>
                      <CornerDownLeft /> Create Link
                    </>
                  )}
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
