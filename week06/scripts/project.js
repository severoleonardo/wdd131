
// Quiz data
const quizData = [
    {
        question: "What was the first game to use a basic form of AI?",
        answers: [
            "Pac-Man",
            "Pong",
            "Space Invaders",
            "Tetris"
        ],
        correct: 1,
        explanation: "Pong (1972) was one of the first games to implement a rudimentary form of AI, where the computer-controlled opponent moved its paddle to intercept the ball."
    },
    {
        question: "What type of AI is used to control the ghosts in Pac-Man?",
        answers: [
            "Neural Networks",
            "Genetic Algorithms",
            "Finite State Machines (FSM)",
            "Machine Learning"
        ],
        correct: 2,
        explanation: "Pac-Man ghosts use Finite State Machines (FSM), where each ghost has distinct behaviors based on states like chase, scatter, or flee."
    },
    {
        question: "In what year did Deep Blue defeat Garry Kasparov in chess?",
        answers: [
            "1995",
            "1996",
            "1997",
            "1998"
        ],
        correct: 2,
        explanation: "In 1997, IBM's Deep Blue supercomputer defeated world chess champion Garry Kasparov, marking a historic milestone in AI."
    },
    {
        question: "Which game introduced the revolutionary Nemesis System?",
        answers: [
            "Assassin's Creed",
            "Middle-Earth: Shadow of Mordor",
            "The Witcher 3",
            "Skyrim"
        ],
        correct: 1,
        explanation: "Middle-Earth: Shadow of Mordor (2014) introduced the Nemesis System, where orc enemies remember previous encounters and evolve based on player actions."
    },
    {
        question: "Which console generation marked the transition to 3D graphics and more realistic AI?",
        answers: [
            "4th Generation (16-bit)",
            "5th Generation (PlayStation/N64)",
            "6th Generation (PS2/Xbox)",
            "7th Generation (PS3/Xbox 360)"
        ],
        correct: 1,
        explanation: "The 5th generation, with PlayStation and Nintendo 64, marked the transition to 3D graphics and enabled more complex AIs in three-dimensional environments."
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizCompleted = false;

// DOM elements
let quizContainer, questionTitle, answersContainer, progressFill, progressText, scoreDisplay;
let prevBtn, nextBtn, quizContent, quizResult, resultTitle, resultScore, resultMessage, restartBtn;
let gameForm, formSuccess, gamesGrid;

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    quizContainer = document.getElementById('quiz-container');
    questionTitle = document.getElementById('question-title');
    answersContainer = document.getElementById('answers-container');
    progressFill = document.getElementById('progress-fill');
    progressText = document.getElementById('progress-text');
    scoreDisplay = document.getElementById('score-display');
    prevBtn = document.getElementById('prev-btn');
    nextBtn = document.getElementById('next-btn');
    quizContent = document.getElementById('quiz-content');
    quizResult = document.getElementById('quiz-result');
    resultTitle = document.getElementById('result-title');
    resultScore = document.getElementById('result-score');
    resultMessage = document.getElementById('result-message');
    restartBtn = document.getElementById('restart-btn');
    gameForm = document.getElementById('game-form');
    formSuccess = document.getElementById('form-success');
    gamesGrid = document.getElementById('games-grid');

    // Initialize features
    initializeQuiz();
    initializeForm();
    initializeNavigation();
    initializeLazyLoading();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeCardEffects();
    loadSharedGames(); // Load shared games on initialization
    
    // Update year and last modified date
    const currentYearEl = document.querySelector('#currentyear');
    const lastModifiedEl = document.querySelector('#lastModified');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
});

// Initialize quiz
function initializeQuiz() {
    if (!quizContainer) return;
    
    displayQuestion();
    updateProgress();
    updateScore();
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', previousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
}

// Show current question
function displayQuestion() {
    if (currentQuestion >= quizData.length) {
        showResults();
        return;
    }
    
    const question = quizData[currentQuestion];
    
    if (questionTitle) {
        questionTitle.textContent = question.question;
    }
    
    if (answersContainer) {
        answersContainer.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const answerElement = document.createElement('div');
            answerElement.className = 'answer-option';
            answerElement.textContent = answer;
            answerElement.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(answerElement);
        });
    }
    
    selectedAnswer = null;
    updateButtons();
}

// Select answer
function selectAnswer(index) {
    selectedAnswer = index;
    
    // Remove previous selection
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add current selection
    options[index].classList.add('selected');
    
    updateButtons();
}

// Update buttons
function updateButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = selectedAnswer === null;
        nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
    }
}

// Next question
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Check answer
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.answer-option');
    
    // Show correct answer
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correct) {
        score++;
        updateScore();
    }
    
    // Wait a bit before advancing
    setTimeout(() => {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    }, 1500);
}

// Previous question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

// Update progress
function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    }
}

// Update score
function updateScore() {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

// Show results
function showResults() {
    quizCompleted = true;
    
    if (quizContent) quizContent.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    
    if (resultScore) {
        resultScore.textContent = `Your score: ${score}/${quizData.length} (${percentage.toFixed(0)}%)`;
    }
    
    // Message based on score
    let message = '';
    let title = '';
    
    if (percentage >= 80) {
        title = 'Excellent! 🎉';
        message = 'You are a true expert in game AI! Your knowledge about the evolution of artificial intelligence in video games is impressive.';
    } else if (percentage >= 60) {
        title = 'Very Good! 👏';
        message = 'You have good knowledge about game AI. Keep exploring to become an expert!';
    } else if (percentage >= 40) {
        title = 'Good Job! 👍';
        message = 'You are on the right track! How about reviewing the content and trying again to improve your score?';
    } else {
        title = 'Keep Trying! 💪';
        message = 'Don’t give up! Game AI is a fascinating topic. Explore more of the site and retake the quiz to improve your knowledge.';
    }
    
    if (resultTitle) resultTitle.textContent = title;
    if (resultMessage) resultMessage.textContent = message;
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    quizCompleted = false;
    
    if (quizContent) quizContent.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    
    displayQuestion();
    updateProgress();
    updateScore();
}

// Initialize form
function initializeForm() {
    if (!gameForm) return;

    // Prevent default form submission
    gameForm.addEventListener('submit', function(event) {
        event.preventDefault();
        handleFormSubmit(event);
    });

    // Rating system
    const ratingInputs = document.querySelectorAll('input[name="aiRating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', updateRatingDisplay);
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(gameForm);
    const gameData = {
        id: Date.now(),
        userName: formData.get('userName'),
        gameTitle: formData.get('gameTitle'),
        gameGenre: formData.get('gameGenre'),
        aiRating: formData.get('aiRating'),
        aiDescription: formData.get('aiDescription'),
        newsletter: formData.get('newsletter') === 'on',
        timestamp: new Date().toLocaleDateString('en-US')
    };
    
    // Validation
    if (!gameData.userName || !gameData.gameTitle || !gameData.gameGenre || !gameData.aiRating) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Save to localStorage
    saveGameData(gameData);
    
    // Show success message
    if (gameForm) gameForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
    
    // Update shared games list
    loadSharedGames();
    
    // Scroll to shared games section
    setTimeout(() => {
        const sharedGamesSection = document.querySelector('.shared-games');
        if (sharedGamesSection) {
            sharedGamesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

// Update rating display
function updateRatingDisplay() {
    const ratingInputs = document.querySelectorAll('input[name="aiRating"]');
    const ratingLabels = document.querySelectorAll('.rating-label');

    ratingInputs.forEach((input, index) => {
        if (input.checked) {
            // Highlight stars up to the selected one (left to right)
            for (let i = 0; i <= index; i++) {
                if (ratingLabels[i]) {
                    ratingLabels[i].style.color = 'var(--neon-cyan)';
                    ratingLabels[i].style.textShadow = '0 0 10px var(--neon-cyan)';
                }
            }
            // Reset stars after the selected one
            for (let i = index + 1; i < ratingLabels.length; i++) {
                if (ratingLabels[i]) {
                    ratingLabels[i].style.color = 'var(--text-secondary)';
                    ratingLabels[i].style.textShadow = 'none';
                }
            }
        }
    });
}

// Save game data
function saveGameData(gameData) {
    let savedGames = JSON.parse(localStorage.getItem('sharedGames')) || [];
    savedGames.push(gameData);
    
    // Limit to 10 most recent games
    if (savedGames.length > 10) {
        savedGames = savedGames.slice(-10);
    }
    
    localStorage.setItem('sharedGames', JSON.stringify(savedGames));
}

// Load shared games
function loadSharedGames() {
    if (!gamesGrid) return;
    
    const savedGames = JSON.parse(localStorage.getItem('sharedGames')) || [];
    
    if (savedGames.length === 0) {
        gamesGrid.innerHTML = '<p class="no-games">No games shared yet. Be the first!</p>';
        return;
    }
    
    // Sort by timestamp (most recent first)
    savedGames.sort((a, b) => b.id - a.id);
    
    gamesGrid.innerHTML = '';
    
    savedGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Create game card
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card fade-in-up';
    const ratingValue = parseInt(game.aiRating);
    const stars = Number.isNaN(ratingValue) || ratingValue < 1 ? '' : '⭐'.repeat(ratingValue);
    const genreMap = {
        'acao': 'Action',
        'aventura': 'Adventure',
        'rpg': 'RPG',
        'estrategia': 'Strategy',
        'fps': 'FPS',
        'esporte': 'Sports',
        'corrida': 'Racing',
        'puzzle': 'Puzzle',
        'simulacao': 'Simulation',
        'outro': 'Other'
    };
    
    card.innerHTML = `
        <h3 class="game-title">${escapeHtml(game.gameTitle)}</h3>
        <div class="game-meta">
            By: ${escapeHtml(game.userName)} • ${genreMap[game.gameGenre] || game.gameGenre} • ${game.timestamp}
        </div>
        <div class="game-rating">${stars} (${game.aiRating}/5)</div>
        ${game.aiDescription ? `<p class="game-description">${escapeHtml(game.aiDescription)}</p>` : ''}
    `;
    
    return card;
}

// Escape HTML for safety
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Initialize lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without support
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.pioneer-card, .timeline-item, .game-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scroll for internal links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize hover effects for cards
function initializeCardEffects() {
    const cards = document.querySelectorAll('.pioneer-card, .game-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Function to reset the form
function resetForm() {
    if (gameForm) {
        gameForm.reset();
        gameForm.style.display = 'block';
    }
    if (formSuccess) {
        formSuccess.style.display = 'none';
    }
    // Reset rating display
    const ratingLabels = document.querySelectorAll('.rating-label');
    ratingLabels.forEach(label => {
        label.style.color = 'var(--text-secondary)';
        label.style.textShadow = 'none';
    });
    loadSharedGames();
}

// Function to clear saved games (for development/testing)
function clearSavedGames() {
    localStorage.removeItem('sharedGames');
    loadSharedGames();
    console.log('Shared games data has been cleared.');
}

// Add to console for easier testing
window.clearSavedGames = clearSavedGames;

