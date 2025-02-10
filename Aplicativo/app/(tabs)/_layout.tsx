import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
  const fontSize: number = 15;
  const fontFamily: string = "Poppins_500Medium";

  return (

      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#5cd3ff",
            headerShown: false,
            tabBarStyle: {
              height: 70,
              paddingTop: 10,
              paddingBottom: 10,
              elevation: 0,
              borderTopWidth: 0,
              backgroundColor: "#fff",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarLabel: "Início",
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: fontSize,
                fontFamily: fontFamily,
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
                fontFamily: fontFamily,
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
                fontFamily: fontFamily,
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
                fontFamily: fontFamily,
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
