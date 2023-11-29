import {
    Text,
    View,
    TouchableOpacity,
  } from 'react-native';
import {useState,useEffect} from 'react'
import styles from '../../styles';
import ICONS from './TrophyIcons';
import { useNavigation } from '@react-navigation/native';
import { useCurrentEvent } from '../../Contexts/CurrentEventContext';
import { scaleFont } from '../../Utilities/fontSizing';

const TrophyBox = ({d,locked,status,openPost}:any):JSX.Element => {
    const navigation:any = useNavigation();
    const {setCurrentEvent}:any = useCurrentEvent()

    const [panelState,setPanelState]=useState(false);
    const [Icon,setIcon] = useState<any>(null)
    const [unlockLevel,setUnlockLevel] = useState<number>(0)
    const [tierColor,setTierColor] = useState<string>()

    useEffect(()=>{
      switch(d.tier){
        case "Bronze":
          setUnlockLevel(50)
          setTierColor("#cd7f32")
        break;
        case "Silver":
          setUnlockLevel(100)
          setTierColor("#c1d4e3")
        break;
        case "Gold":
          setUnlockLevel(200)
          setTierColor("#d4af37")
        break;
      }
      const loadSVG = async()=>{
        setIcon(()=>ICONS[d.imgPath])
      }
        loadSVG()
      
    },[])


    const beginTrophyPost = () => {
      setCurrentEvent({...d, "tierColor":tierColor,"Icon":Icon})
      navigation.navigate("TrophyUploader");
    }



    return(
      <>
        {locked == true &&
          <View style={styles.trophyBox}>
            <Text style={{...styles.trophyTitle, color:"#5c5c5c"}}>{d.tier} trophies unlock at total level {unlockLevel}</Text>
              {Icon && <Icon width={90} height={90} fill={"#5c5c5c"} />}
          </View>
        }
        {(locked == false && status.status == "none") &&
          <TouchableOpacity onPress={()=>{setPanelState(!panelState)}} style={styles.trophyBox}>
              {panelState == false && (
                  <>
                      <Text style={styles.trophyTitle}>{d.title}</Text>
                      {Icon && <Icon width={90} height={90} fill={"#fff"} />}
                  </>
              )}
              {panelState == true && (
                  <>
                      <Text style={{...styles.trophyText,textAlign:"left"}}>{d.desc}</Text>
                      {/* <Image style={styles.trophyIcon} source={d.imgPath} /> */}
                      <View>
                        <TouchableOpacity onPress={beginTrophyPost} style={{...styles.trophyButton, backgroundColor:tierColor}}>
                            <Text style={styles.trophyButtonText}>Make Trophy Post</Text>
                          </TouchableOpacity>
                      </View>
                  </>
              )}
          </TouchableOpacity>
        }
        {(locked == false && status.status == "pending") &&
          <TouchableOpacity onPress={()=>{setPanelState(!panelState)}} style={{...styles.trophyBox, borderColor:tierColor}}>
              {panelState == false && (
                  <>
                      <Text style={styles.trophyTitle}>{d.title}</Text>
                      {Icon && <Icon width={90} height={90} fill="#fff" />}
                  </>
              )}
              {panelState == true && (
                  <>
                      <Text style={{...styles.trophyText,textAlign:"left"}}>Your post is on the Feed. Good luck!</Text>
                      {/* <Image style={styles.trophyIcon} source={d.imgPath} /> */}
                      <View>
                        <View style={{...styles.trophyButton, borderColor:"transparent"}}>
                            <Text style={{...styles.trophyButtonText, color:"#fff"}}>Pending..</Text>
                          </View>
                      </View>
                  </>
              )}
          </TouchableOpacity>
        }
        {(locked == false && status.status == "achieved") &&
          <TouchableOpacity onPress={()=>{openPost(status.data.id)}} style={{...styles.trophyBox, borderColor:tierColor, borderWidth:8}}>
                  <>  
                      <Text style={{...styles.trophyTitle, color:"#fff", fontWeight:"bold"}}>{d.title}</Text>
                      {Icon && <Icon width={90} height={90} fill={tierColor} />}
                  </>
          </TouchableOpacity>
        }
      </>
        
    )
}

export default TrophyBox