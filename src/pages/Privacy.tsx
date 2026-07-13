import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PortalPrivacy from "../components/PortalPrivacy";

export default function Privacy() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <div className="relative min-h-screen overflow-x-hidden flex flex-col bg-white-slaps">
      <NavBar
        onAboutClick={goHome}
        onContactClick={goHome}
        onMailingListClick={goHome}
      />
      <div className="flex flex-col items-center justify-start pt-[10dvh] sm:pb-20 pb-10 w-full">
        <PortalPrivacy />
      </div>
      <Footer onContactClick={goHome} />
    </div>
  );
}
