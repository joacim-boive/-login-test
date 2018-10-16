import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';
import { Input } from '@ecster/ecster-components';
import './ClearingNumberInput.scss';

class ClearingNumberInput extends Component {
    state = {
        autoSelectedBank: '',
        showBankInput: false,
        myBank: '',
    };

    onChangeClearing = e => {
        const { target } = e;
        const { onChange, onFoundBank } = this.props;

        let value = parseInt(target.value, 10);

        if (Number.isNaN(value)) value = 0;

        const bank = this.checkBank(value);

        if (bank) {
            onFoundBank(bank);
            this.setState({ autoSelectedBank: bank, showBankInput: false });
        } else if (target.value && target.value.length >= 4) {
            this.setState({ autoSelectedBank: i18n('loan.general.enter-bank'), showBankInput: true });
        } else if (!target.value) {
            this.setState({ autoSelectedBank: '', showBankInput: false });
        }

        onChange(e);
    };

    onChangeBank = ({ target }) => {
        const { onFoundBank } = this.props;
        onFoundBank(target.value);
    };

    between = (x, min, max) => x >= min && x <= max;

    checkBank = clearing => {
        if (this.between(clearing, 6000, 6999)) return i18n('general.banks.handelsbanken');
        if (this.between(clearing, 1100, 1199)) return i18n('general.banks.nordea');
        if (this.between(clearing, 1401, 2099)) return i18n('general.banks.nordea');
        if (this.between(clearing, 3000, 3399)) return i18n('general.banks.nordea');
        if (this.between(clearing, 3410, 4999)) return i18n('general.banks.nordea');
        if (this.between(clearing, 5000, 5999)) return i18n('general.banks.seb');
        if (this.between(clearing, 9120, 9124)) return i18n('general.banks.seb');
        if (this.between(clearing, 9130, 9149)) return i18n('general.banks.seb');
        if (this.between(clearing, 7000, 7999)) return i18n('general.banks.swedbank');
        if (this.between(clearing, 8000, 8999)) return i18n('general.banks.swedbank');
        return '';
    };

    render() {
        const { className, onChange, ...rest } = this.props;
        const { autoSelectedBank, showBankInput, myBank } = this.state;

        const classes = classNames({
            'clearing-number-input': true,
            [className]: className,
        });

        return (
            <div className={classes}>
                <Input {...rest} onChange={this.onChangeClearing} />
                {autoSelectedBank && <div className="bank-label">{autoSelectedBank}</div>}
                {showBankInput && (
                    <Input
                        onBlur={this.onChangeBank}
                        value={myBank}
                        name="myBank"
                        placeholder={i18n('loan.general.bank')}
                        onChange={onChange}
                    />
                )}
            </div>
        );
    }
}

ClearingNumberInput.propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onFoundBank: PropTypes.func,
};

ClearingNumberInput.defaultProps = {
    className: '',
    onFoundBank: () => {},
};

export default ClearingNumberInput;
