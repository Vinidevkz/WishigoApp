import { View, Text, ScrollView, SafeAreaView, StatusBar, FlatList } from "react-native";
import { useState } from "react";

import { s } from '../src/utils/styles/styles'
import {AntDesign, FontAwesome5} from "@expo/vector-icons"

//components
import Navbar from '../src/components/navbar'
import Button from "../src/components/button";

const Tasks = [
  {
    "id": 1,
    "name": "Estudar Programação",
    "description": "Estudar TypeScript e React Native",
    "level": "Alto",
    "tasksNumber": 5,
    "createdAt": "01/02/2025",
    "endDate": "11/02/2025"
  },

  {
    "id": 2,
    "name": "Limpar a Casa",
    "description": "Jogar o lixo fora, etc",
    "level": "Média",
    "tasksNumber": 10,
    "createdAt": "05/02/2025",
    "endDate": "05/02/2025"
  }
]

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <Navbar icon1="menu" iconLibName1="Entypo" title="Seja Bem-vindo(a), Vinicius"/>
      <ScrollView style={{ marginTop:  (StatusBar.currentHeight || 0) + 80}}>
        <View style={s.achievementsCont}>
          <View style={s.row}>
            <Text style={s.subtitle}>Estrelas:</Text>

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', height: 35}}>
              <AntDesign name="staro" size={25} color="#5cd3ff" />
              <Text style={s.text}>25</Text>
            </View>
          </View>

          <View style={s.row}>

            <Text style={s.subtitle}>Conquistas:</Text>

            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', height: 35}}>
              <FontAwesome5 name="medal" size={25} color="black" />
              <Text style={s.text}>25</Text>
            </View>

          </View>

          <View style={s.outsideProgress}>
            <View style={[s.insideProgress, {width: '70%'}]}>
              <Text style={[s.text,{alignSelf: 'flex-end'}]}>70%</Text>
            </View>
          </View>
        </View>

        <View style={s.container}>
          <Text style={s.title}>Suas Tarefas</Text>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={s.card}>
                <View style={{gap: 10, height: 80}}>
                 <Text style={[s.subtitle, {fontSize: 18}]} numberOfLines={1}>{item.name}</Text>
                 <Text style={[s.text, {fontSize: 15}]} numberOfLines={2}>{item.description}</Text>
                </View>

                <Text style={[s.text, {}]}>Prioridade: {item.level}</Text>

                <View style={{gap: 10, height: 80}}>

                  <Text style={[s.subtitle, {fontSize: 18}]}>Itens na lista: {item.tasksNumber}</Text>

                  <Text style={[s.subtitle, {fontSize: 15}]}>Criado em: {item.createdAt}</Text>
                </View>

                <Button name="Ver Tarefa" backgroundColor="#fff" borderColor="#1b1b1b" height={40} width="100%" justify="center"/>
              </View>
            )} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}