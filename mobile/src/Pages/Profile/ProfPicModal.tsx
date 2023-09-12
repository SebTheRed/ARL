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
const ProfilePicModal = ():JSX.Element => {
        const [imageSource, setImageSource] = useState(null);
      
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
                    // setSelectedImage(imageUri);
                  }
            })


        };
      
        const confirmImage = () => {

        }

        const onClose = () => {

        }

    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Change Profile Picture</Text>
            <TouchableOpacity onPress={selectImage}>
                <Text>Select Image</Text>
            </TouchableOpacity>
            {imageSource && (
                <View style={{ alignItems: 'center' }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, overflow: 'hidden', marginTop: 10 }}>
                    <Image
                    source={imageSource}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                    />
                </View>
                <TouchableOpacity onPress={confirmImage}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity onPress={onClose}>
                <Text>Close</Text>
            </TouchableOpacity>
            </View>
        </View>
        </Modal>
    )
}

export default ProfilePicModal