"use client";

import React, { useState, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "./MeditationTab.module.css";

type BreathPhase = "Inhale" | "Hold (Full)" | "Exhale" | "Hold (Empty)";

export default function MeditationTab() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathPhase>("Inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Switch phase
            setPhase((currPhase) => {
              switch (currPhase) {
                case "Inhale":
                  return "Hold (Full)";
                case "Hold (Full)":
                  return "Exhale";
                case "Exhale":
                  return "Hold (Empty)";
                case "Hold (Empty)":
                  setCompletedCycles((c) => c + 1);
                  return "Inhale";
                default:
                  return "Inhale";
              }
            });
            return 4; // Reset to 4s for Box Breathing
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("Inhale");
    setSecondsLeft(4);
    setCompletedCycles(0);
  };

  // Compute CSS class for scaling circle based on breathing phase
  const getCircleClass = () => {
    if (!isActive) return styles.circleIdle;
    switch (phase) {
      case "Inhale":
        return styles.circleInhale;
      case "Hold (Full)":
        return styles.circleHoldFull;
      case "Exhale":
        return styles.circleExhale;
      case "Hold (Empty)":
        return styles.circleHoldEmpty;
      default:
        return styles.circleIdle;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Divine Breath</h2>
        <p className={styles.subtitle}>Calm your mind with Box Breathing (Pranayama)</p>
      </div>

      <div className={styles.meditationWorkspace}>
        {/* Breathing Circle */}
        <div className={styles.circleOuter}>
          <div className={`${styles.breathingCircle} ${getCircleClass()}`}>
            <div className={styles.circleInner}>
              <span className={styles.phaseLabel}>{phase}</span>
              <span className={styles.timerVal}>{secondsLeft}s</span>
            </div>
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statVal}>{completedCycles}</span>
            <span className={styles.statTitle}>Cycles</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statVal}>4 : 4 : 4 : 4</span>
            <span className={styles.statTitle}>Pace</span>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button onClick={handleReset} className={styles.controlBtn} aria-label="Reset timer">
            <RefreshIcon sx={{ fontSize: 20 }} />
          </button>
          
          <button onClick={handleToggle} className={styles.playBtn} aria-label={isActive ? "Pause" : "Start"}>
            {isActive ? (
              <PauseIcon sx={{ fontSize: 24 }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 24, marginLeft: "2px" }} />
            )}
          </button>
          
          <div style={{ width: 44 }} /> {/* Spacer to align Play button in center */}
        </div>
      </div>

      <div className={styles.instructionCard}>
        <h4 className={styles.instructionTitle}>How to practice:</h4>
        <ul className={styles.instructionList}>
          <li><strong>Inhale:</strong> Breathe in slowly as the circle expands.</li>
          <li><strong>Hold (Full):</strong> Hold your breath while the circle remains expanded.</li>
          <li><strong>Exhale:</strong> Release your breath as the circle contracts.</li>
          <li><strong>Hold (Empty):</strong> Rest empty before your next cycle.</li>
        </ul>
      </div>
    </div>
  );
}
