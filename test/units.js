/*
 * Cookie Calculator : test / units.js
 * copyright (c) 2016 Susisu
 */

"use strict";

let chai   = require("chai"),
    expect = chai.expect;

let units = require("../src/units.js");

describe("Dimension", () => {
    let Dimension = units.Dimension;

    describe(".toString(dim)", () => {
        it("should return \"1\" when 'dim' is non dimensional", () => {
            expect(Dimension.toString({})).to.equal("1");
            expect(Dimension.toString({ [Dimension.AMOUNT]: 0 })).to.equal("1");
            expect(Dimension.toString({
                [Dimension.AMOUNT]     : 0,
                [Dimension.MASS]       : 0,
                [Dimension.LENGTH]     : 0,
                [Dimension.TIME]       : 0,
                [Dimension.TEMPERATURE]: 0,
                [Dimension.CURRENT]    : 0,
                [Dimension.LUMINOUS]   : 0
            })).to.equal("1");
        });

        it("should return a string describing the dimension 'dim'", () => {
            expect(Dimension.toString({ [Dimension.AMOUNT]     : 1 })).to.equal("N1");
            expect(Dimension.toString({ [Dimension.MASS]       : 1 })).to.equal("M1");
            expect(Dimension.toString({ [Dimension.LENGTH]     : 1 })).to.equal("L1");
            expect(Dimension.toString({ [Dimension.TIME]       : 1 })).to.equal("T1");
            expect(Dimension.toString({ [Dimension.TEMPERATURE]: 1 })).to.equal("Θ1");
            expect(Dimension.toString({ [Dimension.CURRENT]    : 1 })).to.equal("I1");
            expect(Dimension.toString({ [Dimension.LUMINOUS]   : 1 })).to.equal("J1");

            expect(Dimension.toString({
                [Dimension.AMOUNT]     : 1,
                [Dimension.MASS]       : 1,
                [Dimension.LENGTH]     : 1,
                [Dimension.TIME]       : 1,
                [Dimension.TEMPERATURE]: 1,
                [Dimension.CURRENT]    : 1,
                [Dimension.LUMINOUS]   : 1
            })).to.equal("M1L1I1J1N1Θ1T1");

            expect(Dimension.toString({
                [Dimension.MASS]  : 1,
                [Dimension.LENGTH]: 2,
                [Dimension.TIME]  : -2,
            })).to.equal("M1L2T-2");

            expect(Dimension.toString({
                [Dimension.AMOUNT]     : 0,
                [Dimension.MASS]       : 1,
                [Dimension.LENGTH]     : 2,
                [Dimension.TIME]       : -2,
                [Dimension.TEMPERATURE]: 0,
                [Dimension.CURRENT]    : 0,
                [Dimension.LUMINOUS]   : 0
            })).to.equal("M1L2T-2");
        });
    });

    describe(".equal(dimA, dimB)", () => {
        it("should return whether 'dimA' and 'dimB' describe the same dimension or not", () => {
            expect(Dimension.equal({}, {})).to.be.true;
            expect(Dimension.equal({ [Dimension.AMOUNT]: 0 }, {})).to.be.true;
            expect(Dimension.equal({}, { [Dimension.AMOUNT]: 0 })).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 0,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {}
            )).to.be.true;
            expect(Dimension.equal(
                {},
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 0,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.true;
            expect(Dimension.equal(
                { [Dimension.AMOUNT]: 0 },
                { [Dimension.MASS]  : 0 }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 0,
                    [Dimension.LENGTH]     : 0
                },
                {
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.true;

            expect(Dimension.equal({ [Dimension.AMOUNT]: 1 }, {})).to.be.false;
            expect(Dimension.equal({}, { [Dimension.AMOUNT]: 1 })).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                },
                {}
            )).to.be.false;
            expect(Dimension.equal(
                {},
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {}
            )).to.be.false;
            expect(Dimension.equal(
                {},
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.false;

            expect(Dimension.equal(
                { [Dimension.AMOUNT]: 1 },
                { [Dimension.AMOUNT]: 1 }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {
                    [Dimension.MASS]: 1
                }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]: 1
                },
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                },
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                },
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.true;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 2,
                    [Dimension.LENGTH]     : 3,
                    [Dimension.TIME]       : 4,
                    [Dimension.TEMPERATURE]: 5,
                    [Dimension.CURRENT]    : 6,
                    [Dimension.LUMINOUS]   : 7
                },
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 2,
                    [Dimension.LENGTH]     : 3,
                    [Dimension.TIME]       : 4,
                    [Dimension.TEMPERATURE]: 5,
                    [Dimension.CURRENT]    : 6,
                    [Dimension.LUMINOUS]   : 7
                }
            )).to.be.true;

            expect(Dimension.equal(
                { [Dimension.AMOUNT]: 1 },
                { [Dimension.MASS]  : 1 }
            )).to.be.false;
            expect(Dimension.equal(
                { [Dimension.MASS]  : 1 },
                { [Dimension.AMOUNT]: 1 }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 0,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {
                    [Dimension.MASS]: 1
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]: 1
                },
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 0,
                    [Dimension.LENGTH]     : 0,
                    [Dimension.TIME]       : 0,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                },
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 1,
                    [Dimension.TIME]       : -2
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 1,
                    [Dimension.TIME]       : -2
                },
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 1,
                    [Dimension.TIME]       : -2
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 1,
                    [Dimension.TIME]       : -2
                },
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 2,
                    [Dimension.LENGTH]     : 3,
                    [Dimension.TIME]       : 4,
                    [Dimension.TEMPERATURE]: 5,
                    [Dimension.CURRENT]    : 6,
                    [Dimension.LUMINOUS]   : 7
                },
                {
                    [Dimension.AMOUNT]     : -1,
                    [Dimension.MASS]       : -2,
                    [Dimension.LENGTH]     : -3,
                    [Dimension.TIME]       : -4,
                    [Dimension.TEMPERATURE]: -5,
                    [Dimension.CURRENT]    : -6,
                    [Dimension.LUMINOUS]   : -7
                }
            )).to.be.false;
            expect(Dimension.equal(
                {
                    [Dimension.AMOUNT]     : -1,
                    [Dimension.MASS]       : -2,
                    [Dimension.LENGTH]     : -3,
                    [Dimension.TIME]       : -4,
                    [Dimension.TEMPERATURE]: -5,
                    [Dimension.CURRENT]    : -6,
                    [Dimension.LUMINOUS]   : -7
                },
                {
                    [Dimension.AMOUNT]     : 1,
                    [Dimension.MASS]       : 2,
                    [Dimension.LENGTH]     : 3,
                    [Dimension.TIME]       : 4,
                    [Dimension.TEMPERATURE]: 5,
                    [Dimension.CURRENT]    : 6,
                    [Dimension.LUMINOUS]   : 7
                }
            )).to.be.false;
        });
    });
});
