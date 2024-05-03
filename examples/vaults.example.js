const ApiClient = require('../src/api-client.util');

(async () => {
    const apiClient = new ApiClient();

    const walletList = await apiClient.get('/vaults/wallets');
    console.log ("Wallets.List: ", walletList.data);

    const newWallet = await apiClient.post(`/vaults/wallets`, {
        title: "My first hot wallet",
        currency: "MATIC",
        networkIdentifier: "polygon",
        type: "hot"
    });
    console.log ("Wallets.Create: ", newWallet.data);

})();