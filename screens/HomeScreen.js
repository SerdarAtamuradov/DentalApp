// import { img1, img2, img3 } from "./images";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SectionList, Alert } from "react-native";
import styled from "styled-components/native";
import { Appointment, SectionTitle } from "../components";
import { Ionicons } from "@expo/vector-icons";
// import axios from "axios";

import Swipeable from "react-native-swipeable-row";
import { appointmentsApi } from "../utils/api";

// const DATA = [
//   {
//     title: "14 мая",
//     data: [
//       {
//         time: "12:30",
//         diagnosis: "пульпит, удаление зуба",
//         user: {
//           phone: "+375 (29) 420-56-28",
//           fullname: "Анжела Матиева",
//           avatar:
//             "https://sun2.dataix-by-minsk.userapi.com/s/v1/ig2/1aFymL1Lza8Ny7XK70kvUPh3KPq8TaVHPu4YelFVUWeMKEJB2ZJdTC71Xlse4u8-1UB-joo9CnPkx0sdjUjZ8cuX.jpg?size=50x0&quality=96&crop=0,185,735,735&ava=1",
//         },
//       },
//       {
//         time: "15:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (25) 126-33-42",
//           fullname: "Владислав Александров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/MG158Aa-WG-_YzbBv9Llcz589C5uTghYqABs7LHYjGM4Tp8fXD8HFIsi6h2nMSDnHWPMJVSZT_QK6jG8ZKjvhSbF.jpg?size=50x0&quality=96&crop=74,74,589,589&ava=1",
//         },
//       },
//       {
//         time: "15:30",
//         diagnosis: "пульпит, удаление зуба",
//         active: true,
//         user: {
//           phone: "+375 (44) 425-33-69",
//           fullname: "Евгений Юров",
//           avatar: img1,
//         },
//       },
//       {
//         time: "14:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (44) 863-44-28",
//           fullname: "Василий Реактович",
//           avatar: img2,
//         },
//       },
//     ],
//   },
//   {
//     title: "15 мая",
//     data: [
//       {
//         time: "12:30",
//         diagnosis: "пульпит, удаление зуба",
//         user: {
//           phone: "+375 (29) 111-38-12",
//           fullname: "Евгений Юров",
//           avatar: img3,
//         },
//       },
//       {
//         time: "15:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (25) 555-33-33",
//           fullname: "Владислав Александров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/Zxb7RswQQQFHNn_0qg9-lV55nsp4CxrIVdnMOSFt3wp_wL8rfRC4waNtBV8_7HeyxT2jKUfkdcWL-8pFXbGwD6wn.jpg?size=50x0&quality=96&crop=0,12,749,749&ava=1",
//         },
//       },
//       {
//         time: "15:30",
//         diagnosis: "пульпит, удаление зуба",
//         active: true,
//         user: {
//           phone: "+375 (29) 666-20-25",
//           fullname: "Анжела Матиева",
//           avatar:
//             "https://sun2.dataix-by-minsk.userapi.com/s/v1/ig2/IxYj-FO2H0BVgmzAbHg-MPglmtPlsInd1XIY-XuwUTIx9mjA7j3DoRVxTChBD6008ioh5Wz7uaxewYI11IhNzS6q.jpg?size=50x0&quality=96&crop=52,0,679,679&ava=1",
//         },
//       },
//       {
//         time: "14:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (33) 221-27-28",
//           fullname: "Василий Реактович",
//           avatar:
//             "https://sun2.dataix-by-minsk.userapi.com/s/v1/ig1/i5cKEOiACrBS6paI7d8nMIOgJOQ4W90s-xXfVvGOT0BmtX3oKblst2ieFbHCingNgA-krPHi.jpg?size=50x0&quality=96&crop=60,146,304,304&ava=1",
//         },
//       },
//     ],
//   },
//   {
//     title: "17 мая",
//     data: [
//       {
//         time: "12:30",
//         diagnosis: "пульпит, удаление зуба",
//         user: {
//           phone: "+375 (25) 238-56-17",
//           fullname: "Евгений Юров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/u1m4dHC8gJyiIype_H0UMpSoczU8URUlm1-pIrjsozn2XfNCn1gEph2UBWyreeD2Jvobzyrs5YsKwFfOLnqMnlD6.jpg?size=50x0&quality=96&crop=161,1,718,718&ava=1",
//         },
//       },
//       {
//         time: "15:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (33) 536-37-43",
//           fullname: "Владислав Александров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/-veM0lLQZjSqqdAwRaJFsHzG6uRJHm_OXvqrAGemQACe9OLPYR5o6k9ZmnORVDxLJScwetmvfM9bEKXEbK0PMd_1.jpg?size=50x0&quality=96&crop=705,227,1144,1144&ava=1",
//         },
//       },
//     ],
//   },
//   {
//     title: "18 мая",
//     data: [
//       {
//         time: "15:30",
//         diagnosis: "пульпит, удаление зуба",
//         active: true,
//         user: {
//           phone: "+375 (44) 472-89-32",
//           fullname: "Анжела Матиева",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/Y7GbybHOYafWkoSqe0OfCZM9FH9XnhjC2oYT0yNa7DjQn_YZ_71cKdySM5agyyETgPCBPyh2_kpWAXNxGzfk8nZU.jpg?size=50x0&quality=96&crop=3,0,729,729&ava=1",
//         },
//       },
//       {
//         time: "14:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (29) 269-36-64",
//           fullname: "Василий Реактович",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/tNfrx85zjhTJer7Nmg1QnYcBxfORYhMgorMId3ZBH2xF_CGP8YYgQJ6SG43vpZlm5LUPpmRv-VB9OvOdB4URKEWO.jpg?size=50x0&quality=96&crop=1,491,738,738&ava=1",
//         },
//       },
//     ],
//   },
//   {
//     title: "21 мая",
//     data: [
//       {
//         time: "12:30",
//         diagnosis: "пульпит, удаление зуба",
//         user: {
//           phone: "+375 (44) 257-22-99",
//           fullname: "Евгений Юров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/dUryqzU_02kD9XmxRsniuXjPjXIK8_Q3xCOl21_BCFSLgYLo8mPzmIORPK1pA5TmpBk-RgHrByYulTqZ7zvVR7fU.jpg?size=50x0&quality=96&crop=2,91,1077,1077&ava=1",
//         },
//       },
//       {
//         time: "15:00",
//         diagnosis: "периодонтит",
//         user: {
//           phone: "+375 (33) 111-57-43",
//           fullname: "Владислав Александров",
//           avatar:
//             "https://sun1.dataix-by-minsk.userapi.com/s/v1/ig2/EqMIx09qvitWwdmGnTFQtEWJu__NGD0EV9wGdVVzcFsugi40lG6HwbxU9illPbsUTARN9CvZOiZSaWTjzr83Ug_F.jpg?size=50x0&quality=96&crop=0,85,720,720&ava=1",
//         },
//       },
//     ],
//   },
// ];

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAppointments = () => {
    setIsLoading(true);
    appointmentsApi
      .get()
      .then(({ data }) => {
        setData(data.data);
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };

  useEffect(fetchAppointments, []);

  const removeAppointment = (id) => {
    Alert.alert(
      "Удаление приема",
      "Вы действительно хотите удалить прием?",
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setIsLoading(true);
            appointmentsApi
              .remove(id)
              .then(() => {
                fetchAppointments();
              })
              .catch(() => {
                setIsLoading(false);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container>
      {data && (
        <SectionList
          sections={data}
          keyExtractor={(item) => item._id}
          onRefresh={fetchAppointments}
          refreshing={isLoading}
          renderItem={({ item }) => (
            <Swipeable
              rightButtons={[
                <SwipeViewButton
                  onPress={removeAppointment.bind(this, item._id)}
                  style={{ backgroundColor: "#F85A5A" }}
                >
                  <Ionicons name="ios-close" size={48} color="white" />
                </SwipeViewButton>,
              ]}
            >
              <Appointment navigate={navigation.navigate} item={item} />
            </Swipeable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <SectionTitle>{title}</SectionTitle>
          )}
        />
      )}
      <PlusButton onPress={navigation.navigate.bind(this, "AddPatient")}>
        <Ionicons name="ios-add" size={38} color="white" />
      </PlusButton>
    </Container>
  );
};

HomeScreen.navigationOptions = {
  title: "Приемы",
  headerTintColor: "#2A86FF",
  headerStyle: {
    elevation: 0.8,
    shadowOpacity: 0.8,
  },
};

const PlusButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  width: 64px;
  height: 64px;
  background: #2a86ff;
  position: absolute;
  right: 15px;
  bottom: 25px;
  shadow-color: #2a86ff;
  shadow-opacity: 0.7;
  shadow-radius: 3.5px;
  elevation: 5;
`;

const SwipeViewButton = styled.TouchableOpacity`
  width: 75px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fbfbfb;
`;

export default HomeScreen;
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: "Пациенты",
//     headerTintColor: "#2A86FF",
//   };
//   render() {
//     const { navigation } = this.props;
//     return (
//       <Container>
//         <SectionList
//           sections={DATA}
//           keyExtractor={(item, index) => index}
//           renderItem={({ item }) => (
//             <Appointment navigate={navigation.navigate} {...item} />
//           )}
//           renderSectionHeader={({ section: { title } }) => (
//             <SectionTitle>{title}</SectionTitle>
//           )}
//         />
//         <PlusButton>
//           <Ionicons name="ios-add" size={38} color="white" />
//         </PlusButton>
//       </Container>
//     );
//   }
// }
