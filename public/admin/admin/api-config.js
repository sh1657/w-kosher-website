// הגדרות API לעדכון אוטומטי באתר

const API_CONFIG = {
    // Vercel Deployment
    vercelToken: '', // תצטרך להוסיף את ה-token שלך כאן
    vercelProjectId: '', // Project ID מ-Vercel
    
    // GitHub (אם משתמש ב-GitHub Pages או רוצה commit אוטומטי)
    githubToken: '', // Personal Access Token מ-GitHub
    githubRepo: '', // שם הריפו: username/repo
    githubBranch: 'main',
    
    // הגדרות כלליות
    autoDeployEnabled: false, // האם להפעיל deployment אוטומטי
    backupEnabled: true // שמירת גיבוי לפני עדכון
};

// פונקציה לעדכון התוכן ישירות לשרת
async function deployToVercel(contentData, language) {
    if (!API_CONFIG.autoDeployEnabled || !API_CONFIG.vercelToken) {
        console.log('Auto-deploy is disabled or token is missing');
        return false;
    }
    
    try {
        // שמירת גיבוי לפני עדכון
        if (API_CONFIG.backupEnabled) {
            const backup = localStorage.getItem(`wk_content_${language}`);
            localStorage.setItem(`wk_content_${language}_backup`, backup);
        }
        
        // בעתיד: שליחה ישירה ל-Vercel API
        // const response = await fetch('https://api.vercel.com/v1/deployments', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${API_CONFIG.vercelToken}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: 'w-kosher-website',
        //         files: [{
        //             file: `admin/data/content-${language}.json`,
        //             data: JSON.stringify(contentData)
        //         }]
        //     })
        // });
        
        console.log('Deployment to Vercel - Coming soon!');
        return true;
    } catch (error) {
        console.error('Error deploying to Vercel:', error);
        return false;
    }
}

// פונקציה ל-commit אוטומטי ל-GitHub
async function commitToGitHub(contentData, language) {
    if (!API_CONFIG.githubToken) {
        console.log('GitHub token is missing');
        return false;
    }
    
    try {
        const message = `Update ${language} content - ${new Date().toLocaleDateString('he-IL')}`;
        
        // בעתיד: commit אוטומטי
        // const response = await fetch(
        //     `https://api.github.com/repos/${API_CONFIG.githubRepo}/contents/admin/data/content-${language}.json`,
        //     {
        //         method: 'PUT',
        //         headers: {
        //             'Authorization': `token ${API_CONFIG.githubToken}`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             message: message,
        //             content: btoa(JSON.stringify(contentData, null, 2)),
        //             branch: API_CONFIG.githubBranch
        //         })
        //     }
        // );
        
        console.log('GitHub commit - Coming soon!');
        return true;
    } catch (error) {
        console.error('Error committing to GitHub:', error);
        return false;
    }
}

// ייצוא הפונקציות
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, deployToVercel, commitToGitHub };
}
