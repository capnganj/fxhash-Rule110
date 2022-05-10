
//Cellular automata class based on Daniel Shiffman's wolfram CA implementation
class CA {
    //p5ref is the p5 dummy to call draw methods on
    //features is the fxhash features object
    constructor( p5ref, features) {

        //expand scope
        this.sk = p5ref;
        this.feet = features;

        //110 and its cousins my homies:
        let ca30 = [0, 0, 0, 1, 1, 1, 1, 0];
        let ca86 = [0, 1, 0, 1, 0, 1, 1, 0];
        let ca135 = [1, 0, 0, 0, 0, 1, 1, 1];
        let ca149 = [1, 0, 0, 1, 0, 1, 0, 1];
        switch (this.feet.rule) {
            case 30:
                this.ruleset = ca30;
                break;
            case 86:
                this.ruleset = ca86;
                break;
            case 135:
                this.ruleset = ca135;
                break;
            case 149:
                this.ruleset = ca149;
                break;    
            default:
                this.ruleset = ca110;
        }
        //this.ruleset = ca30;
        

        //width of each cell
        this.w = this.feet.cellWidth.value;

        //starting cells --- these are the seed code generated from the fxhash transaction and never change
        this.seedCells = new Array(4096);
        for (let i = 0; i < this.seedCells.length; i++) {
            this.seedCells[i] = Math.round(fxrand());
        }

        //Array of cells w/ random values
        this.populateCellsUsingSeed();

        //generation
        this.generation = 0;
    }

    //computes a new row of cells data
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

    //draws a row of cells
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

    //picks random 1-value colors
    randomGo() {
        let go = fxrand();
        let col = {};
        if (go < 0.66) {
            col = this.feet.color.siete;
        }
        else {
            col = this.feet.color.cinco;
        }
        return col;
    }

    //picks random 0-value colors
    randomStop() {
        let go = fxrand();
        let col = {};
        if (go < 0.66) {
            col = this.feet.color.uno;
        }
        else {
            col = this.feet.color.cero;
        }
        return col;
    }

    
    //called when the screen size changes -- triggers something like a redraw
    populateCellsUsingSeed() {
        this.generation = 0;
        let safeWidth = this.sk.width > 4096 ? 4096 : this.sk.width;
        this.cells = new Array(Math.ceil(safeWidth / this.w));
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = this.seedCells[i];
        }
    }

    //CA computation rules
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