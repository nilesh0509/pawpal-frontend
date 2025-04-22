import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Colors from '@/constants/Colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from '@/src/services/authService';
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const SignupPage = () => {
  const [secureEntry, setSecureEntry] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const router = useRouter();

  const handleSignup = async () => {
    try {
      setLoading(true);
      await registerUser(name, email, password);
      Toast.show({ type: "success", text1: "Account Created Successfully!" });
      router.push("../LoginScreen/LoginPage");
    } catch (error) {
      console.log(error);
      Toast.show({ type: "error", text1: error });
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = () => {
    router.push("../LoginScreen/LoginPage");
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"user"} size={30} color={Colors.SECONDARY} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your name"
            placeholderTextColor={Colors.SECONDARY}
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
        </View>

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

        <TouchableOpacity
          style={[styles.loginButtonWrapper, { opacity: loading ? 0.6 : 1 }]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.BOLDS} />
          ) : (
            <Text style={styles.loginText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupPage;

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