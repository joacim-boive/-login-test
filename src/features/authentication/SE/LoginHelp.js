/* eslint-disable react/no-danger */
/* dangerouslySetInnerHtml needed for links in i18n content */

import React from 'react';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

const LoginHelp = () => {
    const header = i18n('home.login.SE.help.header');
    const body = i18n('home.login.SE.help.body', { returnObjects: true, wrapper: { tag: 'p' } });

    return (
        <div className="login-help">
            <h1>{header}</h1>
            {body}
        </div>
    );
};

export default LoginHelp;
