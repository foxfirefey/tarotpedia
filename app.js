// Language configuration
const LANGUAGES = {
    en: { name: 'English', domain: 'en.wikipedia.org' },
    simple: { name: 'Simple English', domain: 'simple.wikipedia.org' },
    es: { name: 'Spanish', domain: 'es.wikipedia.org' },
    de: { name: 'German', domain: 'de.wikipedia.org' },
    fr: { name: 'French', domain: 'fr.wikipedia.org' },
    ja: { name: 'Japanese', domain: 'ja.wikipedia.org' },
    pt: { name: 'Portuguese', domain: 'pt.wikipedia.org' }
};

const DEFAULT_LANGUAGE = 'en';
let currentLanguage = DEFAULT_LANGUAGE;

// Translations for UI elements
const TRANSLATIONS = {
    en: {
        tagline: 'Divination through encyclopedia',
        oneCard: 'One Card',
        threeCard: 'Three Card',
        celticCross: 'Celtic Cross',
        draw: 'Draw',
        settingsTitle: 'Settings',
        wikiLanguage: 'Wikipedia Language',
        articleLanguage: 'Article Language:',
        resetDefaults: 'Reset',
        save: 'Save',
        drawingArticles: 'Drawing articles...',
        readArticle: 'Read Article',
        openInNewTab: 'Open in new tab',
        close: 'Close',
        footer: "Because 78 cards wasn't enough.",
        settingsTooltip: 'Change position names and languages',
        errorMessage: 'The spirits of Wikipedia are currently unavailable.',
        tryAgain: 'Please try again.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Copy shareable link',
        linkCopied: 'Link copied!',
        editSpread: 'Edit',
        deleteSpread: 'Delete',
        resetSpread: 'Reset',
        addPosition: '+ Add Position',
        newSpread: '+ New Spread',
        spreadName: 'Spread Name',
        positionName: 'Position',
        row: 'Row',
        col: 'Col',
        defaultPositions: {
            one: 'The Answer',
            three: ['Past', 'Present', 'Future'],
            celtic: ['Present Situation', 'The Challenge', 'Crown (Conscious)', 'Foundation (Unconscious)', 'Past', 'Future', 'Self', 'Environment', 'Hopes & Fears', 'Outcome']
        }
    },
    simple: {
        tagline: 'Divination through encyclopedia',
        oneCard: 'One Card',
        threeCard: 'Three Card',
        celticCross: 'Celtic Cross',
        draw: 'Draw',
        settingsTitle: 'Settings',
        wikiLanguage: 'Wikipedia Language',
        articleLanguage: 'Article Language:',
        resetDefaults: 'Reset',
        save: 'Save',
        drawingArticles: 'Getting articles...',
        readArticle: 'Read Article',
        openInNewTab: 'Open in new tab',
        close: 'Close',
        footer: "Because 78 cards wasn't enough.",
        settingsTooltip: 'Change position names and languages',
        errorMessage: 'Wikipedia is not working right now.',
        tryAgain: 'Please try again.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Copy shareable link',
        linkCopied: 'Link copied!',
        editSpread: 'Edit',
        deleteSpread: 'Delete',
        resetSpread: 'Reset',
        addPosition: '+ Add Position',
        newSpread: '+ New Spread',
        spreadName: 'Spread Name',
        positionName: 'Position',
        row: 'Row',
        col: 'Col',
        defaultPositions: {
            one: 'The Answer',
            three: ['Past', 'Present', 'Future'],
            celtic: ['Now', 'Problem', 'Thoughts', 'Feelings', 'Past', 'Future', 'You', 'Around You', 'Hopes & Fears', 'What Happens']
        }
    },
    es: {
        tagline: 'Adivinación a través del esoterismo',
        oneCard: 'Una Carta',
        threeCard: 'Tres Cartas',
        celticCross: 'Cruz Céltica',
        draw: 'Sacar',
        settingsTitle: 'Configuración',
        wikiLanguage: 'Idioma de Wikipedia',
        articleLanguage: 'Idioma del artículo:',
        resetDefaults: 'Restablecer',
        save: 'Guardar',
        drawingArticles: 'Sacando artículos...',
        readArticle: 'Leer Artículo',
        openInNewTab: 'Abrir en nueva pestaña',
        close: 'Cerrar',
        footer: 'Porque 78 cartas no eran suficientes.',
        settingsTooltip: 'Cambiar nombres de posiciones e idiomas',
        errorMessage: 'Los espíritus de Wikipedia no están disponibles.',
        tryAgain: 'Por favor, inténtalo de nuevo.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Copiar enlace',
        linkCopied: '¡Enlace copiado!',
        editSpread: 'Editar',
        deleteSpread: 'Eliminar',
        resetSpread: 'Restablecer',
        addPosition: '+ Agregar posición',
        newSpread: '+ Nueva tirada',
        spreadName: 'Nombre de la tirada',
        positionName: 'Posición',
        row: 'Fila',
        col: 'Col',
        defaultPositions: {
            one: 'La Respuesta',
            three: ['Pasado', 'Presente', 'Futuro'],
            celtic: ['Situación Actual', 'El Desafío', 'Corona (Consciente)', 'Base (Inconsciente)', 'Pasado', 'Futuro', 'Yo', 'Entorno', 'Esperanzas y Miedos', 'Resultado']
        }
    },
    de: {
        tagline: 'Wahrsagung durch Esoterik',
        oneCard: 'Eine Karte',
        threeCard: 'Drei Karten',
        celticCross: 'Keltisches Kreuz',
        draw: 'Ziehen',
        settingsTitle: 'Einstellungen',
        wikiLanguage: 'Wikipedia-Sprache',
        articleLanguage: 'Artikelsprache:',
        resetDefaults: 'Zurücksetzen',
        save: 'Speichern',
        drawingArticles: 'Artikel werden gezogen...',
        readArticle: 'Artikel lesen',
        openInNewTab: 'In neuem Tab öffnen',
        close: 'Schließen',
        footer: 'Weil 78 Karten nicht genug waren.',
        settingsTooltip: 'Positionsnamen und Sprachen ändern',
        errorMessage: 'Die Geister von Wikipedia sind derzeit nicht verfügbar.',
        tryAgain: 'Bitte versuche es erneut.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Link kopieren',
        linkCopied: 'Link kopiert!',
        editSpread: 'Bearbeiten',
        deleteSpread: 'Löschen',
        resetSpread: 'Zurücksetzen',
        addPosition: '+ Position hinzufügen',
        newSpread: '+ Neue Legung',
        spreadName: 'Name der Legung',
        positionName: 'Position',
        row: 'Zeile',
        col: 'Spalte',
        defaultPositions: {
            one: 'Die Antwort',
            three: ['Vergangenheit', 'Gegenwart', 'Zukunft'],
            celtic: ['Aktuelle Situation', 'Die Herausforderung', 'Krone (Bewusst)', 'Fundament (Unbewusst)', 'Vergangenheit', 'Zukunft', 'Selbst', 'Umgebung', 'Hoffnungen & Ängste', 'Ergebnis']
        }
    },
    fr: {
        tagline: 'Divination par l\'ésotérisme',
        oneCard: 'Une Carte',
        threeCard: 'Trois Cartes',
        celticCross: 'Croix Celtique',
        draw: 'Tirer',
        settingsTitle: 'Paramètres',
        wikiLanguage: 'Langue Wikipédia',
        articleLanguage: 'Langue de l\'article:',
        resetDefaults: 'Réinitialiser',
        save: 'Enregistrer',
        drawingArticles: 'Tirage des articles...',
        readArticle: 'Lire l\'Article',
        openInNewTab: 'Ouvrir dans un nouvel onglet',
        close: 'Fermer',
        footer: "Parce que 78 cartes n'étaient pas suffisantes.",
        settingsTooltip: 'Changer les noms de positions et les langues',
        errorMessage: 'Les esprits de Wikipédia sont actuellement indisponibles.',
        tryAgain: 'Veuillez réessayer.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Copier le lien',
        linkCopied: 'Lien copié !',
        editSpread: 'Modifier',
        deleteSpread: 'Supprimer',
        resetSpread: 'Réinitialiser',
        addPosition: '+ Ajouter une position',
        newSpread: '+ Nouveau tirage',
        spreadName: 'Nom du tirage',
        positionName: 'Position',
        row: 'Ligne',
        col: 'Col',
        defaultPositions: {
            one: 'La Réponse',
            three: ['Passé', 'Présent', 'Futur'],
            celtic: ['Situation Actuelle', 'Le Défi', 'Couronne (Conscient)', 'Fondation (Inconscient)', 'Passé', 'Futur', 'Soi', 'Environnement', 'Espoirs & Peurs', 'Résultat']
        }
    },
    ja: {
        tagline: '神秘を通じた占い',
        oneCard: '1枚のカード',
        threeCard: '3枚のカード',
        celticCross: 'ケルト十字',
        draw: '引く',
        settingsTitle: '設定',
        wikiLanguage: 'Wikipedia言語',
        articleLanguage: '記事の言語:',
        resetDefaults: 'リセット',
        save: '保存',
        drawingArticles: '記事を引いています...',
        readArticle: '記事を読む',
        openInNewTab: '新しいタブで開く',
        close: '閉じる',
        footer: '78枚のカードでは足りなかったから。',
        settingsTooltip: 'ポジション名と言語を変更',
        errorMessage: 'Wikipediaの精霊は現在利用できません。',
        tryAgain: 'もう一度お試しください。',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'リンクをコピー',
        linkCopied: 'リンクをコピーしました！',
        editSpread: '編集',
        deleteSpread: '削除',
        resetSpread: 'リセット',
        addPosition: '+ 位置を追加',
        newSpread: '+ 新しいスプレッド',
        spreadName: 'スプレッド名',
        positionName: 'ポジション',
        row: '行',
        col: '列',
        defaultPositions: {
            one: '答え',
            three: ['過去', '現在', '未来'],
            celtic: ['現在の状況', '課題', '王冠（意識）', '基礎（無意識）', '過去', '未来', '自己', '環境', '希望と恐れ', '結果']
        }
    },
    pt: {
        tagline: 'Adivinhação através do esoterismo',
        oneCard: 'Uma Carta',
        threeCard: 'Três Cartas',
        celticCross: 'Cruz Celta',
        draw: 'Puxar',
        settingsTitle: 'Configurações',
        wikiLanguage: 'Idioma da Wikipédia',
        articleLanguage: 'Idioma do artigo:',
        resetDefaults: 'Redefinir',
        save: 'Salvar',
        drawingArticles: 'Puxando artigos...',
        readArticle: 'Ler Artigo',
        openInNewTab: 'Abrir em nova aba',
        close: 'Fechar',
        footer: 'Porque 78 cartas não eram suficientes.',
        settingsTooltip: 'Alterar nomes de posições e idiomas',
        errorMessage: 'Os espíritos da Wikipédia estão atualmente indisponíveis.',
        tryAgain: 'Por favor, tente novamente.',
        settingsTab: 'Settings',
        spreadsTab: 'Spreads',
        shareTooltip: 'Copiar link',
        linkCopied: 'Link copiado!',
        editSpread: 'Editar',
        deleteSpread: 'Excluir',
        resetSpread: 'Redefinir',
        addPosition: '+ Adicionar posição',
        newSpread: '+ Nova tiragem',
        spreadName: 'Nome da tiragem',
        positionName: 'Posição',
        row: 'Linha',
        col: 'Col',
        defaultPositions: {
            one: 'A Resposta',
            three: ['Passado', 'Presente', 'Futuro'],
            celtic: ['Situação Atual', 'O Desafio', 'Coroa (Consciente)', 'Fundação (Inconsciente)', 'Passado', 'Futuro', 'Eu', 'Ambiente', 'Esperanças e Medos', 'Resultado']
        }
    }
};

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
let currentSpreadType = null;
let currentArticles = null;
let userSpreads = [];

// ---- Utility functions ----

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
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
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    if (spread.id === 'one') return t.oneCard;
    if (spread.id === 'three') return t.threeCard;
    if (spread.id === 'celtic') return t.celticCross;
    return spread.id;
}

// ---- LocalStorage helpers ----

function loadLanguagePreference() {
    const saved = localStorage.getItem('wikitarot-language');
    if (saved && LANGUAGES[saved]) {
        currentLanguage = saved;
    }
}

function saveLanguagePreference() {
    localStorage.setItem('wikitarot-language', currentLanguage);
}

function loadUserSpreads() {
    const saved = localStorage.getItem('wikitarot-spreads');
    if (saved) {
        try {
            userSpreads = JSON.parse(saved);
        } catch (e) {
            userSpreads = [];
        }
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

// Migrate old string[] positions to { name }[] format, load into SPREADS
function migrateAndLoadPositions() {
    const saved = localStorage.getItem('wikitarot-positions');
    if (!saved) return;
    try {
        const custom = JSON.parse(saved);
        if (custom.one) {
            SPREADS.one.positions = custom.one.map(p => typeof p === 'string' ? { name: p } : p);
        }
        if (custom.three) {
            SPREADS.three.positions = custom.three.map(p => typeof p === 'string' ? { name: p } : p);
        }
        if (custom.celtic) {
            SPREADS.celtic.positions = custom.celtic.map(p => typeof p === 'string' ? { name: p } : p);
        }
    } catch (e) {
        // ignore parse errors
    }
}

function saveCustomPositions() {
    const custom = {
        one: SPREADS.one.positions,
        three: SPREADS.three.positions,
        celtic: SPREADS.celtic.positions
    };
    localStorage.setItem('wikitarot-positions', JSON.stringify(custom));
}

// ---- UI Language ----

function updateUILanguage() {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    const te = TRANSLATIONS.en;

    document.documentElement.lang = currentLanguage === 'simple' ? 'en' : currentLanguage;
    document.querySelector('.tagline').textContent = t.tagline;
    document.querySelector('#draw-btn .draw-text').textContent = t.draw;
    document.querySelector('.modal-header h2').textContent = t.settingsTitle;
    document.querySelector('.settings-section h3').textContent = t.wikiLanguage;
    document.querySelector('label[for="language-select"]').textContent = t.articleLanguage;
    document.getElementById('save-settings').textContent = t.save;
    document.getElementById('reset-language').textContent = t.resetDefaults || te.resetDefaults;
    document.getElementById('settings-btn').title = t.settingsTooltip;
    document.getElementById('article-external').title = t.openInNewTab;
    document.getElementById('article-close').title = t.close;
    document.querySelector('footer p').textContent = t.footer;

    // Tab labels
    const tabSettings = document.querySelector('.modal-tab[data-tab="settings"]');
    const tabSpreads = document.querySelector('.modal-tab[data-tab="spreads"]');
    if (tabSettings) tabSettings.textContent = t.settingsTab || te.settingsTab;
    if (tabSpreads) tabSpreads.textContent = t.spreadsTab || te.spreadsTab;

    // Share button tooltip
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) shareBtn.title = t.shareTooltip || te.shareTooltip;

    // Dropdown option labels for default spreads
    const optOne = document.querySelector('#optgroup-default option[value="one"]');
    const optThree = document.querySelector('#optgroup-default option[value="three"]');
    const optCeltic = document.querySelector('#optgroup-default option[value="celtic"]');
    if (optOne) optOne.textContent = t.oneCard;
    if (optThree) optThree.textContent = t.threeCard;
    if (optCeltic) optCeltic.textContent = t.celticCross;

    // Update default spread positions from translations (don't overwrite saved custom positions)
    const savedStr = localStorage.getItem('wikitarot-positions');
    const saved = savedStr ? (() => { try { return JSON.parse(savedStr); } catch(e) { return {}; } })() : {};
    if (!saved.one) {
        SPREADS.one.positions = [{ name: t.defaultPositions.one }];
    }
    if (!saved.three) {
        SPREADS.three.positions = t.defaultPositions.three.map(name => ({ name }));
    }
    if (!saved.celtic) {
        SPREADS.celtic.positions = t.defaultPositions.celtic.map(name => ({ name }));
    }
}

// ---- Dropdown ----

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

// ---- Card rendering ----

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
        card.style.gridRow = position.row;
        card.style.gridColumn = position.col;
    }

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${escapeHtml(name)}</div>
                <div class="card-back-design">
                    <span class="card-back-symbol">?</span>
                </div>
            </div>
            <div class="card-front">
                <div class="card-position">${escapeHtml(name)}</div>
                <div class="card-title"></div>
                <a href="#" class="card-link">Read Article</a>
            </div>
        </div>
    `;
    return card;
}

function createCard(article, position, index) {
    const name = position.name || position;
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.position = index + 1;

    if (position.row !== undefined && position.col !== undefined) {
        card.style.gridRow = position.row;
        card.style.gridColumn = position.col;
    }

    const domain = LANGUAGES[currentLanguage].domain;
    const mobileDomain = domain.replace('wikipedia.org', 'm.wikipedia.org');
    const articleUrl = `https://${domain}/wiki/${encodeURIComponent(article.title)}`;
    const mobileUrl = `https://${mobileDomain}/wiki/${encodeURIComponent(article.title)}`;
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${escapeHtml(name)}</div>
                <div class="card-back-design">
                    <span class="card-back-symbol">?</span>
                </div>
            </div>
            <div class="card-front">
                <div class="card-position">${escapeHtml(name)}</div>
                <div class="card-title">${escapeHtml(article.title)}</div>
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="card-link">${t.readArticle}</a>
            </div>
        </div>
    `;

    const link = card.querySelector('.card-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArticleViewer(article.title, mobileUrl, articleUrl);
    });

    card.addEventListener('click', () => {
        card.classList.add('revealed');
    });

    return card;
}

// ---- Spread rendering ----

function applySpreadLayout(spread) {
    const cardDisplay = document.getElementById('card-display');
    if (spread.isDefault) {
        cardDisplay.style.gridTemplateColumns = '';
        cardDisplay.style.gridTemplateRows = '';
        cardDisplay.className = `card-display ${spread.layoutClass}`;
    } else {
        const { rows, cols } = computeUserSpreadGrid(spread.positions);
        cardDisplay.className = 'card-display user-spread';
        cardDisplay.style.gridTemplateColumns = `repeat(${cols}, 180px)`;
        cardDisplay.style.gridTemplateRows = `repeat(${rows}, 280px)`;
    }
}

function renderUndrawnSpread(id) {
    const spread = getSpreadById(id);
    if (!spread) return;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    applySpreadLayout(spread);
    spread.positions.forEach((position, index) => {
        cardDisplay.appendChild(createUndrawnCard(position, index));
    });
}

function renderSpread(id, articles, onComplete) {
    const spread = getSpreadById(id);
    if (!spread) return;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = '';
    applySpreadLayout(spread);

    articles.forEach((article, index) => {
        const card = createCard(article, spread.positions[index], index);
        cardDisplay.appendChild(card);
        const isLast = index === articles.length - 1;
        setTimeout(() => {
            card.classList.add('revealed');
            if (isLast && onComplete) {
                setTimeout(onComplete, 800);
            }
        }, 500 + (index * 300));
    });
}

// All cards immediately revealed — used for shared URL restores
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

    document.getElementById('share-btn').classList.remove('hidden');
}

function showError(message) {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.innerHTML = `
        <div class="error-message">
            <p>${message || t.errorMessage}</p>
            <p>${t.tryAgain}</p>
        </div>
    `;
    cardDisplay.className = 'card-display';
}

// ---- Fetch articles ----

async function fetchRandomArticles(count) {
    const domain = LANGUAGES[currentLanguage].domain;
    const articles = [];

    while (articles.length < count) {
        const limit = (count - articles.length) + 5;
        const url = `https://${domain}/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=${limit}&prop=pageprops&ppprop=disambiguation&format=json&origin=*`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch from Wikipedia API');
        const data = await response.json();
        const pages = Object.values(data.query.pages);
        const nonDisambig = pages.filter(page => !page.pageprops || !('disambiguation' in page.pageprops));
        articles.push(...nonDisambig);
    }

    return articles.slice(0, count);
}

// ---- Spread selection ----

function handleSpreadSelection(spreadId) {
    currentSpreadType = spreadId;
    currentArticles = null;
    saveLastSpread(spreadId);

    document.getElementById('share-btn').classList.add('hidden');

    const viewer = document.getElementById('article-viewer');
    if (viewer) {
        viewer.classList.add('hidden');
        const iframe = document.getElementById('article-iframe');
        if (iframe) iframe.src = '';
    }

    document.getElementById('draw-btn').classList.remove('loading', 'drawn');
    renderUndrawnSpread(spreadId);
}

document.getElementById('spread-select').addEventListener('change', (e) => {
    handleSpreadSelection(e.target.value);
});

// ---- Draw ----

async function handleDraw() {
    if (!currentSpreadType) return;
    const spread = getSpreadById(currentSpreadType);
    if (!spread) return;

    const count = spread.count !== undefined ? spread.count : spread.positions.length;
    const drawBtn = document.getElementById('draw-btn');
    const shareBtn = document.getElementById('share-btn');

    drawBtn.classList.add('loading');
    drawBtn.classList.remove('drawn');
    shareBtn.classList.add('hidden');

    try {
        const articles = await fetchRandomArticles(count);
        currentArticles = articles;
        renderSpread(currentSpreadType, articles, () => {
            drawBtn.classList.remove('loading');
            drawBtn.classList.add('drawn');
            shareBtn.classList.remove('hidden');
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
    document.getElementById('language-select').value = currentLanguage;
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
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.add('hidden');
    });
    document.getElementById(`tab-${tabName}`).classList.remove('hidden');

    document.getElementById('settings-footer').classList.toggle('hidden', tabName !== 'settings');
    document.getElementById('spreads-footer').classList.toggle('hidden', tabName !== 'spreads');

    if (tabName === 'spreads') {
        renderSpreadsTab();
    }
}

function saveSettings() {
    const previousLanguage = currentLanguage;
    currentLanguage = document.getElementById('language-select').value;
    saveLanguagePreference();

    if (previousLanguage !== currentLanguage) {
        updateUILanguage();
        // Re-render undrawn spread with updated position names if nothing drawn yet
        if (!currentArticles && currentSpreadType) {
            renderUndrawnSpread(currentSpreadType);
        }
    }

    closeSettingsModal();
}

function resetLanguage() {
    document.getElementById('language-select').value = DEFAULT_LANGUAGE;
}

document.getElementById('settings-btn').addEventListener('click', openSettingsModal);
document.getElementById('modal-close').addEventListener('click', closeSettingsModal);
document.getElementById('save-settings').addEventListener('click', saveSettings);
document.getElementById('reset-language').addEventListener('click', resetLanguage);

document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => switchSettingsTab(tab.dataset.tab));
});

document.getElementById('settings-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('settings-modal')) closeSettingsModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !document.getElementById('settings-modal').classList.contains('hidden')) {
        closeSettingsModal();
    }
    if (e.key === 'Escape' && !document.getElementById('article-viewer').classList.contains('hidden')) {
        closeArticleViewer();
    }
});

// ---- Spreads tab ----

function renderSpreadsTab() {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    const te = TRANSLATIONS.en;
    const spreads = getAllSpreads();
    const html = spreads.map(spread => renderSpreadListItem(spread, t, te)).join('');
    document.getElementById('tab-spreads').innerHTML = `<div class="spread-list">${html}</div>`;
}

function renderSpreadListItem(spread, t, te) {
    const name = escapeHtml(getSpreadDisplayName(spread));
    const editLabel = t.editSpread || te.editSpread;
    const resetLabel = t.resetSpread || te.resetSpread;
    const deleteLabel = t.deleteSpread || te.deleteSpread;

    const actions = spread.isDefault
        ? `<button class="spread-action-btn" data-action="edit" data-spread-id="${spread.id}">${editLabel}</button>
           <button class="spread-action-btn" data-action="reset" data-spread-id="${spread.id}">${resetLabel}</button>`
        : `<button class="spread-action-btn" data-action="edit" data-spread-id="${spread.id}">${editLabel}</button>
           <button class="spread-action-btn spread-action-delete" data-action="delete" data-spread-id="${spread.id}">${deleteLabel}</button>`;

    return `
        <div class="spread-list-item" data-spread-id="${spread.id}">
            <div class="spread-list-header">
                <span class="spread-list-name">${name}</span>
                <div class="spread-list-actions">${actions}</div>
            </div>
            <div class="spread-editor" id="editor-${spread.id}">
                ${renderSpreadEditor(spread, t, te)}
            </div>
        </div>
    `;
}

function renderSpreadEditor(spread, t, te) {
    const posNameLabel = t.positionName || te.positionName;
    const rowLabel = t.row || te.row;
    const colLabel = t.col || te.col;
    const saveLabel = t.save || te.save;
    const addLabel = t.addPosition || te.addPosition;

    if (spread.isDefault) {
        const rows = spread.positions.map((pos, i) => `
            <div class="position-editor-row">
                <label>${posNameLabel} ${i + 1}</label>
                <input type="text" class="pos-name-input" data-pos-index="${i}" value="${escapeHtml(pos.name)}" placeholder="${posNameLabel}">
            </div>
        `).join('');

        return `
            <div class="spread-editor-inner">
                ${rows}
                <button class="btn-save spread-editor-save" data-action="save-editor" data-spread-id="${spread.id}">${saveLabel}</button>
            </div>
        `;
    } else {
        const nameLabel = t.spreadName || te.spreadName;
        const rows = spread.positions.map((pos, i) => `
            <div class="position-editor-row" data-pos-index="${i}">
                <input type="text" class="pos-name-input" data-pos-index="${i}" value="${escapeHtml(pos.name)}" placeholder="${posNameLabel}">
                <input type="number" class="pos-row-input" data-pos-index="${i}" value="${pos.row || 1}" min="1" placeholder="${rowLabel}">
                <input type="number" class="pos-col-input" data-pos-index="${i}" value="${pos.col || 1}" min="1" placeholder="${colLabel}">
                <button class="spread-action-btn spread-action-delete" data-action="remove-position" data-spread-id="${spread.id}" data-pos-index="${i}">×</button>
            </div>
        `).join('');

        return `
            <div class="spread-editor-inner">
                <div class="position-editor-row">
                    <label>${nameLabel}</label>
                    <input type="text" class="spread-name-input" value="${escapeHtml(spread.name)}">
                </div>
                <div class="position-editor-labels">
                    <span></span><span>${posNameLabel}</span><span>${rowLabel}</span><span>${colLabel}</span><span></span>
                </div>
                ${rows}
                <button class="spread-action-btn" data-action="add-position" data-spread-id="${spread.id}">${addLabel}</button>
                <button class="btn-save spread-editor-save" data-action="save-editor" data-spread-id="${spread.id}">${saveLabel}</button>
            </div>
        `;
    }
}

// Event delegation for spreads tab — set up once
document.getElementById('tab-spreads').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const spreadId = btn.dataset.spreadId;
    const posIndex = btn.dataset.posIndex !== undefined ? parseInt(btn.dataset.posIndex) : null;
    handleSpreadsTabAction(action, spreadId, posIndex);
});

function handleSpreadsTabAction(action, spreadId, posIndex) {
    if (action === 'edit') {
        const editor = document.getElementById(`editor-${spreadId}`);
        if (editor) editor.classList.toggle('open');

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
            const te = TRANSLATIONS.en;
            const t = TRANSLATIONS[currentLanguage] || te;
            const posLabel = t.positionName || te.positionName;
            spread.positions.push({
                name: `${posLabel} ${spread.positions.length + 1}`,
                row: 1,
                col: spread.positions.length + 1
            });
            saveUserSpreads();
            renderSpreadsTab();
            const editor = document.getElementById(`editor-${spreadId}`);
            if (editor) editor.classList.add('open');
        }

    } else if (action === 'remove-position') {
        const spread = userSpreads.find(s => s.id === spreadId);
        if (spread && posIndex !== null && posIndex >= 0 && spread.positions.length > 1) {
            spread.positions.splice(posIndex, 1);
            saveUserSpreads();
            renderSpreadsTab();
            const editor = document.getElementById(`editor-${spreadId}`);
            if (editor) editor.classList.add('open');
        }
    }
}

function saveSpreadEditor(spreadId) {
    const spread = getSpreadById(spreadId);
    if (!spread) return;
    const editorEl = document.getElementById(`editor-${spreadId}`);
    if (!editorEl) return;

    if (spread.isDefault) {
        const nameInputs = editorEl.querySelectorAll('.pos-name-input');
        nameInputs.forEach((input, i) => {
            if (spread.positions[i]) {
                const val = input.value.trim();
                if (val) spread.positions[i].name = val;
            }
        });
        saveCustomPositions();
    } else {
        const nameInput = editorEl.querySelector('.spread-name-input');
        if (nameInput && nameInput.value.trim()) spread.name = nameInput.value.trim();

        const rows = editorEl.querySelectorAll('.position-editor-row[data-pos-index]');
        rows.forEach((row) => {
            const idx = parseInt(row.dataset.posIndex);
            if (!isNaN(idx) && spread.positions[idx]) {
                const ni = row.querySelector('.pos-name-input');
                const ri = row.querySelector('.pos-row-input');
                const ci = row.querySelector('.pos-col-input');
                if (ni && ni.value.trim()) spread.positions[idx].name = ni.value.trim();
                if (ri) spread.positions[idx].row = parseInt(ri.value) || 1;
                if (ci) spread.positions[idx].col = parseInt(ci.value) || 1;
            }
        });
        saveUserSpreads();
        rebuildSpreadDropdown();
    }

    // Update live card labels if this spread is active
    if (currentSpreadType === spreadId) {
        const cardDisplay = document.getElementById('card-display');
        const cards = cardDisplay.querySelectorAll('.tarot-card');
        cards.forEach((card, index) => {
            const pos = spread.positions[index];
            if (pos) {
                const backPos = card.querySelector('.card-back-position');
                const frontPos = card.querySelector('.card-position');
                if (backPos) backPos.textContent = pos.name;
                if (frontPos) frontPos.textContent = pos.name;
            }
        });
    }

    const editor = document.getElementById(`editor-${spreadId}`);
    if (editor) editor.classList.remove('open');
    renderSpreadsTab();
}

function resetDefaultSpreadPositions(spreadId) {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    if (spreadId === 'one') {
        SPREADS.one.positions = [{ name: t.defaultPositions.one }];
    } else if (spreadId === 'three') {
        SPREADS.three.positions = t.defaultPositions.three.map(name => ({ name }));
    } else if (spreadId === 'celtic') {
        SPREADS.celtic.positions = t.defaultPositions.celtic.map(name => ({ name }));
    }
    saveCustomPositions();

    if (currentSpreadType === spreadId) {
        const spread = SPREADS[spreadId];
        const cardDisplay = document.getElementById('card-display');
        const cards = cardDisplay.querySelectorAll('.tarot-card');
        cards.forEach((card, index) => {
            const pos = spread.positions[index];
            if (pos) {
                const backPos = card.querySelector('.card-back-position');
                const frontPos = card.querySelector('.card-position');
                if (backPos) backPos.textContent = pos.name;
                if (frontPos) frontPos.textContent = pos.name;
            }
        });
    }
    renderSpreadsTab();
}

function createUserSpread() {
    const id = `usr_${Date.now()}`;
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    const te = TRANSLATIONS.en;
    const posLabel = t.positionName || te.positionName;

    const newSpread = {
        id,
        name: `My Spread ${userSpreads.length + 1}`,
        isDefault: false,
        positions: [
            { name: `${posLabel} 1`, row: 1, col: 1 },
            { name: `${posLabel} 2`, row: 1, col: 2 },
            { name: `${posLabel} 3`, row: 1, col: 3 }
        ]
    };
    userSpreads.push(newSpread);
    saveUserSpreads();
    rebuildSpreadDropdown();
    renderSpreadsTab();
    const editor = document.getElementById(`editor-${id}`);
    if (editor) editor.classList.add('open');
}

document.getElementById('new-spread-btn').addEventListener('click', createUserSpread);

// ---- URL Sharing ----

function showToast(message) {
    const toast = document.getElementById('copy-toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
}

function handleShare() {
    if (!currentArticles || !currentSpreadType) return;
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    const te = TRANSLATIONS.en;

    const articleTitles = currentArticles.map(a => a.title).join('|');
    const params = new URLSearchParams({
        spread: currentSpreadType,
        lang: currentLanguage,
        articles: articleTitles
    });

    const spread = getSpreadById(currentSpreadType);
    if (spread && !spread.isDefault) {
        const spreadData = btoa(unescape(encodeURIComponent(JSON.stringify({ name: spread.name, positions: spread.positions }))));
        params.set('spreadData', spreadData);
    }

    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
            showToast(t.linkCopied || te.linkCopied);
        }).catch(() => {
            prompt('Copy this link:', url);
        });
    } else {
        prompt('Copy this link:', url);
    }
}

document.getElementById('share-btn').addEventListener('click', handleShare);

function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const spreadId = params.get('spread');
    const lang = params.get('lang');
    const articlesParam = params.get('articles');
    const spreadDataParam = params.get('spreadData');

    if (!spreadId || !articlesParam) return;

    if (lang && LANGUAGES[lang]) {
        currentLanguage = lang;
        saveLanguagePreference();
        updateUILanguage();
    }

    if (spreadDataParam) {
        try {
            const spreadData = JSON.parse(decodeURIComponent(escape(atob(spreadDataParam))));
            const existing = getSpreadById(spreadId);
            if (!existing) {
                userSpreads.push({
                    id: spreadId,
                    name: spreadData.name,
                    isDefault: false,
                    positions: spreadData.positions
                });
                saveUserSpreads();
                rebuildSpreadDropdown();
            }
        } catch (e) {
            console.error('Failed to parse spreadData:', e);
        }
    }

    const spread = getSpreadById(spreadId);
    if (!spread) return;

    const count = spread.count !== undefined ? spread.count : spread.positions.length;
    const articles = articlesParam.split('|').map(title => ({ title }));
    if (articles.length !== count) return;

    currentSpreadType = spreadId;
    currentArticles = articles;
    const select = document.getElementById('spread-select');
    if (select) select.value = spreadId;
    saveLastSpread(spreadId);

    renderSpreadRevealed(spreadId, articles);

    const drawBtn = document.getElementById('draw-btn');
    drawBtn.classList.remove('loading', 'hidden');
    drawBtn.classList.add('drawn');

    history.replaceState(null, '', window.location.pathname);
}

// ---- Article viewer ----

function openArticleViewer(title, iframeUrl, externalUrl) {
    document.getElementById('article-title').textContent = title;
    document.getElementById('article-external').href = externalUrl;
    document.getElementById('article-iframe').src = iframeUrl;
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
loadLanguagePreference();
loadUserSpreads();
migrateAndLoadPositions();
updateUILanguage();
rebuildSpreadDropdown();
loadLastSpread();
checkURLParams();
