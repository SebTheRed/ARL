import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
  Dimensions,
} from 'react-native'
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { useGameRules } from '../../Contexts/GameRules';
import { useUID } from '../../Contexts/UIDContext';
import { useFeed } from '../../Contexts/FeedContext';
import ScoreCounter from './ScoreCounter';
import ReportOverlay from '../../Overlays/ReportOverlay';
import ConfirmModal from '../../Overlays/ConfirmModal';
import LoadingOverlay from '../../Overlays/LoadingOverlay';
import CompleteOverlay from '../../Overlays/CompleteOverlay';
import ErrorModal from '../../Overlays/ErrorModal';

import ReportSVG from '../../IconBin/svg/report.svg'
import TrashSVG from '../../IconBin/svg/trash.svg'

import ICONS from '../Trophies/TrophyIcons'


type RootStackParamList = {
	Profile:undefined,
}

const TrophyPost = ({data,voteLock}:any):JSX.Element => {
  const {uid}:any = useUID()
  const {refreshFeed}:any = useFeed()
  const { gameRules }:any = useGameRules();
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	//findPageUserID is a function call that sets a unique, profile-filtered, feed on the profile page.
	const {findPageUserID, }:any = useProfilePageUID()
	//matchingSkillData contains relevant data to the "matched skill". This is to show the proper color, title, flare, etc. Per post.
	const [matchingSkillColor,setMatchingSkillColor] = useState("#fff")
	//translatedTimestamp takes my stupid YYYY-MM-DD-HH-MM-SS timestamp and sets it to a 24 hour "time remaining" string val.
	const [translatedTimestamp,setTranslatedTimestamp] = useState("")
	const [profilePicState,setProfilePicState] = useState<any>(null)

	const [logBoxHeight,setLogBoxHeight] = useState<number|null>(null)
  const [score,setScore] = useState<number>()
  const [reportModalVis,setReportModalVis] = useState<boolean>(false)
  const [trashVis,setTrashVis] = useState<boolean>(false)
  const [isTrashing,setIsTrashing]=useState<boolean>(false)
  const [completeBool,setCompleteBool]=useState<boolean>(false)
  const [errorBool,setErrorBool]=useState<boolean>(false)
  const [Icon,setIcon] = useState<any>(null)


  const windowDimensions = Dimensions.get('window')

//This useEffect simply maps over the skillsList, seeking a match.
//Also, it will set the translated timestamp, using the function timeRemainingUntil24Hours
useEffect(()=>{
	setScore(data.score)
	switch(data.postSkill){
    case"family": setMatchingSkillColor("#ff0000")
    break;
    case"friends":setMatchingSkillColor("#ff8400")
    break;
    case "fitness":setMatchingSkillColor("#ffea00")
    break;
    case "earthcraft":setMatchingSkillColor("#4dff00")
    break;
    case "cooking":setMatchingSkillColor("#00ff80")
    break;
    case "technology":setMatchingSkillColor("#00fffb")
    break;
    case "games":setMatchingSkillColor("#0080ff")
    break;
    case "language":setMatchingSkillColor("#7700ff")
    break;
    case "humanity":setMatchingSkillColor("#c800ff")
    break;
  }

	
	const logLength = data.textLog;
	if (logLength < 30) {
		setLogBoxHeight(20)
		return;
	}
	if (logLength < 60) {
		setLogBoxHeight(40)
		return;
	}
	if (logLength < 90) {
		setLogBoxHeight(60)
		return;
	}
	if (logLength < 120) {
		setLogBoxHeight(80)
		return;
	}
  if (logLength < 150) {
		setLogBoxHeight(100)
		return;
	}
  if (logLength < 180) {
		setLogBoxHeight(120)
		return;
	}
  if (logLength < 210) {
		setLogBoxHeight(140)
		return;
	}
  if (logLength < 270) {
		setLogBoxHeight(160)
		return;
	}
  if (logLength < 330) {
		setLogBoxHeight(180)
		return;
	}
  if (logLength <= 360) {
		setLogBoxHeight(200)
		return;
	}

	const translateURL = async () => {
    const storage = getStorage();
    const pathRef = ref(storage, data.picURL);
    const profilePicUrl = await getDownloadURL(pathRef);
    console.log("feed post image promise")
    setProfilePicState(profilePicUrl);
  };
  const loadSVG = async()=>{
    setIcon(()=>ICONS[data.svgPath])
  }
  loadSVG()
  translateURL()
},[])

//handleProfilePress does two things:
// fist, it runs the function findPageUseriD which is explained above.
//second, it navigates to the profile page, which uses the matched user's data.
//reading on, you'll notice that the Profile page is a single .tsx file, which reduces the need for any kind of seperate profile page.
const handleProfilePress = () => {
	findPageUserID(data.posterUID)
	navigation.dispatch(
		CommonActions.reset({
		  index: 0,
		  routes: [
			{
			  name: 'AuthedApp', // The name of the root (after login root)
			  state: {
				routes: [
				  {
					name: 'ProfileStack', // The name of the page we're navigating to.
				  },
				],
			  },
			},
		  ],
		})
	  );
	}

const deleteOwnPost = async() => {
  console.log(uid, data.posterUID)
  setIsTrashing(true)
  
  try {
    const deletionObj = {
      uid:uid,
      postUID:data.posterUID,
      postID:data.id,
      pictureList: data.pictureList,
    }
    const response = await fetch('https://us-central1-appreallife-ea3d9.cloudfunctions.net/userDeleteOwnTrophyPost', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(deletionObj)
    });
    if (!response.ok) {
      console.error("Post deletion failed!")
      setIsTrashing(false)
      setErrorBool(true)
    } else if (response.ok) {
      setIsTrashing(false)
      setCompleteBool(true)
    }
  } catch(err) {
    console.error(err)
    setIsTrashing(false)
    setErrorBool(true)

  }
  
}
const deletionComplete = () => {
  refreshFeed()
}


const TrashCan = ():JSX.Element => {
  if (uid === data.posterUID) {return(
    <TouchableOpacity onPress={()=>setTrashVis(true)} style={{position:"absolute",bottom:0,right:10}}>
      <TrashSVG width={30} height={30} />
    </TouchableOpacity>
  )} else{
    return(<></>)
  }
}

//PostContentSplitter simplly returns different "bodies" of the post, depending on the post type.
//This needs much more work, and will be updated more-so after I've finalized ExperienceUPloader.


	
    return(
    <View style={{...styles.feedPostWrapper, width: windowDimensions.width,}}>
			<View style={{...styles.postTopRow}}>
				<View style={{...styles.postProfileAndNameContainer}}>
					<TouchableOpacity style={{...styles.postProfPic}} onPress={handleProfilePress}>
						{/* ADD IMG TAG WITH HOOK TO USER PROFILE USER ID IMG */}
						{(profilePicState) && (
							<Image style={styles.postProfPicImg} source={{uri: profilePicState}} />
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={handleProfilePress} style={{width:"88%"}}>
						<Text style={{...styles.postTopName}}>{data.posterUserName} </Text>
            {gameRules.skillsList && (<Text style={{...styles.postTopExperienceName,color:matchingSkillColor}}>{data.trophyTitle} <Text style={{color:"#656565"}}> {data.tier}</Text></Text>)}
            <Text style={{color:"#ababab", paddingRight:50}}>{data.desc}</Text>
					</TouchableOpacity>
          
					
				</View>
        <View style={{position:"absolute",right:-15, top:0}}>

          {Icon && <Icon width={50} height={50} fill={"#fff"} />}

        </View>
			<View style={{...styles.postTopExperienceContainer}}>
				
			</View>
			</View>
			
      
      <View style={{height:"auto", justifyContent:"space-around"}}>
				 <ScrollView
					horizontal={true}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					style={{ height: (windowDimensions.width) }}
				>
					{data.pictureList.map((item:string, index:number) => (
						<Image 
							key={index}
							style={{ width: (windowDimensions.width), height: (windowDimensions.width), resizeMode: 'cover' }}
							source={{ uri: item }}
						/>
					))}
				</ScrollView>

				<View style={{...styles.postContentContainer, marginBottom:0, height:logBoxHeight, borderTopWidth:0, alignItems:"center",}}>
					<Text style={{...styles.postContentLogText, color:"#656565"}}>⟵ Swipe to view Trophy pics ⟶</Text>
				</View>
				<View style={{...styles.postContentContainer, height:logBoxHeight}}>
					<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
				</View>
			</View>
			


			<View style={{...styles.postBottomWrapper}}>
          <TouchableOpacity onPress={()=>setReportModalVis(true)} style={{position:"absolute",bottom:0,left:10}}>
            <ReportSVG width={30} height={30} />
          </TouchableOpacity>
          <TrashCan />
        <View style={styles.postBottomBox}>
          
          
          <ScoreCounter voteLock={voteLock} data={data} />
        </View>
        
				{/* <View style={{...styles.postBottomCommentsContainer}}>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/comments.png')} />
					</TouchableOpacity>
				</View> */}
			</View>
      <ReportOverlay type={"post"} relevantData={data} visibleBool={reportModalVis} text={`Report ${data.posterUserName}'s Post`} setVisibleBool={setReportModalVis} opacity={0.8} />
      <ConfirmModal setIsVisible={setTrashVis} isVisible={trashVis} text={"You are about to delete your post. Are you certain you want to do this?"} opacity={0.9} action={deleteOwnPost} />
      <LoadingOverlay isVisible={isTrashing} text={"Deleting your post from ARL.."} opacity={0.9} />
      <CompleteOverlay setUnderVisible={deletionComplete} isVisible={completeBool} text={"Your post has been successfully removed from ARL."} opacity={0.90} setIsVisible={setCompleteBool} />
      <ErrorModal setIsVisible={setErrorBool} isVisible={errorBool} text={"Post deletion failed! Please try again."} opacity={0.9}/>
    </View>
    )
}

export default TrophyPost