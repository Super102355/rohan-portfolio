
// ==========================================
// FILE 1: src/Portfolio.js
// ==========================================
import React, { useEffect } from 'react';
import './Portfolio.css';

const Portfolio = () => {
  useEffect(() => {
    // Remove loader after page loads
    const handleLoad = () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
          loader.style.opacity = '0';
          setTimeout(() => {
            loader.style.display = 'none';
          }, 1000);
        }
      }, 2000);
    };
    window.addEventListener('load', handleLoad);

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Main cursor follows immediately
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    // Smooth animation for follower
    function animateFollower() {
      // Smooth following effect
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
      }
      
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Particle system
    function createParticle() {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = 20 + Math.random() * 10 + 's';
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 30000);
    }

    // Create initial particles
    for(let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 200);
    }

    // Continue creating particles
    const particleInterval = setInterval(createParticle, 1000);

    // Typing animation
    const phrases = [
      "Building innovative solutions with code",
      "Turning complex problems into elegant solutions",
      "Passionate about electrical engineering",
      "Creating tomorrow's technology today",
      "Leading with purpose and innovation"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      const typedElement = document.getElementById('typed');
      
      if (!typedElement) return;
      
      if (!isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeWriter, 2000);
          return;
        }
      } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      
      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }
    
    typeWriter();

    // Navbar scroll effect and active section highlighting
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
      
      // Highlight active section
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.slice(1) === current) {
          link.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          // Animate timeline items
          if (entry.target.querySelector('.timeline-item')) {
            const items = entry.target.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('active');
              }, index * 200);
            });
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const handleSubmit = (e) => {
        e.preventDefault();
        
        const button = e.target.querySelector('.form-submit');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.style.background = 'linear-gradient(45deg, var(--accent), var(--primary))';
        
        // Simulate sending
        setTimeout(() => {
          button.textContent = 'Message Sent! ✓';
          button.style.background = 'linear-gradient(45deg, #00ff00, var(--primary))';
          
          // Reset form
          e.target.reset();
          
          // Reset button after delay
          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
          }, 3000);
        }, 2000);
      };
      contactForm.addEventListener('submit', handleSubmit);
    }

    // Add hover effect to cards
    document.querySelectorAll('.skill-card, .leadership-card, .project-card').forEach(card => {
      card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
      });
      
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });
    });

    // Interactive background gradient on mouse move
    const handleMouseMoveGradient = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.querySelectorAll('.project-image, .research-container::before').forEach(el => {
        if (el.style) {
          el.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 255, 204, 0.2), rgba(123, 47, 247, 0.1))`;
        }
      });
    };
    document.addEventListener('mousemove', handleMouseMoveGradient);

    // Number counter animation
    function animateNumbers() {
      document.querySelectorAll('.stat-number').forEach(stat => {
        const target = stat.textContent;
        const isDecimal = target.includes('.');
        const isText = target.includes('st') || target.includes('nd') || target.includes('rd') || target.includes('th');
        const hasPlus = target.includes('+');
        
        if (!isText && !stat.classList.contains('animated')) {
          stat.classList.add('animated');
          
          if (hasPlus) {
            const targetNum = parseFloat(target);
            let current = 0;
            const timer = setInterval(() => {
              current += 1;
              if (current >= targetNum) {
                stat.textContent = targetNum + '+';
                clearInterval(timer);
              } else {
                stat.textContent = current;
              }
            }, 50);
          } else if (isDecimal) {
            let current = 0;
            const targetNum = parseFloat(target);
            const timer = setInterval(() => {
              current += 0.01;
              if (current >= targetNum) {
                stat.textContent = target;
                clearInterval(timer);
              } else {
                stat.textContent = current.toFixed(2);
              }
            }, 30);
          }
        }
      });
    }

    // Trigger number animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateNumbers();
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    // Add random glitch effect
    const glitchInterval = setInterval(() => {
      const glitchElements = document.querySelectorAll('.glitch');
      glitchElements.forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
          el.style.animation = '';
        }, 10);
      });
    }, 10000);

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleMouseMoveGradient);
      clearInterval(particleInterval);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor"></div>
      <div className="cursor-follower"></div>

      {/* Loader */}
      <div className="loader" id="loader">
        <div className="loader-content">
          <div className="loader-text">INITIALIZING...</div>
          <div className="loader-bar">
            <div className="loader-progress"></div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav id="navbar">
        <div className="nav-container">
          <div className="logo">RP.</div>
          <ul className="nav-links">
            <li><a href="#home" className="nav-link">Home</a></li>
            <li><a href="#about" className="nav-link">About</a></li>
            <li><a href="#skills" className="nav-link">Skills</a></li>
            <li><a href="#research" className="nav-link">Research</a></li>
            <li><a href="#leadership" className="nav-link">Leadership</a></li>
            <li><a href="#awards" className="nav-link">Awards</a></li>
            <li><a href="#projects" className="nav-link">Projects</a></li>
            <li><a href="#journey" className="nav-link">Journey</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="particles" id="particles"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span style={{animationDelay: '0.1s'}}>R</span>
            <span style={{animationDelay: '0.2s'}}>o</span>
            <span style={{animationDelay: '0.3s'}}>h</span>
            <span style={{animationDelay: '0.4s'}}>a</span>
            <span style={{animationDelay: '0.5s'}}>n</span>
            <span style={{animationDelay: '0.6s'}}> </span>
            <span className="glitch" data-text="Patel" style={{animationDelay: '0.7s'}}>Patel</span>
          </h1>
          <p className="hero-subtitle">Engineering Innovator • Problem Solver • Leader</p>
          <div className="typing-text">
            <span id="typed"></span><span className="typing-cursor">|</span>
          </div>
          <a href="#about" className="hero-cta">Explore My Journey</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="reveal">
        <h2 className="section-title">About Me</h2>
        <div className="about-container">
          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="about-image-inner">RP</div>
            </div>
          </div>
          <div className="about-content">
            <h3>Engineering the Future, One Innovation at a Time</h3>
            <p>
              I'm a passionate junior at South Brunswick High School with a deep love for electrical engineering and physics. 
              From taking apart toys as a kid to attach Arduino motors, to conducting research at TCNJ's Laboratory for 
              Embedded Control and Optimization, my journey has been driven by curiosity and a desire to create meaningful solutions.
            </p>
            <p>
              My entrepreneurial spirit shines through projects like BusLinks, an innovative bus-tracking system that won 
              1st place at LaunchSB and advanced to the Diamond Challenge quarter-finals. Whether I'm leading the drumline 
              section in marching band, organizing community service events as Leo Club Vice President, or developing 
              cutting-edge prototypes, I approach every challenge with dedication and creativity.
            </p>
            <p>
              With a 4.35 GPA and coursework in Multivariable Calculus, AP Physics C, and advanced computer science, 
              I'm preparing to pursue Electrical and Computer Engineering at top universities. My goal? To leverage 
              technology to solve real-world problems and make a positive impact on society.
            </p>
            <div className="stats">
              <div className="stat">
                <div className="stat-number">4.35</div>
                <div className="stat-label">GPA</div>
              </div>
              <div className="stat">
                <div className="stat-number">10+</div>
                <div className="stat-label">Technical Skills</div>
              </div>
              <div className="stat">
                <div className="stat-number">1st</div>
                <div className="stat-label">LaunchSB Winner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="reveal">
        <h2 className="section-title">Technical Arsenal</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">☕</div>
            <div className="skill-name">Java</div>
            <div className="skill-level">Advanced</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🐍</div>
            <div className="skill-name">Python</div>
            <div className="skill-level">Proficient</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">⚡</div>
            <div className="skill-name">C++</div>
            <div className="skill-level">Proficient</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🎮</div>
            <div className="skill-name">C#</div>
            <div className="skill-level">Intermediate</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🤖</div>
            <div className="skill-name">Arduino</div>
            <div className="skill-level">Proficient</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🎨</div>
            <div className="skill-name">Canva</div>
            <div className="skill-level">Advanced</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">📊</div>
            <div className="skill-name">Excel</div>
            <div className="skill-level">Proficient</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🖨️</div>
            <div className="skill-name">3D Printing</div>
            <div className="skill-level">Proficient</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🎛️</div>
            <div className="skill-name">FPAA</div>
            <div className="skill-level">Intermediate</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">📱</div>
            <div className="skill-name">Mobile App Dev</div>
            <div className="skill-level">Intermediate</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🥽</div>
            <div className="skill-name">VR Design</div>
            <div className="skill-level">Elementary</div>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🔬</div>
            <div className="skill-name">Research</div>
            <div className="skill-level">Proficient</div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="reveal">
        <h2 className="section-title">Research Experience</h2>
        <div className="research-container">
          <div className="research-header">
            <div className="research-icon">🔬</div>
            <div className="research-title">
              <h3>Laboratory for Embedded Control and Optimization</h3>
              <p>TCNJ • MUSE Program • Summer 2025</p>
            </div>
          </div>
          <div className="research-content">
            <ul>
              <li>Conducted hands-on research in control systems theory and embedded control algorithms</li>
              <li>Mastered Anadigm field-programmable analog arrays (FPAAs) technology</li>
              <li>Developed an innovative audio frequency splitter project separating music signals into high, mid, and low bands</li>
              <li>Designed custom amplifier circuits for multi-speaker output systems</li>
              <li>Presented findings to MUSE program faculty and peer researchers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="reveal">
        <h2 className="section-title">Leadership & Impact</h2>
        <div className="leadership-grid">
          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>Leo Club Vice President</h3>
                <p>CJPE Leo Club & Somerset Leo Club</p>
              </div>
              <div className="leadership-date">2022 - Present</div>
            </div>
            <div className="leadership-description">
              Leading community service initiatives including monthly public events on eye health and drug awareness. 
              Previously served as Instagram Coordinator (2023-2024), increasing community engagement by 33% through strategic social media campaigns. 
              Now as Vice President (2024-Present), organizing successful food and eyeglasses drives for the homeless community.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">33% Engagement Increase</span>
              <span className="achievement-tag">2 Events/Month</span>
              <span className="achievement-tag">Vice President</span>
            </div>
          </div>
          
          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>Drumline Section Leader</h3>
                <p>SBHS Marching Band</p>
              </div>
              <div className="leadership-date">2023 - 2026</div>
            </div>
            <div className="leadership-description">
              Currently leading entire drumline section (2025-2026) after serving as Bass Line Section Leader (2023-2024). 
              Organizing biweekly practices and mentoring underclassmen in musical techniques. Creating supportive 
              communication channels and ensuring perfect harmony across the percussion section.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">Most Improved Award</span>
              <span className="achievement-tag">Section Leadership</span>
              <span className="achievement-tag">Mentorship</span>
            </div>
          </div>

          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>Marketing Manager</h3>
                <p>Nilam's Kitchen</p>
              </div>
              <div className="leadership-date">2023 - Present</div>
            </div>
            <div className="leadership-description">
              Managing digital marketing strategy for family catering business. Expanded customer base by 64% 
              year-over-year through strategic social media campaigns, professional photography, and targeted 
              Facebook Marketplace advertising.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">64% Growth YoY</span>
              <span className="achievement-tag">Digital Marketing</span>
              <span className="achievement-tag">Brand Strategy</span>
            </div>
          </div>

          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>Subcommittee Leader</h3>
                <p>Viking Volunteers</p>
              </div>
              <div className="leadership-date">2024 - 2025</div>
            </div>
            <div className="leadership-description">
              Leading collaboration with The Mental Health Association of New Jersey, orchestrating collection and 
              donation of 70+ personalized care packages. Weekly volunteering at local food pantry supporting 
              community members in need.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">70+ Care Packages</span>
              <span className="achievement-tag">Weekly Service</span>
              <span className="achievement-tag">Mental Health Advocacy</span>
            </div>
          </div>

          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>Bentley Food Pantry Volunteer</h3>
                <p>Community Service</p>
              </div>
              <div className="leadership-date">2023 - Present</div>
            </div>
            <div className="leadership-description">
              Actively supporting local food security through hands-on volunteer work. Responsibilities include unloading 
              trucks of donated food, sorting and stocking shelves while managing inventory rotation, organizing walk-in 
              freezer storage, and maintaining facility cleanliness through waste management and box compacting.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">Food Security</span>
              <span className="achievement-tag">Inventory Management</span>
              <span className="achievement-tag">Community Support</span>
            </div>
          </div>

          <div className="leadership-card">
            <div className="leadership-header">
              <div className="leadership-title">
                <h3>XSTEM Club Member</h3>
                <p>Entrepreneurship & Innovation</p>
              </div>
              <div className="leadership-date">2023 - Present</div>
            </div>
            <div className="leadership-description">
              Conceptualized and developed BusLinks, securing 1st place among 26 competitors at LaunchSB. Advanced 
              to Diamond Challenge quarter-finals at The Masters School in NY, demonstrating market viability and 
              technical innovation.
            </div>
            <div className="leadership-achievements">
              <span className="achievement-tag">1st Place LaunchSB</span>
              <span className="achievement-tag">Diamond Challenge QF</span>
              <span className="achievement-tag">Product Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="reveal">
        <h2 className="section-title">Awards & Recognition</h2>
        <div className="awards-grid">
          <div className="award-card">
            <div className="award-icon">🏆</div>
            <div className="award-content">
              <h3>AP Scholar with Distinction</h3>
              <p className="award-date">2025</p>
              <p className="award-description">Granted to students who receive an average score of 3.5 on all AP exams taken and scores of 3 or higher on five or more exams.</p>
            </div>
          </div>
          
          <div className="award-card">
            <div className="award-icon">📚</div>
            <div className="award-content">
              <h3>High Honor Roll</h3>
              <p className="award-date">All Semesters</p>
              <p className="award-description">Academic recognition for maintaining a GPA of 3.5 or higher throughout the school year, demonstrating consistent excellence in coursework.</p>
            </div>
          </div>
          
          <div className="award-card">
            <div className="award-icon">💎</div>
            <div className="award-content">
              <h3>Diamond Challenge Quarter-Finalist</h3>
              <p className="award-date">March 2025</p>
              <p className="award-description">Prestigious national high school entrepreneurship competition, representing the top 25% of participants nationwide presenting to industry experts and investors.</p>
            </div>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🚀</div>
            <div className="award-content">
              <h3>LaunchSB Winner</h3>
              <p className="award-date">May 2024</p>
              <p className="award-description">First place in school-wide entrepreneurship competition, selected based on market viability, technical feasibility, and presentation quality.</p>
            </div>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🇫🇷</div>
            <div className="award-content">
              <h3>French National Exam: Honorable Mention</h3>
              <p className="award-date">March 2024</p>
              <p className="award-description">Exceptional proficiency in French language skills on standardized national assessment, placing among top performers nationwide.</p>
            </div>
          </div>
          
          <div className="award-card">
            <div className="award-icon">🎵</div>
            <div className="award-content">
              <h3>Most Improved Award - Marching Band</h3>
              <p className="award-date">December 2022</p>
              <p className="award-description">Recognition for greatest progress in musical performance, marching technique, and overall contribution to the ensemble.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="reveal">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">🚌</div>
            <div className="project-content">
              <h3>BusLinks</h3>
              <p>
                An innovative bus-tracking solution designed to help students and parents track school buses in real-time. 
                Engineered a functional prototype using 3D printed components and Arduino technology. Developed comprehensive 
                market research, competitive analysis, and detailed financial models demonstrating profitability.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Arduino</span>
                <span className="tech-tag">3D Printing</span>
                <span className="tech-tag">IoT</span>
                <span className="tech-tag">GPS Tracking</span>
              </div>
              <a href="#" className="project-link">View Project Details</a>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">🎵</div>
            <div className="project-content">
              <h3>FPAA Audio Frequency Splitter</h3>
              <p>
                Developed an advanced audio processing system using Anadigm FPAA technology to separate music signals 
                into high, mid, and low frequency bands. Designed and built custom amplifier circuits for multi-speaker 
                output, demonstrating practical applications of control systems theory.
              </p>
              <div className="project-tech">
                <span className="tech-tag">FPAA</span>
                <span className="tech-tag">Signal Processing</span>
                <span className="tech-tag">Circuit Design</span>
                <span className="tech-tag">Analog Systems</span>
              </div>
              <a href="#" className="project-link">Read Blog Post</a>
            </div>
          </div>
        </div>
      </section>

      {/* Journey/Timeline Section */}
      <section id="journey" className="reveal">
        <h2 className="section-title">My Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">Early Years</div>
              <div className="timeline-title">Discovering My Passion</div>
              <div className="timeline-description">
                Started taking apart toys and adding Arduino motors with my dad's help. This early curiosity sparked my lifelong passion for engineering and technology.
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2022</div>
              <div className="timeline-title">High School Foundations</div>
              <div className="timeline-description">
                Began at South Brunswick High School, joined Leo Club to serve the community, and earned Most Improved Award in Marching Band freshman year.
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2023</div>
              <div className="timeline-title">Leadership & Growth</div>
              <div className="timeline-description">
                Became Bass Line Section Leader in Marching Band, Instagram Coordinator for Leo Club, joined XSTEM, and started managing marketing for Nilam's Kitchen.
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2024</div>
              <div className="timeline-title">Entrepreneurial Success</div>
              <div className="timeline-description">
                Won 1st place at LaunchSB with BusLinks innovation, became Leo Club Vice President, French National Exam Honorable Mention, and Viking Volunteers Subcommittee Leader.
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2025</div>
              <div className="timeline-title">Research & Recognition</div>
              <div className="timeline-description">
                Advanced to Diamond Challenge quarter-finals, conducted research at TCNJ's Laboratory for Embedded Control, became Drumline Section Leader, and achieved AP Scholar with Distinction.
              </div>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <div className="timeline-date">2026 & Beyond</div>
              <div className="timeline-title">Engineering the Future</div>
              <div className="timeline-description">
                Applying to top engineering programs including MIT, Stanford, Carnegie Mellon, and UC Berkeley to pursue Electrical and Computer Engineering.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="reveal">
        <h2 className="section-title">Let's Connect</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>therohan23@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>(732) 997-0230</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>Monmouth Junction, NJ</p>
              </div>
            </div>
          </div>
          <form className="contact-form" id="contactForm">
            <div className="form-group">
              <input type="text" id="name" placeholder=" " required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className="form-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className="form-group">
              <textarea id="message" placeholder=" " required></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="social-links">
          <a href="#" className="social-link">📧</a>
          <a href="#" className="social-link">💼</a>
          <a href="#" className="social-link">🔗</a>
          <a href="#" className="social-link">📱</a>
        </div>
        <p className="footer-text">© 2024 Rohan Patel. Engineered with passion and precision.</p>
      </footer>
    </>
  );
};

export default Portfolio;