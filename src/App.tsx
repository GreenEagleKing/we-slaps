import { useEffect, useState } from "react";
import MailingList from "./components/MailingList";
import { ReactComponent as SlapsLogo } from "./components/SlapsLogo";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import PFMRotateMac from "./assets/PFMRotateOnlyMac-1.mov";
import PFMRotateWin from "./assets/PFMRotateOnlyWinWebM.webm";
import ldnMarathon from "./assets/ldnMarathon2025-105.jpg";

export default function App() {
  const MotionDiv = motion.create("div");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(userAgent));
  }, []);

  return (
    <>
      <div className="relative min-h-screen">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full min-h-screen bg-black">
            <img
              src={ldnMarathon}
              alt="London Marathon"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-85 bg-blend-multiply"
            />

            <div
              className="relative w-full min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 
             grid-areas-layout bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.2)_2px,transparent_2px)] bg-[size:2rem_2rem]"
            >
              <div className="area-logo flex sm:mt-16 justify-center mt-4">
                <SlapsLogo />
              </div>
              <div className="area-main flex flex-col items-center justify-center gap-14 @smh:gap-20 max-w-xl mx-auto lg:mt-0 mt-5">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className=" w-full max-w-lg my-[-50px] sm:my-[-70px]"
                >
                  {isIOS ? (
                    <source src={PFMRotateMac} type="video/mp4; codecs=hvc1" />
                  ) : (
                    <source src={PFMRotateWin} type="video/webm" />
                  )}
                  Your browser does not support the video tag.
                </video>
                <div className="flex flex-col gap-8">
                  <p className="uppercase text-center max-w-[300px] sm:max-w-[450px] font-display font-medium italic  text-white text-sm sm:text-base">
                    This is sun protection for movement.
                  </p>
                  <p className="uppercase text-center max-w-[320px] sm:max-w-[470px] font-display font-medium italic  text-white text-sm sm:text-base">
                    SLAPS IS FOR OUTDOOR PEOPLE, ADVENTURERS, AND EVERYDAY
                    ATHLETES ALIKE. THROUGH BETTER DESIGN, REAL STORIES, AND
                    SHARED EXPERIENCES, WE'RE BRIDGING THE GAP BETWEEN HEALTH
                    AND SKIN HEALTH.
                  </p>
                </div>

                <MailingList />
              </div>
              <div className="area-footer sm:mb-16 mb-10 lg:mt-0 mt-10 flex justify-center">
                <Footer />
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </>
  );
}
