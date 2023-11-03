import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';

const ErrorModal = ({ isVisible, text, opacity,setErrorBool }:any) => {

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={() => {setErrorBool(false)}}
    >
      <View style={{...styles.modalBackground, backgroundColor: `rgba(0,0,0,${opacity})`}}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={{color:"#ff0000", fontSize:30, fontWeight:"bold"}}>!</Text>
          <Text style={{color:"#fff"}}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    zIndex:100,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000000', // Transparent background
    height: 100,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ErrorModal