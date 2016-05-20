/*
 * Cookie Calculator / main.js
 * copyright (c) 2016 Susisu
 */

"use strict";

import {
    SIUnit,
    SIPrefix,
    ONE,
    SIUnitSystem,
    Constant
} from "./units.js";

import scales from "./scales.js";

const MOLE        = SIUnit.MOLE;
const GRAM        = SIUnit.GRAM;
const KILOGRAM    = SIUnit.KILOGRAM;
const METRE       = SIUnit.METRE;
const CENTIMETER  = SIPrefix.CENTI.add(SIUnit.METRE);
const CUBIC_METRE = SIUnit.CUBIC_METRE;
const AVOGADRO    = Constant.AVOGADRO;

window.addEventListener("load", () => {
    let cookiesNumber   = ONE.value(0);
    let cookieMass      = GRAM.value(5.0);
    let cookieRadius    = CENTIMETER.value(2.0);
    let cookieThickness = CENTIMETER.value(0.5);

    let inputForm            = document.getElementById("cookies-input");
    let cookiesNumberInput   = inputForm["cookies-number"];
    let cookieMassInput      = inputForm["cookie-mass"];
    let cookieRadiusInput    = inputForm["cookie-radius"];
    let cookieThicknessInput = inputForm["cookie-thickness"];

    cookiesNumberInput.value   = cookiesNumber.in(ONE).toString();
    cookieMassInput.value      = cookieMass.in(GRAM).toString();
    cookieRadiusInput.value    = cookieRadius.in(CENTIMETER).toString();
    cookieThicknessInput.value = cookieThickness.in(CENTIMETER).toString();

    cookiesNumberInput.addEventListener("change", update);
    cookieMassInput.addEventListener("change", update);
    cookieRadiusInput.addEventListener("change", update);
    cookieThicknessInput.addEventListener("change", update);

    let totalMoleOutput = document.getElementById("total-mole");
    let totalOutput = {
        amount: document.getElementById("total-amount"),
        mass  : document.getElementById("total-mass"),
        volume: document.getElementById("total-volume"),
        length: document.getElementById("total-length")
    };
    let prevOutput = {
        amount: document.getElementById("prev-amount"),
        mass  : document.getElementById("prev-mass"),
        volume: document.getElementById("prev-volume"),
        length: document.getElementById("prev-length")
    };
    let approxOutput = {
        amount: document.getElementById("approx-amount"),
        mass  : document.getElementById("approx-mass"),
        volume: document.getElementById("approx-volume"),
        length: document.getElementById("approx-length")
    };
    let nextOutput = {
        amount: document.getElementById("next-amount"),
        mass  : document.getElementById("next-mass"),
        volume: document.getElementById("next-volume"),
        length: document.getElementById("next-length")
    };

    update();

    function update() {
        cookiesNumber   = ONE.value(parseFloat(cookiesNumberInput.value) || 0.0);
        cookieMass      = GRAM.value(parseFloat(cookieMassInput.value) || 0.0);
        cookieRadius    = CENTIMETER.value(parseFloat(cookieRadiusInput.value) || 0.0);
        cookieThickness = CENTIMETER.value(parseFloat(cookieThicknessInput.value) || 0.0);

        let cookieVolume = ONE.value(Math.PI).mul(cookieRadius.pow(ONE.value(2))).mul(cookieThickness);
        let totalMole    = cookiesNumber.div(AVOGADRO);
        let totalAmount  = cookiesNumber;
        let totalMass    = cookiesNumber.mul(cookieMass);
        let totalVolume  = cookiesNumber.mul(cookieVolume);
        let totalLength  = cookiesNumber.mul(cookieThickness);

        let amountApprox = approxScale(totalAmount, scales.AMOUNT);
        let massApprox   = approxScale(totalMass, scales.MASS);
        let volumeApprox = approxScale(totalVolume, scales.VOLUME);
        let lengthApprox = approxScale(totalLength, scales.LENGTH);

        totalMoleOutput.innerHTML = prettify(totalMole.toPrecisionInUnitSystem(SIUnitSystem, 3));
        output("amount", totalAmount, ONE, amountApprox);
        output("mass", totalMass, KILOGRAM, massApprox);
        output("volume", totalVolume, CUBIC_METRE, volumeApprox);
        output("length", totalLength, METRE, lengthApprox);
    }

    function output(name, quantity, defaultUnit, approx) {
        totalOutput[name].innerHTML =
            prettify(quantity.toPrecisionInUnitSystem(SIUnitSystem, 3))
            + " (" + prettify(quantity.toPrecisionIn(defaultUnit, 3)) + ")";
        prevOutput[name].innerHTML = !approx.prev ? "-" :
            prettify(approx.prev.quantity.toPrecisionInUnitSystem(SIUnitSystem, 3))
            + " (" + prettify(approx.prev.quantity.toPrecisionIn(defaultUnit, 3)) + ")<br>"
            + approx.prev.description;
        approxOutput[name].innerHTML = !approx.approx ? "-" :
            prettify(approx.approx.quantity.toPrecisionInUnitSystem(SIUnitSystem, 3))
            + " (" + prettify(approx.approx.quantity.toPrecisionIn(defaultUnit, 3)) + ")<br>"
            + approx.approx.description;
        nextOutput[name].innerHTML = !approx.next ? "-" :
            prettify(approx.next.quantity.toPrecisionInUnitSystem(SIUnitSystem, 3))
            + " (" + prettify(approx.next.quantity.toPrecisionIn(defaultUnit, 3)) + ")<br>"
            + approx.next.description;
    }

    function approxScale(x, scales) {
        // NOTE: check dimensions?
        let len = scales.length;
        for (let i = 0; i < len; i++) {
            if (x.value < scales[i].quantity.value) {
                if (i === 0) {
                    return {
                        next  : scales[i]
                    };
                }
                else if (i === 1) {
                    return {
                        approx: scales[i - 1],
                        next  : scales[i]
                    };
                }
                else {
                    return {
                        prev  : scales[i - 2],
                        approx: scales[i - 1],
                        next  : scales[i]
                    };
                }
            }
        }
        if (len === 0) {
            return {};
        }
        else if (len === 1) {
            return {
                approx: scales[len - 1]
            };
        }
        else {
            return {
                prev  : scales[len - 2],
                approx: scales[len - 1]
            };
        }
    }

    function prettify(str) {
        str = str.replace(/[Ee]\+?(\-?\d+)/g, "×10<sup>$1</sup>");
        let result = "";
        let sup    = 0;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "^") {
                sup    += 1;
                result += "<sup>";
            }
            else {
                if (sup > 0) {
                    let code = str.charCodeAt(i);
                    if (48 <= code && code <= 57) {
                        result += str[i];
                    }
                    else {
                        result += "</sup>" + str[i];
                        sup    -= 1;
                    }
                }
                else {
                    result += str[i];
                }
            }
        }
        while (sup > 0) {
            result += "</sup>";
            sup    -= 1;
        }
        return result;
    }
});
