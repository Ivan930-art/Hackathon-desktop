// State Management
let tutors = JSON.parse(localStorage.getItem('tutors')) || [
    { id: 1, name: 'Alice Johnson', year: 11, subjects: ['Algebra', 'Biology'], bio: 'STEM enthusiast with a focus on Algebra and Chemistry.', rating: 4.8, availability: 'Mon-Fri after 4 PM', days: [1,2,3,4,5], start: 16, end: 20 },
    { id: 2, name: 'Robert Smith', year: 12, subjects: ['Literature', 'History'], bio: 'Passionate about literature and modern history.', rating: 4.9, availability: 'Weekends', days: [0,6], start: 9, end: 17 },
    { id: 3, name: 'Charlie Davis', year: 10, subjects: ['Algebra', 'Computer Science'], bio: 'Making math fun and easy to understand.', rating: 4.5, availability: 'Evenings', days: [1,2,3,4,5], start: 17, end: 21 },
    { id: 4, name: 'Elena Rodriguez', year: 12, subjects: ['Physics', 'Calculus'], bio: 'Aspiring engineer. I can help you master complex equations.', rating: 5.0, availability: 'Tue/Thu after 3 PM', days: [2,4], start: 15, end: 19 },
    { id: 5, name: 'Sam Wilson', year: 11, subjects: ['Computer Science', 'Mythology'], bio: 'Coding is my life. Let\'s build something together.', rating: 4.7, availability: 'Weekdays 5-7 PM', days: [1,2,3,4,5], start: 17, end: 19 },
    { id: 6, name: 'Grace Lee', year: 10, subjects: ['Chemistry', 'Algebra'], bio: 'Top of my class in Chemistry. Patient and clear communicator.', rating: 4.6, availability: 'Mon/Wed/Fri', days: [1,3,5], start: 15, end: 18 },
    { id: 7, name: 'David Miller', year: 12, subjects: ['History', 'Literature'], bio: 'Avid reader and history buff. Let\'s ace those essays.', rating: 4.8, availability: 'Saturday Mornings', days: [6], start: 9, end: 12 },
    { id: 8, name: 'Sophia Chen', year: 11, subjects: ['Calculus', 'Physics'], bio: 'Math and physics are just puzzles waiting to be solved.', rating: 4.9, availability: 'Mon/Wed/Fri after 4 PM', days: [1,3,5], start: 16, end: 20 },
    { id: 9, name: 'Liam O\'Connor', year: 12, subjects: ['History', 'Geography'], bio: 'Exploring the world through time and space. Join me!', rating: 4.4, availability: 'Weekends', days: [0,6], start: 10, end: 16 },
    { id: 10, name: 'Emma Brown', year: 10, subjects: ['Biology', 'Chemistry'], bio: 'Fascinated by the science of life. Let\'s explore together.', rating: 4.5, availability: 'Evenings', days: [1,2,3,4,5], start: 18, end: 21 },
    { id: 11, name: 'Noah Garcia', year: 11, subjects: ['Algebra', 'Calculus'], bio: 'Numbers tell a story. Let me help you understand it.', rating: 4.7, availability: 'Tue/Thu', days: [2,4], start: 15, end: 18 },
    { id: 12, name: 'Olivia White', year: 12, subjects: ['Literature', 'English'], bio: 'The written word is a powerful tool. Let\'s sharpen yours.', rating: 4.8, availability: 'Mon-Fri 3-5 PM', days: [1,2,3,4,5], start: 15, end: 17 },
    { id: 13, name: 'James Taylor', year: 11, subjects: ['Computer Science', 'Physics'], bio: 'Logic and laws of nature. The perfect combination.', rating: 4.6, availability: 'Weekdays', days: [1,2,3,4,5], start: 16, end: 19 },
    { id: 14, name: 'Isabella Martinez', year: 10, subjects: ['Algebra', 'Biology'], bio: 'Helping you bridge the gap between math and science.', rating: 4.3, availability: 'Tue/Thu after school', days: [2,4], start: 15, end: 18 },
    { id: 15, name: 'William Jones', year: 12, subjects: ['History', 'Literature'], bio: 'Connecting the dots of human history through stories.', rating: 4.9, availability: 'Mon/Wed after 5 PM', days: [1,3], start: 17, end: 20 },
    { id: 16, name: 'Ava Davis', year: 11, subjects: ['Chemistry', 'Physics'], bio: 'Unlocking the secrets of the physical world.', rating: 4.5, availability: 'Fri/Sat', days: [5,6], start: 14, end: 18 },
    { id: 17, name: 'Benjamin Wilson', year: 10, subjects: ['Computer Science', 'Algebra'], bio: 'Coding and math: the languages of the future.', rating: 4.7, availability: 'Evenings', days: [1,2,3,4,5], start: 17, end: 20 },
    { id: 18, name: 'Mia Moore', year: 12, subjects: ['Geography', 'Mythology'], bio: 'Discovering the myths and landscapes of our planet.', rating: 4.6, availability: 'Sun/Mon', days: [0,1], start: 10, end: 14 },
    { id: 19, name: 'Ethan Thomas', year: 11, subjects: ['Calculus', 'History'], bio: 'A balanced mind is a successful one. Let\'s study both.', rating: 4.8, availability: 'Weekdays', days: [1,2,3,4,5], start: 15, end: 19 },
    { id: 20, name: 'Charlotte Clark', year: 10, subjects: ['Biology', 'Literature'], bio: 'Nature and narratives. Let\'s learn and read.', rating: 4.4, availability: 'Mon/Fri', days: [1,5], start: 16, end: 19 }
];

let sessions = [];
let events = []; // Reset and initialize as empty
let currentUser = "";
let successScore = 0;
let quizzesCompleted = 0;

// Section Navigation
function showSection(sectionId, element) {
    // Update UI
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Update Nav Links
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    if (element) element.classList.add('active');

    // Load Section Specific Data
    if (sectionId === 'signup') {
        document.getElementById('tutorName').value = currentUser || 'Student';
    }
    if (sectionId === 'tutors') loadTutors();
    if (sectionId === 'calendar') loadCalendar();
    if (sectionId === 'home') updateDashboard();
}

// Dashboard Logic
function updateDashboard() {
    document.getElementById('dateDisplay').textContent = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    document.getElementById('successScore').textContent = successScore;
    document.getElementById('statQuizzes').textContent = quizzesCompleted;
    document.getElementById('statSessions').textContent = sessions.length;
    
    // Update goal bar based on points (simple logic: 1000 pts = 100%)
    const progress = Math.min(100, (successScore / 1000) * 100);
    document.getElementById('goalBar').style.width = `${progress}%`;
    document.getElementById('goalPercent').textContent = `${Math.round(progress)}%`;
    
    loadHomeEvents();
}

function updateScore(points) {
    successScore += points;
    if (currentUser) {
        localStorage.setItem(`successScore_${currentUser}`, successScore);
    }
    document.getElementById('successScore').textContent = successScore;
}

// Motivational Quote Logic
const studentQuotes = [
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { content: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { content: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { content: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
    { content: "Your talent determines what you can do. Your motivation determines how much you are willing to do.", author: "Lou Holtz" },
    { content: "Don't let what you cannot do interfere with what you can do.", author: "John Wooden" },
    { content: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { content: "Strive for progress, not perfection.", author: "Unknown" },
    { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
    { content: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
    { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { content: "Opportunity is missed by most people because it is dressed in overalls and looks like work.", author: "Thomas Edison" }
];

async function fetchQuote() {
    try {
        // Attempt to fetch from API, but default to our curated list for variety
        if (Math.random() > 0.7) {
            const response = await fetch('https://api.quotable.io/random?tags=inspirational,education');
            if (response.ok) {
                const data = await response.json();
                document.getElementById('quoteText').textContent = `"${data.content}"`;
                document.getElementById('quoteAuthor').textContent = `— ${data.author}`;
                return;
            }
        }
        throw new Error('Using curated list');
    } catch (error) {
        const random = studentQuotes[Math.floor(Math.random() * studentQuotes.length)];
        document.getElementById('quoteText').textContent = `"${random.content}"`;
        document.getElementById('quoteAuthor').textContent = `— ${random.author}`;
    }
}

// Tutors Logic
function loadTutors() {
    const list = document.getElementById('tutorsList');
    list.innerHTML = '';
    tutors.forEach(tutor => {
        const card = document.createElement('div');
        card.className = 'card tutor-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <h3 style="margin-bottom: 0.25rem;">${tutor.name}</h3>
                <span class="tutor-badge">Year ${tutor.year}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                ${tutor.subjects.map(s => `<span style="font-size: 0.7rem; background: var(--accent-subtle); padding: 2px 6px; border-radius: 4px; color: var(--text-main); font-weight: 600;">${s}</span>`).join('')}
            </div>
            <p style="font-size: 0.9rem; color: var(--text-muted); flex-grow: 1;">${tutor.bio}</p>
            <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; color: var(--accent);"><i class="fas fa-star"></i> ${tutor.rating}</span>
                <button class="btn btn-primary" onclick="openBooking(${tutor.id})">Book Session</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function filterTutors() {
    const subject = document.getElementById('subjectFilter').value;
    const year = document.getElementById('yearFilter').value;
    const filtered = tutors.filter(t => 
        (!subject || t.subjects.includes(subject)) &&
        (!year || t.year == year)
    );
    const list = document.getElementById('tutorsList');
    list.innerHTML = '';
    filtered.forEach(tutor => {
        const card = document.createElement('div');
        card.className = 'card tutor-card';
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <h3 style="margin-bottom: 0.25rem;">${tutor.name}</h3>
                <span class="tutor-badge">Year ${tutor.year}</span>
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                ${tutor.subjects.map(s => `<span style="font-size: 0.7rem; background: var(--accent-subtle); padding: 2px 6px; border-radius: 4px; color: var(--text-main); font-weight: 600;">${s}</span>`).join('')}
            </div>
            <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; color: var(--accent);"><i class="fas fa-star"></i> ${tutor.rating}</span>
                <button class="btn btn-primary" onclick="openBooking(${tutor.id})">Book Session</button>
            </div>
        `;
        list.appendChild(card);
    });
}

function openBooking(tutorId) {
    const tutor = tutors.find(t => t.id === tutorId);
    if (!tutor) return;

    // Set student name automatically
    document.getElementById('bookingStudentName').value = currentUser || 'Student';

    // Set min date to today
    const todayInput = document.getElementById('bookingDate');
    const today = new Date().toISOString().split('T')[0];
    todayInput.setAttribute('min', today);
    todayInput.value = today;

    document.getElementById('bookingTutorId').value = tutorId;
    document.getElementById('bookingTutorInfo').innerHTML = `
        <h3 style="color: var(--primary);">${tutor.name}</h3>
        <p style="font-weight: 600;">Year ${tutor.year} Student</p>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin: 1rem 0;">${tutor.bio}</p>
        <div style="background: var(--accent-subtle); padding: 1rem; border-radius: 8px;">
            <p style="font-size: 0.85rem; color: var(--primary); font-weight: 700;">Availability:</p>
            <p style="font-size: 0.9rem; color: var(--text-main);">${tutor.availability}</p>
        </div>
    `;

    // Generate dynamic time slots based on tutor's rules
    updateBookingSlots(tutor, today);

    // Update slots when date changes
    todayInput.onchange = (e) => updateBookingSlots(tutor, e.target.value);

    showSection('booking');
}

function updateBookingSlots(tutor, selectedDate) {
    // Parse YYYY-MM-DD manually to avoid UTC shift
    const [year, month, day] = selectedDate.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayOfWeek = dateObj.getDay();
    const timeSelect = document.getElementById('bookingTime');
    
    timeSelect.innerHTML = '<option value="">Select a time...</option>';
    
    // Check if tutor works on this day
    if (!tutor.days.includes(dayOfWeek)) {
        timeSelect.innerHTML = '<option value="">Tutor is not available on this day</option>';
        return;
    }

    // Generate hourly slots
    for (let h = tutor.start; h < tutor.end; h++) {
        const timeStr = `${h.toString().padStart(2, '0')}:00`;
        const option = document.createElement('option');
        option.value = timeStr;
        option.textContent = `${h > 12 ? h-12 : h}:00 ${h >= 12 ? 'PM' : 'AM'}`;
        timeSelect.appendChild(option);
    }
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const time = document.getElementById('bookingTime').value;
    if (!time) {
        alert('Please select an available time slot.');
        return;
    }

    const tutorId = parseInt(document.getElementById('bookingTutorId').value);
    const tutor = tutors.find(t => t.id === tutorId);
    const studentName = document.getElementById('bookingStudentName').value;
    const date = document.getElementById('bookingDate').value;
    const notes = document.getElementById('bookingNotes').value;

    const session = { tutorId, tutorName: tutor.name, studentName, date, time, notes, status: 'confirmed' };
    sessions.push(session);
    if (currentUser) {
        localStorage.setItem(`sessions_${currentUser}`, JSON.stringify(sessions));
    }

    // Add to Calendar
    events.push({ 
        date, 
        title: `Tutoring with ${tutor.name}`, 
        notes: `Time: ${time}\nTopic: ${notes}` 
    });
    if (currentUser) {
        localStorage.setItem(`events_${currentUser}`, JSON.stringify(events));
    }

    updateScore(30);
    updateDashboard();
    alert(`Session booked with ${tutor.name}! It has been added to your calendar. +30 points earned.`);
    this.reset();
    showSection('calendar');
});

// Signup Logic
document.getElementById('tutorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const days = Array.from(document.querySelectorAll('input[name="tutorDays"]:checked')).map(cb => parseInt(cb.value));
    const start = parseInt(document.getElementById('tutorStart').value);
    const end = parseInt(document.getElementById('tutorEnd').value);
    
    if (days.length === 0) {
        alert('Please select at least one available day.');
        return;
    }

    const newTutor = {
        id: Date.now(),
        name: document.getElementById('tutorName').value,
        year: parseInt(document.getElementById('tutorYear').value),
        subjects: document.getElementById('tutorSubjects').value.split(',').map(s => s.trim()),
        bio: document.getElementById('tutorBio').value,
        rating: 5.0,
        availability: 'Selected Hours',
        days: days,
        start: start,
        end: end
    };
    tutors.push(newTutor);
    localStorage.setItem('tutors', JSON.stringify(tutors));
    updateScore(100);
    alert('Application submitted! +100 points earned.');
    this.reset();
    showSection('tutors');
});

// Calendar Logic
function loadCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const widget = document.getElementById('calendarWidget');
    widget.className = 'calendar-widget';
    widget.innerHTML = `
        <div class="calendar-header">
            <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>
        <div class="calendar-grid"></div>
    `;
    const daysContainer = widget.children[1];

    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += '<div class="calendar-day"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === now.getDate();
        const hasEvent = events.some(e => {
            const d = new Date(e.date);
            return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
        });

        daysContainer.innerHTML += `
            <div class="calendar-day ${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''}">
                ${day}
            </div>
        `;
    }
    loadEventsList();
}

function loadEventsList() {
    const list = document.getElementById('eventsList');
    list.innerHTML = '<h3>Your Schedule</h3>';
    if (events.length === 0) {
        list.innerHTML += '<p style="color: var(--text-muted); font-size: 0.9rem;">No events scheduled yet.</p>';
    } else {
        events.forEach((ev, i) => {
            list.innerHTML += `
                <div style="background: var(--accent-subtle); padding: 0.75rem; border-radius: 8px; margin-bottom: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <p style="font-weight: 600; font-size: 0.9rem; color: var(--text-main);">${ev.title}</p>
                            <p style="font-size: 0.75rem; color: var(--text-muted);">${ev.date}</p>
                        </div>
                        <button onclick="deleteEvent(${i})" style="border: none; background: none; color: #ef4444; cursor: pointer;"><i class="fas fa-trash"></i></button>
                    </div>
                    ${ev.notes ? `<p style="font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 0.5rem;">${ev.notes}</p>` : ''}
                </div>
            `;
        });
    }
}

function loadHomeEvents() {
    const homeList = document.getElementById('homeEvents');
    const upcoming = events.slice(0, 3);
    if (upcoming.length === 0) {
        homeList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Clean slate! Add some goals in the calendar.</p>';
    } else {
        homeList.innerHTML = upcoming.map(ev => `
            <div style="border-left: 3px solid var(--primary); padding-left: 0.75rem; margin-bottom: 1rem;">
                <p style="font-weight: 600; color: var(--text-main);">${ev.title}</p>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${ev.date}</p>
                ${ev.notes ? `<p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${ev.notes}</p>` : ''}
            </div>
        `).join('');
    }
}

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const date = document.getElementById('eventDate').value;
    const title = document.getElementById('eventTitle').value;
    const notes = document.getElementById('eventNotes').value;
    events.push({ date, title, notes });
    if (currentUser) {
        localStorage.setItem(`events_${currentUser}`, JSON.stringify(events));
    }
    updateScore(10);
    loadCalendar();
    this.reset();
});

function deleteEvent(index) {
    events.splice(index, 1);
    if (currentUser) {
        localStorage.setItem(`events_${currentUser}`, JSON.stringify(events));
    }
    loadCalendar();
}

// Practice Logic (Open Trivia API)
async function loadAIPractice() {
    const category = document.getElementById('practiceCategory').value;
    const difficulty = document.getElementById('practiceDifficulty').value;
    const div = document.getElementById('questions');
    div.innerHTML = '<p style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Generating questions...</p>';
    
    try {
        const difficultyParam = difficulty ? `&difficulty=${difficulty}` : '';
        const response = await fetch(`https://opentdb.com/api.php?amount=3&category=${category}${difficultyParam}&type=multiple`);
        const data = await response.json();
        
        div.innerHTML = '';
        data.results.forEach((q, i) => {
            const allAnswers = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
            const qDiv = document.createElement('div');
            qDiv.className = 'card';
            qDiv.style.marginBottom = '1rem';
            qDiv.innerHTML = `
                <p style="font-weight: 600; margin-bottom: 1rem;">${q.question}</p>
                <div style="display: grid; gap: 0.5rem;">
                    ${allAnswers.map(ans => `
                        <button class="btn" style="background: var(--accent-subtle); text-align: left; border: 1px solid var(--border); color: var(--text-main);" 
                            onclick="checkAIAnswer(this, '${ans}', '${q.correct_answer}', ${i})">
                            ${ans}
                        </button>
                    `).join('')}
                </div>
                <p id="result${i}" style="margin-top: 1rem; font-weight: 700;"></p>
            `;
            div.appendChild(qDiv);
        });
    } catch (error) {
        div.innerHTML = '<p style="color: #ef4444;">Failed to load questions. Please try again later.</p>';
    }
}

function checkAIAnswer(btn, selected, correct, id) {
    const result = document.getElementById(`result${id}`);
    const parent = btn.parentElement;
    const buttons = parent.querySelectorAll('button');
    
    buttons.forEach(b => b.disabled = true);
    
    if (selected === correct) {
        btn.style.background = '#dcfce7';
        btn.style.borderColor = '#22c55e';
        btn.style.color = '#065f46';
        btn.style.fontWeight = '700';
        result.textContent = '✨ Correct! +15 points';
        result.style.color = '#16a34a';
        
        quizzesCompleted++;
        if (currentUser) {
            localStorage.setItem(`quizzesCompleted_${currentUser}`, quizzesCompleted);
        }
        updateScore(15);
        updateDashboard(); 
    } else {
        btn.style.background = '#fee2e2';
        btn.style.borderColor = '#ef4444';
        btn.style.color = '#991b1b';
        btn.style.fontWeight = '700';
        result.textContent = `❌ Correct answer was: ${correct}`;
        result.style.color = '#ef4444';
    }
}

// Pomodoro Timer Logic
let timerInterval;
let timeLeft = 25 * 60;
let isRunning = false;

function toggleTimer() {
    const btn = document.getElementById('startBtn');
    if (isRunning) {
        clearInterval(timerInterval);
        btn.textContent = 'Resume Focus';
        btn.style.background = 'var(--primary)';
    } else {
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert('Time for a break!');
                updateScore(50);
                resetTimer();
            }
        }, 1000);
        btn.textContent = 'Pause';
        btn.style.background = '#ef4444';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 25 * 60;
    isRunning = false;
    updateTimerDisplay();
    document.getElementById('startBtn').textContent = 'Start Focus';
    document.getElementById('startBtn').style.background = 'var(--primary)';
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    document.getElementById('timer').textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Initialization
window.onload = () => {
    // We ALWAYS show the login screen now on refresh
    document.getElementById('loginOverlay').style.display = 'flex';
    document.getElementById('loginOverlay').style.opacity = '1';
    
    updateDashboard();
    fetchQuote();
    loadAIPractice();
};

function logout() {
    // 1. Immediately dim the app
    document.querySelector('main').style.opacity = '0.3';
    document.querySelector('.sidebar').style.opacity = '0.3';
    document.querySelector('main').style.filter = 'blur(5px)';
    document.querySelector('.sidebar').style.filter = 'blur(5px)';

    setTimeout(() => {
        // 2. Reset session data
        currentUser = "";
        successScore = 0;
        quizzesCompleted = 0;
        sessions = [];
        events = [];
        
        // 3. Reset UI elements
        const card = document.querySelector('.login-card');
        card.innerHTML = `
            <i class="fas fa-graduation-cap stagger-in stagger-1" style="font-size: 3.5rem; color: var(--primary); margin-bottom: 1.5rem; display: inline-block;"></i>
            <h1 class="stagger-in stagger-2" style="color: var(--text-main); font-size: 2.5rem; margin-bottom: 0.5rem;">Nexus</h1>
            <p class="stagger-in stagger-2" style="color: var(--text-muted); margin-bottom: 2rem;">Unlock your academic potential</p>
            <form id="loginForm" style="max-width: 100%;">
                <div class="form-group stagger-in stagger-3" style="text-align: left;">
                    <label>What's your name?</label>
                    <input type="text" id="usernameInput" placeholder="Enter name to begin..." required style="font-size: 1.1rem; padding: 1rem;">
                </div>
                <button type="submit" class="btn btn-primary login-btn stagger-in stagger-4" style="width: 100%; margin-top: 1.5rem; padding: 1rem; font-size: 1.1rem;">
                    Launch Dashboard <i class="fas fa-arrow-right" style="margin-left: 0.5rem;"></i>
                </button>
            </form>
            <p class="stagger-in stagger-4" style="margin-top: 2rem; font-size: 0.85rem; color: var(--text-muted);">
                <i class="fas fa-shield-alt"></i> Secure local session enabled
            </p>
        `;
        
        // 4. Re-attach event listener
        document.getElementById('loginForm').addEventListener('submit', loginHandler);

        // 5. Animate Login Overlay back in
        const overlay = document.getElementById('loginOverlay');
        overlay.style.display = 'flex';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translateY(100%)'; // Slide up from bottom
        overlay.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        // Force reflow
        overlay.offsetHeight;

        overlay.style.opacity = '1';
        overlay.style.transform = 'translateY(0)';
        
        // 6. Final UI Cleanup
        document.querySelector('main').style.opacity = '1';
        document.querySelector('.sidebar').style.opacity = '1';
        document.querySelector('main').style.filter = 'none';
        document.querySelector('.sidebar').style.filter = 'none';
        
        updateDashboard();
    }, 300);
}

// Extract login handler for re-attachment
const loginHandler = function(e) {
    e.preventDefault();
    currentUser = document.getElementById('usernameInput').value.trim();
    
    successScore = parseInt(localStorage.getItem(`successScore_${currentUser}`)) || 0;
    quizzesCompleted = parseInt(localStorage.getItem(`quizzesCompleted_${currentUser}`)) || 0;
    sessions = JSON.parse(localStorage.getItem(`sessions_${currentUser}`)) || [];
    events = JSON.parse(localStorage.getItem(`events_${currentUser}`)) || [];
    
    document.getElementById('welcomeText').textContent = `Welcome, ${currentUser}!`;
    updateDashboard();

    const card = document.querySelector('.login-card');
    card.innerHTML = `
        <div class="success-check stagger-in" style="font-size: 5rem; color: var(--secondary); margin-bottom: 1.5rem;">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 style="color: var(--text-main); font-size: 2rem;">Welcome back!</h2>
        <p style="color: var(--text-muted);">Preparing your personalized dashboard...</p>
    `;

    setTimeout(() => {
        document.getElementById('loginOverlay').style.transition = 'all 0.8s cubic-bezier(0.4, 0, -0.2, 1)';
        document.getElementById('loginOverlay').style.opacity = '0';
        document.getElementById('loginOverlay').style.transform = 'translateY(-100%)';
        
        // Prepare main content to slide in
        const main = document.querySelector('main');
        const sidebar = document.querySelector('.sidebar');
        main.style.transform = 'translateY(50px)';
        main.style.opacity = '0';
        sidebar.style.transform = 'translateX(-50px)';
        sidebar.style.opacity = '0';

        setTimeout(() => {
            document.getElementById('loginOverlay').style.display = 'none';
            
            // Animate dashboard in
            main.style.transition = 'all 0.6s ease-out';
            sidebar.style.transition = 'all 0.6s ease-out';
            main.style.transform = 'translateY(0)';
            main.style.opacity = '1';
            sidebar.style.transform = 'translateX(0)';
            sidebar.style.opacity = '1';
        }, 800);
    }, 1500);
};

// Update the original listener attachment
document.getElementById('loginForm').addEventListener('submit', loginHandler);
logout.loginHandler = loginHandler; // Store it for logout to access

// Global exports for inline onclicks
// Theme Management
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeUI(newTheme);
}

function updateThemeUI(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    if (theme === 'dark') {
        btn.innerHTML = '<i class="fas fa-sun"></i> <span>Light Mode</span>';
    } else {
        btn.innerHTML = '<i class="fas fa-moon"></i> <span>Dark Mode</span>';
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);
}

// Global exports
window.toggleTheme = toggleTheme;

// Add to window.onload
const originalOnload = window.onload;
window.onload = () => {
    if (originalOnload) originalOnload();
    initTheme();
};

window.showSection = showSection;
window.filterTutors = filterTutors;
window.openBooking = openBooking;
window.loadAIPractice = loadAIPractice;
window.toggleTimer = toggleTimer;
window.resetTimer = resetTimer;
window.deleteEvent = deleteEvent;
window.logout = logout;
