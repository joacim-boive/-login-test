#!/bin/sh

# ?? get /export/customerTransactions?session&refCode&from&to

# rekit add action account/deleteCustomerAccount -a
rekit add action account/getCustomerAccountTerms -a
rekit add action account/getCustomerAccount -a
rekit add action account/getCustomerAccountAllowedPartPayments -a
rekit add action account/getCustomerAccountBills -a
rekit add action account/getCustomerAccountCampaignPurchases -a
rekit add action account/getCustomerAccountCards -a
rekit add action account/getCustomerAccountTransactions -a
rekit add action account/getCustomerAccounts -a
rekit add action account/getCustomerExtraCardHolders -a
rekit add action account/getAccountPaymentTerms -a
rekit add action account/getAccountLimitRaiseTerms -a
rekit add action account/updateCustomerAccount -a
rekit add action account/updateCustomerAccountTransactionPartPayment -a
rekit add action account/updateCustomerAccountCard -a
rekit add action account/updateCustomerContactInfo -a
rekit add action account/updateCustomerExtraCardHolderContactInfo -a

rekit add action customer/getCustomer -a
rekit add action customer/getCustomerProperties -a

rekit add action authentication/getSession -a
rekit add action authentication/deleteSession -a
rekit add action authentication/createSession -a

rekit add action loan/getCustomerPromissoryNotes -a
rekit add action loan/getActivePromissoryNoteCampaigns -a
rekit add action loan/getPromissoryNoteDefaultParameters -a
rekit add action loan/getPromissoryNotePaymentTerms -a
rekit add action loan/createCustomerPromissoryNote -a

rekit add action common/getText -a
