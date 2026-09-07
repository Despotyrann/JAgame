let alleBuecherdaten = {};
let verfuegbareBuecher = [];
         
// Game architecture state
let richtigesBuch = "";
let absatzListe = [];
let aktuellerIndex = 0;
let angezeigteAbsaetze = [];

let punkte = 0;
let aktuelleRundenNummer = 0;
let maxRunden = 10; // Can be modified dynamically by future bonus events
let hatGeantwortet = false;

// Load JSON data
fetch('buecher_komplett.json')
    .then(response => {
        if (!response.ok) throw new Error("JSON could not be loaded");
        return response.json();
    })
    .then(data => {
        alleBuecherdaten = data;
        verfuegbareBuecher = Object.keys(data).filter(b => data[b].length > 0);
    })
    .catch(err => {
        document.getElementById('zitat-text').innerHTML = "Error loading game data! Check JSON file.";
        console.error(err);
    });

function startRound() {
    punkte = 0;
    aktuelleRundenNummer = 0;
    maxRunden = 10; 
    
    // Blendet die alte Ergebniskarte wieder aus
    document.getElementById('results-container').style.display = "none";
    
    // Wechselt die Bildschirme
    document.getElementById('menu-screen').style.display = "none";
    document.getElementById('quiz-screen').style.display = "block";
    
    neueFrage();
}

function neueFrage() {
    if (verfuegbareBuecher.length === 0) return;
    
    aktuelleRundenNummer++;
    hatGeantwortet = false;
    
    // UI State updates
    document.getElementById('progress-text').innerHTML = `Quotation: ${aktuelleRundenNummer} of ${maxRunden}`;
    document.getElementById('score-text').innerHTML = `Score: ${punkte}`;
    
    // Reset Action Button to Disabled
    const nextBtn = document.getElementById('next-button');
    nextBtn.disabled = true;
    nextBtn.innerHTML = "Proceed ➡️";

    erzeugeRateButtons();
                 
    richtigesBuch = verfuegbareBuecher[Math.floor(Math.random() * verfuegbareBuecher.length)];
    absatzListe = alleBuecherdaten[richtigesBuch];
                 
    if (absatzListe.length <= 5) {
        aktuellerIndex = 0;
    } else {
        aktuellerIndex = Math.floor(Math.random() * (absatzListe.length - 5));
    }
                 
    angezeigteAbsaetze = [absatzListe[aktuellerIndex]];
    renderText();
}

function erzeugeRateButtons() {
    const buttonContainer = document.getElementById('antwort-buttons');
    buttonContainer.innerHTML = "";
                  
    buecherPool.forEach(buch => {
        const btn = document.createElement('button');
        btn.className = "guess-btn";
        btn.innerHTML = buch;
        btn.setAttribute('data-book', buch);
        btn.onclick = () => pruefeAntwort(btn, buch);
        buttonContainer.appendChild(btn);
    });
}

function renderText() {
    document.getElementById('zitat-text').innerHTML = angezeigteAbsaetze.join("\n\n");
}

function mehrAbsaetzeAnzeigen() {
    // Left completely unlocked even if user answered!
    if (aktuellerIndex + angezeigteAbsaetze.length < absatzListe.length) {
        const naechsterAbsatz = absatzListe[aktuellerIndex + angezeigteAbsaetze.length];
        angezeigteAbsaetze.push(naechsterAbsatz);
        renderText();
    } else {
        alert("No more paragraphs available for this book!");
    }
}

function pruefeAntwort(targetButton, auswahl) {
    if (hatGeantwortet) return; 
    hatGeantwortet = true;
    
    const buttons = document.querySelectorAll('#antwort-buttons .guess-btn');
    let richtigerButton = null;

    buttons.forEach(btn => {
        btn.disabled = true; // Lock choice field
        if (btn.getAttribute('data-book') === richtigesBuch) {
            richtigerButton = btn;
        }
    });

    if (auswahl === richtigesBuch) {
        targetButton.classList.add('correct');
        punkte++;
        createParticles(targetButton); 
    } else {
        targetButton.classList.add('wrong');
        if (richtigerButton) {
            richtigerButton.classList.add('reveal-correct');
        }
    }

    document.getElementById('score-text').innerHTML = `Score: ${punkte}`;
    
    // Change Button appearance dynamically at round end
    const nextBtn = document.getElementById('next-button');
    nextBtn.disabled = false;
    if (aktuelleRundenNummer >= maxRunden) {
        nextBtn.innerHTML = "Conclude ⚖️";
    }
}

function aktionsButtonKlick() {
    if (aktuelleRundenNummer < maxRunden) {
        neueFrage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        zeigeEndauswertung();
    }
}

function zeigeEndauswertung() {
    document.getElementById('quiz-screen').style.display = "none";
    document.getElementById('menu-screen').style.display = "block";
    
    let scoreKey = Math.max(0, Math.min(punkte, 10)); 
    let evaluation = bewertungsPool[scoreKey] || { title: "Evaluated", quotes: ["Processed successfully."] };
    
    let quotesArray = evaluation.quotes;
    let randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];

    document.getElementById('result-rating-title').innerHTML = evaluation.title;
    document.getElementById('final-score-text').innerHTML = `You got ${punkte} out of ${maxRunden} correct!`;
    document.getElementById('result-rating-desc').innerHTML = `"${randomQuote}"`;
    
    // Show separate card
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.style.display = "block";
    
    // Smooth scroll directly to the new results card so the player sees it instantly
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}


function createParticles(targetButton) {
    const colors = ['#ffecb3', '#ffb74d', '#4caf50', '#81c784', '#64b5f6', '#e1bee7'];
    const rect = targetButton.getBoundingClientRect();
    
    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        let startX, startY;
        const rand = Math.random();
        
        if (rand < 0.25) { startX = Math.random() * rect.width; startY = 0; }
        else if (rand < 0.50) { startX = rect.width; startY = Math.random() * rect.height; }
        else if (rand < 0.75) { startX = Math.random() * rect.width; startY = rect.height; }
        else { startX = 0; startY = Math.random() * rect.height; }

        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 60 + 30;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        targetButton.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}
