import React, { useState, useContext } from "react";
import { useMutation } from "react-query";
import { API, setAuthorization } from "../config/Api";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from "../context/UserContext";

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Image,
  HStack,
} from "native-base";


export default function Login({ navigation }) {
  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const logCheck = async() => {
    try {
      const response = await AsyncStorage.getItem("token")
      console.log(response)

      if (response) {
        setAuthorization(response);
        navigation.navigate("TodoList")
      } 

    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = useMutation(async (e) => {
    try {
      const response = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (response) {
        await AsyncStorage.setItem("token", response.data.token)

        // send data to useContext
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data,
        })
        logCheck()
      }

      console.log(response);
      alert("Login Succes");
      navigation.navigate("TodoList");

    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  });

  return (
    <Box
      safeArea
      bg="white"
      flex={1}
      p={10}
      w="100%"
      mx="auto"
      justifyContent="center"
    >
      <HStack justifyContent="center">
        <Image
          style={{ marginBottom: 20 }}
          source={require("../assets/auth.png")}
          alt=""
        />
      </HStack>

      <Heading fontWeight="extrabold" size="2xl" color="black">
        Login
      </Heading>

      <VStack space={3} mt={5}>
        <FormControl>
          <Input
            onChangeText={(value) => handleOnChange("email", value)}
            value={form?.email}
            placeholder="Email"
            color="black"
            fontSize={16}
            backgroundColor="#0000004F"
            opacity={25}
          />
        </FormControl>
        <FormControl mb={10}>
          <Input
            onChangeText={(value) => handleOnChange("password", value)}
            value={form?.password}
            type="password"
            color="black"
            placeholder="Password"
            fontSize={16}
            backgroundColor="#0000004F"
            opacity={25}
          />
        </FormControl>

        <VStack>
          <Button
            onPress={(e) => handleLogin.mutate(e)}
            backgroundColor="#FF5555"
            borderRadius={10}
            _text={{ color: "white", fontSize: 20, fontWeight: "bold" }}
          >
            Login
          </Button>
        </VStack>

        <HStack justifyContent="center" alignItems="center">
          <Text fontSize="md" color="muted.700" fontWeight={400}>
            New Users?{" "}
          </Text>
          <Text
            onPress={() => navigation.navigate("Register")}
            color="#FF5555"
            fontSize="md"
            fontWeight={400}
          >
            Register
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
