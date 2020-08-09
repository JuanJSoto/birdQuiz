//questions to answer for quiz
const STORE = {
  questions: [
    {
        question: 'What color is the primary color of the cardinal?',
        answers: [
            'Red',
            'Black',
            'Green',
            'Blue'
        ],
        correctAnswer: 'Red'
    },
    {
        question: 
            'What color is the primary color of the Blue Jay?',
        answers: [
            'Black',
            'Blue',
            'Orange',
            'Green'
        ],
        correctAnswer:
        'Blue'
    },
    {
        question: 
            'What color is the primary color of the Canary?',
        answers: [
            'Red',
            'Purple',
            'Green',
            'Yellow'
        ],
        correctAnswer: 
            'Yellow'
    },
    {
        question: 
            'What color is the primary color of the Pelicans?',
        answers: [
            'Blue',
            'Black',
            'Orange',
            'White'
        ],
        correctAnswer:
            'White'
    },
    {
        question:
            'What color is the primary color of the Crow?',
        answers: [
            'Orange',
            'Green',
            'Black',
            'Red'
        ],
        correctAnswer: 
            'Black'
    }
  ],
  score: 0,
  questionNumber: 0
};

//variables to store the score and the question number


//function to start each question
function generateQuestion() {
    console.log("generateQuestion() fired");
    if(STORE.questionNumber < STORE.questions.length) {
    //  $('.questionNumber').text(STORE.questionNumber+1); //added per 3rd UPDATE?
    //updateQuestionNumber();
      return renderForm(STORE.questionNumber);
    } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(5);
    };

}

//increments the number value of the "score" variable by one
//updates the "score" in the quiz view
function updateScore() {
    console.log("updateScore() fired");
    STORE.score++;
    $('.score').text(STORE.score);
}

function updateQuestionNumber() {
    console.log("updateQuestionNumber() fired");
    STORE.questionNumber++;
    $('.questionNumber').text(STORE.questionNumber+1);
}

//resets the text value of the "question number"  and "score" variables 
//updates corresponding text in the quiz
function resetStats() {
    console.log("resetStats() fired");
    STORE.score = 0;
    STORE.questionNumber = 0;
    $('.score').text(0);
    $('.questionNumber').text(0);
}

//starts the quiz
function startQuiz() {
    $('.altBox').hide();
    $('.startButton').click( function (event) {
        $('.startQuiz').hide();
        $('.questionNumber').text(1);
        $('.questionBox').show();
        $('.questionBox').prepend(generateQuestion());
    });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
    console.log("submitAnswer() fired");
    $('.questionBox').on('submit', '.quizForm', function (event) {
        event.preventDefault();
        $('.altBox').hide();
        $('.response').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE.questions[STORE.questionNumber].correctAnswer;
        if (answer === correct) {
            correctAnswer();
        } else {
            wrongAnswer();
        }
    });
}

//creates html for question form
function renderForm(questionIndex) {
    console.log("renderForm() fired");
    let formMaker = $(`<form class="quizForm">
        <fieldset>
            <legend class="questionText">${STORE.questions[questionIndex].question}
            </legend>
        </fieldset>
    </form>`)

    let fieldSelector = $(formMaker).find('fieldset');

    STORE.questions[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="sizeMe" for="${answerIndex}">
            <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
                <span>${answerValue}</span>
            </label>`).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(fieldSelector);
    return formMaker;
    //submitAnswer();
}

//correct answer display
function correctAnswer() {
  console.log("correctAnswer() fired");
    $('.response').html(
        `<h3>Your answer is correct!</h3>
        <img src="IMG/thumbsUp.jpg" alt="bird thumbs up"
        class="images" width="200px">
            <p class="sizeMe">Correct!</p>
            <button type="button" class="nextButton button">Next</button>`
    );
    updateScore();
}

//wrong answer display
function wrongAnswer() {
  console.log("wrongAnswer() fired");
    $('.response').html(
        `<h3>Not Quite...</h3>
        <img src="IMG/thumbsDown.jpg" alt="angry bird"
        <class="images" width="200px">
        <p class="sizeMe">What the flock!? It's:</p>
        <p class="sizeMe">${STORE.questions[STORE.questionNumber].correctAnswer}</p>
        <button type="button" class="nextButton button">Next</button>`
    );
}

//starts the next question
function nextQuestion() {
  console.log("nextQuestion() fired");
    $('.response').on('click', '.nextButton', function (event) {
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(generateQuestion());
    });
}

//final score and end result comment
function finalScore() {
  console.log("finalScore() fired");
    $('.final').show();

    const good = [
        'Good job!',
        'IMG/Creamina-tired.jpg',
        'Creamina tired after winning',
        'Easier than aptitude test...'
    ];

    const bad = [
        'Do you even bird?',
        'IMG/Creamina-shocked.jpg',
        'shocked Creamina',
        'B B B BIRD IS THE WORD!',
    ];

    if (STORE.score >= 4) {
        array = good;
    } else {
        array = bad;
    }

    return renderResult();
}
  
function renderResult() {
  $('.final').html(
    `<h3>${array[0]}<h3>
    <img src="${array[1]}" alt="${array[2]}" class="images">
    <h3>Your score is ${STORE.score} / 5</h3>
    <p class="sizeMe">${array[3]}</p>
    <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart quiz
function restartQuiz() {
    $('.final').on('click', '.restartButton', function (event) {
        event.preventDefault();
        resetStats();
        $('.altBox').hide();
        $('.startQuiz').show();
    });
}

//starts functions
function makeQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
};

$(makeQuiz);
