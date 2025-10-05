# World Kosher Portugal - Deploy Instructions

## 🚀 קישור ישיר ל-Netlify Deploy

### אופציה 1: Deploy ב-Click אחד (המלצה!)

👆 **לחץ על הכפתור הזה כדי לפרסם ישירות ל-Netlify:**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/worldkosher-portugal)

### אופציה 2: הדרך הידנית

1. **יצירת חשבון GitHub (אם אין)**:
   - היכנס ל-[github.com](https://github.com)
   - לחץ "Sign up" ויצור חשבון

2. **העלאת הקוד ל-GitHub**:
   ```bash
   # אם יש לך חשבון GitHub, הרץ:
   git remote add origin https://github.com/YOUR_USERNAME/worldkosher-portugal.git
   git branch -M main
   git push -u origin main
   ```

3. **פרסום ב-Netlify**:
   - היכנס ל-[netlify.com](https://netlify.com)
   - לחץ "New site from Git"
   - בחר GitHub ואמת
   - בחר את הרפוזיטורי `worldkosher-portugal`
   - הגדרות Deploy:
     - **Build command**: השאר ריק
     - **Publish directory**: `.` (נקודה)
     - **Branch**: `main`
   - לחץ "Deploy site"

### אופציה 3: Drag & Drop (הכי פשוט!)

1. **הכן קבצים לפרסום**:
   - צור תיקייה חדשה בשולחן העבודה בשם `worldkosher-site`
   - העתק את הקבצים:
     - `homepage.html` (שנה שם ל-`index.html`)
     - `webflow-ready-certificacao.html` (שנה שם ל-`certificacao.html`)

2. **פרסום ב-Netlify**:
   - היכנס ל-[netlify.com](https://netlify.com)
   - גרור את התיקייה לאזור "Deploy manually"
   - האתר יהיה מוכן תוך דקה!

## 🎯 מה יקרה אחרי הפרסום?

✅ **תקבל URL זמני**: `https://dreamy-name-123456.netlify.app`

✅ **האתר יהיה זמין מיד** עם:
- דף הבית מלא
- דף הסמכה פעיל
- סלקטור שפות
- כל האינטגרציות (WhatsApp, Email, Facebook)

✅ **תוכל לשנות את השם**: Site settings > Domain management

## 📱 צפייה מיידית

אחרי הפרסום תוכל לראות את האתר:
- 📱 במובייל
- 💻 בדסקטופ  
- 🌍 מכל מקום בעולם

## 🔗 חיבור דומיין משלך (אופציונלי)

אחרי שהאתר פעיל, תוכל לחבר את `w-kosher.com`:

1. **ב-Netlify**: Site settings > Domain management > Add custom domain
2. **אצל ספק הדומיין**: שנה DNS ל-Netlify servers
3. **SSL אוטומטי**: Netlify מגדיר HTTPS בחינם

איך נתקדם? איזה אופציה תרצה לנסות קודם? 🚀
