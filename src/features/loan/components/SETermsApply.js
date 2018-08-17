import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OrderedList } from '@ecster/ecster-components';
import './SETerms.scss';

export const SETermsApply = ({ className }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });
    return (
        <div className={classes}>
            <h4>Så här ansöker du om lånet</h4>
            {/*<p>*/}
                {/*<strong className="e-error">Inga texter är språkhanterade!</strong>*/}
            {/*</p>*/}
            <OrderedList>
                <span>Fyll i ansökan</span>
                <span>Vid godkänd ansökan, signera skuldebrevet och skicka till oss</span>
                <span>När vi fått skuldebrevet har du normalt sett pengarna på ditt konto inom ca tre bankdagar</span>
            </OrderedList>

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
