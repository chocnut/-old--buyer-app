import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      position: 'relative'
    },
    flatList: {
      paddingHorizontal: 9,
      paddingTop: 14,
      paddingBottom: 50
    },
    getStartedText: {
      fontSize: 18,
      fontFamily: 'QuicksandMedium',
      color: colors.graphite,
      textAlign: 'center',
      marginTop: 100
    },
    addBtn: {
      width: 56,
      height: 56,
      position: 'absolute',
      bottom: 30,
      right: 20,
      zIndex: 1,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',shadowColor: "#555064",
      shadowOffset: {
          width: 0,
          height: 0,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      borderRadius: 28,
      backgroundColor: colors.red
    },
    plus: {
      width: 22,
      height: 22
    }
  });
