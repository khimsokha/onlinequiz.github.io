const questions = [
    {
        question: "តើមួយណាជាគុណវិបត្តិនៃអាណានិគមបារាំងមកលើកម្ពុជា?",
        answers:[
            { text: "ជួយទាមទារទឹកដីខ្មែរពីសៀម",correct: false},
            { text: "ធ្វើផ្លូវគមនាគមន៍",correct: false},
            { text: "កេនប្រជាជនខ្មែរទៅច្បាំងក្នុងសង្គ្រាមលោក",correct: true},
            { text: "ការពារខ្មែរ",correct: false},
        ]
    },
    {
        question: "តើមួយថ្ងៃមានប៉ុន្មានម៉ោង?",
        answers:[
            { text: "២៣ម៉ោង",correct: false},
            { text: "២៤ម៉ោង",correct: true},
            { text: "២៥ម៉ោង",correct: false},
            { text: "២២ម៉ោង",correct: false},
        ]
    },
    {
        question: "តើព្រះអាទិត្យរះពីទិសខាងណា?",
        answers:[
            { text: "ទិសលិច ",correct: false},
            { text: "ទិសកើត ",correct: true },
            { text: "ទិសជើង ",correct: false},
            { text: "ទិសត្បូង ",correct: false},          
        ]
    },
    {
        question: "តើសត្វខ្លាឃ្មុំទឹកកកដេកប៉ុន្មានម៉ោងក្នុងមួយថ្ងៃ?",
        answers:[
            { text: "២៣ម៉ោង",correct: false},
            { text: "២៤ម៉ោង",correct: false},
            { text: "២៥ម៉ោង",correct: false},
            { text: "ខ្ញុំអត់ដឹងទេ",correct: true},
        ]
    },
    {
        question: "តើឆ្នាំ ថោះ តំណាងដោយសត្វអ្វី?",
        answers:[
            { text: "កណ្ដុរ",correct: false},
            { text: "ឆ្កែ",correct: false},
            { text: "មាន់",correct: false},
            { text: "ទន្សាយ",correct: true},
        ]
    },
    {
        question: "តើខេត្តកំពតមានព្រំប្រទល់ជាប់ខេត្តណាមួយខាងក្រោម?",
        answers:[
            { text: "ខេត្តព្រះសីហនុ ",correct: true},
            { text: "ខេត្តកំពង់ឆ្នាំង ",correct: false},
            { text: "ខេត្តត្បូងឃ្មុំ ",correct: false},
            { text: "ខេត្តសៀមរាប ",correct: false},          
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score= 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "បន្ដ";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>  {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();

    questionElement.innerHTML = `អបអរសាទរអ្នកឆ្លើយត្រូវ ${score} សំណួរ ក្នុងចំណោម ${questions.
        length} សំណួរ!`;
    nextButton.innerHTML = "លេងម្ដងទៀង";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();