document.addEventListener("DOMContentLoaded", async function () {
    const loginForm = document.querySelector('#login-form');
    const errorMsg = document.getElementById('error-msg');

    loginForm.addEventListener('submit', async event => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = {
            email: email,
            password: password
        };
        try {
            const response = await fetch('https://codynn.com/bikerszone/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            });

            if (response.ok) {
                window.location.href = `otp.html?email=${email}`;
                console.log("Login successful!");
            } else {
                const responseData = await response.json();
                errorMsg.textContent = responseData.error || 'An error occured.';
                errorMsg.style.display = 'block';
            }
        } catch (error) {
            console.error(error);
            errorMsg.textContent = 'An unexpected error occurred. Please try again later.';
            errorMsg.style.display = 'block';
        }
    });
});