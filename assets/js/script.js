let question = document.getElementById("question");
let answers  = document.getElementById("possible-answers");
let submitAnswer = document.getElementById("submit-answer");
let questionAnswers = document.getElementById("question-answers");

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
}

];

console.log(questions);
let quizLength = questions.length;
console.log("# ? = "+quizLength);
let currentQuestion = 0;
let numberRightAnswers = 0;

function displayQuestion(index) {
  question.textContent = questions[index].q;

  // display multiple choices
  let possAnws = document.getElementById("possible-answers");
  possAnws.textContent = "";
  let possibleAnswers = questions[index].c;

  for (let i = 0; i < possibleAnswers.length; i++) {
    let ckBox = 'ckBox' + i;
    let text = possibleAnswers[i];
    console.log(text.toString());
    ckBox = document.createElement('input');
    ckBox.setAttribute('type', 'radio');
    ckBox.setAttribute('id', ckBox);
    ckBox.setAttribute('name', 'answers');
    ckBox.setAttribute('value', text);
    answers.appendChild(ckBox);

    let ckLbl = 'ckLbl' + i;
    ckLbl = document.createElement('label');
    ckLbl.setAttribute('for', ckBox);
    ckLbl.textContent = '\t'+text;
    answers.appendChild(ckLbl);

    answers.appendChild(document.createElement('br'));
  }
}

function gradeCurrentAnswer(value, index) {
  let answer = questions[index].a;
  let ele = document.getElementsByName('answers');
  let i = 0;
  for ( ; i < ele.length; i++) {
    if (ele[i].checked && answer === ele[i].value) {
      numberRightAnswers++;
      break;
    }
  }
}

function endOfQuiz() {
  alert("# right = " + numberRightAnswers);
  let mainDiv = document.querySelector('.main');
  mainDiv.textContent = null;

  let results = document.createElement('p');
  results.textContent = "You got " + numberRightAnswers + " out of " + quizLength + " right!";
  mainDiv.appendChild(results);
}


submitAnswer.addEventListener("click", function() {
  event.preventDefault();
  gradeCurrentAnswer(event.returnValue, currentQuestion);
  console.log("currentQuestion = "+currentQuestion);
  console.log("quizLength = "+quizLength);
  if (currentQuestion === quizLength-1) {
    endOfQuiz();
  }
  else {
    displayQuestion(++currentQuestion);
  }
});

function displayQuiz() {
  displayQuestion(0);
}


displayQuiz();

