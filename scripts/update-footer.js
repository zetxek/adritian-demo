const fs = require('fs');
const path = require('path');

const goModPath = path.join(__dirname, '../go.mod');
const i18nDir = path.join(__dirname, '../i18n');

try {
    // 1. Get version
    if (!fs.existsSync(goModPath)) {
        console.error('go.mod not found');
        process.exit(1);
    }
    const goModContent = fs.readFileSync(goModPath, 'utf8');
    const versionMatch = goModContent.match(/github\.com\/zetxek\/adritian-free-hugo-theme\s+(v[\d\.]+)/);

    if (!versionMatch) {
        console.error('Could not find theme version in go.mod');
        process.exit(1);
    }

    const version = versionMatch[1];
    console.log(`Found theme version: ${version}`);

    // 2. Update i18n files
    if (!fs.existsSync(i18nDir)) {
        console.error('i18n directory not found');
        process.exit(1);
    }
    const files = fs.readdirSync(i18nDir).filter(f => f.endsWith('.yaml'));

    files.forEach(file => {
        const filePath = path.join(i18nDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex to match the footer_notice block
        // We look for 'id: "footer_notice"' then newline then 'translation: "..."'
        // We capture the translation text.
        // Handling potential whitespace variations
        const regex = /(id:\s*"footer_notice"\s*\n\s*translation:\s*")([^"]*)(")/;

        if (regex.test(content)) {
            content = content.replace(regex, (match, prefix, text, suffix) => {
                // Remove existing version if present (e.g., " v1.9.2" at the end)
                // We assume the version is space + v + digits + dots
                const cleanText = text.replace(/\s+v\d+\.\d+\.\d+$/, '');
                const newText = `${cleanText} ${version}`;
                console.log(`Updating ${file}: "${text}" -> "${newText}"`);
                return `${prefix}${newText}${suffix}`;
            });

            fs.writeFileSync(filePath, content, 'utf8');
        } else {
            console.warn(`footer_notice not found in ${file}`);
        }
    });

    console.log('Update complete.');

} catch (e) {
    console.error('An error occurred:', e);
    process.exit(1);
}
