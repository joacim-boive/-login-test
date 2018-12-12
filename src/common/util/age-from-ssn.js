// TODO: temporary
export const approximateAgeFromSsn = ssn => {
    if (!ssn || !ssn.match(/^[0-9][0-9]/)) return 0;

    const birthYear = Number.parseInt(ssn.substring(0, 2), 10);
    const year = new Date().getFullYear() - 2000; // TODO: fix before 2100-01-01!

    let age = 0;

    if (birthYear > year - 10) {
        // year - 10
        age = 100 - birthYear + year;
    } else {
        age = year - birthYear;
    }

    return age;
};

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
