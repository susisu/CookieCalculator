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

    let totalAmountOutput = document.getElementById("total-amount");
    let totalMassOutput   = document.getElementById("total-mass");
    let totalVolumeOutput = document.getElementById("total-volume");
    let totalLengthOutput = document.getElementById("total-length");
    
    update();

    function update() {
        cookiesNumber   = ONE.value(parseFloat(cookiesNumberInput.value) || 0.0);
        cookieMass      = GRAM.value(parseFloat(cookieMassInput.value) || 0.0);
        cookieRadius    = CENTIMETER.value(parseFloat(cookieRadiusInput.value) || 0.0);
        cookieThickness = CENTIMETER.value(parseFloat(cookieThicknessInput.value) || 0.0);

        let cookieVolume = ONE.value(Math.PI).mul(cookieRadius.pow(ONE.value(2))).mul(cookieThickness);
        let totalAmount  = cookiesNumber.div(AVOGADRO);
        let totalMass    = cookiesNumber.mul(cookieMass);
        let totalVolume  = cookiesNumber.mul(cookieVolume);
        let totalLength  = cookiesNumber.mul(cookieThickness);

        totalAmountOutput.innerHTML = toSuper(
            totalAmount.toPrecisionInUnitSystem(SIUnitSystem, 3)
            + " (" + totalAmount.toPrecisionIn(MOLE, 3) + ")"
        );
        totalMassOutput.innerHTML   = toSuper(
            totalMass.toPrecisionInUnitSystem(SIUnitSystem, 3)
            + " (" + totalMass.toPrecisionIn(KILOGRAM, 3) + ")"
        );
        totalVolumeOutput.innerHTML = toSuper(
            totalVolume.toPrecisionInUnitSystem(SIUnitSystem, 3)
            + " (" + totalVolume.toPrecisionIn(CUBIC_METRE, 3) + ")"
        );
        totalLengthOutput.innerHTML = toSuper(
            totalLength.toPrecisionInUnitSystem(SIUnitSystem, 3)
            + " (" + totalLength.toPrecisionIn(METRE, 3) + ")"
        );
    }

    function toSuper(str) {
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
