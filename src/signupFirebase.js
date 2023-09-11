import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import{getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
// import {} from './signup'
    
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

// collection ref

// const colRef = collection(db,'Data');
const auth = getAuth();


// sign up
const signUpForm = document.querySelector('.Fsignup')
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()
const email = signUpForm.email.value
const password = signUpForm.password.value
const firstname = signUpForm.firstname.value
const lastname = signUpForm.lastname.value
const EmployerOrSearcher = signUpForm.EmployerOr.value
const passwordlength=password.length;
if(firstname!="" && lastname!="" && email!="" && password!="" && passwordlength>=6) {
  document.querySelector("#msg1").innerHTML="";
  document.querySelector("#msg2").innerHTML="";
  document.querySelector("#msg3").innerHTML="";
  document.querySelector("#msg4").innerHTML="";

    if(EmployerOrSearcher == '1') {
      document.querySelector("#msg5").innerHTML="";
      var Company = signUpForm.Company.value
      var eOrS = "Employer"
      if(Company!="") {
        document.querySelector("#msg6").innerHTML="";
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          // Signed in 
          const user = cred.user;
          addDoc(collection(db, "users" ), { firstname ,lastname,email,password,Company,eOrS});
          alert("משתמש נרשם בהצלחה!");
          signUpForm.reset();
        });
      }
      else {
        document.querySelector("#msg6").innerHTML="אנא הכנס שם חברה";
      }
    }

    else if(EmployerOrSearcher == '2') {
      document.querySelector("#msg5").innerHTML="";
      var age = signUpForm.age.value
      var gender = signUpForm.gender.value
      var Occ = signUpForm.MainOcc.value
      if(age!="" && gender!="" && Occ!="") {
      document.querySelector("#msg7").innerHTML="";
      document.querySelector("#msg8").innerHTML="";
      document.querySelector("#msg9").innerHTML="";
      var eOrS = "Work Searcher"
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          // Signed in 
          const user = cred.user;
          addDoc(collection(db, "users" ),{ firstname ,lastname,email,password,age,gender,Occ,eOrS});
          alert("משתמש נרשם בהצלחה!");
          signUpForm.reset();
        })
      }
      else {
          if(age=="") {
            document.querySelector("#msg7").innerHTML="אנא הכנס גיל";
          }
          else if(gender=="") {
            document.querySelector("#msg7").innerHTML="";
            document.querySelector("#msg8").innerHTML="אנא בחר מין";
          }
          else {
            document.querySelector("#msg7").innerHTML="";
            document.querySelector("#msg8").innerHTML="";
            document.querySelector("#msg9").innerHTML="אנא בחר תחום עיסוק עיקרי";
          }
        }
      }
    else {
    document.querySelector("#msg5").innerHTML="בחר סוג משתמש";
    }
}
else {
  if(firstname=="") {
    document.querySelector("#msg1").innerHTML="אנא הכנס שם פרטי";
  }
  else if(lastname=="") {
    document.querySelector("#msg1").innerHTML="";
    document.querySelector("#msg2").innerHTML="אנא הכנס שם משפחה";
  }
  else if(email=="") {
    document.querySelector("#msg1").innerHTML="";
    document.querySelector("#msg2").innerHTML="";
    document.querySelector("#msg3").innerHTML="אנא הכנס כתובת מייל";
  }
  else if(password=="") {
    document.querySelector("#msg1").innerHTML="";
    document.querySelector("#msg2").innerHTML="";
    document.querySelector("#msg3").innerHTML="";
    document.querySelector("#msg4").innerHTML="אנא הכנס סיסמא";
  }
  else if(passwordlength<6) {
      document.querySelector("#msg4").innerHTML="אורך הסיסמא אמור להיות מעל 6 תווים";
  }
}
})

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

// Spinner
var spinner = function () {
  setTimeout(function () {
    if ($("#spinner").length > 0) {
      $("#spinner").removeClass("show");
    }
  }, 1);
};
spinner();