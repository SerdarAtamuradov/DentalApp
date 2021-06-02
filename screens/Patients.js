import React, { useState, useEffect } from "react";
import { FlatList, Alert, View, Text, SectionList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Swipeable from "react-native-swipeable-row";
import { Item, Input } from "native-base";

import { Appointment, SectionTitle, SpisokPatients } from "../components";
import { patientsApi } from "../utils/api";

const Patients = (props) => {
  const { navigation } = props;
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchPatients = () => {
    setIsLoading(true);
    patientsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
        // console.log(data.data);
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPatients, []);

  useEffect(fetchPatients, [navigation.state.params]);

  const onSearch = (e) => {
    setSearchValue(e.nativeEvent.text);
  };

  const removePatient = (id) => {
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
            patientsApi
              .remove(id)
              .then(() => {
                fetchPatients();
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
        <>
          <View style={{ padding: 20 }}>
            <Item style={{ paddingLeft: 15, borderRadius: 30 }} regular>
              <Input onChange={onSearch} placeholder="Поиск..." />
            </Item>
          </View>
          <FlatList
            data={data.filter(
              (item) =>
                item.fullname
                  .toLowerCase()
                  .indexOf(searchValue.toLowerCase()) >= 0
            )}
            keyExtractor={(item) => item._id}
            onRefresh={fetchPatients}
            refreshing={isLoading}
            renderItem={({ item }) => (
              <Swipeable
                rightButtons={[
                  <SwipeViewButton
                    // onPress={navigation.navigate.bind(this, "EditPatient", {
                    //   PatientId: item._id,
                    //   Patient: item,
                    // })}
                    style={{ backgroundColor: "#B4C1CB" }}
                  >
                    <Ionicons name="md-create" size={28} color="white" />
                  </SwipeViewButton>,
                  <SwipeViewButton
                    onPress={removePatient.bind(this, item._id)}
                    style={{ backgroundColor: "#F85A5A" }}
                  >
                    <Ionicons name="ios-close" size={48} color="white" />
                  </SwipeViewButton>,
                ]}
              >
                <SpisokPatients
                  navigate={navigation.navigate}
                  item={{
                    patient: item,
                  }}
                />
              </Swipeable>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <SectionTitle>{title}</SectionTitle>
            )}
          />
        </>
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")}>
        <Ionicons name="ios-add" size={38} color="white" />
      </PlusButton>
    </Container>
  );
};

Patients.navigationOptions = {
  title: "Пациенты",
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

export default Patients;
// .filter(
//   (item) =>
//     item.fullname
//       .toLowerCase()
//       .indexOf(searchValue.toLowerCase()) >= 0
// )
