
//Cellular automata class based on Daniel Shiffman's wolfram CA implementation
class CA {
    //p5ref is the p5 dummy to call draw methods on
    //features is the fxhash features object
    constructor( p5ref, features) {

        //expand scope
        this.sk = p5ref;
        this.feet = features;

        //110 homies
        this.ruleset = [0, 1, 1, 0, 1, 1, 1, 0];

        //width of each cell
        this.w = 5.5;

        //Array of cells w/ random values
        this.cells = new Array(parseInt(this.sk.width / this.w));
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = Math.round(fxrand());
        }

        //generation
        this.generation = 0;
    }

    generate() {
        let nextgen = [];
        for (var i = 0; i < this.cells.length; i++) {
          nextgen[i] = 0;
        }
        for (let i = 1; i < this.cells.length-1; i++) {
          let left   = this.cells[i-1];   // Left neighbor state
          let me     = this.cells[i];     // Current state
          let right  = this.cells[i+1];   // Right neighbor state
          nextgen[i] = this.rules(left, me, right); // Compute next generation state based on ruleset
        }
        this.cells = nextgen;
        this.generation++;
      }

    draw() {
        for (var i = 0; i < this.cells.length; i++) {
            let go = this.randomGo();
            let stop = this.randomStop();
            if (this.cells[i] == 1) this.sk.fill(go.r, go.g, go.b);
            else                    this.sk.fill(stop.r, stop.g, stop.b);
            this.sk.noStroke();
            this.sk.rect(i*this.w, this.generation*this.w, this.w, this.w);
        }
    }

    randomGo() {
        let go = fxrand();
        let col = {};
        if (go < 0.33) {
            col = this.feet.color.cinco;
        }
        else if (go < 0.66) {
            col = this.feet.color.sies;
        }
        else {
            col = this.feet.color.siete;
        }
        return col;
    }

    randomStop() {
        let go = fxrand();
        let col = {};
        if (go < 0.33) {
            col = this.feet.color.cero;
        }
        else if (go < 0.66) {
            col = this.feet.color.uno;
        }
        else {
            col = this.feet.color.dos;
        }
        return col;
    }

    rules(a, b, c) {
        if (a == 1 && b == 1 && c == 1) return this.ruleset[0];
        if (a == 1 && b == 1 && c === 0) return this.ruleset[1];
        if (a == 1 && b === 0 && c == 1) return this.ruleset[2];
        if (a == 1 && b === 0 && c === 0) return this.ruleset[3];
        if (a === 0 && b == 1 && c == 1) return this.ruleset[4];
        if (a === 0 && b == 1 && c === 0) return this.ruleset[5];
        if (a === 0 && b === 0 && c == 1) return this.ruleset[6];
        if (a === 0 && b === 0 && c === 0) return this.ruleset[7];
        return 0;
    }
}

export { CA }