import benBike from "../assets/benBike.png";

const Journal = () => {
  return (
    <div className="fixed left-[-80px] top-[100px]">
      <h2 className="uppercase bg-lime-slaps w-min relative left-[120px] top-[260px]">
        Journal
      </h2>
      <img
        src={benBike}
        alt="Man on lime bike with slaps logo"
        className="scale-70"
      />
    </div>
  );
};

export default Journal;
