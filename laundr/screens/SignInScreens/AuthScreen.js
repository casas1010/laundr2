import React, { useState, useRef, useEffect } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  AsyncStorage,
} from "react-native";
// import jwtDecode from "jwt-decode";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import RNPickerSelect from "react-native-picker-select";
import axios from "axios";

const WIDTH = Dimensions.get("window").width;
const USERTYPES = [
  { label: "User", value: "User" },
  { label: "Washer", value: "Washer" },
  { label: "Driver", value: "Driver" },
];

// NOTES
// not sure how to add font Calmer Bold

const AuthScreen = (props) => {
  const [email, setEmail] = useState("jcasasmail@gmail.com");
  const [password, setPassword] = useState("yCxGRcgJ7C9JdY2");
  const [userType, setUserType] = useState();
  const [isWasher, setIsWasher] = useState();
  const [isDriver, setIsDriver] = useState();
  const [isAdmin, setIsAdmin] = useState();

  // ANIMATION
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1900,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  // ANIMATION

  // LOG IN FLOW
  const handleLogin = async (event) => {
    // console.log(`login initiated with the following:`);
    // console.log(`email: ${email}`);
    // console.log(`password: ${password}`);
    // console.log(`userType: ${userType}`);

    // this.handleInputValidation()
    if (true) {
      try {
        const response = await axios.post("/api/user/login", {
          email: email.toLowerCase(),
          password: password,
        });

        if (response.data.success) {
          const token = response.data.token;
          await AsyncStorage.setItem("email_token", token);

          localStorage.setItem("email_token", token);

          const data = jwtDecode(token);

          setIsWasher(data.isWasher);
          setIsDriver(data.isDriver);
          setIsAdmin(data.isAdmin);
        } else {
          // this.context.showAlert(response.data.message);
          console.log("else:(");
        }
      } catch (error) {
        // showConsoleError("logging in", error);
        // this.context.showAlert(caughtError("logging in", error, 99));
        console.log("error!");
      }
    }
  };
  // LOG IN FLOW

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.masterContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.logo}>
              <Image
                style={{ height: 130, width: WIDTH * 0.85 }}
                resizeMode="contain"
                source={require("../../assets/Launch_Logo.png")}
              />
            </View>

            <Animated.View
              style={{
                opacity: fadeAnim,
                alignItems: "center",
              }}
            >
              <Text style={styles.animatedText}>Explore More. Stress Less</Text>
            </Animated.View>

            <RNPickerSelect
              placeholder={{}}
              onValueChange={(value) => setUserType(value)}
              items={USERTYPES}
              style={pickerSelectStyles}
            />

            <View style={styles.formContainer}>
              <View style={styles.emailContainer}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color="black"
                  style={[styles.icon, { paddingTop: 3 }]}
                />
                <TextInput
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  placeholder=" Email"
                  style={styles.inputBox}
                />
              </View>

              <View style={styles.passwordContainer}>
                <FontAwesome5
                  name="unlock-alt"
                  size={18}
                  color="black"
                  style={[styles.icon, { paddingLeft: 3, paddingTop: 5 }]}
                />
                <TextInput
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                  placeholder=" Password"
                  style={styles.inputBox}
                />
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("signUpDetails")}
              >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => props.navigation.navigate("forgotPassword")}
              >
                <Text style={styles.buttonText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  masterContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    marginTop: 10,
    alignItems: "center",
  },
  animatedText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    // fontFamily:'Calmer Bold'
  },
  formContainer: {
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userTypeBox: {
    borderColor: "red",
    borderWidth: 1,
    width: 57,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  emailContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: 110,
    height: 45,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    paddingLeft: 5,
  },
  icon: {
    height: 30,
    width: 30,
  },
  passwordContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#01c9e2",
    margin: 10,
    // height: 20,
    width: 250,
    borderRadius: 10,
  },
  buttonText: {
    padding: 10,
    fontSize: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ebebeb",
    borderRadius: 4,
    color: "black",
    width: 80,
    marginBottom: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#ebebeb",
    borderRadius: 8,
    color: "black",
    width: 80,
    marginBottom: 5,
  },
});

export default AuthScreen;