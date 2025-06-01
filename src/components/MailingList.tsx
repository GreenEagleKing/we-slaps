import { motion } from "motion/react";

const MailingList: React.FC = () => {
  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    if (typeof email !== "string") {
      // set error message
      console.error("Email is missing or not a string");
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzcZhsO11Mt9-Db5xWzvVpgbTcCbG5uQQp0W4V9KnbxzUt72hJ5FiK6XqdTkdMVotiK/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ email }),
        }
      );
      if (!response.ok) {
        console.error("Failed to submit email");
      } else {
        console.log("Email submitted successfully");
        form.reset();
      }
    } catch (e) {
      console.error("Submission error:", e);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="md:w-[500px] bg-lime-slaps px-6 py-6 rounded-[20px] md:absolute md:left-3/8 md:top-1/10 md:-translate-x-1/2 relative mt-10 min-w-[300px]"
    >
      <div className="">
        <h2 className="uppercase">Mailing List</h2>
        <p className="text-sm mt-2 mb-2">Be the first to know.</p>
      </div>
      <div>
        <form onSubmit={submitEmail} className="flex justify-between gap-4">
          <input
            className="border rounded-sm text-sm px-4 py-1 w-full"
            placeholder="enter email"
            name="email"
            type="email"
            required
          ></input>
          <button
            className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm border-lime-slaps border-2 hover:border-2 hover:border-white active:bg-gray-900"
            type="submit"
          >
            subscribe
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default MailingList;
