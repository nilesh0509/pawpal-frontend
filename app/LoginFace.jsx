import React from "react";
import { View, Text, Image, Pressable, Dimensions, StyleSheet } from "react-native";
import { useRouter } from "expo-router";  
import Colors from "@/constants/Colors";
import LoginScreen from './LoginScreen';

const { width, height } = Dimensions.get("window");

export default function LoginFace() {
  const router = useRouter();  

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/img/redPet.png")} style={styles.image} />
      <View style={styles.secondView}>
        <Text style={[styles.heading, { fontSize: scaleFont(40) }]}>Find Your Dream
        Pet Here</Text>
        <Text style={[styles.subheading, { fontSize: scaleFont(30) }]}>Join us & discover the best et in your location</Text>
        <Pressable onPress={() => router.push("LoginScreen")} style={styles.button}>
          <Text style={[styles.buttonText, { fontSize: scaleFont(40) }]}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const scaleFont = (size) => size * (width / 375);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND,
    flex: 1,
  },
  image: {
    width: width * 1.06,
    height: height * 0.65,
    marginLeft: -30,
  },
  secondView: {
    position: "absolute",
    top: height * 0.5,
    left: 0,
    right: 0,
    paddingTop: 40,
    padding: 6,
    alignItems: "center",
    backgroundColor: Colors.YELLOW,
    height: height * 0.6,
    borderRadius: 50,
  },
  heading: {
    color: Colors.BOLDS,
    textAlign: "center",
    fontWeight:500
  },
  subheading: {
    textAlign: "center",
    color: Colors.BOLDS,
    marginTop: 10,
  },
  button: {
    padding: 14,
    marginTop: 20,
    backgroundColor: Colors.BUTTONBG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.BOLDS,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    color: Colors.BOLDS,
    fontWeight: 500
  },
});
