//App JS file

$(document).ready(function() {


    var config = {
        apiKey: "AIzaSyAGo6BcCYEpuJROrJvlI2MN7mZ-GHcNdh4",
        authDomain: "gylt-032618.firebaseapp.com",
        databaseURL: "https://gylt-032618.firebaseio.com",
        projectId: "gylt-032618",
        storageBucket: "",
        messagingSenderId: "847473657489"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();
});

//Google API key: AIzaSyACdS2nqBDGsYpiAlVFTQR-TNKNGuKgosc




//Bar Hopping App

/*If user is going to a bar/grille, they can search for locations either close to them or in the search options, give a radius/miles/location description and hit
the search button.  Search results should display the desired bar/grille locations and along with it should display estimates for time and price
© 2018 GitHub, Inc.