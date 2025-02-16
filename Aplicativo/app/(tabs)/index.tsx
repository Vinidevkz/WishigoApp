import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Checkbox } from "react-native-paper";

//styles
import { s } from "../../src/utils/styles/styles";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

//components
import Navbar from "../../src/components/navbar";
import Button from "../../src/components/button";
import ModalComponent from "../../src/components/modal";

//context
import AsyncStorage from '@react-native-async-storage/async-storage';
import Routes from "../../src/services/api";
import  Colors  from "../../src/utils/styles/colors";

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

//types
type User = {
  _id: string,
  name: string,
}

type userData = {
  token: string,
  user: User,
}

type Tasks = {
  _id: string,
  title: string,
  description: string,
  priority: string,
  tasks: [{
    _id: string,
    taskTitle: string,
    taskDesc: string,
    isCompleted: boolean
  }]
}

export default function HomePage() {

  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState<userData | null>(null)
  const [userId, setUserId] = useState()
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const  [tasks, setTasks] = useState<Tasks | any>()

  const [modalVisible, setModalVisible] = useState(false)
  const [modalOption, setModalOption] = useState("")

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem('@user')
        const userData = JSON.parse(userString || '{}');
        console.log('Dados do usuario: ',userData)
        setUserData(userData)
        setUserId(userData.user._id)
        console.log(userId)

        if (userData.user._id) {
          await getTasks(userData.user._id);
        }
      } catch (error) {
        console.log('Erro ao pegar os dados do usuário do AsyncStorage', error)
      }
    }

    getUserData()
  }, [])

  async function getTasks(userId: string) {
    const url = Routes.ReadTask
    const requestBody = JSON.stringify({userId})

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })

      if(!response.ok){
        const errorJson = await response.json()
        console.log("Erro ao pegar as tarefas do banco", errorJson)
      }

      const userTasks = await response.json()
      setTasks(userTasks)
      console.log("Tasks do usuário: ", userTasks)

    } catch (error: any) {
      Alert.alert("Erro ao buscar suas tarefas: ", error.message);
      console.error("Erro ao buscar tarefas: ", error.message);
      throw error;
    }

    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("pt-br", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={'#f4f4f4'}/>
        <Navbar

          title="Seja Bem-Vindo(a) "
          userName={userData?.user ? userData.user.name : "Carregando" }
        />
        <ScrollView
          style={{
            paddingTop: (StatusBar.currentHeight || 0) + 45,
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
              data={tasks}
              keyExtractor={(item) => item._id.toString()}
              renderItem={({ item }) => (
                <View style={{height: 270}}>
                  <View style={s.card}>
                    <View style={{ gap: 10, height: 100 }}>
                      <View>
                        <Text style={[s.title]} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={[s.subtitle, { fontSize: 15 }]}>
                          Criado em: {formatDate(item.createdAt)}
                        </Text>
                      </View>
                      <Text style={[s.text, { fontSize: 15 }]} numberOfLines={1}>
                        {item.description}
                      </Text>
                    </View>

                    

                    <View style={{ gap: 10 }}>
                      <Text style={[s.subtitle, { fontSize: 18 }]}>
                        Itens na lista: {item.tasks.length}
                      </Text>
                      <Text style={[s.text, ]}>Prioridade: <Text style={{color: item.priority === "Alto" ? Colors.red : item.priority === "Médio" ? Colors.parcialBlack : Colors.defaultBlue}}>{item.priority}</Text></Text>
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
                </View>
              )}
              ListEmptyComponent={
                <View style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>

                  {isLoading === true ? (
                    <ActivityIndicator size={'small'} color={Colors.defaultBlue}/>
                   ) : (
                    <View style={{alignItems: 'center', justifyContent: 'space-between'}}>
                      <View style={{alignItems: 'center',}}>
                        <Text style={[s.subtitle, {fontSize: 22}]}>Nenhuma tarefa criada.</Text>
                        <Text style={[s.text, {fontSize: 16}]}>Dê vida para suas <Text style={{color: Colors.defaultBlue}}>idéias!</Text></Text>
                      </View>
                      <Image source={require('../../src/utils/imgs/starboy.png')} style={s.image}/>
                    </View>
                   )}



                </View>
              }
            />
          </View>

          <View style={[s.container, { gap: 0, marginBottom:150 }]}>
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

          <ModalComponent isVisible={modalVisible} onClose={() => setModalVisible(false)} optionValue={modalOption}/>
        </ScrollView>

        <View style={{zIndex: 1, position: 'absolute', right: 10, bottom: 20, flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity onPress={() => {setModalOption("IA"), setModalVisible(true)}} style={{ alignItems: 'center', justifyContent: 'center', width: 45, height: 45, borderRadius: 50, backgroundColor: '#5cd3ff', elevation: 3 }}>
          <MaterialCommunityIcons name="star-four-points-outline" size={25} color="#f4f4f4" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {setModalOption("NewTask"), setModalVisible(true)}} style={{ alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: 50, backgroundColor: '#fff', elevation: 5 }}>
            <Octicons name="pencil" size={30} color="#5cd3ff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

  );
}
