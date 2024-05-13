const SprZug = [
    [2, 1],
    [1, 2],
    [-2, 1],
    [-1, 2],
    [-2, -1],
    [-1, -2],
    [2, -1],
    [1, -2]
];
const Figuren = "kqrbnp";
const Farben = "wb";

function init() {
    let hFeld = new Array(8);
    for (let i = 0; i < hFeld.length; i++) {
        hFeld[i] = new Array(8);
    }
    for (let i = 0; i < 8; i++) {
        for (let jj = 0; jj < 8; jj++) {
            hFeld[i][jj] = "ll";
        }
    }
/* Matt in 1 mit Umwandlung
    hFeld[1][0] = "wp";
    hFeld[2][6] = "wk";
    hFeld[0][7] = "bk";*/

// das Matt in 3
   hFeld[6][5] = "wk";
   hFeld[2][7] = "wb";
   hFeld[4][6] = "wp";
   hFeld[0][3] = "wr";
   hFeld[4][4] = "bk";
   hFeld[3][4] = "bp";
   hFeld[1][4] = "bp";

    /* das Matt in 6
    hFeld[2][6] = "wk";
    hFeld[1][7] = "wn"; 
    hFeld[5][0] = "wp";
    hFeld[0][7] = "bk";*/

    return hFeld;
} 
function Loesen() {
    document.getElementById("p1").innerText = "";
    let stell1 = new Stellung(sFeld, 'w', 1, "ZF:");
    let currentTime = new Date();
    stell1.Stell2();
    document.getElementById("p1").innerText = "V" + AnzVar + document.getElementById("p1").innerText;
    stell1.MattAnzeigen();
    document.getElementById("p1").innerText += "T" + (new Date() - currentTime).toString() + "ms";
    document.getElementById("p1").innerText += "\n" + "F";
    document.getElementById("p1").innerText += "\n" + "F";
    document.getElementById("p1").innerText += "\n" + "F";
    document.getElementById("p1").innerText += "\n" + "F";
    document.getElementById("p1").innerText += "\n" + "F";
}
function Leeren() {
    for (let jj = 0; jj < 8; jj++) {
        for (let ii = 0; ii < 8; ii++) {
            sFeld[jj][ii] = "ll";
        }
    }
    IMGFill();
    FIGIMGFill();
}
function IMGFill() {
    document.getElementById("ctest").replaceChildren();    
    for (let jj = 0; jj < 8; jj++) {
        for (let i = 0; i < 8; i++) {
            para = document.createElement("img");
            hs = "figuren\\" + sFeld[jj][i] + ".png";
            para.src = hs;
            if ((i + jj) % 2 == 1)
                para.style.backgroundColor = 'sienna';
            else
                para.style.backgroundColor = 'lightgray';
            z = i + jj * 8;
            para.id = "ID" + z;
            para.onclick = function () { f1(jj, i) };
            para.style.position = "absolute";
            para.style.top = 50 * jj + "px"
            para.style.left = 50 * i + "px";
            document.getElementById("ctest").appendChild(para);
        }
    }
}
function FIGIMGFill() {
    // Auswahl Figuren
    for (let jj = 0; jj < 2; jj++) {
        for (let ii = 0; ii < 6; ii++) {
            para = document.createElement("img");
            hs = "figuren\\" + Farben[jj] + Figuren[ii] + ".png";
            para.src = hs;
            para.style.backgroundColor = 'lightgray';
            para.id = "FIGID" + jj + ii;
            para.onclick = function () { f2(jj, ii) };
            para.style.position = "absolute";
            para.style.top = 410 + 50 * jj + "px"
            para.style.left = 50 * ii + "px";
            document.getElementById("ctest").appendChild(para);
        }
    }
    if (FSmarkyy != -1) 
        document.getElementById("FIGID" + FSmarkyy + FSmarkxx).style.backgroundColor = 'yellow';

}
function f1(yy,xx) {
    sFeld[yy][xx] = "ll";    
    if (FSmarkxx != -1) {
        let hs = Farben[FSmarkyy] + Figuren[FSmarkxx];
        sFeld[yy][xx] = hs;
    }
    IMGFill();
    FIGIMGFill();
}

function f2(yy, xx) {
    if (FSmarkyy == -1) {
        FSmarkyy = yy;
        FSmarkxx = xx;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'yellow';
    }
    else if (FSmarkxx == xx && FSmarkyy == yy) {
        FSmarkyy = -1;
        FSmarkxx = -1;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'lightgray';
    }
    else {
        document.getElementById("FIGID" + FSmarkyy + FSmarkxx).style.backgroundColor = 'lightgray';
        FSmarkyy = yy;
        FSmarkxx = xx;
        document.getElementById("FIGID" + yy + xx).style.backgroundColor = 'yellow';
    } 
}
function onch()
{
    //MattNachTeilzuegen = document.getElementById("MattIn")*2;
    let ss = document.getElementById("MattIn").value;
    MattNachTeilzuegen = 2 * ss[1];
}
function FeldaufBrett3(xy, v1, v2) {
    if (xy[0] + v1 < 0 || xy[0] + v1 > 7)
        return false;

    if (xy[1] + v2 < 0 || xy[1] + v2 > 7)
        return false;

    return true;
}

function FeldaufBrett2(v1, v2) {
    if (v1 < 0 || v1 > 7)
        return false;

    if (v2 < 0 || v2 > 7)
        return false;

    return true;
}

//*****************Main Prozedur **********************/

// SFeld 8 x 8 initialisieren mit "l"  (leer) für Farbe und "l" für Figur
//<div id="ctest" onclick="f1(2)">
let sFeld = init()

// die 64 img-Felder erstellen und füllen mit sFeld
let AnzVar = 0;
let MattNachTeilzuegen = 4;
let NurSolangeNotwendig = true;
let FSmarkyy = -1;
let FSmarkxx = -1;
document.getElementById("MattIn").value = "M" + MattNachTeilzuegen / 2;

IMGFill();
FIGIMGFill();


