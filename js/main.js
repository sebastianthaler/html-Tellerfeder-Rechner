//--------------------------------------------------------------------------\\
//                          Variablen                                        
//--------------------------------------------------------------------------\\

// Variablen mit Referenzen zu den HTML-Elementen:
// Referenzen zu den Elementen mit wechselnder Anzeige.
const eingabeContainer = document.getElementById("eingabeContainer");
const ergebnisContainer = document.getElementById("ergebnisContainer");
const berechneButton = document.getElementById("berechneButton");
const zurückButton = document.getElementById("zurückButton");
const neueBerechnungButton = document.getElementById("neueBerechnungButton");

const plotCanvasElement = document.getElementById('plotCanvas');

const radio_12_DIN = document.getElementById('radio_12_DIN');
const radio_3_DIN = document.getElementById('radio_3_DIN');
const radio_3_CB = document.getElementById('radio_3_CB');
const radio_3_custom = document.getElementById('radio_3_custom');
const inputGroup_t12 = document.getElementById('inputGroup_t12');
const inputGroup_t3 = document.getElementById('inputGroup_t3');
const inputGroup_K4 = document.getElementById('inputGroup_K4')

// Alternativer Titel.
const eingabe_Titel = document.getElementById('eingabe_Titel');
const ergebnisTitel = document.getElementById('ergebnisContainer_Titel');

// Eingabe Geometrie.
const eingabe_Da = document.getElementById('eingabe_Da');
const eingabe_Di = document.getElementById('eingabe_Di');
const eingabe_t = document.getElementById('eingabe_t');
const eingabe_t_strich = document.getElementById('eingabe_t_strich');
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
let h0_strich;
let delta;
let K1;
let c1;
let c2;
let K4 = 9;                  // zum Überprüfen der Berechnung.

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
function updateSichtbarkeit() {
    if (radio_12_DIN.checked) {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'none';
        inputGroup_K4.style.display = 'none';
    } else if (radio_3_DIN.checked) {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'flex';
        inputGroup_K4.style.display = 'none';
    } else if (radio_3_CB.checked) {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'flex';
        inputGroup_K4.style.display = 'none';
    } else if (radio_3_custom.checked) {
        inputGroup_t12.style.display = 'flex';
        inputGroup_t3.style.display = 'none';
        inputGroup_K4.style.display = 'flex';
    }
}

// Ändert die Einheiten der Dropdown-Menüs für den AP je nach Auswahl
function updateArbeitspunktEinheiten() {
    if (radioAuswahlFederweg.checked) {
        // Bei Federweg-Definition: mm verwenden
        einheit_AP_Abweichung_1.innerHTML = '<option value="mm">mm</option><option value="percent">%</option>';
        einheit_AP_Abweichung_2.innerHTML = '<option value="mm">mm</option><option value="percent">%</option>';
        einheit_label_AP.textContent = "s / mm";
    } else if (radioAuswahlFederkraft.checked) {
        // Bei Federkraft-Definition: N verwenden
        einheit_AP_Abweichung_1.innerHTML = '<option value="N">N</option><option value="percent">%</option>';
        einheit_AP_Abweichung_2.innerHTML = '<option value="N">N</option><option value="percent">%</option>';
        einheit_label_AP.textContent = "F / N";
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

    const klammer_term2 = (h0 / t) - (s / t);
    const klammer_term3 = (h0 / t) - (s / (2 * t));
    const klammer_inhalt = (Math.pow(K4, 2) * klammer_term2 * klammer_term3) + 1;

    return term1 * term2 * Math.pow(K4, 2) * (s / t) * klammer_inhalt;
}

// Kennlinie: K4 nach cb-Werksnorm
function calculate_K4Squared(l0, t) {

    const term_a = 20 * Math.pow((l0 - t), 2);
    const term_b = 128 * Math.pow(t, 2);
    const term_c = -1.15 * (term_a + term_b);
    
    const zaehler = -term_b + Math.sqrt(Math.pow(term_b, 2) - 4 * term_a * term_c);
    const nenner = 2 * term_a;

    return zaehler / nenner;
}


//--------------------------------------------------------------------------\\
//                          Event Listener                                        
//--------------------------------------------------------------------------\\

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Radio-Elemente "radio_12_DIN" und "radio_3_DIN"
///////////////////////////////////////////////////////////////////////////////////////////////////////////
radio_12_DIN.addEventListener('change', updateSichtbarkeit);
radio_3_DIN.addEventListener('change', updateSichtbarkeit);
radio_3_CB.addEventListener('change', updateSichtbarkeit);
radio_3_custom.addEventListener('change', updateSichtbarkeit);
radioAuswahlFederweg.addEventListener('change', updateArbeitspunktEinheiten);
radioAuswahlFederkraft.addEventListener('change', updateArbeitspunktEinheiten);


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Button "Ergebnisse anzeigen"
///////////////////////////////////////////////////////////////////////////////////////////////////////////
berechneButton.addEventListener("click", function() {
    

    // Setzt entweder den vom Nutzer gewählten Titel oder einen Default-Titel.
    const titel = eingabe_Titel.value.trim();
    ergebnisTitel.textContent = titel || "Ergebnisse";

    //===============================//
    // Alternative Materialparameter //
    //===============================//

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

    //======================//
    // Kennlinienberechnung //
    //======================//

    // Prüfvariable in Kennlinienberechnung zunächst falsch!
    let kennlinie_isValid = false;
    // Abrufen und Validieren der Eingaben.
    const da = validateAndParseInput(eingabe_Da, 'Geometrie --> De');
    const di = validateAndParseInput(eingabe_Di, 'Geometrie --> Di');
    const l0 = validateAndParseInput(eingabe_L0, 'Geometrie --> L0');
    const t = validateAndParseInput(eingabe_t, 'Geometrie --> t');

    // Array für die Kennlinien-Punkte.
    const federkennlinieData = [];

    // 1) Prüfung: welches radio-Element ist ausgewählt?
    // Für Gruppe 1&2 nach DIN:
    if (radio_12_DIN.checked) { 
                      
        // Prüfung 2: sind alle Eingaben Zahlen?                                  
        if (!isNaN(da) && !isNaN(di) && !isNaN(t) && !isNaN(l0)) {
            
            // Berechnen der konstanten Gleichungen der Kennlinienberechnung.
            h0 = calculate_h0(l0, t);
            delta = calculate_delta(da, di);
            K1 = calculate_K1(delta);

            // Prüfung 3: konnten alle Werte berechnet werden?
            if (!isNaN(h0) && !isNaN(delta) && !isNaN(K1)) {

                kennlinie_isValid = true; // Prüfvariable setzen.

                // Kennlinienberechnung von s = 0 bis s = h0.
                for (let x = 0; x <= h0; x += 0.01) {
                    
                    // Wertepaare berechnen und dem Array übergeben.
                    let y = calculate_F12(E, mu, t, K1, da, h0, x);
                    federkennlinieData.push({ x: x, y: y }); 
                }

                // Sicherstellen, dass der letzte Punkt exakt bei h0 liegt.
                if (federkennlinieData[federkennlinieData.length - 1].x < h0) {
                    let y = calculate_F12(E, mu, t, K1, da, h0, h0);
                    federkennlinieData.push({ x: h0, y: y });
                }

                // Werte bei 75 % Einfederung bestimmen.
                stapel_s_075 = 0.75 * h0;
                stapel_F_075 = calculate_F12(E, mu, t, K1, da, h0, stapel_s_075);
                // Dicke-Wert der Berechnung für später speichern.
                stapel_t = t;
            }
        }
    }
    // Für Gruppe 3 nach DIN:
    else if (radio_3_DIN.checked) { 
        
        // Abrufen und Prüfen von t_strich (=t').
        let t_strich = validateAndParseInput(eingabe_t_strich, "Geometrie --> t'");

        // Prüfung 2: sind alle Eingaben Zahlen?                
        if (!isNaN(da) && !isNaN(di) && !isNaN(t) && !isNaN(t_strich) && !isNaN(l0)) {

            // Berechnen der konstanten Gleichungen der Kennlinienberechnung.
            h0 = calculate_h0(l0, t);
            h0_strich = calculate_h0(l0, t_strich);
            delta = calculate_delta(da, di);
            c1 = calculate_c1(t_strich, t, l0);
            c2 = calculate_c2(c1, t_strich, t, l0);
            K1 = calculate_K1(delta);
            K4 = calculate_K4(c1, c2);

            if (t == t_strich) {
                alert("t ist gleich t': Entspricht einer Berechnung nach DIN Gruppe 1 und 2");
            }
                

            // Prüfung 3: konnten alle Werte berechnet werden?
            if (!isNaN(h0) && !isNaN(h0_strich) && !isNaN(delta) && !isNaN(c1) && !isNaN(c2) && !isNaN(K1) && !isNaN(K4)) {

                kennlinie_isValid = true; // Prüfvariable setzen.

                // Kennlinienberechnung von s = 0 bis s = h0.
                for (let x = 0; x <= h0; x += 0.01) {

                    // Wertepaare berechnen und dem Array übergeben.
                    let y = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, x);
                    federkennlinieData.push({ x: x, y: y }); 
                }

                // Sicherstellen, dass der letzte Punkt exakt bei h0 liegt.
                if (federkennlinieData[federkennlinieData.length - 1].x < h0) {
                    let y = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, h0);
                    federkennlinieData.push({ x: h0, y: y });
                }

                // Werte bei 75 % Einfederung bestimmen.
                stapel_s_075 = 0.75 * h0;
                stapel_F_075 = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, stapel_s_075);
                // Dicke-Wert der Berechnung für später speichern.
                stapel_t = t_strich;
            }
        }
    }
    // Für Gruppe 3 nach CB:
    else if (radio_3_CB.checked) {

        alert(`Falsches Radio`);
        return;
    }
    // Für Gruppe 3 mit Kennlinienparameter:
    else if (radio_3_custom.checked) {

        // Abrufen und Prüfen von t_strich (=t') und Kennlinienparameter
        let t_strich = t;
        let K4_parameter = validateAndParseInput(eingabe_K4, "Geometrie --> Kennlinienparameter");

        // Prüfung 2: sind alle Eingaben Zahlen?                
        if (!isNaN(da) && !isNaN(di) && !isNaN(t) && !isNaN(t_strich) && !isNaN(l0)) {

            // Berechnen der konstanten Gleichungen der Kennlinienberechnung.
            h0 = calculate_h0(l0, t);
            h0_strich = calculate_h0(l0, t_strich);
            delta = calculate_delta(da, di);
            K1 = calculate_K1(delta);
            K4 = K4_parameter / (h0_strich / t_strich);
                
            // Prüfung 3: konnten alle Werte berechnet werden?
            if (!isNaN(h0) && !isNaN(h0_strich) && !isNaN(delta) && !isNaN(K1) && !isNaN(K4)) {

                kennlinie_isValid = true; // Prüfvariable setzen.

                // Kennlinienberechnung von s = 0 bis s = h0.
                for (let x = 0; x <= h0; x += 0.01) {

                    // Wertepaare berechnen und dem Array übergeben.
                    let y = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, x);
                    federkennlinieData.push({ x: x, y: y }); 
                }

                // Sicherstellen, dass der letzte Punkt exakt bei h0 liegt.
                if (federkennlinieData[federkennlinieData.length - 1].x < h0) {
                    let y = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, h0);
                    federkennlinieData.push({ x: h0, y: y });
                }

                // Werte bei 75 % Einfederung bestimmen.
                stapel_s_075 = 0.75 * h0;
                stapel_F_075 = calculate_F3(E, mu, t_strich, K1, da, K4, h0_strich, stapel_s_075);
                // Dicke-Wert der Berechnung für später speichern.
                stapel_t = t_strich;
            }
        }
    }


    //=======================//
    // Stapeldaten einbinden //
    //=======================//

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
    stapel_h0 = stapel_i * h0; // h0 ist in beiden Fällen der maximale Federweg!
    
    // Falls bis hierhin etwas nicht geklappt hat ist Ende.
    if (kennlinie_isValid === false) {
        return;
    }


    //==============//
    // Arbeitspunkt //
    //==============//
    
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

            // Wenn die Abweichung in Prozent angegeben ist
            AP_Punkt_1 = AP + ((AP_Abweichung_1 / 100) * AP);
            AP_Array_input.push(AP_Punkt_1);

        } else {

            // Wenn die Abweichung absolut angegeben ist
            AP_Punkt_1 = AP + AP_Abweichung_1;
            AP_Array_input.push(AP_Punkt_1);
            
        }
    }
    // Für Abweichung 2:
    if (Number.isFinite(AP_Abweichung_2)) {

        if (einheit_AP_Abweichung_2.value === "percent") {

            // Wenn die Abweichung in Prozent angegeben ist
            AP_Punkt_2 = AP + ((AP_Abweichung_2 / 100) * AP);
            AP_Array_input.push(AP_Punkt_2);

        } else {

            // Wenn die Abweichung absolut angegeben ist
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
                    if (radio_12_DIN.checked) {

                        let s_einzelfeder = s_i / stapel_i; // stapel_i ist die globale Variable!
                        F_i = stapel_n * calculate_F12(E, mu, stapel_t, K1, da, h0, s_einzelfeder);

                    } else if (radio_3_DIN.checked) {

                        let s_einzelfeder = s_i / stapel_i; // stapel_i ist die globale Variable!
                        F_i = stapel_n * calculate_F3(E, mu, stapel_t, K1, da, K4, h0_strich, s_einzelfeder);

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


    //=========//
    // Ausgabe //
    //=========//

    // Test
    //ausgabe_K4.value = K4.toFixed(4);

    // Stapeldaten.
    ausgabe_stapel_L0.value = stapel_L0.toFixed(2);
    ausgabe_stapel_s_max.value = stapel_h0.toFixed(2);
    ausgabe_stapel_F_075.value = stapel_F_075.toFixed(0);
    ausgabe_stapel_s_075.value = stapel_s_075.toFixed(2);

    // Arbeitspunkte:
    // Standard: Sichtbarkeit für alle aus.
    ausgabeContainer_AP.style.display = 'none';
    ausgabeContainer_AP_Punkt1.style.display = 'none';
    ausgabeContainer_AP_Punkt2.style.display = 'none';

    // Ausgabe der berechneten Arbeitspunkte, falls vorhanden.
    // Haupt-Arbeitspunkt
    if (AP_Array_output.length > 0 && AP_Array_output[0]) {

        const correctElement = AP_Array_output[0];

        ausgabe_AP_s.value = correctElement.s.toFixed(2);
        ausgabe_AP_F.value = correctElement.F.toFixed(0);
        ausgabe_AP_s_relativ.value = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_L.value = correctElement.L.toFixed(2);

        ausgabeContainer_AP.style.display = 'block';
    }

    // Arbeitspunkt - Abweichung 1
    if (AP_Array_output.length > 1 && AP_Array_output[1]) {

        const correctElement = AP_Array_output[1];

        ausgabe_AP_Punkt1_s.value = correctElement.s.toFixed(2);
        ausgabe_AP_Punkt1_F.value = correctElement.F.toFixed(0);
        ausgabe_AP_Punkt1_s_relativ.value = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_Punkt1_L.value = correctElement.L.toFixed(2);

        ausgabeContainer_AP_Punkt1.style.display = 'block';
    }

    // Arbeitspunkt - Abweichung 2
    if (AP_Array_output.length > 2 && AP_Array_output[2]) {

        const correctElement = AP_Array_output[2];

        ausgabe_AP_Punkt2_s.value = correctElement.s.toFixed(2);
        ausgabe_AP_Punkt2_F.value = correctElement.F.toFixed(0);
        ausgabe_AP_Punkt2_s_relativ.value = correctElement.s_relativ.toFixed(0);
        ausgabe_AP_Punkt2_L.value = correctElement.L.toFixed(2);

        ausgabeContainer_AP_Punkt2.style.display = 'block';
    }


    //=========//
    // Plotten //
    //=========//

    // Holt das canvas-Element und gibt ihm eine 2D-Logik.
    const ctx = plotCanvasElement.getContext('2d');

    // Löscht ein eventuell bereits vorhandenes Diagramm.
    if (myChart) {
        myChart.destroy();
    }

    // Datensätze für das Diagramm:

    // Datensatz für die Kennlinie.
    let chartDatasets = [{
        label: `Federkennlinie`,
        data: federkennlinieData,
        type: 'line',
        borderColor: '#707070',
        tension: 0.1,
        fill: false,
        pointRadius: 0, // Es werden keine einzelnen Punkt angezeigt.
        pointHitRadius: 5, // Radius in dem ein Punkt auf die Maus reagiert.
        pointHoverRadius: 0,
    }];

    // Prüfpunkt.
    chartDatasets.push({
        label: 'Prüfpunkt',
        data: [{ x: stapel_s_075, y: stapel_F_075 }],
        type: 'scatter',
        backgroundColor: '#707070',
        pointRadius: 7,
        pointHitRadius: 10,
    });

    // Arbeitspunkte, falls vorhanden.
    
    // Stile für die drei Punkte
    const apPunktStyles = [
        { label: 'Arbeitspunkt', color: 'green' },
        { label: 'Abweichung 1', color: 'orange' },
        { label: 'Abweichung 2', color: 'red' },
    ];

    // Falls ein Punkt im output Array ist, wird er hinzugefügt.
    AP_Array_output.forEach((apPunkt, index) => {
        if (apPunkt) {
            chartDatasets.push({
                label: apPunktStyles[index] ? apPunktStyles[index].label : `Punkt ${index + 1}`,
                data: [{ x: apPunkt.s, y: apPunkt.F }],
                type: 'scatter',
                backgroundColor: apPunktStyles[index] ? apPunktStyles[index].color : 'rgb(0,0,0)',
                pointRadius: 7,      
                pointHitRadius: 10,
            });
        }
    });


    // --- ERSTELLEN DES DIAGRAMMS MIT ALLEN VORBEREITETEN DATENSÄTZEN ---

    // Globale Schriftart für den gesamten Chart festlegen
    Chart.defaults.font.family = "'Noto Sans', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#333';

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: chartDatasets
        },

        options: {
            // responsive: true sorgt dafür, dass sich der Chart an die Containergröße anpasst.
            // maintainAspectRatio: false erlaubt dem Chart, das Seitenverhältnis zu ändern, um den Container auszufüllen.
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                x: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Federweg s / mm',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#e0e0e0',
                    },
                    border: {
                        color: '#333',
                        dash: [5, 5]
                    },
                },
                y: {
                    type: 'linear',
                    title: {
                        display: true,
                        text: 'Federkraft F / N',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: '#e0e0e0',
                    },
                    border: {
                        color: '#333',
                        dash: [5, 5]
                    },
                },
            },
            
            // Konfiguration der Plugins (Legende, Tooltip, etc.)
            plugins: {
                // Legenden-Einstellungen
                legend: {
                    position: 'bottom', // Positioniert die Legende unter dem Chart
                    labels: {
                        usePointStyle: true, // Verwendet den Punkt-Stil (z.B. Kreis) anstelle eines Rechtecks
                        padding: 20, // Mehr Abstand
                        font: {
                            size: 12
                        }
                    }
                },
                // Tooltip-Einstellungen (was beim Hovern über einem Punkt angezeigt wird)
                tooltip: {
                    enabled: true,
                    mode: 'nearest',
                    intersect: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleAlign: 'right', 
                    titleFont: {
                        size: 14,
                        weight: 'regular',
                    },
                    bodyFont: {
                        size: 14,
                        weight: 'regular',
                    },
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: true,
                    
                    // Callback, um den Tooltip-Text anzupassen
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                // Fügt Einheiten hinzu und formatiert die Zahlen
                                label += `${context.parsed.y.toFixed(0)} N`;
                            }
                            return label;
                        },
                        title: function(context) {
                            // Fügt die Einheit "mm" zum Titel (X-Achsenwert) hinzu
                            return `Federweg: ${context[0].parsed.x.toFixed(2)} mm`;
                        }
                    }
                }
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
// Button "Zurück zur Eingabe"
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
// Button "Neue Berechnung"
///////////////////////////////////////////////////////////////////////////////////////////////////////////
neueBerechnungButton.addEventListener("click", function() {

    location.reload(); // Lädt die gesamte Seite neu, um alle Felder und den Zustand zurückzusetzen.;

    // Folgender Code leert alle Eingaben explizit, da die meisten Browser "Autofill" oder "Form Data Persistence" nutzen um Eingaben auch nach dem neu Laden zu erhalten. Kann sein, dass es nicht funktioniert.
    
    // Liste mit den Feldern zum leeren.
    const inputFieldsToClear = [
        eingabe_Titel,
        eingabe_Da,
        eingabe_Di,
        eingabe_t,
        eingabe_t_strich,
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

    radio_12_DIN.checked = true;
    radio_3_DIN.checked = false;
    radio_3_CB.checked = false;
    radio_3_custom.checked = false;
    radioAuswahlFederweg.checked = true;
    radioAuswahlFederkraft.checked = false;

    updateSichtbarkeit();
    updateArbeitspunktEinheiten()
});



//--------------------------------------------------------------------------\\
//                    Automatische Aktionen beim Laden                                        
//--------------------------------------------------------------------------\\

updateSichtbarkeit();
updateArbeitspunktEinheiten();