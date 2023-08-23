import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

backgroundStyle:{
  backgroundColor: '#1c1c1c',
  flex:1,
},
headerBar:{
  // backgroundColor:"#ff7704",
  width:"100%",
  height:"5%",
  alignItems:"center",
  color:"white",
  borderBottomWidth:2,
  borderColor:"#ffffff",
  flexDirection:"row",
  justifyContent:"space-between"
},
headerBarText:{
  color:"white",
  fontSize:16
,},
headerBarIcon:{
  tintColor:"white",
  width: 25,  // desired width
  height: 25, // desired height
  resizeMode: 'contain', // or 'cover'
},
statusBar:{
  backgroundColor:"white",
},
bottomBar:{
  height:'10%',
  width:'100%',
  backgroundColor:'#1c1c1c',
  flexDirection:"row",
  justifyContent:"space-evenly",
  borderTopWidth:2,
  borderColor:"white",
  paddingTop:"1%",
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
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},
bottomBarText:{
  color:"white",
  fontSize:16,
},
backHeaderBar:{
  height:26,
  borderBottomWidth:2,
  borderColor:"#656565",
},
backHeaderText:{
  color:"white",
  fontSize:20,
},
sectionContainer: {
  margin: 5,
  borderWidth:2,
  borderColor:"#656565",
  flexDirection:"row",
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
  justifyContent:"space-between",
  alignItems:"center",
},
sectionTextContainer:{
  display:"flex",
  flexDirection:"column",
  marginHorizontal:24,
},
sectionTitle: {
  fontSize: 28,
  fontWeight: '600',
  fontFamily: "X Company Regular",
  color:"white",
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
  color:"white",
},
sectionLevelBox:{
  height:"96%",
  width:"20%",
  // backgroundColor:"red",
  borderRadius:7,
  alignItems:"center",
  marginRight:0,
  borderColor:"#656565",
  borderWidth:2
},
borderedTextShadow:{
  fontSize:48,
  paddingLeft:5,
  position:"absolute",
  zIndex:9,
},
borderedText:{
  fontSize:45,
  position:"absolute",
  zIndex:10,
},
offsetWrapper:{
  left:-25,
  position:"relative",
  alignItems:"center",
  justifyContent:"center"
},
highlight: {
  fontWeight: '700',
},
skillPageTitleBox:{
  flexDirection:"row",
  justifyContent:"space-between",
  width:"95%"
},
skillPageXPBar:{
  width:"95%",
  height:20,
  borderColor:"#656565",
  borderWidth:2,
},
skillPageXPBox:{
  width:"95%",
  justifyContent:"space-between",
  alignItems:"center",
  flexDirection:"row",
},
skillPageXPText:{
  color:"white",
},
skillPageTitle:{
  color:"white",
  fontSize:40,
},
headerIdk:{
  color:"blue",
},
sectionDescriptionContainer:{
},
trophyBoxWrapper:{
  flexDirection:"column",
  width:"100%",
  height:"100%",
  flexWrap:"wrap",
},
trophyBox:{
  width:100,
  height:"32.6%",
  color:"white",
  borderColor:"#656565",
  borderWidth:2,
  alignItems:"center",
  justifyContent:"space-between",
  margin:1,
},
trophyText:{
  padding:3,
  color:"white",
  textAlign:"center",
},
trophyIcon:{
  tintColor:"white",
  width: 80,  // desired width
  height: 80, // desired height
  resizeMode: 'contain', // or 'cover'
},




  });

export default styles