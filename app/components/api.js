import { Platform } from 'react-native'

export default function api() {
  if (Platform.OS === 'android') {
    if (process.env.NODE_ENV !== "production") {
      return 'http://10.0.2.2:3001'
  } else {
    return 'https://server-bgpgdhhnkb.now.sh'
    }
  }
  else {
    if (process.env.NODE_ENV !== "production") {
      return 'http://localhost:3001';
    }
    return 'https://server-bgpgdhhnkb.now.sh';
  }
}
