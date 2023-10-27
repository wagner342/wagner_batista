// Alterações feitas em script.js:
// 1. Importação das questões do quiz a partir do arquivo "questions.js".
// 2. Declaração e inicialização das variáveis e elementos do DOM necessários.
// 3. Implementação da função resetQuiz para reiniciar o quiz.
// 4. Função loadQuestion para carregar uma nova pergunta e respostas.
// 5. Função nextQuestion para avançar para a próxima pergunta ou encerrar o quiz.
// 6. Manipulação de eventos de clique nos botões de resposta.
// 7. Utilização de estruturas de decisão e laços para controlar o progresso do quiz.
// 8. Alteração dinâmica das classes CSS para destacar respostas corretas e incorretas.
import questions from "./questions.js";

const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".quiz-container");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

let currentIndex = 0;
let questionsCorrect = 0;

function resetQuiz() {
  currentIndex = 0;
  questionsCorrect = 0;
  content.style.display = "flex";
  contentFinish.style.display = "none";
  btnRestart.style.display = "none";
  loadQuestion();
}

btnRestart.onclick = resetQuiz;

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="answer" data-correct="${answer.correct}">
      ${answer.option}
    </button>
    `;

    answers.appendChild(div);
  });

  const answerButtons = document.querySelectorAll(".answer");

  answerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.getAttribute("data-correct") === "true") {
        e.target.style.backgroundColor = "#4caf50";
        questionsCorrect++;
      } else {
        e.target.style.backgroundColor = "#f44336";
      }

      answerButtons.forEach((btn) => {
        btn.disabled = true;
      });

      setTimeout(nextQuestion, 1000);
    });
  });
}

function nextQuestion() {
  const answerButtons = document.querySelectorAll(".answer");
  answerButtons.forEach((btn) => {
    btn.disabled = false;
    btn.style.backgroundColor = "";
  });

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
  btnRestart.style.display = "block";
}

resetQuiz();
