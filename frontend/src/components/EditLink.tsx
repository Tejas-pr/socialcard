import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "./ui/Spinner";
import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";

const EditLink = ({ id }: { id: number }) => {
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

  const handleEditLink = async () => {
    const cardName = cardNameRef.current?.value;
    const github = githubRef.current?.value;
    const linkedin = linkedinRef.current?.value;
    const leetcode = leetcodeRef.current?.value;
    const twitter = twitterRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/update-card`,
        {
          id,
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
      toast({
        description: "Card updated successfully",
      });
      setLoading(false);
      setIsOpen(false);
      setTimeout(() => window.location.reload(), 500);
    } catch(error) {
      setLoading(false);
      console.log(error); 
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
          >
            <Edit />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Edit your card</DialogTitle>
            <DialogDescription className="text-center">Edit only required fields</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-x-2 space-y-2 md:space-x-4">
            {/* Card Name */}
            <div className="w-full">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Card Name
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
            <div className="w-full">
              <Button
                disabled={loading}
                onClick={() => {
                  handleEditLink();
                }}
                className="w-full"
              >
                {loading ? (
                    <Spinner size="medium" className="text-white" />
                  ) : (
                    <>
                      <span className="text-sm font-medium text-white dark:text-black">
                        Save
                      </span>
                    </>
                  )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditLink;
