import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HelpCallout } from './HelpCallout';

const NeedHelpCallout: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    supportEmail
  } = siteConfig.customFields as {
    supportEmail: string;
  };

  return (
    <HelpCallout title="Need more help?">
      Have a question or need assistance? Reach out via email at&nbsp;
      <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link>.
      We're here to help.
    </HelpCallout>
  );
};

export default NeedHelpCallout;