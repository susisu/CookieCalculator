/*
 * Cookie Calculator / units.js
 * copyright (c) 2016 Susisu
 */

"use strict";

function endModule() {
    module.exports = Object.freeze({
        Dimension,
        Quantity,
        Unit,
        Prefix,
        Prefixed,

        BaseUnit,
        SIPrefix,
        autoPrefixedUnit
    });
}

/*
    A dimension of a quantity is described as an object with symbol keys.
    example:
        {
            [Dimension.MASS]  : 1,
            [Dimension.LENGTH]: 1,
            [Dimension.TIME]  : -2
        }
*/
const Dimension = Object.freeze({
    AMOUNT     : Symbol("amount"),
    MASS       : Symbol("mass"),
    LENGTH     : Symbol("length"),
    TIME       : Symbol("time"),
    TEMPERATURE: Symbol("temperature"),
    CURRENT    : Symbol("current"),
    LUMINOUS   : Symbol("luminous"),

    toString: (dimension) => {
        let basis = Object.getOwnPropertySymbols(dimension);
        let str   = "";
        for (let b of DIMENSION_ORDER) {
            if (dimension[b] !== undefined && dimension[b] !== 0) {
                str += DIMENSION_SYMBOL[b] + dimension[b].toString();
            }
        }
        return str;
    },

    equal: (dimA, dimB) => {
        let basisA = Object.getOwnPropertySymbols(dimA),
            basisB = Object.getOwnPropertySymbols(dimB);
        for (let basis of basisA) {
            if (dimA[basis] === 0) {
                if (dimB[basis] !== 0 && dimB[basis] !== undefined){
                    return false;
                }
            }
            else if (dimA[basis] !== dimB[basis]) {
                return false;
            }
        }
        for (let basis of basisB) {
            if (dimB[basis] === 0) {
                if (dimA[basis] !== 0 && dimA[basis] !== undefined){
                    return false;
                }
            }
            else if (dimB[basis] !== dimA[basis]) {
                return false;
            }
        }
        return true;
    }
});

const DIMENSION_SYMBOL = Object.freeze({
    [Dimension.AMOUNT]     : "N",
    [Dimension.MASS]       : "M",
    [Dimension.LENGTH]     : "L",
    [Dimension.TIME]       : "T",
    [Dimension.TEMPERATURE]: "Θ",
    [Dimension.CURRENT]    : "I",
    [Dimension.LUMINOUS]   : "J"
});

const DIMENSION_ORDER = [
    Dimension.MASS,
    Dimension.LENGTH,
    Dimension.CURRENT,
    Dimension.LUMINOUS,
    Dimension.AMOUNT,
    Dimension.TEMPERATURE,
    Dimension.TIME
];

class Quantity {
    constructor(value, dimension) {
        this.value      = value;
        this.dimension  = dimension;
    }

    in(unit) {
        if (!Dimension.equal(this.dimension, unit.dimension)) {
            throw new Error("dimension mismatch");
        }
        return this.value / unit.ratio;
    }

    toStringIn(unit) {
        if (!Dimension.equal(this.dimension, unit.dimension)) {
            throw new Error("dimension mismatch");
        }
        return this.in(unit).toString() + " " + unit.symbol;
    }

    toStringInAutoPrefixed(unit) {
        if (!Dimension.equal(this.dimension, unit.dimension)) {
            throw new Error("dimension mismatch");
        }
        let prefixedUnit = autoPrefixedUnit(this, unit);
        return this.in(prefixedUnit).toString() + " " + prefixedUnit.symbol;
    }
}

class Unit {
    constructor(dimension, name, symbol, ratio) {
        this.dimension = dimension;
        this.name      = name;
        this.symbol    = symbol;
        this.ratio     = ratio;
    }

    value(value) {
        return new Quantity(value * this.ratio, this.dimension);
    }
}

class Prefix {
    constructor(name, symbol, factor) {
        this.name   = name;
        this.symbol = symbol;
        this.factor = factor;
    }

    apply(unit) {
        return new Prefixed(this, unit);
    }
}

class Prefixed {
    constructor(prefix, unit) {
        this.prefix = prefix;
        this.unit   = unit;
    }

    get dimension() {
        return this.unit.dimension;
    }

    get name() {
        return this.prefix.name + this.unit.name;
    }

    get symbol() {
        return this.prefix.symbol + this.unit.symbol;
    }

    get ratio() {
        return this.prefix.factor * this.unit.ratio;
    }

    value(value) {
        return new Quantity(value * this.ratio, this.dimension);
    }
}

const BaseUnit = Object.freeze({
    NUMBER: new Unit({                       }, "number",    "", 1.0),
    METER : new Unit({ [Dimension.LENGTH]: 1 },  "meter",   "m", 1.0),
    GRAM  : new Unit({ [Dimension.MASS]  : 1 },   "gram",   "g", 1.0),
    SECOND: new Unit({ [Dimension.TIME]  : 1 }, "second", "sec", 1.0)
});

const SIPrefix = Object.freeze({
    YOTTA: new Prefix("yotta",  "Y", 1e+24),
    ZETTA: new Prefix("zetta",  "Z", 1e+21),
    EXA  : new Prefix(  "exa",  "E", 1e+18),
    PETA : new Prefix( "peta",  "P", 1e+15),
    TERA : new Prefix( "tera",  "T", 1e+12),
    GIGA : new Prefix( "giga",  "G", 1e+9),
    MEGA : new Prefix( "mega",  "M", 1e+6),
    KILO : new Prefix( "kilo",  "k", 1e+3),
    HECTO: new Prefix("hecto",  "h", 1e+2),
    DECA : new Prefix( "deca", "da", 1e+1),
    DECI : new Prefix( "deci",  "d", 1e-1),
    CENTI: new Prefix("centi",  "c", 1e-2),
    MILLI: new Prefix("milli",  "m", 1e-3),
    MICRO: new Prefix("micro",  "μ", 1e-6),
    NANO : new Prefix( "nano",  "n", 1e-9),
    PICO : new Prefix( "pico",  "p", 1e-12),
    FEMTO: new Prefix("femto",  "f", 1e-15),
    ATTO : new Prefix( "atto",  "a", 1e-18),
    ZEPTO: new Prefix("zepto",  "z", 1e-21),
    YOCTO: new Prefix("yocto",  "y", 1e-24)
});

const AUTO_PREFIX_LIST = [
    SIPrefix.YOTTA,
    SIPrefix.ZETTA,
    SIPrefix.EXA,
    SIPrefix.PETA,
    SIPrefix.TERA,
    SIPrefix.GIGA,
    SIPrefix.MEGA,
    SIPrefix.KILO,
    new Prefix("", "", 1e+0),   // dummy
    SIPrefix.MILLI,
    SIPrefix.MICRO,
    SIPrefix.NANO,
    SIPrefix.PICO,
    SIPrefix.FEMTO,
    SIPrefix.ATTO,
    SIPrefix.ZEPTO,
    SIPrefix.YOCTO
];

function autoPrefixedUnit(quantity, unit) {
    let value = quantity.in(unit);
    if (value === 0.0) {
        return unit;
    }
    let prefix = AUTO_PREFIX_LIST.find(prefix => prefix.factor <= value);
    if (prefix === undefined) {
        prefix = AUTO_PREFIX_LIST[AUTO_PREFIX_LIST.length - 1];
    }
    if (prefix.name === "") {
        return unit;
    }
    return prefix.apply(unit);
}

endModule();
