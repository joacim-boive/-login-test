import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MessagePanel } from '@ecster/ecster-components';

import {
    hideSnackbar as hideSnackbarAction,
    hideModalMessage as hideModalMessageAction,
    hideFullscreenDialog as hideFullscreenDialogAction,
} from './redux/actions';

import './MessagePanel.scss';

const MessagePanelWrapper = ({
    showSnackbar,
    snackbarMessage,
    hideSnackbar,
    showModalMessage,
    modalMessageHeader,
    modalMessage,
    modalMessageType,
    hideModalMessage,
    modalMessageSubmit,
    showFullscreenDialog,
    hideFullscreenDialog,
    fullscreenDialogBody,
}) => (
    <MessagePanel
        showSnackbar={showSnackbar}
        snackbarMessage={snackbarMessage}
        hideSnackbar={hideSnackbar}
        showModalMessage={showModalMessage}
        modalMessageHeader={modalMessageHeader}
        modalMessage={modalMessage}
        modalMessageType={modalMessageType}
        hideModalMessage={hideModalMessage}
        modalMessageSubmit={modalMessageSubmit}
        showFullscreenDialog={showFullscreenDialog}
        hideFullscreenDialog={hideFullscreenDialog}
        fullscreenDialogBody={fullscreenDialogBody}
    />
);

MessagePanelWrapper.propTypes = {
    // snackbar
    showSnackbar: PropTypes.bool.isRequired,
    snackbarMessage: PropTypes.string,
    hideSnackbar: PropTypes.func.isRequired,

    // modal message
    showModalMessage: PropTypes.bool.isRequired,
    modalMessage: PropTypes.string,
    modalMessageType: PropTypes.string,
    modalMessageHeader: PropTypes.string,
    hideModalMessage: PropTypes.func.isRequired,
    modalMessageSubmit: PropTypes.func,

    // fullscreen dialog
    showFullscreenDialog: PropTypes.bool.isRequired,
    hideFullscreenDialog: PropTypes.func.isRequired,
    fullscreenDialogBody: PropTypes.shape(),
};

MessagePanelWrapper.defaultProps = {
    snackbarMessage: '',
    modalMessage: '',
    modalMessageType: 'INFO',
    modalMessageHeader: '',
    modalMessageSubmit: () => {},
    fullscreenDialogBody: <div />,
};

const mapStateToProps = ({ common: { snackbar, modalMessage, fullscreenDialog } }) => ({
    showSnackbar: snackbar.show,
    snackbarMessage: snackbar.message,
    showModalMessage: modalMessage.show,
    modalMessage: modalMessage.message,
    modalMessageHeader: modalMessage.header,
    modalMessageType: modalMessage.type,
    modalMessageSubmit: modalMessage.onSubmit,
    showFullscreenDialog: fullscreenDialog.show,
    fullscreenDialogBody: fullscreenDialog.body,
});

const mapDispatchToProps = dispatch => ({
    hideSnackbar: () => dispatch(hideSnackbarAction()),
    hideModalMessage: () => dispatch(hideModalMessageAction()),
    hideFullscreenDialog: () => dispatch(hideFullscreenDialogAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagePanelWrapper);
