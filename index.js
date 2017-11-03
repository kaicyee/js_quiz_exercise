$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionCard();
});

let state = {
  questions: [
    {
      question: 'Who is Ned Stark\'s bastard son?',
      answers: ['John Rivers',
                'Ramsey Snow',
                'Jon Snow',
                'Alistair Cooke'],
      correctAnswer: 'Jon Snow',
      explanation: 'Jon Snow is Ned Stark\'s bastard son who later becomes the king of the north'
    },
    {
      question: 'Who is Queen Cersei\'s brother?',
      answers: ['Alfred Hitchcock',
                'Jaime Lannister',
                'George RR Martin',
                'Joffrey Baratheon'],
      correctAnswer: 'Jaime Lannister'
    },
    {
      question: 'Who lives beyond the great wall?',
      answers: ['The White Walkers',                 
                'The Mongols',
                'The Wildlings',
                'The Chinese'],
      correctAnswer: 'The Wildlings'
    },
    {
      question: 'What does it mean to take the black?',
      answers: ['The opposite of taking the white',                
                'Drinking dark ale',
                'Joining the night\'s watch',
                'Joining the peace corp'],
      correctAnswer: 'Joining the night\'s watch'
    },
    {
      question: 'Daenerys is the last in the line of which royal family?',
      answers: ['The Baratheons',
                'The Starks',
                'The Targaryens',
                'The Tyrells'],
      correctAnswer: 'The Targaryens'
    },
    {
      question: 'What is Jon Snow\'s famous warning?',
      answers: ['The red coats are coming!',
                'Winter is coming!',
                'The world is coming to an end!',
                ' Beware the Ides of March!'],
      correctAnswer: 'Winter is coming!'
    },
    {
      question: 'Arya Stark mastered the ability to become a ______',
      answers: ['Direwolf',
                'Septa',
                'wife',
                'Faceless Man'],
      correctAnswer: 'Faceless Man'
    },
    {
      question: 'Sansa Stark is the Lady of __________',
      answers: ['the Night',
                'Shanghai',
                'Winterfell',                
                'Casterly Rock'],
      correctAnswer: 'Winterfell'
    },
    {
      question: 'Who is now the Three Eyed Raven?',
      answers: ['The Two Eyed Raven',
                'Bran Stark',
                'Mira Reed',
                'Bilbo Baggin'],
    correctAnswer: 'Bran Stark'
    },
    {
      question: 'Who is known as the Imp?',
      answers: ['Hodor',
                'Drogon',
                'Tyrion Lannister',
                'The Night King'],
    correctAnswer: 'Tyrion Lannister'
    }
  ],
  currentQuestionIndex: 0,
  correctCount: 0,
};

function resetQuiz() {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
}

//renders overall order of prompt and quiz questions
function renderQuestionCard() {
  let currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
  renderCurrentResults(); // not working, attempting to put in current score
}

//renders prompt for which question the user is on
function renderQuestionPrompt() {
  let progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ')</span>'
  let questionText = state.questions[state.currentQuestionIndex].question;
  $('.js-quiz-form').html(progressHTML + ' ' +questionText);
  console.log(state.correctCount + "out of" + state.questions.length + "correct")
  $('.correct').html(state.correctCount + "out of" + state.questions.length + "correct");
}

//renders questions
function renderQuestionChoices(answers) { //array
  $('#question-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false); //render choices without previous selection.
    $(this).find('span').text(answers[index]);
  });
}

//not working, attempting to find a way to put in current score
function renderCurrentResults() {
  $('#my-quiz');
  $('#start-quiz-over');
  let element = $('.js-current-results');
  element.html('<h2>' + 'Keep going! You got ' + state.correctCount + ' out of ' + state.questions.length + ' correct!' + '</h2>');
}

//renders final result on final screen
function renderFinalResults() {
  $('#my-quiz').addClass('hidden');
  $('#start-quiz-over').removeClass('hidden');
  let element = $('.js-final-results');
  element.html('<h2>' + 'Well done! You received ' + state.correctCount + ' out of ' + state.questions.length + ' correct!' + '</h2>');
  handleQuizRestart();
}

//evaluates answers, then places in modal
function checkAnswer(userChoice) {
  let correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if (userChoice === correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
    state.currentQuestionIndex++;
  } else if(userChoice === undefined){
    renderQuestionFeedback('unanswered');
  } else {
    renderQuestionFeedback(false);
    state.currentQuestionIndex++;
  }
  if (state.currentQuestionIndex === state.questions.length) {
    renderFinalResults(); // if it comes to last question go to final result
  } else {
    renderQuestionCard(); // or else show another quiz question
  }
}

//Implementing explanation function
// function setupExplanation() {
//     $('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentQuestionIndex]['explanation']));
//              // score++;
// alert('setupExplanation()')
// }

//renders feedback for answer, only blanket correct, incorrect or no response
function renderQuestionFeedback(boolean) {
  let feedback = $('.popup-inner');

  if (boolean === true){
    feedback.find('h2').text('Correct! You are still alive so keep going!');
    feedback.find('img').attr('src', './assets/gifs/dancing-tyrion.gif');
  } else if (boolean === false){
    feedback.find('h2').text(`Wrong! The correct answer is ${state.questions[state.currentQuestionIndex].correctAnswer}`);
    feedback.find('img').attr('src', './assets/gifs/fire_breathing_dragon05.gif');
    console.log(state.questions[state.currentQuestionIndex].correctAnswer)
    console.log(state.questions[state.currentQuestionIndex].explanation)
  } else if (boolean === 'unanswered'){
    feedback.find('h2').text('DO SOMETHING!');
    feedback.find('img').attr('src', './assets/gifs/do-you-understand.gif');
  }
}

/* this function begins quiz. e is the short let reference for event object which will be passed to event handlers. */
function beginQuiz() {
  $('#start-quiz').click(function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz').addClass('hidden');
  });
}

function handleQuizRestart() {
  $('#start-quiz-over').on('click', function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz-over').addClass('hidden');
    $('.js-final-results').text('');
    resetQuiz();
    renderQuestionCard();
  });
}

function handleAnswerSubmits() {
  $('#submit-answer').click(function (e) {
    e.preventDefault();
    let userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}


function handleAnswerFeedback() {
  //OPEN MODAL
  $('#submit-answer').on('click', function (e) {
    let targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(250);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('#close-feedback-modal').on('click', function (e) {
    let targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(250);
    e.preventDefault();
  });
}
  