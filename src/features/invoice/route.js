// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { InvoicePage, MonthlyInvoicePage } from './';

export default {
    path: 'invoice',
    name: 'Invoice',
    childRoutes: [
        { path: 'overview', name: 'Invoice page', component: InvoicePage },
        { path: 'monthly-invoices', name: 'Monthly invoice page', component: MonthlyInvoicePage },
    ],
};
