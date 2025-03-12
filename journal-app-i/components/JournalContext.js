import React, { createContext, useState, useContext } from "react";

const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [journalEntries, setJournalEntries] = useState([]);

  const addJournal = (entry) => {
    setJournalEntries((prevEntries) => [
      { ...entry, id: Math.random().toString(), date: new Date().toLocaleDateString() },
      ...prevEntries,
    ]);
  };

  const deleteJournal = (id) => {
    setJournalEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const updateJournal = (id, updatedText) => {
    setJournalEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, text: updatedText } : entry
      )
    );
  };

  return (
    <JournalContext.Provider value={{ journalEntries, addJournal, deleteJournal, updateJournal }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
}
