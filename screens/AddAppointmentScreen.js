import React, { useEffect, useState } from "react";
import { Text, ScrollView, Linking, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Item, Label, Input } from "native-base";
import { patientsApi, appointmentsApi } from "../utils/api";
import { Button, Container, GrayText } from "../components";
// import { ScrollView } from "react-native-gesture-handler";

const AddAppointmentScreen = ({ navigation }) => {
  const [values, setValues] = useState({});

  const handleChange = (name, e) => {
    const text = e.nativeEvent.text;
    setValues({
      ...values,
      [name]: text,
    });
  };

  const onSubmit = () => {
    patientsApi
      .add(values)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((e) => {
        alert("BAD");
      });
  };

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // const id = navigation.getParam("appointment")._id;
  //   // console.log(navigation.getParam("patient")._id);
  //   // console.log(id);
  //   // console.log("AddAppointmentScreens", navigation);
  //   appointmentsApi
  //     .get()
  //     .then(({ data }) => {
  //       setAppointments(data.data);
  //       // console.log("AddAppointmentScreen", data.data.appointments);
  //       // console.log(navigation.getParam("appointments", {}));
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <Container>
      <ScrollView>
        <View style={{ marginBottom: 5 }}>
          <PatientFullName>
            {navigation.getParam("fio", "NO-FIO")}
          </PatientFullName>
          <GrayText style={{ paddingLeft: 10 }}>
            {navigation.getParam("address", "NO-address")}
          </GrayText>
        </View>
        <Item style={{ marginLeft: 0 }} floatingLabel>
          <Label> asdas</Label>
          <Input
            onChange={handleChange.bind(this, "fullname")}
            value={values.fullname}
            style={{ marginTop: 12 }}
            autoFocus
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
          <Button onPress={onSubmit} color="#87CC6F">
            {/* <Ionicons name="ios-add" size={24} color="white" /> */}
            <Text>Добавить пациента</Text>
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

const PatientFullName = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin-left: 5px;
`;

// const PatientDetails = styled(Container)`
//   flex: 0.25;
// `;

AddAppointmentScreen.navigationOptions = {
  title: "Добавить осещение",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default AddAppointmentScreen;
