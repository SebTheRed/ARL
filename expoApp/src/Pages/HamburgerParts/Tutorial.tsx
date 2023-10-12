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
} from 'react-native';
import styles from '../../styles';
import { scaleFont } from '../../Utilities/fontSizing';
const Tutorial = ():JSX.Element => {
  return(
    <ScrollView style={{backgroundColor:"#1c1c1c"}}>
    <View style={{...styles.defaultPageBackground, alignItems:"flex-start", padding:10}}>
    <View style={{height:20}} />
      <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>ARL is a tool for the mind.</Text>
      <Text style={{...styles.sectionFlare}}>Studies have proven again and again that by gamifying a goal with numbers, you will be much more likely to accomplish the goal. Piece by piece, post by post, you will begin to see self-improvement by leveling up the Traits that make you human.</Text>
      <View style={{height:20}} />
      <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>How do I play?</Text>
      <Text style={{...styles.sectionFlare}}>Simple. Pick a Trait (Family,Fitness,etc) and select an experience that you are currently doing, or have done today. Write about it or post a picture, which will create a post in the Feed for all of your friends to see. Doing so will give you points called "XP" which level up your Traits.</Text>
      <View style={{height:20}} />
      <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>Up-Votes and Down-Votes.</Text>
      <Text style={{...styles.sectionFlare}}>Each Up/Down vote influences the amount of XP each post will reward you. If your friend up-votes your post, they are giving the post +1 XP. If they down-vote your post, they are taking -1 XP from the post. Once 24 hours have passed, you will be rewarded with XP totaling the score (upvotes & downvotes summed) of the post, which is then deleted.</Text>
      <View style={{height:20}} />
      <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>Why not cheat?</Text>
      <Text style={{...styles.sectionFlare}}>Firstly, the community is encouraged to down-vote posts of cheaters and only up-vote quality posts. Secondly, while cheating is possible and not against the rules the only player you're stealing from is yourself. There is no "End-Game" besides being able to look back from where you started and lay witness to your own self-growth.</Text>
      <View style={{height:20}} />
      <Text style={{...styles.sectionTitle,fontSize:scaleFont(24)}}>Forever is the plan.</Text>
      <Text style={{...styles.sectionFlare}}>This app will never reset. Your progress will never be lost. Do note this app costs each user about $0.01 a month. So long as this thing doesn't explode, I'll keep it free. If you would like to donate to my future 30 Acre home-stead purchase, my Paypal is specs1396@gmail.com ily</Text>

    </View>
    </ScrollView>
  )
}

export default Tutorial