import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  HomeScreen,
  PatientScreen,
  AddPatientScreen,
  AddAppointmentScreen,
  FormalizationScreen,
  DetailsScreen,
  EditPatientScreen,
} from "./screens/";
import { Patients } from "./screens/";
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Patient: {
      screen: PatientScreen,
    },
    AddPatient: {
      screen: AddPatientScreen,
    },
    AddAppointment: {
      screen: AddAppointmentScreen,
    },
    Formalization: {
      screen: FormalizationScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    ListPatients: {
      screen: Patients,
    },
    EditPatient: {
      screen: EditPatientScreen,
    },
  },
  {
    initialRouteName: "Home",
  }
);

export default createAppContainer(AppNavigator);
