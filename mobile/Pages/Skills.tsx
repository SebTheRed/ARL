import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import Svg, {Text as SvgText} from 'react-native-svg'
import { useState } from 'react';
import styles from '../styles'
import type {PropsWithChildren} from 'react';
type SectionProps = PropsWithChildren<{
    title: string;
    flare: string;
  }>;
type SkillTileProps = PropsWithChildren<{
  title: string,
  level: number,
  color: string,
  flare: string,
}>;


function Skills(): JSX.Element {

  const [skillsList,setSkillsList] = useState([
    {title:"Family",color:"#ff0000",flare:"--",level:1},
    {title:"Friends",color:"#ff8400",flare:"--",level:1},
    {title:"Finance",color:"#ffea00",flare:"--",level:1},
    {title:"Agility",color:"#aeff00",flare:"--",level:1},
    {title:"Strength",color:"#4dff00",flare:"--",level:1},
    {title:"Contest",color:"#00ff80",flare:"--",level:1},
    {title:"Coding",color:"#00fffb",flare:"--",level:1},
    {title:"Gaming",color:"#0080ff",flare:"--",level:1},
    {title:"Cooking",color:"#7700ff",flare:"--",level:1},
    {title:"Humanity",color:"#b300ff",flare:"--",level:1},
  ]);
  

function Section({children, title, flare}: SectionProps): JSX.Element {
  console.log(children)

  const isDarkMode = useColorScheme() === 'dark';
  return(
  <View></View>
  )
}
const SkillTile = ({title,flare, color,level}:SkillTileProps): JSX.Element => {
  return(
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTextContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{flare}</Text>
        
      </View>
      <View style={{...styles.sectionLevelBox, backgroundColor:color}}>
        <View>
        <Svg height="100%" width="100%" viewBox="0 0 200 100">
          <SvgText
            x="50"
            y="50"
            fontSize="50"
            fill="black"
            stroke="white"
            strokeWidth="2"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {level}
          </SvgText>
        </Svg>
        </View>
      </View>
    </View>
  )
}


    return(
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
          <View>
            {skillsList.map((d,i)=>{
              return(<SkillTile title={d.title} color={d.color} level={d.level} flare={d.flare} key={i}/>)
            })}
          </View>
      </ScrollView>
    )
}

export default Skills

/*
<Section title="Family" flare="The highest priority.">
            <Text>+XP when calling & visiting family.</Text>
            <Text>++XP when family birthdays.</Text>
          </Section>
          <Section title="Friends" flare="The greatest pleasure.">
            <Text>+XP when calling & visiting family.</Text>
            <Text>++XP when going to social events.</Text>
          </Section>
          <Section title="Finance" flare="The primary focus.">
            <Text>+XP or -XP based on credit score.</Text>
            <Text>++XP when following budget.</Text>
          </Section>
          <Section title="Agility" flare="The power to move.">
            <Text>+XP when logging cardio exercise.</Text>
            <Text>++XP when classes or social exercise.</Text>
          </Section>
          <Section title="Strength" flare="The force of will.">
            <Text>+XP when tracking strength training.</Text>
            <Text>++XP following schedule.</Text>
          </Section>
          <Section title="Coding" flare="The language of rocks.">
            <Text>+XP using Github.</Text>
            <Text>++XP daily leetcode question.</Text>
          </Section>
          <Section title="Gaming" flare="The otherworldly immersion.">
            <Text>+XP when playing games.</Text>
            <Text>++XP when gaming with friends.</Text>
          </Section>
          <Section title="Cooking" flare="Fuel rules the Man.">
            <Text>+XP logging meals.</Text>
            <Text>++XP when sharing recipes & pics.</Text>
          </Section>
          <Section title="The Arts" flare="The decoration of space & time.">
            <Text>+XP making IRL art.</Text>
            <Text>++XP going to art shows/galleries.</Text>
          </Section>
          <Section title="Philanthropy" flare="The humbling altruism.">
            <Text>+XP when donating money to charity.</Text>
            <Text>++XP when logging into charity events.</Text>
          </Section>
        </View>


 
        







         return (
      <View style={styles.sectionContainer}>
        <View style={{flexDirection:"row", alignItems:"flex-end"}}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: "white",
              },
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.sectionFlare,
            ]}>
            &nbsp;&nbsp;{flare}
          </Text>
        </View>
        
        <Text
          style={[
            styles.sectionDescription,
            {
              color: "white"
            },
          ]}>
            
        <View style={styles.sectionDescriptionContainer}>
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <Text
                key={index}
                style={[
                  styles.sectionDescription,
                  {
                    color: "white",
                  },
                ]}>
                {child}
              </Text>
            ))
          ) : (
            <Text
              style={[
                styles.sectionDescription,
                {
                  color: "white",
                },
              ]}>
              {children}
            </Text>
          )}
        </View>
          
  
        </Text>
      </View>
    );
  }
*/