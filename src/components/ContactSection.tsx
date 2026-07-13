import { useState } from "react";
import ContactImage from "../assets/dayOne.jpg";

export default function ContactSection() {
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          email: formData.get("email") as string,
          message: formData.get("message") as string,
        }),
      });

      if (response.ok) {
        setSubmissionState("success");
        form.reset();
      } else {
        setSubmissionState("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmissionState("error");
    }

    setTimeout(() => setSubmissionState("idle"), 1500);
  };

  return (
    <section
      id="contact"
      className="mb-[20vh] flex flex-col md:flex-row justify-between items-stretch"
    >
      <img
        src={ContactImage}
        alt="Contact SLAPS"
        className="w-[calc(100%-1.5rem)] md:w-auto md:max-w-[50vw] md:aspect-[5/2] aspect-[4/3] mx-3 md:mx-0 object-cover rounded-lg flex-shrink-0 md:ml-10 order-1 md:order-1"
      />
      <div className="flex flex-col justify-start px-6 md:px-0 md:ml-18 md:mr-4 w-full items-center md:items-start order-2 md:order-2">
        <h2 className="text-slaps-h2 md:text-[28px] text-[16px] text-black-slaps uppercase text-center md:text-left mb-10 mt-10 md:mt-0">
          Say Hello
        </h2>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 max-w-lg w-full"
        >
          <input type="hidden" name="form-name" value="contact" />

          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            required
            className="border-2 border-black-slaps bg-white-slaps text-slaps-body text-[14px] pl-4 pr-4 py-3 w-full rounded-full placeholder:text-black-slaps hover:border-gold-slaps focus:border-gold-slaps focus:outline-none transition-colors"
          />

          <textarea
            name="message"
            placeholder="MESSAGE..."
            rows={12}
            maxLength={1000}
            required
            className="border-2 border-black-slaps bg-white-slaps text-slaps-body text-[14px] pl-4 pr-4 py-3 w-full rounded-2xl placeholder:text-black-slaps hover:border-gold-slaps focus:border-gold-slaps focus:outline-none transition-colors resize-none"
          />

          <button
            type="submit"
            disabled={submissionState === "submitting"}
            className="text-slaps-heading border border-gold-slaps text-white-slaps bg-gold-slaps py-3 px-12 rounded-full uppercase text-sm hover:text-black-slaps transition-colors md:self-end self-center"
          >
            {submissionState === "submitting"
              ? "Sending..."
              : submissionState === "success"
                ? "Sent!"
                : submissionState === "error"
                  ? "Try again"
                  : "Send"}
          </button>
        </form>
      </div>
    </section>
  );
}
