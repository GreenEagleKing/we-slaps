import { ReactComponent as AboutGraphic } from "../assets/AboutGraphic";

const About = () => {
  return (
    <div className="relative">
      <AboutGraphic className="fixed left-[200px] top-[750px] scale-80"></AboutGraphic>
      <div className="fixed left-[370px] top-[930px] uppercase text-white">
        About
      </div>
    </div>
  );
};

export default About;
