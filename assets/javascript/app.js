// Initial array of actors
var actors = ["Chris Farley", "Jim Carrey", "Will Smith", "Martin Lawrence", "Bruce Willis", 
"Steven Seagal", "Samuel L Jackson", "David Spade", "Will Ferrell", "Robin Williams", 
"Bill Murray", "Mike Myers", "Jerry Seinfeld", "Dave Chapelle", "Vince Vaughn"];

	  // Function for displaying actor data
      function addButtons() {
      	//clearing the div to prevent duplicates
      	$("#actorButtons").empty();

      	//loop through the array of actors
      	for (i = 0; i < actors.length; i++) {
      		console.log(actors[i]);
      		//generate a button for each actor in the array
      		var newButton = $("<button>");
      		//add a class
      		newButton.addClass("actor");
      		//add a data attribute
      		newButton.attr("data-name", actors[i]);
      		//add each actor's name as text inside the button
      		newButton.text(actors[i]);
      		//append each button at the end
      		$("#actorButtons").append(newButton);
      	}
      }
      //display the initial list of movies
      addButtons();

      //when the submit button is clicked, or the user hits enter, the code will run
      $("#addActor").on("click", function(event) {
      	event.preventDefault();

      	//store text value from text box in a variable
      	var newActor = $("#actorInput").val().trim();
      	//add value to array
      	actors.push(newActor);
      	//run function to show the new button at the end of the array
      	addButtons();
      });
