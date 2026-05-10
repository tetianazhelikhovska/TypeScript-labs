var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// ============================================================
// main.ts — TypeScript-логіка односторінкового каталогу
// ============================================================
// ── Утиліти ─────────────────────────────────────────────────
function fetchJSON(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function getContentEl() {
    var el = document.getElementById("content");
    if (!el)
        throw new Error("Element #content not found");
    return el;
}
function formatPrice(price) {
    return price.toLocaleString("uk-UA") + " ₴";
}
// ── Рендеринг: головна сторінка ──────────────────────────────
function renderHome() {
    return __awaiter(this, void 0, void 0, function () {
        var content;
        var _a;
        return __generator(this, function (_b) {
            content = getContentEl();
            content.innerHTML = "\n    <div class=\"hero\">\n      <div class=\"hero-badge\">\u041B\u0430\u0441\u043A\u0430\u0432\u043E \u043F\u0440\u043E\u0441\u0438\u043C\u043E</div>\n      <h1 class=\"hero-title\">\u041C\u0430\u0433\u0430\u0437\u0438\u043D <em>ShopUA</em></h1>\n      <p class=\"hero-sub\">\u042F\u043A\u0456\u0441\u043D\u0456 \u0442\u043E\u0432\u0430\u0440\u0438 \u0437\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u043C\u0438 \u0446\u0456\u043D\u0430\u043C\u0438. \u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E \u0430\u0431\u043E \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u044C\u0442\u0435 \u043D\u0430\u0448\u0456 \u0441\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0456 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u0457.</p>\n      <button class=\"btn-catalog\" id=\"btn-catalog-hero\">\u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u2192</button>\n    </div>\n    <div class=\"features\">\n      <div class=\"feature\"><span class=\"feat-icon\">\uD83D\uDE9A</span><strong>\u0411\u0435\u0437\u043A\u043E\u0448\u0442\u043E\u0432\u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430</strong><p>\u0412\u0456\u0434 1000 \u20B4</p></div>\n      <div class=\"feature\"><span class=\"feat-icon\">\uD83D\uDD04</span><strong>\u041F\u043E\u0432\u0435\u0440\u043D\u0435\u043D\u043D\u044F 30 \u0434\u043D\u0456\u0432</strong><p>\u0411\u0435\u0437 \u0437\u0430\u0439\u0432\u0438\u0445 \u043F\u0438\u0442\u0430\u043D\u044C</p></div>\n      <div class=\"feature\"><span class=\"feat-icon\">\uD83D\uDD12</span><strong>\u0411\u0435\u0437\u043F\u0435\u0447\u043D\u0430 \u043E\u043F\u043B\u0430\u0442\u0430</strong><p>\u0428\u0438\u0444\u0440\u0443\u0432\u0430\u043D\u043D\u044F SSL</p></div>\n      <div class=\"feature\"><span class=\"feat-icon\">\u2B50</span><strong>\u0413\u0430\u0440\u0430\u043D\u0442\u0456\u044F \u044F\u043A\u043E\u0441\u0442\u0456</strong><p>\u041F\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043D\u0456 \u0442\u043E\u0432\u0430\u0440\u0438</p></div>\n    </div>\n  ";
            (_a = document.getElementById("btn-catalog-hero")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                loadCatalog();
            });
            return [2 /*return*/];
        });
    });
}
// ── Рендеринг: каталог ───────────────────────────────────────
function renderCatalog() {
    return __awaiter(this, void 0, void 0, function () {
        var content, categories, err_1, categoryCards;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    content = getContentEl();
                    content.innerHTML = "<div class=\"loading\"><span class=\"spinner\"></span>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443\u2026</div>";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchJSON("data/categories.json")];
                case 2:
                    categories = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _b.sent();
                    content.innerHTML = "<div class=\"error\">\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u0430\u0442\u0430\u043B\u043E\u0433\u0443: ".concat(err_1, "</div>");
                    return [2 /*return*/];
                case 4:
                    categoryCards = categories
                        .map(function (cat) { return "\n      <div class=\"cat-card\" data-shortname=\"".concat(cat.shortname, "\">\n        <div class=\"cat-card-inner\">\n          <div class=\"cat-number\">").concat(String(cat.id).padStart(2, "0"), "</div>\n          <h2 class=\"cat-name\">").concat(cat.name, "</h2>\n          ").concat(cat.notes ? "<p class=\"cat-notes\">".concat(cat.notes, "</p>") : "", "\n          <button class=\"btn-view\" data-shortname=\"").concat(cat.shortname, "\" data-name=\"").concat(cat.name, "\">\n            \u041F\u0435\u0440\u0435\u0433\u043B\u044F\u043D\u0443\u0442\u0438 \u2192\n          </button>\n        </div>\n      </div>"); })
                        .join("");
                    content.innerHTML = "\n    <section class=\"catalog-section\">\n      <div class=\"section-header\">\n        <h2 class=\"section-title\">\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u0442\u043E\u0432\u0430\u0440\u0456\u0432</h2>\n        <p class=\"section-sub\">\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u044E, \u0449\u043E \u0432\u0430\u0441 \u0446\u0456\u043A\u0430\u0432\u0438\u0442\u044C</p>\n      </div>\n      <div class=\"cat-grid\">".concat(categoryCards, "</div>\n      <div class=\"specials-banner\" id=\"btn-specials\">\n        <div class=\"specials-inner\">\n          <span class=\"specials-tag\">\u2728 \u0410\u043A\u0446\u0456\u044F</span>\n          <h3>\u0421\u043F\u0435\u0446\u0456\u0430\u043B\u044C\u043D\u0456 \u043F\u0440\u043E\u043F\u043E\u0437\u0438\u0446\u0456\u0457</h3>\n          <p>\u041D\u0430\u0442\u0438\u0441\u043D\u0456\u0442\u044C, \u0449\u043E\u0431 \u043F\u043E\u0431\u0430\u0447\u0438\u0442\u0438 \u0442\u043E\u0432\u0430\u0440\u0438 \u0437 \u0432\u0438\u043F\u0430\u0434\u043A\u043E\u0432\u043E\u0457 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457</p>\n          <span class=\"specials-arrow\">\u2192</span>\n        </div>\n      </div>\n    </section>\n  ");
                    // обробники кнопок категорій
                    content.querySelectorAll(".btn-view").forEach(function (btn) {
                        btn.addEventListener("click", function () {
                            var shortname = btn.dataset.shortname;
                            var name = btn.dataset.name;
                            loadCategory(shortname, name);
                        });
                    });
                    // Specials
                    (_a = document.getElementById("btn-specials")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                        var rand = Math.floor(Math.random() * categories.length);
                        var chosen = categories[rand];
                        loadCategory(chosen.shortname, chosen.name);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// ── Рендеринг: товари категорії ──────────────────────────────
function renderCategory(shortname) {
    return __awaiter(this, void 0, void 0, function () {
        var content, data, err_2, productCards, cards;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    content = getContentEl();
                    content.innerHTML = "<div class=\"loading\"><span class=\"spinner\"></span>\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0442\u043E\u0432\u0430\u0440\u0456\u0432\u2026</div>";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchJSON("data/".concat(shortname, ".json"))];
                case 2:
                    data = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    content.innerHTML = "<div class=\"error\">\u041F\u043E\u043C\u0438\u043B\u043A\u0430 \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457: ".concat(err_2, "</div>");
                    return [2 /*return*/];
                case 4:
                    productCards = data.items
                        .map(function (product) { return "\n      <article class=\"product-card\">\n        <div class=\"product-img-wrap\">\n          <img\n            src=\"https://placehold.co/200x200/1a1a2e/e0e0ff?text=".concat(encodeURIComponent(product.shortname), "\"\n            alt=\"").concat(product.name, "\"\n            class=\"product-img\"\n            loading=\"lazy\"\n          />\n        </div>\n        <div class=\"product-info\">\n          <span class=\"product-id\">#").concat(product.id, "</span>\n          <h3 class=\"product-name\">").concat(product.name, "</h3>\n          <p class=\"product-desc\">").concat(product.description, "</p>\n          <div class=\"product-footer\">\n            <span class=\"product-price\">").concat(formatPrice(product.price), "</span>\n            <button class=\"btn-buy\">\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E \u043A\u043E\u0448\u0438\u043A\u0430</button>\n          </div>\n        </div>\n      </article>"); })
                        .join("");
                    content.innerHTML = "\n    <section class=\"products-section\">\n      <div class=\"breadcrumb\">\n        <span class=\"crumb\" id=\"crumb-catalog\">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</span>\n        <span class=\"crumb-sep\">\u203A</span>\n        <span class=\"crumb-current\">".concat(data.categoryName, "</span>\n      </div>\n      <div class=\"section-header\">\n        <h2 class=\"section-title\">").concat(data.categoryName, "</h2>\n        <p class=\"section-sub\">").concat(data.items.length, " \u0442\u043E\u0432\u0430\u0440\u0456\u0432 \u0443 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0456\u0457</p>\n      </div>\n      <div class=\"products-grid\">").concat(productCards, "</div>\n    </section>\n  ");
                    (_a = document.getElementById("crumb-catalog")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                        loadCatalog();
                    });
                    cards = content.querySelectorAll(".product-card");
                    cards.forEach(function (card, i) {
                        card.style.animationDelay = "".concat(i * 0.07, "s");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
// ── Публічні дії (викликаються з HTML та між собою) ──────────
function loadHome() {
    setActiveNav("nav-home");
    renderHome();
}
function loadCatalog() {
    setActiveNav("nav-catalog");
    renderCatalog();
}
function loadCategory(shortname, _name) {
    setActiveNav("nav-catalog");
    renderCategory(shortname);
}
function setActiveNav(activeId) {
    var _a;
    document.querySelectorAll(".nav-link").forEach(function (el) {
        el.classList.remove("active");
    });
    (_a = document.getElementById(activeId)) === null || _a === void 0 ? void 0 : _a.classList.add("active");
}
// ── Ініціалізація ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
    var _a, _b;
    (_a = document.getElementById("nav-home")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
        e.preventDefault();
        loadHome();
    });
    (_b = document.getElementById("nav-catalog")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
        e.preventDefault();
        loadCatalog();
    });
    loadHome();
});
