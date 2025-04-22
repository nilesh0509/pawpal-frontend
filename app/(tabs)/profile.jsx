import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { getUser } from "../../src/services/authService";
import { Svg, Text as SvgText, Rect } from "react-native-svg";
import Colors from "../../constants/Colors";
import LoginFace from "../LoginFace";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        if (userData) {
          setUser(userData);
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const defaultProfileImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const menu = [
    { id: 1, name: "Add New Pet", icon: "add-circle", path: "/addNewPet" },
    { id: 5, name: "My Posts", icon: "bookmark", path: "/user-post" },
    { id: 2, name: "Favorites", icon: "heart", path: "/favorite" },
    { id: 3, name: "Inbox", icon: "chatbubble", path: "/chat" },
    { id: 6, name: "Logout", icon: "exit", path: "../LoginFace" },
  ];

  const onPressMenu = (item) => {
    if (item.name === "Logout") {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: () => {
              Alert.alert("Logged Out", "You have been successfully logged out.");
              router.replace("../LoginFace");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      router.push(item.path);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="warning" size={50} color={Colors.ERROR} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.reload()}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <TouchableOpacity onPress={() => router.push("/edit-profile")}>
          <Ionicons name="create" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        {user?.profilePhoto ? (
          <Image source={{ uri: user.profilePhoto }} style={styles.profileImage} />
        ) : user?.name ? (
          <View style={styles.letterAvatar}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
              <Rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="50"
                ry="50"
                fill={Colors.PRIMARY}
                stroke={Colors.BORDERR}
                strokeWidth="3"
              />
              <SvgText
                x="50%"
                y="50%"
                fontSize="40"
                fill={Colors.WHITE}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {user.name.charAt(0).toUpperCase()}
              </SvgText>
            </Svg>
          </View>
        ) : (
          <Image source={{ uri: defaultProfileImage }} style={styles.profileImage} />
        )}

        <Text style={styles.name}>{user?.name || "PawPal User"}</Text>
        <Text style={styles.email}>{user?.email || "user@pawpal.com"}</Text>
        
       
      </View>

      <FlatList
        data={menu}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconContainer}>
              <Ionicons
                name={item.icon}
                size={24}
                color={item.name === "Logout" ? Colors.PRIMARY : Colors.PRIMARY}
              />
            </View>
            <Text 
              style={[
                styles.menuText,
                item.name === "Logout" && styles.logoutText
              ]}
            >
              {item.name}
            </Text>
            <Ionicons 
              name="chevron-forward" 
              size={20} 
              color={Colors.GRAY} 
              style={styles.chevron}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.BACKGROUND,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.ERROR,
    marginVertical: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.BOLDS,
    fontFamily: "outfit-bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  profileImage: {
    width: 100,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: Colors.BORDERR,
  },
  letterAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    color : Colors.BOLDS
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.BOLDS,
    fontFamily: "outfit-bold",
  },
  email: {
    fontSize: 16,
    color: Colors.BOLDS,
    marginTop: 5,
    fontFamily: "outfit",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 25,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.BOLDS,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 4,
  },
  menuContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 12,
    // borderColor: Colors.BORDERR,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuText: {
    fontSize: 18,
    color: Colors.BOLDS,
    flex: 1,
    fontFamily: "outfit-medium",
  },
  logoutText: {
    color: Colors.BOLDS,
  },
  chevron: {
    marginLeft: 10,
  },
});
