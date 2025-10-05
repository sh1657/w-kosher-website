# מדריך יישום מפורט למערכת השפות ב-WordPress.com

## שלב 1: הכנה והכנסת ה-CSS

### 1.1 כניסה לעורך התמות
1. היכנס לפאנל הניהול של האתר שלך ב-WordPress.com
2. עבור ל: **מראה (Appearance) → התאמה אישית (Customize)**
3. בחר: **CSS נוסף (Additional CSS)**

### 1.2 העתקת ה-CSS
1. פתח את הקובץ `wordpress-ready-css.css` במחשב שלך
2. העתק את כל התוכן
3. הדבק בחלון ה-CSS הנוסף ב-WordPress.com
4. לחץ **פרסום (Publish)**

## שלב 2: הוספת כפתורי השפות

### 2.1 יצירת כפתורי השפות ב-Widget
אם התפריטים מוגבלים, יש פתרון חלופי:

1. עבור ל: **מראה (Appearance) → Widget**
2. בחר מיקום כמו **Header** או **Sidebar**
3. הוסף Widget מסוג **HTML מותאם אישית (Custom HTML)**
4. הדבק את הקוד הבא:

```html
<div class="language-selector">
    <button class="lang-btn pt-btn active" onclick="changeLanguage('pt')">Português</button>
    <button class="lang-btn en-btn" onclick="changeLanguage('en')">English</button>
    <button class="lang-btn es-btn" onclick="changeLanguage('es')">Español</button>
</div>
```

### 2.2 יצירת תפריט השפות (אם זמין)
אם יש אפשרות ליצור תפריטים מותאמים:

1. עבור ל: **מראה (Appearance) → תפריטים (Menus)**
2. צור תפריט חדש בשם "בחירת שפה" או "Language Selector"
3. הוסף קישורים מותאמים אישית עם הקוד הבא:

**לפורטוגזית:**
- כותרת: `Português`
- URL: `#`
- CSS Classes: `lang-btn pt-btn`
- תאור: `onclick="changeLanguage('pt')"`

**לאנגלית:**
- כותרת: `English`
- URL: `#`
- CSS Classes: `lang-btn en-btn`
- תאור: `onclick="changeLanguage('en')"`

**לספרדית:**
- כותרת: `Español`
- URL: `#`
- CSS Classes: `lang-btn es-btn`
- תאור: `onclick="changeLanguage('es')"`

### 2.3 מיקום כפתורי השפה
1. אם השתמשת ב-Widget - בחר מיקום מתאים כמו Header או Sidebar
2. אם השתמשת בתפריט - הקצה למיקום ברצועת העליונה או בתפריט הראשי
3. שמור את השינויים

**חשוב:** אם אף אחד מהפתרונות לא עובד, תוכל להוסיף את כפתורי השפה ישירות בתוכן הדף במקום לעמוד את שלב 4.

## שלב 3: הוספת JavaScript (ללא פלאגינים)

### 3.1 דרך HTML Block בפוטר (מומלץ)
1. עבור ל: **מראה (Appearance) → Widget**
2. מצא את אזור **Footer** או **Copyright Area**
3. הוסף Widget מסוג **HTML מותאם אישית (Custom HTML)**
4. הדבק את הקוד הבא (כולל את כל התוכן מקובץ `wordpress-ready-js.js`):

```html
<script>
function changeLanguage(lang) {
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es', 'lang-he', 'lang-ru', 'lang-it');
    document.body.classList.add('lang-' + lang);
    localStorage.setItem('w-kosher-language', lang);
    
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var clickedButton = document.querySelector('[onclick="changeLanguage(\'' + lang + '\')"]');
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    if (lang === 'he') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'he';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var savedLang = localStorage.getItem('w-kosher-language') || 'pt';
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es', 'lang-he', 'lang-ru', 'lang-it');
    document.body.classList.add('lang-' + savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var activeButton = document.querySelector('[onclick="changeLanguage(\'' + savedLang + '\')"]');
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    if (savedLang === 'he') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'he';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = savedLang;
    }
});
</script>
```

### 3.2 דרך HTML Block בכל דף (חלופה)
אם אין אפשרות להוסיף ב-Footer:
1. בכל דף שתרצה לערוך, הוסף Block מסוג **HTML**
2. הדבק את אותו הקוד מלמעלה
3. הקוד צריך להופיע רק פעם אחת בכל דף

## שלב 4: עריכת התוכן לריבוי שפות

### 4.1 מבנה התוכן לכל שפה
כעת עבור כל טקסט שתרצה לתרגם, השתמש במבנה הבא:

```html
<span class="text-pt">טקסט בפורטוגזית</span>
<span class="text-en">English text</span>
<span class="text-es">Texto en español</span>
```

### 4.2 דוגמא לכותרת ראשית:
```html
<h1>
    <span class="text-pt">W-Kosher - Certificação Kosher Confiável</span>
    <span class="text-en">W-Kosher - Reliable Kosher Certification</span>
    <span class="text-es">W-Kosher - Certificación Kosher Confiable</span>
</h1>
```

### 4.3 דוגמא לפסקה:
```html
<p>
    <span class="text-pt">Oferecemos supervisão kosher profissional para empresas e produtos.</span>
    <span class="text-en">We provide professional kosher supervision for companies and products.</span>
    <span class="text-es">Ofrecemos supervisión kosher profesional para empresas y productos.</span>
</p>
```

## שלב 5: עדכון דפים קיימים

### 5.1 דף הבית
1. עבור ל: **דפים (Pages) → דף הבית**
2. עבור למצב עריכה
3. החלף כל טקסט עם המבנה הרב-לשוני שלמעלה

### 5.2 דף חברות
1. עבור ל: **דפים (Pages) → חברות/Empresas**
2. ודא שיש כיתה CSS: `secondary-page` בהגדרות הדף
3. עדכן את התוכן לפורמט רב-לשוני

### 5.3 הוספת כיתה לדפים משניים
בכל דף משני, הוסף את הקוד הבא בתחילת העמוד:
```html
<div class="secondary-page">
    <!-- כל התוכן של הדף כאן -->
</div>
```

## שלב 6: בדיקה ואופטימיזציה

### 6.1 בדיקות נדרשות
1. בדוק שהשפה נשמרת לאחר רענון הדף
2. ודא שכפתורי השפה פועלים בכל הדפים
3. בדוק תצוגה במובייל ובדסקטופ
4. ודא שהתוכן מתחלף נכון

### 6.2 פתרון בעיות נפוצות בתוכנית הבסיסית

**אם אין אפשרות להוסיף JavaScript ב-Footer:**
- השתמש ב-HTML Block בתחילת כל דף עיקרי
- הקוד צריך להופיע רק פעם אחת בכל דף
- בדוק שלא נוספו רווחים מיותרים בהעתקה

**אם כפתורי השפה לא פועלים:**
- ודא שה-JavaScript והכפתורים באותו דף
- בדוק שלא הוספת את הקוד כמה פעמים
- בדוק שאין שגיאות בקונסול הדפדפן (F12)

**אם השפה לא נשמרת:**
- ודא שה-localStorage פועל (לא בכל התמות)
- נסה לנקות cache של הדפדפן
- בדוק שאין מצב גלישה פרטית

**אם העיצוב נשבר:**
- בדוק שה-CSS הועתק במלואו ב-Additional CSS
- ודא שאין התנגשויות עם עיצוב התמה
- נסה להוסיף `!important` לחוקי CSS שלא עובדים

**אם Widgets לא זמינים:**
- השתמש בהוספת כפתורי השפה ישירות בתוכן הדפים
- הוסף את הקוד הבא בתחילת כל דף:
```html
<div class="language-selector">
    <button class="lang-btn pt-btn active" onclick="changeLanguage('pt')">Português</button>
    <button class="lang-btn en-btn" onclick="changeLanguage('en')">English</button>
    <button class="lang-btn es-btn" onclick="changeLanguage('es')">Español</button>
</div>
```

## שלב 7: שיפורים נוספים (אופציונלי)

### 7.1 הוספת עוד שפות
לכל שפה נוספת:
1. הוסף כיתה `.text-[קוד-שפה]` ל-CSS
2. הוסף אופציה ל-JavaScript
3. עדכן את התוכן בכל הדפים

### 7.2 שיפור UX
1. הוסף אנימציות מעבר בין שפות
2. הוסף אייקונים לדגלי מדינות
3. שפר את עיצוב כפתורי השפה

## קבצים להורדה:
- `wordpress-ready-css.css` - העיצוב המלא
- `wordpress-ready-js.js` - הפונקציונליות
- `docs/wordpress-com-guide.md` - מדריך זה

## תמיכה נוספת:
אם נתקלת בבעיות, בדוק:
1. שהקוד הועתק במלואו ובלי שגיאות
2. שהתמה תומכת ב-CSS מותאם אישית
3. שאין plugins שמפריעים לפונקציונליות
