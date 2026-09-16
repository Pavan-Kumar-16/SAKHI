"use client";

import React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import styles from "./MoodSelector.module.css";

export interface Mood {
  id: string;
  label: string;
  emoji: string;
}

interface MoodSelectorProps {
  activeMoodId: string;
  onMoodSelect: (moodId: string) => void;
}

export const MOODS: Mood[] = [
  { id: "anxious", label: "Anxious", emoji: "😟" },
  { id: "stressed", label: "Stressed", emoji: "😫" },
  { id: "confused", label: "Confused", emoji: "😐" },
  { id: "sad", label: "Sad", emoji: "😢" },
];

export default function MoodSelector({ activeMoodId, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>How are you feeling today?</h2>
      <p className={styles.subtitle}>Share your feelings and let the Gita guide you.</p>
      
      <div className={styles.scrollWrapper + " custom-scroll"}>
        {MOODS.map((mood) => {
          const isActive = mood.id === activeMoodId;
          return (
            <button
              key={mood.id}
              onClick={() => onMoodSelect(mood.id)}
              className={`${styles.moodBtn} ${isActive ? styles.active : ""}`}
            >
              <span className={styles.emoji}>{mood.emoji}</span>
              <span className={styles.label}>{mood.label}</span>
            </button>
          );
        })}
        <button 
          onClick={() => onMoodSelect("more")} 
          className={`${styles.moodBtn} ${styles.moreBtn} ${activeMoodId === "more" ? styles.active : ""}`}
        >
          <GridViewIcon className={styles.moreIcon} sx={{ fontSize: 16 }} />
          <span className={styles.label}>More</span>
        </button>
      </div>
    </div>
  );
}
