"use client";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick?: () => void;
  onNotificationsClick?: () => void;
}

export default function Header({ onMenuClick, onNotificationsClick }: HeaderProps) {
  return (
    <header className={styles.header}>
      <button className={styles.iconButton} onClick={onMenuClick} aria-label="Open menu">
        <MenuIcon className={styles.icon} sx={{ fontSize: 24 }} />
      </button>

      <div className={styles.logoContainer}>
        <span className={styles.logoText}>Gita</span>
        <div className={styles.featherWrapper}>
          {/* Stylized peacock feather SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.featherSvg}
          >
            <path
              d="M12 2C8 6 6 10 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 10 16 6 12 2Z"
              fill="url(#featherGradient)"
            />
            <path
              d="M12 6C10 9 9 11 9 14C9 15.66 10.34 17 12 17C13.66 17 15 15.66 15 14C15 11 14 9 12 6Z"
              fill="url(#innerGradient)"
            />
            <circle cx="12" cy="14" r="2" fill="#1e3a8a" />
            <path
              d="M12 20V22"
              stroke="#b45309"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="featherGradient" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#059669" /> {/* Emerald green */}
                <stop offset="60%" stopColor="#0284c7" /> {/* Sky blue */}
                <stop offset="100%" stopColor="#4f46e5" /> {/* Indigo */}
              </linearGradient>
              <linearGradient id="innerGradient" x1="12" y1="6" x2="12" y2="17" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24" /> {/* Gold */}
                <stop offset="50%" stopColor="#f59e0b" /> {/* Orange */}
                <stop offset="100%" stopColor="#3b82f6" /> {/* Deep blue */}
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className={styles.subLogoText}>AI Guidance</span>
      </div>

      <button className={styles.iconButton} onClick={onNotificationsClick} aria-label="View notifications">
        <div className={styles.bellWrapper}>
          <NotificationsOutlinedIcon className={styles.icon} sx={{ fontSize: 24 }} />
          <span className={styles.notificationDot} />
        </div>
      </button>
    </header>
  );
}
