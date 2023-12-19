import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-700 p-4 flex justify-between items-center">
      <h2 className="font-bold text-white text-sm md:text-lg">
        React Sectors Selectors
      </h2>

      <div className="flex space-x-4">
        <NavLink to="/" className="text-white text-sm md:text-lg">
          Add Entry
        </NavLink>
        <NavLink to="/entry-list" className="text-white text-sm md:text-lg">
          Entries List
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
