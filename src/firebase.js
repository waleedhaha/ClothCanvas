
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBkdY9UfOGkV_MDmzVSFPpP7-sQ-3qOSn8",
  authDomain: "virtual-wardrobe-af61d.firebaseapp.com",
  projectId: "virtual-wardrobe-af61d",
  storageBucket: "virtual-wardrobe-af61d.appspot.com",
  messagingSenderId: "361426845991",
  appId: "1:361426845991:web:35c540861d0efbf04fe902",
  measurementId: "G-GMHDG6GWDT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);