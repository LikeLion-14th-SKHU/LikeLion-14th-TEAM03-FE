import { NavLink } from "react-router-dom";
import archiveIcon from "../assets/img/navIcon/Archive.svg";
import homeIcon from "../assets/img/navIcon/Home.svg";
import userIcon from "../assets/img/navIcon/User.svg";

const navItems = [
  { to: "/skin-result", label: "결과", iconSrc: archiveIcon },
  { to: "/", label: "홈", iconSrc: homeIcon },
  { to: "/mypage", label: "마이페이지", iconSrc: userIcon },
];

export default function Navbar() {
  return (
    <nav className="sticky bottom-0 z-30 w-full shrink-0 bg-[#eeeeee] pt-2">
      <div className="mx-auto flex h-[60px] w-full items-center justify-between bg-[#eeeeee] px-3 shadow-none">
        {navItems.map(({ to, label, iconSrc }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => {
              return [
                "flex flex-1 flex-col items-center justify-center gap-3 rounded-[14px] px-2 py-2 text-[11px] font-medium no-underline transition-colors duration-300 ease-out",
                isActive ? "text-[#285E3C]" : "text-[#2A2A2A]",
              ].join(" ");
            }}
          >
            {({ isActive }) => (
              <>
                <img
                  src={iconSrc}
                  alt={label}
                  draggable={false}
                  className="block object-contain transition-all duration-300 ease-out"
                  // size control: change width/height here if you want a different nav icon size
                  style={{
                    width: 30,
                    height: 30,
                    filter: isActive
                      ? "brightness(0) saturate(100%) invert(29%) sepia(26%) saturate(485%) hue-rotate(90deg) brightness(96%) contrast(85%)"
                      : "brightness(0) saturate(100%)",
                    boxShadow: "none",
                  }}
                />
                <span className="no-underline">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
