import { createPortal } from "react-dom";
import PortalContactUs from "./PortalContactUs";

interface AboutProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const About = ({ setShowModal }: AboutProps) => {
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {createPortal(
        <PortalContactUs onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

export default About;
