import React from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ErrorModal = ({ isVisible, text, opacity,setIsVisible }:any) => {

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={() => {setIsVisible(false)}}
    >
      <View style={{...styles.modalBackground, backgroundColor: `rgba(0,0,0,${opacity})`}}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={{color:"#ff0000", fontSize:50, fontWeight:"bold"}}>!</Text>
          <View style={{height:69}} />
          <Text style={{color:"#fff"}}>{text}</Text>
          <View style={{height:69}} />
          <TouchableOpacity onPress={()=>setIsVisible(isVisible => !isVisible)} style={styles.modalButton}>
            <Text style={{color:"#fff"}}>CLOSE</Text>
          </TouchableOpacity>
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
    height: 150,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  modalButton:{
    backgroundColor:"#ff0000",
    width:200,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#fff"
  },
});

export default ErrorModal