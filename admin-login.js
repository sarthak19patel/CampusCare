document.getElementById("adminLoginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if(email === "admin@campuscare.com" && password === "admin123"){
    localStorage.setItem("adminLoggedIn", "true");
    window.location.href = "admin.html";
  } else {
    alert("Invalid Admin Credentials");
  }
});