import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to Memento</Text>
      

      <TouchableOpacity
        style={styles.openButton}
        onPress={() => navigation.navigate("Journal")}
      >
        <Text style={styles.buttonText}>Open</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAF3E0",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200 ,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 180,
  },
  
  openButton: {
    backgroundColor: "#606060",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
