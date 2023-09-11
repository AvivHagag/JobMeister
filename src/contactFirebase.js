import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc, 
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {} from './main' 
import {} from './contact' 


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

const msgColRef = collection(db,'Messages')
const colRef = collection(db, "Data");
const docAllusers = collection(db, "users");
const nav1= document.querySelector('.nav1');
const nav2= document.querySelector('.nav2');
const nav3= document.querySelector('.nav3');
var oldData;
let logEmail;
let allUsers = [];
let usernumber, useremail, userfirstname, userlastname;
getDocs(docAllusers).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  let userq = allUsers.length;

  for (let index = 0; index < userq; index++) {
    if (allUsers[index].email == logEmail) {
      useremail = allUsers[index].email;
    }
  }
});

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    logEmail = user.email;
    getDocs(docAllusers).then((snapshot) => {
      let allUsers = []
      snapshot.docs.forEach((doc)=>{
        allUsers.push({...doc.data(), id:doc.id })
      })
      let userq=allUsers.length;
      for (let index = 0; index < userq; index++) {
        if(allUsers[index].email==logEmail) {
            if(allUsers[index].eOrS=="Employer") {
                nav1.style.display='none';
                nav2.style.display = 'flex';
                nav3.style.display = 'none';
                break;
            }
            else {
                nav1.style.display='none';
                nav2.style.display = 'none';
                nav3.style.display = 'flex';
                break;
            }
          }
        }
       }) 
  } 
  else {
    nav1.style.display='flex';
    nav2.style.display = 'none';
    nav3.style.display = 'none';
  }
});

const logoutButton = document.querySelector(".logoutBtn");
if(logoutButton) {
  logoutButton.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("signout");
        location.href = "index.html";
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
}
const buttonIds = ['.logoutBtn2','.logoutBtn3','.logoutBtn4','.logoutBtn5'];
buttonIds.forEach((id) => {
  const button = document.querySelector(id);
  if (button) { // Check if button exists
      button.addEventListener("click", () => {
          signOut(auth)
              .then(() => {
                  alert("signout");
                  location.href = "index.html";
              })
              .catch((err) => {
                  console.log(err.message);
              });
      });
  }
});

 // get info messages
getDocs(msgColRef).then((snapshot) => {
  let Messages = []
  snapshot.docs.forEach((doc)=>{
      Messages.push({...doc.data(), id:doc.id })
  })
 
  })
  .catch(err => {
      console.log(err.message);
  })


  // sending data messaages

const messageF = document.querySelector('.contactForm')
messageF.addEventListener('submit', (e) => {
  e.preventDefault()
 

  // add new info to firebase messages
  addDoc(msgColRef,{
    name:messageF.cname.value,
    email:messageF.cemail.value,
    subject:messageF.csubject.value,
    msg:messageF.cmsg.value

  }).then(() =>{
    alert("Success");
  })


})
$("#box").hide();
let sended = [];
const adColRef = collection(db, "Ads");
const sendLinks = collection(db, "Sendedlinks");
// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let Data = [];
    snapshot.docs.forEach((doc) => {
      Data.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => {
  });

  var adSize;
  var countAds = 0;
  getDocs(adColRef)
  .then((snapshot) => {
    let Ads = [];
    snapshot.docs.forEach((doc) => {
      Ads.push({ ...doc.data(), id: doc.id });
    });
    adSize = Ads.length;
    
  getDocs(sendLinks).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      sended.push({ ...doc.data(), id: doc.id });
    });
    let userNotifCount = 0;
    let sendedLength = sended.length;
    for (let f = 0; f < sendedLength; f++) {
      if (sended[f].emailofemployer == useremail) {
        userNotifCount++;
      }
    }
    if (userNotifCount > 0) {
      $("#bellnotif").append(
        "<span class='circlebell translate-middle badge bg-danger'>" +
          userNotifCount +
          "</span>"
      );
    }
  });
  $(document).ready(function () {
    var down = false;
    $("#bell").click(function (e) {
      var color = $(this).text();
      if (down) {
        $("#box").toggle("drop");
        $("#box").css("height", "0px");
        $("#box").css("opacity", "0");
        $(".added1").remove();
        down = false;
      } else {
        $(".added1").remove();
        $("#box").toggle();
        $("#box").css("height", "auto");
        $("#box").css("opacity", "1");
        down = true;
      }
      let sendedLength = sended.length;
      let userNotifCount1 = 0;

      for (let i = 0; i < sendedLength; i++) {
        if (sended[i].emailofemployer === useremail) {
          userNotifCount1++;
          $("#box").append(
            "<div class='added1 notifications-item'> <img src='/dist/img/occpics/occ" +
              sended[i].imgid +
              ".jpeg' alt='img'> <div class='text mx-2'><h4>המשתמש " +
              sended[i].nameOfsender +
              " הגיש קורות חיים למשרתך</h4   <p><a href=" +
              sended[i].downloadLink +
              "> לחץ כאן על מנת להוריד</a> </p> </div><i id='notidelete" +
              i +
              "' class='mt-4 mx-3 fa-regular fa-trash-can'></i> </div>"
          );
          const buttonDeleteNotfi = document.getElementById("notidelete" + i);
          if (buttonDeleteNotfi) {
            buttonDeleteNotfi.addEventListener("click", function () {
              var docDelNotfi = doc(db, "Sendedlinks", sended[i].id);
              deleteDoc(docDelNotfi).then(() => {
                location.reload();
              });
            });
          }
        }
        document.querySelector("#notifcount").innerHTML = userNotifCount1;
      }

      return false;
    });
  });
})
.catch((err) => {
  console.log(err.message);
});

