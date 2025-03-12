import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { JournalProvider, useJournal } from "./components/JournalContext"; // Import context
import JournalInputScreen from "./components/JournalInputScreen"; // Import JournalInputScreen
import SignInScreen from "./components/SignInScreen"; // Import SignIn screen
import LoginScreen from "./components/LoginScreen"; // Import Login screen
import WelcomeScreen from "./components/WelcomeScreen";

import { Ionicons } from "@expo/vector-icons"; 
const Stack = createStackNavigator();

function JournalApp() {
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  const { journalEntries, addJournal, deleteJournal, updateJournal } = useJournal(); // Use global state

  function startAddJournalHandler() {
    setIsAddingEntry(true);
    setEditingEntry(null);
  }

  function endAddJournalHandler() {
    setIsAddingEntry(false);
    setEditingEntry(null);
  }

  function startEditJournalHandler(entry) {
    setEditingEntry(entry);
    setIsAddingEntry(true);
  }

  if (isAddingEntry) {
    return (
      <JournalInputScreen
        onSave={(enteredJournalText) => {
          if (editingEntry) {
            updateJournal(editingEntry.id, enteredJournalText); // Update existing entry
          } else {
            addJournal({ text: enteredJournalText }); // Add new entry
          }
          endAddJournalHandler();
        }}
        onCancel={endAddJournalHandler}
        editingEntry={editingEntry}
      />
    );
  }

  return (
    <View style={styles.appContainer}>
      <FlatList
        data={journalEntries}
        ListHeaderComponent={
          <Text style={styles.subText}>Write your thoughts, cherish your journey</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.entryCard}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryText}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => startEditJournalHandler(item)} style={styles.iconButton}>
                <Ionicons name="create-outline" size={20} color="#606060" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteJournal(item.id)} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={20} color="#B0B0B0" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.notebookContainer}
      />
  
      <TouchableOpacity style={styles.floatingAddButton} onPress={startAddJournalHandler}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );}

  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 12,
      backgroundColor: "#FAF3E0",
    },
    subText: {
      fontSize: 18,
      textAlign: "center",
   
      color: "#444",
      marginBottom: 10,
      fontStyle: "italic",
    },
    notebookContainer: {
      flexGrow: 1,
      paddingBottom: 80,
      paddingHorizontal: 10,
    },
    entryCard: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      borderBottomWidth: 1,
      borderBottomColor: "#B0A999",
    },
    entryDate: {
      fontSize: 12,
      color: "#777",
      marginBottom: 5,
      fontStyle: "italic",
    },
    entryText: {
      fontSize: 16,
      color: "#333",
      fontFamily: "serif",
      lineHeight: 24,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 10,
    },
    iconButton: {
      marginLeft: 10,
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
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
    plusText: {
      fontSize: 36,
      fontWeight: "bold",
      color: "#ffffff",
    },
  });
  


// Main App Navigation
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign In">
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Journal" component={JournalApp} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

// Wrapping the app in JournalProvider for global state management
function AppWrapper() {
  return (
    <JournalProvider>
      <App />
    </JournalProvider>
  );
}

export default AppWrapper;
