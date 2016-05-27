/*
 * Cookie Calculator / scales/length.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import { SIUnit } from "../units.js";

let values = [
    {
        value: 1.616199e-35,
        description:
            `1 Planck length`
    },
    {
        value: 1e-18,
        description:
            `Quarks (upper limit)`
    },
    {
        value: 1.7502e-15,
        description:
            `Proton`
    },
    {
        value: 5.0e-11,
        description:
            `Hydrogen atom`
    },
    {
        value: 1e-10,
        description:
            `1 Ångström`
    },
    {
        value: 5e-10,
        description:
            `Width of α helix`
    },
    {
        value: 1e-9,
        description:
            `Diameter of a carbon nanotube`
    },
    {
        value: 4e-7,
        description:
            `Wavelength of violet light`
    },
    {
        value: 7e-7,
        description:
            `Wavelength of red light`
    },
    {
        value: 7e-6,
        description:
            `Red blood cell`
    },
    {
        value: 1e-5,
        description:
            `Fog water droplet`
    },
    {
        value: 1e-4,
        description:
            `Width of a human hair`
    },
    {
        value: 5e-3,
        description:
            `Ant`
    },
    {
        value: 1.5e-2,
        description:
            `Mosquito`
    },
    {
        value: 2.54e-2,
        description:
            `1 inch`
    },
    {
        value: 1e-1,
        description:
            `Wavelength of the highest UHF radio frequency`
    },
    {
        value: 3.048e-1,
        description:
            `1 foot`
    },
    {
        value: 9.144e-1,
        description:
            `1 yard`
    },
    {
        value: 1.7,
        description:
            `Human`
    },
    {
        value: 3.3e+1,
        description:
            `Blue whale, the largest animal`
    },
    {
        value: 9.347e+1,
        description:
            `Height of the Statue of Liberty`
    },
    {
        value: 1.37e+2,
        description:
            `Height of the Great Pyramid of Giza`
    },
    {
        value: 8.848e+3,
        description:
            `Height of the highest mountain on Earth, Mount Everest`
    },
    {
        value: 1.0911e+4,
        description:
            `Depth of the deepest part of the Ocean, Mariana Trench`
    },
    {
        value: 9.0e+4,
        description:
            `Width of the Bering Strait`
    },
    {
        value: 9.746e+5,
        description:
            `Greatest diameter of the dwarf planet Ceres`
    },
    {
        value: 2.39e+6,
        description:
            `Diameter of Pluto`
    },
    {
        value: 3.48e+6,
        description:
            `Diameter of the Moon`
    },
    {
        value: 6.4e+6,
        description:
            `Length of the Great Wall of China`
    },
    {
        value: 1.2756e+7,
        description:
            `Equatorial diameter of Earth`
    },
    {
        value: 4.0075e+7,
        description:
            `Length of Earth's equator`
    },
    {
        value: 1.42984e+8,
        description:
            `Diameter of Jupiter`
    },
    {
        value: 2.99792458e+8,
        description:
            `1 light-second (distance traveled by light in one second)`
    },
    {
        value: 3.84e+8,
        description:
            `Moon's orbital distance from Earth`
    },
    {
        value: 1.39e+9,
        description:
            `Diameter of the Sun`
    },
    {
        value: 1.8e+10,
        description:
            `1 light-minute`
    },
    {
        value: 1.5e+11,
        description:
            `1 astronomical unit (AU, mean distance between Earth and Sun)`
    },
    {
        value: 1.4e+12,
        description:
            `Orbital distance of Saturn from Sun`
    },
    {
        value: 5.9e+12,
        description:
            `Orbital distance of Pluto from Sun`
    },
    {
        value: 7.5e+12,
        description:
            `Outer boundary of the Kuiper belt, inner boundary of the Oort cloud`
    },
    {
        value: 1e+13,
        description:
            `Diameter of the Solar System`
    },
    {
        value: 2e+14,
        description:
            `Total length of DNA molecules in all cells of an adult human`
    },
    {
        value: 7.5e+15,
        description:
            `Outer boundary of the Oort cloud`
    },
    {
        value: 9.46e+15,
        description:
            `1 light-year`
    },
    {
        value: 3.0857e+16,
        description:
            `1 parsec`
    },
    {
        value: 3.99e+16,
        description:
            `Distance to the nearest fixed star Proxima Centauri`
    },
    {
        value: 9.46e+18,
        description:
            `Average thickness of Milky Way Galaxy`
    },
    {
        value: 9.5e+20,
        description:
            `Diameter of Milky Way Galaxy`
    },
    {
        value: 2.4e+22,
        description:
            `Distance to Andromeda Galaxy`
    },
    {
        value: 1.2e+27,
        description:
            `Lower bound of the radius of the universe`
    }
];

export default values.map(x => ({
    quantity   : SIUnit.METRE.value(x.value),
    description: x.description
}));
