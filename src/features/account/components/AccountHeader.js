import React from 'react';
import PropTypes from 'prop-types';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import './AccountHeader.scss';
import { EcsterCard } from './../../common/card/EcsterCard';

const Grid = WidthProvider(GridLayout);

const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 1, static: true, minW: 1, maxW: 1 },
    { i: 'b', x: 1, y: 0, w: 2, h: 1, static: true },
    { i: 'c', x: 3, y: 0, w: 2, h: 1, static: true },
];

export const AccountHeader = ({ noCard }) => (
    <div className="account-header">
        <Grid layout={layout} cols={5} rowHeight={80} width={500} verticalCompact>
            <EcsterCard key="a" className="account-header__card-icon" />
            <div key="b" className="account-header__card-number">
                <h3>Ecster</h3>
                <div>1234 1234 1234 1234</div>
            </div>
            <div key="c" className="account-header__amount">
                <div>5 188 kr</div>
                <p>kvar att handla för</p>
            </div>
        </Grid>
    </div>
);

AccountHeader.propTypes = {
    noCard: PropTypes.bool,
};

AccountHeader.defaultProps = {
    noCard: false,
};
