import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { RootStackScreenProps } from '../../types';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Provider } from 'react-native-paper';
import useStarWars from '../Login/useStarWars';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { FontAwesome } from '@expo/vector-icons';
import style from '../Register/style';

const Register = ({
    navigation: { goBack },
}: RootStackScreenProps<'Register'>) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (handlePassword()) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((usercredentials) => {
                    auth.signOut().then(() => {});
                    const user = usercredentials.user;
                    console.log(user.email);
                })
                .catch((err) => {
                    alert(err.message);
                });
        } else {
            alert('Password must be the same');
        }
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

    const handleShow = () => {
        setHidePassword(!hidePassword);
    };

    const handlePassword = () => {
        return password === confirmPassword;
    };

    const showIcon = () => {
        if (hidePassword) {
            return 'eye';
        } else {
            return 'eye-off';
        }
    };

    return (
        // <View style={style.container}>
        <Provider>
            <TextInput
                placeholder={'Email eingeben'}
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    console.log(email);
                }}
            />
            <TextInput
                label={'Passwort eingeben'}
                value={password}
                secureTextEntry={hidePassword}
                onChangeText={(text) => {
                    setPassword(text);
                    console.log(password);
                }}
                right={
                    <TextInput.Icon
                        icon={showIcon()}
                        onPress={() =>
                            console.log(setHidePassword(!hidePassword))
                        }
                    />
                }
            />
            <TextInput
                label={'Passwort erneut eingeben'}
                value={confirmPassword}
                secureTextEntry={hidePassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    console.log(password);
                }}
            />
            <Button title={'Register'} onPress={handleLogin} />
            {/*</View>*/}
        </Provider>
    );
};

export default Register;
