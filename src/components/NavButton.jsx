import { Link } from "react-router-dom"

const NavButton = ({ label, icon, onClick, isActive = false, route, isCollapsed }) => {
  const baseClass = "py-2 rounded-2xl cursor-pointer transition ease-in-out duration-300"
  const activeClass = isActive
    ? "bg-primary text-white"
    : "hover:bg-primary hover:text-white text-gray-700"

  const layoutClass = isCollapsed
    ? "w-12 h-12 justify-center items-center" // square, centered icon
    : "px-4 gap-2 items-center"  // regular with label

  return (
    <Link
      to={route}
      onClick={onClick}
      className={`flex ${layoutClass} ${baseClass} ${activeClass}`}
      title={isCollapsed ? label : ""}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && (
        <span className="whitespace-nowrap">{label}</span>
      )}
    </Link>
  )
}

export default NavButton
