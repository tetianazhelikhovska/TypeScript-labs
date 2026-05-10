export {};

// ── Типи даних ────────────────────────────────────────────
interface Category {
  id: number;
  name: string;
  shortname: string;
  notes: string;
}

interface Product {
  id: number;
  name: string;
  shortname: string;
  description: string;
  price: number;
}

interface CategoryData {
  categoryName: string;
  items: Product[];
}

// ── Утиліти ───────────────────────────────────────────────

// Ajax функція завантаження
async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Помилка мережі: ${response.status}`);
  return response.json() as Promise<T>;
}

function getContentEl(): HTMLElement {
  const el = document.getElementById("content");
  if (!el) throw new Error("Елемент #content не знайдено");
  return el as HTMLElement;
}

function formatPrice(price: number): string {
  return price.toLocaleString("uk-UA") + " ₴";
}

// ── Функції Рендерингу ────────────────────────────────────

// 1. Головна сторінка
async function renderHome(): Promise<void> {
  const content = getContentEl();
  content.innerHTML = `
    <div class="hero">
      <div class="hero-badge">Колекція 2026</div>
      <h1 class="hero-title">Магазин <em>ShopUA</em></h1>
      <p class="hero-sub">Найкращий вибір техніки та аксесуарів з доставкою по всій Україні. Якість, перевірена часом.</p>
      <button class="btn-catalog" id="btn-hero-start">Відкрити каталог</button>
    </div>
    <div class="features">
      <div class="feature">
        <strong>Швидка доставка</strong>
        <p>Відправляємо замовлення в день оплати по всій країні.</p>
      </div>
      <div class="feature">
        <strong>Гарантія якості</strong>
        <p>Тільки сертифіковані товари від офіційних виробників.</p>
      </div>
      <div class="feature">
        <strong>Найкраща ціна</strong>
        <p>Ми пропонуємо конкурентні ціни без зайвих націнок.</p>
      </div>
    </div>
  `;
  
  document.getElementById("btn-hero-start")?.addEventListener("click", () => loadCatalog());
}

// 2. Список категорій + блок Specials
async function renderCatalog(): Promise<void> {
  const content = getContentEl();
  content.innerHTML = `<div style="text-align:center; padding: 100px;">Завантаження каталогу...</div>`;

  try {
    const categories = await fetchJSON<Category[]>("data/categories.json");
    
    const categoryCards = categories.map(cat => `
      <div class="cat-card">
        <div class="cat-number">${String(cat.id).padStart(2, '0')}</div>
        <h2 class="cat-name">${cat.name}</h2>
        <p style="color:var(--muted); font-size:0.9rem; margin-bottom:20px; flex-grow:1;">${cat.notes || 'Опис категорії незабаром...'}</p>
        <button class="btn-action btn-view" data-shortname="${cat.shortname}">Переглянути товари</button>
      </div>
    `).join("");

    // Логіка випадкового вибору категорії (Вимога 1.2.3)
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    content.innerHTML = `
      <section class="catalog-section" style="animation: fadeUp 0.6s ease both">
        <div class="section-header">
            <h2 class="section-title">Каталог товарів</h2>
            <p style="color:var(--muted)">Оберіть категорію, яка вас цікавить</p>
        </div>
        <div class="cat-grid">${categoryCards}</div>
        
        <div class="specials-banner">
            <div class="specials-content">
                <h3>Акція "Specials"</h3>
                <p>Натисніть, щоб відкрити випадкову категорію зі знижкою!</p>
            </div>
        </div>
      </section>
    `;

    // Події для кнопок категорій
    content.querySelectorAll(".btn-view").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        renderCategory(target.dataset.shortname!);
      });
    });

    // Подія для Specials
    document.getElementById("btn-random-cat")?.addEventListener("click", () => {
      renderCategory(randomCategory.shortname);
    });

  } catch (err) {
    content.innerHTML = `<div style="color:red; padding:50px;">Помилка завантаження: ${err}</div>`;
  }
}

// 3. Список товарів конкретної категорії
async function renderCategory(shortname: string): Promise<void> {
  const content = getContentEl();
  content.innerHTML = `<div style="text-align:center; padding: 100px;">Шукаємо товари...</div>`;

  try {
    const data = await fetchJSON<CategoryData>(`data/${shortname}.json`);
    
    const productCards = data.items.map(p => `
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="https://placehold.co/240x200/eff6ff/4f46e5?text=${p.name}" alt="${p.name}">
        </div>
        <div class="product-info">
          <h3 class="cat-name" style="font-size:1.2rem;">${p.name}</h3>
          <p style="color:var(--muted); font-size:0.85rem; margin-bottom:20px; line-height:1.4;">${p.description}</p>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
            <span class="product-price">${formatPrice(p.price)}</span>
            <button class="btn-action btn-buy">Купити</button>
          </div>
        </div>
      </article>
    `).join("");

    content.innerHTML = `
      <section style="animation: fadeUp 0.5s ease both">
        <div id="back-to-cat">← Назад до списку категорій</div>
        <div class="section-header">
            <h2 class="section-title">${data.categoryName}</h2>
            <p style="color:var(--muted)">Знайдено ${data.items.length} товарів</p>
        </div>
        <div class="products-grid">${productCards}</div>
      </section>
    `;

    document.getElementById("back-to-cat")?.addEventListener("click", () => renderCatalog());

  } catch (err) {
    content.innerHTML = `<div style="color:red; padding:50px;">Не вдалося завантажити товари категорії: ${shortname}</div>`;
  }
}

// ── Навігація та Ініціалізація ──────────────────────────

function loadHome(): void {
  setActiveNav("nav-home");
  renderHome();
}

function loadCatalog(): void {
  setActiveNav("nav-catalog");
  renderCatalog();
}

function setActiveNav(id: string): void {
  document.querySelectorAll(".nav-link").forEach(el => el.classList.remove("active"));
  document.getElementById(id)?.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // Навігація "Catalog" (без оновлення сторінки)
  document.getElementById("nav-catalog")?.addEventListener("click", (e) => {
    e.preventDefault();
    loadCatalog();
  });

  // Початковий рендер
  loadHome();
});
