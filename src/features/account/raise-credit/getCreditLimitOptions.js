/* eslint-disable no-plusplus */
import React from 'react';
import { Option } from '@ecster/ecster-components';

import { formatAmount } from '../../../common/util/format-amount';

// odd multiples of small in big?
const oddMultiples = (big, small) => {
    const test = (big / small) % 2;
    return test === 1;
};

// even multiples of small in big?
const evenMultiples = (big, small) => {
    const test = (big / small) % 2;
    return test === 0;
};

//
// Generate select options
//
// start from current limit, increase in small steps up to a certain amount, then in bigger steps
// increase with tiny steps if current limit not a multiple of 5000 or 100000 (SE)
//
// Examples (SE)
//    3000 =>  5000, 10000, 15000, 20000, 30000 ...
//    5000 => 10000, 15000, 20000, 30000 ...
//   10000 => 15000, 20000, 30000 ...
//   15000 => 20000, 30000 ...
//   17000 => 20000, 30000 ...
//   25000 => 30000, 40000 ...
//   27000 => 30000, 40000 ...
//   30000 => 40000, 50000 ...
//
const getCreditLimitOptions = (locale, currentLimit, maxLimit) => {
    // configure increments and limit for big increments
    const config = {
        sv: {
            tiny: 100000, // 1 000 kr
            small: 500000, // 5 000 kr
            big: 1000000, // 10 000 kr
            bigFrom: 2000000, // 20 000 kr
        },
        fi: {
            tiny: 10000, // 100 EUR
            small: 50000, // 500 EUR
            big: 100000, // 1 000 EUR
            bigFrom: 200000, // 2 000 EUR
        },
    };

    if (!currentLimit) {
        // occurs before getAccount
        return <Option label="" value="" />;
    }

    const country = locale.substring(0, 2);
    const options = [];
    const increments = config[country];
    let increment;
    let nextLimit;

    if (oddMultiples(currentLimit, increments.small)) {
        // e.g (SE): 15000 or 25000 - increment with 5000
        nextLimit = currentLimit + increments.small;
    } else if (evenMultiples(currentLimit, increments.small)) {
        // e.g (SE): 10000 - increase with 5000. 20000 - increase with 10000
        nextLimit = currentLimit + (currentLimit < increments.bigFrom ? increments.small : increments.big);
    } else {
        // e.g (SE): 17000 - increase with 1000 and try again, stops when reaching 20000
        nextLimit = currentLimit + increments.tiny;

        // use a for loop with break to avoid risk of infinite while loop
        for (let i = 0; i < 4; i++) {
            nextLimit += increments.tiny;
            if (oddMultiples(nextLimit, increments.small) || evenMultiples(nextLimit, increments.small)) {
                break;
            }
        }
    }

    increment = oddMultiples(nextLimit, increments.small) ? increments.small : increments.big;

    while (nextLimit <= maxLimit) {
        console.log('pushing option: ', formatAmount(nextLimit), nextLimit);
        options.push(<Option key={nextLimit} label={formatAmount(nextLimit)} value={nextLimit} />);
        if (oddMultiples(nextLimit, increments.small) || nextLimit < increments.bigFrom) {
            increment = increments.small;
        } else {
            increment = increments.big;
        }
        nextLimit += increment;
    }

    return options;
};

export default getCreditLimitOptions;
