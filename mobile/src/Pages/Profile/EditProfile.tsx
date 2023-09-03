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
	Switch,
} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useFeed } from '../../Contexts/FeedContext';
import {useUserData} from '../../Contexts/UserDataContext'
import styles from '../../styles'

const EditProfile = ():JSX.Element => {
	const {userData}:any = useUserData()

	const ProfileHeader = ():JSX.Element => {

		const [option1,setOption1] = useState(false)
		const [option2,setOption2] = useState(true)
		const [option3,setOption3] = useState(true)
		// const [option4,setOption4] = useState(false)
		// const [option5,setOption5] = useState(false)
		// const [option6,setOption6] = useState(false)
		// const [option7,setOption7] = useState(false)
		// const [option8,setOption8] = useState(false)
		// const [option9,setOption9] = useState(false)



		
        return(
    <ScrollView style={{...styles.profilePageContainer, height:"100%"}}>
        <View style={styles.profilePageCover}>
		<View
			style={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'black',
			opacity: 0.5,
			height:146,
			width:"100%",
			}}
		/>
		<TouchableOpacity style={{
			position: 'absolute',
			top: 0,
			left: 150,
			right: 0,
			bottom: 0,
			width:100,
			height:100,
			alignItems:"center",
			justifyContent:"center"
		}}>
			<Image style={{...styles.bottomBarIcon,}} source={require('../../IconBin/camera_add.png')} 
			/>
		</TouchableOpacity>
		
		</View>
        
        <View style={styles.profilePageTopContainer}>
            <View style={styles.profilePageTopLeftContainer}>
                    
            </View>
            
            <View style={{...styles.profilePagePictureBox, position:"relative"}}>
                <Image style={{...styles.profilePagePicture}} source={require('./mochi.png')} />
				<View
					style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: 'black',
					opacity: 0.5,
					marginTop:-50,
					height:100,
					width:100,
					borderRadius:50,
					borderWidth:4,
					borderColor:"white",
					}}
				/>
				<TouchableOpacity style={{
					position: 'absolute',
					top: -25,
					left: 25,
					right: 0,
					bottom: 0,
					width:50,
					height:50,
					alignItems:"center",
					justifyContent:"center"
				}}>
					<Image style={{...styles.bottomBarIcon,}} source={require('../../IconBin/camera_add.png')} 
					/>
				</TouchableOpacity>
            </View>
            <View style={styles.profilePageMultiBox}>
                {/* <MultiButtonSplitter /> */}
				{/* GO BACK BUTTON PROBABLY */}
            </View>
        </View>
		<View style={styles.profilePageNamesContainer}>
            <Text style={styles.profilePageUserName}>@{userData.userName}</Text>
        </View>
		<View style={styles.editProfileBox}>
				<Text style={{...styles.profilePageRealName, fontSize:24}}>Edit Personal Information</Text>
				<TouchableOpacity style={styles.editProfileRow}>
					<Text style={{...styles.profilePageRealName, fontSize:20,}}><Image style={{...styles.editProfilePencil,}} source={require('../../IconBin/edit.png')}/> Name:</Text>
					<Text style={{...styles.profilePageRealName, fontSize:20,}}>{userData.name}</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.editProfileRow}>
					
					<Text style={{...styles.profilePageRealName, fontSize:20,}}><Image style={{...styles.editProfilePencil,}} source={require('../../IconBin/edit.png')}/> Phone #:</Text>
					<Text style={{...styles.profilePageRealName, fontSize:20,}}>{userData.phoneNumber}</Text>
				</TouchableOpacity>
		</View>
		<View style={styles.editProfileBox}>
			

			<View style={{...styles.eventTileWrapper,borderColor:`${option1?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Access & Data</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Switch off to disable geo-tracking for all of your posts.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => setOption1((prev) => !prev)}
						value={option1}
					/>
					</View>
				</View>
			</View>
			<View style={{...styles.eventTileWrapper,borderColor:`${option2?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Dark Mode</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Switch on to make the app's styling change to dark mode.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => setOption2((prev) => !prev)}
						value={option2}
					/>
					</View>
				</View>
			</View>
			<View style={{...styles.eventTileWrapper,borderColor:`${option3?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Notifications</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Switch off to disable all App Real Life notifications.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => setOption3((prev) => !prev)}
						value={option3}
					/>
					</View>
				</View>
			</View>
			<TouchableOpacity style={{...styles.eventTileWrapper,borderColor:`#656565`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Change Email</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Click here to change your email.</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={{...styles.eventTileWrapper,borderColor:`#656565`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Change Password</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Click here to change your password.</Text>
				</View>
			</TouchableOpacity>

		</View>
    </ScrollView>
        )
    }






	return(
		<View>
			<ProfileHeader />
		</View>
	)
}

export default EditProfile