function checkGuest() {
    const name = document.getElementById('fullname').value.trim();
    const guests = {
        "Станіслав Петрів": "assets/videos/petriv.mp4",
        "Іван Іванов": "assets/videos/ivanov.mp4"
    };

    document.getElementById("login-screen").classList.remove("active");
    document.getElementById("main-screen").classList.add("active");

    if (guests[name]) {
        document.getElementById("personalVideoSrc").src = guests[name];
        document.getElementById("personal-video").classList.remove("hidden");
    }
}

function showWishlist() {
    document.getElementById("wishlist").classList.toggle("hidden");
}

function showGuests() {
    document.getElementById("guests").classList.toggle("hidden");
}
