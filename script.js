const signupForm = document.getElementById("signupform");
const loginForm = document.getElementById("loginform");
const linkBtn = document.getElementsByClassName("linkBtn");
const loginBtn = linkBtn[0];
const signupBtn = linkBtn[1];

loginForm.style.display = "none";

signupBtn.addEventListener("click", () => {
  (loginForm.style.display = "none"), (signupForm.style.display = "block");
});

loginBtn.addEventListener("click", () => {
  (loginForm.style.display = "block"), (signupForm.style.display = "none");
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  // Get form values
  const firstname = document.getElementById("fname").value;
  const lastname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Retrieve existing users from local storage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the username already exists
  const existingUser = storedUsers.find( user => {
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
  const matchedUser = storedUsers.find( user => {
    return user.username === loginUsername && user.password === loginPassword;
  })

  if (matchedUser) {
    alert("Login Successful");
  } else {
    alert("Invalid credentials");
  }
});
