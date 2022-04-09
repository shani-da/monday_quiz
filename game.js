const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let el = document.getElementById('choice4');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];
let q;
let cat = "uf";
let temp = {};

fetch(
    'https://opentdb.com/api.php?amount=100'
)
    .then((res) => {     
        return res.json();
    })
    .then((loadedQuestions) => {
 
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
             //cat
                type: loadedQuestion.type,
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
    question.innerText = currentQuestion.question;
    
    
    //check if true false question
 //   temp = currentQuestion;
    
    
    
    //el.innerHTML = typeof (document.getElementById('choice4'));
    
   // document.getElementById('choice3').innerText = currentQuestion.type;
 //      temp = currentQuestion.incorrect_answers;
/*   if(temp.type == "boolean"){
        document.getElementById('choice3').style.display = 'none';
        document.getElementById('choice4').style.visibility='hidden';
  }
*/
    if (currentQuestion.type == "boolean"){
        document.getElementById('choice3').style.visibility='hidden';
        document.getElementById('choice4').style.visibility='hidden';
}
// category      
    

    if (currentQuestion.category == "General Knowledge"){
        document.getElementById("cont").style.backgroundImage = "url('GeneralKnowledge.png')";
    }  
    else if (currentQuestion.category == "Entertainment: Books"){
        document.getElementById("cont").style.backgroundImage = "url('books.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Film"){
        document.getElementById("cont").style.backgroundImage = "url('film.png')";
    }
    else if (currentQuestion.category == "Entertainment: Music"){
        document.getElementById("cont").style.backgroundImage = "url('music.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Musicals & Theatres"){
        document.getElementById("cont").style.backgroundImage = "url('theater.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Television"){
        document.getElementById("cont").style.backgroundImage = "url('tv.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Video Games"){
        document.getElementById("cont").style.backgroundImage = "url('games.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Board Games"){
        document.getElementById("cont").style.backgroundImage = "url('board.jpg')";
    }
    else if (currentQuestion.category == "Science & Nature"){
        document.getElementById("cont").style.backgroundImage = "url('nature.jpg')";
    }
    else if (currentQuestion.category == "Science: Computers"){
        document.getElementById("cont").style.backgroundImage = "url('computer.webp')";
    }
    else if (currentQuestion.category == "Science: Mathematics"){
        document.getElementById("cont").style.backgroundImage = "url('math.jpg')";
    }
    else if (currentQuestion.category == "Mythology"){
        document.getElementById("cont").style.backgroundImage = "url('mythology.jpg')";
    }
    else if (currentQuestion.category == "Sports"){
        document.getElementById("cont").style.backgroundImage = "url('sports.jpg')";
    }
    else if (currentQuestion.category == "Geography"){
        document.getElementById("cont").style.backgroundImage = "url('geography.png')";
    }
    else if (currentQuestion.category == "History"){
        document.getElementById("cont").style.backgroundImage = "url('history.jpg')";
    }
    else if (currentQuestion.category == "Politics"){
        document.getElementById("cont").style.backgroundImage = "url('politics.webp')";
    }
    else if (currentQuestion.category == "Art"){
        document.getElementById("cont").style.backgroundImage = "url('art.jpg')";
    }
    else if (currentQuestion.category == "Celebrities"){
        document.getElementById("cont").style.backgroundImage = "url('celeb.png')";
    }
    else if (currentQuestion.category == "Vehicles"){
        document.getElementById("cont").style.backgroundImage = "url('vehicles.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Comics"){
        document.getElementById("cont").style.backgroundImage = "url('comics.jpg')";
    }
    else if (currentQuestion.category == "Science: Gadgets"){
        document.getElementById("cont").style.backgroundImage = "url('gadgets.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Cartoon & Animaions"){
        document.getElementById("cont").style.backgroundImage = "url('cartoon.jpg')";
    }
    else if (currentQuestion.category == "Entertainment: Japanese Anime & Manga"){
        document.getElementById("cont").style.backgroundImage = "url('manga.jpg')";
    }
    else if (currentQuestion.category == "Animals"){
        document.getElementById("cont").style.backgroundImage = "url('animals.jpg')";
    }

    
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

picbycategory = () => {
    
}


function isEmpty(el) {
    for (const property in el) {
      return false;
    }
    return true;
  }