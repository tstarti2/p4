// Project: CIT 281 Project 4
// Author: Tyler Startin

// Import data
const { data } = require('./p4-data.js')

// Returns an array of strings where each array element is a question.
function getQuestions () {
  let question = []
  let questionValues = data.map(question => question.question)
  question.push(...questionValues)
  return question
}

// Returns an array of strings where each array element is an answer
function getAnswers () {
  let answer = []
  let answerValues = data.map(answer => answer.answer)
  answer.push(...answerValues)
  return answer
}

// Returns a deep copy of the original data array of objects EXTRA CREDIT
function getQuestionsAnswers () {
  const clonedData = JSON.parse(JSON.stringify(data))
  return clonedData
}

// Store deep copy of data
const clone = getQuestionsAnswers()

// Get specified question
function getQuestion (number = '') {
  const question = {
    error: '',
    question: '',
    number: ''
  }

  const questions = getQuestions()
  const questionNumber = parseInt(number) - 1

  if (!Number.isInteger(questionNumber)) {
    question.error = 'Question number must be an integer'
  } else if (questionNumber < 0) {
    question.error = 'Question number must be >= 1'
  } else if (questionNumber >= questions.length) {
    question.error = `Question number must be less than the number of questions (${questions.length})`
  } else {
    question.question = questions[questionNumber]
    question.number = questionNumber + 1
  }
  return question
}
// Get specified answer
function getAnswer (number = '') {
  const answer = {
    error: '',
    answer: '',
    number: ''
  }

  const answers = getAnswers()
  const answerNumber = parseInt(number) - 1

  if (!Number.isInteger(answerNumber)) {
    answer.error = 'Answer number must be an integer'
  } else if (answerNumber < 0) {
    answer.error = 'Answer number must be >= 1'
  } else if (answerNumber >= answers.length) {
    answer.error = `Answer number must be less than the number of answers (${answers.length})`
  } else {
    answer.answer = answers[answerNumber]
    answer.number = answerNumber + 1
  }
  return answer
}

// Get specified question/answer combination
function getQuestionAnswer (number = '') {
  const questionAnswer = {
    error: '',
    question: '',
    number: '',
    answer: ''
  }

  const questions = getQuestions()
  const answers = getAnswers()
  const qaNumber = parseInt(number) - 1

  if (!Number.isInteger(qaNumber)) {
    questionAnswer.error = 'Question number must be an integer'
  } else if (qaNumber < 0) {
    questionAnswer.error = 'Question number must be >= 1'
  } else if (qaNumber >= questions.length) {
    questionAnswer.error = `Question number must be less than the number of questions (${questions.length})`
  } else {
    questionAnswer.question = questions[qaNumber]
    questionAnswer.answer = answers[qaNumber]
    questionAnswer.number = qaNumber + 1
  }
  return questionAnswer
}

// Add new questions and answers
function addQuestionAnswer (info = {}) {
  const { question = '', answer = '' } = info

  let jsonObj = {
    error: '',
    message: '',
    number: -1
  }

  if (!question || !answer) {
    jsonObj.error = 'Object question or answer property required'
  } else {
    jsonObj.number = clone.length
    clone.push({ question, answer })
    jsonObj.message = 'Object added'
  }

  return jsonObj
}

// Update questions and answers
function updateQuestionAnswer (info = {}) {
  const { number = '', question = '', answer = '' } = info

  let jsonObj = {
    error: '',
    message: '',
    number: ''
  }
  if (!question || !answer) {
    jsonObj.error = 'Object question or answer property required'
  } else {
    const index = parseInt(number) - 1
    if (!Number.isInteger(index)) {
      jsonObj.error = 'Object number property must be a valid integer'
    } else if (index < 0 || index >= clone.length) {
      jsonObj.error = 'Object number property must be a valid integer'
    } else {
      const index = parseInt(number) - 1
      clone[index].question = question
      clone[index].answer = answer
      jsonObj.message = 'Object updated'
      jsonObj.number = number
    }
  }
  return jsonObj
}

// Delete a question and answer
function deleteQuestionAnswer (info) {
  const number = info !== undefined ? info : ''

  const jsonObj = {
    error: '',
    message: '',
    number: ''
  }

  const parsedNumber = parseInt(number)

  if (Number.isNaN(parsedNumber) || number === '') {
    jsonObj.error = 'Question/answer number must be an integer'
  } else if (parsedNumber <= 0 || parsedNumber > clone.length) {
    jsonObj.error = `Question/answer number must be between 1 and the number of questions (${clone.length})`
  } else {
    const index = parsedNumber - 1
    clone.splice(index, 1)
    jsonObj.message = `Question ${parsedNumber} deleted`
    jsonObj.number = parsedNumber
  }
  return jsonObj
}

// Export functions to server
module.exports = {
  getQuestions,
  getAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
  clone
}

/*****************************
  Module function testing
******************************/
function testing (category, ...args) {
  console.log(`\n** Testing ${category} **`)
  console.log('-------------------------------')
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`)
    console.log(o.f)
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = false
const testGetAs = false
const testGetQsAs = false
const testGetQ = false
const testGetA = false
const testGetQA = false
const testAdd = false // Extra credit
const testUpdate = true // Extra credit
const testDelete = false // Extra credit

// getQuestions()
if (testGetQs) {
  testing('getQuestions', { d: '()', f: getQuestions() })
}

// getAnswers()
if (testGetAs) {
  testing('getAnswers', { d: '()', f: getAnswers() })
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing('getQuestionsAnswers', { d: '()', f: getQuestionsAnswers() })
}

// getQuestion()
if (testGetQ) {
  testing(
    'getQuestion',
    { d: '()', f: getQuestion() }, // Extra credit: +1
    { d: '(0)', f: getQuestion(0) }, // Extra credit: +1
    { d: '(1)', f: getQuestion(1) },
    { d: '(4)', f: getQuestion(4) } // Extra credit: +1
  )
}

// getAnswer()
if (testGetA) {
  testing(
    'getAnswer',
    { d: '()', f: getAnswer() }, // Extra credit: +1
    { d: '(0)', f: getAnswer(0) }, // Extra credit: +1
    { d: '(1)', f: getAnswer(1) },
    { d: '(4)', f: getAnswer(4) } // Extra credit: +1
  )
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    'getQuestionAnswer',
    { d: '()', f: getQuestionAnswer() }, // Extra credit: +1
    { d: '(0)', f: getQuestionAnswer(0) }, // Extra credit: +1
    { d: '(1)', f: getQuestionAnswer(1) },
    { d: '(4)', f: getQuestionAnswer(4) } // Extra credit: +1
  )
}

// addQuestionAnswer()
if (testAdd) {
  testing(
    'addQuestionAnswer',
    { d: '()', f: addQuestionAnswer() },
    { d: '({})', f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: 'Q4' }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: 'A4' }) },
    {
      d: '(question: "Q4", answer: "A4")',
      f: addQuestionAnswer({ question: 'Q4', answer: 'A4' })
    }
  )
}

// updateQuestionAnswer()
if (testUpdate) {
  testing(
    'updateQuestionAnswer',
    { d: '()', f: updateQuestionAnswer() },
    { d: '({})', f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: 'Q1U' }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: 'A1U' }) },
    {
      d: '(question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ question: 'Q1U', answer: 'A1U' })
    },
    {
      d: '(number: 1, question: "Q1U", answer: "A1U")',
      f: updateQuestionAnswer({ number: 1, question: 'Q1U', answer: 'A1U' })
    }
  )
  console.log(clone)
}

// deleteQuestionAnswer()
if (testDelete) {
  testing(
    'deleteQuestionAnswer',
    { d: '()', f: deleteQuestionAnswer() },
    { d: '(0)', f: deleteQuestionAnswer(0) },
    { d: '(1)', f: deleteQuestionAnswer(1) },
    { d: '(0)', f: deleteQuestionAnswer(4) }
  )
  console.log(clone)
}
