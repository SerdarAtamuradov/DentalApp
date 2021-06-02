import React, { useEffect, useState } from "react";
import { Text, ScrollView, View } from "react-native";
// import { NavigationActions } from "react-navigation";
import styled from "styled-components/native";
// import { Ionicons } from "@expo/vector-icons";
import { Item, Label, Input } from "native-base";
import { appointmentsApi } from "../utils/api";
import { Button, Container, GrayText } from "../components";

const EditAppointmentScreen = ({ navigation }) => {
  const thisPatient = navigation.getParam("appointment", {}).patient;
  const value = navigation.getParam("appointment");
  const id = navigation.getParam("appointment", {})._id;

  console.log(id);

  const [values, setValues] = useState({
    date: value.date,
    time: value.time,
    complaint: value.complaint,
    heat: value.heat.toString(),
    pulse: value.pulse.toString(),
    pressure: value.pressure,
    patient: value.patient,
    diagnosis: value.diagnosis,
    prescription: value.prescription,
    sickList: value.sickList,
  });
  // const [values, setValues] = useState({});

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

  const onSubmit = () =>
    navigation.navigate("EditFormalization", {
      data: values,
      patient: thisPatient,
    });

  const onFormalize = () => {
    // console.log(values);
    appointmentsApi
      .update(values)
      .then(
        navigation.navigate("EditFormalization", {
          data: values,
          patient: navigation.getParam("patient"),
          appId: id,
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
          <PatientFullName>{thisPatient.fullname}</PatientFullName>
          <GrayText style={{ paddingLeft: 10 }}>{thisPatient.address}</GrayText>
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
            color="#2A86FF"
          >
            <Text>Изменить диагноз и назначение</Text>
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
