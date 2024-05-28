/* To avAdminid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = "<span style="font-family: \"themify\"">" + entity + "</span>" + html;
	}
	var icons = {
		"ti-wand": "&#xe600;",
		"ti-volume": "&#xe601;",
		"ti-user": "&#xe602;",
		"ti-unlock": "&#xe603;",
		"ti-unlink": "&#xe604;",
		"ti-trash": "&#xe605;",
		"ti-thought": "&#xe606;",
		"ti-target": "&#xe607;",
		"ti-tag": "&#xe608;",
		"ti-tablet": "&#xe609;",
		"ti-star": "&#xe60a;",
		"ti-spray": "&#xe60b;",
		"ti-signal": "&#xe60c;",
		"ti-shopping-cart": "&#xe60d;",
		"ti-shopping-cart-full": "&#xe60e;",
		"ti-settings": "&#xe60f;",
		"ti-search": "&#xe610;",
		"ti-zoom-in": "&#xe611;",
		"ti-zoom-out": "&#xe612;",
		"ti-cut": "&#xe613;",
		"ti-ruler": "&#xe614;",
		"ti-ruler-pencil": "&#xe615;",
		"ti-ruler-alt": "&#xe616;",
		"ti-bookmark": "&#xe617;",
		"ti-bookmark-alt": "&#xe618;",
		"ti-reload": "&#xe619;",
		"ti-plus": "&#xe61a;",
		"ti-pin": "&#xe61b;",
		"ti-pencil": "&#xe61c;",
		"ti-pencil-alt": "&#xe61d;",
		"ti-paint-roller": "&#xe61e;",
		"ti-paint-bucket": "&#xe61f;",
		"ti-na": "&#xe620;",
		"ti-mobile": "&#xe621;",
		"ti-minus": "&#xe622;",
		"ti-medall": "&#xe623;",
		"ti-medall-alt": "&#xe624;",
		"ti-marker": "&#xe625;",
		"ti-marker-alt": "&#xe626;",
		"ti-arrow-up": "&#xe627;",
		"ti-arrow-right": "&#xe628;",
		"ti-arrow-left": "&#xe629;",
		"ti-arrow-down": "&#xe62a;",
		"ti-lock": "&#xe62b;",
		"ti-location-arrow": "&#xe62c;",
		"ti-link": "&#xe62d;",
		"ti-layout": "&#xe62e;",
		"ti-layers": "&#xe62f;",
		"ti-layers-alt": "&#xe630;",
		"ti-key": "&#xe631;",
		"ti-import": "&#xe632;",
		"ti-image": "&#xe633;",
		"ti-heart": "&#xe634;",
		"ti-heart-broken": "&#xe635;",
		"ti-hand-stop": "&#xe636;",
		"ti-hand-open": "&#xe637;",
		"ti-hand-drag": "&#xe638;",
		"ti-folder": "&#xe639;",
		"ti-flag": "&#xe63a;",
		"ti-flag-alt": "&#xe63b;",
		"ti-flag-alt-2": "&#xe63c;",
		"ti-eye": "&#xe63d;",
		"ti-export": "&#xe63e;",
		"ti-exchange-vertical": "&#xe63f;",
		"ti-desktop": "&#xe640;",
		"ti-cup": "&#xe641;",
		"ti-crown": "&#xe642;",
		"ti-comments": "&#xe643;",
		"ti-comment": "&#xe644;",
		"ti-comment-alt": "&#xe645;",
		"ti-close": "&#xe646;",
		"ti-clip": "&#xe647;",
		"ti-angle-up": "&#xe648;",
		"ti-angle-right": "&#xe649;",
		"ti-angle-left": "&#xe64a;",
		"ti-angle-down": "&#xe64b;",
		"ti-check": "&#xe64c;",
		"ti-check-box": "&#xe64d;",
		"ti-camera": "&#xe64e;",
		"ti-announcement": "&#xe64f;",
		"ti-brush": "&#xe650;",
		"ti-briefcase": "&#xe651;",
		"ti-bolt": "&#xe652;",
		"ti-bolt-alt": "&#xe653;",
		"ti-blackboard": "&#xe654;",
		"ti-bag": "&#xe655;",
		"ti-move": "&#xe656;",
		"ti-arrows-vertical": "&#xe657;",
		"ti-arrows-horizontal": "&#xe658;",
		"ti-fullscreen": "&#xe659;",
		"ti-arrow-top-right": "&#xe65a;",
		"ti-arrow-top-left": "&#xe65b;",
		"ti-arrow-circle-up": "&#xe65c;",
		"ti-arrow-circle-right": "&#xe65d;",
		"ti-arrow-circle-left": "&#xe65e;",
		"ti-arrow-circle-down": "&#xe65f;",
		"ti-angle-double-up": "&#xe660;",
		"ti-angle-double-right": "&#xe661;",
		"ti-angle-double-left": "&#xe662;",
		"ti-angle-double-down": "&#xe663;",
		"ti-zip": "&#xe664;",
		"ti-world": "&#xe665;",
		"ti-wheelchair": "&#xe666;",
		"ti-view-list": "&#xe667;",
		"ti-view-list-alt": "&#xe668;",
		"ti-view-grid": "&#xe669;",
		"ti-uppercase": "&#xe66a;",
		"ti-upload": "&#xe66b;",
		"ti-underline": "&#xe66c;",
		"ti-truck": "&#xe66d;",
		"ti-timer": "&#xe66e;",
		"ti-ticket": "&#xe66f;",
		"ti-thumb-up": "&#xe670;",
		"ti-thumb-down": "&#xe671;",
		"ti-text": "&#xe672;",
		"ti-stats-up": "&#xe673;",
		"ti-stats-down": "&#xe674;",
		"ti-split-v": "&#xe675;",
		"ti-split-h": "&#xe676;",
		"ti-smallcap": "&#xe677;",
		"ti-shine": "&#xe678;",
		"ti-shift-right": "&#xe679;",
		"ti-shift-left": "&#xe67a;",
		"ti-shield": "&#xe67b;",
		"ti-notepad": "&#xe67c;",
		"ti-server": "&#xe67d;",
		"ti-quote-right": "&#xe67e;",
		"ti-quote-left": "&#xe67f;",
		"ti-pulse": "&#xe680;",
		"ti-printer": "&#xe681;",
		"ti-power-off": "&#xe682;",
		"ti-plug": "&#xe683;",
		"ti-pie-chart": "&#xe684;",
		"ti-paragraph": "&#xe685;",
		"ti-panel": "&#xe686;",
		"ti-package": "&#xe687;",
		"ti-music": "&#xe688;",
		"ti-music-alt": "&#xe689;",
		"ti-mouse": "&#xe68a;",
		"ti-mouse-alt": "&#xe68b;",
		"ti-money": "&#xe68c;",
		"ti-microphone": "&#xe68d;",
		"ti-menu": "&#xe68e;",
		"ti-menu-alt": "&#xe68f;",
		"ti-map": "&#xe690;",
		"ti-map-alt": "&#xe691;",
		"ti-loop": "&#xe692;",
		"ti-location-pin": "&#xe693;",
		"ti-list": "&#xe694;",
		"ti-light-bulb": "&#xe695;",
		"ti-Italic": "&#xe696;",
		"ti-info": "&#xe697;",
		"ti-infinite": "&#xe698;",
		"ti-id-badge": "&#xe699;",
		"ti-hummer": "&#xe69a;",
		"ti-home": "&#xe69b;",
		"ti-help": "&#xe69c;",
		"ti-headphone": "&#xe69d;",
		"ti-harddrives": "&#xe69e;",
		"ti-harddrive": "&#xe69f;",
		"ti-gift": "&#xe6a0;",
		"ti-game": "&#xe6a1;",
		"ti-filter": "&#xe6a2;",
		"ti-files": "&#xe6a3;",
		"ti-file": "&#xe6a4;",
		"ti-eraser": "&#xe6a5;",
		"ti-envelope": "&#xe6a6;",
		"ti-download": "&#xe6a7;",
		"ti-direction": "&#xe6a8;",
		"ti-direction-alt": "&#xe6a9;",
		"ti-dashboard": "&#xe6aa;",
		"ti-control-stop": "&#xe6ab;",
		"ti-control-shuffle": "&#xe6ac;",
		"ti-control-play": "&#xe6ad;",
		"ti-control-pause": "&#xe6ae;",
		"ti-control-forward": "&#xe6af;",
		"ti-control-backward": "&#xe6b0;",
		"ti-cloud": "&#xe6b1;",
		"ti-cloud-up": "&#xe6b2;",
		"ti-cloud-down": "&#xe6b3;",
		"ti-clipboard": "&#xe6b4;",
		"ti-car": "&#xe6b5;",
		"ti-calendar": "&#xe6b6;",
		"ti-book": "&#xe6b7;",
		"ti-bell": "&#xe6b8;",
		"ti-basketball": "&#xe6b9;",
		"ti-bar-chart": "&#xe6ba;",
		"ti-bar-chart-alt": "&#xe6bb;",
		"ti-back-right": "&#xe6bc;",
		"ti-back-left": "&#xe6bd;",
		"ti-arrows-corner": "&#xe6be;",
		"ti-archive": "&#xe6bf;",
		"ti-anchor": "&#xe6c0;",
		"ti-align-right": "&#xe6c1;",
		"ti-align-left": "&#xe6c2;",
		"ti-align-justify": "&#xe6c3;",
		"ti-align-center": "&#xe6c4;",
		"ti-alert": "&#xe6c5;",
		"ti-alarm-clock": "&#xe6c6;",
		"ti-agenda": "&#xe6c7;",
		"ti-write": "&#xe6c8;",
		"ti-window": "&#xe6c9;",
		"ti-widgetized": "&#xe6ca;",
		"ti-widget": "&#xe6cb;",
		"ti-widget-alt": "&#xe6cc;",
		"ti-wallet": "&#xe6cd;",
		"ti-video-clapper": "&#xe6ce;",
		"ti-video-camera": "&#xe6cf;",
		"ti-vector": "&#xe6d0;",
		"ti-themify-logo": "&#xe6d1;",
		"ti-themify-favicon": "&#xe6d2;",
		"ti-themify-favicon-alt": "&#xe6d3;",
		"ti-support": "&#xe6d4;",
		"ti-stamp": "&#xe6d5;",
		"ti-split-v-alt": "&#xe6d6;",
		"ti-slice": "&#xe6d7;",
		"ti-shortcode": "&#xe6d8;",
		"ti-shift-right-alt": "&#xe6d9;",
		"ti-shift-left-alt": "&#xe6da;",
		"ti-ruler-alt-2": "&#xe6db;",
		"ti-receipt": "&#xe6dc;",
		"ti-pin2": "&#xe6dd;",
		"ti-pin-alt": "&#xe6de;",
		"ti-pencil-alt2": "&#xe6df;",
		"ti-palette": "&#xe6e0;",
		"ti-more": "&#xe6e1;",
		"ti-more-alt": "&#xe6e2;",
		"ti-microphone-alt": "&#xe6e3;",
		"ti-magnet": "&#xe6e4;",
		"ti-line-double": "&#xe6e5;",
		"ti-line-dotted": "&#xe6e6;",
		"ti-line-dashed": "&#xe6e7;",
		"ti-layout-width-full": "&#xe6e8;",
		"ti-layout-width-default": "&#xe6e9;",
		"ti-layout-width-default-alt": "&#xe6ea;",
		"ti-layout-tab": "&#xe6eb;",
		"ti-layout-tab-window": "&#xe6ec;",
		"ti-layout-tab-v": "&#xe6ed;",
		"ti-layout-tab-min": "&#xe6ee;",
		"ti-layout-slider": "&#xe6ef;",
		"ti-layout-slider-alt": "&#xe6f0;",
		"ti-layout-sidebar-right": "&#xe6f1;",
		"ti-layout-sidebar-none": "&#xe6f2;",
		"ti-layout-sidebar-left": "&#xe6f3;",
		"ti-layout-placeholder": "&#xe6f4;",
		"ti-layout-menu": "&#xe6f5;",
		"ti-layout-menu-v": "&#xe6f6;",
		"ti-layout-menu-separated": "&#xe6f7;",
		"ti-layout-menu-full": "&#xe6f8;",
		"ti-layout-media-right-alt": "&#xe6f9;",
		"ti-layout-media-right": "&#xe6fa;",
		"ti-layout-media-overlay": "&#xe6fb;",
		"ti-layout-media-overlay-alt": "&#xe6fc;",
		"ti-layout-media-overlay-alt-2": "&#xe6fd;",
		"ti-layout-media-left-alt": "&#xe6fe;",
		"ti-layout-media-left": "&#xe6ff;",
		"ti-layout-media-center-alt": "&#xe700;",
		"ti-layout-media-center": "&#xe701;",
		"ti-layout-list-thumb": "&#xe702;",
		"ti-layout-list-thumb-alt": "&#xe703;",
		"ti-layout-list-post": "&#xe704;",
		"ti-layout-list-large-image": "&#xe705;",
		"ti-layout-line-solid": "&#xe706;",
		"ti-layout-grid4": "&#xe707;",
		"ti-layout-grid3": "&#xe708;",
		"ti-layout-grid2": "&#xe709;",
		"ti-layout-grid2-thumb": "&#xe70a;",
		"ti-layout-cta-right": "&#xe70b;",
		"ti-layout-cta-left": "&#xe70c;",
		"ti-layout-cta-center": "&#xe70d;",
		"ti-layout-cta-btn-right": "&#xe70e;",
		"ti-layout-cta-btn-left": "&#xe70f;",
		"ti-layout-column4": "&#xe710;",
		"ti-layout-column3": "&#xe711;",
		"ti-layout-column2": "&#xe712;",
		"ti-layout-accordion-separated": "&#xe713;",
		"ti-layout-accordion-merged": "&#xe714;",
		"ti-layout-accordion-list": "&#xe715;",
		"ti-ink-pen": "&#xe716;",
		"ti-info-alt": "&#xe717;",
		"ti-help-alt": "&#xe718;",
		"ti-headphone-alt": "&#xe719;",
		"ti-hand-point-up": "&#xe71a;",
		"ti-hand-point-right": "&#xe71b;",
		"ti-hand-point-left": "&#xe71c;",
		"ti-hand-point-down": "&#xe71d;",
		"ti-gallery": "&#xe71e;",
		"ti-face-smile": "&#xe71f;",
		"ti-face-sad": "&#xe720;",
		"ti-credit-card": "&#xe721;",
		"ti-control-skip-forward": "&#xe722;",
		"ti-control-skip-backward": "&#xe723;",
		"ti-control-record": "&#xe724;",
		"ti-control-eject": "&#xe725;",
		"ti-comments-smiley": "&#xe726;",
		"ti-brush-alt": "&#xe727;",
		"ti-youtube": "&#xe728;",
		"ti-vimeo": "&#xe729;",
		"ti-twitter": "&#xe72a;",
		"ti-time": "&#xe72b;",
		"ti-tumblr": "&#xe72c;",
		"ti-skype": "&#xe72d;",
		"ti-share": "&#xe72e;",
		"ti-share-alt": "&#xe72f;",
		"ti-rocket": "&#xe730;",
		"ti-pinterest": "&#xe731;",
		"ti-new-window": "&#xe732;",
		"ti-microsoft": "&#xe733;",
		"ti-list-ol": "&#xe734;",
		"ti-linkedin": "&#xe735;",
		"ti-layout-sidebar-2": "&#xe736;",
		"ti-layout-grid4-alt": "&#xe737;",
		"ti-layout-grid3-alt": "&#xe738;",
		"ti-layout-grid2-alt": "&#xe739;",
		"ti-layout-column4-alt": "&#xe73a;",
		"ti-layout-column3-alt": "&#xe73b;",
		"ti-layout-column2-alt": "&#xe73c;",
		"ti-instagram": "&#xe73d;",
		"ti-google": "&#xe73e;",
		"ti-github": "&#xe73f;",
		"ti-flickr": "&#xe740;",
		"ti-facebook": "&#xe741;",
		"ti-dropbox": "&#xe742;",
		"ti-dribbble": "&#xe743;",
		"ti-apple": "&#xe744;",
		"ti-andrAdminid": "&#xe745;",
		"ti-save": "&#xe746;",
		"ti-save-alt": "&#xe747;",
		"ti-yahoo": "&#xe748;",
		"ti-wordpress": "&#xe749;",
		"ti-vimeo-alt": "&#xe74a;",
		"ti-twitter-alt": "&#xe74b;",
		"ti-tumblr-alt": "&#xe74c;",
		"ti-trello": "&#xe74d;",
		"ti-stack-overflow": "&#xe74e;",
		"ti-soundcloud": "&#xe74f;",
		"ti-sharethis": "&#xe750;",
		"ti-sharethis-alt": "&#xe751;",
		"ti-reddit": "&#xe752;",
		"ti-pinterest-alt": "&#xe753;",
		"ti-microsoft-alt": "&#xe754;",
		"ti-linux": "&#xe755;",
		"ti-jsfiddle": "&#xe756;",
		"ti-joomla": "&#xe757;",
		"ti-html5": "&#xe758;",
		"ti-flickr-alt": "&#xe759;",
		"ti-email": "&#xe75a;",
		"ti-drupal": "&#xe75b;",
		"ti-dropbox-alt": "&#xe75c;",
		"ti-css3": "&#xe75d;",
		"ti-rss": "&#xe75e;",
		"ti-rss-alt": "&#xe75f;",
		"0": 0
		},
		els = document.getElementsByTagName("*"),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/ti-[^\s""]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
