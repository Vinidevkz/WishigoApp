import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import Modal from 'react-native-modal'

import {FontAwesome} from '@expo/vector-icons'

import { s } from '../utils/styles/styles'

import InputText from './inputText'

interface ModalProps {
    isVisible: boolean
    optionValue: string
    onClose: () => void
}

export default function ModalComponent({isVisible, onClose, optionValue}: ModalProps) {
    return (
        <Modal style={mS.modal} isVisible={isVisible} onBackdropPress={onClose} onSwipeComplete={onClose} animationIn={"fadeInDown"} animationOut={'fadeOutUp'}>
            <View style={mS.modalContent}>
                <View style={[s.container, {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20}]}>
                    <Text style={[s.title, {fontSize: 25}]}>
                        {optionValue === "NewTask" ? "Criar Nova Tarefa" : "Pergunte ao Wish"}
                    </Text>

                    <TouchableOpacity onPress={onClose}>
                    <FontAwesome name="window-close" size={30} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={[ {width: '100%', alignItems: 'flex-start'}]}>
                    <InputText placeholder='Insira um título' fontSize={30} />

                    <View style={{maxHeight: 200}}>
                    <InputText placeholder='Escreva mais sobre a tarefa...' fontSize={18} multiline={true} alignVertical="top" maxLen={300} />
                    </View>

                    <Text style={[s.text, {alignSelf: 'flex-start', paddingHorizontal: 20, color: '#b8b8b8'}]}>Limite: 300</Text>
                </View>
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
    }
})


