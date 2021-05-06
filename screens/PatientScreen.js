import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { GrayText, Button, Badge } from "../components";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PatientScreen = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <PatientDetails>
      <PatientFullName>
        {navigation.getParam("user", {}).fullname}
      </PatientFullName>
      <GrayText>{navigation.getParam("user", {}).phone}</GrayText>

      <PatientButtons>
        <Diagnosis_Therapy>
          <Button>Диагноз и лечение</Button>
        </Diagnosis_Therapy>
        <PhoneButton>
          <Button color="#84d269">
            <Foundation name="telephone" size={22} color="white" />
          </Button>
        </PhoneButton>
      </PatientButtons>
    </PatientDetails>

    <PatientAppointments>
      <Container>
        <AppointmentCart>
          <MoreButton>
            <Ionicons name="md-more" size={30} color="rgba(0, 0, 0, 0.4)" />
          </MoreButton>
          <AppointmentCartRow>
            <FontAwesome5 name="briefcase-medical" size={18} color="#a3a3a3" />
            <AppointmentCartLabel>
              Болезнь:
              <Text style={{ fontWeight: "bold" }}> Головная боль</Text>
            </AppointmentCartLabel>
          </AppointmentCartRow>
          <AppointmentCartRow>
            <Foundation name="clipboard-notes" size={24} color="#a3a3a3" />
            <AppointmentCartLabel>
              Диагноз:
              <Text style={{ fontWeight: "bold" }}>
                Повышенное артериальное давление
              </Text>
            </AppointmentCartLabel>
          </AppointmentCartRow>
          <AppointmentCartRow
            style={{ marginTop: 15, justifyContent: "space-between" }}
          >
            <Badge style={{ width: 155 }} active>
              11.05.2021 - 15:40
            </Badge>
            <Badge color="green">10 BYR</Badge>
          </AppointmentCartRow>
        </AppointmentCart>
      </Container>
    </PatientAppointments>
  </View>
);

const MoreButton = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
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
  shadow-opacity: 0.7;
  shadow-radius: 10px;
  elevation: 0.8;
  padding: 20px 25px;
  border-radius: 10px;
  background: white;
`;
const Container = styled.View`
  padding: 25px;
  flex: 1;
`;

const PatientDetails = styled(Container)`
  flex: 0.6;
  background: white;
`;
const PatientAppointments = styled.View`
  background: #f8fafd;
  margin-top: 15px;
  flex: 3;
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
`;

const Info = styled.View`
  padding-left: 20px;
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
