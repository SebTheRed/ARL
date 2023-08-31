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

const FeedPost = ({data}:any):JSX.Element => {
    return(
        <View style={{...styles.feedPostWrapper}}>
			<View style={{...styles.postTopRow}}>
				<View style={{...styles.postProfPic}}>
					{/* ADD IMG TAG WITH HOOK TO USER PROFILE USER ID IMG */}
				</View>
				<View style={{...styles.postTopTitleContainer}}>
					<Text style={{...styles.postTopName}}>SebTheRed</Text>
					<Text style={{...styles.postTopStreak}}>Streak Count</Text>
					<View style={{...styles.postTopTrophyBox}}>
						{/*TROPHY PINS GO HERE */}
					</View>
				</View>
				<Text style={{...styles.postTopTimestamp}}>Timestamp</Text>
			</View>
			<View style={{...styles.postTopExperienceContainer}}>
				<Text style={{...styles.postTopExperienceName}}></Text>
				<Text style={{...styles.postTopTraitName}}></Text>
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