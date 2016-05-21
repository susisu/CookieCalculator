/*
 * Cookie Calculator / scales/amount.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { ONE } from "../units.js";

let values = [
    {
        value: 1,
        description:
            `One`
    },
    {
        value: 8,
        description:
            `Planets in the Solar System`
    },
    {
        value: 10,
        description:
            `Fingers on a pair of human hands`
    },
    {
        value: 26,
        description:
            `English alphabet characters`
    },
    {
        value: 42,
        description:
            `The Answer to the Ultimate Question of Life, the Universe, and Everything`
    },
    {
        value: 128,
        description:
            `ASCII characters`
    },
    {
        value: 690,
        description:
            `Population in the Vatican City (as of July 2014 estimate)`
    },
    {
        value: 3500,
        description:
            `Approximate number of the common chinese characters used in Chinese or Japanese`
    },
    {
        value: 50000,
        description:
            `Approximate number of all the distinct chinese characters`
    },
    {
        value: 355000,
        description:
            `English words contained in the Oxford Dictionary of English (2005)`
    },
    {
        value: 5e+6,
        description:
            `Approximate number of the articles of Wikipedia (English)`
    },
    {
        value: 16777216,
        description:
            `Colors on computer displays represented in True color (24bit RGB)`
    },
    {
        value: 1.2698e+8,
        description:
            `Population in Japan (as of April 2016)`
    },
    {
        value: 1.381e+9,
        description:
            `Population in China (as of March 2016)`
    },
    {
        value: 7.4e+9,
        description:
            `Estimated world population (as of March 2016)`
    },
    {
        value: 3e+10,
        description:
            `Web pages indexed by Google (as of 2014)`
    },
    {
        value: 1e+11,
        description:
            `Neurons in the human brain`
    },
    {
        value: 2e+11,
        description:
            `Stars in the Milky Way Galaxy`
    },
    {
        value: 1e+12,
        description:
            `Start in the Andromeda Galaxy`
    },
    {
        value: 3.72e+13,
        description:
            `Cells in the human body`
    },
    {
        value: 1e+15,
        description:
            `Synapses in the human brain`
    },
    {
        value: 4.33e+19,
        description:
            `Possible positions of a 3x3x3 Rubik's cube`
    }
];

export default values.map(x => ({
    quantity   : ONE.value(x.value),
    description: x.description
}));
