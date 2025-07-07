'use strict';

document.addEventListener('DOMContentLoaded', function() {
  /*------------
       MENU
  --------------*/
  const navbar = document.querySelector("[data-navbar]");
  const menuToggleBtn = document.querySelector("[data-navbar-toggle-btn]");
  
  menuToggleBtn?.addEventListener("click", () => {
    navbar?.classList.toggle("active");
  });

  /*------------
   SUBIR AO TOPO
  --------------*/
  const goTopBtn = document.querySelector("[data-go-top]");
  
  window.addEventListener("scroll", () => {
    goTopBtn?.classList.toggle("active", window.scrollY >= 800);
  });

  /*------------
    BTN INICIAR
  --------------*/
  const iniciarBtn = document.querySelector('.btn.btn-primary');
  
  iniciarBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  });

  /*------------
    COLLAPSIBLES
  --------------*/
  document.querySelectorAll(".collapsible").forEach(collapsible => {
    collapsible.addEventListener("click", function() {
      const content = this.nextElementSibling;
      content.classList.toggle("active");
    });
  });

  /*------------
   ENTRELAÇAMENTO
  --------------*/
  const leftParticle = document.querySelector('.particle-left');
  const rightParticle = document.querySelector('.particle-right');
  const leftState = document.querySelector('.particle-left .particle-state');
  const rightState = document.querySelector('.particle-right .particle-state');
  const bondEffect = document.querySelector('.bond-effect');
  const dynamicText = document.querySelector('.dynamic-text');
  
  const messages = [
    "Criando par de partículas quânticas entrelaçadas...",
    "As partículas estão em superposição - spins indefinidos",
    "Conexão quântica estabelecida (entrelaçamento)",
    "Preparando para medir a partícula esquerda...",
    "Medição realizada! Spin esquerdo colapsou para ↑",
    "Efeito instantâneo: spin direito colapsou para ↓",
    "Entrelaçamento confirmado - estados correlacionados",
    "Reiniciando a demonstração..."
  ];

  let animationTimeout;
  let animationCycle;
  let currentStep = 0;

  function resetAnimation() {
    leftState.textContent = '?';
    rightState.textContent = '?';
    leftState.style.animation = '';
    rightState.style.animation = '';
    bondEffect.style.animation = '';
    dynamicText.textContent = "Pronto para demonstrar entrelaçamento quântico";
    leftParticle.querySelector('.particle-core').style.animation = '';
    rightParticle.querySelector('.particle-core').style.animation = '';
  }

  function runAnimationStep() {
    if (document.visibilityState !== 'visible') return;

    switch(currentStep) {
      case 0:
        resetAnimation();
        dynamicText.textContent = messages[0];
        leftParticle.querySelector('.particle-core').style.animation = 'particlePulse 3s infinite';
        rightParticle.querySelector('.particle-core').style.animation = 'particlePulse 3s infinite 0.5s';
        break;
        
      case 2:
        dynamicText.textContent = messages[1];
        bondEffect.style.animation = 'bondPulse 4s infinite';
        break;
        
      case 4:
        dynamicText.textContent = messages[2];
        break;
        
      case 6:
        dynamicText.textContent = messages[3];
        setTimeout(() => {
          leftState.style.animation = 'stateChange 1s forwards';
          const leftSpin = Math.random() > 0.5 ? '↑' : '↓';
          leftState.textContent = leftSpin;
          
          setTimeout(() => {
            dynamicText.textContent = messages[4].replace('↑', leftSpin);
            
            setTimeout(() => {
              bondEffect.style.animation = 'none';
              void bondEffect.offsetWidth;
              bondEffect.style.animation = 'bondPulse 0.8s';
              
              setTimeout(() => {
                rightState.style.animation = 'stateChange 0.5s forwards';
                const rightSpin = leftSpin === '↑' ? '↓' : '↑';
                rightState.textContent = rightSpin;
                dynamicText.textContent = messages[5].replace('↓', rightSpin);
                
                setTimeout(() => {
                  dynamicText.textContent = messages[6];
                }, 1500);
              }, 300);
            }, 1000);
          }, 500);
        }, 500);
        break;
        
      case 12:
        dynamicText.textContent = messages[7];
        leftState.style.animation = '';
        rightState.style.animation = '';
        setTimeout(() => {
          currentStep = -1;
        }, 1000);
        break;
    }

    currentStep++;
    if (currentStep <= 12) {
      animationTimeout = setTimeout(runAnimationStep, 2100);
    } else {
      animationCycle = setTimeout(() => {
        if (document.visibilityState === 'visible') {
          currentStep = 0;
          runAnimationStep();
        }
      }, 5000);
    }
  }

  function startAnimation() {
    resetAnimation();
    currentStep = 0;
    runAnimationStep();
  }

  function stopAnimation() {
    clearTimeout(animationTimeout);
    clearTimeout(animationCycle);
    resetAnimation();
  }

  // Controles de visibilidade
  document.addEventListener('visibilitychange', () => {
    document.visibilityState === 'hidden' ? stopAnimation() : startAnimation();
  });

  // Inicia e limpa animação
  startAnimation();
  window.addEventListener('beforeunload', stopAnimation);
});