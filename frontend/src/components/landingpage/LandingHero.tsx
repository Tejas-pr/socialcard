import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "motion/react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useEffect, useState } from "react";
const LandingHero = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<number>(0);
  const userHandle = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/total-users`
      );
      const data = response.data.userCount;
      setUsers(data);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  useEffect(() => {
    userHandle();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col h-[80vh] px-4 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Share your social cards
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="my-4"
        >
          <p className="text-md font-light md:text-base">
            Socialcard.co is the open-source link sharing platform to share
            socials in one place.
          </p>
          <p className="text-md font-light md:text-base">
            there are {users > 20 ? users : "many"} users. Join us to share your
            socials with the world.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
        >
          <Button asChild size={"lg"} className="w-full md:w-auto">
            <Link to="/signin">Start for free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size={"lg"}
            className="w-full md:w-auto"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="absolute right-3 bottom-0 w-36 bg-black px-5 py-2 text-white rounded-lg hover:cursor-pointer hover:translate-y-0 hover:scale-105 duration-300"
        >
          <h1>Subscriptions</h1>
          <div className="flex justify-center text-xs font-light">
            <p>total users :</p>
            <span>{users}</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LandingHero;
