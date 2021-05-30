import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  Linking,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { GrayText, Button, Badge, Container } from "../components";
import { Foundation, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { patientsApi, phoneFormat } from "../utils/api";
// import { ScrollView } from "react-native-gesture-handler";

const PatientScreen = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = navigation.getParam("patient")._id;
    // console.log("PatientScreen", navigation.getParam("patient", {}));
    patientsApi
      .show(id)
      .then(({ data }) => {
        setAppointments(data.data.appointments);
        // console.log("PatientScreen", data.data.appointments);
        // console.log(navigation.getParam("patient", {}).fullname);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PatientDetails>
        <PatientFullName>
          {navigation.getParam("patient", {}).fullname}
        </PatientFullName>
        <GrayText style={{ marginLeft: 13 }}>
          {navigation.getParam("patient", {}).phone}
        </GrayText>
        <GrayText style={{ marginLeft: 13 }}>
          {navigation.getParam("patient", {}).address}
        </GrayText>

        <PatientButtons>
          <Diagnosis_Therapy>
            <Button
              children="Добавит прием"
              onPress={() =>
                navigation.navigate("AddAppointment", {
                  fio: navigation.getParam("patient", {}).fullname,
                  phone: navigation.getParam("patient", {}).phone,
                })
              }
            />
          </Diagnosis_Therapy>
          <PhoneButton>
            <Button
              onPress={() =>
                Linking.openURL(
                  "tel:" + navigation.getParam("patient", {}).phone
                )
              }
              color="#84D269"
            >
              <Foundation name="telephone" size={22} color="white" />
            </Button>
          </PhoneButton>
        </PatientButtons>
      </PatientDetails>

      <PatientAppointments>
        <Container>
          {isLoading ? (
            <ActivityIndicator size="large" color="#2A86FF" />
          ) : (
            <ScrollView>
              {/* <AppointmentText>                
              </AppointmentText> */}
              <Text style={{ fontWeight: "bold", fontSize: 18, left: 25 }}>
                Приемы
              </Text>
              {appointments.map((appointment) => (
                <AppointmentCart key={appointment._id}>
                  <MoreButton>
                    <Ionicons
                      name="md-more"
                      size={30}
                      color="rgba(0, 0, 0, 0.4)"
                    />
                  </MoreButton>

                  <AppointmentCartRow>
                    <FontAwesome5
                      name="briefcase-medical"
                      size={18}
                      color="#a3a3a3"
                    />
                    <AppointmentCartLabel>
                      Симптомы:
                      <Text style={{ fontWeight: "bold" }}>
                        &nbsp;{appointment.pain}
                      </Text>
                    </AppointmentCartLabel>
                  </AppointmentCartRow>
                  <AppointmentCartRow>
                    <Foundation
                      name="clipboard-notes"
                      size={24}
                      color="#a3a3a3"
                      style={{ marginLeft: 2 }}
                    />
                    <AppointmentCartLabel>
                      Диагноз:
                      <Text style={{ fontWeight: "bold" }}>
                        &nbsp;{appointment.diagnosis}
                      </Text>
                    </AppointmentCartLabel>
                  </AppointmentCartRow>
                  <AppointmentCartRow
                    style={{ marginTop: 15, justifyContent: "space-between" }}
                  >
                    <Badge style={{ width: 155 }} active>
                      {appointment.date} - {appointment.time}
                    </Badge>
                    <Badge color="green"> {appointment.price} BYR</Badge>
                  </AppointmentCartRow>
                </AppointmentCart>
              ))}
            </ScrollView>
          )}
        </Container>
      </PatientAppointments>
    </View>
  );
};

// const AppointmentText = styled.View`
//   left: 20px;
// `;
// position: absolute;
// top:9px;  yokarkynynky

const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right:10px
  top:10px
  height: 32px;
  width:32px;
`;

const AppointmentCartLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

const AppointmentCartRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 3.5px;
  margin-bottom: 3.5px;
`;

const AppointmentCart = styled.View`
  shadow-color: gray;
  shadow-opacity: 0.4;
  shadow-radius: 10px;
  elevation: 0.5;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const PatientAppointments = styled.View`
  flex: 1;
  background-color: #f8fafd;
`;

const Diagnosis_Therapy = styled.View`
  flex: 1;
`;
const PhoneButton = styled.View`
  width: 45px;
  margin-left: 10px;
`;

const PatientButtons = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 20px;
`;
const PatientFullName = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 3px;
  margin-left: 10px;
`;

const PatientDetails = styled(Container)`
  flex: 0.28;
  background-color: white;
`;

PatientScreen.navigationOptions = {
  title: "Карта пациента",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default PatientScreen;
