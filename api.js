export default function api() {
  if (process.env.NODE_ENV === "production") {
    return 'http://localhost:3001/api';
  } else {
   return 'http://localhost:3001/api';
  }
}
