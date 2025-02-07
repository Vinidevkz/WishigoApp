import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle } from "react-native";

import { Feather, FontAwesome5 } from "@expo/vector-icons";

interface ButtonProps {
  name: string;
  backgroundColor: string;
  borderColor: string;
  height?: number;
  width?: number | string;
  justify?: string,
  iconLibName?: "Feather" | "FontAwesome5";
  icon?: string;
  onPress?: () => void;
}

const iconLibraries = {
  Feather,
  FontAwesome5,
};

const Button: React.FC<ButtonProps> = ({
  name,
  backgroundColor = "f4f4f4",
  borderColor = "#1b1b1b",
  height,
  width,
  justify,
  iconLibName,
  icon,
  onPress,
}) => {
  const IconComponent = iconLibName ? iconLibraries[iconLibName] : null;

  return (
    <TouchableOpacity
      style={[
        s.button,
        {
          borderColor: borderColor,
          height: height,
          width: width as ViewStyle["width"],
          justifyContent: justify as ViewStyle["justifyContent"]
        },
      ]}
      onPress={onPress}
    >

        <Text
          style={{

            fontFamily: "Poppins_500Medium",
            fontSize: 17,
            alignSelf: "center",
          }}
        >
          {name}
        </Text>

        {icon && iconLibName && IconComponent && (
          <IconComponent style={s.icon} name={icon} size={24} color="black" />
        )}
        

    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 15
  },

  icon: {
    
  },
});

export default Button;
