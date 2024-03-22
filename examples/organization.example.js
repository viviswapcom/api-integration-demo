const ApiClient = require('../src/api-client.util');

function generateRandomString(length) {
    return require('crypto').randomBytes(length).toString('hex');
}

(async () => {
    const apiClient = new ApiClient();

    const organizationList = await apiClient.get('/organizations');
    console.log ("Organizations.List: ", organizationList.data);

    const organizationUser = await apiClient.post(`/organizations/${organizationList.data?.[0]?.id}/users`, {
        mail: `my-test-mail-${generateRandomString(8)}@test.test`,
        termsAccepted: true, // you need to show your customers a special AGB that they have to accept
    });
    console.log ("Organizations.CreateUser: ", organizationUser.data);

    const organizationUserDetails = await apiClient.get(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/details`);
    console.log ("Organizations.GetUserDetails: ", organizationUserDetails.data);

    const organizationUserKycStatus = await apiClient.get(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/status`);
    console.log ("Organizations.GetUserStatus: ", organizationUserKycStatus.data);

    // the other routes can be integrated in the same way

})();