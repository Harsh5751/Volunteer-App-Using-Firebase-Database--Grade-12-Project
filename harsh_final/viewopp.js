sweetAlert("please","Make Sure you are logged in and select the volunteer button in discover opportunities to view your opportunities", "warning")
window.onload = function() {
    var useruid = "YKWI5cu22xO0sYq00WVzXadcxTJ2";
    firebase.database().ref().child("users/" + useruid + "/opportunities").once('value').then(function(snapshot) {
        var signedUp = snapshot.val()
        var signedUpNames = []
        for (oppName in signedUp) {
            var name = signedUp[oppName].name
            signedUpNames.push(name)
        }
        firebase.database().ref().once('value').then(function(snapshot) {
          var oppData = snapshot.val()['Volunteer Opportunities']
          signedUpNames.forEach( name => {
              for (key in oppData) {
                  if (key === name) {
                      var opp = oppData[key]
                      var html = 
                      `<div class="col s6 m7" id="item">
                            <h2 class="header">${opp.OpportunityName}</h2>
                            <div class="card horizontal">
                                <div class="card-stacked">
                                    <div class="card-content">
                                        <p>${opp.details}</p>
                                    </div>
                                <div class="card-action">
                                    <a>View</a>
                                </div>
                            </div>
                        </div>
                        </div>`
                     document.querySelector(".container").innerHTML += html
                  }
              }
          })
});
    })
    
    
    
    
    
}

