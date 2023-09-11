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

import {} from "./main";

const firebaseConfig = {
  apiKey: "AIzaSyDoC94Xlt0BHfsH_zLp8562xsKMW49mv8s",
  authDomain: "job-meister.firebaseapp.com",
  projectId: "job-meister",
  storageBucket: "job-meister.appspot.com",
  messagingSenderId: "51579629977",
  appId: "1:51579629977:web:eae8590655f4e102e2e308",
  measurementId: "G-W33GWTB6JB",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);

// collection ref
$("#box").hide();
const adColRef = collection(db, "Ads");
const sendLinks = collection(db, "Sendedlinks");
const auth = getAuth();
let allUsers = [];
var timeStamps = new Date().toLocaleDateString();
let logEmail, logCompany, userfirstname;
let sended = [];
const docAllusers = collection(db, "users");
getDocs(docAllusers).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  let userq = allUsers.length;
  for (let index = 0; index < userq; index++) {
    if (allUsers[index].email == logEmail) {
      logCompany = allUsers[index].Company;
      userfirstname = allUsers[index].firstname;
    }
  }
  document.querySelector("#welcometext").innerHTML =
    "<h1 id=welcometext>שלום " + userfirstname + ", צור מודעה חדשה</h1>";
  getDocs(sendLinks).then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      sended.push({ ...doc.data(), id: doc.id });
    });
    let userNotifCount = 0;
    let sendedLength = sended.length;
    for (let f = 0; f < sendedLength; f++) {
      if (sended[f].emailofemployer == logEmail) {
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
        if (sended[i].emailofemployer === logEmail) {
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
  if (localStorage.getItem('darkMode') === 'enabled') {
    activateDarkMode();
  }
});

// sending data messaages

const adForm = document.querySelector(".adF");
adForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // add new info to firebase messages
  addDoc(adColRef, {
    company: logCompany,
    emailofemployer: logEmail,
    des: adForm.desc.value,
    location: adForm.Adloc.value,
    percent: adForm.MainOccupation.value,
    dep: adForm.MainOccupation1.value,
    imgid: whichnumber(adForm.MainOccupation1.value),
    req: adForm.reqs.value,
    title: adForm.title.value,
    accepted: false,
    viewsCount: 0,
    Date: timeStamps,
    
  }).then(() => {
    alert("Success");
    location.href = "employeer.html";
  });
});
function whichnumber(x) {
  switch (x) {
    case "אבטחה,שמירה ובטחון":
      return 1;
    case "אומנות בידור ומדיה":
      return 2;
    case "אופנה וטקסטיל":
      return 3;
    case "בניין,בינוי ושיכון":
      return 4;
    case "בתי קפה,מסעדות ואירועים":
      return 5;
    case "הוראה,חינוך והדרכה":
      return 6;
    case "הנדסה":
      return 7;
    case "חשמל ואלקטרוניקה":
      return 8;
    case "יופי,טיפוח וספא":
      return 9;
    case "יזמות":
      return 10;
    case "ייצור ותעשייה":
      return 11;
    case "כספים וכלכלה":
      return 12;
    case "מדעי החברה":
      return 13;
    case "מחסנאות":
      return 14;
    case "מכירות":
      return 15;
    case "מערכות מידע":
      return 16;
    case "משאבי אנוש":
      return 17;
    case "משפטים":
      return 18;
    case "נדל״ן":
      return 19;
    case "נהגים ושליחים":
      return 20;
    case "סטונדטים":
      return 21;
    case "ספורט,כושר ואורח חיים":
      return 22;
    case "רכב ומכונאות":
      return 23;
    case "רפואה":
      return 24;
    case "שירות לקוחות":
      return 25;
    case "תוכנה":
      return 26;
    case "תיירות ומלונאות":
      return 27;
  }
}

const logoutButton = document.querySelector(".logoutBtn2");
logoutButton.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("signout");
      location.href = "index.html";
    })
    .catch((err) => {
    });
});
const logoutButton2 = document.querySelector(".logoutBtn3");
logoutButton2.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("signout");
      location.href = "index.html";
    })
    .catch((err) => {
    });
});

onAuthStateChanged(auth, (user) => {
  if (user == null) {
    location.href = "index.html";
  } else {
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
         if(allUsers[usernumber].eOrS==null) {
          location.href="admin.html"
       }
      })
  }
});

let flag = 0;
let darkflag = 0;
let textflag = 0;
  $("#accessMenu").hide();

  $(document).ready(function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        activateDarkMode();
        darkflag = 1;
    } else {
        deactivateDarkMode();
        darkflag = 0;
    }
  });
  
  $("#darkBtn").click(function () {
    if (darkflag === 0) {
        activateDarkMode();
        darkflag = 1;
    } else {
        deactivateDarkMode();
        darkflag = 0;
    }
  });

  function activateDarkMode() {
      $("#navbarCollapse").addClass("darkMode");
      $(".navbar").addClass("darkMode");
      $(".nav-item").addClass("whitetext");
      $("h1").addClass("whitetext"); 
      $("body").addClass("darkMode");
      $(".container-xxl").removeClass("bg-light");
      $(".footer").removeClass("bg-white");
      $("#bellnotif").addClass("whitetext");
      $(".notifications").addClass("darkMode");
      $("head").append("<style id='darkModeStyles'>.notifications-item:hover { background-color: #A9A9A9 !important;}</style>");
      $(".navbar-toggler").addClass("dark-toggler");
      $(".navbar-toggler").addClass("dark-toggler2");
      darkflag = 1;
      localStorage.setItem('darkMode', 'enabled');  // Save to local storage
    } 
    function deactivateDarkMode() {
      $(".container-xxl").addClass("bg-light");
      $("#navbarCollapse").removeClass("darkMode");
      $(".navbar").removeClass("darkMode");
      $(".nav-item").removeClass("whitetext");
      $("h1").removeClass("whitetext");
      $("body").removeClass("darkMode");
      $("#bellnotif").removeClass("whitetext");
      $(".notifications").removeClass("darkMode");
      $("#darkModeStyles").remove();
      $(".navbar-toggler").removeClass("dark-toggler");
      $(".navbar-toggler").removeClass("dark-toggler2");
      darkflag = 0;
      localStorage.setItem('darkMode', 'disabled'); // Save to local storage
    }

  $("#largeFont").click(function () {
    if (textflag === 0) {
        $("p").addClass("largeFont");
        $("h1").addClass("largerH");
      // $("body").addClass("mediumFont");
        $(".navG").addClass("mediumFont");
        textflag = 1;
    } else {
        $("p").removeClass("largeFont");
        $("h1").removeClass("largerH");
        $("body").removeClass("largeFont");
        $(".navG").removeClass("mediumFont");
        textflag = 0;
    }
  });

  $("#acessability").click(function () {
    if (flag === 0) {
      $("#acessability").addClass("widthAccess");
      flag = 1;
    } else {
      $("#acessability").removeClass("widthAccess");
      flag = 0;
    }
    $("#accessMenu").toggle("drop");
    return false;
  });

