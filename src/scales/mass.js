/*
 * Cookie Calculator / scales/mass.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { SIUnit } from "../units.js";

let values = [
];

export default values.map(x => ({
    quantity   : SIUnit.KILOGRAM.value(x.value),
    description: x.description
}));
