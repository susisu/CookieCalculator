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
    }
];

export default values.map(x => ({
    quantity   : SIUnit.CUBIC_METRE.value(x.value),
    description: x.description
}));
