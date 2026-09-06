// quiz.js
let alleBuecherdaten = {};
let verfuegbareBuecher = [];
         
// Spiel-Zustand für die aktuelle Runde
let richtigesBuch = "";
let absatzListe = [];
let aktuellerIndex = 0;
let angezeigteAbsaetze = [];
         
let punkte = 0;

// Alle 8 Bücher im Pool
const buecherPool = [
    "Emma",
    "Lady Susan",
    "Love and Freindship [sic]",
    "Mansfield Park",
    "Northanger Abbey",
    "Persuasion",
    "Pride and Prejudice",
    "Sense and Sensibility"
];

// 1. Neues JSON-Format laden
fetch('buecher_komplett.json')
    .then(response => {
        if (!response.ok) throw new Error("JSON konnte nicht geladen werden");
        return response.json();
    })
    .then(data => {
        alleBuecherdaten = data;
        // Nur Bücher nehmen, die auch wirklich Absätze in der JSON haben
        verfuegbareBuecher = Object.keys(data).filter(b => data[b].length > 0);
                         
        // Rate-Buttons einmalig beim Start aufbauen
        erzeugeRateButtons();
        // Erste Spielrunde starten
        neueFrage();
    })
    .catch(err => {
        document.getElementById('zitat-text').innerHTML  = "Fehler beim Laden der Spieldaten! Stelle sicher, dass die JSON im selben Ordner liegt.";
        console.error(err);
    });

// Erstellt die Grid-Anzeige für die 8 Bücher
function erzeugeRateButtons() {
    const buttonContainer = document.getElementById('antwort-buttons');
    buttonContainer.innerHTML = "";
                  
    buecherPool.forEach(buch => {
        const btn = document.createElement('button');
        btn.className = "guess-btn";
        btn.innerHTML  = buch;
        btn.onclick = () => pruefeAntwort(buch);
        buttonContainer.appendChild(btn);
    });
}

function neueFrage() {
    if (verfuegbareBuecher.length === 0) return;
                 
    // 1. Zufälliges Buch bestimmen
    richtigesBuch = verfuegbareBuecher[Math.floor(Math.random() * verfuegbareBuecher.length)];
    absatzListe = alleBuecherdaten[richtigesBuch];
                 
    // 2. Zufälligen Start-Absatz wählen (mindestens 5 Absätze Abstand zum Buchrücken halten)
    if (absatzListe.length <= 5) {
        aktuellerIndex = 0;
    } else {
        aktuellerIndex = Math.floor(Math.random() * (absatzListe.length - 5));
    }
                 
    // 3. Zustand zurücksetzen: Wir starten mit genau 1 Absatz
    angezeigteAbsaetze = [absatzListe[aktuellerIndex]];
                 
    // Text im Interface aktualisieren
    renderText();
}

// Aktualisiert die Textanzeige im Browser
function renderText() {
    // Fügt die Absätze mit einer Leerzeile dazwischen zusammen
    document.getElementById('zitat-text').innerHTML  = angezeigteAbsaetze.join("\n\n");
}

// Wird aufgerufen, wenn man den Hinweis-Button klickt
function mehrAbsaetzeAnzeigen() {
    // Prüfen, ob das Buch überhaupt noch weitere Absätze hat
    if (aktuellerIndex + angezeigteAbsaetze.length < absatzListe.length) {
        const naechsterAbsatz = absatzListe[aktuellerIndex + angezeigteAbsaetze.length];
        angezeigteAbsaetze.push(naechsterAbsatz);
        renderText();
    } else {
        alert("Keine weiteren Absätze in diesem Buch vorhanden!");
    }
}

function pruefeAntwort(auswahl) {
    if (auswahl === richtigesBuch) {
        alert("Richtig! 🎉");
        punkte++;
    } else {
        alert(`Leider falsch. Das war aus '${richtigesBuch}'.`);
    }
    document.getElementById('score-text').innerHTML  = `Punkte: ${punkte}`;
    neueFrage();
}
