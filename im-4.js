        function openImageGeneratorModal() {
            const userAccount = JSON.parse(localStorage.getItem('isLoggedIn'));
            if (userAccount) {
                const userLimits = {
                    limited: 4,
                    unlimited: Infinity
                };
                const usageKey = `usage_${isLoggedIn.username}_${new Date().toISOString().split('T')[0]}`;
                let storedUsageDate = localStorage.getItem("usageDate");
                let usageCount = 0;

                if (storedUsageDate !== new Date().toISOString().split('T')[0]) {
                    localStorage.setItem("usageDate", new Date().toISOString().split('T')[0]);
                    localStorage.setItem(usageKey, 0);
                } else {
                    usageCount = parseInt(localStorage.getItem(usageKey)) || 0;
                }

                if (usageCount >= userLimits[isLoggedIn.accountType]) {
                    alert('Bạn đã đạt đến ngưỡng giới hạn.');
                } else {
                    document.getElementById('dialog-xlll').classList.remove('hidden');
                }
            }
        }

        function closeImageGeneratorModal() {
            document.getElementById('image-generator-modal').classList.add('hidden');
            document.getElementById('image-generator-form').reset();
            document.getElementById('error-message').classList.add('hidden');
            document.getElementById('generated-image').innerHTML = '';
        }

        document.getElementById('image-generator-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const prompt = document.getElementById('prompt').value;
            generateImage(prompt);
        });

        // Initially hide the "Generate Image" button if testuser has exceeded the limit
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (isLoggedIn && isLoggedIn.username === 'testuser') {
            const usageKey = `usage_${isLoggedIn.username}_${new Date().toISOString().split('T')[0]}`;
            let storedUsageDate = localStorage.getItem('usageDate');
            let usageCount = 0;

            if (storedUsageDate !== new Date().toISOString().split('T')[0]) {
                localStorage.setItem('usageDate', new Date().toISOString().split('T')[0]);
                localStorage.setItem(usageKey, 0);
            } else {
                usageCount = parseInt(localStorage.getItem(usageKey)) || 0;
            }

            if (usageCount >= 4) {
                const generateButtons = document.querySelectorAll('button[data-role="generate-button"]');
                generateButtons.forEach(button => button.style.display = 'none');
            }
        }

        function generateImage(prompt) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                const usageKey = `usage_${userInfo.userId}_${new Date().toISOString().split('T')[0]}`;
                const usageCount = parseInt(localStorage.getItem(usageKey)) || 0;
                const userLimits = {
                    "janedoe": Infinity,
                    "testuser": 3
                };

                if (usageCount >= userLimits[userInfo.username]) {
                    document.getElementById('error-message').innerText = 'Bạn đã đạt đến ngưỡng giới hạn.';
                    document.getElementById('error-message').classList.remove('hidden');
                    return;
                }

                document.getElementById('spinner').classList.remove('hidden');

                fetch("https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQm1kOFBXU05tYk0zYjl2QVl4MjE1dHlDbl83OUdDQ3dwSUR0dXdYWmlCeFFKVmZESm4xakpSTU1uczZjV2RQaktDd085cnFaZU1ab19hbDk4ZmJGYVJLdm1keG44N2x2dmVzWURGSUU4TnBGMjFkZFU9", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: prompt })
                })
                .then(response => response.json())
                .then(data => {
                    document.getElementById('spinner').classList.add('hidden');
                    if (data.status === 'success') {
                        document.getElementById('generated-image').innerHTML = `<img src="${data.imageUrl}" alt="Generated Image" class="w-full h-auto rounded-2xl mt-4" onclick="openFullscreenModal('${data.imageUrl}')">`;
                        localStorage.setItem(usageKey, usageCount + 1);
                    } else {
                        document.getElementById('error-message').innerText = 'Error generating image. Please try again.';
                        document.getElementById('error-message').classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Error generating image:', error);
                    document.getElementById('spinner').classList.add('hidden');
                    document.getElementById('error-message').innerText = 'Error generating image. Please try again.';
                    document.getElementById('error-message').classList.remove('hidden');
                });
            }
        }
