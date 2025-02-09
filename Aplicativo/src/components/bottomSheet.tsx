import React, { forwardRef, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface BottomSheetProps {
  children?: React.ReactNode;
}

const CustomBottomSheet = forwardRef<BottomSheet, BottomSheetProps>(({ children }, ref) => {

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheet
        ref={ref} 
        index={-1} 
        snapPoints={snapPoints}
        enablePanDownToClose 
        backgroundComponent={() => <View style={styles.background} />}
      >
        <View style={styles.content}>
          {children || <Text>Conteúdo do Bottom Sheet</Text>}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
});

export default CustomBottomSheet;