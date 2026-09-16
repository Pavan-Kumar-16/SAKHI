"use client";

import React, { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import VerseCard, { VerseData } from "./VerseCard";
import styles from "./VersesTab.module.css";
import gitaVerses from "@/data/gita-verses-verified.json";

export const POPULAR_VERSES: VerseData[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "Karmanye vadhikaraste ma phaleshu kadachana,\nma karmaphala-hetur bhur ma te sango'stv akarmani.",
    meaning: "You have the right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Do not consider yourself the cause of the results of your actions, and never be attached to not doing your duty.",
    guidance: "Focus on your efforts, stay calm, and trust that everything will unfold in the right way."
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।\nआत्मेव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
    transliteration: "Uddhared atmanatmanam natmanam avasadayet,\natmaiva hyatmano bandhur atmaiva ripur atmanah.",
    meaning: "Elevate yourself through the power of your own mind, and do not degrade yourself. For the mind can be the friend of the self, and the mind can also be the enemy of the self.",
    guidance: "Master your thoughts. Your mind has the power to either uplift you or hold you back."
  },
  {
    chapter: 18,
    verse: 66,
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    transliteration: "Sarva-dharman parityajya mam ekam saranam vraja,\naham tvam sarva-papebhyo mokshayishyami ma sucah.",
    meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    guidance: "Let go of control. Surrender your worries and find absolute peace in divine protection."
  },
  {
    chapter: 2,
    verse: 20,
    sanskrit: "न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः ।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे ॥",
    transliteration: "Na jayate mriyate va kadacin\nnayam bhutva bhavita va na bhuyah\najo nityah sasvato 'yam purano\nna hanyate hanyamane sarire",
    meaning: "For the soul there is neither birth nor death at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.",
    guidance: "Recognize that your core essence is eternal. Do not fear temporary physical or emotional changes."
  }
];

const ALL_VERSES = gitaVerses as VerseData[];

const CHAPTERS = [
  { id: "all", label: "All Chapters" },
  ...Array.from({ length: 18 }, (_, i) => ({
    id: String(i + 1),
    label: `Chapter ${i + 1}`
  }))
];

export default function VersesTab() {
  const [search, setSearch] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(15);

  const filteredVerses = useMemo(() => {
    return ALL_VERSES.filter((v) => {
      // 1. Chapter filter
      if (selectedChapter !== "all" && String(v.chapter) !== selectedChapter) {
        return false;
      }
      // 2. Search filter
      if (search.trim() !== "") {
        const query = search.toLowerCase();
        const matchSanskrit = v.sanskrit.toLowerCase().includes(query);
        const matchTranslit = v.transliteration.toLowerCase().includes(query);
        const matchWordMeanings = v.word_meanings?.toLowerCase().includes(query) || false;
        const matchRef = 
          String(v.ref).includes(query) || 
          `chapter ${v.chapter}`.toLowerCase().includes(query) || 
          `verse ${v.verse}`.toLowerCase().includes(query);

        return matchSanskrit || matchTranslit || matchWordMeanings || matchRef;
      }
      return true;
    });
  }, [search, selectedChapter]);

  const displayedVerses = useMemo(() => {
    return filteredVerses.slice(0, visibleCount);
  }, [filteredVerses, visibleCount]);

  const hasMore = filteredVerses.length > visibleCount;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setVisibleCount(15);
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapter(chapterId);
    setVisibleCount(15);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 15);
  };

  const handleClearAll = () => {
    setSearch("");
    setSelectedChapter("all");
    setVisibleCount(15);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Gita Verses</h2>
        <p className={styles.subtitle}>Explore wisdom across chapters and verses</p>
      </div>

      <div className={styles.searchBar}>
        <SearchIcon className={styles.searchIcon} sx={{ fontSize: 18 }} />
        <input
          type="text"
          placeholder="Search by keyword, transliteration, or chapter..."
          value={search}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      {/* Horizontal Chapter Selector */}
      <div className={styles.chapterSelector}>
        {CHAPTERS.map((ch) => (
          <button
            key={ch.id}
            className={`${styles.chapterBtn} ${
              selectedChapter === ch.id ? styles.activeChapterBtn : ""
            }`}
            onClick={() => handleChapterSelect(ch.id)}
          >
            {ch.label}
          </button>
        ))}
      </div>

      {/* Results Count Summary */}
      <div className={styles.resultsSummary}>
        {filteredVerses.length === ALL_VERSES.length ? (
          <span>Showing all {ALL_VERSES.length} verses</span>
        ) : (
          <span>
            Showing {Math.min(visibleCount, filteredVerses.length)} of {filteredVerses.length} verses
          </span>
        )}
      </div>

      <div className={styles.list}>
        {displayedVerses.length > 0 ? (
          displayedVerses.map((verse) => (
            <div key={`${verse.chapter}-${verse.verse}`} className={styles.cardWrapper}>
              <VerseCard verse={verse} />
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No verses match your search or filters.</p>
            <button onClick={handleClearAll} className="primary-btn">
              Clear All Filters
            </button>
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMoreWrapper}>
            <button onClick={loadMore} className={styles.loadMoreBtn}>
              Load More Verses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
