import React, { useState } from "react";
import { Text, ScrollView, View, TextInput } from "react-native";
import styled from "styled-components/native";
import { Item, Label, Input, Textarea, CheckBox, Body } from "native-base";
import { appointmentsApi } from "../utils/api";
import { Button, Container, GrayText } from "../components";

const EditFormalizationScreen = ({ navigation }) => {
  const { fullname, address } = navigation.getParam("patient"),
    value = navigation.getParam("data");
  let checked = true;
  // console.log(value);
  const [values, setValues] = useState({
    diagnosis: "",
    prescription: "Принимать указанные таблетки",
    sickList: true,
    date: value.date,
    time: value.time,
    complaint: value.complaint,
    heat: value.heat,
    pulse: value.pulse,
    pressure: value.pressure,
    patient: value.patient,
  });

  const fieldsName = {
    diagnosis: "Диагноз",
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

  const onSubmit = () => {
    appointmentsApi
      .add(values)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((e) => {
        if (e.response.data && e.response.data.message) {
          console.log(e.response);
          // e.response.data.message.forEach((err) => {
          //   const fieldName = err.param;
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
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Диагноз</Label>
          <Input
            onChange={handleInputChange.bind(this, "diagnosis")}
            value={values.diagnosis}
            style={{ marginTop: 12 }}
            autoFocus
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }} floatingLabel>
          <Label>Назначения:</Label>
          <Input
            onChange={handleInputChange.bind(this, "prescription")}
            value={values.prescription}
            style={{ marginTop: 12 }}
          />
        </Item>
        <Item style={{ marginTop: 20, marginLeft: 0 }}>
          <Label>Больничный лист</Label>
          {/* <Input
            onChange={handleInputChange.bind(this, "sickList")}
            value={values.sickList}
            style={{ marginTop: 12 }}
          /> */}
          <CheckBox
            checked={true}
            onPress={() => setValues({ ["sickList"]: !checked })}
          />
          <Body>
            <Text>Да/Нет</Text>
          </Body>
        </Item>
        <ButtonView>
          <Button onPress={onSubmit} color="#87CC6F">
            {/* <Ionicons name="ios-add" size={24} color="white" /> */}
            <Text>Готово!</Text>
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

EditFormalizationScreen.navigationOptions = {
  title: "Диагноз и назначение",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default EditFormalizationScreen;
//setValues({ ["sickList"]: !this.checked }
