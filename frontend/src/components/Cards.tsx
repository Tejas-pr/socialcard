import EditLink from "./EditLink";
import { Button } from "./ui/button";
import socialw from "../assets/social3B.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CircleCheckBig,
  Copy,
  EllipsisVertical,
  ExternalLink,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const [copy, setCopy] = useState(false);
  const [data, setData] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  if (copy === true) {
    setTimeout(() => setCopy(false), 2000);
  }
  const token = localStorage.getItem("token");

  if(!token) {
    navigate("/");
    toast({
      variant: "default",
      title: "Uh oh! Please Signin / Signup.",
    });
    return;
  }

  const handleCard = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/cards`,
        {
          headers: {
            "Content-Type": "Appliation/json",
            authorization: token,
          },
        }
      );
      setData(response.data.usersCard);
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
    handleCard();
  }, []);

  const handleCopy = (uuid: string) => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/showcard/${uuid}`
    );
    setCopy(true);
    toast({
      description: "Copied !!",
    });
    setTimeout(() => setCopy(false), 2000);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/v1/cards`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          data: { id },
        }
      );

      if (response) {
        toast({
          description: "Card deleted successfully!",
        });
        setData((prevData) =>
          prevData.filter((item: { id: number }) => item.id !== id)
        );
      }
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

  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-5">
        {data.map(
          (
            item: {
              cardName: string;
              UUID: string;
              createdAt: Date;
              email: string;
              github: string;
              leetcode: string;
              linkedin: string;
              phone: string;
              twitter: string;
              id: number;
            },
            index
          ) => (
            <div
              className="flex flex-col space-x-5 space-y-5 w-full md:w-[45%] border hover:shadow-lg hover:cursor-pointer rounded-xl p-4 transition-all duration-200"
              key={index}
            >
              <div className="flex items-center justify-start space-x-3">
                <div className="flex items-center justify-center rounded-full border p-2">
                  <div className="bg-slate-200 p-1 rounded-full">
                    <img src={socialw} alt="" className="w-10 md:w-6" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-normal">{item.cardName}</h1>
                </div>
              </div>
              <hr className="w-[90%] h-px dark:bg-gray-400 border bg-gray-500" />
              <div className="flex items-center justify-between w-full pr-5">
                <div className="">
                  <div className="flex items-center space-x-4">
                    <p>
                      <a
                        href={`${import.meta.env.VITE_FRONTEND_URL}/showcard/${
                          item.UUID
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-x-1 items-center justify-center hover:underline hover:cursor-pointer"
                      >
                        link
                        <ExternalLink className="w-4" />{" "}
                      </a>
                    </p>
                    {!copy ? (
                      <Copy
                        className="w-4 hover:cursor-pointer"
                        onClick={() => handleCopy(item.UUID)}
                      />
                    ) : (
                      <CircleCheckBig className="w-4 text-blue-600" />
                    )}
                  </div>
                  <p className="text-sm font-extralight mt-1">
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <div className="flex md:space-x-5">
                    <div>
                      <EditLink id={item.id} />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div>
                          <EllipsisVertical />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className="text-center">
                          More Action
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Button
                            className="w-full"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <Badge
                  variant={item.linkedin === null ? "destructive" : "outline"}
                >
                  LinkedIn
                </Badge>
                <Badge
                  variant={item.github === null ? "destructive" : "outline"}
                >
                  GitHub
                </Badge>
                <Badge
                  variant={item.twitter === null ? "destructive" : "outline"}
                >
                  Twitter
                </Badge>
                <Badge
                  variant={item.leetcode === null ? "destructive" : "outline"}
                >
                  Leetcode
                </Badge>
                <Badge
                  variant={item.phone === null ? "destructive" : "outline"}
                >
                  Phone
                </Badge>
                <Badge
                  variant={item.email === null ? "destructive" : "outline"}
                >
                  Email
                </Badge>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Cards;
