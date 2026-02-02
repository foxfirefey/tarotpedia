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
        oneCardSection: 'One Card',
        threeCardSection: 'Three Card',
        position: 'Position:',
        position1: 'Position 1:',
        position2: 'Position 2:',
        position3: 'Position 3:',
        resetDefaults: 'Reset to Defaults',
        save: 'Save',
        drawingArticles: 'Drawing articles...',
        readArticle: 'Read Article',
        openInNewTab: 'Open in new tab',
        close: 'Close',
        footer: "Because 78 cards wasn't enough.",
        settingsTooltip: 'Change position names and languages',
        errorMessage: 'The spirits of Wikipedia are currently unavailable.',
        tryAgain: 'Please try again.',
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
        oneCardSection: 'One Card',
        threeCardSection: 'Three Card',
        position: 'Position:',
        position1: 'Position 1:',
        position2: 'Position 2:',
        position3: 'Position 3:',
        resetDefaults: 'Reset to Defaults',
        save: 'Save',
        drawingArticles: 'Getting articles...',
        readArticle: 'Read Article',
        openInNewTab: 'Open in new tab',
        close: 'Close',
        footer: "Because 78 cards wasn't enough.",
        settingsTooltip: 'Change position names and languages',
        errorMessage: 'Wikipedia is not working right now.',
        tryAgain: 'Please try again.',
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
        oneCardSection: 'Una Carta',
        threeCardSection: 'Tres Cartas',
        position: 'Posición:',
        position1: 'Posición 1:',
        position2: 'Posición 2:',
        position3: 'Posición 3:',
        resetDefaults: 'Restablecer Predeterminados',
        save: 'Guardar',
        drawingArticles: 'Sacando artículos...',
        readArticle: 'Leer Artículo',
        openInNewTab: 'Abrir en nueva pestaña',
        close: 'Cerrar',
        footer: 'Porque 78 cartas no eran suficientes.',
        settingsTooltip: 'Cambiar nombres de posiciones e idiomas',
        errorMessage: 'Los espíritus de Wikipedia no están disponibles.',
        tryAgain: 'Por favor, inténtalo de nuevo.',
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
        oneCardSection: 'Eine Karte',
        threeCardSection: 'Drei Karten',
        position: 'Position:',
        position1: 'Position 1:',
        position2: 'Position 2:',
        position3: 'Position 3:',
        resetDefaults: 'Auf Standard zurücksetzen',
        save: 'Speichern',
        drawingArticles: 'Artikel werden gezogen...',
        readArticle: 'Artikel lesen',
        openInNewTab: 'In neuem Tab öffnen',
        close: 'Schließen',
        footer: 'Weil 78 Karten nicht genug waren.',
        settingsTooltip: 'Positionsnamen und Sprachen ändern',
        errorMessage: 'Die Geister von Wikipedia sind derzeit nicht verfügbar.',
        tryAgain: 'Bitte versuche es erneut.',
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
        oneCardSection: 'Une Carte',
        threeCardSection: 'Trois Cartes',
        position: 'Position:',
        position1: 'Position 1:',
        position2: 'Position 2:',
        position3: 'Position 3:',
        resetDefaults: 'Réinitialiser par défaut',
        save: 'Enregistrer',
        drawingArticles: 'Tirage des articles...',
        readArticle: 'Lire l\'Article',
        openInNewTab: 'Ouvrir dans un nouvel onglet',
        close: 'Fermer',
        footer: "Parce que 78 cartes n'étaient pas suffisantes.",
        settingsTooltip: 'Changer les noms de positions et les langues',
        errorMessage: 'Les esprits de Wikipédia sont actuellement indisponibles.',
        tryAgain: 'Veuillez réessayer.',
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
        oneCardSection: '1枚のカード',
        threeCardSection: '3枚のカード',
        position: 'ポジション:',
        position1: 'ポジション1:',
        position2: 'ポジション2:',
        position3: 'ポジション3:',
        resetDefaults: 'デフォルトにリセット',
        save: '保存',
        drawingArticles: '記事を引いています...',
        readArticle: '記事を読む',
        openInNewTab: '新しいタブで開く',
        close: '閉じる',
        footer: '78枚のカードでは足りなかったから。',
        settingsTooltip: 'ポジション名と言語を変更',
        errorMessage: 'Wikipediaの精霊は現在利用できません。',
        tryAgain: 'もう一度お試しください。',
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
        oneCardSection: 'Uma Carta',
        threeCardSection: 'Três Cartas',
        position: 'Posição:',
        position1: 'Posição 1:',
        position2: 'Posição 2:',
        position3: 'Posição 3:',
        resetDefaults: 'Redefinir para Padrões',
        save: 'Salvar',
        drawingArticles: 'Puxando artigos...',
        readArticle: 'Ler Artigo',
        openInNewTab: 'Abrir em nova aba',
        close: 'Fechar',
        footer: 'Porque 78 cartas não eram suficientes.',
        settingsTooltip: 'Alterar nomes de posições e idiomas',
        errorMessage: 'Os espíritos da Wikipédia estão atualmente indisponíveis.',
        tryAgain: 'Por favor, tente novamente.',
        defaultPositions: {
            one: 'A Resposta',
            three: ['Passado', 'Presente', 'Futuro'],
            celtic: ['Situação Atual', 'O Desafio', 'Coroa (Consciente)', 'Fundação (Inconsciente)', 'Passado', 'Futuro', 'Eu', 'Ambiente', 'Esperanças e Medos', 'Resultado']
        }
    }
};

// Default spread configurations (will be updated based on language)
const DEFAULT_POSITIONS = {
    one: [TRANSLATIONS.en.defaultPositions.one],
    three: TRANSLATIONS.en.defaultPositions.three
};

const SPREADS = {
    one: {
        count: 1,
        positions: ['The Answer'],
        layoutClass: 'one-card'
    },
    three: {
        count: 3,
        positions: ['Past', 'Present', 'Future'],
        layoutClass: 'three-card'
    },
    celtic: {
        count: 10,
        positions: [
            'Present Situation',
            'The Challenge',
            'Crown (Conscious)',
            'Foundation (Unconscious)',
            'Past',
            'Future',
            'Self',
            'Environment',
            'Hopes & Fears',
            'Outcome'
        ],
        layoutClass: 'celtic-cross'
    }
};

// Load language preference from localStorage
function loadLanguagePreference() {
    const saved = localStorage.getItem('wikitarot-language');
    if (saved && LANGUAGES[saved]) {
        currentLanguage = saved;
    }
}

// Save language preference to localStorage
function saveLanguagePreference() {
    localStorage.setItem('wikitarot-language', currentLanguage);
}

// Update UI text based on current language
function updateUILanguage() {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'simple' ? 'en' : currentLanguage;
    
    // Update header
    document.querySelector('.tagline').textContent = t.tagline;
    
    // Update spread buttons
    document.querySelector('[data-spread="one"]').textContent = t.oneCard;
    document.querySelector('[data-spread="three"]').textContent = t.threeCard;
    document.querySelector('[data-spread="celtic"]').textContent = t.celticCross;
    
    // Update draw button
    document.getElementById('draw-btn').textContent = t.draw;
    
    // Update settings modal
    document.querySelector('.modal-header h2').textContent = t.settingsTitle;
    document.querySelector('.settings-section h3').textContent = t.wikiLanguage;
    document.querySelectorAll('.settings-section h3')[1].textContent = t.oneCardSection;
    document.querySelectorAll('.settings-section h3')[2].textContent = t.threeCardSection;
    
    // Update labels
    document.querySelector('label[for="language-select"]').textContent = t.articleLanguage;
    document.querySelector('label[for="one-0"]').textContent = t.position;
    document.querySelector('label[for="three-0"]').textContent = t.position1;
    document.querySelector('label[for="three-1"]').textContent = t.position2;
    document.querySelector('label[for="three-2"]').textContent = t.position3;
    
    // Update buttons
    document.getElementById('reset-defaults').textContent = t.resetDefaults;
    document.getElementById('save-settings').textContent = t.save;
    
    // Update loading text
    document.querySelector('.loading p').textContent = t.drawingArticles;
    
    // Update tooltips
    document.getElementById('settings-btn').title = t.settingsTooltip;
    document.getElementById('article-external').title = t.openInNewTab;
    document.getElementById('article-close').title = t.close;
    
    // Update footer
    document.querySelector('footer p').textContent = t.footer;
    
    // Update default positions for reference
    DEFAULT_POSITIONS.one = [t.defaultPositions.one];
    DEFAULT_POSITIONS.three = t.defaultPositions.three;
    
    // Always update Celtic Cross positions (not customizable)
    SPREADS.celtic.positions = t.defaultPositions.celtic;
    
    // Only update one/three card positions if no custom positions are saved
    const savedPositions = localStorage.getItem('wikitarot-positions');
    if (!savedPositions) {
        SPREADS.one.positions = [t.defaultPositions.one];
        SPREADS.three.positions = t.defaultPositions.three;
    }
}

// Load custom positions from localStorage
function loadCustomPositions() {
    const saved = localStorage.getItem('wikitarot-positions');
    if (saved) {
        const custom = JSON.parse(saved);
        if (custom.one) SPREADS.one.positions = custom.one;
        if (custom.three) SPREADS.three.positions = custom.three;
    }
}

// Save custom positions to localStorage
function saveCustomPositions() {
    const custom = {
        one: SPREADS.one.positions,
        three: SPREADS.three.positions
    };
    localStorage.setItem('wikitarot-positions', JSON.stringify(custom));
}

// Initialize custom positions and language on load
loadLanguagePreference();
loadCustomPositions();
updateUILanguage();

// DOM Elements
const cardDisplay = document.getElementById('card-display');
const loading = document.getElementById('loading');
const spreadButtons = document.querySelectorAll('.spread-btn');
const drawBtn = document.getElementById('draw-btn');

// Current state
let currentSpreadType = null;

// Fetch random Wikipedia articles
async function fetchRandomArticles(count) {
    const domain = LANGUAGES[currentLanguage].domain;
    const url = `https://${domain}/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=${count}&format=json&origin=*`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch from Wikipedia API');
    }

    const data = await response.json();
    return data.query.random;
}

// Create an undrawn card (face down with position label)
function createUndrawnCard(position, index) {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.position = index + 1;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${position}</div>
                <div class="card-back-design">
                    <span class="card-back-symbol">?</span>
                </div>
            </div>
            <div class="card-front">
                <div class="card-position">${position}</div>
                <div class="card-title"></div>
                <a href="#" class="card-link">Read Article</a>
            </div>
        </div>
    `;

    return card;
}

// Create a single card element with article data
function createCard(article, position, index, spreadType) {
    const card = document.createElement('div');
    card.className = 'tarot-card';
    card.dataset.position = index + 1;

    const domain = LANGUAGES[currentLanguage].domain;
    const mobileDomain = domain.replace('wikipedia.org', 'm.wikipedia.org');
    const articleUrl = `https://${domain}/wiki/${encodeURIComponent(article.title)}`;
    const mobileUrl = `https://${mobileDomain}/wiki/${encodeURIComponent(article.title)}`;
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <div class="card-back-position">${position}</div>
                <div class="card-back-design">
                    <span class="card-back-symbol">?</span>
                </div>
            </div>
            <div class="card-front">
                <div class="card-position">${position}</div>
                <div class="card-title">${article.title}</div>
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="card-link">${t.readArticle}</a>
            </div>
        </div>
    `;

    // Load article in iframe when clicking the link
    const link = card.querySelector('.card-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArticleViewer(article.title, mobileUrl, articleUrl);
    });

    // Reveal card on click
    card.addEventListener('click', () => {
        card.classList.add('revealed');
    });

    return card;
}

// Render undrawn spread (face-down cards with position labels)
function renderUndrawnSpread(type) {
    const spread = SPREADS[type];

    // Clear previous cards
    cardDisplay.innerHTML = '';
    cardDisplay.className = `card-display ${spread.layoutClass}`;

    // Create and append undrawn cards
    spread.positions.forEach((position, index) => {
        const card = createUndrawnCard(position, index);
        cardDisplay.appendChild(card);
    });
}

// Render the spread with articles
function renderSpread(type, articles) {
    const spread = SPREADS[type];

    // Clear previous cards
    cardDisplay.innerHTML = '';
    cardDisplay.className = `card-display ${spread.layoutClass}`;

    // Create and append cards with staggered reveal
    articles.forEach((article, index) => {
        const card = createCard(article, spread.positions[index], index, type);
        cardDisplay.appendChild(card);

        // Auto-reveal cards with staggered timing
        setTimeout(() => {
            card.classList.add('revealed');
        }, 500 + (index * 300));
    });
}

// Show error message
function showError(message) {
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
    cardDisplay.innerHTML = `
        <div class="error-message">
            <p>${message || t.errorMessage}</p>
            <p>${t.tryAgain}</p>
        </div>
    `;
    cardDisplay.className = 'card-display';
    drawBtn.classList.add('hidden');
}

// Handle spread selection (show undrawn cards)
function handleSpreadSelection(spreadType) {
    currentSpreadType = spreadType;

    // Update button states
    spreadButtons.forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.spread === spreadType);
    });

    // Hide article viewer when selecting new spread
    const viewer = document.getElementById('article-viewer');
    if (viewer) {
        viewer.classList.add('hidden');
        const iframe = document.getElementById('article-iframe');
        if (iframe) iframe.src = '';
    }

    // Show undrawn cards and draw button
    renderUndrawnSpread(spreadType);
    drawBtn.classList.remove('hidden');
}

// Handle draw button click
async function handleDraw() {
    if (!currentSpreadType) return;

    const spread = SPREADS[currentSpreadType];

    // Hide draw button and show loading
    drawBtn.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        const articles = await fetchRandomArticles(spread.count);
        loading.classList.add('hidden');
        renderSpread(currentSpreadType, articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        loading.classList.add('hidden');
        showError();
    }
}

// Event listeners
spreadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const spreadType = button.dataset.spread;
        handleSpreadSelection(spreadType);
    });
});

drawBtn.addEventListener('click', handleDraw);

// Settings modal
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const modalClose = document.getElementById('modal-close');
const resetDefaultsBtn = document.getElementById('reset-defaults');
const saveSettingsBtn = document.getElementById('save-settings');

function openSettingsModal() {
    // Populate inputs with current values
    document.getElementById('one-0').value = SPREADS.one.positions[0];
    document.getElementById('three-0').value = SPREADS.three.positions[0];
    document.getElementById('three-1').value = SPREADS.three.positions[1];
    document.getElementById('three-2').value = SPREADS.three.positions[2];
    document.getElementById('language-select').value = currentLanguage;

    settingsModal.classList.remove('hidden');
}

function closeSettingsModal() {
    settingsModal.classList.add('hidden');
}

function saveSettings() {
    const previousLanguage = currentLanguage;
    
    SPREADS.one.positions[0] = document.getElementById('one-0').value.trim() || DEFAULT_POSITIONS.one[0];
    SPREADS.three.positions[0] = document.getElementById('three-0').value.trim() || DEFAULT_POSITIONS.three[0];
    SPREADS.three.positions[1] = document.getElementById('three-1').value.trim() || DEFAULT_POSITIONS.three[1];
    SPREADS.three.positions[2] = document.getElementById('three-2').value.trim() || DEFAULT_POSITIONS.three[2];

    currentLanguage = document.getElementById('language-select').value;

    saveCustomPositions();
    saveLanguagePreference();
    
    // Update UI language if language changed
    if (previousLanguage !== currentLanguage) {
        updateUILanguage();
    }

    // Update visible position labels if a spread is displayed
    if (currentSpreadType === 'one' || currentSpreadType === 'three') {
        const positions = SPREADS[currentSpreadType].positions;
        const cards = cardDisplay.querySelectorAll('.tarot-card');
        cards.forEach((card, index) => {
            const backPosition = card.querySelector('.card-back-position');
            const frontPosition = card.querySelector('.card-position');
            if (backPosition) backPosition.textContent = positions[index];
            if (frontPosition) frontPosition.textContent = positions[index];
        });
    }

    closeSettingsModal();
}

function resetToDefaults() {
    document.getElementById('one-0').value = DEFAULT_POSITIONS.one[0];
    document.getElementById('three-0').value = DEFAULT_POSITIONS.three[0];
    document.getElementById('three-1').value = DEFAULT_POSITIONS.three[1];
    document.getElementById('three-2').value = DEFAULT_POSITIONS.three[2];
    document.getElementById('language-select').value = DEFAULT_LANGUAGE;
}

settingsBtn.addEventListener('click', openSettingsModal);
modalClose.addEventListener('click', closeSettingsModal);
saveSettingsBtn.addEventListener('click', saveSettings);
resetDefaultsBtn.addEventListener('click', resetToDefaults);

// Close modal on backdrop click
settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) {
        closeSettingsModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !settingsModal.classList.contains('hidden')) {
        closeSettingsModal();
    }
    if (e.key === 'Escape' && !articleViewer.classList.contains('hidden')) {
        closeArticleViewer();
    }
});

// Article viewer
const articleViewer = document.getElementById('article-viewer');
const articleTitle = document.getElementById('article-title');
const articleIframe = document.getElementById('article-iframe');
const articleExternal = document.getElementById('article-external');
const articleClose = document.getElementById('article-close');

function openArticleViewer(title, iframeUrl, externalUrl) {
    articleTitle.textContent = title;
    articleExternal.href = externalUrl;
    articleIframe.src = iframeUrl;
    articleViewer.classList.remove('hidden');
    articleViewer.scrollIntoView({ behavior: 'smooth' });
}

function closeArticleViewer() {
    articleViewer.classList.add('hidden');
    articleIframe.src = '';
}

articleClose.addEventListener('click', closeArticleViewer);
