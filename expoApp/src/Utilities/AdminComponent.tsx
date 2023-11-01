import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Image,
  } from 'react-native';
import styles from '../styles';
import { scaleFont } from './fontSizing';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import {useState} from 'react'
const AdminComponent = ():JSX.Element => {

    const [XPScale, setXPScale] = useState({
        1: 0, 2: 10, 3: 50, 4: 100, 5: 180, 6: 315, 7: 420, 8: 540, 9: 675, 10: 825,
        11: 990, 12: 1170, 13: 1365, 14: 1575, 15: 1800, 16: 2040, 17: 2295, 18: 2565, 19: 2850, 20: 3150,
        21: 3465, 22: 3795, 23: 4140, 24: 4500, 25: 4875, 26: 5265, 27: 5670, 28: 6090, 29: 6525, 30: 6975,
        31: 7440, 32: 7920, 33: 8415, 34: 8925, 35: 9450, 36: 9990, 37: 10545, 38: 11115, 39: 11700, 40: 12300,
        41: 12915, 42: 13545, 43: 14190, 44: 14850, 45: 15525, 46: 16215, 47: 16920, 48: 17640, 49: 18375, 50: 19125,
        51: 19890, 52: 20670, 53: 21465, 54: 22275, 55: 23100, 56: 23940, 57: 24795, 58: 25665, 59: 26550, 60: 27450,
        61: 28365, 62: 29295, 63: 30240, 64: 31200, 65: 32175, 66: 33165, 67: 34170, 68: 35190, 69: 36225, 70: 37275,
        71: 38340, 72: 39420, 73: 40515, 74: 41625, 75: 42750, 76: 43890, 77: 45045, 78: 46215, 79: 47400, 80: 48600,
        81: 49815, 82: 51045, 83: 52290, 84: 53550, 85: 54825, 86: 56115, 87: 57420, 88: 58740, 89: 60075, 90: 61425,
        91: 62790, 92: 64170, 93: 65565, 94: 66975, 95: 68400, 96: 69840, 97: 71295, 98: 72765, 99: 74250, 100: 100000,
      });
    
      const [XPTriggerEvents,setXPTriggerEvents] = useState({
        family:{
          call_loved_one: {type:"log",title:"Call a Loved One",desc:"Place a phone call to a starred or favorited contact in your phone." ,xp: 5, unlocksAt: 0,lockedBy:"",cooldown:2},
          invite_family:{type:"log",title:"Invite the Family", desc:"Tag a family member who you got to join ARL!", xp:5, unlocksAt: 0,lockedBy:"",cooldown:4},
          family_photo: {type:"camera",title:"Take a Family Photo",desc:"Take a picture with you & 2 other family members.",xp: 10, unlocksAt: 2,lockedBy:"",cooldown:24},
          send_letter: {type:"camera",title:"Send a Letter",desc:"Send a letter to anyone! Receiving a letter must mean that they're family!", xp: 5, unlocksAt: 3,lockedBy:"",cooldown:72},
          visit_relative: {type:"camera",title:"Visit a Relative",desc:"Visit a family member who you don't live with.", xp: 10, unlocksAt: 5,lockedBy:"",cooldown:48},
          cook_family_dinner: {type:"camera", title:"Cook a Family Dinner", desc:"Prepare a meal and enjoy it with your family.", xp: 10, unlocksAt: 5, lockedBy: "",cooldown:24},
          organize_reunion: {type:"timeline",title:"Family Reunion",desc:"Organize & attend a family reunion of at least 3 generations present.", xp: 100, unlocksAt: 10,lockedBy:"",cooldown:168},
          help_with_chores: {type:"camera",title:"Chore Time",desc:"Help a family member with one of their chores.", xp: 15, unlocksAt: 15,lockedBy:"",cooldown:72},
          family_movie_night: {type:"camera", title:"Family Movie Night", desc:"Watch a movie with your family.", xp: 15, unlocksAt: 15,lockedBy: "",cooldown:168},
          family_game_night: {type:"camera",title:"Game Night!",desc:"Attend a family game night with at least 4 members.", xp: 20, unlocksAt: 20, lockedBy:"",cooldown:168},
          family_trip: {type:"timeline",title:"Family Vacation",desc:"Attend & document a family vacation.", xp: 150, unlocksAt: 30, lockedBy:"",cooldown:730},
          weekly_family_meeting: {type:"camera",title:"Weekly Family Zoom",desc:"Organize & attend a family zoom meeting.", xp: 50, unlocksAt: 40,lockedBy:"",cooldown:168},
          house_project: {type:"timeline",title:"House Project",desc:"Design & document a large project that involves many members of your family.", xp: 200, unlocksAt: 50,lockedBy:"",cooldown:730},
        },
        friends: {
          message_with_friends: {type:"log",title:"Message with Friends",desc:"Log about a conversation you had with a friend today.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:4},
          call_friend: {type:"log",title:"Call a Friend",desc:"Log about a phone call you had with a friend today.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:4},
          add_friend:{type:"log",title:"ARL BFFs", desc:"Tag your newest ARL friend in a log post!", xp:5, unlocksAt:0,lockedBy:"",cooldown:4},
          picture_with_friend: {type:"camera",title:"Take a Photo with a Friend",desc:"Say cheese!", xp: 5, unlocksAt: 2,lockedBy:"",cooldown:24},
          coffee_shop: {type:"camera",title:"Java Love",desc:"Spend time at any coffee shop, and take a picture of your order.", xp: 10, unlocksAt: 3,lockedBy:"",cooldown:24},
          gaming_lounge: {type:"camera",title:"Gaming Lounge",desc:"Have a game night with at least 3 other friends. Irl or Virtual.", xp: 10, unlocksAt: 5,lockedBy:"",cooldown:72},
          attend_club_meeting: {type:"camera",title:"Private Club",desc:"Check in at your club's meeting. Irl or Virtual.", xp: 25, unlocksAt: 5,lockedBy:"",cooldown:168},
          date_night: {type:"timeline",title:"Date Night",desc:"Take your significant other out for a night on the town.", xp: 15, unlocksAt: 10,lockedBy:"",cooldown:72},
          restaurant_bar: {type:"camera",title:"Out on the Town",desc:"Spend time at any restaurant / bar / brewery.", xp: 15, unlocksAt: 10,lockedBy:"",cooldown:72},
          movie_theater: {type:"camera",title:"Movie Night",desc:"Spend some time watching a movie at a theater. Be sure to turn off your phone during the film!", xp: 30, unlocksAt: 20,lockedBy:"",cooldown:72},
          attend_private_party: {type:"timeline",title:"Private Party",desc:"Have a party of at least 4 friends.",xp: 40, unlocksAt: 25,lockedBy:"",cooldown:730},
          book_swap: {type:"timeline",title:"Book Swap",desc:"Trade a book you've already read with a friend doing the same.",xp: 100, unlocksAt: 30,lockedBy:"",cooldown:730},
          surprise_party: {type:"timeline",title:"Surprise Party",desc:"Attend a surprise party for any celebration.", xp: 150, unlocksAt: 40,lockedBy:"",cooldown:730},
          friends_road_trip: {type:"timeline",title:"Road Trip!",desc:"Take a roadtrip totaling 3 destinations with at least 1 friend or significant other.", xp: 200, unlocksAt: 50,lockedBy:"",cooldown:730},
        },
        fitness: {
          stretching_routine: {type:"log",title:"Stretch it Out",desc:"Log that you've lovingly stretched all of your muscles.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:8},
          walking: {type:"camera",title:"Go for a Walk",desc:"Go for a walk around town. Power-walking encouraged!", xp: 20, unlocksAt: 0,lockedBy:"",cooldown:8},
          daily_pushups: {type:"log",title:"Daily Pushups",desc:"Perform a your daily pushups. Incrementing day by day encouraged!", xp: 10, unlocksAt: 2,lockedBy:"",cooldown:24},
          cycling: {type:"camera",title:"Ride Your Bike!",desc:"Ride it here, ride it there, ride it anywhere!", xp: 10, unlocksAt: 3, perDay:1,lockedBy:"",cooldown:8},
          swimming: {type:"camera",title:"Amphibious Exercises",desc:"Any workout in the water counts for this experience.", xp: 10, unlocksAt: 4,lockedBy:"",cooldown:8},
          attend_gym: {type:"camera",title:"Go to the Gym",desc:"Spend time at any gym. Use this as motivation.", xp: 10, unlocksAt: 5,lockedBy:"",cooldown:8},
          rock_climbing: {type:"camera",title:"Rock Climbing", desc:"Climb some rocks. Get those hands nice and chalky!", xp:10, unlocksAt: 7, lockedBy:"",cooldown:8},
          running: {type:"camera",title:"Runner's High",desc:"Go for a run. Fun fact: humans can outrun almost any animal!", xp: 20, unlocksAt: 10,lockedBy:"",cooldown:8},
          yoga: {type:"camera",title:"Namaste, Yogi",desc:"Complete a yoga exercise.", xp: 15, unlocksAt: 15,lockedBy:"",cooldown:24},
          attend_fitness_class: {type:"camera",title:"Fitness Class",desc:"Complete a fitness class that takes place outside of your home.", xp: 20, unlocksAt: 20,lockedBy:"",cooldown:24},
          achieve_pr: {type:"timeline",title:"Personal Record",desc:"Accomplish & document a person record of any category.", xp: 100, unlocksAt: 30, lockedBy:"",cooldown:168},
          run_5k: {type:"camera",title:"Five Kilometers",desc:"Run 3.2 miles. Be sure to press start when you begin!", xp: 50, unlocksAt: 40,lockedBy:"",cooldown:730},
          belt_rank: {type:"timeline",title:"Martial Master",desc:"Ascend in belt rank at an official martial arts academy.", xp: 150, unlocksAt: 40,lockedBy:"",cooldown:730},
          class_instructor: {type:"camera",title:"Class In Session",desc:"Lead a class of at least 8 students in an exercise of any kind.",xp: 50, unlocksAt: 50,lockedBy:"",cooldown:168}
        },
        earthcraft: {
          recycle: {type:"camera",title:"Reduce Reuse Recycle",desc:"Do your part! Show off when you deposit a collection of recyclables.", xp: 20, unlocksAt: 0,lockedBy:"",cooldown:72},
          plant_tree: {type:"camera",title:"Plant a Tree",desc:"Plant a tree and log its species.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:24},
          natures_lens: {type:"camera",title:"Nature's Lens",desc:"Capture a breath-taking photograph of nature.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:4},
          farmers_market: {type:"camera",title:"Fresh Food",desc:"Purchase food from a farmer, or farmer's market, directly.", xp: 10, unlocksAt: 2,lockedBy:"",cooldown:72},      
          nature_hike: {type:"camera",title:"The Great Outdoors",desc:"Hike/Bike/Climb/Be in any area considered nature.", xp: 10, unlocksAt: 0,lockedBy:"",cooldown:24},
          water_garden: {type:"log",title:"Water your Plants",desc:"Log that you watered your plants. Treat this as a reminder to do so!", xp: 5, unlocksAt: 3,lockedBy:"",cooldown:24},
          bird_watch: {type:"camera",title:"Bird Watching",desc:"Snap a picture of a bird that you can see and identify it.",xp: 5, unlocksAt: 5,lockedBy:"",cooldown:24},
          new_plant: {type:"camera",title:"New House Plant",desc:"Acquire a new house plant.", xp: 10, unlocksAt: 10,lockedBy:"",cooldown:168},
          upcycle: {type:"timeline",title:"Upcycle a Recyclable",desc:"Instead of disposing of something, re-purpose it in your home.", xp: 50, unlocksAt: 15,lockedBy:"",cooldown:168},
          community_garden: {type:"timeline",title:"Community Gardening",desc:"Help cultivate your community garden.", xp: 30, unlocksAt: 20,lockedBy:"",cooldown:168},
          clean_up_event: {type:"timeline",title:"Community Cleanup",desc:"Clean up your community, with your community! 4 members are required.", xp: 100, unlocksAt: 30,lockedBy:"",cooldown:168},
          camping: {type:"timeline",title:"Camping Trip",desc:"Spend the night in any area considered nature on the Map.", xp: 50, unlocksAt: 35,lockedBy:"",cooldown:24},
          compost: {type:"log",title:"Composting",desc:"Log whether or not you've composted your food remains today.", xp: 10, unlocksAt: 40,lockedBy:"",cooldown:24},
          outdoor_project: {type:"timeline",title:"Outdoors Project",desc:"Imagine & create something outdoors. Let your imagination run wild!",xp: 150, unlocksAt: 40,lockedBy:"",cooldown:730},
          wildlife_park: {type:"camera",title:"Natural Parks",desc:"Spend time in any of this great nation's National Parks.", xp: 200, unlocksAt: 50,lockedBy:"",cooldown:168}
        },
        cooking: {
          make_meal: {type:"camera",title:"Cook a Meal",desc:"Cook a meal & label what it is. Snacks do not count.", xp: 5, unlocksAt: 0,lockedBy:"",cooldown:4},
          bake: {type:"camera",title:"Bake Something",desc:"Bake anything & label what it is.", xp: 5, unlocksAt: 2,lockedBy:"",cooldown:12},
          meal_prep: {type:"camera",title:"Meal Prep",desc:"Preparep meals for the upcoming week.", xp: 10, unlocksAt: 3,lockedBy:"",cooldown:168},
          picnic: {type:"camera",title:"Have a Picnic",desc:"Take time to enjoy your meal outdoors.", xp: 5, unlocksAt: 5,lockedBy:"",cooldown:24},
          upload_recipe: {type:"camera",title:"Family Recipe",desc:"Document a unique recipe to share with others.", xp: 10, unlocksAt: 10,lockedBy:"",cooldown:48},
          love_thy_neighbor: {type:"camera",title:"Love Thy Neighbor",desc:"Cook or Bake food and give it to your neighbors. Save a little for yourself.", xp: 100, unlocksAt: 15,lockedBy:"",cooldown:168},
          try_something_new:{type:"camera",title:"Changing Tastebuds",desc:"Try any food you have never tasted before.",xp:15,unlocksAt:20,lockedBy:"",cooldown:168},
          love_language:{type:"camera",title:"Universal Love Language",desc:"Prepare a meal for someone else.",xp:10,unlocksAt:25,lockedBy:"",cooldown:24},
          host_dinner: {type:"camera",title:"Host a Dinner Party",desc:"Host a dinner party for yourself and 4 other family or friends!", xp: 50, unlocksAt: 30,lockedBy:"",cooldown:168},
          holiday_feast: {type:"timeline",title:"Holiday Feast",desc:"Document the cooking process of a holiday meal for you and others. Recipes encouraged!", xp: 150, unlocksAt: 40,lockedBy:"",cooldown:730},
          cooking_class: {type:"timeline",title:"Cooking Class",desc:"Host or attend an in-person cooking class.", xp: 200, unlocksAt: 50,lockedBy:"",cooldown:730}
        },
        technology: {
          github_commit: {type:"log",title:"Git Commit",desc:"Log your newly commited code to a github repository.", xp: 5, unlocksAt: 0, lockedBy:"",cooldown:4},
          retro_tech: {type:"camera",title:"Retro Tech",desc:"Share a retro piece of technology you own or stumble across.", xp: 10, unlocksAt: 0, lockedBy:"",cooldown:24},
          electricity_work: {type:"camera",title:"Electricity Work",desc:"Work with live electricity in any capacity.", xp: 10, unlocksAt: 0,lockedBy:"" ,cooldown:24},
          build_3d_model: {type:"camera",title:"3D Model",desc:"Show off a 3D model you made.",xp : 5, unlocksAt: 2, lockedBy:"",cooldown:8},
          drone: {type:"camera",title:"Drone Pilot",desc:"Pilot one or many drones.",xp : 20, unlocksAt: 3, perDay: 1, lockedBy:"",cooldown:24},
          commit_open_src: {type:"log",title:"Open Source",desc:"Log your code commitment to an open-source github repository.", xp: 5, unlocksAt: 5, lockedBy:"",cooldown:4},
          threeD_printing: {type:"camera",title:"3D Print",desc:"3D print something and show the world!", xp: 15, unlocksAt: 10, lockedBy:"",cooldown:8},
          tech_tutorial: {type:"camera", title:"Tech Tutorial", desc:"Create a tech tutorial and upload to Youtube.", xp: 50, unlocksAt: 15, lockedBy:"",cooldown:168},
          raspberry_pi: {type:"camera", title:"Raspberry Pi", desc:"Create/Add To/Modify a Raspberry Pi Project", xp: 25, unlocksAt: 16, lockedBy:"",cooldown:72},
          build_app: {type:"timeline",title:"Computer Application",desc:"Create a basic computer program in any language.", xp: 50, unlocksAt: 20, lockedBy:"",cooldown:72},
          threeD_model_animation: {type:"camera",title:"3D Animation",desc:"Animate a 3D model that you created.",xp : 20, unlocksAt: 25, lockedBy:"",cooldown:24},
          robotics_project: {type:"timeline", title:"Arigato Mr Roboto", desc:"Build  and/or program a robot. Teams encouraged.", xp: 150, unlocksAt: 30, lockedBy:"",cooldown:730},
          leetcode_challenge: {type:"log",title:"LeetCode Challenge",desc:"Log about your algorithm that you wrote to solve a leetcode problem you haven't already completed.", xp: 25, unlocksAt: 40, lockedBy:"",cooldown:24},
          attend_tech_conference: {type:"timeline",title:"Tech Conference",desc:"Attend a tech conference of any kind. Must take picture of crowd.", xp: 250, unlocksAt: 50, lockedBy:"",cooldown:730},
          full_stack_app: {type:"timeline",title:"Full Stack App",desc:"Create and deploy a full stack application. HTTPS or App Store proof required.",xp : 200, unlocksAt: 50, lockedBy:"",cooldown:730},
        },
        games: {
          play_board_game: {type:"camera",title:"Tabletop Game",desc:"Play a board or card game with at least 2 other people.", xp: 5, unlocksAt: 0, lockedBy:"",cooldown:4},
          retro_gaming: {type:"camera",title:"Retro Gamer",desc:"Play a classic arcade style game. Bonus points if the game is in a cabinet!", xp: 10, unlocksAt: 0,lockedBy:"",cooldown:4},
          playtime_hour: {type:"log",title:"Video Game Playtime",desc:"Log about the video game(s) you've played today.", xp: 15, unlocksAt: 0, lockedBy:"",cooldown:24},
          sports_practice: { type:"camera",title:"Practice?",desc:"Train in anything that can be considered a physical sport.",xp: 5, unlocksAt: 2,lockedBy:"",cooldown:4},
          puzzle_master: {type:"timeline",title:"Puzzle Master",desc:"Complete a jigsaw puzzle with at least 500 pieces. Good company encouraged!", xp: 50, unlocksAt: 5,lockedBy:"",cooldown:168},
          trivia_night: {type:"camera",title:"Trivia Einsteins",desc:"Participate in a trivia contest.", xp: 25, unlocksAt: 10, lockedBy:"",cooldown:168},
          live_event: {type:"timeline",title:"Live Sports Event",desc:"Attend a sporting competition in real life. Must take picture of crowd.", xp: 100, unlocksAt: 10, lockedBy:"",cooldown:730},
          sports_match: {type:"timeline",title:"Sporting Match",desc:"Compete in anything that can be considered a physical sport.", xp: 30, unlocksAt: 10, lockedBy:"",cooldown:168},
          fishing_trip: {type:"camera",title:"Fishing Trip",desc:"Even when you don't catch a thing, you can share your trip here.", xp: 10, unlocksAt: 15, lockedBy:"",cooldown:72},
          game_achievement: {type:"log",title:"Video Game Achievement",desc:"Log about a video game achievement/trophy you unlocked today.", xp: 20, unlocksAt: 20, lockedBy:"",cooldown:4},
          sport_achievement: {type:"timeline",title:"Sporting Achievement",desc:"Share your trophy/medal that you earned in a sporting contest of any kind.", xp: 100, unlocksAt: 20, lockedBy:"",cooldown:168},
          stream_time: {type:"camera",title:"Stream Time",desc:"Steam yourself gaming! Make the post before you begin to invite others!", xp: 25, unlocksAt: 25, lockedBy:"",cooldown:24},
          tabletop_rpg: {type:"timeline",title:"Play a TTRPG",desc:"Play a tabletop roleplaying game like D&D, either in person or online.", xp: 30, unlocksAt: 30, lockedBy:"",cooldown:168},
          gotta_go_fast: {type:"timeline",title:"Got to Go Fast",desc:"Complete a speed-run of any game.", xp: 100, unlocksAt: 40, lockedBy:"",cooldown:168},
          tournament: {type:"timeline",title:"Tournament",desc:"Host a gaming or sporting tournament of any kind with 8 participants.", xp: 500, unlocksAt: 45, lockedBy:"",cooldown:730},
          full_completion: {type:"timeline",title:"100%'ing The Game",desc:"Achieve 100% of all achievements in any video game.", xp: 150, unlocksAt: 50,lockedBy:"",cooldown:168}
        },
        language: {
          daily_duolingo: {type:"log",title:"Daily Duo Lesson",desc:"Complete & log about your daily duolingo session. Sharing your streak is encouraged.", xp: 20, unlocksAt: 0,lockedBy:"",cooldown:24},
          daily_reading: {type:"log",title:"Daily Reading",desc:"Read at least one time today.",xp: 5, unlocksAt: 0, lockedBy:"",cooldown:24},
          journal:{type:"log",title:"JRL", desc:"Use ARL as your little daily journal. Switching the post to private is encouraged.", xp:10, unlocksAt:2,lockedBy:"",cooldown:24},
          language_exchange: {type:"camera",title:"Language Exchange",desc:"Attend and partake in a language exchange event.", xp: 20, unlocksAt: 5, lockedBy:"",cooldown:168},
          converse_foreign_language: {type:"log",title:"Foreign Language Conversation",desc:"Log about a conversation you had in your non-native language.", xp: 5, unlocksAt: 10, lockedBy:"",cooldown:48},
          tutor: {type:"camera",title:"Language Mentorship",desc:"Spend a decent amount of time helping someone learn their non-native language.", xp: 10, unlocksAt: 15, lockedBy:"",cooldown:168},
          watch_foreign_movie: {type:"camera",title:"Watch Foreign Movie",desc:"Watch a foreign movie.", xp: 25, unlocksAt: 20, lockedBy:"",cooldown:48},
          public_speaking: {type:"timeline",title:"Honored Speaker",desc:"Speak publicly before a crowd.", xp: 150, unlocksAt: 55, lockedBy:"",cooldown:168},
          read_foreign_book: {type:"log",title:"Read Foreign Book",desc:"Log about a book you are reading that is written in your non-native language.", xp: 10, unlocksAt: 30, lockedBy:"",cooldown:24},
          travel_foreign_country: {type:"timeline",title:"Travel to Foreign Country",desc:"Spread your wings! Share your travels with the world.", xp: 250, unlocksAt: 40, lockedBy:"",cooldown:730},
          record_speaking_language: {type:"timeline",title:"Tower of Babbel",desc:"Upload some videos of your foreign language skills for the world to hear!", xp: 50, unlocksAt: 50, lockedBy:"",cooldown:72},
        },
        humanity: {
          vote: {type:"camera",title:"Your Vote Matters",desc:"Cast your vote for an official Federal, State, County, or Municipal election. Voting is the fastest means of change.",xp: 1776, unlocksAt: 0, lockedBy:"electionDay",cooldown:730},
          meditation: {type:"log",title:"Meditation | Prayer",desc:"Sit still and listen.. Focus on breathing or communing with the Divine.",xp: 5, unlocksAt: 0, plockedBy:"",cooldown:4},
          create_art: {type:"camera",title:"Artist's Hand",desc:"Create your own art and upload it here for the world to enjoy.",xp: 20, unlocksAt: 0, lockedBy:"",cooldown:12},
          create_music: {type:"camera",title:"Making of the Music",desc:"Play & upload music you have created for the world to hear.",xp: 20, unlocksAt: 0, lockedBy:"",cooldown:12},
          donation: {type:"camera",title:"Second Handed",desc:"Donate clothing/homegoods/foodstuffs to any charitable organization.",xp: 50, unlocksAt: 2, lockedBy:"",cooldown:168},
          volunteer_event: {type:"camera",title:"Volunteering",desc:"Get out and give back to your community.", xp: 30, unlocksAt: 5, lockedBy:"",cooldown:168},
          attend_live_show: {type:"timeline",title:"Live Show",desc:"Attend a live show of any kind. Must take picture of crowd.", xp: 100, unlocksAt: 10,lockedBy:"",cooldown:730},
          blood_drive: {type:"camera",title:"Blood Drive",desc:"Give blood to a blood bank. Be sure to eat & stay hydrated!",xp: 100, unlocksAt: 15, lockedBy:"",cooldown:730},
          visit_museum: {type:"timeline",title:"Museum Day",desc:"Visit a museum of any kind.", xp: 40, unlocksAt: 20, perDay: 0, perWeek: 1, perMonth:0,lockedBy:"",cooldown:168 },
          attend_art_show: {type:"timeline",title:"Art Show",desc:"Attend an art show, and see if any art is worth your dollar.", xp: 50, unlocksAt: 25, lockedBy:"",cooldown:168},
          attend_church:{type:"camera",title:"Holy Day",desc:"Attend any religious gathering.",xp: 50, unlocksAt: 30, lockedBy:"",cooldown:168},
          maestro: {type:"timeline",title:"Artistic Instructor",desc:"Lead a class of at least 8 students in any form of artistic or spiritual instruction.", xp: 100, unlocksAt: 40,lockedBy:"",cooldown:168},
          organize_charity: {type:"timeline",title:"Organize Charity Work",desc:"Organize and accomplish charity work with 4+ people including yourself.", xp: 100, unlocksAt: 40,lockedBy:"",cooldown:730},
          present_talent: {type:"timeline",title:"Present Your Talent",desc:"Share your art at shows, comedy on a stage, etc. Any real life showing of your art counts!", xp: 200, unlocksAt: 50,lockedBy:"",cooldown:730}
        }
      })
    
      const [skillsList,setSkillsList] = useState({
        family:{order:0,title:"Family",color:"#ff0000",flare:"Calls - Visits - Reunions",level:99},
        friends:{order:1,title:"Friends",color:"#ff8400",flare:"Events - Meetups - Dates",level:12},
        fitness:{order:2,title:"Fitness",color:"#ffea00",flare:"Gyms - Runs - Routines",level:8},
        earthcraft:{order:3,title:"Earthcraft",color:"#4dff00",flare:"Plants - Animals - Outdoors",level:60},
        cooking:{order:4,title:"Cooking",color:"#00ff80",flare:"Recipes - Dieting - Baking",level:50},
        technology:{order:5,title:"Technology",color:"#00fffb",flare:"Code - Electronics - 3D",level:75},
        games:{order:6,title:"Games",color:"#0080ff",flare:"Tabletop - Video - Sports",level:15},
        language:{order:7,title:"Language",color:"#7700ff",flare:"Duolingo - Travel - Reading",level:10},
        humanity:{order:8,title:"Humanity",color:"#c800ff",flare:"Activism - Volunteering - Arts",level:20},
      });
    
      const [trophyData,setTrophyData] = useState({
        bronze:[
          {title:"Titan of Steel",progressQTY:21,imgPath:'../IconBin/TrophyPNG/goblet1.png',tier:"Bronze",desc:"Share 100 Go to The Gym experiences."},
          {title:"Fleetfooted Fanatic",progressQTY:100,imgPath:'../IconBin/TrophyPNG/gem1.png',tier:"Bronze",desc:"Share 100 Runner's High experiences."},
          {title:"Yoga Yogi",progressQTY:100, imgPath:'../IconBin/TrophyPNG/simple1.png', tier:"Bronze", desc:"Log 100 at home yoga posts."},
          {title:"Chef of the Year",progressQTY:365,imgPath:'../IconBin/TrophyPNG/star3.png',tier:"Bronze",desc:"Log 100 cooked meals or baked goods."},
          {title:"3D Modeling Maniac",progressQTY:1, imgPath:'../IconBin/TrophyPNG/simple4.png', tier:"Bronze", desc:"Create & Log 100 different 3D models, animations, or prints.",},
          {title:"Can't Pause This Game",progressQTY:30,imgPath:'../IconBin/TrophyPNG/gem5.png',tier:"Bronze",desc:"Log Steam playtime hours for 50 days consistently."},
          {title:"Book Worm",progressQTY:1,imgPath:'../IconBin/TrophyPNG/elegant4.png',tier:"Bronze",desc:"Log 100 Daily Reading experiences."},
          {title:"Gallery Guru",progressQTY:20, imgPath:'../IconBin/TrophyPNG/gem6.png', tier:"Bronze", desc:"Visit & Log in at 20 different art museums and galleries.",},
          {title:"Checking In",progressQTY:100, imgPath:'../IconBin/TrophyPNG/pedistal2.png', tier:"Bronze", desc:"Log 100 calls to close friends or loved ones.",},
          {title:"Game of Life",progressQTY:1,imgPath:'../IconBin/TrophyPNG/simple3.png',tier:"Bronze",desc:"Log 50 Tabletop Game experiences."},
          {title:"Hands of Bronze",progressQTY:10, imgPath:'../IconBin/TrophyPNG/gem7.png', tier:"Bronze", desc:"Share 20 Volunteering experiences.",},
          {title:"Stillness of Mind",progressQTY:1,imgPath:'../IconBin/TrophyPNG/star8.png',tier:"Bronze",desc:"Log 1,000 Mediatation | Prayer experiences."},
          {title:"Lost in Nature",progressQTY:50,imgPath:'../IconBin/TrophyPNG/goblet3.png',tier:"Bronze",desc:"Log 100 The Great Outdoors experiences."},
          {title:"Of The Earth",progressQTY:1,imgPath:'../IconBin/TrophyPNG/shield4.png',tier:"Bronze",desc:"Log 50 Fresh Food experiences."},
          {title:"Nature's Steward",progressQTY:100, imgPath:'../IconBin/TrophyPNG/person2.png', tier:"Bronze", desc:"Plant & Log 100 unique trees of any shape or size.",},
          {title:"Nature's Friend",progressQTY:30, imgPath:'../IconBin/TrophyPNG/person3.png', tier:"Bronze", desc:"Share 10 different camping trips.",},
        ],
        silver:[
          {title:"Golden Devotion",progressQTY:200,imgPath:'../IconBin/TrophyPNG/number1.png',tier:"Silver",desc:"Share 1,000 Fitness experiences"},
          {title:"Exercise Enthusiast",progressQTY:30,imgPath:'../IconBin/TrophyPNG/star1.png',tier:"Silver",desc:"Log 100 consecutive days of any Fitness experience."},
          {title:'Cooking Connoisseur',progressQTY:1000,imgPath:'../IconBin/TrophyPNG/simple3.png',tier:"Silver",desc:"Log 365 cooked meals or baked goods."},
          {title:"Code Crusader",progressQTY:1000,imgPath:'../IconBin/TrophyPNG/elegant3.png',tier:"Silver",desc:"Make & Log 1,000 contributions to Github tracked through ARL."},
          {title:"Curriculum Contributor",progressQTY:1,imgPath:'../IconBin/TrophyPNG/person4.png',tier:"Silver",desc:"Make, Upload & Log 100 Technology education videos."},
          {title:"Hard Work > Talent",progressQTY:50,imgPath:'../IconBin/TrophyPNG/simple5.png',tier:"Silver",desc:"Log 365 sports practice experiences."},
          {title:"The Grind",progressQTY:1000,imgPath:'../IconBin/TrophyPNG/gem4.png',tier:"Silver",desc:"Play & log 1,000 Steam playtime hours."},
          {title:"Social Butterfly",progressQTY:200, imgPath:'../IconBin/TrophyPNG/mirror2.png', tier:"Silver", desc:"Attend & Log in at 200 different social events or meetups. Family or Friends",},
          {title:"Civic Duty",progressQTY:1,imgPath:'../IconBin/TrophyPNG/steering1.png',tier:"Silver",desc:"Vote in 10 different elections!"},
          {title:"Life on The Road",progressQTY:1,imgPath:'../IconBin/TrophyPNG/star6.png',tier:"Silver",desc:"Complete a road-trip of at least 1,000 miles."},
          {title:"Eyes of Silver",progressQTY:50, imgPath:'../IconBin/TrophyPNG/star7.png', tier:"Silver", desc:"Create & Log 100 pieces of art or music that you have created.",},
          {title:"Finding Nature",progressQTY:200,imgPath:'../IconBin/TrophyPNG/star9.png',tier:"Silver",desc:"Log 365 The Great Outdoors experiences."},
          {title:"Nature's Agent",progressQTY:1,imgPath:'../IconBin/TrophyPNG/star9.png',tier:"Silver",desc:"Share 1,000 Nature's Lens experiences."},
          
        ],
        gold:[
          {title:"Sisyphus' Prized Work",progressQTY:1000,imgPath:'../IconBin/TrophyPNG/pedistal1.png',tier:"Gold",desc:"Accomplish peak performance in your specific field of Fitness, then log your story."},
          {title:"Mountain Climber",progressQTY:1000, imgPath:'../IconBin/TrophyPNG/gem2.png', tier:"Gold", desc:"Reach the summit of a significant peak and take a selfie with the elevation marker.",},
          {title:"Martial Master",progressQTY:1,imgPath:'../IconBin/TrophyPNG/elegant2.png',tier:"Gold",desc:"Place top 3 in a large martial arts contest. Log yourself with your trophy."},
          {title:"26.2",progressQTY:1, imgPath:'../IconBin/TrophyPNG/gem3.png', tier:"Gold", desc:"Run and complete a Marathon. Log yourself at the finish line."},
          {title:"Iron Chef",progressQTY:25,imgPath:'../IconBin/TrophyPNG/shield1.png',tier:"Gold",desc:"Win a trophy/award in a cooking competition."},
          {title:"Family Feast",progressQTY:1,imgPath:'../IconBin/TrophyPNG/star2.png',tier:"Gold",desc:"Host a holiday dinner with at least 12 family members in attendance."},
          {title:"Bearing FAANGs",progressQTY:1,imgPath:'../IconBin/TrophyPNG/star4.png',tier:"Gold",desc:"Make & Log an app for the iOS and Google Play store."},
          {title:"Digital Playground",progressQTY:1,imgPath:'../IconBin/TrophyPNG/gear.png',tier:"Gold",desc:"Develop & release your own game onto Steam, The Web, or both App Stores. Log the link."},
          {title:"Gotta Go Fast",progressQTY:1,imgPath:'../IconBin/TrophyPNG/number2.png',tier:"Gold",desc:'Claim and hold the world record speedrun in any video game.'},
          {title:"All Star",progressQTY:1,imgPath:'../IconBin/TrophyPNG/shield2.png',tier:"Gold",desc:"Win a trophy or large award from a sporting tournament."},
          {title:"Globe Trotter",progressQTY:10, imgPath:'../IconBin/TrophyPNG/simple6.png', tier:"Gold", desc:"Visit 4 different countries, and tell the story of each of them."},
          {title:"Family Reunion",progressQTY:1, imgPath:'../IconBin/TrophyPNG/star5.png', tier:"Gold", desc:"Share a family reunion with at least 25 family members.",},
          {title:"Voice of Gold",progressQTY:1,imgPath:'../IconBin/TrophyPNG/person1.png',tier:"Gold",desc:"Share your performance of any kind on a stage in front of an audience."},
          {title:"Decoration of Space",progressQTY:1,imgPath:'../IconBin/TrophyPNG/gem8.png',tier:"Gold",desc:"Display & Share a piece of physical art at a public art gallery."},
          {title:"One with Nature",progressQTY:1000,imgPath:'../IconBin/TrophyPNG/star10.png',tier:"Gold",desc:"Camp outside for 3 nights straight, and share your experience. Be safe!"},
          {title:"Butchers & Shepherds",progressQTY:1,imgPath:'../IconBin/TrophyPNG/shield3.png',tier:"Gold",desc:"Construct & Share your own animal livestock collection."},
        ],
      })

      
    const pushDataToFirestore = async(val:string) => {
        console.log("BEGINNING PUSH OF:", val)
        switch(val){
            case "levelScale":
                try {
                    await setDoc(doc(db,"gameRules/", "levelScale"), XPScale)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "skillsList":
                try {
                    await setDoc(doc(db,"gameRules/", "skillsList"), skillsList)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "trophyData":
                try {
                    await setDoc(doc(db,"gameRules/", "trophyData"), trophyData)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            case "experiencesList":
                try {
                    await setDoc(doc(db,"gameRules/", "experiencesList"), XPTriggerEvents)
                    .then(() => {
                        console.log("Post Success!");
                        // Go back to the root navigator
                        
                        })
                } catch(err){
                    console.error("Post failed to post",err)
                }
            break;
            default: console.warn("wtf")
        }
    }

    return(
    <View style={{...styles.defaultPageBackground,justifyContent:'space-evenly'}}>
        <TouchableOpacity onPress={()=>pushDataToFirestore("levelScale")} style={{width:"95%",height:60,backgroundColor:"#00ff00",borderRadius:5, padding:10,}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update XPScale</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("skillsList")} style={{width:"95%",height:60,backgroundColor:"#ffff00",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update skillsList</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("trophyData")} style={{width:"95%",height:60,backgroundColor:"#00ffff",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update trophyData</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>pushDataToFirestore("experiencesList")} style={{width:"95%",height:60,backgroundColor:"#ff00ff",borderRadius:5, padding:10}}>
            <Text style={{color:"#1c1c1c",fontSize:scaleFont(24)}}>Update XPTriggerEvents</Text>
        </TouchableOpacity>
    </View>
    )
}

export default AdminComponent