import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged, reload } from "firebase/auth";
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
let logEmail;
let Thum = "0";
let Loc = "0";
let Per = "0";
let adsNum;
let allUsers = [];
let allSavedAds= [];
let allSaveAdslength=[];
let flagAds =[true];
let usernumber, useremail, userfirstname, userlastname;


const adColRef = collection(db, "Ads");
const docAllusers = collection(db, "users");
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
    "<h3 id=welcometext class='h2 mb-4 mb-md-5 text-black text-center mt-3'>שלום  " +
    userfirstname +
    ", חפש את המשרה המועדפת עלייך</p>";
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
        if(allUsers[usernumber].eOrS=="Employer") {
          location.href="employeer.html"
         }
         if(allUsers[usernumber].eOrS==null) {
          location.href="admin.html"
       }
      })
  }
});


const logoutButton = document.querySelector(".logoutBtn");
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
const logoutButton2 = document.querySelector(".logoutBtn2");
logoutButton2.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("signout");
      location.href = "index.html";
    })
    .catch((err) => {
      console.log(err.message);
    });
});

const selectElement = document.querySelector(".ChooseThum");
selectElement.addEventListener("change", (event) => {
  Thum = event.target.value;
});

const selectElement2 = document.querySelector(".ChooseLoc");
selectElement2.addEventListener("change", (event) => {
  Loc = event.target.value;
});
const selectElement3 = document.querySelector(".ChoosePer");
selectElement3.addEventListener("change", (event) => {
  Per = event.target.value;
});

var adSize;
getDocs(adColRef).then((snapshot) => {
    let Ads = [];
    let ids2 = [];
    let Savetoid;
    let allUsers2 = [];
    snapshot.docs.forEach((doc) => {
      Ads.push({ ...doc.data(), id: doc.id });
    });
    getDocs(docAllusers).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        allUsers2.push({ ...doc.data(), id: doc.id });
      });
      let userQuantity = allUsers2.length;
      for (let index = 0; index < userQuantity; index++) {
        ids2[index] = allUsers2[index].id;
        if (allUsers2[index].email == logEmail) {
          Savetoid=index;
      }
    }
    adSize = Ads.length;
    let flag = 0;
    let flagStart = 0;
    let SavedAdsindex= [];
    const SearchBtn = document.getElementById("SearchBtn");
    SearchBtn.addEventListener("click", function () {
      if (SearchBtn) {
        if (Thum != "0" && Loc != "0" && Per != "0") {
          flag = 1;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum != "0" && Loc != "0" && Per == "0") {
          flag = 2;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum != "0" && Loc == "0" && Per != "0") {
          flag = 3;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum == "0" && Loc != "0" && Per != "0") {
          flag = 4;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum != "0" && Loc == "0" && Per == "0") {
          flag = 5;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum == "0" && Loc != "0" && Per == "0") {
          flag = 6;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else if (Thum == "0" && Loc == "0" && Per != "0") {
          flag = 7;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        } else {
          flag = 0;
          // alert("flag=" + flag);
          flagStart = 1;
          Running1();
        }
      }
    });
    if (flagStart == 0) {
      Running1();
    }
    function Running1() {
      $(".Added").remove();
      let counterView=0
      for (let index = 0; index < adSize; index++) {
        switch (flag) {
          case 0:
            if (Ads[index].accepted == true) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>" +Ads[index].Date +"</small></div></div></div></div>"
              );
            }
            break;
          case 1:
            if (
              Ads[index].accepted == true &&
              Ads[index].location == Loc &&
              Ads[index].dep == Thum &&
              Ads[index].percent == Per
            ) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>" +Ads[index].Date +"</small></div></div></div></div>"
              );
            }
            break;
          case 2:
            if (
              Ads[index].accepted == true &&
              Ads[index].location == Loc &&
              Ads[index].dep == Thum
            ) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
          case 3:
            if (
              Ads[index].accepted == true &&
              Ads[index].dep == Thum &&
              Ads[index].percent == Per
            ) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
          case 4:
            if (
              Ads[index].accepted == true &&
              Ads[index].location == Loc &&
              Ads[index].percent == Per
            ) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
          case 5:
            if (Ads[index].accepted == true && Ads[index].dep == Thum) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
          case 6:
            if (Ads[index].accepted == true && Ads[index].location == Loc) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
          case 7:
            if (Ads[index].accepted == true && Ads[index].percent == Per) {
              $("#try2").append(
                "<div class='Added col-md-4'> <div class='card mb-4 box-shadow'><img class='card-img-top' src='/dist/img/occpics/occ" +
                  Ads[index].imgid +
                  ".jpeg' alt='Thumbnail [100%x225]' style='height: 225px; width: 100%; display: block;' data-holder-rendered='true'><div class='card-body'> <h5 id='cardHeader' dir='rtl'><b>" +
                  Ads[index].title +
                  "</b></h5> <p class='card-text' id='cardText' dir='rtl'>" +
                  Ads[index].des +
                  "</p><div class='d-flex justify-content-between align-items-center'><div class='btn-group'><button id='view" +
                  index +
                  "' class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#modalWS'>צפה</button></div><small class='text-muted'>לפני שעה</small></div></div></div></div>"
              );
            }
            break;
        }
      }
      if (localStorage.getItem('darkMode') === 'enabled') {
        activateDarkMode();
      }  
      for (let index = 0; index < adSize; index++) {
          const buttonS = document.getElementById("saveButton");
          const buttonE2 = document.getElementById("view" + index);
           if (buttonE2) {
            buttonE2.addEventListener("click", function () {
              if(allSavedAds) {
                  for (let i= 0; i < allSaveAdslength[0]; i++) {
                      allSavedAds.splice(i);
                   }
                  }
              document.getElementById("cvDiv").style.display = "none";
              document.querySelector("#WStitle").innerHTML = Ads[index].title;
              if (Ads[index].company == null) {
                document.querySelector("#WScompany").innerHTML = "חסוי";
              } 
              else {
                document.querySelector("#WScompany").innerHTML =
                  Ads[index].company;
              }
              document.querySelector("#WSlocation").innerHTML =
                Ads[index].location;
              document.querySelector("#WSdescribe").innerHTML = Ads[index].des;
              document.querySelector("#WSreq").innerHTML = Ads[index].req;
              document.querySelector("#WSdep").innerHTML = Ads[index].dep;
              document.querySelector("#WSpercent").innerHTML = Ads[index].percent;
              document.querySelector("#WSimg").src =
                "/dist/img/occpics/occ" + Ads[index].imgid + ".jpeg";
                adsNum=index;
              const updateViews = doc(db, "Ads",Ads[index].id);
              updateDoc(updateViews, {
                viewsCount: increment(1),
              });
                const docAllSaved = collection(db, "SavedAds");
                getDocs(docAllSaved).then((snapshot) => {
                  snapshot.docs.forEach((doc) => {
                    allSavedAds.push({ ...doc.data(), id: doc.id });
                  });
                  let SaveAdsQ = allSavedAds.length;
                  allSaveAdslength[0] = allSavedAds.length;
                  for (let i= 0; i < SaveAdsQ; i++) {
                    if (allSavedAds[i].Saveremail == logEmail) {
                      if(Ads[index].id==allSavedAds[i].idOfAds) {
                        SavedAdsindex[0]=i;
                        buttonS.style.background = "#4CAF50";
                        buttonS.style.color="white";
                        buttonS.style.borderColor="white";
                        buttonS.innerHTML="✔ משרה נשמרה";
                        flagAds[0]=false;
                        break;
                      }
                      else {
                        buttonS.style.background=null;
                        buttonS.style.color=null;
                        buttonS.style.borderColor=null;
                        buttonS.innerHTML="שמור מודעה";
                        flagAds[0]=true;
                      }
                    }
                  }
                });
              });
             }
          }
    }
    const buttonS = document.getElementById("saveButton");
            if (buttonS) {
              buttonS.addEventListener("click", function () {
                const addSaveA=collection(db,'SavedAds');
                if (flagAds[0]==true) {
                  addDoc(addSaveA,{
                    Saveremail:logEmail,
                    idOfAds:Ads[adsNum].id,
                  }).then (()=>{
                    console.log("המשרה נשמרה בהצלחה");
                  })
                }
                else if(flagAds[0]==false) {
                  const docSavedAds = doc(db, "SavedAds",allSavedAds[SavedAdsindex[0]].id);
                   deleteDoc(docSavedAds);
                  console.log("המשרה הוסרה מהמועדפים");
                }
              })
            }
      const bottonCV = document.getElementById("UploadCV");
      if(bottonCV) {
        bottonCV.addEventListener("click", function () {
          document.getElementById("cvDiv").style.display = "block";
        });
      }
      const bottonSendCV= document.getElementById("UploadCVbtn");
      if(bottonSendCV) {
        bottonSendCV.addEventListener("click", function() {
          let linkU = document.getElementById("CVid").value;
          if(validURL(linkU))   {
            const addSendLinks=collection(db,'Sendedlinks');
                  addDoc(addSendLinks,{
                    emailofemployer: Ads[adsNum].emailofemployer,
                    idOfAds: Ads[adsNum].id,
                    nameOfsender: userfirstname,
                    downloadLink: linkU,
                    emailOfSender: logEmail,
                    imgid: Ads[adsNum].imgid,

                  }).then (()=>{
                    console.log("הקורות חיים הועברו למעסיק");
                  })
            document.getElementById("cvDiv").style.display = "none";
          }
          else
            document.querySelector("#ErrorSend").innerHTML ="אנא הכנס קישור תקין"
        })
      }
  })
})
  .catch((err) => {
    console.log(err.message);
  });
//checking email input is currect 
  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

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
        $(".loginbtn").removeClass("btn-outline-dark")
        $(".loginbtn").addClass("bg-white")
        $("h1").addClass("whitetext");
        $("h3").removeClass("text-black");
        $("h3").addClass("whitetext");
        $("h5").addClass("whitetext");
        $("p").addClass("text-white"); 
        $("body").addClass("darkMode");
        $(".row").addClass("darkMode");
        $(".bgdark").removeClass("bg-light");
        $(".bgf").addClass("darkMode")
        $(".card").addClass("bg-dark border border-secondary");
        $(".modal-header").removeClass("bg-light")
        $(".text-dark").addClass("whitetext");
        $(".modal-content").addClass("darkMode");
        $("#saveButton").removeClass("btn-outline-primary");
        $("#UploadCV").removeClass("btn-outline-primary");
        $("#saveButton").addClass("btn-outline-custome");
        $("#UploadCV").addClass("btn-outline-custome");
        $(".btn-close").addClass("btn-close-white");
        $(".navbar-toggler").addClass("dark-toggler");
        $(".navbar-toggler").addClass("dark-toggler2");
        darkflag = 1;
        localStorage.setItem('darkMode', 'enabled');  // Save to local storage
}
    function deactivateDarkMode() {
      $("#navbarCollapse").removeClass("darkMode");
      $(".navbar").removeClass("darkMode");
      $(".nav-item").removeClass("whitetext");
      $(".loginbtn").removeClass("bg-white")
      $(".loginbtn").addClass("btn-outline-dark")
      $("h1").removeClass("whitetext");
      $("h3").removeClass("whitetext");
      $("h3").addClass("text-black");
      $("h5").removeClass("whitetext");
      $("p").removeClass("text-white"); 
      $("body").removeClass("darkMode");
      $(".row").removeClass("darkMode");
      $(".bgdark").addClass("bg-light");
      $(".bgf").removeClass("darkMode")
      $(".card").removeClass("bg-dark border border-secondary");
      $(".modal-header").addClass("bg-light")
      $(".text-dark").removeClass("whitetext");
      $(".modal-content").removeClass("darkMode");
      $("#saveButton").addClass("btn-outline-primary");
      $("#UploadCV").addClass("btn-outline-primary");
      $("#saveButton").removeClass("btn-outline-custome");
      $("#UploadCV").removeClass("btn-outline-custome");
      $(".btn-close").removeClass("btn-close-white");
      $(".navbar-toggler").removeClass("dark-toggler");
      $(".navbar-toggler").removeClass("dark-toggler2");
      darkflag = 0;
      localStorage.setItem('darkMode', 'disabled'); // Save to local storage
    }

  $("#largeFont").click(function () {
    if (textflag === 0) {
      $("p").addClass("largeFont");
      $("h1").addClass("largerH");
      $("h3").addClass("largerH2");
      $(".navG").addClass("mediumFont");

      textflag = 1;
    } else {
      $("p").removeClass("largeFont");
      $("h1").removeClass("largerH");
      $("h3").removeClass("largerH2");
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

