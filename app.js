// LANGUAGES, DEFAULT_LANGUAGE, TRANSLATIONS are defined in lang.js

// Spread configurations — positions are { name } objects
const SPREADS = {
    one: {
        id: 'one',
        isDefault: true,
        count: 1,
        layoutClass: 'one-card',
        positions: [{ name: 'The Answer' }]
    },
    three: {
        id: 'three',
        isDefault: true,
        count: 3,
        layoutClass: 'three-card',
        positions: [{ name: 'Past' }, { name: 'Present' }, { name: 'Future' }]
    },
    celtic: {
        id: 'celtic',
        isDefault: true,
        count: 10,
        layoutClass: 'celtic-cross',
        positions: [
            { name: 'Present Situation' },
            { name: 'The Challenge' },
            { name: 'Crown (Conscious)' },
            { name: 'Foundation (Unconscious)' },
            { name: 'Past' },
            { name: 'Future' },
            { name: 'Self' },
            { name: 'Environment' },
            { name: 'Hopes & Fears' },
            { name: 'Outcome' }
        ]
    }
};

// State
let currentLanguage    = DEFAULT_LANGUAGE; // Wikipedia article language
let uiLanguage         = DEFAULT_LANGUAGE; // Interface / position-name language
let showDisambiguation = false;            // Whether to include disambiguation pages
let currentSpreadType  = null;
let currentArticles    = null;
let currentReading    = '';
let userSpreads        = [];
let fetchPromise       = null;             // Shared fetch promise; null means not yet started

// ---- Utility ----

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Return a translation object for the current UI language, falling back to English.
function t() {
    return TRANSLATIONS[uiLanguage] || TRANSLATIONS[DEFAULT_LANGUAGE];
}

function getAllSpreads() {
    return [SPREADS.one, SPREADS.three, SPREADS.celtic, ...userSpreads];
}

function getSpreadById(id) {
    if (SPREADS[id]) return SPREADS[id];
    return userSpreads.find(s => s.id === id) || null;
}

function getSpreadDisplayName(spread) {
    if (!spread.isDefault) return spread.name;
    const tr = t();
    if (spread.id === 'one')    return tr.oneCard;
    if (spread.id === 'three')  return tr.threeCard;
    if (spread.id === 'celtic') return tr.celticCross;
    return spread.id;
}

// ---- LocalStorage ----

function loadLanguagePreference() {
    const saved = localStorage.getItem('wikitarot-language');
    if (saved && LANGUAGES[saved]) currentLanguage = saved;
}

function saveLanguagePreference() {
    localStorage.setItem('wikitarot-language', currentLanguage);
}

function loadUILanguagePreference() {
    const saved = localStorage.getItem('wikitarot-ui-language');
    if (saved && TRANSLATIONS[saved]) uiLanguage = saved;
}

function saveUILanguagePreference() {
    localStorage.setItem('wikitarot-ui-language', uiLanguage);
}

function loadDisambiguationPreference() {
    showDisambiguation = localStorage.getItem('wikitarot-disambiguation') === 'true';
}

function saveDisambiguationPreference() {
    localStorage.setItem('wikitarot-disambiguation', showDisambiguation);
}

function loadUserSpreads() {
    const saved = localStorage.getItem('wikitarot-spreads');
    if (saved) {
        try { userSpreads = JSON.parse(saved); }
        catch (e) { userSpreads = []; }
    }
}

function saveUserSpreads() {
    localStorage.setItem('wikitarot-spreads', JSON.stringify(userSpreads));
}

function loadLastSpread() {
    const saved = localStorage.getItem('wikitarot-last-spread');
    const spreadId = (saved && getSpreadById(saved)) ? saved : 'three';
    currentSpreadType = spreadId;
    const select = document.getElementById('spread-select');
    if (select) select.value = spreadId;
    renderUndrawnSpread(spreadId);
}

function saveLastSpread(id) {
    localStorage.setItem('wikitarot-last-spread', id);
}

// Migrate old string[] positions to { name }[] and load into SPREADS
function migrateAndLoadPositions() {
    const saved = localStorage.getItem('wikitarot-positions');
    if (!saved) return;
    try {
        const custom = JSON.parse(saved);
        const toObj = arr => arr.map(p => typeof p === 'string' ? { name: p } : p);
        if (custom.one)    SPREADS.one.positions    = toObj(custom.one);
        if (custom.three)  SPREADS.three.positions  = toObj(custom.three);
        if (custom.celtic) SPREADS.celtic.positions = toObj(custom.celtic);
    } catch (e) { /* ignore */ }
}

function saveCustomPositions() {
    localStorage.setItem('wikitarot-positions', JSON.stringify({
        one:    SPREADS.one.positions,
        three:  SPREADS.three.positions,
        celtic: SPREADS.celtic.positions
    }));
}

// ---- UI Language update ----

function updateUILanguage() {
    const tr = t();

    document.documentElement.lang = uiLanguage === 'simple' ? 'en' : uiLanguage;
    document.querySelector('.tagline').textContent                                = tr.tagline;
    document.querySelector('#draw-btn .draw-text').textContent                   = tr.draw;
    document.querySelector('.modal-header h2').textContent                       = tr.settingsTitle;
    document.getElementById('section-language').textContent                      = tr.languageSection;
    document.querySelector('label[for="ui-language-select"]').textContent        = tr.interfaceLanguage;
    document.querySelector('label[for="language-select"]').textContent           = tr.articleLanguage;
    document.getElementById('section-articles').textContent                      = tr.articlesSection;
    document.querySelector('label[for="disambiguation-toggle"]').textContent     = tr.disambigLabel;
    document.getElementById('save-settings').textContent                         = tr.save;
    document.getElementById('reset-language').textContent                        = tr.resetDefaults;
    document.getElementById('settings-btn').title                                = tr.settingsTooltip;
    document.getElementById('article-external').title                            = tr.openInNewTab;
    document.getElementById('article-close').title                               = tr.close;
    document.querySelector('footer p').textContent                               = tr.footer;

    // Tab labels
    const tabSettings = document.querySelector('.modal-tab[data-tab="settings"]');
    const tabSpreads  = document.querySelector('.modal-tab[data-tab="spreads"]');
    if (tabSettings) tabSettings.textContent = tr.settingsTab;
    if (tabSpreads)  tabSpreads.textContent  = tr.spreadsTab;

    // Share button tooltip
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.title = tr.shareTooltip;

    // Reading modal
    document.getElementById('reading-btn').title                                    = tr.readingBtnTooltip;
    document.querySelector('#reading-modal .modal-header h2').textContent           = tr.readingTitle;
document.getElementById('reading-save').textContent                             = tr.readingSave;
    document.getElementById('reading-clear').textContent                            = tr.readingClear;

    // Dropdown option labels for default spreads
    document.querySelector('#optgroup-default option[value="one"]').textContent    = tr.oneCard;
    document.querySelector('#optgroup-default option[value="three"]').textContent  = tr.threeCard;
    document.querySelector('#optgroup-default option[value="celtic"]').textContent = tr.celticCross;

    // Update default spread positions from UI-language translations,
    // but don't overwrite positions the user has already customised.
    const savedStr = localStorage.getItem('wikitarot-positions');
    const saved = savedStr ? (() => { try { return JSON.parse(savedStr); } catch(e) { return {}; } })() : {};
    if (!saved.one)    SPREADS.one.positions    = [{ name: tr.defaultPositions.one }];
    if (!saved.three)  SPREADS.three.positions  = tr.defaultPositions.three.map(name => ({ name }));
    if (!saved.celtic) SPREADS.celtic.positions = tr.defaultPositions.celtic.map(name => ({ name }));
}

// ---- Spread dropdown ----

function rebuildSpreadDropdown() {
    const optgroupUser = document.getElementById('optgroup-user');
    optgroupUser.innerHTML = '';
    if (userSpreads.length === 0) {
        optgroupUser.classList.add('hidden');
    } else {
        optgroupUser.classList.remove('hidden');
        userSpreads.forEach(spread => {
            const option = document.createElement('option');
            option.value = spread.id;
            option.textContent = spread.name;
            optgroupUser.appendChild(option);
        });
    }
}

// ---- Fetch lifecycle ----

function resetFetch() {
    fetchPromise   = null;
    currentArticles = null;
}

// Idempotent: starts a fetch if one isn't already in flight; returns the shared promise.
function startFetch() {
    if (fetchPromise) return fetchPromise;
    const spread = getSpreadById(currentSpreadType);
    if (!spread) return Promise.reject(new Error('No spread'));
    const count = spread.count !== undefined ? spread.count : spread.positions.length;
    fetchPromise = fetchRandomArticles(count).then(articles => {
        currentArticles = articles;
        return articles;
    }).catch(err => {
        fetchPromise = null; // allow retry
        throw err;
    });
    return fetchPromise;
}

// Populate the front face of an undrawn card with article data.
function populateCardFront(card, article) {
    const tr           = t();
    const domain       = LANGUAGES[currentLanguage].domain;
    const mobileDomain = domain.replace('wikipedia.org', 'm.wikipedia.org');
    const articleUrl   = `https://${domain}/wiki/${encodeURIComponent(article.title)}`;
    const mobileUrl    = `https://${mobileDomain}/wiki/${encodeURIComponent(article.title)}`;

    card.querySelector('.card-title').textContent = article.title;
    const link = card.querySelector('.card-link');
    link.textContent = tr.readArticle;
    link.href = articleUrl;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArticleViewer(article.title, mobileUrl, articleUrl);
    });
}

// Called after each card reveal to check whether every card is now showing.
function checkAllRevealed() {
    const cards = [...document.querySelectorAll('#card-display .tarot-card')];
    if (cards.length === 0) return;
    if (!cards.every(c => c.classList.contains('revealed'))) return;
    document.getElementById('draw-btn').classList.remove('loading');
    document.getElementById('share-btn').disabled = false;
    document.getElementById('download-btn').disabled = false;
}

// Click handler attached to each undrawn card.
async function handleCardClick(card, index) {
    if (card.classList.contains('revealed')) return;

    const drawBtn      = document.getElementById('draw-btn');
    const isFirstFetch = fetchPromise === null;

    if (isFirstFetch) {
        drawBtn.classList.add('loading');
        document.getElementById('share-btn').disabled = true;
        document.getElementById('download-btn').disabled = true;
    }

    try {
        const articles = await startFetch();
        if (isFirstFetch) drawBtn.classList.remove('loading');
        populateCardFront(card, articles[index]);
        card.classList.add('revealed');
        checkAllRevealed();
    } catch (error) {
        console.error('Error fetching articles:', error);
        if (isFirstFetch) drawBtn.classList.remove('loading');
        showError();
    }
}

// ---- Card creation ----

function computeUserSpreadGrid(positions) {
    const maxRow = Math.max(...positions.map(p => p.row || 1));
    const maxCol = Math.max(...positions.map(p => p.col || 1));
    return { rows: maxRow, cols: maxCol };
}

function createUndrawnCard(position, index) {
    const name = position.name || position;
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.position = index + 1;
    if (position.row !== undefined && position.col !== undefined) {
        card.style.gridRow    = position.row;
        card.style.gridColumn = position.col;
    }
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${escapeHtml(name)}</div>
                <div class="card-back-design"><span class="card-back-symbol">?</span></div>
            </div>
            <div class="card-front">
                <div class="card-position">${escapeHtml(name)}</div>
                <div class="card-title"></div>
                <a href="#" class="card-link">Read Article</a>
            </div>
        </div>
    `;
    card.addEventListener('click', () => handleCardClick(card, index));
    return card;
}

function createCard(article, position, index) {
    const name = position.name || position;
    const tr   = t();
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.position = index + 1;
    if (position.row !== undefined && position.col !== undefined) {
        card.style.gridRow    = position.row;
        card.style.gridColumn = position.col;
    }

    const domain       = LANGUAGES[currentLanguage].domain;
    const mobileDomain = domain.replace('wikipedia.org', 'm.wikipedia.org');
    const articleUrl   = `https://${domain}/wiki/${encodeURIComponent(article.title)}`;
    const mobileUrl    = `https://${mobileDomain}/wiki/${encodeURIComponent(article.title)}`;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${escapeHtml(name)}</div>
                <div class="card-back-design"><span class="card-back-symbol">?</span></div>
            </div>
            <div class="card-front">
                <div class="card-position">${escapeHtml(name)}</div>
                <div class="card-title">${escapeHtml(article.title)}</div>
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="card-link">${tr.readArticle}</a>
            </div>
        </div>
    `;

    card.querySelector('.card-link').addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArticleViewer(article.title, mobileUrl, articleUrl);
    });
    card.addEventListener('click', () => card.classList.add('revealed'));
    return card;
}

// ---- Spread rendering ----

function applySpreadLayout(spread) {
    const cardDisplay = document.getElementById('card-display');
    if (spread.isDefault) {
        cardDisplay.style.gridTemplateColumns = '';
        cardDisplay.style.gridTemplateRows    = '';
        cardDisplay.className = `card-display ${spread.layoutClass}`;
    } else {
        const { rows, cols } = computeUserSpreadGrid(spread.positions);
        cardDisplay.className = 'card-display user-spread';
        cardDisplay.style.gridTemplateColumns = `repeat(${cols}, 180px)`;
        cardDisplay.style.gridTemplateRows    = `repeat(${rows}, 280px)`;
    }
}

function renderUndrawnSpread(id) {
    const spread = getSpreadById(id);
    if (!spread) return;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    applySpreadLayout(spread);
    spread.positions.forEach((position, index) => cardDisplay.appendChild(createUndrawnCard(position, index)));
}

function renderSpread(id, articles, onComplete) {
    const spread = getSpreadById(id);
    if (!spread) return;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    applySpreadLayout(spread);
    articles.forEach((article, index) => {
        const card   = createCard(article, spread.positions[index], index);
        const isLast = index === articles.length - 1;
        cardDisplay.appendChild(card);
        setTimeout(() => {
            card.classList.add('revealed');
            if (isLast && onComplete) setTimeout(onComplete, 800);
        }, 500 + index * 300);
    });
}

// All cards immediately revealed — used for shared-URL restores
function renderSpreadRevealed(id, articles) {
    const spread = getSpreadById(id);
    if (!spread) return;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    applySpreadLayout(spread);
    articles.forEach((article, index) => {
        const card = createCard(article, spread.positions[index], index);
        card.classList.add('revealed');
        cardDisplay.appendChild(card);
    });
    document.getElementById('share-btn').disabled = false;
    document.getElementById('download-btn').disabled = false;
}

function showError(message) {
    const tr = t();
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = `
        <div class="error-message">
            <p>${message || tr.errorMessage}</p>
            <p>${tr.tryAgain}</p>
        </div>
    `;
    cardDisplay.className = 'card-display';
}

// ---- Wikipedia fetch ----

async function fetchRandomArticles(count) {
    const domain   = LANGUAGES[currentLanguage].domain;
    const articles = [];
    while (articles.length < count) {
        const limit    = (count - articles.length) + 5;
        const url      = `https://${domain}/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=${limit}&prop=pageprops&ppprop=disambiguation&format=json&origin=*`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch from Wikipedia API');
        const data  = await response.json();
        const pages = Object.values(data.query.pages);
        const batch = showDisambiguation
            ? pages
            : pages.filter(p => !p.pageprops || !('disambiguation' in p.pageprops));
        articles.push(...batch);
    }
    return articles.slice(0, count);
}

// ---- Spread selection ----

function handleSpreadSelection(spreadId) {
    currentSpreadType = spreadId;
    resetFetch();
    saveLastSpread(spreadId);
    document.getElementById('share-btn').disabled = true;
    document.getElementById('download-btn').disabled = true;

    const viewer = document.getElementById('article-viewer');
    if (viewer) {
        viewer.classList.add('hidden');
        const iframe = document.getElementById('article-iframe');
        if (iframe) iframe.src = '';
    }

    document.getElementById('draw-btn').classList.remove('loading');
    renderUndrawnSpread(spreadId);
}

document.getElementById('spread-select').addEventListener('change', e => handleSpreadSelection(e.target.value));

// ---- Draw ----

async function handleDraw() {
    if (!currentSpreadType) return;
    const spread = getSpreadById(currentSpreadType);
    if (!spread) return;

    const drawBtn     = document.getElementById('draw-btn');
    const shareBtn    = document.getElementById('share-btn');
    const downloadBtn = document.getElementById('download-btn');
    const cardDisplay = document.getElementById('card-display');

    // If every card is already revealed, reset and start a brand-new draw.
    const existingCards = [...cardDisplay.querySelectorAll('.tarot-card')];
    if (existingCards.length > 0 && existingCards.every(c => c.classList.contains('revealed'))) {
        resetFetch();
        shareBtn.disabled = true;
        downloadBtn.disabled = true;
        renderUndrawnSpread(currentSpreadType);
    }

    drawBtn.classList.add('loading');
    shareBtn.disabled = true;
    downloadBtn.disabled = true;

    try {
        const articles = await startFetch();

        // Reveal all cards that haven't been flipped yet, in position order.
        const unrevealed = [...cardDisplay.querySelectorAll('.tarot-card:not(.revealed)')];

        if (unrevealed.length === 0) {
            drawBtn.classList.remove('loading');
            shareBtn.disabled = false;
            downloadBtn.disabled = false;
            return;
        }

        unrevealed.forEach((card, i) => {
            const posIndex = parseInt(card.dataset.position) - 1;
            const isLast   = i === unrevealed.length - 1;
            setTimeout(() => {
                populateCardFront(card, articles[posIndex]);
                card.classList.add('revealed');
                if (isLast) {
                    drawBtn.classList.remove('loading');
                    shareBtn.disabled = false;
                    downloadBtn.disabled = false;
                }
            }, i * 300);
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        drawBtn.classList.remove('loading');
        currentArticles = null;
        showError();
    }
}

document.getElementById('draw-btn').addEventListener('click', handleDraw);

// ---- Settings modal ----

function openSettingsModal() {
    document.getElementById('ui-language-select').value      = uiLanguage;
    document.getElementById('language-select').value         = currentLanguage;
    document.getElementById('disambiguation-toggle').checked = showDisambiguation;
    switchSettingsTab('settings');
    document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

function switchSettingsTab(tabName) {
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.add('hidden'));
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');
    document.getElementById('settings-footer').classList.toggle('hidden', tabName !== 'settings');
    document.getElementById('spreads-footer').classList.toggle('hidden',  tabName !== 'spreads');
    if (tabName === 'spreads') renderSpreadsTab();
}

function saveSettings() {
    const prevUI      = uiLanguage;
    uiLanguage         = document.getElementById('ui-language-select').value;
    currentLanguage    = document.getElementById('language-select').value;
    showDisambiguation = document.getElementById('disambiguation-toggle').checked;
    saveUILanguagePreference();
    saveLanguagePreference();
    saveDisambiguationPreference();

    if (prevUI !== uiLanguage) {
        updateUILanguage();
        if (!currentArticles && currentSpreadType) renderUndrawnSpread(currentSpreadType);
    }
    closeSettingsModal();
}

function resetLanguage() {
    document.getElementById('ui-language-select').value      = DEFAULT_LANGUAGE;
    document.getElementById('language-select').value         = DEFAULT_LANGUAGE;
    document.getElementById('disambiguation-toggle').checked = false;
}

document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
document.getElementById('modal-close').addEventListener('click', closeSettingsModal);
document.getElementById('save-settings').addEventListener('click', saveSettings);
document.getElementById('reset-language').addEventListener('click', resetLanguage);

document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => switchSettingsTab(tab.dataset.tab));
});

document.getElementById('settings-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('settings-modal')) closeSettingsModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !document.getElementById('settings-modal').classList.contains('hidden')) closeSettingsModal();
    if (e.key === 'Escape' && !document.getElementById('reading-modal').classList.contains('hidden'))  closeReadingModal();
    if (e.key === 'Escape' && !document.getElementById('article-viewer').classList.contains('hidden'))  closeArticleViewer();
});

// ---- Spreads tab ----

function renderSpreadsTab() {
    const tr  = t();
    const html = getAllSpreads().map(spread => renderSpreadListItem(spread, tr)).join('');
    document.getElementById('tab-spreads').innerHTML = `<div class="spread-list">${html}</div>`;
}

function renderSpreadListItem(spread, tr) {
    const name    = escapeHtml(getSpreadDisplayName(spread));
    const actions = spread.isDefault
        ? `<button class="spread-action-btn" data-action="edit"  data-spread-id="${spread.id}">${tr.editSpread}</button>
           <button class="spread-action-btn" data-action="reset" data-spread-id="${spread.id}">${tr.resetSpread}</button>`
        : `<button class="spread-action-btn" data-action="edit"   data-spread-id="${spread.id}">${tr.editSpread}</button>
           <button class="spread-action-btn spread-action-delete" data-action="delete" data-spread-id="${spread.id}">${tr.deleteSpread}</button>`;
    return `
        <div class="spread-list-item" data-spread-id="${spread.id}">
            <div class="spread-list-header">
                <span class="spread-list-name">${name}</span>
                <div class="spread-list-actions">${actions}</div>
            </div>
            <div class="spread-editor" id="editor-${spread.id}">
                ${renderSpreadEditor(spread, tr)}
            </div>
        </div>
    `;
}

function renderSpreadEditor(spread, tr) {
    if (spread.isDefault) {
        const rows = spread.positions.map((pos, i) => `
            <div class="position-editor-row">
                <label>${tr.positionName} ${i + 1}</label>
                <input type="text" class="pos-name-input" data-pos-index="${i}" value="${escapeHtml(pos.name)}" placeholder="${tr.positionName}">
            </div>
        `).join('');
        return `
            <div class="spread-editor-inner">
                ${rows}
                <button class="btn-save spread-editor-save" data-action="save-editor" data-spread-id="${spread.id}">${tr.save}</button>
            </div>
        `;
    } else {
        const rows = spread.positions.map((pos, i) => `
            <div class="position-editor-row" data-pos-index="${i}">
                <input type="text"   class="pos-name-input" data-pos-index="${i}" value="${escapeHtml(pos.name)}"  placeholder="${tr.positionName}">
                <input type="number" class="pos-row-input"  data-pos-index="${i}" value="${pos.row || 1}" min="1"  placeholder="${tr.row}">
                <input type="number" class="pos-col-input"  data-pos-index="${i}" value="${pos.col || 1}" min="1"  placeholder="${tr.col}">
                <button class="spread-action-btn spread-action-delete" data-action="remove-position" data-spread-id="${spread.id}" data-pos-index="${i}">×</button>
            </div>
        `).join('');
        return `
            <div class="spread-editor-inner">
                <div class="position-editor-row">
                    <label>${tr.spreadName}</label>
                    <input type="text" class="spread-name-input" value="${escapeHtml(spread.name)}">
                </div>
                <div class="position-editor-labels">
                    <span></span><span>${tr.positionName}</span><span>${tr.row}</span><span>${tr.col}</span><span></span>
                </div>
                ${rows}
                <button class="spread-action-btn" data-action="add-position" data-spread-id="${spread.id}">${tr.addPosition}</button>
                <button class="btn-save spread-editor-save" data-action="save-editor" data-spread-id="${spread.id}">${tr.save}</button>
            </div>
        `;
    }
}

// Event delegation for spreads tab — set up once on a static parent
document.getElementById('tab-spreads').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    handleSpreadsTabAction(btn.dataset.action, btn.dataset.spreadId,
        btn.dataset.posIndex !== undefined ? parseInt(btn.dataset.posIndex) : null);
});

function handleSpreadsTabAction(action, spreadId, posIndex) {
    if (action === 'edit') {
        document.getElementById(`editor-${spreadId}`)?.classList.toggle('open');

    } else if (action === 'reset') {
        resetDefaultSpreadPositions(spreadId);

    } else if (action === 'delete') {
        const idx = userSpreads.findIndex(s => s.id === spreadId);
        if (idx !== -1) {
            userSpreads.splice(idx, 1);
            saveUserSpreads();
            rebuildSpreadDropdown();
            if (currentSpreadType === spreadId) {
                document.getElementById('spread-select').value = 'three';
                handleSpreadSelection('three');
            }
            renderSpreadsTab();
        }

    } else if (action === 'save-editor') {
        saveSpreadEditor(spreadId);

    } else if (action === 'add-position') {
        const spread = userSpreads.find(s => s.id === spreadId);
        if (spread) {
            const tr = t();
            spread.positions.push({ name: `${tr.positionName} ${spread.positions.length + 1}`, row: 1, col: spread.positions.length + 1 });
            saveUserSpreads();
            renderSpreadsTab();
            document.getElementById(`editor-${spreadId}`)?.classList.add('open');
        }

    } else if (action === 'remove-position') {
        const spread = userSpreads.find(s => s.id === spreadId);
        if (spread && posIndex !== null && posIndex >= 0 && spread.positions.length > 1) {
            spread.positions.splice(posIndex, 1);
            saveUserSpreads();
            renderSpreadsTab();
            document.getElementById(`editor-${spreadId}`)?.classList.add('open');
        }
    }
}

function saveSpreadEditor(spreadId) {
    const spread   = getSpreadById(spreadId);
    const editorEl = document.getElementById(`editor-${spreadId}`);
    if (!spread || !editorEl) return;

    if (spread.isDefault) {
        editorEl.querySelectorAll('.pos-name-input').forEach((input, i) => {
            const val = input.value.trim();
            if (val && spread.positions[i]) spread.positions[i].name = val;
        });
        saveCustomPositions();
    } else {
        const nameInput = editorEl.querySelector('.spread-name-input');
        if (nameInput?.value.trim()) spread.name = nameInput.value.trim();

        editorEl.querySelectorAll('.position-editor-row[data-pos-index]').forEach(row => {
            const idx = parseInt(row.dataset.posIndex);
            if (isNaN(idx) || !spread.positions[idx]) return;
            const ni = row.querySelector('.pos-name-input');
            const ri = row.querySelector('.pos-row-input');
            const ci = row.querySelector('.pos-col-input');
            if (ni?.value.trim())  spread.positions[idx].name = ni.value.trim();
            if (ri) spread.positions[idx].row = parseInt(ri.value) || 1;
            if (ci) spread.positions[idx].col = parseInt(ci.value) || 1;
        });
        saveUserSpreads();
        rebuildSpreadDropdown();
    }

    // Refresh live card labels if this spread is currently displayed
    if (currentSpreadType === spreadId) {
        document.querySelectorAll('#card-display .tarot-card').forEach((card, i) => {
            const pos = spread.positions[i];
            if (!pos) return;
            const bp = card.querySelector('.card-back-position');
            const fp = card.querySelector('.card-position');
            if (bp) bp.textContent = pos.name;
            if (fp) fp.textContent = pos.name;
        });
    }

    editorEl.classList.remove('open');
    renderSpreadsTab();
}

function resetDefaultSpreadPositions(spreadId) {
    const tr = t();
    if (spreadId === 'one')    SPREADS.one.positions    = [{ name: tr.defaultPositions.one }];
    if (spreadId === 'three')  SPREADS.three.positions  = tr.defaultPositions.three.map(name => ({ name }));
    if (spreadId === 'celtic') SPREADS.celtic.positions = tr.defaultPositions.celtic.map(name => ({ name }));
    saveCustomPositions();

    if (currentSpreadType === spreadId) {
        const spread = SPREADS[spreadId];
        document.querySelectorAll('#card-display .tarot-card').forEach((card, i) => {
            const pos = spread.positions[i];
            if (!pos) return;
            const bp = card.querySelector('.card-back-position');
            const fp = card.querySelector('.card-position');
            if (bp) bp.textContent = pos.name;
            if (fp) fp.textContent = pos.name;
        });
    }
    renderSpreadsTab();
}

function createUserSpread() {
    const tr  = t();
    const id  = `usr_${Date.now()}`;
    const pos = tr.positionName;
    userSpreads.push({
        id, isDefault: false,
        name: `My Spread ${userSpreads.length + 1}`,
        positions: [
            { name: `${pos} 1`, row: 1, col: 1 },
            { name: `${pos} 2`, row: 1, col: 2 },
            { name: `${pos} 3`, row: 1, col: 3 }
        ]
    });
    saveUserSpreads();
    rebuildSpreadDropdown();
    renderSpreadsTab();
    document.getElementById(`editor-${id}`)?.classList.add('open');
}

document.getElementById('new-spread-btn').addEventListener('click', createUserSpread);

// ---- URL sharing ----

function showToast(message) {
    const toast = document.getElementById('copy-toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
}

function handleShare() {
    if (!currentArticles || !currentSpreadType) return;
    const tr = t();
    const params = new URLSearchParams({
        spread:   currentSpreadType,
        lang:     currentLanguage,
        ui:       uiLanguage,
        articles: currentArticles.map(a => a.title).join('|')
    });

    const spread = getSpreadById(currentSpreadType);
    if (spread && !spread.isDefault) {
        params.set('spreadData', btoa(unescape(encodeURIComponent(
            JSON.stringify({ name: spread.name, positions: spread.positions })
        ))));
    }

    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url)
            .then(() => showToast(tr.linkCopied))
            .catch(() => prompt('Copy this link:', url));
    } else {
        prompt('Copy this link:', url);
    }
}

document.getElementById('share-btn').addEventListener('click', handleShare);

function handleDownload() {
    if (!currentArticles || !currentSpreadType) return;
    const spread = getSpreadById(currentSpreadType);
    if (!spread) return;

    const domain = LANGUAGES[currentLanguage].domain;
    const q = f => `"${String(f).replace(/"/g, '""')}"`;

    const hasTopic = !!currentReading;
    const header = [q('Topic'),
        ...(hasTopic ? [] : []),
        q('Position'), q('Position Name'), q('Article'), q('Link')].join(',');
    const dataRows = currentArticles.map((article, i) => {
        const posName = spread.positions[i]?.name || '';
        const url = `https://${domain}/wiki/${encodeURIComponent(article.title)}`;
        return [
            ...(hasTopic ? [i === 0 ? q(currentReading) : q('')] : []),
            q(i + 1), q(posName), q(article.title), q(url)
        ].join(',');
    });

    const spreadSlug = getSpreadDisplayName(spread)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_|_$/g, '');
    const now = new Date();
    const ts  = now.getFullYear()
        + String(now.getMonth() + 1).padStart(2, '0')
        + String(now.getDate()).padStart(2, '0')
        + '_'
        + String(now.getHours()).padStart(2, '0')
        + String(now.getMinutes()).padStart(2, '0')
        + String(now.getSeconds()).padStart(2, '0');

    const csv  = [header, ...dataRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = `tarotpedia-${spreadSlug}-${ts}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
}

document.getElementById('download-btn').addEventListener('click', handleDownload);

function checkURLParams() {
    const params        = new URLSearchParams(window.location.search);
    const spreadId      = params.get('spread');
    const lang          = params.get('lang');
    const ui            = params.get('ui');
    const articlesParam = params.get('articles');
    const spreadDataParam = params.get('spreadData');

    if (!spreadId || !articlesParam) return;

    if (lang && LANGUAGES[lang])      { currentLanguage = lang; saveLanguagePreference(); }
    if (ui   && TRANSLATIONS[ui])     { uiLanguage = ui;        saveUILanguagePreference(); }
    if (lang || ui)                   updateUILanguage();

    if (spreadDataParam) {
        try {
            const data = JSON.parse(decodeURIComponent(escape(atob(spreadDataParam))));
            if (!getSpreadById(spreadId)) {
                userSpreads.push({ id: spreadId, name: data.name, isDefault: false, positions: data.positions });
                saveUserSpreads();
                rebuildSpreadDropdown();
            }
        } catch (e) { console.error('Failed to parse spreadData:', e); }
    }

    const spread = getSpreadById(spreadId);
    if (!spread) return;

    const count    = spread.count !== undefined ? spread.count : spread.positions.length;
    const articles = articlesParam.split('|').map(title => ({ title }));
    if (articles.length !== count) return;

    currentSpreadType = spreadId;
    currentArticles   = articles;
    const select = document.getElementById('spread-select');
    if (select) select.value = spreadId;
    saveLastSpread(spreadId);

    renderSpreadRevealed(spreadId, articles);
    history.replaceState(null, '', window.location.pathname);
}

// ---- Reading modal ----

function renderReadingDisplay() {
    const display = document.getElementById('reading-display');
    const text    = document.getElementById('reading-text');
    const btn     = document.getElementById('reading-btn');
    if (currentReading) {
        text.textContent = currentReading;
        display.classList.remove('hidden');
        btn.classList.add('active');
    } else {
        display.classList.add('hidden');
        btn.classList.remove('active');
    }
}

function openReadingModal() {
    document.getElementById('reading-input').value = currentReading;
    document.getElementById('reading-modal').classList.remove('hidden');
    document.getElementById('reading-input').focus();
}

function closeReadingModal() {
    document.getElementById('reading-modal').classList.add('hidden');
}

function saveReading() {
    currentReading = document.getElementById('reading-input').value.trim();
    renderReadingDisplay();
    closeReadingModal();
}

function clearReading() {
    document.getElementById('reading-input').value = '';
    currentReading = '';
    renderReadingDisplay();
    closeReadingModal();
}

document.getElementById('reading-btn').addEventListener('click', openReadingModal);
document.getElementById('reading-modal-close').addEventListener('click', closeReadingModal);
document.getElementById('reading-save').addEventListener('click', saveReading);
document.getElementById('reading-clear').addEventListener('click', clearReading);

document.getElementById('reading-modal').addEventListener('click', e => {
    if (e.target === document.getElementById('reading-modal')) closeReadingModal();
});

// ---- Article viewer ----

function openArticleViewer(title, iframeUrl, externalUrl) {
    document.getElementById('article-title').textContent = title;
    document.getElementById('article-external').href    = externalUrl;
    document.getElementById('article-iframe').src       = iframeUrl;
    const viewer = document.getElementById('article-viewer');
    viewer.classList.remove('hidden');
    viewer.scrollIntoView({ behavior: 'smooth' });
}

function closeArticleViewer() {
    document.getElementById('article-viewer').classList.add('hidden');
    document.getElementById('article-iframe').src = '';
}

document.getElementById('article-close').addEventListener('click', closeArticleViewer);

// ---- Init sequence ----
if (window.location.protocol === 'file:') {
    document.getElementById('share-btn').style.display = 'none';
}
loadLanguagePreference();
loadUILanguagePreference();
loadDisambiguationPreference();
loadUserSpreads();
migrateAndLoadPositions();
updateUILanguage();
rebuildSpreadDropdown();
loadLastSpread();
checkURLParams();
