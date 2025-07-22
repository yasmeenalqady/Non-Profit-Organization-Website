// ===== 1) الهيدر: إضافة كلاس عند التمرير بعد عنصر الـ hero =====
const header = document.querySelector('.main-header');
const hero = document.getElementById('hero');

if (header && hero) {
  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===== 2) السلايدر الرئيسي مع أزرار التالي والسابق =====
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

let currentIndex = 0;
let autoSlideInterval = null;

function updateSlider() {
  slides.forEach((slide, i) => {
    if (i === currentIndex) {
      slide.classList.add('active');
      const rightSide = slide.querySelector('.right-side');
      if (rightSide) {
        rightSide.classList.remove('animate-overlay');
        void rightSide.offsetWidth; // force reflow
        rightSide.classList.add('animate-overlay');
      }
    } else {
      slide.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// التأكد من وجود الأزرار قبل إضافة الأحداث
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
  });
}

if (slides.length > 0) {
  updateSlider();
  startAutoSlide();
}

// ===== 3) زر القائمة في الهواتف (Toggle) =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-header nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// ===== 4) التحكم في الثيم مع حفظه في localStorage =====
const toggleBtn = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (icon) {
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
}

// تحميل الثيم المحفوظ
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// ===== 5) سلايدر الفئات مع أزرار الأسهم =====
const slider = document.querySelector('.categories');

if (slider) {
  let scrollIndex = 0;
  const visibleItems = 3;
  const totalItems = slider.children.length;
  const maxScroll = totalItems - visibleItems;

  const leftArrow = document.querySelector('.arrow-btn.left');
  const rightArrow = document.querySelector('.arrow-btn.right');

  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      scrollIndex = Math.max(scrollIndex - 1, 0);
      slider.style.transform = `translateX(-${scrollIndex * 200}px)`;
    });
  }
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      scrollIndex = Math.min(scrollIndex + 1, maxScroll);
      slider.style.transform = `translateX(-${scrollIndex * 200}px)`;
    });
  }

  // اختيار العنصر النشط عند النقر
  document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('click', () => {
      document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
    });
  });

  // حركة تلقائية كل 3 ثواني
  setInterval(() => {
    scrollIndex++;
    if (scrollIndex > maxScroll) scrollIndex = 0;
    slider.style.transform = `translateX(-${scrollIndex * 200}px)`;
  }, 3000);
}

// ===== 6) سلايدر الشركاء المتحرك تلقائياً =====
const partnersSlider = document.getElementById('partnersSlider');

if (partnersSlider) {
  let scrollAmount = 0;
  const speed = 0.5;

  function duplicateItems() {
    const sliderContent = partnersSlider.innerHTML;
    partnersSlider.innerHTML += sliderContent;
  }

  duplicateItems();

  function animatePartners() {
    scrollAmount += speed;
    if (scrollAmount >= partnersSlider.scrollWidth / 2) {
      scrollAmount = 0;
    }
    partnersSlider.style.transform = `translateX(-${scrollAmount}px)`;
    requestAnimationFrame(animatePartners);
  }

  animatePartners();
}




const projects = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    title: "Clean Water Initiative",
    desc: "Providing clean and safe drinking water."
  },
  {
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
    title: "Education for All",
    desc: "Supporting education for children in remote regions."
  },
  {
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    title: "Healthcare Access",
    desc: "Improving healthcare facilities and access."
  },
  {
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    title: "Food Support Program",
    desc: "Delivering food to families in need."
  },
  {
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
    title: "Youth Empowerment",
    desc: "Skill development for underprivileged youth."
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    title: "Environmental Awareness",
    desc: "Promoting eco-friendly initiatives."
  },
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    title: "Community Healthcare",
    desc: "Providing medical support in rural areas."
  },
  {
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    title: "Educational Workshops",
    desc: "Workshops to empower local communities."
  },
  {
    img: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=600&q=80",
    title: "Disaster Relief",
    desc: "Rapid response for natural disasters."
  },
  {
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    title: "Solar Energy Project",
    desc: "Harnessing solar energy for clean power."
  },
  {
    img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=600&q=80",
    title: "Animal Welfare",
    desc: "Protecting animals and their habitats."
  },
  {
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80",
    title: "Literacy Campaign",
    desc: "Increasing literacy in underserved areas."
  }
];


let currentPage = 1;
const itemsPerPage = 8;

const projectsContainer = document.getElementById("projectsContainer");
const prevBtnp = document.getElementById("prevBtnp");
const nextBtnp = document.getElementById("nextBtnp");
const pageInfp = document.getElementById("pageInfop");

function renderProjects() {
  projectsContainer.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = projects.slice(start, end);

  pageItems.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${project.img}" alt="${project.title}" />
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
    `;
    projectsContainer.appendChild(card);
  });

  pageInfp.textContent = `Page ${currentPage} of ${Math.ceil(projects.length / itemsPerPage)}`;
  prevBtnp.disabled = currentPage === 1;
  nextBtnp.disabled = currentPage === Math.ceil(projects.length / itemsPerPage);
}

prevBtnp.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderProjects();
  }
});

nextBtnp.addEventListener("click", () => {
  if (currentPage < Math.ceil(projects.length / itemsPerPage)) {
    currentPage++;
    renderProjects();
  }
});

// أول تحميل
renderProjects();
