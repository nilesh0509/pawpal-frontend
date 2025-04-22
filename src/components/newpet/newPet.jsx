import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../../constants/Colors";

export default function NewPet() {
  const navigation = useNavigation();
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [food, setFood] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const savePet = async () => {
    if (
      !petName ||
      !breed ||
      !age ||
      !category ||
      !gender ||
      !weight ||
      !address ||
      !about ||
      !food ||
      !image
    ) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const petData = {
        name: petName,
        breed,
        age,
        category,
        imageUrl: image,
        gender,
        weight,
        address,
        about,
        food,
      };

      const response = await fetch("http://192.168.1.10:8080/api/pets/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        Alert.alert("Success", "Pet added successfully!");
        setPetName("");
        setBreed("");
        setAge("");
        setCategory("");
        setGender("");
        setWeight("");
        setAddress("");
        setAbout("");
        setFood("");
        setImage(null);
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error saving pet:", error);
      Alert.alert("Error", "Failed to add pet. Try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Add New Pet</Text>

      <Pressable onPress={pickImage} style={styles.imageWrapper}>
        {!image ? (
          <View style={styles.imagePlaceholder}>
            <Image
              source={require("../../../assets/images/placeholder.png")}
              style={styles.imagePreview}
            />
          </View>
        ) : (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          value={petName}
          onChangeText={setPetName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Breed *</Text>
        <TextInput
          style={styles.input}
          placeholder="Breed"
          value={breed}
          onChangeText={setBreed}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select category" value="" />
            <Picker.Item label="Dogs" value="Dogs" />
            <Picker.Item label="Cats" value="Cats" />
            <Picker.Item label="Birds" value="Birds" />
            <Picker.Item label="Fish" value="Fish" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => setGender(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          placeholder="Weight in kg"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Food *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the Foods"
          value={food}
          onChangeText={setFood}
          keyboardType="default"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="About Pet and Pet Owner"
          value={about}
          onChangeText={setAbout}
          multiline={true}
        />
      </View>

      <TouchableOpacity onPress={savePet} style={styles.saveButton}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveText}>Submit</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: Colors.BOLDS,
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.BORDERR,
    backgroundColor: Colors.YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 15,
    borderColor : Colors.BORDERR
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.BOLDS,
    marginBottom: 5,
  },
  input: {
    borderWidth: 3,
    borderColor: Colors.BORDERR,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: Colors.YELLOW,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 3,
    borderColor: Colors.BORDERR,
    borderRadius: 8,
    backgroundColor: Colors.YELLOW,
  },
  picker: {
    height: 50,
    width: '100%',
    color: Colors.BOLDS,
  },
  saveButton: {
    borderWidth: 3,
    backgroundColor: Colors.YELLOW,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    borderColor: Colors.BORDERR,
  },
  saveText: {
    color: Colors.BOLDS,
    fontWeight: "bold",
    fontSize: 18,
  },
});
