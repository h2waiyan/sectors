import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./Sectors.css";

const DropdownCheckbox = ({
  errors,
  touched,
  isEditing,
  arrayHelpers,
  selectedSectors,
  setSelectedSectors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sectors, setSectors] = useState([
    {
      label: "Manufacturing",
      value: 1,
      children: [
        {
          label: "Construction materials",
          value: 19,
        },
        {
          label: "Electronics and Optics",
          value: 18,
        },
        {
          label: "Food and Beverage",
          value: 6,
          children: [
            {
              label: "Bakery & confectionery products",
              value: 342,
            },
            {
              label: "Beverages",
              value: 43,
            },
            {
              label: "Fish and Fish products",
              value: 42,
            },
            {
              label: "Meat and Meat products",
              value: 40,
            },
            {
              label: "Milk and dairy products",
              value: 39,
            },
            {
              label: "Other",
              value: 437,
            },
          ],
        },
        {
          label: "Furniture",
          value: 5,
          children: [
            {
              label: "Bathroom",
              value: 16,
            },
            {
              label: "Bedroom",
              value: 17,
            },
          ],
        },
        {
          label: "Machinery",
          value: 12,
          children: [
            {
              label: "Maritime",
              value: 690,
              children: [
                {
                  label: "Aluminium and steel workboats",
                  value: 271,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "Construction",
      value: 10,
    },
  ]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSectorChange = (sector) => {
    setSelectedSectors((prev) =>
      prev.includes(sector)
        ? prev.filter((s) => s !== sector)
        : [...prev, sector]
    );
  };

  useEffect(() => {
    arrayHelpers.form.setFieldValue("sectors", selectedSectors);
  }, [selectedSectors]);

  return (
    <div
      id="sectors"
      name="sectors"
      onClick={toggleDropdown}
      ref={dropdownRef}
      className={`relative inline-block mt-2 mb-2 p-2 w-full rounded shadow-inner ${
        errors.sectors && touched.sectors ? "border-red-500 border-2" : "border"
      }`}
    >
      <div className="flex justify-between ">
        <div
          className={`inline me-2 ${
            isEditing ? "text-black" : "text-gray-400"
          } overflow-hidden overflow-ellipsis whitespace-nowrap`}
        >
          {isEditing
            ? selectedSectors
                .map((sectorId) => {
                  const sector = sectors.find((s) => {
                    return s.value === sectorId;
                  });
                  return sector ? sector.label : "";
                })
                .join(", ")
            : "Current Sectors"}
        </div>
        <div className="inline me-2">
          {isOpen ? (
            <FaAngleUp className="inline" />
          ) : (
            <FaAngleDown className="inline" />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className="dropdown-menu m-2 w-full overflow-auto max-h-64"
          onClick={(e) => e.stopPropagation()}
        >
          {sectors.map((sector) => (
            <div key={sector.value}>
              <label className="block text-black">
                <input
                  type="checkbox"
                  id={sector.value}
                  checked={selectedSectors.includes(sector.value)}
                  onChange={() => handleSectorChange(sector.value)}
                  className="mx-2 h-3 w-3 rounded shadow-inner"
                />
                {sector.label}
              </label>
              {sector.children &&
                sector.children.map((child) => (
                  <div key={child.value} className="ml-4 c">
                    <label className="block text-black">
                      <input
                        type="checkbox"
                        id={child.value}
                        checked={selectedSectors.includes(child.value)}
                        onChange={() => handleSectorChange(child.value)}
                        className="mx-2 h-3 w-3 rounded shadow-inner"
                      />
                      {child.label}
                    </label>
                    {child.children &&
                      child.children.map((grandChild) => (
                        <div key={grandChild.value} className="ml-4 gc">
                          <label className="block text-black">
                            <input
                              type="checkbox"
                              id={grandChild.value}
                              checked={selectedSectors.includes(
                                grandChild.value
                              )}
                              onChange={() =>
                                handleSectorChange(grandChild.value)
                              }
                              className="mx-2 h-3 w-3 rounded shadow-inner"
                            />
                            {grandChild.label}
                            {grandChild.children &&
                              grandChild.children.map((greatGrandChild) => (
                                <div
                                  key={greatGrandChild.value}
                                  className="ml-4 ggc"
                                >
                                  <label className="block text-black">
                                    <input
                                      type="checkbox"
                                      id={greatGrandChild.value}
                                      checked={selectedSectors.includes(
                                        greatGrandChild.value
                                      )}
                                      onChange={() =>
                                        handleSectorChange(
                                          greatGrandChild.value
                                        )
                                      }
                                      className="mx-2 h-3 w-3 rounded shadow-inner"
                                    />
                                    {greatGrandChild.label}
                                  </label>
                                </div>
                              ))}
                          </label>
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCheckbox;
