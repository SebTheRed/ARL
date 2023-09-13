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
  import { useUID } from '../../Contexts/UIDContext';
  import styles from '../../styles';
const ProfilePicModal = ({setModalVisibility}:any):JSX.Element => {
        const {userData}:any = useUserData()
        const {uid}:any = useUID()
        const [imageSource, setImageSource] = useState(null);
        const [selectedImage,setSelectedImage] = useState(null)
        const [profilePicState,setProfilePicState] = useState(String)
        useEffect(()=>{
            const translateURL = async () => {
                const storage = getStorage()
                const pathRef = ref(storage, userData.picURL)
                getDownloadURL(pathRef)
                .then((url:any)=>{setProfilePicState(url)})
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
            const responseBlob = await fetch(imageSource);
            const blob = await responseBlob.blob();

            // Upload to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `user_prof_pics/${uid}/picture_actual`);

            uploadBytes(storageRef, blob).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            }).catch((error) => {
                console.log('Upload failed: ', error);
            });
        }

        const onClose = () => {
            setModalVisibility(false)
        }

    return(
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{...styles.modalTitle, fontSize:30,}}>Change Profile Picture</Text>
                <TouchableOpacity onPress={selectImage} style={{...styles.selectButton, backgroundColor:"#007bff"}}>
                    <Text style={styles.modalTitle}>Select New Image</Text>
                </TouchableOpacity>
                {imageSource && (
                <View style={styles.imageContainer}>
                    <View style={styles.imagePreview}>
                    <Image
                        source={{ uri: imageSource }}
                        style={styles.previewImage}
                    />
                    </View>
                    <TouchableOpacity onPress={confirmImage} style={{...styles.selectButton, backgroundColor:"#00e800"}}>
                        <Text style={styles.modalTitle}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                )}
                {(!imageSource && profilePicState) && (
                <View style={styles.imageContainer}>
                    <View style={styles.imagePreview}>
                    <Image
                        source={{ uri: profilePicState }}
                        style={styles.previewImage}
                    />
                    </View>
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