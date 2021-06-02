import React, { useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
// import { NavigationActions } from "react-navigation";
import styled from "styled-components/native";
// import { Ionicons } from "@expo/vector-icons";
import { Item, Label, Input } from "native-base";
import { appointmentsApi } from "../utils/api";
import { Button, Container, GrayText } from "../components";

const EditAppointmentScreen = ({ navigation }) => {
  const [values, setValues] = useState({
    // pain: "Кашель",
    // diagnosis: "",
    // price: 5,
    date:
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    time: "08:00",
    complaint: "Кашель, боль в горле",
    heat: "37",
    pulse: "70",
    pressure: "120, 80",
    // prescription: "Принимать указанные таблетки",
    // sickList: true,
    patient: navigation.getParam("patientId"),
  });
  // const [values, setValues] = useState({});

  const { fullname, address } = navigation.getParam("patient");

  const fieldsName = {
    diagnosis: "Диагноз",
    date: "Дата",
    time: "Время",
    complaint: "Жалобы",
    heat: "Температура",
    pulse: "Пульс",
    pressure: "Давление",
    prescription: "Назначения",
    sickList: "Больничный лист",
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

  // const handlePressureChange = (name, e) => {
  //   let text = e.nativeEvent.text;
  //   let str = text.substring(1, text.length - 1);
  //   let arr = str.split(",");
  //   // arr.forEach((item) => parseInt(item));
  //   let numArr = arr.map((item) => parseInt(item, 10));
  //   // console.log(arr);
  //   setFieldValue(name, numArr);
  //   // return arr;
  // };
  const onSubmit = () =>
    navigation.navigate("Formalization", {
      data: values,
      patient: navigation.getParam("patient"),
    });

  const onFormalize = () => {
    // console.log(values);
    appointmentsApi
      .add(values)
      .then(
        navigation.navigate("Formalization", {
          data: values,
          patient: navigation.getParam("patient"),
        })
      )
      .catch((e) => {
        if (e.response.data && e.response.data.message) {
          console.log(e.response);
          // e.response.data.message.forEach((err) => {
          //   const fieldName = err.param;
          //   console.log(e.response);
          //   alert(`Ошибка! Поле "${fieldsName[fieldName]}" указано неверно.`);
          // });
        }
      });
  };

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
            onChange={handleInputChange.bind(this, "pressure")}
            value={values.pressure}
            keyboardType="numeric"
            style={{ marginTop: 12 }}
          />
        </Item>
        <ButtonView>
          <Button
            onPress={onSubmit}
            //   navigation.navigate("Formalization", {
            //     data: values,
            //     patient: navigation.getParam("patient"),
            //   })
            // }
            color="#87CC6F"
          >
            {/* <Ionicons name="ios-add" size={24} color="white" /> */}
            <Text>Сформулировать диагноз и назначение</Text>
          </Button>
        </ButtonView>
      </ScrollView>
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

EditAppointmentScreen.navigationOptions = {
  title: "Добавить новый осмотр",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default EditAppointmentScreen;

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
