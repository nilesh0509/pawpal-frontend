import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function PetListItem({ pet, isFavorite, onToggleFavorite }) {
  const [favorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); 

  const saveFavorite = async () => {
    setFavorite(true);
    const petId = pet._id;
    
    try {
      const existingFavorites = await AsyncStorage.getItem('favorite');
      const favoriteList = existingFavorites ? JSON.parse(existingFavorites) : [];
      
      if (!favoriteList.includes(petId)) {
        favoriteList.push(petId);
        await AsyncStorage.setItem('favorite', JSON.stringify(favoriteList));
        alert("Pet is in Favorite List");
      }
    } catch (error) {
      console.error("Error saving favorite pet:", error);
    }
  };

  const removeFavorite = async () => {
    setFavorite(false);
    const petId = pet._id;
    
    try {
      const existingFavorites = await AsyncStorage.getItem('favorite');
      const favoriteList = existingFavorites ? JSON.parse(existingFavorites) : [];
      
      const updatedFavorites = favoriteList.filter((id) => id !== petId);
      await AsyncStorage.setItem('favorite', JSON.stringify(updatedFavorites));
      alert("Pet is removed from Favorite List");
    } catch (error) {
      console.error("Error removing favorite pet:", error);
    }
  };

  const renderFavorite = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorite');
      const favoriteList = existingFavorites ? JSON.parse(existingFavorites) : [];
      
      setFavorite(favoriteList.includes(pet._id));
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading favorite list:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    renderFavorite();
  }, []);

  const handlePetPress = () => {
    router.navigate({
      pathname: "./PetDetailsScreen",
      params: { id: pet._id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePetPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: pet.imageUrl}}
          style={styles.petImage}
          resizeMode="cover"
        />
      </View>
      
      <TouchableOpacity
        onPress={() => favorite ? removeFavorite() : saveFavorite()}
        style={styles.favoriteIcon}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={24}
          color={favorite ? "red" : Colors.LIGHT_PRIMARY}
        />
      </TouchableOpacity>

      <View style={styles.petDetails}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed}</Text>
        <Text style={styles.petAge}>{pet.age} years old</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.YELLOW,
    borderRadius: 15,
    padding: 10,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 185,
    height: 280,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  petImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  favoriteIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  petDetails: {
    marginTop: 8,
    width: "100%",
  },
  petName: {
    fontWeight: "bold",
    fontSize: 16,
    color: Colors.TEXT_BOLD,
    textAlign: "center",
  },
  petBreed: {
    fontSize: 14,
    color: Colors.TEXT_SECONDARY,
    textAlign: "center",
  },
  petAge: {
    fontSize: 12,
    color: Colors.TEXT_LIGHT,
    marginTop: 3,
    textAlign: "center",
  },
});
