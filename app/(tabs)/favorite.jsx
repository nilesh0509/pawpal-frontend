import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PetListItem from "../../src/components/Home/PetListItem";
import axios from "axios";
import { getPetsByCategory } from "@/src/services/petService";
import Colors from "../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

const API_URL = "http://192.168.1.10:8080/api/pets";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritePets, setFavoritePets] = useState([]);

  const fetchPets = async () => {
    try {
      const response = await axios.get(API_URL);
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorite");
      const favoriteIds = storedFavorites ? JSON.parse(storedFavorites) : [];
      const allPets = await fetchPetsFromBackend();
      const filteredPets = allPets.filter(pet => favoriteIds.includes(pet._id));
      setFavoritePets(filteredPets);
    } catch (error) {
      console.error("Error fetching favorite pets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPetsFromBackend = async () => {
    const response = await fetch(API_URL);
    return await response.json();
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Pets ❤️</Text>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : favoritePets.length === 0 ? (
        <Text style={styles.emptyText}>No favorite pets added yet. Add some! 🐶🐱</Text>
      ) : (
        <FlatList
          data={favoritePets}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => <PetListItem pet={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: Colors.BACKGROUND },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: Colors.BOLDS },
  emptyText: { fontSize: 16, color: Colors.GRAY, textAlign: "center", marginTop: 20 },
});
