"use client"
import React, { useState, useEffect } from "react";

interface SidebarItem {
  id: number;
  name: string;
}

const Sidebar: React.FC = () => {
  const [items, setItems] = useState<SidebarItem[]>([]);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Fetch items from API (mocked for now)
  useEffect(() => {
    const fetchItems = async () => {
      // Simulate an API call
      const data: SidebarItem[] = [
        { id: 1, name: "Veg Pickles" },
        { id: 2, name: "Non-Veg Pickles" },
        { id: 3, name: "Snacks" },
      ];
      setItems(data);
    };
    fetchItems();
  }, []);

  // Handle item click
  const handleItemClick = (id: number) => {
    setActiveItem(id);
  };

  return (
    <div className="pr-[18px]">
      {/* Sidebar */}
      <div className="w-[304px] h-[65px] flex flex-col">
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={`relative pl-[54px] py-[14.5px] flex items-center gap-[6px] ${
                activeItem === item.id
                  ? "bg-[#FF7F324D]" // Active background
                  : "hover:bg-[#FF7F324D] border-[1px] border-[#00000099]" // Border on hover if not active
              }`}
              onClick={() => handleItemClick(item.id)}
            >
              {/* Active indicator (vertical line) */}
              {activeItem === item.id && (
                <div
                  className="absolute left-0 top-0 bg-[#FF7F32] w-[13px] h-[64px]"
                />
              )}
              <img src="/iconoir_vegan-circle.svg" alt="leaf" className="w-[36px] h-[36px]" />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
