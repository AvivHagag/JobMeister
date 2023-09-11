import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import{getAuth, onAuthStateChanged } from 'firebase/auth'

import {} from './main' 
import {} from './index' 


    
const firebaseConfig = {
  apiKey: "AIzaSyDoC94Xlt0BHfsH_zLp8562xsKMW49mv8s",
  authDomain: "job-meister.firebaseapp.com",
  projectId: "job-meister",
  storageBucket: "job-meister.appspot.com",
  messagingSenderId: "51579629977",
  appId: "1:51579629977:web:eae8590655f4e102e2e308",
  measurementId: "G-W33GWTB6JB"
};

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore(app);
const auth = getAuth();

// collection ref
const colRef = collection(db,'Data');
const docAllusers = collection(db, "users");
let logEmail;
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    logEmail = user.email;
    let usernumber;
      getDocs(docAllusers).then((snapshot) => {
        let allUsers = []
        snapshot.docs.forEach((doc)=>{
          allUsers.push({...doc.data(), id:doc.id })
        })
        let userq=allUsers.length;
        for (let index = 0; index < userq; index++) {
          if(allUsers[index].email==logEmail)
              usernumber=index;
           }
        if(allUsers[usernumber].eOrS=="Work Searcher") {
          location.href="worksearcher.html"
         }
        else if(allUsers[usernumber].eOrS=="Employer") {
          location.href="employeer.html"
         }
        else if(allUsers[usernumber].eOrS==null) {
          location.href="admin.html"
       }
      })
  }
});