type PortalAboutProps = {
  onClose: () => void;
};

export default function PortalAbout({ onClose }: PortalAboutProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-8/12 xl:max-w-[900px] relative flex-col flex gap-4">
        <button className="absolute top-[10px] right-[15px]" onClick={onClose}>
          X
        </button>
        <h2 className="uppercase">About</h2>
        <p className="text-sm w-11/12">
          Slaps is a sunscreen built for movement, for everyday athletes,
          designed for training, big days out and race days.
        </p>
        <p className="text-sm">
          We make sun protection for athletes - from the everyday to the elite.
          Our mission is to educate our community and make SPF use the norm -
          Optimising products that fit effortlessly into active lifestyles and
          support skin health with minimal impact on our planet.
        </p>
        <p className="text-sm">
          We see a future where sun protection is standard gear - trusted by
          athletes, adventurers, and everyday outdoor people alike. By aligning
          with wellness and outdoor culture, we aim to shift attitudes and make
          sunscreen second nature.
        </p>
      </div>
    </div>
  );
}
