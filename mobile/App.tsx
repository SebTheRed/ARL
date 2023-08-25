/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import type {PropsWithChildren} from 'react';
import { Animated, Easing } from 'react-native';
import { NavigationContainer, StackActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Skills from './Pages/Skills/Skills';
import SkillsPage from './Pages/Skills/SkillsPage'
import Stats from './Pages/Stats';
import Map from './Pages/Map/Map';
import Profile from './Pages/Profile';
import Trophies from './Pages/Trophies/Trophies'
import HeaderBar from './Overlays/HeaderBar';
import { useState } from 'react';
import styles from './styles';
import Feed from './Pages/Feed/Feed';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BottomBar from './Overlays/BottomBar';
const Stack = createStackNavigator();
const SkillStack = createStackNavigator();
type RootStackParamList = {
  Profile: undefined;
  Map: undefined;
  Skills: undefined;
  Stats: undefined;
  Trophies: undefined;
};






////// COMPONENT FUNCTION BEGINNING //////
function App(): JSX.Element {
  const [XPScale, setXPScale] = useState({
    1: 15, 2: 45, 3: 90, 4: 150, 5: 225, 6: 315, 7: 420, 8: 540, 9: 675, 10: 825,
    11: 990, 12: 1170, 13: 1365, 14: 1575, 15: 1800, 16: 2040, 17: 2295, 18: 2565, 19: 2850, 20: 3150,
    21: 3465, 22: 3795, 23: 4140, 24: 4500, 25: 4875, 26: 5265, 27: 5670, 28: 6090, 29: 6525, 30: 6975,
    31: 7440, 32: 7920, 33: 8415, 34: 8925, 35: 9450, 36: 9990, 37: 10545, 38: 11115, 39: 11700, 40: 12300,
    41: 12915, 42: 13545, 43: 14190, 44: 14850, 45: 15525, 46: 16215, 47: 16920, 48: 17640, 49: 18375, 50: 19125,
    51: 19890, 52: 20670, 53: 21465, 54: 22275, 55: 23100, 56: 23940, 57: 24795, 58: 25665, 59: 26550, 60: 27450,
    61: 28365, 62: 29295, 63: 30240, 64: 31200, 65: 32175, 66: 33165, 67: 34170, 68: 35190, 69: 36225, 70: 37275,
    71: 38340, 72: 39420, 73: 40515, 74: 41625, 75: 42750, 76: 43890, 77: 45045, 78: 46215, 79: 47400, 80: 48600,
    81: 49815, 82: 51045, 83: 52290, 84: 53550, 85: 54825, 86: 56115, 87: 57420, 88: 58740, 89: 60075, 90: 61425,
    91: 62790, 92: 64170, 93: 65565, 94: 66975, 95: 68400, 96: 69840, 97: 71295, 98: 72765, 99: 74250
});

  const [XPTriggerEvents,setXPTriggerEvents] = useState({
    family:{
      call_loved_one: {type:"phone",title:"Call a Loved One",desc:"Place a phone call to a starred or favorited contact in your phone." ,xp: 10, unlocksAt: 0, perDay: 3 , perWeek: 0, perMonth: 0},
      family_photo: {type:"camera",title:"Take a Family Photo",desc:"Take a picture with you & 2 other family members.",xp: 20, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0,},
      send_letter: {type:"log",title:"Send a Letter",desc:"Send a letter to anyone! Receiving a letter must mean that they're family!", xp: 5, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      visit_relative: {type:"gps",title:"Visit a Relative",desc:"Check in with the Map at a relative's place.", xp: 20, unlocksAt: 5, perDay:1, perWeek:0, perMonth:0},
      organize_reunion: {type:"timeline",title:"Family Reunion",desc:"Organize & attend a family reunion of at least 3 generations present.", xp: 100, unlocksAt: 10, perDay:0, perWeek:0, perMonth:1},
      help_with_chores: {type:"camera",title:"Chore Time",desc:"Help a family member with one of their chores.", xp: 30, unlocksAt: 15, perDay:2, perWeek:0, perMonth:0},
      family_game_night: {type:"camera",title:"Game Night!",desc:"Attend a family game night with at least 4 members.", xp: 40, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      family_trip: {type:"timeline",title:"Family Vacation",desc:"Take & document a family vacation.", xp: 300, unlocksAt: 30, perDay:0, perWeek:0, perMonth:1},
      weekly_family_meeting: {type:"camera",title:"Weekly Family Zoom",desc:"Organize & attend a family zoom meeting.", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      house_project: {type:"timeline",title:"House Project",desc:"Design & document a large project that involves many members of your family.", xp: 500, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1}
    },
    friends: {
      message_with_friends: {type:"log",title:"Message with Friends",desc:"Log about a conversation you had with a friend today.", xp: 5, unlocksAt: 0, perDay:3, perWeek:0, perMonth:0},
      call_friend: {type:"log",title:"Call a Friend.",desc:"Log about a phone call you had with a friend today.", xp: 5, unlocksAt: 0, perDay: 3, perWeek:0, perMonth: 0},
      coffee_shop: {type:"gps",title:"Cafe Love",desc:"Spend time at any marked coffee shop on the Map.", xp: 20, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      date_night: {type:"timeline",title:"Date Night",desc:"Take your significant other out for a night on the town.", xp: 50, unlocksAt: 5, perDay:0, perWeek:1, perMonth:0},
      restaurant_bar: {type:"gps",title:"Out on the Town",desc:"Spend time at any marked restaurant or bar on the Map.", xp: 25, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      movie_theater: {type:"gps",title:"Movie Night",desc:"Spend time at any marked movie theater on the Map.", xp: 100, unlocksAt: 20, perDay:0, perWeek:1, perMonth:0},
      attend_private_party: {type:"timeline",title:"Private Party",desc:"Have a party of at least 4 friends, then go do something fun!",xp: 150, unlocksAt: 25, perDay: 0, perWeek: 1, perMonth: 0},
      attend_club_meeting: {type:"gps",title:"Private Club",desc:"Check in with the Map at your club's meeting.", xp: 150, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      surprise_party: {type:"timeline",title:"Surprise Party",desc:"Attend a surprise party for any celebration.", xp: 250, unlocksAt: 40, perDay:0, perWeek:0, perMonth:1},
      friends_road_trip: {type:"timeline",title:"Road Trip!",desc:"Take a roadtrip totaling 3 destinations with at least 1 friend or significant other.", xp: 400, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1},
    },
    fitness: {
      daily_pushups: {type:"gyro",title:"Daily Pushups",desc:"Perform a slowly incrementing number of pushups every day.", xp: 15, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      stretching_routine: {type:"log",title:"Stretch it Out",desc:"Log yes or no to doing stretches in the morning and at night.", xp: 5, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0},
      walking: {type:"acceleration",title:"Go for a Walk",desc:"Go for a walk. Be sure to press start when you begin or it won't count!", xp: 10, unlocksAt: 0, perDay:2, perWeek:0, perMonth:0},
      attend_gym: {type:"gps",title:"Go to the Gym",desc:"Spend time at any marked gym on the Map.", xp: 25, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      running: {type:"acceleration",title:"Runner's High",desc:"Go for a run. Be sure to press start when you begin!", xp: 20, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      yoga_at_home: {type:"camera",title:"Home Yoga Studio",desc:"Complete a yoga exercise in the warmth of your home.", xp: 15, unlocksAt: 15, perDay:1, perWeek:0, perMonth:0},
      attend_fitness_class: {type:"gps",title:"Fitness Class",desc:"Check into a fitness class via the Map at any of the marked gyms.", xp: 35, unlocksAt: 20, perDay:1, perWeek:0, perMonth:0},
      achieve_pr: {type:"timeline",title:"Personal Record",desc:"Accomplish & document a person record of any category.", xp: 100, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      run_5k: {type:"acceleration",title:"Five Kilometers",desc:"Run 3.2 miles. Be sure to press start when you begin!", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      belt_rank: {type:"timeline",title:"Martial Master",desc:"Ascend in belt rank at an official martial arts academy marked on the Map.", xp: 100, unlocksAt: 40, perDay:0, perWeek:1, perMonth:0},
      attendance_streak: {type:"gps",title:"Can't Stop Won't Stop",desc:"Attend gyms/classes/exercises for 5 of 7 days in a week.",xp: 100, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth: 0}
    },
    earthcraft: {
      plant_tree: {type:"camera",title:"Plant a Tree",desc:"Plant a tree and mark it on the Map.", xp: 10, unlocksAt: 0, perDay:3, perWeek:0, perMonth:0},
      new_plant: {type:"camera",title:"New House Plant",desc:"Acquire a new house plant.", xp: 50, unlocksAt: 0, perDay:0, perWeek:1, perMonth:0},
      bird_watch: {type:"camera",title:"Bird Watching",desc:"Snap a picture of a bird that you can see and identify it.",xp: 20, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth: 0},
      water_garden: {type:"log",title:"Water your Plants",desc:"Log that you watered your plants. Treat this as a reminder to do so!", xp: 5, unlocksAt: 0, perDay:1, perWeek:0, perMonth:0},
      nature_hike: {type:"gps",title:"The Great Outdoors",desc:"Hike/Bike/Climb/Be In any area considered nature on the Map.", xp: 20, unlocksAt: 10, perDay:1, perWeek:0, perMonth:0},
      community_garden: {type:"timeline",title:"Community Gardening",desc:"Help cultivate your community garden.", xp: 100, unlocksAt: 20, perDay:0, perWeek:1, perMonth:0},
      clean_up_event: {type:"timeline",title:"Community Cleanup",desc:"Clean up your community, with your community! 6 members are required.", xp: 250, unlocksAt: 30, perDay:0, perWeek:1, perMonth:0},
      camping: {type:"timeline",title:"Camping Trip",desc:"Spend the night in any area considered nature on the Map.", xp: 100, unlocksAt: 35, perDay:0, perWeek:1, perMonth:0},
      compost: {type:"log",title:"Composting",desc:"Log whether or not you've composted your food remains today.", xp: 10, unlocksAt: 40, perDay:1, perWeek:0, perMonth:0},
      outdoor_project: {type:"timeline",title:"Outdoors Project",desc:"Imagine & Create something outdoors. Let your imagination run wild!",xp: 500, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth: 1},
      wildlife_park: {type:"gps",title:"Natural Parks",desc:"Spend time in any of this great nation's National Parks designated on the Map.", xp: 350, unlocksAt: 50, perDay:0, perWeek:0, perMonth:1}
    },
    cooking: {
      make_meal: {type:"camera",title:"Cook a Meal",desc:"Cook a meal & label what it is.", xp: 5, unlocksAt: 0, perDay: 3, perWeek: 0, perMonth:0 },
      bake: {type:"camera",title:"Bake Something",desc:"Bake anything & label what it is.", xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      try_new_recipe: {type:"camera",title:"Unique Recipe",desc:"Document unique recipe than any you previously have.", xp: 20, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth:0 },
      random_week_recipe:{type:"camera",title:"Weekly Recipe",desc:"Cook the assigned weekly recipe.",xp:100,unlocksAt:20,perDay:0,perWeek:1,perMonth:0},
      host_dinner: {type:"camera",title:"Host a Dinner Party",desc:"Host a dinner party for yourself and 4 other family or friends!", xp: 200, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 },
      random_month_challenge: {type:"timeline",title:"Monthly Challenge",desc:"Complete the monthly challenge.", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 1, perMonth:0 },
      cooking_class: {type:"timeline",title:"Cooking Class",desc:"Host or attend a cooking class.", xp: 350, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    technology: {
      github_commit: {type:"api",title:"Git Commit",desc:"Commit code to a github repository. Requires Github linking.", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 },
      build_3d_model: {type:"camera",title:"3D Model",desc:"Show off a 3D model you made.",xp : 10, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth: 0},
      electricity_work: {type:"camera",title:"Electricity Work",desc:"Work with live electricity in any capacity.", xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      commit_open_src: {type:"api",title:"Open Source",desc:"Commit code to a public github repository.", xp: 5, unlocksAt: 10, perDay: 10, perWeek: 0, perMonth:0 },
      threeD_printing: {type:"camera",title:"3D Print",desc:"3D print something and show the world!", xp: 100, unlocksAt: 10, perDay: 0, perWeek: 1, perMonth:0 },
      build_app: {type:"timeline",title:"Computer Application",desc:"Create a basic computer program in any language.", xp: 250, unlocksAt: 20, perDay: 0, perWeek: 0, perMonth:1 },
      threeD_model_animation: {type:"camera",title:"3D Animation",desc:"Animate a 3D model that you created.",xp : 30, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth: 0},
      leetcode_challenge: {type:"api",title:"LeetCode Challenge",desc:"Complete any leetcode challenge you haven't already completed.", xp: 30, unlocksAt: 40, perDay: 1, perWeek: 0, perMonth:0 },
      attend_tech_conference: {type:"timeline",title:"Tech Conference",desc:"Attend a tech conference of any kind. Must take picture of crowd.", xp: 350, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      full_stack_app: {type:"timeline",title:"Full Stack App",desc:"Create and deploy a full stack application. HTTPS required.",xp : 500, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth: 1},
    },
    games: {
      play_board_game: {type:"camera",title:"Tabletop Game",desc:"Play a board or card game with at least 2 other people.", xp: 10, unlocksAt: 0, perDay: 2, perWeek: 0, perMonth:0 },
      playtime_hour: {type:"api",title:"Steam Playtime Hours",desc:"XP for every hour you play a Steam game.", xp: 5, unlocksAt: 0, perDay: 10, perWeek: 0, perMonth:0 },
      sports_practice: { type:"camera",title:"Practice?",desc:"Train in anything that can be considered a physical sport.",xp: 10, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      sports_match: {type:"timeline",title:"Sports Match",desc:"Compete in anything that can be considered a physical sport.", xp: 30, unlocksAt: 10, perDay: 0, perWeek: 3, perMonth:0 },
      game_achievement: {type:"api",title:"Video Game Achievement",desc:"Unlock a Steam achievement.", xp: 10, unlocksAt: 20, perDay: 2, perWeek: 0, perMonth:0 },
      stream_time: {type:"api",title:"Stream Time",desc:"Steam yourself gaming! Must connect steaming platform account.", xp: 10, unlocksAt: 25, perDay: 10, perWeek: 0, perMonth:0 },
      tabletop_rpg: {type:"timeline",title:"Play a TTRPG",desc:"Play a tabletop roleplaying game like D&D, either in person or online.", xp: 150, unlocksAt: 30, perDay: 0, perWeek: 1, perMonth:0 },
      live_event: {type:"timeline",title:"Live Sports Event",desc:"Attend a sporting competition in real life. Must take picture of crowd.", xp: 1000, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      tournament: {type:"timeline",title:"Tournament",desc:"Host a gaming or sporting tournament of any kind with 8 participants.", xp: 500, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      full_completion: {type:"api",title:"100%'ing The Game",desc:"Achieve 100% of all achievements in any video game.", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 }
    },
    language: {
      daily_duolingo: {type:"api",title:"Daily Duo Lesson",desc:"Complete one duolingo lesson today.", xp: 20, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth:0 },
      daily_reading: {type:"log",title:"Daily Reading",desc:"Read at least one time today.",xp: 5, unlocksAt: 0, perDay: 1, perWeek: 0, perMonth: 0},
      converse_foreign_language: {type:"log",title:"Foreign Language Conversation",desc:"Log about a conversation you had in your non-native language.", xp: 5, unlocksAt: 10, perDay: 2, perWeek: 0, perMonth:0 },
      watch_foreign_movie: {type:"camera",title:"Watch Foreign Movie",desc:"Watch a foreign movie.", xp: 25, unlocksAt: 20, perDay: 1, perWeek: 0, perMonth:0 },
      read_foreign_book: {type:"log",title:"Read Foreign Book",desc:"Log about a book you are reading that is written in your non-native language.", xp: 10, unlocksAt: 30, perDay: 1, perWeek: 0, perMonth:0 },
      duolingo_month: {type:"api",title:"Duolingo Month",desc:"Complete your daily Duolingo challenge every day for each month. Counter resets on the 1st.", xp: 100, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      travel_foreign_country: {type:"timeline",title:"Travel to Foreign Country",desc:"Spread your wings! Share your travels with the world.", xp: 1000, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 },
      // record_speaking_language: {type:"",title:"",desc:"", xp: 50, unlocksAt: 50, perDay: 0, perWeek: 1, perMonth:0 },
      // master_language_exam: {type:"exam",title:"",desc:"", xp: 250, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    },
    humanity: {
      vote: {type:"camera",title:"Your Vote Matters",desc:"Cast your vote for an official Federal or State election.",xp: 1000, unlocksAt: 0, perDay: 0, perMonth: 0},
      create_art: {type:"camera",title:"Artist's Hand",desc:"Create your own art and upload it here for the world to enjoy.",xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0},
      create_music: {type:"audio",title:"Making of the Music",desc:"Play & upload music you have created for the world to hear.",xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth: 0},
      volunteer_event: {type:"camera",title:"Volunteering",desc:"Get out and give back to your community.", xp: 50, unlocksAt: 0, perDay: 0, perWeek: 1, perMonth:0 },
      attend_live_show: {type:"timeline",title:"Live Show",desc:"Attend a live show of any kind. Must take picture of crowd.", xp: 100, unlocksAt: 10, perDay: 0, perWeek: 0, perMonth:1 },
      visit_museum: {type:"timeline",title:"Museum Day",desc:"Visit a museum of any kind.", xp: 100, unlocksAt: 20, perDay: 0, perWeek: 1, perMonth:0 },
      attend_art_show: {type:"timeline",title:"Art Show",desc:"Attend an art show, and see if any art is worth your dollar.", xp: 250, unlocksAt: 30, perDay: 0, perWeek: 0, perMonth:1 },
      attend_church:{type:"camera",title:"Holy Day",desc:"Attend any religious gathering.",xp: 100, unlocksAt: 35, perDay: 0, perWeek: 1, perMonth: 0},
      organize_charity: {type:"timeline",title:"Organize Charity Work",desc:"Organize and accomplish charity work with 4+ people including yourself.", xp: 350, unlocksAt: 40, perDay: 0, perWeek: 0, perMonth:1 },
      present_talent: {type:"timeline",title:"Present Your Talent",desc:"Share your art at shows, comdy on a stage, etc. Any real life showing of your art counts!", xp: 1000, unlocksAt: 50, perDay: 0, perWeek: 0, perMonth:1 }
    }
  })

  const [skillsList,setSkillsList] = useState([
    {title:"Family",color:"#ff0000",flare:"Calls - Visits - Reunions",level:99},
    {title:"Friends",color:"#ff8400",flare:"Events - Meetups - Dates",level:12},
    {title:"Fitness",color:"#ffea00",flare:"Gyms - Runs - Routines",level:8},
    {title:"Earthcraft",color:"#4dff00",flare:"Plants - Animals - Outdoors",level:60},
    {title:"Cooking",color:"#00ff80",flare:"Recipes - Dieting - Baking",level:50},
    {title:"Technology",color:"#00fffb",flare:"Code - Electronics - 3D",level:75},
    {title:"Games",color:"#0080ff",flare:"Tabletop - Video - Sports",level:15},
    {title:"Language",color:"#7700ff",flare:"Duolingo - Travel - Reading",level:10},
    {title:"Humanity",color:"#c800ff",flare:"Activism - Volunteering - Arts",level:20},
  ]);

  const [trophyData,setTrophyData] = useState([
    {title:"Titan of Steel",progressQTY:21,imgPath:require('./IconBin/TrophyPNG/goblet1.png'),tier:"Bronze",desc:"Go to the gym for 21 days straight without missing a single day.",unlocked:false},
    {title:"Uphill Battle",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/gem1.png'),tier:"Silver",desc:"Go to the gym for at least 100 days out of the year. Counter starts Jan 1.",unlocked:false},
    {title:"Progress of Pain",progressQTY:200,imgPath:require('./IconBin/TrophyPNG/number1.png'),tier:"Gold",desc:"Go to the gym for at least 200 days of the year. Counter starts and ends Jan 1.",unlocked:false},
    {title:"Sisyphus' Prized Work",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/pedistal1.png'),tier:"Gold",desc:"Log into ARL at the gym 1,000 times.",unlocked:false},
    {title:"Marathon's March",progressQTY:1000, imgPath:require('./IconBin/TrophyPNG/gem2.png'), tier:"Silver", desc:"Run or walk a total of 1,000 miles tracked in ARL.", unlocked:false},
    {title:"Martial Master",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant2.png'),tier:"Silver",desc:"Earn a new belt in a martial art. Any rank-up counts.",unlocked:false},
    {title:"26.2",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/gem3.png'), tier:"Gold", desc:"Run and complete a Marathon", unlocked:false},
    {title:"Powerhouse",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/simple1.png'), tier:"Gold", desc:"Lift & Upload a combined weight of 25,000 lbs in under an hour. Any lift counts.", unlocked:false},
    {title:"Resolution Revolution I",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star1.png'),tier:"Silver",desc:"Log 365 exercises into ARL",unlocked:false},

    {title:"Resolution Revolution II",progressQTY:365,imgPath:require('./IconBin/TrophyPNG/star3.png'),tier:"Silver",desc:"Cook & Log 365 total dinners.",unlocked:false},
    {title:'Grandma Would Be Proud',progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Gold",desc:"Cook & Log 1,000 total meals.",unlocked:false},
    {title:"Cooking Contributor",progressQTY:25,imgPath:require('./IconBin/TrophyPNG/shield1.png'),tier:"Silver",desc:"Cook & Upload 25 different meal recipes.",unlocked:false},
    {title:"Family Feast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star2.png'),tier:"Bronze",desc:"Cook & Upload a holiday dinner with at least 6 family members in attendance.",unlocked:false},

    {title:"Numb Fingers",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/elegant3.png'),tier:"Gold",desc:"Make 1000 contributions to Github tracked through ARL.",unlocked:false},
    {title:"Bearing FAANGs",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star4.png'),tier:"Silver",desc:"Make an app for the iOS and Google Play store.",unlocked:false},
    {title:"Internet Property",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person4.png'),tier:"Bronze",desc:"Create & host your own domain name server. HTTPS required.",unlocked:false},
    {title:"Digital Playground",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gear.png'),tier:"Silver",desc:"Develop & release your own game onto Steam, The Web, or both App Stores",unlocked:false},
    {title:"Core Contributor",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple4.png'), tier:"Bronze", desc:"Contribute to 10 different open-source projects.", unlocked:false},

    {title:"Gamer with Taste",progressQTY:50,imgPath:require('./IconBin/TrophyPNG/simple5.png'),tier:"Bronze",desc:"Play 50 different Steam games for 10 hours each.",unlocked:false},
    {title:"Above & Beyond",progressQTY:2500,imgPath:require('./IconBin/TrophyPNG/shield2.png'),tier:"Gold",desc:"Unlock 2,500 Steam achievements",unlocked:false},
    {title:"The Grind",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/gem4.png'),tier:"Silver",desc:"Play 1,000 hours in Steam one year. Counter starts Jan 1",unlocked:false},
    {title:"Gotta Go Fast",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/number2.png'),tier:"Gold",desc:'Hold the world record in any video game that is considered "speed-runable"',unlocked:false},
    {title:"Cant Stop Wont Stop",progressQTY:24,imgPath:require('./IconBin/TrophyPNG/gem5.png'),tier:"Bronze",desc:"Play a single game for 24 hours straight.",unlocked:false},

    {title:"Lightfoot Traveler",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/elegant4.png'),tier:"Bronze",desc:"Visit any foreign country.",unlocked:false},
    {title:"Globe Trotter",progressQTY:10, imgPath:require('./IconBin/TrophyPNG/simple6.png'), tier:"Gold", desc:"Visit 10 different countries and check-in via ARL.", unlocked:false},
    {title:"Artistic Soul",progressQTY:20, imgPath:require('./IconBin/TrophyPNG/gem6.png'), tier:"Bronze", desc:"Visit & Check in at 20 different art museums and galleries.", unlocked:false},
    {title:"Social Butterfly",progressQTY:150, imgPath:require('./IconBin/TrophyPNG/mirror2.png'), tier:"Silver", desc:"Attend & Check in at 150 different social events or meetups. Family and/or Friends", unlocked:false},
    {title:"All Abord",progressQTY:1000,imgPath:require('./IconBin/TrophyPNG/steering1.png'),tier:"Silver",desc:"Take a roadtrip totaling at least 1,000 miles over the course of one week.",unlocked:false},

    {title:"Family Reunion",progressQTY:1, imgPath:require('./IconBin/TrophyPNG/star5.png'), tier:"Gold", desc:"Organize & Upload a family reunion with at least 15 members.", unlocked:false},
    {title:"Ring Ring",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/pedistal2.png'), tier:"Bronze", desc:"Make 100 calls to close friends or loved ones.", unlocked:false},
    {title:"Game of Life",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/simple3.png'),tier:"Bronze",desc:"Host a family game night with 3 generations present.",unlocked:false},
    {title:"Clean Leader",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star6.png'),tier:"Bronze",desc:"Host a family cleanup of the entire house.",unlocked:false},

    {title:"Hands of Bronze",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/gem7.png'), tier:"Bronze", desc:"Volunteer for 100+ hours in community service.", unlocked:false},
    {title:"Eyes of Silver",progressQTY:50, imgPath:require('./IconBin/TrophyPNG/star7.png'), tier:"Silver", desc:"Create & Upload 50 physical pieces of art that you have created.", unlocked:false},
    {title:"Voice of Gold",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/person1.png'),tier:"Gold",desc:"Act in a play or perform live music, on a stage in front of an audience.",unlocked:false},
    {title:"Decoration of Space",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/gem8.png'),tier:"Silver",desc:"Create & Display a piece of physical art at a public art gallery.",unlocked:false},
    {title:"Decoration of Time",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star8.png'),tier:"Silver",desc:"Upload an album of at least 12 songs into Soundcloud",unlocked:false},

    {title:"Lost in Nature",progressQTY:15,imgPath:require('./IconBin/TrophyPNG/goblet3.png'),tier:"Bronze",desc:"Hike 15 different non-vehicle trails.",unlocked:false},
    {title:"Finding Nature",progressQTY:100,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Hike 100 miles on non-vehicle trails.",unlocked:false},
    {title:"Chief Trailfoot",progressQTY:500,imgPath:require('./IconBin/TrophyPNG/star10.png'),tier:"Gold",desc:"Hike 500 miles on non-vehicle trails.",unlocked:false},
    {title:"Butcher & Shepherd",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield3.png'),tier:"Gold",desc:"Construct & maintain your own animal livestock collection of at least 12 animals.",unlocked:false},
    {title:"Of The Earth",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/shield4.png'),tier:"Bronze",desc:"Plant & harvest from a vegetable garden of at least 4 species.",unlocked:false},
    {title:"Nature's Friend",progressQTY:25, imgPath:require('./IconBin/TrophyPNG/person2.png'), tier:"Bronze", desc:"Plant & Upload 25 unique species plants of any shape or size.", unlocked:false},
    {title:"Nature's Steward",progressQTY:100, imgPath:require('./IconBin/TrophyPNG/person3.png'), tier:"Silver", desc:"Plant & Upload 100 unique species plants of any shape or size.", unlocked:false},
    {title:"Off The Pipeline",progressQTY:1,imgPath:require('./IconBin/TrophyPNG/star9.png'),tier:"Silver",desc:"Construct & Upload a functioning rainwater collection system.",unlocked:false},
    // {title:"Save The Bees",imgPath:require('./IconBin/TrophyPNG/trophyAndMedal.png'),tier:"Silver",desc:"Set up & Maintain a small beekeeping hive.",unlocked:false},
    // {title:"Earth's Beautiful Surface",imgPath:"",tier:"Bronze",desc:"Participate in an environmental cleanup drive.",unlocked:false},
    // {title:"Earth's Amazing People",imgPath:"",tier:"Gold",desc:"Organize an environmental cleanup drive.",unlocked:false},

  ])

  const [playerData,setPlayerData] = useState({
    userName:"SebTheRed",
    xp:{
      family:1000,
      friends:11,
      fitness:17800,
      earthcraft:140,
      cooking:15000,
      technology:16000,
      games:170,
      language:1500,
      humanity:1800,
    },
    trophies:{
      0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,
      10:false,11:false,12:false,13:false,14:false,15:false,16:false,17:false,18:false,19:false,
      20:false,21:false,22:false,23:false,24:false,25:false,26:false,27:false,28:false,29:false,
      30:false,31:false,32:false,33:false,34:false,35:false,36:false,37:false,38:false,39:false,
      40:false,41:false,42:false,43:false,44:false,45:false,46:false,47:false,48:false,49:false,
    },
  })


const SkillsNav = () => {
  return(
    <SkillStack.Navigator initialRouteName='SkillsMain' screenOptions={{ headerShown: false }}>
      <SkillStack.Screen name="SkillsMain" component={Skills} initialParams={{ skillsList: skillsList, playerData:playerData, XPScale:XPScale }}/>
      <SkillStack.Screen name="Family" initialParams={{skillData:skillsList[0], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Friends" initialParams={{skillData:skillsList[1], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Fitness" initialParams={{skillData:skillsList[2], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      {/* <SkillStack.Screen name="Agility" initialParams={{skillData:skillsList[3]}} component={SkillsPage} ></SkillStack.Screen> */}
      <SkillStack.Screen name="Earthcraft" initialParams={{skillData:skillsList[3], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Cooking" initialParams={{skillData:skillsList[4], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Technology" initialParams={{skillData:skillsList[5], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Games" initialParams={{skillData:skillsList[6], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Language" initialParams={{skillData:skillsList[7], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
      <SkillStack.Screen name="Humanity" initialParams={{skillData:skillsList[8], playerData:playerData, XPScale:XPScale, XPTriggerEvents:XPTriggerEvents}} component={SkillsPage} ></SkillStack.Screen>
    </SkillStack.Navigator>
  )
  
}


  // const isDarkMode = useColorScheme() === 'dark';
  return (
<SafeAreaView style={styles.backgroundStyle}>
  <NavigationContainer>
      <HeaderBar />
      <Stack.Navigator initialRouteName='Skills' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Skills" component={SkillsNav} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Trophies" initialParams={{trophyData: trophyData}} component={Trophies} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Feed" component={Feed} />
      </Stack.Navigator>
      <BottomBar/>
  </NavigationContainer>
</SafeAreaView>
  );
}



export default App;
