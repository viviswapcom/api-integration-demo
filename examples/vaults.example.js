const ApiClient = require('../src/api-client.util');
const fs = require('fs').promises;
const path = require('path');

(async () => {
    const apiClient = new ApiClient();

    // list all your wallets
    const walletList = await apiClient.get('/vaults/wallets');
    console.log ("Wallets.List: ", walletList.data);

    // create/request new wallet
    // const newWallet = await apiClient.post(`/vaults/wallets`, {
    //     title: "My first hot wallet",
    //     currency: "MATIC",
    //     networkIdentifier: "polygon",
    //     type: "hot"
    // });
    // console.log ("Wallets.Create: ", newWallet.data);

    // fetch specific wallet
    if (walletList.data[0]) {
        const specificWallet = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}`);
        console.log ("Wallets.Get: ", specificWallet.data);
    }

    // delete specific wallet
    // if (walletList.data[0]) {
    //     const deletedWallet = await apiClient.delete(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}`, {
    //         remainingAddress: '0x8875Dc373bEf61608E6F06AB52D90210531Ba7e3',
    //         remainingAddressPayload: '',
    //     });
    //     console.log ("Wallets.Delete: ", deletedWallet.data);
    // }

    // fetch balance of wallet
    if (walletList.data[0]) {
        const walletBalance = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/balances`);
        console.log ("Wallets.GetBalance: ", walletBalance.data);
    }

    // fetch deposit address of wallet
    if (walletList.data[0]) {
        const depositAddress = await apiClient.post(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/deposits`);
        console.log ("Wallets.GetDepositAddress: ", depositAddress.data);
    }

    // fetch transactions of wallet
    if (walletList.data[0]) {
        const walletTransactions = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/transactions`, {
            limit: 10,
            offset: 0,
        });
        console.log ("Wallets.GetTransactions: ", walletTransactions.data);
    }

    // // fetch withdrawals of wallet
    if (walletList.data[0]) {
        const walletWithdrawals = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/withdrawals`, {
            limit: 10,
            offset: 0,
        });
        console.log ("Wallets.GetWithdrawals: ", walletWithdrawals.data);
    }

    // create withdrawal from wallet
    // if (walletList.data[0]) {
    //     const withdrawal = await apiClient.post(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/withdrawals`, {
    //         address: '0x8875Dc373bEf61608E6F06AB52D90210531Ba7e3',
    //         payload: '',
    //         amount: 0.1,
    //         isAmountReducedByFees: true,
    //     });
    //     console.log ("Wallets.CreateWithdrawal: ", withdrawal.data);
    // }

    // fetch all invoices of wallet
    if (walletList.data[0]) {
        const walletInvoices = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/invoices`, {
            limit: 10,
            offset: 0,
        });
        console.log ("Wallets.GetInvoices: ", walletInvoices.data);
    }

    // download invoice of wallet
    // if (walletList.data[0]) {
    //     const invoice = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/invoices/${encodeURIComponent('9328b262-11be-4688-8aad-44caccdd5346')}/pdf`);
    //     await fs.writeFile(path.resolve(__dirname, '../tmp', 'invoice.pdf'), invoice.data, 'binary');
    // }

    // fetch configuration of wallet
    if (walletList.data[0]) {
        const walletAutomations = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/configurations`);
        console.log ("Wallets.GetConfiguration: ", walletAutomations.data);
    }

    // update automations of wallet
    // if (walletList.data[0]) {
    //     const walletAutomations = await apiClient.put(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/configurations`, {
    //         automations: [
    //             // create automation that will automatically withdraw funds when balance reaches 100000 and remaining amount is 1000
    //             {
    //                 identifier: 'automatic-withdrawal',
    //                 type: 'withdrawal',
    //                 withdrawal: {
    //                     threshold: 100000,
    //                     remainingAmount: 1000,
    //                     destinationAddress: '0x8875Dc373bEf61608E6F06AB52D90210531Ba7e3',
    //                     destinationPayload: '',
    //                 }
    //             }
    //         ],
    //     });
    //     console.log ("Wallets.SetConfiguration: ", walletAutomations.data);
    // }

    // get committees of wallet
    if (walletList.data[0]) {
        const walletCommittees = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/committees`);
        console.log ("Wallets.GetCommittees: ", walletCommittees.data);
    }

    // get latest committee requests of wallet
    if (walletList.data[0]) {
        const walletCommitteeRequests = await apiClient.get(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/committees/requests`);
        console.log ("Wallets.GetCommitteeRequests: ", walletCommitteeRequests.data);
    }

    // update committee if wakket
    // if (walletList.data[0]) {
    //     const walletCommitteeUpdate = await apiClient.put(`/vaults/wallets/${encodeURIComponent(walletList.data[0].id)}/committees`, {
    //         committee: {
    //             // require approval only for withdrawals and configuration changes
    //             requireApprovalForWithdrawals: true,
    //             requireApprovalForConfiguration: true,
    //             requiredCommitteeApprovals: 1,
    //             apporvalTimeoutMs: 1000 * 60 * 60 * 12, // 12 hours timeout
    //             committees: [
    //                 {
    //                     identifier: "main-committee",
    //                     isApprovalRequired: false, // this committee does not require approval but is one approval of all requiredCommitteeApprovals
    //                     requiredMemberApprovals: 1, // at least one member of this committee must approve in order to approve the request for this committee
    //                     members: [
    //                         {
    //                             identifier: "ceo",
    //                             isApprovalRequired: false, // this member does not require approval but is one approval of all requiredMemberApprovals
    //                             notifications: [
    //                                 {
    //                                     type: "email",
    //                                     address: "your-mail@smap.viviswap.com",
    //                                 },
    //                                 {
    //                                     type: "sms",
    //                                     address: "+49000000000",
    //                                 },
    //                             ],
    //                             authentifications: [
    //                                 {
    //                                     identifier: "ceo approval password",
    //                                     isMandatory: false, // this member can decide which authentification method to use (either secret or google-authenticator)
    //                                     type: "secret"
    //                                 },
    //                                 {
    //                                     identifier: "ceo 2fa device",
    //                                     isMandatory: false, // this member can decide which authentification method to use (either secret or google-authenticator)
    //                                     type: "google-authenticator"
    //                                 }
    //                             ],
    //                         }
    //                     ],
    //                 }
    //             ],
    //         }
    //     });
    //     console.log ("Wallets.UpdateCommittee: ", walletCommitteeUpdate.data);
    // }

})();