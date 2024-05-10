### Project 4 for CIT 281

## p4-data
This file contains the base data set used. A deep copy of this data is created in p4-module for testing.

## p4-module
Contains all of the code modules used as well as individual testing functionality for each function.
    # Functions
    _getQuestions()_ - Returns an array containing each question element from objects in **p4-data**
    <br>
    _getAnswers()_ - Returns an array containing each answer element from objects in **p4-data**
    <br>
    _getQuestionsAnswers()_ - Creates a deep copy of the array in **p4-data**. Copy is stored as _clone_.
    <br>
    _getQuestion()_ - Takes a numerical argument between 1 and data.length. Returns question.
    <br>
    _getAnswer()_ - Identical functionality to _getQuestion()_. Returns answer.
    <br>
    _getQuestionAnswer()_ - Takes a numerical argument between 1 and data.length. Returns an array.
    <br>
    _addQuestionAnswer()_ - Takes object parameters question, answer. Creates and adds the object to clone.
    <br>
    _updateQuestionAnswer()_ - Takes object parameters number, question, answer. Updates existing question number with question and answer in clone.
    <br>
    _deleteQuestionAnswer()_ - Takes number that exists within clone as parameter. Removes object in clone.

## p4-server
Server functionality for p4-module. JSON MIME type for testing in Postman. REST API verbs: get, post, put, delete. Runs on local 8080.
