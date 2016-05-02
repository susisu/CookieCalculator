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
    },
    {
        value: 2.5e-6,
        description:
            `Mosquito`
    },
    {
        value: 2e-5,
        description:
            `Housefly`
    },
    {
        value: 2e-4,
        description:
            `1 carat`
    },
    {
        value: 5e-3,
        description:
            `Raisin`
    },
    {
        value: 2e-2,
        description:
            `Mouse`
    },
    {
        value: 2.8e-2,
        description:
            `1 ounce`
    },
    {
        value: 1e-1,
        description:
            `Orange`
    },
    {
        value: 4.54e-1,
        description:
            `1 pound`
    },
    {
        value: 1,
        description:
            `Laptop computer`
    },
    {
        value: 3,
        description:
            `Human baby`
    },
    {
        value: 4,
        description:
            `Housecat`
    },
    {
        value: 1e+1,
        description:
            `Medium-sized dog`
    },
    {
        value: 6e+1,
        description:
            `Adult human`
    },
    {
        value: 3e+2,
        description:
            `Grand piano`
    },
    {
        value: 1e+3,
        description:
            `1 tonne`
    },
    {
        value: 3e+3,
        description:
            `Elephant`
    },
    {
        value: 1.1e+4,
        description:
            `Hubble Space Telescope`
    },
    {
        value: 1.8e+5,
        description:
            `Blue whale`
    },
    {
        value: 1e+6,
        description:
            `Trunk of a giant sequoia tree`
    },
    {
        value: 5.2e+7,
        description:
            `RMS Titanic`
    },
    {
        value: 6e+9,
        description:
            `Great Pyramid of Giza`
    },
    {
        value: 4e+11,
        description:
            `Total mass of the world's human population`
    }
];

export default values.map(x => ({
    quantity   : SIUnit.KILOGRAM.value(x.value),
    description: x.description
}));
