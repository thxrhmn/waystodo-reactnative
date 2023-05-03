import React, { useState } from "react";
import { API } from '../config/Api'
import { useMutation, useQuery } from 'react-query';
import { StyleSheet } from "react-native";

import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  TextArea,
  Image,
  Select,
  HStack,
} from "native-base";

export default function AddList({ navigation }) {

  const [todo, setTodo] = useState({
    name: "",
    date: "",
    description: "",
    categoryID: [],
  })

  const handleOnChange = (name, value) => {
    setTodo({
      ...todo,
      [name]:value,
    })
  }

  let {data: category} = useQuery("categoryCache", async ()=> {
    const response = await API.get("/category")
    return response.data;
  })

  const handleTodo = useMutation(async (e) => {
    try{
      const response = await API.post("/todo", todo)
      // console.log(response)
      alert("Add List success")
      console.log(todo)
      navigation.navigate("TodoList")
    } catch (error) {
      console.log(error)
      alert("Add List failed")
      console.log(todo)
    }
  })

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
          Add List
        </Heading>

        <VStack space={3} mt={5}>

          <FormControl>
            <Input
              onChangeText={(value) => handleOnChange("name", value)}
              value={todo?.name}
              type="text"
              placeholder="Name"
              color="black"
              fontSize={16}
              backgroundColor="#0000004F"
              opacity={25}
            />
          </FormControl>

          <FormControl>
            <Select
              minWidth="200"
              accessibilityLabel="Category"
              placeholder="Category"
              color="black"
              fontSize={16}
              backgroundColor="#0000004F"
              opacity={25}
              onChangeText={(value) => handleOnChange("categoryID", value)}
              selectedValue={todo.categoryID}
            >

              {category?.map((item) => 
                <Select.Item key={item._id} label={item.name} value={item._id} />
              )}

            </Select>
          </FormControl>

          <FormControl>
            <Input
              onChangeText={(value) => handleOnChange("date", value)}
              value={todo?.date}
              type="text"
              color="black"
              placeholder="Choose Date"
              fontSize={16}
              backgroundColor="#0000004F"
              opacity={25}
            />
          </FormControl>

          <FormControl mb={10}>
            <TextArea
              onChangeText={(value) => handleOnChange("description", value)}
              value={todo?.description}
              h={20}
              placeholder="Description"
              color="black"
              fontSize={16}
              backgroundColor="#0000004F"
              opacity={25}
            />
          </FormControl>

          <VStack>
            <Button
              onPress={(e) => handleTodo.mutate(e)}
              backgroundColor="#FF5555"
              borderRadius={10}
              _text={{ color: "white", fontSize: 20, fontWeight: "bold" }}
            >
              Add List
            </Button>
          </VStack>

          <HStack justifyContent="center"></HStack>
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
          source={require("../assets/icons/clipboard.png")}
          alt=""
          marginX={10}
        />
        <Image
          source={require("../assets/icons/tasklist_red.png")}
          alt=""
          marginX={10}
        />
        <Image
          onpPress={() => navigation.navigate("AddCategory")}
          source={require("../assets/icons/category.png")}
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
