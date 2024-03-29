let flag = 0;
let darkflag = 0;
let textflag = 0;

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
        $("h4").addClass("whitetext");
        $("h5").addClass("whitetext");
        $("p").removeClass("text-black"); 
        $("p").addClass("whitetext");
        $(".row").addClass("darkMode");
        $(".bgdark").removeClass("bg-light");
        $(".bgf").addClass("darkMode");
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
      $("h4").removeClass("whitetext");
      $("h5").removeClass("whitetext");
      $("p").addClass("text-black"); 
      $("p").removeClass("whitetext");
      $(".row").removeClass("darkMode");
      $("#body").removeClass("bg-gray-200");
      $(".bgdark").addClass("bg-light");
      $(".bgf").removeClass("darkMode");
      $(".navbar-toggler").removeClass("dark-toggler");
      $(".navbar-toggler").removeClass("dark-toggler2");
      darkflag = 0;
      localStorage.setItem('darkMode', 'disabled'); // Save to local storage
    }

  $("#largeFont").click(function () {
    if (textflag === 0) {
      $("p").addClass("largeFont");
      $("h1").addClass("largerH");
      $("h2").addClass("largerH2");
      $("h4").addClass("largerH2");
      // $("body").addClass("mediumFont");
      $(".navG").addClass("mediumFont");

      textflag = 1;
    } else {
      $("p").removeClass("largeFont");
      $("h1").removeClass("largerH");
      $("h2").removeClass("largerH2");
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

