import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Link, Button, ButtonGroup } from '@ecster/ecster-components';
import './UserMessagePanel.scss';

export default class MessagePanel extends React.Component {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        // alt #1: link
        linkText: PropTypes.string,
        link: PropTypes.string,
        // alt #2: button
        buttonText: PropTypes.string,
        onButtonClick: PropTypes.func,
    };

    static defaultProps = {
        linkText: undefined,
        link: undefined,
        buttonText: undefined,
        onButtonClick: undefined,
    };

    render() {
        const { icon, header, text, linkText, link, buttonText, onButtonClick } = this.props;

        return (
            <Panel withMixedContent centeredContent className="card-message-panel">
                <div className="mixed-content">
                    <img src={icon} aria-hidden="true" alt="" />
                    <h1 className="h2">{header}</h1>
                    <p dangerouslySetInnerHTML={{ __html: text }} />
                    {linkText && link && (
                        <Link iconLeft="icon-chevron-left" to={link}>
                            {linkText}
                        </Link>
                    )}
                    {buttonText && onButtonClick && (
                        <ButtonGroup alignCenter spaceBelow={false}>
                            <Button transparent iconLeft="icon-chevron-left" onClick={onButtonClick}>
                                {buttonText}
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </Panel>
        );
    }
}
