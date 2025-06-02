import { ReactComponent as AboutGraphic } from "../assets/AboutGraphic";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div
      className="
      relative mx-auto top-auto left-auto translate-x-0 overflow-hidden w-full flex justify-center items-center
      md:absolute md:left-2/5 md:top-5/8 md:-translate-x-1/2"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        whileTap={{ scale: 0.8 }}
        style={{ transformOrigin: "50% 50%" }}
        className="inline-block"
      >
        <AboutGraphic className="scale-80" />
      </motion.div>

      <div
        className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase text-white text-center"
      >
        About
      </div>
    </div>
  );
};

export default About;
