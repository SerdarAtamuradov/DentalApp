//import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Serdarbek</Text>
    //   <StatusBar style="auto" />
    // </View>
    <Container>
      <Group>
        <GroupTitle>11 сентября</GroupTitle>
        <GroupItem>
          <Avatar
            source={{
              uri:
                "https://sun1.dataix-by-minsk.userapi.com/impg/cDPKK44F7WUxVhGin-cEQylnoKlX1W1pC1AfvA/kzIPgDxsNc8.jpg?size=200x0&quality=96&crop=0,175,448,448&sign=cb6e10d67235948437c05101304f06ce&ava=1",
            }}
          />
        </GroupItem>
      </Group>
    </Container>
  );
}

const Avatar = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;

const GroupItem = styled.View``;

const GroupTitle = styled.Text`
  font-weight: 900;
  font-size: 28px;
  color: #000000;
`;

const Group = styled.View``;

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
`;
