
// Dados do quiz
const quizData = [
    {
        question: "Qual foi o primeiro jogo a utilizar uma forma básica de IA?",
        answers: [
            "Pac-Man",
            "Pong", 
            "Space Invaders",
            "Tetris"
        ],
        correct: 1,
        explanation: "Pong (1972) foi um dos primeiros jogos a implementar uma forma rudimentar de IA, onde o adversário controlado pelo computador movia sua raquete para interceptar a bola."
    },
    {
        question: "Que tipo de IA é usado para controlar os fantasmas no Pac-Man?",
        answers: [
            "Redes Neurais",
            "Algoritmos Genéticos",
            "Máquinas de Estado Finitas (FSM)",
            "Aprendizado de Máquina"
        ],
        correct: 2,
        explanation: "Os fantasmas do Pac-Man utilizam Máquinas de Estado Finitas (FSM), onde cada fantasma tem comportamentos distintos baseados em estados como perseguir, dispersar ou fugir."
    },
    {
        question: "Em que ano o Deep Blue derrotou Garry Kasparov no xadrez?",
        answers: [
            "1995",
            "1996",
            "1997",
            "1998"
        ],
        correct: 2,
        explanation: "Em 1997, o supercomputador Deep Blue da IBM derrotou o campeão mundial de xadrez Garry Kasparov, marcando um marco histórico na IA."
    },
    {
        question: "Qual jogo introduziu o revolucionário Sistema Nemesis?",
        answers: [
            "Assassin's Creed",
            "Middle-Earth: Shadow of Mordor",
            "The Witcher 3",
            "Skyrim"
        ],
        correct: 1,
        explanation: "Middle-Earth: Shadow of Mordor (2014) introduziu o Sistema Nemesis, onde inimigos orcs se lembram de encontros anteriores e evoluem baseado nas ações do jogador."
    },
    {
        question: "Qual geração de consoles marcou a transição para gráficos 3D e IA mais realista?",
        answers: [
            "4ª Geração (16-bits)",
            "5ª Geração (PlayStation/N64)",
            "6ª Geração (PS2/Xbox)",
            "7ª Geração (PS3/Xbox 360)"
        ],
        correct: 1,
        explanation: "A 5ª geração, com PlayStation e Nintendo 64, marcou a transição para gráficos 3D e permitiu IAs mais complexas em ambientes tridimensionais."
    }
];

// Estado do quiz
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let quizCompleted = false;

// Elementos do DOM
const quizContainer = document.getElementById('quiz-container');
const questionTitle = document.getElementById('question-title');
const answersContainer = document.getElementById('answers-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const scoreDisplay = document.getElementById('score-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const quizContent = document.getElementById('quiz-content');
const quizResult = document.getElementById('quiz-result');
const resultTitle = document.getElementById('result-title');
const resultScore = document.getElementById('result-score');
const resultMessage = document.getElementById('result-message');
const restartBtn = document.getElementById('restart-btn');

// Elementos do formulário
const gameForm = document.getElementById('game-form');
const formSuccess = document.getElementById('form-success');
const gamesGrid = document.getElementById('games-grid');

// Navegação mobile
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
    initializeForm();
    initializeNavigation();
    initializeLazyLoading();
    loadSharedGames();
});

// Inicializar quiz
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

// Exibir pergunta atual
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

// Selecionar resposta
function selectAnswer(index) {
    selectedAnswer = index;
    
    // Remover seleção anterior
    const options = document.querySelectorAll('.answer-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Adicionar seleção atual
    options[index].classList.add('selected');
    
    updateButtons();
}

// Atualizar botões
function updateButtons() {
    if (prevBtn) {
        prevBtn.disabled = currentQuestion === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = selectedAnswer === null;
        nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finalizar' : 'Próxima';
    }
}

// Próxima pergunta
function nextQuestion() {
    if (selectedAnswer === null) return;
    
    // Verificar resposta
    const question = quizData[currentQuestion];
    const options = document.querySelectorAll('.answer-option');
    
    // Mostrar resposta correta
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correct) {
            option.classList.add('incorrect');
        }
    });
    
    // Atualizar pontuação
    if (selectedAnswer === question.correct) {
        score++;
        updateScore();
    }
    
    // Aguardar um pouco antes de avançar
    setTimeout(() => {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    }, 1500);
}

// Pergunta anterior
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

// Atualizar progresso
function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    }
}

// Atualizar pontuação
function updateScore() {
    if (scoreDisplay) {
        scoreDisplay.textContent = `Pontuação: ${score}`;
    }
}

// Mostrar resultados
function showResults() {
    quizCompleted = true;
    
    if (quizContent) quizContent.style.display = 'none';
    if (quizResult) quizResult.style.display = 'block';
    
    const percentage = (score / quizData.length) * 100;
    
    if (resultScore) {
        resultScore.textContent = `Sua pontuação: ${score}/${quizData.length} (${percentage.toFixed(0)}%)`;
    }
    
    // Mensagem baseada na pontuação
    let message = '';
    let title = '';
    
    if (percentage >= 80) {
        title = 'Excelente! 🎉';
        message = 'Você é um verdadeiro especialista em IA nos jogos! Seu conhecimento sobre a evolução da inteligência artificial nos videogames é impressionante.';
    } else if (percentage >= 60) {
        title = 'Muito Bem! 👏';
        message = 'Você tem um bom conhecimento sobre IA nos jogos. Continue explorando para se tornar um especialista no assunto!';
    } else if (percentage >= 40) {
        title = 'Bom Trabalho! 👍';
        message = 'Você está no caminho certo! Que tal revisar o conteúdo e tentar novamente para melhorar sua pontuação?';
    } else {
        title = 'Continue Tentando! 💪';
        message = 'Não desanime! A IA nos jogos é um assunto fascinante. Explore mais o site e refaça o quiz para melhorar seus conhecimentos.';
    }
    
    if (resultTitle) resultTitle.textContent = title;
    if (resultMessage) resultMessage.textContent = message;
}

// Reiniciar quiz
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

// Inicializar formulário
function initializeForm() {
    if (!gameForm) return;
    
    gameForm.addEventListener('submit', handleFormSubmit);
    
    // Rating system
    const ratingInputs = document.querySelectorAll('input[name="aiRating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', updateRatingDisplay);
    });
}

// Lidar com envio do formulário
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
        timestamp: new Date().toLocaleDateString('pt-BR')
    };
    
    // Validação
    if (!gameData.userName || !gameData.gameTitle || !gameData.gameGenre || !gameData.aiRating) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Salvar no localStorage
    saveGameData(gameData);
    
    // Mostrar mensagem de sucesso
    if (gameForm) gameForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
    
    // Atualizar lista de jogos
    loadSharedGames();
    
    // Scroll para a seção de jogos compartilhados
    setTimeout(() => {
        const sharedGamesSection = document.querySelector('.shared-games');
        if (sharedGamesSection) {
            sharedGamesSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 500);
}

// Atualizar exibição do rating
function updateRatingDisplay() {
    const ratingInputs = document.querySelectorAll('input[name="aiRating"]');
    const ratingLabels = document.querySelectorAll('.rating-label');
    
    ratingInputs.forEach((input, index) => {
        if (input.checked) {
            // Destacar estrelas até a selecionada
            for (let i = 0; i <= index; i++) {
                ratingLabels[i].style.color = 'var(--neon-cyan)';
                ratingLabels[i].style.textShadow = '0 0 10px var(--neon-cyan)';
            }
            // Resetar estrelas após a selecionada
            for (let i = index + 1; i < ratingLabels.length; i++) {
                ratingLabels[i].style.color = 'var(--text-secondary)';
                ratingLabels[i].style.textShadow = 'none';
            }
        }
    });
}

// Salvar dados do jogo
function saveGameData(gameData) {
    let savedGames = JSON.parse(localStorage.getItem('sharedGames')) || [];
    savedGames.push(gameData);
    
    // Limitar a 10 jogos mais recentes
    if (savedGames.length > 10) {
        savedGames = savedGames.slice(-10);
    }
    
    localStorage.setItem('sharedGames', JSON.stringify(savedGames));
}

// Carregar jogos compartilhados
function loadSharedGames() {
    if (!gamesGrid) return;
    
    const savedGames = JSON.parse(localStorage.getItem('sharedGames')) || [];
    
    if (savedGames.length === 0) {
        gamesGrid.innerHTML = '<p class="no-games">Nenhum jogo compartilhado ainda. Seja o primeiro!</p>';
        return;
    }
    
    // Ordenar por timestamp (mais recentes primeiro)
    savedGames.sort((a, b) => b.id - a.id);
    
    gamesGrid.innerHTML = '';
    
    savedGames.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Criar card do jogo
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card fade-in-up';
    
    const stars = '⭐'.repeat(parseInt(game.aiRating));
    const genreMap = {
        'acao': 'Ação',
        'aventura': 'Aventura',
        'rpg': 'RPG',
        'estrategia': 'Estratégia',
        'fps': 'FPS',
        'esporte': 'Esporte',
        'corrida': 'Corrida',
        'puzzle': 'Puzzle',
        'simulacao': 'Simulação',
        'outro': 'Outro'
    };
    
    card.innerHTML = `
        <h3 class="game-title">${escapeHtml(game.gameTitle)}</h3>
        <div class="game-meta">
            Por: ${escapeHtml(game.userName)} • ${genreMap[game.gameGenre] || game.gameGenre} • ${game.timestamp}
        </div>
        <div class="game-rating">${stars} (${game.aiRating}/5)</div>
        ${game.aiDescription ? `<p class="game-description">${escapeHtml(game.aiDescription)}</p>` : ''}
    `;
    
    return card;
}

// Escapar HTML para segurança
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Inicializar navegação
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Alternar menu mobile
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Fechar menu mobile
function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Inicializar lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Força o carregamento
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores sem suporte
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// Animações de scroll
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
    
    // Observar elementos que devem animar
    const animatedElements = document.querySelectorAll('.pioneer-card, .timeline-item, .game-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scroll para links internos
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

// Efeitos de hover para cards
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

// Inicializar todas as funcionalidades quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeCardEffects();
});

document.addEventListener('DOMContentLoaded', () => {
    const currentYearEl = document.querySelector('#currentyear');
    const lastModifiedEl = document.querySelector('#lastModified');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = `Last modified: ${document.lastModified}`;
});



// Função para resetar o formulário
function resetForm() {
    if (gameForm) {
        gameForm.reset();
        gameForm.style.display = 'block';
    }
    if (formSuccess) {
        formSuccess.style.display = 'none';
    }
    
    // Resetar rating display
    const ratingLabels = document.querySelectorAll('.rating-label');
    ratingLabels.forEach(label => {
        label.style.color = 'var(--text-secondary)';
        label.style.textShadow = 'none';
    });
}

// Adicionar botão para resetar formulário na mensagem de sucesso
document.addEventListener('DOMContentLoaded', () => {
    if (formSuccess) {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Compartilhar Outro Jogo';
        resetButton.className = 'btn btn-secondary';
        resetButton.style.marginTop = '1rem';
        resetButton.addEventListener('click', resetForm);
        formSuccess.appendChild(resetButton);
    }
});

// Função para limpar dados salvos (para desenvolvimento/teste)
function clearSavedGames() {
    localStorage.removeItem('sharedGames');
    loadSharedGames();
    console.log('Dados de jogos compartilhados foram limpos.');
}

// Adicionar ao console para facilitar testes
window.clearSavedGames = clearSavedGames;