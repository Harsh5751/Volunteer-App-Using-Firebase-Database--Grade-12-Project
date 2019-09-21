// Register Script
$("#register-2").on("click", function() {
    //checks if the number entered in the age textbox is a number.
    //checks if the number entered in the age textbox is greater than 13
    //checks if the number entered in the age textbox is less than 100
    if(isNaN($("#age-register").val()) || $("#age-register").val() < 13 || $("#age-register").val() > 100){
        //if any of the above are true, it will display an error saying you must be older than 13 to sign up
        console.log("age-error");
        sweetAlert("Oops...", "you must be 13 or older to sign up!", "error");
    //if all above conditions are false, it will run this code
    }else{
        //first it will register the user, and then it will log the user in.
        FirebaseRegister(); //runs register function
        FirebaseAuthChanged(); //logs the user in
    }
})

//registers the user using the information entered
function FirebaseRegister(){
    // creates variables for all textboxes
    var email = $("#email-register").val();
    var confirm_email = $("#cemail-register").val();
    var password = $("#password-register").val();
    var confirm_password = $("#cpassword_register").val();
    //checks if email does not equal to confirm email text box, and if password textbox does not equal to confirm password textbox
    if(email != confirm_email && password != confirm_password) {
        sweetAlert("Oops...", "your email/password do not match", "error");
    //if the above argument is false, it will run this code
    }else{
        //uses email and password variables to create a user in firebase
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // if there is an error during registration, it will launch this error message
            if (error) {
                sweetAlert("Oops...", errorMessage, "error");
                console.log(errorMessage);
                }
        })
    }
}

//logs the user in after registration
function FirebaseAuthChanged(){
    //creates variables using values entered in all textboxes
    var database = firebase.database();
    var name = $("#fname-register").val();
    var email = $("#email-register").val();
    var age = $("#age-register").val();
    var type = $("#type-register").val();
    console.log(type);
    //if a user is logged in(to ensure the registration worked), it will run this code
    var user = firebase.auth().currentUser;
    //if the authentication status changes (user logs in),
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //firebase will store the users name, email, age, and account type in firebase under their unique id
        firebase.database().ref('users/' + user.uid).set({
            username: name,
            email: email,
            age: age,
            type: type
        });
        //after storing the data, it will display a success message
        swal({
            title: "Registered!",
            text: "redirecting...",
            type: "success",
            timer: 2000,
            showConfirmButton: false
        });
        //after success message, it will change pages to the main dashboard page
      window.open("Home.html","_self")
    // if the login is unsuccessful, it will run this code
    } else {
        //if the login is unsuccessful, it will log a console error stating the login was unsuccessful
        console.log("Login Unsuccessful")
    }
  });
}
