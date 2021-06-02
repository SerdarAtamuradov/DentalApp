import React, { useState } from "react";
import { Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Item, Label, Input } from "native-base";
import { patientsApi } from "../utils/api";
import { Button, Container } from "../components";

const EditPatientScreen = ({ navigation }) => {
  const value = navigation.getParam("patient");
  console.log(value);
  const [values, setValues] = useState({
    fullname: value.fullname,
    phone: value.phone,
    address: value.address,
  });

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    patientsApi
      .update(values._id)
      .then(() => {
        navigation.navigate("ListPatients");
      })
      .catch((e) => {
        alert("BAD");
      });
  };

  return (
    <Container>
      <ScrollView>
        <Item style={{ marginLeft: 0 }} floatingLabel>
          <Label>Имя и Фамилия</Label>
          <Input
            onChange={handleChange.bind(this, "fullname")}
            value={values.fullname}
            style={{ marginTop: 12 }}
            autoFocus
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Адрес</Label>
          <Input
            onChange={handleChange.bind(this, "address")}
            value={values.address}
            style={{ marginTop: 12 }}
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Номер телефона</Label>
          <Input
            onChange={handleChange.bind(this, "phone")}
            value={values.phone}
            keyboardType="phone-pad"
            dataDetectorTypes="phoneNumber"
            style={{ marginTop: 12 }}
          />
        </Item>
        <ButtonView>
          <Button onPress={onSubmit} color="#2A86FF">
            {/* <Ionicons name="ios-add" size={24} color="white" /> */}
            <Text>Изменить</Text>
          </Button>
        </ButtonView>
      </ScrollView>
    </Container>
  );
};

// const AppointmentCartRow = styled.Text`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   margin-top: 3.5px;
//   margin-bottom: 3.5px;
// `;

const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

EditPatientScreen.navigationOptions = {
  title: "Изменить данные пациента",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default EditPatientScreen;
