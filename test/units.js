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
    let Quantity         = units.Quantity;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let UnitBase         = units.UnitBase;

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
        it("should return the converted value in 'unit'", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({}, "test unit", "?", 4.0, 1);
                expect(x.in(unit)).to.equal(0.5);
            }
            {
                let x = new Quantity(40000.0, {});
                let unit = new UnitBase({}, "test unit 2", "!", 1000.0, 2);
                expect(x.in(unit)).to.equal(40.0);
            }
        });

        it("should throw DimensionalError if the dimension of 'unit' is inconsistent", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.in(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({}, "test unit", "?", 4.0, 1);
                expect(() => { x.in(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.AMOUNT]: 2 }, "test unit", "?", 4.0, 1);
                expect(() => { x.in(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.MASS]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.in(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    2.0,
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
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 4.0, 1
                );
                expect(() => { x.in(unit); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#inAutoPrefixed(unit)", () => {
        it("should return the pair of the auto-prefixed version of 'unit' and the converted value in it", () => {
            for (let k = 1; k <= 9; k++) {
                for (let e = -26; e <= 24; e++) {
                    let x = new Quantity(k, {});
                    let unit = new UnitBase({}, "test unit", "?", Math.pow(10.0, e), 1);
                    let v = x.inAutoPrefixed(unit);
                    expect(v).to.be.an.instanceOf(Object);
                    expect(v).to.have.a.property("value");
                    expect(Math.round(v.value)).to.be.at.least(1.0);
                    expect(Math.round(v.value)).to.be.at.most(1.0e+3);
                    expect(v).to.have.a.property("unit").which.is.an.instanceOf(UnitBase);
                }
            }
        });

        it("should throw DimensionalError if the dimension of 'unit' is inconsistent", () => {
            {
                let x = new Quantity(1.0, {});
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 2.0, 1);
                expect(() => { x.inAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({}, "test unit", "?", 2.0, 1);
                expect(() => { x.inAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.AMOUNT]: 2 }, "test unit", "?", 2.0, 1);
                expect(() => { x.inAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(1.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.MASS]: 1 }, "test unit", "?", 2.0, 1);
                expect(() => { x.inAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    1.0,
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
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 2.0, 1
                );
                expect(() => { x.inAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#toStringIn(unit)", () => {
        it("should return a string describing the quantity in 'unit'", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({}, "test unit", "?", 4.0, 1);
                expect(x.toStringIn(unit)).to.equal("0.5 ?");
            }
            {
                let x = new Quantity(40000.0, {});
                let unit = new UnitBase({}, "test unit 2", "!", 1000.0, 2);
                expect(x.toStringIn(unit)).to.equal("40 !");
            }
        });

        it("should throw DimensionalError if the dimension of 'unit' is inconsistent", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringIn(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({}, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringIn(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.AMOUNT]: 2 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringIn(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.MASS]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringIn(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    2.0,
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
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 4.0, 1
                );
                expect(() => { x.toStringIn(unit); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#toStringInAutoPrefixed(unit)", () => {
        it("should return a string describing the quantity in the auto-prefixed 'unit'", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({}, "test unit", "?", 2.0, 1);
                expect(x.toStringInAutoPrefixed(unit)).to.equal("1 ?");
            }
            {
                let x = new Quantity(40000.0, {});
                let unit = new UnitBase({}, "test unit 2", "!", 1.0, 1);
                expect(x.toStringInAutoPrefixed(unit)).to.equal("40 k!");
            }
        });

        it("should throw DimensionalError if the dimension of 'unit' is inconsistent", () => {
            {
                let x = new Quantity(2.0, {});
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringInAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({}, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringInAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.AMOUNT]: 2 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringInAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(2.0, { [Dimension.AMOUNT]: 1 });
                let unit = new UnitBase({ [Dimension.MASS]: 1 }, "test unit", "?", 4.0, 1);
                expect(() => { x.toStringInAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
            {
                let x = new Quantity(
                    2.0,
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
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 4.0, 1
                );
                expect(() => { x.toStringInAutoPrefixed(unit); }).to.throw(DimensionalError);
            }
        });
    });
});

describe("Unit", () => {
    let Unit             = units.Unit;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitMul          = units.UnitMul;
    let UnitDiv          = units.UnitDiv;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(dimension, name, symbol, factor)", () => {
        it("should create a new Unit instance", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                expect(unit).to.be.an.instanceOf(Unit);
                expect(Dimension.equal(unit.dimension, {})).to.be.true;
                expect(unit.name).to.equal("test unit");
                expect(unit.symbol).to.equal("?");
                expect(unit.factor).to.equal(1.0);
                expect(unit.prefixPower).to.equal(1);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0);
                expect(unit).to.be.an.instanceOf(Unit);
                expect(Dimension.equal(unit.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
                expect(unit.name).to.equal("test unit 2");
                expect(unit.symbol).to.equal("!");
                expect(unit.factor).to.equal(2.0);
                expect(unit.prefixPower).to.equal(1);
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
                expect(unit).to.be.an.instanceOf(Unit);
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
                expect(unit.prefixPower).to.equal(1);
            }
        });
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
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let x = unit.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let x = unit.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 3.0);
                let x = unit.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
                expect(x).to.instanceOf(Quantity);
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
                expect(x).to.instanceOf(Quantity);
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
            expect(prefixed).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unit).to.equal(unit);
            expect(prefixed.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = unit.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
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
        it("should return the scaled version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let scaled = unit.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(3.0);
            expect(scaled.unit).to.equal(unit);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let one = new One();
            let prod = unit.mul(one);
            expect(prod).to.equal(unit);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(3.0, unitB);
            let prod = unitA.mul(pref);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(3.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(unitA);
            expect(prod.unit.unitB).to.equal(unitB);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = unitA.mul(unitB);
            expect(prod).to.be.an.instanceOf(UnitMul);
            expect(prod.unitA).to.equal(unitA);
            expect(prod.unitB).to.equal(unitB);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let one = new One();
            let quot = unit.div(one);
            expect(quot).to.equal(unit);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(4.0, unitB);
            let quot = unitA.div(pref);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.25);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(unitA);
            expect(quot.unit.unitB).to.equal(unitB);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = unitA.div(unitB);
            expect(quot).to.be.an.instanceOf(UnitDiv);
            expect(quot.unitA).to.equal(unitA);
            expect(quot.unitB).to.equal(unitB);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = unit.pow(1);
            expect(pow).to.equal(unit);
        });

        it("should return the powered unit by 'power'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = unit.pow(3);
            expect(pow).to.be.an.instanceOf(UnitPow);
            expect(pow.unit).to.equal(unit);
            expect(pow.power).to.equal(3);
        });
    });
});

describe("One", () => {
    let One              = units.One;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let Unit             = units.Unit;
    let Prefactored      = units.Prefactored;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor()", () => {
        it("should create a new One instance", () => {
            let one = new One();
            expect(one).to.be.an.instanceOf(One);
            expect(Dimension.equal(one.dimension, {})).to.be.true;
            expect(one.name).to.equal("1");
            expect(one.symbol).to.equal("");
            expect(one.factor).to.equal(1.0);
            expect(one.prefixPower).to.equal(1);
        });
    });

    describe("#toString()", () => {
        it("should return its name \"1\"", () => {
            let one = new One();
            expect(one.toString()).to.equal("1");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity that is just a number", () => {
            let one = new One();
            let x = one.value(2);
            expect(x).to.instanceOf(Quantity);
            expect(x.value).to.equal(2);
            expect(Dimension.equal(x.dimension, {})).to.be.true;
        });
    });

    describe("#addPrefix(prefix)", () => {
        it("should return the prefixed version of the unit", () => {
            let one = new One();
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = one.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unit).to.equal(one);
            expect(prefixed.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let one = new One();
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = one.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let one = new One();
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { one.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let one = new One();
                let x = new Quantity(
                    3.14,
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
                expect(() => { one.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let one = new One();
            let scaled = one.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.unit).to.equal(one);
            expect(scaled.prefactor).to.equal(3.0);
        });
    });

    describe("#mul(unit)", () => {
        it("should return 'unit'", () => {
            {
                let one = new One();
                let unit = new One();
                let prod = one.mul(unit);
                expect(prod).to.be.an.instanceOf(One);
            }
            {
                let one = new One();
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pref = new Prefactored(2.0, unit);
                let prod = one.mul(pref);
                expect(prod).to.equal(pref);
            }
            {
                let one = new One();
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prod = one.mul(unit);
                expect(prod).to.equal(unit);
            }
        });
    });

    describe("#div(unit)", () => {
        it("should return the inverse of 'unit'", () => {
            {
                let one = new One();
                let unit = new One();
                let quot = one.div(unit);
                expect(quot).to.be.an.instanceOf(One);
            }
            {
                let one = new One();
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pref = new Prefactored(2.0, unit);
                let quot = one.div(pref);
                expect(quot).to.be.an.instanceOf(Prefactored);
                expect(quot.prefactor).to.equal(0.5);
                expect(quot.unit).to.be.an.instanceOf(UnitPow);
                expect(quot.unit.unit).to.equal(unit);
                expect(quot.unit.power).to.equal(-1);
            }
            {
                let one = new One();
                let unit = new Unit({}, "test unit", "?", 1.0);
                let quot = one.div(unit);
                expect(quot).to.be.an.instanceOf(UnitPow);
                expect(quot.unit).to.equal(unit);
                expect(quot.power).to.equal(-1);
            }
        });
    });

    describe("#pow(power)", () => {
        it("should return a One", () => {
            let one = new One();
            let pow = one.pow(3);
            expect(pow).to.be.an.instanceOf(One);
        });
    });
});

describe("Synonym", () => {
    let Synonym          = units.Synonym;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitMul          = units.UnitMul;
    let UnitDiv          = units.UnitDiv;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(name, symbol, unit)", () => {
        it("should create a new Synonym instance", () => {
            {
                let unit = new UnitBase({}, "test unit", "?", 1.0, 1);
                let syn = new Synonym("synonym", "!", unit);
                expect(syn).to.be.an.instanceOf(Synonym);
                expect(Dimension.equal(syn.dimension, {})).to.be.true;
                expect(syn.name).to.equal("synonym");
                expect(syn.symbol).to.equal("!");
                expect(syn.factor).to.equal(1.0);
                expect(syn.prefixPower).to.equal(1);
            }
            {
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0, 3);
                let syn = new Synonym("synonym 2", "!", unit);
                expect(Dimension.equal(syn.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
                expect(syn.name).to.equal("synonym 2");
                expect(syn.symbol).to.equal("!");
                expect(syn.factor).to.equal(2.0);
                expect(syn.prefixPower).to.equal(1);
            }
            {
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 1.0, 1);
                let syn = new Synonym("synonym", "!", unit);
                expect(Dimension.equal(
                    syn.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
                expect(syn.name).to.equal("synonym");
                expect(syn.symbol).to.equal("!");
                expect(syn.factor).to.equal(1.0);
                expect(syn.prefixPower).to.equal(1);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its synonym", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            expect(syn.toString()).to.equal("synonym");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 3.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
                let syn = new Synonym("synonym", "!", unit);
                let x = syn.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
            let syn = new Synonym("synonym", "!", unit);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = syn.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unit).to.equal(syn);
            expect(prefixed.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = syn.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { syn.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = new Quantity(3.14, {});
                expect(() => { syn.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { syn.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let syn = new Synonym("synonym", "!", unit);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { syn.autoPrefixFor(x); }).to.throw(DimensionalError);
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
                let syn = new Synonym("synonym", "!", unit);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { syn.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            let scaled = syn.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(3.0);
            expect(scaled.unit).to.equal(syn);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            let one = new One();
            let prod = syn.mul(one);
            expect(prod).to.equal(syn);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let syn = new Synonym("synonym", "!", unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(3.0, unitB);
            let prod = syn.mul(pref);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(3.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(syn);
            expect(prod.unit.unitB).to.equal(unitB);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let syn = new Synonym("synonym", "!", unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = syn.mul(unitB);
            expect(prod).to.be.an.instanceOf(UnitMul);
            expect(prod.unitA).to.equal(syn);
            expect(prod.unitB).to.equal(unitB);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            let one = new One();
            let quot = syn.div(one);
            expect(quot).to.equal(syn);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let syn = new Synonym("synonym", "!", unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(4.0, unitB);
            let quot = syn.div(pref);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.25);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(syn);
            expect(quot.unit.unitB).to.equal(unitB);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let syn = new Synonym("synonym", "!", unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = syn.div(unitB);
            expect(quot).to.be.an.instanceOf(UnitDiv);
            expect(quot.unitA).to.equal(syn);
            expect(quot.unitB).to.equal(unitB);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            let pow = syn.pow(1);
            expect(pow).to.equal(syn);
        });

        it("should return the powered unit by 'power'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let syn = new Synonym("synonym", "!", unit);
            let pow = syn.pow(3);
            expect(pow).to.be.an.instanceOf(UnitPow);
            expect(pow.unit).to.equal(syn);
            expect(pow.power).to.equal(3);
        });
    });
});

describe("Prefactored", () => {
    let Prefactored      = units.Prefactored;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let UnitMul          = units.UnitMul;
    let UnitDiv          = units.UnitDiv;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(prefactor, unit)", () => {
        it("should create a new Prefactored instance", () => {
            {
                let unit = new UnitBase({}, "test unit", "?", 1.0, 1);
                let pref = new Prefactored(3.0, unit);
                expect(pref).to.be.an.instanceOf(Prefactored);
                expect(Dimension.equal(pref.dimension, {})).to.be.true;
                expect(pref.name).to.equal("3 test unit");
                expect(pref.symbol).to.equal("* 3 ?");
                expect(pref.factor).to.equal(3.0);
                expect(pref.prefixPower).to.equal(1);
            }
            {
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0, 3);
                let pref = new Prefactored(3.0, unit);
                expect(Dimension.equal(pref.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
                expect(pref.name).to.equal("3 test unit 2");
                expect(pref.symbol).to.equal("* 3 !");
                expect(pref.factor).to.equal(6.0);
                expect(pref.prefixPower).to.equal(3);
            }
            {
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 1.0, 1);
                let pref = new Prefactored(3.0, unit);
                expect(Dimension.equal(
                    pref.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
                expect(pref.name).to.equal("3 test unit");
                expect(pref.symbol).to.equal("* 3 ?");
                expect(pref.factor).to.equal(3.0);
                expect(pref.prefixPower).to.equal(1);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unit = new Unit({}, "test unit", "?", 2.0);
            let pref = new Prefactored(3.0, unit);
            expect(pref.toString()).to.equal("3 test unit");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(18.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 3.0);
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(18.0);
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
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
                let pref = new Prefactored(3.0, unit);
                let x = pref.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(18.0);
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
            let pref = new Prefactored(3.0, unit);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = pref.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(Prefactored);
            expect(prefixed.prefactor).to.equal(3.0);
            expect(prefixed.unit).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unit.unit).to.equal(unit);
            expect(prefixed.unit.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unit = new Unit({}, "test unit", "?", 0.5);
            let pref = new Prefactored(2.0, unit);
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = pref.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { pref.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = new Quantity(3.14, {});
                expect(() => { pref.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { pref.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pref = new Prefactored(3.0, unit);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { pref.autoPrefixFor(x); }).to.throw(DimensionalError);
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
                let pref = new Prefactored(3.0, unit);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { pref.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pref = new Prefactored(2.0, unit);
            let scaled = pref.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(6.0);
            expect(scaled.unit).to.equal(unit);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pref = new Prefactored(2.0, unit);
            let one = new One();
            let prod = pref.mul(one);
            expect(prod).to.equal(pref);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefA = new Prefactored(2.0, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prefB = new Prefactored(3.0, unitB);
            let prod = prefA.mul(prefB);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(6.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(unitA);
            expect(prod.unit.unitB).to.equal(unitB);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pref = new Prefactored(3.0, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = pref.mul(unitB);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(3.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(unitA);
            expect(prod.unit.unitB).to.equal(unitB);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pref = new Prefactored(3.0, unit);
            let one = new One();
            let quot = pref.div(one);
            expect(quot).to.equal(pref);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefA = new Prefactored(3.0, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prefB = new Prefactored(4.0, unitB);
            let quot = prefA.div(prefB);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.75);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(unitA);
            expect(quot.unit.unitB).to.equal(unitB);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pref = new Prefactored(3.0, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = pref.div(unitB);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(3.0);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(unitA);
            expect(quot.unit.unitB).to.equal(unitB);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pref = new Prefactored(3.0, unit);
            let pow = pref.pow(1);
            expect(pow).to.be.an.instanceOf(Prefactored);
            expect(pow.prefactor).to.equal(3.0);
            expect(pow.unit).to.equal(unit);
        });

        it("should return the powered unit by 'power'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pref = new Prefactored(3.0, unit);
            let pow = pref.pow(3);
            expect(pow).to.be.an.instanceOf(Prefactored);
            expect(pow.unit).to.be.an.instanceOf(UnitPow);
            expect(pow.unit.unit).to.equal(unit);
            expect(pow.unit.power).to.equal(3);
            expect(pow.prefactor).to.equal(27.0);
        });
    });
});

describe("UnitMul", () => {
    let UnitMul          = units.UnitMul;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitDiv          = units.UnitDiv;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(prefactor, unit)", () => {
        it("should create a new UnitMul instance", () => {
            {
                let unitA = new UnitBase({}, "test unit 1", "?", 1.0, 1);
                let unitB = new UnitBase({}, "test unit 2", "!", 2.0, 2);
                let prod = new UnitMul(unitA, unitB);
                expect(prod).to.be.an.instanceOf(UnitMul);
                expect(prod.unitA).to.equal(unitA);
                expect(prod.unitB).to.equal(unitB);
                expect(Dimension.equal(prod.dimension, {})).to.be.true;
                expect(prod.name).to.equal("test unit 1 test unit 2");
                expect(prod.symbol).to.equal("?.!");
                expect(prod.factor).to.equal(2.0);
                expect(prod.prefixPower).to.equal(1);
            }
            {
                let unitA = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test 1", "!", 2.0, 2);
                let unitB = new UnitBase({ [Dimension.MASS]  : 1 }, "test 2", "?", 3.0, 1);
                let prod = new UnitMul(unitA, unitB);
                expect(prod).to.be.an.instanceOf(UnitMul);
                expect(prod.unitA).to.equal(unitA);
                expect(prod.unitB).to.equal(unitB);
                expect(Dimension.equal(
                    prod.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 1
                    }
                )).to.be.true;
                expect(prod.name).to.equal("test 1 test 2");
                expect(prod.symbol).to.equal("!.?");
                expect(prod.factor).to.equal(6.0);
                expect(prod.prefixPower).to.equal(2);
            }
            {
                let unitA = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0, 1
                );
                let unitB = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0, 2
                );
                let prod = new UnitMul(unitA, unitB);
                expect(prod).to.be.an.instanceOf(UnitMul);
                expect(prod.unitA).to.equal(unitA);
                expect(prod.unitB).to.equal(unitB);
                expect(Dimension.equal(
                    prod.dimension,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 1
                    }
                )).to.be.true;
                expect(prod.name).to.equal("test unit 1 test unit 2");
                expect(prod.symbol).to.equal("?.!");
                expect(prod.factor).to.equal(2.0);
                expect(prod.prefixPower).to.equal(1);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            expect(prod.toString()).to.equal("test unit 1 test unit 2");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unitA = new Unit({}, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = prod.value(3.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 2.0);
                let unitB = new Unit({ [Dimension.MASS]  : 1 }, "test unit 2", "!", 3.0);
                let prod = new UnitMul(unitA, unitB);
                let x = prod.value(4.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(24.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : 1
                    }
                )).to.be.true;
            }
            {
                let unitA = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0
                );
                let unitB = new Unit(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0
                );
                let prod = new UnitMul(unitA, unitB);
                let x = prod.value(3.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                )).to.be.true;
            }
        });
    });

    describe("#addPrefix(prefix)", () => {
        it("should return the prefixed version of the unit", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let prefix = new Prefix("test prefix", "_", 3.0);
            let prefixed = prod.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(UnitMul);
            expect(prefixed.unitA).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unitA.prefix).to.equal(prefix);
            expect(prefixed.unitA.unit).to.equal(unitA);
            expect(prefixed.unitB).to.equal(unitB);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 0.5);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = prod.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unitA = new Unit({}, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(3.14, {});
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({ [Dimension.MASS]  : 1 }, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(3.14, {});
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0
                );
                let unitB = new Unit(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0
                );
                let prod = new UnitMul(unitA, unitB);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { prod.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let scaled = prod.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(3.0);
            expect(scaled.unit).to.equal(prod);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod1 = new UnitMul(unitA, unitB);
            let one = new One();
            let prod2 = prod1.mul(one);
            expect(prod2).to.equal(prod1);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod1 = new UnitMul(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let pref = new Prefactored(3.0, unitC);
            let prod2 = prod1.mul(pref);
            expect(prod2).to.be.an.instanceOf(Prefactored);
            expect(prod2.prefactor).to.equal(3.0);
            expect(prod2.unit).to.be.an.instanceOf(UnitMul);
            expect(prod2.unit.unitA).to.equal(prod1);
            expect(prod2.unit.unitB).to.equal(unitC);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod1 = new UnitMul(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let prod2 = prod1.mul(unitC);
            expect(prod2).to.be.an.instanceOf(UnitMul);
            expect(prod2.unitA).to.equal(prod1);
            expect(prod2.unitB).to.equal(unitC);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let one = new One();
            let quot = prod.div(one);
            expect(quot).to.equal(prod);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let pref = new Prefactored(4.0, unitC);
            let quot = prod.div(pref);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.25);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(prod);
            expect(quot.unit.unitB).to.equal(unitC);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let quot = prod.div(unitC);
            expect(quot).to.be.an.instanceOf(UnitDiv);
            expect(quot.unitA).to.equal(prod);
            expect(quot.unitB).to.equal(unitC);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let pow = prod.pow(1);
            expect(pow).to.be.an.instanceOf(UnitMul);
            expect(pow.unitA).to.equal(unitA);
            expect(pow.unitB).to.equal(unitB);
        });

        it("should return the product of the powered units by 'power'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = new UnitMul(unitA, unitB);
            let pow = prod.pow(3);
            expect(pow).to.be.an.instanceOf(UnitMul);
            expect(pow.unitA).to.be.an.instanceOf(UnitPow);
            expect(pow.unitA.power).to.equal(3);
            expect(pow.unitA.unit).to.equal(unitA);
            expect(pow.unitB).to.be.an.instanceOf(UnitPow);
            expect(pow.unitB.power).to.equal(3);
            expect(pow.unitB.unit).to.equal(unitB);
        });
    });
});

describe("UnitDiv", () => {
    let UnitDiv          = units.UnitDiv;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitMul          = units.UnitMul;
    let UnitPow          = units.UnitPow;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(prefactor, unit)", () => {
        it("should create a new UnitDiv instance", () => {
            {
                let unitA = new UnitBase({}, "test unit 1", "?", 1.0, 1);
                let unitB = new UnitBase({}, "test unit 2", "!", 2.0, 2);
                let quot = new UnitDiv(unitA, unitB);
                expect(quot).to.be.an.instanceOf(UnitDiv);
                expect(quot.unitA).to.equal(unitA);
                expect(quot.unitB).to.equal(unitB);
                expect(Dimension.equal(quot.dimension, {})).to.be.true;
                expect(quot.name).to.equal("test unit 1 per test unit 2");
                expect(quot.symbol).to.equal("?/!");
                expect(quot.factor).to.equal(0.5);
                expect(quot.prefixPower).to.equal(1);
            }
            {
                let unitA = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test 1", "!", 3.0, 2);
                let unitB = new UnitBase({ [Dimension.MASS]  : 1 }, "test 2", "?", 2.0, 1);
                let quot = new UnitDiv(unitA, unitB);
                expect(quot).to.be.an.instanceOf(UnitDiv);
                expect(quot.unitA).to.equal(unitA);
                expect(quot.unitB).to.equal(unitB);
                expect(Dimension.equal(
                    quot.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : -1
                    }
                )).to.be.true;
                expect(quot.name).to.equal("test 1 per test 2");
                expect(quot.symbol).to.equal("!/?");
                expect(quot.factor).to.equal(1.5);
                expect(quot.prefixPower).to.equal(2);
            }
            {
                let unitA = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0, 1
                );
                let unitB = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0, 2
                );
                let quot = new UnitDiv(unitA, unitB);
                expect(quot).to.be.an.instanceOf(UnitDiv);
                expect(quot.unitA).to.equal(unitA);
                expect(quot.unitB).to.equal(unitB);
                expect(Dimension.equal(
                    quot.dimension,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: -1
                    }
                )).to.be.true;
                expect(quot.name).to.equal("test unit 1 per test unit 2");
                expect(quot.symbol).to.equal("?/!");
                expect(quot.factor).to.equal(0.5);
                expect(quot.prefixPower).to.equal(1);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            expect(quot.toString()).to.equal("test unit 1 per test unit 2");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unitA = new Unit({}, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = quot.value(3.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(1.5);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 3.0);
                let unitB = new Unit({ [Dimension.MASS]  : 1 }, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = quot.value(4.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.AMOUNT]: 1,
                        [Dimension.MASS]  : -1
                    }
                )).to.be.true;
            }
            {
                let unitA = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0
                );
                let unitB = new Unit(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0
                );
                let quot = new UnitDiv(unitA, unitB);
                let x = quot.value(3.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(1.5);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.AMOUNT]     : -1,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: -1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    }
                )).to.be.true;
            }
        });
    });

    describe("#addPrefix(prefix)", () => {
        it("should return the prefixed version of the unit", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let prefix = new Prefix("test prefix", "_", 3.0);
            let prefixed = quot.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(UnitDiv);
            expect(prefixed.unitA).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unitA.prefix).to.equal(prefix);
            expect(prefixed.unitA.unit).to.equal(unitA);
            expect(prefixed.unitB).to.equal(unitB);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
                let unitA = new Unit({}, "test unit 1", "?", 2.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
            for (let e = -24; e <= 26; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = quot.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0)
                    expect(Math.round(v)).to.be.at.most(1.0e3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unitA = new Unit({}, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(3.14, {});
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({ [Dimension.MASS]  : 1 }, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(3.14, {});
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit 1", "?", 1.0);
                let unitB = new Unit({}, "test unit 2", "!", 2.0);
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unitA = new Unit(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 1", "?", 1.0
                );
                let unitB = new Unit(
                    {
                        [Dimension.AMOUNT]     : 1,
                        [Dimension.MASS]       : 0,
                        [Dimension.LENGTH]     : 0,
                        [Dimension.TIME]       : 0,
                        [Dimension.TEMPERATURE]: 1,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit 2", "!", 2.0
                );
                let quot = new UnitDiv(unitA, unitB);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { quot.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let scaled = quot.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(3.0);
            expect(scaled.unit).to.equal(quot);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let one = new One();
            let prod = quot.mul(one);
            expect(prod).to.equal(quot);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let pref = new Prefactored(3.0, unitC);
            let prod = quot.mul(pref);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(3.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(quot);
            expect(prod.unit.unitB).to.equal(unitC);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let prod = quot.mul(unitC);
            expect(prod).to.be.an.instanceOf(UnitMul);
            expect(prod.unitA).to.equal(quot);
            expect(prod.unitB).to.equal(unitC);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot1 = new UnitDiv(unitA, unitB);
            let one = new One();
            let quot2 = quot1.div(one);
            expect(quot2).to.equal(quot1);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot1 = new UnitDiv(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let pref = new Prefactored(4.0, unitC);
            let quot2 = quot1.div(pref);
            expect(quot2).to.be.an.instanceOf(Prefactored);
            expect(quot2.prefactor).to.equal(0.25);
            expect(quot2.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot2.unit.unitA).to.equal(quot1);
            expect(quot2.unit.unitB).to.equal(unitC);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot1 = new UnitDiv(unitA, unitB);
            let unitC = new Unit({}, "test unit 3", "_", 3.0);
            let quot2 = quot1.div(unitC);
            expect(quot2).to.be.an.instanceOf(UnitDiv);
            expect(quot2.unitA).to.equal(quot1);
            expect(quot2.unitB).to.equal(unitC);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let pow = quot.pow(1);
            expect(pow).to.be.an.instanceOf(UnitDiv);
            expect(pow.unitA).to.equal(unitA);
            expect(pow.unitB).to.equal(unitB);
        });

        it("should return the product of the powered units by 'power'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = new UnitDiv(unitA, unitB);
            let pow = quot.pow(3);
            expect(pow).to.be.an.instanceOf(UnitDiv);
            expect(pow.unitA).to.be.an.instanceOf(UnitPow);
            expect(pow.unitA.power).to.equal(3);
            expect(pow.unitA.unit).to.equal(unitA);
            expect(pow.unitB).to.be.an.instanceOf(UnitPow);
            expect(pow.unitB.power).to.equal(3);
            expect(pow.unitB.unit).to.equal(unitB);
        });
    });
});

describe("UnitPow", () => {
    let UnitPow      = units.UnitPow;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitMul          = units.UnitMul;
    let UnitDiv          = units.UnitDiv;
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;

    describe("constructor(unit, power)", () => {
        it("should create a new UnitPow instance", () => {
            {
                let unit = new UnitBase({}, "test unit", "?", 1.0, 1);
                let pow = new UnitPow(unit, 3);
                expect(pow).to.be.an.instanceOf(UnitPow);
                expect(Dimension.equal(pow.dimension, {})).to.be.true;
                expect(pow.name).to.equal("test unit^3");
                expect(pow.symbol).to.equal("?^3");
                expect(pow.factor).to.equal(1.0);
                expect(pow.prefixPower).to.equal(3);
            }
            {
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0, 2);
                let pow = new UnitPow(unit, 4);
                expect(pow).to.be.an.instanceOf(UnitPow);
                expect(Dimension.equal(pow.dimension, { [Dimension.AMOUNT]: 4 })).to.be.true;
                expect(pow.name).to.equal("test unit 2^4");
                expect(pow.symbol).to.equal("!^4");
                expect(pow.factor).to.equal(16.0);
                expect(pow.prefixPower).to.equal(8);
            }
            {
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 1.0, 1);
                let pow = new UnitPow(unit, 3);
                expect(pow).to.be.an.instanceOf(UnitPow);
                expect(Dimension.equal(
                    pow.dimension,
                    {
                        [Dimension.MASS]       : 3,
                        [Dimension.LENGTH]     : 6,
                        [Dimension.TIME]       : -6
                    }
                )).to.be.true;
                expect(pow.name).to.equal("test unit^3");
                expect(pow.symbol).to.equal("?^3");
                expect(pow.factor).to.equal(1.0);
                expect(pow.prefixPower).to.equal(3);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unit = new Unit({}, "test unit", "?", 2.0);
            let pow = new UnitPow(unit, 3);
            expect(pow.toString()).to.equal("test unit^3");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = pow.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let pow = new UnitPow(unit, 3);
                let x = pow.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(54.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = pow.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(x.dimension, { [Dimension.AMOUNT]: 3 })).to.be.true;
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
                let pow = new UnitPow(unit, 3);
                let x = pow.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(2.0);
                expect(Dimension.equal(
                    x.dimension,
                    {
                        [Dimension.MASS]       : 3,
                        [Dimension.LENGTH]     : 6,
                        [Dimension.TIME]       : -6
                    }
                )).to.be.true;
            }
        });
    });

    describe("#addPrefix(prefix)", () => {
        it("should return the prefixed version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 2.0);
            let pow = new UnitPow(unit, 3);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = pow.addPrefix(prefix);
            expect(prefixed).to.be.an.instanceOf(UnitPow);
            expect(prefixed.power).to.equal(3);
            expect(prefixed.unit).to.be.an.instanceOf(Prefixed);
            expect(prefixed.unit.unit).to.equal(unit);
            expect(prefixed.unit.prefix).to.equal(prefix);
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = new UnitPow(unit, 3);
            for (let e = -72; e < 81; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixed = pow.autoPrefixFor(x);
                    let v = x.in(prefixed);
                    expect(v).to.be.at.least(1.0);
                    expect(Math.round(v)).to.be.at.most(1.0e+9);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { pow.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = new Quantity(3.14, {});
                expect(() => { pow.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { pow.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let pow = new UnitPow(unit, 3);
                let x = new Quantity(3.14, { [Dimension.MASS]: 3 });
                expect(() => { pow.autoPrefixFor(x); }).to.throw(DimensionalError);
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
                let pow = new UnitPow(unit, 3);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { pow.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = new UnitPow(unit, 3);
            let scaled = pow.scale(3.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(3.0);
            expect(scaled.unit).to.equal(pow);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = new UnitPow(unit, 3);
            let one = new One();
            let prod = pow.mul(one);
            expect(prod).to.equal(pow);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pow = new UnitPow(unitA, 3);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(3.0, unitB);
            let prod = pow.mul(pref);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(3.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(pow);
            expect(prod.unit.unitB).to.equal(unitB);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pow = new UnitPow(unitA, 3);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = pow.mul(unitB);
            expect(prod).to.be.an.instanceOf(UnitMul);
            expect(prod.unitA).to.equal(pow);
            expect(prod.unitB).to.equal(unitB);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let pow = new UnitPow(unit, 3);
            let one = new One();
            let quot = pow.div(one);
            expect(quot).to.equal(pow);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pow = new UnitPow(unitA, 3);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(4.0, unitB);
            let quot = pow.div(pref);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.25);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(pow);
            expect(quot.unit.unitB).to.equal(unitB);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let pow = new UnitPow(unitA, 3);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = pow.div(unitB);
            expect(quot).to.be.an.instanceOf(UnitDiv);
            expect(quot.unitA).to.equal(pow);
            expect(quot.unitB).to.equal(unitB);
        });
    });

    describe("#pow(power)", () => {
        it("should return the powered unit by 'power'; the power is multiplied", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let powA = new UnitPow(unit, 2);
            let powB = powA.pow(3);
            expect(powB).to.be.an.instanceOf(UnitPow);
            expect(powB.unit).to.equal(unit);
            expect(powB.power).to.equal(6);
        });
    });
});


describe("Prefixed", () => {
    let Prefix           = units.Prefix;
    let Prefixed         = units.Prefixed;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Quantity         = units.Quantity;
    let UnitBase         = units.UnitBase;
    let Unit             = units.Unit;
    let One              = units.One;
    let Prefactored      = units.Prefactored;
    let UnitMul          = units.UnitMul;
    let UnitDiv          = units.UnitDiv;
    let UnitPow          = units.UnitPow;

    describe("constructor(unit, power)", () => {
        it("should create a new Prefixed instance", () => {
            {
                let unit = new UnitBase({}, "test unit", "?", 1.0, 1);
                let prefix = new Prefix("test prefix", "!", 3.0);
                let prefixed = new Prefixed(prefix, unit);
                expect(prefixed).to.be.an.instanceOf(Prefixed);
                expect(Dimension.equal(prefixed.dimension, {})).to.be.true;
                expect(prefixed.name).to.equal("test prefixtest unit");
                expect(prefixed.symbol).to.equal("!?");
                expect(prefixed.factor).to.equal(3.0);
                expect(prefixed.prefixPower).to.equal(1);
            }
            {
                let unit = new UnitBase({ [Dimension.AMOUNT]: 1 }, "test unit 2", "!", 2.0, 2);
                let prefix = new Prefix("foo", "_", 4.0);
                let prefixed = new Prefixed(prefix, unit);
                expect(prefixed).to.be.an.instanceOf(Prefixed);
                expect(Dimension.equal(prefixed.dimension, { [Dimension.AMOUNT]: 1 })).to.be.true;
                expect(prefixed.name).to.equal("footest unit 2");
                expect(prefixed.symbol).to.equal("_!");
                expect(prefixed.factor).to.equal(8.0);
                expect(prefixed.prefixPower).to.equal(2);
            }
            {
                let unit = new UnitBase(
                    {
                        [Dimension.AMOUNT]     : 0,
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2,
                        [Dimension.TEMPERATURE]: 0,
                        [Dimension.CURRENT]    : 0,
                        [Dimension.LUMINOUS]   : 0
                    },
                    "test unit", "?", 1.0, 1);
                let prefix = new Prefix("test prefix", "!", 3.0);
                let prefixed = new Prefixed(prefix, unit);
                expect(prefixed).to.be.an.instanceOf(Prefixed);
                expect(Dimension.equal(
                    prefixed.dimension,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 2,
                        [Dimension.TIME]       : -2
                    }
                )).to.be.true;
                expect(prefixed.name).to.equal("test prefixtest unit");
                expect(prefixed.symbol).to.equal("!?");
                expect(prefixed.factor).to.equal(3.0);
                expect(prefixed.prefixPower).to.equal(1);
            }
        });
    });

    describe("#toString()", () => {
        it("should return its name", () => {
            let unit = new Unit({}, "test unit", "?", 2.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            expect(prefixed.toString()).to.equal("test prefixtest unit");
        });
    });

    describe("#value(value)", () => {
        it("should return a quantity in the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 3.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = prefixed.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(6.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({}, "test unit", "?", 3.0);
                let prefix = new Prefix("test prefix", "!", 4.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = prefixed.value(2.0);
                expect(x).to.instanceOf(Quantity);
                expect(x.value).to.equal(24.0);
                expect(Dimension.equal(x.dimension, {})).to.be.true;
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 3.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = prefixed.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
                let prefix = new Prefix("test prefix", "!", 3.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = prefixed.value(2.0);
                expect(x).to.instanceOf(Quantity);
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
        it("should calculate the total prefactor and return the auto-prefixed version of the unit", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prefixA = new Prefix("test prefix 1", "a", 1.0e+1);
                let prefixedA = new Prefixed(prefixA, unit);
                let prefixB = new Prefix("test prefix 2", "b", 1.0e+2);
                let prefixedB = prefixedA.addPrefix(prefixB);
                expect(prefixedB).to.be.an.instanceOf(Prefixed);
                expect(prefixedB.prefix).to.be.an.instanceOf(Prefix);
                expect(prefixedB.prefix.name).to.equal("kilo");
                expect(prefixedB.unit).to.equal(unit);
            }
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prefixA = new Prefix("test prefix 1", "a", 3.0e+2);
                let prefixedA = new Prefixed(prefixA, unit);
                let prefixB = new Prefix("test prefix 2", "b", 1.0e+4);
                let prefixedB = prefixedA.addPrefix(prefixB);
                expect(prefixedB).to.be.an.instanceOf(Prefactored);
                expect(prefixedB.prefactor).to.equal(3.0);
                expect(prefixedB.unit).to.be.an.instanceOf(Prefixed);
                expect(prefixedB.unit.prefix).to.be.an.instanceOf(Prefix);
                expect(prefixedB.unit.prefix.name).to.equal("mega");
                expect(prefixedB.unit.unit).to.equal(unit);
            }
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prefixA = new Prefix("test prefix 1", "a", 1.0e+1);
                let prefixedA = new Prefixed(prefixA, unit);
                let prefixB = new Prefix("test prefix 2", "b", 2.0e+1);
                let prefixedB = prefixedA.addPrefix(prefixB);
                expect(prefixedB).to.be.an.instanceOf(Prefactored);
                expect(prefixedB.prefactor).to.equal(200.0);
                expect(prefixedB.unit).to.equal(unit);
            }
        });
    });

    describe("#autoPrefixFor(quantity)", () => {
        it("should return the auto-prefixed version of the unit reasonable for 'quantity'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 1000.0);
            let prefixedA = new Prefixed(prefix, unit);
            for (let e = -21; e < 30; e++) {
                for (let i = 1; i <= 9; i++) {
                    let x = new Quantity(i * Math.pow(10.0, e), {});
                    let prefixedB = prefixedA.autoPrefixFor(x);
                    let v = x.in(prefixedB);
                    expect(v).to.be.at.least(1.0);
                    expect(Math.round(v)).to.be.at.most(1.0e+3);
                }
            }
        });

        it("should throw DimensionalError if the dimensions are consistent", () => {
            {
                let unit = new Unit({}, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 1000.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 1 });
                expect(() => { prefixed.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 1000.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = new Quantity(3.14, {});
                expect(() => { prefixed.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 1000.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = new Quantity(3.14, { [Dimension.AMOUNT]: 2 });
                expect(() => { prefixed.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
            {
                let unit = new Unit({ [Dimension.AMOUNT]: 1 }, "test unit", "?", 1.0);
                let prefix = new Prefix("test prefix", "!", 1000.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = new Quantity(3.14, { [Dimension.MASS]: 1 });
                expect(() => { prefixed.autoPrefixFor(x); }).to.throw(DimensionalError);
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
                let prefix = new Prefix("test prefix", "!", 1000.0);
                let prefixed = new Prefixed(prefix, unit);
                let x = new Quantity(
                    3.14,
                    {
                        [Dimension.MASS]       : 1,
                        [Dimension.LENGTH]     : 1,
                        [Dimension.TIME]       : -2
                    });
                expect(() => { prefixed.autoPrefixFor(x); }).to.throw(DimensionalError);
            }
        });
    });

    describe("#scale(factor)", () => {
        it("should return the scaled version of the unit", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            let scaled = prefixed.scale(4.0);
            expect(scaled).to.be.an.instanceOf(Prefactored);
            expect(scaled.prefactor).to.equal(4.0);
            expect(scaled.unit).to.equal(prefixed);
        });
    });

    describe("#mul(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            let one = new One();
            let prod = prefixed.mul(one);
            expect(prod).to.equal(prefixed);
        });

        it("should return the prefactored product of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(4.0, unitB);
            let prod = prefixed.mul(pref);
            expect(prod).to.be.an.instanceOf(Prefactored);
            expect(prod.prefactor).to.equal(4.0);
            expect(prod.unit).to.be.an.instanceOf(UnitMul);
            expect(prod.unit.unitA).to.equal(prefixed);
            expect(prod.unit.unitB).to.equal(unitB);
        });

        it("should return the product unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let prod = prefixed.mul(unitB);
            expect(prod).to.be.an.instanceOf(UnitMul);
            expect(prod.unitA).to.equal(prefixed);
            expect(prod.unitB).to.equal(unitB);
        });
    });

    describe("#div(unit)", () => {
        it("should return the unit if 'unit' is a One", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            let one = new One();
            let quot = prefixed.div(one);
            expect(quot).to.equal(prefixed);
        });

        it("should return the prefactored quotient of this and the original unit of 'unit' if 'unit' is a Prefactored", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let pref = new Prefactored(4.0, unitB);
            let quot = prefixed.div(pref);
            expect(quot).to.be.an.instanceOf(Prefactored);
            expect(quot.prefactor).to.equal(0.25);
            expect(quot.unit).to.be.an.instanceOf(UnitDiv);
            expect(quot.unit.unitA).to.equal(prefixed);
            expect(quot.unit.unitB).to.equal(unitB);
        });

        it("should return the quotient unit of this and 'unit'", () => {
            let unitA = new Unit({}, "test unit 1", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unitA);
            let unitB = new Unit({}, "test unit 2", "!", 2.0);
            let quot = prefixed.div(unitB);
            expect(quot).to.be.an.instanceOf(UnitDiv);
            expect(quot.unitA).to.equal(prefixed);
            expect(quot.unitB).to.equal(unitB);
        });
    });

    describe("#pow(power)", () => {
        it("should return the unit itself if 'power' is 1", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            let pow = prefixed.pow(1);
            expect(pow).to.equal(prefixed);
        });

        it("should return the powered unit by 'power'", () => {
            let unit = new Unit({}, "test unit", "?", 1.0);
            let prefix = new Prefix("test prefix", "!", 3.0);
            let prefixed = new Prefixed(prefix, unit);
            let pow = prefixed.pow(3);
            expect(pow).to.be.an.instanceOf(UnitPow);
            expect(pow.unit).to.equal(prefixed);
            expect(pow.power).to.equal(3);
        });
    });
});

describe("UnitSystem", () => {
    let UnitSystem       = units.UnitSystem;
    let Dimension        = units.Dimension;
    let DimensionalError = units.DimensionalError;
    let Unit             = units.Unit;
    let One              = units.One;
    let Synonym          = units.Synonym;
    let UnitMul          = units.UnitMul;
    let UnitPow          = units.UnitPow;

    describe("constructor(base, synonyms)", () => {
        it("should create a new UnitSystem instance", () => {
            let bases = {
                [Dimension.AMOUNT]     : new Unit({ [Dimension.AMOUNT]     : 1 },      "#amount", "N", 1.0),
                [Dimension.MASS]       : new Unit({ [Dimension.MASS]       : 1 },        "#mass", "M", 1.0),
                [Dimension.LENGTH]     : new Unit({ [Dimension.LENGTH]     : 1 },      "#length", "L", 1.0),
                [Dimension.TIME]       : new Unit({ [Dimension.TIME]       : 1 },        "#time", "T", 1.0),
                [Dimension.TEMPERATURE]: new Unit({ [Dimension.TEMPERATURE]: 1 }, "#temperature", "Θ", 1.0),
                [Dimension.CURRENT]    : new Unit({ [Dimension.CURRENT]    : 1 },     "#current", "I", 1.0),
                [Dimension.LUMINOUS]   : new Unit({ [Dimension.LUMINOUS]   : 1 },    "#luminous", "J", 1.0)
            };
            let synonyms = [
                new Synonym("#foo", "f",
                    new Unit(
                        {
                            [Dimension.MASS]  : 1,
                            [Dimension.LENGTH]: 2,
                            [Dimension.TIME]  : -2
                        },
                        "#energy", "E"
                    )
                )
            ];
            let us = new UnitSystem(bases, synonyms);
            expect(us).to.be.an.instanceOf(UnitSystem);
            expect(us.bases).to.deep.equal(bases);
            expect(us.synonyms).to.deep.equal(synonyms);
        });

        it("should throw an Error if 'bases' lacks a base unit", () => {
            let bases = {
                [Dimension.AMOUNT]     : new Unit({ [Dimension.AMOUNT]     : 1 },      "#amount", "N", 1.0),
                [Dimension.LENGTH]     : new Unit({ [Dimension.LENGTH]     : 1 },      "#length", "L", 1.0),
                [Dimension.TIME]       : new Unit({ [Dimension.TIME]       : 1 },        "#time", "T", 1.0),
                [Dimension.TEMPERATURE]: new Unit({ [Dimension.TEMPERATURE]: 1 }, "#temperature", "Θ", 1.0),
                [Dimension.CURRENT]    : new Unit({ [Dimension.CURRENT]    : 1 },     "#current", "I", 1.0),
                [Dimension.LUMINOUS]   : new Unit({ [Dimension.LUMINOUS]   : 1 },    "#luminous", "J", 1.0)
            };
            expect(() => { new UnitSystem(bases, []); }).to.throw(Error);
        });

        it("shoud throw a DimensionalError if a base unit has incorrect dimension", () => {
            let bases = {
                [Dimension.AMOUNT]     : new Unit({ [Dimension.AMOUNT]     : 1 },      "#amount", "N", 1.0),
                [Dimension.MASS]       : new Unit({ [Dimension.MASS]       : 2 },        "#mass", "M", 1.0),
                [Dimension.LENGTH]     : new Unit({ [Dimension.LENGTH]     : 1 },      "#length", "L", 1.0),
                [Dimension.TIME]       : new Unit({ [Dimension.TIME]       : 1 },        "#time", "T", 1.0),
                [Dimension.TEMPERATURE]: new Unit({ [Dimension.TEMPERATURE]: 1 }, "#temperature", "Θ", 1.0),
                [Dimension.CURRENT]    : new Unit({ [Dimension.CURRENT]    : 1 },     "#current", "I", 1.0),
                [Dimension.LUMINOUS]   : new Unit({ [Dimension.LUMINOUS]   : 1 },    "#luminous", "J", 1.0)
            };
            expect(() => { new UnitSystem(bases, []); }).to.throw(DimensionalError);
        });
    });

    describe("#unitFor(dimension)", () => {
        it("should return a unit that matches to 'dimension'", () => {
            let bases = {
                [Dimension.AMOUNT]     : new Unit({ [Dimension.AMOUNT]     : 1 },      "#amount", "N", 1.0),
                [Dimension.MASS]       : new Unit({ [Dimension.MASS]       : 1 },        "#mass", "M", 1.0),
                [Dimension.LENGTH]     : new Unit({ [Dimension.LENGTH]     : 1 },      "#length", "L", 1.0),
                [Dimension.TIME]       : new Unit({ [Dimension.TIME]       : 1 },        "#time", "T", 1.0),
                [Dimension.TEMPERATURE]: new Unit({ [Dimension.TEMPERATURE]: 1 }, "#temperature", "Θ", 1.0),
                [Dimension.CURRENT]    : new Unit({ [Dimension.CURRENT]    : 1 },     "#current", "I", 1.0),
                [Dimension.LUMINOUS]   : new Unit({ [Dimension.LUMINOUS]   : 1 },    "#luminous", "J", 1.0)
            };
            let f = new Synonym("#foo", "f",
                new Unit(
                    {
                        [Dimension.MASS]  : 1,
                        [Dimension.LENGTH]: 1,
                        [Dimension.TIME]  : -2
                    },
                    "#force", "F"
                )
            );
            let e = new Synonym("#bar", "r",
                new Unit(
                    {
                        [Dimension.MASS]  : 1,
                        [Dimension.LENGTH]: 2,
                        [Dimension.TIME]  : -2
                    },
                    "#energy", "E"
                )
            );
            let p = new Synonym("#baz", "z",
                new Unit(
                    {
                        [Dimension.MASS]  : 1,
                        [Dimension.LENGTH]: 2,
                        [Dimension.TIME]  : -3
                    },
                    "#power", "P"
                )
            );
            let synonyms = [f, e, p];
            let us = new UnitSystem(bases, synonyms);
            {
                let unit = us.unitFor({});
                expect(unit).to.be.an.instanceOf(One);
            }
            {
                let unit = us.unitFor({ [Dimension.MASS]: 1 });
                expect(unit).to.equal(bases[Dimension.MASS]);
            }
            {
                let unit = us.unitFor({ [Dimension.MASS]: 3 });
                expect(unit).to.be.an.instanceOf(UnitPow);
                expect(unit.power).to.equal(3);
                expect(unit.unit).to.equal(bases[Dimension.MASS]);
            }
            {
                let unit = us.unitFor({
                    [Dimension.MASS]  : 1,
                    [Dimension.LENGTH]: 2,
                    [Dimension.TIME]  : -1
                });
                expect(unit).to.be.an.instanceOf(UnitMul);
                expect(Dimension.equal(
                    unit.dimension,
                    {
                        [Dimension.MASS]  : 1,
                        [Dimension.LENGTH]: 2,
                        [Dimension.TIME]  : -1
                    }
                )).to.be.true;
            }
            {
                let unit = us.unitFor({
                    [Dimension.MASS]  : 1,
                    [Dimension.LENGTH]: 2,
                    [Dimension.TIME]  : -2
                });
                expect(unit).to.equal(e);
            }
        });
    });

    describe("#unitForQuantity(quantity)", () => {
        it("should return a unit that matches to 'quantity'");
    });
});
