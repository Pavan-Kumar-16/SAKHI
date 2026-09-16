"use client";

import React, { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import styles from "./JournalTab.module.css";

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  content: string;
}

export default function JournalTab() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("gita_journal_entries");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Failed to parse journal entries", e);
        }
      }
    }
    return [];
  });
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("Calm");

  const moodsList = ["Calm", "Anxious", "Stressed", "Reflective", "Grateful"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      mood: selectedMood,
      content: content.trim(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("gita_journal_entries", JSON.stringify(updated));
    setContent("");
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("gita_journal_entries", JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Spiritual Journal</h2>
        <p className={styles.subtitle}>Pen down your thoughts and track your mental peace</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className={styles.entryForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>How do you feel right now?</label>
          <div className={styles.moodGrid}>
            {moodsList.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelectedMood(m)}
                className={`${styles.moodBadge} ${selectedMood === m ? styles.activeMood : ""}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reflections" className={styles.label}>Today&apos;s reflections:</label>
          <textarea
            id="reflections"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What is on your mind? What lessons did you learn from the Gita today?"
            className={styles.textarea}
          />
        </div>

        <button type="submit" disabled={!content.trim()} className="primary-btn">
          Save Reflection
        </button>
      </form>

      {/* Entries List */}
      <div className={styles.entriesSection}>
        <h3 className={styles.sectionTitle}>
          <MenuBookIcon sx={{ fontSize: 18, mr: 1, verticalAlign: "middle" }} /> Past Reflections
        </h3>
        
        {entries.length > 0 ? (
          <div className={styles.entriesList}>
            {entries.map((entry) => (
              <div key={entry.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <div className={styles.dateRow}>
                    <EventIcon sx={{ fontSize: 14 }} />
                    <span>{entry.date}</span>
                  </div>
                  <span className={styles.savedMoodBadge}>{entry.mood}</span>
                </div>
                <p className={styles.entryText}>{entry.content}</p>
                <div className={styles.entryFooter}>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className={styles.deleteBtn}
                    aria-label="Delete journal entry"
                  >
                    <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Your journal is empty. Write your first reflection above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
