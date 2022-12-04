import React from 'react';
import { Button, Text, View } from 'react-native';
import style from './style';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

interface DotProps {
    color: string;
}

const Dot = ({ color }: DotProps) => {
    // const querySnapshot = await getDocs(collection(db, 'colors'));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    // });

    return (
        <View>
            <span style={style(color).dot} />
        </View>
    );
};

export default Dot;
