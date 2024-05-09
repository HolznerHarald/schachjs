// JavaScript source code
class Stellung {
    constructor(Feld, AmZug, eben, sZug, MW) {
        this.wk = [-1, -1];
        this.bk = [-1, -1];
        this.ek = [-1, -1];
        this.lZuege=[];
                
        document.getElementById("p1").innerText += eben +" ";
      //  document.getElementById("p1").innerText += "constructor";

        this.MW = MW;
        this.Feld = Feld;
        this.AmZug = AmZug;
        this.Zugfolge = sZug;
        if (AmZug === 'w')
            this.Gegner = 'b';
        else
            this.Gegner = 'w';
        this.Ebene = eben;

        if (!this.feldcheck())
            return;

        if (AmZug === 'w')
            this.ek = this.wk;
        else
            this.ek = this.bk;

        this.FindeZuege();
        this.LoescheUngueltige();
        document.getElementById("p1").innerHTML += " " + this.lZuege.length;
    }

    feldcheck() {
        for (let ii = 0; ii < 8; ii++) {
            for (let jj = 0; jj < 8; jj++) {
                if (this.Feld[ii][jj] === "ll") {
                    continue;
                } else if (this.Feld[ii][jj][0] == "w" || this.Feld[ii][jj][0] == "b"){
                    let validPieces = "r,n,b,k,q,p";
                    if (validPieces.indexOf(this.Feld[ii][jj][1]) < 0) {
                        document.getElementById("p1").innerText  += "Error1 Field:" + ii.toString() + jj.toString();
                        return false;
                    }
                } else {
                    document.getElementById("p1").innerText  += "Error2 Field:" + ii.toString() + jj.toString();
                    return false;
                }
                if (this.Feld[ii][jj] === "wk") {
                    if (this.wk[0] > -1) {
                        document.getElementById("p1").innerText += "Error3 Field 2. König:" + ii.toString() + jj.toString();
                        return false;
                    } else {
                        this.wk[0] = ii;
                        this.wk[1] = jj;
                    }
                }
                if (this.Feld[ii][jj] === "bk") {
                    if (this.bk[0] > -1) {
                        document.getElementById("p1").innerText  += "Error4 Field 2. König:" + ii.toString() + jj.toString();
                        return false;
                    } else {
                        this.bk[0] = ii;
                        this.bk[1] = jj;
                    }
                }
            }
        }

        if (this.wk[0] < 0 || this.bk[0] < 0) {
            document.getElementById("p1").innerText += "Koenig fehlt";
            return false;
        }
        return true;
    }

    FindeZuege() {
        let hk = [-1, -1];
        if (this.AmZug == 'w') {
            hk = this.bk;
        } else {
            hk = this.wk;
        }

        if (this.feldImSchach(hk, this.AmZug, this.Feld)) {
            document.getElementById("p1").innerText += "Opponent's king is already in check";
            return false;
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.Feld[i][j][0] == this.AmZug) {
                    this.hFindeZuege(i, j);                    
                }
            }
        }
        return true;
    }

    feldImSchach(xy, durchwen, Feld) {
    if (this.KK(xy, durchwen, Feld))
        return true;
    if (this.NN(xy, durchwen, Feld))
        return true;
    if (this.PP(xy, durchwen, Feld))
        return true;
    if (this.QRB(xy, durchwen, Feld))
        return true;

    return false;
    }

    KK(xy, durchwen, Feld) {
        let hs = durchwen + "k";   //König
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii == 0 && jj == 0)
                    continue;

                if (FeldaufBrett3(xy, ii, jj)) {
                    if (Feld[xy[0] + ii][xy[1] + jj] == hs)
                        return true;
                }
            }
        }
        return false;
    }

    NN(xy, durchwen, Feld) {
    let hs = durchwen + "n";   // Knight
    for (let ii = 0; ii < 8; ii++) {
        if (FeldaufBrett3(xy, SprZug[ii][0], SprZug[ii][1])) {
            if (Feld[xy[0] + SprZug[ii][0]][xy[1] + SprZug[ii][1]] == hs)
                return true;
        }
    }
    return false;
    }

    PP(xy, durchwen, Feld) {
        let hs = durchwen + "p";
        if (durchwen === 'w') {
            if (FeldaufBrett3(xy, 1, -1)) {
                if (Feld[xy[0] + 1][xy[1] - 1] === hs) {
                    return true;
                }
            }
            if (FeldaufBrett3(xy, 1, 1)) {
                if (Feld[xy[0] + 1][xy[1] + 1] === hs) {
                    return true;
                }
            }
        } else {
            if (FeldaufBrett3(xy, -1, -1)) {
                if (Feld[xy[0] - 1][xy[1] - 1] === hs) {
                    return true;
                }
            }
            if (FeldaufBrett3(xy, -1, 1)) {
                if (Feld[xy[0] - 1][xy[1] + 1] === hs) {
                    return true;
                }
            }
        }
        return false;
    } 

    QRB(xy, durchwen, Feld) {
        if (this.hQRB(xy, durchwen, Feld, 1, 0))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 1, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 0, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, 1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, 0))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, -1, -1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 0, -1))
            return true;
        else if (this.hQRB(xy, durchwen, Feld, 1, -1))
            return true;

        return false;
    }

    hQRB(xy, durchwen, Feld, ry, rx) {
        let sQ = durchwen + "q";
        let sR = durchwen + "r";
        let sB = durchwen + "b";

        for (let ii = 1; ii < 8; ii++) {
            if (!FeldaufBrett3(xy, ii * ry, ii * rx))
                break;
            if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === "ll")
                continue;

            if (Math.abs(ry) === Math.abs(rx)) {  // Q B
                if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sQ ||
                    Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sB)
                    return true;
            } else {   // Q R
                if (Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sQ ||
                    Feld[xy[0] + ii * ry][xy[1] + ii * rx] === sR)
                    return true;
            }
            break;
        }
        return false;
    }

    hFindeZuege(ii, jj) {
        if (this.Feld[ii][jj][1] == 'p') {   //Pawn
            this.BauernZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'r') {   //Rook
            this.TurmZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'b') {   //Bishop
            this.LaeuferZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'q') {   //Queen
            this.TurmZuege(ii, jj);
            this.LaeuferZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'n') {   //Knight
            this.SpringerZuege(ii, jj);
        } else if (this.Feld[ii][jj][1] == 'k') {   //King
            this.KoenigZuege(ii, jj);
        }
    }

    BauernZuege(ii, jj) {
        var hZug;

        var Richtung = 0;
        if (this.AmZug == 'w')
            Richtung = -1;
        else
            Richtung = 1;

        if (this.Feld[ii + Richtung][jj] == "ll") {
            hZug = [ii, jj, ii + Richtung, jj];  //umwandeln mit 9
            this.AddMitUmwandeln(hZug);
        }
        if ((this.AmZug == 'w' && ii == 6) || (this.AmZug == 'b' && ii == 1)) {
            if (this.Feld[ii + Richtung][jj] == "ll" && this.Feld[ii + 2 * Richtung][jj] == "ll") {
                hZug = [ii, jj, ii + 2 * Richtung, jj];
                this.lZuege.push(hZug);
            }
        }
        if (jj > 0 && this.Feld[ii + Richtung][jj - 1][0] == this.Gegner) {
            hZug = [ii, jj, ii + Richtung, jj - 1];
            this.AddMitUmwandeln(hZug);
        }
        if (jj < 7 && this.Feld[ii + Richtung][jj + 1][0] == this.Gegner) {
            hZug = [ii, jj, ii + Richtung, jj + 1];
            this.AddMitUmwandeln(hZug);
        }
    }
    AddMitUmwandeln(hZug) {
    if (hZug[2] == 0 || hZug[2] == 7) {
        for (let ii = 1; ii < 5; ii++) {
            let h2Zug = [hZug[0], hZug[1], hZug[2], hZug[3], ii];
            this.lZuege.push(h2Zug);
        }
    } else {
        this.lZuege.push(hZug);
    }
}

    LaeuferZuege(yy, xx) {
        this.hTurmZuege(yy, xx, 1, 1);
        this.hTurmZuege(yy, xx, -1, 1);
        this.hTurmZuege(yy, xx, 1, -1);
        this.hTurmZuege(yy, xx, -1, -1);
    }

    TurmZuege(yy, xx) {
        this.hTurmZuege(yy, xx, 1, 0);
        this.hTurmZuege(yy, xx, -1, 0);
        this.hTurmZuege(yy, xx, 0, 1);
        this.hTurmZuege(yy, xx, 0, -1);
    }

    hTurmZuege(yy, xx, ry, rx) {
        for (let ii = 1; ii < 8; ii++) {
            if (!FeldaufBrett2(yy + ii * ry, xx + ii * rx)) {
                break;
            }
            if (this.Feld[yy + ii * ry][xx + ii * rx][0] == 'l' ||
                this.Feld[yy + ii * ry][xx + ii * rx][0] == this.Gegner) {
                let hZug = [yy, xx, yy + ii * ry, xx + ii * rx];
                this.lZuege.push(hZug);
            }
            if (this.Feld[yy + ii * ry][xx + ii * rx][0] != 'l') {
                break;
            }
        }
    }

    SpringerZuege(yy, xx) {
        for (let ii = 0; ii < 8; ii++) {
            if (FeldaufBrett3([yy, xx], SprZug[ii][0], SprZug[ii][1])) {
                let hf = this.Feld[yy + SprZug[ii][0]][xx + SprZug[ii][1]];
                if (hf === "ll" || hf[0] === Gegner) {
                    let hZug = [yy, xx, yy + SprZug[ii][0], xx + SprZug[ii][1]];
                    this.lZuege.push(hZug);
                }
            }
        }
    }

    KoenigZuege(yy, xx) {
        for (let ii = -1; ii <= 1; ii++) {
            for (let jj = -1; jj <= 1; jj++) {
                if (ii === 0 && jj === 0)
                    continue;

                if (FeldaufBrett2(yy + ii, xx + jj)) {
                    if (this.Feld[yy + ii][xx + jj] === "ll" || this.Feld[yy + ii][xx + jj][0] === this.Gegner) {
                        let hZug = [yy, xx, yy + ii, xx + jj];
                        this.lZuege.push(hZug);
                    }
                }
            }
        }
    }
    

     LoescheUngueltige() {
        let eigk = [-1, -1];
        let hFeld = new Array(8);
        for (let i = 0; i < hFeld.length; i++) {
             hFeld[i] = new Array(8);
        }

        let kk = 0;
        while (kk < this.lZuege.length) {
            hFeld = this.ErzeugeStell(this.lZuege[kk]);
            if (this.lZuege[kk][0] == this.ek[0] && this.lZuege[kk][1] == this.ek[1]) {
                eigk[0] = this.lZuege[kk][2];
                eigk[1] = this.lZuege[kk][3];
            } else {
                eigk[0] = this.ek[0];
                eigk[1] = this.ek[1];
            }

            if (this.feldImSchach(eigk, this.Gegner, hFeld)) {
                this.lZuege.splice(kk, 1);    // List is changing
            } else {
                kk++;
            }
        }
    }

    ErzeugeStell(ints){
        let hFeld = new Array(8);
        for (let i = 0; i < hFeld.length; i++) {
            hFeld[i] = new Array(8);
        }


        for (let ii = 0; ii < 8; ii++) {
            for (let jj = 0; jj < 8; jj++) {  
                hFeld[ii][jj] = this.Feld[ii][jj];
            }
        }
        hFeld[ints[2]][ints[3]] = hFeld[ints[0]][ints[1]];
        hFeld[ints[0]][ints[1]] = "ll";
        // Umwandel mit 5.Feld
        if (ints.length > 4) {
            if (ints[4] === 1) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + 'q';
            } else if (ints[4] === 2) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "r";
            } else if (ints[4] === 3) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "b";
            } else if (ints[4] === 4) {
                hFeld[ints[2]][ints[3]] = hFeld[ints[2]][ints[3]][0] + "n";
            }
        }
        return hFeld;
    };
}
