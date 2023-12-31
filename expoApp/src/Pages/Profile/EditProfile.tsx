import {
	ScrollView,
	Text,
	View,
	Image,
	TouchableOpacity,
	Switch,
	TextInput,
	Keyboard
} from 'react-native'
import {getStorage,ref, getDownloadURL} from 'firebase/storage';
import React from 'react'
import { useEffect, useState } from 'react';
import {useUserData} from '../../Contexts/UserDataContext'
import { useUID } from '../../Contexts/UIDContext';
import { useNavigation, CommonActions } from '@react-navigation/native';
import styles from '../../styles'
import {db, } from '../../Firebase/firebase'
import {updateDoc,doc} from 'firebase/firestore'
import ProfilePicModal from './ProfPicModal';
import {scaleFont} from '../../Utilities/fontSizing'
import CameraAddSVG from '../../IconBin/svg/camera_add.svg'
import EditSVG from '../../IconBin/svg/edit.svg'

const EditProfile = ():JSX.Element => {
	const navigation = useNavigation<any>();
	const {userData}:any = useUserData()
	const {uid}:any = useUID()
	const [modalVisibility,setModalVisibility] = useState(false)
	const [modalType,setModalType] = useState(String)
	const [isEditing, setIsEditing] = useState<string | null>(null);
	const [name, setName] = useState(userData.name);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
	const [profilePicState,setProfilePicState] = useState<any>(null)
	const [coverPicState,setCoverPicState] = useState<any>(null)
	const [isLoading,setIsLoading] = useState(true)
	const [option1,setOption1] = useState<boolean>(true)
	const [option2,setOption2] = useState<boolean>(true)
	const [option3,setOption3] = useState<boolean>(true)
	const [option4,setOption4] = useState<boolean>(true)
	const [option5,setOption5] = useState<boolean>(true)
	// const [option6,setOption6] = useState(false)
	// const [option7,setOption7] = useState(false)
	// const [option8,setOption8] = useState(false)
	// const [option9,setOption9] = useState(false)
	useEffect(()=>{
		const translateURL = async () => {
            setIsLoading(true); // Set loading state to true before fetching
            const storage = getStorage();
            const pathRef = ref(storage, userData.picURL);
            const coverPathRef = ref(storage, userData.coverURL);
        
            const profilePicUrl = await getDownloadURL(pathRef);
            const coverPicUrl = await getDownloadURL(coverPathRef);
        
            setProfilePicState(profilePicUrl);
            setCoverPicState(coverPicUrl);
            setIsLoading(false); // Set loading state to false after fetching
        };
        translateURL()
	},[])
	useEffect(()=>{
		setOption1(userData.settings.geoLocation)
		setOption2(userData.settings.darkMode)
		setOption3(userData.settings.notifications)
		setOption4(userData.settings.privateSkills)
		setOption5(userData.settings.privateProfile)
		console.log(userData.settings.geoLocation)
		console.log(userData.settings.darkMode)
		console.log(userData.settings.notifications)
	},[])
	
	useEffect(()=>{
		const userDocRef = doc(db, "users", uid);
		// if (option1&&option2&&option3&&option4&&option5) {
			const changeToggle = async()=>{
				try {
					await updateDoc(userDocRef, {
					settings:{darkMode: option2, notifications: option3, geoLocation: option1, privateSkills:option4,privateProfile:option5}, // Update the 'name' field in Firestore
					});
					console.log("Settings toggled successfully");
				} catch (error) {
					console.error("Error updating settings: ", error);
				}
			}
			changeToggle()
		// }
	},[option1,option2,option3,option4,option5]);

	const handleReturnPress = () => {
		// navigation.navigate("Profile")
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'AuthedApp', 
            state: {
              routes: [
                {
                  name: 'ProfileStack', 
                },
              ],
            },
          },
        ],
      })
    );
	};
	const handleSwitch = async(switchVal:string) => {
		// const userDocRef = doc(db, "users", uid);
		// try {
		// 	await updateDoc(userDocRef, {
		// 	settings:{darkMode: option2, notifications: option3, geoLocation: option1, privateSkills:option4,privateProfile:option5}, // Update the 'name' field in Firestore
		// 	});
		// 	console.log("Settings toggled successfully");
		// } catch (error) {
		// 	console.error("Error updating settings: ", error);
		// }
	};
	const handleTextInputBlur = async (label: string) => {
		setIsEditing(null);
		const userDocRef = doc(db, "users", uid); // Replace 'db' and 'uid' with your actual Firestore database instance and user ID
	  
		switch (label) {
		  case "Name":
			if (userData.name === name) return;
			try {
			  await updateDoc(userDocRef, {
				name: name, // Update the 'name' field in Firestore
			  });
			  console.log("Name updated successfully");
			} catch (error) {
			  console.error("Error updating name: ", error);
			}
			break;
	  
		  case "Phone Number":
			if (userData.phoneNumber === phoneNumber) return;
			try {
			  await updateDoc(userDocRef, {
				phoneNumber: phoneNumber, // Update the 'phoneNumber' field in Firestore
			  });
			  console.log("Phone Number updated successfully");
			} catch (error) {
			  console.error("Error updating phone number: ", error);
			}
			break;
	  
		  default:
			console.log("Unknown label");
			break;
		}
	};
	const handleChangeCredentialsPress = ()=>{
		navigation.navigate("UserPassPopup")
	};
	const handleProfPicPress = () => {
		setModalType("profilePic")
	}
	const handleCoverPhotoChange = () => {
		setModalType("coverPic")
	}
	const renderField = (label: string, value: string, setValue: any) => (
		<TouchableOpacity
			style={{...styles.editProfileRow,}}
			onPress={() => setIsEditing(label)}
		>
			<Text style={{ ...styles.profilePageRealName, fontSize: scaleFont(18) }}>
			<EditSVG width={scaleFont(25)} height={scaleFont(25)} />
			{label}:
			</Text>
			{isEditing === label ? (
			<TextInput
				value={value}
				onChangeText={setValue}
				onBlur={()=>handleTextInputBlur(label)}
				autoFocus
				style={{color:"white", fontSize:scaleFont(16)}}
				returnKeyType="done"
				blurOnSubmit={true}
				onSubmitEditing={()=>Keyboard.dismiss()}
			/>
			) : (
			<Text style={{ ...styles.profilePageRealName, fontSize: scaleFont(16)}}>
				{value}
			</Text>
			)}
		</TouchableOpacity>
	);


		
return(
	<>
    <ScrollView style={{...styles.profilePageContainer, height:"100%"}}>
        <View style={styles.profilePageCover}>
		{(coverPicState&&!isLoading)&&(<Image style={styles.profilePageCoverPicture} source={{uri:coverPicState}} />)}
		<View
			style={{
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			backgroundColor: 'black',
			opacity: 0.5,
			height:176,
			width:"100%",
			}}
		/>
		<TouchableOpacity
		onPress={handleCoverPhotoChange}
		style={{
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
			<CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
		</TouchableOpacity>
		
		</View>
        
        <View style={styles.profilePageTopContainer}>
            <View style={styles.profilePageTopLeftContainer}>
                    
            </View>
            
            <View style={{...styles.profilePagePictureBox, position:"relative"}}>
				{(profilePicState&&!isLoading)&&(<Image style={styles.profilePagePicture} source={{uri: profilePicState}} />)}
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
				}}
				onPress={handleProfPicPress}
				>
					<CameraAddSVG width={scaleFont(45)} height={scaleFont(45)} />
				</TouchableOpacity>
            </View>
            <View style={styles.profilePageMultiBox}>
				<TouchableOpacity onPress={handleReturnPress} style={styles.profilePageMultiButton}>
					<Text style={styles.postTopButtonText}>⇦ Back to Profile</Text>
				</ TouchableOpacity>
            </View>
        </View>
		<View style={styles.profilePageNamesContainer}>
            <Text style={styles.profilePageUserName}>@{userData.userName}</Text>
        </View>
		<View style={styles.editProfileBox}>
				<Text style={{...styles.profilePageRealName, fontSize:scaleFont(24)}}>Edit Personal Information</Text>
				{renderField('Name', name, setName)}
          		{renderField('Phone Number', phoneNumber, setPhoneNumber)}
		</View>
		<View style={styles.editProfileBox}>
			

			
			<View style={{...styles.eventTileWrapper,borderColor:`${option2?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Dark Mode</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch on to make the app's styling change to dark mode.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => {
							setOption2((prev) => !prev)
							handleSwitch("option2")
						}}
						value={option2}
					/>
					</View>
				</View>
			</View>
			<View style={{...styles.eventTileWrapper,borderColor:`${option3?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Notifications</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch off to disable all App Real Life notifications.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => {
							setOption3((prev) => !prev)
							handleSwitch("option3")
						}}
						value={option3}
					/>
					</View>
				</View>
			</View>
			{/* <View style={{...styles.eventTileWrapper,borderColor:`${option1?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Access & Data</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Switch off to disable geo-tracking for all of your posts.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => {
							setOption1((prev) => !prev)
							handleSwitch("option1")
						}}
						value={option1}
					/>
					</View>
				</View>
			</View> */}
			{/* <View style={{...styles.eventTileWrapper,borderColor:`${option4?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Global Skill Set</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Keep on to show off your Levels to anyone who views your profile.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => {
							setOption4((prev) => !prev)
							handleSwitch("option4")
						}}
						value={option4}
					/>
					</View>
				</View>
			</View> */}
			<View style={{...styles.eventTileWrapper,borderColor:`${option5?"#1cb012":"#656565"}`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:scaleFont(20),textDecorationColor:"#656565",textDecorationLine:"underline"}}>Public Facing Profile</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:scaleFont(16),}}>Keep on to enable users to search and view your profile.</Text>
				</View>
				<View style={{...styles.sectionLevelBox, backgroundColor:"transparent", height:80, borderColor:"transparent"}}>
					<View style={styles.eventButtonWrapper}>
					<Switch
						ios_backgroundColor="#3e3e3e"
						onValueChange={(newVal) => {
							setOption5((prev) => !prev)
							handleSwitch("option5")
						}}
						value={option5}
					/>
					</View>
				</View>
			</View>
			<TouchableOpacity onPress={handleChangeCredentialsPress} style={{...styles.eventTileWrapper,borderColor:`#ff4000`}}>
				<View style={{...styles.eventTileMain}}>
					<View style={{flexDirection:"row",justifyContent:"space-between"}}>
						<Text style={{...styles.eventTileText,fontSize:20,textDecorationColor:"#656565",textDecorationLine:"underline"}}>Change Account Credentials</Text>
					</View>
					<Text style={{...styles.eventTileText, fontSize:16,}}>Click here to change your email or password.</Text>
				</View>
			</TouchableOpacity>

		</View>
    </ScrollView>
	{modalType!="" && (
		<ProfilePicModal updateProfPic={setProfilePicState} updateCoverPic={setCoverPicState} setModalType={setModalType} modalType={modalType} />
	)}
	</>
	)
}

export default EditProfile