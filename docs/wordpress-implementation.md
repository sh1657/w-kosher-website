# מדריך מימוש מערכת השפות ב-WordPress לאתר W-Kosher

## סקירה כללית
פרויקט זה מספק פתרון מלא למערכת רב-לשונית לאתר w-kosher.com, עם תמיכה בפורטוגזית, אנגלית וספרדית.

## קבצים שנוצרו

### 1. קובץ JavaScript - `src/js/language.js`
מכיל את מערכת התרגומים והלוגיקה לשינוי שפות.

### 2. קובץ CSS - `src/scss/language.scss`
מכיל את כל העיצובים עבור מערכת השפות ותיקוני responsiveness.

### 3. תבנית HTML - `src/templates/index.html`
דוגמה מלאה לדף הבית עם מערכת השפות המשולבת.

## הוראות מימוש ב-WordPress

### שלב 1: העלאת קבצי CSS ו-JavaScript

1. **העלה את קובץ ה-CSS לתיקיית התמה:**
   ```
   wp-content/themes/[your-theme]/assets/css/language.css
   ```

2. **העלה את קובץ ה-JavaScript לתיקיית התמה:**
   ```
   wp-content/themes/[your-theme]/assets/js/language.js
   ```

3. **הוסף לקובץ `functions.php` של התמה:**
   ```php
   function w_kosher_enqueue_language_assets() {
       wp_enqueue_style('w-kosher-language', get_template_directory_uri() . '/assets/css/language.css', array(), '1.0.0');
       wp_enqueue_script('w-kosher-language', get_template_directory_uri() . '/assets/js/language.js', array(), '1.0.0', true);
   }
   add_action('wp_enqueue_scripts', 'w_kosher_enqueue_language_assets');
   ```

### שלב 2: עדכון תבניות WordPress

#### עדכון קובץ `header.php`:

הוסף בתוך ה-`<head>`:
```html
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/language.css">
```

הוסף לפני סגירת `</body>`:
```html
<script src="<?php echo get_template_directory_uri(); ?>/assets/js/language.js"></script>
```

#### עדכון התוכן רב-לשוני:

החלף טקסט רגיל בתבניות WordPress עם מבנה רב-לשוני:

**לפני:**
```html
<h1>Certificação Kosher Oficial em Portugal</h1>
```

**אחרי:**
```html
<h1>
    <span class="text-pt">Certificação Kosher Oficial em Portugal</span>
    <span class="text-en">Official Kosher Certification in Portugal</span>
    <span class="text-es">Certificación Kosher Oficial en Portugal</span>
</h1>
```

### שלב 3: הוספת כפתורי השפה

הוסף את כפתורי השפה בכל מקום שתרצה (כמו header או sidebar):

```html
<div class="language-selector-area">
    <div class="language-selector-title">
        <span class="text-pt">🌍 Escolha o seu idioma</span>
        <span class="text-en">🌍 Choose your language</span>
        <span class="text-es">🌍 Elige tu idioma</span>
    </div>
    <div class="language-buttons">
        <button class="lang-btn active" onclick="changeLanguage('pt')">🇵🇹 Português</button>
        <button class="lang-btn" onclick="changeLanguage('en')">🇬🇧 English</button>
        <button class="lang-btn" onclick="changeLanguage('es')">🇪🇸 Español</button>
    </div>
</div>
```

### שלב 4: תיקון בעיות Responsiveness

העיצובים ב-CSS כוללים תיקונים לבעיות ה-responsiveness:

1. **תיקון דפים משניים במחשב:**
   - הכיתות `.secondary-page` ו-`.page-container` מוודאות תצוגה נכונה במחשב
   - Media queries מתאימות לכל גדלי מסך

2. **הוספת כיתות לדפים משניים:**
   ```php
   // הוסף לקובץ functions.php
   function add_secondary_page_class($classes) {
       if (!is_front_page()) {
           $classes[] = 'secondary-page';
       }
       return $classes;
   }
   add_filter('body_class', 'add_secondary_page_class');
   ```

### שלב 5: הוספת Dropdown מתקדם (אופציונלי)

לחוויית משתמש מתקדמת יותר, הוסף dropdown בחלק העליון:

```html
<div class="language-selector">
    <span id="current-flag">🇵🇹</span>
    <span id="current-lang">Português</span>
    <span>▼</span>
    
    <div class="language-dropdown" id="languageDropdown">
        <div class="language-option active">🇵🇹 <span>Português</span></div>
        <div class="language-option">🇬🇧 <span>English</span></div>
        <div class="language-option">🇪🇸 <span>Español</span></div>
    </div>
</div>
```

## דוגמאות תרגום לעמודים משניים

### דף חברות (`/empresas`):
```html
<h1>
    <span class="text-pt">🏢 Empresas Certificadas</span>
    <span class="text-en">🏢 Certified Companies</span>
    <span class="text-es">🏢 Empresas Certificadas</span>
</h1>
```

### דף הסמכה (`/certificacao`):
```html
<h1>
    <span class="text-pt">📋 Processo de Certificação</span>
    <span class="text-en">📋 Certification Process</span>
    <span class="text-es">📋 Proceso de Certificación</span>
</h1>
```

### דף אודות (`/about`):
```html
<h1>
    <span class="text-pt">ℹ️ Sobre a World Kosher</span>
    <span class="text-en">ℹ️ About World Kosher</span>
    <span class="text-es">ℹ️ Sobre World Kosher</span>
</h1>
```

### דף צור קשר (`/contacto`):
```html
<h1>
    <span class="text-pt">📞 Entre em Contacto</span>
    <span class="text-en">📞 Get in Touch</span>
    <span class="text-es">📞 Póngase en Contacto</span>
</h1>
```

## בדיקות נדרשות

1. **בדיקה על מכשירים שונים:**
   - Mobile (320px-767px)
   - Tablet (768px-1023px)
   - Desktop (1024px+)

2. **בדיקה על דפדפנים:**
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **בדיקת שינוי שפות:**
   - ודא שהטקסט משתנה בכל החלקים
   - ודא שהשפה נשמרת ב-localStorage
   - ודא שהכפתור הפעיל מודגש

## תחזוקה

1. **הוספת שפות חדשות:**
   - הוסף תרגומים לקובץ `language.js`
   - הוסף CSS rules לשפה החדשה
   - הוסף כפתור שפה חדש

2. **עדכון תוכן:**
   - הוסף spans עם הכיתות המתאימות לכל טקסט חדש
   - ודא עקביות בשמות הכיתות

זהו פתרון מלא ומקצועי למערכת רב-לשונית שתפתור את בעיות ה-responsiveness ותשפר את חוויית המשתמש באתר W-Kosher.
