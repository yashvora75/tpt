/* THE PERFUME TAILOR — fragrance library (real catalogue) */
(function () {
  'use strict';
  const grid = document.getElementById('lib-grid');
  if (!grid) return;

  // f = for her (marked F in red on the menu). oud = oud/oriental family.
  const P = (name, opts = {}) => ({ name, f: !!opts.f, oud: !!opts.oud, house: opts.house || '' });

  const list = [
    // Dior
    P('Dior Sauvage', { house: 'Dior' }), P("Dior J'adore", { house: 'Dior', f: true }),
    P('Dior Purple Oud', { house: 'Dior', oud: true }), P('Dior Oud Ishpan', { house: 'Dior', oud: true }),
    P('Dior Elixir', { house: 'Dior' }), P('Miss Dior', { house: 'Dior', f: true }),
    P('Dior Fahrenheit', { house: 'Dior' }), P('Dior Hypnotic Poison', { house: 'Dior' }),
    // Gucci
    P('Gucci Guilty', { house: 'Gucci' }), P('Gucci Rush', { house: 'Gucci' }), P('Gucci Tiger', { house: 'Gucci' }),
    P('Gucci Flora Jasmine', { house: 'Gucci', f: true }), P('Gucci Flora Gardenia', { house: 'Gucci', f: true }),
    // Chanel
    P('Bleu de Chanel', { house: 'Chanel' }), P('Coco Chanel Mademoiselle', { house: 'Chanel', f: true }),
    P('Chanel Allure', { house: 'Chanel' }), P('Chanel No. 5', { house: 'Chanel', f: true }),
    // Armani
    P('Armani My Way', { house: 'Armani', f: true }), P('Armani Acqua di Giò', { house: 'Armani' }),
    P('Armani Code', { house: 'Armani' }),
    // Others col 1
    P('Elie Saab', { house: 'Elie Saab' }),
    P('Bvlgari Aqua', { house: 'Bvlgari' }), P('Bvlgari Tygar', { house: 'Bvlgari' }), P('Bvlgari Man In Black', { house: 'Bvlgari' }),
    P('Aqua Intense'), P('Givenchy Blue', { house: 'Givenchy' }), P('Givenchy Gentleman Society', { house: 'Givenchy' }),
    P('Azzaro Wanted', { house: 'Azzaro' }), P('Azzaro Chrome', { house: 'Azzaro' }), P('Azzaro Onyx', { house: 'Azzaro' }),
    P('Prada Ocean', { house: 'Prada' }), P('Prada Candy', { house: 'Prada', f: true }),
    P('Salvatore Ferragamo', { house: 'Ferragamo' }),
    P("Victoria's Secret Bombshell", { house: "Victoria's Secret", f: true }),
    P("Victoria's Secret Aqua Kiss", { house: "Victoria's Secret", f: true }),
    P("Victoria's Secret Bare Vanilla", { house: "Victoria's Secret", f: true }),
    P('Diptyque Tam Dao', { house: 'Diptyque' }), P('YSL Baby Cat', { house: 'YSL', f: true }), P('YSL Y', { house: 'YSL' }),
    // Col 2
    P('YSL Black Opium', { house: 'YSL' }), P('YSL Mon Paris', { house: 'YSL' }),
    P('CK One', { house: 'Calvin Klein' }), P('CK Eternity', { house: 'Calvin Klein' }), P('CK Sheer Beauty', { house: 'Calvin Klein', f: true }),
    P('Burberry Body', { house: 'Burberry' }), P('Burberry Musk', { house: 'Burberry', oud: true }),
    P('Valentino Born in Roma', { house: 'Valentino' }),
    P('Versace Eros', { house: 'Versace' }), P('Versace Flame', { house: 'Versace' }),
    P('Dunhill Icon', { house: 'Dunhill' }), P('Dunhill Red', { house: 'Dunhill' }), P('Dunhill Silver', { house: 'Dunhill' }),
    P('Mystery'), P("Issey Miyake L'Eau d'Issey", { house: 'Issey Miyake', f: true }),
    P('Tom Ford Ombré Leather', { house: 'Tom Ford' }), P('Tom Ford Oud Wood', { house: 'Tom Ford', oud: true }),
    P('Tom Ford Tobacco', { house: 'Tom Ford' }), P('Tom Ford Tobacco Vanille', { house: 'Tom Ford' }),
    P('Tom Ford Black Orchid', { house: 'Tom Ford' }), P('Tom Ford Cherry Smoke', { house: 'Tom Ford' }),
    P('Tom Ford Lost Cherry', { house: 'Tom Ford' }), P('Tom Ford Costa Azzurra', { house: 'Tom Ford' }),
    P('Tom Ford Tuscan Leather', { house: 'Tom Ford' }),
    P('Carolina Herrera Good Girl', { house: 'Carolina Herrera', f: true }),
    P('Carolina Herrera Bad Boy', { house: 'Carolina Herrera' }),
    P('Carolina Herrera VIP 212', { house: 'Carolina Herrera' }),
    P('D&G The One', { house: 'Dolce & Gabbana' }), P('D&G Light Blue', { house: 'Dolce & Gabbana' }), P('D&G K', { house: 'Dolce & Gabbana' }),
    P('Cartier Pasha', { house: 'Cartier' }), P('Coach', { house: 'Coach' }), P('Balmain Paris', { house: 'Balmain' }),
    P('Creed Aventus', { house: 'Creed' }), P('Creed Viking', { house: 'Creed' }), P('Creed Green Irish Tweed', { house: 'Creed' }),
    P('Hugo Boss Bottled', { house: 'Hugo Boss' }), P('Hugo Boss Elixir', { house: 'Hugo Boss' }),
    P('Lancôme La Vie Est Belle', { house: 'Lancôme', f: true }),
    // Col 3 — Paco Rabanne + house ouds
    P('Paco Rabanne Invictus', { house: 'Paco Rabanne' }), P('Paco Rabanne Invictus Victory', { house: 'Paco Rabanne' }),
    P('Paco Rabanne One Million', { house: 'Paco Rabanne' }), P('Paco Rabanne Black XS', { house: 'Paco Rabanne' }),
    P('Paco Rabanne Phantom', { house: 'Paco Rabanne' }),
    P('Marc Jacobs Daisy', { house: 'Marc Jacobs', f: true }), P('JPG Ultra Male', { house: 'Jean Paul Gaultier' }),
    P('CR7', { house: 'Cristiano Ronaldo' }), P('CR7 Sports', { house: 'Cristiano Ronaldo' }),
    P('Cigar'), P('Fuel'), P('Emarat', { oud: true }), P('Jawar Al Dubai', { oud: true }),
    P('Ignite'), P('Ignite Oud', { oud: true }),
    P('Rasasi Hawas', { house: 'Rasasi' }), P('Rasasi Hawas Ice', { house: 'Rasasi' }),
    P('Oud Al Bacarat', { oud: true }), P('Oud Kunafa', { oud: true }), P('Silver Oud', { oud: true }),
    P('Diamond Oud', { oud: true }), P('Vanilla Mischief'), P('Chocolate'),
    P('Kayali Vanilla', { house: 'Kayali', f: true }), P('Kayali Pistachio', { house: 'Kayali', f: true }),
    P('Kayali Oudgasm', { house: 'Kayali', f: true, oud: true }),
    P('Lattafa Khamrah', { house: 'Lattafa', oud: true }), P('Ajmal Aurum', { house: 'Ajmal' }),
    P('White Oud', { oud: true }), P('Black Oud', { oud: true }),
    P('Libre Gold'), P('Opium Gold'), P('LV Nomade', { oud: true }), P('Imperial'),
    P('Dubai Musk', { oud: true }), P('Lacoste 12.12', { house: 'Lacoste' })
  ];

  /* Elegant monoline glyphs (matching the site's icon language) instead of
     emoji — oud gets a flame, "for her" gets a minimal blossom, everything
     else gets a perfume bottle silhouette. */
  const ICON_OUD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 2.3c-.9 2.6-3.4 4-3.4 7.2a3.4 3.4 0 0 0 6.8 0c0-1.3-.4-2.2-1.1-2.9.3 1.3-.2 2-.9 2-.9 0-.9-.9-.9-1.8 0-1.7-1.3-3-.5-4.5Z"/><path d="M8.4 14.2a5.6 5.6 0 0 0 7.2 0"/><path d="M7 17.4a7.5 7.5 0 0 0 10 0"/></svg>';
  const ICON_HER  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="12" cy="12" r="1.5"/><path d="M12 10.3c-1.6-1.9-1.6-4.3 0-5.8 1.6 1.5 1.6 3.9 0 5.8ZM12 13.7c1.6 1.9 1.6 4.3 0 5.8-1.6-1.5-1.6-3.9 0-5.8ZM10.3 12c-1.9-1.6-4.3-1.6-5.8 0 1.5 1.6 3.9 1.6 5.8 0ZM13.7 12c1.9-1.6 4.3-1.6 5.8 0-1.5 1.6-3.9 1.6-5.8 0Z"/></svg>';
  const ICON_BASE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M10.5 2h3M11 2v2.6M13 2v2.6M9 6.6h6l1.2 2.3V19a2 2 0 0 1-2 2h-5.4a2 2 0 0 1-2-2V8.9L9 6.6Z"/><path d="M8.3 11.5h7.4"/></svg>';
  const iconFor = (p) => p.oud ? ICON_OUD : p.f ? ICON_HER : ICON_BASE;

  const render = (items) => {
    grid.innerHTML = items.map(p => `
      <article class="lib-card${p.f ? ' is-her' : ''}" data-her="${p.f}" data-oud="${p.oud}">
        <span class="lib-ic">${iconFor(p)}</span>
        <div class="lib-meta">
          ${p.house ? `<span class="lib-house">${p.house}</span>` : `<span class="lib-house">House Signature</span>`}
          <h3>${p.name}</h3>
        </div>
        ${p.f ? '<span class="lib-tag">For Her</span>' : ''}
      </article>`).join('');
    countEl.textContent = items.length;
  };

  const countEl = document.getElementById('lib-count');
  let activeFilter = 'all';
  let query = '';

  const apply = () => {
    const q = query.trim().toLowerCase();
    const out = list.filter(p => {
      const passFilter =
        activeFilter === 'all' ? true :
        activeFilter === 'her' ? p.f :
        activeFilter === 'him' ? !p.f :
        activeFilter === 'oud' ? p.oud : true;
      const passQuery = !q || p.name.toLowerCase().includes(q) || p.house.toLowerCase().includes(q);
      return passFilter && passQuery;
    });
    render(out);
  };

  document.querySelectorAll('.lib-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lib-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      apply();
    });
  });

  const search = document.getElementById('lib-search');
  if (search) search.addEventListener('input', e => { query = e.target.value; apply(); });

  render(list);
  countEl.textContent = list.length;
})();
