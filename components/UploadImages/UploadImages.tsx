import { Button, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { textColor } from '../../globalStyles';
const UploadImages = () => {
    // const storageRef = ref(storage);
    //
    // const imageRef = ref(storageRef, 'images');
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const toggleCameraType = () => {
        setType((current) =>
            current == CameraType.back ? CameraType.front : CameraType.back
        );
    };

    console.log(permission?.granted + ' permission');

    const startCamera = async () => {
        const abc = requestPermission();
        abc.then(() => {
            console.log('erlaubt');
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <Camera type={type} style={{ height: '100%' }}>
                <View>
                    <TouchableOpacity onPress={toggleCameraType}>
                        <Text
                            style={{
                                color: textColor(),
                                backgroundColor: 'red',
                                position: 'relative',
                                bottom: 0,
                            }}
                        >
                            Flip Camera
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={}>
                    <Text>Picture</Text>
                </TouchableOpacity>
            </Camera>
            <Button title={'hallo'} onPress={() => console.log('abc')}></Button>
        </View>
    );
};

export default UploadImages;
