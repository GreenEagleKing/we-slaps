const MailingList = () => {
  return (
    <div className="w-[500px] bg-lime-slaps px-4 py-4 rounded-[20px] fixed left-[400px] top-[250px]">
      <div className="">
        <h2 className="uppercase">Mailing List</h2>
        <p className="text-sm mt-2 mb-2">Be the first to know.</p>
      </div>
      <div className="flex justify-between gap-4">
        <input
          className="border rounded-sm text-sm px-2 w-full"
          placeholder="enter email"
        ></input>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md text-sm">
          subscribe
        </button>
      </div>
    </div>
  );
};

export default MailingList;
