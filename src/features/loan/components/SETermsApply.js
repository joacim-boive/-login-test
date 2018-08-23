import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { OrderedList } from '@ecster/ecster-components';
import './SETerms.scss';

export const SETermsApply = ({ className }) => {
    const classes = classNames({
        'se-terms': true,
        [className]: className,
    });
    return (
        <div className={classes}>
            <h4>{i18n('loan.terms-apply.header')}</h4>
            <OrderedList>
                {i18n('loan.terms-apply.how-to-list', {
                    returnObjects: true,
                    wrapper: { tag: 'span' },
                })}
            </OrderedList>

            <section>
                <h5>{i18n('loan.terms-apply.sub-header')}</h5>
                <p>
                    {i18n('loan.terms-apply.terms-list', {
                        returnObjects: true,
                        wrapper: { tag: 'p', dangerouslySetInnerHTML: true },
                    })}
                </p>
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
