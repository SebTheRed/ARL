import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

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
type SkillsProps = PropsWithChildren<{
  route: any,
}>

function Skills({route}:SkillsProps): JSX.Element {
  const { skillsList } = route.params;

  

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
        <Text style={{...styles.borderedText, position: 'absolute', top: 2, left: 2, color: 'white' }}>{level}</Text>
        <Text style={{...styles.borderedText, position: 'absolute', top: -2, left: -2, color: 'white' }}>{level}</Text>
        <Text style={{...styles.borderedText, position: 'absolute', top: 2, left: -2, color: 'white' }}>{level}</Text>
        <Text style={{...styles.borderedText, position: 'absolute', top: -2, left: 2, color: 'white' }}>{level}</Text>
        <Text style={{...styles.borderedText, color: 'black' }}>{level}</Text>
      </View>
    </View>
  )
}


    return(
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
          <View>
            {skillsList.map((d:any,i:number)=>{
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