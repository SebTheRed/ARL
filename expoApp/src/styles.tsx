import { StyleSheet } from "react-native";
import {scaleFont} from './Utilities/fontSizing'
const styles = StyleSheet.create({

/* 

HEADER BAR/BACKGROUND/BOTTOM BAR 

*/
defaultPageBackground:{
backgroundColor:"#1c1c1c",
alignItems:"center",
height:"100%",
},
backgroundStyle:{
  backgroundColor: '#1c1c1c',
  flex:1,
},
invalidInput: {
  borderColor: 'red',
},
headerBar:{
  backgroundColor:"#1c1c1c",
  width:"100%",
  height:50,
  alignItems:"center",
  color:"white",
  borderBottomWidth:2,
  borderColor:"#ffffff",
  flexDirection:"row",
  justifyContent:"space-between"
},
headerBarText:{
  color:"white",
  fontSize:scaleFont(16)
,},
headerBarIcon:{
  tintColor:"white",
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},
headerBarProfilePic:{
  width:"100%",
  height:"100%",
  borderColor:"#fff",
  borderRadius:50,
  borderWidth:2,
  resizeMode:"cover",
},
headerProfilePicContainer:{
  width:35,
  height:35,
  overflow:"hidden"
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
},
bottomBarIcon:{
  tintColor:"white",
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},
bottomBarText:{
  color:"white",
  fontSize:scaleFont(18),
},
backHeaderBar:{
  height:26,
  borderBottomWidth:2,
  borderColor:"#656565",
},
backHeaderText:{
  color:"white",
  fontSize:scaleFont(20),
},





/* 

TRAITS & SKILLS/TRAITS 
EXPERIENCE UPLOADER
INDIVIDUAL TRAIT PAGES.

*/
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
  fontSize: scaleFont(30),
  fontWeight: '600',
  // fontFamily: "Phosphate",
  color:"white",
},
sectionFlare:{
  fontSize:scaleFont(12),
  fontWeight:'400',
  color:"white",
},
sectionDescription: {
  marginTop: 8,
  fontSize: scaleFont(16),
  fontWeight: '400',
  flexDirection:"column",
  color:"white",
},
sectionLevelBox:{
  height:"96%",
  width:"20%",
  borderRadius:7,
  alignItems:"center",
  marginRight:0,
  borderColor:"#656565",
  borderWidth:2
},
borderedTextShadow:{
  fontSize:scaleFont(48),
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
  fontSize:scaleFont(18)
},
borderedText:{
  fontSize:scaleFont(45),
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
  fontSize:scaleFont(40),
},
skillsStatsButton:{
  borderRadius:4,
  width:"95%",
  alignItems:"center",
  height:30,
  justifyContent:"center",
  margin:10,
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
  fontSize:scaleFont(30)
},
logContainer:{
  marginTop:20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1c1c1c',
},
textArea: {
  height: 90,
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
  // color:"blue",
},
sectionDescriptionContainer:{
},


/*

TROPHY SHELF & TROPHIES

*/
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

/*

LOGIN AND SIGN UP

*/

logincontainer: {
  // flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundColor: '#1c1c1c',
  height:"100%",
  flexDirection:"column",
},
loginWrapper:{
  width:"80%",
  height:400,
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
  justifyContent:"center",
  height:150,
  

},
logintitle: {
  fontSize: scaleFont(32),
  fontWeight: 'bold',
  marginBottom: 20,
  color:"white",
},
logininputContainer: {
  width: '100%',
  marginBottom: 3,
},
loginlabel: {
  fontSize: scaleFont(16),
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
  paddingHorizontal: 5,
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
  fontSize: scaleFont(18),
},


/**
 
POSTS & FEED

 */
feedFlatList:{
  backgroundColor:"#333",
  flex:1,
  width:"100%",
},
feedPostWrapper:{
  // width:"100%",
  marginVertical:"2.5%",
  borderTopWidth:2,
  borderBottomWidth:2,
  borderColor:"#fff",
  backgroundColor:"#1c1c1c"
},
feedPostText: {
  color:"white"
},
postTopRow:{
  flexDirection:"row",
  justifyContent:'space-between',
  margin:10,
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
  alignItems:'center',
  justifyContent:"center",
  backgroundColor:"transparent"
},
postProfPicImg:{
  width:"100%",
  height:"100%",
  resizeMode: 'cover', // or 'cover'
  borderRadius:50,
},
postTopTitleContainer:{
  flexDirection:"row",
  justifyContent:"space-between",
  width:250,
  alignItems:"flex-end",
  
},
postTopName:{
  color:"white",
  fontSize:scaleFont(24),
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
  fontSize:scaleFont(18),
},
postTopTrophyBox:{

},
postTopTimestamp:{
  color:"gray",
  fontSize:scaleFont(18),
},
postTopExperienceContainer:{
  margin:2.5,
  marginLeft:37.5,
  flexDirection:"row",
  justifyContent:"space-between",
},
postTopExperienceName:{
  color:"white",
  fontSize:scaleFont(18),

},
postTopTraitName:{
  fontSize:scaleFont(18),
},
postTopMapButton:{

},
postContentContainer:{
  width:"95%",
  height:120,
  borderColor:"#333",
  borderTopWidth:2,
  borderRadius:8,
  margin:"2.5%",
  marginBottom:50,
},
postContentLogText:{
  color:"white",
  fontSize:scaleFont(18),
},
postBottomWrapper:{
  flexDirection:"row",
  justifyContent:"space-evenly",
  position:"absolute",
  bottom:0,
  width:"100%",
  backgroundColor:"#1c1c1c",
  borderBottomEndRadius:8,
  borderBottomLeftRadius:8,
  borderTopWidth:1,
  borderColor:"#656565"
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
  fontSize:scaleFont(25),
},
postBottomCommentsContainer:{
  tintColor:"white",
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},


/*
 
PROFILE PAGE

 */
profilePageContainer:{
  backgroundColor:"#1c1c1c",
  // flex:1,
  height:380,
  width:"100%"
},
profilePageCover:{
  height:180,
  // backgroundColor:"darkseagreen",
  borderBottomWidth:4,
  borderColor:"#fff"
},
profilePageCoverPicture:{
  width: "100%",  // desired width
  height: "100%", // desired height
  resizeMode: 'cover', // or 'cover'
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
  width:45,
  height:45,
},
profilePageTrophyPin:{
  tintColor:"white",
  width: 45,  // desired width
  height: 45, // desired height
  resizeMode: 'contain', // or 'cover'
},
profilePageEmptyTrophyButton:{
  width:45,
  height:45,
  alignItems:"center",
  justifyContent:"center",
},
profilePageEmptyTrophyPin:{
  width:20,
  height:20,
  borderRadius:50,
  backgroundColor:"#656565",
  borderColor:"#fff",
  borderWidth:1,
},
profilePagePictureBox:{
  width:100,
  height:100,
},
profilePagePicture:{
  width:"100%",
  height:"100%",
  resizeMode: 'cover', // or 'cover'
  borderRadius:50,
  borderWidth:4,
  borderColor:"#fff",
  marginTop:-50,
},
profilePageMultiBox:{
  width:"30%",
  alignItems:"flex-end",
  justifyContent:"center"
},
profilePageMultiButton:{
  justifyContent:"space-evenly",
  alignItems:"center",
  flexDirection:"row",
  borderWidth:1,
  borderColor:"#fff",
  borderRadius:5,
  padding:5,
  margin:2.5,
  width:130,
  height:30,
  marginRight:5,
},
profilePageButtonIcon:{
  tintColor:"white",
  width: 20,  // desired width
  height: 20, // desired height
  resizeMode: 'contain', // or 'cover'
},
postTopButtonText:{
  color:"white",
  fontSize:scaleFont(14),
},
profilePageNamesContainer:{
  alignItems:"center",
  marginTop:10,
},
profilePageUserName:{
  color:"white",
  fontSize: scaleFont(24),
},
profilePageRealName:{
  color:"white"
},
profilePageStatsContainer:{
  marginTop:15,
  width:"100%",
  alignItems:"center"
},
profilePageStatsTop:{
  width:"97.5%",
  height:30,
  flexDirection:"row",
  justifyContent:"space-between",
},
profilePageJoinDateContainer:{
  width:"40%",
  flexDirection:"row",
  justifyContent:"flex-end",
  alignItems:"center"
},
profilePageStreakContainer:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"center",
  width:"20%"
},
profilePageFriendsContainer:{
  width:"40%",
  flexDirection:"row",
  alignItems:"center"
},
profilePageStatsbottom:{
  width:"100%",
  flexDirection:"row",
  flexWrap:"wrap",
  borderColor:"#fff",
  borderBottomWidth:4,
},
profilePageTraitBox:{
  borderColor:"#fff",
  borderWidth:2,
  borderRadius:2,
  height:30,
  margin:1.5,
  marginBottom:10,
  flex:1,
  alignItems:"center",
  justifyContent:"center"
},
profilePageTraitNumber:{
},
editProfileBox:{
  borderColor:"#fff",
  borderWidth:2,
  borderRadius:10,
  margin:"2.5%",
  alignItems:"center",
},
editProfileRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  borderColor:"#656565",
  borderWidth:2,
  borderRadius:6,
  padding:5,
  margin:2.5,
  width:"97.5%",
},
editProfilePencil:{
  tintColor:"white",
  width: 20,  // desired width
  height: 20, // desired height
  resizeMode: 'contain', // or 'cover'
},
popUpModal:{
  backgroundColor:"#1c1c1c",
  height:"100%"
},
changeCredsWrapper:{
  backgroundColor:"#1c1c1c",
  height:"100%"
},




statsHeaderContainer:{
  flex:1,
  alignItems:"center",
  height:360,
},
statsTitle:{
  color:"white",
  fontSize:scaleFont(30),
},
statsGraphContainer:{
  marginVertical:10,
  height:280,
},
statsLogContainer:{},


logPostContainer:{
  width:"90%",
  borderWidth:2,
  borderColor:"#656565",
  borderRadius:4,
  marginVertical:2.5,
  marginHorizontal:10,
  flexDirection:"row",
  height:30,
  justifyContent:"space-between"
},
logPostTitle:{
  color:"#fff",
  fontSize:scaleFont(20),
},
modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
},
modalContent: {
  backgroundColor: '#1c1c1c',
  height:'80%',
  width:'90%',
  padding: 20,
  borderRadius: 10,
  borderColor:"#fff",
  borderWidth:4,
  justifyContent:"space-between",
},
modalTitle: {
  fontSize: scaleFont(24),
  marginBottom: 10,
  color:"#fff"
},
selectButton: {
  marginBottom: 10,
  width:"95%",
  borderWidth:2,
  borderRadius:10,
  borderColor:"#fff",
  alignItems:"center",
  marginTop:10,
  justifyContent:"center",
  height:40,
},
imageContainer: {
  alignItems: 'center',
},
imagePreview: {
  width: 300,
  height: 300,
  borderRadius: 150,
  overflow: 'hidden',
  marginTop: 10,
  borderColor:"white",
  borderWidth:4,
},
imagePreviewCover:{
  width:300,
  height:150,
  borderColor:"#fff",
  borderWidth:2,

},
previewImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
confirmButton: {
  marginTop: 10,
},
closeButton: {
  marginTop: 10,
},




searchContainer:{
  padding:10,
  width:"95%",
},
searchIcon:{
  width: 35,  // desired width
  height: 35, // desired height
  resizeMode: 'contain', // or 'cover'
},
searchInput:{
  height: 40,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: 'white',
  paddingLeft: 20,
  paddingRight: 20,
  backgroundColor: '#333', // Change this to your preferred input background color
  color: 'white',
},
userTileContainer:{
  width:"100%",
  height:"100%",
},
sectionProfPicContainer:{
  width:50,
  height:50,
  alignItems:"center",
  overflow:"hidden",
  borderRadius:50,
  borderWidth:2,
  borderColor:"#fff",
  marginLeft:10,
},
sectionProfPic:{
  width: 50,  // desired width
  height: 50, // desired height
  resizeMode: 'cover', // or 'cover'
  
},
hamburgerMenu: {
  position: 'absolute',
  width: 250,
  height: '100%',
  backgroundColor: '#1c1c1c',
  top:"5%",
  borderRightWidth:4,
  borderColor:"#fff",
  alignItems:"center",
},
closeSideBar: {
  padding: 15,
  borderBottomWidth: 1,
  borderBottomColor: '#fff',
},
closeText: {
  color: '#fff',
  fontSize: scaleFont(18),
},
menuItemContainer:{
  width:"95%",
  justifyContent:"flex-start",
  flexDirection:"row",
  padding:1,
  paddingHorizontal:3,
  margin:3,
  alignItems:"center",
  borderBottomWidth:1,
  borderColor:"#656565",
  borderRadius:0,
},
menuIcon:{
  width: 30,  // desired width
  height: 30, // desired height
  resizeMode: 'contain', // or 'cover'
},
menuItem: {
  padding: 15,
  color: '#fff',
  fontSize: scaleFont(20),
},
content: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
openButton: {
  padding: 10,
  backgroundColor: '#007bff',
  borderRadius: 5,
},
openText: {
  color: '#fff',
  fontSize: scaleFont(18),
},

peoplePageContainer:{
  backgroundColor:"#1c1c1c",
  height:"100%",
  justifyContent:"flex-start",
  alignItems:"center",
},
choiceTabContainer:{
  width:"95%",
  height:40,
  borderRadius:50,
  alignItems:"center",
  justifyContent:"space-evenly",
  flexDirection:"row",
  borderWidth:2,
  borderColor:"#fff",
  marginTop:10,
  overflow:"hidden",
},
choiceTabTab:{
  width:"50%",
  alignItems:"center",
  height:"100%",
  justifyContent:'center',
  
},
choiceTabLabel:{
  fontSize:scaleFont(20),
},


cameraContainer: {
  flex: 1,
  position:"absolute",
  width:"100%",
  height:"100%"
},
cameraCamera: {
  flex: 1,
},
cameraButtonContainer: {
  flex: 1,
  backgroundColor: 'transparent',
  flexDirection: 'row',
  margin: 20,
  justifyContent: 'space-evenly',
},
cameraButton: {
  alignSelf: 'flex-end',
  alignItems: 'center',
  padding: 10,
  borderRadius:50,
  height:80,
  width:80,
  backgroundColor:"#1c1c1c",
  borderWidth:4,
  borderColor:"#fff",
  justifyContent:"center"
},
cameraTakeButton:{
  borderRadius:50,
  height:100,
  width:100,
  backgroundColor:"#1c1c1c",
  borderWidth:4,
  borderColor:"#fff"
},
cameraIcon:{
  width: 40,  // desired width
  height: 40, // desired height
  resizeMode: 'contain', // or 'cover'
},
cameraText: {
  fontSize: 18,
  color: 'black',
},




});

export default styles