const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const stam = document.getElementById('st');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
let q;
let cat = "uf";


fetch(
    'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
)
    .then((res) => {     
        return res.json();
    })
    .then((loadedQuestions) => {
 
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
             //cat
               category: loadedQuestion.category,
                question: loadedQuestion.question.replace(/(&quot\;)/g,"\"").replace(/(&#039\;)/g,"\'").replace(/(&amp\;)/g,"&")
                .replace(/(&deg\;)/g,"°").replace(/(&rsquo\;)/g,"\'").replace(/(&shy\;)/g,"-").replace(/(&Eacute\;)/g,"É").replace(/(&ntilde\;)/g,"ñ"),
            };
            
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1,
                0,
                loadedQuestion.correct_answer.replace(/(&quot\;)/g,"\"").replace(/(&#039\;)/g,"\'").replace(/(&amp\;)/g,"&")
                .replace(/(&deg\;)/g,"°").replace(/(&rsquo\;)/g,"\'").replace(/(&shy\;)/g,"-").replace(/(&Eacute\;)/g,"É").replace(/(&ntilde\;)/g,"ñ")
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice.replace(/(&quot\;)/g,"\"").replace(/(&#039\;)/g,"\'").replace(/(&amp\;)/g,"&")
                .replace(/(&deg\;)/g,"°").replace(/(&rsquo\;)/g,"\'").replace(/(&shy\;)/g,"-").replace(/(&Eacute\;)/g,"É").replace(/(&ntilde\;)/g,"ñ");
            });
        //cat    
        //    const category = loadedQuestion.category;
                    
            return formattedQuestion;
        })
        
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};
var interval;
getNewQuestion = () => {
    if(interval){
        clearInterval(interval);
    }
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    
    var count = 15;
    interval = setInterval(function(){
      document.getElementById('count').innerHTML=count;
      count--;
      if (count === -2){
        document.getElementById('count').innerHTML=15;
        getNewQuestion();
        count = 14;
    
    }
    }, 1000);

    questionCounter++;
    progressText.innerText = `Q u e s t i o n   ${questionCounter} / ${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    //question.innerText = currentQuestion.question;
    question.innerText = currentQuestion.category;
// category      

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};