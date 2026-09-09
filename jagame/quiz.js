let alleBuecherdaten = {};
let verfuegbareBuecher = [];
let buchBeschriftungen = {};
         
// Game architecture state
let richtigesBuch = "";
let absatzListe = [];
let aktuellerIndex = 0;
let angezeigteAbsaetze = [];

let punkte = 0;
let aktuelleRundenNummer = 0;
let maxRunden = 10; // Can be modified dynamically by future bonus events
let hatGeantwortet = false;

wendeZufallsPaletteAn();
vorbereiteParallaxMasken();

document.getElementById('start-button').addEventListener('click', startRound);
document.getElementById('hint-button').addEventListener('click', mehrAbsaetzeAnzeigen);
document.getElementById('next-button').addEventListener('click', aktionsButtonKlick);

function normalisiereBuchEintrag(eintrag) {
    if (typeof eintrag === "string") {
        return { titel: eintrag, emoji: "" };
    }

    if (eintrag && typeof eintrag === "object") {
        return {
            titel: eintrag.titel ?? eintrag.name ?? eintrag.book ?? "",
            emoji: eintrag.emoji ?? ""
        };
    }

    return { titel: "", emoji: "" };
}

function aktualisiereBuchlisten() {
    const aktiveBuecher = buecherPool
        .map(normalisiereBuchEintrag)
        .filter(({ titel }) => titel && Array.isArray(alleBuecherdaten[titel]) && alleBuecherdaten[titel].length > 0);

    verfuegbareBuecher = aktiveBuecher.map(({ titel }) => titel);
    buchBeschriftungen = Object.fromEntries(
        aktiveBuecher.map(({ titel, emoji }) => [titel, emoji || ""])
    );
}

// Load JSON data
fetch('buecher_komplett.json')
    .then(response => {
        if (!response.ok) throw new Error("JSON could not be loaded");
        return response.json();
    })
    .then(data => {
        alleBuecherdaten = data;
        aktualisiereBuchlisten();
    })
    .catch(err => {
        document.getElementById('zitat-text').textContent = "Error loading game data! Check JSON file.";
        console.error(err);
    });

function vorbereiteParallaxMasken() {
    const maskPaths = [
        'img/background_layer1.png',
        'img/background_layer2.png',
        'img/background_layer3.png'
    ];

    const layerPromises = maskPaths.map((src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = () => reject(new Error(`Could not load mask: ${src}`));
            img.src = src;
        });
    });

    Promise.allSettled(layerPromises)
        .then(() => {
            document.querySelectorAll('.parallax-bg').forEach(el => el.classList.add('ready'));
        })
        .catch(() => {
            document.querySelectorAll('.parallax-bg').forEach(el => el.classList.add('ready'));
        });
}

function startRound() {
    punkte = 0;
    aktuelleRundenNummer = 0;
    maxRunden = 10; 
    
    // Blendet die alte Ergebniskarte wieder aus
    document.getElementById('results-container').hidden = true;
    
    // Wechselt die Bildschirme
    document.getElementById('menu-screen').hidden = true;
    document.getElementById('quiz-screen').hidden = false;
    
    neueFrage();
}

function neueFrage() {
    if (verfuegbareBuecher.length === 0) return;
    
    aktuelleRundenNummer++;
    hatGeantwortet = false;
    
    // UI State updates
    document.getElementById('progress-text').textContent = `Quotation: ${aktuelleRundenNummer} of ${maxRunden}`;
    document.getElementById('score-text').textContent = `Score: ${punkte}`;
    
    // Reset Action Button to Disabled
    const nextBtn = document.getElementById('next-button');
    nextBtn.disabled = true;
    nextBtn.textContent = "Proceed 🪶";

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
    buttonContainer.replaceChildren();

    const antwortBuecher = buecherPool
        .map(normalisiereBuchEintrag)
        .filter(({ titel }) => verfuegbareBuecher.includes(titel));

    antwortBuecher.forEach(({ titel, emoji }) => {
        const btn = document.createElement('button');
        btn.className = "quiz-button answer-button";
        btn.textContent = `${emoji ? `${emoji} ` : ""}${titel}`;
        btn.setAttribute('data-book', titel);
        btn.onclick = () => pruefeAntwort(btn, titel);
        buttonContainer.appendChild(btn);
    });
}

function renderText() {
    const quoteText = angezeigteAbsaetze.join("\n\n").replace(/<\\i>/gi, "</i>");
    document.getElementById('zitat-text').innerHTML = quoteText;
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
    
    const buttons = document.querySelectorAll('#antwort-buttons .answer-button');
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

    document.getElementById('score-text').textContent = `Score: ${punkte}`;
    
    // Change Button appearance dynamically at round end
    const nextBtn = document.getElementById('next-button');
    nextBtn.disabled = false;
    if (aktuelleRundenNummer >= maxRunden) {
        nextBtn.textContent = "Conclude ⚖️";
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
    document.getElementById('quiz-screen').hidden = true;
    document.getElementById('menu-screen').hidden = false;
    
    let scoreKey = Math.max(0, Math.min(punkte, 10)); 
    let evaluation = bewertungsPool[scoreKey] || { title: "Evaluated", quotes: ["Processed successfully."] };
    
    let quotesArray = evaluation.quotes;
    let randomQuote = quotesArray[Math.floor(Math.random() * quotesArray.length)];

    document.getElementById('result-rating-title').textContent = evaluation.title;
    document.getElementById('final-score-text').textContent = `You got ${punkte} out of ${maxRunden} correct!`;
    document.getElementById('result-rating-desc').textContent = `"${randomQuote}"`;
    
    // Show separate card
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.hidden = false;
    
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


function wendeZufallsPaletteAn() {
    // Falls keine Paletten geladen wurden, abbrechen
    if (typeof quizPaletten === 'undefined' || quizPaletten.length === 0) return;
    
    // Zufällige Palette wählen
    const palette = quizPaletten[Math.floor(Math.random() * quizPaletten.length)];
    console.log(`Applying Theme: ${palette.name} 🎨`);
    
    // Injektion der CSS-Variablen in das Dokument-Root
    const root = document.documentElement;
    root.style.setProperty('--bg-base', palette.bg_base);
    root.style.setProperty('--bg-layer1', palette.bg_layer1);
    root.style.setProperty('--bg-layer2', palette.bg_layer2);
    root.style.setProperty('--bg-layer3', palette.bg_layer3);
    root.style.setProperty('--card-bg', palette.card_bg);
    root.style.setProperty('--text-main', palette.text_main);
    root.style.setProperty('--text-sub', palette.text_sub);
    root.style.setProperty('--button-3-bg', palette.button_3_bg);
    root.style.setProperty('--button-2-bg', palette.button_2_bg);
    root.style.setProperty('--button-1-bg', palette.button_1_bg);
    root.style.setProperty('--quote-box-bg', palette.quote_box_bg);

    const feedbackColors = palette.name.startsWith('Dark')
        ? {
            correctBackground: '#285d47',
            correctText: '#b9efd0',
            wrongBackground: '#713d48',
            wrongText: '#ffd0d4'
        }
        : {
            correctBackground: '#b9e8c8',
            correctText: '#205b3d',
            wrongBackground: '#f3b8b8',
            wrongText: '#762f37'
        };

    root.style.setProperty('--feedback-correct-bg', feedbackColors.correctBackground);
    root.style.setProperty('--feedback-correct-text', feedbackColors.correctText);
    root.style.setProperty('--feedback-wrong-bg', feedbackColors.wrongBackground);
    root.style.setProperty('--feedback-wrong-text', feedbackColors.wrongText);
}