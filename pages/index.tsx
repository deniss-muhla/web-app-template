import Head from 'next/head';

const APP_NAME = 'next-pwa example';
const APP_DESCRIPTION = 'This is an example of using next-pwa plugin';

export default () => (
    <>
        <Head>
            <meta name="application-name" content={APP_NAME} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content={APP_NAME} />
            <meta name="description" content={APP_DESCRIPTION} />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover" />

            {/* BEGIN: Generated */}
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
            <link rel="manifest" href="/static/manifest.json" />
            <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/static/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/static/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
            {/* END: Generated */}

            <style>{`
                html, body, #__next {
                    height: 100%;
                }
                #__next {
                    margin: 0 auto;
                }
                h1 {
                    text-align: center;
                }
            `}</style>
        </Head>

        <div className="hero">
            <h1 className="title">Offline Next.js with Now 2.0</h1>
        </div>

        <style jsx>{`
            .hero {
                width: 100%;
                color: #333;
                text-align: center;
            }
            .title {
                font-family: sans-serif;
                margin: 0;
                width: 100%;
                padding-top: 80px;
                line-height: 1.15;
                font-size: 48px;
            }
            .row {
                max-width: 880px;
                margin: 80px auto 40px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
        `}</style>
    </>
);
