// Default spread configurations
const DEFAULT_POSITIONS = {
    one: ['The Answer'],
    three: ['Past', 'Present', 'Future']
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

// Initialize custom positions on load
loadCustomPositions();

// DOM Elements
const cardDisplay = document.getElementById('card-display');
const loading = document.getElementById('loading');
const spreadButtons = document.querySelectorAll('.spread-btn');
const drawBtn = document.getElementById('draw-btn');

// Current state
let currentSpreadType = null;

// Fetch random Wikipedia articles
async function fetchRandomArticles(count) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&rnlimit=${count}&format=json&origin=*`;

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

    const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`;

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
                <a href="${articleUrl}" target="_blank" rel="noopener noreferrer" class="card-link">Read Article</a>
            </div>
        </div>
    `;

    // Load article in iframe when clicking the link
    const link = card.querySelector('.card-link');
    link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openArticleViewer(article.title, articleUrl);
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
    cardDisplay.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <p>Please try again.</p>
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
        showError('The spirits of Wikipedia are currently unavailable.');
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

    settingsModal.classList.remove('hidden');
}

function closeSettingsModal() {
    settingsModal.classList.add('hidden');
}

function saveSettings() {
    SPREADS.one.positions[0] = document.getElementById('one-0').value.trim() || DEFAULT_POSITIONS.one[0];
    SPREADS.three.positions[0] = document.getElementById('three-0').value.trim() || DEFAULT_POSITIONS.three[0];
    SPREADS.three.positions[1] = document.getElementById('three-1').value.trim() || DEFAULT_POSITIONS.three[1];
    SPREADS.three.positions[2] = document.getElementById('three-2').value.trim() || DEFAULT_POSITIONS.three[2];

    saveCustomPositions();
    closeSettingsModal();
}

function resetToDefaults() {
    document.getElementById('one-0').value = DEFAULT_POSITIONS.one[0];
    document.getElementById('three-0').value = DEFAULT_POSITIONS.three[0];
    document.getElementById('three-1').value = DEFAULT_POSITIONS.three[1];
    document.getElementById('three-2').value = DEFAULT_POSITIONS.three[2];
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

function openArticleViewer(title, url) {
    articleTitle.textContent = title;
    articleExternal.href = url;
    articleIframe.src = url;
    articleViewer.classList.remove('hidden');
    articleViewer.scrollIntoView({ behavior: 'smooth' });
}

function closeArticleViewer() {
    articleViewer.classList.add('hidden');
    articleIframe.src = '';
}

articleClose.addEventListener('click', closeArticleViewer);
