import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleSignin = async () => {
    setLoading(true);
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all the fields before signing up.",
      });
      return;
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/signin`, {
        email: email,
        password: password,
      });

      const responseData = response.data;
      const token = responseData.token;

      if(token) {
        localStorage.setItem("token", token);
        toast({
          description: "Signin successfully",
        });
        setLoading(false);
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
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
    <div className="bg-gradient-to-r from-[#FDF4E8] via-[#FBE8FB] to-[#FED2D8] h-screen">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
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
            Sign in to your Socialcard account
          </h1>
          <hr className="w-full h-px my-4 dark:bg-gray-400 border-0 bg-gray-500" />
          <div className="w-full p-4">
            <form className="space-y-4" action="#">
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

              <div className="flex items-center justify-between space-x-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-1 text-sm sm:text-base">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/signup"
                  className="text-sm sm:text-base font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button className="w-full" onClick={handleSignin}>
                {loading ? <Spinner size="medium" className="text-white" /> : "Sign In"}
              </Button>
              <p className="text-sm sm:text-base font-light ml-5 text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
