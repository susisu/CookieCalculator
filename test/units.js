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

    describe(".mul(dimA, dimB)", () => {
        it("should return the product of 'dimA' and 'dimB'", () => {
            {
                let p = Dimension.mul({}, {});
                expect(Dimension.equal(p, {})).to.be.true;
            }
            {
                let p = Dimension.mul(
                    {},
                    {
                        [Dimension.AMOUNT]: 1
                    }
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]: 1
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    {
                        [Dimension.AMOUNT]: 1
                    },
                    {}
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]: 1
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 2,
                        [Dimension.LENGTH]     : 3,
                        [Dimension.TIME]       : 4,
                        [Dimension.TEMPERATURE]: 5,
                        [Dimension.CURRENT]    : 6,
                        [Dimension.LUMINOUS]   : 7
                    },
                    {}
                );
                expect(Dimension.equal(
                    p,
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
            }
            {
                let p = Dimension.mul(
                    {},
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 2,
                        [Dimension.LENGTH]     : 3,
                        [Dimension.TIME]       : 4,
                        [Dimension.TEMPERATURE]: 5,
                        [Dimension.CURRENT]    : 6,
                        [Dimension.LUMINOUS]   : 7
                    }
                );
                expect(Dimension.equal(
                    p,
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
            }
            {
                let p = Dimension.mul(
                    { [Dimension.AMOUNT]: 1 },
                    { [Dimension.AMOUNT]: 2 }
                );
                expect(Dimension.equal(
                    p,
                    { [Dimension.AMOUNT]: 3 }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    { [Dimension.AMOUNT]: 2 },
                    { [Dimension.AMOUNT]: 1 }
                );
                expect(Dimension.equal(
                    p,
                    { [Dimension.AMOUNT]: 3 }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    { [Dimension.AMOUNT]: 1 },
                    { [Dimension.MASS]  : 1 }
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 1
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    { [Dimension.MASS]  : 1 },
                    { [Dimension.AMOUNT]: 1 }
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 1
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
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
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: -1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: -1
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.mul(
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: -1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
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
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: -1
                    }
                )).to.be.true;
            }
        });
    });

    describe(".div(dimA, dimB)", () => {
        it("should return the quotient of 'dimA' and 'dimB'", () => {
            {
                let q = Dimension.div({}, {});
                expect(Dimension.equal(q, {})).to.be.true;
            }
            {
                let q = Dimension.div(
                    {},
                    {
                        [Dimension.AMOUNT]: 1
                    }
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]: -1
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    {
                        [Dimension.AMOUNT]: 1
                    },
                    {}
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]: 1
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 2,
                        [Dimension.LENGTH]     : 3,
                        [Dimension.TIME]       : 4,
                        [Dimension.TEMPERATURE]: 5,
                        [Dimension.CURRENT]    : 6,
                        [Dimension.LUMINOUS]   : 7
                    },
                    {}
                );
                expect(Dimension.equal(
                    q,
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
            }
            {
                let q = Dimension.div(
                    {},
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 2,
                        [Dimension.LENGTH]     : 3,
                        [Dimension.TIME]       : 4,
                        [Dimension.TEMPERATURE]: 5,
                        [Dimension.CURRENT]    : 6,
                        [Dimension.LUMINOUS]   : 7
                    }
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : -2,
                        [Dimension.LENGTH]     : -3,
                        [Dimension.TIME]       : -4,
                        [Dimension.TEMPERATURE]: -5,
                        [Dimension.CURRENT]    : -6,
                        [Dimension.LUMINOUS]   : -7
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    { [Dimension.AMOUNT]: 1 },
                    { [Dimension.AMOUNT]: 2 }
                );
                expect(Dimension.equal(
                    q,
                    { [Dimension.AMOUNT]: -1 }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    { [Dimension.AMOUNT]: 2 },
                    { [Dimension.AMOUNT]: 1 }
                );
                expect(Dimension.equal(
                    q,
                    { [Dimension.AMOUNT]: 1 }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    { [Dimension.AMOUNT]: 1 },
                    { [Dimension.MASS]  : 1 }
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : -1
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    { [Dimension.MASS]  : 1 },
                    { [Dimension.AMOUNT]: 1 }
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]: -1,
                        [Dimension.MASS]  : 1
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
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
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: -1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 1
                    }
                )).to.be.true;
            }
            {
                let q = Dimension.div(
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: -1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
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
                );
                expect(Dimension.equal(
                    q,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : -1,
                        [Dimension.LENGTH]     : -2,
                        [Dimension.TIME]       : 2,
                        [Dimension.TEMPERATURE]: -1
                    }
                )).to.be.true;
            }
        });
    });

    describe(".pow(dim, power)", () => {
        it("should return 'dim' raised to the power of 'power'", () => {
            {
                let p = Dimension.pow({}, 0);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({}, 3);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({}, -3);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 0 }, 0);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 0 }, 3);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 0 }, -3);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    0
                );
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    3
                );
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    -3
                );
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 2 }, 0);
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    0
                );
                expect(Dimension.equal(
                    p,
                    {}
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 2 }, 3);
                expect(Dimension.equal(
                    p,
                    { [Dimension.AMOUNT]: 6 }
                )).to.be.true;
            }
            {
                let p = Dimension.pow({ [Dimension.AMOUNT]: 2 }, -3);
                expect(Dimension.equal(
                    p,
                    { [Dimension.AMOUNT]: -6 }
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    3
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.MASS]  : 3,
                        [Dimension.LENGTH]: 6,
                        [Dimension.TIME]  : -6
                    }
                )).to.be.true;
            }
            {
                let p = Dimension.pow(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    -3
                );
                expect(Dimension.equal(
                    p,
                    {
                        [Dimension.MASS]  : -3,
                        [Dimension.LENGTH]: -6,
                        [Dimension.TIME]  : 6
                    }
                )).to.be.true;
            }
        });
    });
});

describe("Quantity", () => {
    let Quantity = units.Quantity;
    let Dimension = units.Dimension;
    let DimensionalError = units.DimensionalError;

    describe(".add(x, y)", () => {
        it("should return the sum of 'x' and 'y'", () => {
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, {});
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 0 });
                let y = new Quantity(2, {});
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, { [Dimension.AMOUNT]: 0 });
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(s.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let s = Quantity.add(x, y);
                expect(s.value).equal(3);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
        });

        it("should throw DimensionalError if the dimensions of 'x' and 'y' are inconsistent", () => {
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, {});
                expect(() => { Quantity.add(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                expect(() => { Quantity.add(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1});
                let y = new Quantity(2, { [Dimension.MASS]  : 1 });
                expect(() => { Quantity.add(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(() => { Quantity.add(x, y); }).to.throw(DimensionalError);
            }
        });
    });

    describe(".sub(x, y)", () => {
        it("should return the difference of 'x' and 'y'", () => {
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, {});
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 0 });
                let y = new Quantity(2, {});
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, { [Dimension.AMOUNT]: 0 });
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(s.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(s.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let s = Quantity.sub(x, y);
                expect(s.value).equal(-1);
                expect(Dimension.equal(
                    s.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
        });

        it("should throw DimensionalError if the dimensions of 'x' and 'y' are inconsistent", () => {
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, {});
                expect(() => { Quantity.sub(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1, {});
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                expect(() => { Quantity.sub(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1, { [Dimension.AMOUNT]: 1});
                let y = new Quantity(2, { [Dimension.MASS]  : 1 });
                expect(() => { Quantity.sub(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    1,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(() => { Quantity.sub(x, y); }).to.throw(DimensionalError);
            }
        });
    });

    describe(".mul(x, y)", () => {
        it("should return the product of 'x' and 'y'", () => {
            {
                let x = new Quantity(2, {});
                let y = new Quantity(3, {});
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(p.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(3, {});
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    { [Dimension.AMOUNT]: 1 }
                )).to.be.true;
            }
            {
                let x = new Quantity(2, {});
                let y = new Quantity(3, { [Dimension.AMOUNT]: 1 });
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    { [Dimension.AMOUNT]: 1 }
                )).to.be.true;
            }
            {
                let x = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(3, { [Dimension.MASS]  : 2 });
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(2, { [Dimension.MASS]  : 2 });
                let y = new Quantity(3, { [Dimension.AMOUNT]: 1 });
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(3, {});
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(2, {});
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 1
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let p = Quantity.mul(x, y);
                expect(p.value).to.equal(6);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 1
                    }
                )).to.be.true;
            }
        });
    });

    describe(".div(x, y)", () => {
        it("should return the quotient of 'x' and 'y'", () => {
            {
                let x = new Quantity(6, {});
                let y = new Quantity(2, {});
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(q.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(6, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, {});
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    { [Dimension.AMOUNT]: 1 }
                )).to.be.true;
            }
            {
                let x = new Quantity(6, {});
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    { [Dimension.AMOUNT]: -1 }
                )).to.be.true;
            }
            {
                let x = new Quantity(6, { [Dimension.AMOUNT]: 1 });
                let y = new Quantity(2, { [Dimension.MASS]  : 2 });
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(6, { [Dimension.MASS]  : 2 });
                let y = new Quantity(2, { [Dimension.AMOUNT]: 1 });
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.AMOUNT]: -1,
                        [Dimension.MASS]  : 2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    6,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(2, {});
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(6, {});
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.MASS]       : -1,
                        [Dimension.LENGTH]     : -2,
                        [Dimension.TIME]       : 2
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    6,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: -1
                    }
                )).to.be.true;
            }
            {
                let x = new Quantity(
                    6,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let q = Quantity.div(x, y);
                expect(q.value).to.equal(3);
                expect(Dimension.equal(
                    q.dimension,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : -1,
                        [Dimension.LENGTH]     : -2,
                        [Dimension.TIME]       : 2,
                        [Dimension.TEMPERATURE]: 1
                    }
                )).to.be.true;
            }
        });
    });

    describe(".pow(x, y)", () => {
        it("should return 'x' raised to the power of 'y'", () => {
            {
                let x = new Quantity(2, {});
                let y = new Quantity(3, {});
                let p = Quantity.pow(x, y);
                expect(p.value).to.equal(8);
                expect(Dimension.equal(p.dimension, {})).to.be.true;
            }
            {
                let x = new Quantity(2, { [Dimension.AMOUNT]: 2 });
                let y = new Quantity(3, {});
                let p = Quantity.pow(x, y);
                expect(p.value).to.equal(8);
                expect(Dimension.equal(p.dimension, { [Dimension.AMOUNT]: 6 })).to.be.true;
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(3, {});
                let p = Quantity.pow(x, y);
                expect(p.value).to.equal(8);
                expect(Dimension.equal(
                    p.dimension,
                    {
                        [Dimension.MASS]       : 3,
                        [Dimension.LENGTH]     : 6,
                        [Dimension.TIME]       : -6
                    }
                )).to.be.true;
            }
        });

        it("should throw DimensionalError if 'y' is dimensional", () => {
            {
                let x = new Quantity(2, {});
                let y = new Quantity(3, { [Dimension.AMOUNT]: 1 });
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2, {});
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2, { [Dimension.AMOUNT]: 2 });
                let y = new Quantity(3, { [Dimension.AMOUNT]: 1 });
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2, { [Dimension.AMOUNT]: 2 });
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(3, { [Dimension.AMOUNT]: 1 });
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    2,
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                let y = new Quantity(
                    3,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                );
                expect(() => { Quantity.pow(x, y); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#in(unit)", () => {
        it("should return the converted value in 'unit'");
    });

    describe("#inAutoPrefixed(unit)", () => {
        it("should return the pair of the auto-prefixed version of 'unit' and the converted value in it");
    });

    describe("#toStringIn(unit)", () => {
        it("should return a string describing the quantity in 'unit'");
    });

    describe("#toStringInAutoPrefixed(unit)", () => {
        it("should return a string describing the quantity in the auto-prefixed 'unit'");
    });
});

describe("Unit", () => {
    let Unit             = units.Unit;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(dimension, name, symbol, factor)", () => {
        {
            let unit = new Unit({}, "test unit", "?", 1.0);
            expect(Dimension.equal(unit.dimension, {})).to.be.true;
            expect(unit.name).to.equal("test unit");
            expect(unit.symbol).to.equal("?");
            expect(unit.factor).to.equal(1.0);
        }
        {
            let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0);
            expect(Dimension.equal(unit.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            expect(unit.name).to.equal("test unit 2");
            expect(unit.symbol).to.equal("!");
            expect(unit.factor).to.equal(2.0);
        }
       {
            let unit = new Unit(
                {
                    [Dimension.AMOUNT]     : 0,
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2,
                    [Dimension.TEMPERATURE]: 0,
                    [Dimension.CURRENT]    : 0,
                    [Dimension.LUMINOUS]   : 0
                },
                "test unit", "?", 1.0);
            expect(Dimension.equal(
                unit.dimension,
                {
                    [Dimension.MASS]       : 1,
                    [Dimension.LENGTH]     : 2,
                    [Dimension.TIME]       : -2
                }
            )).to.be.true;
            expect(unit.name).to.equal("test unit");
            expect(unit.symbol).to.equal("?");
            expect(unit.factor).to.equal(1.0);
        }
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            expect(unit.toString()).to.equal("test unit");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 3.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let unit = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 1.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
            {
                let unit = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 3.0);
                let x = unit.value(2.0);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
            }
        });
    });

    describe("#addPrefix(prefix)", () => {
        it("should return the prefixed version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 2.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = unit.addPrefix(prefix);
            expect(prefixed).to.be.instanceOf(Prefixed);
            expect(prefixed.unit).to.equal(unit);
            expect(prefixed.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let unit = new Unit({}, "test unit", "?", 1.0);
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = unit.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0).and.below(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { unit.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let x = new Quantity(3.14, {});
                expect(() => { unit.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { unit.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { unit.autoPrefixFor(x); }).to.throw(DimensionalError);
            }

            {
                let unit = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                    , "test unit", "?", 1.0);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { unit.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit");
    });

    describe("#mul(unit)", () => {
        it("should return the product unit of this and 'unit'");
    });

    describe("#div(unit)", () => {
        it("should return the quotient unit of this and 'unit'");
    });

    describe("#pow(power)", () => {
        it("should return the powered unit by 'power'");
    });
});
