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




//When user clicks on search button on Homes side, search query will pull up housing locations based on desired search options(radius, miles, etc)

//When user clicks on search button for Jobs side, search query will pull up available jobs within location based on search options(radius, miles, etc)

//Screen will be initially split into 2 parts; the left side will be the search for Home(housing, apartment, etc)

//Right side will have search for Jobs

//Below both sides, a chart will pop up with statistics