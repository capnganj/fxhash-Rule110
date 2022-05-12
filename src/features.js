import { interpolateCool, interpolateInferno, interpolateMagma, interpolateWarm, interpolateViridis } from 'd3-scale-chromatic'
import { rgb, color } from 'd3-color';

class Features {
    constructor() {

        //color scheme 
        this.color = {
            name: "",
            background: {},
            cero: {},
            uno: {},
            dos: {},
            tres: {},
            quatro: {},
            cinco: {},
            sies:{},
            siete: {}
        };
        this.setColorPalette();
        this.setColors();

        //drives cell width
        this.cellWidth = {
            tag: "",
            value: 2.0
        }
        this.setCellWidth();
        
        //which CA rule?
        this.rule = 110;
        this.setRule();
    }

    //map function logic from processing <3
    map(n, start1, stop1, start2, stop2) {
        const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        return newval;
    }

    //color palette interpolation
    interpolateFn(val) {
        switch (this.color.name) {
            case "Cool": return rgb(interpolateCool(val));
            case "Warm": return rgb(interpolateWarm(val));
            case "Viridis": return rgb(interpolateViridis(val));
            case "Magma": return rgb(interpolateMagma(val));
            case "Inferno": return rgb(interpolateInferno(val));
            default:
                return "high"
        }
    }

    //color inverter
    invertColor(rgb, bw) {
        let hex = color(rgb).formatHex()
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            // https://stackoverflow.com/a/3943023/112731
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        // invert color components
        r = (255 - r).toString(16);
        g = (255 - g).toString(16);
        b = (255 - b).toString(16);
        // pad each with zeros and return
        let inverted = color("#" + padZero(r) + padZero(g) + padZero(b)).rgb();
        return inverted;

        function padZero(str, len) {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        }
    }

    //set color palette globally
    setColorPalette() {
        let c = fxrand();

        if (c < 0.15) {
            this.color.name = "Warm"
        }
        else if (c < 0.25) {
            this.color.name = "Cool"
        }
        else if (c < 0.5) {
            this.color.name = "Viridis"
        }
        else if (c < 0.7) {
            this.color.name = "Magma"
        }
        else {
            this.color.name = "Inferno"
        }
    }

    //set individual colors for background and shader
    setColors() {
        this.color.background = this.interpolateFn(this.map(fxrand(), 0, 1, 0.2, 0.8));
        this.color.cero = this.interpolateFn(this.map(fxrand(), 0, 1, 0, 0.125));
        this.color.uno = this.interpolateFn(this.map(fxrand(), 0, 1, 0, 0.25));
        this.color.dos = this.interpolateFn(this.map(fxrand(), 0, 1, 0.25, 0.375));
        this.color.tres = this.interpolateFn(this.map(fxrand(), 0, 1, 0.25, 0.5));
        this.color.quatro = this.interpolateFn(this.map(fxrand(), 0, 1, 0.5, 0.625));
        this.color.cinco = this.interpolateFn(this.map(fxrand(), 0, 1, 0.5, 0.75));
        this.color.sies = this.interpolateFn(this.map(fxrand(), 0, 1, 0.75, 0.875));
        this.color.siete = this.interpolateFn(this.map(fxrand(), 0, 1, 0.75, 1));

        //invert 33%
        if (fxrand() > 0.666) {
            this.color.background = this.invertColor(this.color.background);
            this.color.cero = this.invertColor(this.color.cero);
            this.color.uno = this.invertColor(this.color.uno);
            this.color.dos = this.invertColor(this.color.dos);
            this.color.tres = this.invertColor(this.color.tres);
            this.color.quatro = this.invertColor(this.color.quatro);
            this.color.cinco = this.invertColor(this.color.cinco);
            this.color.sies = this.invertColor(this.color.sies);
            this.color.siete = this.invertColor(this.color.siete);
            this.color.name += " Invert";
        }
    }

    //sets the cell width for the CA class
    setCellWidth() {
        let w = fxrand();
        if (w < 0.27) {
            this.cellWidth.tag = "s";
        }
        else if (w < 0.42) {
            this.cellWidth.tag = "m";
        }
        else if (w < 0.59) {
            this.cellWidth.tag = "l";
        }
        else if (w < 0.83) {
            this.cellWidth.tag = "xl";
        }
        else {
            this.cellWidth.tag = "xxl";
        }
        this.cellWidth.value = this.map(w, 0, 1, 3.5, 7);
    }

    //chooses a rule for the CA class
    setRule() {
        let r = fxrand();
        if (r < 0.27) {
            this.rule = 110
        }
        else if(r < 0.37) {
            this.rule = 124
        }
        else if (r < 0.51) {
            this.rule = 137
        }
        else if (r < 0.66) {
            this.rule = 193
        }
        else if(r < 0.71) {
            this.rule = 106
        }
        else if (r < 0.77) {
            this.rule = 120
        }
        else if (r < 0.83) {
            this.rule = 169
        }
        else if(r < 0.87) {
            this.rule = 225
        }
        else if (r < 0.95) {
            this.rule = 54
        }
        else {
            this.rule = 147
        }
    }
}

export {Features}