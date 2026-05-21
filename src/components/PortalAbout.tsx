import {ReactComponent as CrossIcon} from './CrossIcon';

type PortalAboutProps = {
  onClose: () => void;
};

export default function PortalAbout({ onClose }: PortalAboutProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50 bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-offwhite-slaps shadow-lg p-6 flex-col flex gap-4 sm:w-1/2 w-3/4 md:w-1/2 max-h-[90dvh] overflow-y-auto text-sm sm:text-base"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row-reverse items-center">
          <button onClick={onClose} className="ml-2 cursor-pointer">
            <CrossIcon />
          </button>
          <h2 className="text-black-slaps text-slaps-heading uppercase font-extrabold text-sm sm:text-base mr-auto">
            About
          </h2>
        </div>
        <section className="flex flex-col gap-4">
          <p>SLAPS PROTECTION FOR MOVEMENT is sunscreen built specifically for the new wave of sports, wellness and movement.
          </p>
          <p>We’re working on a product developed for and with the movment community.
          </p>
          <p>Through better design, real stories, and shared experiences, we’re bridging the gap between health and skin health.
          </p>
        </section>
      </div>
    </div>
  );
}
