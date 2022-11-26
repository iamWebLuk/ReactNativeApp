import { StyleSheet } from 'react-native';
const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '50%',
    },
    email: {
        borderColor: 'grey',
        borderRadius: 1,
        borderWidth: 1,
        padding: 10,
        height: 60,
    },
    password: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'baseline',
        alignSelf: 'stretch',
        height: 60,
    },
    inputBorder: {
        // border: '1px solid black',
        // border
        // border: '1px solid black',
        borderWidth: 1,
        borderColor: 'red',
    },
    buttonStyle : {
      // backgroundColor: 'green',
      color: 'white',
      marginTop: 50,
    },
})

export default style;