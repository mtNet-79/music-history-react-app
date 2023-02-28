import nations from "./_DATA";

function generateUID() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatComposer({
  name,
  birthday,
  deathday,
  nationalities,
  author,
  image,
  styles,
  contemporaries,
  compositions,
  period_id,
}) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    name,
    birthday,
    deathday,
    nationalities,
    image,
    styles,
    contemporaries,
    compositions,
    period_id,
  };
}

export function formatPerformer({
  name,
  birthday,
  deathday,
  nationalities,
  author,
  image,
  styles,
  contemporaries,
  recordings,
}) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    name,
    birthday,
    deathday,
    nationalities,
    image,
    styles,
    contemporaries,
    recordings,
  };
}

export function formatUser({ fullName, image, password, userName, users }) {
  let userIdIsAvailable = true;
  let userId = "";
  if (userName) {
    userId = userName;
    userIdIsAvailable = checkUserIdIsAvailable(users, userId);
  } else {
    //no user name provided, create one
    userId = fullName.trim().toLowerCase();
    const [firstName, lastName] = userId.split(" ");
    userId = firstName.slice(0, 1) + lastName;
    const userKeys = Object.keys(users);
    userKeys.forEach((user) => {
      if (user === userId) userId = firstName.slice(0, 2) + lastName;
    });
    //check if generated name is available
    userIdIsAvailable = checkUserIdIsAvailable(users, userId);
  }

  let returnValue = null;

  if (userIdIsAvailable)
    returnValue = {
      id: userId,
      password,
      name: fullName,
      avatarURL: image,
      answers: {},
      polls: [],
    };

  return returnValue;
}

function checkUserIdIsAvailable(users, userId) {
  let returnVal = true;
  if (users) {
    Object.keys(users).forEach((user) => {
      if (user === userId) {
        returnVal = false;
      }
    });
  }

  return returnVal;
}

export function autoComplete(inp, state) {
  var a, b;
  const userArr = Object.keys(state);
  /*close any already open lists of autocompleted values*/
  closeAllLists();
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  a = document.createElement("div");
  a.setAttribute("id", inp.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");

  inp.parentNode.appendChild(a);
  // debugger;
  // a.setAttribute("display", "hidden");
  var currentFocus = -1;

  if (inp.value === "") {
    // userArr.forEach((userName) => {
    //   b = document.createElement("div");
    //   b.innerHTML = userName;
    //   b.innerHTML += "<input type='hidden' value=\"" + userName + '">';
    //   b.addEventListener("click", function (e) {
    //     //insert the value from autocomplt array to input field
    //     inp.value = this.getElementsByTagName("input")[0].value;
    //     console.log("HELLO FROM IN")
    //     closeAllLists();
    //   });
    //   a.appendChild(b);
    // });

    document.addEventListener("click", function (e) {
      // console.log("HELLO FROM THE AUTOC FUNC")
      closeAllLists(e.target);
      if (!e.target.matches("#" + inp.id)) {
        closeAllLists();
      }
    });
    return false;
  }

  userArr.forEach((userName) => {
    if (
      userName.substring(0, inp.value.length).toUpperCase() ===
      inp.value.toUpperCase()
    ) {
      // document.querySelector(".pop-out").style.visibility = "visible";
      b = document.createElement("div");
      b.innerHTML =
        "<strong>" + inp.value.substring(0, inp.value.length) + "</strong>";
      b.innerHTML += userName.substring(inp.value.length);
      //insert an input field that will hold the current array item's value:
      b.innerHTML += "<input type='hidden' value=\"" + userName + '">';
      //execute a function when someone clicks on the item value (DIV element):
      b.addEventListener("click", function (e) {
        //insert the value from autocomplt array to input field
        inp.value = this.getElementsByTagName("input")[0].value;
        //GET ADDRESS FROM LESSEENAME AND PUT IN THE ADDRESS TD ON THE CORRECT ROW
        closeAllLists();
      });
      //APPEND THESE NEW AUTOCOMPLETE LIST DIVS NEW THE NEW OUTER DIV
      a.appendChild(b);
    }
  });

  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode === 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode === 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode === 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt !== x[i] && elmnt !== inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    if (!e.target.matches("#" + inp.id)) {
      closeAllLists();
    }
  });
}
