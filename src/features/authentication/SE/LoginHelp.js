import React from 'react';
import { Link } from '@ecster/ecster-components';
import './LoginHelp.scss';

// yes: hardcoded swedish is ok, it's a component located under .../SE/
const LoginHelp = () => (
    <div className="login-help-se">
        <h1>Behöver du hjälp med att logga in?</h1>

        <h2>Logga in med BankID</h2>

        <p>
            För att logga in på Ecster behöver du ett BankID. Använder du mobil eller surfplatta behöver du Mobilt
            BankID på den enhet du vill logga in med. Saknar du BankID? Kontakta din bank eller läs mer via länken
            nedan:
        </p>

        <p>
            <Link href="http://support.bankid.com" target="_blank" id="link-support-bankid-com">
                http://support.bankid.com
            </Link>
        </p>

        <h2>I inloggat läge finns flera bra tjänster</h2>

        <ul>
            <li>Ansök om Privatlån</li>
            <li>Se transaktioner och utnyttjad kredit</li>
            <li>Dela upp kortköp i efterhand</li>
            <li>Höj kreditgräns med svar direkt</li>
            <li>Aktivera kort</li>
        </ul>

        <p>
            <em>För att använda tjänsterna behöver du ett konto hos Ecster.</em>
        </p>

        <h2>Hantering av personuppgifter</h2>

        <p>
            Vi vill att du ska känna dig trygg när du lämnar dina personuppgifter till oss. Från den 25 maj 2018 gäller
            den nya dataskyddsförordningen (GDPR). Kortfattat handlar GDPR om att du har rätt att få reda på vilka
            personuppgifter vi har om dig och vad syftet med den informationen är. GDPR ersätter den svenska
            Personuppgiftslagen (PUL). Vill du veta mer om Ecster och GDPR, gå in på:
        </p>

        <p>
            <Link
                href="https://www.ecster.se/om-oss/hantering-av-personuppgifter"
                target="_blank"
                id="link-ecster-se-gdpr"
            >
                www.ecster.se/om-oss/hantering-av-personuppgifter
            </Link>
        </p>

        <h2>Vill du prata med oss?</h2>

        <p>
            Om du behöver hjälp med att logga in eller har andra frågor är du välkommen att ringa vår kundservice på{' '}
            <Link href="tel:+4687014667" underline={false} id="tel-link-call-customer-support">
                08 701 46 67
            </Link>
            , vardagar kl. 9–18.
        </p>
    </div>
);

export default LoginHelp;
