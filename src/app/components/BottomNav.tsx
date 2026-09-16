"use client";

import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import BookIcon from "@mui/icons-material/Book";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import styles from "./BottomNav.module.css";

export type TabId = "home" | "verses" | "meditation" | "journal" | "profile";

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const items: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon:
        activeTab === "home" ? (
          <HomeIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ) : (
          <HomeOutlinedIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ),
    },
    {
      id: "verses",
      label: "Verses",
      icon:
        activeTab === "verses" ? (
          <MenuBookIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ) : (
          <MenuBookOutlinedIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ),
    },
    {
      id: "meditation",
      label: "Meditation",
      icon: (
        /* Custom lotus SVG for meditation tab */
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.lotusIcon}
        >
          <defs>
            <linearGradient id="lotusGradient" x1="12" y1="7" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#c88a36" />
            </linearGradient>
          </defs>
          <path
            d="M12 21C12 21 8.5 17 8.5 14C8.5 11 12 7 12 7C12 7 15.5 11 15.5 14C15.5 17 12 21 12 21Z"
            fill={activeTab === "meditation" ? "url(#lotusGradient)" : "currentColor"}
            fillOpacity={activeTab === "meditation" ? "1" : "0.4"}
          />
          <path
            d="M12 11C12 11 5 13 5 17C5 19 8 20 10 20C11 19 12 17 12 17C12 17 13 19 14 20C16 20 19 19 19 17C19 13 12 11 12 11Z"
            fill={activeTab === "meditation" ? "url(#lotusGradient)" : "currentColor"}
            fillOpacity={activeTab === "meditation" ? "1" : "0.8"}
          />
        </svg>
      ),
    },
    {
      id: "journal",
      label: "Journal",
      icon:
        activeTab === "journal" ? (
          <BookIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ) : (
          <BookOutlinedIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ),
    },
    {
      id: "profile",
      label: "Profile",
      icon:
        activeTab === "profile" ? (
          <PersonIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ) : (
          <PersonOutlinedIcon className={styles.icon} sx={{ fontSize: 20 }} />
        ),
    },
  ];

  return (
    <nav className={styles.nav}>
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            aria-label={`Go to ${item.label}`}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <span className={styles.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
