/* eslint-disable react/no-danger */
/* dangerouslySetInnerHtml needed for links in i18n content */

import React from 'react';
import { getText as i18n } from '@ecster/ecster-i18n/lib/Translate';

const LoginHelp = () => {
    const header = i18n('home.login.help.header');
    const i18nBody = i18n('home.login.help.body', { returnObjects: true });
    const thisBody = {
        __html: Array.isArray(i18nBody) ? i18nBody.map(row => `<p>${row}</p>`).join('') : `<p>${i18nBody}</p>`,
    };

    return (
        <div className="login-help">
            <h1>{header}</h1>
            <div dangerouslySetInnerHTML={thisBody} />
        </div>
    );
};

export default LoginHelp;
