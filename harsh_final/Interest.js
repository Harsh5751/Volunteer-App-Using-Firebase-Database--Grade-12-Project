//Harsh Patel
//ICS4U0
//Last Edited Dec 31, 2016
//Version 2.5

//Materialize.css, function to initialize Custom Select Dropdown Options!
$(document).ready(function() {
  $('select').material_select();
});

//Materialize.css, function to initialize Custom Modal onclick of Search Button!
$(document).ready(function() {
  $('.modal').modal();
});

$(document).ready(function() {
  $('.tooltipped').tooltip({
    delay: 50
  });
});

//function getUser() triggered onclick of Search when select inputs filled triggering the modal which displays table. The table will display the opportunity if it is valid in the database based on its age, category, and number of hours desired by the user or else message will display saying no activity found. Message will also display if input options not selected!
function getUser() {
  //Setting Variables for Database, and Info Saved within the database!    
  var rootRef = firebase.database().ref().child("Volunteer Opportunities");
  rootRef.on("child_added", snap => {
    var company = snap.child("CompanyName").val();
    var date = snap.child("Date").val();
    var hours = snap.child("Hours").val();
    var location = snap.child("Location").val();
    var Age = snap.child("MinAge").val();
    var Name = snap.child("OpportunityName").val();
    var Category = snap.child("category").val();
    var Details = snap.child("details").val();
    var PoliceCheck = snap.child("police").val();
    var timings = snap.child("timings").val();
    //Setting Variables for Select input options!  
    var searchAge = $("#AGe").val();
    var searchCategory = $("#caTegory").val();
    var searchHours = $("#HOurs").val();
    //if or else statements to display the activity based on the category, age, and number of hours desired by the user!
    if (searchCategory == Category && searchAge == Age && searchHours == hours) {
      //Display the information saved in firebase in the table under correct headings and make a new row for each activity with the given compnents in the modal!
      $("#table_body").append("<tr><td>" + Name + "</td><td>" + company + "</td><td>" + Category + "</td><td>" + date + "</td><td>" + timings + "</td><td>" + hours + "</td><td>" + Age + "</td><td>" + location + "</td><td>" + PoliceCheck + "</td><td>" + Details + "</td><td><button class=" + "btn-flat" + " id=volunteer-button" + " onclick=volunteerButton()" + ">Volunteer</button></td></tr>");
      //Display Alert depending on if activity found or not from Database!
      sweetAlert("New Activity Found!", "Let's Volunteer!", "success");
    } else if (searchCategory !== Category && searchAge !== Age && searchHours !== hours) {
      sweetAlert("No Activity!!", "No Volunteer Activity Found!", "error")
    };
  });
}

//Function triggered by onclick of volunteer button in the table within the form. Function allows user to sign up for the activity desired. Makes an attendance list storing the users UID under the opportunity name, and makes string under parent "Users" branch called opportunities to store the opportunity name!
function volunteerButton() {
  var user = firebase.auth().currentUser;
  var uid = user.uid
  var fireAttend = firebase.database().ref().child("Volunteer Opportunities");
  //Creates attendence reference and stores Users UID under the opportunity selected with onclick of Volunteer Button!
  fireAttend.on("child_added", snap => {
    var Name = snap.child("OpportunityName").val();
    var date = snap.child("Date").val();
    var Attend = firebase.database().ref('Volunteer Opportunities/' + Name).child('Attendance');
    Attend.push({
      uid: uid
    });
    //Creates a opportunities reference under the "Users" main branch and stores opportunity Name!   
    var Attend2 = firebase.database().ref('users/' + uid).child('opportunities');
    Attend2.push({
        name: Name
      })
      //Alert to display sign-up is sucessful to the user and displays the activity for which they have registered for!
    sweetAlert("Sign-Up Sucessful", "You Have Volunteered For:\n\n " + Name, "success");
  });
}

$('.modal').modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: .5, // Opacity of modal background
  in_duration: 300, // Transition in duration
  out_duration: 200, // Transition out duration
  starting_top: '4%', // Starting top style attribute
  ending_top: '10%', // Ending top style attribute
});