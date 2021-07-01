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
        if (this.ensure(), t && oe(e, t), e.shadowRoot) {
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
            Le(i) || (this.prepareTemplate(i, t), Re(i));
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
        }, getComputedStyleValue: (e, t) => Ae(e, t), flushCustomStyles() {
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
const ot = !window.ShadyDOM, At = !(window.ShadyCSS && !window.ShadyCSS.nativeCss),
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
    useShadow: ot, useNativeCSSProperties: At, useNativeCustomElements: lt, get rootPath() {
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
        let o = Object.create(r.__mixinSet || s || null);
        return o[i] = !0, r.__mixinSet = o, r
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
    for (let e = 0; e < t.length; e++) i += Lt(t[e]);
    return i
}

function Lt(e) {
    let t = Ct(e);
    if (t && void 0 === t._cssText) {
        let e = Dt(t), i = t.querySelector("template");
        i && (e += Mt(i, t.assetpath)), t._cssText = e || null
    }
    return t || console.warn("Could not find style data in module named", e), t && t._cssText || ""
}

function Mt(e, t) {
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
    cssFromModule: Lt,
    cssFromTemplate: Mt,
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

function $t(e) {
    return 0 <= e.indexOf(".")
}

function Yt(e) {
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

const ei = $t;
var ti = {
    isPath: $t,
    root: Yt,
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

var oi = {dashToCamelCase: ai, camelToDashCase: ri};
let Ai = 0, li = 0, ci = [], di = 0, hi = document.createTextNode("");

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
    run: e => (hi.textContent = di++, ci.push(e), Ai++), cancel(e) {
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
let wi = oi;
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

function Li(e, t, i) {
    i.templateInfo && (t._templateInfo = i.templateInfo)
}

function Mi(e, t, i) {
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
        for (let e, t, n = 0, r = i.length; n < r && (e = i[n]); n++) t = a[n] = Ii(s, e), Ni(this, s.$, t, e), Li(this, t, e), Oi(this, t, e);
        return s = s, s
    }

    _addMethodEventListenerToNode(e, t, i, n) {
        let s = Mi(n = n || e, t, i);
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
const Bi = oi;
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

function $i(e, t) {
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

function Yi(e, t, i, n, s, a) {
    if (t) {
        let r = !1, o = zi++;
        for (let A in i) Vi(e, t, o, A, i, n, s, a) && (r = !0);
        return r
    }
    return !1
}

function Vi(e, t, i, n, s, a, r, o) {
    let A = !1, l = t[r ? Yt(n) : n];
    if (l) for (let t, c = 0, d = l.length; c < d && (t = l[c]); c++) t.info && t.info.lastRun === i || r && !Ki(n, t.trigger) || (t.info && (t.info.lastRun = i), t.fn(e, n, s, a, t.info, r, o), A = !0);
    return A
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
    let a, r, o = e[Hi.NOTIFY], A = zi++;
    for (let r in t) t[r] && (o && Vi(e, o, A, r, i, n, s) || s && Wi(e, r, i)) && (a = !0);
    a && (r = e.__dataHost) && r._invalidateProperties && r._invalidateProperties()
}

function Wi(e, t, i) {
    let n = Yt(t);
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
    let r = (a ? Yt(t) : t) != t ? t : null, o = r ? Xt(e, r) : e.__data[t];
    r && void 0 === o && (o = i[t]), Ji(e, s.eventName, o, r)
}

function Zi(e, t, i, n, s) {
    let a, r = e.detail, o = r && r.path;
    o ? (n = Qt(i, n, o), a = r && r.value) : a = e.target[i], a = s ? !a : a, t[Hi.READ_ONLY] && t[Hi.READ_ONLY][n] || !t._setPendingPropertyOrPath(n, a, !0, !!o) || r && r.queueProperty || t._invalidateProperties()
}

function en(e, t, i, n, s) {
    let a = e.__data[t];
    ht && (a = ht(a, s.attrName, "attribute", e)), e._propertyToAttribute(t, s.attrName, a)
}

function tn(e, t, i, n) {
    let s = e[Hi.COMPUTE];
    if (s) {
        let a = t;
        for (; Yi(e, s, a, i, n);) Object.assign(i, e.__dataOld), Object.assign(t, e.__dataPending), a = e.__dataPending, e.__dataPending = null
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
    let o = {kind: n, target: s, parts: a, literal: r, isCompound: 1 !== a.length};
    if (i.bindings.push(o), cn(o)) {
        let {event: e, negate: t} = o.parts[0];
        o.listenerEvent = e || Bi.camelToDashCase(s) + "-changed", o.listenerNegate = t
    }
    let A = t.nodeInfoList.length;
    for (let i, n = 0; n < o.parts.length; n++) i = o.parts[n], i.compoundIndex = n, rn(e, t, o, i, A)
}

function rn(e, t, i, n, s) {
    if (!n.literal) if ("attribute" === i.kind && "-" === i.target[0]) console.warn("Cannot set attribute " + i.target + ' because "-" is not a valid attribute starting character'); else {
        let a = n.dependencies, r = {index: s, binding: i, part: n, evaluator: e};
        for (let i, n = 0; n < a.length; n++) i = a[n], "string" == typeof i && (i = Mn(i), i.wildcard = !0), e._addTemplatePropertyEffect(t, i.rootProperty, {
            fn: on,
            info: r,
            trigger: i
        })
    }
}

function on(e, t, i, n, s, a, r) {
    let o = r[s.index], A = s.binding, l = s.part;
    if (a && l.source && t.length > l.source.length && "property" == A.kind && !A.isCompound && o.__isPropertyEffectsClient && o.__dataHasAccessor && o.__dataHasAccessor[A.target]) {
        let n = i[t];
        t = Qt(l.source, A.target, t), o._setPendingPropertyOrPath(t, n, !1, !0) && e._enqueueClient(o)
    } else {
        An(e, o, A, l, s.evaluator._evaluateBinding(e, l, t, i, n, a))
    }
}

function An(e, t, i, n, s) {
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
            return Ln(t[2].replace(/\\,/g, "&comma;").split(","), e)
        }
        return e
    }
    return null
}

function Ln(e, t) {
    return t.args = e.map((function (e) {
        let i = Mn(e);
        return i.literal || (t.static = !1), i
    }), this), t
}

function Mn(e) {
    let t = e.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), i = {name: t, value: "", literal: !1}, n = t[0];
    switch ("-" === n && (n = t[1]), "0" <= n && "9" >= n && (n = "#"), n) {
        case"'":
        case'"':
            i.value = t.slice(1, -1), i.literal = !0;
            break;
        case"#":
            i.value = +t, i.literal = !0
    }
    return i.literal || (i.rootProperty = Yt(t), i.structured = $t(t), i.structured && (i.wildcard = ".*" == t.slice(-2), i.wildcard && (i.name = t.slice(0, -2)))), i
}

function Rn(e, t, i, n) {
    let s = [];
    for (let a = 0, r = t.length; a < r; a++) {
        let r, o = t[a], A = o.name;
        if (o.literal ? r = o.value : o.structured ? (r = Xt(e, A), void 0 === r && (r = n[A])) : r = e[A], o.wildcard) {
            let e = 0 === A.indexOf(i + "."), t = 0 === i.indexOf(A) && !e;
            s[a] = {path: t ? i : A, value: t ? n[i] : r, base: r}
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
            let n = $i(this, t)[e];
            n || (n = this[t][e] = []), n.push(i)
        }

        _removePropertyEffect(e, t, i) {
            let n = $i(this, t)[e], s = n.indexOf(i);
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
            if (n || Yt(Array.isArray(e) ? e[0] : e) !== e) {
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
            let n = this.__dataHasPaths && $t(e), s = n ? this.__dataTemp : this.__data;
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
            this.__dataToNotify = null, this._propagatePropertyChanges(t, i, n), this._flushClients(), Yi(this, this[Hi.REFLECT], t, i, n), Yi(this, this[Hi.OBSERVE], t, i, n), s && Gi(this, s, t, i, n), 1 == this.__dataCounter && (this.__dataTemp = {})
        }

        _propagatePropertyChanges(e, t, i) {
            this[Hi.PROPAGATE] && Yi(this, this[Hi.PROPAGATE], e, t, i);
            let n = this.__templateInfo;
            for (; n;) Yi(this, n.propertyEffects, e, t, i, n.nodeList), n = n.nextTemplateInfo
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
            return t.templateInfo = i, dn(this, i), this.__dataReady && Yi(this, i.propertyEffects, this.__data, null, !1, i.nodeList), t
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
                let o = Nn(a);
                return o && "attribute" == r && e.setAttribute(n, o), "input" === e.localName && "value" === s && e.setAttribute(s, ""), e.removeAttribute(s), "property" === r && (n = ai(n)), an(this, t, i, r, n, a, o), !0
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
                let a = i[1][0], r = !!i[2], o = i[3].trim(), A = !1, l = "", c = -1;
                "{" == a && 0 < (c = o.indexOf("::")) && (l = o.substring(c + 2), o = o.substring(0, c), A = !0);
                let d = On(o), h = [];
                if (d) {
                    let {args: e, methodName: i} = d;
                    for (let t, i = 0; i < e.length; i++) t = e[i], t.literal || h.push(t);
                    let n = t.dynamicFns;
                    (n && n[i] || d.static) && (h.push(i), d.dynamicFn = !0)
                } else h.push(o);
                n.push({
                    source: o,
                    mode: a,
                    negate: r,
                    customEvent: A,
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
            return r = t.signature ? mn(e, i, n, s, t.signature) : i != t.source ? Xt(e, t.source) : a && $t(i) ? Xt(e, i) : e.__data[i], t.negate && (r = !r), r
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

const $n = yt((e => {
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
var Yn = {PropertiesMixin: $n};
const Vn = yt((e => {
    const t = $n(Hn(e));

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
                        o = t.content.firstElementChild;
                    for (let i, s = 0; s < r.length; s++) i = r[s], i.textContent = e._processStyleText(i.textContent, n), t.content.insertBefore(i, o);
                    let A = 0;
                    for (let t = 0; t < a.length; t++) {
                        let i = a[t], r = s[A];
                        r !== i ? (i = i.cloneNode(!0), r.parentNode.insertBefore(i, r)) : A++, i.textContent = e._processStyleText(i.textContent, n)
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
    as = "__polymerGesturesTouchAction", rs = 25, os = 5, As = 2, ls = 2500,
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
const Ls = {}, Ms = [];

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
            for (let i, n = 0; n < Ms.length; n++) i = Ms[n], s[i.name] && !t[i.name] && i.flow && -1 < i.flow.start.indexOf(e.type) && i.reset && i.reset();
            for (let n, a = 0; a < Ms.length; a++) n = Ms[a], s[n.name] && !t[n.name] && (t[n.name] = !0, n[i](e))
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
    return !!Ls[t] && (Us(e, t, i), !0)
}

function Fs(e, t, i) {
    return !!Ls[t] && (qs(e, t, i), !0)
}

function Us(e, t, i) {
    let n = Ls[t], s = n.deps, a = n.name, r = e[ns];
    r || (e[ns] = r = {});
    for (let t, i, n = 0; n < s.length; n++) t = s[n], _s && us(t) && "click" !== t || (i = r[t], i || (r[t] = i = {_count: 0}), 0 === i._count && e.addEventListener(t, Bs, ms(t)), i[a] = (i[a] || 0) + 1, i._count = (i._count || 0) + 1);
    e.addEventListener(t, i), n.touchAction && Ys(e, n.touchAction)
}

function qs(e, t, i) {
    let n = Ls[t], s = n.deps, a = n.name, r = e[ns];
    if (r) for (let t, i, n = 0; n < s.length; n++) t = s[n], i = r[t], i && i[a] && (i[a] = (i[a] || 1) - 1, i._count = (i._count || 1) - 1, 0 === i._count && e.removeEventListener(t, Bs, ms(t)));
    e.removeEventListener(t, i)
}

function js(e) {
    Ms.push(e);
    for (let t = 0; t < e.emits.length; t++) Ls[e.emits[t]] = e
}

function $s(e) {
    for (let t, i = 0; i < Ms.length; i++) {
        t = Ms[i];
        for (let i, n = 0; n < t.emits.length; n++) if (i = t.emits[n], i === e) return t
    }
    return null
}

function Ys(e, t) {
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
    let t = $s(e);
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
    return n >= os || s >= os
}

function Js(e, t, i) {
    if (!t) return;
    let n, s = e.moves[e.moves.length - 2], a = e.moves[e.moves.length - 1], r = a.x - e.x, o = a.y - e.y, A = 0;
    s && (n = a.x - s.x, A = a.y - s.y), Vs(t, "track", {
        state: e.state,
        x: i.clientX,
        y: i.clientY,
        dx: r,
        dy: o,
        ddx: n,
        ddy: A,
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
            this.moves.length > As && this.moves.shift(), this.moves.push(e)
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
    gestures: Ls,
    recognizers: Ms,
    deepTargetFind: Rs,
    addListener: Hs,
    removeListener: Fs,
    register: js,
    setTouchAction: Ys,
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
const ra = /:host\(:dir\((ltr|rtl)\)\)/g, oa = ':host([dir="$1"])', Aa = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
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
            return t = t.replace(ra, ':host([dir="$1"])'), t = t.replace(Aa, la), e !== t && (this.__activateDir = !0), t
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
const Oa = 0, La = 1, Ma = 2, Ra = 3;

function Da(e, t, i, n, s, a) {
    let r = a - s + 1, o = i - t + 1, A = Array(r);
    for (let e = 0; e < r; e++) A[e] = Array(o), A[e][0] = e;
    for (let e = 0; e < o; e++) A[0][e] = e;
    for (let i = 1; i < r; i++) for (let a = 1; a < o; a++) if (qa(e[t + a - 1], n[s + i - 1])) A[i][a] = A[i - 1][a - 1]; else {
        let e = A[i - 1][a] + 1, t = A[i][a - 1] + 1;
        A[i][a] = e < t ? e : t
    }
    return A
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
        let a, r = e[t - 1][i - 1], o = e[t - 1][i], A = e[t][i - 1];
        a = o < A ? o < r ? o : r : A < r ? A : r, a == r ? (r == n ? s.push(0) : (s.push(1), n = r), t--, i--) : a == o ? (s.push(3), t--, n = o) : (s.push(2), i--, n = A)
    }
    return s.reverse(), s
}

function za(e, t, i, n, s, a) {
    let r, o = 0, A = 0, l = Math.min(i - t, a - s);
    if (0 == t && 0 == s && (o = Ha(e, n, l)), i == e.length && a == n.length && (A = Fa(e, n, l - o)), s += o, a -= A, 0 == (i -= A) - (t += o) && 0 == a - s) return [];
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

function $a(e) {
    return "slot" === e.localName
}

class Ya {
    static getFlattenedNodes(e) {
        return $a(e) ? (e = e).assignedNodes({flatten: !0}) : Array.from(e.childNodes).map((e => $a(e) ? (e = e).assignedNodes({flatten: !0}) : [e])).reduce(((e, t) => e.concat(t)), [])
    }

    constructor(e, t) {
        this._shadyChildrenObserver = null, this._nativeChildrenObserver = null, this._connected = !1, this._target = e, this.callback = t, this._effectiveNodes = [], this._observer = null, this._scheduled = !1, this._boundSchedule = () => {
            this._schedule()
        }, this.connect(), this._schedule()
    }

    connect() {
        $a(this._target) ? this._listenSlots([this._target]) : this._target.children && (this._listenSlots(this._target.children), window.ShadyDOM ? this._shadyChildrenObserver = ShadyDOM.observeChildren(this._target, (e => {
            this._processMutations(e)
        })) : (this._nativeChildrenObserver = new MutationObserver((e => {
            this._processMutations(e)
        })), this._nativeChildrenObserver.observe(this._target, {childList: !0}))), this._connected = !0
    }

    disconnect() {
        $a(this._target) ? this._unlistenSlots([this._target]) : this._target.children && (this._unlistenSlots(this._target.children), window.ShadyDOM && this._shadyChildrenObserver ? (ShadyDOM.unobserveChildren(this._shadyChildrenObserver), this._shadyChildrenObserver = null) : this._nativeChildrenObserver && (this._nativeChildrenObserver.disconnect(), this._nativeChildrenObserver = null)), this._connected = !1
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
        for (let t, i = 0; i < e.length; i++) t = e[i], $a(t) && t.addEventListener("slotchange", this._boundSchedule)
    }

    _unlistenSlots(e) {
        for (let t, i = 0; i < e.length; i++) t = e[i], $a(t) && t.removeEventListener("slotchange", this._boundSchedule)
    }
}

var Va = {FlattenedNodesObserver: Ya};
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
        return new Ya(this.node, e)
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
        return Ya.getFlattenedNodes(this.node)
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
var or = {matchesSelector: er, DomApi: tr, dom: rr, flush: Wa, addDebouncer: Qa};
let Ar = window.ShadyCSS;
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
            Ys(t || this, i[e] || "auto")
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
            return Ar.getComputedStyleValue(this, e)
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

function Lr(e, t, i) {
    let n = i.mutableData ? Nr : Ir, s = class extends n {
    };
    return s.prototype.__templatizeOptions = i, s.prototype._bindTemplate(e), Dr(s, e, t, i), s
}

function Mr(e, t, i) {
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
    s || (s = Lr(e, n, i), n.templatizeInstanceClass = s), Mr(e, n, i);
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
var $r = {Templatizer: jr};
const Yr = sa(wr(Hn(HTMLElement)));

class Vr extends Yr {
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
const eo = Vn(HTMLElement);
var to = {PolymerElement: eo, html: Jr};
const io = wr(eo);

class no extends io {
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

customElements.define(no.is, no);
var so = {DomRepeat: no};

class ao extends eo {
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
                        this.__instance && (this.if ? this.__instance.forwardHostProp(e, t) : (this.__invalidProps = this.__invalidProps || Object.create(null), this.__invalidProps[Yt(e)] = !0))
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

customElements.define(ao.is, ao);
var ro = {DomIf: ao};
let oo = yt((e => {
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
})), Ao = oo(eo);

class lo extends Ao {
    static get is() {
        return "array-selector"
    }
}

customElements.define(lo.is, lo);
var co = {ArraySelectorMixin: oo, ArraySelector: lo};