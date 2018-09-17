$("#logout").on("click", function() {
    firebase.auth().signOut().then(function() {
        alert("successfully signed out");
        window.open("../index.html",'_self',false);
    }, function(error) {
        alert(error)
});
});