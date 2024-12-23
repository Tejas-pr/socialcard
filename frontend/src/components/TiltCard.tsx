import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import img from "../assets/img.jpg";
import BubbleText from "./showcardTitle";
import axios from "axios";
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleGetCard = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/share/showcard/3991fbaa-10fb-4559-b132-6551a917c7a6`);
      // const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/share/showcard/:uuid`);
      console.log(response.data.share);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleGetCard();
  } , []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <div className="grid place-content-center md:my-3">
        <BubbleText />
      </div>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className="relative h-[700px] w-[300px] md:h-[650px] md:w-[700px] lg:h-[600px] lg:w-[900px] rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
      >
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid bg-white shadow-lg rounded-xl"
        >
          <div className="flex items-center justify-between px-8 bg-slate-300">
            <div>
              <div className="rounded-full bg-slate-200 p-0 md:p-3">
                <img src={img} alt="" className="rounded-full w-16 md:w-36" />
              </div>
            </div>
            <div>
              <h1 className="text-center text-3xl md:text-6xl">TEJAS P R</h1>
              <div className="flex items-center justify-center space-x-3 mt-2">
                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    window.open(
                      "mailto:tejas.teju02@gmail.com",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <img
                    src="https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white"
                    alt="Gmail"
                  />
                </div>

                <div
                  className="hover:cursor-pointer"
                  onClick={() =>
                    window.open(
                      "tel:9538632743",
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  <img
                    src="https://img.shields.io/badge/Phone-25D366?logo=whatsapp&logoColor=white"
                    alt="Contact Me"
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 px-6 py-2 gap-2">
            {/* card 1  */}
            <div
              className="bg-slate-200 rounded-lg flex flex-row md:flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg shadow-slate-600"
              onClick={() =>
                window.open(
                  "https://github.com/Tejas-pr",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <div className="rounded-full bg-slate-200 p-1 md:p-3">
                <img
                  src="https://avatars.githubusercontent.com/u/129583682?v=4"
                  alt=""
                  className="rounded-full w-12 md:w-28 ml-2 md:ml-0"
                />
              </div>
              <div className="px-2 flex flex-col items-center justify-center md:space-y-2 mb-2">
                <h1 className="text-lg md:text-xl">GitHub</h1>
                <div className="flex items-center justify-between gap-1 md:gap-4 space-x-1 bg-white/60 rounded-md p-2 md:p-4">
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      following :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      followers :<span>100</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      repos :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      gists :<span>100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card 2  */}
            <div
              className="bg-slate-200 rounded-lg flex flex-row md:flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg shadow-slate-600"
              onClick={() =>
                window.open(
                  "https://github.com/Tejas-pr",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <div className="rounded-full bg-slate-200 p-1 md:p-3">
                <img
                  src="https://avatars.githubusercontent.com/u/129583682?v=4"
                  alt=""
                  className="rounded-full w-12 md:w-28 ml-2 md:ml-0"
                />
              </div>
              <div className="px-2 flex flex-col items-center justify-center md:space-y-2 mb-2">
                <h1 className="text-lg md:text-xl">Leetcode</h1>
                <div className="flex items-center justify-between gap-1 md:gap-4 space-x-1 bg-white/60 rounded-md p-2 md:p-4">
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      following :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      followers :<span>100</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      repos :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      gists :<span>100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card 3  */}
            <div
              className="bg-slate-200 rounded-lg flex flex-row md:flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg shadow-slate-600"
              onClick={() =>
                window.open(
                  "https://github.com/Tejas-pr",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <div className="rounded-full bg-slate-200 p-1 md:p-3">
                <img
                  src="https://avatars.githubusercontent.com/u/129583682?v=4"
                  alt=""
                  className="rounded-full w-12 md:w-28 ml-2 md:ml-0"
                />
              </div>
              <div className="px-2 flex flex-col items-center justify-center md:space-y-2 mb-2">
                <h1 className="text-lg md:text-xl">Linkedin</h1>
                <div className="flex items-center justify-between gap-1 md:gap-4 space-x-1 bg-white/60 rounded-md p-2 md:p-4">
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      following :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      followers :<span>100</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      repos :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      gists :<span>100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* card 3  */}
            <div
              className="bg-slate-200 rounded-lg flex flex-row md:flex-col items-center justify-center hover:cursor-pointer hover:shadow-lg shadow-slate-600"
              onClick={() =>
                window.open(
                  "https://github.com/Tejas-pr",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <div className="rounded-full bg-slate-200 p-1 md:p-3">
                <img
                  src="https://avatars.githubusercontent.com/u/129583682?v=4"
                  alt=""
                  className="rounded-full w-12 md:w-28 ml-2 md:ml-0"
                />
              </div>
              <div className="px-2 flex flex-col items-center justify-center md:space-y-2 mb-2">
                <h1 className="text-lg md:text-xl">Linkedin</h1>
                <div className="flex items-center justify-between gap-1 md:gap-4 space-x-1 bg-white/60 rounded-md p-2 md:p-4">
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      following :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      followers :<span>100</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-light text-xs md:text-base">
                      repos :<span>100</span>
                    </p>
                    <p className="font-light text-xs md:text-base">
                      gists :<span>100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TiltCard;
