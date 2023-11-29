import React from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Text } from 'react-native';
import GreenCheck from '../IconBin/svg/green_check.svg'
import { scaleFont } from '../Utilities/fontSizing';

const CompleteOverlay = ({setUnderVisible, isVisible, text, opacity, setIsVisible }:any) => {


  const closeModal = () => {
    setIsVisible(isVisible => !isVisible)
    setUnderVisible()
    
  }


  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={{...styles.modalBackground, backgroundColor: `rgba(0,0,0,${opacity})`}}>
        <View style={styles.activityIndicatorWrapper}>
          <GreenCheck width={100} height={100} />
          <View style={{height:20}} />
          <Text style={{color:"#fff", fontSize:scaleFont(24)}}>{text}</Text>
          <View style={{height:20}} />
          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={{color:"#fff"}}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalButton:{
    backgroundColor:"#1c1c1c",
    width:200,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#fff"
  },
  modalBackground: {
    zIndex:100,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000000', // Transparent background
    height: 300,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default CompleteOverlay