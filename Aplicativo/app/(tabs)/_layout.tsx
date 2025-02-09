import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function TabLayout() {


  const fontSize: number = 15
  const fontFamily: string = 'Poppins_500Medium'



  return (

      <View style={{flex: 1}}>
        <View style={{zIndex: 1, position: 'absolute', right: 10, bottom: 80, flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 45, height: 45, borderRadius: 50, backgroundColor: '#5cd3ff' }}>
        <MaterialCommunityIcons name="star-four-points-outline" size={25} color="#f4f4f4" />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 50, backgroundColor: '#fff' }}>
          <Octicons name="pencil" size={30} color="#5cd3ff" />
        </TouchableOpacity>
        </View>



        <Tabs
          screenOptions={
            {
            tabBarActiveTintColor: "#5cd3ff",
            headerShown: false,
            tabBarStyle: {
                height: 70,
                paddingTop: 10,
                paddingBottom: 10,
                elevation: 0,
                borderTopWidth: 0,
                backgroundColor: '#fff',
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
            }
            }
        }
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Início",
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: fontSize,
                fontFamily: fontFamily
              },
              tabBarIcon: ({ color }) => (
                <Octicons size={22} name="home" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="calendar"
            options={{
              tabBarLabel: "Datas",
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: fontSize,
                fontFamily: fontFamily
              },
              tabBarIcon: ({ color }) => (
                <Octicons size={22} name="calendar" color={color} />
              ),
            }}
          />

    <Tabs.Screen
            name="routine"
            options={{
              tabBarLabel: "Rotina",
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: fontSize,
                fontFamily: fontFamily
              },
              tabBarIcon: ({ color }) => (
                <Octicons size={22} name="clock" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: "Perfil",
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: fontSize,
                fontFamily: fontFamily
              },
              tabBarIcon: ({ color }) => (
                <Octicons size={22} name="person" color={color} />
              ),
            }}
          />
        </Tabs>

        
      </View>

  );
}
