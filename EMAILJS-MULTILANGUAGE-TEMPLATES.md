# 📧 EmailJS - תבניות רב-לשוניות (Multilanguage Templates)

## סקירה כללית

המערכת תומכת ב-**3 שפות**:
- 🇵🇹 **פורטוגזית** (Portuguese)
- 🇮🇱 **עברית** (Hebrew)
- 🇬🇧 **אנגלית** (English)

כל שפה דורשת **2 תבניות EmailJS**:
1. **הודעה לחברה** - מקבלת את פרטי הבקשה
2. **הודעה ללקוח** - אישור אוטומטי עם קישור לשאלון

---

## 📋 רשימת התבניות הנדרשות ב-EmailJS

צור את התבניות הבאות ב-EmailJS Dashboard:

### 🏢 תבניות לחברה (Company Notifications)
1. `kosher_certification_pt` - פורטוגזית
2. `kosher_certification_he` - עברית
3. `kosher_certification_en` - אנגלית

### 👤 תבניות ללקוחות (Customer Auto-Replies)
1. `kosher_autoreply_pt` - פורטוגזית
2. `kosher_autoreply_he` - עברית
3. `kosher_autoreply_en` - אנגלית

---

## 🇵🇹 תבניות בפורטוגזית (Portuguese Templates)

### 1️⃣ תבנית לחברה: `kosher_certification_pt`

**הגדרות:**
- **Template ID**: `kosher_certification_pt`
- **From Name**: `World Kosher Website`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}` (portugal@w-kosher.com)
- **Subject**: `🚀 Nova Solicitação de Certificação - {{company}}`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
            🚀 Nova Solicitação de Certificação Kosher
        </h1>
        
        <div style="margin-top: 20px;">
            <p><strong>🏢 Empresa:</strong> {{company}}</p>
            <p><strong>👤 Contacto:</strong> {{contact}}</p>
            <p><strong>📧 E-mail:</strong> {{email}}</p>
            <p><strong>📞 Telefone:</strong> {{phone}}</p>
            <p><strong>📍 Localização:</strong> {{location}}</p>
            <p><strong>🏭 Tipo de Produto:</strong> {{productType}}</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>📝 Descrição dos Produtos:</strong>
                <p>{{products}}</p>
            </div>
            
            <p><strong>🏭 Volume de Produção:</strong> {{production}}</p>
            <p><strong>⏰ Prazo Desejado:</strong> {{timeline}}</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>💬 Informações Adicionais:</strong>
                <p>{{message}}</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
                📅 Solicitação recebida através do site World Kosher<br>
                🌐 Idioma: Português
            </p>
        </div>
    </div>
</div>
```

---

### 2️⃣ תבנית ללקוח: `kosher_autoreply_pt`

**הגדרות:**
- **Template ID**: `kosher_autoreply_pt`
- **From Name**: `World Kosher Portugal`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}`
- **Subject**: `✅ Recebemos o Seu Pedido de Certificação - World Kosher`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://w-kosher-website.vercel.app/images/logo.png" alt="World Kosher" style="max-width: 120px;">
        </div>
        
        <h1 style="color: #1e3a8a; font-size: 24px; margin-bottom: 10px;">✅ Obrigado pelo Seu Contacto!</h1>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">Olá {{to_name}},</p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Obrigado por nos contactar em nome da <strong>{{company}}</strong>!
        </p>
        
        <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0; font-weight: bold; color: #047857;">✅ Recebemos o seu pedido de certificação kosher</p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 14px;">
                A nossa equipa de especialistas irá analisar os detalhes e responderá dentro de 24 horas com um orçamento detalhado.
            </p>
        </div>
        
        <h3 style="color: #1e3a8a; margin-top: 25px; font-size: 18px;">📋 Próximos Passos</h3>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Para nos ajudar a avaliar as suas instalações, por favor:</p>
            <ol style="line-height: 1.8; margin: 10px 0; padding-left: 20px; color: #555;">
                <li>Descarregue e preencha o nosso questionário</li>
                <li>Prepare uma lista de todos os ingredientes (com fornecedores)</li>
                <li>Tenha o diagrama de fluxo de produção pronto</li>
                <li>Certificados de segurança alimentar existentes, se disponíveis</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin: 25px 0;">
            <a href="https://w-kosher-website.vercel.app/documents/questionnaire.pdf" target="_blank"
               style="display: inline-block; background: #06b6d4; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px;">
               📝 Descarregar Questionário (PDF)
            </a>
            <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                Clique no botão para descarregar o questionário. Preencha-o e envie-nos de volta.
            </p>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>📎 Importante:</strong> Por favor, responda a todas as perguntas <strong>honestamente e em detalhe</strong>. Isto ajuda-nos a fornecer a avaliação e orçamento mais precisos.
            </p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">📞 Precisa de Ajuda Imediata?</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>Escritório Portugal:</strong> <a href="tel:+351969176830" style="color: #1e3a8a;">+351 969 176 830</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>Escritório Israel:</strong> <a href="tel:+97226310336" style="color: #1e3a8a;">+972 2 631 0336</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>E-mail:</strong> <a href="mailto:portugal@w-kosher.com" style="color: #1e3a8a;">portugal@w-kosher.com</a>
            </p>
            <p style="font-size: 12px; color: #92400e; margin-top: 8px;">
                Para mensagens WhatsApp, utilize a página "Contacto" no nosso site.
            </p>
        </div>
        
        <p style="margin-top: 25px; font-size: 15px; line-height: 1.6;">
            Com os melhores cumprimentos,<br>
            <strong>Equipa World Kosher</strong><br>
            <em>Especialistas em Certificação Kosher Internacional</em>
        </p>
        
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
                World Kosher B.M. Mashgichim | www.w-kosher.com
            </p>
        </div>
    </div>
</div>
```

---

## 🇮🇱 תבניות בעברית (Hebrew Templates)

### 3️⃣ תבנית לחברה: `kosher_certification_he`

**הגדרות:**
- **Template ID**: `kosher_certification_he`
- **From Name**: `World Kosher Website`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}` (portugal@w-kosher.com)
- **Subject**: `🚀 בקשה חדשה לתעודת כשרות - {{company}}`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; direction: rtl;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
            🚀 בקשה חדשה לתעודת כשרות
        </h1>
        
        <div style="margin-top: 20px;">
            <p><strong>🏢 חברה:</strong> {{company}}</p>
            <p><strong>👤 איש קשר:</strong> {{contact}}</p>
            <p><strong>📧 דוא"ל:</strong> {{email}}</p>
            <p><strong>📞 טלפון:</strong> {{phone}}</p>
            <p><strong>📍 מיקום:</strong> {{location}}</p>
            <p><strong>🏭 סוג מוצר:</strong> {{productType}}</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>📝 תיאור המוצרים:</strong>
                <p>{{products}}</p>
            </div>
            
            <p><strong>🏭 נפח ייצור:</strong> {{production}}</p>
            <p><strong>⏰ לוח זמנים מבוקש:</strong> {{timeline}}</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>💬 מידע נוסף:</strong>
                <p>{{message}}</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
                📅 הבקשה התקבלה דרך אתר World Kosher<br>
                🌐 שפה: עברית
            </p>
        </div>
    </div>
</div>
```

---

### 4️⃣ תבנית ללקוח: `kosher_autoreply_he`

**הגדרות:**
- **Template ID**: `kosher_autoreply_he`
- **From Name**: `World Kosher Portugal`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}`
- **Subject**: `✅ קיבלנו את בקשתכם לתעודת כשרות - World Kosher`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; direction: rtl;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://w-kosher-website.vercel.app/images/logo.png" alt="World Kosher" style="max-width: 120px;">
        </div>
        
        <h1 style="color: #1e3a8a; font-size: 24px; margin-bottom: 10px;">✅ תודה על פנייתכם!</h1>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">שלום {{to_name}},</p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
            תודה שפניתם אלינו בשם <strong>{{company}}</strong>!
        </p>
        
        <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-right: 4px solid #10b981;">
            <p style="margin: 0; font-weight: bold; color: #047857;">✅ קיבלנו את בקשתכם לתעודת כשרות</p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 14px;">
                צוות המומחים שלנו יבדוק את הפרטים ויחזור אליכם תוך 24 שעות עם הצעת מחיר מפורטת.
            </p>
        </div>
        
        <h3 style="color: #1e3a8a; margin-top: 25px; font-size: 18px;">📋 השלבים הבאים</h3>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">כדי לעזור לנו להעריך את המתקן שלכם, אנא:</p>
            <ol style="line-height: 1.8; margin: 10px 0; padding-right: 20px; color: #555;">
                <li>הורידו ומלאו את השאלון שלנו</li>
                <li>הכינו רשימה של כל המרכיבים (עם ספקים)</li>
                <li>הכינו תרשים זרימת ייצור</li>
                <li>תעודות בטיחות מזון קיימות, אם זמינות</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin: 25px 0;">
            <a href="https://w-kosher-website.vercel.app/documents/questionnaire.pdf" target="_blank"
               style="display: inline-block; background: #06b6d4; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px;">
               📝 הורידו שאלון (PDF)
            </a>
            <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                לחצו על הכפתור להורדת השאלון. מלאו אותו ושלחו לנו בחזרה.
            </p>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>📎 חשוב:</strong> אנא ענו על כל השאלות <strong>בכנות ובפירוט</strong>. זה עוזר לנו לספק לכם את ההערכה והצעת המחיר המדויקת ביותר.
            </p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">📞 זקוקים לעזרה מיידית?</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>משרד פורטוגל:</strong> <a href="tel:+351969176830" style="color: #1e3a8a;">+351 969 176 830</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>משרד ישראל:</strong> <a href="tel:+97226310336" style="color: #1e3a8a;">+972 2 631 0336</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>דוא"ל:</strong> <a href="mailto:portugal@w-kosher.com" style="color: #1e3a8a;">portugal@w-kosher.com</a>
            </p>
            <p style="font-size: 12px; color: #92400e; margin-top: 8px;">
                להודעות WhatsApp, אנא השתמשו בדף "צור קשר" באתר שלנו.
            </p>
        </div>
        
        <p style="margin-top: 25px; font-size: 15px; line-height: 1.6;">
            בברכה,<br>
            <strong>צוות World Kosher</strong><br>
            <em>מומחים בהסמכת כשרות בינלאומית</em>
        </p>
        
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
                World Kosher B.M. Mashgichim | www.w-kosher.com
            </p>
        </div>
    </div>
</div>
```

---

## 🇬🇧 תבניות באנגלית (English Templates)

### 5️⃣ תבנית לחברה: `kosher_certification_en`

**הגדרות:**
- **Template ID**: `kosher_certification_en`
- **From Name**: `World Kosher Website`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}` (portugal@w-kosher.com)
- **Subject**: `🚀 New Kosher Certification Request - {{company}}`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
            🚀 New Kosher Certification Request
        </h1>
        
        <div style="margin-top: 20px;">
            <p><strong>🏢 Company:</strong> {{company}}</p>
            <p><strong>👤 Contact:</strong> {{contact}}</p>
            <p><strong>📧 E-mail:</strong> {{email}}</p>
            <p><strong>📞 Phone:</strong> {{phone}}</p>
            <p><strong>📍 Location:</strong> {{location}}</p>
            <p><strong>🏭 Product Type:</strong> {{productType}}</p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>📝 Product Description:</strong>
                <p>{{products}}</p>
            </div>
            
            <p><strong>🏭 Production Volume:</strong> {{production}}</p>
            <p><strong>⏰ Desired Timeline:</strong> {{timeline}}</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <strong>💬 Additional Information:</strong>
                <p>{{message}}</p>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
                📅 Request received through World Kosher website<br>
                🌐 Language: English
            </p>
        </div>
    </div>
</div>
```

---

### 6️⃣ תבנית ללקוח: `kosher_autoreply_en`

**הגדרות:**
- **Template ID**: `kosher_autoreply_en`
- **From Name**: `World Kosher Portugal`
- **From Email**: `portugal@w-kosher.com`
- **To Email**: `{{to_email}}`
- **Subject**: `✅ We Received Your Certification Request - World Kosher`

**תוכן ה-Email (Body):**

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc;">
    <div style="background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://w-kosher-website.vercel.app/images/logo.png" alt="World Kosher" style="max-width: 120px;">
        </div>
        
        <h1 style="color: #1e3a8a; font-size: 24px; margin-bottom: 10px;">✅ Thank You for Your Request!</h1>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">Hello {{to_name}},</p>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Thank you for reaching out to us on behalf of <strong>{{company}}</strong>!
        </p>
        
        <div style="background: #dcfce7; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0; font-weight: bold; color: #047857;">✅ We have received your kosher certification request</p>
            <p style="margin: 10px 0 0 0; color: #047857; font-size: 14px;">
                Our expert team will review your details and get back to you within 24 hours with a detailed quote.
            </p>
        </div>
        
        <h3 style="color: #1e3a8a; margin-top: 25px; font-size: 18px;">📋 Next Steps</h3>
        
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">To help us evaluate your facility, please:</p>
            <ol style="line-height: 1.8; margin: 10px 0; padding-left: 20px; color: #555;">
                <li>Download and complete our questionnaire</li>
                <li>Prepare a list of all ingredients (with suppliers)</li>
                <li>Have production flow diagram ready</li>
                <li>Existing food safety certificates if available</li>
            </ol>
        </div>
        
        <div style="text-align: center; margin: 25px 0;">
            <a href="https://w-kosher-website.vercel.app/documents/questionnaire.pdf" target="_blank"
               style="display: inline-block; background: #06b6d4; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; font-size: 16px;">
               📝 Download Questionnaire (PDF)
            </a>
            <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
                Click the button to download the questionnaire. Fill it out and send it back to us.
            </p>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>📎 Important:</strong> Please answer all questions <strong>honestly and in detail</strong>. This helps us provide you with the most accurate assessment and quote.
            </p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">📞 Need Immediate Help?</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>Portugal Office:</strong> <a href="tel:+351969176830" style="color: #1e3a8a;">+351 969 176 830</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>Israel Office:</strong> <a href="tel:+97226310336" style="color: #1e3a8a;">+972 2 631 0336</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #78350f;">
                <strong>Email:</strong> <a href="mailto:portugal@w-kosher.com" style="color: #1e3a8a;">portugal@w-kosher.com</a>
            </p>
            <p style="font-size: 12px; color: #92400e; margin-top: 8px;">
                For WhatsApp messages, please use the 'Contact' page on our website.
            </p>
        </div>
        
        <p style="margin-top: 25px; font-size: 15px; line-height: 1.6;">
            Best regards,<br>
            <strong>World Kosher Team</strong><br>
            <em>International Kosher Certification Experts</em>
        </p>
        
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
                World Kosher B.M. Mashgichim | www.w-kosher.com
            </p>
        </div>
    </div>
</div>
```

---

## ⚙️ הגדרת EmailJS - צעדים

### 1. צור את כל 6 התבניות ב-EmailJS Dashboard

עבור כל תבנית:
1. היכנס ל: https://dashboard.emailjs.com/
2. לחץ על **Email Templates** → **Create New Template**
3. הזן את ה-Template ID (לדוגמה: `kosher_certification_pt`)
4. הגדר From/To/Subject כמפורט למעלה
5. העתק את תוכן ה-HTML ל-**Content**
6. לחץ על **Test** כדי לבדוק
7. לחץ על **Save**

### 2. עדכן את מפתחות EmailJS בקבצים

החלף את הערכים הבאים בכל 3 הקבצים:
- `/netlify-deploy/solicitar-certificacao-pt.html`
- `/netlify-deploy/solicitar-certificacao-he.html`
- `/netlify-deploy/solicitar-certificacao-en.html`

```javascript
publicKey: 'YOUR_PUBLIC_KEY_HERE'  // החלף במפתח ה-Public שלך
'YOUR_SERVICE_ID'                   // החלף ב-Service ID שלך
```

### 3. בדוק את המערכת

1. שלח טופס בכל אחת מהשפות
2. בדוק שהלקוח מקבל מייל בשפה הנכונה
3. בדוק שהחברה מקבלת את הפרטים עם ציון השפה
4. ודא שקישור ה-PDF עובד בכל המיילים

---

## 📊 מבנה שליחת המיילים

```
לקוח ממלא טופס → דף פורטוגזי/עברי/אנגלי
                    ↓
              EmailJS נשלח:
                    ↓
        ┌───────────┴───────────┐
        ↓                       ↓
  מייל לחברה            מייל ללקוח
  (בשפה המתאימה)        (בשפה המתאימה)
  portugal@w-kosher.com  email@customer.com
        ↓                       ↓
  פרטי הבקשה +         אישור + קישור לשאלון
  ציון שפה              בשפת הלקוח
```

---

## 🔗 קישורים חשובים

- **EmailJS Dashboard**: https://dashboard.emailjs.com/
- **Email Templates**: https://dashboard.emailjs.com/admin/templates
- **API Keys**: https://dashboard.emailjs.com/admin/account
- **Usage Stats**: https://dashboard.emailjs.com/admin/usage

---

## ✅ רשימת בדיקה (Checklist)

- [ ] יצרתי את 6 התבניות ב-EmailJS
- [ ] עדכנתי את ה-Public Key בכל 3 הקבצים
- [ ] עדכנתי את ה-Service ID בכל 3 הקבצים
- [ ] בדקתי שליחת טופס בפורטוגזית
- [ ] בדקתי שליחת טופס בעברית
- [ ] בדקתי שליחת טופס באנגלית
- [ ] אישרתי שקישור ה-PDF עובד בכל המיילים
- [ ] דחפתי את השינויים ל-Git
- [ ] אישרתי שהשינויים נפרסו ב-Vercel/Netlify

---

🎉 **מזל טוב!** עכשיו המערכת שלך תומכת בשליחת מיילים ב-3 שפות!
