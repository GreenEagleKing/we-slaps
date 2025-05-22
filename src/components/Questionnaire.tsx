import thinkingCap from "../assets/thinkingCap.png";

const Questionnaire = () => {
  return (
    <div className="fixed left-[700px] top-[500px]">
      <h2 className="uppercase text-white bg-lilac-slaps w-min relative left-[120px] top-[430px] z-10">
        Questionnaire
      </h2>
      <img
        src={thinkingCap}
        alt="Cap with thinkning cap text"
        className="scale-50 z-0"
      />
    </div>
  );
};

export default Questionnaire;
