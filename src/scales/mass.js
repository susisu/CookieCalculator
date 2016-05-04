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
    },
    {
        value: 4e+12,
        description:
            `Global annual human food production`
    },
    {
        value: 4e+13,
        description:
            `Global annual human carbon dioxide emission`
    },
    {
        value: 1.6e+17,
        description:
            `Prometheus (a satellite of Saturn)`
    },
    {
        value: 5.1e+18,
        description:
            `Earth's atmosphere`
    },
    {
        value: 5.6e+18,
        description:
            `Hyperion (a satellite of Saturn)`
    },
    {
        value: 9.4e+20,
        description:
            `Ceres`
    },
    {
        value: 1.4e+21,
        description:
            `Earth's ocean`
    },
    {
        value: 1.5e+21,
        description:
            `Charon`
    },
    {
        value: 1.3e+22,
        description:
            `Pluto`
    },
    {
        value: 7.3e+22,
        description:
            `The Moon`
    },
    {
        value: 3.3e+23,
        description:
            `Mercury`
    },
    {
        value: 6.4e+23,
        description:
            `Mars`
    },
    {
        value: 4.9e+24,
        description:
            `Venus`
    },
    {
        value: 6.0e+24,
        description:
            `Earth`
    },
    {
        value: 8.7e+25,
        description:
            `Uranus`
    },
    {
        value: 1.0e+26,
        description:
            `Neptune`
    },
    {
        value: 5.7e+26,
        description:
            `Saturn`
    },
    {
        value: 1.9e+27,
        description:
            `Jupiter`
    },
    {
        value: 1.989e+30,
        description:
            `The Sun`
    },
    {
        value: 4.1e+31,
        description:
            `Betelgeuse`
    },
    {
        value: 1.6e+33,
        description:
            `Pleiades star cluster`
    },
    {
        value: 7e+36,
        description:
            `The black hole at the center of the Milky Way`
    },
    {
        value: 1.2e+42,
        description:
            `Milky Way Galaxy`
    },
    {
        value: 4.4506e+52,
        description:
            `Mass of the observable universe`
    }
];

export default values.map(x => ({
    quantity   : SIUnit.KILOGRAM.value(x.value),
    description: x.description
}));
