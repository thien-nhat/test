// Performance optimization: Remove preload class after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('preload');
});

// Optimized particle system
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 50;
        this.isActive = true;
    }

    createSparkle() {
        if (!this.isActive || this.particles.length >= this.maxParticles) return;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 2) + 'px';
        sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(sparkle);

        this.particles.push(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.remove();
                this.particles = this.particles.filter(p => p !== sparkle);
            }
        }, 5000);
    }

    createFlower() {
        if (!this.isActive || this.particles.length >= this.maxParticles) return;

        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 4 + 3) + 's';
        flower.style.fontSize = (Math.random() * 15 + 20) + 'px';
        flower.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(flower);

        this.particles.push(flower);

        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
                this.particles = this.particles.filter(p => p !== flower);
            }
        }, 7000);
    }

    pause() {
        this.isActive = false;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    }

    resume() {
        this.isActive = true;
        this.particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
}

// Initialize particle system
const particleSystem = new ParticleSystem();

// Optimized intervals
const sparkleInterval = setInterval(() => particleSystem.createSparkle(), 500);
const flowerInterval = setInterval(() => particleSystem.createFlower(), 800);

// Calculator functionality
const display = document.getElementById('display');
const calculatorScreen = document.getElementById('calculatorScreen');
const birthdayScreen = document.getElementById('birthdayScreen');

// Sửa hàm appendToDisplay để tránh xung đột
function appendToDisplay(value) {
    if (display.value.length < 8) {
        display.value += value;
        createKeyEffect(value); // Truyền value để tạo hiệu ứng
    }
}

function clearDisplay() {
    display.value = '';
    createKeyEffect();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    createKeyEffect();
}
function createKeyEffect(val) {
    const btns = document.querySelectorAll('.btn-number');
    btns.forEach(btn => {
        if (btn.textContent.trim() === val) {
            btn.style.animation = 'keyEffect 0.3s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 300);
        }
    });
}

const birthdayLines = [
    "Chúc bạn có một ngày sinh nhật thật vui vẻ và ý nghĩa!",
    "Tuổi mới tràn đầy sức khỏe, hạnh phúc và thành công!",
    "Mong rằng mọi ước mơ của bạn sẽ trở thành hiện thực trong năm nay!",
    "🌸 Happy Birthday! 🌸"
];

function typeBirthdayLines(lines, element, done) {
    element.innerHTML = '';
    let idx = 0;
    function nextLine() {
        if (idx < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'message-text';
            element.appendChild(lineDiv);
            let i = 0;
            function typing() {
                if (i <= lines[idx].length) {
                    lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                    i++;
                    setTimeout(typing, 40);
                } else {
                    lineDiv.innerHTML = lines[idx]; // remove cursor
                    idx++;
                    setTimeout(nextLine, 500);
                }
            }
            typing();
        } else {
            // Hiện nút mở quà sau khi chạy xong
            const btn = document.getElementById('openGiftBtn');
            if (btn) btn.style.display = 'inline-block';
            if (done) done();
        }
    }
    nextLine();
}
function checkPassword() {
    const password = display.value.trim();

    if (password === '17102005') {
        // Mở thiệp sinh nhật
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'block';

        // Ẩn các phần không cần thiết, chỉ hiện thư đóng
        document.querySelector('.birthday-title').style.display = 'none';
        document.querySelector('.date-special').style.display = 'none';
        document.getElementById('letterClosed').style.display = 'flex';
        document.getElementById('letterOpened').style.display = 'none';
        document.querySelector('.back-btn').style.display = 'none';

        setTimeout(() => {
            createEnhancedFireworks();
            playSuccessAnimation();
        }, 500);

    } else if (password === '061025') {
        // Mở trang trung thu
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'none';
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = 'trungthu.html';
        }, 800);

    } else {
        // Sai mật khẩu
        display.style.animation = 'shake 0.6s ease-in-out';
        display.style.borderColor = '#ff4444';

        setTimeout(() => {
            alert('🌸 Mật khẩu không đúng! Hãy thử lại nhé! 🌸');
            clearDisplay();
            display.style.animation = '';
            display.style.borderColor = '';
        }, 600);
    }
}


// Khởi tạo trang lời chúc với hiệu ứng
function initWishesPage() {
    // Cố định body để không scroll được
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    document.documentElement.style.overflow = 'hidden';

    // Thêm sự kiện click cho thiệp 3D trên mobile
    const card3D = document.querySelector('.card-3d');
    if (card3D) {
        card3D.addEventListener('click', function () {
            this.classList.toggle('active');
        });

        card3D.addEventListener('touchstart', function (e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    }

    setTimeout(() => {
        launchContinuousConfetti();
    }, 1000);
}

// Chuyển sang gallery trái tim thay vì bức thư
function showLetter() {
    // Tạo hiệu ứng fade out trước khi chuyển trang
    document.getElementById('wishesPage').style.transition = 'opacity 0.8s ease';
    document.getElementById('wishesPage').style.opacity = '0';

    // Chuyển sang trang chucmung.html sau 0.8 giây
    setTimeout(() => {
        window.location.href = 'chucmung.html';
    }, 800);
}

// Success animation
function playSuccessAnimation() {
    const cake = document.querySelector('.cake');
    if (cake) {
        cake.style.animation = 'none';
        cake.offsetHeight; // Trigger reflow
        cake.style.animation = 'cakeParty 1s ease-in-out 3';
    }
}

// Confetti function
function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = `hsl(${Math.random() * 360},90%,60%)`;
            confetti.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
            confetti.style.width = confetti.style.height = (Math.random() * 8 + 6) + 'px';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2500);
        }, i * 18);
    }
}

// Enhanced keyboard support
document.addEventListener('keydown', function (event) {
    if (calculatorScreen.style.display === 'none') return;

    const key = event.key;

    // Ngăn chặn default behavior cho tất cả phím số
    if (key >= '0' && key <= '9') {
        event.preventDefault(); // QUAN TRỌNG: Ngăn nhập tự động
        appendToDisplay(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        checkPassword();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        particleSystem.pause();
        clearInterval(sparkleInterval);
        clearInterval(flowerInterval);
    } else {
        particleSystem.resume();
    }
});

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        } else {
            entry.target.style.animationPlayState = 'paused';
        }
    });
}, observerOptions);

// Observe animated elements
setTimeout(() => {
    document.querySelectorAll('.sparkle, .flower').forEach(el => {
        observer.observe(el);
    });
}, 1000);

// Auto-focus display
display.focus();

// Hiệu ứng bóng bóng bay
function createBubble() {
    const bubbles = document.getElementById('bubbles');
    if (!bubbles) return;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    // Kích thước ngẫu nhiên
    const size = Math.random() * 40 + 30;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    // Vị trí ngang ngẫu nhiên
    bubble.style.left = Math.random() * 100 + 'vw';
    // Thời gian bay ngẫu nhiên
    bubble.style.animationDuration = (6 + Math.random() * 4) + 's';
    bubbles.appendChild(bubble);
    setTimeout(() => {
        bubble.remove();
    }, 9000);
}
setInterval(createBubble, 700);
for (let i = 0; i < 10; i++) createBubble();

// Hiệu ứng trái tim nhỏ bay
function createBgHeart() {
    const bgHearts = document.getElementById('bgHearts');
    if (!bgHearts) return;
    const heart = document.createElement('div');
    heart.className = 'bg-heart';
    // Chọn ngẫu nhiên 1 trong 3 trái tim
    const heartTypes = ['💖', '💗', '💞'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    // Kích thước ngẫu nhiên
    const size = Math.random() * 18 + 22;
    heart.style.fontSize = size + 'px';
    // Vị trí ngang ngẫu nhiên
    heart.style.left = Math.random() * 100 + 'vw';
    // Thời gian bay ngẫu nhiên
    heart.style.animationDuration = (5 + Math.random() * 4) + 's';
    bgHearts.appendChild(heart);
    setTimeout(() => {
        heart.remove();
    }, 9000);
}
setInterval(createBgHeart, 1200);
for (let i = 0; i < 6; i++) createBgHeart();

function typeBirthdayLines(lines, element, done) {
    element.innerHTML = '';
    let idx = 0;
    function nextLine() {
        if (idx < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'message-text';
            element.appendChild(lineDiv);
            let i = 0;
            function typing() {
                if (i <= lines[idx].length) {
                    lineDiv.innerHTML = lines[idx].slice(0, i) + '<span style="border-right:2px solid #ff69b4"></span>';
                    i++;
                    setTimeout(typing, 40);
                } else {
                    lineDiv.innerHTML = lines[idx]; // remove cursor
                    idx++;
                    setTimeout(nextLine, 500);
                }
            }
            typing();
        } else {
            // Hiện nút mở quà sau khi chạy xong
            const btn = document.getElementById('openGiftBtn');
            if (btn) btn.style.display = 'inline-block';
            if (done) done();
        }
    }
    nextLine();
}

// ...existing code...

function openLetter() {
    document.getElementById('letterClosed').style.display = 'none';
    const opened = document.getElementById('letterOpened');
    opened.style.display = 'flex';
    // Hiệu ứng chữ chạy từng dòng
    const messageEl = opened.querySelector('.birthday-message');
    typeBirthdayLines(birthdayLines, messageEl, function () { });
}

// Sửa lại checkPassword để chỉ hiện bức thư, chưa hiện nội dung
function checkPassword() {
    const password = display.value.trim();

    if (password === '17102005') {
        // 🎂 Mở thiệp sinh nhật
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'block';

        // Ẩn các phần không cần thiết, chỉ hiện thư đóng
        document.querySelector('.birthday-title').style.display = 'none';
        document.querySelector('.date-special').style.display = 'none';
        document.getElementById('letterClosed').style.display = 'flex';
        document.getElementById('letterOpened').style.display = 'none';
        document.querySelector('.back-btn').style.display = 'none';

        // --- Bật nhạc sinh nhật ---
        const music = document.getElementById('bgMusic');
        if (music) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Nếu trình duyệt chặn autoplay, phát khi click
                    document.body.addEventListener('click', () => music.play(), { once: true });
                });
            }
        }
        // ---------------------------
        setTimeout(() => {
            createEnhancedFireworks();
            playSuccessAnimation();
        }, 500);

    } else if (password === '061025') {
        // 🌕 Mở trang trung thu
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'none';
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = 'trungthu.html';
        }, 800);

    } else if (password === '999') {
        // 🌸 Mở trang "vẽ hoa"
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'none';
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = 'vehoa.html';
        }, 800);

    } else if (password === '143') {
        // 💖 Mở trang "like me"
        calculatorScreen.style.display = 'none';
        birthdayScreen.style.display = 'none';
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = 'likeme.html';
        }, 800);

    } else {
        // ❌ Sai mật khẩu
        display.style.animation = 'shake 0.6s ease-in-out';
        display.style.borderColor = '#ff4444';

        setTimeout(() => {
            alert('🌸 Mật khẩu không đúng! Hãy thử lại nhé! 🌸');
            clearDisplay();
            display.style.animation = '';
            display.style.borderColor = '';
        }, 600);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const card3D = document.querySelector('.card-3d');
    if (card3D) {
        // Xóa sự kiện touchstart cũ nếu có
        card3D.addEventListener('click', function () {
            this.classList.toggle('active');
        });
        card3D.addEventListener('touchend', function (e) {
            // Đảm bảo chỉ toggle khi là một tap (không phải kéo)
            if (e.cancelable) e.preventDefault();
            this.classList.toggle('active');
        });
    }
});


