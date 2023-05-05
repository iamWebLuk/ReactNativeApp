import React, { useContext, useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import style from './style';
import useStarWars from './useStarWars';
import { signInWithEmailAndPassword, UserInfo } from 'firebase/auth';
import { auth } from '../../firebase';
import { RootStackScreenProps } from '../../types';
import { Snackbar, TextInput, Provider } from 'react-native-paper';
import { UserContext, useUser } from '../../App';
import firebase from 'firebase/compat';

const LoginScreen = ({ navigation }: RootStackScreenProps<'LoginScreen'>) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const starWarsApi = useStarWars('https://swapi.dev/api/people/1');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);

    const user = useUser().user;

    console.log('++++');
    console.log(user);
    console.log('++++');

    const handleShow = () => {
        setHidePassword(!hidePassword);
    };

    console.log('email: ' + email);

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setIsPasswordWrong(false);
                // alert("you are now logged in")
            })
            .catch((err) => {
                // const errorMessage = err.message;
                // alert(errorMessage);
                setIsPasswordWrong(true);
            });
    };

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);

    const signOut = () => {
        auth.signOut();
    };

    const showIcon = () => {
        if (hidePassword) {
            return 'eye';
        } else {
            return 'eye-off';
        }
    };

    return (
        <Provider>
            <Snackbar
                wrapperStyle={{ top: 0 }}
                style={{
                    backgroundColor: '#f8d7da',
                }}
                visible={isPasswordWrong}
                onDismiss={() => {
                    setIsPasswordWrong(false);
                }}
                action={{
                    label: 'undo',
                    onPress: () => {
                        setIsPasswordWrong(true);
                    },
                }}
                theme={{ colors: { accent: '#721c24', text: '#721c24' } }}
            >
                Wrong E-Mail or Password!
            </Snackbar>
            {!isLoggedIn ? (
                <View style={style.container}>
                    <TextInput
                        placeholder="Enter E-mail"
                        onChangeText={(val) => setEmail(val)}
                    />
                    <TextInput
                        label={'Enter password'}
                        secureTextEntry={hidePassword}
                        onChangeText={(val) => setPassword(val)}
                        right={
                            <TextInput.Icon
                                icon={showIcon()}
                                onPress={() =>
                                    console.log(setHidePassword(!hidePassword))
                                }
                            />
                        }
                    />
                    <View style={style.buttonStyle}>
                        <Button
                            title={'Login'}
                            color="#2196F3"
                            onPress={handleLogin}
                        />
                    </View>
                    <Text
                        style={{
                            color: '#2196F3',
                            textAlign: 'center',
                            paddingTop: 100,
                        }}
                        // onPress={() => navigation.replace('Register')}
                        onPress={() => navigation.push('Register')}
                    >
                        Don't have an account?
                    </Text>
                </View>
            ) : (
                <View>
                    <Text>Hallo {email}</Text>
                    <Button title={'Log Out'} onPress={signOut} />
                </View>
            )}
        </Provider>
    );
};

export default LoginScreen;
