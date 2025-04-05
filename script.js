// Logo Fade Effect on Reload (for index.html)
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    window.addEventListener('load', () => {
        const logoOverlay = document.getElementById('logo-overlay');
        const mainContent = document.getElementById('main-content');
        
        setTimeout(() => {
            logoOverlay.style.display = 'none';
            mainContent.style.display = 'block';
        }, 3000);
    });
}

// Image Slider (for index.html)
if (document.querySelector('.slider')) {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlides() {
        const slidesContainer = document.querySelector('.slides');
        slidesContainer.style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    function changeSlide(n) {
        slideIndex += n;
        if (slideIndex >= totalSlides) slideIndex = 0;
        if (slideIndex < 0) slideIndex = totalSlides - 1;
        showSlides();
    }

    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

// Quiz Functionality (for quiz.html)
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