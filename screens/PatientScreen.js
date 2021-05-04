import React from "react";
import { Text } from "react-native";

const PatientScreen = () => <Text>Patient Screen</Text>;

PatientScreen.navigationOptions = {
  title: "Карта пациента",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

// class PatientScreen extends React.Component {
//   static navigationOptions = {
//     title: "Пациенты",
//     headerTintColor: "#2A86FF",
//   };
//   render() {
//     return <Text>Patient Screen</Text>;
//   }
// }

// function PatientScreen() {

// }

export default PatientScreen;
