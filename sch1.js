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
    hFeld[1][0] = "wp";
    hFeld[4][6] = "wk";
    //hFeld[3][6] = "bb";
    hFeld[2][6] = "bk";
    
    return hFeld;
} 

function IMGFill() {
    for (let jj = 0; jj < 8; jj++) {
        for (let i = 0; i < 8; i++) {
            para = document.createElement("img");

            hs = "figuren\\" + sFeld[jj][i] + ".png";
            para.src = hs;
            if ((i + jj) % 2 == 1)
                para.style.backgroundColor = "#FFFF00";
            else
                para.style.backgroundColor = "#FF0000";

            //para.style.backgroundColor = "#FFFF00";
            z = i + jj * 8;
            para.id = "ID" + z;
            //geht net: para.onclick = f1(i+jj);
            // geht: para.onclick = function () {document.getElementById("p1").innerHTML = i;};
            para.onclick = function () { f1(i, jj) };
            para.style.position = "absolute";
            para.style.top = 50 * jj + "px"
            para.style.left = 50 * i + "px";
            document.getElementById("ctest").appendChild(para);
        }
    }
}

function f1(x,y) {
	document.getElementById("p1").innerHTML = x + " " + y;
	z = 8 * y + x;
	document.getElementById("ID"+z).style.backgroundColor = "#000000";
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
IMGFill();

st1 = new Stellung(sFeld, 'w', 1, "ZF:");


//TestAusgabe in p1
//document.getElementById("p1").innerText = st1.Gegner;



/*weiss und schawarz Array mit 16 Feldern initialisieren mit "0" für Figur und  0,0 für Position
wFig = [["0", 0, 0]];
sFig = [["0", 0, 0]];
ff = ["0", 0, 0];
for (var i = 0; i < 15; i++) {
    wFig.push(ff);
    sFig.push(ff);
}
// Stellung initialisieren
var Stell1 = [["b", 1, 1], ["b", 8, 1]];
wFig = Stell1;

// sFeld mit weissen und schwarzen Figuren füllen
for (var ii = 0; ii < wFig.length; ii++) {
    if (wFig[ii][0] != "l" && wFig[ii][1] != 0 && wFig[ii][2] != 0) {
        sFeld[wFig[ii][1] - 1][wFig[ii][2] - 1][0] = "w";
        sFeld[wFig[ii][1] - 1][wFig[ii][2] - 1][1] = wFig[ii][0];
    }
}
for (var ii = 0; ii < wFig.length; ii++) {
    if (sFig[ii][0] != "l" && sFig[ii][1] != 0 && sFig[ii][2] != 0) {
        sFeld[sFig[ii][1] - 1][sFig[ii][2] - 1][0] = "w";
        sFeld[sFig[ii][1] - 1][sFig[ii][2] - 1][1] = sFig[ii][0];
    }
}*/


//document.getElementById("p1").innerText = wFig[0][2];


            //Test
           // document.getElementById("ID1").style.backgroundColor = "#FFFFFF";



