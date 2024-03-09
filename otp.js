document.addEventListener("DOMContentLoaded", async function () {
    const otpForm = document.querySelector('.container');
    const errorMsg = document.getElementById('error-msg');

    otpForm.addEventListener('click', async event => {
        if (event.target.classList.contains('btn-verify')) {
            const otpInputs = document.querySelectorAll('.digit');
            let otp = '';

            otpInputs.forEach(input => {
                otp += input.value;
            });

            const email = getEmailFromQuery();

            const data = {
                email: email,
                otp: otp
            };

            try {
                const response = await fetch('https://codynn.com/bikerszone/api/auth/verifyOtp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    window.location.href = 'dashboard.html';
                } else {
                    // const responseData = await response.json();
                    alert("Please enter the OTP sent to the mail");
                    
                }
            } catch (error) {
                console.error(error);
                alert("Server down! Please try again later!");

            }
        }
    });

    function getEmailFromQuery() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('email');
    }
});
