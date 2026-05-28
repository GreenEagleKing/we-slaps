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
            <span className="text-black-slaps hover:text-orange-slaps">X</span>
          </button>
        )}
      </div>
      <section className="flex flex-col gap-4 text-black-slaps text-slaps-body text-justify">
        <p>SLAPS - PROTECTION FOR MOVEMENT is sunscreen built specifically for the new wave of sports, wellness and movement.
        </p>
        <p>We’re working on a product developed for and with the movment community.
        </p>
        <p>Through better design, real stories, and shared experiences, we’re bridging the gap between health and skin health.
        </p>
      </section>
    </div>
  );
}
