import React from 'react';
import { Panel } from '@ecster/ecster-components';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

import diamond from '../../../common/images/icon-diamond.svg';

import './UnderConstruction.scss';

const UnderConstruction = () => (
    <Panel className="under-construction" withMixedContent centeredContent sideMarginsInMobile>
        <div className="mixed-content">
            <img src={diamond} className="mb-6x" />
            <h2 className="e-black mb-3x">{i18n('common.under-construction.header')}</h2>
            <p>{i18n('common.under-construction.info')}</p>
        </div>
    </Panel>
);

export default UnderConstruction;
