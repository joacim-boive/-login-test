import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SETerms.scss';
import { formatAmount } from './../../../common/util/format-amount';

const Li = ({ children }) => (
    <li>
        <i className="icon-check" />
        {children}
    </li>
);

Li.propTypes = {
    children: PropTypes.element.isRequired,
};

export const SETermsWorks = ({ className, promissory }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });
    return (
        <div className={classes}>
            <h4>Så här fungerar lånet</h4>
            <ul>
                <Li>Låna upp till {formatAmount(promissory.maxCreditAmount)}</Li>
                <Li>
                    Välj den betalningstakt som passar dig ({promissory.minPaymentPeriodYear} -{' '}
                    {promissory.maxPaymentPeriodYear} år)
                </Li>
                <Li>Ränta {promissory.interestRate}%</Li>
                <Li>Uppläggningsavgift {formatAmount(promissory.startFee)}</Li>
                <Li>Lös lånet när du vill</Li>
            </ul>
        </div>
    );
};

SETermsWorks.propTypes = {
    className: PropTypes.string,
    promissory: PropTypes.shape(),
};

SETermsWorks.defaultProps = {
    className: '',
    promissory: {},
};
