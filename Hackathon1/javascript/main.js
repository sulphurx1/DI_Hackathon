const myQuestions = [
    {
        question: 'What is raced in F1?',
        answers: [
            'Cars',
            'Planes',
            'Drones',
            'Gerbils'
        ],
        correctAnswer: 'Cars'
    },
    {
        question: 'Which one of these teams aren\'t in F1',
        answers: [
            'Ferrari',
            'Mercedes',
            'McLaren',
            'Norwich City'
        ],
        correctAnswer: 'Norwich City'
    },
    {
        question: 'Which colour is the checkered flag?',
        answers: [
            'Red and White',
            'Blue and White',
            'Green and White',
            'Black and White',
        ],
        correctAnswer: 'Black and White'
    },
    {
        question: 'Who won the 2021 F1 Driver\'s Championship?',
        answers: [
            'Max Verstappen',
            'Nigel Mansell',
            'Lewis Hamilton',
            'Nico Rosberg'
        ],
        correctAnswer: 'Max Verstappen'
    },
    {
        question: 'Which Brit won the Driver\'s Championship in 2020?',
        answers: [
            'Lewis Hamilton',
            'Jenson Button',
            'Damon Hill',
            'Nigel Mansell'
        ],
        correctAnswer: 'Lewis Hamilton'
    },
    {
        question: 'Where do Ferraris come from?',
        answers: [
            'France',
            'Italy',
            'Germany',
            'Britain'
        ],
        correctAnswer: 'Italy'
    },
    {
        question: 'What make of car won the Constructors Championship in 2021?',
        answers: [
            'Mercedes',
            'Ferrari',
            'Old Banger',
            'Honda'
        ],
        correctAnswer: 'Mercedes'
    },
    {
        question: 'Which of these cities closes down to race F1 on it\s streets?',
        answers: [
            'New York',
            'Monaco',
            'Paris',
            'Mogadishu'
        ],
        correctAnswer: 'Monaco'
    },
    {
        question: 'What are "the pits?"',
        answers: [
            'Holes in the racetrack',
            'An area to refuel and repair',
            'A fast food place for F1 drivers',
            'A petrol mine',
        ],
        correctAnswer: 'An area to refuel and repair'
    },
    {
        question: 'What colour are Ferraris?',
        answers: [
            'Blue',
            'Red',
            'Green',
            'Orange'
        ],
        correctAnswer: 'Red'
    }
];

// declaring const
const optionText = document.querySelector('.option_list');
const timerCount = document.querySelector('.timer_sec');
const nextButton = document.querySelector('.next_btn');
const timeLine = document.querySelector('.time_line');
const resultBox = document.querySelector('.result_box');
const quizBox = document.querySelector('.quiz_box');
const restartGame = document.querySelector('.restart');
const buttonGame = document.querySelector('.quizz');
let tickTheIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossTheIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

let questionCount = 0;
    let questionNumber = 1;
    let counter;
    let timeInterval = 20;
    let score = 0;
    let width = 0;

    showQuestions(0);
    counterQuestion(1);
    startTimer(20);
    startTimerLine(0);
    nextButton.style.display = 'none';

restartGame.onclick = () => {
    window.location.reload();

    showQuestions(questionCount);
    counterQuestion(questionNumber);
    startTimer(timeInterval);
    startTimerLine(width);
    nextButton.style.display = 'none';
}

// on press next button
nextButton.onclick = () => {
    if (questionCount < myQuestions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        counterQuestion(questionNumber);
        clearInterval(counter);
        startTimer(timeInterval);
        clearInterval(counterLine);
        startTimerLine(width);
        nextButton.style.display = 'none';
    }
    else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResultBox();
    }
}

// show questions from object
function showQuestions(index) {
    const questionText = document.querySelector('.question_text');
    let actualQuesiton = '<span>' + myQuestions[index].question + '</span'
    let actualOption = '<div class="option"><span>' + myQuestions[index].answers[0] + '</span></div>' +
        '<div class="option"><span>' + myQuestions[index].answers[1] + '</span></div>' +
        '<div class="option"><span>' + myQuestions[index].answers[2] + '</span></div>' +
        '<div class="option"><span>' + myQuestions[index].answers[3] + '</span></div>';
    questionText.innerHTML = actualQuesiton;
    optionText.innerHTML = actualOption;
}

// to couner questions
function counterQuestion(index) {
    const bottomCounter = document.querySelector('.total_question')
    const theCounter = '<span><p>' + index + '</p>of<p>' + myQuestions.length + '</p>Questions</span>'
    bottomCounter.innerHTML = theCounter;

    const option = optionText.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// display answers
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAnswer = answer.textContent;
    let correctAns = myQuestions[questionCount].correctAnswer;
    let allOptions = optionText.children.length;
    if (userAnswer == correctAns) {
        score += 1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickTheIcon);
    }
    else {
        answer.classList.add('wrong');
        answer.insertAdjacentHTML('beforeend', crossTheIcon);

        for (let i = 0; i < allOptions; i++) {
            if (optionText.children[i].textContent == correctAns) {
                optionText.children[i].setAttribute('class', 'option correct')
                optionText.children[i].insertAdjacentHTML('beforeend', tickTheIcon);
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionText.children[i].classList.add('disabled');
    }
    nextButton.style.display = 'block';
}

// the timer and condition when timer is finished
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timerCount.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            timerCount.textContent = '0';
            const allOptions = optionText.children.length;
            let correctAns = myQuestions[questionCount].correctAnswer;
            for (i = 0; i < allOptions; i++) {
                if (optionText.children[i].textContent == correctAns) {
                    optionText.children[i].setAttribute('class', 'option correct');
                    optionText.children[i].insertAdjacentHTML('beforeend', tickTheIcon);
                    for (i = 0; i < allOptions; i++) {
                        optionText.children[i].classList.add('disabled');
                        nextButton.style.display = 'block';
                    }

                }

            }
        }
    }
}

// timer line
function startTimerLine(time) {
    counterLine = setInterval(timer, 39);
    function timer() {
        time += 1;
        console.log(time);
        timeLine.style.width = time + 'px';
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

// show results
function showResultBox() {
    quizBox.classList.add('disactivateQuiz');
    resultBox.classList.add('activateResult');
    const scoreText = resultBox.querySelector('.score_text');
    if (score > 3) {
        let scoreTag = '<span>Congrats!, you got <p>' + score + '</p> out of <p>' + myQuestions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else if (score > 1) {
        let scoreTag = '<span>Nice!, you got <p>' + score + '</p> out of <p>' + myQuestions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>Sorry!, you got only <p>' + score + '</p> out of <p>' + myQuestions.length + '</p></span>'
        scoreText.innerHTML = scoreTag;
    }
}
