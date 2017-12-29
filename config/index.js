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
        slug: 'agency-app',
        read_key: 'kxk8SRy6Xa0hOlPLYnzThzQZNlXuD3JQ8ZaUjhMTkGsMpgyjKt',
        write_key: 'K1Fif11wSO3pWaVKWqoEzVQMAyCLEqXbPhyETAD7BKMiHgfzIQ'
    },
    private_settings_type: 'private-settings',
};
module.exports = Object.assign({

}, environment, config);