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
    API_HOST: !!prod? 'http://localhost:3000':'http://localhost:3000',
    bucket: {
        slug: process.env.COSMIC_BUCKET || 'react-auth-app',
        read_key: process.env.COSMIC_READ_KEY || "XTVIUr1swolMSy9jyoHeuc9RKavSv2w444x8Jsfe24MwaxSNoy",
        write_key: process.env.COSMIC_WRITE_KEY || "za42hK9lszYzVtgwvvVcw1VTIXNECOFFXM9vXHKlgqvI04MOPM",
    },
    jwtSecret: "asdfghjklqwertyuiop",
    users_type: 'users',
    private_settings_type: 'private-settings'
};
module.exports = Object.assign({

}, environment, config);