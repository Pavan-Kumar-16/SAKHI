"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import VerseCard, { VerseData } from "./VerseCard";
import styles from "./ChatSection.module.css";

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  verse?: VerseData;
}

interface ChatSectionProps {
  messages: Message[];
  isTyping?: boolean;
}

function parseMessageText(text: string) {
  // Regex to match markdown images: ![alt](url)
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;

  // Split by newlines to preserve spacing
  const lines = text.split("\n");
  
  return lines.map((line, lineIdx) => {
    // If the line is an image, render it directly
    const imgMatches = [...line.matchAll(imageRegex)];
    if (imgMatches.length > 0) {
      return (
        <div key={`line-${lineIdx}`} style={{ margin: "8px 0" }}>
          {imgMatches.map((match, matchIdx) => (
            <img
              key={`img-${matchIdx}`}
              src={match[2]}
              alt={match[1]}
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                display: "block",
                marginTop: "4px"
              }}
            />
          ))}
        </div>
      );
    }

    // Parse highlight tokens: **text** or ==text== or [[text]]
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    const combinedRegex = /\*\*(.*?)\*\*|==(.*?)==|\[\[(.*?)\]\]/g;
    let match;
    
    while ((match = combinedRegex.exec(line)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(line.substring(lastIndex, matchIndex));
      }
      
      const content = match[1] || match[2] || match[3] || "";
      parts.push(
        <span key={`highlight-${matchIndex}`} className={styles.highlight}>
          {content}
        </span>
      );
      
      lastIndex = combinedRegex.lastIndex;
    }
    
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return (
      <div key={`line-${lineIdx}`} style={{ minHeight: "1.2em" }}>
        {parts}
      </div>
    );
  });
}

export default function ChatSection({ messages, isTyping }: ChatSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div ref={containerRef} className={styles.chatArea}>
      {messages.map((message, index) => {
        const isUser = message.sender === "user";
        return (
          <div
            key={message.id}
            className={`${styles.messageRow} ${isUser ? styles.userRow : styles.botRow} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {/* Bot avatar (only for bot messages) */}
            {!isUser && (
              <div className={styles.avatarWrapper}>
                <Image
                  src="/images/krishna_avatar.png"
                  alt="Gita AI Avatar"
                  width={38}
                  height={38}
                  className={styles.avatar}
                  priority
                />
              </div>
            )}

            <div className={styles.bubbleContainer}>
              {/* Text bubble */}
              <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}>
                <div className={styles.text}>{parseMessageText(message.text)}</div>
                <div className={styles.meta}>
                  <span className={styles.time}>{message.time}</span>
                  {isUser && (
                    <span className={styles.checkmarks} aria-hidden="true">
                      ✓✓
                    </span>
                  )}
                </div>
              </div>

              {/* Nested Verse Card (if bot message has one) */}
              {!isUser && message.verse && (
                <div className={styles.verseWrapper}>
                  <VerseCard verse={message.verse} />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {isTyping && (
        <div className={`${styles.messageRow} ${styles.botRow} animate-fade-in`}>
          <div className={styles.avatarWrapper}>
            <Image
              src="/images/krishna_avatar.png"
              alt="Gita AI Avatar"
              width={38}
              height={38}
              className={styles.avatar}
              priority
            />
          </div>
          <div className={styles.bubbleContainer}>
            <div className={`${styles.bubble} ${styles.botBubble}`} style={{ padding: "12px 18px" }}>
              <div className={styles.typingIndicator}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
