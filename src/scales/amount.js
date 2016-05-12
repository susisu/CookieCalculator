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
    }
];

export default values.map(x => ({
    quantity   : ONE.value(x.value),
    description: x.description
}));
