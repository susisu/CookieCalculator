/*
 * Cookie Calculator / scales/mass.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { SIUnit } from "../units.js";

let values = [
    {
        value: 9.11e-31,
        description:
            `Electron`
    },
    {
        value: 1.9e-28,
        description:
            `Muon`
    },
    {
        value: 1.674e-27,
        description:
            `Hydrogen atom`
    },
    {
        value: 3.0e-26,
        description:
            `Water molecule`
    },
    {
        value: 3.5e-25,
        description:
            `Lead-208 atom`
    },
    {
        value: 5.5e-23,
        description:
            `Typical protein`
    },
    {
        value: 6.8e-20,
        description:
            `Tabacco mosaic virus`
    },
    {
        value: 3e-16,
        description:
            `Cyanobacteria`
    },
    {
        value: 1.5e-13,
        description:
            `Green algae`
    },
    {
        value: 1e-12,
        description:
            `Average human cell`
    },
    {
        value: 3.5e-10,
        description:
            `Very fine grain of sand`
    },
    {
        value: 7e-18,
        description:
            `One eyelash hair`
    },
    {
        value: 2e-7,
        description:
            `Fruit fly`
    }
];

export default values.map(x => ({
    quantity   : SIUnit.KILOGRAM.value(x.value),
    description: x.description
}));
