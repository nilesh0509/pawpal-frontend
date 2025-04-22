import React, { useEffect, useState } from "react";
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity 
} from "react-native";
import { getCategories } from "@/src/services/categoryService";
import Colors from "../../../constants/Colors";

// const SERVER_URL = "http://192.168.1.10:8080"; 
const SERVER_URL = "https://pawpal-backend-1.onrender.com"; 

export default function Category({ onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategoryList(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onCategorySelect(item.name)}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${SERVER_URL}${item.imageUrl}` }}
          style={styles.categoryImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Categories</Text>
      <FlatList
        data={categoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id?.toString() || item.id?.toString()}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 15,
    color: Colors.BOLDS
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: Colors.BORDERR,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.YELLOW, 
  },
  categoryImage: {
    width: '80%',  
    height: '80%',
    borderRadius: 15, 
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.BOLDS,
    textAlign: 'center',
  },
});

