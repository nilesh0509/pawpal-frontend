import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import Category from "./Category";
import PetListItem from "./PetListItem";
import { getPetsByCategory } from "@/src/services/petService";
import Colors from "@/constants/Colors";

export default function PetListByCategory() {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onCategorySelect("Dogs");
  }, []);

  const onCategorySelect = async (category) => {
    setLoading(true);
    setPetList([]);
    try {
      const data = await getPetsByCategory(category);
      setPetList(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Category onCategorySelect={onCategorySelect} />

      {loading ? (
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      ) : petList.length > 0 ? (
        <FlatList
          data={petList}
          horizontal
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <PetListItem pet={item} />}
          style={{ marginTop: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No pets available in this category.
        </Text>
      )}
    </View>
  );
}
