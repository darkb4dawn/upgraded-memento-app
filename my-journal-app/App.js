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

export default function App() {
  const [appStarted, setAppStarted] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  function startAppHandler() {
    setAppStarted(true);
  }

  function goBackHandler() {
    setAppStarted(false);
  }

  function startAddJournalHandler() {
    setIsAddingEntry(true);
    setEditingEntry(null);
  }

  function endAddJournalHandler() {
    setIsAddingEntry(false);
    setEditingEntry(null);
  }

  function addJournalHandler(enteredJournalText) {
    if (editingEntry) {
      setJournalEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntry.id
            ? { ...entry, text: enteredJournalText }
            : entry
        )
      );
      setEditingEntry(null);
    } else {
      setJournalEntries((currentEntries) => [
        { text: enteredJournalText, id: Math.random().toString(), date: new Date().toLocaleDateString() },
        ...currentEntries,
      ]);
    }
    endAddJournalHandler();
  }

  function deleteJournalHandler(id) {
    setJournalEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id)
    );
  }

  function startEditJournalHandler(entry) {
    setEditingEntry(entry);
    setIsAddingEntry(true);
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
    return (
      <JournalInputScreen
        onSave={addJournalHandler}
        onCancel={endAddJournalHandler}
        editingEntry={editingEntry} // Pass the editingEntry prop
      />
    );
  }
  

  return (
    <View style={styles.appContainer}>
      <View style={styles.backButtonContainer}>
        <Button title="← Back" color="#606060" onPress={goBackHandler} />
      </View>
      <Text style={styles.encouragingText}>Write your thoughts, cherish your journey.</Text>
      <ScrollView contentContainerStyle={styles.notebookContainer}>
        <FlatList
          data={journalEntries}
          renderItem={({ item }) => (
            <View style={styles.journalEntry}>
              <Text style={styles.entryDate}>{item.date}</Text>
              <Text style={styles.entryText}>{item.text}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => startEditJournalHandler(item)} color="#606060" />
                <Button title="Delete" onPress={() => deleteJournalHandler(item.id)} color="#B0B0B0" />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      </ScrollView>

     
      <TouchableOpacity style={styles.floatingAddButton} onPress={startAddJournalHandler}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC", 
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
    backgroundColor: "#FAF3E0", 
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
    paddingBottom: 80,
    paddingHorizontal: 10,
  },
  journalEntry: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#B0A999", 
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
  floatingAddButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    backgroundColor: "#606060",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  plusText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
  },
  logo: {
    width: 150,  
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

