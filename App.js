//import { StatusBar } from "expo-status-bar";
import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { HomeScreen, PatientScreen } from "./screens/";

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Пациенты",
      headerTintColor: "#2A86FF",
      headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8,
      },
    },
  },
  Patient: {
    screen: PatientScreen,
    navigationOptions: {
      title: "Пациент",
      headerTintColor: "#2A86FF",
      headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8,
      },
    },
  },
});

export default createAppContainer(AppNavigator);
