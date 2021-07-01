"use strict";
const e = !(window.ShadyDOM && window.ShadyDOM.inUse);
let t;

function i(i) {
    t = (!i || !i.shimcssproperties) && (e || !(navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) || !window.CSS || !CSS.supports || !CSS.supports("box-shadow", "0 0 0 var(--foo)")))
}

window.ShadyCSS && void 0 !== window.ShadyCSS.nativeCss ? t = window.ShadyCSS.nativeCss : window.ShadyCSS ? (i(window.ShadyCSS), window.ShadyCSS = void 0) : i(window.WebComponents && window.WebComponents.flags);
const n = t;
var s = {nativeShadow: e, nativeCssVariables: n};

class a {
    constructor() {
        this.start = 0, this.end = 0, this.previous = null, this.parent = null, this.rules = null, this.parsedCssText = "", this.cssText = "", this.atRule = !1, this.type = 0, this.keyframesName = "", this.selector = "", this.parsedSelector = ""
    }
}

function r(e) {
    return l(o(e = A(e)), e)
}

function A(e) {
    return e.replace(y.comments, "").replace(y.port, "")
}

function o(e) {
    let t = new a;
    t.start = 0, t.end = e.length;
    let i = t;
    for (let n = 0, s = e.length; n < s; n++) if (e[n] === f) {
        i.rules || (i.rules = []);
        let e = i, t = e.rules[e.rules.length - 1] || null;
        i = new a, i.start = n + 1, i.parent = e, i.previous = t, e.rules.push(i)
    } else e[n] === g && (i.end = n + 1, i = i.parent || t);
    return t
}

function l(e, t) {
    let i = t.substring(e.start, e.end - 1);
    if (e.parsedCssText = e.cssText = i.trim(), e.parent) {
        let n = e.previous ? e.previous.end : e.parent.start;
        i = t.substring(n, e.start - 1), i = c(i), i = i.replace(y.multipleSpaces, " "), i = i.substring(i.lastIndexOf(";") + 1);
        let s = e.parsedSelector = e.selector = i.trim();
        e.atRule = 0 === s.indexOf(w), e.atRule ? 0 === s.indexOf(v) ? e.type = _.MEDIA_RULE : s.match(y.keyframesRule) && (e.type = _.KEYFRAMES_RULE, e.keyframesName = e.selector.split(y.multipleSpaces).pop()) : 0 === s.indexOf(b) ? e.type = _.MIXIN_RULE : e.type = _.STYLE_RULE
    }
    let n = e.rules;
    if (n) for (let e, i = 0, s = n.length; i < s && (e = n[i]); i++) l(e, t);
    return e
}

function c(e) {
    return e.replace(/\\([0-9a-f]{1,6})\s/gi, (function () {
        let e = arguments[1], t = 6 - e.length;
        for (; t--;) e = "0" + e;
        return "\\" + e
    }))
}

function d(e, t, i = "") {
    let n = "";
    if (e.cssText || e.rules) {
        let i = e.rules;
        if (i && !h(i)) for (let e, s = 0, a = i.length; s < a && (e = i[s]); s++) n = d(e, t, n); else n = t ? e.cssText : u(e.cssText), n = n.trim(), n && (n = "  " + n + "\n")
    }
    return n && (e.selector && (i += e.selector + " " + f + "\n"), i += n, e.selector && (i += g + "\n\n")), i
}

function h(e) {
    let t = e[0];
    return !!t && !!t.selector && 0 === t.selector.indexOf(b)
}

function u(e) {
    return m(e = p(e))
}

function p(e) {
    return e.replace(y.customProp, "").replace(y.mixinProp, "")
}

function m(e) {
    return e.replace(y.mixinApply, "").replace(y.varApply, "")
}

const _ = {STYLE_RULE: 1, KEYFRAMES_RULE: 7, MEDIA_RULE: 4, MIXIN_RULE: 1e3}, f = "{", g = "}", y = {
    comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
    port: /@import[^;]*;/gim,
    customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
    mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
    mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
    varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
    keyframesRule: /^@[^\s]*keyframes/,
    multipleSpaces: /\s+/g
}, b = "--", v = "@media", w = "@";
var S = {StyleNode: a, parse: r, stringify: d, removeCustomPropAssignment: p, types: _};
const C = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi,
    x = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi, P = /(--[\w-]+)\s*([:,;)]|$)/gi,
    E = /(animation\s*:)|(animation-name\s*:)/, k = /@media\s(.*)/, T = /^--/, I = /\{[^}]*\}/g, N = "(?:^|[^.#[:])",
    O = "($|[.:[\\s>+~])";
var M = {
    VAR_ASSIGN: C,
    MIXIN_MATCH: x,
    VAR_CONSUMED: P,
    ANIMATION_MATCH: E,
    MEDIA_MATCH: k,
    IS_VAR: T,
    BRACKETED: I,
    HOST_PREFIX: N,
    HOST_SUFFIX: O
};
const L = new Set, R = "shady-unscoped";

function D(e) {
    const t = e.textContent;
    if (!L.has(t)) {
        L.add(t);
        const i = e.cloneNode(!0);
        document.head.appendChild(i)
    }
}

function B(e) {
    return e.hasAttribute("shady-unscoped")
}

var z = {scopingAttribute: "shady-unscoped", processUnscopedStyle: D, isUnscopedStyle: B};

function H(e, t) {
    return e ? ("string" == typeof e && (e = r(e)), t && q(e, t), d(e, n)) : ""
}

function F(e) {
    return !e.__cssRules && e.textContent && (e.__cssRules = r(e.textContent)), e.__cssRules || null
}

function U(e) {
    return !!e.parent && e.parent.type === _.KEYFRAMES_RULE
}

function q(e, t, i, n) {
    if (!e) return;
    let s = !1, a = e.type;
    if (n && a === _.MEDIA_RULE) {
        let t = e.selector.match(k);
        t && (window.matchMedia(t[1]).matches || (s = !0))
    }
    a === _.STYLE_RULE ? t(e) : i && a === _.KEYFRAMES_RULE ? i(e) : a === _.MIXIN_RULE && (s = !0);
    let r = e.rules;
    if (r && !s) for (let e, s = 0, a = r.length; s < a && (e = r[s]); s++) q(e, t, i, n)
}

function j(e, t, i, n) {
    let s = Y(e, t);
    return K(s, i, n), s
}

function Y(e, t) {
    let i = document.createElement("style");
    return t && i.setAttribute("scope", t), i.textContent = e, i
}

let $ = null;

function V(e) {
    let t = document.createComment(" Shady DOM styles for " + e + " "), i = $ ? $.nextSibling : null, n = document.head;
    return n.insertBefore(t, i || n.firstChild), $ = t, t
}

function K(e, t, i) {
    t = t || document.head;
    let n = i && i.nextSibling || t.firstChild;
    if (t.insertBefore(e, n), $) {
        e.compareDocumentPosition($) === Node.DOCUMENT_POSITION_PRECEDING && ($ = e)
    } else $ = e
}

function Q(t) {
    return e ? "shadow" === t : "shady" === t
}

function G(e, t) {
    let i = 0;
    for (let n = t, s = e.length; n < s; n++) if ("(" === e[n]) i++; else if (")" === e[n] && 0 == --i) return n;
    return -1
}

function W(e, t) {
    let i = e.indexOf("var(");
    if (-1 === i) return t(e, "", "", "");
    let n = G(e, i + 3), s = e.substring(i + 4, n), a = e.substring(0, i), r = W(e.substring(n + 1), t),
        A = s.indexOf(",");
    return -1 === A ? t(a, s.trim(), "", r) : t(a, s.substring(0, A).trim(), s.substring(A + 1).trim(), r)
}

function J(t, i) {
    e ? t.setAttribute("class", i) : window.ShadyDOM.nativeMethods.setAttribute.call(t, "class", i)
}

function X(e) {
    let t = e.localName, i = "", n = "";
    return t ? -1 < t.indexOf("-") ? i = t : (n = t, i = e.getAttribute && e.getAttribute("is") || "") : (i = e.is, n = e.extends), {
        is: i,
        typeExtension: n
    }
}

function Z(t) {
    const i = [], n = t.querySelectorAll("style");
    for (let t = 0; t < n.length; t++) {
        const s = n[t];
        B(s) ? e || (D(s), s.parentNode.removeChild(s)) : (i.push(s.textContent), s.parentNode.removeChild(s))
    }
    return i.join("").trim()
}

function ee(e) {
    const t = [];
    let i = "";
    for (let n = 0; 0 <= n && n < e.length; n++) if ("(" === e[n]) {
        const t = G(e, n);
        i += e.slice(n, t + 1), n = t
    } else "," === e[n] ? (t.push(i), i = "") : i += e[n];
    return i && t.push(i), t
}

const te = "css-build";

function ie(e) {
    if (void 0 === e.__cssBuild) {
        const t = e.getAttribute("css-build");
        if (t) e.__cssBuild = t; else {
            const t = se(e);
            "" !== t && ae(e), e.__cssBuild = t
        }
    }
    return e.__cssBuild || ""
}

function ne(e) {
    return "" !== ie(e)
}

function se(e) {
    const t = "template" === e.localName ? e.content.firstChild : e.firstChild;
    if (t instanceof Comment) {
        const e = t.textContent.trim().split(":");
        if ("css-build" === e[0]) return e[1]
    }
    return ""
}

function ae(e) {
    const t = "template" === e.localName ? e.content.firstChild : e.firstChild;
    t.parentNode.removeChild(t)
}

var re = {
    toCssText: H,
    rulesForStyle: F,
    isKeyframesSelector: U,
    forEachRule: q,
    applyCss: j,
    createScopeStyle: Y,
    applyStylePlaceHolder: V,
    applyStyle: K,
    isTargetedBuild: Q,
    findMatchingParen: G,
    processVariableAndFallback: W,
    setElementClassRaw: J,
    getIsExtends: X,
    gatherStyleText: Z,
    splitSelectorList: ee,
    getCssBuild: ie,
    elementHasBuiltCss: ne,
    getBuildComment: se
};

function Ae(e, t) {
    for (let i in t) null === i ? e.style.removeProperty(i) : e.style.setProperty(i, t[i])
}

function oe(e, t) {
    const i = window.getComputedStyle(e).getPropertyValue(t);
    return i ? i.trim() : ""
}

function le(e) {
    const t = x.test(e) || C.test(e);
    return x.lastIndex = 0, C.lastIndex = 0, t
}

var ce = {updateNativeProperties: Ae, getComputedStyleValue: oe, detectMixin: le};
const de = /;\s*/m, he = /^\s*(initial)|(inherit)\s*$/, ue = /\s*!important/, pe = "_-_";
let me, _e, fe;

class ge {
    constructor() {
        this._map = {}
    }

    set(e, t) {
        e = e.trim(), this._map[e] = {properties: t, dependants: {}}
    }

    get(e) {
        return e = e.trim(), this._map[e] || null
    }
}

let ye = null;

class be {
    constructor() {
        this._currentElement = null, this._measureElement = null, this._map = new ge
    }

    detectMixin(e) {
        return le(e)
    }

    gatherStyles(e) {
        const t = Z(e.content);
        if (t) {
            const i = document.createElement("style");
            return i.textContent = t, e.content.insertBefore(i, e.content.firstChild), i
        }
        return null
    }

    transformTemplate(e, t) {
        void 0 === e._gatheredStyle && (e._gatheredStyle = this.gatherStyles(e));
        const i = e._gatheredStyle;
        return i ? this.transformStyle(i, t) : null
    }

    transformStyle(e, t = "") {
        let i = F(e);
        return this.transformRules(i, t), e.textContent = H(i), i
    }

    transformCustomStyle(e) {
        let t = F(e);
        return q(t, (e => {
            ":root" === e.selector && (e.selector = "html"), this.transformRule(e)
        })), e.textContent = H(t), t
    }

    transformRules(e, t) {
        this._currentElement = t, q(e, (e => {
            this.transformRule(e)
        })), this._currentElement = null
    }

    transformRule(e) {
        e.cssText = this.transformCssText(e.parsedCssText, e), ":root" === e.selector && (e.selector = ":host > *")
    }

    transformCssText(e, t) {
        return e = e.replace(C, ((e, i, n, s) => this._produceCssProperties(e, i, n, s, t))), this._consumeCssProperties(e, t)
    }

    _getInitialValueForProperty(e) {
        return this._measureElement || (this._measureElement = document.createElement("meta"), this._measureElement.setAttribute("apply-shim-measure", ""), this._measureElement.style.all = "initial", document.head.appendChild(this._measureElement)), window.getComputedStyle(this._measureElement).getPropertyValue(e)
    }

    _fallbacksFromPreviousRules(e) {
        let t = e;
        for (; t.parent;) t = t.parent;
        const i = {};
        let n = !1;
        return q(t, (t => {
            n = n || t === e, n || t.selector === e.selector && Object.assign(i, this._cssTextToMap(t.parsedCssText))
        })), i
    }

    _consumeCssProperties(e, t) {
        let i = null;
        for (; i = x.exec(e);) {
            let n = i[0], s = i[1], a = i.index, r = a + n.indexOf("@apply"), A = a + n.length, o = e.slice(0, r),
                l = e.slice(A), c = t ? this._fallbacksFromPreviousRules(t) : {};
            Object.assign(c, this._cssTextToMap(o));
            let d = this._atApplyToCssProperties(s, c);
            e = `${o}${d}${l}`, x.lastIndex = a + d.length
        }
        return e
    }

    _atApplyToCssProperties(e, t) {
        e = e.replace(de, "");
        let i = [], n = this._map.get(e);
        if (n || (this._map.set(e, {}), n = this._map.get(e)), n) {
            let s, a, r;
            this._currentElement && (n.dependants[this._currentElement] = !0);
            const A = n.properties;
            for (s in A) r = t && t[s], a = [s, ": var(", e, "_-_", s], r && a.push(",", r.replace(ue, "")), a.push(")"), ue.test(A[s]) && a.push(" !important"), i.push(a.join(""))
        }
        return i.join("; ")
    }

    _replaceInitialOrInherit(e, t) {
        let i = he.exec(t);
        return i && (t = i[1] ? this._getInitialValueForProperty(e) : "apply-shim-inherit"), t
    }

    _cssTextToMap(e) {
        let t, i, n = e.split(";"), s = {};
        for (let e, a, r = 0; r < n.length; r++) e = n[r], e && (a = e.split(":"), 1 < a.length && (t = a[0].trim(), i = this._replaceInitialOrInherit(t, a.slice(1).join(":")), s[t] = i));
        return s
    }

    _invalidateMixinEntry(e) {
        if (ye) for (let t in e.dependants) t !== this._currentElement && ye(t)
    }

    _produceCssProperties(e, t, i, n, s) {
        if (i && W(i, ((e, t) => {
            t && this._map.get(t) && (n = `@apply ${t};`)
        })), !n) return e;
        let a = this._consumeCssProperties("" + n, s), r = e.slice(0, e.indexOf("--")), A = this._cssTextToMap(a),
            o = A, l = this._map.get(t), c = l && l.properties;
        c ? o = Object.assign(Object.create(c), A) : this._map.set(t, o);
        let d, h, u = [], p = !1;
        for (d in o) h = A[d], void 0 === h && (h = "initial"), c && !(d in c) && (p = !0), u.push(`${t}_-_${d}: ${h}`);
        return p && this._invalidateMixinEntry(l), l && (l.properties = o), i && (r = `${e};${r}`), `${r}${u.join("; ")};`
    }
}

be.prototype.detectMixin = be.prototype.detectMixin, be.prototype.transformStyle = be.prototype.transformStyle, be.prototype.transformCustomStyle = be.prototype.transformCustomStyle, be.prototype.transformRules = be.prototype.transformRules, be.prototype.transformRule = be.prototype.transformRule, be.prototype.transformTemplate = be.prototype.transformTemplate, be.prototype._separator = "_-_", Object.defineProperty(be.prototype, "invalidCallback", {
    get: () => ye,
    set(e) {
        ye = e
    }
});
var ve = {default: be};
const we = {};
var Se = {default: we};
const Ce = "_applyShimCurrentVersion", xe = "_applyShimNextVersion", Pe = "_applyShimValidatingVersion",
    Ee = Promise.resolve();

function ke(e) {
    let t = we[e];
    t && Te(t)
}

function Te(e) {
    e[Ce] = e[Ce] || 0, e[Pe] = e[Pe] || 0, e[xe] = (e[xe] || 0) + 1
}

function Ie(e) {
    let t = we[e];
    return !t || Ne(t)
}

function Ne(e) {
    return e[Ce] === e[xe]
}

function Oe(e) {
    let t = we[e];
    return !!t && Me(t)
}

function Me(e) {
    return !Ne(e) && e[Pe] === e[xe]
}

function Le(e) {
    Re(we[e])
}

function Re(e) {
    e[Pe] = e[xe], e._validating || (e._validating = !0, Ee.then((function () {
        e[Ce] = e[xe], e._validating = !1
    })))
}

function De() {
    for (let e in we) {
        if (!Ne(we[e])) return !0
    }
    return !1
}

var Be = {
    invalidate: ke,
    invalidateTemplate: Te,
    isValid: Ie,
    templateIsValid: Ne,
    isValidating: Oe,
    templateIsValidating: Me,
    startValidating: Le,
    startValidatingTemplate: Re,
    elementsAreInvalid: De
};
let ze, He = null, Fe = window.HTMLImports && window.HTMLImports.whenReady || null;

function Ue(e) {
    requestAnimationFrame((function () {
        Fe ? Fe(e) : (He || (He = new Promise((e => {
            ze = e
        })), "complete" === document.readyState ? ze() : document.addEventListener("readystatechange", (() => {
            "complete" === document.readyState && ze()
        }))), He.then((function () {
            e && e()
        })))
    }))
}

var qe = {default: Ue};
let je;
const Ye = "__seenByShadyCSS", $e = "__shadyCSSCachedStyle";
let Ve, Ke = null, Qe = null;

class Ge {
    constructor() {
        this.customStyles = [], this.enqueued = !1, Ue((() => {
            window.ShadyCSS.flushCustomStyles && window.ShadyCSS.flushCustomStyles()
        }))
    }

    enqueueDocumentValidation() {
        !this.enqueued && Qe && (this.enqueued = !0, Ue(Qe))
    }

    addCustomStyle(e) {
        e[Ye] || (e[Ye] = !0, this.customStyles.push(e), this.enqueueDocumentValidation())
    }

    getStyleForCustomStyle(e) {
        if (e[$e]) return e[$e];
        let t;
        return t = e.getStyle ? e.getStyle() : e, t
    }

    processStyles() {
        const e = this.customStyles;
        for (let t = 0; t < e.length; t++) {
            const i = e[t];
            if (i[$e]) continue;
            const n = this.getStyleForCustomStyle(i);
            if (n) {
                const e = n.__appliedElement || n;
                Ke && Ke(e), i[$e] = e
            }
        }
        return e
    }
}

Ge.prototype.addCustomStyle = Ge.prototype.addCustomStyle, Ge.prototype.getStyleForCustomStyle = Ge.prototype.getStyleForCustomStyle, Ge.prototype.processStyles = Ge.prototype.processStyles, Object.defineProperties(Ge.prototype, {
    transformCallback: {
        get: () => Ke,
        set(e) {
            Ke = e
        }
    }, validateCallback: {
        get: () => Qe, set(e) {
            let t = !1;
            Qe || (t = !0), Qe = e, t && this.enqueueDocumentValidation()
        }
    }
});
var We = {CustomStyleProvider: je, default: Ge, CustomStyleInterfaceInterface: Ve};
const Je = new be;

class Xe {
    constructor() {
        this.customStyleInterface = null, Je.invalidCallback = ke
    }

    ensure() {
        this.customStyleInterface || (this.customStyleInterface = window.ShadyCSS.CustomStyleInterface, this.customStyleInterface && (this.customStyleInterface.transformCallback = e => {
            Je.transformCustomStyle(e)
        }, this.customStyleInterface.validateCallback = () => {
            requestAnimationFrame((() => {
                this.customStyleInterface.enqueued && this.flushCustomStyles()
            }))
        }))
    }

    prepareTemplate(e, t) {
        if (this.ensure(), ne(e)) return;
        we[t] = e;
        let i = Je.transformTemplate(e, t);
        e._styleAst = i
    }

    flushCustomStyles() {
        if (this.ensure(), !this.customStyleInterface) return;
        let e = this.customStyleInterface.processStyles();
        if (this.customStyleInterface.enqueued) {
            for (let t = 0; t < e.length; t++) {
                let i = e[t], n = this.customStyleInterface.getStyleForCustomStyle(i);
                n && Je.transformCustomStyle(n)
            }
            this.customStyleInterface.enqueued = !1
        }
    }

    styleSubtree(e, t) {
        if (this.ensure(), t && Ae(e, t), e.shadowRoot) {
            this.styleElement(e);
            let t = e.shadowRoot.children || e.shadowRoot.childNodes;
            for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
        } else {
            let t = e.children || e.childNodes;
            for (let e = 0; e < t.length; e++) this.styleSubtree(t[e])
        }
    }

    styleElement(e) {
        this.ensure();
        let {is: t} = X(e), i = we[t];
        if ((!i || !ne(i)) && i && !Ne(i)) {
            Me(i) || (this.prepareTemplate(i, t), Re(i));
            let n = e.shadowRoot;
            if (n) {
                let e = n.querySelector("style");
                e && (e.__cssRules = i._styleAst, e.textContent = H(i._styleAst))
            }
        }
    }

    styleDocument(e) {
        this.ensure(), this.styleSubtree(document.body, e)
    }
}

if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
    const t = new Xe;
    let i = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
    window.ShadyCSS = {
        prepareTemplate(e, i, n) {
            t.flushCustomStyles(), t.prepareTemplate(e, i)
        }, prepareTemplateStyles(e, t, i) {
            this.prepareTemplate(e, t, i)
        }, prepareTemplateDom(e, t) {
        }, styleSubtree(e, i) {
            t.flushCustomStyles(), t.styleSubtree(e, i)
        }, styleElement(e) {
            t.flushCustomStyles(), t.styleElement(e)
        }, styleDocument(e) {
            t.flushCustomStyles(), t.styleDocument(e)
        }, getComputedStyleValue: (e, t) => oe(e, t), flushCustomStyles() {
            t.flushCustomStyles()
        }, nativeCss: n, nativeShadow: e
    }, i && (window.ShadyCSS.CustomStyleInterface = i)
}
window.ShadyCSS.ApplyShim = Je, window.JSCompiler_renameProperty = function (e) {
    return e
};
let Ze, et, tt = /(url\()([^)]*)(\))/g, it = /(^\/)|(^#)|(^[\w-\d]*:)/;

function nt(e, t) {
    if (e && it.test(e)) return e;
    if (void 0 === Ze) {
        Ze = !1;
        try {
            const e = new URL("b", "http://a");
            e.pathname = "c%20d", Ze = "http://a/c%20d" === e.href
        } catch (e) {
        }
    }
    return t || (t = document.baseURI || window.location.href), Ze ? new URL(e, t).href : (et || (et = document.implementation.createHTMLDocument("temp"), et.base = et.createElement("base"), et.head.appendChild(et.base), et.anchor = et.createElement("a"), et.body.appendChild(et.anchor)), et.base.href = t, et.anchor.href = e, et.anchor.href || e)
}

function st(e, t) {
    return e.replace(tt, (function (e, i, n, s) {
        return i + "'" + nt(n.replace(/["']/g, ""), t) + "'" + s
    }))
}

function at(e) {
    return e.substring(0, e.lastIndexOf("/") + 1)
}

var rt = {resolveUrl: nt, resolveCss: st, pathFromUrl: at};
const At = !window.ShadyDOM, ot = !(window.ShadyCSS && !window.ShadyCSS.nativeCss),
    lt = !window.customElements.polyfillWrapFlushCallback;
let ct = at(document.baseURI || window.location.href);
const dt = function (e) {
    ct = e
};
let ht;
const ut = function (e) {
    ht = e
};
let pt = !1;
const mt = function (e) {
    pt = e
};
var _t = {
    useShadow: At, useNativeCSSProperties: ot, useNativeCustomElements: lt, get rootPath() {
        return ct
    }, setRootPath: dt, get sanitizeDOMValue() {
        return ht
    }, setSanitizeDOMValue: ut, get passiveTouchGestures() {
        return pt
    }, setPassiveTouchGestures: mt
};
let ft = 0;

function gt() {
}

gt.prototype.__mixinApplications, gt.prototype.__mixinSet;
const yt = function (e) {
    let t = e.__mixinApplications;
    t || (t = new WeakMap, e.__mixinApplications = t);
    let i = ft++;
    return function (n) {
        let s = n.__mixinSet;
        if (s && s[i]) return n;
        let a = t, r = a.get(n);
        r || (r = e(n), a.set(n, r));
        let A = Object.create(r.__mixinSet || s || null);
        return A[i] = !0, r.__mixinSet = A, r
    }
};
var bt = {dedupingMixin: yt};
const vt = "link[rel=import][type~=css]", wt = "include", St = "shady-unscoped";

function Ct(e) {
    const t = customElements.get("dom-module");
    return t ? t.import(e) : null
}

function xt(e) {
    const t = st((e.body ? e.body : e).textContent, e.baseURI), i = document.createElement("style");
    return i.textContent = t, i
}

let Pt;

function Et(e) {
    const t = e.trim().split(/\s+/), i = [];
    for (let e = 0; e < t.length; e++) i.push(...kt(t[e]));
    return i
}

function kt(e) {
    const t = Ct(e);
    if (!t) return console.warn("Could not find style data in module named", e), [];
    if (void 0 === t._styles) {
        const e = [...Nt(t)], i = t.querySelector("template");
        i && e.push(...Tt(i, t.assetpath)), t._styles = e
    }
    return t._styles
}

function Tt(e, t) {
    if (!e._styles) {
        const i = [], n = e.content.querySelectorAll("style");
        for (let e = 0; e < n.length; e++) {
            let s = n[e], a = s.getAttribute("include");
            a && i.push(...Et(a).filter((function (e, t, i) {
                return i.indexOf(e) === t
            }))), t && (s.textContent = st(s.textContent, t)), i.push(s)
        }
        e._styles = i
    }
    return e._styles
}

function It(e) {
    let t = Ct(e);
    return t ? Nt(t) : []
}

function Nt(e) {
    const t = [], i = e.querySelectorAll(vt);
    for (let e, n = 0; n < i.length; n++) if (e = i[n], e.import) {
        const i = e.import, n = e.hasAttribute("shady-unscoped");
        if (n && !i._unscopedStyle) {
            const e = xt(i);
            e.setAttribute("shady-unscoped", ""), i._unscopedStyle = e
        } else i._style || (i._style = xt(i));
        t.push(n ? i._unscopedStyle : i._style)
    }
    return t
}

function Ot(e) {
    let t = e.trim().split(/\s+/), i = "";
    for (let e = 0; e < t.length; e++) i += Mt(t[e]);
    return i
}

function Mt(e) {
    let t = Ct(e);
    if (t && void 0 === t._cssText) {
        let e = Dt(t), i = t.querySelector("template");
        i && (e += Lt(i, t.assetpath)), t._cssText = e || null
    }
    return t || console.warn("Could not find style data in module named", e), t && t._cssText || ""
}

function Lt(e, t) {
    let i = "";
    const n = Tt(e, t);
    for (let e, t = 0; t < n.length; t++) e = n[t], e.parentNode && e.parentNode.removeChild(e), i += e.textContent;
    return i
}

function Rt(e) {
    let t = Ct(e);
    return t ? Dt(t) : ""
}

function Dt(e) {
    let t = "", i = Nt(e);
    for (let e = 0; e < i.length; e++) t += i[e].textContent;
    return t
}

var Bt = {
    stylesFromModules: Et,
    stylesFromModule: kt,
    stylesFromTemplate: Tt,
    stylesFromModuleImports: It,
    cssFromModules: Ot,
    cssFromModule: Mt,
    cssFromTemplate: Lt,
    cssFromModuleImports: Rt
};
let zt = {}, Ht = {};

function Ft(e) {
    return zt[e] || Ht[e.toLowerCase()]
}

function Ut(e) {
    e.querySelector("style") && console.warn("dom-module %s has style outside template", e.id)
}

class qt extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }

    static import(e, t) {
        if (e) {
            let i = Ft(e);
            return i && t ? i.querySelector(t) : i
        }
        return null
    }

    attributeChangedCallback(e, t, i, n) {
        t !== i && this.register()
    }

    get assetpath() {
        if (!this.__assetpath) {
            const e = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument,
                t = nt(this.getAttribute("assetpath") || "", e.baseURI);
            this.__assetpath = at(t)
        }
        return this.__assetpath
    }

    register(e) {
        (e = e || this.id) && (this.id = e, zt[e] = this, Ht[e.toLowerCase()] = this, Ut(this))
    }
}

qt.prototype.modules = zt, customElements.define("dom-module", qt);
var jt = {DomModule: qt};

function Yt(e) {
    return 0 <= e.indexOf(".")
}

function $t(e) {
    let t = e.indexOf(".");
    return -1 === t ? e : e.slice(0, t)
}

function Vt(e, t) {
    return 0 === e.indexOf(t + ".")
}

function Kt(e, t) {
    return 0 === t.indexOf(e + ".")
}

function Qt(e, t, i) {
    return t + i.slice(e.length)
}

function Gt(e, t) {
    return e === t || Vt(e, t) || Kt(e, t)
}

function Wt(e) {
    if (Array.isArray(e)) {
        let t = [];
        for (let i, n = 0; n < e.length; n++) {
            i = e[n].toString().split(".");
            for (let e = 0; e < i.length; e++) t.push(i[e])
        }
        return t.join(".")
    }
    return e
}

function Jt(e) {
    return Array.isArray(e) ? Wt(e).split(".") : e.toString().split(".")
}

function Xt(e, t, i) {
    let n = e, s = Jt(t);
    for (let e = 0; e < s.length; e++) {
        if (!n) return;
        n = n[s[e]]
    }
    return i && (i.path = s.join(".")), n
}

function Zt(e, t, i) {
    let n = e, s = Jt(t), a = s[s.length - 1];
    if (1 < s.length) {
        for (let e, t = 0; t < s.length - 1; t++) if (e = s[t], n = n[e], !n) return;
        n[a] = i
    } else n[t] = i;
    return s.join(".")
}

const ei = Yt;
var ti = {
    isPath: Yt,
    root: $t,
    isAncestor: Vt,
    isDescendant: Kt,
    translate: Qt,
    matches: Gt,
    normalize: Wt,
    split: Jt,
    get: Xt,
    set: Zt,
    isDeep: ei
};
const ii = {}, ni = /-[a-z]/g, si = /([A-Z])/g;

function ai(e) {
    return ii[e] || (ii[e] = 0 > e.indexOf("-") ? e : e.replace(ni, (e => e[1].toUpperCase())))
}

function ri(e) {
    return ii[e] || (ii[e] = e.replace(si, "-$1").toLowerCase())
}

var Ai = {dashToCamelCase: ai, camelToDashCase: ri};
let oi = 0, li = 0, ci = [], di = 0, hi = document.createTextNode("");

function ui() {
    const e = ci.length;
    for (let t, i = 0; i < e; i++) if (t = ci[i], t) try {
        t()
    } catch (e) {
        setTimeout((() => {
            throw e
        }))
    }
    ci.splice(0, e), li += e
}

new window.MutationObserver(ui).observe(hi, {characterData: !0});
const pi = {
    after: e => ({
        run: t => window.setTimeout(t, e), cancel(e) {
            window.clearTimeout(e)
        }
    }), run: (e, t) => window.setTimeout(e, t), cancel(e) {
        window.clearTimeout(e)
    }
}, mi = {
    run: e => window.requestAnimationFrame(e), cancel(e) {
        window.cancelAnimationFrame(e)
    }
}, _i = {
    run: e => window.requestIdleCallback ? window.requestIdleCallback(e) : window.setTimeout(e, 16), cancel(e) {
        window.cancelIdleCallback ? window.cancelIdleCallback(e) : window.clearTimeout(e)
    }
}, fi = {
    run: e => (hi.textContent = di++, ci.push(e), oi++), cancel(e) {
        const t = e - li;
        if (0 <= t) {
            if (!ci[t]) throw new Error("invalid async handle: " + e);
            ci[t] = null
        }
    }
};
var gi = {timeOut: pi, animationFrame: mi, idlePeriod: _i, microTask: fi};
const yi = fi, bi = yt((e => class extends e {
    static createProperties(e) {
        const t = this.prototype;
        for (let i in e) i in t || t._createPropertyAccessor(i)
    }

    static attributeNameForProperty(e) {
        return e.toLowerCase()
    }

    static typeForProperty(e) {
    }

    _createPropertyAccessor(e, t) {
        this._addPropertyToAttributeMap(e), this.hasOwnProperty("__dataHasAccessor") || (this.__dataHasAccessor = Object.assign({}, this.__dataHasAccessor)), this.__dataHasAccessor[e] || (this.__dataHasAccessor[e] = !0, this._definePropertyAccessor(e, t))
    }

    _addPropertyToAttributeMap(e) {
        if (this.hasOwnProperty("__dataAttributes") || (this.__dataAttributes = Object.assign({}, this.__dataAttributes)), !this.__dataAttributes[e]) {
            const t = this.constructor.attributeNameForProperty(e);
            this.__dataAttributes[t] = e
        }
    }

    _definePropertyAccessor(e, t) {
        Object.defineProperty(this, e, {
            get() {
                return this._getProperty(e)
            }, set: t ? function () {
            } : function (t) {
                this._setProperty(e, t)
            }
        })
    }

    constructor() {
        super(), this.__dataEnabled = !1, this.__dataReady = !1, this.__dataInvalid = !1, this.__data = {}, this.__dataPending = null, this.__dataOld = null, this.__dataInstanceProps = null, this.__serializing = !1, this._initializeProperties()
    }

    ready() {
        this.__dataReady = !0, this._flushProperties()
    }

    _initializeProperties() {
        for (let e in this.__dataHasAccessor) this.hasOwnProperty(e) && (this.__dataInstanceProps = this.__dataInstanceProps || {}, this.__dataInstanceProps[e] = this[e], delete this[e])
    }

    _initializeInstanceProperties(e) {
        Object.assign(this, e)
    }

    _setProperty(e, t) {
        this._setPendingProperty(e, t) && this._invalidateProperties()
    }

    _getProperty(e) {
        return this.__data[e]
    }

    _setPendingProperty(e, t, i) {
        let n = this.__data[e], s = this._shouldPropertyChange(e, t, n);
        return s && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), this.__dataOld && !(e in this.__dataOld) && (this.__dataOld[e] = n), this.__data[e] = t, this.__dataPending[e] = t), s
    }

    _invalidateProperties() {
        !this.__dataInvalid && this.__dataReady && (this.__dataInvalid = !0, yi.run((() => {
            this.__dataInvalid && (this.__dataInvalid = !1, this._flushProperties())
        })))
    }

    _enableProperties() {
        this.__dataEnabled || (this.__dataEnabled = !0, this.__dataInstanceProps && (this._initializeInstanceProperties(this.__dataInstanceProps), this.__dataInstanceProps = null), this.ready())
    }

    _flushProperties() {
        const e = this.__data, t = this.__dataPending, i = this.__dataOld;
        this._shouldPropertiesChange(e, t, i) && (this.__dataPending = null, this.__dataOld = null, this._propertiesChanged(e, t, i))
    }

    _shouldPropertiesChange(e, t, i) {
        return !!t
    }

    _propertiesChanged(e, t, i) {
    }

    _shouldPropertyChange(e, t, i) {
        return i !== t && (i == i || t == t)
    }

    attributeChangedCallback(e, t, i, n) {
        t !== i && this._attributeToProperty(e, i), super.attributeChangedCallback && super.attributeChangedCallback(e, t, i, n)
    }

    _attributeToProperty(e, t, i) {
        if (!this.__serializing) {
            const n = this.__dataAttributes, s = n && n[e] || e;
            this[s] = this._deserializeValue(t, i || this.constructor.typeForProperty(s))
        }
    }

    _propertyToAttribute(e, t, i) {
        this.__serializing = !0, i = 3 > arguments.length ? this[e] : i, this._valueToNodeAttribute(this, i, t || this.constructor.attributeNameForProperty(e)), this.__serializing = !1
    }

    _valueToNodeAttribute(e, t, i) {
        const n = this._serializeValue(t);
        void 0 === n ? e.removeAttribute(i) : e.setAttribute(i, n)
    }

    _serializeValue(e) {
        switch (typeof e) {
            case"boolean":
                return e ? "" : void 0;
            default:
                return null != e ? e.toString() : void 0
        }
    }

    _deserializeValue(e, t) {
        switch (t) {
            case Boolean:
                return null !== e;
            case Number:
                return +e;
            default:
                return e
        }
    }
}));
var vi = {PropertiesChanged: bi};
let wi = Ai;
const Si = {};
let Ci = HTMLElement.prototype;
for (; Ci;) {
    let e = Object.getOwnPropertyNames(Ci);
    for (let t = 0; t < e.length; t++) Si[e[t]] = !0;
    Ci = Object.getPrototypeOf(Ci)
}

function xi(e, t) {
    if (!Si[t]) {
        let i = e[t];
        void 0 !== i && (e.__data ? e._setPendingProperty(t, i) : (e.__dataProto ? e.hasOwnProperty(JSCompiler_renameProperty("__dataProto", e)) || (e.__dataProto = Object.create(e.__dataProto)) : e.__dataProto = {}, e.__dataProto[t] = i))
    }
}

const Pi = yt((e => {
    const t = bi(e);
    return class extends t {
        static createPropertiesForAttributes() {
            let e = this.observedAttributes;
            for (let t = 0; t < e.length; t++) this.prototype._createPropertyAccessor(wi.dashToCamelCase(e[t]))
        }

        static attributeNameForProperty(e) {
            return wi.camelToDashCase(e)
        }

        _initializeProperties() {
            this.__dataProto && (this._initializeProtoProperties(this.__dataProto), this.__dataProto = null), super._initializeProperties()
        }

        _initializeProtoProperties(e) {
            for (let t in e) this._setProperty(t, e[t])
        }

        _ensureAttribute(e, t) {
            const i = this;
            i.hasAttribute(e) || this._valueToNodeAttribute(i, t, e)
        }

        _serializeValue(e) {
            switch (typeof e) {
                case"object":
                    if (e instanceof Date) return e.toString();
                    if (e) try {
                        return JSON.stringify(e)
                    } catch (e) {
                        return ""
                    }
                default:
                    return super._serializeValue(e)
            }
        }

        _deserializeValue(e, t) {
            let i;
            switch (t) {
                case Object:
                    try {
                        i = JSON.parse(e)
                    } catch (t) {
                        i = e
                    }
                    break;
                case Array:
                    try {
                        i = JSON.parse(e)
                    } catch (t) {
                        i = null, console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${e}`)
                    }
                    break;
                case Date:
                    i = isNaN(e) ? e + "" : +e, i = new Date(i);
                    break;
                default:
                    i = super._deserializeValue(e, t)
            }
            return i
        }

        _definePropertyAccessor(e, t) {
            xi(this, e), super._definePropertyAccessor(e, t)
        }

        _hasAccessor(e) {
            return this.__dataHasAccessor && this.__dataHasAccessor[e]
        }

        _isPropertyPending(e) {
            return !(!this.__dataPending || !(e in this.__dataPending))
        }
    }
}));
var Ei = {PropertyAccessors: Pi};
const ki = {"dom-if": !0, "dom-repeat": !0};

function Ti(e) {
    let t = e.getAttribute("is");
    if (t && ki[t]) {
        let i = e;
        for (i.removeAttribute("is"), e = i.ownerDocument.createElement(t), i.parentNode.replaceChild(e, i), e.appendChild(i); i.attributes.length;) e.setAttribute(i.attributes[0].name, i.attributes[0].value), i.removeAttribute(i.attributes[0].name)
    }
    return e
}

function Ii(e, t) {
    let i = t.parentInfo && Ii(e, t.parentInfo);
    if (!i) return e;
    for (let e = i.firstChild, n = 0; e; e = e.nextSibling) if (t.parentIndex === n++) return e
}

function Ni(e, t, i, n) {
    n.id && (t[n.id] = i)
}

function Oi(e, t, i) {
    if (i.events && i.events.length) for (let n, s = 0, a = i.events; s < a.length && (n = a[s]); s++) e._addMethodEventListenerToNode(t, n.name, n.value, e)
}

function Mi(e, t, i) {
    i.templateInfo && (t._templateInfo = i.templateInfo)
}

function Li(e, t, i) {
    e = e._methodHost || e;
    return function (t) {
        e[i] ? e[i](t, t.detail) : console.warn("listener method `" + i + "` not defined")
    }
}

const Ri = yt((e => class extends e {
    static _parseTemplate(e, t) {
        if (!e._templateInfo) {
            let i = e._templateInfo = {};
            i.nodeInfoList = [], i.stripWhiteSpace = t && t.stripWhiteSpace || e.hasAttribute("strip-whitespace"), this._parseTemplateContent(e, i, {parent: null})
        }
        return e._templateInfo
    }

    static _parseTemplateContent(e, t, i) {
        return this._parseTemplateNode(e.content, t, i)
    }

    static _parseTemplateNode(e, t, i) {
        let n, s = e;
        return "template" != s.localName || s.hasAttribute("preserve-content") ? "slot" === s.localName && (t.hasInsertionPoint = !0) : n = this._parseTemplateNestedTemplate(s, t, i) || n, s.firstChild && (n = this._parseTemplateChildNodes(s, t, i) || n), s.hasAttributes && s.hasAttributes() && (n = this._parseTemplateNodeAttributes(s, t, i) || n), n
    }

    static _parseTemplateChildNodes(e, t, i) {
        if ("script" !== e.localName && "style" !== e.localName) for (let n, s = e.firstChild, a = 0; s; s = n) {
            if ("template" == s.localName && (s = Ti(s)), n = s.nextSibling, s.nodeType === Node.TEXT_NODE) {
                let i = n;
                for (; i && i.nodeType === Node.TEXT_NODE;) s.textContent += i.textContent, n = i.nextSibling, e.removeChild(i), i = n;
                if (t.stripWhiteSpace && !s.textContent.trim()) {
                    e.removeChild(s);
                    continue
                }
            }
            let r = {parentIndex: a, parentInfo: i};
            this._parseTemplateNode(s, t, r) && (r.infoIndex = t.nodeInfoList.push(r) - 1), s.parentNode && a++
        }
    }

    static _parseTemplateNestedTemplate(e, t, i) {
        let n = this._parseTemplate(e, t);
        return (n.content = e.content.ownerDocument.createDocumentFragment()).appendChild(e.content), i.templateInfo = n, !0
    }

    static _parseTemplateNodeAttributes(e, t, i) {
        let n = !1, s = Array.from(e.attributes);
        for (let a, r = s.length - 1; a = s[r]; r--) n = this._parseTemplateNodeAttribute(e, t, i, a.name, a.value) || n;
        return n
    }

    static _parseTemplateNodeAttribute(e, t, i, n, s) {
        return "on-" === n.slice(0, 3) ? (e.removeAttribute(n), i.events = i.events || [], i.events.push({
            name: n.slice(3),
            value: s
        }), !0) : "id" === n && (i.id = s, !0)
    }

    static _contentForTemplate(e) {
        let t = e._templateInfo;
        return t && t.content || e.content
    }

    _stampTemplate(e) {
        e && !e.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(e);
        let t = this.constructor._parseTemplate(e), i = t.nodeInfoList, n = t.content || e.content,
            s = document.importNode(n, !0);
        s.__noInsertionPoint = !t.hasInsertionPoint;
        let a = s.nodeList = Array(i.length);
        s.$ = {};
        for (let e, t, n = 0, r = i.length; n < r && (e = i[n]); n++) t = a[n] = Ii(s, e), Ni(this, s.$, t, e), Mi(this, t, e), Oi(this, t, e);
        return s = s, s
    }

    _addMethodEventListenerToNode(e, t, i, n) {
        let s = Li(n = n || e, t, i);
        return this._addEventListenerToNode(e, t, s), s
    }

    _addEventListenerToNode(e, t, i) {
        e.addEventListener(t, i)
    }

    _removeEventListenerFromNode(e, t, i) {
        e.removeEventListener(t, i)
    }
}));
var Di = {TemplateStamp: Ri};
const Bi = Ai;
let zi = 0;
const Hi = {
    COMPUTE: "__computeEffects",
    REFLECT: "__reflectEffects",
    NOTIFY: "__notifyEffects",
    PROPAGATE: "__propagateEffects",
    OBSERVE: "__observeEffects",
    READ_ONLY: "__readOnly"
}, Fi = /[A-Z]/;
let Ui, qi, ji;

function Yi(e, t) {
    let i = e[t];
    if (i) {
        if (!e.hasOwnProperty(t)) {
            i = e[t] = Object.create(e[t]);
            for (let e in i) {
                let t = i[e], n = i[e] = Array(t.length);
                for (let e = 0; e < t.length; e++) n[e] = t[e]
            }
        }
    } else i = e[t] = {};
    return i
}

function $i(e, t, i, n, s, a) {
    if (t) {
        let r = !1, A = zi++;
        for (let o in i) Vi(e, t, A, o, i, n, s, a) && (r = !0);
        return r
    }
    return !1
}

function Vi(e, t, i, n, s, a, r, A) {
    let o = !1, l = t[r ? $t(n) : n];
    if (l) for (let t, c = 0, d = l.length; c < d && (t = l[c]); c++) t.info && t.info.lastRun === i || r && !Ki(n, t.trigger) || (t.info && (t.info.lastRun = i), t.fn(e, n, s, a, t.info, r, A), o = !0);
    return o
}

function Ki(e, t) {
    if (t) {
        let i = t.name;
        return i == e || t.structured && Vt(i, e) || t.wildcard && Kt(i, e)
    }
    return !0
}

function Qi(e, t, i, n, s) {
    let a = "string" == typeof s.method ? e[s.method] : s.method, r = s.property;
    a ? a.call(e, e.__data[r], n[r]) : s.dynamicFn || console.warn("observer method `" + s.method + "` not defined")
}

function Gi(e, t, i, n, s) {
    let a, r, A = e[Hi.NOTIFY], o = zi++;
    for (let r in t) t[r] && (A && Vi(e, A, o, r, i, n, s) || s && Wi(e, r, i)) && (a = !0);
    a && (r = e.__dataHost) && r._invalidateProperties && r._invalidateProperties()
}

function Wi(e, t, i) {
    let n = $t(t);
    if (n !== t) {
        return Ji(e, ri(n) + "-changed", i[t], t), !0
    }
    return !1
}

function Ji(e, t, i, n) {
    let s = {value: i, queueProperty: !0};
    n && (s.path = n), e.dispatchEvent(new CustomEvent(t, {detail: s}))
}

function Xi(e, t, i, n, s, a) {
    let r = (a ? $t(t) : t) != t ? t : null, A = r ? Xt(e, r) : e.__data[t];
    r && void 0 === A && (A = i[t]), Ji(e, s.eventName, A, r)
}

function Zi(e, t, i, n, s) {
    let a, r = e.detail, A = r && r.path;
    A ? (n = Qt(i, n, A), a = r && r.value) : a = e.target[i], a = s ? !a : a, t[Hi.READ_ONLY] && t[Hi.READ_ONLY][n] || !t._setPendingPropertyOrPath(n, a, !0, !!A) || r && r.queueProperty || t._invalidateProperties()
}

function en(e, t, i, n, s) {
    let a = e.__data[t];
    ht && (a = ht(a, s.attrName, "attribute", e)), e._propertyToAttribute(t, s.attrName, a)
}

function tn(e, t, i, n) {
    let s = e[Hi.COMPUTE];
    if (s) {
        let a = t;
        for (; $i(e, s, a, i, n);) Object.assign(i, e.__dataOld), Object.assign(t, e.__dataPending), a = e.__dataPending, e.__dataPending = null
    }
}

function nn(e, t, i, n, s) {
    let a = mn(e, t, i, n, s), r = s.methodInfo;
    e.__dataHasAccessor && e.__dataHasAccessor[r] ? e._setPendingProperty(r, a, !0) : e[r] = a
}

function sn(e, t, i) {
    let n = e.__dataLinkedPaths;
    if (n) {
        let s;
        for (let a in n) {
            let r = n[a];
            Kt(a, t) ? (s = Qt(a, r, t), e._setPendingPropertyOrPath(s, i, !0, !0)) : Kt(r, t) && (s = Qt(r, a, t), e._setPendingPropertyOrPath(s, i, !0, !0))
        }
    }
}

function an(e, t, i, n, s, a, r) {
    i.bindings = i.bindings || [];
    let A = {kind: n, target: s, parts: a, literal: r, isCompound: 1 !== a.length};
    if (i.bindings.push(A), cn(A)) {
        let {event: e, negate: t} = A.parts[0];
        A.listenerEvent = e || Bi.camelToDashCase(s) + "-changed", A.listenerNegate = t
    }
    let o = t.nodeInfoList.length;
    for (let i, n = 0; n < A.parts.length; n++) i = A.parts[n], i.compoundIndex = n, rn(e, t, A, i, o)
}

function rn(e, t, i, n, s) {
    if (!n.literal) if ("attribute" === i.kind && "-" === i.target[0]) console.warn("Cannot set attribute " + i.target + ' because "-" is not a valid attribute starting character'); else {
        let a = n.dependencies, r = {index: s, binding: i, part: n, evaluator: e};
        for (let i, n = 0; n < a.length; n++) i = a[n], "string" == typeof i && (i = Ln(i), i.wildcard = !0), e._addTemplatePropertyEffect(t, i.rootProperty, {
            fn: An,
            info: r,
            trigger: i
        })
    }
}

function An(e, t, i, n, s, a, r) {
    let A = r[s.index], o = s.binding, l = s.part;
    if (a && l.source && t.length > l.source.length && "property" == o.kind && !o.isCompound && A.__isPropertyEffectsClient && A.__dataHasAccessor && A.__dataHasAccessor[o.target]) {
        let n = i[t];
        t = Qt(l.source, o.target, t), A._setPendingPropertyOrPath(t, n, !1, !0) && e._enqueueClient(A)
    } else {
        on(e, A, o, l, s.evaluator._evaluateBinding(e, l, t, i, n, a))
    }
}

function on(e, t, i, n, s) {
    if (s = ln(t, s, i, n), ht && (s = ht(s, i.target, i.kind, t)), "attribute" == i.kind) e._valueToNodeAttribute(t, s, i.target); else {
        let n = i.target;
        t.__isPropertyEffectsClient && t.__dataHasAccessor && t.__dataHasAccessor[n] ? t[Hi.READ_ONLY] && t[Hi.READ_ONLY][n] || t._setPendingProperty(n, s) && e._enqueueClient(t) : e._setUnmanagedPropertyToNode(t, n, s)
    }
}

function ln(e, t, i, n) {
    if (i.isCompound) {
        let s = e.__dataCompoundStorage[i.target];
        s[n.compoundIndex] = t, t = s.join("")
    }
    return "attribute" !== i.kind && ("textContent" !== i.target && ("value" !== i.target || "input" !== e.localName && "textarea" !== e.localName) || (t = null == t ? "" : t)), t
}

function cn(e) {
    return !!e.target && "attribute" != e.kind && "text" != e.kind && !e.isCompound && "{" === e.parts[0].mode
}

function dn(e, t) {
    let {nodeList: i, nodeInfoList: n} = t;
    if (n.length) for (let t = 0; t < n.length; t++) {
        let s = n[t], a = i[t], r = s.bindings;
        if (r) for (let t, i = 0; i < r.length; i++) t = r[i], hn(a, t), un(a, e, t);
        a.__dataHost = e
    }
}

function hn(e, t) {
    if (t.isCompound) {
        let i = e.__dataCompoundStorage || (e.__dataCompoundStorage = {}), n = t.parts, s = Array(n.length);
        for (let e = 0; e < n.length; e++) s[e] = n[e].literal;
        let a = t.target;
        i[a] = s, t.literal && "property" == t.kind && (e[a] = t.literal)
    }
}

function un(e, t, i) {
    if (i.listenerEvent) {
        let n = i.parts[0];
        e.addEventListener(i.listenerEvent, (function (e) {
            Zi(e, t, i.target, n.source, n.negate)
        }))
    }
}

function pn(e, t, i, n, s, a) {
    a = t.static || a && ("object" != typeof a || a[t.methodName]);
    let r = {methodName: t.methodName, args: t.args, methodInfo: s, dynamicFn: a};
    for (let s, a = 0; a < t.args.length && (s = t.args[a]); a++) s.literal || e._addPropertyEffect(s.rootProperty, i, {
        fn: n,
        info: r,
        trigger: s
    });
    a && e._addPropertyEffect(t.methodName, i, {fn: n, info: r})
}

function mn(e, t, i, n, s) {
    let a = e._methodHost || e, r = a[s.methodName];
    if (r) {
        let n = Rn(e.__data, s.args, t, i);
        return r.apply(a, n)
    }
    s.dynamicFn || console.warn("method `" + s.methodName + "` not defined")
}

const _n = [], fn = "(?:[a-zA-Z_$][\\w.:$\\-*]*)", gn = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)",
    yn = "(?:'(?:[^'\\\\]|\\\\.)*')", bn = '(?:"(?:[^"\\\\]|\\\\.)*")', vn = "(?:" + yn + "|" + bn + ")",
    wn = "(?:(" + fn + "|" + gn + "|" + vn + ")\\s*)", Sn = "(?:" + wn + "(?:,\\s*" + wn + ")*)",
    Cn = "(?:\\(\\s*(?:" + Sn + "?)\\)\\s*)", xn = "(" + fn + "\\s*" + Cn + "?)", Pn = "(\\[\\[|{{)\\s*",
    En = "(?:]]|}})", kn = "(?:(!)\\s*)?", Tn = Pn + kn + xn + "(?:]]|}})", In = new RegExp(Tn, "g");

function Nn(e) {
    let t = "";
    for (let i, n = 0; n < e.length; n++) i = e[n].literal, t += i || "";
    return t
}

function On(e) {
    let t = e.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (t) {
        let e = {methodName: t[1], static: !0, args: _n};
        if (t[2].trim()) {
            return Mn(t[2].replace(/\\,/g, "&comma;").split(","), e)
        }
        return e
    }
    return null
}

function Mn(e, t) {
    return t.args = e.map((function (e) {
        let i = Ln(e);
        return i.literal || (t.static = !1), i
    }), this), t
}

function Ln(e) {
    let t = e.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), i = {name: t, value: "", literal: !1}, n = t[0];
    switch ("-" === n && (n = t[1]), "0" <= n && "9" >= n && (n = "#"), n) {
        case"'":
        case'"':
            i.value = t.slice(1, -1), i.literal = !0;
            break;
        case"#":
            i.value = +t, i.literal = !0
    }
    return i.literal || (i.rootProperty = $t(t), i.structured = Yt(t), i.structured && (i.wildcard = ".*" == t.slice(-2), i.wildcard && (i.name = t.slice(0, -2)))), i
}

function Rn(e, t, i, n) {
    let s = [];
    for (let a = 0, r = t.length; a < r; a++) {
        let r, A = t[a], o = A.name;
        if (A.literal ? r = A.value : A.structured ? (r = Xt(e, o), void 0 === r && (r = n[o])) : r = e[o], A.wildcard) {
            let e = 0 === o.indexOf(i + "."), t = 0 === i.indexOf(o) && !e;
            s[a] = {path: t ? i : o, value: t ? n[i] : r, base: r}
        } else s[a] = r
    }
    return s
}

function Dn(e, t, i, n) {
    let s = i + ".splices";
    e.notifyPath(s, {indexSplices: n}), e.notifyPath(i + ".length", t.length), e.__data[s] = {indexSplices: null}
}

function Bn(e, t, i, n, s, a) {
    Dn(e, t, i, [{index: n, addedCount: s, removed: a, object: t, type: "splice"}])
}

function zn(e) {
    return e[0].toUpperCase() + e.substring(1)
}

const Hn = yt((e => {
    const t = Ri(Pi(e));

    class i extends t {
        constructor() {
            super(), this.__isPropertyEffectsClient = !0, this.__dataCounter = 0, this.__dataClientsReady, this.__dataPendingClients, this.__dataToNotify, this.__dataLinkedPaths, this.__dataHasPaths, this.__dataCompoundStorage, this.__dataHost, this.__dataTemp, this.__dataClientsInitialized, this.__data, this.__dataPending, this.__dataOld, this.__computeEffects, this.__reflectEffects, this.__notifyEffects, this.__propagateEffects, this.__observeEffects, this.__readOnly, this.__templateInfo
        }

        get PROPERTY_EFFECT_TYPES() {
            return Hi
        }

        _initializeProperties() {
            super._initializeProperties(), Un.registerHost(this), this.__dataClientsReady = !1, this.__dataPendingClients = null, this.__dataToNotify = null, this.__dataLinkedPaths = null, this.__dataHasPaths = !1, this.__dataCompoundStorage = this.__dataCompoundStorage || null, this.__dataHost = this.__dataHost || null, this.__dataTemp = {}, this.__dataClientsInitialized = !1
        }

        _initializeProtoProperties(e) {
            this.__data = Object.create(e), this.__dataPending = Object.create(e), this.__dataOld = {}
        }

        _initializeInstanceProperties(e) {
            let t = this[Hi.READ_ONLY];
            for (let i in e) t && t[i] || (this.__dataPending = this.__dataPending || {}, this.__dataOld = this.__dataOld || {}, this.__data[i] = this.__dataPending[i] = e[i])
        }

        _addPropertyEffect(e, t, i) {
            this._createPropertyAccessor(e, t == Hi.READ_ONLY);
            let n = Yi(this, t)[e];
            n || (n = this[t][e] = []), n.push(i)
        }

        _removePropertyEffect(e, t, i) {
            let n = Yi(this, t)[e], s = n.indexOf(i);
            0 <= s && n.splice(s, 1)
        }

        _hasPropertyEffect(e, t) {
            let i = this[t];
            return !(!i || !i[e])
        }

        _hasReadOnlyEffect(e) {
            return this._hasPropertyEffect(e, Hi.READ_ONLY)
        }

        _hasNotifyEffect(e) {
            return this._hasPropertyEffect(e, Hi.NOTIFY)
        }

        _hasReflectEffect(e) {
            return this._hasPropertyEffect(e, Hi.REFLECT)
        }

        _hasComputedEffect(e) {
            return this._hasPropertyEffect(e, Hi.COMPUTE)
        }

        _setPendingPropertyOrPath(e, t, i, n) {
            if (n || $t(Array.isArray(e) ? e[0] : e) !== e) {
                if (!n) {
                    let i = Xt(this, e);
                    if (!(e = Zt(this, e, t)) || !super._shouldPropertyChange(e, t, i)) return !1
                }
                if (this.__dataHasPaths = !0, this._setPendingProperty(e, t, i)) return sn(this, e, t), !0
            } else {
                if (this.__dataHasAccessor && this.__dataHasAccessor[e]) return this._setPendingProperty(e, t, i);
                this[e] = t
            }
            return !1
        }

        _setUnmanagedPropertyToNode(e, t, i) {
            i === e[t] && "object" != typeof i || (e[t] = i)
        }

        _setPendingProperty(e, t, i) {
            let n = this.__dataHasPaths && Yt(e), s = n ? this.__dataTemp : this.__data;
            return !!this._shouldPropertyChange(e, t, s[e]) && (this.__dataPending || (this.__dataPending = {}, this.__dataOld = {}), e in this.__dataOld || (this.__dataOld[e] = this.__data[e]), n ? this.__dataTemp[e] = t : this.__data[e] = t, this.__dataPending[e] = t, (n || this[Hi.NOTIFY] && this[Hi.NOTIFY][e]) && (this.__dataToNotify = this.__dataToNotify || {}, this.__dataToNotify[e] = i), !0)
        }

        _setProperty(e, t) {
            this._setPendingProperty(e, t, !0) && this._invalidateProperties()
        }

        _invalidateProperties() {
            this.__dataReady && this._flushProperties()
        }

        _enqueueClient(e) {
            this.__dataPendingClients = this.__dataPendingClients || [], e !== this && this.__dataPendingClients.push(e)
        }

        _flushProperties() {
            this.__dataCounter++, super._flushProperties(), this.__dataCounter--
        }

        _flushClients() {
            this.__dataClientsReady ? this.__enableOrFlushClients() : (this.__dataClientsReady = !0, this._readyClients(), this.__dataReady = !0)
        }

        __enableOrFlushClients() {
            let e = this.__dataPendingClients;
            if (e) {
                this.__dataPendingClients = null;
                for (let t, i = 0; i < e.length; i++) t = e[i], t.__dataEnabled ? t.__dataPending && t._flushProperties() : t._enableProperties()
            }
        }

        _readyClients() {
            this.__enableOrFlushClients()
        }

        setProperties(e, t) {
            for (let i in e) !t && this[Hi.READ_ONLY] && this[Hi.READ_ONLY][i] || this._setPendingPropertyOrPath(i, e[i], !0);
            this._invalidateProperties()
        }

        ready() {
            this._flushProperties(), this.__dataClientsReady || this._flushClients(), this.__dataPending && this._flushProperties()
        }

        _propertiesChanged(e, t, i) {
            let n = this.__dataHasPaths;
            this.__dataHasPaths = !1, tn(this, t, i, n);
            let s = this.__dataToNotify;
            this.__dataToNotify = null, this._propagatePropertyChanges(t, i, n), this._flushClients(), $i(this, this[Hi.REFLECT], t, i, n), $i(this, this[Hi.OBSERVE], t, i, n), s && Gi(this, s, t, i, n), 1 == this.__dataCounter && (this.__dataTemp = {})
        }

        _propagatePropertyChanges(e, t, i) {
            this[Hi.PROPAGATE] && $i(this, this[Hi.PROPAGATE], e, t, i);
            let n = this.__templateInfo;
            for (; n;) $i(this, n.propertyEffects, e, t, i, n.nodeList), n = n.nextTemplateInfo
        }

        linkPaths(e, t) {
            e = Wt(e), t = Wt(t), this.__dataLinkedPaths = this.__dataLinkedPaths || {}, this.__dataLinkedPaths[e] = t
        }

        unlinkPaths(e) {
            e = Wt(e), this.__dataLinkedPaths && delete this.__dataLinkedPaths[e]
        }

        notifySplices(e, t) {
            let i = {path: ""};
            Dn(this, Xt(this, e, i), i.path, t)
        }

        get(e, t) {
            return Xt(t || this, e)
        }

        set(e, t, i) {
            i ? Zt(i, e, t) : this[Hi.READ_ONLY] && this[Hi.READ_ONLY][e] || this._setPendingPropertyOrPath(e, t, !0) && this._invalidateProperties()
        }

        push(e, ...t) {
            let i = {path: ""}, n = Xt(this, e, i), s = n.length, a = n.push(...t);
            return t.length && Bn(this, n, i.path, s, t.length, []), a
        }

        pop(e) {
            let t = {path: ""}, i = Xt(this, e, t), n = !!i.length, s = i.pop();
            return n && Bn(this, i, t.path, i.length, 0, [s]), s
        }

        splice(e, t, i, ...n) {
            let s, a = {path: ""}, r = Xt(this, e, a);
            return 0 > t ? t = r.length - Math.floor(-t) : t && (t = Math.floor(t)), s = 2 === arguments.length ? r.splice(t) : r.splice(t, i, ...n), (n.length || s.length) && Bn(this, r, a.path, t, n.length, s), s
        }

        shift(e) {
            let t = {path: ""}, i = Xt(this, e, t), n = !!i.length, s = i.shift();
            return n && Bn(this, i, t.path, 0, 0, [s]), s
        }

        unshift(e, ...t) {
            let i = {path: ""}, n = Xt(this, e, i), s = n.unshift(...t);
            return t.length && Bn(this, n, i.path, 0, t.length, []), s
        }

        notifyPath(e, t) {
            let i;
            if (1 == arguments.length) {
                let n = {path: ""};
                t = Xt(this, e, n), i = n.path
            } else i = Array.isArray(e) ? Wt(e) : e;
            this._setPendingPropertyOrPath(i, t, !0, !0) && this._invalidateProperties()
        }

        _createReadOnlyProperty(e, t) {
            this._addPropertyEffect(e, Hi.READ_ONLY), t && (this["_set" + zn(e)] = function (t) {
                this._setProperty(e, t)
            })
        }

        _createPropertyObserver(e, t, i) {
            let n = {property: e, method: t, dynamicFn: !!i};
            this._addPropertyEffect(e, Hi.OBSERVE, {
                fn: Qi,
                info: n,
                trigger: {name: e}
            }), i && this._addPropertyEffect(t, Hi.OBSERVE, {fn: Qi, info: n, trigger: {name: t}})
        }

        _createMethodObserver(e, t) {
            let i = On(e);
            if (!i) throw new Error("Malformed observer expression '" + e + "'");
            pn(this, i, Hi.OBSERVE, mn, null, t)
        }

        _createNotifyingProperty(e) {
            this._addPropertyEffect(e, Hi.NOTIFY, {
                fn: Xi,
                info: {eventName: Bi.camelToDashCase(e) + "-changed", property: e}
            })
        }

        _createReflectedProperty(e) {
            let t = this.constructor.attributeNameForProperty(e);
            "-" === t[0] ? console.warn("Property " + e + " cannot be reflected to attribute " + t + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this._addPropertyEffect(e, Hi.REFLECT, {
                fn: en,
                info: {attrName: t}
            })
        }

        _createComputedProperty(e, t, i) {
            let n = On(t);
            if (!n) throw new Error("Malformed computed expression '" + t + "'");
            pn(this, n, Hi.COMPUTE, nn, e, i)
        }

        static addPropertyEffect(e, t, i) {
            this.prototype._addPropertyEffect(e, t, i)
        }

        static createPropertyObserver(e, t, i) {
            this.prototype._createPropertyObserver(e, t, i)
        }

        static createMethodObserver(e, t) {
            this.prototype._createMethodObserver(e, t)
        }

        static createNotifyingProperty(e) {
            this.prototype._createNotifyingProperty(e)
        }

        static createReadOnlyProperty(e, t) {
            this.prototype._createReadOnlyProperty(e, t)
        }

        static createReflectedProperty(e) {
            this.prototype._createReflectedProperty(e)
        }

        static createComputedProperty(e, t, i) {
            this.prototype._createComputedProperty(e, t, i)
        }

        static bindTemplate(e) {
            return this.prototype._bindTemplate(e)
        }

        _bindTemplate(e, t) {
            let i = this.constructor._parseTemplate(e), n = this.__templateInfo == i;
            if (!n) for (let e in i.propertyEffects) this._createPropertyAccessor(e);
            if (t && (i = Object.create(i), i.wasPreBound = n, !n && this.__templateInfo)) {
                let e = this.__templateInfoLast || this.__templateInfo;
                return this.__templateInfoLast = e.nextTemplateInfo = i, i.previousTemplateInfo = e, i
            }
            return this.__templateInfo = i
        }

        static _addTemplatePropertyEffect(e, t, i) {
            (e.hostProps = e.hostProps || {})[t] = !0;
            let n = e.propertyEffects = e.propertyEffects || {};
            (n[t] = n[t] || []).push(i)
        }

        _stampTemplate(e) {
            Un.beginHosting(this);
            let t = super._stampTemplate(e);
            Un.endHosting(this);
            let i = this._bindTemplate(e, !0);
            if (i.nodeList = t.nodeList, !i.wasPreBound) {
                let e = i.childNodes = [];
                for (let i = t.firstChild; i; i = i.nextSibling) e.push(i)
            }
            return t.templateInfo = i, dn(this, i), this.__dataReady && $i(this, i.propertyEffects, this.__data, null, !1, i.nodeList), t
        }

        _removeBoundDom(e) {
            let t = e.templateInfo;
            t.previousTemplateInfo && (t.previousTemplateInfo.nextTemplateInfo = t.nextTemplateInfo), t.nextTemplateInfo && (t.nextTemplateInfo.previousTemplateInfo = t.previousTemplateInfo), this.__templateInfoLast == t && (this.__templateInfoLast = t.previousTemplateInfo), t.previousTemplateInfo = t.nextTemplateInfo = null;
            let i = t.childNodes;
            for (let e, t = 0; t < i.length; t++) e = i[t], e.parentNode.removeChild(e)
        }

        static _parseTemplateNode(e, t, i) {
            let n = super._parseTemplateNode(e, t, i);
            if (e.nodeType === Node.TEXT_NODE) {
                let s = this._parseBindings(e.textContent, t);
                s && (e.textContent = Nn(s) || " ", an(this, t, i, "text", "textContent", s), n = !0)
            }
            return n
        }

        static _parseTemplateNodeAttribute(e, t, i, n, s) {
            let a = this._parseBindings(s, t);
            if (a) {
                let s = n, r = "property";
                Fi.test(n) ? r = "attribute" : "$" == n[n.length - 1] && (n = n.slice(0, -1), r = "attribute");
                let A = Nn(a);
                return A && "attribute" == r && e.setAttribute(n, A), "input" === e.localName && "value" === s && e.setAttribute(s, ""), e.removeAttribute(s), "property" === r && (n = ai(n)), an(this, t, i, r, n, a, A), !0
            }
            return super._parseTemplateNodeAttribute(e, t, i, n, s)
        }

        static _parseTemplateNestedTemplate(e, t, i) {
            let n = super._parseTemplateNestedTemplate(e, t, i), s = i.templateInfo.hostProps;
            for (let e in s) {
                an(this, t, i, "property", "_host_" + e, [{mode: "{", source: e, dependencies: [e]}])
            }
            return n
        }

        static _parseBindings(e, t) {
            let i, n = [], s = 0;
            for (; null !== (i = In.exec(e));) {
                i.index > s && n.push({literal: e.slice(s, i.index)});
                let a = i[1][0], r = !!i[2], A = i[3].trim(), o = !1, l = "", c = -1;
                "{" == a && 0 < (c = A.indexOf("::")) && (l = A.substring(c + 2), A = A.substring(0, c), o = !0);
                let d = On(A), h = [];
                if (d) {
                    let {args: e, methodName: i} = d;
                    for (let t, i = 0; i < e.length; i++) t = e[i], t.literal || h.push(t);
                    let n = t.dynamicFns;
                    (n && n[i] || d.static) && (h.push(i), d.dynamicFn = !0)
                } else h.push(A);
                n.push({
                    source: A,
                    mode: a,
                    negate: r,
                    customEvent: o,
                    signature: d,
                    dependencies: h,
                    event: l
                }), s = In.lastIndex
            }
            if (s && s < e.length) {
                let t = e.substring(s);
                t && n.push({literal: t})
            }
            return n.length ? n : null
        }

        static _evaluateBinding(e, t, i, n, s, a) {
            let r;
            return r = t.signature ? mn(e, i, n, s, t.signature) : i != t.source ? Xt(e, t.source) : a && Yt(i) ? Xt(e, i) : e.__data[i], t.negate && (r = !r), r
        }
    }

    return ji = i, i
}));

class Fn {
    constructor() {
        this.stack = []
    }

    registerHost(e) {
        if (this.stack.length) {
            this.stack[this.stack.length - 1]._enqueueClient(e)
        }
    }

    beginHosting(e) {
        this.stack.push(e)
    }

    endHosting(e) {
        let t = this.stack.length;
        t && this.stack[t - 1] == e && this.stack.pop()
    }
}

const Un = new Fn;
var qn = {PropertyEffects: Hn};

function jn(e) {
    const t = {};
    for (let i in e) {
        const n = e[i];
        t[i] = "function" == typeof n ? {type: n} : n
    }
    return t
}

const Yn = yt((e => {
    const t = bi(e);

    function i(e) {
        const t = Object.getPrototypeOf(e);
        return t.prototype instanceof s ? t : null
    }

    function n(e) {
        if (!e.hasOwnProperty(JSCompiler_renameProperty("__ownProperties", e))) {
            let t = null;
            e.hasOwnProperty(JSCompiler_renameProperty("properties", e)) && e.properties && (t = jn(e.properties)), e.__ownProperties = t
        }
        return e.__ownProperties
    }

    class s extends t {
        static get observedAttributes() {
            const e = this._properties;
            return e ? Object.keys(e).map((e => this.attributeNameForProperty(e))) : []
        }

        static finalize() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("__finalized", this))) {
                const e = i(this);
                e && e.finalize(), this.__finalized = !0, this._finalizeClass()
            }
        }

        static _finalizeClass() {
            const e = n(this);
            e && this.createProperties(e)
        }

        static get _properties() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("__properties", this))) {
                const e = i(this);
                this.__properties = Object.assign({}, e && e._properties, n(this))
            }
            return this.__properties
        }

        static typeForProperty(e) {
            const t = this._properties[e];
            return t && t.type
        }

        _initializeProperties() {
            this.constructor.finalize(), super._initializeProperties()
        }

        connectedCallback() {
            super.connectedCallback && super.connectedCallback(), this._enableProperties()
        }

        disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback()
        }
    }

    return s
}));
var $n = {PropertiesMixin: Yn};
const Vn = yt((e => {
    const t = Yn(Hn(e));

    function i(e, t, i, n) {
        i.computed && (i.readOnly = !0), i.computed && !e._hasReadOnlyEffect(t) && e._createComputedProperty(t, i.computed, n), i.readOnly && !e._hasReadOnlyEffect(t) && e._createReadOnlyProperty(t, !i.computed), i.reflectToAttribute && !e._hasReflectEffect(t) && e._createReflectedProperty(t), i.notify && !e._hasNotifyEffect(t) && e._createNotifyingProperty(t), i.observer && e._createPropertyObserver(t, i.observer, n[i.observer]), e._addPropertyToAttributeMap(t)
    }

    return class extends t {
        static _finalizeClass() {
            super._finalizeClass(), this.hasOwnProperty(JSCompiler_renameProperty("is", this)) && this.is && Wn(this.prototype);
            const e = ((t = this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers", t)) || (t.__ownObservers = t.hasOwnProperty(JSCompiler_renameProperty("observers", t)) ? t.observers : null), t.__ownObservers);
            var t;
            e && this.createObservers(e, this._properties);
            let i = this.template;
            i && ("string" == typeof i ? (console.error("template getter must return HTMLTemplateElement"), i = null) : i = i.cloneNode(!0)), this.prototype._template = i
        }

        static createProperties(e) {
            for (let t in e) i(this.prototype, t, e[t], e)
        }

        static createObservers(e, t) {
            const i = this.prototype;
            for (let n = 0; n < e.length; n++) i._createMethodObserver(e[n], t)
        }

        static get template() {
            return this.hasOwnProperty(JSCompiler_renameProperty("_template", this)) || (this._template = qt && qt.import(this.is, "template") || Object.getPrototypeOf(this.prototype).constructor.template), this._template
        }

        static get importPath() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("_importPath", this))) {
                const e = this.importMeta;
                if (e) this._importPath = at(e.url); else {
                    const e = qt && qt.import(this.is);
                    this._importPath = e && e.assetpath || Object.getPrototypeOf(this.prototype).constructor.importPath
                }
            }
            return this._importPath
        }

        constructor() {
            super(), this._template, this._importPath, this.rootPath, this.importPath, this.root, this.$
        }

        _initializeProperties() {
            Kn++, this.constructor.finalize(), this.constructor._finalizeTemplate(this.localName), super._initializeProperties(), this.rootPath = ct, this.importPath = this.constructor.importPath;
            let e = function (e) {
                if (!e.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults", e))) {
                    e.__propertyDefaults = null;
                    let t = e._properties;
                    for (let i in t) {
                        let n = t[i];
                        "value" in n && (e.__propertyDefaults = e.__propertyDefaults || {}, e.__propertyDefaults[i] = n)
                    }
                }
                return e.__propertyDefaults
            }(this.constructor);
            if (e) for (let t in e) {
                let i = e[t];
                if (!this.hasOwnProperty(t)) {
                    let e = "function" == typeof i.value ? i.value.call(this) : i.value;
                    this._hasAccessor(t) ? this._setPendingProperty(t, e, !0) : this[t] = e
                }
            }
        }

        static _processStyleText(e, t) {
            return st(e, t)
        }

        static _finalizeTemplate(e) {
            const t = this.prototype._template;
            if (t && !t.__polymerFinalized) {
                t.__polymerFinalized = !0;
                const i = this.importPath;
                !function (e, t, i, n) {
                    const s = t.content.querySelectorAll("style"), a = Tt(t), r = It(i),
                        A = t.content.firstElementChild;
                    for (let i, s = 0; s < r.length; s++) i = r[s], i.textContent = e._processStyleText(i.textContent, n), t.content.insertBefore(i, A);
                    let o = 0;
                    for (let t = 0; t < a.length; t++) {
                        let i = a[t], r = s[o];
                        r !== i ? (i = i.cloneNode(!0), r.parentNode.insertBefore(i, r)) : o++, i.textContent = e._processStyleText(i.textContent, n)
                    }
                    window.ShadyCSS && window.ShadyCSS.prepareTemplate(t, i)
                }(this, t, e, i ? nt(i) : ""), this.prototype._bindTemplate(t)
            }
        }

        connectedCallback() {
            window.ShadyCSS && this._template && window.ShadyCSS.styleElement(this), super.connectedCallback()
        }

        ready() {
            this._template && (this.root = this._stampTemplate(this._template), this.$ = this.root.$), super.ready()
        }

        _readyClients() {
            this._template && (this.root = this._attachDom(this.root)), super._readyClients()
        }

        _attachDom(e) {
            if (this.attachShadow) return e ? (this.shadowRoot || this.attachShadow({mode: "open"}), this.shadowRoot.appendChild(e), this.shadowRoot) : null;
            throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")
        }

        updateStyles(e) {
            window.ShadyCSS && window.ShadyCSS.styleSubtree(this, e)
        }

        resolveUrl(e, t) {
            return !t && this.importPath && (t = nt(this.importPath)), nt(e, t)
        }

        static _parseTemplateContent(e, t, i) {
            return t.dynamicFns = t.dynamicFns || this._properties, super._parseTemplateContent(e, t, i)
        }
    }
}));
let Kn = 0;
const Qn = [];

function Gn(e) {
    console.log("[" + e.is + "]: registered")
}

function Wn(e) {
    Qn.push(e)
}

function Jn() {
    Qn.forEach(Gn)
}

const Xn = function (e) {
    window.ShadyCSS && window.ShadyCSS.styleDocument(e)
};
var Zn = {
    ElementMixin: Vn, get instanceCount() {
        return Kn
    }, registrations: Qn, register: Wn, dumpRegistrations: Jn, updateStyles: Xn
};
const es = class e {
    constructor() {
        this._asyncModule = null, this._callback = null, this._timer = null
    }

    setConfig(e, t) {
        this._asyncModule = e, this._callback = t, this._timer = this._asyncModule.run((() => {
            this._timer = null, this._callback()
        }))
    }

    cancel() {
        this.isActive() && (this._asyncModule.cancel(this._timer), this._timer = null)
    }

    flush() {
        this.isActive() && (this.cancel(), this._callback())
    }

    isActive() {
        return null != this._timer
    }

    static debounce(t, i, n) {
        return t instanceof e ? t.cancel() : t = new e, t.setConfig(i, n), t
    }
};
var ts = {Debouncer: es};
let is = "string" == typeof document.head.style.touchAction, ns = "__polymerGestures", ss = "__polymerGesturesHandled",
    as = "__polymerGesturesTouchAction", rs = 25, As = 5, os = 2, ls = 2500,
    cs = ["mousedown", "mousemove", "mouseup", "click"], ds = [0, 1, 4, 2], hs = function () {
        try {
            return 1 === new MouseEvent("test", {buttons: 1}).buttons
        } catch (e) {
            return !1
        }
    }();

function us(e) {
    return -1 < cs.indexOf(e)
}

let ps = !1;

function ms(e) {
    if (!us(e) && "touchend" !== e) return is && ps && pt ? {passive: !0} : void 0
}

!function () {
    try {
        let e = Object.defineProperty({}, "passive", {
            get() {
                ps = !0
            }
        });
        window.addEventListener("test", null, e), window.removeEventListener("test", null, e)
    } catch (e) {
    }
}();
let _s = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
const fs = function () {
};
fs.prototype.state, fs.prototype.started, fs.prototype.moves, fs.prototype.x, fs.prototype.y, fs.prototype.prevent, fs.prototype.addMove, fs.prototype.movefn, fs.prototype.upFn;
const gs = function () {
};
gs.prototype.reset, gs.prototype.mousedown, gs.prototype.mousemove, gs.prototype.mouseup, gs.prototype.touchstart, gs.prototype.touchmove, gs.prototype.touchend, gs.prototype.click, gs.prototype.info, gs.prototype.emits;
const ys = [], bs = {button: !0, input: !0, keygen: !0, meter: !0, output: !0, textarea: !0, progress: !0, select: !0},
    vs = {
        button: !0,
        command: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        optgroup: !0,
        option: !0,
        select: !0,
        textarea: !0
    };

function ws(e) {
    return bs[e.localName] || !1
}

function Ss(e) {
    let t = Array.prototype.slice.call(e.labels || []);
    if (!t.length) {
        t = [];
        let i = e.getRootNode();
        if (e.id) {
            let n = i.querySelectorAll(`label[for = ${e.id}]`);
            for (let e = 0; e < n.length; e++) t.push(n[e])
        }
    }
    return t
}

let Cs = function (e) {
    let t = e.sourceCapabilities;
    if ((!t || t.firesTouchEvents) && (e[ss] = {skip: !0}, "click" === e.type)) {
        let t = !1, i = e.composedPath && e.composedPath();
        if (i) for (let e = 0; e < i.length; e++) {
            if (i[e].nodeType === Node.ELEMENT_NODE) if ("label" === i[e].localName) ys.push(i[e]); else if (ws(i[e])) {
                let n = Ss(i[e]);
                for (let e = 0; e < n.length; e++) t = t || -1 < ys.indexOf(n[e])
            }
            if (i[e] === Ts.mouse.target) return
        }
        if (t) return;
        e.preventDefault(), e.stopPropagation()
    }
};

function xs(e) {
    let t = _s ? ["click"] : cs;
    for (let i, n = 0; n < t.length; n++) i = t[n], e ? (ys.length = 0, document.addEventListener(i, Cs, !0)) : document.removeEventListener(i, Cs, !0)
}

function Ps(e) {
    Ts.mouse.mouseIgnoreJob || xs(!0);
    Ts.mouse.target = e.composedPath()[0], Ts.mouse.mouseIgnoreJob = es.debounce(Ts.mouse.mouseIgnoreJob, pi.after(ls), (function () {
        xs(), Ts.mouse.target = null, Ts.mouse.mouseIgnoreJob = null
    }))
}

function Es(e) {
    let t = e.type;
    if (!us(t)) return !1;
    if ("mousemove" === t) {
        let t = void 0 === e.buttons ? 1 : e.buttons;
        return e instanceof window.MouseEvent && !hs && (t = ds[e.which] || 0), !!(1 & t)
    }
    return 0 === (void 0 === e.button ? 0 : e.button)
}

function ks(e) {
    if ("click" === e.type) {
        if (0 === e.detail) return !0;
        let t = Ds(e);
        if (!t.nodeType || t.nodeType !== Node.ELEMENT_NODE) return !0;
        let i = t.getBoundingClientRect(), n = e.pageX, s = e.pageY;
        return !(n >= i.left && n <= i.right && s >= i.top && s <= i.bottom)
    }
    return !1
}

let Ts = {mouse: {target: null, mouseIgnoreJob: null}, touch: {x: 0, y: 0, id: -1, scrollDecided: !1}};

function Is(e) {
    let t = "auto", i = e.composedPath && e.composedPath();
    if (i) for (let e, n = 0; n < i.length; n++) if (e = i[n], e[as]) {
        t = e[as];
        break
    }
    return t
}

function Ns(e, t, i) {
    e.movefn = t, e.upfn = i, document.addEventListener("mousemove", t), document.addEventListener("mouseup", i)
}

function Os(e) {
    document.removeEventListener("mousemove", e.movefn), document.removeEventListener("mouseup", e.upfn), e.movefn = null, e.upfn = null
}

document.addEventListener("touchend", Ps, !!ps && {passive: !0});
const Ms = {}, Ls = [];

function Rs(e, t) {
    let i = document.elementFromPoint(e, t), n = i;
    for (; n && n.shadowRoot && !window.ShadyDOM;) {
        let s = n;
        if (n = n.shadowRoot.elementFromPoint(e, t), s === n) break;
        n && (i = n)
    }
    return i
}

function Ds(e) {
    if (e.composedPath) {
        const t = e.composedPath();
        return 0 < t.length ? t[0] : e.target
    }
    return e.target
}

function Bs(e) {
    let t, i = e.type, n = e.currentTarget[ns];
    if (!n) return;
    let s = n[i];
    if (s) {
        if (!e[ss] && (e[ss] = {}, "touch" === i.slice(0, 5))) {
            let t = (e = e).changedTouches[0];
            if ("touchstart" === i && 1 === e.touches.length && (Ts.touch.id = t.identifier), Ts.touch.id !== t.identifier) return;
            is || "touchstart" !== i && "touchmove" !== i || zs(e)
        }
        if (t = e[ss], !t.skip) {
            for (let i, n = 0; n < Ls.length; n++) i = Ls[n], s[i.name] && !t[i.name] && i.flow && -1 < i.flow.start.indexOf(e.type) && i.reset && i.reset();
            for (let n, a = 0; a < Ls.length; a++) n = Ls[a], s[n.name] && !t[n.name] && (t[n.name] = !0, n[i](e))
        }
    }
}

function zs(e) {
    let t = e.changedTouches[0], i = e.type;
    if ("touchstart" === i) Ts.touch.x = t.clientX, Ts.touch.y = t.clientY, Ts.touch.scrollDecided = !1; else if ("touchmove" === i) {
        if (Ts.touch.scrollDecided) return;
        Ts.touch.scrollDecided = !0;
        let i = Is(e), n = !1, s = Math.abs(Ts.touch.x - t.clientX), a = Math.abs(Ts.touch.y - t.clientY);
        e.cancelable && ("none" === i ? n = !0 : "pan-x" === i ? n = a > s : "pan-y" === i && (n = s > a)), n ? e.preventDefault() : Ks("track")
    }
}

function Hs(e, t, i) {
    return !!Ms[t] && (Us(e, t, i), !0)
}

function Fs(e, t, i) {
    return !!Ms[t] && (qs(e, t, i), !0)
}

function Us(e, t, i) {
    let n = Ms[t], s = n.deps, a = n.name, r = e[ns];
    r || (e[ns] = r = {});
    for (let t, i, n = 0; n < s.length; n++) t = s[n], _s && us(t) && "click" !== t || (i = r[t], i || (r[t] = i = {_count: 0}), 0 === i._count && e.addEventListener(t, Bs, ms(t)), i[a] = (i[a] || 0) + 1, i._count = (i._count || 0) + 1);
    e.addEventListener(t, i), n.touchAction && $s(e, n.touchAction)
}

function qs(e, t, i) {
    let n = Ms[t], s = n.deps, a = n.name, r = e[ns];
    if (r) for (let t, i, n = 0; n < s.length; n++) t = s[n], i = r[t], i && i[a] && (i[a] = (i[a] || 1) - 1, i._count = (i._count || 1) - 1, 0 === i._count && e.removeEventListener(t, Bs, ms(t)));
    e.removeEventListener(t, i)
}

function js(e) {
    Ls.push(e);
    for (let t = 0; t < e.emits.length; t++) Ms[e.emits[t]] = e
}

function Ys(e) {
    for (let t, i = 0; i < Ls.length; i++) {
        t = Ls[i];
        for (let i, n = 0; n < t.emits.length; n++) if (i = t.emits[n], i === e) return t
    }
    return null
}

function $s(e, t) {
    is && fi.run((() => {
        e.style.touchAction = t
    })), e[as] = t
}

function Vs(e, t, i) {
    let n = new Event(t, {bubbles: !0, cancelable: !0, composed: !0});
    if (n.detail = i, e.dispatchEvent(n), n.defaultPrevented) {
        let e = i.preventer || i.sourceEvent;
        e && e.preventDefault && e.preventDefault()
    }
}

function Ks(e) {
    let t = Ys(e);
    t.info && (t.info.prevent = !0)
}

function Qs() {
    Ts.mouse.mouseIgnoreJob && Ts.mouse.mouseIgnoreJob.flush()
}

function Gs(e, t, i, n) {
    t && Vs(t, e, {
        x: i.clientX, y: i.clientY, sourceEvent: i, preventer: n, prevent: function (e) {
            return Ks(e)
        }
    })
}

function Ws(e, t, i) {
    if (e.prevent) return !1;
    if (e.started) return !0;
    let n = Math.abs(e.x - t), s = Math.abs(e.y - i);
    return n >= As || s >= As
}

function Js(e, t, i) {
    if (!t) return;
    let n, s = e.moves[e.moves.length - 2], a = e.moves[e.moves.length - 1], r = a.x - e.x, A = a.y - e.y, o = 0;
    s && (n = a.x - s.x, o = a.y - s.y), Vs(t, "track", {
        state: e.state,
        x: i.clientX,
        y: i.clientY,
        dx: r,
        dy: A,
        ddx: n,
        ddy: o,
        sourceEvent: i,
        hover: function () {
            return Rs(i.clientX, i.clientY)
        }
    })
}

function Xs(e, t, i) {
    let n = Math.abs(t.clientX - e.x), s = Math.abs(t.clientY - e.y), a = Ds(i || t);
    !a || vs[a.localName] && a.hasAttribute("disabled") || (isNaN(n) || isNaN(s) || n <= rs && s <= rs || ks(t)) && (e.prevent || Vs(a, "tap", {
        x: t.clientX,
        y: t.clientY,
        sourceEvent: t,
        preventer: i
    }))
}

js({
    name: "downup",
    deps: ["mousedown", "touchstart", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"]},
    emits: ["down", "up"],
    info: {movefn: null, upfn: null},
    reset: function () {
        Os(this.info)
    },
    mousedown: function (e) {
        if (!Es(e)) return;
        let t = Ds(e), i = this;
        Ns(this.info, (function (e) {
            Es(e) || (Gs("up", t, e), Os(i.info))
        }), (function (e) {
            Es(e) && Gs("up", t, e), Os(i.info)
        })), Gs("down", t, e)
    },
    touchstart: function (e) {
        Gs("down", Ds(e), e.changedTouches[0], e)
    },
    touchend: function (e) {
        Gs("up", Ds(e), e.changedTouches[0], e)
    }
}), js({
    name: "track",
    touchAction: "none",
    deps: ["mousedown", "touchstart", "touchmove", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"]},
    emits: ["track"],
    info: {
        x: 0, y: 0, state: "start", started: !1, moves: [], addMove: function (e) {
            this.moves.length > os && this.moves.shift(), this.moves.push(e)
        }, movefn: null, upfn: null, prevent: !1
    },
    reset: function () {
        this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, Os(this.info)
    },
    mousedown: function (e) {
        if (!Es(e)) return;
        let t = Ds(e), i = this, n = function (e) {
            let n = e.clientX, s = e.clientY;
            Ws(i.info, n, s) && (i.info.state = i.info.started ? "mouseup" === e.type ? "end" : "track" : "start", "start" === i.info.state && Ks("tap"), i.info.addMove({
                x: n,
                y: s
            }), Es(e) || (i.info.state = "end", Os(i.info)), t && Js(i.info, t, e), i.info.started = !0)
        };
        Ns(this.info, n, (function (e) {
            i.info.started && n(e), Os(i.info)
        })), this.info.x = e.clientX, this.info.y = e.clientY
    },
    touchstart: function (e) {
        let t = e.changedTouches[0];
        this.info.x = t.clientX, this.info.y = t.clientY
    },
    touchmove: function (e) {
        let t = Ds(e), i = e.changedTouches[0], n = i.clientX, s = i.clientY;
        Ws(this.info, n, s) && ("start" === this.info.state && Ks("tap"), this.info.addMove({
            x: n,
            y: s
        }), Js(this.info, t, i), this.info.state = "track", this.info.started = !0)
    },
    touchend: function (e) {
        let t = Ds(e), i = e.changedTouches[0];
        this.info.started && (this.info.state = "end", this.info.addMove({
            x: i.clientX,
            y: i.clientY
        }), Js(this.info, t, i))
    }
}), js({
    name: "tap",
    deps: ["mousedown", "click", "touchstart", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["click", "touchend"]},
    emits: ["tap"],
    info: {x: NaN, y: NaN, prevent: !1},
    reset: function () {
        this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1
    },
    mousedown: function (e) {
        Es(e) && (this.info.x = e.clientX, this.info.y = e.clientY)
    },
    click: function (e) {
        Es(e) && Xs(this.info, e)
    },
    touchstart: function (e) {
        const t = e.changedTouches[0];
        this.info.x = t.clientX, this.info.y = t.clientY
    },
    touchend: function (e) {
        Xs(this.info, e.changedTouches[0], e)
    }
});
const Zs = Ds, ea = Hs, ta = Fs;
var ia = {
    gestures: Ms,
    recognizers: Ls,
    deepTargetFind: Rs,
    addListener: Hs,
    removeListener: Fs,
    register: js,
    setTouchAction: $s,
    prevent: Ks,
    resetMouseCanceller: Qs,
    findOriginalTarget: Zs,
    add: ea,
    remove: ta
};
const na = ia, sa = yt((e => class extends e {
    _addEventListenerToNode(e, t, i) {
        na.addListener(e, t, i) || super._addEventListenerToNode(e, t, i)
    }

    _removeEventListenerFromNode(e, t, i) {
        na.removeListener(e, t, i) || super._removeEventListenerFromNode(e, t, i)
    }
}));
var aa = {GestureEventListeners: sa};
const ra = /:host\(:dir\((ltr|rtl)\)\)/g, Aa = ':host([dir="$1"])', oa = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
    la = ':host([dir="$2"]) $1', ca = [];
let da = null, ha = "";

function ua() {
    ha = document.documentElement.getAttribute("dir")
}

function pa(e) {
    if (!e.__autoDirOptOut) {
        e.setAttribute("dir", ha)
    }
}

function ma() {
    ua(), ha = document.documentElement.getAttribute("dir");
    for (let e = 0; e < ca.length; e++) pa(ca[e])
}

function _a() {
    da && da.takeRecords().length && ma()
}

const fa = yt((e => {
    da || (ua(), da = new MutationObserver(ma), da.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["dir"]
    }));
    const t = Pi(e);

    class i extends t {
        static _processStyleText(e, t) {
            return e = super._processStyleText(e, t), e = this._replaceDirInCssText(e)
        }

        static _replaceDirInCssText(e) {
            let t = e;
            return t = t.replace(ra, ':host([dir="$1"])'), t = t.replace(oa, la), e !== t && (this.__activateDir = !0), t
        }

        constructor() {
            super(), this.__autoDirOptOut = !1
        }

        ready() {
            super.ready(), this.__autoDirOptOut = this.hasAttribute("dir")
        }

        connectedCallback() {
            t.prototype.connectedCallback && super.connectedCallback(), this.constructor.__activateDir && (_a(), ca.push(this), pa(this))
        }

        disconnectedCallback() {
            if (t.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.__activateDir) {
                const e = ca.indexOf(this);
                -1 < e && ca.splice(e, 1)
            }
        }
    }

    return i.__activateDir = !1, i
}));
var ga = {DirMixin: fa};
let ya = !1, ba = [], va = [];

function wa() {
    ya = !0, requestAnimationFrame((function () {
        ya = !1, Sa(ba), setTimeout((function () {
            Ca(va)
        }))
    }))
}

function Sa(e) {
    for (; e.length;) xa(e.shift())
}

function Ca(e) {
    for (let t = 0, i = e.length; t < i; t++) xa(e.shift())
}

function xa(e) {
    const t = e[0], i = e[1], n = e[2];
    try {
        i.apply(t, n)
    } catch (e) {
        setTimeout((() => {
            throw e
        }))
    }
}

function Pa() {
    for (; ba.length || va.length;) Sa(ba), Sa(va);
    ya = !1
}

function Ea(e, t, i) {
    ya || wa(), ba.push([e, t, i])
}

function ka(e, t, i) {
    ya || wa(), va.push([e, t, i])
}

var Ta = {beforeNextRender: Ea, afterNextRender: ka, flush: Pa};

function Ia() {
    document.body.removeAttribute("unresolved")
}

function Na(e, t, i) {
    return {index: e, removed: t, addedCount: i}
}

"interactive" === document.readyState || "complete" === document.readyState ? Ia() : window.addEventListener("DOMContentLoaded", Ia);
const Oa = 0, Ma = 1, La = 2, Ra = 3;

function Da(e, t, i, n, s, a) {
    let r = a - s + 1, A = i - t + 1, o = Array(r);
    for (let e = 0; e < r; e++) o[e] = Array(A), o[e][0] = e;
    for (let e = 0; e < A; e++) o[0][e] = e;
    for (let i = 1; i < r; i++) for (let a = 1; a < A; a++) if (qa(e[t + a - 1], n[s + i - 1])) o[i][a] = o[i - 1][a - 1]; else {
        let e = o[i - 1][a] + 1, t = o[i][a - 1] + 1;
        o[i][a] = e < t ? e : t
    }
    return o
}

function Ba(e) {
    let t = e.length - 1, i = e[0].length - 1, n = e[t][i], s = [];
    for (; 0 < t || 0 < i;) {
        if (0 == t) {
            s.push(2), i--;
            continue
        }
        if (0 == i) {
            s.push(3), t--;
            continue
        }
        let a, r = e[t - 1][i - 1], A = e[t - 1][i], o = e[t][i - 1];
        a = A < o ? A < r ? A : r : o < r ? o : r, a == r ? (r == n ? s.push(0) : (s.push(1), n = r), t--, i--) : a == A ? (s.push(3), t--, n = A) : (s.push(2), i--, n = o)
    }
    return s.reverse(), s
}

function za(e, t, i, n, s, a) {
    let r, A = 0, o = 0, l = Math.min(i - t, a - s);
    if (0 == t && 0 == s && (A = Ha(e, n, l)), i == e.length && a == n.length && (o = Fa(e, n, l - A)), s += A, a -= o, 0 == (i -= o) - (t += A) && 0 == a - s) return [];
    if (t == i) {
        for (r = Na(t, [], 0); s < a;) r.removed.push(n[s++]);
        return [r]
    }
    if (s == a) return [Na(t, [], i - t)];
    let c = Ba(Da(e, t, i, n, s, a));
    r = void 0;
    let d = [], h = t, u = s;
    for (let e = 0; e < c.length; e++) switch (c[e]) {
        case 0:
            r && (d.push(r), r = void 0), h++, u++;
            break;
        case 1:
            r || (r = Na(h, [], 0)), r.addedCount++, h++, r.removed.push(n[u]), u++;
            break;
        case 2:
            r || (r = Na(h, [], 0)), r.addedCount++, h++;
            break;
        case 3:
            r || (r = Na(h, [], 0)), r.removed.push(n[u]), u++
    }
    return r && d.push(r), d
}

function Ha(e, t, i) {
    for (let n = 0; n < i; n++) if (!qa(e[n], t[n])) return n;
    return i
}

function Fa(e, t, i) {
    let n = e.length, s = t.length, a = 0;
    for (; a < i && qa(e[--n], t[--s]);) a++;
    return a
}

function Ua(e, t) {
    return za(e, 0, e.length, t, 0, t.length)
}

function qa(e, t) {
    return e === t
}

var ja = {calculateSplices: Ua};

function Ya(e) {
    return "slot" === e.localName
}

class $a {
    static getFlattenedNodes(e) {
        return Ya(e) ? (e = e).assignedNodes({flatten: !0}) : Array.from(e.childNodes).map((e => Ya(e) ? (e = e).assignedNodes({flatten: !0}) : [e])).reduce(((e, t) => e.concat(t)), [])
    }

    constructor(e, t) {
        this._shadyChildrenObserver = null, this._nativeChildrenObserver = null, this._connected = !1, this._target = e, this.callback = t, this._effectiveNodes = [], this._observer = null, this._scheduled = !1, this._boundSchedule = () => {
            this._schedule()
        }, this.connect(), this._schedule()
    }

    connect() {
        Ya(this._target) ? this._listenSlots([this._target]) : this._target.children && (this._listenSlots(this._target.children), window.ShadyDOM ? this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, (e => {
            this._processMutations(e)
        })) : (this._nativeChildrenObserver = new MutationObserver((e => {
            this._processMutations(e)
        })), this._nativeChildrenObserver.observe(this._target, {childList: !0}))), this._connected = !0
    }

    disconnect() {
        Ya(this._target) ? this._unlistenSlots([this._target]) : this._target.children && (this._unlistenSlots(this._target.children), window.ShadyDOM && this._shadyChildrenObserver ? (ShadyDOM.unobserveChildren(this._shadyChildrenObserver), this._shadyChildrenObserver = null) : this._nativeChildrenObserver && (this._nativeChildrenObserver.disconnect(), this._nativeChildrenObserver = null)), this._connected = !1
    }

    _schedule() {
        this._scheduled || (this._scheduled = !0, fi.run((() => this.flush())))
    }

    _processMutations(e) {
        this._processSlotMutations(e), this.flush()
    }

    _processSlotMutations(e) {
        if (e) for (let t, i = 0; i < e.length; i++) t = e[i], t.addedNodes && this._listenSlots(t.addedNodes), t.removedNodes && this._unlistenSlots(t.removedNodes)
    }

    flush() {
        if (!this._connected) return !1;
        window.ShadyDOM && ShadyDOM.flush(), this._nativeChildrenObserver ? this._processSlotMutations(this._nativeChildrenObserver.takeRecords()) : this._shadyChildrenObserver && this._processSlotMutations(this._shadyChildrenObserver.takeRecords()), this._scheduled = !1;
        let e = {target: this._target, addedNodes: [], removedNodes: []},
            t = this.constructor.getFlattenedNodes(this._target), i = Ua(t, this._effectiveNodes);
        for (let t, n = 0; n < i.length && (t = i[n]); n++) for (let i, n = 0; n < t.removed.length && (i = t.removed[n]); n++) e.removedNodes.push(i);
        for (let n, s = 0; s < i.length && (n = i[s]); s++) for (let i = n.index; i < n.index + n.addedCount; i++) e.addedNodes.push(t[i]);
        this._effectiveNodes = t;
        let n = !1;
        return (e.addedNodes.length || e.removedNodes.length) && (n = !0, this.callback.call(this._target, e)), n
    }

    _listenSlots(e) {
        for (let t, i = 0; i < e.length; i++) t = e[i], Ya(t) && t.addEventListener("slotchange", this._boundSchedule)
    }

    _unlistenSlots(e) {
        for (let t, i = 0; i < e.length; i++) t = e[i], Ya(t) && t.removeEventListener("slotchange", this._boundSchedule)
    }
}

var Va = {FlattenedNodesObserver: $a};
let Ka = [];
const Qa = function (e) {
    Ka.push(e)
};

function Ga() {
    const e = !!Ka.length;
    for (; Ka.length;) try {
        Ka.shift().flush()
    } catch (e) {
        setTimeout((() => {
            throw e
        }))
    }
    return e
}

const Wa = function () {
    let e, t;
    do {
        e = window.ShadyDOM && ShadyDOM.flush(), window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(), t = Ga()
    } while (e || t)
};
var Ja = {enqueueDebouncer: Qa, flush: Wa};
const Xa = Element.prototype,
    Za = Xa.matches || Xa.matchesSelector || Xa.mozMatchesSelector || Xa.msMatchesSelector || Xa.oMatchesSelector || Xa.webkitMatchesSelector,
    er = function (e, t) {
        return Za.call(e, t)
    };

class tr {
    constructor(e) {
        this.node = e
    }

    observeNodes(e) {
        return new $a(this.node, e)
    }

    unobserveNodes(e) {
        e.disconnect()
    }

    notifyObserver() {
    }

    deepContains(e) {
        if (this.node.contains(e)) return !0;
        let t = e, i = e.ownerDocument;
        for (; t && t !== i && t !== this.node;) t = t.parentNode || t.host;
        return t === this.node
    }

    getOwnerRoot() {
        return this.node.getRootNode()
    }

    getDistributedNodes() {
        return "slot" === this.node.localName ? this.node.assignedNodes({flatten: !0}) : []
    }

    getDestinationInsertionPoints() {
        let e = [], t = this.node.assignedSlot;
        for (; t;) e.push(t), t = t.assignedSlot;
        return e
    }

    importNode(e, t) {
        return (this.node instanceof Document ? this.node : this.node.ownerDocument).importNode(e, t)
    }

    getEffectiveChildNodes() {
        return $a.getFlattenedNodes(this.node)
    }

    queryDistributedElements(e) {
        let t = this.getEffectiveChildNodes(), i = [];
        for (let n, s = 0, a = t.length; s < a && (n = t[s]); s++) n.nodeType === Node.ELEMENT_NODE && er(n, e) && i.push(n);
        return i
    }

    get activeElement() {
        let e = this.node;
        return void 0 !== e._activeElement ? e._activeElement : e.activeElement
    }
}

function ir(e, t) {
    for (let i, n = 0; n < t.length; n++) i = t[n], e[i] = function () {
        return this.node[i].apply(this.node, arguments)
    }
}

function nr(e, t) {
    for (let i, n = 0; n < t.length; n++) i = t[n], Object.defineProperty(e, i, {
        get: function () {
            return this.node[i]
        }, configurable: !0
    })
}

function sr(e, t) {
    for (let i, n = 0; n < t.length; n++) i = t[n], Object.defineProperty(e, i, {
        get: function () {
            return this.node[i]
        }, set: function (e) {
            this.node[i] = e
        }, configurable: !0
    })
}

class ar {
    constructor(e) {
        this.event = e
    }

    get rootTarget() {
        return this.event.composedPath()[0]
    }

    get localTarget() {
        return this.event.target
    }

    get path() {
        return this.event.composedPath()
    }
}

tr.prototype.cloneNode, tr.prototype.appendChild, tr.prototype.insertBefore, tr.prototype.removeChild, tr.prototype.replaceChild, tr.prototype.setAttribute, tr.prototype.removeAttribute, tr.prototype.querySelector, tr.prototype.querySelectorAll, tr.prototype.parentNode, tr.prototype.firstChild, tr.prototype.lastChild, tr.prototype.nextSibling, tr.prototype.previousSibling, tr.prototype.firstElementChild, tr.prototype.lastElementChild, tr.prototype.nextElementSibling, tr.prototype.previousElementSibling, tr.prototype.childNodes, tr.prototype.children, tr.prototype.classList, tr.prototype.textContent, tr.prototype.innerHTML, ir(tr.prototype, ["cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector", "querySelectorAll"]), nr(tr.prototype, ["parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling", "childNodes", "children", "classList"]), sr(tr.prototype, ["textContent", "innerHTML"]);
const rr = function (e) {
    if (!(e = e || document).__domApi) {
        let t;
        t = e instanceof Event ? new ar(e) : new tr(e), e.__domApi = t
    }
    return e.__domApi
};
var Ar = {matchesSelector: er, DomApi: tr, dom: rr, flush: Wa, addDebouncer: Qa};
let or = window.ShadyCSS;
const lr = yt((e => {
    const t = fa(sa(Vn(e))), i = {x: "pan-x", y: "pan-y", none: "none", all: "auto"};

    class n extends t {
        constructor() {
            super(), this.isAttached, this.__boundListeners, this._debouncers, this._applyListeners()
        }

        static get importMeta() {
            return this.prototype.importMeta
        }

        created() {
        }

        connectedCallback() {
            super.connectedCallback(), this.isAttached = !0, this.attached()
        }

        attached() {
        }

        disconnectedCallback() {
            super.disconnectedCallback(), this.isAttached = !1, this.detached()
        }

        detached() {
        }

        attributeChangedCallback(e, t, i, n) {
            t !== i && (super.attributeChangedCallback(e, t, i, n), this.attributeChanged(e, t, i))
        }

        attributeChanged(e, t, i) {
        }

        _initializeProperties() {
            let e = Object.getPrototypeOf(this);
            e.hasOwnProperty("__hasRegisterFinished") || (e.__hasRegisterFinished = !0, this._registered()), super._initializeProperties(), this.root = this, this.created()
        }

        _registered() {
        }

        ready() {
            this._ensureAttributes(), super.ready()
        }

        _ensureAttributes() {
        }

        _applyListeners() {
        }

        serialize(e) {
            return this._serializeValue(e)
        }

        deserialize(e, t) {
            return this._deserializeValue(e, t)
        }

        reflectPropertyToAttribute(e, t, i) {
            this._propertyToAttribute(e, t, i)
        }

        serializeValueToAttribute(e, t, i) {
            this._valueToNodeAttribute(i || this, e, t)
        }

        extend(e, t) {
            if (!e || !t) return e || t;
            let i = Object.getOwnPropertyNames(t);
            for (let n, s, a = 0; a < i.length && (n = i[a]); a++) s = Object.getOwnPropertyDescriptor(t, n), s && Object.defineProperty(e, n, s);
            return e
        }

        mixin(e, t) {
            for (let i in t) e[i] = t[i];
            return e
        }

        chainObject(e, t) {
            return e && t && e !== t && (e.__proto__ = t), e
        }

        instanceTemplate(e) {
            let t = this.constructor._contentForTemplate(e);
            return document.importNode(t, !0)
        }

        fire(e, t, i) {
            i = i || {}, t = null == t ? {} : t;
            let n = new Event(e, {
                bubbles: void 0 === i.bubbles || i.bubbles,
                cancelable: !!i.cancelable,
                composed: void 0 === i.composed || i.composed
            });
            return n.detail = t, (i.node || this).dispatchEvent(n), n
        }

        listen(e, t, i) {
            e = e || this;
            let n = this.__boundListeners || (this.__boundListeners = new WeakMap), s = n.get(e);
            s || (s = {}, n.set(e, s));
            let a = t + i;
            s[a] || (s[a] = this._addMethodEventListenerToNode(e, t, i, this))
        }

        unlisten(e, t, i) {
            e = e || this;
            let n = this.__boundListeners && this.__boundListeners.get(e), s = t + i, a = n && n[s];
            a && (this._removeEventListenerFromNode(e, t, a), n[s] = null)
        }

        setScrollDirection(e, t) {
            $s(t || this, i[e] || "auto")
        }

        $$(e) {
            return this.root.querySelector(e)
        }

        get domHost() {
            let e = this.getRootNode();
            return e instanceof DocumentFragment ? e.host : e
        }

        distributeContent() {
            window.ShadyDOM && this.shadowRoot && ShadyDOM.flush()
        }

        getEffectiveChildNodes() {
            return rr(this).getEffectiveChildNodes()
        }

        queryDistributedElements(e) {
            return rr(this).queryDistributedElements(e)
        }

        getEffectiveChildren() {
            return this.getEffectiveChildNodes().filter((function (e) {
                return e.nodeType === Node.ELEMENT_NODE
            }))
        }

        getEffectiveTextContent() {
            let e = this.getEffectiveChildNodes(), t = [];
            for (let i, n = 0; i = e[n]; n++) i.nodeType !== Node.COMMENT_NODE && t.push(i.textContent);
            return t.join("")
        }

        queryEffectiveChildren(e) {
            let t = this.queryDistributedElements(e);
            return t && t[0]
        }

        queryAllEffectiveChildren(e) {
            return this.queryDistributedElements(e)
        }

        getContentChildNodes(e) {
            let t = this.root.querySelector(e || "slot");
            return t ? rr(t).getDistributedNodes() : []
        }

        getContentChildren(e) {
            return this.getContentChildNodes(e).filter((function (e) {
                return e.nodeType === Node.ELEMENT_NODE
            }))
        }

        isLightDescendant(e) {
            const t = this;
            return t !== e && t.contains(e) && t.getRootNode() === e.getRootNode()
        }

        isLocalDescendant(e) {
            return this.root === e.getRootNode()
        }

        scopeSubtree(e, t) {
        }

        getComputedStyleValue(e) {
            return or.getComputedStyleValue(this, e)
        }

        debounce(e, t, i) {
            return this._debouncers = this._debouncers || {}, this._debouncers[e] = es.debounce(this._debouncers[e], 0 < i ? pi.after(i) : fi, t.bind(this))
        }

        isDebouncerActive(e) {
            this._debouncers = this._debouncers || {};
            let t = this._debouncers[e];
            return !(!t || !t.isActive())
        }

        flushDebouncer(e) {
            this._debouncers = this._debouncers || {};
            let t = this._debouncers[e];
            t && t.flush()
        }

        cancelDebouncer(e) {
            this._debouncers = this._debouncers || {};
            let t = this._debouncers[e];
            t && t.cancel()
        }

        async(e, t) {
            return 0 < t ? pi.run(e.bind(this), t) : ~fi.run(e.bind(this))
        }

        cancelAsync(e) {
            0 > e ? fi.cancel(~e) : pi.cancel(e)
        }

        create(e, t) {
            let i = document.createElement(e);
            if (t) if (i.setProperties) i.setProperties(t); else for (let e in t) i[e] = t[e];
            return i
        }

        elementMatches(e, t) {
            return er(t || this, e)
        }

        toggleAttribute(e, t, i) {
            i = i || this, 1 == arguments.length && (t = !i.hasAttribute(e)), t ? i.setAttribute(e, "") : i.removeAttribute(e)
        }

        toggleClass(e, t, i) {
            i = i || this, 1 == arguments.length && (t = !i.classList.contains(e)), t ? i.classList.add(e) : i.classList.remove(e)
        }

        transform(e, t) {
            (t = t || this).style.webkitTransform = e, t.style.transform = e
        }

        translate3d(e, t, i, n) {
            n = n || this, this.transform("translate3d(" + e + "," + t + "," + i + ")", n)
        }

        arrayDelete(e, t) {
            let i;
            if (Array.isArray(e)) {
                if (i = e.indexOf(t), 0 <= i) return e.splice(i, 1)
            } else {
                if (i = Xt(this, e).indexOf(t), 0 <= i) return this.splice(e, i, 1)
            }
            return null
        }

        _logger(e, t) {
            switch (Array.isArray(t) && 1 === t.length && Array.isArray(t[0]) && (t = t[0]), e) {
                case"log":
                case"warn":
                case"error":
                    console[e](...t)
            }
        }

        _log(...e) {
            this._logger("log", e)
        }

        _warn(...e) {
            this._logger("warn", e)
        }

        _error(...e) {
            this._logger("error", e)
        }

        _logf(e, ...t) {
            return ["[%s::%s]", this.is, e, ...t]
        }
    }

    return n.prototype.is = "", n
}));
var cr = {LegacyElementMixin: lr};
let dr = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    behaviors: !0
};

function hr(e, t) {
    if (!e) return t = t;
    t = lr(t), Array.isArray(e) || (e = [e]);
    let i = t.prototype.behaviors;
    return t = ur(e = pr(e, null, i), t), i && (e = i.concat(e)), t.prototype.behaviors = e, t
}

function ur(e, t) {
    for (let i, n = 0; n < e.length; n++) i = e[n], i && (t = Array.isArray(i) ? ur(i, t) : mr(i, t));
    return t
}

function pr(e, t, i) {
    t = t || [];
    for (let n, s = e.length - 1; 0 <= s; s--) n = e[s], n ? Array.isArray(n) ? pr(n, t) : 0 > t.indexOf(n) && (!i || 0 > i.indexOf(n)) && t.unshift(n) : console.warn("behavior is null, check for missing or 404 import");
    return t
}

function mr(e, t) {
    class i extends t {
        static get properties() {
            return e.properties
        }

        static get observers() {
            return e.observers
        }

        static get template() {
            return e._template || qt && qt.import(this.is, "template") || t.template || this.prototype._template || null
        }

        created() {
            super.created(), e.created && e.created.call(this)
        }

        _registered() {
            super._registered(), e.beforeRegister && e.beforeRegister.call(Object.getPrototypeOf(this)), e.registered && e.registered.call(Object.getPrototypeOf(this))
        }

        _applyListeners() {
            if (super._applyListeners(), e.listeners) for (let t in e.listeners) this._addMethodEventListenerToNode(this, t, e.listeners[t])
        }

        _ensureAttributes() {
            if (e.hostAttributes) for (let t in e.hostAttributes) this._ensureAttribute(t, e.hostAttributes[t]);
            super._ensureAttributes()
        }

        ready() {
            super.ready(), e.ready && e.ready.call(this)
        }

        attached() {
            super.attached(), e.attached && e.attached.call(this)
        }

        detached() {
            super.detached(), e.detached && e.detached.call(this)
        }

        attributeChanged(t, i, n) {
            super.attributeChanged(t, i, n), e.attributeChanged && e.attributeChanged.call(this, t, i, n)
        }
    }

    i.generatedFrom = e;
    for (let t in e) if (!(t in dr)) {
        let n = Object.getOwnPropertyDescriptor(e, t);
        n && Object.defineProperty(i.prototype, t, n)
    }
    return i
}

const _r = function (e) {
    e || console.warn("Polymer's Class function requires `info` argument");
    let t = mr(e, e.behaviors ? hr(e.behaviors, HTMLElement) : lr(HTMLElement));
    return t.is = e.is, t
};
var fr = {mixinBehaviors: hr, Class: _r};
const gr = function (e) {
    let t;
    return t = "function" == typeof e ? e : gr.Class(e), customElements.define(t.is, t), t
};
gr.Class = _r;
var yr = {Polymer: gr};

function br(e, t, i, n, s) {
    let a;
    s && (a = "object" == typeof i && null !== i, a && (n = e.__dataTemp[t]));
    let r = n !== i && (n == n || i == i);
    return a && r && (e.__dataTemp[t] = i), r
}

const vr = yt((e => class extends e {
    _shouldPropertyChange(e, t, i) {
        return br(this, e, t, i, !0)
    }
})), wr = yt((e => class extends e {
    static get properties() {
        return {mutableData: Boolean}
    }

    _shouldPropertyChange(e, t, i) {
        return br(this, e, t, i, this.mutableData)
    }
}));
vr._mutablePropertyChange = br;
var Sr = {MutableData: vr, OptionalMutableData: wr};
let Cr = null;

function xr() {
    return Cr
}

xr.prototype = Object.create(HTMLTemplateElement.prototype, {constructor: {value: xr, writable: !0}});
const Pr = Hn(xr), Er = vr(Pr);

function kr(e, t) {
    Cr = e, Object.setPrototypeOf(e, t.prototype), new t, Cr = null
}

const Tr = Hn(class {
});

class Ir extends Tr {
    constructor(e) {
        super(), this._configureProperties(e), this.root = this._stampTemplate(this.__dataHost);
        let t = this.children = [];
        for (let e = this.root.firstChild; e; e = e.nextSibling) t.push(e), e.__templatizeInstance = this;
        this.__templatizeOwner && this.__templatizeOwner.__hideTemplateChildren__ && this._showHideChildren(!0);
        let i = this.__templatizeOptions;
        (e && i.instanceProps || !i.instanceProps) && this._enableProperties()
    }

    _configureProperties(e) {
        if (this.__templatizeOptions.forwardHostProp) for (let e in this.__hostProps) this._setPendingProperty(e, this.__dataHost["_host_" + e]);
        for (let t in e) this._setPendingProperty(t, e[t])
    }

    forwardHostProp(e, t) {
        this._setPendingPropertyOrPath(e, t, !1, !0) && this.__dataHost._enqueueClient(this)
    }

    _addEventListenerToNode(e, t, i) {
        if (this._methodHost && this.__templatizeOptions.parentModel) this._methodHost._addEventListenerToNode(e, t, (e => {
            e.model = this, i(e)
        })); else {
            let n = this.__dataHost.__dataHost;
            n && n._addEventListenerToNode(e, t, i)
        }
    }

    _showHideChildren(e) {
        let t = this.children;
        for (let i, n = 0; n < t.length; n++) {
            if (i = t[n], !!e != !!i.__hideTemplateChildren__) if (i.nodeType === Node.TEXT_NODE) e ? (i.__polymerTextContent__ = i.textContent, i.textContent = "") : i.textContent = i.__polymerTextContent__; else if ("slot" === i.localName) if (e) i.__polymerReplaced__ = document.createComment("hidden-slot"), i.parentNode.replaceChild(i.__polymerReplaced__, i); else {
                const e = i.__polymerReplaced__;
                e && e.parentNode.replaceChild(i, e)
            } else i.style && (e ? (i.__polymerDisplay__ = i.style.display, i.style.display = "none") : i.style.display = i.__polymerDisplay__);
            i.__hideTemplateChildren__ = e, i._showHideChildren && i._showHideChildren(e)
        }
    }

    _setUnmanagedPropertyToNode(e, t, i) {
        e.__hideTemplateChildren__ && e.nodeType == Node.TEXT_NODE && "textContent" == t ? e.__polymerTextContent__ = i : super._setUnmanagedPropertyToNode(e, t, i)
    }

    get parentModel() {
        let e = this.__parentModel;
        if (!e) {
            let t;
            e = this;
            do {
                e = e.__dataHost.__dataHost
            } while ((t = e.__templatizeOptions) && !t.parentModel);
            this.__parentModel = e
        }
        return e
    }

    dispatchEvent(e) {
        return !0
    }
}

Ir.prototype.__dataHost, Ir.prototype.__templatizeOptions, Ir.prototype._methodHost, Ir.prototype.__templatizeOwner, Ir.prototype.__hostProps;
const Nr = vr(Ir);

function Or(e) {
    let t = e.__dataHost;
    return t && t._methodHost || t
}

function Mr(e, t, i) {
    let n = i.mutableData ? Nr : Ir, s = class extends n {
    };
    return s.prototype.__templatizeOptions = i, s.prototype._bindTemplate(e), Dr(s, e, t, i), s
}

function Lr(e, t, i) {
    let n = i.forwardHostProp;
    if (n) {
        let s = t.templatizeTemplateClass;
        if (!s) {
            let e = i.mutableData ? Er : Pr;
            s = t.templatizeTemplateClass = class extends e {
            };
            let a = t.hostProps;
            for (let e in a) s.prototype._addPropertyEffect("_host_" + e, s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, {fn: Rr(e, n)}), s.prototype._createNotifyingProperty("_host_" + e)
        }
        kr(e, s), e.__dataProto && Object.assign(e.__data, e.__dataProto), e.__dataTemp = {}, e.__dataPending = null, e.__dataOld = null, e._enableProperties()
    }
}

function Rr(e, t) {
    return function (e, i, n) {
        t.call(e.__templatizeOwner, i.substring("_host_".length), n[i])
    }
}

function Dr(e, t, i, n) {
    let s = i.hostProps || {};
    for (let t in n.instanceProps) {
        delete s[t];
        let i = n.notifyInstanceProp;
        i && e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {fn: Br(t, i)})
    }
    if (n.forwardHostProp && t.__dataHost) for (let t in s) e.prototype._addPropertyEffect(t, e.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {fn: zr()})
}

function Br(e, t) {
    return function (e, i, n) {
        t.call(e.__templatizeOwner, e, i, n[i])
    }
}

function zr() {
    return function (e, t, i) {
        e.__dataHost._setPendingPropertyOrPath("_host_" + t, i[t], !0, !0)
    }
}

function Hr(e, t, i) {
    if (i = i || {}, e.__templatizeOwner) throw new Error("A <template> can only be templatized once");
    e.__templatizeOwner = t;
    let n = (t ? t.constructor : Ir)._parseTemplate(e), s = n.templatizeInstanceClass;
    s || (s = Mr(e, n, i), n.templatizeInstanceClass = s), Lr(e, n, i);
    let a = class extends s {
    };
    return a.prototype._methodHost = Or(e), a.prototype.__dataHost = e, a.prototype.__templatizeOwner = t, a.prototype.__hostProps = n.hostProps, a = a, a
}

function Fr(e, t) {
    let i;
    for (; t;) if (i = t.__templatizeInstance) {
        if (i.__dataHost == e) return i;
        t = i.__dataHost
    } else t = t.parentNode;
    return null
}

var Ur = {templatize: Hr, modelForElement: Fr, TemplateInstanceBase: Ir};
let qr;
const jr = {
    templatize(e, t) {
        this._templatizerTemplate = e, this.ctor = Hr(e, this, {
            mutableData: !!t,
            parentModel: this._parentModel,
            instanceProps: this._instanceProps,
            forwardHostProp: this._forwardHostPropV2,
            notifyInstanceProp: this._notifyInstancePropV2
        })
    }, stamp(e) {
        return new this.ctor(e)
    }, modelForElement(e) {
        return Fr(this._templatizerTemplate, e)
    }
};
var Yr = {Templatizer: jr};
const $r = sa(wr(Hn(HTMLElement)));

class Vr extends $r {
    static get observedAttributes() {
        return ["mutable-data"]
    }

    constructor() {
        super(), this.root = null, this.$ = null, this.__children = null
    }

    attributeChangedCallback() {
        this.mutableData = !0
    }

    connectedCallback() {
        this.style.display = "none", this.render()
    }

    disconnectedCallback() {
        this.__removeChildren()
    }

    __insertChildren() {
        this.parentNode.insertBefore(this.root, this)
    }

    __removeChildren() {
        if (this.__children) for (let e = 0; e < this.__children.length; e++) this.root.appendChild(this.__children[e])
    }

    render() {
        let e;
        if (!this.__children) {
            if (e = e || this.querySelector("template"), !e) {
                let t = new MutationObserver((() => {
                    if (e = this.querySelector("template"), !e) throw new Error("dom-bind requires a <template> child");
                    t.disconnect(), this.render()
                }));
                return void t.observe(this, {childList: !0})
            }
            this.root = this._stampTemplate(e), this.$ = this.root.$, this.__children = [];
            for (let e = this.root.firstChild; e; e = e.nextSibling) this.__children[this.__children.length] = e;
            this._enableProperties()
        }
        this.__insertChildren(), this.dispatchEvent(new CustomEvent("dom-change", {bubbles: !0, composed: !0}))
    }
}

customElements.define("dom-bind", Vr);
var Kr = {DomBind: Vr};

class Qr {
    constructor(e) {
        this.value = e.toString()
    }

    toString() {
        return this.value
    }
}

function Gr(e) {
    if (e instanceof Qr) return e.value;
    throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${e}`)
}

function Wr(e) {
    if (e instanceof HTMLTemplateElement) return e.innerHTML;
    if (e instanceof Qr) return Gr(e);
    throw new Error(`non-template value passed to Polymer's html function: ${e}`)
}

const Jr = function (e, ...t) {
    const i = document.createElement("template");
    return i.innerHTML = t.reduce(((t, i, n) => t + Wr(i) + e[n + 1]), e[0]), i
}, Xr = function (e, ...t) {
    return new Qr(t.reduce(((t, i, n) => t + Gr(i) + e[n + 1]), e[0]))
};
var Zr = {html: Jr, htmlLiteral: Xr};
const eA = Vn(HTMLElement);
var tA = {PolymerElement: eA, html: Jr};
const iA = wr(eA);

class nA extends iA {
    static get is() {
        return "dom-repeat"
    }

    static get template() {
        return null
    }

    static get properties() {
        return {
            items: {type: Array},
            as: {type: String, value: "item"},
            indexAs: {type: String, value: "index"},
            itemsIndexAs: {type: String, value: "itemsIndex"},
            sort: {type: Function, observer: "__sortChanged"},
            filter: {type: Function, observer: "__filterChanged"},
            observe: {type: String, observer: "__observeChanged"},
            delay: Number,
            renderedItemCount: {type: Number, notify: !0, readOnly: !0},
            initialCount: {type: Number, observer: "__initializeChunking"},
            targetFramerate: {type: Number, value: 20},
            _targetFrameTime: {type: Number, computed: "__computeFrameTime(targetFramerate)"}
        }
    }

    static get observers() {
        return ["__itemsChanged(items.*)"]
    }

    constructor() {
        super(), this.__instances = [], this.__limit = 1 / 0, this.__pool = [], this.__renderDebouncer = null, this.__itemsIdxToInstIdx = {}, this.__chunkCount = null, this.__lastChunkTime = null, this.__sortFn = null, this.__filterFn = null, this.__observePaths = null, this.__ctor = null, this.__isDetached = !0, this.template = null
    }

    disconnectedCallback() {
        super.disconnectedCallback(), this.__isDetached = !0;
        for (let e = 0; e < this.__instances.length; e++) this.__detachInstance(e)
    }

    connectedCallback() {
        if (super.connectedCallback(), this.style.display = "none", this.__isDetached) {
            this.__isDetached = !1;
            let e = this.parentNode;
            for (let t = 0; t < this.__instances.length; t++) this.__attachInstance(t, e)
        }
    }

    __ensureTemplatized() {
        if (!this.__ctor) {
            let e = this.template = this.querySelector("template");
            if (!e) {
                let e = new MutationObserver((() => {
                    if (!this.querySelector("template")) throw new Error("dom-repeat requires a <template> child");
                    e.disconnect(), this.__render()
                }));
                return e.observe(this, {childList: !0}), !1
            }
            let t = {};
            t[this.as] = !0, t[this.indexAs] = !0, t[this.itemsIndexAs] = !0, this.__ctor = Hr(e, this, {
                mutableData: this.mutableData,
                parentModel: !0,
                instanceProps: t,
                forwardHostProp: function (e, t) {
                    let i = this.__instances;
                    for (let n, s = 0; s < i.length && (n = i[s]); s++) n.forwardHostProp(e, t)
                },
                notifyInstanceProp: function (e, t, i) {
                    if (Gt(this.as, t)) {
                        let n = e[this.itemsIndexAs];
                        t == this.as && (this.items[n] = i);
                        let s = Qt(this.as, "items." + n, t);
                        this.notifyPath(s, i)
                    }
                }
            })
        }
        return !0
    }

    __getMethodHost() {
        return this.__dataHost._methodHost || this.__dataHost
    }

    __functionFromPropertyValue(e) {
        if ("string" == typeof e) {
            let t = e, i = this.__getMethodHost();
            return function () {
                return i[t].apply(i, arguments)
            }
        }
        return e
    }

    __sortChanged(e) {
        this.__sortFn = this.__functionFromPropertyValue(e), this.items && this.__debounceRender(this.__render)
    }

    __filterChanged(e) {
        this.__filterFn = this.__functionFromPropertyValue(e), this.items && this.__debounceRender(this.__render)
    }

    __computeFrameTime(e) {
        return Math.ceil(1e3 / e)
    }

    __initializeChunking() {
        this.initialCount && (this.__limit = this.initialCount, this.__chunkCount = this.initialCount, this.__lastChunkTime = performance.now())
    }

    __tryRenderChunk() {
        this.items && this.__limit < this.items.length && this.__debounceRender(this.__requestRenderChunk)
    }

    __requestRenderChunk() {
        requestAnimationFrame((() => this.__renderChunk()))
    }

    __renderChunk() {
        let e = performance.now(), t = this._targetFrameTime / (e - this.__lastChunkTime);
        this.__chunkCount = Math.round(this.__chunkCount * t) || 1, this.__limit += this.__chunkCount, this.__lastChunkTime = e, this.__debounceRender(this.__render)
    }

    __observeChanged() {
        this.__observePaths = this.observe && this.observe.replace(".*", ".").split(" ")
    }

    __itemsChanged(e) {
        this.items && !Array.isArray(this.items) && console.warn("dom-repeat expected array for `items`, found", this.items), this.__handleItemPath(e.path, e.value) || (this.__initializeChunking(), this.__debounceRender(this.__render))
    }

    __handleObservedPaths(e) {
        if (this.__sortFn || this.__filterFn) if (e) {
            if (this.__observePaths) {
                let t = this.__observePaths;
                for (let i = 0; i < t.length; i++) 0 === e.indexOf(t[i]) && this.__debounceRender(this.__render, this.delay)
            }
        } else this.__debounceRender(this.__render, this.delay)
    }

    __debounceRender(e, t = 0) {
        this.__renderDebouncer = es.debounce(this.__renderDebouncer, 0 < t ? pi.after(t) : fi, e.bind(this)), Qa(this.__renderDebouncer)
    }

    render() {
        this.__debounceRender(this.__render), Wa()
    }

    __render() {
        this.__ensureTemplatized() && (this.__applyFullRefresh(), this.__pool.length = 0, this._setRenderedItemCount(this.__instances.length), this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        })), this.__tryRenderChunk())
    }

    __applyFullRefresh() {
        let e = this.items || [], t = Array(e.length);
        for (let i = 0; i < e.length; i++) t[i] = i;
        this.__filterFn && (t = t.filter(((t, i, n) => this.__filterFn(e[t], i, n)))), this.__sortFn && t.sort(((t, i) => this.__sortFn(e[t], e[i])));
        const i = this.__itemsIdxToInstIdx = {};
        let n = 0;
        const s = Math.min(t.length, this.__limit);
        for (; n < s; n++) {
            let s = this.__instances[n], a = t[n], r = e[a];
            i[a] = n, s ? (s._setPendingProperty(this.as, r), s._setPendingProperty(this.indexAs, n), s._setPendingProperty(this.itemsIndexAs, a), s._flushProperties()) : this.__insertInstance(r, n, a)
        }
        for (let e = this.__instances.length - 1; e >= n; e--) this.__detachAndRemoveInstance(e)
    }

    __detachInstance(e) {
        let t = this.__instances[e];
        for (let e, i = 0; i < t.children.length; i++) e = t.children[i], t.root.appendChild(e);
        return t
    }

    __attachInstance(e, t) {
        let i = this.__instances[e];
        t.insertBefore(i.root, this)
    }

    __detachAndRemoveInstance(e) {
        let t = this.__detachInstance(e);
        t && this.__pool.push(t), this.__instances.splice(e, 1)
    }

    __stampInstance(e, t, i) {
        let n = {};
        return n[this.as] = e, n[this.indexAs] = t, n[this.itemsIndexAs] = i, new this.__ctor(n)
    }

    __insertInstance(e, t, i) {
        let n = this.__pool.pop();
        n ? (n._setPendingProperty(this.as, e), n._setPendingProperty(this.indexAs, t), n._setPendingProperty(this.itemsIndexAs, i), n._flushProperties()) : n = this.__stampInstance(e, t, i);
        let s = this.__instances[t + 1], a = s ? s.children[0] : this;
        return this.parentNode.insertBefore(n.root, a), this.__instances[t] = n, n
    }

    _showHideChildren(e) {
        for (let t = 0; t < this.__instances.length; t++) this.__instances[t]._showHideChildren(e)
    }

    __handleItemPath(e, t) {
        let i = e.slice(6), n = i.indexOf("."), s = 0 > n ? i : i.substring(0, n);
        if (s == parseInt(s, 10)) {
            let e = 0 > n ? "" : i.substring(n + 1);
            this.__handleObservedPaths(e);
            let a = this.__itemsIdxToInstIdx[s], r = this.__instances[a];
            if (r) {
                let i = this.as + (e ? "." + e : "");
                r._setPendingPropertyOrPath(i, t, !1, !0), r._flushProperties()
            }
            return !0
        }
    }

    itemForElement(e) {
        let t = this.modelForElement(e);
        return t && t[this.as]
    }

    indexForElement(e) {
        let t = this.modelForElement(e);
        return t && t[this.indexAs]
    }

    modelForElement(e) {
        return Fr(this.template, e)
    }
}

customElements.define(nA.is, nA);
var sA = {DomRepeat: nA};

class aA extends eA {
    static get is() {
        return "dom-if"
    }

    static get template() {
        return null
    }

    static get properties() {
        return {
            if: {type: Boolean, observer: "__debounceRender"},
            restamp: {type: Boolean, observer: "__debounceRender"}
        }
    }

    constructor() {
        super(), this.__renderDebouncer = null, this.__invalidProps = null, this.__instance = null, this._lastIf = !1, this.__ctor = null
    }

    __debounceRender() {
        this.__renderDebouncer = es.debounce(this.__renderDebouncer, fi, (() => this.__render())), Qa(this.__renderDebouncer)
    }

    disconnectedCallback() {
        super.disconnectedCallback(), this.parentNode && (this.parentNode.nodeType != Node.DOCUMENT_FRAGMENT_NODE || this.parentNode.host) || this.__teardownInstance()
    }

    connectedCallback() {
        super.connectedCallback(), this.style.display = "none", this.if && this.__debounceRender()
    }

    render() {
        Wa()
    }

    __render() {
        if (this.if) {
            if (!this.__ensureInstance()) return;
            this._showHideChildren()
        } else this.restamp && this.__teardownInstance();
        !this.restamp && this.__instance && this._showHideChildren(), this.if != this._lastIf && (this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        })), this._lastIf = this.if)
    }

    __ensureInstance() {
        let e = this.parentNode;
        if (e) {
            if (!this.__ctor) {
                let e = this.querySelector("template");
                if (!e) {
                    let e = new MutationObserver((() => {
                        if (!this.querySelector("template")) throw new Error("dom-if requires a <template> child");
                        e.disconnect(), this.__render()
                    }));
                    return e.observe(this, {childList: !0}), !1
                }
                this.__ctor = Hr(e, this, {
                    mutableData: !0, forwardHostProp: function (e, t) {
                        this.__instance && (this.if ? this.__instance.forwardHostProp(e, t) : (this.__invalidProps = this.__invalidProps || Object.create(null), this.__invalidProps[$t(e)] = !0))
                    }
                })
            }
            if (this.__instance) {
                this.__syncHostProperties();
                let t = this.__instance.children;
                if (t && t.length) {
                    if (this.previousSibling !== t[t.length - 1]) for (let i, n = 0; n < t.length && (i = t[n]); n++) e.insertBefore(i, this)
                }
            } else this.__instance = new this.__ctor, e.insertBefore(this.__instance.root, this)
        }
        return !0
    }

    __syncHostProperties() {
        let e = this.__invalidProps;
        if (e) {
            for (let t in e) this.__instance._setPendingProperty(t, this.__dataHost[t]);
            this.__invalidProps = null, this.__instance._flushProperties()
        }
    }

    __teardownInstance() {
        if (this.__instance) {
            let e = this.__instance.children;
            if (e && e.length) {
                let t = e[0].parentNode;
                for (let i, n = 0; n < e.length && (i = e[n]); n++) t.removeChild(i)
            }
            this.__instance = null, this.__invalidProps = null
        }
    }

    _showHideChildren() {
        let e = this.__hideTemplateChildren__ || !this.if;
        this.__instance && this.__instance._showHideChildren(e)
    }
}

customElements.define(aA.is, aA);
var rA = {DomIf: aA};
let AA = yt((e => {
    let t = Vn(e);
    return class extends t {
        static get properties() {
            return {
                items: {type: Array},
                multi: {type: Boolean, value: !1},
                selected: {type: Object, notify: !0},
                selectedItem: {type: Object, notify: !0},
                toggle: {type: Boolean, value: !1}
            }
        }

        static get observers() {
            return ["__updateSelection(multi, items.*)"]
        }

        constructor() {
            super(), this.__lastItems = null, this.__lastMulti = null, this.__selectedMap = null
        }

        __updateSelection(e, t) {
            let i = t.path;
            if ("items" == i) {
                let i = t.base || [], n = this.__lastItems;
                if (e !== this.__lastMulti && this.clearSelection(), n) {
                    let e = Ua(i, n);
                    this.__applySplices(e)
                }
                this.__lastItems = i, this.__lastMulti = e
            } else if ("items.splices" == t.path) this.__applySplices(t.value.indexSplices); else {
                let e = i.slice("items.".length), t = parseInt(e, 10);
                0 > e.indexOf(".") && e == t && this.__deselectChangedIdx(t)
            }
        }

        __applySplices(e) {
            let t = this.__selectedMap;
            for (let i, n = 0; n < e.length; n++) {
                i = e[n], t.forEach(((e, n) => {
                    e < i.index || (e >= i.index + i.removed.length ? t.set(n, e + i.addedCount - i.removed.length) : t.set(n, -1))
                }));
                for (let e, n = 0; n < i.addedCount; n++) e = i.index + n, t.has(this.items[e]) && t.set(this.items[e], e)
            }
            this.__updateLinks();
            let i = 0;
            t.forEach(((e, n) => {
                0 > e ? (this.multi ? this.splice("selected", i, 1) : this.selected = this.selectedItem = null, t.delete(n)) : i++
            }))
        }

        __updateLinks() {
            if (this.__dataLinkedPaths = {}, this.multi) {
                let e = 0;
                this.__selectedMap.forEach((t => {
                    0 <= t && this.linkPaths("items." + t, "selected." + e++)
                }))
            } else this.__selectedMap.forEach((e => {
                this.linkPaths("selected", "items." + e), this.linkPaths("selectedItem", "items." + e)
            }))
        }

        clearSelection() {
            this.__dataLinkedPaths = {}, this.__selectedMap = new Map, this.selected = this.multi ? [] : null, this.selectedItem = null
        }

        isSelected(e) {
            return this.__selectedMap.has(e)
        }

        isIndexSelected(e) {
            return this.isSelected(this.items[e])
        }

        __deselectChangedIdx(e) {
            let t = this.__selectedIndexForItemIndex(e);
            if (0 <= t) {
                let e = 0;
                this.__selectedMap.forEach(((i, n) => {
                    t == e++ && this.deselect(n)
                }))
            }
        }

        __selectedIndexForItemIndex(e) {
            let t = this.__dataLinkedPaths["items." + e];
            if (t) return parseInt(t.slice("selected.".length), 10)
        }

        deselect(e) {
            let t = this.__selectedMap.get(e);
            if (0 <= t) {
                let i;
                this.__selectedMap.delete(e), this.multi && (i = this.__selectedIndexForItemIndex(t)), this.__updateLinks(), this.multi ? this.splice("selected", i, 1) : this.selected = this.selectedItem = null
            }
        }

        deselectIndex(e) {
            this.deselect(this.items[e])
        }

        select(e) {
            this.selectIndex(this.items.indexOf(e))
        }

        selectIndex(e) {
            let t = this.items[e];
            this.isSelected(t) ? this.toggle && this.deselectIndex(e) : (this.multi || this.__selectedMap.clear(), this.__selectedMap.set(t, e), this.__updateLinks(), this.multi ? this.push("selected", t) : this.selected = this.selectedItem = t)
        }
    }
})), oA = AA(eA);

class lA extends oA {
    static get is() {
        return "array-selector"
    }
}

customElements.define(lA.is, lA);
var cA = {ArraySelectorMixin: AA, ArraySelector: lA};
const dA = new Ge;
window.ShadyCSS || (window.ShadyCSS = {
    prepareTemplate(e, t, i) {
    }, prepareTemplateDom(e, t) {
    }, prepareTemplateStyles(e, t, i) {
    }, styleSubtree(e, t) {
        dA.processStyles(), Ae(e, t)
    }, styleElement(e) {
        dA.processStyles()
    }, styleDocument(e) {
        dA.processStyles(), Ae(document.body, e)
    }, getComputedStyleValue: (e, t) => oe(e, t), flushCustomStyles() {
    }, nativeCss: n, nativeShadow: e
}), window.ShadyCSS.CustomStyleInterface = dA;
const hA = "include", uA = window.ShadyCSS.CustomStyleInterface;

class pA extends HTMLElement {
    constructor() {
        super(), this._style = null, uA.addCustomStyle(this)
    }

    getStyle() {
        if (this._style) return this._style;
        const e = this.querySelector("style");
        if (!e) return null;
        this._style = e;
        const t = e.getAttribute(hA);
        return t && (e.removeAttribute(hA), e.textContent = Ot(t) + e.textContent), this.ownerDocument !== window.document && window.document.head.appendChild(this), this._style
    }
}

window.customElements.define("custom-style", pA);
var mA = {CustomStyle: pA};
let _A;
_A = vr._mutablePropertyChange;
const fA = {
    _shouldPropertyChange(e, t, i) {
        return _A(this, e, t, i, !0)
    }
}, gA = {
    properties: {mutableData: Boolean}, _shouldPropertyChange(e, t, i) {
        return _A(this, e, t, i, this.mutableData)
    }
};
var yA = {MutableDataBehavior: fA, OptionalMutableDataBehavior: gA};
const bA = lr(HTMLElement).prototype;
var vA = {Base: bA, Polymer: gr, html: Jr};
const wA = {
    properties: {
        libraryLoaded: {type: Boolean, value: !1, notify: !0, readOnly: !0},
        libraryErrorMessage: {type: String, value: null, notify: !0, readOnly: !0}
    }, observers: ["_libraryUrlChanged(libraryUrl)"], _libraryUrlChanged: function (e) {
        this._isReady && this.libraryUrl && this._loadLibrary()
    }, _libraryLoadCallback: function (e, t) {
        e ? (bA._warn("Library load failed:", e.message), this._setLibraryErrorMessage(e.message)) : (this._setLibraryErrorMessage(null), this._setLibraryLoaded(!0), this.notifyEvent && this.fire(this.notifyEvent, t, {composed: !0}))
    }, _loadLibrary: function () {
        SA.require(this.libraryUrl, this._libraryLoadCallback.bind(this), this.callbackName)
    }, ready: function () {
        this._isReady = !0, this.libraryUrl && this._loadLibrary()
    }
};
var SA = {
    apiMap: {}, require: function (e, t, i) {
        var n = this.nameFromUrl(e);
        this.apiMap[n] || (this.apiMap[n] = new CA(n, e, i)), this.apiMap[n].requestNotify(t)
    }, nameFromUrl: function (e) {
        return e.replace(/[\:\/\%\?\&\.\=\-\,]/g, "_") + "_api"
    }
}, CA = function (e, t, i) {
    if (this.notifiers = [], !i) {
        if (!(0 <= t.indexOf(this.callbackMacro))) return void (this.error = new Error("IronJsonpLibraryBehavior a %%callback%% parameter is required in libraryUrl"));
        i = e + "_loaded", t = t.replace(this.callbackMacro, i)
    }
    this.callbackName = i, window[this.callbackName] = this.success.bind(this), this.addScript(t)
};
CA.prototype = {
    callbackMacro: "%%callback%%", loaded: !1, addScript: function (e) {
        var t = document.createElement("script");
        t.src = e, t.onerror = this.handleError.bind(this);
        var i = document.querySelector("script") || document.body;
        i.parentNode.insertBefore(t, i), this.script = t
    }, removeScript: function () {
        this.script.parentNode && this.script.parentNode.removeChild(this.script), this.script = null
    }, handleError: function (e) {
        this.error = new Error("Library failed to load"), this.notifyAll(), this.cleanup()
    }, success: function () {
        this.loaded = !0, this.result = Array.prototype.slice.call(arguments), this.notifyAll(), this.cleanup()
    }, cleanup: function () {
        delete window[this.callbackName]
    }, notifyAll: function () {
        this.notifiers.forEach(function (e) {
            e(this.error, this.result)
        }.bind(this)), this.notifiers = []
    }, requestNotify: function (e) {
        this.loaded || this.error ? e(this.error, this.result) : this.notifiers.push(e)
    }
}, gr({
    is: "iron-jsonp-library",
    behaviors: [wA],
    properties: {libraryUrl: String, callbackName: String, notifyEvent: String}
});
var xA = {IronJsonpLibraryBehavior: wA};
gr({
    is: "google-youtube-api",
    _template: null,
    behaviors: [wA],
    properties: {
        libraryUrl: {type: String, value: "https://www.youtube.com/iframe_api"},
        notifyEvent: {type: String, value: "api-load"},
        callbackName: {type: String, value: "onYouTubeIframeAPIReady"}
    },
    get api() {
        return window.YT
    }
}), gr({
    is: "iron-localstorage",
    properties: {
        name: {type: String, value: ""},
        value: {type: Object, notify: !0},
        useRaw: {type: Boolean, value: !1},
        autoSaveDisabled: {type: Boolean, value: !1},
        errorMessage: {type: String, notify: !0},
        _loaded: {type: Boolean, value: !1}
    },
    observers: ["_debounceReload(name,useRaw)", "_trySaveValue(autoSaveDisabled)", "_trySaveValue(value.*)"],
    ready: function () {
        this._boundHandleStorage = this._handleStorage.bind(this)
    },
    attached: function () {
        window.addEventListener("storage", this._boundHandleStorage)
    },
    detached: function () {
        window.removeEventListener("storage", this._boundHandleStorage)
    },
    _handleStorage: function (e) {
        e.key == this.name && this._load(!0)
    },
    _trySaveValue: function () {
        void 0 === this.autoSaveDisabled || this._doNotSave || this._loaded && !this.autoSaveDisabled && this.debounce("save", this.save)
    },
    _debounceReload: function () {
        void 0 !== this.name && void 0 !== this.useRaw && this.debounce("reload", this.reload)
    },
    reload: function () {
        this._loaded = !1, this._load()
    },
    _load: function (e) {
        try {
            var t = window.localStorage.getItem(this.name)
        } catch (e) {
            this.errorMessage = e.message, this._error("Could not save to localStorage.  Try enabling cookies for this page.", e)
        }
        if (null === t) this._loaded = !0, this._doNotSave = !0, this.value = null, this._doNotSave = !1, this.fire("iron-localstorage-load-empty", {externalChange: e}, {composed: !0}); else {
            if (!this.useRaw) try {
                t = JSON.parse(t)
            } catch (e) {
                this.errorMessage = "Could not parse local storage value", bA._error("could not parse local storage value", t), t = null
            }
            this._loaded = !0, this._doNotSave = !0, this.value = t, this._doNotSave = !1, this.fire("iron-localstorage-load", {externalChange: e}, {composed: !0})
        }
    },
    save: function () {
        var e = this.useRaw ? this.value : JSON.stringify(this.value);
        try {
            null === this.value || void 0 === this.value ? window.localStorage.removeItem(this.name) : window.localStorage.setItem(this.name, e)
        } catch (e) {
            this.errorMessage = e.message, bA._error("Could not save to localStorage. Incognito mode may be blocking this action", e)
        }
    }
}), gr({
    _template: Jr`<style>:host{display:block}:host([fluid]){width:100%;max-width:100%;position:relative}:host([fluid]) #thumbnail,:host([fluid]) iframe{vertical-align:bottom;position:absolute;top:0;left:0;width:100%;height:100%}iframe{@apply --google-youtube-iframe;}#container{max-width:100%;max-height:100%;@apply --google-youtube-container;}#thumbnail{width:100%;height:100%;cursor:pointer;@apply --google-youtube-thumbnail;}</style><div id="container" style\$="{{_computeContainerStyle(width, height)}}"><template is="dom-if" if="{{thumbnail}}"><img id="thumbnail" src\$="{{thumbnail}}" title="YouTube video thumbnail." alt="YouTube video thumbnail." on-tap="_handleThumbnailTap"></template><template is="dom-if" if="{{!thumbnail}}"><template is="dom-if" if="[[shouldLoadApi]]"><google-youtube-api on-api-load="_apiLoad"></google-youtube-api></template></template><iron-localstorage name="google-youtube-playsupported" value="{{_playsupportedLocalStorage}}" on-iron-localstorage-load="_useExistingPlaySupportedValue" on-iron-localstorage-load-empty="_determinePlaySupported"></iron-localstorage><div id="player"></div></div>`,
    is: "google-youtube",
    properties: {
        videoId: {type: String, value: "", observer: "_videoIdChanged"},
        list: {type: String, value: ""},
        listType: String,
        shouldLoadApi: {type: Boolean, computed: "_computeShouldLoadApi(list, videoId)"},
        playsupported: {type: Boolean, value: null, notify: !0},
        autoplay: {type: Number, value: 0},
        playbackstarted: {type: Boolean, value: !1, notify: !0},
        height: {type: String, value: "270px"},
        width: {type: String, value: "480px"},
        state: {type: Number, value: -1, notify: !0},
        currenttime: {type: Number, value: 0, notify: !0},
        duration: {type: Number, value: 1, notify: !0},
        currenttimeformatted: {type: String, value: "0:00", notify: !0},
        durationformatted: {type: String, value: "0:00", notify: !0},
        fractionloaded: {type: Number, value: 0, notify: !0},
        chromeless: {type: Boolean, value: !1},
        thumbnail: {type: String, value: ""},
        fluid: {type: Boolean, value: !1},
        volume: {type: Number, value: 100, notify: !0},
        playbackrate: {type: Number, value: 1, notify: !0},
        playbackquality: {type: String, value: "", notify: !0},
        statsUpdateInterval: {type: Number, value: 1e3}
    },
    _computeContainerStyle: function (e, t) {
        return "width:" + e + "; height:" + t
    },
    _computeShouldLoadApi: function (e, t) {
        return !(!e && !t)
    },
    _useExistingPlaySupportedValue: function () {
        this.playsupported = this._playsupportedLocalStorage
    },
    _determinePlaySupported: function () {
        if (null == this.playsupported) {
            var e, t = document.createElement("video");
            if ("play" in t) {
                t.id = "playtest", t.style.position = "absolute", t.style.top = "-9999px", t.style.left = "-9999px";
                var i = document.createElement("source");
                i.src = "data:video/mp4;base64,AAAAFGZ0eXBNU05WAAACAE1TTlYAAAOUbW9vdgAAAGxtdmhkAAAAAM9ghv7PYIb+AAACWAAACu8AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAnh0cmFrAAAAXHRraGQAAAAHz2CG/s9ghv4AAAABAAAAAAAACu8AAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAFAAAAA4AAAAAAHgbWRpYQAAACBtZGhkAAAAAM9ghv7PYIb+AAALuAAANq8AAAAAAAAAIWhkbHIAAAAAbWhscnZpZGVBVlMgAAAAAAABAB4AAAABl21pbmYAAAAUdm1oZAAAAAAAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAVdzdGJsAAAAp3N0c2QAAAAAAAAAAQAAAJdhdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAFAAOABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAAEmNvbHJuY2xjAAEAAQABAAAAL2F2Y0MBTUAz/+EAGGdNQDOadCk/LgIgAAADACAAAAMA0eMGVAEABGjuPIAAAAAYc3R0cwAAAAAAAAABAAAADgAAA+gAAAAUc3RzcwAAAAAAAAABAAAAAQAAABxzdHNjAAAAAAAAAAEAAAABAAAADgAAAAEAAABMc3RzegAAAAAAAAAAAAAADgAAAE8AAAAOAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA0AAAANAAAADQAAAA4AAAAOAAAAFHN0Y28AAAAAAAAAAQAAA7AAAAA0dXVpZFVTTVQh0k/Ou4hpXPrJx0AAAAAcTVREVAABABIAAAAKVcQAAAAAAAEAAAAAAAAAqHV1aWRVU01UIdJPzruIaVz6ycdAAAAAkE1URFQABAAMAAAAC1XEAAACHAAeAAAABBXHAAEAQQBWAFMAIABNAGUAZABpAGEAAAAqAAAAASoOAAEAZABlAHQAZQBjAHQAXwBhAHUAdABvAHAAbABhAHkAAAAyAAAAA1XEAAEAMgAwADAANQBtAGUALwAwADcALwAwADYAMAA2ACAAMwA6ADUAOgAwAAABA21kYXQAAAAYZ01AM5p0KT8uAiAAAAMAIAAAAwDR4wZUAAAABGjuPIAAAAAnZYiAIAAR//eBLT+oL1eA2Nlb/edvwWZflzEVLlhlXtJvSAEGRA3ZAAAACkGaAQCyJ/8AFBAAAAAJQZoCATP/AOmBAAAACUGaAwGz/wDpgAAAAAlBmgQCM/8A6YEAAAAJQZoFArP/AOmBAAAACUGaBgMz/wDpgQAAAAlBmgcDs/8A6YEAAAAJQZoIBDP/AOmAAAAACUGaCQSz/wDpgAAAAAlBmgoFM/8A6YEAAAAJQZoLBbP/AOmAAAAACkGaDAYyJ/8AFBAAAAAKQZoNBrIv/4cMeQ==", t.appendChild(i);
                var n = document.createElement("source");
                n.src = "data:video/webm;base64,GkXfo49CgoR3ZWJtQoeBAUKFgQEYU4BnAQAAAAAAF60RTZt0vE27jFOrhBVJqWZTrIIQA027jFOrhBZUrmtTrIIQbE27jFOrhBFNm3RTrIIXmU27jFOrhBxTu2tTrIIWs+xPvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFUmpZuQq17GDD0JATYCjbGliZWJtbCB2MC43LjcgKyBsaWJtYXRyb3NrYSB2MC44LjFXQY9BVlNNYXRyb3NrYUZpbGVEiYRFnEAARGGIBc2Lz1QNtgBzpJCy3XZ0KNuKNZS4+fDpFxzUFlSua9iu1teBAXPFhL4G+bmDgQG5gQGIgQFVqoEAnIEAbeeBASMxT4Q/gAAAVe6BAIaFVl9WUDiqgQEj44OEE95DVSK1nIN1bmTgkbCBULqBPJqBAFSwgVBUuoE87EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB9DtnVB4eeBAKC4obaBAAAAkAMAnQEqUAA8AABHCIWFiIWEiAICAAamYnoOC6cfJa8f5Zvda4D+/7YOf//nNefQYACgnKGWgQFNANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQKbANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQPoANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQU1ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQaDANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQfQANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQkdANEBAAEQEBRgAGFgv9AAIiGAAPuC/rOgnKGWgQprANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQu4ANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ0FANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgQ5TANEBAAEQEAAYABhYL/QACIhgAPuC/rKgnKGWgQ+gANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRDtANEBAAEQEAAYABhYL/QACIhgAPuC/rOgnKGWgRI7ANEBAAEQEAAYABhYL/QACIhgAPuC/rIcU7trQOC7jLOBALeH94EB8YIUzLuNs4IBTbeH94EB8YIUzLuNs4ICm7eH94EB8YIUzLuNs4ID6LeH94EB8YIUzLuNs4IFNbeH94EB8YIUzLuNs4IGg7eH94EB8YIUzLuNs4IH0LeH94EB8YIUzLuNs4IJHbeH94EB8YIUzLuNs4IKa7eH94EB8YIUzLuNs4ILuLeH94EB8YIUzLuNs4INBbeH94EB8YIUzLuNs4IOU7eH94EB8YIUzLuNs4IPoLeH94EB8YIUzLuNs4IQ7beH94EB8YIUzLuNs4ISO7eH94EB8YIUzBFNm3SPTbuMU6uEH0O2dVOsghTM", t.appendChild(n), document.body.appendChild(t), this.async((function () {
                    t.onplaying = function (i) {
                        clearTimeout(e), this.playsupported = i && "playing" === i.type || 0 !== t.currentTime, this._playsupportedLocalStorage = this.playsupported, t.onplaying = null, document.body.removeChild(t)
                    }.bind(this), e = setTimeout(t.onplaying, 500), t.play()
                }))
            } else this.playsupported = !1, this._playsupportedLocalStorage = !1
        }
    },
    ready: function () {
        if (this.hasAttribute("fluid")) {
            var e = parseInt(this.height, 10) / parseInt(this.width, 10);
            isNaN(e) && (e = 9 / 16), e *= 100, this.width = "100%", this.height = "auto", this.$.container.style["padding-top"] = e + "%"
        }
    },
    detached: function () {
        this._player && this._player.destroy()
    },
    play: function () {
        this._player && this._player.playVideo && this.playsupported && this._player.playVideo()
    },
    setVolume: function (e) {
        this._player && this._player.setVolume && this._player.setVolume(e)
    },
    mute: function () {
        this._player && this._player.mute && this._player.mute()
    },
    unMute: function () {
        this._player && this._player.unMute && this._player.unMute()
    },
    pause: function () {
        this._player && this._player.pauseVideo && this._player.pauseVideo()
    },
    seekTo: function (e) {
        this._player && this._player.seekTo && (this._player.seekTo(e, !0), this.async((function () {
            this._updatePlaybackStats()
        }), 100))
    },
    setPlaybackRate: function (e) {
        this._player && this._player.setPlaybackRate && this._player.setPlaybackRate(e)
    },
    setPlaybackQuality: function (e) {
        this._player && this._player.setPlaybackQuality && this._player.setPlaybackQuality(e)
    },
    _videoIdChanged: function () {
        this.videoId && (this.currenttime = 0, this.currenttimeformatted = this._toHHMMSS(0), this.fractionloaded = 0, this.duration = 1, this.durationformatted = this._toHHMMSS(0), this._player && this._player.cueVideoById ? this.playsupported && this.attributes.autoplay && "1" == this.attributes.autoplay.value ? this._player.loadVideoById(this.videoId) : this._player.cueVideoById(this.videoId) : this._pendingVideoId = this.videoId)
    },
    _player: null,
    __updatePlaybackStatsInterval: null,
    _pendingVideoId: "",
    _apiLoad: function () {
        var e = {playsinline: 1, controls: 2, autohide: 1, autoplay: this.autoplay};
        this.chromeless && (e.controls = 0, e.modestbranding = 1, e.showinfo = 0, e.iv_load_policy = 3, e.rel = 0);
        for (var t, i = 0; i < this.attributes.length; i++) e[(t = this.attributes[i]).nodeName] = t.value;
        this._player = new YT.Player(this.$.player, {
            videoId: this.videoId, width: "100%", height: "100%", playerVars: e, events: {
                onReady: function (e) {
                    this._pendingVideoId && this._pendingVideoId != this.videoId && (this._player.cueVideoById(this._pendingVideoId), this._pendingVideoId = ""), this.fire("google-youtube-ready", e)
                }.bind(this), onStateChange: function (e) {
                    this.state = e.data, 1 == this.state ? (this.playbackstarted = !0, this.playsupported = !0, this.duration = this._player.getDuration(), this.durationformatted = this._toHHMMSS(this.duration), this.__updatePlaybackStatsInterval || (this.__updatePlaybackStatsInterval = setInterval(this._updatePlaybackStats.bind(this), this.statsUpdateInterval))) : this.__updatePlaybackStatsInterval && (clearInterval(this.__updatePlaybackStatsInterval), this.__updatePlaybackStatsInterval = null), this.fire("google-youtube-state-change", e)
                }.bind(this), onPlaybackQualityChange: function (e) {
                    this.playbackquality = e.data
                }.bind(this), onPlaybackRateChange: function (e) {
                    this.playbackrate = e.data
                }.bind(this), onError: function (e) {
                    this.state = 0, this.fire("google-youtube-error", e)
                }.bind(this)
            }
        })
    },
    _updatePlaybackStats: function () {
        this.currenttime = 1e3 <= this.statsUpdateInterval ? Math.round(this._player.getCurrentTime()) : this._player.getCurrentTime(), this.currenttimeformatted = this._toHHMMSS(this.currenttime), this.fractionloaded = this._player.getVideoLoadedFraction(), this.volume = this._player.getVolume()
    },
    _toHHMMSS: function (e) {
        var t = Math.floor(e / 3600);
        e -= 3600 * t;
        var i = Math.floor(e / 60), n = Math.round(e - 60 * i), s = "";
        return 0 < t && (s += t + ":", 10 > i && (i = "0" + i)), 10 > n && (n = "0" + n), s + i + ":" + n
    },
    _handleThumbnailTap: function () {
        this.autoplay = 1, this.thumbnail = ""
    }
});
const PA = document.createElement("template");
PA.setAttribute("style", "display: none;"), PA.innerHTML = '<dom-module id="app-grid-style"><template><style>:host{--app-grid-expandible-item:{-webkit-flex-basis:calc((100% - .1px)/ var(--app-grid-columns,1) * var(--app-grid-expandible-item-columns,1) - var(--app-grid-gutter,0px))!important;flex-basis:calc((100% - .1px)/ var(--app-grid-columns,1) * var(--app-grid-expandible-item-columns,1) - var(--app-grid-gutter,0px))!important;max-width:calc((100% - .1px)/ var(--app-grid-columns,1) * var(--app-grid-expandible-item-columns,1) - var(--app-grid-gutter,0px))!important};}.app-grid{display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding-top:var(--app-grid-gutter,0);padding-left:var(--app-grid-gutter,0);box-sizing:border-box}.app-grid>*{-ms-flex:1 1 100%;-webkit-flex:1;flex:1;-webkit-flex-basis:calc((100% - .1px - (var(--app-grid-gutter,0px) * var(--app-grid-columns,1)))/ var(--app-grid-columns,1));flex-basis:calc((100% - .1px - (var(--app-grid-gutter,0px) * var(--app-grid-columns,1)))/ var(--app-grid-columns,1));max-width:calc((100% - .1px - (var(--app-grid-gutter,0px) * var(--app-grid-columns,1)))/ var(--app-grid-columns,1));margin-bottom:var(--app-grid-gutter,0);margin-right:var(--app-grid-gutter,0);height:var(--app-grid-item-height);box-sizing:border-box}.app-grid[has-aspect-ratio]>*{position:relative}.app-grid[has-aspect-ratio]>::before{display:block;content:"";padding-top:var(--app-grid-item-height,100%)}.app-grid[has-aspect-ratio]>*>*{position:absolute;top:0;right:0;bottom:0;left:0}</style></template></dom-module>', document.head.appendChild(PA.content);
const EA = Jr`<custom-style><style is="custom-style">[hidden]{display:none!important}</style></custom-style><custom-style><style is="custom-style">html{--layout:{display:-ms-flexbox;display:-webkit-flex;display:flex};--layout-inline:{display:-ms-inline-flexbox;display:-webkit-inline-flex;display:inline-flex};--layout-horizontal:{@apply --layout;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row};--layout-horizontal-reverse:{@apply --layout;-ms-flex-direction:row-reverse;-webkit-flex-direction:row-reverse;flex-direction:row-reverse};--layout-vertical:{@apply --layout;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column};--layout-vertical-reverse:{@apply --layout;-ms-flex-direction:column-reverse;-webkit-flex-direction:column-reverse;flex-direction:column-reverse};--layout-wrap:{-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap};--layout-wrap-reverse:{-ms-flex-wrap:wrap-reverse;-webkit-flex-wrap:wrap-reverse;flex-wrap:wrap-reverse};--layout-flex-auto:{-ms-flex:1 1 auto;-webkit-flex:1 1 auto;flex:1 1 auto};--layout-flex-none:{-ms-flex:none;-webkit-flex:none;flex:none};--layout-flex:{-ms-flex:1 1 .000000001px;-webkit-flex:1;flex:1;-webkit-flex-basis:.000000001px;flex-basis:.000000001px};--layout-flex-2:{-ms-flex:2;-webkit-flex:2;flex:2};--layout-flex-3:{-ms-flex:3;-webkit-flex:3;flex:3};--layout-flex-4:{-ms-flex:4;-webkit-flex:4;flex:4};--layout-flex-5:{-ms-flex:5;-webkit-flex:5;flex:5};--layout-flex-6:{-ms-flex:6;-webkit-flex:6;flex:6};--layout-flex-7:{-ms-flex:7;-webkit-flex:7;flex:7};--layout-flex-8:{-ms-flex:8;-webkit-flex:8;flex:8};--layout-flex-9:{-ms-flex:9;-webkit-flex:9;flex:9};--layout-flex-10:{-ms-flex:10;-webkit-flex:10;flex:10};--layout-flex-11:{-ms-flex:11;-webkit-flex:11;flex:11};--layout-flex-12:{-ms-flex:12;-webkit-flex:12;flex:12};--layout-start:{-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start};--layout-center:{-ms-flex-align:center;-webkit-align-items:center;align-items:center};--layout-end:{-ms-flex-align:end;-webkit-align-items:flex-end;align-items:flex-end};--layout-baseline:{-ms-flex-align:baseline;-webkit-align-items:baseline;align-items:baseline};--layout-start-justified:{-ms-flex-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start};--layout-center-justified:{-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center};--layout-end-justified:{-ms-flex-pack:end;-webkit-justify-content:flex-end;justify-content:flex-end};--layout-around-justified:{-ms-flex-pack:distribute;-webkit-justify-content:space-around;justify-content:space-around};--layout-justified:{-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between};--layout-center-center:{@apply --layout-center;@apply --layout-center-justified;};--layout-self-start:{-ms-align-self:flex-start;-webkit-align-self:flex-start;align-self:flex-start};--layout-self-center:{-ms-align-self:center;-webkit-align-self:center;align-self:center};--layout-self-end:{-ms-align-self:flex-end;-webkit-align-self:flex-end;align-self:flex-end};--layout-self-stretch:{-ms-align-self:stretch;-webkit-align-self:stretch;align-self:stretch};--layout-self-baseline:{-ms-align-self:baseline;-webkit-align-self:baseline;align-self:baseline};--layout-start-aligned:{-ms-flex-line-pack:start;-ms-align-content:flex-start;-webkit-align-content:flex-start;align-content:flex-start};--layout-end-aligned:{-ms-flex-line-pack:end;-ms-align-content:flex-end;-webkit-align-content:flex-end;align-content:flex-end};--layout-center-aligned:{-ms-flex-line-pack:center;-ms-align-content:center;-webkit-align-content:center;align-content:center};--layout-between-aligned:{-ms-flex-line-pack:justify;-ms-align-content:space-between;-webkit-align-content:space-between;align-content:space-between};--layout-around-aligned:{-ms-flex-line-pack:distribute;-ms-align-content:space-around;-webkit-align-content:space-around;align-content:space-around};--layout-block:{display:block};--layout-invisible:{visibility:hidden!important};--layout-relative:{position:relative};--layout-fit:{position:absolute;top:0;right:0;bottom:0;left:0};--layout-scroll:{-webkit-overflow-scrolling:touch;overflow:auto};--layout-fullbleed:{margin:0;height:100vh};--layout-fixed-top:{position:fixed;top:0;left:0;right:0};--layout-fixed-right:{position:fixed;top:0;right:0;bottom:0};--layout-fixed-bottom:{position:fixed;right:0;bottom:0;left:0};--layout-fixed-left:{position:fixed;top:0;bottom:0;left:0};}</style></custom-style>`;
EA.setAttribute("style", "display: none;"), document.head.appendChild(EA.content);
var kA = document.createElement("style");
kA.textContent = "[hidden] { display: none !important; }", document.head.appendChild(kA), gr({
    _template: Jr`<style>:host{@apply --layout-horizontal;@apply --layout-center;position:relative;height:64px;padding:0 16px;pointer-events:none;font-size:var(--app-toolbar-font-size,20px)}:host ::slotted(*){pointer-events:auto}:host ::slotted(paper-icon-button){font-size:0}:host ::slotted([condensed-title]),:host ::slotted([main-title]){pointer-events:none;@apply --layout-flex;}:host ::slotted([bottom-item]){position:absolute;right:0;bottom:0;left:0}:host ::slotted([top-item]){position:absolute;top:0;right:0;left:0}:host ::slotted([spacer]){margin-left:64px}</style><slot></slot>`,
    is: "app-toolbar"
});
const TA = {};
let IA = null;
const NA = function (e, t, i, n) {
    return -i * (e /= n) * (e - 2) + t
}, OA = function (e, t) {
    if (null != TA[e]) throw new Error("effect `" + e + "` is already registered.");
    TA[e] = t
}, MA = function (e, t) {
    for (var i = [t], n = []; 0 < i.length;) {
        var s = i.shift();
        n.push.apply(n, s.querySelectorAll(e));
        for (var a = 0; s.children[a]; a++) s.children[a].shadowRoot && i.push(s.children[a].shadowRoot)
    }
    return n
}, LA = function (e) {
    e = e || {};
    var t = document.documentElement, i = e.target || t, n = "scrollBehavior" in i.style && i.scroll, s = e.top || 0,
        a = e.left || 0, r = i === t ? window.scrollTo : function (e, t) {
            i.scrollLeft = e, i.scrollTop = t
        };
    if ("smooth" === e.behavior) if (n) i.scroll(e); else {
        var A = NA, o = Date.now(), l = i === t ? window.pageYOffset : i.scrollTop,
            c = i === t ? window.pageXOffset : i.scrollLeft, d = s - l, h = a - c;
        (function e() {
            var t = Date.now() - o;
            t < 300 ? (r(A(t, c, h, 300), A(t, l, d, 300)), requestAnimationFrame(e)) : r(a, s)
        }).bind(this)()
    } else if ("silent" === e.behavior) {
        var u = MA("app-header", document.body);
        u.forEach((function (e) {
            e.setAttribute("silent-scroll", "")
        })), IA && window.cancelAnimationFrame(IA), IA = window.requestAnimationFrame((function () {
            u.forEach((function (e) {
                e.removeAttribute("silent-scroll")
            })), IA = null
        })), r(a, s)
    } else r(a, s)
};
var RA = {
    _scrollEffects: TA, get _scrollTimer() {
        return IA
    }, scrollTimingFunction: NA, registerEffect: OA, queryAllRoot: MA, scroll: LA
};
gr({
    is: "iron-location", properties: {
        path: {
            type: String, notify: !0, value: function () {
                return window.decodeURIComponent(window.location.pathname)
            }
        },
        query: {
            type: String, notify: !0, value: function () {
                return window.location.search.slice(1)
            }
        },
        hash: {
            type: String, notify: !0, value: function () {
                return window.decodeURIComponent(window.location.hash.slice(1))
            }
        },
        dwellTime: {type: Number, value: 2e3},
        urlSpaceRegex: {type: String, value: ""},
        encodeSpaceAsPlusInQuery: {type: Boolean, value: !1},
        _urlSpaceRegExp: {computed: "_makeRegExp(urlSpaceRegex)"},
        _lastChangedAt: {type: Number},
        _initialized: {type: Boolean, value: !1}
    }, hostAttributes: {hidden: !0}, observers: ["_updateUrl(path, query, hash)"], created: function () {
        this.__location = window.location
    }, attached: function () {
        this.listen(window, "hashchange", "_hashChanged"), this.listen(window, "location-changed", "_urlChanged"), this.listen(window, "popstate", "_urlChanged"), this.listen(document.body, "click", "_globalOnClick"), this._lastChangedAt = window.performance.now() - (this.dwellTime - 200), this._initialized = !0, this._urlChanged()
    }, detached: function () {
        this.unlisten(window, "hashchange", "_hashChanged"), this.unlisten(window, "location-changed", "_urlChanged"), this.unlisten(window, "popstate", "_urlChanged"), this.unlisten(document.body, "click", "_globalOnClick"), this._initialized = !1
    }, _hashChanged: function () {
        this.hash = window.decodeURIComponent(this.__location.hash.substring(1))
    }, _urlChanged: function () {
        this._dontUpdateUrl = !0, this._hashChanged(), this.path = window.decodeURIComponent(this.__location.pathname), this.query = this.__location.search.substring(1), this._dontUpdateUrl = !1, this._updateUrl()
    }, _getUrl: function () {
        var e = window.encodeURI(this.path).replace(/\#/g, "%23").replace(/\?/g, "%3F"), t = "";
        this.query && (t = "?" + this.query.replace(/\#/g, "%23"), t = this.encodeSpaceAsPlusInQuery ? t.replace(/\+/g, "%2B").replace(/ /g, "+").replace(/%20/g, "+") : t.replace(/\+/g, "%2B").replace(/ /g, "%20"));
        var i = "";
        return this.hash && (i = "#" + window.encodeURI(this.hash)), e + t + i
    }, _updateUrl: function () {
        if (!this._dontUpdateUrl && this._initialized && (this.path !== window.decodeURIComponent(this.__location.pathname) || this.query !== this.__location.search.substring(1) || this.hash !== window.decodeURIComponent(this.__location.hash.substring(1)))) {
            var e = this._getUrl(), t = new URL(e, this.__location.protocol + "//" + this.__location.host).href,
                i = window.performance.now(), n = this._lastChangedAt + this.dwellTime > i;
            this._lastChangedAt = i, n ? window.history.replaceState({}, "", t) : window.history.pushState({}, "", t), this.fire("location-changed", {}, {node: window})
        }
    }, _globalOnClick: function (e) {
        if (!e.defaultPrevented) {
            var t = this._getSameOriginLinkHref(e);
            t && (e.preventDefault(), t !== this.__location.href && (window.history.pushState({}, "", t), this.fire("location-changed", {}, {node: window})))
        }
    }, _getSameOriginLinkHref: function (e) {
        if (0 !== e.button) return null;
        if (e.metaKey || e.ctrlKey) return null;
        for (var t, i = rr(e).path, n = null, s = 0; s < i.length; s++) if ("A" === (t = i[s]).tagName && t.href) {
            n = t;
            break
        }
        if (!n) return null;
        if ("_blank" === n.target) return null;
        if (("_top" === n.target || "_parent" === n.target) && window.top !== window) return null;
        if (n.download) return null;
        var a, r, A, o = n.href;
        if (a = null != document.baseURI ? new URL(o, document.baseURI) : new URL(o), r = this.__location.origin ? this.__location.origin : this.__location.protocol + "//" + this.__location.host, a.origin) A = a.origin; else {
            var l = a.host, c = a.port, d = a.protocol;
            ("https:" === d && "443" === c || "http:" === d && "80" === c) && (l = a.hostname), A = d + "//" + l
        }
        if (A !== r) return null;
        var h = a.pathname + a.search + a.hash;
        return "/" !== h[0] && (h = "/" + h), this._urlSpaceRegExp && !this._urlSpaceRegExp.test(h) ? null : new URL(h, this.__location.href).href
    }, _makeRegExp: function (e) {
        return RegExp(e)
    }
}), gr({
    is: "iron-query-params",
    properties: {
        paramsString: {type: String, notify: !0, observer: "paramsStringChanged"},
        paramsObject: {type: Object, notify: !0},
        _dontReact: {type: Boolean, value: !1}
    },
    hostAttributes: {hidden: !0},
    observers: ["paramsObjectChanged(paramsObject.*)"],
    paramsStringChanged: function () {
        this._dontReact = !0, this.paramsObject = this._decodeParams(this.paramsString), this._dontReact = !1
    },
    paramsObjectChanged: function () {
        this._dontReact || (this.paramsString = this._encodeParams(this.paramsObject).replace(/%3F/g, "?").replace(/%2F/g, "/").replace(/'/g, "%27"))
    },
    _encodeParams: function (e) {
        var t = [];
        for (var i in e) {
            var n = e[i];
            "" === n ? t.push(encodeURIComponent(i)) : n && t.push(encodeURIComponent(i) + "=" + encodeURIComponent(n.toString()))
        }
        return t.join("&")
    },
    _decodeParams: function (e) {
        for (var t, i = {}, n = (e = (e || "").replace(/\+/g, "%20")).split("&"), s = 0; s < n.length; s++) (t = n[s].split("="))[0] && (i[decodeURIComponent(t[0])] = decodeURIComponent(t[1] || ""));
        return i
    }
});
const DA = {
    properties: {
        route: {type: Object, notify: !0},
        queryParams: {type: Object, notify: !0},
        path: {type: String, notify: !0}
    },
    observers: ["_locationChanged(path, queryParams)", "_routeChanged(route.prefix, route.path)", "_routeQueryParamsChanged(route.__queryParams)"],
    created: function () {
        this.linkPaths("route.__queryParams", "queryParams"), this.linkPaths("queryParams", "route.__queryParams")
    },
    _locationChanged: function () {
        this.route && this.route.path === this.path && this.queryParams === this.route.__queryParams || (this.route = {
            prefix: "",
            path: this.path,
            __queryParams: this.queryParams
        })
    },
    _routeChanged: function () {
        this.route && (this.path = this.route.prefix + this.route.path)
    },
    _routeQueryParamsChanged: function (e) {
        this.route && (this.queryParams = e)
    }
};
var BA = {AppRouteConverterBehavior: DA};
gr({
    _template: Jr`<iron-query-params params-string="{{__query}}" params-object="{{queryParams}}"></iron-query-params><iron-location path="{{__path}}" query="{{__query}}" hash="{{__hash}}" url-space-regex="[[urlSpaceRegex]]" dwell-time="[[dwellTime]]"></iron-location>`,
    is: "app-location",
    properties: {
        route: {type: Object, notify: !0},
        useHashAsPath: {type: Boolean, value: !1},
        urlSpaceRegex: {type: String, notify: !0},
        __queryParams: {type: Object},
        __path: {type: String},
        __query: {type: String},
        __hash: {type: String},
        path: {type: String, observer: "__onPathChanged"},
        _isReady: {type: Boolean},
        dwellTime: {type: Number}
    },
    behaviors: [DA],
    observers: ["__computeRoutePath(useHashAsPath, __hash, __path)"],
    ready: function () {
        this._isReady = !0
    },
    __computeRoutePath: function () {
        this.path = this.useHashAsPath ? this.__hash : this.__path
    },
    __onPathChanged: function () {
        this._isReady && (this.useHashAsPath ? this.__hash = this.path : this.__path = this.path)
    }
}), gr({
    is: "app-route",
    properties: {
        route: {type: Object, notify: !0},
        pattern: {type: String},
        data: {
            type: Object, value: function () {
                return {}
            }, notify: !0
        },
        autoActivate: {type: Boolean, value: !1},
        _queryParamsUpdating: {type: Boolean, value: !1},
        queryParams: {
            type: Object, value: function () {
                return {}
            }, notify: !0
        },
        tail: {
            type: Object, value: function () {
                return {path: null, prefix: null, __queryParams: null}
            }, notify: !0
        },
        active: {type: Boolean, notify: !0, readOnly: !0},
        _matched: {type: String, value: ""}
    },
    observers: ["__tryToMatch(route.path, pattern)", "__updatePathOnDataChange(data.*)", "__tailPathChanged(tail.path)", "__routeQueryParamsChanged(route.__queryParams)", "__tailQueryParamsChanged(tail.__queryParams)", "__queryParamsChanged(queryParams.*)"],
    created: function () {
        this.linkPaths("route.__queryParams", "tail.__queryParams"), this.linkPaths("tail.__queryParams", "route.__queryParams")
    },
    __routeQueryParamsChanged: function (e) {
        if (e && this.tail) {
            if (this.tail.__queryParams !== e && this.set("tail.__queryParams", e), !this.active || this._queryParamsUpdating) return;
            var t = {}, i = !1;
            for (var n in e) t[n] = e[n], !i && this.queryParams && e[n] === this.queryParams[n] || (i = !0);
            for (var n in this.queryParams) if (i || !(n in e)) {
                i = !0;
                break
            }
            if (!i) return;
            this._queryParamsUpdating = !0, this.set("queryParams", t), this._queryParamsUpdating = !1
        }
    },
    __tailQueryParamsChanged: function (e) {
        e && this.route && this.route.__queryParams != e && this.set("route.__queryParams", e)
    },
    __queryParamsChanged: function (e) {
        this.active && !this._queryParamsUpdating && this.set("route.__" + e.path, e.value)
    },
    __resetProperties: function () {
        this._setActive(!1), this._matched = null
    },
    __tryToMatch: function () {
        if (this.route) {
            var e = this.route.path, t = this.pattern;
            if (this.autoActivate && "" === e && (e = "/"), t) if (e) {
                for (var i, n = e.split("/"), s = t.split("/"), a = [], r = {}, A = 0; A < s.length && ((i = s[A]) || "" === i); A++) {
                    var o = n.shift();
                    if (!o && "" !== o) return void this.__resetProperties();
                    if (a.push(o), ":" == i.charAt(0)) r[i.slice(1)] = o; else if (i !== o) return void this.__resetProperties()
                }
                this._matched = a.join("/");
                var l = {};
                this.active || (l.active = !0);
                var c = this.route.prefix + this._matched, d = n.join("/");
                for (var h in 0 < n.length && (d = "/" + d), this.tail && this.tail.prefix === c && this.tail.path === d || (l.tail = {
                    prefix: c,
                    path: d,
                    __queryParams: this.route.__queryParams
                }), l.data = r, this._dataInUrl = {}, r) this._dataInUrl[h] = r[h];
                this.setProperties ? this.setProperties(l, !0) : this.__setMulti(l)
            } else this.__resetProperties()
        }
    },
    __tailPathChanged: function (e) {
        if (this.active) {
            var t = e, i = this._matched;
            t && ("/" !== t.charAt(0) && (t = "/" + t), i += t), this.set("route.path", i)
        }
    },
    __updatePathOnDataChange: function () {
        if (this.route && this.active) {
            var e = this.__getLink({});
            e !== this.__getLink(this._dataInUrl) && this.set("route.path", e)
        }
    },
    __getLink: function (e) {
        var t = {tail: null};
        for (var i in this.data) t[i] = this.data[i];
        for (var i in e) t[i] = e[i];
        var n = this.pattern.split("/").map((function (e) {
            return ":" == e[0] && (e = t[e.slice(1)]), e
        }), this);
        return t.tail && t.tail.path && (0 < n.length && "/" === t.tail.path.charAt(0) ? n.push(t.tail.path.slice(1)) : n.push(t.tail.path)), n.join("/")
    },
    __setMulti: function (e) {
        for (var t in e) this._propertySetter(t, e[t]);
        void 0 !== e.data && (this._pathEffector("data", this.data), this._notifyChange("data")), void 0 !== e.active && (this._pathEffector("active", this.active), this._notifyChange("active")), void 0 !== e.tail && (this._pathEffector("tail", this.tail), this._notifyChange("tail"))
    }
});
var zA = {"U+0008": "backspace", "U+0009": "tab", "U+001B": "esc", "U+0020": "space", "U+007F": "del"}, HA = {
        8: "backspace",
        9: "tab",
        13: "enter",
        27: "esc",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        46: "del",
        106: "*"
    }, FA = {shift: "shiftKey", ctrl: "ctrlKey", alt: "altKey", meta: "metaKey"}, UA = /[a-z0-9*]/, qA = /U\+/,
    jA = /^arrow/, YA = /^space(bar)?/, $A = /^escape$/;

function VA(e, t) {
    var i = "";
    if (e) {
        var n = e.toLowerCase();
        " " === n || YA.test(n) ? i = "space" : $A.test(n) ? i = "esc" : 1 == n.length ? t && !UA.test(n) || (i = n) : i = jA.test(n) ? n.replace("arrow", "") : "multiply" == n ? "*" : n
    }
    return i
}

function KA(e) {
    var t = "";
    return e && (e in zA ? t = zA[e] : qA.test(e) ? (e = parseInt(e.replace("U+", "0x"), 16), t = String.fromCharCode(e).toLowerCase()) : t = e.toLowerCase()), t
}

function QA(e) {
    var t = "";
    return +e && (t = 65 <= e && 90 >= e ? String.fromCharCode(32 + e) : 112 <= e && 123 >= e ? "f" + (e - 112 + 1) : 48 <= e && 57 >= e ? e - 48 + "" : 96 <= e && 105 >= e ? e - 96 + "" : HA[e]), t
}

function GA(e, t) {
    return e.key ? VA(e.key, t) : e.detail && e.detail.key ? VA(e.detail.key, t) : KA(e.keyIdentifier) || QA(e.keyCode) || ""
}

function WA(e, t) {
    return GA(t, e.hasModifiers) === e.key && (!e.hasModifiers || !!t.shiftKey == !!e.shiftKey && !!t.ctrlKey == !!e.ctrlKey && !!t.altKey == !!e.altKey && !!t.metaKey == !!e.metaKey)
}

function JA(e) {
    return 1 === e.length ? {combo: e, key: e, event: "keydown"} : e.split("+").reduce((function (e, t) {
        var i = t.split(":"), n = i[0], s = i[1];
        return n in FA ? (e[FA[n]] = !0, e.hasModifiers = !0) : (e.key = n, e.event = s || "keydown"), e
    }), {combo: e.split(":").shift()})
}

function XA(e) {
    return e.trim().split(" ").map((function (e) {
        return JA(e)
    }))
}

const ZA = {
    properties: {
        keyEventTarget: {
            type: Object, value: function () {
                return this
            }
        },
        stopKeyboardEventPropagation: {type: Boolean, value: !1},
        _boundKeyHandlers: {
            type: Array, value: function () {
                return []
            }
        },
        _imperativeKeyBindings: {
            type: Object, value: function () {
                return {}
            }
        }
    },
    observers: ["_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)"],
    keyBindings: {},
    registered: function () {
        this._prepKeyBindings()
    },
    attached: function () {
        this._listenKeyEventListeners()
    },
    detached: function () {
        this._unlistenKeyEventListeners()
    },
    addOwnKeyBinding: function (e, t) {
        this._imperativeKeyBindings[e] = t, this._prepKeyBindings(), this._resetKeyEventListeners()
    },
    removeOwnKeyBindings: function () {
        this._imperativeKeyBindings = {}, this._prepKeyBindings(), this._resetKeyEventListeners()
    },
    keyboardEventMatchesKeys: function (e, t) {
        for (var i = XA(t), n = 0; n < i.length; ++n) if (WA(i[n], e)) return !0;
        return !1
    },
    _collectKeyBindings: function () {
        var e = this.behaviors.map((function (e) {
            return e.keyBindings
        }));
        return -1 === e.indexOf(this.keyBindings) && e.push(this.keyBindings), e
    },
    _prepKeyBindings: function () {
        for (var e in this._keyBindings = {}, this._collectKeyBindings().forEach((function (e) {
            for (var t in e) this._addKeyBinding(t, e[t])
        }), this), this._imperativeKeyBindings) this._addKeyBinding(e, this._imperativeKeyBindings[e]);
        for (var t in this._keyBindings) this._keyBindings[t].sort((function (e, t) {
            var i = e[0].hasModifiers;
            return i === t[0].hasModifiers ? 0 : i ? -1 : 1
        }))
    },
    _addKeyBinding: function (e, t) {
        XA(e).forEach((function (e) {
            this._keyBindings[e.event] = this._keyBindings[e.event] || [], this._keyBindings[e.event].push([e, t])
        }), this)
    },
    _resetKeyEventListeners: function () {
        this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners()
    },
    _listenKeyEventListeners: function () {
        this.keyEventTarget && Object.keys(this._keyBindings).forEach((function (e) {
            var t = this._keyBindings[e], i = this._onKeyBindingEvent.bind(this, t);
            this._boundKeyHandlers.push([this.keyEventTarget, e, i]), this.keyEventTarget.addEventListener(e, i)
        }), this)
    },
    _unlistenKeyEventListeners: function () {
        for (var e, t, i, n; this._boundKeyHandlers.length;) t = (e = this._boundKeyHandlers.pop())[0], i = e[1], n = e[2], t.removeEventListener(i, n)
    },
    _onKeyBindingEvent: function (e, t) {
        if (this.stopKeyboardEventPropagation && t.stopPropagation(), !t.defaultPrevented) for (var i = 0; i < e.length; i++) {
            var n = e[i][0], s = e[i][1];
            if (WA(n, t) && (this._triggerKeyHandler(n, s, t), t.defaultPrevented)) return
        }
    },
    _triggerKeyHandler: function (e, t, i) {
        var n = Object.create(e);
        n.keyboardEvent = i;
        var s = new CustomEvent(e.event, {detail: n, cancelable: !0});
        this[t].call(this, s), s.defaultPrevented && i.preventDefault()
    }
};
var eo = {IronA11yKeysBehavior: ZA};
const to = {
    properties: {
        focused: {type: Boolean, value: !1, notify: !0, readOnly: !0, reflectToAttribute: !0},
        disabled: {type: Boolean, value: !1, notify: !0, observer: "_disabledChanged", reflectToAttribute: !0},
        _oldTabIndex: {type: String},
        _boundFocusBlurHandler: {
            type: Function, value: function () {
                return this._focusBlurHandler.bind(this)
            }
        }
    }, observers: ["_changedControlState(focused, disabled)"], ready: function () {
        this.addEventListener("focus", this._boundFocusBlurHandler, !0), this.addEventListener("blur", this._boundFocusBlurHandler, !0)
    }, _focusBlurHandler: function (e) {
        this._setFocused("focus" === e.type)
    }, _disabledChanged: function (e, t) {
        this.setAttribute("aria-disabled", e ? "true" : "false"), this.style.pointerEvents = e ? "none" : "", e ? (this._oldTabIndex = this.getAttribute("tabindex"), this._setFocused(!1), this.tabIndex = -1, this.blur()) : void 0 !== this._oldTabIndex && (null === this._oldTabIndex ? this.removeAttribute("tabindex") : this.setAttribute("tabindex", this._oldTabIndex))
    }, _changedControlState: function () {
        this._controlStateChanged && this._controlStateChanged()
    }
};
var io = {IronControlState: to};
const no = {
    properties: {
        pressed: {type: Boolean, readOnly: !0, value: !1, reflectToAttribute: !0, observer: "_pressedChanged"},
        toggles: {type: Boolean, value: !1, reflectToAttribute: !0},
        active: {type: Boolean, value: !1, notify: !0, reflectToAttribute: !0},
        pointerDown: {type: Boolean, readOnly: !0, value: !1},
        receivedFocusFromKeyboard: {type: Boolean, readOnly: !0},
        ariaActiveAttribute: {type: String, value: "aria-pressed", observer: "_ariaActiveAttributeChanged"}
    },
    listeners: {down: "_downHandler", up: "_upHandler", tap: "_tapHandler"},
    observers: ["_focusChanged(focused)", "_activeChanged(active, ariaActiveAttribute)"],
    keyBindings: {
        "enter:keydown": "_asyncClick",
        "space:keydown": "_spaceKeyDownHandler",
        "space:keyup": "_spaceKeyUpHandler"
    },
    _mouseEventRe: /^mouse/,
    _tapHandler: function () {
        this.toggles ? this._userActivate(!this.active) : this.active = !1
    },
    _focusChanged: function (e) {
        this._detectKeyboardFocus(e), e || this._setPressed(!1)
    },
    _detectKeyboardFocus: function (e) {
        this._setReceivedFocusFromKeyboard(!this.pointerDown && e)
    },
    _userActivate: function (e) {
        this.active !== e && (this.active = e, this.fire("change"))
    },
    _downHandler: function (e) {
        this._setPointerDown(!0), this._setPressed(!0), this._setReceivedFocusFromKeyboard(!1)
    },
    _upHandler: function () {
        this._setPointerDown(!1), this._setPressed(!1)
    },
    _spaceKeyDownHandler: function (e) {
        var t = e.detail.keyboardEvent, i = rr(t).localTarget;
        this.isLightDescendant(i) || (t.preventDefault(), t.stopImmediatePropagation(), this._setPressed(!0))
    },
    _spaceKeyUpHandler: function (e) {
        var t = e.detail.keyboardEvent, i = rr(t).localTarget;
        this.isLightDescendant(i) || (this.pressed && this._asyncClick(), this._setPressed(!1))
    },
    _asyncClick: function () {
        this.async((function () {
            this.click()
        }), 1)
    },
    _pressedChanged: function (e) {
        this._changedButtonState()
    },
    _ariaActiveAttributeChanged: function (e, t) {
        t && t != e && this.hasAttribute(t) && this.removeAttribute(t)
    },
    _activeChanged: function (e, t) {
        this.toggles ? this.setAttribute(this.ariaActiveAttribute, e ? "true" : "false") : this.removeAttribute(this.ariaActiveAttribute), this._changedButtonState()
    },
    _controlStateChanged: function () {
        this.disabled ? this._setPressed(!1) : this._changedButtonState()
    },
    _changedButtonState: function () {
        this._buttonStateChanged && this._buttonStateChanged()
    }
}, so = [ZA, no];
var ao = {IronButtonStateImpl: no, IronButtonState: so};

class ro {
    constructor(e) {
        ro[" "](e), this.type = e && e.type || "default", this.key = e && e.key, e && "value" in e && (this.value = e.value)
    }

    get value() {
        var e = this.type, t = this.key;
        if (e && t) return ro.types[e] && ro.types[e][t]
    }

    set value(e) {
        var t = this.type, i = this.key;
        t && i && (t = ro.types[t] = ro.types[t] || {}, null == e ? delete t[i] : t[i] = e)
    }

    get list() {
        if (this.type) {
            var e = ro.types[this.type];
            return e ? Object.keys(e).map((function (e) {
                return Ao[this.type][e]
            }), this) : []
        }
    }

    byKey(e) {
        return this.key = e, this.value
    }
}

ro[" "] = function () {
}, ro.types = {};
var Ao = ro.types;
gr({
    is: "iron-meta",
    properties: {
        type: {type: String, value: "default"},
        key: {type: String},
        value: {type: String, notify: !0},
        self: {type: Boolean, observer: "_selfChanged"},
        __meta: {type: Boolean, computed: "__computeMeta(type, key, value)"}
    },
    hostAttributes: {hidden: !0},
    __computeMeta: function (e, t, i) {
        var n = new ro({type: e, key: t});
        return void 0 !== i && i !== n.value ? n.value = i : this.value !== n.value && (this.value = n.value), n
    },
    get list() {
        return this.__meta && this.__meta.list
    },
    _selfChanged: function (e) {
        e && (this.value = this)
    },
    byKey: function (e) {
        return new ro({type: this.type, key: e}).value
    }
});
var oo = {IronMeta: ro};
gr({
    _template: Jr`<style>:host{@apply --layout-inline;@apply --layout-center-center;position:relative;vertical-align:middle;fill:var(--iron-icon-fill-color,currentcolor);stroke:var(--iron-icon-stroke-color,none);width:var(--iron-icon-width,24px);height:var(--iron-icon-height,24px);@apply --iron-icon;}:host([hidden]){display:none}</style>`,
    is: "iron-icon",
    properties: {
        icon: {type: String},
        theme: {type: String},
        src: {type: String},
        _meta: {value: bA.create("iron-meta", {type: "iconset"})}
    },
    observers: ["_updateIcon(_meta, isAttached)", "_updateIcon(theme, isAttached)", "_srcChanged(src, isAttached)", "_iconChanged(icon, isAttached)"],
    _DEFAULT_ICONSET: "icons",
    _iconChanged: function (e) {
        var t = (e || "").split(":");
        this._iconName = t.pop(), this._iconsetName = t.pop() || this._DEFAULT_ICONSET, this._updateIcon()
    },
    _srcChanged: function (e) {
        this._updateIcon()
    },
    _usesIconset: function () {
        return this.icon || !this.src
    },
    _updateIcon: function () {
        this._usesIconset() ? (this._img && this._img.parentNode && rr(this.root).removeChild(this._img), "" === this._iconName ? this._iconset && this._iconset.removeIcon(this) : this._iconsetName && this._meta && (this._iconset = this._meta.byKey(this._iconsetName), this._iconset ? (this._iconset.applyIcon(this, this._iconName, this.theme), this.unlisten(window, "iron-iconset-added", "_updateIcon")) : this.listen(window, "iron-iconset-added", "_updateIcon"))) : (this._iconset && this._iconset.removeIcon(this), this._img || (this._img = document.createElement("img"), this._img.style.width = "100%", this._img.style.height = "100%", this._img.draggable = !1), this._img.src = this.src, rr(this.root).appendChild(this._img))
    }
}), gr({
    is: "iron-media-query",
    properties: {
        queryMatches: {type: Boolean, value: !1, readOnly: !0, notify: !0},
        query: {type: String, observer: "queryChanged"},
        full: {type: Boolean, value: !1},
        _boundMQHandler: {
            value: function () {
                return this.queryHandler.bind(this)
            }
        },
        _mq: {value: null}
    },
    attached: function () {
        this.style.display = "none", this.queryChanged()
    },
    detached: function () {
        this._remove()
    },
    _add: function () {
        this._mq && this._mq.addListener(this._boundMQHandler)
    },
    _remove: function () {
        this._mq && this._mq.removeListener(this._boundMQHandler), this._mq = null
    },
    queryChanged: function () {
        this._remove();
        var e = this.query;
        e && (this.full || "(" === e[0] || (e = "(" + e + ")"), this._mq = window.matchMedia(e), this._add(), this.queryHandler(this._mq))
    },
    queryHandler: function (e) {
        this._setQueryMatches(e.matches)
    }
});
var lo = new Set;
const co = {
    properties: {
        _parentResizable: {type: Object, observer: "_parentResizableChanged"},
        _notifyingDescendant: {type: Boolean, value: !1}
    }, listeners: {"iron-request-resize-notifications": "_onIronRequestResizeNotifications"}, created: function () {
        this._interestedResizables = [], this._boundNotifyResize = this.notifyResize.bind(this), this._boundOnDescendantIronResize = this._onDescendantIronResize.bind(this)
    }, attached: function () {
        this._requestResizeNotifications()
    }, detached: function () {
        this._parentResizable ? this._parentResizable.stopResizeNotificationsFor(this) : (lo.delete(this), window.removeEventListener("resize", this._boundNotifyResize)), this._parentResizable = null
    }, notifyResize: function () {
        this.isAttached && (this._interestedResizables.forEach((function (e) {
            this.resizerShouldNotify(e) && this._notifyDescendant(e)
        }), this), this._fireResize())
    }, assignParentResizable: function (e) {
        this._parentResizable && this._parentResizable.stopResizeNotificationsFor(this), this._parentResizable = e, e && -1 === e._interestedResizables.indexOf(this) && (e._interestedResizables.push(this), e._subscribeIronResize(this))
    }, stopResizeNotificationsFor: function (e) {
        var t = this._interestedResizables.indexOf(e);
        -1 < t && (this._interestedResizables.splice(t, 1), this._unsubscribeIronResize(e))
    }, _subscribeIronResize: function (e) {
        e.addEventListener("iron-resize", this._boundOnDescendantIronResize)
    }, _unsubscribeIronResize: function (e) {
        e.removeEventListener("iron-resize", this._boundOnDescendantIronResize)
    }, resizerShouldNotify: function (e) {
        return !0
    }, _onDescendantIronResize: function (e) {
        this._notifyingDescendant ? e.stopPropagation() : At || this._fireResize()
    }, _fireResize: function () {
        this.fire("iron-resize", null, {node: this, bubbles: !1})
    }, _onIronRequestResizeNotifications: function (e) {
        var t = rr(e).rootTarget;
        t !== this && (t.assignParentResizable(this), this._notifyDescendant(t), e.stopPropagation())
    }, _parentResizableChanged: function (e) {
        e && window.removeEventListener("resize", this._boundNotifyResize)
    }, _notifyDescendant: function (e) {
        this.isAttached && (this._notifyingDescendant = !0, e.notifyResize(), this._notifyingDescendant = !1)
    }, _requestResizeNotifications: function () {
        if (this.isAttached) if ("loading" === document.readyState) {
            var e = this._requestResizeNotifications.bind(this);
            document.addEventListener("readystatechange", (function t() {
                document.removeEventListener("readystatechange", t), e()
            }))
        } else this._findParent(), this._parentResizable ? this._parentResizable._interestedResizables.forEach((function (e) {
            e !== this && e._findParent()
        }), this) : (lo.forEach((function (e) {
            e !== this && e._findParent()
        }), this), window.addEventListener("resize", this._boundNotifyResize), this.notifyResize())
    }, _findParent: function () {
        this.assignParentResizable(null), this.fire("iron-request-resize-notifications", null, {
            node: this,
            bubbles: !0,
            cancelable: !0
        }), this._parentResizable ? lo.delete(this) : lo.add(this)
    }
};
var ho = {IronResizableBehavior: co};

class uo {
    constructor(e) {
        this.selection = [], this.selectCallback = e
    }

    get() {
        return this.multi ? this.selection.slice() : this.selection[0]
    }

    clear(e) {
        this.selection.slice().forEach((function (t) {
            (!e || 0 > e.indexOf(t)) && this.setItemSelected(t, !1)
        }), this)
    }

    isSelected(e) {
        return 0 <= this.selection.indexOf(e)
    }

    setItemSelected(e, t) {
        if (null != e && t !== this.isSelected(e)) {
            if (t) this.selection.push(e); else {
                var i = this.selection.indexOf(e);
                0 <= i && this.selection.splice(i, 1)
            }
            this.selectCallback && this.selectCallback(e, t)
        }
    }

    select(e) {
        this.multi ? this.toggle(e) : this.get() !== e && (this.setItemSelected(this.get(), !1), this.setItemSelected(e, !0))
    }

    toggle(e) {
        this.setItemSelected(e, !this.isSelected(e))
    }
}

var po = {IronSelection: uo};
const mo = {
    properties: {
        attrForSelected: {type: String, value: null},
        selected: {type: String, notify: !0},
        selectedItem: {type: Object, readOnly: !0, notify: !0},
        activateEvent: {type: String, value: "tap", observer: "_activateEventChanged"},
        selectable: String,
        selectedClass: {type: String, value: "iron-selected"},
        selectedAttribute: {type: String, value: null},
        fallbackSelection: {type: String, value: null},
        items: {
            type: Array, readOnly: !0, notify: !0, value: function () {
                return []
            }
        },
        _excludedLocalNames: {
            type: Object, value: function () {
                return {template: 1, "dom-bind": 1, "dom-if": 1, "dom-repeat": 1}
            }
        }
    },
    observers: ["_updateAttrForSelected(attrForSelected)", "_updateSelected(selected)", "_checkFallback(fallbackSelection)"],
    created: function () {
        this._bindFilterItem = this._filterItem.bind(this), this._selection = new uo(this._applySelection.bind(this))
    },
    attached: function () {
        this._observer = this._observeItems(this), this._addListener(this.activateEvent)
    },
    detached: function () {
        this._observer && rr(this).unobserveNodes(this._observer), this._removeListener(this.activateEvent)
    },
    indexOf: function (e) {
        return this.items ? this.items.indexOf(e) : -1
    },
    select: function (e) {
        this.selected = e
    },
    selectPrevious: function () {
        var e = this.items.length, t = e - 1;
        void 0 !== this.selected && (t = (+this._valueToIndex(this.selected) - 1 + e) % e), this.selected = this._indexToValue(t)
    },
    selectNext: function () {
        var e = 0;
        void 0 !== this.selected && (e = (+this._valueToIndex(this.selected) + 1) % this.items.length), this.selected = this._indexToValue(e)
    },
    selectIndex: function (e) {
        this.select(this._indexToValue(e))
    },
    forceSynchronousItemUpdate: function () {
        this._observer && "function" == typeof this._observer.flush ? this._observer.flush() : this._updateItems()
    },
    get _shouldUpdateSelection() {
        return null != this.selected
    },
    _checkFallback: function () {
        this._updateSelected()
    },
    _addListener: function (e) {
        this.listen(this, e, "_activateHandler")
    },
    _removeListener: function (e) {
        this.unlisten(this, e, "_activateHandler")
    },
    _activateEventChanged: function (e, t) {
        this._removeListener(t), this._addListener(e)
    },
    _updateItems: function () {
        var e = rr(this).queryDistributedElements(this.selectable || "*");
        e = Array.prototype.filter.call(e, this._bindFilterItem), this._setItems(e)
    },
    _updateAttrForSelected: function () {
        this.selectedItem && (this.selected = this._valueForItem(this.selectedItem))
    },
    _updateSelected: function () {
        this._selectSelected(this.selected)
    },
    _selectSelected: function (e) {
        if (this.items) {
            var t = this._valueToItem(this.selected);
            t ? this._selection.select(t) : this._selection.clear(), this.fallbackSelection && this.items.length && void 0 === this._selection.get() && (this.selected = this.fallbackSelection)
        }
    },
    _filterItem: function (e) {
        return !this._excludedLocalNames[e.localName]
    },
    _valueToItem: function (e) {
        return null == e ? null : this.items[this._valueToIndex(e)]
    },
    _valueToIndex: function (e) {
        if (!this.attrForSelected) return +e;
        for (var t, i = 0; t = this.items[i]; i++) if (this._valueForItem(t) == e) return i
    },
    _indexToValue: function (e) {
        if (!this.attrForSelected) return e;
        var t = this.items[e];
        return t ? this._valueForItem(t) : void 0
    },
    _valueForItem: function (e) {
        if (!e) return null;
        if (!this.attrForSelected) {
            var t = this.indexOf(e);
            return -1 === t ? null : t
        }
        var i = e[ai(this.attrForSelected)];
        return null != i ? i : e.getAttribute(this.attrForSelected)
    },
    _applySelection: function (e, t) {
        this.selectedClass && this.toggleClass(this.selectedClass, t, e), this.selectedAttribute && this.toggleAttribute(this.selectedAttribute, t, e), this._selectionChange(), this.fire("iron-" + (t ? "select" : "deselect"), {item: e})
    },
    _selectionChange: function () {
        this._setSelectedItem(this._selection.get())
    },
    _observeItems: function (e) {
        return rr(e).observeNodes((function (e) {
            this._updateItems(), this._updateSelected(), this.fire("iron-items-changed", e, {
                bubbles: !1,
                cancelable: !1
            })
        }))
    },
    _activateHandler: function (e) {
        for (var t = e.target, i = this.items; t && t != this;) {
            var n = i.indexOf(t);
            if (0 <= n) {
                var s = this._indexToValue(n);
                return void this._itemActivate(s, t)
            }
            t = t.parentNode
        }
    },
    _itemActivate: function (e, t) {
        this.fire("iron-activate", {selected: e, item: t}, {cancelable: !0}).defaultPrevented || this.select(e)
    }
};
var _o = {IronSelectableBehavior: mo};
gr({
    _template: Jr`<style>:host{display:block}:host>::slotted(:not(slot):not(.iron-selected)){display:none!important}</style><slot></slot>`,
    is: "iron-pages",
    behaviors: [co, mo],
    properties: {activateEvent: {type: String, value: null}},
    observers: ["_selectedPageChanged(selected)"],
    _selectedPageChanged: function (e, t) {
        this.async(this.notifyResize)
    }
});
const fo = {
    properties: {
        scrollTarget: {
            type: HTMLElement, value: function () {
                return this._defaultScrollTarget
            }
        }
    },
    observers: ["_scrollTargetChanged(scrollTarget, isAttached)"],
    _shouldHaveListener: !0,
    _scrollTargetChanged: function (e, t) {
        if (this._oldScrollTarget && (this._toggleScrollListener(!1, this._oldScrollTarget), this._oldScrollTarget = null), t) if ("document" === e) this.scrollTarget = this._doc; else if ("string" == typeof e) {
            var i = this.domHost;
            this.scrollTarget = i && i.$ ? i.$[e] : rr(this.ownerDocument).querySelector("#" + e)
        } else this._isValidScrollTarget() && (this._oldScrollTarget = e, this._toggleScrollListener(this._shouldHaveListener, e))
    },
    _scrollHandler: function () {
    },
    get _defaultScrollTarget() {
        return this._doc
    },
    get _doc() {
        return this.ownerDocument.documentElement
    },
    get _scrollTop() {
        return this._isValidScrollTarget() ? this.scrollTarget === this._doc ? window.pageYOffset : this.scrollTarget.scrollTop : 0
    },
    get _scrollLeft() {
        return this._isValidScrollTarget() ? this.scrollTarget === this._doc ? window.pageXOffset : this.scrollTarget.scrollLeft : 0
    },
    set _scrollTop(e) {
        this.scrollTarget === this._doc ? window.scrollTo(window.pageXOffset, e) : this._isValidScrollTarget() && (this.scrollTarget.scrollTop = e)
    },
    set _scrollLeft(e) {
        this.scrollTarget === this._doc ? window.scrollTo(e, window.pageYOffset) : this._isValidScrollTarget() && (this.scrollTarget.scrollLeft = e)
    },
    scroll: function (e, t) {
        var i;
        "object" == typeof e ? (i = e.left, t = e.top) : i = e, i = i || 0, t = t || 0, this.scrollTarget === this._doc ? window.scrollTo(i, t) : this._isValidScrollTarget() && (this.scrollTarget.scrollLeft = i, this.scrollTarget.scrollTop = t)
    },
    get _scrollTargetWidth() {
        return this._isValidScrollTarget() ? this.scrollTarget === this._doc ? window.innerWidth : this.scrollTarget.offsetWidth : 0
    },
    get _scrollTargetHeight() {
        return this._isValidScrollTarget() ? this.scrollTarget === this._doc ? window.innerHeight : this.scrollTarget.offsetHeight : 0
    },
    _isValidScrollTarget: function () {
        return this.scrollTarget instanceof HTMLElement
    },
    _toggleScrollListener: function (e, t) {
        var i = t === this._doc ? window : t;
        e ? this._boundScrollHandler || (this._boundScrollHandler = this._scrollHandler.bind(this), i.addEventListener("scroll", this._boundScrollHandler)) : this._boundScrollHandler && (i.removeEventListener("scroll", this._boundScrollHandler), this._boundScrollHandler = null)
    },
    toggleScrollListener: function (e) {
        this._shouldHaveListener = e, this._toggleScrollListener(e, this.scrollTarget)
    }
};
var go = {IronScrollTargetBehavior: fo};
const yo = {
    properties: {
        multi: {type: Boolean, value: !1, observer: "multiChanged"},
        selectedValues: {
            type: Array, notify: !0, value: function () {
                return []
            }
        },
        selectedItems: {
            type: Array, readOnly: !0, notify: !0, value: function () {
                return []
            }
        }
    }, observers: ["_updateSelected(selectedValues.splices)"], select: function (e) {
        this.multi ? this._toggleSelected(e) : this.selected = e
    }, multiChanged: function (e) {
        this._selection.multi = e, this._updateSelected()
    }, get _shouldUpdateSelection() {
        return null != this.selected || null != this.selectedValues && this.selectedValues.length
    }, _updateAttrForSelected: function () {
        this.multi ? this.selectedItems && 0 < this.selectedItems.length && (this.selectedValues = this.selectedItems.map((function (e) {
            return this._indexToValue(this.indexOf(e))
        }), this).filter((function (e) {
            return null != e
        }), this)) : mo._updateAttrForSelected.apply(this)
    }, _updateSelected: function () {
        this.multi ? this._selectMulti(this.selectedValues) : this._selectSelected(this.selected)
    }, _selectMulti: function (e) {
        e = e || [];
        var t = (this._valuesToItems(e) || []).filter((function (e) {
            return null != e
        }));
        this._selection.clear(t);
        for (var i = 0; i < t.length; i++) this._selection.setItemSelected(t[i], !0);
        this.fallbackSelection && !this._selection.get().length && (this._valueToItem(this.fallbackSelection) && this.select(this.fallbackSelection))
    }, _selectionChange: function () {
        var e = this._selection.get();
        this.multi ? (this._setSelectedItems(e), this._setSelectedItem(e.length ? e[0] : null)) : null != e ? (this._setSelectedItems([e]), this._setSelectedItem(e)) : (this._setSelectedItems([]), this._setSelectedItem(null))
    }, _toggleSelected: function (e) {
        var t = this.selectedValues.indexOf(e);
        0 > t ? this.push("selectedValues", e) : this.splice("selectedValues", t, 1)
    }, _valuesToItems: function (e) {
        return null == e ? null : e.map((function (e) {
            return this._valueToItem(e)
        }), this)
    }
}, bo = [mo, yo];
var vo = {IronMultiSelectableBehaviorImpl: yo, IronMultiSelectableBehavior: bo};
gr({is: "iron-selector", behaviors: [bo]});
var wo = {
    distance: function (e, t, i, n) {
        var s = e - i, a = t - n;
        return Math.sqrt(s * s + a * a)
    }, now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
};

function So(e) {
    this.element = e, this.width = this.boundingRect.width, this.height = this.boundingRect.height, this.size = Math.max(this.width, this.height)
}

function Co(e) {
    this.element = e, this.color = window.getComputedStyle(e).color, this.wave = document.createElement("div"), this.waveContainer = document.createElement("div"), this.wave.style.backgroundColor = this.color, this.wave.classList.add("wave"), this.waveContainer.classList.add("wave-container"), rr(this.waveContainer).appendChild(this.wave), this.resetInteractionState()
}

So.prototype = {
    get boundingRect() {
        return this.element.getBoundingClientRect()
    }, furthestCornerDistanceFrom: function (e, t) {
        var i = wo.distance(e, t, 0, 0), n = wo.distance(e, t, this.width, 0), s = wo.distance(e, t, 0, this.height),
            a = wo.distance(e, t, this.width, this.height);
        return Math.max(i, n, s, a)
    }
}, Co.MAX_RADIUS = 300, Co.prototype = {
    get recenters() {
        return this.element.recenters
    }, get center() {
        return this.element.center
    }, get mouseDownElapsed() {
        var e;
        return this.mouseDownStart ? (e = wo.now() - this.mouseDownStart, this.mouseUpStart && (e -= this.mouseUpElapsed), e) : 0
    }, get mouseUpElapsed() {
        return this.mouseUpStart ? wo.now() - this.mouseUpStart : 0
    }, get mouseDownElapsedSeconds() {
        return this.mouseDownElapsed / 1e3
    }, get mouseUpElapsedSeconds() {
        return this.mouseUpElapsed / 1e3
    }, get mouseInteractionSeconds() {
        return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds
    }, get initialOpacity() {
        return this.element.initialOpacity
    }, get opacityDecayVelocity() {
        return this.element.opacityDecayVelocity
    }, get radius() {
        var e = this.containerMetrics.width * this.containerMetrics.width,
            t = this.containerMetrics.height * this.containerMetrics.height,
            i = 1.1 * Math.min(Math.sqrt(e + t), Co.MAX_RADIUS) + 5, n = 1.1 - i / Co.MAX_RADIUS * .2,
            s = this.mouseInteractionSeconds / n, a = i * (1 - Math.pow(80, -s));
        return Math.abs(a)
    }, get opacity() {
        return this.mouseUpStart ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity) : this.initialOpacity
    }, get outerOpacity() {
        var e = .3 * this.mouseUpElapsedSeconds, t = this.opacity;
        return Math.max(0, Math.min(e, t))
    }, get isOpacityFullyDecayed() {
        return .01 > this.opacity && this.radius >= Math.min(this.maxRadius, Co.MAX_RADIUS)
    }, get isRestingAtMaxRadius() {
        return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, Co.MAX_RADIUS)
    }, get isAnimationComplete() {
        return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius
    }, get translationFraction() {
        return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2))
    }, get xNow() {
        return this.xEnd ? this.xStart + this.translationFraction * (this.xEnd - this.xStart) : this.xStart
    }, get yNow() {
        return this.yEnd ? this.yStart + this.translationFraction * (this.yEnd - this.yStart) : this.yStart
    }, get isMouseDown() {
        return this.mouseDownStart && !this.mouseUpStart
    }, resetInteractionState: function () {
        this.maxRadius = 0, this.mouseDownStart = 0, this.mouseUpStart = 0, this.xStart = 0, this.yStart = 0, this.xEnd = 0, this.yEnd = 0, this.slideDistance = 0, this.containerMetrics = new So(this.element)
    }, draw: function () {
        var e, t, i;
        this.wave.style.opacity = this.opacity, e = this.radius / (this.containerMetrics.size / 2), t = this.xNow - this.containerMetrics.width / 2, i = this.yNow - this.containerMetrics.height / 2, this.waveContainer.style.webkitTransform = "translate(" + t + "px, " + i + "px)", this.waveContainer.style.transform = "translate3d(" + t + "px, " + i + "px, 0)", this.wave.style.webkitTransform = "scale(" + e + "," + e + ")", this.wave.style.transform = "scale3d(" + e + "," + e + ",1)"
    }, downAction: function (e) {
        var t = this.containerMetrics.width / 2, i = this.containerMetrics.height / 2;
        this.resetInteractionState(), this.mouseDownStart = wo.now(), this.center ? (this.xStart = t, this.yStart = i, this.slideDistance = wo.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)) : (this.xStart = e ? e.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2, this.yStart = e ? e.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2), this.recenters && (this.xEnd = t, this.yEnd = i, this.slideDistance = wo.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)), this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart), this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + "px", this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + "px", this.waveContainer.style.width = this.containerMetrics.size + "px", this.waveContainer.style.height = this.containerMetrics.size + "px"
    }, upAction: function (e) {
        this.isMouseDown && (this.mouseUpStart = wo.now())
    }, remove: function () {
        rr(this.waveContainer.parentNode).removeChild(this.waveContainer)
    }
}, gr({
    _template: Jr`<style>:host{display:block;position:absolute;border-radius:inherit;overflow:hidden;top:0;left:0;right:0;bottom:0;pointer-events:none}:host([animating]){-webkit-transform:translate(0,0);transform:translate3d(0,0,0)}#background,#waves,.wave,.wave-container{pointer-events:none;position:absolute;top:0;left:0;width:100%;height:100%}#background,.wave{opacity:0}#waves,.wave{overflow:hidden}.wave,.wave-container{border-radius:50%}:host(.circle) #background,:host(.circle) #waves{border-radius:50%}:host(.circle) .wave-container{overflow:hidden}</style><div id="background"></div><div id="waves"></div>`,
    is: "paper-ripple",
    behaviors: [ZA],
    properties: {
        initialOpacity: {type: Number, value: .25},
        opacityDecayVelocity: {type: Number, value: .8},
        recenters: {type: Boolean, value: !1},
        center: {type: Boolean, value: !1},
        ripples: {
            type: Array, value: function () {
                return []
            }
        },
        animating: {type: Boolean, readOnly: !0, reflectToAttribute: !0, value: !1},
        holdDown: {type: Boolean, value: !1, observer: "_holdDownChanged"},
        noink: {type: Boolean, value: !1},
        _animating: {type: Boolean},
        _boundAnimate: {
            type: Function, value: function () {
                return this.animate.bind(this)
            }
        }
    },
    get target() {
        return this.keyEventTarget
    },
    keyBindings: {
        "enter:keydown": "_onEnterKeydown",
        "space:keydown": "_onSpaceKeydown",
        "space:keyup": "_onSpaceKeyup"
    },
    attached: function () {
        11 == this.parentNode.nodeType ? this.keyEventTarget = rr(this).getOwnerRoot().host : this.keyEventTarget = this.parentNode;
        var e = this.keyEventTarget;
        this.listen(e, "up", "uiUpAction"), this.listen(e, "down", "uiDownAction")
    },
    detached: function () {
        this.unlisten(this.keyEventTarget, "up", "uiUpAction"), this.unlisten(this.keyEventTarget, "down", "uiDownAction"), this.keyEventTarget = null
    },
    get shouldKeepAnimating() {
        for (var e = 0; e < this.ripples.length; ++e) if (!this.ripples[e].isAnimationComplete) return !0;
        return !1
    },
    simulatedRipple: function () {
        this.downAction(null), this.async((function () {
            this.upAction()
        }), 1)
    },
    uiDownAction: function (e) {
        this.noink || this.downAction(e)
    },
    downAction: function (e) {
        this.holdDown && 0 < this.ripples.length || (this.addRipple().downAction(e), this._animating || (this._animating = !0, this.animate()))
    },
    uiUpAction: function (e) {
        this.noink || this.upAction(e)
    },
    upAction: function (e) {
        this.holdDown || (this.ripples.forEach((function (t) {
            t.upAction(e)
        })), this._animating = !0, this.animate())
    },
    onAnimationComplete: function () {
        this._animating = !1, this.$.background.style.backgroundColor = null, this.fire("transitionend")
    },
    addRipple: function () {
        var e = new Co(this);
        return rr(this.$.waves).appendChild(e.waveContainer), this.$.background.style.backgroundColor = e.color, this.ripples.push(e), this._setAnimating(!0), e
    },
    removeRipple: function (e) {
        var t = this.ripples.indexOf(e);
        0 > t || (this.ripples.splice(t, 1), e.remove(), this.ripples.length || this._setAnimating(!1))
    },
    animate: function () {
        if (this._animating) {
            var e, t;
            for (e = 0; e < this.ripples.length; ++e) (t = this.ripples[e]).draw(), this.$.background.style.opacity = t.outerOpacity, t.isOpacityFullyDecayed && !t.isRestingAtMaxRadius && this.removeRipple(t);
            this.shouldKeepAnimating || 0 !== this.ripples.length ? window.requestAnimationFrame(this._boundAnimate) : this.onAnimationComplete()
        }
    },
    animateRipple: function () {
        return this.animate()
    },
    _onEnterKeydown: function () {
        this.uiDownAction(), this.async(this.uiUpAction, 1)
    },
    _onSpaceKeydown: function () {
        this.uiDownAction()
    },
    _onSpaceKeyup: function () {
        this.uiUpAction()
    },
    _holdDownChanged: function (e, t) {
        void 0 !== t && (e ? this.downAction() : this.upAction())
    }
});
const xo = {
    properties: {noink: {type: Boolean, observer: "_noinkChanged"}, _rippleContainer: {type: Object}},
    _buttonStateChanged: function () {
        this.focused && this.ensureRipple()
    },
    _downHandler: function (e) {
        no._downHandler.call(this, e), this.pressed && this.ensureRipple(e)
    },
    ensureRipple: function (e) {
        if (!this.hasRipple()) {
            this._ripple = this._createRipple(), this._ripple.noink = this.noink;
            var t = this._rippleContainer || this.root;
            if (t && rr(t).appendChild(this._ripple), e) {
                var i = rr(this._rippleContainer || this), n = rr(e).rootTarget;
                i.deepContains(n) && this._ripple.uiDownAction(e)
            }
        }
    },
    getRipple: function () {
        return this.ensureRipple(), this._ripple
    },
    hasRipple: function () {
        return !!this._ripple
    },
    _createRipple: function () {
        return document.createElement("paper-ripple")
    },
    _noinkChanged: function (e) {
        this.hasRipple() && (this._ripple.noink = e)
    }
};
var Po = {PaperRippleBehavior: xo};
const Eo = {
    properties: {elevation: {type: Number, reflectToAttribute: !0, readOnly: !0}},
    observers: ["_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)", "_computeKeyboardClass(receivedFocusFromKeyboard)"],
    hostAttributes: {role: "button", tabindex: "0", animated: !0},
    _calculateElevation: function () {
        var e = 1;
        this.disabled ? e = 0 : this.active || this.pressed ? e = 4 : this.receivedFocusFromKeyboard && (e = 3), this._setElevation(e)
    },
    _computeKeyboardClass: function (e) {
        this.toggleClass("keyboard-focus", e)
    },
    _spaceKeyDownHandler: function (e) {
        no._spaceKeyDownHandler.call(this, e), this.hasRipple() && 1 > this.getRipple().ripples.length && this._ripple.uiDownAction()
    },
    _spaceKeyUpHandler: function (e) {
        no._spaceKeyUpHandler.call(this, e), this.hasRipple() && this._ripple.uiUpAction()
    }
}, ko = [so, to, xo, Eo];
var To = {PaperButtonBehaviorImpl: Eo, PaperButtonBehavior: ko};
const Io = Jr`<custom-style><style is="custom-style">html{--shadow-transition:{transition:box-shadow .28s cubic-bezier(.4,0,.2,1)};--shadow-none:{box-shadow:none};--shadow-elevation-2dp:{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2)};--shadow-elevation-3dp:{box-shadow:0 3px 4px 0 rgba(0,0,0,.14),0 1px 8px 0 rgba(0,0,0,.12),0 3px 3px -2px rgba(0,0,0,.4)};--shadow-elevation-4dp:{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.4)};--shadow-elevation-6dp:{box-shadow:0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 3px 5px -1px rgba(0,0,0,.4)};--shadow-elevation-8dp:{box-shadow:0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.4)};--shadow-elevation-12dp:{box-shadow:0 12px 16px 1px rgba(0,0,0,.14),0 4px 22px 3px rgba(0,0,0,.12),0 6px 7px -4px rgba(0,0,0,.4)};--shadow-elevation-16dp:{box-shadow:0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -5px rgba(0,0,0,.4)};--shadow-elevation-24dp:{box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.4)};}</style></custom-style>`;
Io.setAttribute("style", "display: none;"), document.head.appendChild(Io.content);
const No = Jr`<dom-module id="paper-material-styles"><template><style>html{--paper-material:{display:block;position:relative};--paper-material-elevation-1:{@apply --shadow-elevation-2dp;};--paper-material-elevation-2:{@apply --shadow-elevation-4dp;};--paper-material-elevation-3:{@apply --shadow-elevation-6dp;};--paper-material-elevation-4:{@apply --shadow-elevation-8dp;};--paper-material-elevation-5:{@apply --shadow-elevation-16dp;};}.paper-material{@apply --paper-material;}.paper-material[elevation="1"]{@apply --paper-material-elevation-1;}.paper-material[elevation="2"]{@apply --paper-material-elevation-2;}.paper-material[elevation="3"]{@apply --paper-material-elevation-3;}.paper-material[elevation="4"]{@apply --paper-material-elevation-4;}.paper-material[elevation="5"]{@apply --paper-material-elevation-5;}:host{--paper-material:{display:block;position:relative};--paper-material-elevation-1:{@apply --shadow-elevation-2dp;};--paper-material-elevation-2:{@apply --shadow-elevation-4dp;};--paper-material-elevation-3:{@apply --shadow-elevation-6dp;};--paper-material-elevation-4:{@apply --shadow-elevation-8dp;};--paper-material-elevation-5:{@apply --shadow-elevation-16dp;};}:host(.paper-material){@apply --paper-material;}:host(.paper-material[elevation="1"]){@apply --paper-material-elevation-1;}:host(.paper-material[elevation="2"]){@apply --paper-material-elevation-2;}:host(.paper-material[elevation="3"]){@apply --paper-material-elevation-3;}:host(.paper-material[elevation="4"]){@apply --paper-material-elevation-4;}:host(.paper-material[elevation="5"]){@apply --paper-material-elevation-5;}</style></template></dom-module>`;
No.setAttribute("style", "display: none;"), document.head.appendChild(No.content);
const Oo = Jr`<style include="paper-material-styles">:host{@apply --layout-inline;@apply --layout-center-center;position:relative;box-sizing:border-box;min-width:5.14em;margin:0 .29em;background:0 0;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;font:inherit;text-transform:uppercase;outline-width:0;border-radius:3px;-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none;cursor:pointer;z-index:0;padding:.7em .57em;@apply --paper-font-common-base;@apply --paper-button;}:host([elevation="1"]){@apply --paper-material-elevation-1;}:host([elevation="2"]){@apply --paper-material-elevation-2;}:host([elevation="3"]){@apply --paper-material-elevation-3;}:host([elevation="4"]){@apply --paper-material-elevation-4;}:host([elevation="5"]){@apply --paper-material-elevation-5;}:host([hidden]){display:none!important}:host([raised].keyboard-focus){font-weight:700;@apply --paper-button-raised-keyboard-focus;}:host(:not([raised]).keyboard-focus){font-weight:700;@apply --paper-button-flat-keyboard-focus;}:host([disabled]){background:0 0;color:#a8a8a8;cursor:auto;pointer-events:none;@apply --paper-button-disabled;}:host([disabled][raised]){background:#eaeaea}:host([animated]){@apply --shadow-transition;}paper-ripple{color:var(--paper-button-ink-color)}</style><slot></slot>`;
Oo.setAttribute("strip-whitespace", ""), gr({
    _template: Oo,
    is: "paper-button",
    behaviors: [ko],
    properties: {raised: {type: Boolean, reflectToAttribute: !0, value: !1, observer: "_calculateElevation"}},
    _calculateElevation: function () {
        this.raised ? Eo._calculateElevation.apply(this) : this._setElevation(0)
    }
});

class Mo extends HTMLElement {
    connectedCallback() {
        let e = document.createElement("script");
        const t = this.getAttribute("key");
        e.type = "text/javascript", e.setAttribute("async", "true"), e.setAttribute("src", "//www.googletagmanager.com/gtag/js?id=" + t), document.documentElement.firstChild.appendChild(e), window.gtag = function () {
            dataLayer.push(arguments)
        }, window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", t, {
            campaign: {
                medium: "",
                source: "",
                name: "",
                content: ""
            }
        })
    }
}

customElements.define("ds-gtag-analytics", Mo);
const Lo = [{
        id: "1",
        name: "lofi-hip-hop-radio-relax-study",
        title: "Lofi relax/study",
        thumbnail: "",
        videoid: "5qap5aO4i9A"
    }, {id: "1", name: "new-york-jazz-lounge-bar", title: "Jazz Lounge", thumbnail: "", videoid: "VzxvxOlXBng"}, {
        id: "1",
        name: "reggae-hits",
        title: "Reggae Hits",
        thumbnail: "",
        videoid: "LUGQQS83a9A"
    }, {id: "1", name: "bossa-nova-opular-songs", title: "Bossa Nova", thumbnail: "", videoid: "CeuEj_gRpSc"}, {
        id: "2",
        name: "music-lab-lofi",
        title: "Lofi for Study",
        thumbnail: "",
        videoid: "KSDN8fpuwRQ"
    }, {id: "2", name: "music-lab-deep", title: "Deep Music Lab", thumbnail: "", videoid: "xLk9ZaguQVc"}, {
        id: "10",
        name: "cafe-del-mar-chill",
        title: "Café delMar Chill",
        thumbnail: "",
        videoid: "mNECPewguNU"
    }, {id: "10", name: "cafe-del-mar-deep", title: "Café delMar Deep", thumbnail: "", videoid: "GpLE-q2lYEU"}, {
        id: "10",
        name: "maretimo-lounge",
        title: "Maretimo Lounge",
        thumbnail: "",
        videoid: "2andxQSxOfw"
    }, {id: "10", name: "maretimo-jazz-lounge", title: "jazz Lounge", thumbnail: "", videoid: "qq2oWbldWbA"}, {
        id: "10",
        name: "maretimo-house",
        title: "Maretimo House",
        thumbnail: "",
        videoid: "8RPb03QfFBc"
    }, {id: "10", name: "spinnin", title: "Spinnin", thumbnail: "", videoid: "I83XWCSBgSc"}, {
        id: "9",
        name: "good-life-radio-24",
        title: "Good Life radio",
        thumbnail: "",
        videoid: "36YnV9STBqc"
    }, {id: "10", name: "deep-house-radio-24", title: "House", thumbnail: "", videoid: "T52rBA2wh74"}, {
        id: "10",
        name: "anjunadeep-house",
        title: "Anjuna Deep",
        thumbnail: "",
        videoid: "D4MdHQOILdw"
    }, {id: "10", name: "anjunabeats", title: "Anjuna Beats", thumbnail: "", videoid: "IvuwTft-0cM"}, {
        id: "10",
        name: "deep-gentleman",
        title: "Deep Gentleman",
        thumbnail: "",
        videoid: "Y7bBNUU50NQ"
    }, {
        id: "10",
        name: "monstercat-deep-house",
        title: "Deep Monstercat",
        thumbnail: "",
        videoid: "WsDyRAPFBC8"
    }, {id: "10", name: "grandsound-deep-house", title: "Deep GrandS", thumbnail: "", videoid: "5qky3L2Q6G4"}, {
        id: "10",
        name: "grandsound-progressive",
        title: "Progressive GrandS",
        thumbnail: "",
        videoid: "KvRVky0r7YM"
    }, {id: "10", name: "funk-soul-jazz", title: "Funk, Soul, Jazz", thumbnail: "", videoid: "VR4H81bz-Bs"}, {
        id: "10",
        name: "tech-house-ftr",
        title: "Tech House FTR",
        thumbnail: "",
        videoid: "eMBVhA2JiHw"
    }, {id: "10", name: "deep-house-ftr", title: "Deep House FTR", thumbnail: "", videoid: "MWxPC9bWIpI"}, {
        id: "10",
        name: "tropical-house-ftr",
        title: "Tropical  House FTR",
        thumbnail: "",
        videoid: "Edk0TfK94pA"
    }, {id: "10", name: "dark-monkey-minimal-techno", title: "Techno DM", thumbnail: "", videoid: "GP1XYuTMbqc"}, {
        id: "10",
        name: "dark-monkey-electro",
        title: "Electro  DM",
        thumbnail: "",
        videoid: "QuKQdE3iSLw"
    }, {id: "9", name: "ibiza-radio", title: "Ibiza radio", thumbnail: "", videoid: "pxltemZvAqc"}, {
        id: "3",
        name: "hits-radio-1",
        title: "Hits Radio 1",
        thumbnail: "",
        videoid: "gnyW6uaUgk4"
    }, {id: "4", name: "dance-radio-live", title: "Dance Radio", thumbnail: "", videoid: "YSBO7Zl8mU4"}, {
        id: "5",
        name: "pop-music-2020",
        title: "Pop Music 2020",
        thumbnail: "",
        videoid: "qAtRx1HWUus"
    }, {id: "8", name: "france-radio", title: "France Radio", thumbnail: "", videoid: "nFK0pxzADP8"}, {
        id: "10",
        name: "rap",
        title: "Rap",
        thumbnail: "",
        videoid: "05689ErDUdM"
    }, {id: "10", name: "rb-hip-hop", title: "r&b + hip-hop", thumbnail: "", videoid: "L9Q1HUdUMp0"}, {
        id: "10",
        name: "lil-pip",
        title: "lil pip",
        thumbnail: "",
        videoid: "FgSZ46yRPss"
    }, {id: "10", name: "rap-hip-hop", title: "Rap & Hip-Hop", thumbnail: "", videoid: "30br7pFoWsc"}, {
        id: "10",
        name: "sad-songs-to-cry",
        title: "sad songs to cry",
        thumbnail: "",
        videoid: "l8nDMRmxgNM"
    }, {id: "10", name: "roots-reggae", title: "Roots Reggae", thumbnail: "", videoid: "DteFDJlPpHg"}, {
        id: "10",
        name: "dub-reggae",
        title: "Dub Reggae",
        thumbnail: "",
        videoid: "znqMKJEfaQk"
    }, {id: "10", name: "state-of-trance", title: "State Of Trance", thumbnail: "", videoid: "5lMmnfVylEE"}, {
        id: "10",
        name: "above-beyond-trance",
        title: "Trance",
        thumbnail: "",
        videoid: "IvuwTft-0cM"
    }, {
        id: "10",
        name: "monstercat-progressive-house",
        title: "Progressive Mcat",
        thumbnail: "",
        videoid: "d8Oc90QevaI"
    }, {id: "10", name: "monstercat-chillout", title: "Chillout Mcat", thumbnail: "", videoid: "ql4S8z1jW8I"}, {
        id: "10",
        name: "bgm-coffe-jaz",
        title: "Coffee Jazz BGM",
        thumbnail: "",
        videoid: "fEvM-OUbaKs"
    }, {id: "10", name: "bgm-jazz-piano", title: "Jazz Piano BGM", thumbnail: "", videoid: "lF67ct9xflU"}, {
        id: "10",
        name: "bgm-hawaiian-cafe",
        title: "Hawaiian Cafe BGM",
        thumbnail: "",
        videoid: "HdiKqg23D0o"
    }, {id: "10", name: "chill", title: "C H I L L", thumbnail: "", videoid: "21qNxnCS8WU"}, {
        id: "10",
        name: "lofi-hip-hop-radio",
        title: "Lofi hip hop",
        thumbnail: "",
        videoid: "l7TxwBhtTUY"
    }, {id: "10", name: "chillhop-lofi", title: "lofi ChillHop", thumbnail: "", videoid: "7NOSDKb0HlU"}, {
        id: "10",
        name: "chillhop-jazzy",
        title: "jazzy ChillHop",
        thumbnail: "",
        videoid: "5yx6BWlEVcY"
    }, {
        id: "2",
        name: "lofi-hip-hop-radio-sleep-chill",
        title: "Lofi sleep/chill",
        thumbnail: "",
        videoid: "DWcJFNfaw9c"
    }, {
        id: "10",
        name: "steezyasfuck-coffee-shop",
        title: "Steezyasfuck coffee",
        thumbnail: "",
        videoid: "-5KAN9_CzSA"
    }, {id: "10", name: "steezyasfuck-loffi", title: "Steezyasfuck loffi", thumbnail: "", videoid: "rc9cjjEun_k"}], Ro = [{
        id: "4",
        name: "nash",
        title: "НАШ",
        thumbnail: "images/thumb/tv-nash.jpg",
        videoid: "ErX-LbZW-zE"
    }, {
        id: "4",
        name: "pershiy-nezalegniy",
        title: "ПН",
        thumbnail: "images/thumb/tv-nash.jpg",
        videoid: "ZndfB0J8p3E"
    }, {
        id: "4",
        name: "4-kanal",
        title: "4 Канал",
        thumbnail: "images/thumb/tv-nash.jpg",
        videoid: "6qgN5spcejM"
    }, {
        id: "5",
        name: "pryamoy",
        title: "Прямий",
        thumbnail: "images/thumb/tv-pryamoy.jpg",
        videoid: "0XeI4rg_27Q"
    }, {
        id: "6",
        name: "espreso-tv",
        title: "Еспресо TV",
        thumbnail: "images/thumb/tv-ukraine24.jpg",
        videoid: "6arO8p6gmBI"
    }, {
        id: "",
        name: "euronewsru",
        title: "Euronews Ru",
        thumbnail: "images/thumb/tv-euronews-ru.jpg",
        videoid: "WiB69tJIAU4"
    }, {
        id: "",
        name: "moskow24",
        title: "Москва 24",
        thumbnail: "images/thumb/tv-moskow.jpg",
        videoid: "NH7wu_O0hMc"
    }, {
        id: "",
        name: "rtnews",
        title: "RT News",
        thumbnail: "images/thumb/tv-rt-news.jpg",
        videoid: "QpO7gvxpMqk"
    }, {
        id: "",
        name: "euronewsen",
        title: "Euronews Eng",
        thumbnail: "images/thumb/tv-euronews-ru.jpg",
        videoid: "sPgqEHsONK8"
    }, {
        id: "",
        name: "skynews",
        title: "SKY News",
        thumbnail: "images/thumb/tv-skynews.jpg",
        videoid: "9Auq9mYxFEE"
    }, {id: "", name: "rtuk", title: "RT Uk", thumbnail: "images/thumb/tv-rt-news.jpg", videoid: "NcoFT4eew0Q"}, {
        id: "",
        name: "rtamerica",
        title: "RT America",
        thumbnail: "images/thumb/tv-rtamerica.jpg",
        videoid: "GyZFZKdmpSU"
    }, {id: "", name: "dwnews", title: "DW News", thumbnail: "images/thumb/tv-dwnews.jpg", videoid: "qMtcWqCL_UQ"}, {
        id: "",
        name: "nasatv",
        title: "NASA TV",
        thumbnail: "images/thumb/tv-nasa.jpg",
        videoid: "21X5lGlDOfg"
    }, {
        id: "",
        name: "france24",
        title: "FRANCE 24",
        thumbnail: "images/thumb/tv-france24.jpg",
        videoid: "SebJIjQgdjg"
    }, {
        id: "",
        name: "euronewsfr",
        title: "Euronews Fr",
        thumbnail: "images/thumb/tv-euronews-ru.jpg",
        videoid: "MsN0_WNXvh8"
    }, {
        id: "",
        name: "rtfrance",
        title: "RT  France",
        thumbnail: "images/thumb/tv-rtfrance.jpg",
        videoid: "SjV-bNomRkY"
    }, {
        id: "",
        name: "franceinfo",
        title: "franceinfo",
        thumbnail: "images/thumb/tv-franceinfo.jpg",
        videoid: "cKw79MI2ZLc"
    }],
    Do = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    Bo = ["Cічень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    zo = ["Студзень", "Люты", "Сакавік", "Красавік", "Май", "Чэрвень", "Ліпень", "Жнівень", "Верасень", "Кастрычнік", "Лістапад", "Снежань"],
    Ho = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    Fo = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    Uo = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    qo = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    jo = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    Yo = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    $o = ["Януа́ри", "Февруа́ри", "Март", "Апри́л", "Май", "Ю́ни", "Ю́ли", "А́вгуст", "Септе́мври", "Окто́мври", "Ное́мври", "Деке́мври"];
let Vo = {
    "ru-RU": Do,
    "uk-UA": Bo,
    "be-BY": zo,
    "pl-PL": Ho,
    "en-GB": Fo,
    "fr-FR": Uo,
    "de-DE": qo,
    "es-ES": jo,
    "it-IT": Yo,
    "bg-BG": $o
};
const Ko = Vo, Qo = [{name: "ru-RU", title: "Русский"}, {name: "uk-UA", title: "Українська"}, {
        name: "be-BY",
        title: "Беларускі"
    }, {name: "pl-PL", title: "Polski"}, {name: "en-GB", title: "English"}, {
        name: "fr-FR",
        title: "Français"
    }, {name: "de-DE", title: "Deutsch"}, {name: "es-ES", title: "Español"}, {
        name: "it-IT",
        title: "Italiano"
    }, {name: "bg-BG", title: "Български"}], Go = [{id: "87", name: "news", title: "Новости политики"}, {
        id: "88",
        name: "economics-business",
        title: "Економика & Бизнес"
    }, {id: "112", name: "science-technology", title: "Наука & Технологии"}, {
        id: "89",
        name: "society",
        title: "Общество"
    }, {id: "90", name: "art", title: "Искусство"}, {id: "93", name: "sport", title: "Спорт"}],
    Wo = [{id: "102", name: "news", title: "Новини політики"}, {
        id: "103",
        name: "economics-business",
        title: "Економіка & Бізнес"
    }, {id: "113", name: "science-technology", title: "Наука & Технології"}, {
        id: "104",
        name: "society",
        title: "Суспільство"
    }, {id: "106", name: "art", title: "Мистецтво"}, {id: "108", name: "sport", title: "Спорт"}],
    Jo = [{id: "160", name: "news", title: "Навіны палітыкі"}, {
        id: "161",
        name: "economics-business",
        title: "Эканоміка & Бізнес"
    }, {id: "162", name: "science-technology", title: "Навука & Тэхналогіі"}, {
        id: "163",
        name: "society",
        title: "Грамадства"
    }, {id: "164", name: "art", title: "Мастацтва"}, {id: "165", name: "sport", title: "Спорт"}],
    Xo = [{id: "170", name: "news", title: "Wiadomości polityczne"}, {
        id: "171",
        name: "economics-business",
        title: "Ekonomia & Biznes"
    }, {id: "172", name: "science-technology", title: "Nauka & Technologia"}, {
        id: "173",
        name: "society",
        title: "Społeczeństwo"
    }, {id: "174", name: "art", title: "Kultura"}, {id: "175", name: "sport", title: "Sport"}],
    Zo = [{id: "94", name: "news", title: "Politics"}, {
        id: "95",
        name: "economics-business",
        title: "Economics & Business"
    }, {id: "114", name: "science-technology", title: "Science & Technology"}, {
        id: "96",
        name: "society",
        title: "Society"
    }, {id: "98", name: "art", title: "Art"}, {id: "99", name: "sport", title: "Sport"}],
    el = [{id: "118", name: "news", title: "Politique"}, {
        id: "119",
        name: "economics-business",
        title: "Économie & Affaires"
    }, {id: "120", name: "science-technology", title: "Sciences & Tech"}, {
        id: "121",
        name: "society",
        title: "Société"
    }, {id: "122", name: "art", title: "Culture"}, {id: "123", name: "sport", title: "Sport"}],
    tl = [{id: "130", name: "news", title: "Politik"}, {
        id: "131",
        name: "economics-business",
        title: "Wirtshaft"
    }, {id: "132", name: "science-technology", title: "Wissenschaft & Tech"}, {
        id: "133",
        name: "society",
        title: "Leben"
    }, {id: "134", name: "art", title: "Kultur"}, {id: "135", name: "sport", title: "Sport"}],
    il = [{id: "140", name: "news", title: "Político"}, {
        id: "141",
        name: "economics-business",
        title: "Economía & Negocios"
    }, {id: "142", name: "science-technology", title: "Ciencia & Tec"}, {
        id: "143",
        name: "society",
        title: "Sociedad"
    }, {id: "144", name: "art", title: "Cultura & Arte"}, {id: "145", name: "sport", title: "Sport"}],
    nl = [{id: "150", name: "news", title: "Político"}, {
        id: "151",
        name: "economics-business",
        title: "Economia & Business"
    }, {id: "152", name: "science-technology", title: "Scienza & Tecnologia"}, {
        id: "153",
        name: "society",
        title: "Società"
    }, {id: "154", name: "art", title: "Cultura & Arte"}, {id: "155", name: "sport", title: "Sport"}],
    sl = [{id: "180", name: "news", title: "Новини Политиката"}, {
        id: "181",
        name: "economics-business",
        title: "Икономика & Бизнес"
    }, {id: "182", name: "science-technology", title: "Наука & Технологии"}, {
        id: "183",
        name: "society",
        title: "Общество"
    }, {id: "184", name: "art", title: "Изкуство"}, {id: "185", name: "sport", title: "Спорт"}];
let al = {
    "ru-RU": Go,
    "uk-UA": Wo,
    "be-BY": Jo,
    "pl-PL": Xo,
    "en-GB": Zo,
    "fr-FR": el,
    "de-DE": tl,
    "es-ES": il,
    "it-IT": nl,
    "bg-BG": sl
};
const rl = al;
var Al = {monthNames: Ko, Languages: Qo, categoryList: rl, tvList: Ro, radioList: Lo};
let ol = document.createElement("textarea");

class ll extends eA {
    static get is() {
        return "news-data"
    }

    static get properties() {
        return {
            lang: String,
            routeData: Object,
            categories: {type: Array, readOnly: !0, notify: !0, computed: "_computeCategoryList(lang)"},
            categoryName: String,
            articleId: String,
            offline: Boolean,
            loading: {type: Boolean, readOnly: !0, notify: !0},
            category: {type: Object, computed: "_computeCategory(categoryName,lang)", notify: !0},
            categoryIndex: {type: Number, observer: "_categoryIndexChanged", notify: !0},
            article: {type: Object, computed: "_computeArticle(category.items, articleId)", notify: !0},
            failure: {type: Boolean, readOnly: !0, notify: !0}
        }
    }

    static get observers() {
        return ["_fetchCategory(category, offline)", "_fetchArticle(article, offline)"]
    }

    _computeCategoryList(e) {
        return rl[e] ? rl[e] : null
    }

    _computeArticle(e, t) {
        if (!e || !t) return null;
        let i;
        for (let n = 0; n < e.length; ++n) if (i = e[n], i.id === t) return i;
        return "article" == this.routeData.page && this._fetch("/api/postmysqls?filter[where][url]=" + t, (e => (this.set("category.items", this._parseCategoryItems(e)), this.set("article.html", this._parseArticleItem(e)), void 0 === i ? null : i)), 3), null
    }

    _fetchArticle(e, t) {
        t && e && e.html || !e || this.loading ? this._setFailure(!1) : e.content ? this.set("article.html", this._formatHTML(e.content)) : this._fetch("/api/postmysqls?filter[where][id]=" + e.idn, (e => {
            this.set("article.html", this._parseArticleItem(e))
        }), 1)
    }

    _parseArticleItem(e) {
        let t = [];
        return t = e[0], this._formatHTML(t.content + t.contentfull)
    }

    _computeCategory(e, t) {
        for (let t, i = 0; t = this.categories[i]; ++i) if (t.name === e) return t;
        return null
    }

    _computeCategoryByID(e) {
        for (let t, i = 0; t = this.categories[i]; ++i) if (t.id == e) return t;
        return null
    }

    _categoryIndexChanged(e, t, i, n) {
        this.categoryIndex && (this.offline && this.category && this.category.items || !this.category || this.loading ? this._setFailure(!1) : this._fetch("/api/postmysqls?filter[where][categoryId]=" + this.category.id + "&filter[skip]=" + this.category.items.length + "&filter[limit]=" + this.categoryIndex + "&filter[order]=publish_up%20DESC", (e => {
            const t = this._parseCategoryItems(e);
            for (let e, i = 0; e = t[i]; ++i) this.category.items.push(e);
            this.set("categoryIndex", null)
        }), i || 2))
    }

    _fetchCategory(e, t, i) {
        t && e && e.items || !e || this.loading ? this._setFailure(!1) : this._fetch("/api/postmysqls?filter[where][categoryId]=" + e.id + "&filter[skip]=0&filter[limit]=15&filter[order]=publish_up%20DESC", (e => {
            this.set("category.items", this._parseCategoryItems(e))
        }), i || 2)
    }

    _parseCategoryItems(e) {
        let t = [];
        for (let i, n, s = 0; i = e[s]; ++s) n = this._parsedContentHTML(i.content + i.contentfull), i.contentLength = n.textContent.length, i.author = "", t.push({
            idn: i.id,
            id: i.url,
            headline: this._unescapeText(i.title),
            url: i.url,
            href: this._getItemHref(i, this.lang),
            lang: this.lang,
            imageUrl: n.imgSrc,
            placeholder: i.placeholder,
            category: this._computeCategoryByID(i.categoryId).title,
            author: i.author,
            summary: this._trimRight(n.textContent, 100),
            contentintro: i.content,
            contentfull: i.contentfull,
            content: i.content + i.contentfull,
            readTime: Math.max(1, Math.round(i.contentLength / 1500)) + " min read"
        });
        return t
    }

    _unescapeText(e) {
        return ol.innerHTML = e, ol.textContent
    }

    _getItemHref(e, t) {
        return e.id ? "/" + t + "/article/" + this.categoryName + "/" + e.url : null
    }

    _getItemImage(e) {
        return e.imgSrc ? "data/" + e.imgSrc : ""
    }

    _timeAgo(e) {
        if (!e) return "";
        let t = (Date.now() - e) / 1e3 / 60;
        if (2 > t) return "1 min ago";
        if (60 > t) return Math.floor(t) + " mins ago";
        if (120 > t) return "1 hour ago";
        let i = t / 60;
        return 24 > i ? Math.floor(i) + " hours ago" : 48 > i ? "1 day ago" : Math.floor(i / 24) + " days ago"
    }

    _trimRight(e, t) {
        let i = e.indexOf(" ", t);
        return -1 === i ? e : e.substr(0, i) + "..."
    }

    _formatHTML(e) {
        let t = document.createElement("template");
        t.innerHTML = e;
        let i = t.content.querySelector("img");
        i && i.remove();
        let n = t.content.querySelectorAll("img");
        for (let e, t = 0; t < n.length; ++t) e = n[t], e.removeAttribute("width"), e.removeAttribute("height");
        return t.innerHTML
    }

    _parsedContentHTML(e) {
        let t = document.createElement("template");
        t.innerHTML = e;
        let i = t.content.querySelector("img"), n = t.content.querySelector("iframe");
        t.content.querySelectorAll("img");
        return {
            imgSrc: i ? i.src : "/images/news-icon-128.png",
            video: n,
            textContent: t.content.textContent,
            htmlContent: t.innerHTML
        }
    }

    _fetch(e, t, i, n) {
        let s = new XMLHttpRequest;
        s.addEventListener("load", (e => {
            this._setLoading(!1), t(n ? e.target.responseText : JSON.parse(e.target.responseText))
        })), s.addEventListener("error", (n => {
            1 < i ? this._fetchDebouncer = es.debounce(this._fetchDebouncer, pi.after(200), this._fetch.bind(this, e, t, i - 1)) : (this._setLoading(!1), this._setFailure(!0))
        })), this._setLoading(!0), this._setFailure(!1), s.open("GET", e), s.send()
    }

    refresh() {
        this.categoryName && this._fetchCategory(this.category, this.offline, 3)
    }
}

customElements.define(ll.is, ll);
const cl = document.createElement("template");
cl.innerHTML = "<dom-module id=\"shop-select\"><template><style>shop-select{display:inline-block;position:relative;-webkit-transform:translateZ(0);transform:translateZ(0)}shop-select>shop-md-decorator{display:block;border-top:1px solid var(--language-primary-color);height:1px;speak:none}shop-select>shop-md-decorator::after{content:'\\25BC';display:block;position:absolute;bottom:calc(50% - .75em);right:0;speak:none;-webkit-transform:scaleY(.6);transform:scaleY(.6);color:var(--language-secondary-color);pointer-events:none}shop-select>select{width:100%;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:8px 22px 8px 4px;border:none;background-color:transparent;border-radius:0;font-size:1em;font-weight:300;color:var(--language-primary-color);overflow:hidden;margin:0;outline:0}shop-select>select::-ms-expand{display:none}shop-select>shop-md-decorator>shop-underline{display:block;background-color:var(--language-accent-color);height:2px;position:relative;top:-1px;width:100%;margin:auto;-webkit-transform:scale3d(0,1,1);transform:scale3d(0,1,1);transition:-webkit-transform .2s ease-in;transition:transform .2s ease-in}shop-select>select:focus+shop-md-decorator>shop-underline{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1);transition:-webkit-transform .2s ease-out;transition:transform .2s ease-out}shop-select>select:focus,shop-select>select:focus+shop-md-decorator::after,shop-select>select:focus+shop-md-decorator::before{color:var(--language-primary-color)}shop-select>select:focus:-moz-focusring{color:transparent;text-shadow:0 0 0 #000}shop-select>[prefix]{position:absolute;left:0;top:calc(50% - 8px);line-height:16px;color:var(--language-secondary-color);pointer-events:none}</style></template></dom-module>", document.head.appendChild(cl.content);

class dl extends eA {
    static get template() {
        return Jr`<style include="shop-select">shop-select>select{font-size:.75em}shop-select>shop-md-decorator::after{-webkit-transform:scaleY(.4) scaleX(.6);transform:scaleY(.4) scaleX(.6);bottom:calc(50% - .65em)}paper-icon-button{--paper-icon-button-ink-color:var(--app-nav-text-color);width:40px}:host([pwa-installed=installed]) .install-button{display:none}paper-button.install-button{width:80px;--paper-button-ink-color:var(--paper-pink-a200);color:var(--app-button-install-color);border:var(--app-button-install-border-style);border-radius:var(--app-button-install-border-radius);font-size:11px;font-weight:400;white-space:nowrap}.no-display{display:none}.sticky-nav,header{z-index:10}.logo{text-align:center}.article-headline,.date-line{text-align:center;font-size:11px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;margin:0 16px}.logo a{font-weight:600;letter-spacing:5px;text-decoration:none;display:inline-block;pointer-events:auto;color:inherit}.menu-list{display:block;text-align:center;font-size:13px;border-top:var(--app-border-style);border-bottom:var(--app-border-style);padding:8px 0;margin:32px 0}.menu-list a{color:inherit;text-decoration:none;margin:0 10px;letter-spacing:.08em}.menu-list a.iron-selected{letter-spacing:0;font-weight:700}.sticky-nav{position:fixed;top:-1px;left:0;right:0;color:var(--app-nav-text-color);visibility:hidden;pointer-events:none;transition:transform .3s ease-in-out,visibility .3s ease-in-out;transform:translate3d(0,-100%,0)}.sticky-nav[threshold-triggered]{visibility:visible;pointer-events:auto;transform:translate3d(0,0,0)}.sticky-nav .sticky-nav-toolbar{background:var(--app-nav-background-color)}:host([page=list]) .sticky-nav .sticky-nav-center{margin-right:40px}:host([page=list]) .sticky-nav paper-icon-button[icon=mail],:host([page=list]) .sticky-nav paper-icon-button[icon=share]{display:none}.sticky-nav-menu{display:none}.sticky-nav-menu a{display:block;line-height:32px;font-size:15px;text-decoration:none;color:var(--app-nav-deselected-text-color)}.sticky-nav-menu a.iron-selected{text-decoration:underline}@media (max-width:767px){header{position:absolute;top:0;left:0;right:0;color:var(--app-cover-text-color)}header .install-button{display:none}:host([page=radio]) header .date-line,:host([page=radio]) header .logo,:host([page=tv]) header .date-line,:host([page=tv]) header .logo{display:none}header .logo{margin-right:40px}header .date-line{padding:6px 0;border-top:var(--app-transparent-border-style);border-bottom:var(--app-transparent-border-style)}:host([page=article]) header .date-line,:host([page=article]) header .logo{visibility:hidden}:host([page=list]) header .date-line{height:3vh;line-height:3vh}.sticky-nav .logo,:host([page=article]) .sticky-nav .date-line,:host([page=list]) .sticky-nav .article-headline,:host([page=radio]) .sticky-nav,:host([page=tv]) .sticky-nav{display:none}:host([page=article]) .sticky-nav-center{width:calc(100% - 120px)}:host([page=article][pwa-installed=installed]) .sticky-nav-center{width:calc(100% -40px);margin-right:0}:host([page=list]) .sticky-nav-center{width:calc(100% - 160px)}:host([page=list][pwa-installed=installed]) .sticky-nav-center{width:calc(100% - 40px - 40px);margin-right:0}}@media (min-width:768px){header .install-button{position:absolute;left:0;--paper-button-ink-color:var(--paper-pink-a200);color:var(--app-headbutton-install-color);border:var(--app-headbutton-install-border-style)}.logo{font-size:29px}.logo-toolbar{margin-top:10px;height:45px}.language-select{position:absolute;display:inline-block;right:0}.mobile-toggle-drawer-btn{display:none}.sticky-nav-toolbar{height:auto}.sticky-nav{height:auto}:host([page=article]) .sticky-nav .sticky-nav-center{margin-left:40px}.sticky-nav .logo a{color:inherit}.sticky-nav .logo{font-size:20px;padding-top:10px}.sticky-nav .date-line{padding:4px 0 8px}.sticky-nav .article-headline{display:none}.sticky-nav-center{flex:1}.sticky-nav-menu{@apply --layout-vertical;@apply --layout-center;position:absolute;left:0;right:0;bottom:0;background:var(--app-nav-background-color);transition:transform .2s ease-in-out;will-change:transform;z-index:-1;padding-top:20px;padding-bottom:40px}.grid-container{-moz-column-count:4;-moz-column-gap:82px;column-count:4;column-gap:82px}.sticky-nav[threshold-triggered] .sticky-nav-menu[shown]{transform:translate3d(0,100%,0)}a.tv{color:#c4302b}a.radio{color:#009400}}</style><pwa-install id="pwaInst" available="{{installAvailable}}" platforms="{{platforms}}" choice-result="{{choiceResult}}" supported="{{relatedAppsSupported}}" related-apps="{{relatedApps}}" on-pwa-install-available="handlePWAInstallAvailable" on-pwa-install-install="handlePWAInstall" on-pwa-install-installed="handlePWAInstalled"></pwa-install><header><app-toolbar class="logo-toolbar"><paper-icon-button class="mobile-toggle-drawer-btn" icon="menu" on-click="_toggleDrawer" aria-label="Main navigation"></paper-icon-button><div class="logo" main-title=""><a href="/" on-click="_gotoHome" aria-label\$="[[_computeAppHomeLabel(appTitle)]]">[[appTitle]]</a></div><paper-button class="install-button" on-click="_buttonInstall">OPEN IN APP</paper-button><div class="language-select" hidden="[[smallScreen]]"><shop-select><select id="Language" name="Language" required aria-label="Language"><template is="dom-repeat" items="[[languages]]" initial-count="3"><option value="[[item.name]]" selected$="[[ _languageIsSelected(item) ]]">[[item.title]]</option></template></select><shop-md-decorator aria-hidden="true"><shop-underline></shop-underline></shop-md-decorator></shop-select></div></app-toolbar><div class="date-line" role="heading" aria-level="1">[[category.title]] <span aria-hidden="true"> · </span>[[currentTime]]</div><dom-if if="[[!smallScreen]]"><template><div class="menu-list"><iron-selector role="navigation" selected="[[category.name]]" attr-for-selected="name"><dom-repeat items="[[categories]]" as="category" initial-count="9"><template><a name="[[category.name]]" href="/[[lang]]/list/[[category.name]]">[[category.title]]</a></template></dom-repeat></iron-selector><iron-selector role="navigation" selected="[[page]]" attr-for-selected="name"><a class="tv" name="tv" href="/[[lang]]/tv/[[channelTvMenuName]]">TV</a></iron-selector><iron-selector role="navigation" selected="[[page]]" attr-for-selected="name"><a class="radio" name="radio" href="/[[lang]]/radio/[[channelRadioMenuName]]">RADIO</a></iron-selector></div></template></dom-if></header><app-box role="banner" class="sticky-nav" threshold="[[_getScrollThreshold(smallScreen)]]"><app-toolbar class="sticky-nav-toolbar"><paper-icon-button arial-label="Main navigation" icon="[[_menuIcon(drawerOpened)]]" on-click="_toggleDrawer"></paper-icon-button><div class="sticky-nav-center"><div class="logo"><a href="/" on-click="_gotoHome" aria-label\$="[[_computeAppHomeLabel(appTitle)]]">[[appTitle]]</a></div><div class="date-line" role="heading">[[category.title]] <span aria-hidden="true">  ·  </span>[[currentTime]]</div><div class="article-headline"><slot></slot></div></div><paper-button class="install-button" on-click="_buttonInstall">OPEN IN APP</paper-button></app-toolbar><div class="sticky-nav-menu" shown\$="[[drawerOpened]]"><div class="grid-container"><iron-selector role="navigation" selected="[[category.name]]" attr-for-selected="name"><dom-repeat items="[[categories]]" as="category" initial-count="9"><template><a name="[[category.name]]" href="/[[lang]]/list/[[category.name]]">[[category.title]]</a></template></dom-repeat></iron-selector><iron-selector role="navigation" selected="[[page]]" attr-for-selected="name"><a class="tv" name="tv" href="/[[lang]]/tv/[[channelTvMenuName]]"><paper-icon-button icon="tv" aria-label="TV"></paper-icon-button>TV</a> <a class="radio" name="radio" href="/[[lang]]/radio/[[channelRadioMenuName]]"><paper-icon-button icon="radio" aria-label="RADIO"></paper-icon-button>RADIO</a></iron-selector></div></div></app-box>`
    }

    static get is() {
        return "news-header"
    }

    static get properties() {
        return {
            appTitle: String,
            lang: String,
            langLocalStorage: {type: String, notify: !0},
            languages: {type: Array, value: Qo, readOnly: !0},
            page: {type: String, reflectToAttribute: !0},
            channelTvMenuName: String,
            channelRadioMenuName: String,
            categories: Array,
            category: Object,
            smallScreen: Boolean,
            drawerOpened: {type: Boolean, notify: !0},
            pwaInstalled: {type: String, reflectToAttribute: !0, value: "installed"},
            currentTime: {type: String, computed: "_currentTime(lang)"}
        }
    }

    connectedCallback() {
        super.connectedCallback(), this._boundChangeLanguage = this._changeLanguage.bind(this), this.$.Language.addEventListener("change", this._boundChangeLanguage)
    }

    disconnectedCallback() {
        super.disconnectedCallback(), window.removeEventListener("change", this._boundChangeLanguage)
    }

    _changeLanguage(e) {
        this.set("langLocalStorage", e.target.value)
    }

    _languageIsSelected(e) {
        return this.lang == e.name
    }

    _menuIcon(e) {
        return e ? "close" : "menu"
    }

    _currentTime(e) {
        if (!e) return;
        let t = new Date;
        return Ko[e][t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear()
    }

    _toggleDrawer() {
        this.drawerOpened = !this.drawerOpened
    }

    _getScrollThreshold(e) {
        return e ? window.innerHeight - 64 : 162
    }

    _computeAppHomeLabel(e) {
        return e + " Home"
    }

    _buttonInstall() {
        this.$.pwaInst.install()
    }

    handlePWAInstall() {
        gtag("event", "install_clicked")
    }

    handlePWAInstalled() {
        this.pwaInstalled = "installed", gtag("event", "installed")
    }

    handlePWAInstallAvailable() {
        this.pwaInstalled = ""
    }

    _gotoHome() {
        window.location = "/"
    }
}

customElements.define(dl.is, dl);

class hl extends eA {
    static get template() {
        return Jr`<news-header app-title="[[appTitle]]" lang="[[lang]]" lang-local-storage="{{langLocalStorage}}" page="[[page]]" channel-tv-menu-name="[[channelTvMenuName]]" channel-radio-menu-name="[[channelRadioMenuName]]" categories="[[categories]]" category="[[category]]" small-screen="[[smallScreen]]" drawer-opened="{{drawerOpened}}" pwa-installed="[[pwaInstalled]]"><slot></slot></news-header><dom-if if="[[_shouldRenderDrawer(smallScreen, loadComplete)]]"><template><news-drawer lang="[[lang]]" lang-local-storage="{{langLocalStorage}}" page="[[page]]" channel-tv-menu-name="[[channelTvMenuName]]" channel-radio-menu-name="[[channelRadioMenuName]]" categories="[[categories]]" category="[[category]]" drawer-opened="{{drawerOpened}}"></news-drawer></template></dom-if>`
    }

    static get is() {
        return "news-nav"
    }

    static get properties() {
        return {
            appTitle: String,
            lang: String,
            langLocalStorage: {type: String, notify: !0},
            page: String,
            channelTvMenuName: String,
            channelRadioMenuName: String,
            categories: Array,
            category: Object,
            loadComplete: Boolean,
            smallScreen: Boolean,
            drawerOpened: Boolean
        }
    }

    closeDrawer() {
        this.drawerOpened = !1
    }

    _shouldRenderDrawer(e, t) {
        return e && t
    }
}

customElements.define(hl.is, hl);

class ul extends eA {
    constructor() {
        super(), mt(!0)
    }

    static get template() {
        return Jr`<style>:host{display:block;position:relative;min-height:100vh;--app-transparent-border-style:1px solid rgba(255, 255, 255, 0.5);--app-transparent-2-border-style:1px solid rgba(255, 255, 255, 0.2);--app-button-border-style:2px solid #222;--app-button-install-border-style:1px solid #ffe19a;--app-button-install-color:#ffe19a;--app-button-install-border-radius:6px;--app-cover-text-color:#FFF;--app-nav-background-color:#220022;--app-nav-text-color:#FFF;--app-nav-deselected-text-color:#CCC;--app-nav-selected-background-color:rgba(74,74,74,0.6);--app-sub-section-headline:{border-top:var(--app-border-style);border-bottom:var(--app-border-style);font-size:13px;padding:8px;text-align:center};--viewport-height:600px}iron-pages{max-width:1440px;margin:0 auto}footer{position:absolute;bottom:0;right:0;left:0;padding-bottom:24px;text-align:center}footer.tv{display:none}footer a{text-decoration:none;font-size:13px;color:#757575}footer a:hover{text-decoration:underline}@media (min-width:768px){:host{margin:0 40px}}@media (max-width:767px){.mob_hidden{display:none}}</style><ds-gtag-analytics key="G-EMT5X8VJ0F"></ds-gtag-analytics><iron-media-query query="max-width: 767px" query-matches="{{smallScreen}}"></iron-media-query><iron-media-query query="min-width: 1310px" query-matches="{{desktopScreen}}"></iron-media-query><app-location route="{{route}}"></app-location><app-route route="{{route}}" pattern="/:lang/:page" data="{{routeData}}" tail="{{subroute}}"></app-route><iron-localstorage name="news-app-lang" value="{{langLocalStorage}}" on-iron-localstorage-load="_useExistingLangLocalStorageValue" on-iron-localstorage-load-empty="_determineLangLocalStorage"></iron-localstorage><news-data id="data" lang="[[lang]]" route-data="[[routeData]]" categories="{{categories}}" category-name="[[categoryName]]" category="{{category}}" category-index="{{categoryIndex}}" article-id="[[articleId]]" article="{{article}}" loading="{{loading}}" offline="[[offline]]" failure="{{failure}}"></news-data><news-nav id="nav" app-title="[[appTitle]]" lang="[[lang]]" lang-local-storage="{{langLocalStorage}}" page="[[page]]" channel-tv-menu-name="[[channelTvMenuName]]" channel-radio-menu-name="[[channelRadioMenuName]]" categories="[[categories]]" category="[[category]]" load-complete="[[loadComplete]]" small-screen="[[smallScreen]]">[[articleHeadline]]</news-nav><iron-pages role="main" selected="[[page]]" attr-for-selected="name" fallback-selection="path-warning"><news-list id="list" name="list" page="[[page]]" route="[[subroute]]" category-name="{{categoryName}}" category="[[category]]" category-index="{{categoryIndex}}" loading="[[loading]]" offline="[[offline]]" failure="[[failure]]" viewport="[[viewport]]" small-screen="[[smallScreen]]"></news-list><news-article name="article" route="{{subroute}}" category-name="{{categoryName}}" category="[[category]]" article-id="{{articleId}}" article="[[article]]" loading="[[loading]]" offline="[[offline]]" failure="[[failure]]" small-screen="[[smallScreen]]"></news-article><news-tv id="tv" name="tv" lang="[[lang]]" route="[[subroute]]" video-id="{{videoId}}" state="{{state}}" channel-title="{{channelTvTitle}}" channel-name="{{channelTvName}}" channel-menu-name="{{channelTvMenuName}}" loading="[[loading]]" offline="[[offline]]" failure="[[failure]]" viewport="[[viewport]]" small-screen="[[smallScreen]]" desktop-screen="[[desktopScreen]]"></news-tv><news-radio id="radio" name="radio" lang="[[lang]]" route="[[subroute]]" video-id="{{radioId}}" state="{{state}}" channel-title="{{channelRadioTitle}}" channel-name="{{channelRadioName}}" channel-menu-name="{{channelRadioMenuName}}" loading="[[loading]]" offline="[[offline]]" failure="[[failure]]" viewport="[[viewport]]" small-screen="[[smallScreen]]" desktop-screen="[[desktopScreen]]"></news-radio><news-path-warning name="path-warning"></news-path-warning></iron-pages>`
    }

    static get is() {
        return "news-app"
    }

    static get properties() {
        return {
            appTheme: {type: String, computed: "_computeTheme(page)", observer: "_ThemeChanged"},
            appTitle: String,
            lang: {type: String, computed: "_computeLang(langLocalStorage)", observer: "_langChanged"},
            langLocalStorage: String,
            page: {type: String, observer: "_pageChanged"},
            routeData: Object,
            subroute: Object,
            state: Number,
            videoId: String,
            radioId: String,
            tvs: Array,
            radios: Array,
            channelTvMenuName: {type: String, value: "pershiy-nezalegniy"},
            channelRadioMenuName: {type: String, value: "lofi-hip-hop-radio-relax-study"},
            channelTvName: String,
            channelRadioName: String,
            channelTvTitle: String,
            channelRadioTitle: String,
            categories: Array,
            categoryName: String,
            category: Object,
            categoryIndex: Number,
            articleId: String,
            article: Object,
            articleHeadline: {type: String, value: ""},
            offline: {type: Boolean, value: !1, readOnly: !0},
            failure: Boolean,
            loadComplete: Boolean,
            smallScreen: Boolean,
            desktopScreen: Boolean,
            viewport: {type: Array}
        }
    }

    static get observers() {
        return ["_routePageChanged(routeData.lang, routeData.page,  isAttached)", "_updateArticleHeadline(article.headline)", "_updateDocumentTitle(page, category.title, articleHeadline, appTitle, channelTvTitle, channelRadioTitle)"]
    }

    ready() {
        super.ready(), this.removeAttribute("unresolved");
        let e = navigator.userAgent, t = navigator.userAgent.match(/Android.*Chrome[\/\s](\d+\.\d+)/);
        (e.match("CriOS") || t && t[0] && 56 > t[1]) && document.body.classList.add("fixed-viewport-height"), ka(this, (() => {
            window.addEventListener("online", (e => this._notifyNetworkStatus(e))), window.addEventListener("offline", (e => this._notifyNetworkStatus(e))), this.addEventListener("refresh-data", (e => this._refreshData(e)))
        }))
    }

    connectedCallback() {
        super.connectedCallback(), this.isAttached = !0;
        const e = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            t = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        this.viewport = {vw: e, vh: t}
    }

    _computeTheme(e) {
        return ["tv", "radio"].includes(e) ? "theme-dark" : "theme-light"
    }

    _ThemeChanged(e, t) {
        switch (e) {
            case"theme-dark":
                document.body.classList.add("theme-dark"), document.body.classList.remove("theme-light");
                break;
            default:
                document.body.classList.add("theme-light"), document.body.classList.remove("theme-dark")
        }
    }

    _useExistingLangLocalStorageValue() {
    }

    _determineLangLocalStorage() {
        this.set("langLocalStorage", this.lang || this.routeData.lang || Qo[0].name)
    }

    _isInLanguages(e) {
        return Qo.some((t => t.name == e))
    }

    _routePageChanged(e, t, i) {
        i && (void 0 !== e && "default" != e || (e = this.langLocalStorage || Qo[0].name), this.subroute.path || "tv" != t ? this.subroute.path || "radio" != t ? t ? (this.page = t, LA({
            top: 0,
            behavior: "silent"
        }), this.$.nav.closeDrawer()) : this.set("route.path", ["/" + e, "list", "news"].join("/")) : this.set("route.path", ["/" + e, "radio", "maretimo-house"].join("/")) : this.set("route.path", ["/" + e, "tv", "rtuk"].join("/")))
    }

    _pageChanged(e, t) {
        let i = this._pageLoaded.bind(this, !!t);
        switch (e) {
            case"list":
                import("./news-list.js").then((e => e && e.$newsList || {})).then(i);
                break;
            case"article":
                import("./news-article.js").then((e => e && e.$newsArticle || {})).then(i);
                break;
            case"tv":
                import("./news-tv.js").then((e => e && e.$newsTv || {})).then(i);
                break;
            case"radio":
                import("./news-radio.js").then((e => e && e.$newsRadio || {})).then(i);
                break;
            default:
                import("./news-path-warning.js").then((e => e && e.$newsPathWarning || {})).then(i)
        }
    }

    _computeLang(e) {
        return this._isInLanguages(e) ? e : this.routeData.lang || Qo[0].name
    }

    _langChanged(e, t) {
        let i;
        if (void 0 === t && "article" == this.routeData.page && (i = ["/" + (e = this.routeData.lang || Qo[0].name), this.routeData.page, this.subroute.path.slice(1)].join("/"), this._isInLanguages(e) && (this.langLocalStorage = e)), !i) switch (this.routeData.page) {
            case"article":
                i = ["/" + e, "list", this.categoryName].join("/");
                break;
            case"undefined":
                i = ["/" + e, "list", "news"].join("/");
                break;
            default:
                i = ["/" + e, this.routeData.page, this.subroute.path.slice(1)].join("/")
        }
        this.set("route.path", i), this.dispatchEvent(new CustomEvent("refresh-data", {
            bubbles: !0,
            composed: !0
        })), LA({top: 0, behavior: "silent"}), this.$.nav.closeDrawer()
    }

    _pageLoaded(e) {
        this._ensureLazyLoaded()
    }

    _ensureLazyLoaded() {
        this.loadComplete || ka(this, (() => {
            import("./lazy-resources.js").then((e => e && e.$lazyResources || {})).then((() => {
                this._notifyNetworkStatus(), this.loadComplete = !0, "serviceWorker" in navigator && navigator.serviceWorker.register("service-worker.js", {scope: "/"})
            }))
        }))
    }

    _notifyNetworkStatus() {
        let e = this.offline;
        this._setOffline(!window.navigator.onLine), (this.offline || !this.offline && !0 === e) && (this._networkSnackbar || (this._networkSnackbar = document.createElement("news-snackbar"), this.root.appendChild(this._networkSnackbar)), this._networkSnackbar.textContent = this.offline ? "You are offline" : "You are online", this._networkSnackbar.open())
    }

    _updateArticleHeadline(e) {
        this.articleHeadline = e
    }

    _updateDocumentTitle(e, t, i, n, s, a) {
        let r;
        switch (this._setLink("canonical", "https://bbabo.net" + this.route.path), this.lang) {
            case"uk-UA":
                n = "бібабо";
                break;
            case"ru-RU":
                n = "бибабо НЕТ";
                break;
            case"en-GB":
                n = "Bbabo NEWS";
                break;
            case"pl-PL":
                n = "Wiadomości Bbabo";
                break;
            case"bg-BG":
                n = "Новини Bbabo";
                break;
            default:
                n = "Bbabo"
        }
        switch (e) {
            case"list":
                document.title = t + " - " + n, this._setPageMetadata(t, null);
                break;
            case"tv":
                switch (this.lang) {
                    case"ru-RU":
                        r = "Телевидение Онлайн";
                        break;
                    case"uk-UA":
                        r = "Інтернет телебачення";
                        break;
                    case"be-BY":
                        r = "Інтэрнэт-тэлебачанне";
                        break;
                    case"pl-PL":
                        r = "Telewizja internetowa";
                        break;
                    case"en-GB":
                        r = "TV Channel";
                        break;
                    case"fr-FR":
                        r = "Télévision";
                        break;
                    case"de-DE":
                        r = "TV";
                        break;
                    case"es-ES":
                        r = "online TV";
                        break;
                    case"it-IT":
                        r = "la Televisione online";
                        break;
                    case"bg-BG":
                        r = "Онлайн Телевизия";
                        break;
                    default:
                        r = "TV Channel"
                }
                document.title = s + " " + r + " - " + n, this._setPageMetadata(s + " " + r, null);
                break;
            case"radio":
                switch (this.lang) {
                    case"ru-RU":
                        r = "Радио Онлайн";
                        break;
                    case"uk-UA":
                    case"be-BY":
                        r = "Інтернет Радіо";
                        break;
                    case"pl-PL":
                        r = "Radio internetowe";
                        break;
                    case"en-GB":
                        r = "Radio";
                        break;
                    case"fr-FR":
                        r = "Radio en ligne";
                        break;
                    case"de-DE":
                        r = "Online-Radio";
                        break;
                    case"es-ES":
                        r = "Radio en línea";
                        break;
                    case"it-IT":
                        r = "online Radio";
                        break;
                    case"bg-BG":
                        r = "Радио Онлайн";
                        break;
                    default:
                        r = "Radio"
                }
                document.title = a + " " + r + " - " + n, this._setPageMetadata(a + " " + r, null);
                break;
            default:
                document.title = void 0 === i ? this.subroute.path : i + " - " + n, this._setPageMetadata(i, this.article), this.article && this.article.imageUrl && null != this.article.imageUrl && this._setLink("preload", this.article.imageUrl, null, "image")
        }
    }

    _setPageMetadata(e, t) {
        let i = t ? t.imageUrl : "images/news-icon-128.png", n = t ? t.summary : null,
            s = this.lang ? this.lang.replace("-", "_") : null;
        this._setMeta("name", "description", n || e || document.title), t && this._setMeta("property", "og:type", "article"), s && this._setMeta("property", "og:locale", s), this._setMeta("property", "og:title", document.title), this._setMeta("property", "og:description", n || e || document.title), this._setMeta("property", "og:url", document.location.href), this._setMeta("property", "og:image", i), this._setMeta("property", "twitter:title", document.title), this._setMeta("property", "twitter:description", n || e || document.title), this._setMeta("property", "twitter:url", document.location.href), this._setMeta("property", "twitter:image:src", i)
    }

    _setMeta(e, t, i) {
        let n = document.head.querySelector(`meta[${e}="${t}"]`);
        n || (n = document.createElement("meta"), n.setAttribute(e, t), document.head.appendChild(n)), n.setAttribute("content", i || "")
    }

    _setLink(e, t, i, n) {
        let s = document.head.querySelector(`link[rel="${e}"]`);
        s || (s = document.createElement("link"), document.head.appendChild(s)), t && s.setAttribute("href", t), i && s.setAttribute("type", i), n && s.setAttribute("as", n), s.setAttribute("rel", e)
    }

    _refreshData() {
        this.$.data.refresh()
    }
}

customElements.define(ul.is, ul);

class pl extends eA {
    static get template() {
        return Jr`<style>:host{display:block;position:relative;overflow:hidden;background-size:cover;background-position:center;background-color:#ddd}img{@apply --layout-fit;margin:0 auto;object-fit:cover;width:100%;height:100%;transition:opacity .1s;opacity:0}_:-ms-lang(x),img{top:-10000px;right:-10000px;bottom:-10000px;left:-10000px;margin:auto;width:100%;height:auto}_:-ms-lang(x),_:-webkit-full-screen,img{width:auto;zoom:.1;min-width:100%;min-height:100%}</style><img id="img" alt\$="[[alt]]" on-load="_onImgLoad" on-error="_onImgError">`
    }

    static get is() {
        return "news-img"
    }

    static get properties() {
        return {
            alt: {type: String, value: ""},
            src: {type: String, observer: "_srcChanged"},
            placeholderSrc: {type: String, observer: "_placeholderSrcChanged"}
        }
    }

    _srcChanged(e) {
        this.$.img.removeAttribute("src"), this.$.img.style.opacity = "", e && (this.$.img.src = e)
    }

    _onImgLoad() {
        this.$.img.style.opacity = "1"
    }

    _onImgError() {
        this.placeholderSrc || (this.$.img.src = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 468 447"><path transform="translate(0 447) scale(.19915 -.19915)" fill="#5A0D7D" d="m30 2145v-75h170 170v-945-945h-170-170v-75-75h749c787 0 886 4 1044 44 246 63 418 224 463 435 38 183-5 329-137 463-54 54-87 76-170 116-107 52-208 82-272 82-53 0-46 14 16 29 94 24 211 73 277 117 147 96 227 285 190 445-58 252-288 412-641 449-60 6-393 10-810 10h-709v-75zm1492-99c153-58 249-252 220-442-28-182-147-312-325-360-39-10-125-14-339-14h-288v421 420l343-3c300-3 348-6 389-22zm-60-936c191-20 309-135 352-343 49-236-35-454-208-537-91-43-160-50-503-50h-313v470 470h293c160 0 331-4 379-10z"/></svg>'))
    }

    _placeholderSrcChanged(e) {
        this.style.backgroundImage = e ? "url('" + e + "')" : ""
    }
}

customElements.define(pl.is, pl);

class ml extends eA {
    static get template() {
        return Jr`<style>:host{display:block}h2{@apply --app-sub-section-headline;}a{text-decoration:none;color:inherit;display:block;margin:20px 0}.category{display:none}.time-ago{font-size:12px;font-weight:700;white-space:nowrap}:host([featured])>a{padding-bottom:24px;border-bottom:var(--app-border-style)}:host([featured])>a:last-of-type{border-bottom:none}:host([featured]) .category{display:inline-block;padding:6px 20px 7px 20px;border:var(--app-border-style);font-weight:700;font-size:11px}:host([featured]) .headline{display:block;margin:20px 0}:host([featured]) .time-ago{display:block}</style><h2><slot></slot></h2><dom-repeat items="[[items]]"><template><a href\$="[[item.href]]"><div class="category">[[item.category]]</div><span class="headline">[[item.headline]]</span> <span class="time-ago">[[item.timeAgo]]</span></a></template></dom-repeat>`
    }

    static get is() {
        return "news-side-list"
    }

    static get properties() {
        return {items: Array}
    }
}

customElements.define(ml.is, ml);
export {
    BA as $appRouteConverterBehavior,
    ve as $applyShim$1,
    be as $applyShimDefault,
    Be as $applyShimUtils,
    cA as $arraySelector,
    ja as $arraySplice,
    gi as $async,
    Ai as $caseMap,
    fr as $class,
    M as $commonRegex,
    ce as $commonUtils,
    S as $cssParse,
    mA as $customStyle,
    We as $customStyleInterface$1,
    Ge as $customStyleInterfaceDefault,
    ts as $debounce,
    ga as $dirMixin,
    qe as $documentWait,
    Ue as $documentWaitDefault,
    Kr as $domBind,
    rA as $domIf,
    jt as $domModule,
    sA as $domRepeat,
    Zn as $elementMixin,
    Va as $flattenedNodesObserver,
    Ja as $flush,
    aa as $gestureEventListeners,
    ia as $gestures,
    RA as $helpers,
    Zr as $htmlTag,
    eo as $ironA11yKeysBehavior,
    ao as $ironButtonState,
    io as $ironControlState,
    xA as $ironJsonpLibrary,
    oo as $ironMeta,
    vo as $ironMultiSelectable,
    ho as $ironResizableBehavior,
    go as $ironScrollTargetBehavior,
    _o as $ironSelectable,
    po as $ironSelection,
    cr as $legacyElementMixin,
    bt as $mixin,
    Sr as $mutableData,
    yA as $mutableDataBehavior,
    Al as $newsDataInc,
    To as $paperButtonBehavior,
    Po as $paperRippleBehavior,
    ti as $path,
    Ar as $polymerDom,
    tA as $polymerElement,
    yr as $polymerFn,
    vA as $polymerLegacy,
    vi as $propertiesChanged,
    $n as $propertiesMixin,
    Ei as $propertyAccessors,
    qn as $propertyEffects,
    Ta as $renderStatus,
    rt as $resolveUrl,
    _t as $settings,
    Bt as $styleGather,
    s as $styleSettings,
    re as $styleUtil,
    Se as $templateMap,
    we as $templateMapDefault,
    Di as $templateStamp,
    Ur as $templatize,
    Yr as $templatizerBehavior,
    z as $unscopedStyleHandler,
    E as ANIMATION_MATCH,
    DA as AppRouteConverterBehavior,
    lA as ArraySelector,
    AA as ArraySelectorMixin,
    I as BRACKETED,
    bA as Base,
    _r as Class,
    pA as CustomStyle,
    Ve as CustomStyleInterfaceInterface,
    je as CustomStyleProvider,
    es as Debouncer,
    fa as DirMixin,
    tr as DomApi,
    Vr as DomBind,
    aA as DomIf,
    qt as DomModule,
    nA as DomRepeat,
    Vn as ElementMixin,
    $a as FlattenedNodesObserver,
    sa as GestureEventListeners,
    N as HOST_PREFIX,
    O as HOST_SUFFIX,
    T as IS_VAR,
    ZA as IronA11yKeysBehavior,
    so as IronButtonState,
    no as IronButtonStateImpl,
    to as IronControlState,
    wA as IronJsonpLibraryBehavior,
    ro as IronMeta,
    bo as IronMultiSelectableBehavior,
    yo as IronMultiSelectableBehaviorImpl,
    co as IronResizableBehavior,
    fo as IronScrollTargetBehavior,
    mo as IronSelectableBehavior,
    uo as IronSelection,
    Qo as Languages,
    lr as LegacyElementMixin,
    k as MEDIA_MATCH,
    x as MIXIN_MATCH,
    vr as MutableData,
    fA as MutableDataBehavior,
    wr as OptionalMutableData,
    gA as OptionalMutableDataBehavior,
    ko as PaperButtonBehavior,
    Eo as PaperButtonBehaviorImpl,
    xo as PaperRippleBehavior,
    gr as Polymer,
    gr as Polymer$1,
    eA as PolymerElement,
    bi as PropertiesChanged,
    Yn as PropertiesMixin,
    Pi as PropertyAccessors,
    Hn as PropertyEffects,
    a as StyleNode,
    Ir as TemplateInstanceBase,
    Ri as TemplateStamp,
    jr as Templatizer,
    C as VAR_ASSIGN,
    P as VAR_CONSUMED,
    TA as _scrollEffects,
    IA as _scrollTimer,
    ea as add,
    Qa as addDebouncer,
    Hs as addListener,
    ka as afterNextRender,
    mi as animationFrame,
    j as applyCss,
    K as applyStyle,
    V as applyStylePlaceHolder,
    Ea as beforeNextRender,
    Ua as calculateSplices,
    ri as camelToDashCase,
    rl as categoryList,
    Y as createScopeStyle,
    Mt as cssFromModule,
    Rt as cssFromModuleImports,
    Ot as cssFromModules,
    Lt as cssFromTemplate,
    ai as dashToCamelCase,
    yt as dedupingMixin,
    Rs as deepTargetFind,
    le as detectMixin,
    rr as dom,
    Jn as dumpRegistrations,
    ne as elementHasBuiltCss,
    De as elementsAreInvalid,
    Qa as enqueueDebouncer,
    G as findMatchingParen,
    Zs as findOriginalTarget,
    Wa as flush,
    Wa as flush$1,
    Pa as flush$2,
    q as forEachRule,
    Z as gatherStyleText,
    Ms as gestures,
    Xt as get,
    se as getBuildComment,
    oe as getComputedStyleValue,
    ie as getCssBuild,
    X as getIsExtends,
    Jr as html,
    Jr as html$1,
    Jr as html$2,
    Xr as htmlLiteral,
    _i as idlePeriod,
    Kn as instanceCount,
    ke as invalidate,
    Te as invalidateTemplate,
    Vt as isAncestor,
    ei as isDeep,
    Kt as isDescendant,
    U as isKeyframesSelector,
    Yt as isPath,
    Q as isTargetedBuild,
    B as isUnscopedStyle,
    Ie as isValid,
    Oe as isValidating,
    Gt as matches,
    er as matchesSelector,
    fi as microTask,
    hr as mixinBehaviors,
    Fr as modelForElement,
    Ko as monthNames,
    n as nativeCssVariables,
    e as nativeShadow,
    Wt as normalize,
    r as parse,
    pt as passiveTouchGestures,
    at as pathFromUrl,
    Ks as prevent,
    D as processUnscopedStyle,
    W as processVariableAndFallback,
    MA as queryAllRoot,
    Lo as radioList,
    Ls as recognizers,
    Wn as register,
    js as register$1,
    OA as registerEffect,
    Qn as registrations,
    ta as remove,
    p as removeCustomPropAssignment,
    Fs as removeListener,
    Qs as resetMouseCanceller,
    st as resolveCss,
    nt as resolveUrl,
    $t as root,
    ct as rootPath,
    F as rulesForStyle,
    ht as sanitizeDOMValue,
    R as scopingAttribute,
    LA as scroll,
    NA as scrollTimingFunction,
    Zt as set,
    J as setElementClassRaw,
    mt as setPassiveTouchGestures,
    dt as setRootPath,
    ut as setSanitizeDOMValue,
    $s as setTouchAction,
    Jt as split,
    ee as splitSelectorList,
    Le as startValidating,
    Re as startValidatingTemplate,
    d as stringify,
    kt as stylesFromModule,
    It as stylesFromModuleImports,
    Et as stylesFromModules,
    Tt as stylesFromTemplate,
    Ne as templateIsValid,
    Me as templateIsValidating,
    Hr as templatize,
    pi as timeOut,
    H as toCssText,
    Qt as translate,
    Ro as tvList,
    _ as types,
    Ae as updateNativeProperties,
    Xn as updateStyles,
    ot as useNativeCSSProperties,
    lt as useNativeCustomElements,
    At as useShadow
};