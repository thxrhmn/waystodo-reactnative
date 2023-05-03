import React, { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/Api"

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

export default function Register({ navigation }) {

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    password: "",
  });

  function handleOnChange(name, value) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleRegister = useMutation(async (e) => {
    try {
      const response = await API.post("/auth/register", {
        email: form.email,
        firstName: form.firstName,
        password: form.password,
      });

      alert("Register Success");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error)
      alert("Register Failed", error);
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
        Register
      </Heading>

      <VStack space={3} mt={5}>
        <FormControl>
          <Input
            onChangeText={(value) => handleOnChange("email", value)}
            value={form?.email}
            type="email"
            placeholder="Email"
            color="black"
            fontSize={16}
            backgroundColor="#0000004F"
            opacity={25}
          />
        </FormControl>
        <FormControl>
          <Input
            onChangeText={(value) => handleOnChange("firstName", value)}
            value={form?.firstName}
            type="text"
            color="black"
            placeholder="Name"
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
            onPress={(e) => handleRegister.mutate(e)}
            backgroundColor="#FF5555"
            borderRadius={10}
            _text={{ color: "white", fontSize: 20, fontWeight: "bold" }}
          >
            Register
          </Button>
        </VStack>

        <HStack justifyContent="center">
          <Text fontSize="md" color="muted.700" fontWeight={400}>
            Joined us before?{" "}
          </Text>
          <Text
            onPress={() => navigation.navigate("Login")}
            color="#FF5555"
            fontSize="md"
            fontWeight={400}
          >
            Login
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}
