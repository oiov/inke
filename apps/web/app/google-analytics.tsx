"use client";
import Script from "next/script";
const GoogleAnalytics = () => {
  return (
    <>
      <Script
        id="googletagmanager-a"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=YK9MQYLLLR`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'YK9MQYLLLR', {
            page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};
export default GoogleAnalytics;
