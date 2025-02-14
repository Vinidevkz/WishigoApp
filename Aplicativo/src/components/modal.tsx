import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";
import { useState, useEffect } from "react";

import Routes from "../services/api";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import { s } from "../utils/styles/styles";

import InputText from "./inputText";
import Button from "./button";

interface ModalProps {
  isVisible: boolean;
  optionValue: string;
  onClose: () => void;
}

interface Task {
  title: string;
  description: string;
  priority: string;
  tasks: {
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
  const [tasks, setTasks] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    tasks: [],
  });

  

  useEffect(() => {
    const TasksArray = [
      {
        _id: "1",
        taskTitle: "",
        taskDesc: "",
        isCompleted: false,
      },
    ];

    setTasks(TasksArray);
  }, []);

    const addTasks = () => {
      const newTask = {
        _id: (tasks.length + 1).toString(),
        taskTitle: "",
        taskDesc: "",
        isCompleted: false,
      };

      setTasks([...tasks, newTask]);
    };

    const deleteTasks = (id: string) => {
      const updatedTasks = tasks.filter((task) => task._id !== id);

      setTasks(updatedTasks);
    };

    const updateTaskTitle = (id: string, text: string) => {
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, taskTitle: text } : task
      );
      setTasks(updatedTasks);
    };

    const updatedTaskDescription = (id: string, text: string) => {
      const updatedTasks = tasks.map((task) =>
        task._id === id ? { ...task, taskDesc: text } : task
      );
      setTasks(updatedTasks);
    };

  async function createTask<Task>() {
    const url = Routes.CreateTask
    const requestBody = JSON.stringify(tasks)
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
              <InputText placeholder="Insira um título" fontSize={30} />

              <View style={{ maxHeight: 200 }}>
                <InputText
                  placeholder="Escreva mais sobre a tarefa..."
                  fontSize={18}
                  multiline={true}
                  alignVertical="top"
                  maxLen={300}
                  value={tasks.title}
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
                  <TouchableOpacity onPress={addTasks}>
                    <FontAwesome name="plus-circle" size={35} color="black" />
                  </TouchableOpacity>
                </View>
              </View>

                <FlatList
                  data={tasks}
                  keyExtractor={(item) => item._id}
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
                            <TouchableOpacity onPress={() => deleteTasks(item._id)}>
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

                        <View style={{ alignItems: "center", gap: 20 }}>

                          <Button
                            name="Alto"
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
          <TouchableOpacity style={mS.sendButton}>
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
