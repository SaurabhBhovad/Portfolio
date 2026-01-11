/* -------------------------------------------------------------------------- */
/* PROJECT DATA (5 Projects)                    */
/* -------------------------------------------------------------------------- */
const projectsData = [
    {
        title: "Virtual Paint",
        category: "ai",
        desc: "A Computer Vision app using OpenCV & MediaPipe. Draw on screen using hand gestures in real-time.",
        tags: ["Python", "OpenCV", "MediaPipe"],
        icon: "fa-hand-sparkles",
        color: "text-purple-400"
    },
    {
        title: "Jarvis AI Assistant",
        category: "ai",
        desc: "Voice-activated personal assistant using OpenAI API for NLP tasks, automation, and web control.",
        tags: ["Python", "OpenAI", "Speech Recog"],
        icon: "fa-microchip",
        color: "text-blue-400"
    },
    {
        title: "QR Code Generator",
        category: "web",
        desc: "A customizable QR code generator web app built with Python Streamlit. Features color customization.",
        tags: ["Streamlit", "Python", "Web App"],
        icon: "fa-qrcode",
        color: "text-green-400"
    },
    {
        title: "Data Analytics Dashboard",
        category: "data",
        desc: "Interactive sales and trend analysis dashboard visualizing complex datasets for business insights.",
        tags: ["Tableau", "SQL", "Data Viz"],
        icon: "fa-chart-line",
        color: "text-cyan-400"
    },
    {
        title: "Oracle Cloud AI Impl.",
        category: "ai",
        desc: "Implementation of basic machine learning models using Oracle Cloud Infrastructure services.",
        tags: ["Oracle Cloud", "ML", "Cloud"],
        icon: "fa-cloud",
        color: "text-orange-400"
    }
];

/* -------------------------------------------------------------------------- */
/* RENDER LOGIC (Handles Home vs Project Page)      */
/* -------------------------------------------------------------------------- */
const homeGrid = document.getElementById('home-projects-grid');
const allGrid = document.getElementById('all-projects-grid');

function createCard(project, index) {
    return `
        <div class="bg-card border border-slate-700 rounded-2xl p-6 hover:border-primary transition-all duration-300 hover:-translate-y-2 group animate-fade-in" style="animation-delay: ${index * 100}ms">
            <div class="flex justify-between items-start mb-4">
                <div class="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
                    <i class="fa-solid ${project.icon} ${project.color} text-2xl"></i>
                </div>
                <a href="https://github.com/SaurabhBhovad" target="_blank" class="text-slate-500 hover:text-white transition-colors"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">${project.title}</h3>
            <p class="text-slate-400 text-sm mb-4 line-clamp-3">${project.desc}</p>
            <div class="flex flex-wrap gap-2 mt-auto">
                ${project.tags.map(tag => `<span class="px-2 py-1 text-xs rounded bg-slate-700/50 text-slate-300 border border-slate-700">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// SHARED RENDER FUNCTION
function renderGrid(gridElement, filter, limit) {
    gridElement.innerHTML = '';
    
    // 1. Filter Data
    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);
        
    // 2. Apply Limit (Slice)
    const finalData = limit ? filtered.slice(0, limit) : filtered;

    // 3. Render
    if(finalData.length === 0) {
        gridElement.innerHTML = `<p class="text-slate-500 col-span-full text-center py-8">No projects found in this category.</p>`;
    } else {
        finalData.forEach((project, index) => {
            gridElement.innerHTML += createCard(project, index);
        });
    }
}

// 1. HOME PAGE LOGIC (Filters + Limit 3)
if (homeGrid) {
    // Initial Render
    renderGrid(homeGrid, 'all', 3);

    // Filter Clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(homeGrid, btn.dataset.filter, 3); // Keep limit 3 for home
        });
    });
}

// 2. PROJECTS PAGE LOGIC (Filters + No Limit)
if (allGrid) {
    // Initial Render
    renderGrid(allGrid, 'all', null);

    // Filter Clicks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGrid(allGrid, btn.dataset.filter, null); // No limit for all projects
        });
    });
}

/* -------------------------------------------------------------------------- */
/* SHARED LOGIC (Mobile, Theme, Typing, Canvas)     */
/* -------------------------------------------------------------------------- */
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if(mobileBtn) {
    let isMenuOpen = false;
    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if(isMenuOpen) { mobileMenu.classList.remove('translate-x-full'); mobileBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'; }
        else { mobileMenu.classList.add('translate-x-full'); mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; }
    });
}

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if(themeToggle) {
    const moonIcon = document.querySelector('.light-icon');
    const sunIcon = document.querySelector('.dark-icon');
    if(localStorage.getItem('theme') === 'light') { body.classList.add('light-mode'); moonIcon.classList.remove('hidden'); sunIcon.classList.add('hidden'); }
    else { moonIcon.classList.add('hidden'); sunIcon.classList.remove('hidden'); }
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if(body.classList.contains('light-mode')) { localStorage.setItem('theme', 'light'); moonIcon.classList.remove('hidden'); sunIcon.classList.add('hidden'); }
        else { localStorage.setItem('theme', 'dark'); moonIcon.classList.add('hidden'); sunIcon.classList.remove('hidden'); }
    });
}

const typingElement = document.getElementById('typing-text');
if(typingElement) {
    const roles = ["Generative AI", "Data Analytics", "Python Automation"];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const currentRole = roles[roleIndex];
        typingElement.textContent = currentRole.substring(0, charIndex + (isDeleting ? -1 : 1));
        charIndex += isDeleting ? -1 : 1;
        let speed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentRole.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();
}

const canvas = document.getElementById('canvas-bg');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2; this.speedX = (Math.random() - 0.5) * 0.5; this.speedY = (Math.random() - 0.5) * 0.5;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() { ctx.fillStyle = 'rgba(99, 102, 241, 0.5)'; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
    }
    for (let i = 0; i < 60; i++) particles.push(new Particle());
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.update(); p.draw();
            particles.slice(i).forEach(p2 => {
                const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (d < 100) { ctx.strokeStyle = `rgba(99, 102, 241, ${1 - d/100})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke(); }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* -------------------------------------------------------------------------- */
/* FORM VALIDATION (Only runs if form exists)       */
/* -------------------------------------------------------------------------- */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const msgInput = document.getElementById('message');

    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        [nameInput, emailInput, msgInput].forEach(input => {
            input.classList.remove('border-red-500');
            document.getElementById(input.id + '-error').classList.add('hidden');
        });
        if (nameInput.value.trim() === "") { showError(nameInput); isValid = false; }
        if (emailInput.value.trim() === "" || !emailInput.value.includes('@')) { showError(emailInput); isValid = false; }
        if (msgInput.value.trim() === "") { showError(msgInput); isValid = false; }
        if (!isValid) { e.preventDefault(); }
    });

    function showError(input) {
        input.classList.add('border-red-500');
        document.getElementById(input.id + '-error').classList.remove('hidden');
    }
}