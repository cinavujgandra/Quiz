const wrapBox = document.querySelector('.wrap-box')
const questionCurasel = document.querySelector('.questionCurasel')
const countdownTimer = document.querySelector('.countdownTimer')
const questionClass = document.querySelector('.question');
const createQuestion = document.createElement('h4')
const res = document.querySelector('.result');
const nextBtn = document.querySelector('.nextBtn')
const answers = document.querySelector(".wrap-answers").children;
let counter = 0;
let result = 0
let timer = 120;


const loadQuestion = (counter) =>{
    fetch('../quiz.json')
    .then((response) => response.json())
    .then((data) => {
            allQuestions = data['questions']
            counter < allQuestions.length ? questionCurasel.innerHTML = `${counter +1}/${allQuestions.length}` : "";
            
            allQuestions.map((el, index) => {
                if (counter == index) {
                    createQuestion.innerHTML = el.question
                    questionClass.appendChild(createQuestion)
                 
                    for (const i in el.answers) {
                       
                            answers[i].onclick = () => {
                             
                                if (counter >= allQuestions.length-1) {
                                    clearInterval(x)
                                    
                                }
                               if (el.correctIndex == i) {
                                  
                                   sumResult(el.point)
                                   answers[i].innerHTML = `<h4 style="color:green;font-weight: bold;">${el.answers[i]}</h4>`;
                               }else{
                                   answers[i].innerHTML = `<h4 style="color:red;font-weight: bold;">${el.answers[i]}</h4>`;
                                   answers[el.correctIndex].innerHTML = `<h4 style="color:green;font-weight: bold;">${el.answers[el.correctIndex]}</h4>`;
                               }
                               for (const i in el.answers) {
                                   answers[i].onclick = () => {return false}
                               }
                              
                            }
                            
                            answers[i].innerHTML = `<h4>${el.answers[i]}</h4>`;                                    
                    }
                }
                
            })


        });
        
}
nextBtn.addEventListener("click", ()=>{
    counter++
    loadQuestion(counter)
});

const sumResult = (point) =>{
    result = result+point;
    res.innerHTML = `Result: ${Math.ceil(result)} %`;
}

const x = setInterval(()=>{
    timer--
    if (timer == 0) {
        wrapBox.innerHTML="<h1>Time is over</h1>"
        clearInterval(x)
    }
    countdownTimer.innerHTML=timer;
}, 1000);

const restart = () =>{
    location.reload(); 
}

loadQuestion(counter)
   

    




