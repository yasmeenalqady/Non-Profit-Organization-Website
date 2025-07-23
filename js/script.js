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


//------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projectsContainer");
  const prevBtnp = document.getElementById("prevBtnp");
  const nextBtnp = document.getElementById("nextBtnp");
  const pageInfp = document.getElementById("pageInfop");
  const categoryFilter = document.getElementById("categoryFilter");

  let projects = [];
  let filteredProjects = [];
  let currentPage = 1;
  const itemsPerPage = 8;

  function renderProjects() {
  projectsContainer.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProjects.slice(start, end);

  if (pageItems.length === 0) {
    projectsContainer.innerHTML = "<p>No projects to display.</p>";
    // إخفاء أزرار التنقل إذا لا يوجد مشاريع
    prevBtnp.style.display = "none";
    nextBtnp.style.display = "none";
    pageInfp.textContent = "";
    return;
  }

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

  pageInfp.textContent = `Page ${currentPage} of ${Math.ceil(filteredProjects.length / itemsPerPage)}`;

  // إذا المشاريع أقل أو تساوي عدد العناصر في الصفحة الواحدة، إخفاء أزرار التنقل
  if (filteredProjects.length <= itemsPerPage) {
    prevBtnp.style.display = "none";
    nextBtnp.style.display = "none";
  } else {
    // إظهار الأزرار وتفعيلها/تعطيلها حسب الصفحة
    prevBtnp.style.display = "inline-block";
    nextBtnp.style.display = "inline-block";
    prevBtnp.disabled = currentPage === 1;
    nextBtnp.disabled = currentPage === Math.ceil(filteredProjects.length / itemsPerPage);
  }
}


  function filterProjects() {
    const selectedCategory = categoryFilter.value;
    if (selectedCategory === "all") {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.filter(p => p.category === selectedCategory);
    }
    currentPage = 1; // Reset to first page on filter change
    renderProjects();
  }

  prevBtnp.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProjects();
    }
  });

  nextBtnp.addEventListener("click", () => {
    if (currentPage < Math.ceil(filteredProjects.length / itemsPerPage)) {
      currentPage++;
      renderProjects();
    }
  });

  categoryFilter.addEventListener("change", filterProjects);

  async function loadProjects() {
    try {
      const response = await fetch('projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      projects = data;
      filteredProjects = projects; // initially no filter
      renderProjects();
    } catch (error) {
      projectsContainer.innerHTML = "<p>Failed to load projects.</p>";
      console.error("Error loading projects:", error);
    }
  }

  loadProjects();
});





// contact ----------------------------------------------------------------------------------------
  document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    // Reset message
    formMessage.textContent = "";

    // Validation
    if (!name || !email || !message) {
      formMessage.textContent = "Please fill in all fields.";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    // If passed, show success (or actually submit the form here)
    formMessage.style.color = "green";
    formMessage.textContent = "Message sent successfully!";
    
    // Optionally clear the form
    document.getElementById("contactForm").reset();
  });
