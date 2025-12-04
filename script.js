document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Animation (Simple Fade In)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Typing Effect
    const texts = ["Aspiring Web Developer", "Python Enthusiast", "Frontend Developer"];
    const typingElement = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeText, typeSpeed);
    }

    // Start typing
    setTimeout(typeText, 500);

    // Particle Background
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(14, 165, 233, ${Math.random() * 0.5})`; // Sky blue with opacity
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
            if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();

    // Project Data
    const projects = [
        {
            title: "Smart Question Paper Generator",
            shortDesc: "A Django-based web application to create, manage and generate examination question papers.",
            fullDesc: `
                <p><strong>Smart Question Paper Generator</strong> is a Django web application designed to create, manage, and generate examination question papers efficiently. Teachers can add questions to a question bank, filter by subject/year/unit, assemble papers with section-wise marks, validate totals, and export the final paper as a PDF.</p>
                <br>
                <h4>Key Features:</h4>
                <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px;">
                    <li><strong>Question Bank CRUD:</strong> Add, view, filter, and delete questions by subject, year, or unit.</li>
                    <li><strong>Flexible Paper Generation:</strong> Configure sections, question counts, and marks per question.</li>
                    <li><strong>Validation Logic:</strong> Ensures total marks equal the requested maximum before allowing PDF generation.</li>
                    <li><strong>PDF Export:</strong> Generates a professional PDF of the final question paper.</li>
                    <li><strong>User Interface:</strong> Clean, responsive UI built with Bootstrap.</li>
                    <li><strong>Interactive Feedback:</strong> Uses session messages and animated notifications for user actions.</li>
                </ul>
            `,
            techStack: ["HTML", "Bootstrap", "Python", "Django", "SQLite"],
            liveLink: "#", // Replace with actual live link if available
            githubLink: "https://github.com/vidyateju106-png/Smart-Question-paper-generator",
            images: [
                "images/qp gen/qphome.png",
                "images/qp gen/adminlogin.png"
            ]
        },
        {
            title: "College Event Management System",
            shortDesc: "A full-featured system managing the entire event lifecycle from creation to registration.",
            fullDesc: `
                <p><strong>College Event Management System (CEMS)</strong> is a full-featured application built with Django that manages the entire event lifecycle from creation and HOD approval to participant registration with QR code tickets, check-ins, and feedback.</p>
                <br>
                <h4>Key Features & User Roles:</h4>
                <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px;">
                    <li><strong>Participant:</strong> Can browse approved events, register for them, and provide feedback.</li>
                    <li><strong>Organizer:</strong> Can create, edit, and delete their own events (submitted for approval), view participants, and access an analytics dashboard.</li>
                    <li><strong>Head of Department (HOD):</strong> Staff user who approves or rejects events.</li>
                </ul>
                <br>
                <h4>Core Functionality:</h4>
                <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 10px;">
                    <li><strong>Approval Workflow:</strong> Events require HOD approval before becoming visible. Organizers are notified via email.</li>
                    <li><strong>QR Code Ticketing:</strong> Unique QR codes are generated and emailed as PDF tickets upon registration.</li>
                    <li><strong>Web-Based Check-in:</strong> Built-in QR scanner for organizers to validate tickets.</li>
                    <li><strong>Automated Emails:</strong> Confirmations, status updates, and feedback requests.</li>
                    <li><strong>Feedback & Analytics:</strong> Star ratings, comments, and organizer dashboards.</li>
                    <li><strong>Scheduled Tasks:</strong> Auto-completion of events and feedback emails.</li>
                </ul>
                <br>
                <h4>Key Libraries:</h4>
                <p>django-apscheduler, qrcode[pil], xhtml2pdf, python-decouple</p>
            `,
            techStack: ["HTML", "Tailwind CSS", "Python", "Django", "SQLite"],
            liveLink: "#", // Replace with actual live link if available
            githubLink: "https://github.com/vidyateju106-png/-College-Event-Hub",
            images: [
                "images/cems/cemshome.jpg",
                "images/cems/cemslogin.jpg",
                "images/cems/cemsorganizerdashboard.jpg",
                "images/cems/cemsafter reg.png",
                "images/cems/cemsregsucuss.jpg"
            ]
        }
    ];

    const projectsList = document.getElementById('projects-list');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTech = document.getElementById('modal-tech');
    const modalGithub = document.getElementById('modal-github');

    // Carousel Elements
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const carouselDots = document.getElementById('carousel-dots');

    let currentProjectImages = [];
    let currentImageIndex = 0;

    // Render Projects
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        projectCard.setAttribute('data-index', index); // Add data-index to the card
        projectCard.innerHTML = `
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.shortDesc}</p>
                <p><strong>Tech Stack:</strong> ${project.techStack.join(', ')}</p>
                <button class="btn-link view-project-btn">View Details <i class="fas fa-arrow-right"></i></button>
            </div>
        `;
        projectsList.appendChild(projectCard);
    });

    function updateCarousel() {
        modalImg.src = currentProjectImages[currentImageIndex];

        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentImageIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Show/Hide buttons if only one image
        if (currentProjectImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            carouselDots.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            carouselDots.style.display = 'flex';
        }
    }

    function createDots() {
        carouselDots.innerHTML = '';
        currentProjectImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent modal close
                currentImageIndex = index;
                updateCarousel();
            });
            carouselDots.appendChild(dot);
        });
    }

    // Open Modal (Click on Card)
    projectsList.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const index = card.getAttribute('data-index');
            const project = projects[index];

            currentProjectImages = project.images;
            currentImageIndex = 0;

            modalTitle.textContent = project.title;
            modalDesc.innerHTML = project.fullDesc;

            modalTech.innerHTML = project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

            modalGithub.href = project.githubLink;

            updateCarousel();
            createDots();

            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    });

    // Carousel Navigation
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        updateCarousel();
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});
