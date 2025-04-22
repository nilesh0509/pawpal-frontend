import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import axios from "axios";
import { Svg, Text as SvgText, Rect } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser } from "./../../services/authService";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser(); // Fetch from API
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <View style={styles.container} >
      <View style={styles.textContainer} >
        <Text style={styles.welcomeText} >Welcome,</Text>
        <Text style={styles.userNameText} >{user?.name || 'PawPal'}</Text>
      </View>

      {user?.profilePhoto ? (
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
      ) : user?.name ? (
        <View style={styles.letterAvatar}>
          <Svg height="60" width="60" viewBox="0 0 60 60" >
          <Rect
            x="0"
            y="0"
            width="60"
            height="60"
            rx="30"
            ry="30"
            fill={Colors.PRIMARY}
            stroke={Colors.BORDERR}
            strokeWidth="5"
          />
            <SvgText
              x="50%"
              y="50%"
              fontSize="24"
              fill={Colors.BOLDS}
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

    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      margin: 10,
    },
    textContainer: {
      flexDirection: 'column',
    },
    welcomeText: {
      fontSize: 18,
      color: Colors.BOLDS, 
    },
    userNameText: {
      fontSize: 24,
      color: Colors.BOLDS, 
      marginTop: 4,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 5,
      borderColor: Colors.BORDERR, 
    },
  });
