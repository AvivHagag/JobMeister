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
const auth = getAuth();
$("#box").hide();
let logEmail;
let allUsers = [];
let usernumber, useremail, userfirstname, userlastname;
let flag = 0;
let darkflag = 0;
let textflag = 0;
let sended = [];

const adColRef = collection(db, "Ads");
const docAllusers = collection(db, "users");
const sendLinks = collection(db, "Sendedlinks");
getDocs(docAllusers).then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    allUsers.push({ ...doc.data(), id: doc.id });
  });
  let userq = allUsers.length;

  for (let index = 0; index < userq; index++) {
    if (allUsers[index].email == logEmail) {
      useremail = allUsers[index].email;
      userfirstname = allUsers[index].firstname;
      userlastname = allUsers[index].lastname;
    }
  }
  document.querySelector("#welcometext").innerHTML =
    "<h2 id='welcometext' class='lead text-muted'>ברוך הבא " +
    userfirstname +
    ", הנה המודעות שפירסמת באתרנו</h2>";
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

var adSize;
var countAds = 0;
getDocs(adColRef)
  .then((snapshot) => {
    let Ads = [];
    snapshot.docs.forEach((doc) => {
      Ads.push({ ...doc.data(), id: doc.id });
    });
    adSize = Ads.length;
    for (let index = 0; index < adSize; index++) {
      let indexR = index + 1;
      if (Ads[index].emailofemployer == useremail) {
        countAds++;
        $("#try1").append(
          "<div class='col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
            Ads[index].imgid +
            ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
            Ads[index].title +
            "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
            Ads[index].des +
            "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='delbtn" +
            index +
            "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#exampleModal'>מחיקה</button><button id='view" +
            index +
            "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modal2'>צפה</button></div>" +
            (Ads[index].accepted == true
              ? "<small class='text-success'>מאושר ✔</small>"
              : "<small class='text-danger'>ממתין לאישור</small>") +
            "<small class='text-muted'>" +
            Ads[index].Date +
            "</small></div></div></div></div>"
        );
      }
    }
    if (countAds == 0) {
      $("#non").append(
        "<div class = 'd-flex justify-content-center'> <h3 dir='rtl'>זיהינו שעוד לא פירסמת מודעה באתרנו! תוכל ליצור מודעה חדשה <a href='createad.html'>כאן</a></h3></div><div class ='d-flex justify-content-center'> '<img class='d-flex justify-content-center' src='/dist/img/nonads.png' alt='nonads' style=' width: 50%;'</div>"
      );
    } else {
      document.querySelector("#adC").innerHTML =
        "כמות מודעות (" + countAds + ")";
    }
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
          if (localStorage.getItem('darkMode') === 'enabled') {
            activateDarkMode();
          }
        }
  
        return false;
      });
    });
    for (let index = 0; index < adSize; index++) {
      const buttonE = document.getElementById("delbtn" + index);
      const buttonE2 = document.getElementById("view" + index);

      if (buttonE) {
        buttonE.addEventListener("click", function () {
          var buttonD = document.getElementById("YesDelete");
          if (buttonD) {
            buttonD.addEventListener("click", function () {
              var docDelAds = doc(db, "Ads", Ads[index].id);
              deleteDoc(docDelAds).then(() => {
                location.reload();
              });
            });
          }
        });
      }
      if (buttonE2) {
        buttonE2.addEventListener("click", function () {
          document.querySelector("#Mtitle").innerHTML = Ads[index].title;
          if (Ads[index].company == null) {
            document.querySelector("#Mcompany").innerHTML = "חסוי";
          } else {
            document.querySelector("#Mcompany").innerHTML = Ads[index].company;
          }
          document.querySelector("#Mlocation").innerHTML = Ads[index].location;
          document.querySelector("#Mdescribe").innerHTML = Ads[index].des;
          document.querySelector("#Maccepted").innerHTML =
            Ads[index].accepted == true
              ? "<small class='text-success'>אושר ופורסם באתרנו ✔</small>"
              : "<small class='text-danger'>ממתין לאישור האדמין </small>";
          document.querySelector("#Mreq").innerHTML = Ads[index].req;
          document.querySelector("#Mviews").innerHTML =
            Ads[index].viewsCount + " <i class='fa-regular fa-eye'></i>";
          document.querySelector("#Mdep").innerHTML = Ads[index].dep;
          document.querySelector("#Mpercent").innerHTML = Ads[index].percent;
          document.querySelector("#Mimg").src =
            "/dist/img/occpics/occ" + Ads[index].imgid + ".jpeg";
        });
      }
    }
    if (localStorage.getItem('darkMode') === 'enabled') {
      activateDarkMode();
    }
  })
  .catch((err) => {
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


$(document).ready(function() {
  if (localStorage.getItem('darkMode') === 'enabled') {
      activateDarkMode();
      darkflag = 1;
  } else {
      deactivateDarkMode();
      darkflag = 0;
  }
});

$("#accessMenu").hide();
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
      $(".loginbtn").removeClass("btn-outline-dark");
      $(".loginbtn").addClass("bg-white");
      $("h1").addClass("whitetext");
      $("h3").removeClass("text-black");
      $("h3").addClass("whitetext");
      $("h5").addClass("text-white");
      $("p").addClass("text-white");
      $("body").addClass("darkMode");
      $(".row").addClass("darkMode");
      $(".bgdark").removeClass("bg-light");
      $(".bgf").addClass("darkMode");
      $("h2").addClass("whitetext");
      $(".card").addClass("bg-dark border border-secondary");
      $(".modal-header").removeClass("bg-light")
      $(".text-dark").addClass("whitetext");
      $(".modal-content").addClass("darkMode");
      $(".btn-close").addClass("btn-close-white");
      $("#bellnotif").addClass("whitetext");
      $(".notifications").addClass("darkMode");
      $("head").append("<style id='darkModeStyles'>.notifications-item:hover { background-color: #A9A9A9 !important;}</style>");
      $(".navbar-toggler").addClass("dark-toggler");
      $(".navbar-toggler").addClass("dark-toggler2");
      darkflag = 1;
      localStorage.setItem('darkMode', 'enabled');  // Save to local storage
    }
    function deactivateDarkMode() {
      $("#navbarCollapse").removeClass("darkMode");
      $(".navbar").removeClass("darkMode");
      $(".nav-item").removeClass("whitetext");
      $(".loginbtn").removeClass("bg-white");
      $(".loginbtn").addClass("btn-outline-dark");
      $("h1").removeClass("whitetext");
      $("h3").addClass("text-black");
      $("h3").removeClass("whitetext");
      $("h5").removeClass("text-white");
      $("p").removeClass("text-white");
      $("body").removeClass("darkMode");
      $(".row").removeClass("darkMode");
      $(".bgdark").addClass("bg-light");
      $(".bgf").removeClass("darkMode");
      $(".card").removeClass("bg-dark border border-secondary");
      $("h2").removeClass("whitetext");
      $(".modal-header").addClass("bg-light")
      $(".text-dark").removeClass("whitetext");
      $(".modal-content").removeClass("darkMode");
      $(".btn-close").removeClass("btn-close-white");
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