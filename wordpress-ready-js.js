// מערכת שפות מפושטת ל-WordPress.com
// העתק את הקוד הזה לתוך HTML block או Custom HTML widget

function changeLanguage(lang) {
    // הסרת כל כיתות השפה
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es', 'lang-he', 'lang-ru', 'lang-it');
    
    // הוספת כיתת השפה החדשה
    document.body.classList.add('lang-' + lang);
    
    // שמירה ב-localStorage
    localStorage.setItem('w-kosher-language', lang);
    
    // עדכון כפתור פעיל
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    // מציאת הכפתור הנלחץ והפיכתו לפעיל
    var clickedButton = document.querySelector('[onclick="changeLanguage(\'' + lang + '\')"]');
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // עדכון כיוון הדף לעברית
    if (lang === 'he') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'he';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;
    }
    
    console.log('שפה שונתה ל:', lang);
}

// טעינת שפה שמורה בעת רענון הדף
document.addEventListener('DOMContentLoaded', function() {
    var savedLang = localStorage.getItem('w-kosher-language') || 'pt';
    
    // הגדרת השפה השמורה
    document.body.classList.remove('lang-pt', 'lang-en', 'lang-es', 'lang-he', 'lang-ru', 'lang-it');
    document.body.classList.add('lang-' + savedLang);
    
    // עדכון כפתור פעיל
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    
    var activeButton = document.querySelector('[onclick="changeLanguage(\'' + savedLang + '\')"]');
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // עדכון כיוון הדף
    if (savedLang === 'he') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'he';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = savedLang;
    }
    
    console.log('שפה נטענה:', savedLang);
});
