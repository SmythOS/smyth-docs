import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer role="contentinfo" aria-label="Site footer">
      <div className="site-footer">
      <div className="footer-inner">
          <div className="social-links" aria-label="Social media links">
            <a
              href="https://www.facebook.com/smythos01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS Facebook page"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8817 7.8098v1.4585h2.7119l-.294 2.3286h-2.418V20H9.6725v-8.4031H8V9.2683h1.6723V7.5055c0-.8711-.0682-1.2844.316-1.9594.3845-.675 1.469-1.5672 3.3446-1.5457 1.8761.0222 2.667.196 2.667.196l-.4064 2.4817s-1.198-.3047-1.786-.196c-.5873.1085-.926.457-.926 1.3277z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/smyth_os/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS Instagram page"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4c-2.1727 0-2.4451.0092-3.2984.0481-.8515.0389-1.433.1741-1.9419.372-.526.2043-.9722.4779-1.417.9226-.4447.4448-.7183.891-.9227 1.417-.1978.5089-.333 1.0904-.3719 1.942C4.0092 9.5548 4 9.8272 4 12c0 2.1726.0092 2.445.0481 3.2983.0389.8515.1741 1.4331.372 1.9419.2043.5261.4779.9723.9226 1.417.4448.4447.891.7183 1.417.9228.5089.1977 1.0904.3329 1.942.3718C9.5548 19.9908 9.8272 20 12 20s2.4451-.0092 3.2984-.0481c.8515-.0389 1.433-.1741 1.9419-.3718.5261-.2045.9722-.4781 1.417-.9228.4447-.4447.7183-.8909.9228-1.417.1977-.5088.3329-1.0904.3718-1.9419.0389-.8533.0481-1.1257.0481-3.2983 0-2.1728-.0092-2.4452-.0481-3.2985-.0389-.8515-.1741-1.433-.3718-1.9419-.2045-.526-.4781-.9722-.9228-1.417-.4448-.4447-.8909-.7183-1.417-.9227-.5089-.1978-1.0904-.333-1.9419-.3719C14.4451 4.0092 14.1727 4 12 4Zm-2.6667 8.0001c0 1.4727 1.1939 2.6666 2.6667 2.6666s2.6667-1.1939 2.6667-2.6666c0-1.4729-1.1939-2.6668-2.6667-2.6668s-2.6667 1.1939-2.6667 2.6668zm-1.4414 0c0-2.269 1.8392-4.1082 4.1081-4.1082 2.2689 0 4.1081 1.8393 4.1081 4.1082 0 2.2687-1.8392 4.108-4.1081 4.108-2.2689 0-4.1081-1.8393-4.1081-4.108zm8.3785-3.3105c.5303 0 .9601-.4298.9601-.96s-.4298-.96-.9601-.96c-.5301 0-.96.4298-.96.96s.4299.96.96.96z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">Instagram</span>
            </a>
            <a
              href="https://github.com/SmythOS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS GitHub page"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 4c4.4184 0 8 3.672 8 8.2023 0 3.6232-2.2896 6.6969-5.4664 7.7825-.4056.0808-.5496-.1754-.5496-.3938 0-.2704.0096-1.1536.0096-2.2512 0-.7648-.256-1.264-.5432-1.5183 1.7816-.2032 3.6536-.897 3.6536-4.0473 0-.896-.3104-1.6271-.824-2.2016.0832-.2072.3576-1.0415-.0784-2.171 0 0-.6704-.2198-2.1976.841-.6392-.1816-1.324-.273-2.004-.2762-.68.0032-1.364.0946-2.0024.2762-1.5288-1.0608-2.2008-.841-2.2008-.841-.4344 1.1295-.16 1.9638-.0776 2.171-.5112.5745-.824 1.3056-.824 2.2016 0 3.1424 1.868 3.8467 3.6448 4.0539-.2288.2048-.436.566-.508 1.0965-.456.2096-1.6144.5724-2.328-.6812 0 0-.4232-.7881-1.2264-.8457 0 0-.78-.0104-.0544.4984 0 0 .524.252.888 1.2 0 0 .4696 1.464 2.6952.968.004.6856.0112 1.3317.0112 1.5269 0 .2168-.1472.4705-.5464.3945C6.292 18.9015 4 15.8263 4 12.2023 4 7.6719 7.5824 4 12 4Z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">GitHub</span>
            </a>
            <a
              href="https://www.youtube.com/@Smyth_OS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS YouTube channel"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.9884 14.5863V8.974c1.9922.9375 3.5352 1.8432 5.3601 2.8196-1.5052.8348-3.3679 1.7714-5.36 2.7927zM21.091 6.1828c-.3436-.4528-.9294-.8053-1.5529-.922-1.8328-.348-13.2671-.349-15.099 0-.5.0938-.9453.3204-1.3278.6725-1.6117 1.496-1.1066 9.5187-.7181 10.8182.1633.5625.3745.9682.6405 1.2345.3426.3521.8118.5945 1.3507.7032 1.509.3122 9.2836.4867 15.1218.047a2.6202 2.6202 0 0 0 1.3896-.711c1.4901-1.4902 1.3885-9.9634.1952-11.8424z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">YouTube</span>
            </a>
            <a
              href="https://x.com/Smyth_OS"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS X (formerly Twitter) page"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.4265 10.8177 19.0103 4.28h-1.3234l-4.8471 5.6764L8.9666 4.28H4.5l5.8562 8.5846L4.5 19.72h1.3234l5.1195-5.9952 4.0905 5.9952H19.5Zm-1.8119 2.122-.5934-.8548-4.7213-6.8013h2.0325l3.8093 5.489.5934.8546 4.9529 7.1355h-2.0326z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">X (Twitter)</span>
            </a>
            <a
              href="https://www.linkedin.com/company/smythos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SmythOS LinkedIn page"
            >
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5619 5.7252c-.0239-1.0825-.798-1.907-2.0551-1.907-1.257 0-2.079.8245-2.079 1.907 0 1.0602.7976 1.9084 2.0313 1.9084h.0235c1.2813 0 2.0793-.8482 2.0793-1.9084zM7.3198 9.1407H3.6452v11.0408h3.6746zM16.3412 8.8814c2.4181 0 4.231 1.5783 4.231 4.9696l-.0003 6.3305h-3.6745v-5.9069c0-1.4836-.5317-2.496-1.862-2.496-1.0152 0-1.6199.6825-1.8855 1.3417-.097.2362-.121.5654-.121.8954v6.1661H9.354s.0484-10.0048 0-11.0408h3.675v1.5638c.4877-.7517 1.3612-1.8234 3.3123-1.8234z" fill="currentColor" />
              </svg>
              <span className="screen-reader-text">LinkedIn</span>
            </a>
          </div>
          
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
          <div className="company-info" aria-label="Company contact information">
        <span className="company-address">
          SmythOS,&nbsp;an&nbsp;INK&nbsp;Content, Inc.&nbsp;company,
          1321&nbsp;Upland&nbsp;Dr&nbsp;1036, Houston,&nbsp;Texas&nbsp;77043
        </span>
        <span className="separator" aria-hidden="true">
          {" "}
          |{" "}
        </span>
        <span className="company-phone">
          Phone:{" "}
          <a
            href="tel:+14176984671"
            aria-label="Call SmythOS at +1 417-698-4671"
          >
            +1 417-698-4671
          </a>
        </span>
      </div>
      <div className="service-mark-info" aria-label="Service mark information">
        SmythOS® is a registered service mark.
      </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
