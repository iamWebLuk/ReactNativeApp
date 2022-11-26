import React, {useEffect, useState} from 'react';
import {View, Text, Button} from "react-native";
import { RootStackScreenProps } from "../../types";
import { StackActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper';
import useStarWars from "../Login/useStarWars";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase";
import {FontAwesome} from "@expo/vector-icons";

const Register = ({ navigation: { goBack }}: RootStackScreenProps<'Register'>)  => {

    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isShown, setIsShown] = useState(false);


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


    const handleShow = () => {
        setHidePassword(!hidePassword)
    }

    const handlePassword = () => {
        return password === confirmPassword;
    }

    const handleShowPassword = () => {
       return setIsShown(!isShown);
    }

    const seeCam = () => {
        if (hidePassword) {
            return <FontAwesome name='eye' onPress={handleShow} size={25}/>
        } else {
            return <FontAwesome name='eye-slash' onPress={handleShow} size={25}/>
        }
    }

    return(
        <View>
            <Text>Abc</Text>
            <TextInput label={"Username eingeben"} value={userName} onChangeText={text => {
                setUserName(text)
                console.log(userName)
            }}/>
            <TextInput label={"Vorname eingeben"} value={firstName} onChangeText={text => {
                setFirstName(text)
                console.log(firstName)
            }}/>
            <TextInput label={"Nachname eingeben"} value={lastName} onChangeText={text => {
                setLastName(text)
                console.log(lastName)
            }}/>
            <View style={{
                        borderColor: 'grey',
                        borderWidth: 1,
                        padding: 10,
                        flexDirection: 'row',
                        alignItems: 'baseline',
                        alignSelf: 'stretch',
                        height: 60,}}>
                <View style={{flexDirection: 'row'}}>
            <TextInput label={"Passwort eingeben"} style={{ width:'90%' }} value={password} secureTextEntry={isShown} onChangeText={text => {
                setPassword(text)
                console.log(password)
            }}/>
                {seeCam()}
                </View>
            </View>
            <TextInput label={"Passwort erneut eingeben"} value={confirmPassword} onChangeText={text => {
                setConfirmpassword(text)
                console.log(confirmPassword)
            }}/>
            <Button title={"Register"} onPress={handleLogin}/>
            <Button title={'Go back'} onPress={() => navigation.navigate('Root')} />
        </View>
     )
};

export default Register;