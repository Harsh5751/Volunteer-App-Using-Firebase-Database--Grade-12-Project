window.onload = function WindowLoad(event) {
    console.log("Page is loaded");
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("User is signed in.");
        } else {
            // No user is signed in.
            console.log("No user is signed in.");
        }
    });
}

