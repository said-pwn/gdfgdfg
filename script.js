document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    

    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    

    const slider = document.getElementById('slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    const slides = document.querySelectorAll('.slide');
    
    if (slider && slides.length > 0) {
        let currentSlideIndex = 0;
        const slideCount = slides.length;
        
    
        if (sliderDots) {
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                sliderDots.appendChild(dot);
            });
        }
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
            
       
            document.querySelectorAll('.dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlideIndex);
            });
        }
        
        function goToSlide(index) {
            currentSlideIndex = (index + slideCount) % slideCount;
            updateSlider();
        }
        
        function nextSlide() {
            goToSlide(currentSlideIndex + 1);
        }
        
        function prevSlide() {
            goToSlide(currentSlideIndex - 1);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        

        let slideInterval = setInterval(nextSlide, 5000);

        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', () => {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
    }
    

    const countdownDate = new Date(2025, 6, 31, 20, 59).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
     
        if (distance < 0) {
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = '<h4>The promotion has ended!</h4>';
            }
            return;
        }
        
       
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Workflow Steps Animation
    function animateSteps() {
        const steps = document.querySelectorAll('.step');
        const windowHeight = window.innerHeight;
        
        steps.forEach((step, index) => {
            const stepPosition = step.getBoundingClientRect().top;
            const animationDelay = index * 200;
            
            if(stepPosition < windowHeight - 100) {
                setTimeout(() => {
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                }, animationDelay);
            }
        });
    }
    

    const steps = document.querySelectorAll('.step');
    if (steps.length > 0) {
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'all 0.6s ease-out';
        });
        
        animateSteps();
        window.addEventListener('scroll', animateSteps);
    }
    
    // Reviews Slider
    function initReviewsSlider() {
        const slider = document.querySelector('.reviews-slider');
        const prevBtn = document.querySelector('.reviews-prev');
        const nextBtn = document.querySelector('.reviews-next');
        const reviews = document.querySelectorAll('.review');
        
        if (slider && reviews.length > 0) {
            let currentIndex = 0;
            
            function updateSlider() {
                const reviewWidth = reviews[0].offsetWidth + 30; 
                slider.scrollTo({
                    left: currentIndex * reviewWidth,
                    behavior: 'smooth'
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSlider();
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < reviews.length - 1) {
                        currentIndex++;
                        updateSlider();
                    }
                });
            }
            

            let autoScroll = setInterval(() => {
                if (currentIndex < reviews.length - 1) {
                    currentIndex++;
                } else {
                    currentIndex = 0;
                }
                updateSlider();
            }, 5000);
            
  
            slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
            slider.addEventListener('mouseleave', () => {
                clearInterval(autoScroll);
                autoScroll = setInterval(() => {
                    if (currentIndex < reviews.length - 1) {
                        currentIndex++;
                    } else {
                        currentIndex = 0;
                    }
                    updateSlider();
                }, 5000);
            });
        }
        

        const reviewBtn = document.querySelector('.btn-outline');
        if (reviewBtn) {
            reviewBtn.addEventListener('click', () => {
                alert('The form for submitting a review will open here');
            });
        }
    }
    
    initReviewsSlider();

    const form = document.getElementById('consultationForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            

            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const question = document.getElementById('question');
            

            if (!name.value || !phone.value) {
                alert('Please fill in the required fields');
                return;
            }
            
            function validatePhone(phone) {
                const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                return regex.test(phone);
            }
            
            if (!validatePhone(phone.value)) {
                alert('Please enter a valid phone number');
                return;
            }

            const whatsappNumber = '79598990998';
            

            const message = `New request from the website:%0A%0A` +
                           `*Name:* ${encodeURIComponent(name.value)}%0A` +
                           `*Phone:* ${encodeURIComponent(phone.value)}%0A` +
                           `*Question:* ${encodeURIComponent(question.value)}`;
            

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
            

            const whatsappLink = document.getElementById('whatsappLink');
            if (whatsappLink) {
                whatsappLink.href = whatsappUrl;
            }
            

            const modal = document.getElementById('modalOverlay');
            if (modal) {
                modal.classList.add('active');
            }
            

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);

            this.reset();
        });
    }

    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            const modal = document.getElementById('modalOverlay');
            if (modal) {
                modal.classList.remove('active');
            }
        });

    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    }});