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


# JavaScript
## Variablen
- `const XY = 5;` | Variable kann nicht neu definiert werden. Ihr Inhalt kann trotzdem verändert werden, z.B. bei einem Array.
- `let YX` | Variable kann neu definiert werden.
