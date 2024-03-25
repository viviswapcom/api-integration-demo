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

    // at least the general and personal KYC data must be provided in order to be able to create a contract
    const generalData = await apiClient.post(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/kyc/general`, {
        isIndividual: true,
        isPep: false,
        isUsCitizen: false,
        isRegulatoryDisclosure: true, // user needs to accept the regulatory disclosure (AGB). For detailed information, please contact us.
        countryOfResidence: "DE",
        nationality: "DE"
    });
    console.log ("Organizations.CreateKycGeneral: ", generalData.data);

    const personalData = await apiClient.post(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/kyc/personal`, {
        fullName: `Martin Bull ${generateRandomString(8)}`,
        dateOfBirth: "1990-01-12"
    });
    console.log ("Organizations.CreateKycPersonal: ", personalData.data);

    // waiting for the user to be verified
    let kycStatus = null;
    while (kycStatus === null || kycStatus?.status?.general !== true || kycStatus?.status?.personal !== true) {
        // wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const kycStatusResponse = await apiClient.get(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/kyc/status`);
        kycStatus = kycStatusResponse.data;
        console.log ("Organizations.GetKycStatus: ", new Date().toLocaleString(), kycStatus);
    }

    const iotaPaymentDetail = await apiClient.post(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/details/IOTA`, {
        address: 'iota1pzt3mstq6khgc3tl0mwuzk3eqddkryqnpdxmk4nr25re2466uxwm28qqxu5',
    });
    console.log ("Organizations.CreatePaymentDetail.IOTA", iotaPaymentDetail.data);

    const contract = await apiClient.post(`/organizations/${organizationList.data?.[0]?.id}/users/${organizationUser.data?.id}/contracts`, {
        amount: 25, // 25 EUR will be converted to IOTA
        incomingPaymentMethodId: '0d57c7cc-11d4-4d68-a5d4-96dd9f503714', // paypal method id (on staging)
        // incomingPaymentDetailId: '', can be skipped, as incomingPaymentDetailRequired=false for paypal
        outgoingPaymentMethodId: '0d57c7cc-11d4-4d68-a5d4-96dd9f503713', // iota method id (on staging)
        outgoingPaymentDetailId: iotaPaymentDetail.data?.id,
    });
    console.log ("Organizations.CreateContract.PAYPAL(EUR)->IOTA", contract.data);

    // the other routes can be integrated in the same way

})();