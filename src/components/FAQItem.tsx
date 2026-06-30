import { useState } from "react";
import { ReactComponent as CrossIcon } from "./CrossIcon";

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className={`w-full text-left rounded-[2rem] border-2 px-8 py-6 transition-colors duration-300 ${
        open
          ? "bg-gold-slaps border-gold-slaps text-white-slaps"
          : "bg-white-slaps border-black-slaps text-black-slaps"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="text-slaps-heading uppercase text-[14px] md:text-[16px]">
          {question}
        </span>
        <span className="text-xl ml-4 flex-shrink-0">
          {open ? "✕" : <CrossIcon />}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <p className="text-slaps-body text-[13px] md:text-[15px] leading-relaxed">
          {answer}
        </p>
      </div>
    </button>
  );
}
