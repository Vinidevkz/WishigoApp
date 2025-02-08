import React from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

interface InputProps {
  placeholder: string;
  iconLibName?: "Feather" | "FontAwesome5";
  icon?: string;
  password?: boolean;
  iconVisible?: "eye-outline";
  iconLibVisible?: "MaterialCommunityIcons";
  onChangeText?: (text: string) => void,
  onPress?: () => void;
}

const iconLibraries = {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
};

const InputText: React.FC<InputProps> = ({
  iconLibName,
  icon,
  placeholder,
  password = false,
  iconVisible = "eye-outline",
  iconLibVisible,
  onChangeText
}) => {
  const IconComponent = iconLibName ? iconLibraries[iconLibName] : null;
  const IconVisibleComponent = iconLibVisible
    ? iconLibraries[iconLibVisible]
    : null;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={s.content}>
      {IconComponent && icon && (
        <IconComponent name={icon} size={24} color={"#1b1b1b"} />
      )}

      <TextInput
        secureTextEntry={password && !isVisible}
        style={s.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
      />
      {password && IconVisibleComponent && (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <IconVisibleComponent
            name={isVisible ? "eye-off-outline" : iconVisible}
            size={30}
            color={"#1b1b1b"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  input: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
    flex: 1,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d9d9d9",
    borderRadius: 20,
    paddingHorizontal: 15,
    gap: 5,
    width: "80%",
    height: 50,
  },
});

export default InputText;
