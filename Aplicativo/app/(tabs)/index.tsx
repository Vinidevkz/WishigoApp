import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Checkbox } from "react-native-paper";

import { useRef } from "react";

//styles
import { s } from "../../src/utils/styles/styles";
import { Octicons } from "@expo/vector-icons";

//components
import Navbar from "../../src/components/navbar";
import Button from "../../src/components/button";

import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet from "@gorhom/bottom-sheet";
import CustomBottomSheet from "../../src/components/bottomSheet";

//context
import { useUser } from "../../src/contexts/context";

const Tasks = [
  {
    id: 1,
    name: "Estudar Programação",
    description: "Estudar TypeScript e React Native",
    level: "Alto",
    tasksNumber: 5,
    createdAt: "01/02/2025",
    endDate: "11/02/2025",
  },

  {
    id: 2,
    name: "Limpar a Casa",
    description: "Jogar o lixo fora, etc",
    level: "Média",
    tasksNumber: 10,
    createdAt: "05/02/2025",
    endDate: "05/02/2025",
  },
];

const NextDates = [
  {
    id: 1,
    name: "Jantar da Empresa",
    description: "Jantar com a equipe de Front-end",
    level: "Alto",
    date: "29/02/2025",
    time: "19:00",
  },

  {
    id: 2,
    name: "Viajem para Paris",
    description: "Chegar ao aeeroporto às 13:20",
    level: "Alto",
    date: "05/03/2025",
    time: "13:20",
  },
];

const todayRoutine = [
  {
    id: 1,
    currentDay: "Terça-Feira",
    currentDayTasks: [
      {
        id: 1,
        name: "Estudar Programação",
        status: true,
      },
      {
        id: 2,
        name: "Jogar Basquete",
        status: false,
      },
      {
        id: 3,
        name: "Ler um livro",
        status: false,
      },
    ],
  },
];

export default function HomePage() {

  const BottomSheetRef = useRef<BottomSheet>(null)

  const [checked, setChecked] = useState(false);
  const {user} = useUser()

    //open bottomsheet
    const openBottomSheet = () => {
      console.log("Abrindo BottomSheet..."); // ✅ Depuração
      if (BottomSheetRef.current) {
        console.log("abriu")
        console.log("BottomSheetRef atual:", BottomSheetRef.current);
        BottomSheetRef.current.expand();
      } else {
        console.log("BottomSheetRef está null");
      }
    };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navbar
          icon1="menu"
          iconLibName1="Entypo"
          title="Seja Bem-Vindo(a), "
          userName={user?.name}
        />
        <ScrollView
          style={{
            marginTop: (StatusBar.currentHeight || 0) + 80
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.headerCont}>
            <View style={s.row}>
              <Text style={s.title}>Próximas Datas:</Text>
            </View>

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={NextDates}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={s.nextDatesCont}>
                    <View style={{ alignItems: "center", gap: 10 }}>
                      <Octicons size={22} name="calendar" color={"#5cd3ff"} />
                      <View
                        style={{
                          borderWidth: 2,
                          borderColor: "#1b1b1b",
                          borderRadius: 10,
                          backgroundColor: "#1b1b1b",
                          flex: 1,
                        }}
                      ></View>
                    </View>

                    <View style={{ justifyContent: "space-between" }}>
                      <Text
                        style={[s.subtitle, { fontSize: 18 }]}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text style={[s.text, { fontSize: 15 }]} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <Text style={s.text}>• Data: {item.date}</Text>
                      <Text style={s.text}>• Até: {item.time}</Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>

          <View style={[s.container, { gap: 0 }]}>
            <View style={s.titleBox}>
              <Text style={[s.title, { alignSelf: "flex-start" }]}>
                Suas Tarefas:
              </Text>
            </View>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Tasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={s.card}>
                  <View style={{ gap: 10, height: 100 }}>
                    <View>
                      <Text style={[s.title]} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={[s.subtitle, { fontSize: 15 }]}>
                        Criado em: {item.createdAt}
                      </Text>
                    </View>
                    <Text style={[s.text, { fontSize: 15 }]} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>

                  <Text style={[s.text, {}]}>Prioridade: {item.level}</Text>

                  <View style={{ gap: 10 }}>
                    <Text style={[s.subtitle, { fontSize: 18 }]}>
                      Itens na lista: {item.tasksNumber}
                    </Text>
                  </View>

                  <View style={{}}>
                    <Button
                      name="Ver Tarefa"
                      backgroundColor="#fff"
                      borderColor="#1b1b1b"
                      height={40}
                      width="100%"
                      justify="center"
                    />
                  </View>
                </View>
              )}
            />
          </View>

          <Pressable onPress={openBottomSheet}>
            <Text>Bottomsheet</Text>
          </Pressable>

          <View style={[s.container, { gap: 0 }]}>
            <View style={s.titleBox}>
              <Text style={s.title}>Rotina Diária</Text>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 20,
              }}
            >
              <View style={s.gradientBorder}>
                <LinearGradient
                  colors={["#5cd3ff", "#004ed4", "#6000f0"]}
                  style={s.gradientBorder}
                >
                  <View style={s.insideViewGradient}>
                    {todayRoutine.map((item) => (
                      <View style={{gap: 10}} key={item.id}>
                        <Text style={s.subtitle}>{item.currentDay}</Text>

                        {item.currentDayTasks.map((task) => (
                          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} key={task.id} >
                            <Text style={s.text}>{task.name}</Text>
                            <Checkbox
                              status={checked ? "checked" : "unchecked"}
                              onPress={() => setChecked(!checked)}
                              color="#000"
                            />
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ScrollView>

        <CustomBottomSheet ref={BottomSheetRef} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
