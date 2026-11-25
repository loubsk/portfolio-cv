// ===== CONFIG — mets ici ta vraie adresse e-mail =====
const EMAIL_CONTACT = "ton.email@exemple.com";

// ===== Header qui change au scroll =====
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

// ===== Menu mobile (burger) =====
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.classList.toggle("open", isOpen);
  burger.setAttribute("aria-expanded", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// Ferme le menu quand on clique sur un lien
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  });
});

// ===== Mot qui change dans le hero =====
const rotating = document.querySelector(".rotating");
if (rotating) {
  const words = rotating.dataset.words.split(",");
  let i = 0;
  setInterval(() => {
    rotating.classList.add("fade");
    setTimeout(() => {
      i = (i + 1) % words.length;
      rotating.textContent = words[i];
      rotating.classList.remove("fade");
    }, 350);
  }, 2200);
}

// ===== Apparition des sections au scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Lien actif dans le menu selon la section visible =====
const navLinks = document.querySelectorAll(".nav a");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("section[id]").forEach((s) => sectionObserver.observe(s));

// ===== Filtres des projets =====
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle("hidden", cat !== "all" && card.dataset.category !== cat);
    });
  });
});

// ===== Formulaire de contact =====
// Sans serveur, le formulaire ouvre la messagerie du visiteur avec le message pré-rempli.
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]").forEach((input) => {
    const field = input.closest(".field");
    const empty = !input.value.trim();
    const badEmail = input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    const hasError = empty || badEmail;
    field.classList.toggle("error", hasError);
    if (hasError) valid = false;
  });

  if (!valid) {
    status.textContent = "Merci de remplir tous les champs avec un e-mail valide.";
    status.className = "form-status ko";
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent(`Contact portfolio — ${name}`);
  const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);

  window.location.href = `mailto:${EMAIL_CONTACT}?subject=${subject}&body=${body}`;

  status.textContent = "Merci ! Votre messagerie va s'ouvrir pour envoyer le message.";
  status.className = "form-status ok";
  form.reset();
});

// ===== Année automatique dans le footer =====
document.getElementById("year").textContent = new Date().getFullYear();
