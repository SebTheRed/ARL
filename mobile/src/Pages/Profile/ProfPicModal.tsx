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
  import {useState} from 'react'
  import styles from '../../styles';
const ProfilePicModal = ({setModalVisibility}:any):JSX.Element => {
        const [imageSource, setImageSource] = useState(null);
        const [selectedImage,setSelectedImage] = useState(null)
      
        const selectImage = async() => {
          const options = {
            mediaType:'photo',
            includeBase64:false,
            maxHeight:7000,
            maxWidth:7000,
            }
            const callbackIdk = (val:string) => {
                console.log(val)
            }
            launchImageLibrary(options,(response)=>{
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
      
        const confirmImage = () => {

        }

        const onClose = () => {
            setModalVisibility(false)
        }

    return(
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Change Profile Picture</Text>
                <TouchableOpacity onPress={selectImage} style={styles.selectButton}>
                <Text style={styles.modalTitle}>Select Image</Text>
                </TouchableOpacity>
                {imageSource && (
                <View style={styles.imageContainer}>
                    <View style={styles.imagePreview}>
                    <Image
                        source={{ uri: imageSource }}
                        style={styles.previewImage}
                    />
                    </View>
                    <TouchableOpacity onPress={confirmImage} style={styles.confirmButton}>
                    <Text style={styles.modalTitle}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                )}
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.modalTitle}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
    )
}

export default ProfilePicModal