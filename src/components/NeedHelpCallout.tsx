import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HelpCallout } from './HelpCallout';

const NeedHelpCallout: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    supportEmail,
    supportDiscordUrl,
  } = siteConfig.customFields as {
    supportEmail: string;
    supportDiscordUrl: string;
  };

  return (
    <HelpCallout title="Need more help?">
      Have a question or need assistance? Join the&nbsp;
      <Link to={supportDiscordUrl} target="_blank" rel="noopener noreferrer">
        SmythOS Discord
      </Link>&nbsp;or reach out via email at&nbsp;
      <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link>.
      We're here to help.
    </HelpCallout>
  );
};

export default NeedHelpCallout;