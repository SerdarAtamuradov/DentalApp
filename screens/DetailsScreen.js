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
import {
  Foundation,
  FontAwesome5,
  Fontisto,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { patientsApi, phoneFormat } from "../utils/api";
// import { ScrollView } from "react-native-gesture-handler";

const DetailsScreen = ({ navigation }) => {
  // const [appointments, setAppointments] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const patient = navigation.getParam("patient", {}),
    appointment = navigation.getParam("appointmentDetails", {});

  // useEffect(() => {
  //   const id = navigation.getParam("patient")._id;
  //   // console.log("PatientScreen", patient);
  //   patientsApi
  //     .show(id)
  //     .then(({ data }) => {
  //       setAppointments(data.data.appointments);
  //       // console.log("PatientScreen", data.data.appointments);
  //       // console.log(patient.fullname);
  //       setIsLoading(false);
  //     })
  //     .catch(() => {
  //       setIsLoading(false);
  //     });
  // }, []);
  return (
    <View style={{ flex: 1 }}>
      <PatientDetails>
        <PatientFullName>{patient.fullname}</PatientFullName>
        <GrayText style={{ marginLeft: 13 }}>{patient.phone}</GrayText>
        <GrayText style={{ marginLeft: 13 }}>{patient.address}</GrayText>
      </PatientDetails>

      <PatientAppointments>
        <Container>
          <ScrollView>
            <AppointmentCart>
              <AppointmentCartRow>
                <FontAwesome
                  name="heartbeat"
                  size={20}
                  color="#a3a3a3"
                  style={{ marginLeft: -2 }}
                />
                <AppointmentCartLabel>
                  Пульс:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.pulse}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>

              <AppointmentCartRow>
                <MaterialCommunityIcons
                  name="coolant-temperature"
                  size={21}
                  color="#a3a3a3"
                  style={{ marginLeft: -2 }}
                />
                {/* <FontAwesome5
                  name="temperature-high"
                  size={20}
                  color=""
                /> */}
                <AppointmentCartLabel>
                  Температура:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.heat}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>

              <AppointmentCartRow>
                <Fontisto
                  name="blood-drop"
                  size={20}
                  color="#a3a3a3"
                  style={{ marginLeft: 3 }}
                />
                <AppointmentCartLabel>
                  &nbsp;Давление:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.pressure}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>

              <AppointmentCartRow>
                <FontAwesome5
                  name="briefcase-medical"
                  size={18}
                  color="#a3a3a3"
                />
                <AppointmentCartLabel>
                  Жалобы:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.complaint}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>

              <AppointmentCartRow>
                <Foundation
                  name="clipboard-notes"
                  size={26}
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

              <AppointmentCartRow>
                <Fontisto
                  name="prescription"
                  size={24}
                  color="#a3a3a3"
                  style={{ marginLeft: 2 }}
                />
                <AppointmentCartLabel>
                  Назначение:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.prescription}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>

              <AppointmentCartRow>
                <FontAwesome name="list-alt" size={22} color="#a3a3a3" />
                <AppointmentCartLabel>
                  Больничный лист:
                  <Text style={{ fontWeight: "bold" }}>
                    &nbsp;{appointment.sickList === true ? "Да" : "Нет"}
                  </Text>
                </AppointmentCartLabel>
              </AppointmentCartRow>
              <AppointmentCartRow
                style={{ marginTop: 15, justifyContent: "space-between" }}
              >
                <Badge style={{ width: 155 }} active>
                  {appointment.date} - {appointment.time}
                </Badge>
                <Badge color="green" onPress={() => navigation.goBack()}>
                  Назад
                </Badge>
              </AppointmentCartRow>
            </AppointmentCart>
          </ScrollView>
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
  flex: 0.13;
  background-color: white;
`;

DetailsScreen.navigationOptions = {
  title: "Детали",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

export default DetailsScreen;
// &nbsp;{pressure[0]},{pressure[1]}
