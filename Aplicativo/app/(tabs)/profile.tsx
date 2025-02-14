import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CardComponent from '../../src/components/card'

export default function Profile(){

    const [userData, setUserData] = useState<{user: {title: string, email: string, age: string}, }>()

    useEffect(() => {
        const getUserData = async () => {
            const user = await AsyncStorage.getItem('@user' )
            const data = JSON.parse(user || '{}')
            setUserData(data)
            console.log('Dados do perfil: ', userData )
        }

        getUserData()
    }, [])

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <CardComponent
                user={{
                    title: userData?.user.title,
                    email: userData?.user.email,
                    age: userData?.user?.age
                }}
            />
        </View>
    )
}