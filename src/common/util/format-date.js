import moment from 'moment';

moment.locale('sv-SE');

export const formatDate = date => moment(date).format('YYYY-MM-DD');

export const formatDateShort = date => moment(date).format('D MMM');
