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
      	} //loop end
      } //addButtons function end

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
      }); //click function end

      // send an alert for the actor's name
      function displayActorInfo() {
      	//getting data attribute value of the button clicked
      	var actorName = $(this).attr("data-name")
      	console.log(actorName);
      	
            //searching the Giphy APi for the name in the data attribute
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actorName + "&api_key=dc6zaTOxFJmzC&limit=10";

            //performing Ajax GET request and run function for response after GET is done
      	$.ajax({
      	  url: queryURL,
      	  method: "GET"
      	}).done(function(response) {
      	  console.log(queryURL);
      	  
              //storing results from API response in a variable
      	  var results = response.data;
      	  console.log(results);

              //empty #actors div before loop to clear previous gifs
      	  $("#actors").empty();

      	  //looping through each result item
      	  for (i = 0; i < results.length; i++) {
      	  	
      	  	//creating a div for each item
      	  	var actorDiv = $("<div>");

      	  	//creating a paragraph to store each rating
      	  	var p = $("<p>").text("Rating: " + results[i].rating);

      	  	//creating and storing an image tag
      	  	var actorImage = $("<img>");

                  var animated = results[i].images.fixed_height.url;
                  var still = results[i].images.fixed_height_still.url;

                  actorImage.attr("src", still);
                  actorImage.attr("data-still", still);
                  actorImage.attr("data-animate", animated);
                  actorImage.attr("data-state", still);
                  actorImage.addClass("gif");
      	  	
                  //TRIED TO DO DRY METHOD OF ASSIGNING .ATTR BUT COULDN'T GET TO WORK
                   //setting src attribute of images to property of result item
      	  	// $(actorImage).attr({
                  // src: still,                         
                  //"data-still": still, 
                  //"data-animate": animated, 
                  //"data-state": "still"
                  // });

                  
      	  	//appending the image and paragraph to the div
      	  	actorDiv.append(actorImage);
      	  	actorDiv.append(p);

      	  	//in div with ID #actors prepend each of the images as they loop through
      	  	$("#actors").prepend(actorDiv);
      	  } //for loop end

                  
                        $(document).on("click", ".gif", function() {
                              var state = $(this).attr("data-state");
                                                            
                              if (state === "still") {
                                    $(this).attr("src", $(this).data("animate"));
                                    $(this).attr("data-state", "animate");
                              } else {
                                    $(this).attr("src", $(this).data("still"));
                                    $(this).attr("data-state", "still");
                              } //end else statement



                              //THIS CODE DIDN'T WORK, not sure why
                              // if (state === "still") {
                              //       $(this).attr("src", $(this).attr("data-animate"));
                              //       $(this).attr("data-state", "animate");
                              // } else {
                              //       $(this).attr("src", $(this).attr("data-still"));
                              //       $(this).attr("data-state", "still");
                              // } //end else statement

                        }); //.gif click function end

      	}); //response function end
      } //displayActorInfo function end

                        
      

      //listen for a click on the page and in element with class .actor run a function
      $(document).on("click", ".actor", displayActorInfo);
      
