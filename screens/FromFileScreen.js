import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, SectionList, Alert } from "react-native";
import styled from "styled-components/native";
import { Appointment, SectionTitle } from "../components";
import { Ionicons } from "@expo/vector-icons";

import Swipeable from "react-native-swipeable-row";
import { appointmentsApi } from "../utils/api";

const FromFileScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return <Text>asadas</Text>;
};

FromFileScreen.navigationOptions = {
  title: "Данные с файла",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

const PlusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: #2a86ff;
  position: absolute;
  right: 15px;
  bottom: 25px;
  shadow-color: #2a86ff;
  shadow-opacity: 0.7;
  shadow-radius: 3.5px;
  elevation: 5;
`;

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fbfbfb;
`;

export default FromFileScreen;
