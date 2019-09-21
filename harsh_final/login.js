// Sign-in Script
$("#button-login").on("click", function() {
  //creates variables using values entered in email and password textboxes
  var email = $("#email-login").val();
  var password = $("#password-login").val();
  //firebase catches the email and password and uses it to authenticate the user
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    //console logs any errors if there are any
    console.log(error)
    // ...
  });
  //when the user is authenticated, it will run this code
  firebase.auth().onAuthStateChanged(function(user) {
    //if a user is authenticated, it will console log that the login was successful, and then redirect to a page
    if (user) {
      console.log("Login Successful")
      window.open("Home.html","_self")
    //else if a user is not authenticated, it will console log that the login was unsuccessful and will not proceed
    } else {
      console.log("Login Unsuccessful")
    }
  });
})
