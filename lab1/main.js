console.log("\n\u0406\u041D\u0421\u0422\u0420\u0423\u041A\u0426\u0406\u042F:\ntriangle(value1, type1, value2, type2)\n\n\u0422\u0438\u043F\u0438:\nleg \u2013 \u043A\u0430\u0442\u0435\u0442\nhypotenuse \u2013 \u0433\u0456\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430\nadjacent angle \u2013 \u043F\u0440\u0438\u043B\u0435\u0433\u043B\u0438\u0439 \u0434\u043E \u043A\u0430\u0442\u0435\u0442\u0430 \u043A\u0443\u0442\nopposite angle \u2013 \u043F\u0440\u043E\u0442\u0438\u043B\u0435\u0436\u043D\u0438\u0439 \u0434\u043E \u043A\u0430\u0442\u0435\u0442\u0430 \u043A\u0443\u0442\nangle \u2013 \u0433\u043E\u0441\u0442\u0440\u0438\u0439 \u043A\u0443\u0442 (\u044F\u043A\u0449\u043E \u0437\u0430\u0434\u0430\u043D\u0430 \u0433\u0456\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430)\n");
function toRadians(deg) {
    return deg * Math.PI / 180;
}
function toDegrees(rad) {
    return rad * 180 / Math.PI;
}
function triangle(value1, type1, value2, type2) {
    if (value1 <= 0 || value2 <= 0) {
        console.log("Помилка: значення повинні бути додатніми.");
        return "failed";
    }
    var a = 0;
    var b = 0;
    var c = 0;
    var alpha = 0;
    var beta = 0;
    // 1️⃣ ДВА КАТЕТИ
    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    }
    // 2️⃣ КАТЕТ + ГІПОТЕНУЗА
    else if ((type1 === "leg" && type2 === "hypotenuse") ||
        (type2 === "leg" && type1 === "hypotenuse")) {
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
    // 3️⃣ ГІПОТЕНУЗА + КУТ
    else if ((type1 === "hypotenuse" && type2 === "angle") ||
        (type2 === "hypotenuse" && type1 === "angle")) {
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
    // 4️⃣ КАТЕТ + ПРИЛЕГЛИЙ КУТ
    else if ((type1 === "leg" && type2 === "adjacent angle") ||
        (type2 === "leg" && type1 === "adjacent angle")) {
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
    else if ((type1 === "leg" && type2 === "opposite angle") ||
        (type2 === "leg" && type1 === "opposite angle")) {
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
    console.log("a = ".concat(a.toFixed(2)));
    console.log("b = ".concat(b.toFixed(2)));
    console.log("c = ".concat(c.toFixed(2)));
    console.log("alpha = ".concat(alpha.toFixed(2), "\u00B0"));
    console.log("beta = ".concat(beta.toFixed(2), "\u00B0"));
    return "success";
}
// 🔥 Приклади запуску
triangle(7, "leg", 18, "hypotenuse");
triangle(60, "opposite angle", 5, "leg");
triangle(43.13, "angle", -2, "hypotenuse");
triangle(3, "leg", 4, "leg");
triangle(10, "hypotenuse", 30, "angle");
triangle(5, "leg", 45, "adjacent angle");
triangle(6, "leg", 30, "opposite angle");
