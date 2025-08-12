"use client";

import { SidebarData1 } from "@/core/json/sidebar_dataone";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HorizontalSidebar = () => {
  const [opendSubMenu, setOpendSubMenu] = useState<
    [string | null, string | null]
  >([null, null]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const showMenu = (title: string) => {
    setOpendSubMenu((prevState) =>
      prevState[0] === title ? [null, null] : [title, null]
    );
  };

  const showSubMenu = (title: string) => {
    setOpendSubMenu((prevState) =>
      prevState[1] === title ? [prevState[0], null] : [prevState[0], title]
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setOpendSubMenu([null, null]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActiveMainMenu = (mainMenus: Record<string, unknown>) => {
    const currentPath = pathname || "";

    return (
      (mainMenus.route &&
        typeof mainMenus.route === "string" &&
        currentPath.split("/")[1] === mainMenus.route.split("/")[1]) ||
      (Array.isArray(mainMenus.subRoutes) &&
        mainMenus.subRoutes.some(
          (subMenu: Record<string, unknown>) =>
            subMenu.route &&
            typeof subMenu.route === "string" &&
            currentPath.split("/")[1] === subMenu.route.split("/")[1]
        ))
    );
  };

  const isActiveSubMenu = (mainMenus: Record<string, unknown>) => {
    const currentPath = pathname || "";
    return (
      (mainMenus.route &&
        typeof mainMenus.route === "string" &&
        currentPath.split("/")[1] === mainMenus.route.split("/")[1]) ||
      (Array.isArray(mainMenus.subRoutes) &&
        mainMenus.subRoutes.some(
          (subMenu: Record<string, unknown>) =>
            subMenu.route &&
            typeof subMenu.route === "string" &&
            currentPath.split("/")[1] === subMenu.route.split("/")[1]
        ))
    );
  };

  return (
    <div
      className="sidebar sidebar-horizontal"
      id="horizontal-menu"
      ref={sidebarRef}
    >
      <div className="sidebar-menu" id="sidebar-menu-3">
        <div className="main-menu">
          <ul className="nav">
            {SidebarData1.map((maintitle, mainIndex) => (
              <li className="submenu" key={mainIndex}>
                <a
                  className={`${
                    opendSubMenu[0] === maintitle.title ||
                    isActiveMainMenu(maintitle)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => showMenu(maintitle.title)}
                >
                  {maintitle.title === "Components" ? (
                    <i className="feather icon-layers"></i>
                  ) : (
                    <i className={`ti ti-${maintitle.icon} me-2`}></i>
                  )}
                  <span>{maintitle.title}</span>
                  <span className="menu-arrow"></span>
                </a>
                <ul
                  className={`submenus-two ${
                    opendSubMenu[0] === maintitle.title ? "d-block" : "d-none"
                  }`}
                >
                  {maintitle.subRoutes.map((mainMenus, menuIndex) => (
                    <React.Fragment key={menuIndex}>
                      {!mainMenus.hasSubRoute && (
                        <li>
                          <Link
                            href={
                              ("route" in mainMenus && mainMenus.route) || "#"
                            }
                            className={
                              isActiveMainMenu(mainMenus) ? "active" : ""
                            }
                          >
                            <span>{mainMenus.title}</span>
                          </Link>
                        </li>
                      )}
                      {mainMenus.hasSubRoute && (
                        <li className="submenu">
                          <a
                            className={`${
                              isActiveSubMenu(mainMenus) ? "active" : ""
                            }`}
                            onClick={() => showSubMenu(mainMenus.title)}
                          >
                            <span>{mainMenus.title}</span>
                            <span className="menu-arrow"></span>
                          </a>
                          <ul
                            className={`submenus-two ${
                              opendSubMenu[1] === mainMenus.title
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            {mainMenus.subRoutes?.map(
                              (subDropMenus, subIndex) => (
                                <li key={subIndex}>
                                  <Link
                                    href={
                                      ("route" in subDropMenus &&
                                        subDropMenus.route) ||
                                      "#"
                                    }
                                    className={
                                      isActiveSubMenu(subDropMenus)
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    {subDropMenus.title}
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HorizontalSidebar;
