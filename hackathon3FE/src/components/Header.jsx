import miniLogo from "../assets/img/logo/MiniLogo.svg";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full shrink-0 border-b border-[#F1F1F1] bg-white/90 backdrop-blur-sm">
      <div className="flex h-[56px] items-center px-4">
        <img src={miniLogo} alt="mini logo" className="block h-[28px] w-auto" />
      </div>
    </header>
  );
}
