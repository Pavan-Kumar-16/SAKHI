"use client";

import React, { useState, useRef, FormEvent } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";
import styles from "./InputBar.module.css";

interface InputBarProps {
  onSend: (text: string) => void;
}

export default function InputBar({ onSend }: InputBarProps) {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    inputRef.current?.focus();
  };

  const handleMicClick = () => {
    // Basic interactive microphone effect
    setIsRecording(!isRecording);
    if (!isRecording) {
      setText("Listening to your feelings...");
      setTimeout(() => {
        setIsRecording(false);
        setText("I feel stressed about my upcoming workload and need peace.");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={`${styles.inputContainer} ${isRecording ? styles.recording : ""}`}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Type your feelings..."}
          className={styles.input}
          disabled={isRecording}
        />
        
        <button
          type="button"
          onClick={handleMicClick}
          className={`${styles.micBtn} ${isRecording ? styles.micActive : ""}`}
          aria-label={isRecording ? "Stop recording" : "Record voice input"}
        >
          {isRecording ? (
            <MicIcon className={styles.micIcon} sx={{ fontSize: 20 }} />
          ) : (
            <MicNoneIcon className={styles.micIcon} sx={{ fontSize: 20 }} />
          )}
        </button>
      </div>

      <button
        type="submit"
        disabled={!text.trim() || isRecording}
        className={styles.sendBtn}
        aria-label="Send message"
      >
        <SendIcon className={styles.sendIcon} sx={{ fontSize: 18 }} />
      </button>
    </form>
  );
}
