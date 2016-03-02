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
});
