let mainTitle = document.querySelector('.main-title');
let mainContext  = document.querySelector('.main-context');
let mainAction = document.querySelector('.main-action');
let mainWrapper = document.getElementById('main-wrapper');
let footer = document.querySelector('.footer');
let timer = document.getElementById('timer');
let viewHighscoreBtn = document.getElementById('high-score');

// questions
let questions = [
  { q: "Inside which HTML element do we put the JavaScript?",
    a: "<script>",
    c: ['<js>', '<script>', '<scripting>', '<javascript>']
  },
  { q: "What is the correct syntax for referring to an external script called 'geek.js'?",
    a: "<script src='geek.js'>",
    c: ["<script src='geek.js'>", 
      "<script href='geek.js'>", 
      "<script ref='geek.js'>",
      "<script name='geek.js'>"
    ]
  },
  { q: "Using _______ statement is how you test for a specific condition.",
    a: "if",
    c: ["select", 
      "if", 
      "switch",
      "for"
    ]
  },
  { q: "Is it possible to nest functions in JavaScript?",
    a: "True",
    c: ["True", 
      "False" 
    ]
  },
  { q: "Which of the following function of String object returns the characters in a string between two indexes into the string?",
    a: "substring()",
    c: ["slice()", 
      "split()",
      "substr()",
      "substring()" 
    ]
  }
];

let quizLength = questions.length;
let currentQuestion = 0;
let numberRightAnswers = 0;
let timeLeft = 0;
let clock;

function displayQuestion(index) {
  clearMain();
  // display question
  mainTitle.textContent = questions[index].q;

  // display multiple choices
  let choices = questions[index].c;

  for (let i = 0; i < choices.length; i++) {
    let ckBox = 'ckBox' + i;
    let text = choices[i];
    ckBox = document.createElement('input');
    ckBox.setAttribute('type', 'radio');
    ckBox.setAttribute('id', ckBox);
    ckBox.setAttribute('name', 'answers');
    ckBox.setAttribute('value', text);
    mainContext.appendChild(ckBox);

    let ckLbl = 'ckLbl' + i;
    ckLbl = document.createElement('label');
    ckLbl.setAttribute('for', ckBox);
    ckLbl.textContent = '\t'+text;
    mainContext.appendChild(ckLbl);

    mainContext.appendChild(document.createElement('br'));
    
  }

  let submitBtn = document.createElement('button');
  submitBtn.addEventListener("click", function() {
    event.preventDefault();

    gradeCurrentAnswer(currentQuestion);
    if (currentQuestion === quizLength-1) {
      endOfQuiz(timeLeft);
    }
    else {
      displayQuestion(++currentQuestion);
    }
  });
  submitBtn.textContent = "Submit";
  mainAction.appendChild(submitBtn);

}

function displayCorrectness(correct) {
  footer.textContent = null;
  let display = document.createElement('p');
  if (correct) {
    display.textContent = "Correct!";
  }
  else {
    display.textContent = "Wrong!";
    timeLeft -= 10;
    if ( timeLeft <= 0) {
      endOfQuiz(0);
    }
  }

  footer.appendChild(display);
}

function gradeCurrentAnswer(index) {
  let answer = questions[index].a;
  let ele = document.getElementsByName('answers');
  let correct = false;
  for ( let i = 0; i < ele.length; i++) {
    if (ele[i].checked && answer === ele[i].value) {
      numberRightAnswers++;
      correct = true;
      break;
    }
  }
  displayCorrectness(correct);
}

function displayHighscores() {
  console.log('displayHs');
  clearMain();
  mainTitle.textContent = "Highscores";

  let list = document.createElement('ol');
  mainContext.appendChild(list);

  let item = document.createElement('li');
  item.textContent = localStorage.initials + ' - ' + localStorage.score;
  mainContext.appendChild(item);
  mainContext.appendChild(document.createElement('br'));
  let div = document.createElement('div');
  mainContext.appendChild(div);
  let goBack = document.createElement('button');
  goBack.addEventListener("click", function() {
    event.preventDefault();

    startQuiz();
  });
  goBack.textContent = "Go Back";
  mainAction.appendChild(goBack);

  let clearScores = document.createElement('button');
  clearScores.addEventListener("click", function() {
    event.preventDefault();
    localStorage.initials = '';
    localStorage.score = '';
    startQuiz();
  });
  clearScores.textContent = "Clear Highscores";
  mainAction.appendChild(clearScores);
}

function endOfQuiz(score) {
  clearInterval(clock);
  clearMain();
  timer.textContent = "Time: 0";
  //const score = timeLeft;
  let title = document.createElement('h3');
  title.textContent = "All Done!";
  mainTitle.appendChild(title);

  
  let results = document.createElement('p');
  results.textContent = "Your final score is "+score;
  mainContext.appendChild(results);
  let addInitials = document.createElement('input');
  addInitials.setAttribute('type', 'text');
  addInitials.setAttribute('id', 'initials');
  addInitials.setAttribute('placeholder', 'Enter Initials');
  mainContext.appendChild(addInitials);

  
  let submitBtn = document.createElement('button');
  submitBtn.addEventListener("click", function() {
    event.preventDefault();

    localStorage.initials = addInitials.value;
    localStorage.score = score;
    //go to Highscores
    displayHighscores();
  });
  submitBtn.textContent = "Submit";
  mainContext.appendChild(submitBtn);
  // get initials

}

// @TODO - function to clear all 3 sections
function clearMain() {
  mainTitle.textContent = "";
  mainContext.textContent = "";
  mainAction.textContent = "";
}

function setupTimer() {
  clock = setInterval(function () {
    timer.textContent = "Time: "+ timeLeft--;
    if (timeLeft === 0) {
      endOfQuiz(timeLeft);
    }
    //timeLeft--;
  }, 1000);

}


function displayFirstPage() {
  clearMain();
  footer.textContent = "";
  
  let title = document.createElement('h3');
  title.textContent = "Coding Quiz Challenge";
  mainTitle.appendChild(title);

  let instructions = document.createElement('p');
  instructions.textContent = "Try to answer the following code-related questions within the time limit."+
    " Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  mainContext.appendChild(instructions);

  let startQuiz = document.createElement('button');
  startQuiz.addEventListener("click", function() {
    event.preventDefault();

    displayQuestion(currentQuestion);
    setupTimer();
  });
  startQuiz.textContent = "Start Quiz";
  mainAction.appendChild(startQuiz);
}

function startQuiz() {
  viewHighscoreBtn.addEventListener("click", function() {
    event.preventDefault();
    clearInterval(clock);

    displayHighscores();
  });
  timeLeft = 30;
  displayFirstPage();
}


startQuiz();

