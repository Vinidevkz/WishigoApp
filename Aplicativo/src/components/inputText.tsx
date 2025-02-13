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
  value?: string;
  backgroundColor?: string;
  fontSize?: number;
  multiline?: boolean
  alignVertical?: "top" | "center" | "bottom";
  maxLen?: number,
  iconLibName?: "Feather" | "FontAwesome5";
  paddingHorizontal?: number;
  paddingVertical?: number;
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
  value,
  backgroundColor,
  multiline,
  alignVertical,
  maxLen,
  fontSize,
  paddingHorizontal,
  paddingVertical,
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
    <View style={[s.content, {backgroundColor: backgroundColor, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical}]}>
      {IconComponent && icon && (
        <IconComponent name={icon} size={24} color={"#1b1b1b"} />
      )}

      <TextInput
        secureTextEntry={password && !isVisible}
        style={[s.input, {fontSize: fontSize, }]}
        multiline={multiline}
        textAlignVertical={alignVertical}
        maxLength={maxLen}
        value={value}
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
    borderRadius: 20,
    gap: 5,
    width: "100%",
  },
});

export default InputText;
