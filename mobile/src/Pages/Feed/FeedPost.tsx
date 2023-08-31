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
import React, { useEffect, useState } from 'react';
import styles from '../../styles'


const FeedPost = ({data, skillsList}:any):JSX.Element => {
	const [matchingSkillData,setMatchingSkillData] = useState({title:"",color:"",flare:"",level:0})
	const [translatedTimestamp,setTranslatedTimestamp] = useState("")

useEffect(()=>{
	skillsList.map((skill:any)=>{
		if (skill.title === data.postSkill){setMatchingSkillData(skill)}
	})
	setTranslatedTimestamp(timeRemainingUntil24Hours(data.timeStamp))
	
},[])

function timeRemainingUntil24Hours(timestamp:any) {
	// Parse the timestamp string into its components
	const [year, month, day, hour, minute, second] = timestamp.split('-').map(Number);
	// Create a Date object from the timestamp
	const pastDate = new Date(year, month - 1, day, hour, minute, second);
	// Get the current date and time
	const currentDate = new Date();
	// Calculate the time difference in milliseconds
	const timeDifference = currentDate - pastDate;
	// Calculate the remaining time in milliseconds
	const remainingTime = (24 * 60 * 60 * 1000) - timeDifference;
	// Calculate remaining hours and minutes
	const remainingHours = Math.floor(remainingTime / (1000 * 60 * 60));
	const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
	// Format the remaining time as HH:MM
	const formattedTime = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
	return formattedTime;
  }
	
    return(
        <View style={{...styles.feedPostWrapper}}>
			<View style={{...styles.postTopRow}}>
				<View style={{...styles.postTopTitleContainer}}>
					<View style={{...styles.postProfPic}}>
						{/* ADD IMG TAG WITH HOOK TO USER PROFILE USER ID IMG */}
					</View>
					<Text style={{...styles.postTopName}}>SebTheRed </Text>
					<View style={{...styles.postTopStreakIconContainer}}>
						<Image style={styles.postTopStreakIcon} source={require('../../IconBin/streak.png')} />
						<Text style={{...styles.postTopStreak}}>69</Text>
					</View>
					
					<View style={{...styles.postTopTrophyBox}}>
						{/*TROPHY PINS GO HERE */}
					</View>
				</View>
				<Text style={{...styles.postTopTimestamp}}>{translatedTimestamp}</Text>
			</View>
			<View style={{...styles.postTopExperienceContainer}}>
				<Text style={{...styles.postTopExperienceName}}>{data.eventTitle}</Text>
				<Text style={{...styles.postTopTraitName, color:matchingSkillData.color}}>{data.postSkill}</Text>
				<TouchableOpacity style={{...styles.postTopMapButton}}>
					{/* Map Icon here with button onPress */}
				</TouchableOpacity>
			</View>
			{/* PHOTOS GO HERE */}
			<View style={{...styles.postContentContainer}}>
				<Text>Placeholder for now</Text>
			</View>
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
					<Text style={styles.postBottomScore}>3</Text>
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