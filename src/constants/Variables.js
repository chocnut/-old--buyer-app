import Constants from "expo-constants";

const statusBarHeight = () => {
  // 44 - on iPhoneX
  return (Constants.platform.ios && Constants.statusBarHeight === 44) ? 33 : Constants.statusBarHeight
}

export default {
  statusBarHeight: statusBarHeight(),
  headerHeight: 64
}