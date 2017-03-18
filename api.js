import { Platform } from 'react-native'

export default function api() {
  if (process.env.NODE_ENV === "production") {
    return 'http://localhost:3001/api';
  } else {
    if(Platform.OS === 'android') {
      return 'http://10.0.2.2:3001/api'
    }
    return 'http://localhost:3001/api';
  }
}
