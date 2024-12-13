import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Signup = () => {
  return (
    <div className="bg-gradient-to-r from-[#FDF4E8] via-[#FBE8FB] to-[#FED2D8] h-screen">
      <div className="flex items-center justify-center h-screen">
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
                <Input placeholder="Enter username" />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Input placeholder="Your email" />
              </div>

              <div>
                <label
                  htmlFor="Password"
                  className="block mb-1 text-sm sm:text-base font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Input placeholder="••••••••" />
              </div>
              <Button className="w-full">Sign up</Button>
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
      </div>
    </div>
  );
};

export default Signup;
