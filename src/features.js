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

        //drives nummber of circles
        this.depth = {
            tag: "",
            value: ""
        }
        this.setDepth();

        //min and max initial radius multiplier
        this.cough = {
            tag: "",
            value: ""
        };
        this.setCough();

        //min and max radius factor in new branch
        this.squint = {
            tag: "",
            value: ""
        };

        //spread factor
        this.laugh =  {
            tag: "",
            value: ""
        };
        this.setSquintAndLaugh();

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

    //desaturate by some %
    desaturateColor(col, percent) {
        //let h = hsl(col);
        //h -= percent;
        return col.darker(percent);
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

    setDepth(){
        let t = fxrand();
        this.depth.value = t;

        //set feature tag value
        if (t < 0.15) {
            this.depth.tag = "Weak"
            this.depth.value = 6
        }
        else if ( t < 0.85) {
            this.depth.tag = "Nice"
            this.depth.value = 7
        }
        else {
            this.depth.tag = "Huge"
            this.depth.value = 8
        }
    }

    setCough(){
        let c = fxrand();
        this.cough.value = c;

        //set feature tag values
        if (c < 0.4) this.cough.tag = "Smooth";
        else if (c < 0.6) this.cough.tag = "Wheeze";
        else if (c < 0.85) this.cough.tag = "Cough";
        else this.cough.tag = "Hack"


    }

    setSquintAndLaugh(){
        let s = fxrand();
        let l = fxrand();
        this.squint.value = s;
        this.laugh.value = l;

        //set feature tag values
        if (s < 0.4) this.squint.tag = "None";
        else if (s < 0.6) this.squint.tag = "Stoner Eyes";
        else if (s < 0.85) this.squint.tag = "Squinty";
        else this.squint.tag = "Eyes Closed"

        if (l < 0.5) this.laugh.tag = "Chuckle";
        else if (l < 0.75) this.laugh.tag = "Hearty";
        else if (l < 0.9) this.laugh.tag = "Belly";
        else this.laugh.tag = "Can't stop laughing";
    }
}

export {Features}