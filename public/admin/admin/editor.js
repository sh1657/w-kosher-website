// בדיקת הרשאות גישה
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('wk_admin_logged_in');
    const loginTime = parseInt(sessionStorage.getItem('wk_login_time'));
    const currentTime = Date.now();
    const hourInMs = 3600000;

    if (isLoggedIn !== 'true' || currentTime - loginTime > hourInMs) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

if (!checkAuth()) {
    throw new Error('Unauthorized');
}

// משתנים גלובליים
let contentData = {
    he: {},
    pt: {},
    en: {}
};

let currentLang = 'he';
let currentPage = 'homepage';

const PAGES = {
    homepage: 'דף הבית',
    certification: 'תעודת כשרות',
    companies: 'חברות',
    about: 'אודות',
    contact: 'צור קשר',
    request: 'בקש תעודה',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש'
};

// טעינת תוכן
async function loadContent(lang, page) {
    try {
        const response = await fetch(`data/content-${lang}-${page}.json`);
        if (!response.ok) {
            const fallbackResponse = await fetch(`data/content-${lang}.json`);
            if (!fallbackResponse.ok) throw new Error('Failed to load content');
            const data = await fallbackResponse.json();
            if (!contentData[lang]) contentData[lang] = {};
            contentData[lang][page] = data;
            return data;
        }
        const data = await response.json();
        if (!contentData[lang]) contentData[lang] = {};
        contentData[lang][page] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${lang}/${page}:`, error);
        if (!contentData[lang]) contentData[lang] = {};
        if (!contentData[lang][page]) {
            contentData[lang][page] = { message: `תוכן ${PAGES[page]} בתהליך הכנה` };
        }
        return contentData[lang][page];
    }
}

// שמירת תוכן
function saveContent(lang, page, data) {
    try {
        const key = `wk_content_${lang}_${page}`;
        localStorage.setItem(key, JSON.stringify(data));
        if (!contentData[lang]) contentData[lang] = {};
        contentData[lang][page] = data;
        return true;
    } catch (error) {
        console.error('Error saving:', error);
        return false;
    }
}

// קבלת ערך מקונן
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

// עדכון ערך מקונן
function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!current[key]) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
}

// תרגום שמות שדות
function translateFieldName(key) {
    const translations = {
        title: 'כותרת', subtitle: 'תת-כותרת', description: 'תיאור',
        badge: 'תג', location: 'מיקום', home: 'דף הבית',
        certification: 'תעודת כשרות', companies: 'חברות', about: 'אודות',
        contact: 'צור קשר', requestCertification: 'בקש תעודה',
        primary: 'כפתור ראשי', secondary: 'כפתור משני',
        name: 'שם', role: 'תפקיד', position: 'עמדה',
        experience: 'ניסיון', expertise: 'תחומי התמחות',
        whatsapp: 'WhatsApp', email: 'אימייל', website: 'אתר',
        text: 'טקסט', privacy: 'פרטיות', terms: 'תנאים', viewAll: 'צפה בהכל'
    };
    return translations[key] || key;
}

// אייקונים
function getIconForSection(key) {
    const icons = {
        navigation: '🏠', hero: '🎯', companies: '🏢', whyChooseUs: '⭐',
        team: '👥', rabbis: '✡️', certifications: '🏆', cta: '📞',
        footer: '📄', stats: '📊', buttons: '🔘', about: 'ℹ️',
        consumerResources: '👥', industryResources: '🏭', contact: '📧',
        copyright: '©️', features: '✨', members: '👤', list: '📋'
    };
    return icons[key] || '📝';
}

// יצירת שדה בודד
function createField(key, value, path, container) {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.className = 'form-label';
    label.textContent = translateFieldName(key);
    formGroup.appendChild(label);
    
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-input';
        input.value = value.join(', ');
        input.placeholder = 'הפרד בפסיקים';
        input.dataset.path = path;
        input.dataset.isArray = 'true';
        formGroup.appendChild(input);
    } else if (typeof value === 'string') {
        if (value.length > 80) {
            const textarea = document.createElement('textarea');
            textarea.className = 'form-textarea';
            textarea.value = value;
            textarea.dataset.path = path;
            formGroup.appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-input';
            input.value = value;
            input.dataset.path = path;
            formGroup.appendChild(input);
        }
    }
    
    container.appendChild(formGroup);
}

// יצירת עורך דינמי
function createDynamicEditor(data, container, basePath = '') {
    Object.keys(data).forEach(key => {
        if (key === 'language' || key === 'languageName' || key === 'direction') return;
        
        const value = data[key];
        const currentPath = basePath ? `${basePath}.${key}` : key;
        
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            const section = document.createElement('div');
            section.className = 'section';
            
            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = getIconForSection(key) + ' ' + translateFieldName(key);
            section.appendChild(sectionTitle);
            
            const sectionContent = document.createElement('div');
            createDynamicEditor(value, sectionContent, currentPath);
            section.appendChild(sectionContent);
            container.appendChild(section);
        } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
            const section = document.createElement('div');
            section.className = 'section';
            
            const sectionTitle = document.createElement('h2');
            sectionTitle.className = 'section-title';
            sectionTitle.textContent = translateFieldName(key) + ` (${value.length} פריטים)`;
            section.appendChild(sectionTitle);
            
            value.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'feature-item';
                
                const itemHeader = document.createElement('div');
                itemHeader.className = 'item-header';
                itemHeader.textContent = `פריט ${index + 1}`;
                itemDiv.appendChild(itemHeader);
                
                createDynamicEditor(item, itemDiv, `${currentPath}[${index}]`);
                section.appendChild(itemDiv);
            });
            
            container.appendChild(section);
        } else {
            createField(key, value, currentPath, container);
        }
    });
}

// מילוי עורך
function populateEditor(lang, page) {
    const data = contentData[lang]?.[page];
    if (!data) return;
    
    const panel = document.querySelector(`#editor-${lang}`);
    if (!panel) return;
    
    panel.innerHTML = '';
    createDynamicEditor(data, panel);
}

// איסוף נתונים
function collectFormData(lang, page) {
    const originalData = contentData[lang]?.[page];
    if (!originalData) return {};
    
    const data = JSON.parse(JSON.stringify(originalData));
    const panel = document.querySelector(`#editor-${lang}`);
    
    panel.querySelectorAll('[data-path]').forEach(field => {
        const path = field.dataset.path;
        let value = field.value;
        
        if (field.dataset.isArray === 'true') {
            value = value.split(',').map(item => item.trim()).filter(item => item);
        }
        
        setNestedValue(data, path, value);
    });
    
    return data;
}

// שמירה
async function saveChanges() {
    const data = collectFormData(currentLang, currentPage);
    
    if (saveContent(currentLang, currentPage, data)) {
        const successMsg = document.getElementById('successMessage');
        successMsg.classList.add('show');
        setTimeout(() => successMsg.classList.remove('show'), 3000);
        downloadJSON(currentLang, currentPage, data);
    } else {
        alert('שגיאה בשמירה');
    }
}

// הורדת JSON
function downloadJSON(lang, page, data) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `content-${lang}-${page}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// החלפת שפה
function switchLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    document.querySelectorAll('.editor-panel').forEach(panel => {
        panel.classList.toggle('active', panel.dataset.lang === lang);
    });
    
    const indicators = { he: '🇮🇱 עברית', pt: '🇵🇹 Português', en: '🇬🇧 English' };
    document.getElementById('currentLangIndicator').textContent = indicators[lang];
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    
    if (!contentData[lang]?.[currentPage]) {
        loadContent(lang, currentPage).then(() => populateEditor(lang, currentPage));
    } else {
        populateEditor(lang, currentPage);
    }
}

// החלפת דף
function switchPage(page) {
    currentPage = page;
    
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    
    if (!contentData[currentLang]?.[page]) {
        loadContent(currentLang, page).then(() => populateEditor(currentLang, page));
    } else {
        populateEditor(currentLang, page);
    }
}

// יציאה
function logout() {
    if (confirm('האם אתה בטוח שברצונך לצאת?')) {
        sessionStorage.removeItem('wk_admin_logged_in');
        sessionStorage.removeItem('wk_login_time');
        window.location.href = 'login.html';
    }
}

// אתחול
async function init() {
    await Promise.all([
        loadContent('he', 'homepage'),
        loadContent('pt', 'homepage'),
        loadContent('en', 'homepage')
    ]);
    
    populateEditor('he', 'homepage');
    
    document.getElementById('saveBtn').addEventListener('click', saveChanges);
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
    });
    
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => switchPage(btn.dataset.page));
    });
    
    setInterval(() => {
        const data = collectFormData(currentLang, currentPage);
        const key = `wk_content_${currentLang}_${currentPage}_autosave`;
        localStorage.setItem(key, JSON.stringify(data));
        console.log('Auto-saved:', currentLang, currentPage);
    }, 300000);
}

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('beforeunload', (e) => {
    const data = collectFormData(currentLang, currentPage);
    const originalData = contentData[currentLang]?.[currentPage];
    
    if (originalData && JSON.stringify(data) !== JSON.stringify(originalData)) {
        e.preventDefault();
        e.returnValue = 'יש לך שינויים לא שמורים';
        return e.returnValue;
    }
});
