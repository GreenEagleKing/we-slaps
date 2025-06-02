import thinkingCap from "../assets/thinkingCap.png";
import { motion } from "framer-motion";

const Questionnaire = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      className="md:absolute md:left-3/4 md:top-2/3 md:-translate-x-1/2 relative z-20"
    >
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSc8cUkL17aFV6f2-E1okKZW6gdctE6Su8R5BrCsMRa6LTnkZA/viewform?usp=header"
        target="_blank"
      >
        <h2 className="uppercase text-white bg-lilac-slaps w-min relative left-[-50px] top-[180px] z-10">
          Questionnaire
        </h2>
        <img
          src={thinkingCap}
          alt="Cap with thinkning cap text"
          className="w-[250px]"
        />
      </a>
    </motion.div>
  );
};

export default Questionnaire;
