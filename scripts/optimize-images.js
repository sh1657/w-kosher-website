/**
 * סקריפט אופטימיזציית תמונות
 * ממיר תמונות PNG/JPG ל-WebP ומקטין את הגודל
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const HERO_DIR = path.join(__dirname, '../images/hero');
const PUBLIC_HERO_DIR = path.join(__dirname, '../public/images/hero');
const QUALITY = 80; // איכות WebP (0-100)
const MAX_WIDTH = 1920; // רוחב מקסימלי

async function optimizeHeroImages() {
    console.log('🚀 מתחיל אופטימיזציית תמונות Hero...\n');
    
    // וודא שהתיקייה קיימת
    if (!fs.existsSync(HERO_DIR)) {
        console.error('❌ תיקיית images/hero לא נמצאה!');
        return;
    }

    const files = fs.readdirSync(HERO_DIR).filter(f => 
        f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
    );

    console.log(`📁 נמצאו ${files.length} תמונות לאופטימיזציה\n`);

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const file of files) {
        const inputPath = path.join(HERO_DIR, file);
        const outputName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const outputPath = path.join(HERO_DIR, outputName);
        
        try {
            const originalStats = fs.statSync(inputPath);
            totalOriginalSize += originalStats.size;

            // המר ל-WebP עם דחיסה
            await sharp(inputPath)
                .resize(MAX_WIDTH, null, { 
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({ quality: QUALITY })
                .toFile(outputPath);

            const optimizedStats = fs.statSync(outputPath);
            totalOptimizedSize += optimizedStats.size;

            const originalSizeMB = (originalStats.size / 1024 / 1024).toFixed(2);
            const optimizedSizeKB = (optimizedStats.size / 1024).toFixed(0);
            const savings = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

            console.log(`✅ ${file}`);
            console.log(`   📊 ${originalSizeMB}MB → ${optimizedSizeKB}KB (חיסכון: ${savings}%)`);
            console.log(`   📄 נוצר: ${outputName}\n`);

        } catch (err) {
            console.error(`❌ שגיאה בקובץ ${file}:`, err.message);
        }
    }

    // סיכום
    const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const totalOptimizedMB = (totalOptimizedSize / 1024 / 1024).toFixed(2);
    const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

    console.log('═'.repeat(50));
    console.log('📊 סיכום:');
    console.log(`   גודל מקורי: ${totalOriginalMB}MB`);
    console.log(`   גודל חדש: ${totalOptimizedMB}MB`);
    console.log(`   חיסכון כולל: ${totalSavings}%`);
    console.log('═'.repeat(50));

    // העתק גם ל-public אם קיים
    if (fs.existsSync(PUBLIC_HERO_DIR)) {
        console.log('\n📋 מעתיק קבצי WebP ל-public/images/hero...');
        for (const file of files) {
            const webpName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
            const srcPath = path.join(HERO_DIR, webpName);
            const destPath = path.join(PUBLIC_HERO_DIR, webpName);
            
            if (fs.existsSync(srcPath)) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`   ✅ ${webpName}`);
            }
        }
    }

    console.log('\n🎉 אופטימיזציה הושלמה!');
    console.log('\n⚠️  לא לשכוח לעדכן את קבצי ה-HTML לשימוש בקבצי WebP!');
}

// הרץ
optimizeHeroImages().catch(console.error);
