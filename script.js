if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/Z-Warriors-Gym/') {
    window.addEventListener('load', () => {
        const logoOverlay = document.getElementById('logo-overlay');
        const mainContent = document.getElementById('main-content');
        const video = document.getElementById('video-background');
        const playButton = document.getElementById('play-button');

        setTimeout(() => {
            logoOverlay.style.display = 'none';
            mainContent.style.display = 'block';

            if (video) {
                video.style.display = 'block';
                video.load();
                video.currentTime = 0;
                video.play().then(() => {
                    console.log('Video autoplay started successfully');
                }).catch(error => {
                    console.error('Video autoplay failed:', error.message);
                    if (playButton) playButton.style.display = 'flex';
                });
            }
        }, 3000);

        window.playVideo = function() {
            if (video) {
                video.muted = false;
                video.play().then(() => {
                    if (playButton) playButton.style.display = 'none';
                    console.log('Video played with audio');
                }).catch(error => {
                    console.error('Video play failed:', error.message);
                    alert('Failed to play video. The audio may work, but the video display failed. Check the console for details.');
                });
            }
        };
    });
}

if (window.location.pathname.endsWith('merch.html')) {
    window.addEventListener('load', () => {
        const audio = document.getElementById('bg-audio');
        const audioControl = document.getElementById('audio-control');

        if (audio) {
            audio.volume = 0.2;
            if (audioControl) audioControl.style.display = 'flex';
        }

        window.playAudio = function() {
            if (audio) {
                audio.muted = false;
                audio.play().then(() => {
                    if (audioControl) {
                        audioControl.textContent = '⏸';
                        audioControl.onclick = pauseAudio;
                    }
                    console.log('Audio played with sound');
                }).catch(error => {
                    console.error('Audio play failed:', error.message);
                    alert('Failed to play audio. Check the console for details.');
                });
            }
        };

        window.pauseAudio = function() {
            if (audio) {
                audio.pause();
                audio.muted = true;
                if (audioControl) {
                    audioControl.textContent = '▶';
                    audioControl.onclick = playAudio;
                }
                console.log('Audio paused');
            }
        };
    });
}

if (document.querySelector('.video-background')) {
    const captions = [
        { text: "Power Up Your Fitness", subtext: "Step into Z Warriors Gym and transform your body." },
        { text: "Join the Warrior Community", subtext: "Experience high-energy group classes." },
        { text: "Unleash Your Strength", subtext: "Lift heavy and conquer your goals." }
    ];
    let captionIndex = 0;
    const captionText = document.getElementById('caption-text');
    const captionSubtext = document.getElementById('caption-subtext');

    function updateCaption() {
        captionText.textContent = captions[captionIndex].text;
        captionSubtext.textContent = captions[captionIndex].subtext;
        captionIndex = (captionIndex + 1) % captions.length;
    }

    updateCaption();
    setInterval(updateCaption, 10000);
}

function selectAnswer(answer) {
    const questionDiv = document.getElementById('quiz-question');
    const resultDiv = document.getElementById('quiz-result');
    const resultText = document.getElementById('result-text');

    questionDiv.style.display = 'none';
    resultDiv.style.display = 'block';

    if (answer === 'strength') {
        resultText.textContent = 'Dragon Strength';
    } else if (answer === 'cardio') {
        resultText.textContent = 'Energy Blast Cardio';
    } else if (answer === 'mindset') {
        resultText.textContent = 'Warrior Mindset';
    }
}

function calculate() {
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const goal = document.getElementById('goal').value;
    const bodyPart = document.getElementById('bodyPart').value;

    if (isNaN(age) || isNaN(weight)) {
        alert("Please enter valid numbers for age and weight!");
        return;
    }

    const waterIntake = (weight * 0.033).toFixed(2);
    let calories, foodRecommendation, foodsToAvoid;

    if (goal === "bulk") {
        calories = weight * 35;
        foodRecommendation = "Eat high-protein foods like chicken, eggs, rice, nuts, and healthy fats like avocado.";
        foodsToAvoid = "Avoid sugary snacks and processed foods.";
    } else if (goal === "cut") {
        calories = weight * 25;
        foodRecommendation = "Focus on lean proteins like fish, turkey, and tofu. Add plenty of vegetables and limit carbs.";
        foodsToAvoid = "Avoid fried foods, sugary drinks, and high-calorie snacks.";
    } else {
        calories = weight * 30;
        foodRecommendation = "Balance protein, carbs, and fats. Include chicken, fish, whole grains, and vegetables.";
        foodsToAvoid = "Avoid processed foods and excessive sugar.";
    }

    const workoutVideos = {
        biceps: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
        triceps: "https://www.youtube.com/embed/6kALZikXxLc",
        calves: "https://www.youtube.com/embed/-M4-G8p8fmc",
        back: "https://www.youtube.com/embed/CAwf7n6Luuc",
        abs: "https://www.youtube.com/embed/Xyd_fa5zoEU",
        forearms: "https://www.youtube.com/embed/u8xswQnwNlE",
        quads: "https://www.youtube.com/embed/Dy28eq2PjcM",
        hamstrings: "https://www.youtube.com/embed/2SHsk9AzdjA"
    };

    const result = `
        <p><strong>Water Intake:</strong> ${waterIntake} Liters/Day</p>
        <p><strong>Calories:</strong> ${calories.toFixed(2)} Calories/Day</p>
        <p><strong>Food Recommendation:</strong> ${foodRecommendation}</p>
        <p><strong>Foods to Avoid:</strong> ${foodsToAvoid}</p>
    `;
    document.getElementById('result').innerHTML = result;
    document.getElementById('video').src = workoutVideos[bodyPart];
}

if (document.getElementById('timer')) {
    let time = 0;
    let timerInterval = null;
    const timerDisplay = document.getElementById('timer');
    const dingSound = document.getElementById('ding-sound');

    function updateTimer() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    window.startTimer = function() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                time++;
                updateTimer();
            }, 1000);
        }
    };

    window.stopTimer = function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            dingSound.play();
        }
    };

    window.resetTimer = function() {
        clearInterval(timerInterval);
        timerInterval = null;
        time = 0;
        updateTimer();
        dingSound.play();
    };

    updateTimer();
}

if (document.getElementById('current-time')) {
    const currentTimeDisplay = document.getElementById('current-time');

    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}