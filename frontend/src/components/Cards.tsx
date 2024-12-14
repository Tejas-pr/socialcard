import EditLink from "./EditLink";
import { Button } from "./ui/button";
import socialw from "../../public/social3B.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleCheckBig, Copy, EllipsisVertical, ExternalLink } from "lucide-react";
import { useState } from "react";

const Cards = () => {
  const [copy, setCopy] = useState(false);
  const [link, setLink] = useState();
  if (copy === true) {
    setTimeout(() => setCopy(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-start space-x-5 space-y-5 w-full flex-wrap md:w-[50%] border hover:shadow-lg rounded-xl p-4 transition-all duration-200">
        <div className="flex items-center justify-start space-x-3">
          <div className="flex items-center justify-center rounded-full border p-2">
            <div className="bg-slate-200 p-1 rounded-full">
              <img src={socialw} alt="" className="w-10 md:w-6" />
            </div>
          </div>
          <div>
            <h1>Social card</h1>
          </div>
        </div>

        <div className="flex items-center justify-between w-full pr-5">
          <div className="">
            <div className="flex items-center space-x-2 md:space-x-4">
              <p><a href={link} target="_blank" className="flex gap-x-1 items-center justify-center hover:underline hover:cursor-pointer">link<ExternalLink className="w-4"/> </a></p>
              {!copy ? (
                <Copy
                  className="w-4 hover:cursor-pointer"
                  onClick={() => setCopy(true)}
                />
              ) : (
                <CircleCheckBig className="w-4 text-blue-600" />
              )}
            </div>
            <p className="text-sm font-light">date</p>
          </div>

          <div className="flex space-x-2">
            <div className="flex md:space-x-5">
              <div>
                <EditLink />
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
                    <Button className="w-full">Delete</Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
