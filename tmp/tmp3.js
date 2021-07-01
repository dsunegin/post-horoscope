import {
    PolymerElement as e,
    html$1 as t,
    scroll as a,
    Debouncer as n,
    timeOut as r,
    radioList as i
} from "./news-app.js";

class o extends e {
    static get template() {
        return t`<style include="app-grid-style">:host{display:block}[hidden]{display:none!important}.container .fade-in{opacity:0}.container[fade-in] .fade-in{opacity:1;transition:opacity .5s}.content{@apply --layout-flex;}aside{background:#000}aside ul{margin:0;padding:0}li{display:block}h3{@apply --app-sub-section-headline;margin:24px 0}.app-grid{margin:0;padding:0}.app-grid a{margin:0;-webkit-flex-basis:50%;flex-basis:50%;max-width:50%;display:block;text-decoration:none;text-wrap:none;text-align:center}paper-button{width:100%;margin:0;text-transform:none;text-wrap:none;font-weight:400;color:rgba(255,255,255,.7);border-radius:var(--app-button-install-border-radius);border:var(--app-transparent-2-border-style);--paper-button-ink-color:#7F7F7F}.iron-selected{background-color:rgba(255,255,255,.2)!important}kbd{color:var(--app-nav-text-color);border-radius:2px;padding:2px;border:var(--app-transparent-border-style)}.hint5599311{position:absolute;bottom:0}@media (max-width:767px){:host{min-height:100vh}.container{@apply --layout-vertical;min-height:100vh}.content{@apply --layout-flex-none;}aside{@apply --layout-flex;background:#000}}@media (min-width:768px){:host{--app-grid-columns:4;--app-grid-gutter:32px}}@media (min-width:1310px){.container{@apply --layout-horizontal;}.content{margin-right:24px}aside{width:400px;min-width:400px}}</style><app-route route="[[route]]" pattern="/:channel" data="{{routeData}}"></app-route><div class="container" fade-in$="[[!loading]]" hidden$="[[failure]]"><div class="content"><google-youtube id="YouTubePlayer" class="video-container" allowfullscreen="true" video-id="[[videoId]]" playsupported="{{playSupported}}" playbackrate="{{playbackRate}}" playbackquality="{{playbackQuality}}" on-google-youtube-state-change="handleStateChange" on-google-youtube-error="handleYouTubeError" state="{{state}}" fluid="true" origin="https://bbabo.net"></google-youtube><a id="togglefullscreen"><dom-if if="[[desktopScreen]]"><template><p class="hint5599311">Press <kbd>F11</kbd> to Toggle Full-Screen</p></template></dom-if></a></div><aside><iron-selector class="app-grid" selected="[[channelName]]" attr-for-selected="name"><dom-repeat items="[[radios]]" initial-count="4"><template><a name="[[item.name]]" href$="[[44348(item)]]" tabindex="-1"><paper-button on-click="37460">[[item.title]]</paper-button></a></template></dom-repeat></iron-selector></aside></div><news-network-warning hidden$="[[!failure]]" offline="[[offline]]" on-try-reconnect="22179"></news-network-warning>`
    }

    static get is() {
        return "news-radio"
    }

    static get properties() {
        return {
            lang: String,
            channelMenuName: {type: String, notify: !0},
            channelTitle: {type: String, notify: !0},
            channelName: {type: String, computed: "10982(routeData.channel)", observer: "5606", notify: !0},
            state: {type: Number, notify: !0},
            playSupported: Boolean,
            playbackRate: Number,
            playbackQuality: String,
            events: {type: Array, value: []},
            videoId: {type: String, computed: "5883(channelName)", notify: !0},
            radios: {type: Array, value: i, readOnly: !0},
            route: Object,
            routeData: Object,
            offline: Boolean,
            failure: Boolean,
            categoryName: {type: Boolean, computed: "47430(false)", notify: !0},
            loading: Boolean,
            smallScreen: Boolean,
            desktopScreen: Boolean
        }
    }

    connectedCallback() {
        super.connectedCallback(), this
        .30452 = this
        .9373.bind(this), window.addEventListener("resize", this
        .30452
    ),
        this.$.togglefullscreen.addEventListener("click", (e => {
            document.documentElement.requestFullscreen(), a({top: 0, behavior: "silent"}), this.$.nav.closeDrawer()
        }))
    }

    disconnectedCallback() {
        super.disconnectedCallback(), window.removeEventListener("resize", this
        .30452
    )
    }

    27192(e) {
        return e ? e[0] : {}
    }

    22179() {
        this.dispatchEvent(new CustomEvent("refresh-data", {bubbles: !0, composed: !0}))
    }

    9373() {
        this
        .38165 = n.debounce(this
        .38165, r.after(50), (() => {
            this.updateStyles()
        })
    )
    }

    62252(e, t, a) {
        if (e) return e.slice(t, a)
    }

    44348(e) {
        return e.name ? ["/" + this.lang, "radio", e.name].join("/") : null
    }

    10982(e) {
        for (let t, a = 0; t = this.radios[a]; ++a) if (t.name === e) return this.channelMenuName = t.name, this.channelTitle = t.title, t.name;
        return null
    }

    5883(e) {
        for (let t, a = 0; t = this.radios[a]; ++a) if (t.name === e) return t.videoid;
        return null
    }

    5606() {
        if (this.25415 && this
        .25415.cancel(), this.playSupported = !0, -1 == this.state && this.$.YouTubePlayer && this.channelName
    )
        return this.$.YouTubePlayer.play(), void (this.state = 2);
        -1 != this.state && this.$.YouTubePlayer && this.channelName ? this.$.YouTubePlayer.play() : this.$.YouTubePlayer && !this.channelName && this.$.YouTubePlayer.pause()
    }

    37460() {
        this
        .25415 = n.debounce(this
        .25415, r.after(500), (() => {
            1 == this.state && this.$.YouTubePlayer && this.channelName && this.$.YouTubePlayer.pause(), 1 != this.state && this.$.YouTubePlayer && this.channelName && this.$.YouTubePlayer.play()
        })
    )
    }

    computePlayDisabled(e, t) {
        return 1 == e || 3 == e || !t
    }

    handleStateChange(e) {
    }

    handleYouTubeError(e) {
        console.error("YouTube playback error", e.detail)
    }

    47430(e) {
        return e
    }
}

customElements.define(o.is, o);