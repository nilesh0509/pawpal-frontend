import { View, Image, StyleSheet, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { useRouter } from "expo-router";  
import SPLASH from "@/assets/images/splash-icon.png"; 

export default function SplashScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const router = useRouter(); 

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      router.replace("/LoginFace"); 
    }, 2500);
  }, [fadeAnimation, router]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.imageContainer, opacity: fadeAnimation }}>
        <Image style={styles.image} source={SPLASH} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: 450,
    height: 920,
  },
});



