# מדריך מהיר לבניית דף הבית ב-Webflow

## צעדים ראשונים בעורך Webflow

### 1. הגדרת סגנונות בסיסיים
1. **פתח Style Panel** (צד ימין)
2. **לחץ על Global Swatches**
3. **הוסף צבעים**:
   - כחול: #1e3a8a
   - כתום: #f59e0b
   - אפור בהיר: #f9fafb

### 2. בניית Top Bar
1. **גרור Section** לדף
2. **שנה שם ל-"Top Bar"**
3. **הגדר רקע**: #1e3a8a
4. **הוסף Container**
5. **הוסף Div** בתוך Container
6. **הגדר Flexbox**: justify-content: space-between

#### תוכן Top Bar:
**צד שמאל:**
- טקסט: "📞 LINHA KOSHER: (+972) 54 308 0390"
- טקסט: "📧 Portugal@w-kosher.com"

**צד ימין:**
- "🇵🇹 Português ▼"
- "📘 Facebook" 
- "📱 WhatsApp"

### 3. בניית Main Header
1. **הוסף Section חדש**
2. **שם**: "Main Header"
3. **רקע לבן** + צל: 0 2px 10px rgba(0,0,0,0.1)
4. **הוסף Container**
5. **הוסף Div** עם Flexbox

#### תוכן Header:
**לוגו** (שמאל):
- Image element עם הלוגו
- H1: "World Kosher"
- טקסט קטן: "B.M.MASHGICHIM"

**ניווט** (מרכז):
- 🏠 Início
- 📋 Certificação  
- 🏢 Empresas
- ℹ️ Sobre Nós
- 📞 Contacto

**כפתור CTA** (ימין):
- "🚀 Solicitar Certificação"
- רקע כתום: #f59e0b

### 4. הפיכה ל-Sticky
1. **בחר Top Bar Section**
2. **Position**: Sticky
3. **Top**: 0
4. **Z-index**: 1001

5. **בחר Main Header Section**
6. **Position**: Sticky  
7. **Top**: 44px (גובה Top Bar)
8. **Z-index**: 1000

### 5. בניית Hero Section
1. **הוסף Section**
2. **רקע**: Linear gradient #1e3a8a → #1e40af
3. **הוסף Container**

#### תוכן Hero:
**כותרת ראשית:**
- H1: "📋 Certificação Kosher"
- שורה שנייה בכתום: "Oficial em Portugal"
- גודל: 3.5rem

**תת כותרת:**
- "A principal autoridade em certificação kosher com mais de 1.000 produtos certificados em 15+ países"

**סטטיסטיקות:**
- Div עם Flexbox
- 3 כרטיסים:
  - "8+ Empresas Certificadas"
  - "15+ Países Atendidos"
  - "100% Taxa de Aprovação"

**כפתורים:**
- "🚀 Solicitar Certificação" (כתום)
- "🔍 Ver Empresas" (שקוף)

### 6. פרסום לצפייה
1. **לחץ Publish** (פינה ימנית עליונה)
2. **בחר Subdomain**: worldkosher.webflow.io
3. **Publish to webflow.io**

## תוצאה:
תקבל קישור כמו: `https://worldkosher.webflow.io`

## טיפים לבנייה מהירה:
- השתמש ב-Copy/Paste לאלמנטים דומים
- צור Classes לעיצובים חוזרים
- השתמש ב-Preview לבדיקה
- שמור כל הזמן (Ctrl+S)

## מה הלאה?
לאחר שתראה שהבסיס עובד, נוכל:
1. להוסיף את דף הCertificação
2. ליצור את שאר הדפים
3. להוסיף אינטראקציות
4. לחבר את הדומיין האמיתי
