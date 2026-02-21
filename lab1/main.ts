type ElementType =
    | "leg"
    | "hypotenuse"
    | "adjacent angle"
    | "opposite angle"
    | "angle";

console.log(`
ІНСТРУКЦІЯ:
triangle(value1, type1, value2, type2)

Типи:
leg – катет
hypotenuse – гіпотенуза
adjacent angle – прилеглий до катета кут
opposite angle – протилежний до катета кут
angle – гострий кут (якщо задана гіпотенуза)
`);

function toRadians(deg: number): number {
    return deg * Math.PI / 180;
}

function toDegrees(rad: number): number {
    return rad * 180 / Math.PI;
}

function triangle(
    value1: number,
    type1: ElementType,
    value2: number,
    type2: ElementType
): string {

    if (value1 <= 0 || value2 <= 0) {
        console.log("Помилка: значення повинні бути додатніми.");
        return "failed";
    }

    let a: number = 0;
    let b: number = 0;
    let c: number = 0;
    let alpha: number = 0;
    let beta: number = 0;

    // два катети
    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }

    //  катет та гіпотенуза
    else if (
        (type1 === "leg" && type2 === "hypotenuse") ||
        (type2 === "leg" && type1 === "hypotenuse")
    ) {
        a = type1 === "leg" ? value1 : value2;
        c = type1 === "hypotenuse" ? value1 : value2;

        if (a >= c) {
            console.log("Помилка: катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }

        b = Math.sqrt(c * c - a * a);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    }

    //  гіпотенуза та кут
    else if (
        (type1 === "hypotenuse" && type2 === "angle") ||
        (type2 === "hypotenuse" && type1 === "angle")
    ) {
        c = type1 === "hypotenuse" ? value1 : value2;
        alpha = type1 === "angle" ? value1 : value2;

        if (alpha >= 90) {
            console.log("Помилка: кут має бути гострим.");
            return "failed";
        }

        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
        beta = 90 - alpha;
    }

    //  катет та прилеглий кут
    else if (
        (type1 === "leg" && type2 === "adjacent angle") ||
        (type2 === "leg" && type1 === "adjacent angle")
    ) {
        a = type1 === "leg" ? value1 : value2;
        alpha = type1 === "adjacent angle" ? value1 : value2;

        if (alpha >= 90) {
            console.log("Помилка: кут має бути гострим.");
            return "failed";
        }

        b = a * Math.tan(toRadians(alpha));
        c = a / Math.cos(toRadians(alpha));
        beta = 90 - alpha;
    }

    // 5️⃣ КАТЕТ + ПРОТИЛЕЖНИЙ КУТ
    else if (
        (type1 === "leg" && type2 === "opposite angle") ||
        (type2 === "leg" && type1 === "opposite angle")
    ) {
        a = type1 === "leg" ? value1 : value2;
        alpha = type1 === "opposite angle" ? value1 : value2;

        if (alpha >= 90) {
            console.log("Помилка: кут має бути гострим.");
            return "failed";
        }

        c = a / Math.sin(toRadians(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    }

    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    console.log("РЕЗУЛЬТАТ:");
    console.log(`a = ${a.toFixed(2)}`);
    console.log(`b = ${b.toFixed(2)}`);
    console.log(`c = ${c.toFixed(2)}`);
    console.log(`alpha = ${alpha.toFixed(2)}°`);
    console.log(`beta = ${beta.toFixed(2)}°`);

    return "success";
}



triangle(7, "leg", 18, "hypotenuse");
triangle(60,"opposite angle", 5, "leg");
triangle(43.13, "angle", -2, "hypotenuse");


triangle(3, "leg", 4, "leg");
triangle(10, "hypotenuse", 30, "angle");
triangle(5, "leg", 45, "adjacent angle");
triangle(6, "leg", 30, "opposite angle");
