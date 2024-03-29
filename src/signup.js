
let flag = 0;
let darkflag = 0;
let textflag = 0;

const Box_work1= document.getElementById('div-E');
const Box_work2= document.getElementById('div-WS');

function DisplayDivBySelector(val) {
  if(val==1) {
      if(Box_work2.style.display == 'block') {
          Box_work2.style.display = 'none';
      }
      Box_work1.style.display = 'block';
  }
  else if(val==2){
      if(Box_work1.style.display == 'block') {
          Box_work1.style.display = 'none';
      }
      Box_work2.style.display = 'block';
  }
  else {
      Box_work1.style.display = 'none';
      Box_work2.style.display = 'none';
  }
}

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
        $(".loginbtn").removeClass("btn-outline-dark")
        $(".loginbtn").addClass("bg-white")
        $("h1").addClass("whitetext");
        $("h5").addClass("whitetext");
        $("p").removeClass("text-black"); 
        $("p").addClass("whitetext");
        $(".container").addClass("darkMode");
        $(".bgdark").addClass("darkMode");
        $(".bgdark").removeClass("bg-light");
        $(".bgf").addClass("darkMode")
        $("body").addClass("darkMode");
        $(".LoginImg").attr("src", "img/try2.png");
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
      $("h5").removeClass("whitetext");
      $("p").addClass("text-black"); 
      $("p").removeClass("whitetext");
      $(".container").removeClass("darkMode");
      $("body").removeClass("darkMode");
      $(".bgdark").addClass("bg-light");
      $(".bgdark").removeClass("darkMode");
      $(".bgf").removeClass("darkMode")
      $(".LoginImg").attr("src", "img/try1.png");
      $(".navbar-toggler").removeClass("dark-toggler");
        $(".navbar-toggler").removeClass("dark-toggler2");
      darkflag = 0;
      localStorage.setItem('darkMode', 'disabled'); // Save to local storage
    }

  $("#largeFont").click(function () {
    if (textflag === 0) {
      $("p").addClass("largeFont");
      $("h1").addClass("largerH");
      $(".form-label").addClass("largerH3");
      $("h4").addClass("largerH2");
      // $("body").addClass("mediumFont");
      $(".navG").addClass("mediumFont");

      textflag = 1;
    } else {
      $("p").removeClass("largeFont");
      $("h1").removeClass("largerH");
      $(".form-label").removeClass("largerH3");
      $("h4").removeClass("largerH2");
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


