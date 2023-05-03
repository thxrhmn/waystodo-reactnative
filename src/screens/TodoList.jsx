import React, { useState, useEffect } from 'react'
import { API } from '../config/Api'
import { useMutation, useQuery } from "react-query";
import { Owikun } from "../assets/owikun.jpg"
import { FlatList } from 'react-native';

import { 
  Box,
  Text,
  VStack,
  Input,
  HStack,
  Select,
  Avatar,
  Checkbox,
} from 'native-base'

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TodoList({ navigation}){
  const [state] = useContext(UserContext)

  let {data: todolist} = useQuery("todolistCache", async ()=> {
    const response = await API.get("/todo")
    return response.data
  })

  let {data: todocount } = useQuery("todolistCount", async ()=> {
    const response = await API.get("todo/count")
    return response.data
  })

  let {data: category} = useQuery("categoryTodoListCache", async ()=> {
    const response = await API.get("/category")
    return response.data;
  })

  const logout = () => {
    AsyncStorage.removeItem("token")
    // navigation.navigate("Home")
    console.log("Anda Berhasil Logout")
  }

  return (
    <Box
      safeArea
      bg="white"
      flex={1}
      p={5}
      w="100%"
      mx="auto"
    >

      <HStack justifyContent="space-between" space={2} alignItems="center">
        <Text backgroundColor="yellow.500" color="black" fontWeight="bold" fontSize="5xl">
          Hi, {state.user.user?.firstName}
        </Text>

        <HStack alignItems="center">
          <Text fontSize={16} marginRight={3} color="red.400" onPress={logout}>Logout</Text>
          <Avatar bg="green.500" source={{
            uri: "https://be.heck.eu.org/uploadsavatar.png"}}>
          </Avatar>
        </HStack>
      </HStack>

      <Text backgroundColor="yellow.500" color="red.500" fontWeight="bold" fontSize={20}>
        {todocount?.count} List
      </Text>

      <Input
        type="text"
        color="black"
        placeholder="Search List...."
        fontSize={16}
        backgroundColor="#0000004F"
        opacity={25}
        marginTop={3}
      />

      <HStack justifyContent={'space-between'} marginTop={5}>
        <Input
          type="text"
          color="black"
          placeholder="Choose Date"
          fontSize={14}
          backgroundColor="#0000004F"
          opacity={25}
          width="30%"
        />

        <Select
          minWidth="34%"
          accessibilityLabel="Category"
          placeholder="Category"
          color="black"
          fontSize={14}
          backgroundColor="#0000004F"
          // width="100%"
          opacity={25}
        >
          {category?.map((item) => 
            <Select.Item key={item._id} label={item.name} value={item._id} />
          )}
        </Select>

        <Select
          minWidth="100"
          accessibilityLabel="Status"
          placeholder="Status"
          color="black"
          fontSize={14}
          backgroundColor="#0000004F"
          // width="30%"
          opacity={25}
        >
          {todolist?.map((item) => 
            <Select.Item key={item._id} label={item.status} value={item._id} />
          )}
        </Select>

      </HStack>

      <FlatList 
        data={todolist}
        renderItem={({ item }) => (
          <VStack space={4} alignItems="center" marginTop={5}>
            <HStack bg="gray.100" width="100%" padding={2} rounded="md">
              <VStack width="70%" bg="">
                <Text fontSize="2xl" color="black" fontWeight="bold">{item?.name}</Text>
                <Text numberOfLines={3} fontSize={16} color="#9B9B9B" fontWeight="bold">{item?.description}</Text>
                <Text fontSize={16} color="black" fontWeight="bold" marginTop={3}>{item?.date}</Text>
              </VStack>

              <VStack width="30%" alignItems="center" justifyContent="center">
                <Text textAlign="center" fontSize={16} padding={2} bg="blue.300" width="100%" color="white" fontWeight="s" rounded="md">Study</Text>
                
                {item?.status == "Todo" && (
                  <Text color="white" bg="yellow.300" fontWeight="bold" rounded="md" marginTop={3} padding={2}>{item?.status}</Text>
                )}

                {item?.status == "Doing" && (
                  <Text color="white" bg="blue.600" fontWeight="bold" rounded="md" marginTop={3} padding={2}>{item?.status}</Text>
                )}

                {item?.status == "Done" && (
                  <Text color="white" bg="green.400" fontWeight="bold" rounded="md" marginTop={3} padding={2}>{item?.status}</Text>
                )}

              </VStack>
            </HStack>
          </VStack>
        )}
        keyExtractor={(item) => item._id}
      />

    </Box>
  )
}