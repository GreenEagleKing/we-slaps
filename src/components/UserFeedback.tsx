import softBottleGel from "../assets/softBottleGel.png";

const UserFeedback = () => {
  return (
    <div className="fixed left-[900px] top-[-100px]">
      <h2 className="uppercase bg-lilac-slaps w-min relative left-[120px] top-[430px] z-10">
        UserFeedback
      </h2>
      <img
        src={softBottleGel}
        alt="Slaps soft bottle gel"
        className="scale-80 z-0 rotate-20"
      />
    </div>
  );
};

export default UserFeedback;
