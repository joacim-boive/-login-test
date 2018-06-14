/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Row, Col } from '@ecster/ecster-components';
import withMediaQueries from '@ecster/ecster-components/MediaQuery/withMediaQueries';
import './ResponsivePanel.scss';

class ResponsivePanel extends React.Component {
    render() {
        const {
            className,
            desktop,
            tablet,
            mobile,
            verticalPadding,
            horizontalPadding,
            reverseStack,
            children,
            verticalGutter,
            horizontalGutter,
            media,
            noBorder,
        } = this.props;

        const wrapperClasses = classNames({
            'responsive-panel': true,
            [className]: className,
        });

        const rowClasses = classNames({
            [`extend-lr-${horizontalPadding}x`]: true, // Should be a horizontal for the whole panel ?? data05
        });

        const colClasses = classNames({
            column: true,
            [`plr-${horizontalPadding}x`]: horizontalPadding !== 0,
            [`ptb-${verticalPadding}x`]: verticalPadding !== 0,
        });

        const elementClasses = classNames({
            'gutter-vertical': verticalGutter || media.onMobile,
            'gutter-horizontal': horizontalGutter && !media.onMobile,
            'no-border': noBorder,
        });

        const colProps = {
            xs: mobile !== 1 ? `1/${mobile}` : '1',
            m: tablet !== 1 ? `1/${tablet}` : '1',
            l: desktop !== 1 ? `1/${desktop}` : '1',
        };

        const childs = reverseStack ? children.slice().reverse() : children;

        return (
            <div className={wrapperClasses}>
                {
                    <Row className={rowClasses}>
                        {childs.map(obj => (
                            <Col className={colClasses} key={obj.key || Math.random()} {...colProps}>
                                <div className={elementClasses}>{obj}</div>
                            </Col>
                        ))}
                    </Row>
                }
            </div>
        );
    }
}

const spacePropValidation = (props, propName, componentName) => {
    if (!typeof props[propName] === 'number' && props[propName] % 2 === 0) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}. Value must be dividable with 2 !`);
    }
    return null;
};

ResponsivePanel.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    desktop: PropTypes.number,
    tablet: PropTypes.number,
    mobile: PropTypes.number,
    reverseStack: PropTypes.bool,
    verticalPadding: spacePropValidation,
    horizontalPadding: spacePropValidation,
    verticalGutter: PropTypes.bool,
    horizontalGutter: PropTypes.bool,
    noBorder: PropTypes.bool,
    media: PropTypes.shape().isRequired,
};

ResponsivePanel.defaultProps = {
    className: '',
    desktop: 1,
    tablet: 1,
    mobile: 1,
    reverseStack: false,
    verticalPadding: 0,
    horizontalPadding: 0,
    verticalGutter: false,
    horizontalGutter: false,
    noBorder: false,
};

export default withMediaQueries(ResponsivePanel);
