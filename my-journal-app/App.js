import { Image } from "react-native";
import { useState } from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import JournalInputScreen from "./components/JournalInputScreen";
import JournalItem from "./components/JournalItem";

export default function App() {
  const [appStarted, setAppStarted] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);

  function startAppHandler() {
    setAppStarted(true);
  }

  function goBackHandler() {
    setAppStarted(false);
  }

  function startAddJournalHandler() {
    setIsAddingEntry(true);
  }

  function endAddJournalHandler() {
    setIsAddingEntry(false);
  }

  function addJournalHandler(enteredJournalText) {
    setJournalEntries((currentEntries) => [
      { text: enteredJournalText, id: Math.random().toString(), date: new Date().toLocaleDateString() },
      ...currentEntries,
    ]);
    endAddJournalHandler();
  }

  function deleteJournalHandler(id) {
    setJournalEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id)
    );
  }

  if (!appStarted) {
    return (
      <View style={styles.welcomeContainer}>
        <Image source={require("./assets/images/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome to Your Journal</Text>
        <Button title="Open" color="#606060" onPress={startAppHandler} />
      </View>
    );
  }
  

  if (isAddingEntry) {
    return <JournalInputScreen onSave={addJournalHandler} onCancel={endAddJournalHandler} />;
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.backButtonContainer}>
        <Button title="← Back" color="#606060" onPress={goBackHandler} />
      </View>
      <Text style={styles.encouragingText}>Write your thoughts, cherish your journey.</Text>
      <ScrollView contentContainerStyle={styles.notebookContainer}>
        <FlatList
          data={[{ isAddButton: true }, ...journalEntries]}
          renderItem={({ item }) => {
            if (item.isAddButton) {
              return (
                <TouchableOpacity style={styles.addEntry} onPress={startAddJournalHandler}>
                  <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
              );
            }
            return (
              <View style={styles.journalEntry}>
                <Text style={styles.entryDate}>{item.date}</Text>
                <Text style={styles.entryText}>{item.text}</Text>
              </View>
            );
          }}
          keyExtractor={(item, index) => item.id || index.toString()}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC", // Light beige for a paper-like feel
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B3A36",
    marginBottom: 20,
  },
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#FAF3E0", // Off-white paper color
  },
  backButtonContainer: {
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  encouragingText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#3B3A36",
  },
  notebookContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  journalEntry: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#B0A999", // Subtle gray-brown for notebook lines
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  entryDate: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
    fontStyle: "italic",
  },
  entryText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "serif",
    lineHeight: 24,
  },
  addEntry: {
    flex: 1,
    margin: 10,
    backgroundColor: "#606060",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    borderRadius: 10,
  },
  plusText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  logo: {
    width: 150,  // Adjust size as needed
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  
});
