import React from 'react';
import Head from '@docusaurus/Head';

export default function Footer() {
// const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Performance hints for external resources */}
      <Head>
        <link rel="preconnect" href="https://www.linkedin.com" />
      </Head>

      <footer role="contentinfo" aria-label="Site footer">
        <div className="site-footer">
          <div className="footer-inner">
            {/* Social links */}
            <div className="social-links" aria-label="Social media links">
              <a
                href="https://www.linkedin.com/company/smythos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                {/* LinkedIn icon */}
                <svg
                  width={25}
                  height={25}
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M7.44043 5.92385C7.44017 6.45428 7.2292 6.96289 6.85394 7.33777C6.47868 7.71266 5.96986 7.92312 5.43943 7.92285C4.909 7.92259 4.40039 7.71162 4.02551 7.33636C3.65062 6.9611 3.44016 6.45228 3.44043 5.92185C3.4407 5.39142 3.65166 4.88282 4.02692 4.50793C4.40218 4.13305 4.911 3.92259 5.44143 3.92285C5.97186 3.92312 6.48047 4.13408 6.85535 4.50935C7.23024 4.88461 7.4407 5.39342 7.44043 5.92385ZM7.50043 9.40385H3.50043V21.9239H7.50043V9.40385ZM13.8204 9.40385H9.84043V21.9239H13.7804V15.3539C13.7804 11.6939 18.5504 11.3539 18.5504 15.3539V21.9239H22.5004V13.9939C22.5004 7.82385 15.4404 8.05385 13.7804 11.0839L13.8204 9.40385Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            {/* Footer links */}
            <div className="footer-menu">
              <nav aria-label="Footer navigation">
                <ul>
                  <li><a href="/agency/">Agencies</a></li>
                  <li><a href="/enterprise/">Enterprise</a></li>
                  <li><a href="/about-us/">About Us</a></li>
                  <li><a href="/templates/">AI Agent Templates</a></li>
                  <li><a href="/resources/">Resources</a></li>
                  <li><a href="/legal/privacy-policy/">Privacy Policy</a></li>
                  <li><a href="/legal/">Legal</a></li>
                  <li><a href="/blog/">Blog</a></li>
                </ul>
              </nav>
            </div>

            {/* Company info */}
            <address className="company-info" aria-label="Company contact information">
              <span className="company-address">
                SmythOS,&nbsp;an&nbsp;INK&nbsp;Content, Inc.&nbsp;company,
                1321&nbsp;Upland&nbsp;Dr&nbsp;1036, Houston,&nbsp;Texas&nbsp;77043
              </span>
              <span className="separator" aria-hidden="true"> | </span>
              <span className="company-phone">
                Phone:{' '}
                <a href="tel:+14176984671" aria-label="Call SmythOS at +1 417-698-4671">
                  +1 417-698-4671
                </a>
              </span>
            </address>

            {/* Copyright
            <div className="copyright">
              © {currentYear} SmythOS
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}