import * as React from 'react'
import { Image } from 'react-native'
import { Text, Box, Pressable } from 'native-base'
import { styles } from './Styles'

export default function Home({ navigation }){ // {navigation} = agar nanti bisa berpindah-pindah screen
  return (
    <Box bg="white" flex={1} alignItems="center" justifyContent="center">

      <Image style={{marginBottom: 20}} source={require('../assets/home.png')}  alt=""/>
      <Image style={{marginBottom: 5}} source={require('../assets/ways-todo.png')} alt=""/>

      <Text style={styles.homeHeadingText}>
        Write your activity and finish your activity. Fast, Simple and Easy to Use
      </Text>

      <Pressable onPress={() => navigation.navigate("Login")} style={styles.presLogin}>
        <Text style={styles.login}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Register")} style={styles.presRegis}>
        <Text style={styles.register}>Register</Text>
      </Pressable>
{/* 
      <Pressable marginTop={3} onPress={() => navigation.navigate("TodoList")} style={styles.presLogin}>
        <Text style={styles.login}>List Todo</Text>
      </Pressable>

      <Pressable marginTop={3} onPress={() => navigation.navigate("AddCategory")} style={styles.presRegis}>
        <Text style={styles.register}>Add Category</Text>
      </Pressable>

      <Pressable marginTop={3} onPress={() => navigation.navigate("AddList")} style={styles.presLogin}>
        <Text style={styles.login}>Add List</Text>
      </Pressable> */}

    </Box>
  )
}