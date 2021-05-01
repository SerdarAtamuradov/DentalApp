// "https://sun2.dataix-by-minsk.userapi.com/impg/c857736/v857736470/1979ae/icAtw6izfyc.jpg?size=50x0&quality=96&crop=0,161,708,708&sign=0af826e647e9a3a1502b075846fccb94&ava=1"
//import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const Group = ({ user, diagnosis, active, time }) => {
  return (
    <GroupItem>
      <Avatar source={{ uri: user.avatar }} />
      <View style={{ flex: 1 }}>
        <FullName>{user.fullname}</FullName>
        <GrayText>{diagnosis}</GrayText>
      </View>
      <GroupDate active={active}>{time}</GroupDate>
    </GroupItem>
  );
};

Group.defaultProps = {
  groupTitle: "Untitled",
  items: [],
};

const GroupDate = styled.Text`
  background: ${(props) => (props.active ? "#2A86FF;" : "#e9f5ff;")};
  color: ${(props) => (props.active ? "#2FFF;" : "#4294ff;")};
  border-radius: 18px;
  font-weight: bold;
  font-size: 14px;
  width: 70px;
  height: 32px;
  text-align: center;
  line-height: 28px;
`;

const GrayText = styled.Text`
  font-size: 16px;
  color: #8b979f;
`;

const FullName = styled.Text`
  font-style: normal;
  font-size: 16px;
  /*font-weight: 600;*/
  font-weight: bold;
`;

const Avatar = styled.Image`
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

// const GroupTitle =

// const GroupBlock = styled.View`
//   padding: 0 20px;
//   margin-bottom: 25px;
// `;

export default Group;
