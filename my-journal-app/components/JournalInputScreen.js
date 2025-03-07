import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function JournalInputScreen({ onSave, onCancel, editingEntry }) {
  const [journalText, setJournalText] = useState("");

  
  useEffect(() => {
    if (editingEntry) {
      setJournalText(editingEntry.text); 
    }
  }, [editingEntry]);

  function handleTextChange(text) {
    setJournalText(text);
  }

  function saveEntry() {
    if (journalText.trim().length > 0) {
      onSave(journalText); 
      setJournalText("");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.notebook}>
        <Text style={styles.header}>Write Your Journal Entry</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Start writing here..."
          multiline
          value={journalText}
          onChangeText={handleTextChange}
          autoFocus
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} color="#B0B0B0" />
        <Button title="Save Entry" onPress={saveEntry} color="#606060" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    padding: 20,
  },
  notebook: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B0A999",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  textInput: {
    fontSize: 16,
    color: "#333",
    fontFamily: "serif",
    lineHeight: 24,
    minHeight: 200,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between", 
    marginTop: 10,
  },
});
