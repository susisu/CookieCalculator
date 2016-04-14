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
    }
];

export default values.map(x => ({
    quantity   : SIUnit.METRE.value(x.value),
    description: x.description
}));
