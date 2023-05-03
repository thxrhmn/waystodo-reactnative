import React, { useContext } from "react";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import { useTheme } from "native-base";
import Register from "./src/screens/Register";
import AddList from "./src/screens/AddList";
import AddCategory from "./src/screens/AddCategory";
import TodoList from "./src/screens/TodoList";
import { UserContext } from "./src/context/UserContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTab() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerMode: "screen",
        headerTintColor: "black",
        // headerStyle: { backgroundColor: theme.colors.muted["800"] },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "TodoList") {
            iconName = focused ? "list-alt" : "list-alt";
          } else if (route.name === "AddList") {
            iconName = focused ? "playlist-add" : "playlist-add";
          } else if (route.name === "AddCategory") {
            iconName = focused ? "category" : "category";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF5555",
        tabBarInactiveTintColor: theme.colors.gray["400"],
      })}
    >
      <Tab.Screen
        name="TodoList"
        component={TodoList}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="AddList"
        component={AddList}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddCategory"
        component={AddCategory}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Container() {
  const theme = useTheme();
  const [state] = useContext(UserContext);
  return (
    <NavigationContainer>
      {state.isLogin ? (
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerMode: "screen",
            headerShown: false,
            headerTintColor: "white",
            headerStyle: { backgroundColor: theme.colors.muted["100"] },
          }}
        >
          <Stack.Screen
            name="Main"
            component={MyTab}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AddList"
            component={AddList}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AddCategory"
            component={AddCategory}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="TodoList"
            component={TodoList}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
