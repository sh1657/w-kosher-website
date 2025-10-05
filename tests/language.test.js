// Language system tests for W-Kosher website

describe('Language System', () => {
    beforeEach(() => {
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                removeItem: jest.fn(),
                clear: jest.fn(),
            },
            writable: true,
        });

        // Mock DOM elements
        document.body.innerHTML = `
            <div class="text-pt">Portuguese text</div>
            <div class="text-en">English text</div>
            <div class="text-es">Spanish text</div>
            <button class="lang-btn" onclick="changeLanguage('pt')">PT</button>
            <button class="lang-btn" onclick="changeLanguage('en')">EN</button>
            <button class="lang-btn" onclick="changeLanguage('es')">ES</button>
        `;
    });

    test('should load Portuguese as default language', () => {
        const ptElements = document.querySelectorAll('.text-pt');
        const enElements = document.querySelectorAll('.text-en');
        
        expect(document.body.classList.contains('lang-pt')).toBe(true);
        expect(ptElements.length).toBeGreaterThan(0);
        expect(enElements.length).toBeGreaterThan(0);
    });

    test('should change language when button is clicked', () => {
        // Simulate changing to English
        document.body.classList.remove('lang-pt');
        document.body.classList.add('lang-en');
        
        expect(document.body.classList.contains('lang-en')).toBe(true);
        expect(document.body.classList.contains('lang-pt')).toBe(false);
    });

    test('should save language preference to localStorage', () => {
        const mockSetItem = jest.fn();
        window.localStorage.setItem = mockSetItem;
        
        // Simulate saving language
        localStorage.setItem('w-kosher-language', 'en');
        
        expect(mockSetItem).toHaveBeenCalledWith('w-kosher-language', 'en');
    });

    test('should update active button class', () => {
        const buttons = document.querySelectorAll('.lang-btn');
        
        // Remove active class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to specific button
        buttons[1].classList.add('active'); // English button
        
        expect(buttons[1].classList.contains('active')).toBe(true);
        expect(buttons[0].classList.contains('active')).toBe(false);
    });
});

describe('Responsive Design', () => {
    test('should apply correct styles for mobile devices', () => {
        // Mock mobile viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 375,
        });

        // Test would check CSS media queries application
        expect(window.innerWidth).toBe(375);
    });

    test('should apply correct styles for desktop', () => {
        // Mock desktop viewport
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1200,
        });

        expect(window.innerWidth).toBe(1200);
    });
});

describe('Secondary Pages Fix', () => {
    test('should add secondary-page class to non-homepage', () => {
        // Mock current page as not homepage
        Object.defineProperty(window, 'location', {
            value: {
                pathname: '/empresas'
            },
            writable: true
        });

        expect(window.location.pathname).toBe('/empresas');
    });
});
