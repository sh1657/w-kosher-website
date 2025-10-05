<?php
/**
 * W-Kosher Multi-Language WordPress Functions
 * Add these functions to your theme's functions.php file
 */

// Enqueue language assets
function w_kosher_enqueue_language_assets() {
    wp_enqueue_style(
        'w-kosher-language', 
        get_template_directory_uri() . '/assets/css/language.css', 
        array(), 
        '1.0.0'
    );
    
    wp_enqueue_script(
        'w-kosher-language', 
        get_template_directory_uri() . '/assets/js/language.js', 
        array(), 
        '1.0.0', 
        true
    );
}
add_action('wp_enqueue_scripts', 'w_kosher_enqueue_language_assets');

// Add secondary-page class to non-homepage
function w_kosher_add_secondary_page_class($classes) {
    if (!is_front_page()) {
        $classes[] = 'secondary-page';
    }
    return $classes;
}
add_filter('body_class', 'w_kosher_add_secondary_page_class');

// Language selector shortcode
function w_kosher_language_selector_shortcode($atts) {
    $atts = shortcode_atts(array(
        'style' => 'buttons' // 'buttons' or 'dropdown'
    ), $atts);
    
    if ($atts['style'] === 'dropdown') {
        return '
        <div class="language-selector">
            <span id="current-flag">🇵🇹</span>
            <span id="current-lang">Português</span>
            <span>▼</span>
            <div class="language-dropdown" id="languageDropdown">
                <div class="language-option active">🇵🇹 <span>Português</span></div>
                <div class="language-option">🇬🇧 <span>English</span></div>
                <div class="language-option">🇪🇸 <span>Español</span></div>
            </div>
        </div>';
    } else {
        return '
        <div class="language-selector-area">
            <div class="language-selector-title">
                <span class="text-pt">🌍 Escolha o seu idioma</span>
                <span class="text-en">🌍 Choose your language</span>
                <span class="text-es">🌍 Elige tu idioma</span>
            </div>
            <div class="language-buttons">
                <button class="lang-btn active" onclick="changeLanguage(\'pt\')">🇵🇹 Português</button>
                <button class="lang-btn" onclick="changeLanguage(\'en\')">🇬🇧 English</button>
                <button class="lang-btn" onclick="changeLanguage(\'es\')">🇪🇸 Español</button>
            </div>
        </div>';
    }
}
add_shortcode('w_kosher_language_selector', 'w_kosher_language_selector_shortcode');

// Helper function for multilingual text
function w_kosher_multilingual_text($pt_text, $en_text = '', $es_text = '') {
    $en_text = $en_text ?: $pt_text;
    $es_text = $es_text ?: $pt_text;
    
    return sprintf(
        '<span class="text-pt">%s</span><span class="text-en">%s</span><span class="text-es">%s</span>',
        esc_html($pt_text),
        esc_html($en_text),
        esc_html($es_text)
    );
}

// Usage examples in templates:

// Simple text
// echo w_kosher_multilingual_text('Bem-vindos', 'Welcome', 'Bienvenidos');

// In navigation
// <a href="/empresas"><?php echo w_kosher_multilingual_text('🏢 Empresas', '🏢 Companies', '🏢 Empresas'); ?></a>

// Page titles
// <h1><?php echo w_kosher_multilingual_text('Certificação Kosher', 'Kosher Certification', 'Certificación Kosher'); ?></h1>

?>
