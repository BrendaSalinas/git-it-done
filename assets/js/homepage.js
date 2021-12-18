var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a get request to url
    fetch(apiUrl).then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayRepos(data, user);
        }); 
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function(error) {
      //Notice this '.catch()' getting chained onto the end of the '.then() method
      alert("Unable to connect to GitHub");
    });
  };
  

  //storing data from HTML elements 

  var userFormEl = document.querySelector("#user-form");
  var nameInputEl = document.querySelector("#username");

  // this function will be executed when the get user button is clicked 

  var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element 
    var username = nameInputEl.value.trim();
    if (username){
        getUserRepos(username);
        nameInputEl.value = "";

    }else {
        alert("Please enter a Github username");
    };
  };

  var displayRepos = function (repos, searchTerm) {
    //Check if api returned any repos, this is for usernames that have no repositories 
    if (repos.length === 0) {
      repoContainerEl.textContent = "No repositories found.";
      return;
    }
    //Clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //displaying repository data to the page, loop over repos
    for (var i = 0; i<repos.length; i++) {
      //format repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;

      //create a container for each repo
      var repoEl = document.createElement("div");
      repoEl.classList = "list-item  flex-row justify-space-between align-center";

      //create a span element to hold repository name
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;

      //append to container
      repoEl.appendChild(titleEl);

      //create a status element (this is for displaying issues on the side)
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";

      //Check if current repo has issues or not
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
      } else {
        statusEl.innerHTML = "<i class = 'fas fa-check-square status-icon icon-success'></i>";
      }
      //append to container 
      repoEl.appendChild(statusEl);

      //append container to the dom 
      repoContainerEl.appendChild(repoEl);
    }
  };


  userFormEl.addEventListener("submit", formSubmitHandler);