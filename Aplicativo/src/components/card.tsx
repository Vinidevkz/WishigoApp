import {View, Text, StyleSheet} from 'react-native'
import React from 'react'

import {Entypo} from '@expo/vector-icons'


import  { s } from '../utils/styles/styles'
import  Colors  from '../utils/styles/colors'


interface CardProps {
    user: {
        title?: string,
        email?: string,
        age?: string,
    }
}
//React.FunctionComponent
const CardComponent: React.FC<CardProps> = ({user}) => {
    return(
        <View style={cS.cardCont}>
            <View style={{gap: 5}}>
                <Text style={s.title}>Nome de Usuário: {user.title}</Text>
                <Text style={s.subtitle}>Email: {user.email}</Text>
                <Text style={s.subtitle}>Idade: {user.age}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Text style={[s.text, {color: 'red'}]}>Sair da conta</Text>
            <Entypo name="log-out" size={24} color={Colors.red} />
            </View>

        </View>
    )
}

const cS = StyleSheet.create({
    cardCont:{
        borderWidth: 2,
        borderColor: '#c4c4c4',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        gap: 20,
        elevation: 3,
        backgroundColor: '#f4f4f4'
    }
})

export default CardComponent