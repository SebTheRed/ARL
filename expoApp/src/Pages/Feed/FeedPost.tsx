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
import { scaleFont } from '../../Utilities/fontSizing';
import { useGameRules } from '../../Contexts/GameRules';
import { useUID } from '../../Contexts/UIDContext';
import ScoreCounter from './ScoreCounter';

import FamilySVG from '../../IconBin/SkillIcons/family_1.svg'
import FriendsSVG from '../../IconBin/SkillIcons/friends_1.svg'
import FitnessSVG from '../../IconBin/SkillIcons/fitness_1.svg'
import EarthcraftSVG from '../../IconBin/SkillIcons/earthcraft_1.svg'
import CookingSVG from '../../IconBin/SkillIcons/cooking_1.svg'
import TechnologySVG from '../../IconBin/SkillIcons/technology_1.svg'
import GamesSVG from '../../IconBin/SkillIcons/games_3.svg'
import LanguageSVG from '../../IconBin/SkillIcons/language_2.svg'
import HumanitySVG from '../../IconBin/SkillIcons/humanity_2.svg'

type RootStackParamList = {
	Profile:undefined,
}

const FeedPost = ({data}:any):JSX.Element => {
  const {uid}:any = useUID()
  const { skillsList }:any = useGameRules();
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	//findPageUserID is a function call that sets a unique, profile-filtered, feed on the profile page.
	const {findPageUserID, }:any = useProfilePageUID()
	//matchingSkillData contains relevant data to the "matched skill". This is to show the proper color, title, flare, etc. Per post.
	const [matchingSkillColor,setMatchingSkillColor] = useState("#fff")
	//translatedTimestamp takes my stupid YYYY-MM-DD-HH-MM-SS timestamp and sets it to a 24 hour "time remaining" string val.
	const [translatedTimestamp,setTranslatedTimestamp] = useState("")
	const [profilePicState,setProfilePicState] = useState<any>(null)
	const [isLoading,setIsLoading]=useState(true)
	const [logBoxHeight,setLogBoxHeight] = useState<number|null>(null)
  const [score,setScore] = useState<number>()
  const windowDimensions = Dimensions.get('window')

//This useEffect simply maps over the skillsList, seeking a match.
//Also, it will set the translated timestamp, using the function timeRemainingUntil24Hours
useEffect(()=>{
	setScore(data.score)
	switch(data.postSkill){
    case"Family": setMatchingSkillColor("#ff0000")
    break;
    case"Friends":setMatchingSkillColor("#ff8400")
    break;
    case "Fitness":setMatchingSkillColor("#ffea00")
    break;
    case "Earthcraft":setMatchingSkillColor("#4dff00")
    break;
    case "Cooking":setMatchingSkillColor("#00ff80")
    break;
    case "Technology":setMatchingSkillColor("#00fffb")
    break;
    case "Games":setMatchingSkillColor("#0080ff")
    break;
    case "Language":setMatchingSkillColor("#7700ff")
    break;
    case "Humanity":setMatchingSkillColor("#c800ff")
    break;
  }
	setTranslatedTimestamp(timeRemainingUntil24Hours(data.timeStamp))

	
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
	if (logLength <= 120) {
		setLogBoxHeight(80)
		return;
	}

	const translateURL = async () => {
            setIsLoading(true); // Set loading state to true before fetching
            const storage = getStorage();
            const pathRef = ref(storage, data.picURL);
            const profilePicUrl = await getDownloadURL(pathRef);
			console.log("feed post image promise")
            setProfilePicState(profilePicUrl);
            setIsLoading(false); // Set loading state to false after fetching
        };
        translateURL()
},[])


//Chat GPT is GOAT for writing this for me. Too lazy *yawn* CHAT-GPT already commented this for me <3
const timeRemainingUntil24Hours = (timestamp:any) =>{
  // Convert Firestore Timestamp to JavaScript Date
  const pastDate = timestamp.toDate();

  // Get the current date and time
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate.getTime() - pastDate.getTime();

  // Calculate the remaining time in milliseconds
  const remainingTime = (24 * 60 * 60 * 1000) - timeDifference;

  // If the remaining time is less than or equal to 0, return "00:00"
  if (remainingTime <= 0) return "00:00";

  // Calculate remaining hours and minutes
  const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  // Format the remaining time as HH:MM
  const formattedTime = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;

  return formattedTime;
}
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


const CurrentIcon = ()=> {
  switch(data.postSkill){
    case "Family": return <FamilySVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Friends": return <FriendsSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Fitness": return <FitnessSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Earthcraft": return <EarthcraftSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Cooking": return <CookingSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Technology": return <TechnologySVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Games": return <GamesSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Language": return <LanguageSVG width={scaleFont(30)} height={scaleFont(30)} />
    case "Humanity": return <HumanitySVG width={scaleFont(30)} height={scaleFont(30)} />
    default: return <></>
  }
}



//PostContentSplitter simplly returns different "bodies" of the post, depending on the post type.
//This needs much more work, and will be updated more-so after I've finalized ExperienceUPloader.
const PostContentSplitter = ():JSX.Element => {
	switch(data.type){
		case "log":case"api":return(
		<View style={{...styles.postContentContainer, height:logBoxHeight}}>
			<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
		</View>
		)
		// case "api":return(<View></View>)
		case "camera":return(
		<View style={{height:"auto", justifyContent:"space-around"}}>
			<View style={{height: (windowDimensions.width), borderWidth:0,marginBottom:0}}>
				<Image style={{width: (windowDimensions.width), height: (windowDimensions.width),resizeMode:"cover"}} source={{uri:data.cameraPicURL}} /> 
			</View>
			<View style={{...styles.postContentContainer, height:logBoxHeight}}>
				<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
			</View>
		</View>
		)
		case "timeline":return(
			<View style={{height:"auto", justifyContent:"space-around"}}>
				 <ScrollView
					horizontal={true}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					style={{ height: (windowDimensions.width) }}
				>
					{data.timelinePicURLs.map((item:string, index:number) => (
						<Image 
							key={index}
							style={{ width: (windowDimensions.width), height: (windowDimensions.width), resizeMode: 'cover' }}
							source={{ uri: item }}
						/>
					))}
				</ScrollView>
				{/* <FlatList
					data={data.timelinePicURLs}
					renderItem={({item})=>
						<Image style={{width:"100%",height:scaleFont(350),resizeMode:'cover'}} source={{ uri: item }} />
					}
					horizontal={true}
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					style={{height:scaleFont(350), width:"auto"}}
				/> */}
				{/* <View style={{...styles.postContentContainer, height:scaleFont(350), borderWidth:0,marginBottom:0}}>
					<Image style={{width:"100%", height:scaleFont(350),resizeMode:"cover"}} source={{uri:data.timelinePicURLs[0]}} /> 
				</View> */}
				<View style={{...styles.postContentContainer, marginBottom:0, height:logBoxHeight, borderTopWidth:0, alignItems:"center",}}>
					<Text style={{...styles.postContentLogText, color:"#656565"}}>⟵ Swipe to view Timeline ⟶</Text>
				</View>
				<View style={{...styles.postContentContainer, height:logBoxHeight}}>
					<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
				</View>
			</View>
		)
		default:return(<View><Text>ERROR!!!!</Text></View>)
	}
}


	
    return(
    <View style={{...styles.feedPostWrapper, width: windowDimensions.width,}}>
			<View style={{...styles.postTopRow}}>
				<View style={{...styles.postProfileAndNameContainer}}>
					<TouchableOpacity style={{...styles.postProfPic}} onPress={handleProfilePress}>
						{/* ADD IMG TAG WITH HOOK TO USER PROFILE USER ID IMG */}
						{(profilePicState&&!isLoading) && (
							<Image style={styles.postProfPicImg} source={{uri: profilePicState}} />
						)}
					</TouchableOpacity>
					<TouchableOpacity style={{height:50}} onPress={handleProfilePress}>
						<Text style={{...styles.postTopName}}>{data.posterUserName} </Text>
            {skillsList && (<Text style={{...styles.postTopExperienceName,color:matchingSkillColor}}>{data.eventTitle}</Text>)}
					</TouchableOpacity>
          
					
				</View>
				<View style={{position:"absolute",right:0, top:0}}>
          <Text style={{...styles.postTopTimestamp}}>{translatedTimestamp}</Text>
        </View>
        <View style={{position:"absolute",right:0}}>
          <CurrentIcon />
        </View>
			<View style={{...styles.postTopExperienceContainer}}>
				
			</View>
			</View>
			
				<PostContentSplitter />
			
			<View style={{...styles.postBottomWrapper}}>
        <View style={styles.postBottomBox}>
          <ScoreCounter data={data} />
        </View>
        
				{/* <View style={{...styles.postBottomCommentsContainer}}>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/comments.png')} />
					</TouchableOpacity>
				</View> */}
			</View>
    </View>
    )
}

export default FeedPost