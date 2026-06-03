document.getElementById("registerForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const extra = document.getElementById("signupExtra");
    const submitBtn = this.querySelector('button[type="submit"]');

    // Step 1: match the design (email-first flow)
    if (extra && extra.classList.contains("is-hidden")) {
        extra.classList.remove("is-hidden");

        // enable required validation only when fields are visible
        extra.querySelectorAll("[data-required='true']").forEach((el) => {
            el.setAttribute("required", "required");
        });

        if (submitBtn) submitBtn.textContent = "Create account";
        const nameInput = document.getElementById("name");
        if (nameInput) nameInput.focus();
        return;
    }

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    const user = {
        name,
        email,
        password
    };

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    alert("Account Created Successfully");

    window.location.href="login.html";
});
