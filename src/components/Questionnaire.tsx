import thinkingCap from "../assets/thinkingCap.png";
import { motion } from "motion/react";

const Questionnaire = () => {
  return (
    <div className="md:absolute md:left-3/4 md:top-2/3 md:-translate-x-1/2 relative">
      <div className="relative inline-block">
        {/* <a  href="https://docs.google.com/forms/d/e/1FAIpQLSdlKH_qxYfze-pj8nI3vPYiA32luayM11YocfCFlD4Y9moMHQ/viewform"> */}
        <h2 className="uppercase text-white bg-lilac-slaps w-min md:fixed md:left-[-50px] md:top-[180px] absolute left-[-50px] top-[180px] z-1">
          Questionnaire
        </h2>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
          <img
            src={thinkingCap}
            alt="Cap with thinkning cap text"
            className="w-[250px]"
          />
        </motion.div>
        {/* </a> */}
      </div>
    </div>
  );
};

export default Questionnaire;
