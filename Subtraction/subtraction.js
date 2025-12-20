// Add an event listener to the input field
textbox.addEventListener('input', function () {
    // Check if the input field has any value (after trimming whitespace)
    if (this.value.trim().length > 0) {
        // If it has text, enable the button
        solve.disabled = false;
    } else {
        // If it is empty, disable the button
        solve.disabled = true;
    }
});

function isDuplicateQuestion(newQuestion, questionBank) {
    const [newFirst, newSecond, newAnswer] = newQuestion
    for (let queNum = 0; queNum < questionBank.length; ++queNum) {
        const [oldFirst, oldSecond, oldAnswer] = questionBank[queNum]
        if (oldFirst == newFirst && oldSecond == newSecond) return true;
    }
    return false;
}

function allQuestions(lowestNum, highestNum) {
    currentTable = [];
    let firstNumber
    let secondNumber
    let currentList;
    let rangeForRandom = highestNum - lowestNum + 1
    while (currentTable.length < totalNumQuestions - 2) {
        firstNumber = Math.floor(Math.random() * rangeForRandom + lowestNum)
        secondNumber = Math.floor(Math.random() * rangeForRandom + lowestNum)
        currentList = [firstNumber + secondNumber, firstNumber, secondNumber]
        if (!(isDuplicateQuestion(currentList, currentTable))) { currentTable.push(currentList) }
    }

    rangeForRandom = 999 - 1 + 1
    while (currentTable.length < totalNumQuestions) {
        firstNumber = Math.floor(Math.random() * rangeForRandom + lowestNum)
        secondNumber = Math.floor(Math.random() * rangeForRandom + lowestNum)
        currentList = [firstNumber + secondNumber, firstNumber, secondNumber]
        if (!(isDuplicateQuestion(currentList, currentTable))) { currentTable.push(currentList) }
    }

    return currentTable
}

function pass() {/*Does nothing*/ }

function checkSolution() {
    const expectedAnswer = questionsList[currentQuestion - 1][missingIndex]
    if (theTextBox.value == `${expectedAnswer}`) {
        theRightOrWrong.innerHTML = 'Right!'
        gottenRight++;
    } else {
        theRightOrWrong.innerHTML = `Wrong! The answer is ${expectedAnswer}`
    }

    wrongQuestions = totalNumQuestions - gottenRight;
    theButton.disabled = true;
    setTimeout(() => {
        console.log("After 3 seconds");
        theRightOrWrong.innerHTML = ''
        theTextBox.value = ''
        theButton.disabled = false;
        if (currentQuestion >= totalNumQuestions) {
            document.body.innerHTML = `Questions gotten right: ${gottenRight}
    <br>Questions gotten wrong: ${wrongQuestions}
    <br>Total score: ${gottenRight}/${totalNumQuestions}`
        } else {
            theButton.disabled = true;
            missingIndex = generateNewQuestion()
        }

    }, 3000);

}

function generateNewQuestion() {
    const que = questionsList[currentQuestion]
    const missing = "__"
    const randomNum = Math.floor(Math.random() * que.length)
    const firstNumber = randomNum == 0 ? missing : que[0]
    const secondNumber = randomNum == 1 ? missing : que[1]
    const answer = randomNum == 2 ? missing : que[2]

    console.log(currentQuestion);
    currentQuestion += 1;
    theQuestionNumber.textContent = `Question ${currentQuestion}`
    document.getElementById("question").innerHTML = `${firstNumber} - ${secondNumber} = ${answer}`
    return randomNum
}

let currentQuestion = 0;
let gottenRight = 0;
let totalNumQuestions = 10;

let lowestNum = 1;
let highestNum = 99;

let questionsList = allQuestions(lowestNum, highestNum)

const theButton = document.getElementById("solve")
const theTextBox = document.getElementById("textbox")
const theRightOrWrong = document.getElementById("right-or-wrong")
const theQuestionNumber = document.getElementById("question-number")

let missingIndex = generateNewQuestion()


