// Initialize Firebase
 var config = {
    apiKey: "AIzaSyAkRZ51gFdSs0FIgo6z8p02eg_pd6c2osw",
    authDomain: "class1-6c767.firebaseapp.com",
    databaseURL: "https://class1-6c767.firebaseio.com",
    projectId: "class1-6c767",
    storageBucket: "class1-6c767.appspot.com",
    messagingSenderId: "277353275767"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destinationRole = $("#destination-input").val().trim();
    var trainStart = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    console.log("1 TRAIN-START"+trainStart);
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: destinationRole,
      start: trainStart,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log("name"+newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.start);
    // console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  //Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    // console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationRole = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(destinationRole);
    console.log(trainStart);
    console.log(trainFrequency);
  
    // Assumptions
    var tFrequency = trainFrequency;
    console.log(trainFrequency);

    // Time is 3:30 AM
    // var firstTime = trainStartPretty;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainStart, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("this is the remainder"+tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var nextTrainTime=moment(nextTrain).format("hh:mm")
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationRole + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + tMinutesTillTrain + "</td></tr>");
  });
