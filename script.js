
/* =========================================
   PERSONALIZE OS DADOS DA FESTA AQUI
========================================= */

const CONFIG = {
  whatsapp: "5511994316716", // Troque pelo número real com DDI e DDD
  horario: "",               // Exemplo: "15h30"
  local: "",                 // Exemplo: "Salão de festas"
  endereco: "",              // Endereço para abrir no mapa
  nomeAniversariante: "Alice",
  idade: 6,
  nomeBebe: "Arthur",
  data: "14/01/2027"
};

/* =========================================
   ELEMENTOS
========================================= */

const openBookButton = document.getElementById("openBook");
const bookStage = document.getElementById("bookStage");
const particlesContainer = document.getElementById("particles");
const sizeOptions = document.querySelectorAll(".size-option");
const sizeHelp = document.getElementById("sizeHelp");
const rsvpButton = document.getElementById("rsvpButton");
const backTop = document.getElementById("backTop");

let selectedSize = "";

/* =========================================
   LIVRO MÁGICO
========================================= */

openBookButton.addEventListener("click", () => {
  bookStage.classList.toggle("is-open");

  const isOpen = bookStage.classList.contains("is-open");

  openBookButton.querySelector("span:nth-child(2)").textContent =
    isOpen ? "NOSSA HISTÓRIA COMEÇA" : "ABRIR NOSSO CONTO";

  openBookButton.querySelector(".button-arrow").textContent =
    isOpen ? "✦" : "↓";

  createSparkles(24);

  document.getElementById("convite").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

/* Também abre o livro ao clicar diretamente nele */
bookStage.addEventListener("click", () => {
  bookStage.classList.toggle("is-open");
  createSparkles(15);
});

/* =========================================
   PARTÍCULAS DOURADAS
========================================= */

function createParticle() {
  if (!particlesContainer) return;

  const particle = document.createElement("span");
  particle.className = "particle";

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${7 + Math.random() * 8}s`;
  particle.style.animationDelay = `${Math.random() * 2}s`;

  const size = 2 + Math.random() * 3;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particlesContainer.appendChild(particle);

  particle.addEventListener("animationend", () => {
    particle.remove();
  }, { once: true });
}

function createSparkles(amount = 12) {
  if (!particlesContainer) return;

  const rect = bookStage.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "particle";

    sparkle.style.left = `${Math.max(
      0,
      Math.min(100, ((rect.left + rect.width / 2) / window.innerWidth) * 100
      + (Math.random() - 0.5) * 20)
    )}%`;

    sparkle.style.bottom = `${Math.max(
      10,
      Math.min(80, 100 - ((rect.top + rect.height / 2) / window.innerHeight) * 100
      + (Math.random() - 0.5) * 15)
    )}%`;

    sparkle.style.animationDuration = `${1.5 + Math.random() * 2}s`;
    sparkle.style.width = `${3 + Math.random() * 4}px`;
    sparkle.style.height = sparkle.style.width;

    particlesContainer.appendChild(sparkle);

    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    }, { once: true });
  }
}

/* Cria um pequeno brilho contínuo no fundo */
for (let i = 0; i < 18; i++) {
  setTimeout(createParticle, i * 250);
}

setInterval(createParticle, 650);

/* =========================================
   ANIMAÇÃO AO ROLAR A PÁGINA
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("is-visible");
  });
}

/* =========================================
   DATA, HORÁRIO E LOCAL
========================================= */

const eventTime = document.getElementById("eventTime");
const eventPlace = document.getElementById("eventPlace");
const mapLink = document.getElementById("mapLink");

if (CONFIG.horario.trim()) {
  eventTime.textContent = CONFIG.horario;
}

if (CONFIG.local.trim()) {
  eventPlace.textContent = CONFIG.local;
}

if (CONFIG.endereco.trim()) {
  mapLink.href =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(CONFIG.endereco);

  mapLink.hidden = false;
}

/* =========================================
   ESCOLHA DO TAMANHO DA FRALDA
========================================= */

sizeOptions.forEach(button => {
  button.addEventListener("click", () => {
    selectedSize = button.dataset.size;

    sizeOptions.forEach(option => {
      const isSelected = option === button;

    });

  
  });
});

/* =========================================
   CONFIRMAÇÃO PELO WHATSAPP
========================================= */

rsvpButton.addEventListener("click", () => {
  const phone = CONFIG.whatsapp.replace(/\D/g, "");

  if (!phone || phone === "5511994316716") {
    alert(
      "Convite sendo enviado "
    );
    return;
  }

  const diaperMessage = selectedSize
    ? `\nSugestão de fralda: tamanho ${selectedSize}.`
    : "\nAinda não escolhi o tamanho da fralda.";

  const message =
    `Olá! Vim pelo convite da festa da ${CONFIG.nomeAniversariante} ` +
    `e do chá de bebê do ${CONFIG.nomeBebe}.\n\n` +
    `Gostaria de confirmar minha presença no dia ${CONFIG.data}.` +
    diaperMessage +
    "\n\nAté lá! ❤️";

  const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});

/* =========================================
   BOTÃO VOLTAR AO TOPO
========================================= */

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
