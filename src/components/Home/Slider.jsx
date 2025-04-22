import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Dimensions, FlatList, ActivityIndicator } from "react-native";
import { getSliders } from "@/src/services/sliderService";
import Colors from "@/constants/Colors";

const { width } = Dimensions.get("screen"); 

const SERVER_URL = "http://192.168.1.10:8080";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const data = await getSliders();
        setSliderList(data);
      } catch (error) {
        console.error("Error fetching sliders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  const renderSliderItem = ({ item }) => {
    const fullImageUrl = `${SERVER_URL}${item.imageUrl}`;
  
    return (
      <View style={styles.slideContainer}>
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.sliderImage}
        />
      </View>
    );
  };

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {sliderList.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.PRIMARY} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sliderList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item?.imageUrl}
        renderItem={renderSliderItem}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  slideContainer: {
    width: width * 0.8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  sliderImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: Colors.BORDERR,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#1f2937",
  },
  inactiveDot: {
    backgroundColor: "#e5e7eb",
  },
});
