import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import Modal from 'react-native-modal'
import { useState, useEffect } from 'react'

import {FontAwesome} from '@expo/vector-icons'

import { s } from '../utils/styles/styles'

import InputText from './inputText'
import Button from './button'

interface ModalProps {
    isVisible: boolean
    optionValue: string
    onClose: () => void
}

interface Task {
    title: string,
    description: string,
    priority: string,
    tasks: [
        {
            taskTitle: string,
            taskDesc: string,
            isCompleted: boolean
        }
    ]
}

export default function ModalComponent({isVisible, onClose, optionValue}: ModalProps) {

    const [tasks, setTasks] = useState<{ _id: string, taskTitle: string, taskDescription: string, isCompleted: boolean}[]>([])

    useEffect(() => {
        const TasksArray = [
            {
                _id: "1",
                taskTitle: "",
                taskDescription: "",
                isCompleted: false,
            }
        ]

        setTasks(TasksArray)
    }, [])




    return (
        <Modal style={mS.modal} isVisible={isVisible} onBackdropPress={onClose} onSwipeComplete={onClose} animationIn={"fadeInDown"} animationOut={'fadeOutUp'}>
            <View style={mS.modalContent}>
                <View style={[s.container, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }]}>
                    <Text style={[s.title, {fontSize: 25}]}>
                        {optionValue === "NewTask" ? "Criar Nova Tarefa" : "Pergunte ao Wish"}
                    </Text>

                    <TouchableOpacity onPress={onClose}>
                    <FontAwesome name="window-close" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                {
                optionValue === "NewTask" ? (
                    <View>
                        <View style={[ {width: '100%', alignItems: 'center',}]}>
                            <InputText placeholder='Insira um título' fontSize={30} />
        
                            <View style={{maxHeight: 200}}>
                            <InputText placeholder='Escreva mais sobre a tarefa...' fontSize={18} multiline={true} alignVertical="top" maxLen={300} />
                            </View>
        
                            <Text style={[s.text, {alignSelf: 'flex-start', color: '#b8b8b8', fontSize: 15}]}>Limite: 300</Text>
                        </View>
        
                        <View style={[ {width: '100%', alignItems: 'flex-start', }]}>
                            <Text style={s.subtitle}>Objetivos:</Text>
                            <FlatList
                            data={tasks}
                            keyExtractor={(item) => item._id}
                            renderItem={({item}) => {
                                return (
                                    <View style={[mS.taskCont]}>
                                        <View style={{width: '80%',}}>
                                         <InputText placeholder='Nome da tarefa' value={item.taskTitle}/>
                                         <InputText placeholder='Escreva mais sobre a tarefa...' fontSize={18} multiline={true} alignVertical="top" maxLen={300} value={item.taskDescription} />
                                        </View>
                                        <View>
                                            <Button name='Alto' backgroundColor='#f4f4f4' borderColor='#f4f4f4'/>
                                        </View>
                                    </View>
                                )
                            }}
                            />
                            

                        </View>
                    </View>
                    ) : (
                    <View style={[ {width: '100%', alignItems: 'center',}]}>
                        <Text>Ias</Text>
                    </View>
                    )
                }




            </View>
        </Modal>
    )
}

const mS = StyleSheet.create({
    modal: {
        margin: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    },

    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20
    },

    taskCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})


