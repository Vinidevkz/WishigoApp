import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

//hooks
import { useEffect, useState } from "react";

//styles
import { s } from "../src/utils/styles/styles";
import { LinearGradient } from "expo-linear-gradient";

//components
import Button from "../src/components/button";
import InputText from "../src/components/inputText";

//APIs
import Routes from "../src/services/api";

//Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const checkLoginStatus = async () => {
  try {
    const userId = await AsyncStorage.getItem('@user')
    return userId !== null
  } catch (error) {
      console.log('Erro ao verificar status de login.', error)
      return false
  }
}

//context
import { useUser } from "../src/contexts/context";

export default function Index() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [ email, setEmail ] = useState(String);
  const [ password, setPassword ] = useState(String);
  const { setUser } = useUser()

  async function SignIn(email: String, password: String) {
    const url = Routes.UserSignIn;
    const requestBody = JSON.stringify({email, password})
    console.log("Url de requisição: ",url)
    console.log("Corpo da requisição/Body: ",requestBody)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            "Erro ao fazer Login, Verifique seus dados e tente novamente."
        );
        
      }
      const userData = await response.json();
      console.log("Usuário Logado: ", userData);
      setUser(userData)
      //save login with user id
      await AsyncStorage.setItem('@user', JSON.stringify(userData))
      //console.log(AsyncStorage.getItem('@user'))
      router.push("/(tabs)")
      setIsLoading(false)
    } catch (error: any) {
      Alert.alert("Erro ao fazer login: ",error.message)
      console.error("Erro ao fazer login: ",error.message);
      throw error;
      
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userId = await AsyncStorage.getItem('@user_id');
      if (userId) {
        setIsLoggedIn(true);
        router.push("/(tabs)"); 
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkLoginStatus();
  }, [router]);



  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar backgroundColor="transparent" translucent />
        <ActivityIndicator size={50} color={"#0cc0df"} />
      </View>
    );
  }
  return (
    <View style={s.mainContainer}>
      <StatusBar backgroundColor="transparent" translucent />

      <LinearGradient
        colors={["rgba(0,0,0,0.1)", "transparent"]}
        style={s.background}
      />

      <View style={s.container}>
        <Image
          style={{ width: 250, height: 100 }}
          source={require("../src/utils/imgs/Wishigo.png")}
        />
        <Text style={[s.subtitle, { width: "50%", textAlign: "center" }]}>
          Listas, tarefas, rotina e muito mais.
        </Text>
      </View>

      <View style={[s.container, {width: '80%'}]}>
      <InputText
      placeholder="Email"
      backgroundColor="#d9d9d9"
      iconLibName="Feather"
      icon="mail"
      onChangeText={(text: any) => setEmail(text)}
      />

        <InputText
          password={true}
          placeholder="Senha"
          backgroundColor="#d9d9d9"
          iconLibName="Feather"
          icon="unlock"
          iconLibVisible="MaterialCommunityIcons"
          onChangeText={(text: any) => setPassword(text)}
        />
      </View>

      <View style={s.container}>
        <Text style={s.text}>
          Não possuí uma conta?{" "}
          <Text style={[s.text, { textDecorationLine: "underline" }]}>
            Cadastre-se
          </Text>
        </Text>
      </View>

      <View style={s.container}>
        <Button
          name="Entrar"
          backgroundColor="#f4f4f4"
          borderColor="#0cc0df"
          iconLibName="Feather"
          icon="arrow-right-circle"
          onPress={() => {setIsLoading(true), SignIn(email, password)}}
          height={50}
          width={"80%"}
          justify="space-between"
          isLoading={isLoading}
        />

        <Button
          name="Entrar com o Google"
          backgroundColor="#f4f4f4"
          borderColor="#1b1b1b"
          iconLibName="FontAwesome5"
          icon="google"
          height={50}
          width={"80%"}
          justify="space-between"
        />
      </View>

      <View style={[s.container, { height: 100 }]}>
        <Text style={s.text}>
          Leia nossos termos de{" "}
          <Text style={{ textDecorationLine: "underline" }}>
            política e privacidade
          </Text>
        </Text>
      </View>
    </View>
  );
}
