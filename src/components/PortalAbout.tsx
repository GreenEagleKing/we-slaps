type PortalAboutProps = {
  onClose?: () => void;
};

export default function PortalAbout({ onClose }: PortalAboutProps) {
  return (
    <div className="flex flex-col gap-4 text-sm sm:text-base max-w-md w-full px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-black-slaps text-slaps-heading uppercase text-lg sm:text-md">
          About
        </h2>
        {onClose && (
          <button onClick={onClose} className="cursor-pointer ml-4">
            <span className="text-black-slaps hover:text-gold-slaps">X</span>
          </button>
        )}
      </div>
      <section className="flex flex-col gap-4 text-black-slaps text-slaps-body text-justify text-sm ">
        <p>We make sun protection for movement, built for the new wave of sport and wellness. Guided by performance, product innovation and cultural alignment in the growing world of health and fitness, our mission is to make SPF the norm - trusted by pros and a core piece of kit for any casual athlete. We’re optimising products that fit effortlessly into active lifestyles and support skin health.
        </p>
        <p>Sun protection has been left behind and we’re bringing it up to speed. No longer a chore, but an experience.
        </p>
        <p>We’re working on it and exciting things are happening. For now, join our mailing list and join us on this journey building SLAPS.
        </p>
      </section>
    </div>
  );
}
