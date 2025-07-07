document.addEventListener('DOMContentLoaded', function() {
    /*----------------------
    SELEÇÃO ELEMENTOS QUIZ
    ----------------------*/
    const questions = document.querySelectorAll('.quantum-quiz-question');
    const prevBtn = document.getElementById('quantum-quiz-prev');
    const nextBtn = document.getElementById('quantum-quiz-next');
    const restartBtn = document.getElementById('quantum-quiz-restart');
    const progressText = document.getElementById('quantum-quiz-progress');
    const resultsDiv = document.getElementById('quantum-quiz-results');
    const scoreText = document.getElementById('quantum-quiz-score-text');
    const performanceComment = document.getElementById('quantum-quiz-performance-comment');

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = Array(questions.length).fill(null);
    let answeredLastQuestion = false;


    /*----------------------
       EXIBE QUESTÃO ATUAL
     E ATUALIZA A NAVEGAÇÃO
    ----------------------*/
    function showQuestion(index) {
      // ESCONDE TODAS AS QUESTÕES
      questions.forEach(question => question.classList.remove('active'));
      
      questions[index].classList.add('active');
      
      // ATUALIZA VISIBILIDADE DOS BOTÕES DE NAVEGAÇÃO
      prevBtn.style.display = index === 0 ? 'none' : 'block';
      
      if (index === questions.length - 1) {
        nextBtn.style.display = 'none';
        restartBtn.style.display = answeredLastQuestion ? 'block' : 'none';
      } else {
        nextBtn.style.display = 'block';
        restartBtn.style.display = 'none';
      }
      
      progressText.textContent = `${index + 1}/${questions.length}`;
      
      // SE TIVER, RESTAURA RESPOSTA SELECIONADA 
      if (userAnswers[index] !== null) {
        const options = questions[index].querySelectorAll('.quantum-quiz-option');
        options[userAnswers[index]].classList.add('selected');
      }
      
      const feedback = questions[index].querySelector('.quantum-quiz-feedback');
      const tryAgain = questions[index].querySelector('.quantum-quiz-try-again');
      if (feedback) feedback.style.display = 'none';
      if (tryAgain) tryAgain.style.display = 'none';
      
      if (index !== questions.length - 1 || !answeredLastQuestion) {
        resultsDiv.style.display = 'none';
      }
    }


    /*----------------------
    PROCESSAMENTO DA RESPOSTA
    ----------------------*/
    function selectAnswer(option, questionIndex) {
      const question = questions[questionIndex];
      const options = question.querySelectorAll('.quantum-quiz-option');
      const feedback = question.querySelector('.quantum-quiz-feedback');
      const tryAgain = question.querySelector('.quantum-quiz-try-again');
      
      options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
      
      // MARCA NOVA OPÇÃO SELECIONADA
      option.classList.add('selected');
      const isCorrect = option.getAttribute('data-correct') === 'true';
      
      if (isCorrect) {
        // RESPOSTA CORRETA
        option.classList.add('correct');
        if (feedback) feedback.style.display = 'flex';
        if (tryAgain) tryAgain.style.display = 'none';
        
        // INCREMENTA PONTUAÇÃO SE FOR PRIMEIRA RESPOSTA CORRETA
        if (userAnswers[questionIndex] === null) score++;
      } else {

        option.classList.add('incorrect');
        if (tryAgain) tryAgain.style.display = 'flex';
        if (feedback) feedback.style.display = 'none';
        
        options.forEach(opt => {
          if (opt.getAttribute('data-correct') === 'true') opt.classList.add('correct');
        });
      }
      
      userAnswers[questionIndex] = Array.from(options).indexOf(option);
      
      // SE FOR ÚLTIMA QUESTÃO, EXIBE RESULTADOS
      if (questionIndex === questions.length - 1) {
        answeredLastQuestion = true;
        showResults();
        restartBtn.style.display = 'block';
      }
    }


    /*----------------------
    NAVEGAÇÃO ENTRE QUESTÕES
    ----------------------*/
    function nextQuestion() {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
      }
    }
    
    function prevQuestion() {
      if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
      }
    }


    /*----------------------
     EXIBE RESULTADO FINAL
    ----------------------*/
    function showResults() {
      if (!answeredLastQuestion) return;
      
      resultsDiv.style.display = 'block';
      scoreText.textContent = `VOCÊ ACERTOU ${score} DE ${questions.length} PERGUNTAS!`;
      
      const percentage = (score / questions.length) * 100;
      performanceComment.textContent = 
        percentage >= 85 ? 'EXCELENTE! VOCÊ DOMINA OS CONCEITOS QUÂNTICOS!' :
        percentage >= 60 ? 'BOM TRABALHO! COMPREENSÃO SOLIDA DOS FUNDAMENTOS.' :
        percentage >= 40 ? 'NO CAMINHO CERTO! REVISE ALGUNS DETALHES.' :
        'A MECÂNICA QUÂNTICA É DESAFIADORA! CONTINUE ESTUDANDO!';
    }


    /*----------------------
         REINICIA QUIZ
    ----------------------*/
    function restartQuiz() {
      currentQuestion = 0;
      score = 0;
      userAnswers = Array(questions.length).fill(null);
      answeredLastQuestion = false;
      
      questions.forEach(question => {
        // LIMPA SELEÇÕES DE RESPOSTAS
        question.querySelectorAll('.quantum-quiz-option').forEach(option => {
          option.classList.remove('selected', 'correct', 'incorrect');
        });
        
        // ESCONDE FEEDBACK
        const feedback = question.querySelector('.quantum-quiz-feedback');
        const tryAgain = question.querySelector('.quantum-quiz-try-again');
        if (feedback) feedback.style.display = 'none';
        if (tryAgain) tryAgain.style.display = 'none';
      });
      
      resultsDiv.style.display = 'none';
      showQuestion(currentQuestion);
    }

    
    /*----------------------
          INICIA QUIZ
    ----------------------*/
    showQuestion(currentQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    
    // CONFIGURA EVENTOS DE CLIQUE PARA CADA OPÇÃO DE RESPOSTA
    questions.forEach((question, index) => {
      question.querySelectorAll('.quantum-quiz-option').forEach(option => {
        option.addEventListener('click', () => selectAnswer(option, index));
      });
    });
});