/* Hier kommt Java-Skript. */

//--------------------------------------------------------------------------\\
//                          Variablen                                        
//--------------------------------------------------------------------------\\

// - const Variablen können nicht neu definiert werden. Ihr Inhalt kann trotzdem verändert werden, z.B. bei einem Array.
// - let Variablen können neu definiert werden.

// Variablen mit Referenzen zu den HTML-Elementen:
// Referenzen zu den Elementen mit wechselnder Anzeige.
const eingabeContainer = document.getElementById("eingabeContainer");
const ergebnisContainer = document.getElementById("ergebnisContainer");
const berechneButton = document.getElementById("berechneButton");
const zurückButton = document.getElementById("zurückButton");
const neueBerechnungButton = document.getElementById("neueBerechnungButton");

const plotCanvasElement = document.getElementById('plotCanvas');

const radio12 = document.getElementById('radio12');
const radio3 = document.getElementById('radio3');
const inputGroup_t12 = document.getElementById('inputGroup_t12');
const inputGroup_t3 = document.getElementById('inputGroup_t3');
const inputGroup_K4 = document.getElementById('inputGroup_K4')

// Alternativer Titel.
const eingabe_Titel = document.getElementById('eingabe_Titel');
const ergebnisTitel = document.getElementById('ergebnisContainer_Titel');

// Eingabe Geometrie.
const eingabe_Da = document.getElementById('eingabe_Da');
const eingabe_Di = document.getElementById('eingabe_Di');
const eingabe_t12 = document.getElementById('eingabe_t12');
const eingabe_t3 = document.getElementById('eingabe_t3');
const eingabe_K4 = document.getElementById('eingabe_K4');
const eingabe_L0 = document.getElementById('eingabe_L0');

// Eingabe Stapelwerte.
const eingabe_stapel_n = document.getElementById('eingabe_stapel_n');
const eingabe_stapel_i = document.getElementById('eingabe_stapel_i');

// Eingabe alternative Materialwerte.
const eingabe_E = document.getElementById("eingabe_E");
const eingabe_mu = document.getElementById("eingabe_mu");

// Eingaben für die Arbeitspunktberechnung.
const radioAuswahlFederweg = document.getElementById('radioAuswahlFederweg');
const radioAuswahlFederkraft = document.getElementById('radioAuswahlFederkraft');

const eingabe_AP = document.getElementById("eingabe_AP");
const eingabe_AP_Abweichung_1 = document.getElementById("eingabe_AP_Abweichung_1");
const einheit_AP_Abweichung_1 = document.getElementById("einheit_AP_Abweichung_1");
const eingabe_AP_Abweichung_2 = document.getElementById("eingabe_AP_Abweichung_2");
const einheit_AP_Abweichung_2 = document.getElementById("einheit_AP_Abweichung_2");

// Ausgabe Stapeldaten.
const ausgabe_stapel_L0 = document.getElementById('ausgabe_stapel_L0');
const ausgabe_stapel_s_max = document.getElementById('ausgabe_stapel_s_max');
const ausgabe_stapel_F_075 = document.getElementById('ausgabe_stapel_F_075');
const ausgabe_stapel_s_075 = document.getElementById('ausgabe_stapel_s_075');
const ausgabe_K4 = document.getElementById('ausgabe_K4');

// Container und Felder für den Haupt-Arbeitspunkt.
const ausgabeContainer_AP = document.getElementById('ausgabeContainer_AP');
const ausgabe_AP_s = document.getElementById('ausgabe_AP_s');
const ausgabe_AP_F = document.getElementById('ausgabe_AP_F');
const ausgabe_AP_s_relativ = document.getElementById('ausgabe_AP_s_relativ');
const ausgabe_AP_L = document.getElementById('ausgabe_AP_L');

// Container und Felder für die Abweichung 1.
const ausgabeContainer_AP_Punkt1 = document.getElementById('ausgabeContainer_AP_Punkt1');
const ausgabe_AP_Punkt1_s = document.getElementById('ausgabe_AP_Punkt1_s');
const ausgabe_AP_Punkt1_F = document.getElementById('ausgabe_AP_Punkt1_F');
const ausgabe_AP_Punkt1_s_relativ = document.getElementById('ausgabe_AP_Punkt1_s_relativ');
const ausgabe_AP_Punkt1_L = document.getElementById('ausgabe_AP_Punkt1_L');

// Container und Felder für die Abweichung 2.
const ausgabeContainer_AP_Punkt2 = document.getElementById('ausgabeContainer_AP_Punkt2');
const ausgabe_AP_Punkt2_s = document.getElementById('ausgabe_AP_Punkt2_s');
const ausgabe_AP_Punkt2_F = document.getElementById('ausgabe_AP_Punkt2_F');
const ausgabe_AP_Punkt2_s_relativ = document.getElementById('ausgabe_AP_Punkt2_s_relativ');
const ausgabe_AP_Punkt2_L = document.getElementById('ausgabe_AP_Punkt2_L');


// Globale Variablen für Berechnung oder Ausgabe:
let myChart;                    // hier wird der Plot gespeichert.

let E = 206000;                 // E-Modul mit Default-Wert.
let mu = 0.3;                   // Poisson-Zahl mit Default-Wert.

let h0;
let delta;
let K1;
let c1;
let c2;
let K4 = 1111;                  // zum Überprüfen der Berechnung.

let stapel_n;
let stapel_i;

let stapel_t;                   // für die Stapelhöhe wird hier der jeweilige t-Wert zugewiesen.
let stapel_L0;                  // Bauhöhe unverpresster Stapel.
let stapel_h0;                  // maximaler Federweg des Stapels.

// Werte des Prüfpunkts.
let stapel_s_075;
let stapel_F_075;

//--------------------------------------------------------------------------\\
//                          Funktionen                                        
//--------------------------------------------------------------------------\\

// Funktion, die die Eingaben für Zahlenwerte überprüft, eventuelle Kommata in Punkte ändert und dann die Eingabe in eine Gleitkommazahl wandelt.
function validateAndParseInput(inputElement, inputLabel) {

    const inputValue = inputElement.value.trim();

    if (!/^-?\d+(?:[.,]\d+)?$/.test(inputValue)) {
        alert(`Fehler!\nBitte prüfe: ${inputLabel}`);
        inputElement.focus();
        return NaN;
    }
    return parseFloat(inputValue.replace(',', '.'));
}

// Selbe Funktion wie oben nur für Optionale Felder: Hier wird bei leerem Feld kein alert und Infinity als Wert ausgegeben. 
function validateAndParseInputOptional(inputElement, inputLabel) {

    const inputValue = inputElement.value.trim();

    if (inputValue === '') {
        return Infinity;
    }

    if (!/^-?\d+(?:[.,]\d+)?$/.test(inputValue)) {
        alert(`Fehler in optionalem Feld!\nBitte prüfe: ${inputLabel}`);
        inputElement.focus();
        return NaN;
    }

    return parseFloat(inputValue.replace(',', '.'));
}

// Funktion, die das Ein- und Ausblenden der zusätzlichen Eingabefelder bei Gruppe 3 regelt.
function updateSichtbarkeitGruppe3() {
    if (radio12.checked) {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'none';
        inputGroup_K4.style.display = 'none';
    } else {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'flex';
        inputGroup_K4.style.display = 'flex';
    }
}

// Ändert die Einheiten der Dropdown-Menüs für den AP je nach Auswahl
function updateArbeitspunktEinheiten() {
    if (radioAuswahlFederweg.checked) {
        // Bei Federweg-Definition: mm verwenden
        einheit_AP_Abweichung_1.innerHTML = '<option value="mm">mm</option><option value="percent">%</option>';
        einheit_AP_Abweichung_2.innerHTML = '<option value="mm">mm</option><option value="percent">%</option>';
    } else if (radioAuswahlFederkraft.checked) {
        // Bei Federkraft-Definition: N verwenden
        einheit_AP_Abweichung_1.innerHTML = '<option value="N">N</option><option value="percent">%</option>';
        einheit_AP_Abweichung_2.innerHTML = '<option value="N">N</option><option value="percent">%</option>';
    }
}

//--------------------------------------------------------------------------\\
//                          Funktionen der Federkennlinie                                      
//--------------------------------------------------------------------------\\

// Kennlinie: Berechnung maximaler Federweg.
function calculate_h0(l0, t) {
    if (t >= l0) {
        alert("Federdicke ist größer als Federhöhe.");
        return NaN; 
    }
    return l0 - t;
}

// Kennlinie: Berechnung Durchmesserverhältnis.
function calculate_delta(De, Di) {
    if (Di >= De) {
        alert("Innendurchmesser ist größer als Außendurchmesser.");
        return NaN;
    }
    return De / Di;
}

// Kennlinie: Hilfgröße K1
function calculate_K1(delta) {

    const bruch_zaehler = (delta - 1) / delta;
    const zaehler = (1 / Math.PI) * Math.pow(bruch_zaehler, 2);

    const term_nenner1 = (delta + 1) / (delta - 1);
    const term_nenner2 = 2 / Math.log(delta);
    const nenner = term_nenner1 - term_nenner2;

    if (nenner === 0) {
        alert("Nenner in Hilfsgröße K1 ist 0.\nEingaben auf Plausibilität prüfen.");
        return NaN;
    }

    return zaehler / nenner;
}

// Kennlinie: Hilfsgröße K2
function calculate_K2(delta) {

    const bruch_zaehler = (delta - 1) / Math.log(delta);
    const zaehler = (6 / Math.PI) * (bruch_zaehler - 1);
    const nenner = Math.log(delta);

    return zaehler / nenner;
}

// Kennlinie: Hilfsgröße K3
function calculate_K3(delta) {

    const zaehler = (3 / Math.PI) * (delta - 1);
    const nenner = Math.log(delta);

    return zaehler / nenner;
}

// Kennlinie: Hilfsgröße c1 
function calculate_c1(t_prime, t, l0) {

    const verhaeltnis_tt = t_prime / t;

    const term_nenner1 = (l0 / (4 * t)) - verhaeltnis_tt + (3 / 4);
    const term_nenner2 = ((5 * l0) / (8 * t)) - verhaeltnis_tt + (3 / 8);
    const nenner = term_nenner1 * term_nenner2;

    if (nenner === 0) {
        alert("Nenner in c1 Berechnung ist 0.\nEingaben auf Plausibilität prüfen.");
        return NaN;
    }

    return Math.pow(verhaeltnis_tt, 2) / nenner;
}

// Kennlinie: Hilfsgröße c2
function calculate_c2(c1, t_prime, t, l0) {

    const verhaeltnis_tt = t_prime / t;

    const term_vor_klammer = c1 / Math.pow(verhaeltnis_tt, 3);
    const term1 = (5 / 32) * Math.pow((l0 / t) - 1, 2);
    const klammer_inhalt = term1 + 1;

    return term_vor_klammer * klammer_inhalt;
}

// Kennlinie: Hilfsgröße K4
function calculate_K4(c1, c2) {

    const term_unter_wurzel_innen = Math.pow((c1 / 2), 2) + c2;
    const wurzel_innen = Math.sqrt(term_unter_wurzel_innen);
    const term_unter_wurzel_aussen = -(c1 / 2) + wurzel_innen;

    return Math.sqrt(term_unter_wurzel_aussen);
}

// Kennlinie: Federkraft für Gruppe 1 & 2
function calculate_F12(E, mu, t, K1, De, h0, s) {

    const term1 = (4 * E) / (1 - mu * mu);
    const term2 = Math.pow(t, 4) / (K1 * De * De); 
    
    const klammer_term1 = (h0 / t) - (s / t);
    const klammer_term2 = (h0 / t) - (s / (2 * t));
    const klammer_inhalt = (klammer_term1 * klammer_term2) + 1;

    return term1 * term2 * (s / t) * klammer_inhalt;
}

// Kennlinie: Federkraft für Gruppe 3
function calculate_F3(E, mu, t, K1, De, K4, h0, s) {
    
    const term1 = (4 * E) / (1 - mu * mu);
    const term2 = Math.pow(t, 4) / (K1 * De * De);
    const term3 = Math.pow(K4, 2);

    const klammer_term2 = (h0 / t) - (s / t);
    const klammer_term3 = (h0 / t) - (s / (2 * t));
    const klammer_inhalt = (Math.pow(K4, 2) * klammer_term2 * klammer_term3) + 1;

    return term1 * term2 * Math.pow(K4, 2) * (s / t) * klammer_inhalt;
}



//--------------------------------------------------------------------------\\
//                          Event Listener                                        
//--------------------------------------------------------------------------\\

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Radio-Elemente "radio12" und radio"3":
///////////////////////////////////////////////////////////////////////////////////////////////////////////
radio12.addEventListener('change', updateSichtbarkeitGruppe3);
radio3.addEventListener('change', updateSichtbarkeitGruppe3);
radioAuswahlFederweg.addEventListener('change', updateArbeitspunktEinheiten);
radioAuswahlFederkraft.addEventListener('change', updateArbeitspunktEinheiten);


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button "Ergebnisse anzeigen":
///////////////////////////////////////////////////////////////////////////////////////////////////////////
berechneButton.addEventListener("click", function() {
    

    // Setzt entweder den vom Nutzer gewählten Titel oder einen Default-Titel.
    const titel = eingabe_Titel.value.trim();
    ergebnisTitel.textContent = titel || "Ergebnisse";

    // Eingaben holen.
    let custom_E = validateAndParseInputOptional(eingabe_E, 'Werkstoffdaten --> E');
    let custom_mu = validateAndParseInputOptional(eingabe_mu, 'Werkstoffdaten --> mu');
    let custom_material_isValid = true;

    // E-Modul einbauen wenn korrekte Eingabe erfolgt ist.
    if (custom_E === Infinity) {
        
        // Bei keiner Eingabe nichts tun.

    } else if (isNaN(custom_E)) {

        // Falsche Eingabe
        custom_material_isValid = false;

    } else {

        // Korrekte Eingabe: Wert übernehmen.
        E = custom_E;
    }
    
    // Poisson-Zahl einbauen wenn korrekte Eingabe erfolgt ist.
    if (custom_mu === Infinity) {
        
        // Bei keiner Eingabe nichts tun.

    } else if (isNaN(custom_mu)) {

        // Falsche Eingabe
        custom_material_isValid = false;

    } else {

        // Korrekte Eingabe: Wert übernehmen.
        mu = custom_mu;
    }
   

    // Abbruch des Events falls bereits Fehler in den optionalen Werkstoffdaten stecken.
    if (custom_material_isValid === false) {
        return;
    }


    // Kennlinienberechnung:
    //
    // Prüfvariable in Kennlinienberechnung zunächst falsch!
    let kennlinie_isValid = false;
    // Abrufen und Validieren der Eingaben.
    const da = validateAndParseInput(eingabe_Da, 'Geometrie --> De');
    const di = validateAndParseInput(eingabe_Di, 'Geometrie --> Di');
    const l0 = validateAndParseInput(eingabe_L0, 'Geometrie --> L0');
    const t12 = validateAndParseInput(eingabe_t12, 'Geometrie --> t');

    // Array für die Kennlinien-Punkte.
    const federkennlinieData = [];

    // 1) Prüfung: welches radio-Element ist ausgewählt?
    // Für Gruppe 1&2:
    if (radio12.checked) { 
                      
        // Prüfung 2: sind alle Eingaben Zahlen?                                  
        if (!isNaN(da) && !isNaN(di) && !isNaN(t12) && !isNaN(l0)) {
            
            // Berechnen der konstanten Gleichungen der Kennlinienberechnung.
            h0 = calculate_h0(l0, t12);
            delta = calculate_delta(da, di);
            K1 = calculate_K1(delta);

            // Prüfung 3: konnten alle Werte berechnet werden?
            if (!isNaN(h0) && !isNaN(delta) && !isNaN(K1)) {

                kennlinie_isValid = true; // Prüfvariable setzen.

                // Kennlinienberechnung von s = 0 bis s = h0.
                for (let x = 0; x <= h0; x += 0.01) {
                    
                    // Wertepaare berechnen und dem Array übergeben.
                    let y = calculate_F12(E, mu, t12, K1, da, h0, x);
                    federkennlinieData.push({ x: x, y: y }); 
                }

                // Sicherstellen, dass der letzte Punkt exakt bei h0 liegt.
                if (federkennlinieData[federkennlinieData.length - 1].x < h0) {
                    let y = calculate_F12(E, mu, t12, K1, da, h0, h0);
                    federkennlinieData.push({ x: h0, y: y });
                }

                // Werte bei 75 % Einfederung bestimmen.
                stapel_s_075 = 0.75 * h0;
                stapel_F_075 = calculate_F12(E, mu, t12, K1, da, h0, stapel_s_075);
                // Dicke-Wert der Berechnung für später speichern.
                stapel_t = t12;
            }
        }
    }
    // Für Gruppe 3:
    else if (radio3.checked) { 
        
        // Abrufen und Prüfen von t3 (=t').
        let t3 = validateAndParseInput(eingabe_t3, "Geometrie --> t'");

        // Prüfung 2: sind alle Eingaben Zahlen?                
        if (!isNaN(da) && !isNaN(di) && !isNaN(t12) && !isNaN(t3) && !isNaN(l0)) {

            // Berechnen der konstanten Gleichungen der Kennlinienberechnung.
            h0 = calculate_h0(l0, t3); // entspricht h0' weil t3 = t' übergeben wird
            delta = calculate_delta(da, di);
            c1 = calculate_c1(t3, t12, l0);
            c2 = calculate_c2(c1, t3, t12, l0);
            K1 = calculate_K1(delta);

            // Bestimmung von K4 je nachdem ob t=t'.
            if (t12 !== t3) {
                
                K4 = calculate_K4(c1, c2);
            } else {

                // Wenn die beiden Werte gleich sind, dann wird K4 aus der Eingabe bestimmt.
                let K4_parameter = validateAndParseInput(eingabe_K4, "Geometrie --> Kennlinienparameter");
                K4 = K4_parameter / (h0 / t3);
            }

            // Prüfung 3: konnten alle Werte berechnet werden?
            if (!isNaN(h0) && !isNaN(delta) && !isNaN(c1) && !isNaN(c2) && !isNaN(K1) && !isNaN(K4)) {

                kennlinie_isValid = true; // Prüfvariable setzen.

                // Kennlinienberechnung von s = 0 bis s = h0 (hier h0').
                for (let x = 0; x <= h0; x += 0.01) {

                    // Wertepaare berechnen und dem Array übergeben.
                    let y = calculate_F3(E, mu, t3, K1, da, K4, h0, x);
                    federkennlinieData.push({ x: x, y: y }); 
                }

                // Sicherstellen, dass der letzte Punkt exakt bei h0 liegt.
                if (federkennlinieData[federkennlinieData.length - 1].x < h0) {
                    let y = calculate_F3(E, mu, t3, K1, da, K4, h0, h0);
                    federkennlinieData.push({ x: h0, y: y });
                }

                // Werte bei 75 % Einfederung bestimmen.
                stapel_s_075 = 0.75 * h0;
                stapel_F_075 = calculate_F3(E, mu, t3, K1, da, K4, h0, stapel_s_075);
                // Dicke-Wert der Berechnung für später speichern.
                stapel_t = t3;
            }
        }
    }

    // Stapeldaten einbinden:
    //
    // Eingaben holen:
    let stapel_n_temp = validateAndParseInputOptional(eingabe_stapel_n, 'Stapeldaten - n');
    let stapel_i_temp = validateAndParseInputOptional(eingabe_stapel_i, 'Stapeldaten - i')

    // Parallelschaltung.
    if (stapel_n_temp === Infinity) {

        // Um beim Leeren der Eingabe nicht mit dem alten Wert weiterzurechnen.
        stapel_n = 1;

    } else if (isNaN(stapel_n_temp)) {

        // Wenn Eingabe falsch war, Prüfungsvariable auf falsch setzen.
        kennlinie_isValid  = false;

    } else {

        // Übernimmt korrekte Eingabe und multipliziert jeden y-Wert (Kraft) der Kennlinie mit der Anzahl an parallelgeschalteten Federn.
        stapel_n = stapel_n_temp;

        for (let i = 0; i < federkennlinieData.length; i++) {

                federkennlinieData[i].y *= stapel_n;
        }
    }

    // Reihenschaltung.
    if (stapel_i_temp === Infinity) {

        // Um beim Leeren der Eingabe nicht mit dem alten Wert weiterzurechnen.
        stapel_i = 1;

    } else if (isNaN(stapel_i_temp)) {

        // Wenn Eingabe falsch war, Prüfungsvariable auf falsch setzen.
        kennlinie_isValid  = false;

    } else {

        // Übernimmt korrekte Eingabe und multipliziert jeden x-Wert (Federweg) der Kennlinie mit der Anzahl der in Reihe geschalteten Federn.
        stapel_i = stapel_i_temp;

        for (let i = 0; i < federkennlinieData.length; i++) {

            federkennlinieData[i].x *= stapel_i;
        }
    }

    // Aktualisieren der Ausgabe-Werte des Prüfpunkts.
    stapel_s_075 *= stapel_i;
    stapel_F_075 *= stapel_n;
    stapel_L0 = stapel_i * (l0 + (stapel_n - 1) * stapel_t);
    stapel_h0 = stapel_i * h0;
    
    // Falls bis hierhin etwas nicht geklappt hat ist Ende.
    if (kennlinie_isValid === false) {
        return;
    }



    // Arbeitspunkt:
    //
    // Eingabe-Werte holen und validieren.
    let AP = validateAndParseInputOptional(eingabe_AP, "Arbeitspunkt --> AP");
    let AP_Abweichung_1 = validateAndParseInputOptional(eingabe_AP_Abweichung_1, "Arbeitspunkt --> Punkt 1");
    let AP_Abweichung_2 = validateAndParseInputOptional(eingabe_AP_Abweichung_2, "Arbeitspunkt --> Punkt 2");
    
    let AP_Punkt_1;
    let AP_Punkt_2;

    let AP_Array_input = [];
    let AP_Array_output = [];

    // Validen Wert übernehmen und ins Array schieben.
    if (Number.isFinite(AP)) {

        AP_Array_input.push(AP);
    }

    // Auch hier nur valide Werte übernehmen. Aber zuvor die Abweichungen in tatsächlichen Federweg umrechnen.
    // Für Abweichung 1:
    if (Number.isFinite(AP_Abweichung_1)) {

        if (einheit_AP_Abweichung_1.value === "percent") {

            // Wenn die Abweichung in Prozent angegeben ist:
            AP_Punkt_1 = AP + ((AP_Abweichung_1 / 100) * AP);
            AP_Array_input.push(AP_Punkt_1);

        } else {

            // Wenn die Abweichung absolut angegeben ist:
            AP_Punkt_1 = AP + AP_Abweichung_1;
            AP_Array_input.push(AP_Punkt_1);
            
        }
    }
    // Für Abweichung 2:
    if (Number.isFinite(AP_Abweichung_2)) {

        if (einheit_AP_Abweichung_2.value === "percent") {

            // Wenn die Abweichung in Prozent angegeben ist:
            AP_Punkt_2 = AP + ((AP_Abweichung_2 / 100) * AP);
            AP_Array_input.push(AP_Punkt_2);

        } else {

            // Wenn die Abweichung absolut angegeben ist:
            AP_Punkt_2 = AP + AP_Abweichung_2;
            AP_Array_input.push(AP_Punkt_2);

        }
    }

    // Arbeitspunktberechnung nur für eine valide AP Eingabe.
    if (Number.isFinite(AP)) {

        // Überprüfen, welches Radioelement der AP Definition ausgewählt ist.
        // Berechnung bei AP-Definition über Federweg:
        if (radioAuswahlFederweg.checked) {

            // Schleife über die eingegebenen Arbeitspunkte.
            for (let i = 0; i < AP_Array_input.length; i++) {
                
                if (AP_Array_input[i] >= 0 && AP_Array_input[i] <= stapel_h0) {
                    // Federweg direkt aus Eingabe.
                    let s_i = AP_Array_input[i];
                    // Einfederung bezogen auf die Stapelhöhe.
                    let s_relativ_i = 100 * (s_i / stapel_h0);
                    // Bauhöhe bei Arbeitspunkt.
                    let L_i = stapel_L0 - s_i;

                    // Federkraftfunktion erwartet den Federweg der Einzelfeder. Daher skalieren des Federwegs auf eine Einzelfeder, berechnen der Federkraft und dann mit parallel geschalteten Feder wieder hochskalieren.
                    let F_i;
                    if (radio12.checked) {

                        let s_einzelfeder = s_i / stapel_i; // stapel_i ist die globale Variable!
                        F_i = stapel_n * calculate_F12(E, mu, stapel_t, K1, da, h0, s_einzelfeder);

                    } else if (radio3.checked) {

                        let s_einzelfeder = s_i / stapel_i; // stapel_i ist die globale Variable!
                        F_i = stapel_n * calculate_F3(E, mu, stapel_t, K1, da, K4, h0, s_einzelfeder);

                    }

                    // Fügt dem Ergebnis-Array ein Objekt mit den Werten hinzu.
                    AP_Array_output.push({
                        s: s_i, 
                        s_relativ: s_relativ_i,
                        F: F_i,
                        L: L_i
                    });
                } else {

                    alert(`Punkt ${i}: Federweg ${AP_Array_input[i]} mm liegt außerhalb der Kennlinie.`);
                }
            }
        
        // Berechnung bei AP-Definition über Federkraft:
        } else if (radioAuswahlFederkraft.checked) {

            // Schleife über die eingegebenen Arbeitspunkte.
            for (let i = 0; i < AP_Array_input.length; i++) {

                // Hier Federkraft direkt aus Eingabe.
                let F_i = AP_Array_input[i];

                // Federweg kann nicht einfach explizit aus der Gleichung ermittelt werden.
                let s_i = NaN;
                // Daher wird stattdessen die Kennlinie abgesucht nach den zwei Punkten, zwischen denen der gesuchte Federweg liegen muss.
                for (let j = 0; j < federkennlinieData.length - 1; j++) {

                    let p1 = federkennlinieData[j];
                    let p2 = federkennlinieData[j + 1];

                    // Prüfung, ob F_i zwischen zwei Werten liegt. Einmal für steigende Abschnitte und sicherheitshalber auch für fallende Abschnitte.
                    if ((F_i >= p1.y && F_i <= p2.y) || (F_i <= p1.y && F_i >= p2.y)) {

                        // Lineare Interpolation zwischen den beiden Punkten mit der eingegebenen Kraft.
                        let slope = (p2.y - p1.y) / (p2.x - p1.x);
                        s_i = p1.x + (F_i - p1.y) / slope;

                        // Es wird nur der erste Punkt berechnet!!!
                        break;
                    }
                }

                // Wenn ein Federweg berechnet werden konnte, dann die restlichen Werte berechnen und das Objekt dem Array übergeben.
                if (!isNaN(s_i)) {
                    
                    let s_relativ_i = 100 * (s_i / stapel_h0);
                    let L_i = stapel_L0 - s_i;

                    AP_Array_output.push({
                        s: s_i,
                        s_relativ: s_relativ_i,
                        F: F_i,
                        L: L_i
                    });

                } else {
                    alert(`Arbeitspunkt ${i}: Federkraft ${F_i} N liegt außerhalb der Kennlinie.`);
                }
            }
        }
    }


    // Ausgabe:
    //
    // Test
    ausgabe_K4.textContent = K4.toFixed(5);

    // Stapeldaten.
    ausgabe_stapel_L0.textContent = stapel_L0.toFixed(2);
    ausgabe_stapel_s_max.textContent = stapel_h0.toFixed(2);
    ausgabe_stapel_F_075.textContent = stapel_F_075.toFixed(0);
    ausgabe_stapel_s_075.textContent = stapel_s_075.toFixed(2);

    // Arbeitspunkte.
    // Zuerst alle AP-Container ausblenden, um einen sauberen Zustand zu schaffen.
    ausgabeContainer_AP.style.display = 'none';
    ausgabeContainer_AP_Punkt1.style.display = 'none';
    ausgabeContainer_AP_Punkt2.style.display = 'none';

    // Ausgabe der berechneten Arbeitspunkte, falls vorhanden.
    // Haupt-Arbeitspunkt
    if (AP_Array_output.length > 0 && AP_Array_output[0]) {

        const correctElement = AP_Array_output[0];

        ausgabe_AP_s.textContent = correctElement.s.toFixed(2);
        ausgabe_AP_F.textContent = correctElement.F.toFixed(0);
        ausgabe_AP_s_relativ.textContent = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_L.textContent = correctElement.L.toFixed(2);

        ausgabeContainer_AP.style.display = 'block';
    }

    // Arbeitspunkt - Abweichung 1
    if (AP_Array_output.length > 1 && AP_Array_output[1]) {

        const correctElement = AP_Array_output[1];

        ausgabe_AP_Punkt1_s.textContent = correctElement.s.toFixed(2);
        ausgabe_AP_Punkt1_F.textContent = correctElement.F.toFixed(0);
        ausgabe_AP_Punkt1_s_relativ.textContent = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_Punkt1_L.textContent = correctElement.L.toFixed(2);

        ausgabeContainer_AP_Punkt1.style.display = 'block';
    }

    // Arbeitspunkt - Abweichung 2
    if (AP_Array_output.length > 2 && AP_Array_output[2]) {

        const correctElement = AP_Array_output[2];

        ausgabe_AP_Punkt2_s.textContent = correctElement.s.toFixed(2);
        ausgabe_AP_Punkt2_F.textContent = correctElement.F.toFixed(0);
        ausgabe_AP_Punkt2_s_relativ.textContent = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_Punkt2_L.textContent = correctElement.L.toFixed(2);

        ausgabeContainer_AP_Punkt2.style.display = 'block';
    }



    // Plotten
    //
    // Holt das canvas-Element und gibt ihm eine 2D-Logik.
    const ctx = plotCanvasElement.getContext('2d');

    // Löscht ein eventuell bereits vorhandenes Diagramm.
    if (myChart) {
        myChart.destroy();
    }

    // --- VORBEREITUNG DER DATENSÄTZE FÜR DAS DIAGRAMM ---

    // 1. Beginne mit dem Datensatz für die Kennlinie
    let chartDatasets = [{
        label: `Federkennlinie`,
        data: federkennlinieData,
        type: 'line', // explizit als Linie definieren
        borderColor: 'rgb(153, 15, 15)',
        tension: 0.1,
        fill: false,
        pointRadius: 0,
        hitRadius: 5,
        hoverRadius: 5
    }];

    // 2. Füge den 75%-Punkt hinzu (optional, kannst du auch auskommentieren)
    chartDatasets.push({
        label: '75% Federweg',
        data: [{ x: stapel_s_075, y: stapel_F_075 }],
        type: 'scatter',
        backgroundColor: 'rgb(0, 100, 255)',
        pointRadius: 6,
        pointHoverRadius: 8
    });

    // 3. Füge dynamisch für jeden Arbeitspunkt einen Datensatz hinzu
    const apPunktStyles = [
        { label: 'Arbeitspunkt', color: 'rgb(255, 99, 132)' },   // Rot
        { label: 'AP Abweichung 1', color: 'rgb(54, 162, 235)' }, // Blau
        { label: 'AP Abweichung 2', color: 'rgb(75, 192, 192)' }  // Grün
    ];

    AP_Array_output.forEach((apPunkt, index) => {
        if (apPunkt) { // Stelle sicher, dass der Punkt existiert
            chartDatasets.push({
                label: apPunktStyles[index] ? apPunktStyles[index].label : `Punkt ${index + 1}`,
                data: [{ x: apPunkt.s, y: apPunkt.F }],
                type: 'scatter',
                backgroundColor: apPunktStyles[index] ? apPunktStyles[index].color : 'rgb(0,0,0)',
                pointRadius: 7,       // Etwas größer, um sie hervorzuheben
                pointHoverRadius: 9
            });
        }
    });


    // --- ERSTELLEN DES DIAGRAMMS MIT ALLEN VORBEREITETEN DATENSÄTZEN ---

    myChart = new Chart(ctx, {
        type: 'line', // Der Standard-Typ, falls nicht im Datensatz anders definiert
        data: {
            datasets: chartDatasets // Hier das vollständige Array übergeben
        },
        options: {
            // Mix-Type-Charts benötigen diese Option nicht zwingend, aber es schadet nicht
            // type: 'line',
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Federweg s / mm' },
                    grid: { display: true, drawOnChartArea: true, drawTicks: true },
                    border: { dash: [5, 5], color: 'rgb(153, 15, 15)' },
                },
                y: {
                    type: 'linear',
                    title: { display: true, text: 'Federkraft F / N' },
                    grid: { display: true, drawOnChartArea: true, drawTicks: true },
                    border: { dash: [5, 5], color: 'rgb(153, 15, 15)' },
                },
            },
            // Sorgt für eine saubere Darstellung der Tooltips bei gemischten Diagrammtypen
            interaction: {
                mode: 'index',
                intersect: false,
            },
        },
    });


    
    // Blendet zuletzt die Eingaben aus und die Ergebnisse ein.
    ergebnisContainer.style.display = "block";
    eingabeContainer.style.display = "none";
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button "Zurück zur Eingabe":
///////////////////////////////////////////////////////////////////////////////////////////////////////////
zurückButton.addEventListener("click", function() {

    // Ändert einfach nur die Sichtbarkeit der beiden Container, falls sie existieren.
    if (ergebnisContainer) {
        ergebnisContainer.style.display = "none";
    }

    if (eingabeContainer) {
        eingabeContainer.style.display = "block";
    }
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button "Neue Berechnung":
///////////////////////////////////////////////////////////////////////////////////////////////////////////
neueBerechnungButton.addEventListener("click", function() {

    location.reload(); // Lädt die gesamte Seite neu, um alle Felder und den Zustand zurückzusetzen.;

    // Folgender Code leert alle Eingaben explizit, da die meisten Browser "Autofill" oder "Form Data Persistence" nutzen um Eingaben auch nach dem neu Laden zu erhalten. Kann sein, dass es nicht funktioniert.
    
    // Liste mit den Feldern zum leeren.
    const inputFieldsToClear = [
        eingabe_Titel,
        eingabe_Da,
        eingabe_Di,
        eingabe_t12,
        eingabe_t3,
        eingabe_K4,
        eingabe_L0,
        eingabe_stapel_n,
        eingabe_stapel_i,
        eingabe_E,
        eingabe_mu,
        eingabe_AP,
        eingabe_AP_Abweichung_1,
        eingabe_AP_Abweichung_2
    ];

    // Leert jedes Feld in der Liste
    inputFieldsToClear.forEach(field => {
        if (field) {
            field.value = '';
        }
    });

    radio12.checked = true;
    radio3.checked = false;
    radioAuswahlFederweg.checked = true;
    radioAuswahlFederkraft.checked = false;

    updateSichtbarkeitGruppe3();
    updateArbeitspunktEinheiten()
});



//--------------------------------------------------------------------------\\
//                    Automatische Aktionen beim Laden                                        
//--------------------------------------------------------------------------\\

updateSichtbarkeitGruppe3();
updateArbeitspunktEinheiten();