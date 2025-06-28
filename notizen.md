# HTML

## Wichtige HTML-Tags

### Strukturelle und interaktive Elemente

Diese Tags werden verwendet, um die Struktur einer Webseite zu definieren und interaktive Elemente bereitzustellen.

- `<div>` 
    - Ein generischer Block-Level-Container, der oft für die Gruppierung von Inhalten zu Layoutzwecken verwendet wird.

    ```html
    <div>
        <h2>Dies ist ein Abschnitt</h2>
        <p>Einige Inhalte hier.</p>
    </div>
    ```

- `<span>`
    - Ein generischer Inline-Container, der oft für die Gruppierung von Inhalten zu Styling-Zwecken (z.B. mit CSS) verwendet wird, ohne einen Zeilenumbruch zu erzeugen.

    ```html
    <p>Dieser Text enthält einen <span>hervorgehobenen</span> Bereich.</p>
    ```

- `<input>`
    - Ein vielseitiges Element zum Erstellen interaktiver Steuerelemente in Webformularen. Der Typ des Inputs wird durch das `type`-Attribut bestimmt.

    ```html
    <label for="username">Benutzername:</label>
    <input type="text" id="username" name="username">
    ```

- `<input type="radio">`
    - Ein spezieller Typ von `input` für Radio-Buttons, die es dem Benutzer ermöglichen, eine einzelne Option aus einer Gruppe auszuwählen.

    ```html
    <input type="radio" id="html" name="fav_language" value="HTML">
    <label for="html">HTML</label><br>
    <input type="radio" id="css" name="fav_language" value="CSS">
    <label for="css">CSS</label>
    ```

- `<button>`
    - Ein klickbares Element, das für Formularübermittlungen, Skript-Triggern oder einfach als interaktives Element verwendet wird.

    ```html
    <button type="button">Klicken Sie mich!</button>
    ```

- `<a>`
    - Erstellt einen Hyperlink zu anderen Webseiten, Dateien, Orten innerhalb derselben Seite oder E-Mail-Adressen.

    ```html
    <a href="[https://www.example.com](https://www.example.com)">Besuchen Sie Example.com</a>
    ```

- `<img>`
    - Bettet ein Bild in das Dokument ein. Benötigt das `src`-Attribut für den Pfad zur Bilddatei.

    ```html
    <img src="bild.jpg" alt="Beschreibung des Bildes">
    ```

- `<form>`
    - Definiert ein HTML-Formular zur Eingabe von Benutzerdaten.

    ```html
    <form action="/submit-form" method="post">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
        <input type="submit" value="Senden">
    </form>
    ```

- `<label>`
    - Definiert eine Beschriftung für ein `input`-Element. Erhöht die Zugänglichkeit, indem es die Beschriftung mit dem entsprechenden Eingabefeld verknüpft.

    ```html
    <label for="email">E-Mail:</label>
    <input type="email" id="email" name="email">
    ```

- `<textarea>`
    - Erstellt ein mehrzeiliges Texteingabefeld.

    ```html
    <label for="message">Nachricht:</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea>
    ```

- `<select>` und `<option>`
    - Erstellt eine Dropdown-Liste. `<select>` ist der Container, und jedes `<option>` stellt eine wählbare Option dar.

    ```html
    <label for="fruits">Wählen Sie eine Frucht:</label>
    <select id="fruits" name="fruits">
        <option value="apfel">Apfel</option>
        <option value="banane">Banane</option>
        <option value="orange">Orange</option>
    </select>
    ```

- `<ul>` und `<li>`
    - `<ul>` definiert eine ungeordnete (ungeordnete) Liste, und jeder Listenpunkt wird durch `<li>` dargestellt.

    ```html
    <ul>
        <li>Erster Punkt</li>
        <li>Zweiter Punkt</li>
    </ul>
    ```

- `<ol>` und `<li>`
    - `<ol>` definiert eine geordnete (nummerierte) Liste, und jeder Listenpunkt wird durch `<li>` dargestellt.

    ```html
    <ol>
        <li>Erster nummerierter Punkt</li>
        <li>Zweiter nummerierter Punkt</li>
    </ol>
    ```

---

### Formatierung und semantische Tags

Diese Tags werden verwendet, um Text zu formatieren oder die semantische Bedeutung von Inhalten zu kennzeichnen.

- `<strong>`
    - Zeigt an, dass der Inhalt eine starke Bedeutung hat oder wichtig ist, was standardmäßig als Fettdruck gerendert wird.

    ```html
    <p>Das ist ein <strong>sehr wichtiger</strong> Hinweis.</p>
    ```

- `<em>`
    - Betont den Inhalt, was standardmäßig als Kursivschrift gerendert wird.

    ```html
    <p>Ich fühle mich <em>wirklich</em> gut heute.</p>
    ```

- `<h1>` bis `<h6>`
    - Überschriften-Tags, wobei `<h1>` die höchste und `<h6>` die niedrigste Hierarchieebene darstellt.

    ```html
    <h1>Hauptüberschrift</h1>
    <h2>Unterüberschrift</h2>
    ```

- `<p>`
    - Definiert einen Textabsatz.

    ```html
    <p>Dies ist ein einfacher Absatz.</p>
    ```

- `<br>`
    - Erzeugt einen Zeilenumbruch. Es ist ein selbstschließendes Tag.

    ```html
    <p>Erste Zeile<br>Zweite Zeile</p>
    ```

- `<hr>`
    - Erzeugt eine thematische Trennlinie oder einen horizontalen Strich. Es ist ein selbstschließendes Tag.

    ```html
    <p>Oben</p>
    <hr>
    <p>Unten</p>
    ```

- `<code>`
    - Repräsentiert einen Code-Abschnitt. Wird oft in Kombination mit `<pre>` verwendet, um Codeblöcke darzustellen.

    ```html
    <p>Die Funktion ist <code>console.log()</code>.</p>
    ```

- `<pre>`
    - Definiert vorformatierten Text. Der Text darin wird in der Regel in einer nicht-proportionalen (Monospace-)Schriftart dargestellt und Leerzeichen und Zeilenumbrüche werden beibehalten.

    ```html
    <pre>
        function greet() {
            console.log("Hallo Welt!");
        }
    </pre>
    ```

- `<b>`
    - Macht den Text fett, ohne eine besondere semantische Bedeutung hervorzuheben. Verwende `<strong>` für semantische Bedeutung.

    ```html
    <p>Dieser Text ist <b>fettgedruckt</b>.</p>
    ```

- `<i>`
    - Macht den Text kursiv, ohne eine besondere semantische Bedeutung hervorzuheben. Verwende `<em>` für semantische Bedeutung.

    ```html
    <p>Dieser Text ist <i>kursiv</i>.</p>
    ```

---

# CSS
## Größendefinition
box-sizing gilt für alle Elemente die nicht explizit anders definiert werden.
Bei box-sizing gelten width & height für die gesamte Box bis ans Ende der Randlinie.
Eine Box besteht aus
- Inhalt
- Padding (der Abstand vom Inhalt zum Rand)
- Border (Randlinie)
    
## Größeneinheiten:
- Pixel (px) ist ein absolutes Maß. Je nach Auflösung des Bildschirms entspricht 1 px unterschiedlich vielen physischen Pixeln.
- Prozent (%) bezieht sich auf die Größe des direkten Elternelements im HTML-Code.
- Viewport width (vw) bezieht sich auf den sichtbare Breite des Browsers. 1vm ist 1% dieses Bereichs.
- Viewport height (vh) ist dasselbe für die sichtbare Höhe. 

## Darstellung eines Elements
`display: ...`
- `block;` | Element nimmt die gesamte, vefügbare Breite ein mit Zeilenumbruch davor und danach.
- `inline;` | Element ist nur so groß wie sein Inhalt.
- `inline-block;` | block-Element ABER ohne Zeilenumbruch.
- `flex;` | block-Element ABER kann seinen Inhalt flexibel anordnen!             
    - `flex-direction: row; (= Standard) / column` | Bestimmt die Hauptachse und damit die Ausrichtung des Inhalts.
    - `justify-content: center; / ...` | Bestimmt die Paltzierung des Inhalts für die Hauptachse.
    - `align-items: center; / ...` | Bestimmt die Platzierung des Inhalts quer zur Hauptachse.
    - ...
- `inline-flex;` | inline-Element ABER kann seinen Inhalt flexibel anordnen! 

---

# JavaScript
## Variablen
- `const XY = 5;` | Variable kann nicht neu definiert werden. Ihr Inhalt kann trotzdem verändert werden, z.B. bei einem Array.
- `let YX` | Variable kann neu definiert werden.
