/*
 * Cookie Calculator / units.js
 * copyright (c) 2016 Susisu
 */

"use strict";

class Unit {
    constructor(dimension, name, symbol) {
        this.dimension = dimension;
        this.name      = name;
        this.symbol    = symbol;
    }

    toString() {
        return this.symbol;
    }
}

const METER       = new Unit(["length"], "meter", "m");
const GRAM        = new Unit(["mass"], "gram", "g");
const CUBIC_METER = new Unit(["length^3"], "cubic meter", "m<sup>3</sup>");

class Prefix {
    constructor(name, symbol, factor, filter) {
        this.name   = name;
        this.symbol = symbol;
        this.factor = factor;
        this.filter = filter;
    }

    match(unitName) {
        if (this.filter === undefined) {
            return true;
        }
        return this.filter.indexOf(unitName) >= 0;
    }

    toString() {
        return this.symbol;
    }
}

const SI_PREFIXES = [
    new Prefix("yotta", "Y", 1e+24),
    new Prefix("zetta", "Z", 1e+21),
    new Prefix("exa",   "E", 1e+18),
    new Prefix("peta",  "P", 1e+15),
    new Prefix("tera",  "T", 1e+12),
    new Prefix("giga",  "G", 1e+9),
    new Prefix("mega",  "M", 1e+6),
    new Prefix("kilo",  "k", 1e+3),
    new Prefix("",       "", 1e+0),
    new Prefix("centi", "c", 1e-2, ["meter"]),
    new Prefix("milli", "m", 1e-3),
    new Prefix("micro", "μ", 1e-6),
    new Prefix("nano",  "n", 1e-9),
    new Prefix("pico",  "p", 1e-12),
    new Prefix("femto", "f", 1e-15),
    new Prefix("atto",  "a", 1e-18),
    new Prefix("zepto", "z", 1e-21),
    new Prefix("yocto", "y", 1e-24)
];

class Quantity {
    constructor(value, unit) {
        this.value = value;
        this.unit  = unit;
    }

    toString() {
        return this.toSIPrefixed();
    }

    toSIPrefixed() {
        if (this.value === 0.0) {
            return this.value.toString() + " " + this.unit.toString();
        }
        var prefix = SI_PREFIXES.find(prefix =>
            prefix.match(this.unit.name) && prefix.factor <= this.value
        );
        if (prefix === undefined) {
            prefix = SI_PREFIXES[SI_PREFIXES.length - 1];
        }
        return (this.value / prefix.factor).toString()
            + " " + prefix.toString() + this.unit.toString();
    }
}

module.exports = Object.freeze({
    Unit,
    METER,
    GRAM,
    CUBIC_METER,

    Prefix,
    SI_PREFIXES,
    
    Quantity
});
