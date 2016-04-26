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
            `1 Planck Length<br>
            Size of the hypothetical <a href="https://en.wikipedia.org/wiki/String_theory">quantum strings</a>`
    },
    {
        value: 2e-23,
        description:
            `Effective <a href="https://en.wikipedia.org/wiki/Cross_section_(physics)">cross section</a> radius of
            1 MeV <a href="https://en.wikipedia.org/wiki/Neutrino">neutrinos</a>`
    },
    {
        value: 1e-21,
        description:
            `Effective <a href="https://en.wikipedia.org/wiki/Cross_section_(physics)">cross section</a> radius of
            high energy <a href="https://en.wikipedia.org/wiki/Neutrino">neutrinos</a>`
    },
    {
        value: 3.10e-19,
        description:
            `<a href="https://en.wikipedia.org/wiki/Matter_wave">De Broglie wavelength</a> of 4 TeV
            <a href="https://en.wikipedia.org/wiki/Proton">protons</a> at the
            <a href="https://en.wikipedia.org/wiki/Large_Hadron_Collider">LHC</a>`
    },
    {
        value: 1e-18,
        description:
            `Upper limit for the size of <a href="https://en.wikipedia.org/wiki/Quark">quarks</a> and
            <a href="https://en.wikipedia.org/wiki/Electron">electrons</a><br>
            Sensitivity of the <a href="https://en.wikipedia.org/wiki/LIGO">LIGO detector</a> for
            <a href="https://en.wikipedia.org/wiki/Gravitational_wave">gravitational waves</a>`
    },
    {
        value: 1e-17,
        description:
            `Range of the <a href="https://en.wikipedia.org/wiki/Weak_interaction">weak force</a>`
    },
    {
        value: 1e-15,
        description:
            `Scale of the <a href="https://en.wikipedia.org/wiki/Atomic_nucleus">atomic nuculeus</a>`
    },
    {
        value: 1e-12,
        description:
            `Longest wavelength of <a href="https://en.wikipedia.org/wiki/Gamma_ray">gamma rays</a>`
    },
    {
        value: 5e-12,
        description:
            `Shortest wavelength of <a href="https://en.wikipedia.org/wiki/X-ray">X-rays</a>`
    },
    {
        value: 2.5e-11,
        description:
            `Radius of <a href="https://en.wikipedia.org/wiki/Hydrogen_atom">hydrogen atom</a>`
    },
    {
        value: 5.3e-11,
        description:
            `<a href="https://en.wikipedia.org/wiki/Bohr_radius">Bohr radius</a>`
    },
    {
        value: 1e-10,
        description:
            `1 <a href="https://en.wikipedia.org/wiki/Ångström">Ångström</a>`
    },
    {
        value: 5e-10,
        description:
            `Width of <a href="https://en.wikipedia.org/wiki/Alpha_helix">α helix</a>`
    },
    {
        value: 1e-9,
        description:
            `Diameter of a <a href="https://en.wikipedia.org/wiki/Carbon_nanotube">carbon nanotube</a>`
    },
    {
        value: 4e-8,
        description:
            `Wavelength of extreme ultraviolet`
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
            `Diameter of a red blood cell`
    },
    {
        value: 1e-5,
        description:
            `Typical size of fog water droplet`
    },
    {
        value: 1e-4,
        description:
            `Average width of a human hair`
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
    }
];

export default values.map(x => ({
    quantity   : SIUnit.METRE.value(x.value),
    description: x.description
}));
