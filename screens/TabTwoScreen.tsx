import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Dot from '../components/UploadImages/Dot';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

export default function TabTwoScreen() {
    const [data, setData] = useState<DocumentData>([]);

    useEffect(
        () =>
            onSnapshot(collection(db, 'colors'), (snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            }),
        []
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
            {data.map((color: any) => {
                return (
                    <View nativeID={color.id}>
                        <Dot color={color.value} />
                        <View>{color.name}</View>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
