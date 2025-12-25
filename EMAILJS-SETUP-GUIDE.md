# 📧 מדריך הגדרת EmailJS לשליחת מיילים אוטומטיים

## שלב 1️⃣: רישום ל-EmailJS (חינם)

1. גש ל: **https://www.emailjs.com/**
2. לחץ על **Sign Up** (רישום חינם)
3. אשר את המייל שתקבל

---

## שלב 2️⃣: הגדרת שירות אימייל (Email Service)

1. בדף הראשי, לחץ על **Add New Service**
2. בחר את ספק המייל שלך:
   - **Gmail** (הכי פשוט)
   - Outlook
   - Yahoo
   - או כל SMTP אחר
   
3. התחבר עם חשבון המייל שלך (למשל Gmail: `portugal@w-kosher.com`)
4. שמור את ה-**Service ID** - תצטרך אותו

---

## שלב 3️⃣: יצירת תבנית #1 - קבלת בקשות (Receive Requests)

### תבנית לקבלת הבקשות מהלקוחות:

1. לחץ על **Email Templates** → **Create New Template**
2. שם התבנית: `kosher_certification_request`
3. **From name**: `World Kosher Website`
4. **From email**: `portugal@w-kosher.com`
5. **To email**: `{{to_email}}` (זה ישלח לחברה שלך)
6. **Subject**: `🚀 בקשה חדשה לסרטיפיקט כשר - {{company}}`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
            🚀 בקשה חדשה לסרטיפיקט כשר
        </h1>
        
        <div style="margin-top: 20px;">
            <p><strong>🏢 שם החברה:</strong> {{company}}</p>
            <p><strong>👤 איש קשר:</strong> {{contact}}</p>
            <p><strong>📧 אימייל:</strong> {{email}}</p>
            <p><strong>📞 טלפון:</strong> {{phone}}</p>
            <p><strong>📍 מיקום:</strong> {{location}}</p>
            <p><strong>🏭 סוג מוצר:</strong> {{productType}}</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>📝 תיאור המוצרים:</strong>
                <p>{{products}}</p>
            </div>
            
            <p><strong>🏭 נפח ייצור:</strong> {{production}}</p>
            <p><strong>⏰ זמן רצוי:</strong> {{timeline}}</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>💬 מידע נוסף:</strong>
                <p>{{message}}</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
                בקשה זו נשלחה מאתר World Kosher ב-{{submission_date}}
            </p>
        </div>
    </div>
</div>
```

7. שמור ושמור את ה-**Template ID**

---

## שלב 4️⃣: יצירת תבנית #2 - מייל אוטומטי ללקוח (Auto-Reply)

### תבנית למייל אוטומטי שהלקוח יקבל:

1. צור תבנית חדשה: `kosher_auto_reply`
2. **From name**: `World Kosher Portugal`
3. **From email**: `portugal@w-kosher.com`
4. **To email**: `{{to_email}}` (מייל הלקוח)
5. **Subject**: `✅ קיבלנו את בקשתך לסרטיפיקט כשר - World Kosher`

**תוכן ה-Email:**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <img src="https://your-website.com/images/logo.png" alt="World Kosher" style="max-width: 120px; margin-bottom: 20px;">
        
        <h1 style="color: #1e3a8a;">✅ תודה על פנייתך!</h1>
        
        <p>שלום {{to_name}},</p>
        
        <p>תודה שפנית אלינו מטעם <strong>{{company}}</strong>!</p>
        
        <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0;"><strong>✅ קיבלנו את בקשתך לסרטיפיקציה כשרה</strong></p>
            <p style="margin: 10px 0 0 0; color: #047857;">צוות המומחים שלנו יבדוק את הפרטים ויחזור אליך תוך 24 שעות עם הצעת מחיר מפורטת.</p>
        </div>
        
        <h3 style="color: #1e3a8a; margin-top: 30px;">📋 המסמכים שתצטרך להכין:</h3>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <ol style="line-height: 1.8;">
                <li>רשימת מרכיבים מלאה (עם ספקים)</li>
                <li>תרשים זרימת ייצור</li>
                <li>תעודות בטיחות מזון קיימות</li>
                <li>פרטי מתקן הייצור</li>
            </ol>
        </div>
        
        <p><strong>מצורף למייל זה מסמך PDF</strong> עם כל המידע והדרישות לתהליך הסרטיפיקציה.</p>
        
        <div style="background: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e3a8a; margin-top: 0;">📞 צריך עזרה מיידית?</h3>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/972543080390">+972 54 308 0390</a></p>
            <p><strong>Portugal Office:</strong> <a href="tel:+351969176830">+351 969 176 830</a></p>
            <p><strong>Israel Office:</strong> <a href="tel:+97226310336">+972 2 631 0336</a></p>
            <p><strong>Email:</strong> <a href="mailto:portugal@w-kosher.com">portugal@w-kosher.com</a></p>
        </div>
        
        <p style="margin-top: 30px;">בברכה,<br>
        <strong>צוות World Kosher</strong><br>
        <em>מומחים בסרטיפיקציה כשרה בינלאומית</em></p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 12px;">
                World Kosher B.M. Mashgichim | www.w-kosher.com
            </p>
        </div>
    </div>
</div>
```

---

## שלב 5️⃣: הוספת קובץ PDF מצורף

### אפשרות א': הורדה אוטומטית מה-Server

1. העלה את קובץ ה-PDF (`kosher-requirements.pdf`) לתיקייה:
   ```
   netlify-deploy/documents/kosher-requirements.pdf
   ```

2. בתבנית המייל, הוסף קישור להורדה:
```html
<a href="https://your-website.com/documents/kosher-requirements.pdf" 
   style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; 
   text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0;">
   📥 הורד מסמך דרישות (PDF)
</a>
```

### אפשרות ב': שליחת PDF כקובץ מצורף (דורש EmailJS Pro)

⚠️ **שים לב**: EmailJS Pro נדרש לקבצים מצורפים (מחיר: $15/חודש)

אם אתה רוצה לשלוח PDF ישירות כקובץ מצורף:
1. שדרג ל-EmailJS Pro
2. בתבנית, לחץ על **Attachments** 
3. העלה את ה-PDF (`kosher-requirements.pdf`)
4. הוא ישלח אוטומטית עם כל מייל

---

## שלב 6️⃣: קבלת המפתחות

1. לחץ על **Account** (למעלה)
2. העתק את ה-**Public Key** שלך
3. גם רשום את ה-**Service ID** וה-**Template IDs** משלבים 2-4

---

## שלב 7️⃣: הזנת המפתחות לקוד

פתח את הקובץ: `netlify-deploy/solicitar-certificacao-pt.html`

החלף את השורות הבאות:

```javascript
emailjs.init({
    publicKey: 'YOUR_PUBLIC_KEY_HERE', // ⬅️ הדבק כאן את ה-Public Key
});

// Line ~285 - Company notification email
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
             ↑                   ↑
         Service ID          Template ID (מהשלב 3)

// Line ~305 - Customer auto-reply email  
emailjs.send('YOUR_SERVICE_ID', 'YOUR_AUTOREPLY_TEMPLATE_ID', {
             ↑                   ↑
         Service ID          Template ID (מהשלב 4)
```

---

## שלב 8️⃣: בדיקה

1. פתח את `solicitar-certificacao-pt.html` בדפדפן
2. מלא את הטופס
3. שלח
4. בדוק:
   - ✅ קיבלת מייל בחשבון החברה (`portugal@w-kosher.com`)
   - ✅ הלקוח קיבל מייל אוטומטי
   - ✅ קובץ PDF מצורף או קישור עובד

---

## 🎯 סיכום המפתחות שתצטרך:

```
Public Key: ___________________ (מ-Account)
Service ID: ___________________ (מ-Email Services)
Template ID #1 (בקשות): ___________________ (kosher_certification_request)
Template ID #2 (מענה אוטומטי): ___________________ (kosher_auto_reply)
```

---

## 📝 הערות חשובות:

- ✅ **חינמי**: 200 מיילים/חודש
- ✅ **לא צריך Backend/Server**
- ✅ עובד ישירות מה-HTML
- ⚠️ לקבצים מצורפים: צריך EmailJS Pro ($15/חודש) או השתמש בקישור להורדה
- 🔄 גם שומר WhatsApp כגיבוי אם EmailJS נכשל

---

## צריך עזרה?

אם יש בעיות:
1. בדוק את ה-Console (F12) לשגיאות
2. ודא שהמפתחות הוזנו נכון
3. בדוק ש-Service מחובר למייל
4. ב-EmailJS Dashboard - לחץ על **Test** לבדיקת התבנית

בהצלחה! 🚀
