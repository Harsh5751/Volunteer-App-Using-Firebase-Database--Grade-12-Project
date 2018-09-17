//Harsh Patel
//Last Updated December 25, 2016
//ICS4U0-A
//Version 3.0

//Materialize.css, function to initialize Custom Select Dropdown Otions!

$(document).ready(function() {
  $('select').material_select();
});

//Time Picker: Using Materialize.css design
$('.timepicker').pickatime({
  default: 'now',
  twelvehour: true, // change to 12 hour AM/PM clock from 24 hour
  donetext: 'OK',
  autoclose: false,
});

//Materialize.css, function to initialize custom datepicker for user!
$(document).ready(function() {
  window.picker = $('.datepicker').pickadate({
    // Creates a dropdown of 2 years from current date to control year!  
    selectYears: 2,
    //Formating the Date to display in given Format!
    format: 'yyyy-mm-dd'
  });

});

//Function for Location Input from Google Autofil Maps API!
function init() {
  var input = document.getElementById('Location');
  var autocomplete = new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', init);

//Firebase Storage- Onclick of the Submit Button executes function getData() which will store the values of the defined variables into firebase.database under the reference setting "Volunteer Opportunities" when conditions are met!
function getData() {
  //Setting Variables for the values required to be stored about the volunteer activity with user unique id (Uid)! 
  var user = firebase.auth().currentUser;
  var OpportunityName = $("#OpportunityName").val();
  var CompanyName = $("#CompanyName").val();
  var category = $("#category").val();
  var Hours = $("#Hours").val();
  var MinAge = $("#MinAge").val();
  var Date = $("#Date").val();
  var timings = $("#timings").val();
  var Location = $("#Location").val();
  var police = $("#police").val();
  var details = $("#details").val();

  //conditional statements- Must meet these requirements to proceed the form to submit and save data in firebase! Enables Alerts to assist Users if sub,it did not proceed!
  if (OpportunityName == "" ||
    CompanyName == "" ||
    category == "None" ||
    Hours == "None" ||
    MinAge == "None" ||
    Date == "" ||
    Date < today ||
    timings == "" ||
    Location == "" ||
    police == "None" ||
    details == "") {
    sweetAlert("Uh Oh!", "Required Fields Are Empty Or Date Selected not valid!", "warning");
    return false;
  } else {
    //Store the Input Values of the Volunteer Opportunity if the conditions have been met under the reference name "Volunteer Opportunities" string, which will create a sub branch to store the Opportunity with the title of the Opportunity Name!
    var fireStorage = firebase.database().ref('Volunteer Opportunities/' + OpportunityName);
    fireStorage.set({
      OpportunityName: OpportunityName,
      CompanyName: CompanyName,
      category: category,
      Hours: Hours,
      MinAge: MinAge,
      Date: Date,
      timings: timings,
      Location: Location,
      police: police,
      details: details,
      OrganizerUID: user.uid,
    }); {
      sweetAlert("Nice!", "Activity Submitted", "success")
    };
  }
}

//Setting minimum limit on the date!
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
//displays 0 infront of number if day is less that 10!
if (dd < 10) {
  dd = '0' + dd
}
//Displays 0 infront of number if month is less that 10!
if (mm < 10) {
  mm = '0' + mm
}
document.getElementById("Date").setAttribute("min", today);