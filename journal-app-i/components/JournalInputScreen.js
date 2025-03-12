import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Install using 'expo install @expo/vector-icons'

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

  // Dismiss keyboard on tapping outside
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.notebook} onStartShouldSetResponder={dismissKeyboard}>
        <Text style={styles.header}>How was your day?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Write your journal entry..."
          multiline
          value={journalText}
          onChangeText={handleTextChange}
          autoFocus
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Ionicons name="close-circle" size={24} color="#B0B0B0" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveEntry}>
            <Ionicons name="checkmark-circle" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Save Entry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6E3", // Soft paper-like background
    paddingHorizontal: 20,
    paddingTop: 30, // Adds top padding so the notebook doesn't touch the very top of the screen
  },
  notebook: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#D1BEB0", // Subtle border for paper feel
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "space-between", // To ensure buttons stay at the bottom
   
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "serif",
    color: "#444",
    marginBottom: 10,
  },
  textInput: {
    fontSize: 18,
    color: "#333",
    fontFamily: "serif",
    lineHeight: 28,
    minHeight: 269,
    textAlignVertical: "top",
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    padding: 10,
    marginBottom: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    padding: 12,
    borderRadius: 8,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#606060",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#FFF",
  },
});
