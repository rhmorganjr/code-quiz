let question = document.querySelector(".main-title");
let answers  = document.querySelector(".main-context");
let submitAnswer = document.querySelector(".main-action");
let mainWrapper = document.getElementById("main-wrapper");
let footer = document.querySelector('.footer');

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

function displayQuestion(index) {
  question.textContent = questions[index].q;

  // display multiple choices
  //let possAnws = document.getElementById("possible-answers");
  answers.textContent = "";
  let choices = questions[index].c;

  for (let i = 0; i < choices.length; i++) {
    let ckBox = 'ckBox' + i;
    let text = choices[i];
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
  submitAnswer.textContent = "";
  let submitBtn = document.createElement('button');
  submitBtn.addEventListener("click", function() {
    event.preventDefault();

    gradeCurrentAnswer(currentQuestion);
    if (currentQuestion === quizLength-1) {
      endOfQuiz();
    }
    else {
      displayQuestion(++currentQuestion);
    }
  });
  submitBtn.textContent = "Submit";
  submitAnswer.appendChild(submitBtn);

}

function displayCorrectness(correct) {
  footer.textContent = null;
  let display = document.createElement('p');
  if (correct) {
    display.textContent = "Correct!";
  }
  else {
    display.textContent = "Wrong!";
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

function endOfQuiz() {
  question.textContent = "";
  let title = document.createElement('h3');
  title.textContent = "All Done!";
  question.appendChild(title);

  answers.textContent = "";
  let results = document.createElement('p');
  results.textContent = "Your final score is 10";
  answers.appendChild(results);

  submitAnswer.textContent = "";
  let submitBtn = document.createElement('button');
  submitBtn.addEventListener("click", function() {
    event.preventDefault();
    //go to first page
    displayFirstPage();
  });
  submitBtn.textContent = "Submit";
  submitAnswer.appendChild(submitBtn);
  // get initials

}

// @TODO - function to clear all 3 sections

function displayFirstPage() {
  let title = document.createElement('h3');
  title.textContent = "Coding Quiz Challenge";
  question.appendChild(title);

  let instructions = document.createElement('p');
  instructions.textContent = "Try to answer the following code-related questions within the time limit."+
    " Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  answers.appendChild(instructions);

  let startQuiz = document.createElement('button');
  startQuiz.addEventListener("click", function() {
    event.preventDefault();
    displayQuestion(currentQuestion);
  });
  startQuiz.textContent = "Start Quiz";
  submitAnswer.appendChild(startQuiz);
}

function startQuiz() {
  displayFirstPage();
}


startQuiz();

