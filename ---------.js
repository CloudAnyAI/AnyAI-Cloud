
        document.addEventListener("DOMContentLoaded", function() {
            const validUsers = {
                "user1": { password: "password1", name: "John Doe", gender: "Male", avatar: "https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png" },
                "user2": { password: "password2", name: "Jane Doe", gender: "Female", avatar: "https://example.com/avatar2.png" },
                // Add more users as needed
            };
            const form = document.getElementById("loginForm");
            const modal = document.getElementById("alertModal");
            const modalMessage = document.getElementById("modalMessage");
            
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                const username = document.getElementById("username").value;
                if (validUsers[username] && validUsers[username].password === document.getElementById("password").value) {
    document.getElementById("greeting").textContent = `Chào người dùng ${validUsers[username].name}`;
    document.getElementById("userName").textContent = `Name: ${validUsers[username].name}`;
    document.getElementById("userGender").textContent = `Gender: ${validUsers[username].gender}`;
    document.getElementById("userAvatar").src = validUsers[username].avatar;
    form.style.display = "none";
    document.getElementById("userInfo").style.display = "block"; // add this line
} else {
                    modalMessage.textContent = "Invalid username or password.";
                    modal.classList.remove("animate__fadeOutDown");
                    modal.style.display = "flex";
                    modal.classList.add("animate__fadeInUp");
                    
                    setTimeout(function() {
                        modal.classList.remove("animate__fadeInUp");
                        modal.classList.add("animate__fadeOutDown");
                        setTimeout(function() {
                            modal.style.display = "none";
                            modal.classList.remove("animate__backOutDown");
                        }, 1000); // The duration of the exit animation
                    }, 5000);
                }
                form.reset();
            });
        });
    