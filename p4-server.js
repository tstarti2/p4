// Project: CIT 281 Project 4
// Author: Tyler Startin

const fs = require('fs');
const Fastify = require('fastify');
const fastify = require('fastify')({
  logger: true
});

// Import code modules and deep clone of data set
const { getQuestions, getAnswers, getQuestion, getAnswer, addQuestionAnswer, 
  getQuestionAnswer, updateQuestionAnswer, deleteQuestionAnswer, clone} = require("./p4-module.js");

fastify.get('/cit/question', function (request, reply) {
  const questions = getQuestions();
  const jsonObj = {
    error: "",
    statusCode: 200,
    questions: questions
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

fastify.get('/cit/answer', function (request, reply) {
  const answers = getAnswers();
  const jsonObj = {
    error: "",
    statusCode: 200,
    answers: answers
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

fastify.get('/cit/questionanswer', function (request, reply) {
  const qa = clone;
  const jsonObj = {
    error: "",
    statusCode: 200,
    answers: qa
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

fastify.get('/cit/question/:number', function (request, reply) {
  const { number } = request.params
  const {question, number: questionNumber} = getQuestion(number);
  const jsonObj = {
    error: "",
    statusCode: 200,
    questions: {
      question,
      number: questionNumber
    }
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

fastify.get('/cit/answer/:number', function (request, reply) {
  const { number } = request.params
  const {answer, number: answerNumber} = getAnswer(number);
  const jsonObj = {
    error: "",
    statusCode: 200,
    answers: {
      answer,
      number: answerNumber
    }
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

fastify.get('/cit/questionanswer/:number', function (request, reply) {
  const { number } = request.params
  const {question, answer, number: qaNumber} = getQuestionAnswer(number);
  const jsonObj = {
    error: "",
    statusCode: 200,
    answers: {
      question,
      answer,
      number: qaNumber
    }
  };

  reply
    .code(200)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(jsonObj)
})

// Add a new question or answer when receiving properties question and answer
fastify.post('/cit/question', function (request, reply) {
  const addEntry = addQuestionAnswer(request.body);
  const jsonObj = {
    error: "",
    message: addEntry.message,
    statusCode: 201,
    number: ""
  };

  jsonObj.number = addEntry.number -1;

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ jsonObj })
})

// Update a question or answer when receiving properties number, question, and answer
fastify.put('/cit/question/:number', function (request, reply) {
  const { number } = request.params;
  const { question, answer } = request.body;
  const updateEntry = updateQuestionAnswer({number, question, answer});
 
  const jsonObj = {
    error: updateEntry.error,
    message: updateEntry.message,
    statusCode: 201,
    number: updateEntry.number
  };
 
  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ jsonObj })
})

// Delete a question or answer
fastify.delete('/cit/question/:number', function (request, reply) {
  const { number } = request.params;
  const deleteEntry = deleteQuestionAnswer(number);

  const jsonObj = {
    error: deleteEntry.error,
    message: deleteEntry.message,
    statusCode: 201,
    number: deleteEntry.number
  };

  reply
    .code(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ jsonObj })
})


// Handle invalid paths
fastify.get('*', function (request, reply) {
  let invalid = `Route not found`
  reply
    .code(404)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send(invalid)
})

// Run the server
const listenIP = 'localhost'
const listenPort = 8080
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})
