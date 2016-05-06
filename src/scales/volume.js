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
    }
];

export default values.map(x => ({
    quantity   : SIUnit.CUBIC_METRE.value(x.value),
    description: x.description
}));
