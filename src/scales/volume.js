/*
 * Cookie Calculator / scales/volume.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { SIUnit } from "../units.js";

let values = [
];

export default values.map(x => ({
    quantity   : SIUnit.CUBIC_METRE.value(x.value),
    description: x.description
}));
