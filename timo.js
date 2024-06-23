// Tableau contenant les données du quiz
const quizData = [
    {
        question: "Qui est le créateur de Naruto ?",
        choices: ["Eiichiro Oda", "Masashi Kishimoto", "Tite Kubo"],
        correct: 1
    },
    {
        question: "Quel est le rêve de Luffy dans One Piece ?",
        choices: ["Devenir le Roi des Pirates", "Trouver le trésor One Piece", "Devenir un Amiral de la Marine"],
        correct: 0
    },
    {
        question: "Quel est le nom du démon à l'intérieur de Tanjiro dans Demon Slayer ?",
        choices: ["Muzan", "Nezuko", "Rui"],
        correct: 1
    },
    {
        question: "Dans Attack des Titans, qui est le Titan Assaillant ?",
        choices: ["Eren Yeager", "Armin Arlert", "Levi Ackerman"],
        correct: 0
    },
    {
        question: "Quel est le nom de l'école de magie dans My Hero Academia ?",
        choices: ["U.A. High School", "Hogwarts", "Xavier's School"],
        correct: 0
    },
    {
        question: "Dans Dragon Ball Z, qui tue Freezer pour la première fois ?",
        choices: ["Goku", "Vegeta", "Trunks"],
        correct: 2
    },
    {
        question: "Quel est le nom complet de l'alter ego de Light Yagami dans Death Note ?",
        choices: ["L", "Kira", "Ryuk"],
        correct: 1
    },
    {
        question: "Dans Fullmetal Alchemist, quel est le principe fondamental de l'alchimie ?",
        choices: ["Échange équivalent", "Transformation", "Création de matière"],
        correct: 0
    },
    {
        question: "Quel est le pouvoir de Saitama dans One Punch Man ?",
        choices: ["Super force", "Vitesse", "Télépathie"],
        correct: 0
    },
    {
        question: "Dans Sword Art Online, comment les joueurs se déconnectent-ils du jeu au début de l'histoire ?",
        choices: ["Ils doivent terminer le jeu", "Ils utilisent un portail", "Ils appellent l'administrateur"],
        correct: 0
    }
];

// Variables pour suivre l'état du quiz
let currentQuiz = 0;
let score = 0;

// Variables du minuteur
let timeLeft = 10;
let timerId;

// Stockage des id dans des var pour les cibler
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextButton = document.getElementById("next-button");
const timerElement = document.getElementById('time');
const timerContainer = document.getElementById('timer');

// Fonction pour démarrer le minuteur
function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerId);
            handleTimeOut();
        } else {
            timeLeft--;
            timerElement.textContent = timeLeft;
        }
    }, 1000);
}

// Fonction pour réinitialiser le minuteur
function resetTimer() {
    clearInterval(timerId);
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    startTimer();
}

// Fonction pour gérer le temps écoulé
function handleTimeOut() {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Fonction pour charger une question de quiz
function loadQuiz() {
    resetTimer(); // Réinitialiser le minuteur à chaque nouvelle question
    const currentQuizData = quizData[currentQuiz];
    
    // Mélanger les choix avant de les afficher
    const choices = [...currentQuizData.choices];
    shuffle(choices);

    questionEl.textContent = currentQuizData.question;
    choicesEl.innerHTML = "";

    choices.forEach((choice, index) => {
        const choiceEl = document.createElement("div");
        choiceEl.classList.add("choice");
        choiceEl.textContent = choice;
        // Mettre à jour l'index du choix sélectionné
        choiceEl.addEventListener("click", () => selectAnswer(currentQuizData.choices.indexOf(choice)));
        choicesEl.appendChild(choiceEl);
    });
}

// Fonction pour gérer la sélection d'une réponse
function selectAnswer(selectedIndex) {
    clearInterval(timerId); // Arrêter le minuteur quand une réponse est sélectionnée
    const currentQuizData = quizData[currentQuiz];
    if (selectedIndex === currentQuizData.correct) {
        score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

// Fonction pour afficher les résultats du quiz
function showResults() {
    const averageScore = quizData.length / 2;
    if (score > averageScore) {
        questionEl.textContent = `Félicitations! Vous avez obtenu ${score} sur ${quizData.length}.`;
    } else {
        questionEl.textContent = `Vous avez obtenu ${score} sur ${quizData.length}.`;
    }
    choicesEl.innerHTML = "";
    nextButton.style.display = "none";
    timerContainer.style.display = "none"; // Masquer le minuteur
}

// Ajouter un événement clic au bouton suivant pour charger une nouvelle question
nextButton.addEventListener("click", () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

// Mélanger les questions avant de commencer le quiz
shuffle(quizData);

// Charger la première question au démarrage
loadQuiz();
