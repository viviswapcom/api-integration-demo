const ApiClient = require('../src/api-client.util');

(async () => {
    const apiClient = new ApiClient();

    const health = await apiClient.get('/public/health/live');
    console.log ("Public.Health.Live: ", health.status);

    const readiness = await apiClient.get('/public/health/ready');
    console.log ("Public.Health.Ready: ", readiness.status);

    const dbs = await apiClient.get('/public/health/dbs');
    console.log ("Public.Health.Dbs: ", dbs.data);

    const supportedCountries = await apiClient.get('/public/countries');
    console.log ("Public.General.SupportedCountries: ", supportedCountries.data);

    const iotaCourse = await apiClient.get('/public/courses/IOTA');
    console.log ("Public.Courses.IOTA: ", iotaCourse.data);

    const iotaCourseHistory = await apiClient.get(`/public/courses/IOTA/history?from=${encodeURIComponent('2024-01-01T12:00:00')}&to=${encodeURIComponent('2024-02-01T12:00:00')}`);
    console.log ("Public.Courses.IOTA.History: ", iotaCourseHistory.data);

    const paymentMethods = await apiClient.get('/public/payment-methods');
    console.log ("Public.Payment-methods: ", paymentMethods.data);
})();