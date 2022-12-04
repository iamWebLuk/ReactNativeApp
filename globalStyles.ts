import { Appearance } from 'react-native';

export const colorSchema = Appearance.getColorScheme();

export const textColor = () => {
    if (colorSchema === 'light') {
        return 'black';
    } else {
        return 'white';
    }
};
