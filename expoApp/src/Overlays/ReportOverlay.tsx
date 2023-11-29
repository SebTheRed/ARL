import React,{useState,useEffect} from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { scaleFont } from '../Utilities/fontSizing';
import { useUserData } from '../Contexts/UserDataContext';
import LoadingOverlay from './LoadingOverlay';
import ErrorModal from './ErrorModal';
import CompleteOverlay from './CompleteOverlay';

const ReportOverlay = ({type, visibleBool, opacity, text, setVisibleBool, relevantData}:any):JSX.Element => {

 const {userData}:any = useUserData()

  const [inappropriateBool,setInappropriateBool] = useState<boolean>(false)
  const [harassmentBool,setHarassmentBool] = useState<boolean>(false)
  const [hateBool,setHateBool] = useState<boolean>(false)
  const [loadingBool,setLoadingBool] = useState<boolean>(false)
  const [completeBool,setCompleteBool] = useState<boolean>(false)
  const [errorBool,setErrorBool] = useState<boolean>(false)

  const generateReport = async() => {
    if (hateBool==false&&inappropriateBool==false&&harassmentBool==false) {return;}
    setLoadingBool(true)
    let reportObj = {
      type: type,
      reportingUser: userData.userName,
      reportingUID: userData.uid,
      reportedUser: relevantData.posterUserName,
      reportedUID: relevantData.posterUID,
      inappropriate: inappropriateBool,
      harassment: harassmentBool,
      hate: hateBool,
      postID: ""
    }
    if ( type == "post" || type == "trophy" ) {reportObj.postID = relevantData.id}
    console.log(reportObj)
    try {
      const response = await fetch('https://us-central1-appreallife-ea3d9.cloudfunctions.net/reportPost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportObj)
      });
      if (!response.ok) {
        console.error("Report Failed!")
        console.error(response)
        setLoadingBool(false)
        setErrorBool(true)
      } else if (response.ok) {
        setLoadingBool(false)
        setCompleteBool(true)

      }
    } catch(err) {
      console.error(err)
      setLoadingBool(false)
      setErrorBool(true)
    }
    
    
  }

  const closeModal = () => {
    setInappropriateBool(false)
    setHarassmentBool(false)
    setHateBool(false)
    setVisibleBool(isVisible => !isVisible)
  }

  const OptionsSplitter = ():JSX.Element => {
    switch(type){
      case "post":
      case "trophy":
         return(
        <View style={styles.optionsWrapper}>
          <TouchableOpacity 
            style={inappropriateBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setInappropriateBool(prevState => !prevState)}
          >
            <Text style={inappropriateBool ? styles.optionTextSelected : styles.optionTitle}>Inappropriate</Text>
            <Text style={inappropriateBool ? styles.optionDescriptionSelected : styles.optionDescription}>This post has content that isn't 13+ friendly.</Text>
          </TouchableOpacity>
          <View style={{height:10}} />
          <TouchableOpacity 
            style={harassmentBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setHarassmentBool(prevState => !prevState)}
          >
            <Text style={harassmentBool ? styles.optionTextSelected : styles.optionTitle}>Harassment / Bullying</Text>
            <Text style={harassmentBool ? styles.optionDescriptionSelected : styles.optionDescription}>This post contains threats or harassment toward others.</Text>
          </TouchableOpacity>
          <View style={{height:10}} />
          <TouchableOpacity 
            style={hateBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setHateBool(prevState => !prevState)}
          >
            <Text style={hateBool ? styles.optionTextSelected : styles.optionTitle}>Hate Speech</Text>
            <Text style={hateBool ? styles.optionDescriptionSelected : styles.optionDescription}>This post promotes hate.</Text>
          </TouchableOpacity>
        </View>
      )
      case "profile": return(
        <View style={styles.optionsWrapper}>
          <TouchableOpacity 
            style={inappropriateBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setInappropriateBool(prevState => !prevState)}
          >
            <Text style={inappropriateBool ? styles.optionTextSelected : styles.optionTitle}>Inappropriate</Text>
            <Text style={inappropriateBool ? styles.optionDescriptionSelected : styles.optionDescription}>This profile has content that isn't 13+ friendly.</Text>
          </TouchableOpacity>
          <View style={{height:10}} />
          <TouchableOpacity 
            style={harassmentBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setHarassmentBool(prevState => !prevState)}
          >
            <Text style={harassmentBool ? styles.optionTextSelected : styles.optionTitle}>Harassment / Bullying</Text>
            <Text style={harassmentBool ? styles.optionDescriptionSelected : styles.optionDescription}>This profile contains threats or harassment toward others.</Text>
          </TouchableOpacity>
          <View style={{height:10}} />
          <TouchableOpacity 
            style={hateBool ? styles.optionBoxSelected : styles.optionBox}
            onPress={() => setHateBool(prevState => !prevState)}
          >
            <Text style={hateBool ? styles.optionTextSelected : styles.optionTitle}>Hate Speech</Text>
            <Text style={hateBool ? styles.optionDescriptionSelected : styles.optionDescription}>This profile promotes hate.</Text>
          </TouchableOpacity>
        </View>
      )
      default: return(
        <View style={styles.optionsWrapper}>
        </View>
      );
    }
  }


  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visibleBool}
      onRequestClose={() => {setVisibleBool(false)}}
    >
      <View style={{...styles.modalBackground, backgroundColor: `rgba(0,0,0,${opacity})`}}>
        <View style={styles.activityIndicatorWrapper}>
          <Text style={styles.modalTitle}>{text}</Text>
          <View style={{height:20}} />
          <Text style={styles.optionTitle}>Please select all that apply:</Text>
          <View style={{height:10}} />
          <OptionsSplitter />
          <View style={{height:69}} />
          <TouchableOpacity onPress={()=>generateReport()} style={{...styles.modalButton, backgroundColor:"#ff0000"}}>
            <Text style={{color:"#1c1c1c", fontWeight:"bold", fontSize:scaleFont(22)}}>Create Report</Text>
          </TouchableOpacity>
          <View style={{height:20}} />
          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={{color:"#fff",fontSize:scaleFont(22)}}>Cancel</Text>
          </TouchableOpacity>
          <View style={{height:20}} />
        </View>
      </View>
      {loadingBool && <LoadingOverlay isVisible={loadingBool} text={"Submitting Report..."} opacity={0.8} />}
      {completeBool && <CompleteOverlay setUnderVisible={closeModal} isVisible={completeBool} text={"Thank you for submitting your report!"} opacity={0.90} setIsVisible={setCompleteBool} />}
      {errorBool && <ErrorModal setIsVisible={setErrorBool} isVisible={errorBool} text={"Report upload failed. Please try again!"} opacity={0.9}/>}
    </Modal>
  )
  
}

const styles = StyleSheet.create({
  optionsWrapper:{
    width:"100%",
    alignItems:"center",
  },
  optionBox:{
    width:"95%",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:10,
    borderWidth:2,
    borderColor:"#fff"
  },
  optionTitle:{
    color:"#fff",
    fontSize:scaleFont(22),
  },
  optionBoxSelected: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#fff",
  },
  optionTextSelected: {
    color: "#1c1c1c",
    fontSize: scaleFont(22), // adjust as needed
  },
  optionDescriptionSelected:{
    color:"#1c1c1c",
    fontSize:scaleFont(16)
  },
  optionDescription:{
    color:"#fff",
    fontSize:scaleFont(16),
  },
  modalTitle:{
    fontSize:scaleFont(24),
    color:"#ff0000"
  },
  modalBackground: {
    zIndex:100,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#1c1c1c', // Transparent background
    borderRadius:10,
    borderColor:"#fff",
    borderWidth:2,
    // height: 150,
    width: "95%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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
});

export default ReportOverlay