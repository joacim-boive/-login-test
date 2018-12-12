import moment from 'moment';

// TODO: temporary age calculation, will be returned in person object when logging in
export const approximateAgeFromSsn = ssn => {
    if (!ssn || !ssn.match(/^[0-9][0-9]/)) return 0;

    // ssn has no century!
    const birthYear = Number.parseInt(ssn.substring(0, 2), 10);
    const year = new Date().getFullYear() - 2000; // TODO: stops working after 2100-01-01 :-)

    let century = 19;

    if (birthYear < year - 10) {
        // year - 10? 10 year olds and younger probably not logging in, assume age over 100
        century = 20;
    }

    return moment().diff(`${century}${ssn.substring(0, 6)}`, 'years');
};

// age in min/max interval?
const inInterval = (age, min, max) => min <= age && age <= max;

export const ageGroupFromSsn = ssn => {
    const age = approximateAgeFromSsn(ssn);
    if (inInterval(age, 18, 24)) return 1;
    if (inInterval(age, 25, 34)) return 2;
    if (inInterval(age, 35, 44)) return 3;
    if (inInterval(age, 45, 54)) return 4;
    if (inInterval(age, 55, 64)) return 5;
    if (inInterval(age, 65, 74)) return 6;
    return 7;
};
