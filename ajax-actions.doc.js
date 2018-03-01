get /export/customerTransactions?session&refCode&from&to

// ACCOUNT

// delete customer account
del /rest/customers/v1/:customerid/accounts/:referenceid

// get custoemr account terms
get /rest/customers/v1/:customerid/accounts/:refCode/terms

// get customer account
get /rest/customers/v1/:customerid/accounts/:refcode?noCache

// get customer account allowed part payments
get /rest/customers/v1/:customerid/accounts/:referenceid/allowedpartpayments

// get customer account bills
get /rest/customers/v1/:customerid/accounts/:referenceid/bills

// get customer account campaign purchases
get /rest/customers/v1/:customerid/accounts/:referenceid/campaignpurchases

// get customer account cards
get /rest/customers/v1/:customerid/accounts/:referenceid/cards?noCache

// get customer account transactions
get /rest/customers/v1/:customerid/accounts/:referenceid/transactions?offset&maxRecords

// get customer accounts
get /rest/customers/v1/:customerid/accounts?noCache

// get customer extra card holders
get /rest/customers/v1/:customerid/extracardholders

// get account payment terms
get /rest/ess/v1/:country/:lang/partpayments?amount

// get account limit raise terms
get /rest/ess/v1/:country/:lang/terms/raise

// update customer account 
put /rest/customers/v1/:customerid/accounts/:referenceid

// update customer account transaction part payment
put /rest/customers/v1/:customerid/accounts/:referenceid/transactions/:transactionId/partpayments

// update customer account card (activate)
put /rest/customers/v1/:customerid/accounts/cards/:referenceid 

// update customer contact info
put /rest/customers/v1/:customerid/contact

// update customer extra card holder contact info
put /rest/customers/v1/:customerid/extracardholders

// CUSTOMER
get /rest/customers/v1/:customerid

// get customer properties
get /rest/customers/v1/:customerid/properties?property

// AUTHENTICATION

// get session
get /rest/sessions/v1/:sessionKey

// delete session
del /rest/sessions/v1/:sessionKey

// create session
post /rest/sessions/v1

// LOAN

// get customer promissory notes
get /rest/customers/v1/:customerid/promissorynotes

// get active promissory note campaigns
get /rest/ess/v1/SE/sv/promissorynotes/campaigns

// get promissory note default parameters
get /rest/ess/v1/SE/sv/promissorynotes/parameters

// get promissory note payment terms
get /rest/ess/v1/SE/sv/promissorynotes/terms?creditAmount&paymentPeriodYear&makePaymentPlan

// create customer promissory note
post /rest/customers/v1/:customerid/promissorynotes

// COMMON

// get text
get /rest/texts/v1/:country/:lang/:textId
