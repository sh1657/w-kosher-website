# פתרונות חלופיים לתוכנית הבסיסית של WordPress.com

## 🚫 מגבלות התוכנית הבסיסית
- אין אפשרות להתקין פלאגינים
- הגבלות על הוספת JavaScript
- חלק מהתמות לא תומכות ב-Widgets מותאמים אישית

## ✅ פתרונות שעובדים ללא פלאגינים

### פתרון 1: JavaScript דרך Footer Widget
```html
<!-- הוסף ב-Appearance → Widgets → Footer -->
<script>
function changeLanguage(lang) {
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('w-kosher-language', lang);
    
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var clickedButton = document.querySelector('[onclick="changeLanguage(\'' + lang + '\')"]');
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var savedLang = localStorage.getItem('w-kosher-language') || 'pt';
    document.body.classList.add('lang-' + savedLang);
    
    var activeButton = document.querySelector('[onclick="changeLanguage(\'' + savedLang + '\')"]');
    if (activeButton) {
        activeButton.classList.add('active');
    }
});
</script>
```

### פתרון 2: כפתורי שפה ב-Widget
```html
<!-- הוסף ב-Appearance → Widgets → Header/Sidebar -->
<div class="language-selector">
    <button class="lang-btn pt-btn active" onclick="changeLanguage('pt')">PT</button>
    <button class="lang-btn en-btn" onclick="changeLanguage('en')">EN</button>
    <button class="lang-btn es-btn" onclick="changeLanguage('es')">ES</button>
</div>
```

### פתרון 3: הכל בדף אחד (הכי פשוט)
אם אין אפשרות ל-Widgets, הוסף בתחילת כל דף:

```html
<!-- כפתורי השפה + JavaScript יחד -->
<div class="language-selector">
    <button class="lang-btn pt-btn active" onclick="changeLanguage('pt')">Português</button>
    <button class="lang-btn en-btn" onclick="changeLanguage('en')">English</button>
    <button class="lang-btn es-btn" onclick="changeLanguage('es')">Español</button>
</div>

<script>
function changeLanguage(lang) {
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('w-kosher-language', lang);
    
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// טעינת שפה שמורה
var savedLang = localStorage.getItem('w-kosher-language') || 'pt';
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('lang-' + savedLang);
    document.querySelector('.lang-btn.' + savedLang + '-btn').classList.add('active');
});
</script>
```

## 📝 הוראות יישום מפושטות

### שלב 1: CSS
1. **מראה → התאמה אישית → CSS נוסף**
2. העתק את כל התוכן מ-`wordpress-ready-css.css`
3. שמור

### שלב 2: בחר פתרון JavaScript
**אם יש Widgets:**
- **מראה → Widgets → Footer** - הוסף פתרון 1
- **מראה → Widgets → Header** - הוסף פתרון 2

**אם אין Widgets:**
- הוסף פתרון 3 בתחילת כל דף

### שלב 3: עדכן תוכן
בכל טקסט השתמש במבנה:
```html
<span class="text-pt">טקסט בפורטוגזית</span>
<span class="text-en">English text</span>
<span class="text-es">Texto en español</span>
```

## 🔧 בדיקות חוקיות
1. ✅ לחץ על כפתור שפה - האם התוכן משתנה?
2. ✅ רענן את הדף - האם השפה נשמרת?
3. ✅ עבור לדף אחר - האם השפה נשארת?
4. ✅ בדוק במובייל - האם הכל עובד?

## ⚠️ אם כלום לא עובד
**פתרון מינימלי ללא JavaScript:**

1. רק CSS (ללא JavaScript):
```css
/* הצג רק פורטוגזית כברירת מחדל */
.text-en, .text-es { display: none; }

/* כשלוחצים על כפתור אנגלית */
body:hover .text-pt, body:hover .text-es { display: none; }
body:hover .text-en { display: block; }
```

2. קישורים ידניים לעמודים נפרדים:
- `/homepage-pt` - דף בפורטוגזית
- `/homepage-en` - דף באנגלית  
- `/homepage-es` - דף בספרדית

זה לא אידיאלי אבל יעבוד בכל תוכנית WordPress.com!
