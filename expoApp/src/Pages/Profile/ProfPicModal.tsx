import {
    Text,
    View,
    TouchableOpacity,
    Modal,
    Image,
  } from 'react-native';
  import {getStorage,ref, getDownloadURL} from 'firebase/storage';
  import {useState,useEffect} from 'react'
  import { useUserData } from '../../Contexts/UserDataContext';
  import { useUID } from '../../Contexts/UIDContext';
  import styles from '../../styles';
  import {scaleFont} from '../../Utilities/fontSizing'
  import * as ImagePicker from 'expo-image-picker'
  import * as ImageManipulator from 'expo-image-manipulator';
  import LoadingOverlay from '../../Overlays/LoadingOverlay';
  import ErrorModal from '../../Overlays/ErrorModal';

const ProfilePicModal = ({modalType,setModalType,updateProfPic,updateCoverPic}:any):JSX.Element => {
        
        const {userData}:any = useUserData()
        const {uid}:any = useUID()
        const [imageSource, setImageSource] = useState<any>(null);
        const [selectedImage,setSelectedImage] = useState<any>(null)
        const [profilePicState,setProfilePicState] = useState(String)
        const [coverPhotoState,setCoverPhotoState] = useState(String)
        const [uploadingImage,setUploadingImage] = useState<boolean>(false)
        const [errorBool,setErrorBool] = useState<boolean>(false)
        const [errorMessageText,setErrorMessageText] = useState<string>()

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
      
        const pickImage = async (type:any) => {
          let heightSet:number ,widthSet:number, aspectRatio:any
          if (type == "profile") {
            aspectRatio = [1,1]
            heightSet = 400
            widthSet = 400
          } else if (type == "cover") {
            aspectRatio = [16, 9]
            heightSet = 1000
            widthSet = 1000
          } else {
            aspectRatio = [4, 3]
            heightSet= 1000
            widthSet = 1000
          }
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: aspectRatio,
            });
        
            if (!result.canceled && result.assets) {
              const originalWidth = result.assets[0].width;
              const originalHeight = result.assets[0].height;
              const aspectRatio = (originalWidth / originalHeight)
        
              let newWidth, newHeight;
              if (originalWidth > originalHeight) {
                newWidth = widthSet;
                newHeight = heightSet / aspectRatio;
              } else {
                newHeight = heightSet;
                newWidth = widthSet * aspectRatio;
              }
        
        
              const manipulatedResult = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{resize:{width:newWidth,height:newHeight}}],
                {compress:0.5}
              )
              setImageSource(manipulatedResult.uri);
          };
        };
      
        const confirmImage = async() => {
          console.log('UPDATING PROFILE PICTURE...')
          setUploadingImage(true)
          try {
              console.log('1')
              const responseBlob = await fetch(imageSource);
              const blob = await responseBlob.blob();
      
              // Convert blob to base64
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = async () => {
                  const base64data = reader.result;
                  
                  // Send the image to your backend
                  const response = await fetch('https://us-central1-appreallife-ea3d9.cloudfunctions.net/updateProfilePicture', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          uid,
                          imageData: base64data
                      })
                  });
                  if (!response.ok) {
                    const text = await response.text();
                    console.error('Server error:', text);
                    if (text == "INAPPROPRIATE") {
                      setUploadingImage(false)
                      setErrorMessageText("DO NOT UPLOAD INAPPROPRIATE CONTENT TO THIS PLATFORM!!")
                      setErrorBool(true)
                    }
                    return;
                }
                  const data = await response.json();
      
                  if (response.ok) {
                      const responseMessage = data.message
                      console.log(responseMessage)
                        setModalType("");
                        setImageSource("");
                        setProfilePicState("");
                        const storage = getStorage();
                        const pathRef = ref(storage, data.gsLink);
                        const profPicURL = await getDownloadURL(pathRef);
                        updateProfPic(profPicURL)
                        setUploadingImage(false)
                  } else {
                      console.error('Error uploading image:', data.error);
                      setUploadingImage(false)
                  }
              };
          } catch(err) {
              console.error(err);
              setUploadingImage(false)
          }
      };
        const confirmCoverImage = async() => {
          console.log('UPDATING COVER PICTURE...')
          setUploadingImage(true)
          try {
              console.log('1')
              const responseBlob = await fetch(imageSource);
              const blob = await responseBlob.blob();
      
              // Convert blob to base64
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = async () => {
                  const base64data = reader.result;
                  
                  // Send the image to your backend
                  const response = await fetch('https://us-central1-appreallife-ea3d9.cloudfunctions.net/updateCoverPicture', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          uid,
                          imageData: base64data
                      })
                  });
                  if (!response.ok) {
                    const text = await response.text();
                    console.error('Server error:', text);
                    if (text == "INAPPROPRIATE") {
                      setUploadingImage(false)
                      setErrorMessageText("DO NOT UPLOAD INAPPROPRIATE CONTENT TO THIS PLATFORM!!")
                      setErrorBool(true)
                    }
                    return;
                }
                  const data = await response.json();
      
                  if (response.ok) {
                      const responseMessage = data.message
                      console.log(responseMessage)
                      setModalType("");
                      setImageSource("");
                      setProfilePicState("");
                      const storage = getStorage();
                      const pathRef = ref(storage, data.gsLink);
                      const coverPicURL = await getDownloadURL(pathRef);
                      updateCoverPic(coverPicURL)
                      setUploadingImage(false)
                  } else {
                      console.error('Error uploading image:', data.error);
                      setUploadingImage(false)
                  }
              };
          } catch(err) {
              console.error(err);
              setUploadingImage(false)
          }
      };

        const onClose = () => {
            setModalType("")
            setImageSource("")
                setProfilePicState("")
        }

    return(
      <>
        <Modal animationType="slide" transparent={true} visible={true}>
            <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{...styles.modalTitle, fontSize:scaleFont(30),}}>Change Profile Picture</Text>
                {modalType == "profilePic"&&(
                  <TouchableOpacity onPress={()=>pickImage('profile')} style={{...styles.selectButton, backgroundColor:"#007bff"}}>
                    <Text style={styles.modalTitle}>Select New Image</Text>
                </TouchableOpacity>
                )}
                {modalType == "coverPic"&&(
                  <TouchableOpacity onPress={()=>pickImage('cover')} style={{...styles.selectButton, backgroundColor:"#007bff"}}>
                    <Text style={styles.modalTitle}>Select New Image</Text>
                </TouchableOpacity>
                )}
                
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
            <LoadingOverlay isVisible={uploadingImage} text={"Uploading Picture..."} opacity={0.8} />
            <ErrorModal setErrorBool={setErrorBool} isVisible={errorBool} text={errorMessageText} opacity={0.8} />
        </Modal>
        
      </>
    )
}

export default ProfilePicModal