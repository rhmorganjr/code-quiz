let question = document.getElementById("question");
let answers  = document.getElementById("possible-answers");
// questions
let questions = [
  { q: "Inside which HTML element do we put the JavaScript?",
    a: "<script>",
    c: ['<js>', '<script>', '<scripting>', '<javascript>']
  }];

console.log(questions);


function displayQuestion(index) {
  question.textContent = questions[index].q;

  // display multiple choices
  let possibleAnswers = questions[index].c;
  console.log(possibleAnswers);
  for (let i = 0; i < possibleAnswers.length; i++) {
    let ckBox = 'chBox' + i;
    let text = possibleAnswers[i];
    console.log(text.toString());
    ckBox = document.createElement('input');
    ckBox.setAttribute('type', 'radio');
    ckBox.setAttribute('id', ckBox);
    answers.appendChild(ckBox);

    let lbl = document.createElement('label');
    lbl.setAttribute('for', ckBox);
    lbl.textContent = '\t'+text;
    answers.appendChild(lbl);

    answers.appendChild(document.createElement('br'));
  }
}

displayQuestion(0);

