document.addEventListener("DOMContentLoaded", function () {

  // 🔹 1. Navbar shadow on scroll
  const header = document.querySelector("header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });


  // 🔹 2. Active nav link switching
  const links = document.querySelectorAll(".nav-link");

  links.forEach(link => {
    link.addEventListener("click", function () {
      links.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

});

// contact me form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const button = form.querySelector("button");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();

    // 🔹 Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Please enter a valid name (letters only).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // 🔹 Loading state
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = "Sending...";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Success UI
        successMessage.classList.remove("d-none");
        successMessage.classList.add("show");

        form.reset();

        button.textContent = "Sent ✓";

        successMessage.scrollIntoView({ behavior: "smooth" });

      } else {
        throw new Error("Form submission failed");
      }

    } catch (error) {
      alert("Oops! Something went wrong. Please try again.");

      // Restore button if failed
      button.disabled = false;
      button.textContent = originalText;
    }
  });
});