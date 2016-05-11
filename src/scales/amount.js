/*
 * Cookie Calculator / scales/amount.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { ONE } from "../units.js";

let values = [
    {
        value: 6.02e+23,
        description:
            `Avogadro number`
    }
];

export default values.map(x => ({
    quantity   : ONE.value(x.value),
    description: x.description
}));
