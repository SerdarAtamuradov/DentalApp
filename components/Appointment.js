//import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";
import { NavigationEvents } from "react-navigation";
import styled from "styled-components/native";
import GrayText from "./GrayText";
import Badge from "./Badge";
import getAvatarColor from "../utils/getAvatarColor";

const Appointment = ({ navigate, item }) => {
  const { patient, diagnosis, active, time } = item;
  const avatarColors = getAvatarColor(patient.fullname[0].toUpperCase());

  return (
    <GroupItem onPress={navigate.bind(this, "Patient", item)}>
      {/* <Avatar source={{ uri: user.avatar }} /> */}
      <Avatar style={{ backgroundColor: avatarColors.background }}>
        <Letter style={{ color: avatarColors.color }}>
          {patient.fullname[0].toUpperCase()}
        </Letter>
      </Avatar>
      <View style={{ flex: 1 }}>
        <FullName>{patient.fullname}</FullName>
        <GrayText>{diagnosis}</GrayText>
        <GrayText>{patient.address}</GrayText>
      </View>
      <Badge active={active}>{time}</Badge>
    </GroupItem>
  );
};

Appointment.defaultProps = {
  groupTitle: "Untitled",
  items: [],
};

const Letter = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
`;

const FullName = styled.Text`
  font-style: normal;
  font-size: 16px;
  /*font-weight: 600;*/
  font-weight: bold;
`;

const Avatar = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 40px;
  height: 40px;
  margin-right: 15px;
`;

const GroupItem = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
`;

export default Appointment;
