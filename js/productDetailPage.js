document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", () => {
            const list = document.getElementById(button.getAttribute("aria-controls"));
            const plusIcon = button.querySelector(".plus-icon");
            const minusIcon = button.querySelector(".minus-icon");

            // Close all sections & reset icons
            document.querySelectorAll(".feature-list").forEach(sec => sec !== list && sec.classList.add("hidden"));
            document.querySelectorAll(".toggle-btn").forEach(btn => {
                btn.querySelector(".plus-icon").classList.remove("hidden");
                btn.querySelector(".minus-icon").classList.add("hidden");
            });

            // Toggle current section & update icons
            list.classList.toggle("hidden");
            plusIcon.classList.toggle("hidden", !list.classList.contains("hidden"));
            minusIcon.classList.toggle("hidden", list.classList.contains("hidden"));
        });
    });
});
