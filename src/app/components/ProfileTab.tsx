"use client";

import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./ProfileTab.module.css";

interface ProfileTabProps {
  userName: string;
  onNameChange: (newName: string) => void;
  onClearChat: () => void;
}

export default function ProfileTab({ userName, onNameChange, onClearChat }: ProfileTabProps) {
  const [nameInput, setNameInput] = useState(userName);
  const [journalCount, setJournalCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const journalSaved = localStorage.getItem("gita_journal_entries");
      if (journalSaved) {
        try {
          return JSON.parse(journalSaved).length;
        } catch {
          return 0;
        }
      }
    }
    return 0;
  });

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onNameChange(nameInput.trim());
    }
  };

  const handleResetJournal = () => {
    if (confirm("Are you sure you want to delete all journal entries?")) {
      localStorage.removeItem("gita_journal_entries");
      setJournalCount(0);
      alert("Journal entries cleared.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatarCircle}>
          <span className={styles.avatarChar}>{userName.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className={styles.title}>Namaste, {userName} 🙏</h2>
        <p className={styles.subtitle}>Seeker of Wisdom and Inner Peace</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <WhatshotIcon className={styles.statIcon} sx={{ color: "#ef4444", fontSize: 20 }} />
          <span className={styles.statVal}>7 Days</span>
          <span className={styles.statLabel}>Streak</span>
        </div>
        <div className={styles.statCard}>
          <MenuBookIcon className={styles.statIcon} sx={{ color: "#d97706", fontSize: 20 }} />
          <span className={styles.statVal}>{journalCount} Logs</span>
          <span className={styles.statLabel}>Journal Logs</span>
        </div>
        <div className={styles.statCard}>
          <FavoriteIcon className={styles.statIcon} sx={{ color: "#ec4899", fontSize: 20 }} />
          <span className={styles.statVal}>Active</span>
          <span className={styles.statLabel}>Mindfulness</span>
        </div>
      </div>

      {/* Profile Edit Card */}
      <div className={styles.settingsCard}>
        <h3 className={styles.cardTitle}>
          <PersonIcon sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }} /> Update Profile
        </h3>
        <form onSubmit={handleNameSubmit} className={styles.nameForm}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter your name"
              className={styles.input}
            />
            <button type="submit" className="primary-btn" style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "14px" }}>
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Application Control Settings */}
      <div className={styles.settingsCard}>
        <h3 className={styles.cardTitle}>
          <SettingsIcon sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }} /> Application Control
        </h3>
        <div className={styles.settingsList}>
          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Reset Conversation</span>
              <span className={styles.settingDesc}>Clear chat history and load defaults</span>
            </div>
            <button onClick={onClearChat} className={styles.dangerBtn}>
              Reset Chat
            </button>
          </div>

          <div className={styles.settingItem}>
            <div className={styles.settingInfo}>
              <span className={styles.settingName}>Clear Reflections</span>
              <span className={styles.settingDesc}>Delete all local journal diary entries</span>
            </div>
            <button onClick={handleResetJournal} className={styles.dangerBtn}>
              Clear Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
