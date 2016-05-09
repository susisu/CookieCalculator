/*
 * Cookie Calculator / scales/volume.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { SIUnit } from "../units.js";

let values = [
    {
        value: 2.82e-45,
        description:
            `Proton`
    },
    {
        value: 7.23e-30,
        description:
            `Hydrogen atom`
    },
    {
        value: 5e-21,
        description:
            `A virus`
    },
    {
        value: 9e-17,
        description:
            `Human red blood cell`
    },
    {
        value: 2e-15,
        description:
            `Ink drop of a printer`
    },
    {
        value: 6.2e-11,
        description:
            `A medium grain of sand`
    },
    {
        value: 2e-8,
        description:
            `A grain of rice`
    },
    {
        value: 2e-7,
        description:
            `Pea`
    },
    {
        value: 5e-6,
        description:
            `One teaspoon`
    },
    {
        value: 1.5e-5,
        description:
            `One tablespoon`
    },
    {
        value: 7.5e-4,
        description:
            `Wine bottle`
    },
    {
        value: 1.4e-3,
        description:
            `Human brain cavity`
    },
    {
        value: 5e-3,
        description:
            `Human blood`
    },
    {
        value: 6e-2,
        description:
            `Gasoline fuel tank in a car`
    },
    {
        value: 7.1e-2,
        description:
            `Human`
    },
    {
        value: 2e-1,
        description:
            `Drum`
    },
    {
        value: 1e0,
        description:
            `Domestic refrigerator`
    },
    {
        value: 3.31e+1,
        description:
            `20-foot cargo container`
    },
    {
        value: 6.75e+1,
        description:
            `40-foot cargo container`
    },
    {
        value: 2.5e+3,
        description:
            `Olympic size swimming pool`
    },
    {
        value: 2.11890e+5,
        description:
            `Gas in the Hindenburg zeppelin`
    },
    {
        value: 2.6006e+6,
        description:
            `The Great Pyramid of Giza`
    },
    {
        value: 4.3e+7,
        description:
            `Aswan Dam`
    },
    {
        value: 5e+8,
        description:
            `volume of Sydney Harbour`
    },
    {
        value: 3.2e+11,
        description:
            `Annual inflow of freshwater to the Black Sea`
    },
    {
        value: 1.1e+12,
        description:
            `Aral Sea (as of 1960)`
    },
    {
        value: 5.5e+14,
        description:
            `Black Sea`
    },
    {
        value: 3.7e+15,
        description:
            `Mediterranean Sea`
    },
    {
        value: 3e+17,
        description:
            `Atlantic Ocean`
    },
    {
        value: 4.5e+17,
        description:
            `Ceres`
    },
    {
        value: 1e+18,
        description:
            `Pacific Ocean`
    },
    {
        value: 6.4e+18,
        description:
            `Pluto`
    },
    {
        value: 2.2e+19,
        description:
            `The Moon`
    },
    {
        value: 6.1e+19,
        description:
            `Mercury`
    },
    {
        value: 1.6e+20,
        description:
            `Mars`
    },
    {
        value: 9.28e+20,
        description:
            `Venus`
    },
    {
        value: 1.08e+21,
        description:
            `Earth`
    },
    {
        value: 6.38e+22,
        description:
            `Neptune`
    },
    {
        value: 7.02e+22,
        description:
            `Uranus`
    },
    {
        value: 9.23e+23,
        description:
            `Saturn`
    },
    {
        value: 1.53e+24,
        description:
            `Jupiter`
    },
    {
        value: 1.41e+27,
        description:
            `The Sun`
    }
];

export default values.map(x => ({
    quantity   : SIUnit.CUBIC_METRE.value(x.value),
    description: x.description
}));
