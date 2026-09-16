"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import MoodSelector from "./components/MoodSelector";
import ChatSection, { Message } from "./components/ChatSection";
import InputBar from "./components/InputBar";
import BottomNav, { TabId } from "./components/BottomNav";
import VersesTab, { POPULAR_VERSES } from "./components/VersesTab";
import MeditationTab from "./components/MeditationTab";
import JournalTab from "./components/JournalTab";
import ProfileTab from "./components/ProfileTab";
import styles from "./page.module.css";

// Initial chat message mapping to the screenshot
const INITIAL_MESSAGES = (name: string): Message[] => [
  {
    id: "initial-user",
    sender: "user",
    text: `I feel anxious about my future and whether I'm making the right decisions.`,
    time: "10:30 AM",
  },
  {
    id: "initial-bot",
    sender: "bot",
    text: `I understand your anxiety, ${name}. Let's see what the Bhagavad Gita says.`,
    time: "10:31 AM",
    verse: POPULAR_VERSES[0], // Chapter 2, Verse 47
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [userName, setUserName] = useState("Pavan");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES("Pavan"));
  const [activeMoodId, setActiveMoodId] = useState("anxious");
  const [isTyping, setIsTyping] = useState(false);

  const handleNameChange = (newName: string) => {
    setUserName(newName);
    // Update existing message texts if they contain the old name
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === "initial-bot") {
          return {
            ...msg,
            text: `I understand your anxiety, ${newName}. Let's see what the Bhagavad Gita says.`,
          };
        }
        return msg;
      })
    );
  };

  const handleClearChat = () => {
    if (confirm("Reset conversation to default?")) {
      setMessages(INITIAL_MESSAGES(userName));
      setActiveMoodId("anxious");
      alert("Chat history reset.");
    }
  };

  const sendMessageToBackend = async (userText: string, mood: string, currentMessages: Message[]) => {
    setIsTyping(true);
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add user message locally
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      time: timeString,
    };

    const updatedMessages = [...currentMessages, userMsg];
    setMessages(updatedMessages);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ sender: m.sender, text: m.text })),
          currentMood: mood,
          userName: userName,
        }),
      });

      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verse: data.verse,
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error(e);
      // Fallback in case of server failure
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "I am having trouble connecting right now, my friend. Let us remember that peace is within us, independent of any external connection. Please try again in a moment.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleMoodSelect = (moodId: string) => {
    setActiveMoodId(moodId);

    let userText = "";
    switch (moodId) {
      case "anxious":
        userText = "I feel anxious about my future and whether I'm making the right decisions.";
        break;
      case "stressed":
        userText = "I feel stressed about my workload and daily demands.";
        break;
      case "confused":
        userText = "I feel confused and lost, unsure of what path to take.";
        break;
      case "sad":
        userText = "I feel sad and down today. Everything feels overwhelming.";
        break;
      case "more":
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            id: `user-${Date.now()}`,
            sender: "user",
            text: "I'd like to explore more feelings and search for deeper guidance.",
            time: timeString,
          },
          {
            id: `bot-${Date.now()}`,
            sender: "bot",
            text: `Of course, ${userName}. You can type any specific feeling in the chat input below, or browse our full index of verses in the Verses tab!`,
            time: timeString,
          },
        ]);
        return;
      default:
        return;
    }

    sendMessageToBackend(userText, moodId, messages);
  };

  const handleSendMessage = (text: string) => {
    sendMessageToBackend(text, activeMoodId, messages);
  };

  return (
    <div className="app-container">
      <Header
        onMenuClick={() => setActiveTab("profile")}
        onNotificationsClick={() => alert("Peace be with you. No new notifications.")}
      />

      <main className="screen-content">
        {activeTab === "home" && (
          <>
            {/* Banner Section */}
            <div className={styles.bannerSection}>
              <div className={styles.bannerImageWrapper}>
                <Image
                  src="/images/gita_banner.png"
                  alt="Lord Krishna teaching Arjuna on a chariot"
                  fill
                  className={styles.bannerImg}
                  priority
                />
                <div className={styles.bannerOverlay} />
              </div>

              <div className={styles.bannerTextContainer}>
                <h1 className={styles.greeting}>Namaste, {userName} 🙏</h1>
                <p className={styles.subGreeting}>
                  I am here to guide you with eternal wisdom from the Bhagavad Gita.
                </p>
              </div>
            </div>

            {/* Feelings Selector Card */}
            <MoodSelector
              activeMoodId={activeMoodId}
              onMoodSelect={handleMoodSelect}
            />

            {/* Chat History Flow */}
            <ChatSection messages={messages} isTyping={isTyping} />
          </>
        )}

        {activeTab === "verses" && <VersesTab />}
        {activeTab === "meditation" && <MeditationTab />}
        {activeTab === "journal" && <JournalTab />}
        {activeTab === "profile" && (
          <ProfileTab
            userName={userName}
            onNameChange={handleNameChange}
            onClearChat={handleClearChat}
          />
        )}
      </main>

      {/* Input bar (Only on Home/Chat tab) */}
      {activeTab === "home" && <InputBar onSend={handleSendMessage} />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
