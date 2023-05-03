import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { API } from "../config/Api";
import { useMutation, useQuery } from "react-query";

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";

export default function AddCategory({ navigation }) {
  const [form, setForm] = useState({
    name: "",
  });

  const handleOnChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  let {data: category, refetch} = useQuery("categoryNewCache", async ()=> {
    const response = await API.get("/category")
    return response.data;
  })

  const handleCategory = useMutation(async (e) => {
    try {
      const response = await API.post("/category", form);
      console.log(response)
      refetch()
      alert("Add Category Succes");
    } catch (error) {
      console.log(error);
      alert("Add Category Failed");
    }
  });

  return (
    <>
      <Box
        safeArea
        bg="white"
        flex={1}
        p={10}
        w="100%"
        mx="auto"
        // justifyContent="center"
      >
        <Heading fontWeight="extrabold" size="2xl" color="black">
          Add Category
        </Heading>

        <VStack space={3} mt={5}>
          <FormControl>
            <Input
              onChangeText={(value) => handleOnChange("name", value)}
              value={form?.name}
              type="text"
              placeholder="Name"
              color="black"
              fontSize={16}
              backgroundColor="#0000004F"
              opacity={25}
            />
          </FormControl>

          <VStack>
            <Button
              onPress={(e) => handleCategory.mutate(e)}
              backgroundColor="#FF5555"
              borderRadius={10}
              _text={{ color: "white", fontSize: 20, fontWeight: "bold" }}
            >
              Add Category
            </Button>
          </VStack>

          <Heading fontWeight="extrabold" size="2xl" color="black" marginTop={10}>
            List Category
          </Heading>

          <VStack flexDirection="row" flexWrap="wrap">
            {category?.map((item) => 
              <Text bg="blue.300" marginBottom={3} marginRight={3} padding={2} fontSize={16} rounded="md" color="white" fontWeight="bold" key={item._id} value={item._id}>{item.name}</Text>          
            )}
          </VStack>

        </VStack>
      </Box>
      {/* <HStack
        height={50}
        backgroundColor="white"
        alignItems="center"
        justifyContent="center"
        style={styles.shadowww}
      >
        <Image
          onpPress={() => navigation.navigate("TodoList")}
          source={require("../assets/icons/clipboard.png")}
          alt=""
          marginX={10}
        />
        <Image
          source={require("../assets/icons/tasklist.png")}
          alt=""
          marginX={10}
        />
        <Image
          onpPress={() => navigation.navigate("AddCategory")}
          source={require("../assets/icons/category_red.png")}
          alt=""
          marginX={10}
        />
      </HStack> */}
    </>
  );
}

const styles = StyleSheet.create({
  shadowww: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
