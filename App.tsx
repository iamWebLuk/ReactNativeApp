import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, UserInfo } from 'firebase/auth';
import firebase from 'firebase/compat';

interface UserContextProps {
    user: UserInfo | null;
}

export const UserContext = createContext<UserContextProps>({ user: null });
export const useUser = () => useContext(UserContext);
export default function App() {
    const isLoadingComplete = useCachedResources();

    const colorScheme = useColorScheme();

    const [user, setUser] = useState<UserInfo | null>({
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        providerId: '',
        uid: '',
    });

    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUser(user);
                console.log(user);
                console.log('this is the user ^');
            }
        });
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <UserContext.Provider value={{ user }}>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </UserContext.Provider>
            </SafeAreaProvider>
        );
    }
}
