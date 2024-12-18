import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSignup = async () => {
    setLoading(true);
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/signup`, {
        username: username,
        password: password,
        email: email,
      });

      if (response.status === 200) {
        toast({
          description: "Signed up successfully",
        });
        setLoading(false);
        navigate("/signin");
      }
      setLoading(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  };
  return (
    <>
      <div className="bg-gradient-to-r from-[#FDF4E8] via-[#FBE8FB] to-[#FED2D8] h-screen">
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex items-center justify-center h-screen"
        >
          <div className="flex flex-col justify-center items-center bg-white border border-3 border-black w-full sm:w-[80%] md:w-[50%] lg:w-[30%] p-6 sm:p-9 rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Get started with Socialcard
            </h1>
            <hr className="w-full h-px my-4 dark:bg-gray-400 border-0 bg-gray-500" />
            <div className="w-full p-4">
              <form className="space-y-4" action="#">
                <div>
                  <label
                    htmlFor="Username"
                    className="block mb-1 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <Input ref={usernameRef} placeholder="Enter username" />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <Input ref={emailRef} placeholder="Your email" />
                </div>

                <div>
                  <label
                    htmlFor="Password"
                    className="block mb-1 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Input ref={passwordRef} placeholder="••••••••" />
                </div>
                <Button className="w-full" onClick={handleSignup}>
                  {loading ? <Spinner size="medium" className="text-white" /> : "Sign Up"}
                </Button>
                <p className="text-sm sm:text-base font-light ml-5 text-gray-500 dark:text-gray-400">
                  Already have an account{" "}
                  <a
                    href="/signin"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
