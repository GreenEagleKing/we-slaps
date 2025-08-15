import MailingList from "./components/MailingList";
import { ReactComponent as SlapsLogo } from "./components/SlapsLogo";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import pfmForWebVideo from "./assets/PFMforWeb.webm";

export default function App() {
  const MotionDiv = motion.create("div");
  return (
    <>
      <div className="relative min-h-screen">
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div
            className="w-full min-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-1 
             grid-areas-layout bg-white bg-[linear-gradient(to_right,rgba(128,128,128,0.1)_2px,transparent_2px),linear-gradient(to_bottom,rgba(128,128,128,0.1)_2px,transparent_2px)] bg-[size:2rem_2rem]"
          >
            <div className="area-logo flex mt-12 sm:mt-16 justify-center">
              <SlapsLogo />
            </div>
            <div className="area-main flex flex-col items-center justify-center gap-6 sm:gap-8 max-w-xl mx-auto mt-18">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="mb-14 sm:mb-10 w-full max-w-lg"
              >
                <source src={pfmForWebVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
              <p className="uppercase text-center max-w-[300px] sm:max-w-[450px] font-display font-medium italic  text-black-slaps text-sm sm:text-base">
                This is sun protection for movement.
              </p>
              <p className="uppercase text-center max-w-[320px] sm:max-w-[470px] font-display font-medium italic  text-black-slaps text-sm sm:text-base">
                SLAPS IS FOR OUTDOOR PEOPLE, ADVENTURERS, AND EVERYDAY ATHLETES
                ALIKE. THROUGH BETTER DESIGN, REAL STORIES, AND SHARED
                EXPERIENCES, WE'RE BRIDGING THE GAP BETWEEN HEALTH AND SKIN
                HEALTH.
              </p>
              <div className="h-3 sm:h-12"></div>{" "}
              <p className="font-display font-medium italic uppercase text-center text-black-slaps text-sm sm:text-base">
                We're working on it...
                <br />
                Join our mailing list & be the first to know
              </p>
              <MailingList />
            </div>
            <div className="area-footer pb-10 sm:pb-24 flex justify-center">
              <Footer />
            </div>
          </div>
        </MotionDiv>
      </div>
    </>
  );
}
