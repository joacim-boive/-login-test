import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import './AccountLinksPanel.scss';

const Grid = WidthProvider(GridLayout);

export const AccountLinksPanel = ({ className, ...rest }) => {
    const classes = classNames({
        'account-links-panel': true,
        [className]: className,
    });

    const layout = [
        { i: 'a', x: 0, y: 0, w: 1, h: 1 },
        { i: 'b', x: 0, y: 1, w: 1, h: 1 },
        { i: 'c', x: 0, y: 2, w: 1, h: 1 },
        { i: 'd', x: 0, y: 3, w: 1, h: 1 },
        { i: 'e', x: 0, y: 4, w: 1, h: 1 },
        { i: 'f', x: 0, y: 5, w: 1, h: 1 },
    ];

    return (
        <div {...rest} className={classes}>
            <Grid autoSize verticalCompact measureBeforeMount layout={layout} cols={2} rowHeight={20}>
                <div key="a"> Länk 1 </div>
                <div key="b"> Länk 2 </div>
                <div key="c"> Länk 3 </div>
                <div key="d"> Länk 4 </div>
                <div key="e"> Länk 5 </div>
                <div key="f"> Länk 6 </div>
                <div key="g"> Länk 7 </div>
                <div key="h"> Länk 8 </div>
            </Grid>
        </div>
    );
};

AccountLinksPanel.propTypes = {
    className: PropTypes.string,
};

AccountLinksPanel.defaultProps = {
    className: '',
};
