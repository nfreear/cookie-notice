
# CookieNotice changelog

← [README][]

Version History

## Version 2.0.0

 * _Date:  approx. June 2018_;
 * Move CSS from `style` attributes to `<style>` or `<link rel=stylesheet ... >`, Issue [#8][];
 * The following configuration options are __removed__ in this version:
   `buttonBgColor`, `buttonTextColor`, `noticeBgColor`, `noticeTextColor`, `linkColor`.

## Version 1.1.12

 * _Date:  approx. 4-30 June 2018_;
 * Add accessibility testing via [grunt-rsids-pa11y][] and [pa11y][], WCAG 2.0 AA, pull #6;
 * Accessibility fixes — colour contrast, button role, link target, link underline;
 * Accessibility fixes — express CSS font-size in `em` or `rem`, not `px`;
 * Add configuration option — `linkTarget` (default: '');
 * Edit the language used in the English translation;
 * Fix `browser` and `repository` fields in `package.json`;
 * Add `files` and `bugs` fields to `package.json`;
 * Add `engines` and `contributors` fields to `package.json`;
 * Add `live-server` to `peerDependencies` in `package.json`;
 * Remove Nick's email address from `README` & `bower.json` (!)

## Version 1.1.11

 * _Date:  30 May 2018_;
 * Add support for `data-cookie-notice` attribute on `<script>`, pull #5, Issue [#4][];
 * Document `data-` attribute in README;
 * Document _unpkg_ CDN in README;

## Version 1.1.10

 * _Date:  29 May 2018_;
 * Move jQuery to `devDependencies` for clarity, pull #2;
 * Point `tests/index.html` to local copies of jQuery and QUnit (was CDN);

## Version 1.1.9

 * _Date:  25 May 2018_;
 * Add Travis-CI testing to the project, pull #1;
 * Update test dependencies —
   jQuery from 2.x → 3.x; QUnit from 1.x → 2.x;
 * Add SVG badges for Travis-CI, NPMJS.com, etc. to `README.md`;

## Version 1.1.8

 * _Date:  25 May 2018_;

## Version 1.1.7

 * _Date:  25 April 2018_;

...

## Version 1.1.0

 * _Date:  24 April 2018_;
 * First release on [npm][];

## Version 1.0.0

 * _Date:  20 May 2015_;
 * Release by:  [@micc83][];
 * (Not on [npm][])

---

← [README][]

[readme]: https://github.com/AOEpeople/cookie-notice#readme
[npm]: https://www.npmjs.com/package/cookie-notice
[@micc83]: https://github.com/micc83/cookie-notice-js "Alessandro Benoit"
[#4]: https://github.com/AOEpeople/cookie-notice/issues/4
    "'data-cookie-notice' HTML attribute, other suggestions / wishlist"
[#8]: https://github.com/AOEpeople/cookie-notice/issues/8
    "Move styles to separate stylesheet, included via Javascript"
[a11y-fail]: https://travis-ci.org/nfreear/cookie-notice/jobs/387344672#L1217-L1235
[grunt-rsids-pa11y]: https://www.npmjs.com/package/grunt-rsids-pa11y
[pa11y]: http://pa11y.org/
