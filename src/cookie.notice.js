/**
 * Cookie Notice JS
 * @author Alessandro Benoit
 */
(function () {

    "use strict";

    /**
     * Store current instance
     */
    var instance;
    // originPaddingTop;

    /**
     * Defaults values
     * @type object
     */
    var defaults = {
        'messageLocales': {
            'it': 'Utilizziamo i cookie per essere sicuri che tu possa avere la migliore esperienza sul nostro sito. Se continui ad utilizzare questo sito assumiamo che tu ne sia felice.',
            'en': 'We use cookies to ensure that you have the best experience on our website. If you continue to use this site we assume that you accept this.',
            'de': 'Wir verwenden Cookies um sicherzustellen dass Sie das beste Erlebnis auf unserer Website haben.',
            'fr': 'Nous utilisons des cookies afin d\'être sûr que vous pouvez avoir la meilleure expérience sur notre site. Si vous continuez à utiliser ce site, nous supposons que vous acceptez.'
        },

        'cookieNoticePosition': 'bottom',

        'learnMoreLinkEnabled': false,

        'learnMoreLinkHref': '/cookie-banner-information.html',

        'learnMoreLinkText': {
            'it': 'Saperne di più',
            'en': 'Learn more',
            'de': 'Mehr erfahren',
            'fr': 'En savoir plus'
        },

        'buttonLocales': {
            'en': 'OK'
        },

        'expiresIn': 30,

        /* DEPRECATED. No longer needed!
        'buttonBgColor': '#ca5000', // Accessibility contrast fix (Was: '#d35400') (WCAG2AAA: '#983c00').
        'buttonTextColor': '#fff',
        'noticeBgColor': '#000',
        'noticeTextColor': '#fff',
        'linkColor': '#009fdd',
        END DEPRECATED. */

        'styleLinkHref': '/../../dist/cookie.notice.css',
        'scriptSelector': 'script[ src *= "cookie.notice." ]',

        'linkTarget': '', // Accessibility fix (Was: '_blank').
        'debug': false
    };

    /**
     * Initialize cookie notice on DOMContentLoaded
     * if not already initialized with alt params
     */
    document.addEventListener('DOMContentLoaded', function () {
        if (!instance) {
            new cookieNoticeJS();
        }
    });

    /**
     * Constructor
     * @constructor
     */
    window.cookieNoticeJS = function () {

        // If an instance is already set stop here
        if (instance !== undefined) {
            return;
        }

        // Set current instance
        instance = this;

        // If cookies are not supported or notice cookie is already set
        if (getNoticeCookie()) {
            return;
        }

        // 'data-' attribute - data-cookie-notice='{ "key": "value", ... }'
        var elemCfg = document.querySelector('script[ data-cookie-notice ]');
        var config;
        try {
            config = elemCfg ? JSON.parse(elemCfg.getAttribute('data-cookie-notice')) : {};
        } catch (ex) {
            console.error('data-cookie-notice JSON error:', elemCfg, ex);
            config = {};
        }

        // Extend default params
        var params = extendDefaults(defaults, arguments[0] || config || {});

        if (params.debug) {
            console.warn('cookie-notice:', params);
        }

        addStylesheetLink(params.styleLinkHref, params.scriptSelector);

        // Get current locale for notice text
        var noticeText = getStringForCurrentLocale(params.messageLocales);

        // Create notice
        var notice = createNotice(noticeText, params.cookieNoticePosition);

        var learnMoreLink;

        if (params.learnMoreLinkEnabled) {
            var learnMoreLinkText = getStringForCurrentLocale(params.learnMoreLinkText);

            learnMoreLink = createLearnMoreLink(learnMoreLinkText, params.learnMoreLinkHref, params.linkTarget);
        }

        // Get current locale for button text
        var buttonText = getStringForCurrentLocale(params.buttonLocales);

        // Create dismiss button
        var dismissButton = createDismissButton(buttonText);

        // Dismiss button click event
        dismissButton.addEventListener('click', function (e) {
            e.preventDefault();
            setDismissNoticeCookie(parseInt(params.expiresIn + "", 10) * 60 * 1000 * 60 * 24);
            fadeElementOut(notice);
        });

        // Append notice to the DOM
        var noticeDomElement = document.body.appendChild(notice);

        if (!!learnMoreLink) {
            noticeDomElement.appendChild(learnMoreLink);
        }

        noticeDomElement.appendChild(dismissButton);
    };

    /**
     * Get the string for the current locale
     * and fallback to "en" if none provided
     * @param locales
     * @returns {*}
     */
    function getStringForCurrentLocale(locales) {
        var locale = (navigator.userLanguage || navigator.language).substr(0, 2);
        return (locales[locale]) ? locales[locale] : locales['en'];
    }

    /**
     * Test if notice cookie is there
     * @returns {boolean}
     */
    function getNoticeCookie() {
        return document.cookie.indexOf('cookie_notice') != -1;
    }

    /**
     * Create notice
     * @param message
     * @param position
     * @returns {HTMLElement}
     */
    function createNotice(message, position) {

        var notice = document.createElement('div');
        /* var lineHeight = 2, // Was: 28 (px).
            paddingBottomTop = 10,
            fontSize = lineHeight / 2.333,
            noticeHeight = lineHeight + paddingBottomTop * 2; */

        notice.innerHTML = message + '&nbsp;';
        notice.setAttribute('id', 'cookieNotice');
        notice.setAttribute('data-test-section', 'cookie-notice');
        notice.setAttribute('data-test-transitioning', 'false');

        notice.className = 'cookie-notice-js ';

        notice.className += (position === 'top') ? 'top' : 'bottom';

        if (position === 'top') {
            var bodyDOMElement = document.querySelector('body');

            bodyDOMElement.className += ' cookie-notice-js-body-top';

            // originPaddingTop = bodyDOMElement.style.paddingTop;
        }

        return notice;
    }

    /**
     * Create dismiss button
     * @param message
     * @returns {HTMLElement}
     */
    function createDismissButton(message) {

        var dismissButton = document.createElement('a');

        // Dismiss button
        dismissButton.href = '#';
        dismissButton.innerHTML = message;

        dismissButton.setAttribute('role', 'button'); // Accessibility fix.
        dismissButton.className = 'confirm';

        dismissButton.setAttribute('data-test-action', 'dismiss-cookie-notice');

        return dismissButton;
    }

    /**
     * Create the 'learn more' link
     *
     * @param learnMoreLinkText
     * @param learnMoreLinkHref
     * @param linkTarget
     * @returns {HTMLElement}
     */
    function createLearnMoreLink(learnMoreLinkText, learnMoreLinkHref, linkTarget) {

        var learnMoreLink = document.createElement('a');

        learnMoreLink.href = learnMoreLinkHref;
        learnMoreLink.textContent = learnMoreLinkText;
        learnMoreLink.target = linkTarget;
        learnMoreLink.className = 'learn-more';
        learnMoreLink.setAttribute('data-test-action', 'learn-more-link');

        return learnMoreLink;
    }

    /**
     * Set sismiss notice cookie
     * @param expireIn
     */
    function setDismissNoticeCookie(expireIn) {
        var now = new Date(),
            cookieExpire = new Date();

        cookieExpire.setTime(now.getTime() + expireIn);
        document.cookie = "cookie_notice=1; expires=" + cookieExpire.toUTCString() + "; path=/;";
    }

    /**
     * Fade a given element out
     * @param element
     */
    function fadeElementOut(element) {
        element.style.opacity = 1;

        element.setAttribute('data-test-transitioning', 'true');

        (function fade() {
            if ((element.style.opacity -= .1) < 0.01) {

                /* if (originPaddingTop !== undefined) {
                    var bodyDOMElement = document.querySelector('body');
                    bodyDOMElement.style.paddingTop = originPaddingTop;
                } */

                document.body.removeChild(element);
            } else {
                setTimeout(fade, 40);
            }
        })();
    }

    /**
     * Utility method to extend defaults with user options
     * @param source
     * @param properties
     * @returns {*}
     */
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (typeof source[property] === 'object') {
                    source[property] = extendDefaults(source[property], properties[property]);
                } else {
                    source[property] = properties[property];
                }
            }
        }
        return source;
    }

    /**
     * Method to add a stylesheet <link> to the page.
     * @param styleUrl
     * @param scriptSelector
     */
    function addStylesheetLink(styleUrl, scriptSelector) {
        if (!styleUrl) return;

        // Assume the Javascript and stylesheet are on a different domain to the page (e.g. CDN).
        var styleLink = document.createElement('link');
        var script = document.querySelector(scriptSelector);
        var href = (script ? script.src : '') + styleUrl;

        styleLink.rel = 'stylesheet';
        styleLink.type = 'text/css';
        styleLink.href = href;

        document.head.appendChild(styleLink);
    }

    /* test-code */
    cookieNoticeJS.extendDefaults = extendDefaults;
    cookieNoticeJS.clearInstance = function () {
        instance = undefined;
    };
    /* end-test-code */

}());
