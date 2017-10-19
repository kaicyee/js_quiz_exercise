$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionCard();
});

var state = {
  questions: [
    {
      question: 'Who is Ned Stark\'s bastard son?',
      answers: ['John Rivers',
                'Ramsey Snow',
                'Jon Snow',
                'Alistair Cooke'],
      correctAnswer: 'Jon Snow'
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
      answers: ['The Chinese', 
                'The Wildlings',
                'The Mongols',
                'The White Walkers'],
      correctAnswer: 'The Wildlings'
    },
    {
      question: 'What does it mean to take the black?',
      answers: ['The opposite of taking the white',
                'Joining the night\'s watch',
                'Drinking dark ale',
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
                'Faceless Man',
                'wife',
                'Septa'],
      correctAnswer: 'Faceless Man'
    },
    {
      question: 'Sansa Stark is the Lady of __________',
      answers: ['the Night',
                'Winterfell',
                'Shanghai',
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
                'Tyrion Lannister',
                'Drogon',
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

function renderQuestionCard() {
  var currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
}

function renderQuestionPrompt() {
  var progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ')</span>'
  var questionText = state.questions[state.currentQuestionIndex].question;
  $('.js-quiz-form').html(progressHTML + ' ' +questionText);
}

function renderQuestionChoices(answers) { //array
  $('#question-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false); //render choices without previous selection.
    $(this).find('span').text(answers[index]);
  });
}

function renderFinalResults() {
  $('#my-quiz').addClass('hidden');
  $('#start-quiz-over').removeClass('hidden');
  var element = $('.js-final-results');
  element.html('<h2>' + 'You got ' + state.correctCount + ' out of ' + state.questions.length + ' right!' + '</h2>');
  handleQuizRestart();
}

function checkAnswer(userChoice) {
  var correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if (userChoice == correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
    state.currentQuestionIndex++;
  } else if(userChoice == undefined){
    renderQuestionFeedback('unanswered');
  } else {
    renderQuestionFeedback(false);
    state.currentQuestionIndex++;
  }
  if (state.currentQuestionIndex == state.questions.length) {
    renderFinalResults()
  } else {
    renderQuestionCard();
  }
}

function renderQuestionFeedback(boolean) {
  var feedback = $('.popup-inner');
  if (boolean === true){
    feedback.find('h2').text('Correct! You are still alive so keep going!');
    feedback.find('img').attr('src', './assets/gifs/dancing-tyrion.gif');
  } else if (boolean === false){
    feedback.find('h2').text('Wrong!! When you play the game of thrones, you win or you die. There is no middle ground.');
    feedback.find('img').attr('src', './assets/gifs/fire_breathing_dragon05.gif');
  } else if (boolean == 'unanswered'){
    feedback.find('h2').text('DO SOMETHING!');
    feedback.find('img').attr('src', './assets/gifs/do-you-understand.gif');
  }
}

/* this function begins quiz. e is the short var reference for event object which will be passed to event handlers. */
function beginQuiz() {
  $('#start-quiz').click(function (e) {
    $('#my-quiz').removeClass('hidden');
    $('#start-quiz').addClass('hidden');
  });
}

function handleAnswerSubmits() {
  $('#submit-answer').click(function (e) {
    e.preventDefault();
    var userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}


function handleAnswerFeedback() {
  //OPEN MODAL
  $('#submit-answer').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(250);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('#close-feedback-modal').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(250);
    e.preventDefault();
  });
}
  