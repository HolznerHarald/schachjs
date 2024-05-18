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
//Matt in 1 mit Umwandlung
    hFeld[1][0] = "wp";
    hFeld[2][6] = "wk";
    hFeld[0][7] = "bk";

/* das Matt in 3
   hFeld[6][5] = "wk";
   hFeld[2][7] = "wb";
   hFeld[4][6] = "wp";
   hFeld[0][3] = "wr";
   hFeld[4][4] = "bk";
   hFeld[3][4] = "bp";
   hFeld[1][4] = "bp";*/

/* das Matt in 6
    hFeld[2][6] = "wk";
    hFeld[1][7] = "wn"; 
    hFeld[5][0] = "wp";
    hFeld[0][7] = "bk";*/
/*
    hFeld[0][0] = "wk";
    hFeld[0][1] = "wn";
    hFeld[1][0] = "bk";
    hFeld[1][1] = "bn";*/

    return hFeld;
} 
function Loesen() {
    Fehlerhaft = false;
    AnzLoesungen = 0;
    AnzVar = 0;
    document.getElementById("p1").innerText = "";
    let stell1 = new Stellung(sFeld, 'w', 1, "ZF:");
    let currentTime = new Date();
    
    stell1.Stell2();
    if (Fehlerhaft)
        return;
    document.getElementById("p1").innerText = "Berechnete Varianten:" + AnzVar + document.getElementById("p1").innerText;
    stell1.MattAnzeigen();

    document.getElementById("p1").innerText = "Anzahl L\u00f6sungen:" + AnzLoesungen + "\n" + document.getElementById("p1").innerText;

    document.getElementById("p1").innerText += "\n" + "Rechenzeit:" + (new Date() - currentTime).toString() + "ms";
    //document.getElementById("p1").innerText += "\n" + "F";
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
            para.style.width = (BrettHW / 8) + "px";
            para.style.height = (BrettHW / 8) + "px";
            para.style.position = "absolute";
            para.style.top = (BrettHW/8) * jj + "px"
            para.style.left = (BrettHW / 8) * i + "px";
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
            para.style.width = (BrettHW / 8) + "px";
            para.style.height = (BrettHW / 8) + "px";
            para.style.position = "absolute";
            para.style.top = BrettHW*1.01 + (BrettHW / 8) * jj + "px"
            para.style.left = (BrettHW / 8) * ii + "px";
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
function handleClick(cb) {
    if (cb.checked)
        NurSolangeNotwendig = true;  
    else
        NurSolangeNotwendig = false ; 
    //document.getElementById("p1").innerText = "Clicked, new value = " + cb.checked;
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
let Hoehe = window.innerHeight;   // clientHeight ohne horizontale scrollbar 
let Weite = window.innerWidth;
let BrettHW = Math.min(Hoehe / 2, Weite); 
let hss = (BrettHW / 20) + "px";
let hww = BrettHW * 0.27 + "px";

document.getElementById("container").style.position = "absolute";
document.getElementById("container").style.top = BrettHW * 1.02 + (BrettHW / 8) * 2 + "px";
document.getElementById("container").style.left = "0px";
document.getElementById("c2i").style.position = "absolute";
document.getElementById("c2i").style.top = (BrettHW / 8) + BrettHW * 1.02 + (BrettHW / 8) * 2 + "px";
document.getElementById("c2i").style.left = "0px";
document.getElementById("p1").style.position = "absolute";
document.getElementById("p1").style.top = (BrettHW / 6) + BrettHW * 1.02 + (BrettHW / 8) * 2 + "px";
document.getElementById("p1").style.left = "0px";
document.getElementById("p1").style.width = BrettHW + "px";
document.getElementById("p1").style.height = BrettHW / 2 + "px";

document.getElementById("p1").style.fontSize = hss;
document.getElementById("Leeren").style.fontSize = hss;
document.getElementById("Leeren").style.width = hww;
document.getElementById("Loesen").style.fontSize = hss;
document.getElementById("Loesen").style.width = hww;
document.getElementById("MattIn").style.fontSize = hss;
document.getElementById("MattIn").style.width = BrettHW * 0.38 + "px";
document.getElementById("c2i").style.fontSize = hss;
document.getElementById("c2").style.width = hss;
document.getElementById("c2").style.height = hss;

// SFeld 8 x 8 initialisieren mit "l"  (leer) für Farbe und "l" für Figur
//<div id="ctest" onclick="f1(2)">
let sFeld = init()

// die 64 img-Felder erstellen und füllen mit sFeld
let Fehlerhaft = false;
let AnzLoesungen = 0;
let AnzVar = 0;
let MattNachTeilzuegen = 4;
let NurSolangeNotwendig = true;
let FSmarkyy = -1;
let FSmarkxx = -1;
document.getElementById("MattIn").value = "M" + MattNachTeilzuegen / 2;

//document.getElementsByTagName('img').style.width = BrettHW / 8 + "px";
//document.getElementsByTagName('img').style.height = "20px";

IMGFill();
FIGIMGFill();


