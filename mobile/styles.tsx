import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

backgroundStyle:{
  backgroundColor: '#1c1c1c',
  flex:1,
},
headerBar:{
  backgroundColor:"#ff7704",
  width:"100%",
  height:"5%",
},
statusBar:{
  backgroundColor:"white"
},
bottomBar:{
  height:'10%',
  width:'100%',
  backgroundColor:'#1c1c1c',
  flexDirection:"row",
  justifyContent:"space-evenly",
  borderTopWidth:4,
  borderColor:"white",
},
bottomBarIconBox:{
  height:"100%",
  width:"20%",
  alignItems:"center",
  // color:"white",
  // borderWidth:2,
  // borderColor:"white",
},
bottomBarIcon:{
  tintColor:"white",
},
bottomBarText:{
  color:"white",
},
sectionContainer: {
  margin: 5,
  paddingHorizontal: 24,
  borderWidth:2,
  borderColor:"#656565",
  flexDirection:"column",
  backgroundColor:"#1c1c1c",
  borderRadius:10,
  filter:"drop-shadow(0 0 10 black)",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
sectionTitle: {
  fontSize: 24,
  fontWeight: '600',
  fontFamily: "X Company Regular"
},
sectionFlare:{
  fontSize:16,
  fontWeight:'400',
  color:"white",

},
sectionDescription: {
  marginTop: 8,
  fontSize: 18,
  fontWeight: '400',
  flexDirection:"column",
},
highlight: {
  fontWeight: '700',
},
headerIdk:{
  color:"blue",
},
sectionDescriptionContainer:{
},

  });

export default styles