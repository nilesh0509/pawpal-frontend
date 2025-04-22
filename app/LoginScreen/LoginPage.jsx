import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from '@/constants/Colors'
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import SignupPage from "../SignUpScreen/SignupPage"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '@/src/services/authService'
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");
const LoginPage = () => {

  const [secureEntry, setSecureEntry] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      console.log(loginUser)
      Toast.show({ type: "success", text1: "Login Successful!" });
      router.push("../HomeScreen");
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error });
    }
  };

  const handleSignup = () => {
    setIsStarted(true); 
  };

  if (isStarted) {
    return <SignupPage />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={Colors.SECONDARY} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={Colors.SECONDARY}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={Colors.SECONDARY} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={Colors.SECONDARY}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureEntry(prev => !prev)}
            disabled={!password}
          >
            <SimpleLineIcons name={"eye"} size={20} color={Colors.SECONDARY} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButtonWrapper, { opacity: loading ? 0.6 : 1 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.BOLDS} />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: width * 0.04,
  },
  textContainer: {
    marginVertical: height * 0.04,
    paddingTop: height * 0.04,
  },
  headingText: {
    fontSize: width * 0.11,
    color: Colors.BOLDS,
    textAlign: "center",
    fontWeight: "800",
  },
  formContainer: {
    marginTop: height * 0.01,
    
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.BOLDS,
    borderRadius: 50,
    paddingHorizontal: width * 0.04,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.014,
    backgroundColor: Colors.YELLOW,
    height: height * 0.06,
    
  },
  textInput: {
    flex: 1,
    paddingHorizontal: width * 0.02,
  },
  forgotPasswordButton: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
   
    color: Colors.BOLDS,
    fontSize: width * 0.04,
    marginVertical: height * 0.014,
  },
  loginButtonWrapper: {
    backgroundColor: Colors.YELLOW,
    borderWidth: 1,
    borderColor: Colors.BOLDS,
    borderRadius: 50,
    marginTop: height * 0.01,
    width: '100%',
    height: height * 0.06,
  },
  loginText: {
    color: Colors.BOLDS,
    fontSize: width * 0.04,
    textAlign: "center",
    padding: height * 0.014,
    fontWeight: "600",
  },
  continueText: {
    textAlign: "center",
    marginVertical: height * 0.01,
    fontSize: width * 0.04,
    color: Colors.BOLDS,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.BOLDS,
    borderRadius: 50,
    backgroundColor: Colors.YELLOW,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: '100%',
    height: height * 0.06,
  },
  googleImage: {
    height: width * 0.05,
    width: width * 0.05,
  },
  googleText: {
    fontSize: width * 0.04,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
    gap: 5,
  },
  accountText: {
    color: Colors.BOLDS,
    fontSize: width * 0.04,
  },
  signupText: {
    color: Colors.BOLDS,
    fontSize: width * 0.04,
    fontWeight: "500",
  },
});
