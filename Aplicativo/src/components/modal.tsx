import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";

import Routes from "../services/api";


import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { s } from "../utils/styles/styles";

import InputText from "./inputText";
import Button from "./button";

//Async Storage
import AsyncStorage from "@react-native-async-storage/async-storage";


interface ModalProps {
  isVisible: boolean;
  optionValue: string;
  onClose: () => void;
}

interface Task {
  _id: string,
  userId: any,
  title: string;
  description: string;
  priority: string;
  tasks: {
      _id: string,
      taskTitle: string;
      taskDesc: string;
      isCompleted: boolean;
    }[]
  ;
}

export default function ModalComponent({
  isVisible,
  onClose,
  optionValue,
}: ModalProps) {

  

  const [task, setTasks] = useState<Task>({
    _id: "",
    userId: "",
    title: "",
    description: "",
    priority: "Alto",
    tasks: [],
  });

  const addSubTasks = () => {
    const newSubTask = {
      _id: (task.tasks.length + 1).toString(),
      taskTitle: "",
      taskDesc: "",
      isCompleted: false,
    };

    setTasks((prevTask) => ({
      ...prevTask,
      tasks: [...prevTask.tasks, newSubTask],
    }));
  };

    const deleteSubTasks = (id: string) => {
      const updatedSubTasks = task.tasks.filter((subTask) => subTask._id !== id);

      setTasks((prevTask) => ({...prevTask, tasks: updatedSubTasks}));
    };

    const updateTaskTitle = (id: string, text: string) => {
      const updatedSubTasks = task.tasks.map((subTask) => 
      subTask._id === id ? {...subTask, taskTitle: text} : subTask)
      setTasks((prevTask) => ({...prevTask, tasks: updatedSubTasks}));
    };

    const updatedTaskDescription = (id: string, text: string) => {
      const updatedSubTasks = task.tasks.map((subTask) => 
        subTask._id === id ? {...subTask, taskDesc: text}: subTask
      )
      setTasks((prevTask) => ({...prevTask, tasks: updatedSubTasks}));
    };

  const createTask = async () => {
    const url = Routes.CreateTask
    const requestBody = JSON.stringify(task)
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      })
      if(response.ok){
        console.log('Tarefa criada com sucesso!')
        onClose()
      }else{
        console.log('Erro ao criar tarefa: ', response.statusText)
      }
    } catch (error) {
      Alert.alert('Erro ao criar tarefa', 'Tente novamente mais tarde.')
      console.log('Erro ao criar tarefa')
    }
  }

  return (
    <Modal
      style={mS.modal}
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      animationIn={"fadeInDown"}
      animationOut={"fadeOutUp"}
    >
      <View style={mS.modalContent}>
        <View
          style={[
            s.container,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={[s.title, { fontSize: 25 }]}>
            {optionValue === "NewTask"
              ? "Criar Nova Tarefa"
              : "Pergunte ao Wish"}
          </Text>

          <TouchableOpacity onPress={onClose}>
            <FontAwesome name="window-close" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {optionValue === "NewTask" ? (
          <View>
            <View style={[{ width: "100%", alignItems: "center" }]}>
              <InputText
              placeholder="Insira um título"
              fontSize={30}
              value={task.title}
              onChangeText={(text) => setTasks((prevTask) => ({...prevTask, title: text}))}
              />

              <View style={{ maxHeight: 200 }}>
                <InputText
                  placeholder="Escreva mais sobre a tarefa..."
                  fontSize={18}
                  multiline={true}
                  alignVertical="top"
                  maxLen={300}
                  value={task.description}
                  onChangeText={(text) => setTasks((prevTask) => ({...prevTask, description: text}))}
                />
              </View>

              <Text
                style={[
                  s.text,
                  { alignSelf: "flex-start", color: "#b8b8b8", fontSize: 15 },
                ]}
              >
                Limite: 300
              </Text>
            </View>

            <View style={[{ height: '55%' }]}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Text style={s.subtitle}>Objetivos:</Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 15,
                  }}
                >
                  <TouchableOpacity onPress={addSubTasks}>
                    <FontAwesome name="plus-circle" size={35} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

                <FlatList
                  data={task.tasks}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  style={{ paddingRight: 15}}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={[mS.taskCont]}>
                        <View style={{ }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <View style={{width: '80%'}}>
                            <InputText
                              placeholder="Nome da tarefa"
                              fontSize={18}
                              value={item.taskTitle}
                              onChangeText={(text) =>
                                updateTaskTitle(item._id, text)
                              }
                            />
                            </View>
                            <TouchableOpacity onPress={() => deleteSubTasks(item._id)}>
                              <FontAwesome
                                name="minus-circle"
                                size={30}
                                color="black"
                              />
                            </TouchableOpacity>
                          </View>


                          <InputText
                            placeholder="Escreva mais sobre a tarefa..."
                            fontSize={16}
                            multiline={true}
                            alignVertical="top"
                            maxLen={100}
                            value={item.taskDesc}
                            onChangeText={(text) =>
                              updatedTaskDescription(item._id, text)
                            }
                          />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', width: '100%' }}>
                          <Text style={s.text}>Prioridade: </Text>
                          <Button
                            name={task.priority}
                            backgroundColor="#f4f4f4"
                            borderColor="#f4f4f4"
                          />
                        </View>
                      </View>
                    );
                  }}
                />

                

            </View>
          </View>
        ) : (
          <View style={[{ width: "100%", alignItems: "center" }]}>
            <Text>Ias</Text>
          </View>
        )}


      </View>
      {optionValue === "NewTask" ? (
          <TouchableOpacity style={mS.sendButton} onPress={() => createTask()}>
            <Text style={[s.subtitle, { color: "#f4f4f4" }]}>Criar Tarefa</Text>
            <MaterialIcons name="verified" size={25} color="#f4f4f4" />
          </TouchableOpacity>
        ) : null}
    </Modal>
  );
}

const mS = StyleSheet.create({
  modal: {
    margin: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  modalContent: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  taskCont: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#c4c4c4",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 250,

  },

  sendButton: {
    backgroundColor: "#0cc0df",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: "100%",
    height: 80,
    padding: 10,
    flexDirection: "row",
    alignSelf: 'auto',
    alignItems: "center",
    justifyContent: "space-around",
  },

  flatlist: {
    width: '100%',
  }
});
