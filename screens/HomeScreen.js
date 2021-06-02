import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, SectionList, Alert } from "react-native";
import styled from "styled-components/native";
import { Appointment, SectionTitle } from "../components";
import { Ionicons } from "@expo/vector-icons";

import Swipeable from "react-native-swipeable-row";
import { appointmentsApi } from "../utils/api";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = () => {
    setIsLoading(true);
    // let id = [];
    appointmentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
        // console.log(data.data);
        // data.data.map((item) => {
        //   id.push(item.data[0].patient._id);
        // });
        // console.log(id);
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };

  useEffect(fetchAppointments, []);

  useEffect(fetchAppointments, [navigation.state.params]);

  const removeAppointment = (id) => {
    Alert.alert(
      "Удаление приема",
      "Вы действительно хотите удалить прием?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setIsLoading(true);
            appointmentsApi
              .remove(id)
              .then(() => {
                fetchAppointments();
              })
              .catch(() => {
                setIsLoading(false);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item) => item._id}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton
                  onPress={() =>
                    navigation.navigate("EditAppointment", {
                      appointment: item,
                    })
                  }
                  style={{ backgroundColor: "#B4C1CB" }}
                >
                  <Ionicons name="md-create" size={28} color="white" />
                </SwipeViewButton>,
                <SwipeViewButton
                  onPress={removeAppointment.bind(this, item._id)}
                  style={{ backgroundColor: "#F85A5A" }}
                >
                  <Ionicons name="ios-close" size={48} color="white" />
                </SwipeViewButton>,
              ]}
            >
              <Appointment navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")}>
        <Ionicons name="ios-add" size={38} color="white" />
      </PlusButton>
    </Container>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: "Посещение",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
  headerRight: () => (
    <TouchableOpacity
      onPress={navigation.navigate.bind(this, "ListPatients")}
      style={{ marginRight: 20 }}
    >
      <Ionicons name="md-people" size={28} color="black" />
    </TouchableOpacity>
  ),
});

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

export default HomeScreen;

// {arr.map(item => {
//   let id = item.data[0]._id;
//   console.log(id);
// })}

/*
import file from './data1.js';
import db from './data2.js';
let fileId = [],  dbId = [], isHere = [];
export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      {file.map(item => {
        fileId.push(item.data[0].patient._id);
      })}

      {db.map(item => {
        dbId.push(item.data[0].patient._id);
      })}

      {(console.log('file:', fileId), console.log('db:', dbId))}

      {(isHere = fileId.filter(id => dbId.find(item => id === item)))}

      {(console.log(isHere), console.log(Array.isArray(isHere)))}

      {fileId.map(id => {
        matches = dbId.find(item => id === item);
        
        // matches != undefined ? console.log(matches) : console.log('netu:', id);
        
        matches != undefined ? addAppointment(id) :  Alert(..., addPatient(id), addAppointment(id));
        
      })}


    </div>
  );
}


*/
