import React, { useEffect, useState } from "react";
import { Text, ScrollView, Linking, View, TextInput } from "react-native";
// import { NavigationActions } from "react-navigation";
import styled from "styled-components/native";
// import { Ionicons } from "@expo/vector-icons";
import { Item, Label, Input, DatePicker } from "native-base";
import { appointmentsApi } from "../utils/api";
import { Button, Container, GrayText } from "../components";
// import DatePicker from "react-native-datepicker";

// , Picker, DatePicker
// import { ScrollView } from "react-native-gesture-handler";
// "@react-native-community/datetimepicker": "^3.5.0",

const AddAppointmentScreen = ({ navigation }) => {
  // const [values, setValues] = useState({});
  const [values, setValues] = useState({});

  const { fullname, phone, address } = navigation.getParam("patient");

  const fieldsName = {
    pain: "Симптомы",
    price: "Цена",
    date: "Дата",
    time: "Время",
    complaint: "жалобы",
    heat: "температура",
    pulse: "пульс",
    pressure: "давление",
  };

  const setFieldValue = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleInputChange = (name, e) => {
    const text = e.nativeEvent.text;
    setFieldValue(name, text);
  };

  const handlePressureChange = (name, e) => {
    let str = e.nativeEvent.text;
    let arr = str.split(",");
    setFieldValue(name, arr);
  };

  const onFormalize = () => {
    appointmentsApi
      .add(values)
      .then(() => {
        navigation.navigate.bind(this, "Formalization", {
          data: values,
          patient: navigation.getParam("patient"),
        });
      })
      .catch((e) => {
        if (e.response.data && e.response.data.message) {
          e.response.data.message.forEach((err) => {
            const fieldName = err.param;
            alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
          });
        }
      });
  };

  // const [appointments, setAppointments] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // const id = navigation.getParam("appointment")._id;
  //   // console.log(navigation.getParam("patient")._id);
  //   // console.log(navigation);
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
          <PatientFullName>{fullname}</PatientFullName>
          <GrayText style={{ paddingLeft: 10 }}>{address}</GrayText>
        </View>
        <Item style={{ marginLeft: 0 }}>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Выберите дату"
              onChange={handleInputChange.bind(this, "date")}
              value={values.date}
              style={{ marginTop: 12 }}
              autoFocus
            />
          </View>
          <View style={{ flex: 1 }}>
            <Input
              placeholder="Выберите время"
              onChange={handleInputChange.bind(this, "time")}
              value={values.time}
              style={{ marginTop: 12 }}
            />
          </View>
        </Item>
        {/* <Item style={{ marginLeft: 0 }} floatingLabel>
          <Label>Дата</Label>
          <Input
            onChange={handleInputChange.bind(this, "date")}
            value={values.fullname}
            style={{ marginTop: 12 }}
            autoFocus
          />
        </Item> */}
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Жалобы</Label>
          <Input
            onChange={handleInputChange.bind(this, "complaint")}
            value={values.complaint}
            style={{ marginTop: 12 }}
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Температура</Label>
          <Input
            onChange={handleInputChange.bind(this, "heat")}
            value={values.heat}
            keyboardType="numeric"
            style={{ marginTop: 12 }}
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Пульс</Label>
          <Input
            onChange={handleInputChange.bind(this, "pulse")}
            value={values.pulse}
            keyboardType="numeric"
            style={{ marginTop: 12 }}
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Давление</Label>
          <Input
            onChange={handlePressureChange.bind(this, "pressure")}
            value={values.pressure}
            keyboardType="numeric"
            style={{ marginTop: 12 }}
          />
        </Item>
      </ScrollView>
      <ButtonView>
        <Button onPress={onFormalize} color="#87CC6F">
          {/* <Ionicons name="ios-add" size={24} color="white" /> */}
          <Text>Сформулировать диагноз и назначение</Text>
        </Button>
      </ButtonView>
    </Container>
  );
};
const ButtonView = styled.View`
  flex: 1;
  margin-top: 30px;
`;

const TimeRow = styled.View`
  flex-direction: row;
`;

const PatientFullName = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin-left: 5px;
`;

AddAppointmentScreen.navigationOptions = {
  title: "Добавить новый осмотр",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default AddAppointmentScreen;
