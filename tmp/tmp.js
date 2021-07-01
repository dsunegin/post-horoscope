const Jt = new bt;

class Zt {
    constructor() {
        this.customStyleInterface = null, Jt.invalidCallback = Bt
    }

    ensure() {
        this.customStyleInterface || (this.customStyleInterface = window.ShadyCSS.CustomStyleInterface, this.customStyleInterface && (this.customStyleInterface.transformCallback = t => {
            Jt.transformCustomStyle(t)
        }, this.customStyleInterface.validateCallback = () => {
            requestAnimationFrame((() => {
                this.customStyleInterface.enqueued && this.flushCustomStyles()
            }))
        }))
    }

    prepareTemplate(t, e) {
        if (this.ensure(), it(t)) return;
        _t[e] = t;
        let A = Jt.transformTemplate(t, e);
        t.P = A
    }

    flushCustomStyles() {
        if (this.ensure(), !this.customStyleInterface) return;
        let t = this.customStyleInterface.processStyles();
        if (this.customStyleInterface.enqueued) {
            for (let e = 0; e < t.length; e++) {
                let A = t[e], i = this.customStyleInterface.getStyleForCustomStyle(A);
                i && Jt.transformCustomStyle(i)
            }
            this.customStyleInterface.enqueued = !1
        }
    }

    styleSubtree(t, e) {
        if (this.ensure(), e && at(t, e), t.shadowRoot) {
            this.styleElement(t);
            let e = t.shadowRoot.children || t.shadowRoot.childNodes;
            for (let t = 0; t < e.length; t++) this.styleSubtree(e[t])
        } else {
            let e = t.children || t.childNodes;
            for (let t = 0; t < e.length; t++) this.styleSubtree(e[t])
        }
    }

    styleElement(t) {
        this.ensure();
        let {is: e} = Z(t), A = _t[e];
        if ((!A || !it(A)) && A && !It(A)) {
            Nt(A) || (this.prepareTemplate(A, e), Lt(A));
            let i = t.shadowRoot;
            if (i) {
                let t = i.querySelector("style");
                t && (t.t = A.P, t.textContent = j(A.P))
            }
        }
    }

    styleDocument(t) {
        this.ensure(), this.styleSubtree(document.body, t)
    }
}

if (!window.ShadyCSS || !window.ShadyCSS.ScopingShim) {
    const e = new Zt;
    let A = window.ShadyCSS && window.ShadyCSS.CustomStyleInterface;
    window.ShadyCSS = {
        prepareTemplate(t, A, i) {
            e.flushCustomStyles(), e.prepareTemplate(t, A)
        }, prepareTemplateStyles(t, e, A) {
            this.prepareTemplate(t, e, A)
        }, prepareTemplateDom(t, e) {
        }, styleSubtree(t, A) {
            e.flushCustomStyles(), e.styleSubtree(t, A)
        }, styleElement(t) {
            e.flushCustomStyles(), e.styleElement(t)
        }, styleDocument(t) {
            e.flushCustomStyles(), e.styleDocument(t)
        }, getComputedStyleValue: (t, e) => ot(t, e), flushCustomStyles() {
            e.flushCustomStyles()
        }, nativeCss: i, nativeShadow: t
    }, A && (window.ShadyCSS.CustomStyleInterface = A)
}
window.ShadyCSS.ApplyShim = Jt, window.JSCompiler_renameProperty = function (t) {
    return t
};
let Xt, te, ee = /(url\()([^)]*)(\))/g, Ae = /(^\/)|(^#)|(^[\w-\d]*:)/;

function ie(t, e) {
    if (t && Ae.test(t)) return t;
    if (void 0 === Xt) {
        Xt = !1;
        try {
            const t = new URL("b", "http://a");
            t.pathname = "c%20d", Xt = "http://a/c%20d" === t.href
        } catch (t) {
        }
    }
    return e || (e = document.baseURI || window.location.href), Xt ? new URL(t, e).href : (te || (te = document.implementation.createHTMLDocument("temp"), te.base = te.createElement("base"), te.head.appendChild(te.base), te.anchor = te.createElement("a"), te.body.appendChild(te.anchor)), te.base.href = e, te.anchor.href = t, te.anchor.href || t)
}

function ne(t, e) {
    return t.replace(ee, (function (t, A, i, n) {
        return A + "'" + ie(i.replace(/["']/g, ""), e) + "'" + n
    }))
}

function se(t) {
    return t.substring(0, t.lastIndexOf("/") + 1)
}

var re = {resolveUrl: ie, resolveCss: ne, pathFromUrl: se};
const ae = !window.ShadyDOM, oe = !(window.ShadyCSS && !window.ShadyCSS.nativeCss),
    le = !window.customElements.polyfillWrapFlushCallback;
let he = se(document.baseURI || window.location.href);
const ue = function (t) {
    he = t
};
let ce;
const de = function (t) {
    ce = t
};
let pe = !1;
const fe = function (t) {
    pe = t
};
var me = {
    useShadow: ae, useNativeCSSProperties: oe, useNativeCustomElements: le, get rootPath() {
        return he
    }, setRootPath: ue, get sanitizeDOMValue() {
        return ce
    }, setSanitizeDOMValue: de, get passiveTouchGestures() {
        return pe
    }, setPassiveTouchGestures: fe
};
let ge = 0;

function ye() {
}

ye.prototype.I, ye.prototype.M;
const ve = function (t) {
    let e = t.I;
    e || (e = new WeakMap, t.I = e);
    let A = ge++;
    return function (i) {
        let n = i.M;
        if (n && n[A]) return i;
        let s = e, r = s.get(i);
        r || (r = t(i), s.set(i, r));
        let a = Object.create(r.M || n || null);
        return a[A] = !0, r.M = a, r
    }
};
var be = {dedupingMixin: ve};
const we = "link[rel=import][type~=css]", _e = "include", xe = "shady-unscoped";

function Se(t) {
    const e = customElements.get("dom-module");
    return e ? e.import(t) : null
}

function ke(t) {
    const e = ne((t.body ? t.body : t).textContent, t.baseURI), A = document.createElement("style");
    return A.textContent = e, A
}

let Ce;

function Ee(t) {
    const e = t.trim().split(/\s+/), A = [];
    for (let t = 0; t < e.length; t++) A.push(...Be(e[t]));
    return A
}

function Be(t) {
    const e = Se(t);
    if (!e) return console.warn("Could not find style data in module named", t), [];
    if (void 0 === e.N) {
        const t = [...Ie(e)], A = e.querySelector("template");
        A && t.push(...Te(A, e.assetpath)), e.N = t
    }
    return e.N
}

function Te(t, e) {
    if (!t.N) {
        const A = [], i = t.content.querySelectorAll("style");
        for (let t = 0; t < i.length; t++) {
            let n = i[t], s = n.getAttribute("include");
            s && A.push(...Ee(s).filter((function (t, e, A) {
                return A.indexOf(t) === e
            }))), e && (n.textContent = ne(n.textContent, e)), A.push(n)
        }
        t.N = A
    }
    return t.N
}

function Pe(t) {
    let e = Se(t);
    return e ? Ie(e) : []
}

function Ie(t) {
    const e = [], A = t.querySelectorAll(we);
    for (let t, i = 0; i < A.length; i++) if (t = A[i], t.import) {
        const A = t.import, i = t.hasAttribute("shady-unscoped");
        if (i && !A.O) {
            const t = ke(A);
            t.setAttribute("shady-unscoped", ""), A.O = t
        } else A.L || (A.L = ke(A));
        e.push(i ? A.O : A.L)
    }
    return e
}

function Me(t) {
    let e = t.trim().split(/\s+/), A = "";
    for (let t = 0; t < e.length; t++) A += Ne(e[t]);
    return A
}

function Ne(t) {
    let e = Se(t);
    if (e && void 0 === e.R) {
        let t = Re(e), A = e.querySelector("template");
        A && (t += Oe(A, e.assetpath)), e.R = t || null
    }
    return e || console.warn("Could not find style data in module named", t), e && e.R || ""
}

function Oe(t, e) {
    let A = "";
    const i = Te(t, e);
    for (let t, e = 0; e < i.length; e++) t = i[e], t.parentNode && t.parentNode.removeChild(t), A += t.textContent;
    return A
}

function Le(t) {
    let e = Se(t);
    return e ? Re(e) : ""
}

function Re(t) {
    let e = "", A = Ie(t);
    for (let t = 0; t < A.length; t++) e += A[t].textContent;
    return e
}

var De = {
    stylesFromModules: Ee,
    stylesFromModule: Be,
    stylesFromTemplate: Te,
    stylesFromModuleImports: Pe,
    cssFromModules: Me,
    cssFromModule: Ne,
    cssFromTemplate: Oe,
    cssFromModuleImports: Le
};
let ze = {}, je = {};

function Fe(t) {
    return ze[t] || je[t.toLowerCase()]
}

function He(t) {
    t.querySelector("style") && console.warn("dom-module %s has style outside template", t.id)
}

class Ue extends HTMLElement {
    static get observedAttributes() {
        return ["id"]
    }

    get assetpath() {
        if (!this.D) {
            const t = window.HTMLImports && HTMLImports.importForElement ? HTMLImports.importForElement(this) || document : this.ownerDocument,
                e = ie(this.getAttribute("assetpath") || "", t.baseURI);
            this.D = se(e)
        }
        return this.D
    }

    static import(t, e) {
        if (t) {
            let A = Fe(t);
            return A && e ? A.querySelector(e) : A
        }
        return null
    }

    attributeChangedCallback(t, e, A, i) {
        e !== A && this.register()
    }

    register(t) {
        (t = t || this.id) && (this.id = t, ze[t] = this, je[t.toLowerCase()] = this, He(this))
    }
}

Ue.prototype.modules = ze, customElements.define("dom-module", Ue);
var Qe = {DomModule: Ue};

function $e(t) {
    return 0 <= t.indexOf(".")
}

function qe(t) {
    let e = t.indexOf(".");
    return -1 === e ? t : t.slice(0, e)
}

function Ye(t, e) {
    return 0 === t.indexOf(e + ".")
}

function Ke(t, e) {
    return 0 === e.indexOf(t + ".")
}

function Ve(t, e, A) {
    return e + A.slice(t.length)
}

function Ge(t, e) {
    return t === e || Ye(t, e) || Ke(t, e)
}

function We(t) {
    if (Array.isArray(t)) {
        let e = [];
        for (let A, i = 0; i < t.length; i++) {
            A = t[i].toString().split(".");
            for (let t = 0; t < A.length; t++) e.push(A[t])
        }
        return e.join(".")
    }
    return t
}

function Je(t) {
    return Array.isArray(t) ? We(t).split(".") : t.toString().split(".")
}

function Ze(t, e, A) {
    let i = t, n = Je(e);
    for (let t = 0; t < n.length; t++) {
        if (!i) return;
        i = i[n[t]]
    }
    return A && (A.path = n.join(".")), i
}

function Xe(t, e, A) {
    let i = t, n = Je(e), s = n[n.length - 1];
    if (1 < n.length) {
        for (let t, e = 0; e < n.length - 1; e++) if (t = n[e], i = i[t], !i) return;
        i[s] = A
    } else i[e] = A;
    return n.join(".")
}

const tA = $e;
var eA = {
    isPath: $e,
    root: qe,
    isAncestor: Ye,
    isDescendant: Ke,
    translate: Ve,
    matches: Ge,
    normalize: We,
    split: Je,
    get: Ze,
    set: Xe,
    isDeep: tA
};
const AA = {}, iA = /-[a-z]/g, nA = /([A-Z])/g;

function sA(t) {
    return AA[t] || (AA[t] = 0 > t.indexOf("-") ? t : t.replace(iA, (t => t[1].toUpperCase())))
}

function rA(t) {
    return AA[t] || (AA[t] = t.replace(nA, "-$1").toLowerCase())
}

var aA = {dashToCamelCase: sA, camelToDashCase: rA};
let oA = 0, lA = 0, hA = [], uA = 0, cA = document.createTextNode("");

function dA() {
    const t = hA.length;
    for (let e, A = 0; A < t; A++) if (e = hA[A], e) try {
        e()
    } catch (t) {
        setTimeout((() => {
            throw t
        }))
    }
    hA.splice(0, t), lA += t
}

new window.MutationObserver(dA).observe(cA, {characterData: !0});
const pA = {
    after: t => ({
        run: e => window.setTimeout(e, t), cancel(t) {
            window.clearTimeout(t)
        }
    }), run: (t, e) => window.setTimeout(t, e), cancel(t) {
        window.clearTimeout(t)
    }
}, fA = {
    run: t => window.requestAnimationFrame(t), cancel(t) {
        window.cancelAnimationFrame(t)
    }
}, mA = {
    run: t => window.requestIdleCallback ? window.requestIdleCallback(t) : window.setTimeout(t, 16), cancel(t) {
        window.cancelIdleCallback ? window.cancelIdleCallback(t) : window.clearTimeout(t)
    }
}, gA = {
    run: t => (cA.textContent = uA++, hA.push(t), oA++), cancel(t) {
        const e = t - lA;
        if (0 <= e) {
            if (!hA[e]) throw new Error("invalid async handle: " + t);
            hA[e] = null
        }
    }
};
var yA = {timeOut: pA, animationFrame: fA, idlePeriod: mA, microTask: gA};
const vA = gA, bA = ve((t => class extends t {
    constructor() {
        super(), this.V = !1, this.G = !1, this.W = !1, this.J = {}, this.Z = null, this.X = null, this.tt = null, this.et = !1, this.At()
    }

    static createProperties(t) {
        const e = this.prototype;
        for (let A in t) A in e || e.j(A)
    }

    static attributeNameForProperty(t) {
        return t.toLowerCase()
    }

    static typeForProperty(t) {
    }

    j(t, e) {
        this.F(t), this.hasOwnProperty("__dataHasAccessor") || (this.H = Object.assign({}, this.H)), this.H[t] || (this.H[t] = !0, this.U(t, e))
    }

    F(t) {
        if (this.hasOwnProperty("__dataAttributes") || (this.q = Object.assign({}, this.q)), !this.q[t]) {
            const e = this.constructor.attributeNameForProperty(t);
            this.q[e] = t
        }
    }

    U(t, e) {
        Object.defineProperty(this, t, {
            get() {
                return this.Y(t)
            }, set: e ? function () {
            } : function (e) {
                this.K(t, e)
            }
        })
    }

    ready() {
        this.G = !0, this.it()
    }

    At() {
        for (let t in this.H) this.hasOwnProperty(t) && (this.tt = this.tt || {}, this.tt[t] = this[t], delete this[t])
    }

    nt(t) {
        Object.assign(this, t)
    }

    K(t, e) {
        this.st(t, e) && this.rt()
    }

    Y(t) {
        return this.J[t]
    }

    st(t, e, A) {
        let i = this.J[t], n = this.at(t, e, i);
        return n && (this.Z || (this.Z = {}, this.X = {}), this.X && !(t in this.X) && (this.X[t] = i), this.J[t] = e, this.Z[t] = e), n
    }

    rt() {
        !this.W && this.G && (this.W = !0, vA.run((() => {
            this.W && (this.W = !1, this.it())
        })))
    }

    ot() {
        this.V || (this.V = !0, this.tt && (this.nt(this.tt), this.tt = null), this.ready())
    }

    it() {
        const t = this.J, e = this.Z, A = this.X;
        this.lt(t, e, A) && (this.Z = null, this.X = null, this.ht(t, e, A))
    }

    lt(t, e, A) {
        return !!e
    }

    ht(t, e, A) {
    }

    at(t, e, A) {
        return A !== e && (A == A || e == e)
    }

    attributeChangedCallback(t, e, A, i) {
        e !== A && this.ut(t, A), super.attributeChangedCallback && super.attributeChangedCallback(t, e, A, i)
    }

    ut(t, e, A) {
        if (!this.et) {
            const i = this.q, n = i && i[t] || t;
            this[n] = this.ct(e, A || this.constructor.typeForProperty(n))
        }
    }

    dt(t, e, A) {
        this.et = !0, A = 3 > arguments.length ? this[t] : A, this.ft(this, A, e || this.constructor.attributeNameForProperty(t)), this.et = !1
    }

    ft(t, e, A) {
        const i = this.gt(e);
        void 0 === i ? t.removeAttribute(A) : t.setAttribute(A, i)
    }

    gt(t) {
        switch (typeof t) {
            case"boolean":
                return t ? "" : void 0;
            default:
                return null != t ? t.toString() : void 0
        }
    }

    ct(t, e) {
        switch (e) {
            case Boolean:
                return null !== t;
            case Number:
                return +t;
            default:
                return t
        }
    }
}));
var wA = {PropertiesChanged: bA};
let _A = aA;
const xA = {};
let SA = HTMLElement.prototype;
for (; SA;) {
    let t = Object.getOwnPropertyNames(SA);
    for (let e = 0; e < t.length; e++) xA[t[e]] = !0;
    SA = Object.getPrototypeOf(SA)
}

function kA(t, e) {
    if (!xA[e]) {
        let A = t[e];
        void 0 !== A && (t.J ? t.st(e, A) : (t.yt ? t.hasOwnProperty(JSCompiler_renameProperty("__dataProto", t)) || (t.yt = Object.create(t.yt)) : t.yt = {}, t.yt[e] = A))
    }
}

const CA = ve((t => {
    const e = bA(t);
    return class extends e {
        static createPropertiesForAttributes() {
            let t = this.observedAttributes;
            for (let e = 0; e < t.length; e++) this.prototype.j(_A.dashToCamelCase(t[e]))
        }

        static attributeNameForProperty(t) {
            return _A.camelToDashCase(t)
        }

        At() {
            this.yt && (this.vt(this.yt), this.yt = null), super.At()
        }

        vt(t) {
            for (let e in t) this.K(e, t[e])
        }

        bt(t, e) {
            const A = this;
            A.hasAttribute(t) || this.ft(A, e, t)
        }

        gt(t) {
            switch (typeof t) {
                case"object":
                    if (t instanceof Date) return t.toString();
                    if (t) try {
                        return JSON.stringify(t)
                    } catch (t) {
                        return ""
                    }
                default:
                    return super.gt(t)
            }
        }

        ct(t, e) {
            let A;
            switch (e) {
                case Object:
                    try {
                        A = JSON.parse(t)
                    } catch (e) {
                        A = t
                    }
                    break;
                case Array:
                    try {
                        A = JSON.parse(t)
                    } catch (e) {
                        A = null, console.warn(`Polymer::Attributes: couldn't decode Array as JSON: ${t}`)
                    }
                    break;
                case Date:
                    A = isNaN(t) ? t + "" : +t, A = new Date(A);
                    break;
                default:
                    A = super.ct(t, e)
            }
            return A
        }

        U(t, e) {
            kA(this, t), super.U(t, e)
        }

        wt(t) {
            return this.H && this.H[t]
        }

        _t(t) {
            return !(!this.Z || !(t in this.Z))
        }
    }
}));
var EA = {PropertyAccessors: CA};
const BA = {"dom-if": !0, "dom-repeat": !0};

function TA(t) {
    let e = t.getAttribute("is");
    if (e && BA[e]) {
        let A = t;
        for (A.removeAttribute("is"), t = A.ownerDocument.createElement(e), A.parentNode.replaceChild(t, A), t.appendChild(A); A.attributes.length;) t.setAttribute(A.attributes[0].name, A.attributes[0].value), A.removeAttribute(A.attributes[0].name)
    }
    return t
}

function PA(t, e) {
    let A = e.parentInfo && PA(t, e.parentInfo);
    if (!A) return t;
    for (let t = A.firstChild, i = 0; t; t = t.nextSibling) if (e.parentIndex === i++) return t
}

function IA(t, e, A, i) {
    i.id && (e[i.id] = A)
}

function MA(t, e, A) {
    if (A.events && A.events.length) for (let i, n = 0, s = A.events; n < s.length && (i = s[n]); n++) t.xt(e, i.name, i.value, t)
}

function NA(t, e, A) {
    A.templateInfo && (e.St = A.templateInfo)
}

function OA(t, e, A) {
    t = t.kt || t;
    return function (e) {
        t[A] ? t[A](e, e.detail) : console.warn("listener method `" + A + "` not defined")
    }
}

const LA = ve((t => class extends t {
    static Ct(t, e) {
        if (!t.St) {
            let A = t.St = {};
            A.nodeInfoList = [], A.stripWhiteSpace = e && e.stripWhiteSpace || t.hasAttribute("strip-whitespace"), this.Et(t, A, {parent: null})
        }
        return t.St
    }

    static Et(t, e, A) {
        return this.Bt(t.content, e, A)
    }

    static Bt(t, e, A) {
        let i, n = t;
        return "template" != n.localName || n.hasAttribute("preserve-content") ? "slot" === n.localName && (e.hasInsertionPoint = !0) : i = this.Tt(n, e, A) || i, n.firstChild && (i = this.Pt(n, e, A) || i), n.hasAttributes && n.hasAttributes() && (i = this.It(n, e, A) || i), i
    }

    static Pt(t, e, A) {
        if ("script" !== t.localName && "style" !== t.localName) for (let i, n = t.firstChild, s = 0; n; n = i) {
            if ("template" == n.localName && (n = TA(n)), i = n.nextSibling, n.nodeType === Node.TEXT_NODE) {
                let A = i;
                for (; A && A.nodeType === Node.TEXT_NODE;) n.textContent += A.textContent, i = A.nextSibling, t.removeChild(A), A = i;
                if (e.stripWhiteSpace && !n.textContent.trim()) {
                    t.removeChild(n);
                    continue
                }
            }
            let r = {parentIndex: s, parentInfo: A};
            this.Bt(n, e, r) && (r.infoIndex = e.nodeInfoList.push(r) - 1), n.parentNode && s++
        }
    }

    static Tt(t, e, A) {
        let i = this.Ct(t, e);
        return (i.content = t.content.ownerDocument.createDocumentFragment()).appendChild(t.content), A.templateInfo = i, !0
    }

    static It(t, e, A) {
        let i = !1, n = Array.from(t.attributes);
        for (let s, r = n.length - 1; s = n[r]; r--) i = this.Mt(t, e, A, s.name, s.value) || i;
        return i
    }

    static Mt(t, e, A, i, n) {
        return "on-" === i.slice(0, 3) ? (t.removeAttribute(i), A.events = A.events || [], A.events.push({
            name: i.slice(3),
            value: n
        }), !0) : "id" === i && (A.id = n, !0)
    }

    static Nt(t) {
        let e = t.St;
        return e && e.content || t.content
    }

    Ot(t) {
        t && !t.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(t);
        let e = this.constructor.Ct(t), A = e.nodeInfoList, i = e.content || t.content, n = document.importNode(i, !0);
        n.Lt = !e.hasInsertionPoint;
        let s = n.nodeList = Array(A.length);
        n.$ = {};
        for (let t, e, i = 0, r = A.length; i < r && (t = A[i]); i++) e = s[i] = PA(n, t), IA(this, n.$, e, t), NA(this, e, t), MA(this, e, t);
        return n = n, n
    }

    xt(t, e, A, i) {
        let n = OA(i = i || t, e, A);
        return this.Rt(t, e, n), n
    }

    Rt(t, e, A) {
        t.addEventListener(e, A)
    }

    Dt(t, e, A) {
        t.removeEventListener(e, A)
    }
}));
var RA = {TemplateStamp: LA};
const DA = aA;
let zA = 0;
const jA = {
    COMPUTE: "__computeEffects",
    REFLECT: "__reflectEffects",
    NOTIFY: "__notifyEffects",
    PROPAGATE: "__propagateEffects",
    OBSERVE: "__observeEffects",
    READ_ONLY: "__readOnly"
}, FA = /[A-Z]/;
let HA, UA, QA;

function $A(t, e) {
    let A = t[e];
    if (A) {
        if (!t.hasOwnProperty(e)) {
            A = t[e] = Object.create(t[e]);
            for (let t in A) {
                let e = A[t], i = A[t] = Array(e.length);
                for (let t = 0; t < e.length; t++) i[t] = e[t]
            }
        }
    } else A = t[e] = {};
    return A
}

function qA(t, e, A, i, n, s) {
    if (e) {
        let r = !1, a = zA++;
        for (let o in A) YA(t, e, a, o, A, i, n, s) && (r = !0);
        return r
    }
    return !1
}

function YA(t, e, A, i, n, s, r, a) {
    let o = !1, l = e[r ? qe(i) : i];
    if (l) for (let e, h = 0, u = l.length; h < u && (e = l[h]); h++) e.info && e.info.lastRun === A || r && !KA(i, e.trigger) || (e.info && (e.info.lastRun = A), e.fn(t, i, n, s, e.info, r, a), o = !0);
    return o
}

function KA(t, e) {
    if (e) {
        let A = e.name;
        return A == t || e.structured && Ye(A, t) || e.wildcard && Ke(A, t)
    }
    return !0
}

function VA(t, e, A, i, n) {
    let s = "string" == typeof n.method ? t[n.method] : n.method, r = n.property;
    s ? s.call(t, t.J[r], i[r]) : n.dynamicFn || console.warn("observer method `" + n.method + "` not defined")
}

function GA(t, e, A, i, n) {
    let s, r, a = t[jA.NOTIFY], o = zA++;
    for (let r in e) e[r] && (a && YA(t, a, o, r, A, i, n) || n && WA(t, r, A)) && (s = !0);
    s && (r = t.zt) && r.rt && r.rt()
}

function WA(t, e, A) {
    let i = qe(e);
    if (i !== e) {
        return JA(t, rA(i) + "-changed", A[e], e), !0
    }
    return !1
}

function JA(t, e, A, i) {
    let n = {value: A, queueProperty: !0};
    i && (n.path = i), t.dispatchEvent(new CustomEvent(e, {detail: n}))
}

function ZA(t, e, A, i, n, s) {
    let r = (s ? qe(e) : e) != e ? e : null, a = r ? Ze(t, r) : t.J[e];
    r && void 0 === a && (a = A[e]), JA(t, n.eventName, a, r)
}

function XA(t, e, A, i, n) {
    let s, r = t.detail, a = r && r.path;
    a ? (i = Ve(A, i, a), s = r && r.value) : s = t.target[A], s = n ? !s : s, e[jA.READ_ONLY] && e[jA.READ_ONLY][i] || !e.jt(i, s, !0, !!a) || r && r.queueProperty || e.rt()
}

function ti(t, e, A, i, n) {
    let s = t.J[e];
    ce && (s = ce(s, n.attrName, "attribute", t)), t.dt(e, n.attrName, s)
}

function ei(t, e, A, i) {
    let n = t[jA.COMPUTE];
    if (n) {
        let s = e;
        for (; qA(t, n, s, A, i);) Object.assign(A, t.X), Object.assign(e, t.Z), s = t.Z, t.Z = null
    }
}

function Ai(t, e, A, i, n) {
    let s = pi(t, e, A, i, n), r = n.methodInfo;
    t.H && t.H[r] ? t.st(r, s, !0) : t[r] = s
}

function ii(t, e, A) {
    let i = t.Ft;
    if (i) {
        let n;
        for (let s in i) {
            let r = i[s];
            Ke(s, e) ? (n = Ve(s, r, e), t.jt(n, A, !0, !0)) : Ke(r, e) && (n = Ve(r, s, e), t.jt(n, A, !0, !0))
        }
    }
}

function ni(t, e, A, i, n, s, r) {
    A.bindings = A.bindings || [];
    let a = {kind: i, target: n, parts: s, literal: r, isCompound: 1 !== s.length};
    if (A.bindings.push(a), li(a)) {
        let {event: t, negate: e} = a.parts[0];
        a.listenerEvent = t || DA.camelToDashCase(n) + "-changed", a.listenerNegate = e
    }
    let o = e.nodeInfoList.length;
    for (let A, i = 0; i < a.parts.length; i++) A = a.parts[i], A.compoundIndex = i, si(t, e, a, A, o)
}

function si(t, e, A, i, n) {
    if (!i.literal) if ("attribute" === A.kind && "-" === A.target[0]) console.warn("Cannot set attribute " + A.target + ' because "-" is not a valid attribute starting character'); else {
        let s = i.dependencies, r = {index: n, binding: A, part: i, evaluator: t};
        for (let A, i = 0; i < s.length; i++) A = s[i], "string" == typeof A && (A = Ni(A), A.wildcard = !0), t.Ht(e, A.rootProperty, {
            fn: ri,
            info: r,
            trigger: A
        })
    }
}

function ri(t, e, A, i, n, s, r) {
    let a = r[n.index], o = n.binding, l = n.part;
    if (s && l.source && e.length > l.source.length && "property" == o.kind && !o.isCompound && a.Ut && a.H && a.H[o.target]) {
        let i = A[e];
        e = Ve(l.source, o.target, e), a.jt(e, i, !1, !0) && t.Qt(a)
    } else {
        ai(t, a, o, l, n.evaluator.$t(t, l, e, A, i, s))
    }
}

function ai(t, e, A, i, n) {
    if (n = oi(e, n, A, i), ce && (n = ce(n, A.target, A.kind, e)), "attribute" == A.kind) t.ft(e, n, A.target); else {
        let i = A.target;
        e.Ut && e.H && e.H[i] ? e[jA.READ_ONLY] && e[jA.READ_ONLY][i] || e.st(i, n) && t.Qt(e) : t.qt(e, i, n)
    }
}

function oi(t, e, A, i) {
    if (A.isCompound) {
        let n = t.Yt[A.target];
        n[i.compoundIndex] = e, e = n.join("")
    }
    return "attribute" !== A.kind && ("textContent" !== A.target && ("value" !== A.target || "input" !== t.localName && "textarea" !== t.localName) || (e = null == e ? "" : e)), e
}

function li(t) {
    return !!t.target && "attribute" != t.kind && "text" != t.kind && !t.isCompound && "{" === t.parts[0].mode
}

function hi(t, e) {
    let {nodeList: A, nodeInfoList: i} = e;
    if (i.length) for (let e = 0; e < i.length; e++) {
        let n = i[e], s = A[e], r = n.bindings;
        if (r) for (let e, A = 0; A < r.length; A++) e = r[A], ui(s, e), ci(s, t, e);
        s.zt = t
    }
}

function ui(t, e) {
    if (e.isCompound) {
        let A = t.Yt || (t.Yt = {}), i = e.parts, n = Array(i.length);
        for (let t = 0; t < i.length; t++) n[t] = i[t].literal;
        let s = e.target;
        A[s] = n, e.literal && "property" == e.kind && (t[s] = e.literal)
    }
}

function ci(t, e, A) {
    if (A.listenerEvent) {
        let i = A.parts[0];
        t.addEventListener(A.listenerEvent, (function (t) {
            XA(t, e, A.target, i.source, i.negate)
        }))
    }
}

function di(t, e, A, i, n, s) {
    s = e.static || s && ("object" != typeof s || s[e.methodName]);
    let r = {methodName: e.methodName, args: e.args, methodInfo: n, dynamicFn: s};
    for (let n, s = 0; s < e.args.length && (n = e.args[s]); s++) n.literal || t.Kt(n.rootProperty, A, {
        fn: i,
        info: r,
        trigger: n
    });
    s && t.Kt(e.methodName, A, {fn: i, info: r})
}

function pi(t, e, A, i, n) {
    let s = t.kt || t, r = s[n.methodName];
    if (r) {
        let i = Oi(t.J, n.args, e, A);
        return r.apply(s, i)
    }
    n.dynamicFn || console.warn("method `" + n.methodName + "` not defined")
}

const fi = [], mi = "(?:[a-zA-Z_$][\\w.:$\\-*]*)", gi = "(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)",
    yi = "(?:'(?:[^'\\\\]|\\\\.)*')", vi = '(?:"(?:[^"\\\\]|\\\\.)*")', bi = "(?:" + yi + "|" + vi + ")",
    wi = "(?:(" + mi + "|" + gi + "|" + bi + ")\\s*)", _i = "(?:" + wi + "(?:,\\s*" + wi + ")*)",
    xi = "(?:\\(\\s*(?:" + _i + "?)\\)\\s*)", Si = "(" + mi + "\\s*" + xi + "?)", ki = "(\\[\\[|{{)\\s*",
    Ci = "(?:]]|}})", Ei = "(?:(!)\\s*)?", Bi = ki + Ei + Si + "(?:]]|}})", Ti = new RegExp(Bi, "g");

function Pi(t) {
    let e = "";
    for (let A, i = 0; i < t.length; i++) A = t[i].literal, e += A || "";
    return e
}

function Ii(t) {
    let e = t.match(/([^\s]+?)\(([\s\S]*)\)/);
    if (e) {
        let t = {methodName: e[1], static: !0, args: fi};
        if (e[2].trim()) {
            return Mi(e[2].replace(/\\,/g, "&comma;").split(","), t)
        }
        return t
    }
    return null
}

function Mi(t, e) {
    return e.args = t.map((function (t) {
        let A = Ni(t);
        return A.literal || (e.static = !1), A
    }), this), e
}

function Ni(t) {
    let e = t.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), A = {name: e, value: "", literal: !1}, i = e[0];
    switch ("-" === i && (i = e[1]), "0" <= i && "9" >= i && (i = "#"), i) {
        case"'":
        case'"':
            A.value = e.slice(1, -1), A.literal = !0;
            break;
        case"#":
            A.value = +e, A.literal = !0
    }
    return A.literal || (A.rootProperty = qe(e), A.structured = $e(e), A.structured && (A.wildcard = ".*" == e.slice(-2), A.wildcard && (A.name = e.slice(0, -2)))), A
}

function Oi(t, e, A, i) {
    let n = [];
    for (let s = 0, r = e.length; s < r; s++) {
        let r, a = e[s], o = a.name;
        if (a.literal ? r = a.value : a.structured ? (r = Ze(t, o), void 0 === r && (r = i[o])) : r = t[o], a.wildcard) {
            let t = 0 === o.indexOf(A + "."), e = 0 === A.indexOf(o) && !t;
            n[s] = {path: e ? A : o, value: e ? i[A] : r, base: r}
        } else n[s] = r
    }
    return n
}

function Li(t, e, A, i) {
    let n = A + ".splices";
    t.notifyPath(n, {indexSplices: i}), t.notifyPath(A + ".length", e.length), t.J[n] = {indexSplices: null}
}

function Ri(t, e, A, i, n, s) {
    Li(t, e, A, [{index: i, addedCount: n, removed: s, object: e, type: "splice"}])
}

function Di(t) {
    return t[0].toUpperCase() + t.substring(1)
}

const zi = ve((t => {
    const e = LA(CA(t));

    class A extends e {
        constructor() {
            super(), this.Ut = !0, this.Vt = 0, this.Gt, this.Wt, this.Jt, this.Ft, this.Zt, this.Yt, this.zt, this.Xt, this.te, this.J, this.Z, this.X, this.ee, this.Ae, this.ie, this.ne, this.se, this.re, this.ae
        }

        get PROPERTY_EFFECT_TYPES() {
            return jA
        }


        static addPropertyEffect(t, e, A) {
            this.prototype.Kt(t, e, A)
        }

        static createPropertyObserver(t, e, A) {
            this.prototype.ve(t, e, A)
        }

        static createMethodObserver(t, e) {
            this.prototype.be(t, e)
        }

        static createNotifyingProperty(t) {
            this.prototype.we(t)
        }

        static createReadOnlyProperty(t, e) {
            this.prototype.ye(t, e)
        }

        static createReflectedProperty(t) {
            this.prototype._e(t)
        }

        static createComputedProperty(t, e, A) {
            this.prototype.xe(t, e, A)
        }

        static bindTemplate(t) {
            return this.prototype.Se(t)
        }

        static Ht(t, e, A) {
            (t.hostProps = t.hostProps || {})[e] = !0;
            let i = t.propertyEffects = t.propertyEffects || {};
            (i[e] = i[e] || []).push(A)
        }

        static Bt(t, e, A) {
            let i = super.Bt(t, e, A);
            if (t.nodeType === Node.TEXT_NODE) {
                let n = this.Ee(t.textContent, e);
                n && (t.textContent = Pi(n) || " ", ni(this, e, A, "text", "textContent", n), i = !0)
            }
            return i
        }

        static Mt(t, e, A, i, n) {
            let s = this.Ee(n, e);
            if (s) {
                let n = i, r = "property";
                FA.test(i) ? r = "attribute" : "$" == i[i.length - 1] && (i = i.slice(0, -1), r = "attribute");
                let a = Pi(s);
                return a && "attribute" == r && t.setAttribute(i, a), "input" === t.localName && "value" === n && t.setAttribute(n, ""), t.removeAttribute(n), "property" === r && (i = sA(i)), ni(this, e, A, r, i, s, a), !0
            }
            return super.Mt(t, e, A, i, n)
        }

        static Tt(t, e, A) {
            let i = super.Tt(t, e, A), n = A.templateInfo.hostProps;
            for (let t in n) {
                ni(this, e, A, "property", "_host_" + t, [{mode: "{", source: t, dependencies: [t]}])
            }
            return i
        }


        static Ee(t, e) {
            let A, i = [], n = 0;
            for (; null !== (A = Ti.exec(t));) {
                A.index > n && i.push({literal: t.slice(n, A.index)});
                let s = A[1][0], r = !!A[2], a = A[3].trim(), o = !1, l = "", h = -1;
                "{" == s && 0 < (h = a.indexOf("::")) && (l = a.substring(h + 2), a = a.substring(0, h), o = !0);
                let u = Ii(a), c = [];
                if (u) {
                    let {args: t, methodName: A} = u;
                    for (let e, A = 0; A < t.length; A++) e = t[A], e.literal || c.push(e);
                    let i = e.dynamicFns;
                    (i && i[A] || u.static) && (c.push(A), u.dynamicFn = !0)
                } else c.push(a);
                i.push({
                    source: a,
                    mode: s,
                    negate: r,
                    customEvent: o,
                    signature: u,
                    dependencies: c,
                    event: l
                }), n = Ti.lastIndex
            }
            if (n && n < t.length) {
                let e = t.substring(n);
                e && i.push({literal: e})
            }
            return i.length ? i : null
        }

        static $t(t, e, A, i, n, s) {
            let r;
            return r = e.signature ? pi(t, A, i, n, e.signature) : A != e.source ? Ze(t, e.source) : s && $e(A) ? Ze(t, A) : t.J[A], e.negate && (r = !r), r
        }

        At() {
            super.At(), Fi.registerHost(this), this.Gt = !1, this.Wt = null, this.Jt = null, this.Ft = null, this.Zt = !1, this.Yt = this.Yt || null, this.zt = this.zt || null, this.Xt = {}, this.te = !1
        }

        vt(t) {
            this.J = Object.create(t), this.Z = Object.create(t), this.X = {}
        }

        nt(t) {
            let e = this[jA.READ_ONLY];
            for (let A in t) e && e[A] || (this.Z = this.Z || {}, this.X = this.X || {}, this.J[A] = this.Z[A] = t[A])
        }

        Kt(t, e, A) {
            this.j(t, e == jA.READ_ONLY);
            let i = $A(this, e)[t];
            i || (i = this[e][t] = []), i.push(A)
        }

        oe(t, e, A) {
            let i = $A(this, e)[t], n = i.indexOf(A);
            0 <= n && i.splice(n, 1)
        }

        le(t, e) {
            let A = this[e];
            return !(!A || !A[t])
        }

        he(t) {
            return this.le(t, jA.READ_ONLY)
        }

        ue(t) {
            return this.le(t, jA.NOTIFY)
        }

        ce(t) {
            return this.le(t, jA.REFLECT)
        }

        de(t) {
            return this.le(t, jA.COMPUTE)
        }

        jt(t, e, A, i) {
            if (i || qe(Array.isArray(t) ? t[0] : t) !== t) {
                if (!i) {
                    let A = Ze(this, t);
                    if (!(t = Xe(this, t, e)) || !super.at(t, e, A)) return !1
                }
                if (this.Zt = !0, this.st(t, e, A)) return ii(this, t, e), !0
            } else {
                if (this.H && this.H[t]) return this.st(t, e, A);
                this[t] = e
            }
            return !1
        }

        qt(t, e, A) {
            A === t[e] && "object" != typeof A || (t[e] = A)
        }

        st(t, e, A) {
            let i = this.Zt && $e(t), n = i ? this.Xt : this.J;
            return !!this.at(t, e, n[t]) && (this.Z || (this.Z = {}, this.X = {}), t in this.X || (this.X[t] = this.J[t]), i ? this.Xt[t] = e : this.J[t] = e, this.Z[t] = e, (i || this[jA.NOTIFY] && this[jA.NOTIFY][t]) && (this.Jt = this.Jt || {}, this.Jt[t] = A), !0)
        }


        K(t, e) {
            this.st(t, e, !0) && this.rt()
        }

        rt() {
            this.G && this.it()
        }

        Qt(t) {
            this.Wt = this.Wt || [], t !== this && this.Wt.push(t)
        }

        it() {
            this.Vt++, super.it(), this.Vt--
        }

        pe() {
            this.Gt ? this.fe() : (this.Gt = !0, this.me(), this.G = !0)
        }

        fe() {
            let t = this.Wt;
            if (t) {
                this.Wt = null;
                for (let e, A = 0; A < t.length; A++) e = t[A], e.V ? e.Z && e.it() : e.ot()
            }
        }

        me() {
            this.fe()
        }

        setProperties(t, e) {
            for (let A in t) !e && this[jA.READ_ONLY] && this[jA.READ_ONLY][A] || this.jt(A, t[A], !0);
            this.rt()
        }

        ready() {
            this.it(), this.Gt || this.pe(), this.Z && this.it()
        }

        ht(t, e, A) {
            let i = this.Zt;
            this.Zt = !1, ei(this, e, A, i);
            let n = this.Jt;
            this.Jt = null, this.ge(e, A, i), this.pe(), qA(this, this[jA.REFLECT], e, A, i), qA(this, this[jA.OBSERVE], e, A, i), n && GA(this, n, e, A, i), 1 == this.Vt && (this.Xt = {})
        }

        ge(t, e, A) {
            this[jA.PROPAGATE] && qA(this, this[jA.PROPAGATE], t, e, A);
            let i = this.ae;
            for (; i;) qA(this, i.propertyEffects, t, e, A, i.nodeList), i = i.nextTemplateInfo
        }

        linkPaths(t, e) {
            t = We(t), e = We(e), this.Ft = this.Ft || {}, this.Ft[t] = e
        }

        unlinkPaths(t) {
            t = We(t), this.Ft && delete this.Ft[t]
        }

        notifySplices(t, e) {
            let A = {path: ""};
            Li(this, Ze(this, t, A), A.path, e)
        }

        get(t, e) {
            return Ze(e || this, t)
        }

        set(t, e, A) {
            A ? Xe(A, t, e) : this[jA.READ_ONLY] && this[jA.READ_ONLY][t] || this.jt(t, e, !0) && this.rt()
        }

        push(t, ...e) {
            let A = {path: ""}, i = Ze(this, t, A), n = i.length, s = i.push(...e);
            return e.length && Ri(this, i, A.path, n, e.length, []), s
        }

        pop(t) {
            let e = {path: ""}, A = Ze(this, t, e), i = !!A.length, n = A.pop();
            return i && Ri(this, A, e.path, A.length, 0, [n]), n
        }

        splice(t, e, A, ...i) {
            let n, s = {path: ""}, r = Ze(this, t, s);
            return 0 > e ? e = r.length - Math.floor(-e) : e && (e = Math.floor(e)), n = 2 === arguments.length ? r.splice(e) : r.splice(e, A, ...i), (i.length || n.length) && Ri(this, r, s.path, e, i.length, n), n
        }

        shift(t) {
            let e = {path: ""}, A = Ze(this, t, e), i = !!A.length, n = A.shift();
            return i && Ri(this, A, e.path, 0, 0, [n]), n
        }

        unshift(t, ...e) {
            let A = {path: ""}, i = Ze(this, t, A), n = i.unshift(...e);
            return e.length && Ri(this, i, A.path, 0, e.length, []), n
        }

        notifyPath(t, e) {
            let A;
            if (1 == arguments.length) {
                let i = {path: ""};
                e = Ze(this, t, i), A = i.path
            } else A = Array.isArray(t) ? We(t) : t;
            this.jt(A, e, !0, !0) && this.rt()
        }

        ye(t, e) {
            this.Kt(t, jA.READ_ONLY), e && (this["_set" + Di(t)] = function (e) {
                this.K(t, e)
            })
        }

        ve(t, e, A) {
            let i = {property: t, method: e, dynamicFn: !!A};
            this.Kt(t, jA.OBSERVE, {fn: VA, info: i, trigger: {name: t}}), A && this.Kt(e, jA.OBSERVE, {
                fn: VA,
                info: i,
                trigger: {name: e}
            })
        }


        be(t, e) {
            let A = Ii(t);
            if (!A) throw new Error("Malformed observer expression '" + t + "'");
            di(this, A, jA.OBSERVE, pi, null, e)
        }

        we(t) {
            this.Kt(t, jA.NOTIFY, {fn: ZA, info: {eventName: DA.camelToDashCase(t) + "-changed", property: t}})
        }

        _e(t) {
            let e = this.constructor.attributeNameForProperty(t);
            "-" === e[0] ? console.warn("Property " + t + " cannot be reflected to attribute " + e + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.') : this.Kt(t, jA.REFLECT, {
                fn: ti,
                info: {attrName: e}
            })
        }

        xe(t, e, A) {
            let i = Ii(e);
            if (!i) throw new Error("Malformed computed expression '" + e + "'");
            di(this, i, jA.COMPUTE, Ai, t, A)
        }

        Se(t, e) {
            let A = this.constructor.Ct(t), i = this.ae == A;
            if (!i) for (let t in A.propertyEffects) this.j(t);
            if (e && (A = Object.create(A), A.wasPreBound = i, !i && this.ae)) {
                let t = this.ke || this.ae;
                return this.ke = t.nextTemplateInfo = A, A.previousTemplateInfo = t, A
            }
            return this.ae = A
        }

        Ot(t) {
            Fi.beginHosting(this);
            let e = super.Ot(t);
            Fi.endHosting(this);
            let A = this.Se(t, !0);
            if (A.nodeList = e.nodeList, !A.wasPreBound) {
                let t = A.childNodes = [];
                for (let A = e.firstChild; A; A = A.nextSibling) t.push(A)
            }
            return e.templateInfo = A, hi(this, A), this.G && qA(this, A.propertyEffects, this.J, null, !1, A.nodeList), e
        }

        Ce(t) {
            let e = t.templateInfo;
            e.previousTemplateInfo && (e.previousTemplateInfo.nextTemplateInfo = e.nextTemplateInfo), e.nextTemplateInfo && (e.nextTemplateInfo.previousTemplateInfo = e.previousTemplateInfo), this.ke == e && (this.ke = e.previousTemplateInfo), e.previousTemplateInfo = e.nextTemplateInfo = null;
            let A = e.childNodes;
            for (let t, e = 0; e < A.length; e++) t = A[e], t.parentNode.removeChild(t)
        }
    }

    return QA = A, A
}));

class ji {
    constructor() {
        this.stack = []
    }

    registerHost(t) {
        if (this.stack.length) {
            this.stack[this.stack.length - 1].Qt(t)
        }
    }

    beginHosting(t) {
        this.stack.push(t)
    }

    endHosting(t) {
        let e = this.stack.length;
        e && this.stack[e - 1] == t && this.stack.pop()
    }
}

const Fi = new ji;
var Hi = {PropertyEffects: zi};

function Ui(t) {
    const e = {};
    for (let A in t) {
        const i = t[A];
        e[A] = "function" == typeof i ? {type: i} : i
    }
    return e
}

const Qi = ve((t => {
    const e = bA(t);

    function A(t) {
        const e = Object.getPrototypeOf(t);
        return e.prototype instanceof n ? e : null
    }

    function i(t) {
        if (!t.hasOwnProperty(JSCompiler_renameProperty("__ownProperties", t))) {
            let e = null;
            t.hasOwnProperty(JSCompiler_renameProperty("properties", t)) && t.properties && (e = Ui(t.properties)), t.Be = e
        }
        return t.Be
    }

    class n extends e {
        static get observedAttributes() {
            const t = this.Te;
            return t ? Object.keys(t).map((t => this.attributeNameForProperty(t))) : []
        }

        static get Te() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("__properties", this))) {
                const t = A(this);
                this.Me = Object.assign({}, t && t.Te, i(this))
            }
            return this.Me
        }

        static finalize() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("__finalized", this))) {
                const t = A(this);
                t && t.finalize(), this.Pe = !0, this.Ie()
            }
        }

        static Ie() {
            const t = i(this);
            t && this.createProperties(t)
        }

        static typeForProperty(t) {
            const e = this.Te[t];
            return e && e.type
        }

        At() {
            this.constructor.finalize(), super.At()
        }

        connectedCallback() {
            super.connectedCallback && super.connectedCallback(), this.ot()
        }

        disconnectedCallback() {
            super.disconnectedCallback && super.disconnectedCallback()
        }
    }

    return n
}));
var $i = {PropertiesMixin: Qi};
const qi = ve((t => {
    const e = Qi(zi(t));

    function A(t, e, A, i) {
        A.computed && (A.readOnly = !0), A.computed && !t.he(e) && t.xe(e, A.computed, i), A.readOnly && !t.he(e) && t.ye(e, !A.computed), A.reflectToAttribute && !t.ce(e) && t._e(e), A.notify && !t.ue(e) && t.we(e), A.observer && t.ve(e, A.observer, i[A.observer]), t.F(e)
    }

    return class extends e {


        constructor() {
            super(), this.Oe, this.Le, this.rootPath, this.importPath, this.root, this.$
        }

        static get template() {
            return this.hasOwnProperty(JSCompiler_renameProperty("_template", this)) || (this.Oe = Ue && Ue.import(this.is, "template") || Object.getPrototypeOf(this.prototype).constructor.template), this.Oe
        }

        static get importPath() {
            if (!this.hasOwnProperty(JSCompiler_renameProperty("_importPath", this))) {
                const t = this.importMeta;
                if (t) this.Le = se(t.url); else {
                    const t = Ue && Ue.import(this.is);
                    this.Le = t && t.assetpath || Object.getPrototypeOf(this.prototype).constructor.importPath
                }
            }
            return this.Le
        }

        static Ie() {
            super.Ie(), this.hasOwnProperty(JSCompiler_renameProperty("is", this)) && this.is && Gi(this.prototype);
            const t = ((e = this).hasOwnProperty(JSCompiler_renameProperty("__ownObservers", e)) || (e.Ne = e.hasOwnProperty(JSCompiler_renameProperty("observers", e)) ? e.observers : null), e.Ne);
            var e;
            t && this.createObservers(t, this.Te);
            let A = this.template;
            A && ("string" == typeof A ? (console.error("template getter must return HTMLTemplateElement"), A = null) : A = A.cloneNode(!0)), this.prototype.Oe = A
        }

        static createProperties(t) {
            for (let e in t) A(this.prototype, e, t[e], t)
        }

        static createObservers(t, e) {
            const A = this.prototype;
            for (let i = 0; i < t.length; i++) A.be(t[i], e)
        }

        static ze(t, e) {
            return ne(t, e)
        }

        static Re(t) {
            const e = this.prototype.Oe;
            if (e && !e.je) {
                e.je = !0;
                const A = this.importPath;
                !function (t, e, A, i) {
                    const n = e.content.querySelectorAll("style"), s = Te(e), r = Pe(A),
                        a = e.content.firstElementChild;
                    for (let A, n = 0; n < r.length; n++) A = r[n], A.textContent = t.ze(A.textContent, i), e.content.insertBefore(A, a);
                    let o = 0;
                    for (let e = 0; e < s.length; e++) {
                        let A = s[e], r = n[o];
                        r !== A ? (A = A.cloneNode(!0), r.parentNode.insertBefore(A, r)) : o++, A.textContent = t.ze(A.textContent, i)
                    }
                    window.ShadyCSS && window.ShadyCSS.prepareTemplate(e, A)
                }(this, e, t, A ? ie(A) : ""), this.prototype.Se(e)
            }
        }

        static Et(t, e, A) {
            return e.dynamicFns = e.dynamicFns || this.Te, super.Et(t, e, A)
        }

        At() {
            Yi++, this.constructor.finalize(), this.constructor.Re(this.localName), super.At(), this.rootPath = he, this.importPath = this.constructor.importPath;
            let t = function (t) {
                if (!t.hasOwnProperty(JSCompiler_renameProperty("__propertyDefaults", t))) {
                    t.De = null;
                    let e = t.Te;
                    for (let A in e) {
                        let i = e[A];
                        "value" in i && (t.De = t.De || {}, t.De[A] = i)
                    }
                }
                return t.De
            }(this.constructor);
            if (t) for (let e in t) {
                let A = t[e];
                if (!this.hasOwnProperty(e)) {
                    let t = "function" == typeof A.value ? A.value.call(this) : A.value;
                    this.wt(e) ? this.st(e, t, !0) : this[e] = t
                }
            }
        }

        connectedCallback() {
            window.ShadyCSS && this.Oe && window.ShadyCSS.styleElement(this), super.connectedCallback()
        }

        ready() {
            this.Oe && (this.root = this.Ot(this.Oe), this.$ = this.root.$), super.ready()
        }

        me() {
            this.Oe && (this.root = this.Fe(this.root)), super.me()
        }

        Fe(t) {
            if (this.attachShadow) return t ? (this.shadowRoot || this.attachShadow({mode: "open"}), this.shadowRoot.appendChild(t), this.shadowRoot) : null;
            throw new Error("ShadowDOM not available. PolymerElement can create dom as children instead of in ShadowDOM by setting `this.root = this;` before `ready`.")
        }

        updateStyles(t) {
            window.ShadyCSS && window.ShadyCSS.styleSubtree(this, t)
        }

        resolveUrl(t, e) {
            return !e && this.importPath && (e = ie(this.importPath)), ie(t, e)
        }
    }
}));
let Yi = 0;
const Ki = [];

function Vi(t) {
    console.log("[" + t.is + "]: registered")
}

function Gi(t) {
    Ki.push(t)
}

function Wi() {
    Ki.forEach(Vi)
}

const Ji = function (t) {
    window.ShadyCSS && window.ShadyCSS.styleDocument(t)
};
var Zi = {
    ElementMixin: qi, get instanceCount() {
        return Yi
    }, registrations: Ki, register: Gi, dumpRegistrations: Wi, updateStyles: Ji
};
const Xi = class t {
    constructor() {
        this.He = null, this.Ue = null, this.Qe = null
    }

    static debounce(e, A, i) {
        return e instanceof t ? e.cancel() : e = new t, e.setConfig(A, i), e
    }

    setConfig(t, e) {
        this.He = t, this.Ue = e, this.Qe = this.He.run((() => {
            this.Qe = null, this.Ue()
        }))
    }

    cancel() {
        this.isActive() && (this.He.cancel(this.Qe), this.Qe = null)
    }

    flush() {
        this.isActive() && (this.cancel(), this.Ue())
    }

    isActive() {
        return null != this.Qe
    }
};
var tn = {Debouncer: Xi};
let en = "string" == typeof document.head.style.touchAction, An = "__polymerGestures", nn = "__polymerGesturesHandled",
    sn = "__polymerGesturesTouchAction", rn = 25, an = 5, on = 2, ln = 2500,
    hn = ["mousedown", "mousemove", "mouseup", "click"], un = [0, 1, 4, 2], cn = function () {
        try {
            return 1 === new MouseEvent("test", {buttons: 1}).buttons
        } catch (t) {
            return !1
        }
    }();

function dn(t) {
    return -1 < hn.indexOf(t)
}

let pn = !1;

function fn(t) {
    if (!dn(t) && "touchend" !== t) return en && pn && pe ? {passive: !0} : void 0
}

!function () {
    try {
        let t = Object.defineProperty({}, "passive", {
            get() {
                pn = !0
            }
        });
        window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
    } catch (t) {
    }
}();
let mn = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
const gn = function () {
};
gn.prototype.state, gn.prototype.started, gn.prototype.moves, gn.prototype.x, gn.prototype.y, gn.prototype.prevent, gn.prototype.addMove, gn.prototype.movefn, gn.prototype.upFn;
const yn = function () {
};
yn.prototype.reset, yn.prototype.mousedown, yn.prototype.mousemove, yn.prototype.mouseup, yn.prototype.touchstart, yn.prototype.touchmove, yn.prototype.touchend, yn.prototype.click, yn.prototype.info, yn.prototype.emits;
const vn = [], bn = {button: !0, input: !0, keygen: !0, meter: !0, output: !0, textarea: !0, progress: !0, select: !0},
    wn = {
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

function _n(t) {
    return bn[t.localName] || !1
}

function xn(t) {
    let e = Array.prototype.slice.call(t.labels || []);
    if (!e.length) {
        e = [];
        let A = t.getRootNode();
        if (t.id) {
            let i = A.querySelectorAll(`label[for = ${t.id}]`);
            for (let t = 0; t < i.length; t++) e.push(i[t])
        }
    }
    return e
}

let Sn = function (t) {
    let e = t.sourceCapabilities;
    if ((!e || e.firesTouchEvents) && (t[nn] = {skip: !0}, "click" === t.type)) {
        let e = !1, A = t.composedPath && t.composedPath();
        if (A) for (let t = 0; t < A.length; t++) {
            if (A[t].nodeType === Node.ELEMENT_NODE) if ("label" === A[t].localName) vn.push(A[t]); else if (_n(A[t])) {
                let i = xn(A[t]);
                for (let t = 0; t < i.length; t++) e = e || -1 < vn.indexOf(i[t])
            }
            if (A[t] === Tn.mouse.target) return
        }
        if (e) return;
        t.preventDefault(), t.stopPropagation()
    }
};

function kn(t) {
    let e = mn ? ["click"] : hn;
    for (let A, i = 0; i < e.length; i++) A = e[i], t ? (vn.length = 0, document.addEventListener(A, Sn, !0)) : document.removeEventListener(A, Sn, !0)
}

function Cn(t) {
    Tn.mouse.mouseIgnoreJob || kn(!0);
    Tn.mouse.target = t.composedPath()[0], Tn.mouse.mouseIgnoreJob = Xi.debounce(Tn.mouse.mouseIgnoreJob, pA.after(ln), (function () {
        kn(), Tn.mouse.target = null, Tn.mouse.mouseIgnoreJob = null
    }))
}

function En(t) {
    let e = t.type;
    if (!dn(e)) return !1;
    if ("mousemove" === e) {
        let e = void 0 === t.buttons ? 1 : t.buttons;
        return t instanceof window.MouseEvent && !cn && (e = un[t.which] || 0), !!(1 & e)
    }
    return 0 === (void 0 === t.button ? 0 : t.button)
}

function Bn(t) {
    if ("click" === t.type) {
        if (0 === t.detail) return !0;
        let e = Rn(t);
        if (!e.nodeType || e.nodeType !== Node.ELEMENT_NODE) return !0;
        let A = e.getBoundingClientRect(), i = t.pageX, n = t.pageY;
        return !(i >= A.left && i <= A.right && n >= A.top && n <= A.bottom)
    }
    return !1
}

let Tn = {mouse: {target: null, mouseIgnoreJob: null}, touch: {x: 0, y: 0, id: -1, scrollDecided: !1}};

function Pn(t) {
    let e = "auto", A = t.composedPath && t.composedPath();
    if (A) for (let t, i = 0; i < A.length; i++) if (t = A[i], t[sn]) {
        e = t[sn];
        break
    }
    return e
}

function In(t, e, A) {
    t.movefn = e, t.upfn = A, document.addEventListener("mousemove", e), document.addEventListener("mouseup", A)
}

function Mn(t) {
    document.removeEventListener("mousemove", t.movefn), document.removeEventListener("mouseup", t.upfn), t.movefn = null, t.upfn = null
}

document.addEventListener("touchend", Cn, !!pn && {passive: !0});
const Nn = {}, On = [];

function Ln(t, e) {
    let A = document.elementFromPoint(t, e), i = A;
    for (; i && i.shadowRoot && !window.ShadyDOM;) {
        let n = i;
        if (i = i.shadowRoot.elementFromPoint(t, e), n === i) break;
        i && (A = i)
    }
    return A
}

function Rn(t) {
    if (t.composedPath) {
        const e = t.composedPath();
        return 0 < e.length ? e[0] : t.target
    }
    return t.target
}

function Dn(t) {
    let e, A = t.type, i = t.currentTarget[An];
    if (!i) return;
    let n = i[A];
    if (n) {
        if (!t[nn] && (t[nn] = {}, "touch" === A.slice(0, 5))) {
            let e = (t = t).changedTouches[0];
            if ("touchstart" === A && 1 === t.touches.length && (Tn.touch.id = e.identifier), Tn.touch.id !== e.identifier) return;
            en || "touchstart" !== A && "touchmove" !== A || zn(t)
        }
        if (e = t[nn], !e.skip) {
            for (let A, i = 0; i < On.length; i++) A = On[i], n[A.name] && !e[A.name] && A.flow && -1 < A.flow.start.indexOf(t.type) && A.reset && A.reset();
            for (let i, s = 0; s < On.length; s++) i = On[s], n[i.name] && !e[i.name] && (e[i.name] = !0, i[A](t))
        }
    }
}

function zn(t) {
    let e = t.changedTouches[0], A = t.type;
    if ("touchstart" === A) Tn.touch.x = e.clientX, Tn.touch.y = e.clientY, Tn.touch.scrollDecided = !1; else if ("touchmove" === A) {
        if (Tn.touch.scrollDecided) return;
        Tn.touch.scrollDecided = !0;
        let A = Pn(t), i = !1, n = Math.abs(Tn.touch.x - e.clientX), s = Math.abs(Tn.touch.y - e.clientY);
        t.cancelable && ("none" === A ? i = !0 : "pan-x" === A ? i = s > n : "pan-y" === A && (i = n > s)), i ? t.preventDefault() : Kn("track")
    }
}

function jn(t, e, A) {
    return !!Nn[e] && (Hn(t, e, A), !0)
}

function Fn(t, e, A) {
    return !!Nn[e] && (Un(t, e, A), !0)
}

function Hn(t, e, A) {
    let i = Nn[e], n = i.deps, s = i.name, r = t[An];
    r || (t[An] = r = {});
    for (let e, A, i = 0; i < n.length; i++) e = n[i], mn && dn(e) && "click" !== e || (A = r[e], A || (r[e] = A = {$e: 0}), 0 === A.$e && t.addEventListener(e, Dn, fn(e)), A[s] = (A[s] || 0) + 1, A.$e = (A.$e || 0) + 1);
    t.addEventListener(e, A), i.touchAction && qn(t, i.touchAction)
}

function Un(t, e, A) {
    let i = Nn[e], n = i.deps, s = i.name, r = t[An];
    if (r) for (let e, A, i = 0; i < n.length; i++) e = n[i], A = r[e], A && A[s] && (A[s] = (A[s] || 1) - 1, A.$e = (A.$e || 1) - 1, 0 === A.$e && t.removeEventListener(e, Dn, fn(e)));
    t.removeEventListener(e, A)
}

function Qn(t) {
    On.push(t);
    for (let e = 0; e < t.emits.length; e++) Nn[t.emits[e]] = t
}

function $n(t) {
    for (let e, A = 0; A < On.length; A++) {
        e = On[A];
        for (let A, i = 0; i < e.emits.length; i++) if (A = e.emits[i], A === t) return e
    }
    return null
}

function qn(t, e) {
    en && gA.run((() => {
        t.style.touchAction = e
    })), t[sn] = e
}

function Yn(t, e, A) {
    let i = new Event(e, {bubbles: !0, cancelable: !0, composed: !0});
    if (i.detail = A, t.dispatchEvent(i), i.defaultPrevented) {
        let t = A.preventer || A.sourceEvent;
        t && t.preventDefault && t.preventDefault()
    }
}

function Kn(t) {
    let e = $n(t);
    e.info && (e.info.prevent = !0)
}

function Vn() {
    Tn.mouse.mouseIgnoreJob && Tn.mouse.mouseIgnoreJob.flush()
}

function Gn(t, e, A, i) {
    e && Yn(e, t, {
        x: A.clientX, y: A.clientY, sourceEvent: A, preventer: i, prevent: function (t) {
            return Kn(t)
        }
    })
}

function Wn(t, e, A) {
    if (t.prevent) return !1;
    if (t.started) return !0;
    let i = Math.abs(t.x - e), n = Math.abs(t.y - A);
    return i >= an || n >= an
}

function Jn(t, e, A) {
    if (!e) return;
    let i, n = t.moves[t.moves.length - 2], s = t.moves[t.moves.length - 1], r = s.x - t.x, a = s.y - t.y, o = 0;
    n && (i = s.x - n.x, o = s.y - n.y), Yn(e, "track", {
        state: t.state,
        x: A.clientX,
        y: A.clientY,
        dx: r,
        dy: a,
        ddx: i,
        ddy: o,
        sourceEvent: A,
        hover: function () {
            return Ln(A.clientX, A.clientY)
        }
    })
}

function Zn(t, e, A) {
    let i = Math.abs(e.clientX - t.x), n = Math.abs(e.clientY - t.y), s = Rn(A || e);
    !s || wn[s.localName] && s.hasAttribute("disabled") || (isNaN(i) || isNaN(n) || i <= rn && n <= rn || Bn(e)) && (t.prevent || Yn(s, "tap", {
        x: e.clientX,
        y: e.clientY,
        sourceEvent: e,
        preventer: A
    }))
}

Qn({
    name: "downup",
    deps: ["mousedown", "touchstart", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"]},
    emits: ["down", "up"],
    info: {movefn: null, upfn: null},
    reset: function () {
        Mn(this.info)
    },
    mousedown: function (t) {
        if (!En(t)) return;
        let e = Rn(t), A = this;
        In(this.info, (function (t) {
            En(t) || (Gn("up", e, t), Mn(A.info))
        }), (function (t) {
            En(t) && Gn("up", e, t), Mn(A.info)
        })), Gn("down", e, t)
    },
    touchstart: function (t) {
        Gn("down", Rn(t), t.changedTouches[0], t)
    },
    touchend: function (t) {
        Gn("up", Rn(t), t.changedTouches[0], t)
    }
}), Qn({
    name: "track",
    touchAction: "none",
    deps: ["mousedown", "touchstart", "touchmove", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["mouseup", "touchend"]},
    emits: ["track"],
    info: {
        x: 0, y: 0, state: "start", started: !1, moves: [], addMove: function (t) {
            this.moves.length > on && this.moves.shift(), this.moves.push(t)
        }, movefn: null, upfn: null, prevent: !1
    },
    reset: function () {
        this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, this.info.y = 0, this.info.prevent = !1, Mn(this.info)
    },
    mousedown: function (t) {
        if (!En(t)) return;
        let e = Rn(t), A = this, i = function (t) {
            let i = t.clientX, n = t.clientY;
            Wn(A.info, i, n) && (A.info.state = A.info.started ? "mouseup" === t.type ? "end" : "track" : "start", "start" === A.info.state && Kn("tap"), A.info.addMove({
                x: i,
                y: n
            }), En(t) || (A.info.state = "end", Mn(A.info)), e && Jn(A.info, e, t), A.info.started = !0)
        };
        In(this.info, i, (function (t) {
            A.info.started && i(t), Mn(A.info)
        })), this.info.x = t.clientX, this.info.y = t.clientY
    },
    touchstart: function (t) {
        let e = t.changedTouches[0];
        this.info.x = e.clientX, this.info.y = e.clientY
    },
    touchmove: function (t) {
        let e = Rn(t), A = t.changedTouches[0], i = A.clientX, n = A.clientY;
        Wn(this.info, i, n) && ("start" === this.info.state && Kn("tap"), this.info.addMove({
            x: i,
            y: n
        }), Jn(this.info, e, A), this.info.state = "track", this.info.started = !0)
    },
    touchend: function (t) {
        let e = Rn(t), A = t.changedTouches[0];
        this.info.started && (this.info.state = "end", this.info.addMove({
            x: A.clientX,
            y: A.clientY
        }), Jn(this.info, e, A))
    }
}), Qn({
    name: "tap",
    deps: ["mousedown", "click", "touchstart", "touchend"],
    flow: {start: ["mousedown", "touchstart"], end: ["click", "touchend"]},
    emits: ["tap"],
    info: {x: NaN, y: NaN, prevent: !1},
    reset: function () {
        this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1
    },
    mousedown: function (t) {
        En(t) && (this.info.x = t.clientX, this.info.y = t.clientY)
    },
    click: function (t) {
        En(t) && Zn(this.info, t)
    },
    touchstart: function (t) {
        const e = t.changedTouches[0];
        this.info.x = e.clientX, this.info.y = e.clientY
    },
    touchend: function (t) {
        Zn(this.info, t.changedTouches[0], t)
    }
});
const Xn = Rn, ts = jn, es = Fn;
var As = {
    gestures: Nn,
    recognizers: On,
    deepTargetFind: Ln,
    addListener: jn,
    removeListener: Fn,
    register: Qn,
    setTouchAction: qn,
    prevent: Kn,
    resetMouseCanceller: Vn,
    findOriginalTarget: Xn,
    add: ts,
    remove: es
};
const is = As, ns = ve((t => class extends t {
    Rt(t, e, A) {
        is.addListener(t, e, A) || super.Rt(t, e, A)
    }

    Dt(t, e, A) {
        is.removeListener(t, e, A) || super.Dt(t, e, A)
    }
}));
var ss = {GestureEventListeners: ns};
const rs = /:host\(:dir\((ltr|rtl)\)\)/g, as = ':host([dir="$1"])', os = /([\s\w-#\.\[\]\*]*):dir\((ltr|rtl)\)/g,
    ls = ':host([dir="$2"]) $1', hs = [];
let us = null, cs = "";

function ds() {
    cs = document.documentElement.getAttribute("dir")
}

function ps(t) {
    if (!t.qe) {
        t.setAttribute("dir", cs)
    }
}

function fs() {
    ds(), cs = document.documentElement.getAttribute("dir");
    for (let t = 0; t < hs.length; t++) ps(hs[t])
}

function ms() {
    us && us.takeRecords().length && fs()
}

const gs = ve((t => {
    us || (ds(), us = new MutationObserver(fs), us.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["dir"]
    }));
    const e = CA(t);

    class A extends e {
        constructor() {
            super(), this.qe = !1
        }

        static ze(t, e) {
            return t = super.ze(t, e), t = this.Ye(t)
        }

        static Ye(t) {
            let e = t;
            return e = e.replace(rs, ':host([dir="$1"])'), e = e.replace(os, ls), t !== e && (this.Ke = !0), e
        }

        ready() {
            super.ready(), this.qe = this.hasAttribute("dir")
        }

        connectedCallback() {
            e.prototype.connectedCallback && super.connectedCallback(), this.constructor.Ke && (ms(), hs.push(this), ps(this))
        }

        disconnectedCallback() {
            if (e.prototype.disconnectedCallback && super.disconnectedCallback(), this.constructor.Ke) {
                const t = hs.indexOf(this);
                -1 < t && hs.splice(t, 1)
            }
        }
    }

    return A.Ke = !1, A
}));
var ys = {DirMixin: gs};
let vs = !1, bs = [], ws = [];

function _s() {
    vs = !0, requestAnimationFrame((function () {
        vs = !1, xs(bs), setTimeout((function () {
            Ss(ws)
        }))
    }))
}

function xs(t) {
    for (; t.length;) ks(t.shift())
}

function Ss(t) {
    for (let e = 0, A = t.length; e < A; e++) ks(t.shift())
}

function ks(t) {
    const e = t[0], A = t[1], i = t[2];
    try {
        A.apply(e, i)
    } catch (t) {
        setTimeout((() => {
            throw t
        }))
    }
}

function Cs() {
    for (; bs.length || ws.length;) xs(bs), xs(ws);
    vs = !1
}

function Es(t, e, A) {
    vs || _s(), bs.push([t, e, A])
}

function Bs(t, e, A) {
    vs || _s(), ws.push([t, e, A])
}

var Ts = {beforeNextRender: Es, afterNextRender: Bs, flush: Cs};

function Ps() {
    document.body.removeAttribute("unresolved")
}

function Is(t, e, A) {
    return {index: t, removed: e, addedCount: A}
}

"interactive" === document.readyState || "complete" === document.readyState ? Ps() : window.addEventListener("DOMContentLoaded", Ps);
const Ms = 0, Ns = 1, Os = 2, Ls = 3;

function Rs(t, e, A, i, n, s) {
    let r = s - n + 1, a = A - e + 1, o = Array(r);
    for (let t = 0; t < r; t++) o[t] = Array(a), o[t][0] = t;
    for (let t = 0; t < a; t++) o[0][t] = t;
    for (let A = 1; A < r; A++) for (let s = 1; s < a; s++) if (Us(t[e + s - 1], i[n + A - 1])) o[A][s] = o[A - 1][s - 1]; else {
        let t = o[A - 1][s] + 1, e = o[A][s - 1] + 1;
        o[A][s] = t < e ? t : e
    }
    return o
}

function Ds(t) {
    let e = t.length - 1, A = t[0].length - 1, i = t[e][A], n = [];
    for (; 0 < e || 0 < A;) {
        if (0 == e) {
            n.push(2), A--;
            continue
        }
        if (0 == A) {
            n.push(3), e--;
            continue
        }
        let s, r = t[e - 1][A - 1], a = t[e - 1][A], o = t[e][A - 1];
        s = a < o ? a < r ? a : r : o < r ? o : r, s == r ? (r == i ? n.push(0) : (n.push(1), i = r), e--, A--) : s == a ? (n.push(3), e--, i = a) : (n.push(2), A--, i = o)
    }
    return n.reverse(), n
}

function zs(t, e, A, i, n, s) {
    let r, a = 0, o = 0, l = Math.min(A - e, s - n);
    if (0 == e && 0 == n && (a = js(t, i, l)), A == t.length && s == i.length && (o = Fs(t, i, l - a)), n += a, s -= o, 0 == (A -= o) - (e += a) && 0 == s - n) return [];
    if (e == A) {
        for (r = Is(e, [], 0); n < s;) r.removed.push(i[n++]);
        return [r]
    }
    if (n == s) return [Is(e, [], A - e)];
    let h = Ds(Rs(t, e, A, i, n, s));
    r = void 0;
    let u = [], c = e, d = n;
    for (let t = 0; t < h.length; t++) switch (h[t]) {
        case 0:
            r && (u.push(r), r = void 0), c++, d++;
            break;
        case 1:
            r || (r = Is(c, [], 0)), r.addedCount++, c++, r.removed.push(i[d]), d++;
            break;
        case 2:
            r || (r = Is(c, [], 0)), r.addedCount++, c++;
            break;
        case 3:
            r || (r = Is(c, [], 0)), r.removed.push(i[d]), d++
    }
    return r && u.push(r), u
}

function js(t, e, A) {
    for (let i = 0; i < A; i++) if (!Us(t[i], e[i])) return i;
    return A
}

function Fs(t, e, A) {
    let i = t.length, n = e.length, s = 0;
    for (; s < A && Us(t[--i], e[--n]);) s++;
    return s
}

function Hs(t, e) {
    return zs(t, 0, t.length, e, 0, e.length)
}

function Us(t, e) {
    return t === e
}

var Qs = {calculateSplices: Hs};

function $s(t) {
    return "slot" === t.localName
}

class qs {
    constructor(t, e) {
        this.Ve = null, this.Ge = null, this.We = !1, this.Je = t, this.callback = e, this.Ze = [], this.Xe = null, this.tA = !1, this.eA = () => {
            this.AA()
        }, this.connect(), this.AA()
    }

    static getFlattenedNodes(t) {
        return $s(t) ? (t = t).assignedNodes({flatten: !0}) : Array.from(t.childNodes).map((t => $s(t) ? (t = t).assignedNodes({flatten: !0}) : [t])).reduce(((t, e) => t.concat(e)), [])
    }

    connect() {
        $s(this.Je) ? this.iA([this.Je]) : this.Je.children && (this.iA(this.Je.children), window.ShadyDOM ? this.Ve = ShadyDOM.observeChildren(this.Je, (t => {
            this.nA(t)
        })) : (this.Ge = new MutationObserver((t => {
            this.nA(t)
        })), this.Ge.observe(this.Je, {childList: !0}))), this.We = !0
    }

    disconnect() {
        $s(this.Je) ? this.sA([this.Je]) : this.Je.children && (this.sA(this.Je.children), window.ShadyDOM && this.Ve ? (ShadyDOM.unobserveChildren(this.Ve), this.Ve = null) : this.Ge && (this.Ge.disconnect(), this.Ge = null)), this.We = !1
    }

    AA() {
        this.tA || (this.tA = !0, gA.run((() => this.flush())))
    }

    nA(t) {
        this.rA(t), this.flush()
    }

    rA(t) {
        if (t) for (let e, A = 0; A < t.length; A++) e = t[A], e.addedNodes && this.iA(e.addedNodes), e.removedNodes && this.sA(e.removedNodes)
    }

    flush() {
        if (!this.We) return !1;
        window.ShadyDOM && ShadyDOM.flush(), this.Ge ? this.rA(this.Ge.takeRecords()) : this.Ve && this.rA(this.Ve.takeRecords()), this.tA = !1;
        let t = {target: this.Je, addedNodes: [], removedNodes: []}, e = this.constructor.getFlattenedNodes(this.Je),
            A = Hs(e, this.Ze);
        for (let e, i = 0; i < A.length && (e = A[i]); i++) for (let A, i = 0; i < e.removed.length && (A = e.removed[i]); i++) t.removedNodes.push(A);
        for (let i, n = 0; n < A.length && (i = A[n]); n++) for (let A = i.index; A < i.index + i.addedCount; A++) t.addedNodes.push(e[A]);
        this.Ze = e;
        let i = !1;
        return (t.addedNodes.length || t.removedNodes.length) && (i = !0, this.callback.call(this.Je, t)), i
    }

    iA(t) {
        for (let e, A = 0; A < t.length; A++) e = t[A], $s(e) && e.addEventListener("slotchange", this.eA)
    }

    sA(t) {
        for (let e, A = 0; A < t.length; A++) e = t[A], $s(e) && e.removeEventListener("slotchange", this.eA)
    }
}

var Ys = {FlattenedNodesObserver: qs};
let Ks = [];
const Vs = function (t) {
    Ks.push(t)
};

function Gs() {
    const t = !!Ks.length;
    for (; Ks.length;) try {
        Ks.shift().flush()
    } catch (t) {
        setTimeout((() => {
            throw t
        }))
    }
    return t
}

const Ws = function () {
    let t, e;
    do {
        t = window.ShadyDOM && ShadyDOM.flush(), window.ShadyCSS && window.ShadyCSS.ScopingShim && window.ShadyCSS.ScopingShim.flush(), e = Gs()
    } while (t || e)
};
var Js = {enqueueDebouncer: Vs, flush: Ws};
const Zs = Element.prototype,
    Xs = Zs.matches || Zs.matchesSelector || Zs.mozMatchesSelector || Zs.msMatchesSelector || Zs.oMatchesSelector || Zs.webkitMatchesSelector,
    tr = function (t, e) {
        return Xs.call(t, e)
    };

class er {
    constructor(t) {
        this.node = t
    }

    get activeElement() {
        let t = this.node;
        return void 0 !== t.aA ? t.aA : t.activeElement
    }

    observeNodes(t) {
        return new qs(this.node, t)
    }

    unobserveNodes(t) {
        t.disconnect()
    }

    notifyObserver() {
    }

    deepContains(t) {
        if (this.node.contains(t)) return !0;
        let e = t, A = t.ownerDocument;
        for (; e && e !== A && e !== this.node;) e = e.parentNode || e.host;
        return e === this.node
    }

    getOwnerRoot() {
        return this.node.getRootNode()
    }

    getDistributedNodes() {
        return "slot" === this.node.localName ? this.node.assignedNodes({flatten: !0}) : []
    }

    getDestinationInsertionPoints() {
        let t = [], e = this.node.assignedSlot;
        for (; e;) t.push(e), e = e.assignedSlot;
        return t
    }

    importNode(t, e) {
        return (this.node instanceof Document ? this.node : this.node.ownerDocument).importNode(t, e)
    }

    getEffectiveChildNodes() {
        return qs.getFlattenedNodes(this.node)
    }

    queryDistributedElements(t) {
        let e = this.getEffectiveChildNodes(), A = [];
        for (let i, n = 0, s = e.length; n < s && (i = e[n]); n++) i.nodeType === Node.ELEMENT_NODE && tr(i, t) && A.push(i);
        return A
    }
}

function Ar(t, e) {
    for (let A, i = 0; i < e.length; i++) A = e[i], t[A] = function () {
        return this.node[A].apply(this.node, arguments)
    }
}

function ir(t, e) {
    for (let A, i = 0; i < e.length; i++) A = e[i], Object.defineProperty(t, A, {
        get: function () {
            return this.node[A]
        }, configurable: !0
    })
}

function nr(t, e) {
    for (let A, i = 0; i < e.length; i++) A = e[i], Object.defineProperty(t, A, {
        get: function () {
            return this.node[A]
        }, set: function (t) {
            this.node[A] = t
        }, configurable: !0
    })
}

class sr {
    constructor(t) {
        this.event = t
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

er.prototype.cloneNode, er.prototype.appendChild, er.prototype.insertBefore, er.prototype.removeChild, er.prototype.replaceChild, er.prototype.setAttribute, er.prototype.removeAttribute, er.prototype.querySelector, er.prototype.querySelectorAll, er.prototype.parentNode, er.prototype.firstChild, er.prototype.lastChild, er.prototype.nextSibling, er.prototype.previousSibling, er.prototype.firstElementChild, er.prototype.lastElementChild, er.prototype.nextElementSibling, er.prototype.previousElementSibling, er.prototype.childNodes, er.prototype.children, er.prototype.classList, er.prototype.textContent, er.prototype.innerHTML, Ar(er.prototype, ["cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector", "querySelectorAll"]), ir(er.prototype, ["parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling", "childNodes", "children", "classList"]), nr(er.prototype, ["textContent", "innerHTML"]);
const rr = function (t) {
    if (!(t = t || document).oA) {
        let e;
        e = t instanceof Event ? new sr(t) : new er(t), t.oA = e
    }
    return t.oA
};
var ar = {matchesSelector: tr, DomApi: er, dom: rr, flush: Ws, addDebouncer: Vs};
let or = window.ShadyCSS;
const lr = ve((t => {
    const e = gs(ns(qi(t))), A = {x: "pan-x", y: "pan-y", none: "none", all: "auto"};

    class i extends e {
        constructor() {
            super(), this.isAttached, this.lA, this.hA, this.uA()
        }

        static get importMeta() {
            return this.prototype.importMeta
        }

        get domHost() {
            let t = this.getRootNode();
            return t instanceof DocumentFragment ? t.host : t
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

        attributeChangedCallback(t, e, A, i) {
            e !== A && (super.attributeChangedCallback(t, e, A, i), this.attributeChanged(t, e, A))
        }

        attributeChanged(t, e, A) {
        }

        At() {
            let t = Object.getPrototypeOf(this);
            t.hasOwnProperty("__hasRegisterFinished") || (t.cA = !0, this.dA()), super.At(), this.root = this, this.created()
        }

        dA() {
        }

        ready() {
            this.pA(), super.ready()
        }

        pA() {
        }

        uA() {
        }

        serialize(t) {
            return this.gt(t)
        }

        deserialize(t, e) {
            return this.ct(t, e)
        }

        reflectPropertyToAttribute(t, e, A) {
            this.dt(t, e, A)
        }

        serializeValueToAttribute(t, e, A) {
            this.ft(A || this, t, e)
        }

        extend(t, e) {
            if (!t || !e) return t || e;
            let A = Object.getOwnPropertyNames(e);
            for (let i, n, s = 0; s < A.length && (i = A[s]); s++) n = Object.getOwnPropertyDescriptor(e, i), n && Object.defineProperty(t, i, n);
            return t
        }

        mixin(t, e) {
            for (let A in e) t[A] = e[A];
            return t
        }

        chainObject(t, e) {
            return t && e && t !== e && (t.__proto__ = e), t
        }

        instanceTemplate(t) {
            let e = this.constructor.Nt(t);
            return document.importNode(e, !0)
        }

        fire(t, e, A) {
            A = A || {}, e = null == e ? {} : e;
            let i = new Event(t, {
                bubbles: void 0 === A.bubbles || A.bubbles,
                cancelable: !!A.cancelable,
                composed: void 0 === A.composed || A.composed
            });
            return i.detail = e, (A.node || this).dispatchEvent(i), i
        }

        listen(t, e, A) {
            t = t || this;
            let i = this.lA || (this.lA = new WeakMap), n = i.get(t);
            n || (n = {}, i.set(t, n));
            let s = e + A;
            n[s] || (n[s] = this.xt(t, e, A, this))
        }

        unlisten(t, e, A) {
            t = t || this;
            let i = this.lA && this.lA.get(t), n = e + A, s = i && i[n];
            s && (this.Dt(t, e, s), i[n] = null)
        }

        setScrollDirection(t, e) {
            qn(e || this, A[t] || "auto")
        }

        $$(t) {
            return this.root.querySelector(t)
        }

        distributeContent() {
            window.ShadyDOM && this.shadowRoot && ShadyDOM.flush()
        }

        getEffectiveChildNodes() {
            return rr(this).getEffectiveChildNodes()
        }

        queryDistributedElements(t) {
            return rr(this).queryDistributedElements(t)
        }

        getEffectiveChildren() {
            return this.getEffectiveChildNodes().filter((function (t) {
                return t.nodeType === Node.ELEMENT_NODE
            }))
        }

        getEffectiveTextContent() {
            let t = this.getEffectiveChildNodes(), e = [];
            for (let A, i = 0; A = t[i]; i++) A.nodeType !== Node.COMMENT_NODE && e.push(A.textContent);
            return e.join("")
        }

        queryEffectiveChildren(t) {
            let e = this.queryDistributedElements(t);
            return e && e[0]
        }

        queryAllEffectiveChildren(t) {
            return this.queryDistributedElements(t)
        }

        getContentChildNodes(t) {
            let e = this.root.querySelector(t || "slot");
            return e ? rr(e).getDistributedNodes() : []
        }

        getContentChildren(t) {
            return this.getContentChildNodes(t).filter((function (t) {
                return t.nodeType === Node.ELEMENT_NODE
            }))
        }

        isLightDescendant(t) {
            const e = this;
            return e !== t && e.contains(t) && e.getRootNode() === t.getRootNode()
        }

        isLocalDescendant(t) {
            return this.root === t.getRootNode()
        }

        scopeSubtree(t, e) {
        }

        getComputedStyleValue(t) {
            return or.getComputedStyleValue(this, t)
        }

        debounce(t, e, A) {
            return this.hA = this.hA || {}, this.hA[t] = Xi.debounce(this.hA[t], 0 < A ? pA.after(A) : gA, e.bind(this))
        }

        isDebouncerActive(t) {
            this.hA = this.hA || {};
            let e = this.hA[t];
            return !(!e || !e.isActive())
        }

        flushDebouncer(t) {
            this.hA = this.hA || {};
            let e = this.hA[t];
            e && e.flush()
        }

        cancelDebouncer(t) {
            this.hA = this.hA || {};
            let e = this.hA[t];
            e && e.cancel()
        }

        async(t, e) {
            return 0 < e ? pA.run(t.bind(this), e) : ~gA.run(t.bind(this))
        }

        cancelAsync(t) {
            0 > t ? gA.cancel(~t) : pA.cancel(t)
        }

        create(t, e) {
            let A = document.createElement(t);
            if (e) if (A.setProperties) A.setProperties(e); else for (let t in e) A[t] = e[t];
            return A
        }

        elementMatches(t, e) {
            return tr(e || this, t)
        }

        toggleAttribute(t, e, A) {
            A = A || this, 1 == arguments.length && (e = !A.hasAttribute(t)), e ? A.setAttribute(t, "") : A.removeAttribute(t)
        }

        toggleClass(t, e, A) {
            A = A || this, 1 == arguments.length && (e = !A.classList.contains(t)), e ? A.classList.add(t) : A.classList.remove(t)
        }

        transform(t, e) {
            (e = e || this).style.webkitTransform = t, e.style.transform = t
        }

        translate3d(t, e, A, i) {
            i = i || this, this.transform("translate3d(" + t + "," + e + "," + A + ")", i)
        }

        arrayDelete(t, e) {
            let A;
            if (Array.isArray(t)) {
                if (A = t.indexOf(e), 0 <= A) return t.splice(A, 1)
            } else {
                if (A = Ze(this, t).indexOf(e), 0 <= A) return this.splice(t, A, 1)
            }
            return null
        }

        fA(t, e) {
            switch (Array.isArray(e) && 1 === e.length && Array.isArray(e[0]) && (e = e[0]), t) {
                case"log":
                case"warn":
                case"error":
                    console[t](...e)
            }
        }

        mA(...t) {
            this.fA("log", t)
        }

        gA(...t) {
            this.fA("warn", t)
        }

        yA(...t) {
            this.fA("error", t)
        }

        vA(t, ...e) {
            return ["[%s::%s]", this.is, t, ...e]
        }
    }

    return i.prototype.is = "", i
}));
var hr = {LegacyElementMixin: lr};
let ur = {
    attached: !0,
    detached: !0,
    ready: !0,
    created: !0,
    beforeRegister: !0,
    registered: !0,
    attributeChanged: !0,
    behaviors: !0
};

function cr(t, e) {
    if (!t) return e = e;
    e = lr(e), Array.isArray(t) || (t = [t]);
    let A = e.prototype.behaviors;
    return e = dr(t = pr(t, null, A), e), A && (t = A.concat(t)), e.prototype.behaviors = t, e
}

function dr(t, e) {
    for (let A, i = 0; i < t.length; i++) A = t[i], A && (e = Array.isArray(A) ? dr(A, e) : fr(A, e));
    return e
}

function pr(t, e, A) {
    e = e || [];
    for (let i, n = t.length - 1; 0 <= n; n--) i = t[n], i ? Array.isArray(i) ? pr(i, e) : 0 > e.indexOf(i) && (!A || 0 > A.indexOf(i)) && e.unshift(i) : console.warn("behavior is null, check for missing or 404 import");
    return e
}

function fr(t, e) {
    class A extends e {
        static get properties() {
            return t.properties
        }

        static get observers() {
            return t.observers
        }

        static get template() {
            return t.Oe || Ue && Ue.import(this.is, "template") || e.template || this.prototype.Oe || null
        }

        created() {
            super.created(), t.created && t.created.call(this)
        }

        dA() {
            super.dA(), t.beforeRegister && t.beforeRegister.call(Object.getPrototypeOf(this)), t.registered && t.registered.call(Object.getPrototypeOf(this))
        }

        uA() {
            if (super.uA(), t.listeners) for (let e in t.listeners) this.xt(this, e, t.listeners[e])
        }

        pA() {
            if (t.hostAttributes) for (let e in t.hostAttributes) this.bt(e, t.hostAttributes[e]);
            super.pA()
        }

        ready() {
            super.ready(), t.ready && t.ready.call(this)
        }

        attached() {
            super.attached(), t.attached && t.attached.call(this)
        }

        detached() {
            super.detached(), t.detached && t.detached.call(this)
        }

        attributeChanged(e, A, i) {
            super.attributeChanged(e, A, i), t.attributeChanged && t.attributeChanged.call(this, e, A, i)
        }
    }

    A.generatedFrom = t;
    for (let e in t) if (!(e in ur)) {
        let i = Object.getOwnPropertyDescriptor(t, e);
        i && Object.defineProperty(A.prototype, e, i)
    }
    return A
}

const mr = function (t) {
    t || console.warn("Polymer's Class function requires `info` argument");
    let e = fr(t, t.behaviors ? cr(t.behaviors, HTMLElement) : lr(HTMLElement));
    return e.is = t.is, e
};
var gr = {mixinBehaviors: cr, Class: mr};
const yr = function (t) {
    let e;
    return e = "function" == typeof t ? t : yr.Class(t), customElements.define(e.is, e), e
};
yr.Class = mr;
var vr = {Polymer: yr};

function br(t, e, A, i, n) {
    let s;
    n && (s = "object" == typeof A && null !== A, s && (i = t.Xt[e]));
    let r = i !== A && (i == i || A == A);
    return s && r && (t.Xt[e] = A), r
}

const wr = ve((t => class extends t {
    at(t, e, A) {
        return br(this, t, e, A, !0)
    }
})), _r = ve((t => class extends t {
    static get properties() {
        return {mutableData: Boolean}
    }

    at(t, e, A) {
        return br(this, t, e, A, this.mutableData)
    }
}));
wr.bA = br;
var xr = {MutableData: wr, OptionalMutableData: _r};
let Sr = null;

function kr() {
    return Sr
}

kr.prototype = Object.create(HTMLTemplateElement.prototype, {constructor: {value: kr, writable: !0}});
const Cr = zi(kr), Er = wr(Cr);

function Br(t, e) {
    Sr = t, Object.setPrototypeOf(t, e.prototype), new e, Sr = null
}

const Tr = zi(class {
});

class Pr extends Tr {
    constructor(t) {
        super(), this.wA(t), this.root = this.Ot(this.zt);
        let e = this.children = [];
        for (let t = this.root.firstChild; t; t = t.nextSibling) e.push(t), t._A = this;
        this.xA && this.xA.SA && this.kA(!0);
        let A = this.CA;
        (t && A.instanceProps || !A.instanceProps) && this.ot()
    }

    get parentModel() {
        let t = this.IA;
        if (!t) {
            let e;
            t = this;
            do {
                t = t.zt.zt
            } while ((e = t.CA) && !e.parentModel);
            this.IA = t
        }
        return t
    }

    wA(t) {
        if (this.CA.forwardHostProp) for (let t in this.EA) this.st(t, this.zt["_host_" + t]);
        for (let e in t) this.st(e, t[e])
    }

    forwardHostProp(t, e) {
        this.jt(t, e, !1, !0) && this.zt.Qt(this)
    }

    Rt(t, e, A) {
        if (this.kt && this.CA.parentModel) this.kt.Rt(t, e, (t => {
            t.model = this, A(t)
        })); else {
            let i = this.zt.zt;
            i && i.Rt(t, e, A)
        }
    }

    kA(t) {
        let e = this.children;
        for (let A, i = 0; i < e.length; i++) {
            if (A = e[i], !!t != !!A.SA) if (A.nodeType === Node.TEXT_NODE) t ? (A.BA = A.textContent, A.textContent = "") : A.textContent = A.BA; else if ("slot" === A.localName) if (t) A.TA = document.createComment("hidden-slot"), A.parentNode.replaceChild(A.TA, A); else {
                const t = A.TA;
                t && t.parentNode.replaceChild(A, t)
            } else A.style && (t ? (A.PA = A.style.display, A.style.display = "none") : A.style.display = A.PA);
            A.SA = t, A.kA && A.kA(t)
        }
    }

    qt(t, e, A) {
        t.SA && t.nodeType == Node.TEXT_NODE && "textContent" == e ? t.BA = A : super.qt(t, e, A)
    }

    dispatchEvent(t) {
        return !0
    }
}

Pr.prototype.zt, Pr.prototype.CA, Pr.prototype.kt, Pr.prototype.xA, Pr.prototype.EA;
const Ir = wr(Pr);

function Mr(t) {
    let e = t.zt;
    return e && e.kt || e
}

function Nr(t, e, A) {
    let i = A.mutableData ? Ir : Pr, n = class extends i {
    };
    return n.prototype.CA = A, n.prototype.Se(t), Rr(n, t, e, A), n
}

function Or(t, e, A) {
    let i = A.forwardHostProp;
    if (i) {
        let n = e.templatizeTemplateClass;
        if (!n) {
            let t = A.mutableData ? Er : Cr;
            n = e.templatizeTemplateClass = class extends t {
            };
            let s = e.hostProps;
            for (let t in s) n.prototype.Kt("_host_" + t, n.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, {fn: Lr(t, i)}), n.prototype.we("_host_" + t)
        }
        Br(t, n), t.yt && Object.assign(t.J, t.yt), t.Xt = {}, t.Z = null, t.X = null, t.ot()
    }
}

function Lr(t, e) {
    return function (t, A, i) {
        e.call(t.xA, A.substring("_host_".length), i[A])
    }
}

function Rr(t, e, A, i) {
    let n = A.hostProps || {};
    for (let e in i.instanceProps) {
        delete n[e];
        let A = i.notifyInstanceProp;
        A && t.prototype.Kt(e, t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {fn: Dr(e, A)})
    }
    if (i.forwardHostProp && e.zt) for (let e in n) t.prototype.Kt(e, t.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, {fn: zr()})
}

function Dr(t, e) {
    return function (t, A, i) {
        e.call(t.xA, t, A, i[A])
    }
}

function zr() {
    return function (t, e, A) {
        t.zt.jt("_host_" + e, A[e], !0, !0)
    }
}

function jr(t, e, A) {
    if (A = A || {}, t.xA) throw new Error("A <template> can only be templatized once");
    t.xA = e;
    let i = (e ? e.constructor : Pr).Ct(t), n = i.templatizeInstanceClass;
    n || (n = Nr(t, i, A), i.templatizeInstanceClass = n), Or(t, i, A);
    let s = class extends n {
    };
    return s.prototype.kt = Mr(t), s.prototype.zt = t, s.prototype.xA = e, s.prototype.EA = i.hostProps, s = s, s
}

function Fr(t, e) {
    let A;
    for (; e;) if (A = e._A) {
        if (A.zt == t) return A;
        e = A.zt
    } else e = e.parentNode;
    return null
}

var Hr = {templatize: jr, modelForElement: Fr, TemplateInstanceBase: Pr};
let Ur;
const Qr = {
    templatize(t, e) {
        this.MA = t, this.ctor = jr(t, this, {
            mutableData: !!e,
            parentModel: this.NA,
            instanceProps: this.OA,
            forwardHostProp: this.LA,
            notifyInstanceProp: this.RA
        })
    }, stamp(t) {
        return new this.ctor(t)
    }, modelForElement(t) {
        return Fr(this.MA, t)
    }
};
var $r = {Templatizer: Qr};
const qr = ns(_r(zi(HTMLElement)));

class Yr extends qr {
    constructor() {
        super(), this.root = null, this.$ = null, this.DA = null
    }

    static get observedAttributes() {
        return ["mutable-data"]
    }

    attributeChangedCallback() {
        this.mutableData = !0
    }

    connectedCallback() {
        this.style.display = "none", this.render()
    }

    disconnectedCallback() {
        this.zA()
    }

    jA() {
        this.parentNode.insertBefore(this.root, this)
    }

    zA() {
        if (this.DA) for (let t = 0; t < this.DA.length; t++) this.root.appendChild(this.DA[t])
    }

    render() {
        let t;
        if (!this.DA) {
            if (t = t || this.querySelector("template"), !t) {
                let e = new MutationObserver((() => {
                    if (t = this.querySelector("template"), !t) throw new Error("dom-bind requires a <template> child");
                    e.disconnect(), this.render()
                }));
                return void e.observe(this, {childList: !0})
            }
            this.root = this.Ot(t), this.$ = this.root.$, this.DA = [];
            for (let t = this.root.firstChild; t; t = t.nextSibling) this.DA[this.DA.length] = t;
            this.ot()
        }
        this.jA(), this.dispatchEvent(new CustomEvent("dom-change", {bubbles: !0, composed: !0}))
    }
}

customElements.define("dom-bind", Yr);
var Kr = {DomBind: Yr};

class Vr {
    constructor(t) {
        this.value = t.toString()
    }

    toString() {
        return this.value
    }
}

function Gr(t) {
    if (t instanceof Vr) return t.value;
    throw new Error(`non-literal value passed to Polymer's htmlLiteral function: ${t}`)
}

function Wr(t) {
    if (t instanceof HTMLTemplateElement) return t.innerHTML;
    if (t instanceof Vr) return Gr(t);
    throw new Error(`non-template value passed to Polymer's html function: ${t}`)
}

const Jr = function (t, ...e) {
    const A = document.createElement("template");
    return A.innerHTML = e.reduce(((e, A, i) => e + Wr(A) + t[i + 1]), t[0]), A
}, Zr = function (t, ...e) {
    return new Vr(e.reduce(((e, A, i) => e + Gr(A) + t[i + 1]), t[0]))
};
var Xr = {html: Jr, htmlLiteral: Zr};
const ta = qi(HTMLElement);
var ea = {PolymerElement: ta, html: Jr};
const Aa = _r(ta);

class ia extends Aa {
    constructor() {
        super(), this.HA = [], this.UA = 1 / 0, this.QA = [], this.$A = null, this.qA = {}, this.YA = null, this.KA = null, this.VA = null, this.GA = null, this.WA = null, this.JA = null, this.ZA = !0, this.template = null
    }

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
            FA: {type: Number, computed: "__computeFrameTime(targetFramerate)"}
        }
    }

    static get observers() {
        return ["__itemsChanged(items.*)"]
    }

    disconnectedCallback() {
        super.disconnectedCallback(), this.ZA = !0;
        for (let t = 0; t < this.HA.length; t++) this.XA(t)
    }

    connectedCallback() {
        if (super.connectedCallback(), this.style.display = "none", this.ZA) {
            this.ZA = !1;
            let t = this.parentNode;
            for (let e = 0; e < this.HA.length; e++) this.ti(e, t)
        }
    }

    ei() {
        if (!this.JA) {
            let t = this.template = this.querySelector("template");
            if (!t) {
                let t = new MutationObserver((() => {
                    if (!this.querySelector("template")) throw new Error("dom-repeat requires a <template> child");
                    t.disconnect(), this.Ai()
                }));
                return t.observe(this, {childList: !0}), !1
            }
            let e = {};
            e[this.as] = !0, e[this.indexAs] = !0, e[this.itemsIndexAs] = !0, this.JA = jr(t, this, {
                mutableData: this.mutableData,
                parentModel: !0,
                instanceProps: e,
                forwardHostProp: function (t, e) {
                    let A = this.HA;
                    for (let i, n = 0; n < A.length && (i = A[n]); n++) i.forwardHostProp(t, e)
                },
                notifyInstanceProp: function (t, e, A) {
                    if (Ge(this.as, e)) {
                        let i = t[this.itemsIndexAs];
                        e == this.as && (this.items[i] = A);
                        let n = Ve(this.as, "items." + i, e);
                        this.notifyPath(n, A)
                    }
                }
            })
        }
        return !0
    }

    ii() {
        return this.zt.kt || this.zt
    }

    ni(t) {
        if ("string" == typeof t) {
            let e = t, A = this.ii();
            return function () {
                return A[e].apply(A, arguments)
            }
        }
        return t
    }

    si(t) {
        this.VA = this.ni(t), this.items && this.ri(this.Ai)
    }

    ai(t) {
        this.GA = this.ni(t), this.items && this.ri(this.Ai)
    }

    oi(t) {
        return Math.ceil(1e3 / t)
    }

    li() {
        this.initialCount && (this.UA = this.initialCount, this.YA = this.initialCount, this.KA = performance.now())
    }

    hi() {
        this.items && this.UA < this.items.length && this.ri(this.ui)
    }

    ui() {
        requestAnimationFrame((() => this.ci()))
    }

    ci() {
        let t = performance.now(), e = this.FA / (t - this.KA);
        this.YA = Math.round(this.YA * e) || 1, this.UA += this.YA, this.KA = t, this.ri(this.Ai)
    }

    di() {
        this.WA = this.observe && this.observe.replace(".*", ".").split(" ")
    }

    pi(t) {
        this.items && !Array.isArray(this.items) && console.warn("dom-repeat expected array for `items`, found", this.items), this.fi(t.path, t.value) || (this.li(), this.ri(this.Ai))
    }

    mi(t) {
        if (this.VA || this.GA) if (t) {
            if (this.WA) {
                let e = this.WA;
                for (let A = 0; A < e.length; A++) 0 === t.indexOf(e[A]) && this.ri(this.Ai, this.delay)
            }
        } else this.ri(this.Ai, this.delay)
    }

    ri(t, e = 0) {
        this.$A = Xi.debounce(this.$A, 0 < e ? pA.after(e) : gA, t.bind(this)), Vs(this.$A)
    }

    render() {
        this.ri(this.Ai), Ws()
    }

    Ai() {
        this.ei() && (this.gi(), this.QA.length = 0, this.yi(this.HA.length), this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        })), this.hi())
    }

    gi() {
        let t = this.items || [], e = Array(t.length);
        for (let A = 0; A < t.length; A++) e[A] = A;
        this.GA && (e = e.filter(((e, A, i) => this.GA(t[e], A, i)))), this.VA && e.sort(((e, A) => this.VA(t[e], t[A])));
        const A = this.qA = {};
        let i = 0;
        const n = Math.min(e.length, this.UA);
        for (; i < n; i++) {
            let n = this.HA[i], s = e[i], r = t[s];
            A[s] = i, n ? (n.st(this.as, r), n.st(this.indexAs, i), n.st(this.itemsIndexAs, s), n.it()) : this.vi(r, i, s)
        }
        for (let t = this.HA.length - 1; t >= i; t--) this.bi(t)
    }

    XA(t) {
        let e = this.HA[t];
        for (let t, A = 0; A < e.children.length; A++) t = e.children[A], e.root.appendChild(t);
        return e
    }

    ti(t, e) {
        let A = this.HA[t];
        e.insertBefore(A.root, this)
    }

    bi(t) {
        let e = this.XA(t);
        e && this.QA.push(e), this.HA.splice(t, 1)
    }

    wi(t, e, A) {
        let i = {};
        return i[this.as] = t, i[this.indexAs] = e, i[this.itemsIndexAs] = A, new this.JA(i)
    }

    vi(t, e, A) {
        let i = this.QA.pop();
        i ? (i.st(this.as, t), i.st(this.indexAs, e), i.st(this.itemsIndexAs, A), i.it()) : i = this.wi(t, e, A);
        let n = this.HA[e + 1], s = n ? n.children[0] : this;
        return this.parentNode.insertBefore(i.root, s), this.HA[e] = i, i
    }

    kA(t) {
        for (let e = 0; e < this.HA.length; e++) this.HA[e].kA(t)
    }

    fi(t, e) {
        let A = t.slice(6), i = A.indexOf("."), n = 0 > i ? A : A.substring(0, i);
        if (n == parseInt(n, 10)) {
            let t = 0 > i ? "" : A.substring(i + 1);
            this.mi(t);
            let s = this.qA[n], r = this.HA[s];
            if (r) {
                let A = this.as + (t ? "." + t : "");
                r.jt(A, e, !1, !0), r.it()
            }
            return !0
        }
    }

    itemForElement(t) {
        let e = this.modelForElement(t);
        return e && e[this.as]
    }

    indexForElement(t) {
        let e = this.modelForElement(t);
        return e && e[this.indexAs]
    }

    modelForElement(t) {
        return Fr(this.template, t)
    }
}

customElements.define(ia.is, ia);
var na = {DomRepeat: ia};

class sa extends ta {
    constructor() {
        super(), this.$A = null, this._i = null, this.xi = null, this.Si = !1, this.JA = null
    }

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

    ri() {
        this.$A = Xi.debounce(this.$A, gA, (() => this.Ai())), Vs(this.$A)
    }

    disconnectedCallback() {
        super.disconnectedCallback(), this.parentNode && (this.parentNode.nodeType != Node.DOCUMENT_FRAGMENT_NODE || this.parentNode.host) || this.ki()
    }

    connectedCallback() {
        super.connectedCallback(), this.style.display = "none", this.if && this.ri()
    }

    render() {
        Ws()
    }

    Ai() {
        if (this.if) {
            if (!this.Ci()) return;
            this.kA()
        } else this.restamp && this.ki();
        !this.restamp && this.xi && this.kA(), this.if != this.Si && (this.dispatchEvent(new CustomEvent("dom-change", {
            bubbles: !0,
            composed: !0
        })), this.Si = this.if)
    }

    Ci() {
        let t = this.parentNode;
        if (t) {
            if (!this.JA) {
                let t = this.querySelector("template");
                if (!t) {
                    let t = new MutationObserver((() => {
                        if (!this.querySelector("template")) throw new Error("dom-if requires a <template> child");
                        t.disconnect(), this.Ai()
                    }));
                    return t.observe(this, {childList: !0}), !1
                }
                this.JA = jr(t, this, {
                    mutableData: !0, forwardHostProp: function (t, e) {
                        this.xi && (this.if ? this.xi.forwardHostProp(t, e) : (this._i = this._i || Object.create(null), this._i[qe(t)] = !0))
                    }
                })
            }
            if (this.xi) {
                this.Ei();
                let e = this.xi.children;
                if (e && e.length) {
                    if (this.previousSibling !== e[e.length - 1]) for (let A, i = 0; i < e.length && (A = e[i]); i++) t.insertBefore(A, this)
                }
            } else this.xi = new this.JA, t.insertBefore(this.xi.root, this)
        }
        return !0
    }

    Ei() {
        let t = this._i;
        if (t) {
            for (let e in t) this.xi.st(e, this.zt[e]);
            this._i = null, this.xi.it()
        }
    }

    ki() {
        if (this.xi) {
            let t = this.xi.children;
            if (t && t.length) {
                let e = t[0].parentNode;
                for (let A, i = 0; i < t.length && (A = t[i]); i++) e.removeChild(A)
            }
            this.xi = null, this._i = null
        }
    }

    kA() {
        let t = this.SA || !this.if;
        this.xi && this.xi.kA(t)
    }
}

customElements.define(sa.is, sa);
var ra = {DomIf: sa};
let aa = ve((t => {
    let e = qi(t);
    return class extends e {
        constructor() {
            super(), this.Bi = null, this.Ti = null, this.Pi = null
        }

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

        Ii(t, e) {
            let A = e.path;
            if ("items" == A) {
                let A = e.base || [], i = this.Bi;
                if (t !== this.Ti && this.clearSelection(), i) {
                    let t = Hs(A, i);
                    this.Mi(t)
                }
                this.Bi = A, this.Ti = t
            } else if ("items.splices" == e.path) this.Mi(e.value.indexSplices); else {
                let t = A.slice("items.".length), e = parseInt(t, 10);
                0 > t.indexOf(".") && t == e && this.Ni(e)
            }
        }

        Mi(t) {
            let e = this.Pi;
            for (let A, i = 0; i < t.length; i++) {
                A = t[i], e.forEach(((t, i) => {
                    t < A.index || (t >= A.index + A.removed.length ? e.set(i, t + A.addedCount - A.removed.length) : e.set(i, -1))
                }));
                for (let t, i = 0; i < A.addedCount; i++) t = A.index + i, e.has(this.items[t]) && e.set(this.items[t], t)
            }
            this.Oi();
            let A = 0;
            e.forEach(((t, i) => {
                0 > t ? (this.multi ? this.splice("selected", A, 1) : this.selected = this.selectedItem = null, e.delete(i)) : A++
            }))
        }

        Oi() {
            if (this.Ft = {}, this.multi) {
                let t = 0;
                this.Pi.forEach((e => {
                    0 <= e && this.linkPaths("items." + e, "selected." + t++)
                }))
            } else this.Pi.forEach((t => {
                this.linkPaths("selected", "items." + t), this.linkPaths("selectedItem", "items." + t)
            }))
        }

        clearSelection() {
            this.Ft = {}, this.Pi = new Map, this.selected = this.multi ? [] : null, this.selectedItem = null
        }

        isSelected(t) {
            return this.Pi.has(t)
        }

        isIndexSelected(t) {
            return this.isSelected(this.items[t])
        }

        Ni(t) {
            let e = this.Li(t);
            if (0 <= e) {
                let t = 0;
                this.Pi.forEach(((A, i) => {
                    e == t++ && this.deselect(i)
                }))
            }
        }

        Li(t) {
            let e = this.Ft["items." + t];
            if (e) return parseInt(e.slice("selected.".length), 10)
        }

        deselect(t) {
            let e = this.Pi.get(t);
            if (0 <= e) {
                let A;
                this.Pi.delete(t), this.multi && (A = this.Li(e)), this.Oi(), this.multi ? this.splice("selected", A, 1) : this.selected = this.selectedItem = null
            }
        }

        deselectIndex(t) {
            this.deselect(this.items[t])
        }

        select(t) {
            this.selectIndex(this.items.indexOf(t))
        }

        selectIndex(t) {
            let e = this.items[t];
            this.isSelected(e) ? this.toggle && this.deselectIndex(t) : (this.multi || this.Pi.clear(), this.Pi.set(e, t), this.Oi(), this.multi ? this.push("selected", e) : this.selected = this.selectedItem = e)
        }
    }
})), oa = aa(ta);

class la extends oa {
    static get is() {
        return "array-selector"
    }
}

customElements.define(la.is, la);
var ha = {ArraySelectorMixin: aa, ArraySelector: la};