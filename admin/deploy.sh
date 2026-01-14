#!/bin/bash

# 🚀 סקריפט פרסום אוטומטי לתוכן האתר

echo "════════════════════════════════════════════"
echo "   🌐 World Kosher - מערכת פרסום תוכן"
echo "════════════════════════════════════════════"
echo ""

# נתיב הפרויקט
PROJECT_PATH="/Users/shlomimiron/web wk"
cd "$PROJECT_PATH"

# בדיקה אם יש שינויים
if ! git diff --quiet admin/data/; then
    echo "✅ זוהו שינויים בקבצי התוכן"
    echo ""
    
    # הצגת השינויים
    echo "📝 שינויים שזוהו:"
    git diff --name-only admin/data/
    echo ""
    
    # הוספת הקבצים
    git add admin/data/content-*.json
    
    # יצירת commit
    TIMESTAMP=$(date '+%d/%m/%Y %H:%M')
    git commit -m "עדכון תוכן: $TIMESTAMP"
    
    echo "✅ Commit נוצר בהצלחה"
    echo ""
    
    # שאלה אם לפרסם
    read -p "האם לפרסם לאתר? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🚀 מפרסם לשרת..."
        git push
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "════════════════════════════════════════════"
            echo "   ✅ פורסם בהצלחה!"
            echo "════════════════════════════════════════════"
            echo ""
            echo "🌐 Vercel יעדכן את האתר תוך 1-2 דקות"
            echo "📱 תוכל לצפות בהתקדמות ב: https://vercel.com"
            echo ""
        else
            echo "❌ שגיאה בפרסום. בדוק את החיבור לאינטרנט."
        fi
    else
        echo "❌ הפרסום בוטל"
    fi
else
    echo "ℹ️  לא זוהו שינויים בקבצי התוכן"
    echo "   ערוך תוכן דרך: http://localhost:3003"
fi

echo ""
echo "════════════════════════════════════════════"
