"use client";

import React, { useState } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import styles from "./VerseCard.module.css";

export interface VerseData {
  chapter: string | number;
  verse: string | number;
  sanskrit: string;
  transliteration: string;
  meaning?: string;
  guidance?: string;
  word_meanings?: string;
  ref?: string;
}

interface VerseCardProps {
  verse: VerseData;
}

export default function VerseCard({ verse }: VerseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const wordMeanings = React.useMemo(() => {
    if (!verse.word_meanings) return [];
    return verse.word_meanings
      .split(";")
      .map((part) => {
        const trimmed = part.trim();
        if (!trimmed) return null;
        const dashIndex = trimmed.indexOf("—");
        if (dashIndex === -1) {
          return { word: trimmed, meaning: "" };
        }
        return {
          word: trimmed.substring(0, dashIndex).trim(),
          meaning: trimmed.substring(dashIndex + 1).trim(),
        };
      })
      .filter((item): item is { word: string; meaning: string } => item !== null);
  }, [verse.word_meanings]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.reference}>
          Chapter {verse.chapter}, Verse {verse.verse}
        </span>
        <button
          className={`${styles.bookmarkBtn} ${isBookmarked ? styles.activeBookmark : ""}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark verse"}
        >
          {isBookmarked ? (
            <BookmarkIcon className={styles.bookmarkIcon} sx={{ fontSize: 20 }} />
          ) : (
            <BookmarkBorderIcon className={styles.bookmarkIcon} sx={{ fontSize: 20 }} />
          )}
        </button>
      </div>

      <div className={styles.sanskritContainer}>
        <p className={styles.sanskrit}>{verse.sanskrit}</p>
      </div>

      <div className={styles.transliterationContainer}>
        <p className={styles.transliteration}>{verse.transliteration}</p>
      </div>

      {wordMeanings.length > 0 && (
        <div className={styles.wordMeaningsContainer}>
          <h4 className={styles.sectionTitle}>Word Meanings</h4>
          <div className={styles.wordMeaningsGrid}>
            {wordMeanings.map((item, index) => (
              <div key={index} className={styles.wordMeaningPair}>
                <span className={styles.sanskritWord}>{item.word}</span>
                <span className={styles.separator}>—</span>
                <span className={styles.englishTranslation}>{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {verse.meaning && (
        <div className={styles.meaningContainer}>
          <h4 className={styles.meaningTitle}>Meaning:</h4>
          <p className={styles.meaning}>{verse.meaning}</p>
        </div>
      )}

      {verse.guidance && (
        <div className={styles.guidanceBox}>
          <div className={styles.lotusIcon}>
            {/* Custom Stylized Lotus Icon SVG */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C12 2 9 7 9 11C9 13 10 15 12 16C14 15 15 13 15 11C15 7 12 2 12 2Z"
                fill="#b45309"
                opacity="0.8"
              />
              <path
                d="M12 7C12 7 6.5 10 6.5 14.5C6.5 17 8.5 18 10 18.5C11.5 17 12 15 12 15C12 15 12.5 17 14 18.5C15.5 18 17.5 17 17.5 14.5C17.5 10 12 7 12 7Z"
                fill="#d97706"
                opacity="0.9"
              />
              <path
                d="M12 11C12 11 4 13.5 4 18C4 20 6 21 8 21C10 21 11.5 19.5 12 18.5C12.5 19.5 14 21 16 21C18 21 20 20 20 18C20 13.5 12 11 12 11Z"
                fill="#f59e0b"
              />
            </svg>
          </div>
          <p className={styles.guidanceText}>{verse.guidance}</p>
        </div>
      )}
    </div>
  );
}
