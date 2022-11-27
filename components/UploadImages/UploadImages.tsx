import { getStorage, ref } from 'firebase/storage';
import { storage } from '../../firebase';

const storageRef = ref(storage);

const imageRef = ref(storageRef, 'images');
