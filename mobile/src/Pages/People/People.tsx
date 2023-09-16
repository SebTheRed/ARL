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
	RefreshControl,
	TextInput,
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import styles from '../../styles'

const People = ():JSX.Element => {

	const handlePress=()=>{

	}

	const SearchBar = () => {
		return (
		  <View style={styles.searchContainer}>
			<TextInput
			  style={styles.searchInput}
			  placeholder="Search For People..."
			  placeholderTextColor="#999"
			/>
		  </View>
		);
	  };


    return(
        <ScrollView style={styles.peoplePageContainer}>
			<SearchBar />
			<View style={styles.eventTileBox}>
				<Text style={styles.skillPageTitle}>Social Features</Text>
				<Text style={styles.skillPageXPText}>Press any of the options below to begin.</Text>
				<TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
						<View style={{...styles.eventTileMain}}>
							<View style={{flexDirection:"row",justifyContent:"space-between"}}>
								<Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Notifications</Text>
							</View>
							<Text style={styles.eventTileText}>View a list of past & present interactions with your posts.</Text>
						</View>
						<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
							<View style={styles.eventButtonWrapper}>
								<Text style={{...styles.eventButtonText, fontSize:15, color: `#fff`, fontWeight:"bold"}}>1</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
						<View style={{...styles.eventTileMain}}>
							<View style={{flexDirection:"row",justifyContent:"space-between"}}>
								<Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Search for People</Text>
							</View>
							<Text style={styles.eventTileText}>Search for users by their real-name, user-name, or email.</Text>
						</View>
						<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
							<View style={styles.eventButtonWrapper}>
								<Text style={{...styles.eventButtonText, fontSize:15, color: `#fff`, fontWeight:"bold"}}>1</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
						<View style={{...styles.eventTileMain}}>
							<View style={{flexDirection:"row",justifyContent:"space-between"}}>
								<Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Trophy Grading</Text>
							</View>
							<Text style={styles.eventTileText}>Be the judge on the legitimacy of your friends' trophies.</Text>
						</View>
						<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
							<View style={styles.eventButtonWrapper}>
								<Text style={{...styles.eventButtonText, fontSize:15, color: `#fff`, fontWeight:"bold"}}>3</Text>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={handlePress} style={styles.eventTileWrapper}>
						<View style={{...styles.eventTileMain}}>
							<View style={{flexDirection:"row",justifyContent:"space-between"}}>
								<Text style={{...styles.eventTileText,fontSize:24,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Friend Requests</Text>
							</View>
							<Text style={styles.eventTileText}>View all people requesting to be your friend.</Text>
						</View>
						<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
							<View style={styles.eventButtonWrapper}>
								<Text style={{...styles.eventButtonText, fontSize:15, color: `#fff`, fontWeight:"bold"}}>2</Text>
							</View>
						</View>
					</TouchableOpacity>
			</View>
		</ScrollView>
    )
}

export default People