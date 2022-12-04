import { StyleSheet } from 'react-native';

const style = (color: string) =>
    StyleSheet.create({
        dot: {
            display: 'flex',
            flexDirection: 'row',
            margin: 10,
            height: 25,
            width: 25,
            backgroundColor: color,
            borderRadius: 50,
        },
    });

export default style;
