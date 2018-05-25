import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import './NextPaymentPanel.scss';

const Grid = WidthProvider(GridLayout);

export const NextPaymentPanel = ({ className, ...rest }) => {
    const classes = classNames({
        'next-payment-panel': true,
        [className]: className,
    });

    const layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true },
        { i: 'b', x: 1, y: 0, w: 1, h: 1, static: true },
        { i: 'c', x: 0, y: 1, w: 1, h: 1, static: true },
        { i: 'd', x: 1, y: 1, w: 1, h: 1, static: true },
        { i: 'e', x: 0, y: 2, w: 1, h: 1, static: true },
        { i: 'f', x: 1, y: 2, w: 1, h: 1, static: true },
    ];

    return (
        <div {...rest}>
            <Grid className={classes} layout={layout} cols={2} rowHeight={20}>
                <h4 key="a">Nästa betalning</h4>
                <p key="b">Detaljerad faktura</p>
                <p key="c">Att betala i juni:</p>
                <p key="d">8 928 kr</p>
                <p key="e">Förfallodatum:</p>
                <p key="f">2018-06-01</p>
            </Grid>
        </div>
    );
};

NextPaymentPanel.propTypes = {
    className: PropTypes.string,
};

NextPaymentPanel.defaultProps = {
    className: '',
};
