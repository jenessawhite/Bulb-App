import { Platform } from 'react-native'

export default function api() {
  if (Platform.OS === 'android') {
    if (process.env.NODE_ENV !== "production") {
      return 'http://10.0.2.2:3001'
    // return 'http://192.168.1.11:3001'
  } else {
    return 'http://localhost:3001'
    }
  }
  else {
    if (process.env.NODE_ENV !== "production") {
      return 'http://localhost:3001';
    }
    return 'http://localhost:3001';
  }
}


// 192.168.1.11
