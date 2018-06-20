import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './SETerms.scss';

const Li = ({ children, label }) => (
    <li>
        <span>{label}</span>
        {children}
    </li>
);

Li.propTypes = {
    children: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
};

export const SETermsApply = ({ className }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });
    return (
        <div className={classes}>
            <h4>Så här ansöker du om lånet</h4>
            <ol>
                <Li label="1.">Fyll i ansökan</Li>
                <Li label="2.">Vid godkännd ansökan, signera skuldebrevet och skicka till oss</Li>
                <Li label="3.">När vi fått skuldebrevet har du normalt sett pengarna på ditt konto inom ca tre bankdagar</Li>
            </ol>
            <section>
                <h5>För att kunna ansöka måste du uppfylla följande</h5>
                <p>Du har en stadigvarande inkomst. Du får inte ha några betalningsanmärkningar.</p>
                <p>Har du några frågor så kontakta oss på 08-33 01 30</p>
            </section>
        </div>
    );
};

SETermsApply.propTypes = {
    className: PropTypes.string,
};

SETermsApply.defaultProps = {
    className: '',
};
