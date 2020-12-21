//import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Group } from "./components";

export default function App() {
  return (
    <Container>
      <Group
        title="20 декабря"
        items={[
          {
            time: "15:30",
            diagnosis: "пульпит, удаление зуба",
            user: {
              fullname: "Анжела Матиева",
              avatar:
                "https://sun2.dataix-by-minsk.userapi.com/impg/c857736/v857736470/1979ae/icAtw6izfyc.jpg?size=50x0&quality=96&crop=0,161,708,708&sign=0af826e647e9a3a1502b075846fccb94&ava=1",
            },
          },
          {
            time: "14:00",
            diagnosis: "периодонтит",
            user: {
              fullname: "Василий Реактович",
              avatar:
                "https://sun1.dataix-by-minsk.userapi.com/impg/cDPKK44F7WUxVhGin-cEQylnoKlX1W1pC1AfvA/kzIPgDxsNc8.jpg?size=50x0&quality=96&crop=0,175,448,448&sign=0a90d5e8a93f1a922d83d6367922459a&ava=1",
            },
          },
        ]}
      ></Group>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  margin-top: 50px;
`;
