// leave off @2x/@3x
const images = {
  logo: require('../Images/logo.png'),
  logoDark: require('../Images/logo.png'),
  clearLogo: require('../Images/logo.png'),
  launch: require('../Images/launch-icon.png'),
  ready: require('../Images/logo.png'),
  ignite: require('../Images/logo.png'),
  igniteClear: require('../Images/logo.png'),
  tileBg: require('../Images/tile_bg.png'),
  background: require('../Images/BG.png'),
  buttonBackground: require('../Images/button-bg.png'),
  api: require('../Images/Icons/icon-api-testing.png'),
  components: require('../Images/Icons/icon-components.png'),
  deviceInfo: require('../Images/Icons/icon-device-information.png'),
  faq: require('../Images/Icons/faq-icon.png'),
  home: require('../Images/Icons/icon-home.png'),
  theme: require('../Images/Icons/icon-theme.png'),
  usageExamples: require('../Images/Icons/icon-usage-examples.png'),
  chevronRight: require('../Images/Icons/chevron-right.png'),
  hamburger: require('../Images/Icons/hamburger.png'),
  backButton: require('../Images/Icons/back-button.png'),
  closeButton: require('../Images/Icons/close-button.png'),
  plusIcon: require('../Images/assets/Plus_icon_white.png'),
  plusIconBlue: require('../Images/assets/Plus_icon_blue.png'),
  // Getting Started
  stepsScale: require('../Images/assets/Steps_scale.png'),
  stepsOrange: require('../Images/assets/Steps_orange.png'),
  stepsOrangeActive: require('../Images/assets/Steps_orange_active.png'),
  stepsBlue: require('../Images/assets/Steps_blue.png'),
  stepsBlueActive: require('../Images/assets/Steps_blue_active.png'),
  stepsPurple: require('../Images/assets/Steps_purple.png'),
  stepsPurpleActive: require('../Images/assets/Steps_purple_active.png'),
  stepsGray: require('../Images/assets/Steps_gray.png'),
  checkboxNormal: require('../Images/assets/Checkbox_normal.png'),
  checkboxActive: require('../Images/assets/Checkbox_active.png'),
  key: require('../Images/assets/Key_icon.png'),

  // Routine Player
  playButton: {
    morning: require('../Images/assets/Play_btn_morning.png'),
    day: require('../Images/assets/Play_btn_day.png'),
    evening: require('../Images/assets/Play_btn_night.png')
  },
  pauseButton: {
    morning: require('../Images/assets/Pause_btn_morning.png'),
    day: require('../Images/assets/Pause_btn_day.png'),
    night: require('../Images/assets/Pause_btn_night.png')
  },
  prevButton: {
    morning: require('../Images/assets/Prev_btn_morning.png'),
    day: require('../Images/assets/Prev_btn_day.png'),
    night: require('../Images/assets/Prev_btn_night.png')
  },
  nextButton: {
    morning: require('../Images/assets/Next_btn_morning.png'),
    day: require('../Images/assets/Next_btn_day.png'),
    night: require('../Images/assets/Next_btn_evening.png')
  },
  // settingsButtons
  acceptedIcon: require('../Images/assets/Accepted_icon.png'),
  declinedIcon: require('../Images/assets/Declined_icon.png'),
  // Badges
  badges: { // TODO - Get it from CMS
    yogaMaster: {
      locked: require('../Images/assets/badge.png'),
      unlocked: require('../Images/assets/badge_inactive.png')
    }
  },
  badge: require('../Images/assets/badge.png'),

  // Home
  homeInactive: {
    morning: require('../Images/assets/Time_morning.png'),
    day: require('../Images/assets/Time_day.png'),
    night: require('../Images/assets/Time_night.png')
  },
  homeActive: {
    morning: require('../Images/assets/Time_morning_active.png'),
    day: require('../Images/assets/Time_day_active.png'),
    night: require('../Images/assets/Time_night_active.png')
  },
  homeCenter: {
    morning: require('../Images/assets/Morning_pic.png'),
    day: require('../Images/assets/Day_pic.png'),
    night: require('../Images/assets/Night_pic.png')

  },
  homePlay: {
    morning: require('../Images/assets/Morning_pic.png'),
    day: require('../Images/assets/Day_pic.png'),
    night: require('../Images/assets/Night_pic.png')
  },
  arrowDown: {
    morning: require('../Images/assets/Arrow_orange.png'),
    day: require('../Images/assets/Arrow_blue.png'),
    night: require('../Images/assets/Arrow_purple.png')
  },
  arrowUp: {
    morning: require('../Images/assets/Arrow_up_orange.png'),
    day: require('../Images/assets/Arrow_up_blue.png'),
    night: require('../Images/assets/Arrow_up_purple.png')
  },
  FAQ: {
    accounts: require('../Images/assets/Account_icon.png'),
    subscription: require('../Images/assets/Subscription_icon.png'),
    routines: require('../Images/assets/Routines_icon.png'),
    discovery: require('../Images/assets/Discovery_icon.png'),
    progress: require('../Images/assets/Progress_icon.png')
  },
  
  // Bottom Nav
  homeIcon: require('../Images/assets/Tabbar_home_icon.png'),
  discoveryIcon: require('../Images/assets/Tabbar_discovery_icon.png'),
  ifThenIcon: require('../Images/assets/Tabbar_if-then_icon.png'),
  myRoutinesIcon: require('../Images/assets/Tabbar_my_routines_icon.png'),
  moreIcon: require('../Images/assets/Tabbar_more_icon.png'),

  homeIconActive: require('../Images/assets/Tabbar_home_icon_active.png'),
  discoveryIconActive: require('../Images/assets/Tabbar_discovery_icon_active.png'),
  ifThenIconActive: require('../Images/assets/Tabbar_if-then_icon_active.png'),
  myRoutinesIconActive: require('../Images/assets/Tabbar_my_routines_icon_active.png'),
  moreIconActive: require('../Images/assets/Tabbar_more_icon_active.png'),

  // CustomNavBar
  shareIcon: require('../Images/assets/Share_icon_white.png'),
  editIcon: require('../Images/assets/Edit_icon_white.png'),
  audioIcon: require('../Images/assets/Audio_icon.png'),
  editIconDark: require('../Images/assets/Edit_icon_dark.png'),
  shareIconDark: require('../Images/assets/Share_icon_dark.png'),

  // ElementDetailsComponent
  playButtonElement: {
    morning: require('../Images/assets/Play_btn_morning_mid.png'),
    day: require('../Images/assets/Play_btn_day_mid.png'),
    night: require('../Images/assets/Play_btn_night_mid.png')
  },
  timeIcon: {
    morning: require('../Images/assets/Time_morning_icon.png'),
    day: require('../Images/assets/Time_day_icon.png'),
    night: require('../Images/assets/Time_night_icon.png')
  },
  // Routine Builder
  timeButton: {
    morning: require('../Images/assets/Time_morning_active.png'),
    day: require('../Images/assets/Time_day_active.png'),
    evening: require('../Images/assets/Time_night_active.png')
  },
  createRoutineImage: {
    morning: require('../Images/assets/Morning_pic.png'),
    day: require('../Images/assets/Day_pic.png'),
    evening: require('../Images/assets/Night_pic.png')
  },
  createroutinetimeButton: {
    morning: require('../Images/assets/Time_morning_active.png'),
    day: require('../Images/assets/Time_day_active.png'),
    evening: require('../Images/assets/Time_night_active.png')
  },
  settingsButtons: {
    morning: require('../Images/assets/Time_morning_icon.png'),
    day: require('../Images/assets/Time_day_icon.png'),
    night: require('../Images/assets/Time_night_icon.png')
  },
  checkplayer: {
    morning: require('../Images/assets/Check_player_orange.png'),
    day: require('../Images/assets/Check_player_blue.png'),
    night: require('../Images/assets/Check_player_purple.png')
  },
  checkplayerMain: {
    morning: require('../Images/assets/Check_main_morning.png'),
    day: require('../Images/assets/Check_main_day.png'),
    night: require('../Images/assets/Check_main_night.png')
  },
  playIcon: {
    morning: require('../Images/assets/Play_icon_orange.png'),
    day: require('../Images/assets/Play_icon_blue.png'),
    night: require('../Images/assets/Play_icon_purple.png')
  },
  PickPlayIcon: require('../Images/assets/Play_icon_white.png'),
  EditIconSmall: require('../Images/assets/Edit_icon_small.png'),
  SearchIconSmall: require('../Images/assets/Search_loupe_dark.png'),
  // element categories
  videoIcon: require('../Images/assets/Video_icon.png'),
  day_pic_small: require('../Images/assets/Day_pic_mid.png'),
  // Scheduling elements
  CheckMarkBlue: require('../Images/assets/Tick_icon_blue.png'),
  Deletebtn: require('../Images/assets/Delete_btn.png'),
  HeartInactiveCategories: require('../Images/assets/Heart_icon.png'),
  HeartActiveCategories: require('../Images/assets/Heart_icon_active.png'),
  HeartActiveSmall: require('../Images/assets/Heart_icon_active_small.png'),
  // Discovery
  Top20pic: require('../Images/assets/Top20_pic.png'),
  Top20Bigpic: require('../Images/assets/Top20_big_pic.png'),
  FamousPeople: require('../Images/assets/Famous_people_pic.png'),
  FamousPeopleBig: require('../Images/assets/Famous_people_big_pic.png'),
  backgrTop20: require('../Images/backgroundImg/Top_20_Routine_bck.png'),
  backgrFamous: require('../Images/backgroundImg/Famous_people_bck.png'),
  FilterIcon: require('../Images/assets/Filter_icon_white.png'),
  FilterIconDark: require('../Images/assets/Filter_icon_dark.png'),
  Searchloupe: require('../Images/assets/Search_loupe_white.png'),
  People: require('../Images/assets/Avatar_placeholder.png'),
  BackgroundMeditation: require('../Images/backgroundImg/Meditation_bck.png'),
  FeaturedstarIcon: require('../Images/assets/Featured_star_icon.png'),
  Clear_icon: require('../Images/assets/Clear_icon.png'),
  UserIconStatus: require('../Images/assets/User_icon.png'),
  FacebookProgress: require('../Images/assets/Facebook_icon.png'),
  ContactsProgress: require('../Images/assets/Contacts_icon.png'),
  Link_icon: require('../Images/assets/Link_icon.png'),
  Star_icon: require('../Images/assets/Star_icon.png'),
  Paper_plane_icon: require('../Images/assets/Paper_plane_icon.png'),
  crossWhite: require('../Images/assets/Cross_white.png'),
  crossGrey: require('../Images/assets/Cross_dark.png'),
  Backtomainicon: require('../Images/assets/Back_to_main_icon.png'),
  premiumIcon: require('../Images/assets/Premium_icon.png'),
  Notificationsicon: require('../Images/assets/Notifications_icon.png'),
  settingsbg: require('../Images/backgroundImg/Top_20_Routine_bck.png'),
  crownIcon: require('../Images/assets/Crown_icon.png'),
  premiumTickPurple: require('../Images/assets/Tick_icon_purple.png'),
  premiumTickBlue: require('../Images/assets/Tick_icon_blue.png'),
  numberCircle: require('../Images/assets/Number_dark.png'),
  Completedstatus: require('../Images/assets/Completed_status.png'),
  DetailsPlayIcon: {
    morning: require('../Images/assets/Equalizer_orange.png'),
    day: require('../Images/assets/Equalizer_blue.png'),
    night: require('../Images/assets/Equalizer_purple.png')
  }
}
export default images
