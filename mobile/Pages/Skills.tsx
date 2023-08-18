import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';
import styles from '../styles'
import type {PropsWithChildren} from 'react';


type SectionProps = PropsWithChildren<{
    title: string;
    flare: string;
  }>;
  
  function Section({children, title, flare}: SectionProps): JSX.Element {
    console.log(children)
  
    const isDarkMode = useColorScheme() === 'dark';
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


function Skills(): JSX.Element {
    return(
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <View>
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
      </ScrollView>
    )
}

export default Skills