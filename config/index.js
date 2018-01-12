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
    API_HOST: !!prod ? process.env.HOST : 'http://localhost:3000',
    bucket: {
        slug: process.env.COSMIC_BUCKET,
        read_key: process.env.COSMIC_READ_KEY,
        write_key: process.env.COSMIC_WRITE_KEY,
    },
    jwtSecret: "asdfghjklqwertyuiop",
    users_type: 'users',
    private_settings_type: 'private-settings'
};
module.exports = Object.assign({

}, environment, config);