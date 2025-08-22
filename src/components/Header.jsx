import mobileBackground from "../assets/images/pattern-bg-mobile.png";
import desktopBackground from "../assets/images/pattern-bg-desktop.png";

export default function Header() {
  return (
    <header className="w-full h-[35svh] md:h-[25svh] lg:h-[35svh] ">
      <img
        src={mobileBackground}
        alt="header background image for mobile view"
        className="w-full h-full object-cover md:hidden"
      />

      <img
        src={desktopBackground}
        alt="header background image for desktop view"
        className="w-full h-full object-cover hidden md:block"
      />
    </header>
  );
}
