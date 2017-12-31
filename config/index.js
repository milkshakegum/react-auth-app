const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true
    }
}[process.env.NODE_ENV || 'development'];
const prod = process.env.NODE_ENV === 'production';
const config = {
    bucket: {
        slug: process.env.COSMIC_BUCKET || 'react-auth-app',
        read_key: process.env.COSMIC_READ_KEY || "XTVIUr1swolMSy9jyoHeuc9RKavSv2w444x8Jsfe24MwaxSNoy",
        write_key: process.env.COSMIC_WRITE_KEY || "za42hK9lszYzVtgwvvVcw1VTIXNECOFFXM9vXHKlgqvI04MOPM",
    },
    users_type: 'users',
    private_settings_type: 'private-settings'
};
module.exports = Object.assign({

}, environment, config);