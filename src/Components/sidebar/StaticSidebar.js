import React, { useState } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import logo from "../../img/logobook.png";
import { useNavigate } from "react-router-dom";
const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  { name: "Users", href: "/users", icon: UsersIcon, current: false },
  { name: "Products", href: "/products", icon: FolderIcon, current: false },
  { name: "Banners", href: "/banners", icon: CalendarIcon, current: false },
  { name: "Orders", href: "/orders/all", icon: InboxIcon, current: false },
  {
    name: "Categories",
    href: "/category/all",
    icon: ChartBarIcon,
    current: false,
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StaticSidebar = () => {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <img
              className="h-20 w-auto"
              src={logo}
              alt="Workflow"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 bg-white space-y-1">
              {navigation.map((item, index) => (
                <a
                  onClick={() => setSelected(index)}
                  key={index}
                  href={item.href}
                  className={classNames(
                    selected === index
                      ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      selected === index
                        ? "text-gray-400 group-hover:text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaticSidebar;
