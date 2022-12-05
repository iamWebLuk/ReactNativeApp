import {
    Button,
    Pressable,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import {} from 'expo';
import { useState, useRef, useEffect } from 'react';
import { textColor } from '../../globalStyles';
import style from './style';
import * as ImagePicker from 'expo-image-picker';

const UploadImages = () => {
    // const storageRef = ref(storage);
    //
    // const imageRef = ref(storageRef, 'images');
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [image, setImage] = useState('');
    const cameraRef = useRef();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('result = ' + result.assets?.[0].uri);
        console.log('result.canceled = ' + !result.canceled);
        if (!result.assets?.[0].uri === null) return;
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        console.log('iamge = ' + image);
    };

    useEffect(() => {
        (async () => {
            const cameraPermission =
                await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission =
                await Camera.requestCameraPermissionsAsync();
        })();
    }, []);

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

    // const takeAPicture = async () => {
    //     if (camera) {
    //         const data = await camera.takePictureAsync(null);
    //         setImage(data.uri);
    //     }
    // };

    return (
        // <View style={{ backgroundColor: 'white', height: '100%' }}>
        <View>
            {/*<Camera type={type} style={{ height: '100%' }}>*/}
            {/*    <View>*/}
            {/*        <TouchableOpacity onPress={toggleCameraType}>*/}
            {/*            <Text*/}
            {/*                style={{*/}
            {/*                    color: textColor(),*/}
            {/*                    backgroundColor: 'red',*/}
            {/*                    position: 'relative',*/}
            {/*                    bottom: 0,*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                Flip Camera*/}
            {/*            </Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*    <TouchableOpacity onPress={startCamera}>*/}
            {/*        <Text>Picture</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*    <Pressable onPress={startCamera}>*/}
            {/*        <Text*/}
            {/*            style={{*/}
            {/*                color: textColor(),*/}
            {/*                backgroundColor: 'red',*/}
            {/*                position: 'absolute',*/}
            {/*                top: 50,*/}
            {/*                left: 50,*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Test*/}
            {/*        </Text>*/}
            {/*    </Pressable>*/}
            {/*</Camera>*/}
            <Button title={'pick an iamge'} onPress={pickImage} />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{ marginTop: '30%', width: '100%', aspectRatio: 1 }}
                />
            )}
        </View>
    );
};

export default UploadImages;
