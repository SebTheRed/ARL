import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

backgroundStyle:{
  backgroundColor: '#1c1c1c',
  flex:1,
},
headerBar:{
  backgroundColor:"#1c1c1c",
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
  fontSize:18,
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
  // fontFamily: "Phosphate",
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
eventTileBox:{
  marginTop:20,
  width:"100%",
  alignItems:"center",
  borderColor:"white",
  borderWidth:2,
  borderRadius:10,
},
eventTileWrapper:{
  width:"95%",
  // height:120,
  margin:5,
  borderWidth:2,
  borderColor:"#656565",
  borderRadius:10,
  flexDirection:"row"
  
},
eventTileMain:{
  width:"80%",
  overflow:"hidden",
},
eventTileText:{
  padding:2,
  color:"white",
  fontSize:18
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
eventButtonWrapper:{
  alignItems:"center",
  justifyContent:"space-evenly",
  width:"100%",
  height:"100%",
  flexDirection:"column"
},
eventButtonIcon:{
  height:"50%",
  width:"50%",
  alignItems:"center",
},
eventButtonText:{

},
highlight: {
  fontWeight: '700',
},
skillPageHeader:{
  borderColor:"white",
  borderWidth:2,
  borderRadius:10,
  padding:5,
  marginTop:10,
},
skillPageTitleBox:{
  flexDirection:"row",
  justifyContent:"space-between",
  width:"95%"
},
skillPageXPContainer:{
  position:"relative",
  height:45,
  width:"95%",
  borderWidth:2,
},
skillPageXPBar:{
  width:"100%",
  height:40,
  borderColor:"#656565",
  borderWidth:2,
  position:"absolute",
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
expUploaderTop:{
  backgroundColor:"#1c1c1c",
  flex:1,
},
closeUploaderButton:{
  color:"white",
  fontWeight:"bold",
  paddingTop:50,
  paddingLeft:0,
  borderBottomWidth:2,
  borderColor:"#656565",
},
actionBox:{
  color:"white"
},
actionText:{
  color:"white",
  fontSize:30
},
logContainer:{
  marginTop:20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1c1c1c',
},
textArea: {
  height: 120,
  justifyContent: 'flex-start',
  borderColor: 'white',
  borderRadius:10,
  borderWidth: 2,
  width: '95%',
  padding: 10,
  backgroundColor: '#656565',
  color:"white",
},
togglesContainer:{
  marginTop:20,
  width:"100%",
  alignItems:"center",
  // borderColor:"white",
  // borderWidth:2,
  // borderRadius:10,
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
logincontainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: '#1c1c1c',
},
loginWrapper:{
  width:"80%",
  height:"60%",
  backgroundColor:"#1c1c1c",
  justifyContent:"center",
  alignContent:"center",
  padding:10,
  borderColor:"white",
  borderWidth:2,
  borderRadius:10,
  filter:"drop-shadow(0 0 10 black)",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.85,
  shadowRadius: 13.84,
},
ARLLogoWrapper:{
  alignItems:'center',
  height:"10%",
  

},
logintitle: {
  fontSize: 32,
  fontWeight: 'bold',
  marginBottom: 20,
  color:"white",
},
logininputContainer: {
  width: '100%',
  marginBottom: 15,
},
loginlabel: {
  fontSize: 16,
  marginBottom: 5,
  color:"white",
},
logininput: {
  height: 40,
  paddingHorizontal: 10,
  borderWidth: 1,
  backgroundColor: '#656565',
  borderColor:"white",
  borderRadius: 5,
  color:"white",
},
loginbutton: {
  marginTop: 30,
  backgroundColor: '#007bff',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignItems:"center",
  textAlign:'center'
},
loginSignupButton:{
  marginBottom:20,
  backgroundColor:"#656565",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius:5,
  alignItems:'center',
  width:"40%"
},
whatIsARLButton:{
  marginTop:20,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  alignItems:"center",
  textAlign:'center',
  backgroundColor:'#656565',
},
loginbuttonText: {
  color: '#fff',
  fontSize: 18,
},


feedFlatList:{
  backgroundColor:"#1c1c1c",
  flex:1,
  width:"100%",
},
feedPostWrapper:{
  width:370,
  margin:"2.5%",
  borderRadius:10,
  borderWidth:2,
  borderColor:"white"
},
feedPostText: {
  color:"white"
},
postTopRow:{
  flexDirection:"row",
  justifyContent:'space-between',
  margin:2.5,
  alignItems:"flex-end",
},
postProfileAndNameContainer:{
  flexDirection:"row",
  justifyContent:"flex-start",
  alignItems:"flex-end"
},
postProfPic:{
  borderColor:"white",
  borderRadius:50,
  borderWidth:2,
  width:35,
  height:35,
},
postTopTitleContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  width:250,
  alignItems:"flex-end",
  
},
postTopName:{
  color:"white",
  fontSize:24,
},
postTopStreakIconContainer:{
  flexDirection:"row",
  width:100,
  alignItems:"flex-end",
},
postTopStreakIcon:{
  tintColor:"white",
  width: 25,  // desired width
  height: 25, // desired height
  resizeMode: 'contain', // or 'cover'
  marginBottom:3,
},
postTopMapIcon:{
  tintColor:"white",
  width: 25,  // desired width
  height: 25, // desired height
  resizeMode: 'contain', // or 'cover'
  marginBottom:3,
},
postTopStreak:{
  color:"white",
  fontSize:18,
},
postTopTrophyBox:{

},
postTopTimestamp:{
  color:"gray",
  fontSize:18,
},
postTopExperienceContainer:{
  margin:2.5,
  marginLeft:37.5,
  flexDirection:"row",
  justifyContent:"space-between",
},
postTopExperienceName:{
  color:"white",
  fontSize:18,

},
postTopTraitName:{
  fontSize:18,
},
postTopMapButton:{

},
postContentContainer:{
  width:"95%",
  height:200,
  borderColor:"#656565",
  borderWidth:2,
  borderRadius:8,
  margin:"2.5%",
  marginBottom:50,
},
postContentLogText:{
  color:"white",
  fontSize:18,
},
postBottomWrapper:{
  flexDirection:"row",
  justifyContent:"space-evenly",
  position:"absolute",
  bottom:0,
  width:"100%",
  backgroundColor:"#656565",
  borderBottomEndRadius:8,
  borderBottomLeftRadius:8,
  // borderTopWidth:2,
  // borderColor:"white"
},
postBottomIconContainer:{
  alignItems:"center"
},
postBottomIcon:{
  tintColor:"white",
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},
postBottomText:{},
postBottomReactionContainer:{
  alignItems:"center",
},
postBottomVoteContainer:{
  flexDirection:"row",
  alignItems:"center",
  // borderWidth:2,
  // borderColor:"white",
  // borderRadius:5
},
postBottomScore:{
  color:"white",
  fontSize:25,
},
postBottomCommentsContainer:{
  tintColor:"white",
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},


profilePageContainer:{
  backgroundColor:"#1c1c1c",
  flex:1,
},
profilePageCover:{
  width:"100%",
  height:150,
  backgroundColor:"gray",
  borderBottomWidth:2,
  borderColor:"#fff"
},
profilePageTopContainer:{ 
  flexDirection:"row",
  justifyContent:"space-between",
  height:50,
},
profilePageTopLeftContainer:{
  width:"30%",
  flexDirection:"row",
  alignItems:"flex-start",
  marginTop:2.5,
  // borderWidth:2,
  // borderColor:"#fff",
},
profilePageTrophyButton:{
  width:43,
  height:43,
},
profilePageTrophyPin:{
  tintColor:"white",
  width: 43,  // desired width
  height: 43, // desired height
  resizeMode: 'contain', // or 'cover'
},
profilePageStreakContainer:{
  flexDirection:"row",
  alignItems:"flex-start",
},
profilePagePictureBox:{
  width:100,
  height:100,
},
profilePagePicture:{
  width: 100,  // desired width
  height: 100, // desired height
  resizeMode: 'contain', // or 'cover'
  borderRadius:50,
  borderWidth:2,
  borderColor:"#fff",
  marginTop:-50,
},
profilePageMultiBox:{
  width:"30%",
  alignItems:"flex-end",
},
profilePageMultiButton:{
  flexDirection:"row",
  borderWidth:1,
  borderColor:"#656565",
  borderRadius:5,
  padding:5,
  margin:2.5,
},
postTopButtonText:{
  color:"white"
},
profilePageNamesContainer:{
  alignItems:"center",
},
profilePageUserName:{
  color:"white",
  fontSize: 24,
},
profilePageRealName:{
  color:"white"
},
profilePageStatsContainer:{
  borderColor:"#fff",
  borderWidth:2,
  width:"95%"
},
profilePageStatsTop:{},
profilePageJoinDateContainer:{},
profilePageFriendsContainer:{},
profilePageStatsbottom:{},
profilePageTraitBox:{},
profilePageTraitNumber:{},



});

export default styles