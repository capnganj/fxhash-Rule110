
//Cellular automata class based on Daniel Shiffman's wolfram CA implementation
class CA {
    //p5ref is the p5 dummy to call draw methods on
    //features is the fxhash features object
    constructor( p5ref, features) {

        //expand scope
        this.sk = p5ref;
        this.feet = features;

        //110 and its cousins my homies:
        let ca110 = [0, 1, 1, 0, 1, 1, 1, 0];
        let ca124 = [0, 1, 1, 1, 1, 1, 0, 0];
        let ca137 = [1, 0, 0, 0, 1, 0, 0, 1];
        let ca193 = [1, 1, 0, 0, 0, 0, 0, 1];

        //106 and cousins
        let ca106 = [0, 1, 1, 0, 1, 0, 1, 0];
        let ca120 = [0, 1, 1, 1, 1, 0, 0, 0];
        let ca169 = [1, 0, 1, 0, 1, 0, 0, 1];
        let ca225 = [1, 1, 1, 0, 0, 0, 0, 1];

        
        switch (this.feet.rule) {
            case 110:
                this.ruleset = ca110
                break;
            case 124:
                this.ruleset = ca124
                break;
            case 137:
                this.ruleset = ca137
                break;
            case 193:
                this.ruleset = ca193
                break;    
            default:
                this.ruleset = ca110;
        }
        

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
        for (var i = 0; i < this.cells.length+1; i++) {
          nextgen[i] = Math.round(fxrand());
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

    //picks random 0-value colors
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