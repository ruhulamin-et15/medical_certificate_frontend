// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import ReduxProvider from "@/lib/provider/ReduxProvider";
// import Whatsapp from "@/components/ui/Whatsapp";
// // import PopupCard from "@/components/ui/PopupCard";
// // import Coupon from "@/components/homeModal/Coupon";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export const metadata: Metadata = {
//   title: "Medic Online -  UK Medical Certificates -  Sick Note Online",
//   description: "Medic Online -  UK Medical Certificates -  Sick Note Online",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} text-text antialiased !font-jost`}
//       >
//         <ReduxProvider>
//           <div>
//             {/* <Coupon />
//             <PopupCard /> */}
//             {children}
//             <Whatsapp />
//           </div>
//         </ReduxProvider>
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "@/lib/provider/ReduxProvider";
import Whatsapp from "@/components/ui/Whatsapp";
import Script from "next/script"; // ✅ Import Next.js Script

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Medic Online - UK Medical Certificates - Sick Note Online",
  description: "Medic Online - UK Medical Certificates - Sick Note Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager - Script (Head) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){ 
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'}); 
              var f=d.getElementsByTagName(s)[0], 
                  j=d.createElement(s), 
                  dl=l!='dataLayer'?'&l='+l:''; 
              j.async=true; 
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; 
              f.parentNode.insertBefore(j,f); 
            })(window,document,'script','dataLayer','GTM-N4NPS68M');
          `}
        </Script>

        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:5338698,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        />
        <Script
          id="google-tag-gtag"
          strategy="afterInteractive"
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16874810999"
        />

        {/* Inline script to initialize gtag */}
        <Script
          id="google-tag-gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16874810999');
          `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} text-text antialiased !font-jost`}
      >
        {/* ✅ Google Tag Manager - NoScript (For Noscript Browsers) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N4NPS68M"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ReduxProvider>
          <div>
            {children}
            <Whatsapp />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
