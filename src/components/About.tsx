import { ReactComponent as AboutGraphic } from "../assets/AboutGraphic";
import { motion } from "framer-motion";

const About = () => {
  const MotionDiv = motion.create("div");
  return (
    <div
      className="
      relative translate-x-0 overflow-hidden flex justify-center items-center
      md:absolute  md:left-4/5 md:top-1/4 md:-translate-x-1/2 drop-shadow-lg"
    >
      <MotionDiv
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        style={{ transformOrigin: "50% 50%" }}
      >
        <AboutGraphic className="scale-80" />
      </MotionDiv>

      <div
        className="
        relative left-[-230px] uppercase text-white text-center"
      >
        About
      </div>
    </div>
  );
};

export default About;
