import React, { forwardRef, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface BottomSheetProps {
  children?: React.ReactNode;
}

const CustomBottomSheet = forwardRef<BottomSheet, BottomSheetProps>(
  ({ children }, ref) => {
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheet
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backgroundComponent={() => <View style={s.background} />}
        >
          <View style={s.content}>
            {children}
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    );
  }
);

const s = StyleSheet.create({
  background: {
    backgroundColor: "red",
    height: 400,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
});

export default CustomBottomSheet;
