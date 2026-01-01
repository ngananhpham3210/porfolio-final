// --- DATA & CONTENT ---
const pageData = { 
    course: { title: "Introduction", sub: "CS300: Advanced Web Development" }, 
    p1: { title: "Project 01", sub: "Personal File Management" }, 
    p2: { title: "Project 02", sub: "Academic Research Skills" }, 
    p3: { title: "Project 03", sub: "Prompt Engineering Research" }, 
    p4: { title: "Project 04", sub: "Digital Collaboration & PM" }, 
    p5: { title: "Project 05", sub: "AI Digital Content Creation" }, 
    p6: { title: "Project 06", sub: "AI Ethics & Responsibility" },
    about: { title: "Student Profile", sub: "About Me" } 
};

// Updated Theme Data with Image URLs
const themeData = { 
    swing: { 
        imgUrl: "https://github.com/ngananhpham3210/image/blob/main/seasons/spring.png?raw=true", 
        mainProps: ["🌸", "🎀", "🍡"], 
        scattered: ["🌸", "🌷", "🍓", "🍡", "🎀", "🌱", "🦋", "🐣", "🐝", "🌦️"] 
    }, 
    summer: { 
        imgUrl: "https://github.com/ngananhpham3210/image/blob/main/seasons/summer.png?raw=true", 
        mainProps: ["🌻", "☀️", "🏖️"], 
        scattered: ["🌻", "☀️", "🏖️", "🦀", "🍍", "🕶️", "🌊", "🍦", "⛵", "🌴"] 
    }, 
    autumn: { 
        imgUrl: "https://github.com/ngananhpham3210/image/blob/main/seasons/autumn.png?raw=true", 
        mainProps: ["🍂", "🍁", "🍄"], 
        scattered: ["🍂", "🍁", "🍄", "🐿️", "🎃", "🪵", "🌬️", "🌰", "🌽", "🍎"] 
    }, 
    winter: { 
        imgUrl: "https://github.com/ngananhpham3210/image/blob/main/seasons/winter.png?raw=true", 
        mainProps: ["☃️", "❄️", "☕"], 
        scattered: ["☃️", "❄️", "☕", "🧣", "⛸️", "🏔️", "🕯️", "🌨️", "🐧", "🧊"] 
    } 
};

let currentTheme = 'swing';
let isMusicPlaying = false;
let driftersEnabled = true;
let drifterIntervalId = null;
let baseFallDuration = 35;
const SPAWN_RATE = 1500;

// --- BACKGROUND ICONS ---
function initScatteredIcons() {
    const container = document.getElementById('bg-container');
    for(let i=0; i<30; i++) {
        const el = document.createElement('div');
        el.classList.add('scatter-icon');
        el.style.top = Math.random() * 100 + 'vh';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
        el.style.fontSize = `${15 + Math.random() * 25}px`;
        el.style.animationDelay = `-${Math.random() * 5}s`;
        container.appendChild(el);
    }
    updateBackground();
}

function createDrifter() {
    if (!driftersEnabled) return;
    const container = document.getElementById('bg-container');
    const theme = themeData[currentTheme];
    const el = document.createElement('div');
    el.classList.add('drifter-icon');
    el.innerText = theme.scattered[Math.floor(Math.random() * theme.scattered.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (20 + Math.random() * 30) + 'px';
    const duration = baseFallDuration + Math.random() * 15;
    el.style.animationDuration = duration + 's';
    el.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(el);
    setTimeout(() => { el.remove(); }, duration * 1000);
}

function updateBackground() {
    const theme = themeData[currentTheme];
    const el1 = document.getElementById('prop-1');
    const el2 = document.getElementById('prop-2');
    const el3 = document.getElementById('prop-3');
    [el1, el2, el3].forEach(el => { el.style.opacity = '0'; el.style.transform += ' scale(0.9)'; });
    setTimeout(() => {
        el1.innerText = theme.mainProps[0];
        el2.innerText = theme.mainProps[1];
        el3.innerText = theme.mainProps[2];
        [el1, el2, el3].forEach(el => { el.style.opacity = ''; el.style.transform = el.style.transform.replace(' scale(0.9)', ''); });
    }, 300);
    document.querySelectorAll('.scatter-icon').forEach(el => {
        el.innerText = theme.scattered[Math.floor(Math.random() * theme.scattered.length)];
    });
}

// --- AUDIO ENGINE ---
function toggleAudio(forceState = null) {
    const shouldBePlaying = forceState !== null ? forceState : !isMusicPlaying;
    if (isMusicPlaying === shouldBePlaying) return;
    isMusicPlaying = shouldBePlaying;
    const musicToggle = document.getElementById('musicToggle');
    musicToggle.checked = isMusicPlaying;

    if (isMusicPlaying) {
        playCurrentThemeMusic();
    } else {
        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
    }
}

function playCurrentThemeMusic() {
    if(!isMusicPlaying) return;
    document.querySelectorAll('audio').forEach(a => { if(a.id !== `bgm-${currentTheme}`) { a.pause(); a.currentTime = 0; }});
    const audio = document.getElementById(`bgm-${currentTheme}`);
    if(audio) { audio.volume = 0.3; audio.play().catch(e => console.log("Audio play failed.")); }
}

// --- THEME SWITCHING ---
function changeTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    
    // UPDATED: Change Image Source instead of Text
    const iconImg = document.getElementById('themeIconDisplay');
    iconImg.src = themeData[themeName].imgUrl;
    
    document.querySelector(`input[name="theme-choice"][value="${themeName}"]`).checked = true;
    currentTheme = themeName;
    updateBackground();
    if(isMusicPlaying) playCurrentThemeMusic();
}

// --- NAVIGATION & CLOCK ---
function updateClock() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('dateDisplay').textContent = `${pad(now.getDate())}-${pad(now.getMonth()+1)}-${now.getFullYear()}`;
    document.getElementById('clockDisplay').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}
setInterval(updateClock, 1000);

function toggleAccordion(contentId, btnElement) {
    const content = document.getElementById(contentId);
    btnElement.classList.toggle('expanded');
    content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
}

function showView(view, linkElement) {
    document.querySelectorAll('.sub-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(view + 'View').classList.add('active');
    linkElement.classList.add('active');
    document.getElementById('pageTitle').innerText = pageData[view].title;
    document.getElementById('pageSub').innerText = pageData[view].sub;
    updateBreadcrumbs('Overview', linkElement.innerText);
}

function showProject(id, linkElement) {
    document.querySelectorAll('.sub-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById('project' + id).classList.add('active');
    linkElement.classList.add('active');
    document.getElementById('pageTitle').innerText = pageData['p' + id].title;
    document.getElementById('pageSub').innerText = pageData['p' + id].sub;
    updateBreadcrumbs('Projects', linkElement.innerText);
}

function updateBreadcrumbs(category, pageName) {
    document.getElementById('breadcrumbContainer').innerHTML = `<span class="crumb-item">Home</span><span class="crumb-separator">/</span><span class="crumb-item">${category}</span><span class="crumb-separator">/</span><span class="crumb-active">${pageName}</span>`;
}

// --- SETTINGS LOGIC ---
function setupSettings() {
    document.querySelectorAll('input[name="theme-choice"]').forEach(radio => {
        radio.addEventListener('change', (e) => changeTheme(e.target.value));
    });
    document.getElementById('musicToggle').addEventListener('change', (e) => toggleAudio(e.target.checked));
    document.getElementById('fallingToggle').addEventListener('change', (e) => {
        driftersEnabled = e.target.checked;
        if(driftersEnabled && !drifterIntervalId) {
            drifterIntervalId = setInterval(createDrifter, SPAWN_RATE);
        } else if (!driftersEnabled) {
            clearInterval(drifterIntervalId);
            drifterIntervalId = null;
            document.querySelectorAll('.drifter-icon').forEach(icon => icon.remove());
        }
    });
    document.getElementById('staticToggle').addEventListener('change', (e) => {
        const display = e.target.checked ? 'block' : 'none';
        document.querySelectorAll('.scatter-icon, .giant-prop').forEach(icon => icon.style.display = display);
    });
    document.getElementById('speedSlider').addEventListener('input', (e) => {
        baseFallDuration = (50 - parseInt(e.target.value)) + 10;
    });
    document.getElementById('resetBtn').addEventListener('click', resetSettings);
}

function resetSettings() {
    changeTheme('swing');
    toggleAudio(false);
    driftersEnabled = true;
    if (!drifterIntervalId) {
        drifterIntervalId = setInterval(createDrifter, SPAWN_RATE);
    }
    document.getElementById('fallingToggle').checked = true;
    document.querySelectorAll('.scatter-icon, .giant-prop').forEach(icon => icon.style.display = 'block');
    document.getElementById('staticToggle').checked = true;
    document.getElementById('speedSlider').value = 25;
    baseFallDuration = 35;
}

// --- INITIALIZATION ---
window.onload = function() {
    updateClock();
    
    // Auto-expand Navigation and Settings on load
    toggleAccordion('overview-list', document.getElementById('btn-overview'));
    toggleAccordion('settings-content-wrapper', document.getElementById('btn-settings'));
    
    initScatteredIcons(); 
    setupSettings();
    
    if (driftersEnabled) {
        drifterIntervalId = setInterval(createDrifter, SPAWN_RATE);
    }
}
