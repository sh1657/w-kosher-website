/**
 * Build Script - Minification for Production
 * מכווץ HTML, CSS ו-JS לפרודקשן
 */

const { minify } = require('html-minifier-terser');
const CleanCSS = require('clean-css');
const { minify: terserMinify } = require('terser');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../public');
const DIST_DIR = path.join(__dirname, '../dist');

// HTML Minification Options
const htmlOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    conservativeCollapse: true
};

// CSS Minification Options
const cssOptions = {
    level: 2
};

async function build() {
    console.log('🚀 מתחיל תהליך Build...\n');
    
    // צור תיקיית dist אם לא קיימת
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR, { recursive: true });
        fs.mkdirSync(path.join(DIST_DIR, 'images'), { recursive: true });
    }

    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;

    // 1. Minify CSS
    console.log('📦 מכווץ CSS...');
    const cssFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.css'));
    
    for (const file of cssFiles) {
        const inputPath = path.join(SOURCE_DIR, file);
        const outputPath = path.join(DIST_DIR, file);
        
        const originalCSS = fs.readFileSync(inputPath, 'utf8');
        const minifiedCSS = new CleanCSS(cssOptions).minify(originalCSS);
        
        fs.writeFileSync(outputPath, minifiedCSS.styles);
        
        const originalSize = Buffer.byteLength(originalCSS, 'utf8');
        const minifiedSize = Buffer.byteLength(minifiedCSS.styles, 'utf8');
        totalOriginalSize += originalSize;
        totalMinifiedSize += minifiedSize;
        
        const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
        console.log(`   ✅ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(minifiedSize/1024).toFixed(1)}KB (${savings}% חיסכון)`);
    }

    // 2. Minify HTML
    console.log('\n📦 מכווץ HTML...');
    const htmlFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.html'));
    
    for (const file of htmlFiles) {
        const inputPath = path.join(SOURCE_DIR, file);
        const outputPath = path.join(DIST_DIR, file);
        
        try {
            const originalHTML = fs.readFileSync(inputPath, 'utf8');
            const minifiedHTML = await minify(originalHTML, htmlOptions);
            
            fs.writeFileSync(outputPath, minifiedHTML);
            
            const originalSize = Buffer.byteLength(originalHTML, 'utf8');
            const minifiedSize = Buffer.byteLength(minifiedHTML, 'utf8');
            totalOriginalSize += originalSize;
            totalMinifiedSize += minifiedSize;
            
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
            console.log(`   ✅ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(minifiedSize/1024).toFixed(1)}KB (${savings}% חיסכון)`);
        } catch (err) {
            console.error(`   ❌ שגיאה ב-${file}:`, err.message);
            // העתק את הקובץ כמו שהוא במקרה של שגיאה
            fs.copyFileSync(inputPath, outputPath);
        }
    }

    // 3. העתק קבצים נוספים
    console.log('\n📋 מעתיק קבצים נוספים...');
    const otherFiles = ['robots.txt', 'sitemap.xml', 'favicon.ico', '_headers'];
    
    for (const file of otherFiles) {
        const inputPath = path.join(SOURCE_DIR, file);
        const outputPath = path.join(DIST_DIR, file);
        
        if (fs.existsSync(inputPath)) {
            fs.copyFileSync(inputPath, outputPath);
            console.log(`   ✅ ${file}`);
        }
    }

    // 4. העתק תיקיות
    console.log('\n📁 מעתיק תיקיות...');
    const folders = ['images', 'documents', 'certificates'];
    
    for (const folder of folders) {
        const srcFolder = path.join(SOURCE_DIR, folder);
        const destFolder = path.join(DIST_DIR, folder);
        
        if (fs.existsSync(srcFolder)) {
            copyFolderSync(srcFolder, destFolder);
            console.log(`   ✅ ${folder}/`);
        }
    }

    // סיכום
    const totalSavings = ((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(1);
    
    console.log('\n' + '═'.repeat(50));
    console.log('📊 סיכום Build:');
    console.log(`   גודל מקורי: ${(totalOriginalSize/1024).toFixed(1)}KB`);
    console.log(`   גודל מכווץ: ${(totalMinifiedSize/1024).toFixed(1)}KB`);
    console.log(`   חיסכון כולל: ${totalSavings}%`);
    console.log('═'.repeat(50));
    console.log('\n🎉 Build הושלם! קבצי Production בתיקיית dist/');
}

function copyFolderSync(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyFolderSync(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// הרץ
build().catch(console.error);
