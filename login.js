document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const savedUser =
        JSON.parse(localStorage.getItem("user"));

    if(
        savedUser &&
        email===savedUser.email &&
        password===savedUser.password
    ){
        try {
            localStorage.setItem("loggedInUser", JSON.stringify(savedUser));
        } catch (e) {}

        const popup = document.getElementById("successPopup");
        popup.classList.add("is-visible");
        popup.setAttribute("aria-hidden", "false");

setTimeout(() => {
    window.location.href="campuscarehome.html";
}, 2000);
    }
    else{
        alert("Invalid Credentials");
    }

});
