document.getElementById("loginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("loggedInUser", JSON.stringify(data.user));

            const popup = document.getElementById("successPopup");

            if (popup) {
                popup.classList.add("is-visible");
                popup.setAttribute("aria-hidden", "false");
            }

            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);

        } else {
            alert(data.message || "Invalid Credentials");
        }

    } catch (error) {
        alert("Backend server is not running");
        console.error(error);
    }

});