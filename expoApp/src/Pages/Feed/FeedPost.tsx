import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native'
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import styles from '../../styles'
import { useProfilePageUID } from '../../Contexts/ProfilePageUID';
import { NavigationRouteContext, useNavigation, CommonActions } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { scaleFont } from '../../Utilities/fontSizing';

type RootStackParamList = {
	Profile:undefined,
}

const FeedPost = ({data, skillsList}:any):JSX.Element => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	//findPageUserID is a function call that sets a unique, profile-filtered, feed on the profile page.
	const {findPageUserID, }:any = useProfilePageUID()
	//matchingSkillData contains relevant data to the "matched skill". This is to show the proper color, title, flare, etc. Per post.
	const [matchingSkillData,setMatchingSkillData] = useState({title:"",color:"#fff",flare:"",level:0})
	//translatedTimestamp takes my stupid YYYY-MM-DD-HH-MM-SS timestamp and sets it to a 24 hour "time remaining" string val.
	const [translatedTimestamp,setTranslatedTimestamp] = useState("")
	const [profilePicState,setProfilePicState] = useState<any>(null)
	const [isLoading,setIsLoading]=useState(true)
	const [logBoxHeight,setLogBoxHeight] = useState(null)

//This useEffect simply maps over the skillsList, seeking a match.
//Also, it will set the translated timestamp, using the function timeRemainingUntil24Hours
useEffect(()=>{
	skillsList.map((skill:any)=>{
		if (skill.title === data.postSkill){setMatchingSkillData(skill)}
	})
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
function timeRemainingUntil24Hours(timestamp: string): string {
	// Parse the timestamp string into its components
	const [year, month, day, hour, minute, second] = timestamp.split('-').map(Number);
	// Create a Date object from the timestamp
	const pastDate = new Date(year, month - 1, day, hour, minute, second);
	// Get the current date and time
	const currentDate = new Date();
	// Calculate the time difference in milliseconds
	const timeDifference = currentDate.getTime() - pastDate.getTime();
	// Calculate the remaining time in milliseconds
	const remainingTime = (24 * 60 * 60 * 1000) - timeDifference;
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




//PostContentSplitter simplly returns different "bodies" of the post, depending on the post type.
//This needs much more work, and will be updated more-so after I've finalized ExperienceUPloader.
const PostContentSplitter = ():JSX.Element => {
	switch(data.type){
		case "log":return(
		<View style={{...styles.postContentContainer, height:logBoxHeight}}>
			<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
		</View>
		)
		case "api":return(<View></View>)
		case "camera":return(
		<View style={{height:"auto", justifyContent:"space-around"}}>
			<View style={{...styles.postContentContainer, height:scaleFont(350), borderWidth:0,marginBottom:0}}>
				<Image style={{width:"100%", height:scaleFont(350),resizeMode:"cover"}} source={{uri:data.cameraPicURL}} /> 
			</View>
			<View style={{...styles.postContentContainer, height:logBoxHeight}}>
				<Text style={{...styles.postContentLogText}}>{data.textLog}</Text>
			</View>
		</View>
		)
		case "timeline":return(<View></View>)
		default:return(<View><Text>ERROR!!!!</Text></View>)
	}
}

  
	
    return(
        <View style={{...styles.feedPostWrapper}}>
			<View style={{...styles.postTopRow}}>
				<View style={{...styles.postProfileAndNameContainer}}>
					<TouchableOpacity style={{...styles.postProfPic}} onPress={handleProfilePress}>
						{/* ADD IMG TAG WITH HOOK TO USER PROFILE USER ID IMG */}
						{(profilePicState&&!isLoading) && (
							<Image style={styles.postProfPicImg} source={{uri: profilePicState}} />
						)}
					</TouchableOpacity>
					<TouchableOpacity onPress={handleProfilePress}>
						<Text style={{...styles.postTopName}}>{data.posterUserName} </Text>
					</TouchableOpacity>
					
				</View>
				<View style={{...styles.postTopStreakIconContainer}}>
					<Image style={styles.postTopStreakIcon} source={require('../../IconBin/streak.png')} />
					<Text style={{...styles.postTopStreak}}>{data.streak}</Text>
				</View>
				
				<View style={{...styles.postTopTrophyBox}}>
					{/*TROPHY PINS GO HERE */}
				</View>
				<TouchableOpacity style={{...styles.postTopMapButton}}>
					<Image style={styles.postTopMapIcon} source={require('../../IconBin/travel.png')} />
				</TouchableOpacity>
			</View>
			<View style={{...styles.postTopExperienceContainer}}>
				<Text style={{...styles.postTopExperienceName,color:matchingSkillData.color}}>{data.eventTitle}</Text>
				<Text style={{...styles.postTopTimestamp}}>{translatedTimestamp}</Text>
				
			</View>
				<PostContentSplitter />
			
			<View style={{...styles.postBottomWrapper}}>
				<View style={{...styles.postBottomReactionContainer}}>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/reactions.png')} />
						{/* <Text style={styles.postBottomText}></Text> */}
					</TouchableOpacity>
				</View>
				<View style={{...styles.postBottomVoteContainer}}>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/upvote.png')} />
						{/* <Text style={styles.postBottomText}></Text> */}
					</TouchableOpacity>
					<Text style={styles.postBottomScore}>{data.score}</Text>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/downvote.png')} />
						{/* <Text style={styles.postBottomText}></Text> */}
					</TouchableOpacity>
				</View>
				<View style={{...styles.postBottomCommentsContainer}}>
					<TouchableOpacity style={styles.postBottomIconContainer} >
						<Image style={styles.postBottomIcon} source={require('../../IconBin/comments.png')} />
						{/* <Text style={styles.postBottomText}></Text> */}
					</TouchableOpacity>
				</View>
			</View>
        </View>
    )
}

export default FeedPost