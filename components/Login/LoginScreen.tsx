import React, {useEffect, useState} from 'react';
import {Button, View, Text} from "react-native";
import style from "./style";
import useStarWars from "./useStarWars";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {RootStackScreenProps} from "../../types";
import {Snackbar, TextInput} from 'react-native-paper';

const LoginScreen = ({navigation}: RootStackScreenProps<'LoginScreen'>) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const starWarsApi = useStarWars('https://swapi.dev/api/people/1');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const [isWrongPassword, setIsWrongPasswort] = useState(false)
    const [visible, setVisible] = useState(false);

    const handleShow = () => {
        setHidePassword(!hidePassword)
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsWrongPasswort(false)
                setVisible(false);
                // alert("you are now logged in")
            })
            .catch((err) => {
                // const errorMessage = err.message;
                // alert(errorMessage);
                setIsWrongPasswort(true)
                setVisible(true);
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
    }, [])

    const signOut = () => {
        auth.signOut();
    }

    const showIcon = () => {
        if (hidePassword) {
            return 'eye';
        } else {
            return 'eye-off';
        }
    }

    return (
        <View>
            <Snackbar wrapperStyle={{top: 0}} style={{backgroundColor: '#f8d7da', color: '#721c24'}} visible={visible}
                      onDismiss={() => {
                          setVisible(false)
                      }} action={{
                label: 'undo', onPress: () => {
                    setVisible(true)
                }
            }} theme={{colors: {accent: '#721c24'}}}>
                Wrong E-Mail or Password!
            </Snackbar>
            {!isLoggedIn ?

                <View style={style.container}>

                    <TextInput placeholder='Enter E-mail' style={style.textField} onChangeText={val => setEmail(val)}/>
                    <TextInput style={style.textField}
                               label={'Enter password'}
                               secureTextEntry={hidePassword}
                               onChangeText={val => setPassword(val)}
                               right={<TextInput.Icon icon={showIcon()}
                                                      onPress={() => console.log(setHidePassword(!hidePassword))}/>}
                    />
                    <View style={style.buttonStyle}>
                        <Button title={'Login'} color='#2196F3' onPress={handleLogin}/>
                    </View>
                    <Text style={{color: '#2196F3', textAlign: 'center', paddingTop: 10}}
                          onPress={() => navigation.replace('Register')}>
                        Don't have an account?
                    </Text>

                </View>
                :
                <View>
                    <Text>Hallo {email}</Text>
                    <Button title={'Log Out'} onPress={signOut}/>
                </View>
            }
        </View>
    )
};

export default LoginScreen;