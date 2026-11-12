"use client";

import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import styles from "./Sidebar.module.css";
import { TabId } from "./BottomNav";

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  isOpen = false,
  onClose,
}: SidebarProps) {
  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    {
      id: "home",
      label: "Home",
      icon: <HomeRoundedIcon sx={{ fontSize: 21 }} />,
    },
    {
      id: "verses",
      label: "Verses",
      icon: <MenuBookRoundedIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "meditation",
      label: "Meditation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C11.5 5 9 8 9 12C9 14.5 10.5 16 12 16.5C13.5 16 15 14.5 15 12C15 8 12.5 5 12 2Z" />
          <path
            d="M6 13C6 10 9 7.5 12 7.5C15 7.5 18 10 18 13C18 16 15.5 18 13.5 18.5C12.5 17.5 12 16 12 16C12 16 11.5 17.5 10.5 18.5C8.5 18 6 16 6 13Z"
            opacity="0.8"
          />
          <path
            d="M3 17C3 14 7 12 12 12C17 12 21 14 21 17C21 19.5 18 21 15 21C13.5 19.5 12 18.5 12 18.5C12 18.5 10.5 19.5 9 21C6 21 3 19.5 3 17Z"
            opacity="0.6"
          />
        </svg>
      ),
    },
    {
      id: "journal",
      label: "Journal",
      icon: <AutoStoriesRoundedIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <PersonRoundedIcon sx={{ fontSize: 21 }} />,
    },
  ];

  return (
    <>
      {isOpen && <div className={styles.mobileOverlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.topSection}>
          {/* Logo */}
          <div
            className={styles.logoContainer}
            onClick={() => onTabChange("home")}
          >
            {/* Elegant Lotus SVG */}
            <svg
              className={styles.lotusIconSvg}
              width="44"
              height="36"
              viewBox="0 0 44 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="44" y2="36" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
              {/* Central Petal */}
              <path
                d="M22 2C22 2 18.5 9 18.5 16C18.5 19.5 20 23 22 24C24 23 25.5 19.5 25.5 16C25.5 9 22 2 22 2Z"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner Petals */}
              <path
                d="M17 9C17 9 12 13 12 19C12 23 15 26 19 26.5C19.5 24 20 22 20 22"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M27 9C27 9 32 13 32 19C32 23 29 26 25 26.5C24.5 24 24 22 24 22"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Outer Petals */}
              <path
                d="M11 15C11 15 5 18 5 24C5 28 9.5 30 15 29C16.5 27 17.5 25 17.5 25"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M33 15C33 15 39 18 39 24C39 28 34.5 30 29 29C27.5 27 26.5 25 26.5 25"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              {/* Lotus Base */}
              <path
                d="M15 30C19 32 25 32 29 30"
                stroke="url(#goldGradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>

            <span className={styles.logoTitle}>GITA</span>
            <span className={styles.logoSubtitle}>AI GUIDANCE</span>
          </div>

          {/* Navigation Links */}
          <nav className={styles.navContainer} aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    if (onClose) onClose();
                  }}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  <span className={styles.navIconWrapper}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Chariot on Hills Illustration */}
        <div className={styles.bottomSection}>
          <div className={styles.illustrationWrapper}>
            <svg
              className={styles.chariotSvg}
              viewBox="0 0 250 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMax meet"
            >
              <defs>
                {/* Sun glow */}
                <radialGradient id="sunGlow" cx="20%" cy="60%" r="55%">
                  <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#fde68a" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#faf5ee" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hillBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#edd8b7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#ebd1a7" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="hillFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#dcb37b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#c59858" stopOpacity="0.95" />
                </linearGradient>
                <linearGradient id="chariotColor" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b4783b" />
                  <stop offset="100%" stopColor="#9a5a22" />
                </linearGradient>
              </defs>

              {/* Glowing Sun */}
              <circle cx="50" cy="85" r="42" fill="url(#sunGlow)" />

              {/* Background mountain hills */}
              <path
                d="M-10 135 Q 40 90, 110 115 T 260 120 L 260 150 L -10 150 Z"
                fill="url(#hillBack)"
              />
              <path
                d="M-10 142 Q 60 110, 140 128 T 260 132 L 260 150 L -10 150 Z"
                fill="url(#hillFront)"
              />

              {/* Chariot Silhouette */}
              <g transform="translate(8, 70) scale(0.65)">
                {/* Flag on chariot canopy */}
                <path
                  d="M38 12 L 38 -12 L 58 -4 L 38 4 Z"
                  fill="url(#chariotColor)"
                />
                {/* Canopy / Dome */}
                <path
                  d="M26 12 Q 38 -2, 50 12 Z"
                  fill="url(#chariotColor)"
                />
                <line x1="38" y1="-12" x2="38" y2="35" stroke="#9a5a22" strokeWidth="2.5" />

                {/* Chariot Body */}
                <path
                  d="M18 35 Q 20 22, 34 22 L 54 22 Q 62 26, 60 38 L 56 46 L 22 46 Z"
                  fill="url(#chariotColor)"
                />

                {/* Lord Krishna & Arjuna figures inside chariot */}
                {/* Arjuna with bow */}
                <circle cx="33" cy="22" r="4" fill="#844816" />
                <path d="M33 26 L 35 36" stroke="#844816" strokeWidth="2.5" />
                <path d="M36 24 Q 44 26, 40 33" stroke="#844816" strokeWidth="1.8" fill="none" />

                {/* Lord Krishna holding reins */}
                <circle cx="48" cy="20" r="4.5" fill="#844816" />
                {/* Crown/Feather */}
                <path d="M48 16 L 47 11 L 50 13 Z" fill="#b45309" />
                <path d="M48 24 L 52 36" stroke="#844816" strokeWidth="2.5" />

                {/* Reins */}
                <path d="M52 26 Q 78 30, 95 35" stroke="#844816" strokeWidth="1.2" fill="none" />
                <path d="M52 28 Q 78 33, 98 39" stroke="#844816" strokeWidth="1.2" fill="none" />

                {/* Large Chariot Wheel */}
                <circle cx="38" cy="52" r="14" stroke="#844816" strokeWidth="3" fill="none" />
                <circle cx="38" cy="52" r="3.5" fill="#844816" />
                {/* Spokes */}
                <line x1="38" y1="38" x2="38" y2="66" stroke="#844816" strokeWidth="1.5" />
                <line x1="24" y1="52" x2="52" y2="52" stroke="#844816" strokeWidth="1.5" />
                <line x1="28" y1="42" x2="48" y2="62" stroke="#844816" strokeWidth="1.5" />
                <line x1="28" y1="62" x2="48" y2="42" stroke="#844816" strokeWidth="1.5" />

                {/* Chariot Shaft to horses */}
                <line x1="58" y1="44" x2="98" y2="44" stroke="#844816" strokeWidth="3" />

                {/* Horses silhouettes */}
                {/* Horse 1 (foreground) */}
                <path
                  d="M86 44 Q 92 36, 100 32 Q 106 20, 110 18 Q 112 18, 114 22 L 109 26 Q 111 29, 106 33 L 115 36 Q 120 46, 116 58 L 112 58 L 108 48 L 100 48 L 98 58 L 94 58 Q 92 48, 86 44 Z"
                  fill="url(#chariotColor)"
                />
                {/* Horse 2 (slightly behind) */}
                <path
                  d="M96 42 Q 102 34, 110 30 Q 116 18, 120 16 Q 122 16, 124 20 L 119 24 Q 121 27, 116 31 L 125 34 Q 130 44, 126 58 L 122 58 L 118 48 L 112 48 L 110 58 L 106 58 Q 104 48, 96 42 Z"
                  fill="url(#chariotColor)"
                  opacity="0.85"
                />
              </g>
            </svg>
          </div>
        </div>
      </aside>
    </>
  );
}

