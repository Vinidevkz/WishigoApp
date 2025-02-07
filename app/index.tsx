import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar
} from "react-native";
import { useRouter } from 'expo-router';
import {
  useFonts,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { s } from "../src/utils/styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";


//components
import Button from "../src/components/button";
import InputText from "../src/components/inputText";

export default function Index() {
  let [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const router = useRouter();



  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} color={"#0cc0df"} />;
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

      <View style={s.container}>
        <InputText placeholder="Email" iconLibName="Feather" icon="mail" />

        <InputText
          password={true}
          placeholder="Senha"
          iconLibName="Feather"
          icon="unlock"
          iconLibVisible="MaterialCommunityIcons"
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
            onPress={() => router.push("/(tabs)")}
            height={50}
            width={"80%"}
            justify="space-between"
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
