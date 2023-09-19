import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
	TextInput,
    Modal,
    Switch,
    Image,
  } from 'react-native';
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
  import {getStorage,ref, getDownloadURL, uploadBytes} from 'firebase/storage';
  import {useState,useEffect} from 'react'
  import { useUserData } from '../../Contexts/UserDataContext';
  import {updateDoc,doc} from 'firebase/firestore'
  import { useUID } from '../../Contexts/UIDContext';
  import {db, auth,} from '../../Firebase/firebase'
  import styles from '../../styles';
  import {scaleFont} from '../../Utilities/fontSizing'
const ProfilePicModal = ({modalType,setModalType}:any):JSX.Element => {
        const {userData}:any = useUserData()
        const {uid}:any = useUID()
        const [imageSource, setImageSource] = useState<any>(null);
        const [selectedImage,setSelectedImage] = useState(null)
        const [profilePicState,setProfilePicState] = useState(String)
        const [coverPhotoState,setCoverPhotoState] = useState(String)
        useEffect(()=>{
            const translateURL = async () => {
                const storage = getStorage()
                const pathRef = ref(storage, userData.picURL)
                const coverPathRef = ref(storage,userData.coverURL)
                getDownloadURL(pathRef)
                .then((url:any)=>{setProfilePicState(url)})
                getDownloadURL(coverPathRef)
                .then((url:any)=>{setCoverPhotoState(url)})
                
            };
            translateURL()
        },[])
      
        const selectImage = async() => {
          const options = {
            mediaType:'photo' as "photo",
            includeBase64:false,
            maxHeight:7000,
            maxWidth:7000,
            }
            launchImageLibrary(options,(response:any)=>{
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('Image picker error: ', response.error);
                  } else {
                    let imageUri = response.uri || response.assets?.[0]?.uri;
                    console.log(imageUri)
                    setImageSource(imageUri);
                  }
            })


        };
      
        const confirmImage = async() => {
            console.log('1')
            const responseBlob = await fetch(imageSource);
            const blob = await responseBlob.blob();
            console.log('2')
            // Upload to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `user_prof_pics/${uid}/profile_actual`);
            console.log('3')
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                const gsLink = `gs://${snapshot.ref.bucket}/${snapshot.ref.fullPath}`;
                console.log("Internal Firebase link: ", gsLink);
                const userDocRef = doc(db, "users", uid);
                updateDoc(userDocRef, {
                    picURL: gsLink, // Update the 'name' field in Firestore
                });
                console.log("Pic Link updated successfully");
                setModalType("")
                setImageSource("")
                setProfilePicState("")
            }).catch((error) => {
                console.log('Upload failed: ', error);
                setImageSource("")
                setProfilePicState("")
            });
        }
        const confirmCoverImage = async() => {
            console.log('1')
            const responseBlob = await fetch(imageSource);
            const blob = await responseBlob.blob();
            console.log('2')
            // Upload to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `user_prof_pics/${uid}/cover_actual`);
            console.log('3')
            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                const gsLink = `gs://${snapshot.ref.bucket}/${snapshot.ref.fullPath}`;
                console.log("Internal Firebase link: ", gsLink);
                const userDocRef = doc(db, "users", uid);
                updateDoc(userDocRef, {
                    coverURL: gsLink, // Update the 'name' field in Firestore
                });
                console.log("Pic Link updated successfully");
                setModalType("")
                setImageSource("")
                setProfilePicState("")
            }).catch((error) => {
                console.log('Upload failed: ', error);
                setImageSource("")
                setProfilePicState("")
            });
        }

        const onClose = () => {
            setModalType("")
            setImageSource("")
                setProfilePicState("")
        }

    return(
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{...styles.modalTitle, fontSize:scaleFont(30),}}>Change Profile Picture</Text>
                <TouchableOpacity onPress={selectImage} style={{...styles.selectButton, backgroundColor:"#007bff"}}>
                    <Text style={styles.modalTitle}>Select New Image</Text>
                </TouchableOpacity>
                {imageSource && (
                <View style={styles.imageContainer}>
                    {modalType=="profilePic"&&(
                        <>
                            <View style={styles.imagePreview}>
                                <Image
                                    source={{ uri: imageSource }}
                                    style={styles.previewImage}
                                />
                            </View>
                            <TouchableOpacity onPress={confirmImage} style={{...styles.selectButton, backgroundColor:"#00e800"}}>
                                <Text style={styles.modalTitle}>Confirm</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {modalType=="coverPic"&&(
                        <>
                            <View style={styles.imagePreviewCover}>
                                <Image
                                    source={{ uri: imageSource }}
                                    style={styles.previewImage}
                                />
                            </View>
                            <TouchableOpacity onPress={confirmCoverImage} style={{...styles.selectButton, backgroundColor:"#00e800"}}>
                                <Text style={styles.modalTitle}>Confirm</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    
                </View>
                )}
                {(!imageSource) && (
                <View style={styles.imageContainer}>
                    {(modalType=="profilePic" && profilePicState!="")&&(
                        <View style={styles.imagePreview}>
                        <Image
                            source={{ uri: profilePicState }}
                            style={styles.previewImage}
                        />
                        </View>
                    )}
                    {(modalType=="coverPic" && coverPhotoState!="")&&(
                        <View style={styles.imagePreviewCover}>
                        <Image
                            source={{ uri: coverPhotoState }}
                            style={styles.previewImage}
                        />
                        </View>
                    )}
                    
                </View>
                )}
                <View></View>
                <View></View>
                <View></View>
                <TouchableOpacity onPress={onClose} style={{...styles.selectButton, backgroundColor:"#e80000"}}>
                    <Text style={styles.modalTitle}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    )
}

export default ProfilePicModal