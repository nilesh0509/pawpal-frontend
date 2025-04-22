import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from "../../../constants/Colors";

export default function PetDetailsScreen({ route }) {
  const { pet } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: pet.imageUrl}}
        style={styles.petImage}
        resizeMode="cover"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.petName}>{pet.name}</Text>
        <Text style={styles.petBreed}>{pet.breed}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="paw" size={20} color={Colors.PRIMARY} />
          <Text style={styles.infoText}>Age: {pet.age} years</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={Colors.PRIMARY} />
          <Text style={styles.infoText}>Location: {pet.location || "Not specified"}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="transgender" size={20} color={Colors.PRIMARY} />
          <Text style={styles.infoText}>Gender: {pet.gender || "Not specified"}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>
            {pet.description || "No description available."}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          <Text style={styles.sectionContent}>
            {pet.healthInfo || "No health information available."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  petImage: {
    width: "100%",
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  petName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.TEXT_BOLD,
    marginBottom: 5,
  },
  petBreed: {
    fontSize: 20,
    color: Colors.TEXT_SECONDARY,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.TEXT_SECONDARY,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.TEXT_BOLD,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 24,
  },
});