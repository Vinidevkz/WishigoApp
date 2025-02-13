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
  tasks: [
    {
      taskTitle: string;
      taskDesc: string;
      isCompleted: boolean;
    }
  ];
}

export default function ModalComponent({
  isVisible,
  onClose,
  optionValue,
}: ModalProps) {
  const [tasks, setTasks] = useState<
    {
      _id: string;
      taskTitle: string;
      taskDesc: string;
      isCompleted: boolean;
    }[]
  >([]);

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

            <View style={[{ width: "100%", alignItems: "flex-start" }]}>
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
                style={mS.flatlist}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => {
                  return (
                    <View style={[mS.taskCont]}>
                      <View style={{ width: "80%" }}>
                        <InputText
                          placeholder="Nome da tarefa"
                          fontSize={18}
                          value={item.taskTitle}
                          onChangeText={(text) =>
                            updateTaskTitle(item._id, text)
                          }
                        />
                        <InputText
                          placeholder="Escreva mais sobre a tarefa..."
                          fontSize={16}
                          multiline={true}
                          alignVertical="top"
                          maxLen={200}
                          value={item.taskDesc}
                          onChangeText={(text) =>
                            updatedTaskDescription(item._id, text)
                          }
                        />
                      </View>
                      <TouchableOpacity style={{zIndex: 1, position: 'absolute', top: 0, bottom: 0, right: 2}} onPress={() => deleteTasks(item._id)}>
                          <FontAwesome
                            name="minus-circle"
                            size={30}
                            color="black"
                          />
                        </TouchableOpacity>
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

        {optionValue === "NewTask" ? (
          <TouchableOpacity style={mS.sendButton}>
            <Text style={[s.subtitle, { color: "#f4f4f4" }]}>Criar Tarefa</Text>
            <MaterialIcons name="verified" size={25} color="#f4f4f4" />
          </TouchableOpacity>
        ) : null}
      </View>
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
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  taskCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#c4c4c4",
    borderRadius: 10,
    padding: 5,
    marginVertical: 5
  },

  sendButton: {
    zIndex: 1,
    position: "absolute",
    bottom: 20,
    backgroundColor: "#0cc0df",
    borderRadius: 40,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  flatlist: {
    
  }
});
