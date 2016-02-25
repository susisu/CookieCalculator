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
        Synonym,
        Prefactored,
        UnitMul,
        UnitDiv,
        Prefix,
        Prefixed,
        autoPrefix,
        SIPrefix,
        ONE,
        SIUnit
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

    toString: (dim) => {
        let basis = Object.getOwnPropertySymbols(dim);
        let str   = "";
        for (let b of DIMENSION_ORDER) {
            if (dim[b] !== undefined && dim[b] !== 0) {
                str += DIMENSION_SYMBOL[b] + dim[b].toString();
            }
        }
        return str;
    },

    equal: (dimA, dimB) => {
        let basisA = Object.getOwnPropertySymbols(dimA),
            basisB = Object.getOwnPropertySymbols(dimB);
        for (let b of basisA) {
            if (dimA[b] === 0) {
                if (dimB[b] !== 0 && dimB[b] !== undefined){
                    return false;
                }
            }
            else if (dimA[b] !== dimB[b]) {
                return false;
            }
        }
        for (let b of basisB) {
            if (dimB[b] === 0) {
                if (dimA[b] !== 0 && dimA[b] !== undefined){
                    return false;
                }
            }
            else if (dimB[b] !== dimA[b]) {
                return false;
            }
        }
        return true;
    },

    mul: (dimA, dimB) => {
        let basisA = Object.getOwnPropertySymbols(dimA),
            basisB = Object.getOwnPropertySymbols(dimB);
        let newDim = {};
        for (let b of basisA) {
            newDim[b] = dimA[b];
        }
        for (let b of basisB) {
            if (newDim[b] === undefined) {
                newDim[b] = dimB[b];
            }
            else {
                newDim[b] += dimB[b];
                if (newDim[b] === 0) {
                    delete newDim[b];
                }
            }
        }
        return newDim;
    },

    div: (dimA, dimB) => {
        let basisA = Object.getOwnPropertySymbols(dimA),
            basisB = Object.getOwnPropertySymbols(dimB);
        let newDim = {};
        for (let b of basisA) {
            newDim[b] = dimA[b];
        }
        for (let b of basisB) {
            if (newDim[b] === undefined) {
                newDim[b] = -dimB[b];
            }
            else {
                newDim[b] -= dimB[b];
                if (newDim[b] === 0) {
                    delete newDim[b];
                }
            }
        }
        return newDim;
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

    static add(x, y) {
        if (!Dimension.equal(x.dimension, y.dimension)) {
            throw new Error("dimension mismatch");
        }
        return new Quantity(x.value + y.value, x.dimension);
    }

    static sub(x, y) {
        if (!Dimension.equal(x.dimension, y.dimension)) {
            throw new Error("dimension mismatch");
        }
        return new Quantity(x.value - y.value, x.dimension);
    }

    static mul(x, y) {
        return new Quantity(x.value * y.value, Dimension.mul(x.dimension, y.dimension));
    }

    static div(x, y) {
        return new Quantity(x.value / y.value, Dimension.div(x.dimension, y.dimension));
    }

    add(x) {
        return Quantity.add(this, x);
    }

    sub(x) {
        return Quantity.sub(this, x);
    }

    mul(x) {
        return Quantity.mul(this, x);
    }

    div(x) {
        return Quantity.div(this, x);
    }

    in(unit) {
        if (!Dimension.equal(this.dimension, unit.dimension)) {
            throw new Error("dimension mismatch");
        }
        return this.value / unit.factor;
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
        let prefixedUnit = autoPrefix(this, unit);
        return this.in(prefixedUnit).toString() + " " + prefixedUnit.symbol;
    }
}


class Unit {
    constructor(dimension, name, symbol, factor) {
        this.dimension = dimension;
        this.name      = name;
        this.symbol    = symbol;
        this.factor    = factor;
    }

    toString() {
        return this.name;
    }

    value(value) {
        return new Quantity(value * this.factor, this.dimension);
    }

    addPrefix(prefix) {
        return new Prefixed(prefix, this);
    }

    scale(factor) {
        return new Prefactored(factor, this);
    }

    mul(unit) {
        if (unit instanceof One) {
            return this;
        }
        else if (unit instanceof Prefactored) {
            return new Prefactored(unit.prefactor, new UnitMul(this, unit.unit));
        }
        else {
            return new UnitMul(this, unit);
        }
    }

    div(unit) {
        if (unit instanceof One) {
            return this;
        }
        else if (unit instanceof Prefactored) {
            return new Prefactored(1.0 / unit.prefactor, new UnitDiv(this, unit.unit));
        }
        else {
            return new UnitDiv(this, unit);
        }
    }
}

class One extends Unit {
    constructor() {
        super({}, "1", "", 1.0);
    }

    mul(unit) {
        return unit;
    }

    div(unit) {
        if (unit instanceof One) {
            return this;
        }
        else if (unit instanceof Prefactored) {
            return new Prefactored(1.0 / unit.prefactor, new UnitDiv(this, unit.unit));
        }
        else {
            return new UnitDiv(this, unit);
        }
    }
}

class Synonym extends Unit {
    constructor(name, symbol, unit) {
        super(unit.dimension, name, symbol, unit.factor);
    }
}

class Prefactored extends Unit {
    constructor(prefactor, unit) {
        super(
            unit.dimension,
            prefactor.toString() + unit.name,
            prefactor.toString() + unit.symbol,
            prefactor * unit.factor
        );
        this.prefactor = prefactor;
        this.unit      = unit;
    }

    addPrefix(prefix) {
        return new Prefactored(this.prefactor, this.unit.addPrefix(prefix));
    }

    scale(factor) {
        return new Prefactored(factor * this.prefactor, this.unit);
    }

    mul(unit) {
        if (unit instanceof One) {
            return this;
        }
        else if (unit instanceof Prefactored) {
            return new Prefactored(this.prefactor * unit.prefactor, new UnitMul(this.unit, unit.unit));
        }
        else {
            return new Prefactored(this.prefactor, UnitMul(this.unit, unit));
        }
    }

    div(unit) {
        if (unit instanceof One) {
            return this;
        }
        else if (unit instanceof Prefactored) {
            return new Prefactored(this.prefactor / unit.prefactor, new UnitDiv(this.unit, unit.unit));
        }
        else {
            return new Prefactored(this.prefactor, UnitDiv(this.unit, unit));
        }
    }
}

class UnitMul extends Unit {
    constructor(unitA, unitB) {
        super(
            Dimension.mul(unitA.dimension, unitB.dimension),
            (unitA instanceof UnitDiv ? "(" + unitA.name + ")" : unitA.name) + " " + unitB.name,
            (unitA instanceof UnitDiv ? "(" + unitA.symbol + ")" : unitA.symbol) + "." + unitB.symbol,
            unitA.factor * unitB.factor
        );
        this.unitA = unitA;
        this.unitB = unitB;
    }

    addPrefix(prefix) {
        return new UnitMul(this.unitA.addPrefix(prefix), this.unitB);
    }
}

class UnitDiv extends Unit {
    constructor(unitA, unitB) {
        super(
            Dimension.div(unitA.dimension, unitB.dimension),
            unitA.name + " per " + unitB.name,
            unitA.symbol + "/" + unitB.symbol,
            unitA.factor / unitB.factor
        );
        this.unitA = unitA;
        this.unitB = unitB;
    }

    addPrefix(prefix) {
        return new UnitDiv(this.unitA.addPrefix(prefix), this.unitB);
    }
}


class Prefix {
    constructor(name, symbol, factor) {
        this.name   = name;
        this.symbol = symbol;
        this.factor = factor;
    }

    add(unit) {
        return unit.addPrefix(this);
    }
}

class Prefixed extends Unit {
    constructor(prefix, unit) {
        super(
            unit.dimension,
            prefix.name + unit.name,
            prefix.symbol + unit.symbol,
            prefix.factor * unit.factor
        );
        this.prefix = prefix;
        this.unit   = unit;
    }

    addPrefix(prefix) {
        let factor = prefix.factor * this.prefix.factor;
        let appPrefix = AUTO_PREFIX_LIST.find(prefix => prefix.factor <= factor);
        if (appPrefix === undefined) {
            appPrefix = AUTO_PREFIX_LIST[AUTO_PREFIX_LIST.length - 1];
        }
        if (appPrefix.name === "") {
            return this.unit;
        }
        return new Prefixed(appPrefix, this.unit);
    }
}

function autoPrefix(quantity, unit) {
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
    return unit.addPrefix(prefix);
}

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

const ONE = new One();

const SIUnit = {
    MOLE   : new Unit({ [Dimension.AMOUNT]     : 1 },    "mole", "mol", 1.0),
    GRAM   : new Unit({ [Dimension.MASS]       : 1 },    "gram",   "g", 1e-3),
    METER  : new Unit({ [Dimension.LENGTH]     : 1 },   "meter",   "m", 1.0),
    SECOND : new Unit({ [Dimension.TIME]       : 1 },  "second", "sec", 1.0),
    KELVIN : new Unit({ [Dimension.TEMPERATURE]: 1 },  "kelvin",   "K", 1.0),
    AMPERE : new Unit({ [Dimension.CURRENT]    : 1 },  "ampere",   "A", 1.0),
    CANDELA: new Unit({ [Dimension.LUMINOUS]   : 1 }, "candela",  "cd", 1.0)
};
SIUnit.KILOGRAM = SIPrefix.KILO.add(SIUnit.GRAM);
SIUnit.NEWTON   = new Synonym("newton", "N",
        SIUnit.KILOGRAM.mul(SIUnit.METER).div(SIUnit.SECOND).div(SIUnit.SECOND)
);
Object.freeze(SIUnit);

endModule();
