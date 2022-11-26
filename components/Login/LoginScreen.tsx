import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import style from "./style";
import useStarWars from "./useStarWars";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { RootStackScreenProps } from "../../types";

const LoginScreen = ({ navigation }: RootStackScreenProps<'LoginScreen'>) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const starWarsApi = useStarWars('https://swapi.dev/api/people/1');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShown, setIsShown] = useState(false);

    const handleShow = () => {
        setHidePassword(!hidePassword)
    }

    const handleLogin = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((usercredentials) => {
                const user = usercredentials.user;
                console.log(user.email);
            })
            .catch((err) => {
                alert(err.message)
            })
    }

useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        })
    },[])

    const seeCam = () => {
        if (hidePassword) {
            return <FontAwesome name='eye' onPress={handleShow} size={25}/>
        } else {
            return <FontAwesome name='eye-slash' onPress={handleShow} size={25}/>
        }
    }

    return(
        <View style={style.container}>
            { isLoggedIn ?
                <View>
                <View>
                <TextInput placeholder='Enter E-mail' style={style.email} onChangeText={val => setEmail(val)} />
                </View>
                <View>
                <View style={style.password}>
                    <TextInput placeholder='Enter password' style={{width: '90%'}} secureTextEntry={hidePassword} onChangeText={val => setPassword(val)}/>
                    {seeCam()}
                </View>
                </View>
                    <View style={style.buttonStyle}>
                <Button title={'Login'} color='#2196F3' onPress={handleLogin} />
                    </View>
                    <Text style={{color: '#2196F3', textAlign: 'center', paddingTop: 10}} onPress={() => navigation.replace('Register')}>
                    You have already an account?
                    </Text>
                    </View>
                :
                <View>
                    <Text>Hallo</Text>
                </View>
            }
        </View>
     )
};

export default LoginScreen;