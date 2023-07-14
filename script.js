const signupForm = document.getElementById("signupform");
const loginForm = document.getElementById("loginform");
const welcomeCard = document.getElementById("welcomeCard");
const linkBtn = document.getElementsByClassName("linkBtn");
const loginBtn = linkBtn[0];
const signupBtn = linkBtn[1];
const loginBtn2 = linkBtn[2];

loginForm.style.display = "none";
welcomeCard.style.display = "none";

signupBtn.addEventListener("click", () => {
  loginForm.style.display = "none";
  welcomeCard.style.display = "none";
  signupForm.style.display = "block";
});

loginBtn.addEventListener("click", () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  welcomeCard.style.display = "none";
});

loginBtn2.addEventListener("click", () => {
  loginForm.style.display = "block";
  signupForm.style.display = "none";
  welcomeCard.style.display = "none";
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Perform validation
  if (!(validateName(firstname) && validateName(lastname))) {
    alert("Please enter a valid Name.");
    return;
  }

  if (!validateName(username)) {
    alert("Please enter a valid username.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePassword(password)) {
    alert(
      `Please enter a password with at least 1 special character, 1 capital, 1 lowercase, 1 uppercase and must be 8 characters long`
    );
    return;
  }

  // Retrieve existing users from local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the username already exists
  const existingUser = storedUsers.find((user) => {
    return user.username === username || user.email === email;
  });

  if (existingUser) {
    alert(
      "Username or Email already exists. Please choose a different username."
    );
    return;
  }

  // Create an object for the new user
  const newUser = {
    firstname,
    lastname,
    email,
    username,
    password,
  };

  // Add the new user to the existing users array
  storedUsers.push(newUser);

  // Store the user object in local storage
  localStorage.setItem("users", JSON.stringify(storedUsers));

  // Display login form
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  document.getElementById("loginUsername").value = username; // Display the username on login form
  document.getElementById("loginPassword").focus(); // Set focus on password field
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const loginUsername = document.getElementById("loginUsername").value;
  const loginPassword = document.getElementById("loginPassword").value;

  // Retrieve users from local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Find the matching user
  const matchedUser = storedUsers.find((user) => {
    return user.username === loginUsername && user.password === loginPassword;
  });

  // Check if users found in local Storage
  if (matchedUser) {
    alert("Login Successful");

    // Display Welcome Card and Hide Login Form
    welcomeCard.style.display = "block";
    loginForm.style.display = "none";

    // Remove all the Existing List Items
    let userlist = document.getElementById("userDetail");
    while (userlist.hasChildNodes()) {
      userlist.removeChild(userlist.firstChild);
    }

    // Displays all the properties of User Object in unordered List
    for (const key in matchedUser) {
      let listItem = document.createElement("li");
      listItem.innerText = `${key}: ${matchedUser[key]}`;
      userlist.appendChild(listItem);
    }
  } else {
    alert("Invalid credentials");
  }
});

// Function to validate name field
function validateName(name) {
  return name.trim() !== "";
}

// Function to validate email field
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password field
function validatePassword(password) {
  const passRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return passRegex.test(password);
}
