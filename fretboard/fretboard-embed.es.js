//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function ee(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function E(e, t) {
		return ee(e.type, t, e.props);
	}
	function te(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ne(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var re = /\/+/g;
	function D(e, t) {
		return typeof e == "object" && e && e.key != null ? ne("" + e.key) : t.toString(36);
	}
	function O(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function k(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, k(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + D(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(re, "$&/") + "/"), k(o, r, i, "", function(e) {
			return e;
		})) : o != null && (te(o) && (o = E(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(re, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + D(a, u), c += k(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + D(a, u++), c += k(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return k(O(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ie(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return k(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function A(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var j = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, M = {
		map: ie,
		forEach: function(e, t, n) {
			ie(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ie(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ie(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!te(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = M, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ee(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ee(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = te, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: A
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, j);
		} catch (e) {
			j(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.8";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, te());
		else {
			var t = n(l);
			t !== null && D(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function ee() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function E() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ee());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && D(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
				}
			} finally {
				i ? te() : S = !1;
			}
		}
	}
	var te;
	if (typeof y == "function") te = function() {
		y(E);
	};
	else if (typeof MessageChannel < "u") {
		var ne = new MessageChannel(), re = ne.port2;
		ne.port1.onmessage = E, te = function() {
			re.postMessage(null);
		};
	} else te = function() {
		_(E, 0);
	};
	function D(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, D(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, te()))), r;
	}, e.unstable_shouldYield = ee, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.8";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), te = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), re = Symbol.for("react.memo_cache_sentinel"), D = Symbol.iterator;
	function O(e) {
		return typeof e != "object" || !e ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var k = Symbol.for("react.client.reference");
	function ie(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case ee: return "SuspenseList";
			case ne: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case E: return t = e.displayName || null, t === null ? ie(e.type) || "Memo" : t;
			case te:
				t = e._payload, e = e._init;
				try {
					return ie(e(t));
				} catch {}
		}
		return null;
	}
	var A = Array.isArray, j = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, M = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ae = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, oe = [], se = -1;
	function ce(e) {
		return { current: e };
	}
	function N(e) {
		0 > se || (e.current = oe[se], oe[se] = null, se--);
	}
	function P(e, t) {
		se++, oe[se] = e.current, e.current = t;
	}
	var le = ce(null), ue = ce(null), F = ce(null), de = ce(null);
	function fe(e, t) {
		switch (P(F, t), P(ue, e), P(le, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		N(le), P(le, e);
	}
	function pe() {
		N(le), N(ue), N(F);
	}
	function me(e) {
		e.memoizedState !== null && P(de, e);
		var t = le.current, n = Hd(t, e.type);
		t !== n && (P(ue, e), P(le, n));
	}
	function he(e) {
		ue.current === e && (N(le), N(ue)), de.current === e && (N(de), Qf._currentValue = ae);
	}
	var ge, I;
	function _e(e) {
		if (ge === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ge = t && t[1] || "", I = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ge + e + I;
	}
	var ve = !1;
	function ye(e, t) {
		if (!e || ve) return "";
		ve = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			ve = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? _e(n) : "";
	}
	function be(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return _e(e.type);
			case 16: return _e("Lazy");
			case 13: return e.child !== t && t !== null ? _e("Suspense Fallback") : _e("Suspense");
			case 19: return _e("SuspenseList");
			case 0:
			case 15: return ye(e.type, !1);
			case 11: return ye(e.type.render, !1);
			case 1: return ye(e.type, !0);
			case 31: return _e("Activity");
			default: return "";
		}
	}
	function xe(e) {
		try {
			var t = "", n = null;
			do
				t += be(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Se = Object.prototype.hasOwnProperty, Ce = t.unstable_scheduleCallback, we = t.unstable_cancelCallback, Te = t.unstable_shouldYield, Ee = t.unstable_requestPaint, De = t.unstable_now, Oe = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Ae = t.unstable_UserBlockingPriority, je = t.unstable_NormalPriority, Me = t.unstable_LowPriority, Ne = t.unstable_IdlePriority, Pe = t.log, Fe = t.unstable_setDisableYieldValue, Ie = null, Le = null;
	function Re(e) {
		if (typeof Pe == "function" && Fe(e), Le && typeof Le.setStrictMode == "function") try {
			Le.setStrictMode(Ie, e);
		} catch {}
	}
	var ze = Math.clz32 ? Math.clz32 : Ve, Be = Math.log, L = Math.LN2;
	function Ve(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Be(e) / L | 0) | 0;
	}
	var He = 256, Ue = 262144, We = 4194304;
	function Ge(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ke(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ge(n))) : i = Ge(o) : i = Ge(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ge(n))) : i = Ge(o)) : i = Ge(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function qe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Je(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Ye() {
		var e = We;
		return We <<= 1, !(We & 62914560) && (We = 4194304), e;
	}
	function Xe(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ze(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Qe(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - ze(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && $e(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function $e(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - ze(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function et(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - ze(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function tt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : nt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function nt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function rt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function it() {
		var e = M.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function at(e, t) {
		var n = M.p;
		try {
			return M.p = e, t();
		} finally {
			M.p = n;
		}
	}
	var ot = Math.random().toString(36).slice(2), st = "__reactFiber$" + ot, ct = "__reactProps$" + ot, lt = "__reactContainer$" + ot, ut = "__reactEvents$" + ot, dt = "__reactListeners$" + ot, ft = "__reactHandles$" + ot, pt = "__reactResources$" + ot, mt = "__reactMarker$" + ot;
	function ht(e) {
		delete e[st], delete e[ct], delete e[ut], delete e[dt], delete e[ft];
	}
	function gt(e) {
		var t = e[st];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[lt] || n[st]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[st]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function _t(e) {
		if (e = e[st] || e[lt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function vt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function yt(e) {
		var t = e[pt];
		return t ||= e[pt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function bt(e) {
		e[mt] = !0;
	}
	var xt = /* @__PURE__ */ new Set(), St = {};
	function Ct(e, t) {
		wt(e, t), wt(e + "Capture", t);
	}
	function wt(e, t) {
		for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e]);
	}
	var Tt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Et = {}, Dt = {};
	function Ot(e) {
		return Se.call(Dt, e) ? !0 : Se.call(Et, e) ? !1 : Tt.test(e) ? Dt[e] = !0 : (Et[e] = !0, !1);
	}
	function kt(e, t, n) {
		if (Ot(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function At(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function jt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Mt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Nt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Pt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ft(e) {
		if (!e._valueTracker) {
			var t = Nt(e) ? "checked" : "value";
			e._valueTracker = Pt(e, t, "" + e[t]);
		}
	}
	function It(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Nt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	function Lt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Rt = /[\n"\\]/g;
	function zt(e) {
		return e.replace(Rt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Bt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Mt(t)) : e.value !== "" + Mt(t) && (e.value = "" + Mt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ht(e, o, Mt(n)) : Ht(e, o, Mt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Mt(s) : e.removeAttribute("name");
	}
	function Vt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ft(e);
				return;
			}
			n = n == null ? "" : "" + Mt(n), t = t == null ? n : "" + Mt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ft(e);
	}
	function Ht(e, t, n) {
		t === "number" && Lt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Ut(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Mt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Wt(e, t, n) {
		if (t != null && (t = "" + Mt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Mt(n);
	}
	function Gt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (A(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Mt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ft(e);
	}
	function Kt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var qt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Jt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || qt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Yt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Jt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Jt(e, o, t[o]);
	}
	function Xt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Zt = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Qt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function $t(e) {
		return Qt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function en() {}
	var tn = null;
	function nn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var rn = null, an = null;
	function on(e) {
		var t = _t(e);
		if (t && (e = t.stateNode)) {
			var n = e[ct] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Bt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + zt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ct] || null;
								if (!a) throw Error(i(90));
								Bt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && It(r);
					}
					break a;
				case "textarea":
					Wt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Ut(e, !!n.multiple, t, !1);
			}
		}
	}
	var sn = !1;
	function cn(e, t, n) {
		if (sn) return e(t, n);
		sn = !0;
		try {
			return e(t);
		} finally {
			if (sn = !1, (rn !== null || an !== null) && (bu(), rn && (t = rn, e = an, an = rn = null, on(t), e))) for (t = 0; t < e.length; t++) on(e[t]);
		}
	}
	function ln(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ct] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var un = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), dn = !1;
	if (un) try {
		var fn = {};
		Object.defineProperty(fn, "passive", { get: function() {
			dn = !0;
		} }), window.addEventListener("test", fn, fn), window.removeEventListener("test", fn, fn);
	} catch {
		dn = !1;
	}
	var pn = null, mn = null, hn = null;
	function gn() {
		if (hn) return hn;
		var e, t = mn, n = t.length, r, i = "value" in pn ? pn.value : pn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return hn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function _n(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function vn() {
		return !0;
	}
	function yn() {
		return !1;
	}
	function bn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? vn : yn, this.isPropagationStopped = yn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = vn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = vn);
			},
			persist: function() {},
			isPersistent: vn
		}), t;
	}
	var xn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Sn = bn(xn), Cn = h({}, xn, {
		view: 0,
		detail: 0
	}), wn = bn(Cn), Tn, En, Dn, On = h({}, Cn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: zn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Dn && (Dn && e.type === "mousemove" ? (Tn = e.screenX - Dn.screenX, En = e.screenY - Dn.screenY) : En = Tn = 0, Dn = e), Tn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : En;
		}
	}), kn = bn(On), An = bn(h({}, On, { dataTransfer: 0 })), jn = bn(h({}, Cn, { relatedTarget: 0 })), Mn = bn(h({}, xn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Nn = bn(h({}, xn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Pn = bn(h({}, xn, { data: 0 })), Fn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, In = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, Ln = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Rn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Ln[e]) ? !!t[e] : !1;
	}
	function zn() {
		return Rn;
	}
	var Bn = bn(h({}, Cn, {
		key: function(e) {
			if (e.key) {
				var t = Fn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = _n(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? In[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: zn,
		charCode: function(e) {
			return e.type === "keypress" ? _n(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? _n(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), R = bn(h({}, On, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Vn = bn(h({}, Cn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: zn
	})), Hn = bn(h({}, xn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = bn(h({}, On, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Wn = bn(h({}, xn, {
		newState: 0,
		oldState: 0
	})), Gn = [
		9,
		13,
		27,
		32
	], Kn = un && "CompositionEvent" in window, qn = null;
	un && "documentMode" in document && (qn = document.documentMode);
	var Jn = un && "TextEvent" in window && !qn, Yn = un && (!Kn || qn && 8 < qn && 11 >= qn), Xn = " ", Zn = !1;
	function Qn(e, t) {
		switch (e) {
			case "keyup": return Gn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function $n(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var er = !1;
	function tr(e, t) {
		switch (e) {
			case "compositionend": return $n(t);
			case "keypress": return t.which === 32 ? (Zn = !0, Xn) : null;
			case "textInput": return e = t.data, e === Xn && Zn ? null : e;
			default: return null;
		}
	}
	function nr(e, t) {
		if (er) return e === "compositionend" || !Kn && Qn(e, t) ? (e = gn(), hn = mn = pn = null, er = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Yn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var rr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function ir(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!rr[e.type] : t === "textarea";
	}
	function ar(e, t, n, r) {
		rn ? an ? an.push(r) : an = [r] : rn = r, t = Ed(t, "onChange"), 0 < t.length && (n = new Sn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var or = null, sr = null;
	function cr(e) {
		yd(e, 0);
	}
	function lr(e) {
		if (It(vt(e))) return e;
	}
	function ur(e, t) {
		if (e === "change") return t;
	}
	var dr = !1;
	if (un) {
		var fr;
		if (un) {
			var pr = "oninput" in document;
			if (!pr) {
				var mr = document.createElement("div");
				mr.setAttribute("oninput", "return;"), pr = typeof mr.oninput == "function";
			}
			fr = pr;
		} else fr = !1;
		dr = fr && (!document.documentMode || 9 < document.documentMode);
	}
	function hr() {
		or && (or.detachEvent("onpropertychange", gr), sr = or = null);
	}
	function gr(e) {
		if (e.propertyName === "value" && lr(sr)) {
			var t = [];
			ar(t, sr, e, nn(e)), cn(cr, t);
		}
	}
	function _r(e, t, n) {
		e === "focusin" ? (hr(), or = t, sr = n, or.attachEvent("onpropertychange", gr)) : e === "focusout" && hr();
	}
	function vr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return lr(sr);
	}
	function yr(e, t) {
		if (e === "click") return lr(t);
	}
	function br(e, t) {
		if (e === "input" || e === "change") return lr(t);
	}
	function xr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Sr = typeof Object.is == "function" ? Object.is : xr;
	function Cr(e, t) {
		if (Sr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Se.call(t, i) || !Sr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function wr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Tr(e, t) {
		var n = wr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = wr(n);
		}
	}
	function Er(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Er(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Dr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Lt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Lt(e.document);
		}
		return t;
	}
	function Or(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var kr = un && "documentMode" in document && 11 >= document.documentMode, Ar = null, z = null, jr = null, Mr = !1;
	function Nr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Mr || Ar == null || Ar !== Lt(r) || (r = Ar, "selectionStart" in r && Or(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), jr && Cr(jr, r) || (jr = r, r = Ed(z, "onSelect"), 0 < r.length && (t = new Sn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ar)));
	}
	function Pr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Fr = {
		animationend: Pr("Animation", "AnimationEnd"),
		animationiteration: Pr("Animation", "AnimationIteration"),
		animationstart: Pr("Animation", "AnimationStart"),
		transitionrun: Pr("Transition", "TransitionRun"),
		transitionstart: Pr("Transition", "TransitionStart"),
		transitioncancel: Pr("Transition", "TransitionCancel"),
		transitionend: Pr("Transition", "TransitionEnd")
	}, Ir = {}, Lr = {};
	un && (Lr = document.createElement("div").style, "AnimationEvent" in window || (delete Fr.animationend.animation, delete Fr.animationiteration.animation, delete Fr.animationstart.animation), "TransitionEvent" in window || delete Fr.transitionend.transition);
	function Rr(e) {
		if (Ir[e]) return Ir[e];
		if (!Fr[e]) return e;
		var t = Fr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Lr) return Ir[e] = t[n];
		return e;
	}
	var zr = Rr("animationend"), Br = Rr("animationiteration"), Vr = Rr("animationstart"), Hr = Rr("transitionrun"), Ur = Rr("transitionstart"), Wr = Rr("transitioncancel"), Gr = Rr("transitionend"), Kr = /* @__PURE__ */ new Map(), qr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	qr.push("scrollEnd");
	function Jr(e, t) {
		Kr.set(e, t), Ct(t, [e]);
	}
	var Yr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Xr = [], Zr = 0, Qr = 0;
	function $r() {
		for (var e = Zr, t = Qr = Zr = 0; t < e;) {
			var n = Xr[t];
			Xr[t++] = null;
			var r = Xr[t];
			Xr[t++] = null;
			var i = Xr[t];
			Xr[t++] = null;
			var a = Xr[t];
			if (Xr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ri(n, i, a);
		}
	}
	function ei(e, t, n, r) {
		Xr[Zr++] = e, Xr[Zr++] = t, Xr[Zr++] = n, Xr[Zr++] = r, Qr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ti(e, t, n, r) {
		return ei(e, t, n, r), ii(e);
	}
	function ni(e, t) {
		return ei(e, null, null, t), ii(e);
	}
	function ri(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - ze(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ii(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ai = {};
	function oi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function si(e, t, n, r) {
		return new oi(e, t, n, r);
	}
	function ci(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function li(e, t) {
		var n = e.alternate;
		return n === null ? (n = si(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ui(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function di(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ci(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, le.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ne: return e = si(31, n, t, a), e.elementType = ne, e.lanes = o, e;
			case y: return fi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = si(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = si(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case ee: return e = si(19, n, t, a), e.elementType = ee, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case E:
						s = 14;
						break a;
					case te:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = si(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function fi(e, t, n, r) {
		return e = si(7, e, r, t), e.lanes = n, e;
	}
	function pi(e, t, n) {
		return e = si(6, e, null, t), e.lanes = n, e;
	}
	function mi(e) {
		var t = si(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function hi(e, t, n) {
		return t = si(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var gi = /* @__PURE__ */ new WeakMap();
	function _i(e, t) {
		if (typeof e == "object" && e) {
			var n = gi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: xe(t)
			}, gi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: xe(t)
		};
	}
	var vi = [], yi = 0, bi = null, xi = 0, Si = [], Ci = 0, wi = null, Ti = 1, Ei = "";
	function Di(e, t) {
		vi[yi++] = xi, vi[yi++] = bi, bi = e, xi = t;
	}
	function Oi(e, t, n) {
		Si[Ci++] = Ti, Si[Ci++] = Ei, Si[Ci++] = wi, wi = e;
		var r = Ti;
		e = Ei;
		var i = 32 - ze(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ze(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ti = 1 << 32 - ze(t) + i | n << i | r, Ei = a + e;
		} else Ti = 1 << a | n << i | r, Ei = e;
	}
	function ki(e) {
		e.return !== null && (Di(e, 1), Oi(e, 1, 0));
	}
	function Ai(e) {
		for (; e === bi;) bi = vi[--yi], vi[yi] = null, xi = vi[--yi], vi[yi] = null;
		for (; e === wi;) wi = Si[--Ci], Si[Ci] = null, Ei = Si[--Ci], Si[Ci] = null, Ti = Si[--Ci], Si[Ci] = null;
	}
	function ji(e, t) {
		Si[Ci++] = Ti, Si[Ci++] = Ei, Si[Ci++] = wi, Ti = t.id, Ei = t.overflow, wi = e;
	}
	var Mi = null, B = null, V = !1, Ni = null, Pi = !1, Fi = Error(i(519));
	function Ii(e) {
		throw Hi(_i(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Fi;
	}
	function Li(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[st] = e, t[ct] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Vt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Gt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = en), t = !0) : t = !1, t || Ii(e, !0);
	}
	function Ri(e) {
		for (Mi = e.return; Mi;) switch (Mi.tag) {
			case 5:
			case 31:
			case 13:
				Pi = !1;
				return;
			case 27:
			case 3:
				Pi = !0;
				return;
			default: Mi = Mi.return;
		}
	}
	function zi(e) {
		if (e !== Mi) return !1;
		if (!V) return Ri(e), V = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || Ud(e.type, e.memoizedProps)), n = !n), n && B && Ii(e), Ri(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			B = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			B = uf(e);
		} else t === 27 ? (t = B, Zd(e.type) ? (e = lf, lf = null, B = e) : B = t) : B = Mi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Bi() {
		B = Mi = null, V = !1;
	}
	function Vi() {
		var e = Ni;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Ni = null), e;
	}
	function Hi(e) {
		Ni === null ? Ni = [e] : Ni.push(e);
	}
	var Ui = ce(null), Wi = null, Gi = null;
	function Ki(e, t, n) {
		P(Ui, t._currentValue), t._currentValue = n;
	}
	function qi(e) {
		e._currentValue = Ui.current, N(Ui);
	}
	function Ji(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Yi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ji(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ji(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Xi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Sr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === de.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Yi(t, e, n, r), t.flags |= 262144;
	}
	function Zi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Sr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Qi(e) {
		Wi = e, Gi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function $i(e) {
		return ta(Wi, e);
	}
	function ea(e, t) {
		return Wi === null && Qi(e), ta(e, t);
	}
	function ta(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Gi === null) {
			if (e === null) throw Error(i(308));
			Gi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Gi = Gi.next = t;
		return n;
	}
	var na = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ra = t.unstable_scheduleCallback, ia = t.unstable_NormalPriority, aa = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function oa() {
		return {
			controller: new na(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function sa(e) {
		e.refCount--, e.refCount === 0 && ra(ia, function() {
			e.controller.abort();
		});
	}
	var ca = null, la = 0, ua = 0, da = null;
	function fa(e, t) {
		if (ca === null) {
			var n = ca = [];
			la = 0, ua = dd(), da = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return la++, t.then(pa, pa), t;
	}
	function pa() {
		if (--la === 0 && ca !== null) {
			da !== null && (da.status = "fulfilled");
			var e = ca;
			ca = null, ua = 0, da = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ma(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ha = j.S;
	j.S = function(e, t) {
		eu = De(), typeof t == "object" && t && typeof t.then == "function" && fa(e, t), ha !== null && ha(e, t);
	};
	var ga = ce(null);
	function _a() {
		var e = ga.current;
		return e === null ? q.pooledCache : e;
	}
	function va(e, t) {
		t === null ? P(ga, ga.current) : P(ga, t.pool);
	}
	function ya() {
		var e = _a();
		return e === null ? null : {
			parent: aa._currentValue,
			pool: e
		};
	}
	var ba = Error(i(460)), xa = Error(i(474)), Sa = Error(i(542)), Ca = { then: function() {} };
	function wa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ta(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(en, en), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ka(e), e;
			default:
				if (typeof t.status == "string") t.then(en, en);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, ka(e), e;
				}
				throw Da = t, ba;
		}
	}
	function Ea(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Da = e, ba) : e;
		}
	}
	var Da = null;
	function Oa() {
		if (Da === null) throw Error(i(459));
		var e = Da;
		return Da = null, e;
	}
	function ka(e) {
		if (e === ba || e === Sa) throw Error(i(483));
	}
	var Aa = null, ja = 0;
	function Ma(e) {
		var t = ja;
		return ja += 1, Aa === null && (Aa = []), Ta(Aa, e, t);
	}
	function Na(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Pa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Fa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = li(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = pi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === te && Ea(i) === t.type) ? (t = a(t, n.props), Na(t, n), t.return = e, t) : (t = di(n.type, n.key, n.props, null, e.mode, r), Na(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = hi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = fi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = pi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = di(t.type, t.key, t.props, null, e.mode, n), Na(n, t), n.return = e, n;
					case v: return t = hi(t, e.mode, n), t.return = e, t;
					case te: return t = Ea(t), f(e, t, n);
				}
				if (A(t) || O(t)) return t = fi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ma(t), n);
				if (t.$$typeof === C) return f(e, ea(e, t), n);
				Pa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case te: return n = Ea(n), p(e, t, n, r);
				}
				if (A(n) || O(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ma(n), r);
				if (n.$$typeof === C) return p(e, t, ea(e, n), r);
				Pa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case te: return r = Ea(r), m(e, t, n, r, i);
				}
				if (A(r) || O(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ma(r), i);
				if (r.$$typeof === C) return m(e, t, n, ea(t, r), i);
				Pa(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), V && Di(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Di(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), V && Di(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), V && Di(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Di(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), V && Di(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === te && Ea(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Na(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === y ? (c = fi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = di(o.type, o.key, o.props, null, e.mode, c), Na(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = hi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case te: return o = Ea(o), b(e, r, o, c);
				}
				if (A(o)) return h(e, r, o, c);
				if (O(o)) {
					if (l = O(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ma(o), c);
				if (o.$$typeof === C) return b(e, r, ea(e, o), c);
				Pa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = pi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ja = 0;
				var i = b(e, t, n, r);
				return Aa = null, i;
			} catch (t) {
				if (t === ba || t === Sa) throw t;
				var a = si(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ia = Fa(!0), La = Fa(!1), Ra = !1;
	function za(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Ba(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Va(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ha(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ii(e), ri(e, null, n), t;
		}
		return ei(e, r, t, n), ii(e);
	}
	function Ua(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	function Wa(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ga = !1;
	function Ka() {
		if (Ga) {
			var e = da;
			if (e !== null) throw e;
		}
	}
	function qa(e, t, n, r) {
		Ga = !1;
		var i = e.updateQueue;
		Ra = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === ua && (Ga = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Ra = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ja(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ya(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t);
	}
	var Xa = ce(null), Za = ce(0);
	function Qa(e, t) {
		e = Ul, P(Za, e), P(Xa, t), Ul = e | t.baseLanes;
	}
	function $a() {
		P(Za, Ul), P(Xa, Xa.current);
	}
	function eo() {
		Ul = Za.current, N(Xa), N(Za);
	}
	var to = ce(null), no = null;
	function ro(e) {
		var t = e.alternate;
		P(co, co.current & 1), P(to, e), no === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (no = e);
	}
	function io(e) {
		P(co, co.current), P(to, e), no === null && (no = e);
	}
	function ao(e) {
		e.tag === 22 ? (P(co, co.current), P(to, e), no === null && (no = e)) : oo(e);
	}
	function oo() {
		P(co, co.current), P(to, to.current);
	}
	function so(e) {
		N(to), no === e && (no = null), N(co);
	}
	var co = ce(0);
	function lo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var uo = 0, H = null, U = null, fo = null, po = !1, mo = !1, ho = !1, go = 0, _o = 0, vo = null, yo = 0;
	function bo() {
		throw Error(i(321));
	}
	function xo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Sr(e[n], t[n])) return !1;
		return !0;
	}
	function So(e, t, n, r, i, a) {
		return uo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, j.H = e === null || e.memoizedState === null ? zs : Bs, ho = !1, a = n(r, i), ho = !1, mo && (a = wo(t, n, r, i)), Co(e), a;
	}
	function Co(e) {
		j.H = Rs;
		var t = U !== null && U.next !== null;
		if (uo = 0, fo = U = H = null, po = !1, _o = 0, vo = null, t) throw Error(i(300));
		e === null || rc || (e = e.dependencies, e !== null && Zi(e) && (rc = !0));
	}
	function wo(e, t, n, r) {
		H = e;
		var a = 0;
		do {
			if (mo && (vo = null), _o = 0, mo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, fo = U = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			j.H = Vs, o = t(n, r);
		} while (mo);
		return o;
	}
	function To() {
		var e = j.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Mo(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t;
	}
	function Eo() {
		var e = go !== 0;
		return go = 0, e;
	}
	function Do(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Oo(e) {
		if (po) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			po = !1;
		}
		uo = 0, fo = U = H = null, mo = !1, _o = go = 0, vo = null;
	}
	function ko() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return fo === null ? H.memoizedState = fo = e : fo = fo.next = e, fo;
	}
	function Ao() {
		if (U === null) {
			var e = H.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = U.next;
		var t = fo === null ? H.memoizedState : fo.next;
		if (t !== null) fo = t, U = e;
		else {
			if (e === null) throw H.alternate === null ? Error(i(467)) : Error(i(310));
			U = e, e = {
				memoizedState: U.memoizedState,
				baseState: U.baseState,
				baseQueue: U.baseQueue,
				queue: U.queue,
				next: null
			}, fo === null ? H.memoizedState = fo = e : fo = fo.next = e;
		}
		return fo;
	}
	function jo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Mo(e) {
		var t = _o;
		return _o += 1, vo === null && (vo = []), e = Ta(vo, e, t), t = H, (fo === null ? t.memoizedState : fo.next) === null && (t = t.alternate, j.H = t === null || t.memoizedState === null ? zs : Bs), e;
	}
	function No(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Mo(e);
			if (e.$$typeof === C) return $i(e);
		}
		throw Error(i(438, String(e)));
	}
	function Po(e) {
		var t = null, n = H.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = H.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = jo(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = re;
		return t.index++, n;
	}
	function Fo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Io(e) {
		return Lo(Ao(), U, e);
	}
	function Lo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (uo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ua && (d = !0);
					else if ((uo & p) === p) {
						u = u.next, p === ua && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, H.lanes |= p, Gl |= p;
					f = u.action, ho && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, H.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Sr(o, e.memoizedState) && (rc = !0, d && (n = da, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ro(e) {
		var t = Ao(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Sr(o, t.memoizedState) || (rc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function zo(e, t, n) {
		var r = H, a = Ao(), o = V;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Sr((U || a).memoizedState, n);
		if (s && (a.memoizedState = n, rc = !0), a = a.queue, us(Ho.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || fo !== null && fo.memoizedState.tag & 1) {
			if (r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, a, n, t), null), q === null) throw Error(i(349));
			o || uo & 127 || Bo(r, t, n);
		}
		return n;
	}
	function Bo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = H.updateQueue, t === null ? (t = jo(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Vo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Uo(t) && Wo(e);
	}
	function Ho(e, t, n) {
		return n(function() {
			Uo(t) && Wo(e);
		});
	}
	function Uo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Sr(e, n);
		} catch {
			return !0;
		}
	}
	function Wo(e) {
		var t = ni(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Go(e) {
		var t = ko();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ho) {
				Re(!0);
				try {
					n();
				} finally {
					Re(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Fo,
			lastRenderedState: e
		}, t;
	}
	function Ko(e, t, n, r) {
		return e.baseState = n, Lo(e, U, typeof r == "function" ? r : Fo);
	}
	function qo(e, t, n, r, a) {
		if (Fs(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			j.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Jo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Jo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = j.T, o = {};
			j.T = o;
			try {
				var s = n(i, r), c = j.S;
				c !== null && c(o, s), Yo(e, t, s);
			} catch (n) {
				Zo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), j.T = a;
			}
		} else try {
			a = n(i, r), Yo(e, t, a);
		} catch (n) {
			Zo(e, t, n);
		}
	}
	function Yo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Xo(e, t, n);
		}, function(n) {
			return Zo(e, t, n);
		}) : Xo(e, t, n);
	}
	function Xo(e, t, n) {
		t.status = "fulfilled", t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Jo(e, n)));
	}
	function Zo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function $o(e, t) {
		return t;
	}
	function es(e, t) {
		if (V) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = H;
					if (V) {
						if (B) {
							b: {
								for (var i = B, a = Pi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								B = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ii(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ko(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: $o,
			lastRenderedState: t
		}, n.queue = r, n = Ms.bind(null, H, r), r.dispatch = n, r = Go(!1), a = Ps.bind(null, H, !1, r.queue), r = ko(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = qo.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ts(e) {
		return ns(Ao(), U, e);
	}
	function ns(e, t, n) {
		if (t = Lo(e, t, $o)[0], e = Io(Fo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Mo(t);
		} catch (e) {
			throw e === ba ? Sa : e;
		}
		else r = t;
		t = Ao();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (H.flags |= 2048, as(9, { destroy: void 0 }, rs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function rs(e, t) {
		e.action = t;
	}
	function is(e) {
		var t = Ao(), n = U;
		if (n !== null) return ns(t, n, e);
		Ao(), t = t.memoizedState, n = Ao();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function as(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = H.updateQueue, t === null && (t = jo(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function os() {
		return Ao().memoizedState;
	}
	function ss(e, t, n, r) {
		var i = ko();
		H.flags |= e, i.memoizedState = as(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function cs(e, t, n, r) {
		var i = Ao();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		U !== null && r !== null && xo(r, U.memoizedState.deps) ? i.memoizedState = as(t, a, n, r) : (H.flags |= e, i.memoizedState = as(1 | t, a, n, r));
	}
	function ls(e, t) {
		ss(8390656, 8, e, t);
	}
	function us(e, t) {
		cs(2048, 8, e, t);
	}
	function ds(e) {
		H.flags |= 4;
		var t = H.updateQueue;
		if (t === null) t = jo(), H.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function fs(e) {
		var t = Ao().memoizedState;
		return ds({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ps(e, t) {
		return cs(4, 2, e, t);
	}
	function ms(e, t) {
		return cs(4, 4, e, t);
	}
	function hs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function gs(e, t, n) {
		n = n == null ? null : n.concat([e]), cs(4, 4, hs.bind(null, t, e), n);
	}
	function _s() {}
	function vs(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ys(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && xo(t, r[1])) return r[0];
		if (r = e(), ho) {
			Re(!0);
			try {
				e();
			} finally {
				Re(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function bs(e, t, n) {
		return n === void 0 || uo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), H.lanes |= e, Gl |= e, n);
	}
	function xs(e, t, n, r) {
		return Sr(n, t) ? n : Xa.current === null ? !(uo & 42) || uo & 1073741824 && !(Y & 261930) ? (rc = !0, e.memoizedState = n) : (e = mu(), H.lanes |= e, Gl |= e, t) : (e = bs(e, n, r), Sr(e, t) || (rc = !0), e);
	}
	function Ss(e, t, n, r, i) {
		var a = M.p;
		M.p = a !== 0 && 8 > a ? a : 8;
		var o = j.T, s = {};
		j.T = s, Ps(e, !1, t, n);
		try {
			var c = i(), l = j.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ns(e, t, ma(c, r), pu(e)) : Ns(e, t, r, pu(e));
		} catch (n) {
			Ns(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			M.p = a, o !== null && s.types !== null && (o.types = s.types), j.T = o;
		}
	}
	function Cs() {}
	function ws(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ts(e).queue;
		Ss(e, a, t, ae, n === null ? Cs : function() {
			return Es(e), n(r);
		});
	}
	function Ts(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ae,
			baseState: ae,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fo,
				lastRenderedState: ae
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Es(e) {
		var t = Ts(e);
		t.next === null && (t = e.alternate.memoizedState), Ns(e, t.next.queue, {}, pu());
	}
	function Ds() {
		return $i(Qf);
	}
	function Os() {
		return Ao().memoizedState;
	}
	function ks() {
		return Ao().memoizedState;
	}
	function As(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Va(n);
					var r = Ha(t, e, n);
					r !== null && (hu(r, t, n), Ua(r, t, n)), t = { cache: oa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function js(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e) ? Is(t, n) : (n = ti(e, t, n, r), n !== null && (hu(n, e, r), Ls(n, t, r)));
	}
	function Ms(e, t, n) {
		Ns(e, t, n, pu());
	}
	function Ns(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Fs(e)) Is(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Sr(s, o)) return ei(e, t, i, 0), q === null && $r(), !1;
			} catch {}
			if (n = ti(e, t, i, r), n !== null) return hu(n, e, r), Ls(n, t, r), !0;
		}
		return !1;
	}
	function Ps(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e)) {
			if (t) throw Error(i(479));
		} else t = ti(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Fs(e) {
		var t = e.alternate;
		return e === H || t !== null && t === H;
	}
	function Is(e, t) {
		mo = po = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ls(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	var Rs = {
		readContext: $i,
		use: No,
		useCallback: bo,
		useContext: bo,
		useEffect: bo,
		useImperativeHandle: bo,
		useLayoutEffect: bo,
		useInsertionEffect: bo,
		useMemo: bo,
		useReducer: bo,
		useRef: bo,
		useState: bo,
		useDebugValue: bo,
		useDeferredValue: bo,
		useTransition: bo,
		useSyncExternalStore: bo,
		useId: bo,
		useHostTransitionStatus: bo,
		useFormState: bo,
		useActionState: bo,
		useOptimistic: bo,
		useMemoCache: bo,
		useCacheRefresh: bo
	};
	Rs.useEffectEvent = bo;
	var zs = {
		readContext: $i,
		use: No,
		useCallback: function(e, t) {
			return ko().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: $i,
		useEffect: ls,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ss(4194308, 4, hs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ss(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ss(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ko();
			t = t === void 0 ? null : t;
			var r = e();
			if (ho) {
				Re(!0);
				try {
					e();
				} finally {
					Re(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ko();
			if (n !== void 0) {
				var i = n(t);
				if (ho) {
					Re(!0);
					try {
						n(t);
					} finally {
						Re(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = js.bind(null, H, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ko();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Go(e);
			var t = e.queue, n = Ms.bind(null, H, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return bs(ko(), e, t);
		},
		useTransition: function() {
			var e = Go(!1);
			return e = Ss.bind(null, H, e.queue, !0, !1), ko().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = H, a = ko();
			if (V) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || Bo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ls(Ho.bind(null, r, o, e), [e]), r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ko(), t = q.identifierPrefix;
			if (V) {
				var n = Ei, r = Ti;
				n = (r & ~(1 << 32 - ze(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = go++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = yo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ds,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e) {
			var t = ko();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ps.bind(null, H, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Po,
		useCacheRefresh: function() {
			return ko().memoizedState = As.bind(null, H);
		},
		useEffectEvent: function(e) {
			var t = ko(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Bs = {
		readContext: $i,
		use: No,
		useCallback: vs,
		useContext: $i,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Io,
		useRef: os,
		useState: function() {
			return Io(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return xs(Ao(), U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			return Ko(Ao(), U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Bs.useEffectEvent = fs;
	var Vs = {
		readContext: $i,
		use: No,
		useCallback: vs,
		useContext: $i,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Ro,
		useRef: os,
		useState: function() {
			return Ro(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			var n = Ao();
			return U === null ? bs(n, e, t) : xs(n, U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			var n = Ao();
			return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ko(n, U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Vs.useEffectEvent = fs;
	function Hs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Us = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Va(n);
			r.tag = 2, t != null && (r.callback = t), t = Ha(e, r, n), t !== null && (hu(t, e, n), Ua(t, e, n));
		}
	};
	function Ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Cr(n, r) || !Cr(i, a) : !0;
	}
	function Gs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Us.enqueueReplaceState(t, t.state, null);
	}
	function Ks(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function qs(e) {
		Yr(e);
	}
	function Js(e) {
		console.error(e);
	}
	function Ys(e) {
		Yr(e);
	}
	function Xs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Zs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
		return n = Va(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Xs(e, t);
		}, n;
	}
	function $s(e) {
		return e = Va(e), e.tag = 3, e;
	}
	function ec(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Zs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Zs(t, n, r), typeof i != "function" && (ru === null ? ru = /* @__PURE__ */ new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function tc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Xi(t, n, a, !0), n = to.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return no === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (V) return t = to.current, t === null ? (r !== Fi && (t = Error(i(423), { cause: r }), Hi(_i(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = _i(r, n), a = Qs(e.stateNode, r, a), Wa(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Fi && (e = Error(i(422), { cause: r }), Hi(_i(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = _i(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = _i(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Qs(n.stateNode, r, e), Wa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = $s(a), ec(a, e, n, r), Wa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var nc = Error(i(461)), rc = !1;
	function ic(e, t, n, r) {
		t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r);
	}
	function ac(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Qi(t), r = So(e, t, n, o, a, i), s = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (V && s && ki(t), t.flags |= 1, ic(e, t, r, i), t.child);
	}
	function oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ci(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = di(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ac(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Cr : n, n(o, r) && e.ref === t.ref) return kc(e, t, i);
		}
		return t.flags |= 1, e = li(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function sc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Cr(a, r) && e.ref === t.ref) if (rc = !1, t.pendingProps = r = a, Ac(e, i)) e.flags & 131072 && (rc = !0);
			else return t.lanes = e.lanes, kc(e, t, i);
		}
		return hc(e, t, n, r, i);
	}
	function cc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && va(t, a === null ? null : a.cachePool), a === null ? $a() : Qa(t, a), ao(t);
			else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && va(t, null), $a(), oo(t)) : (va(t, a.cachePool), Qa(t, a), oo(t), t.memoizedState = null);
		return ic(e, t, i, n), t.child;
	}
	function lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function uc(e, t, n, r, i) {
		var a = _a();
		return a = a === null ? null : {
			parent: aa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && va(t, null), $a(), ao(t), e !== null && Xi(e, t, r, !0), t.childLanes = i, null;
	}
	function dc(e, t) {
		return t = wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function fc(e, t, n) {
		return Ia(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, so(t), t.memoizedState = null, e;
	}
	function pc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (V) {
				if (r.mode === "hidden") return e = dc(t, r), t.lanes = 536870912, lc(null, e);
				if (io(t), (e = B) ? (e = rf(e, Pi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: wi === null ? null : {
						id: Ti,
						overflow: Ei
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = mi(e), n.return = t, t.child = n, Mi = t, B = null)) : e = null, e === null) throw Ii(t);
				return t.lanes = 536870912, null;
			}
			return dc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (io(t), a) if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (rc || Xi(e, t, n, !1), a = (n & e.childLanes) !== 0, rc || a) {
				if (r = q, r !== null && (s = tt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ni(e, s), hu(r, e, s), nc;
				Du(), t = fc(e, t, n);
			} else e = o.treeContext, B = cf(s.nextSibling), Mi = t, V = !0, Ni = null, Pi = !1, e !== null && ji(t, e), t = dc(t, r), t.flags |= 4096;
			return t;
		}
		return e = li(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function mc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function hc(e, t, n, r, i) {
		return Qi(t), n = So(e, t, n, r, void 0, i), r = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (V && r && ki(t), t.flags |= 1, ic(e, t, n, i), t.child);
	}
	function gc(e, t, n, r, i, a) {
		return Qi(t), t.updateQueue = null, n = wo(t, r, n, i), Co(e), r = Eo(), e !== null && !rc ? (Do(e, t, a), kc(e, t, a)) : (V && r && ki(t), t.flags |= 1, ic(e, t, n, a), t.child);
	}
	function _c(e, t, n, r, i) {
		if (Qi(t), t.stateNode === null) {
			var a = ai, o = n.contextType;
			typeof o == "object" && o && (a = $i(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Us, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, za(t), o = n.contextType, a.context = typeof o == "object" && o ? $i(o) : ai, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Us.enqueueReplaceState(a, a.state, null), qa(t, r, a, i), Ka(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ks(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ai, typeof u == "object" && u && (o = $i(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Gs(t, a, r, o), Ra = !1;
			var f = t.memoizedState;
			a.state = f, qa(t, r, a, i), Ka(), l = t.memoizedState, s || f !== l || Ra ? (typeof d == "function" && (Hs(t, n, d, r), l = t.memoizedState), (c = Ra || Ws(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ba(e, t), o = t.memoizedProps, u = Ks(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ai, typeof l == "object" && l && (c = $i(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Gs(t, a, r, c), Ra = !1, f = t.memoizedState, a.state = f, qa(t, r, a, i), Ka();
			var p = t.memoizedState;
			o !== d || f !== p || Ra || e !== null && e.dependencies !== null && Zi(e.dependencies) ? (typeof s == "function" && (Hs(t, n, s, r), p = t.memoizedState), (u = Ra || Ws(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Zi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, mc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ia(t, e.child, null, i), t.child = Ia(t, null, n, i)) : ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = kc(e, t, i), e;
	}
	function vc(e, t, n, r) {
		return Bi(), t.flags |= 256, ic(e, t, n, r), t.child;
	}
	var yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function bc(e) {
		return {
			baseLanes: e,
			cachePool: ya()
		};
	}
	function xc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, a = !1, o = !!(t.flags & 128), s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(co.current & 2)), s && (a = !0, t.flags &= -129), s = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (V) {
				if (a ? ro(t) : oo(t), (e = B) ? (e = rf(e, Pi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: wi === null ? null : {
						id: Ti,
						overflow: Ei
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = mi(e), n.return = t, t.child = n, Mi = t, B = null)) : e = null, e === null) throw Ii(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (oo(t), a = t.mode, c = wc({
				mode: "hidden",
				children: c
			}, a), r = fi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(null, r)) : (ro(t), Cc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ro(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (oo(t), c = r.fallback, a = t.mode, r = wc({
				mode: "visible",
				children: r.children
			}, a), c = fi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ia(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, t = lc(null, r)) : (oo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ro(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Hi({
					value: r,
					source: null,
					stack: null
				}), t = Tc(e, t, n);
			} else if (rc || Xi(e, t, n, !1), s = (n & e.childLanes) !== 0, rc || s) {
				if (s = q, s !== null && (r = tt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ni(e, r), hu(s, e, r), nc;
				af(c) || Du(), t = Tc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, B = cf(c.nextSibling), Mi = t, V = !0, Ni = null, Pi = !1, e !== null && ji(t, e), t = Cc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (oo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = li(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = fi(c, a, n, null), c.flags |= 2) : c = li(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (a = c.cachePool, a === null ? a = ya() : (l = aa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(e.child, r)) : (ro(t), n = e.child, e = n.sibling, n = li(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Cc(e, t) {
		return t = wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function wc(e, t) {
		return e = si(22, e, null, t), e.lanes = 0, e;
	}
	function Tc(e, t, n) {
		return Ia(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ec(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ji(e.return, t, n);
	}
	function Dc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function Oc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = co.current, s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, P(co, o), ic(e, t, r, n), r = V ? xi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ec(e, n, t);
			else if (e.tag === 19) Ec(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && lo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Dc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && lo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Dc(t, !0, n, null, a, r);
				break;
			case "together":
				Dc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function kc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Xi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = li(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = li(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ac(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && Zi(e)));
	}
	function jc(e, t, n) {
		switch (t.tag) {
			case 3:
				fe(t, t.stateNode.containerInfo), Ki(t, aa, e.memoizedState.cache), Bi();
				break;
			case 27:
			case 5:
				me(t);
				break;
			case 4:
				fe(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ki(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ro(t), e = kc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (ro(t), t.flags |= 128, null);
				ro(t);
				break;
			case 19:
				var i = !!(e.flags & 128);
				if (r = (n & t.childLanes) !== 0, r ||= (Xi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Oc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), P(co, co.current), r) break;
				return null;
			case 22: return t.lanes = 0, cc(e, t, n, t.pendingProps);
			case 24: Ki(t, aa, e.memoizedState.cache);
		}
		return kc(e, t, n);
	}
	function Mc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) rc = !0;
		else {
			if (!Ac(e, n) && !(t.flags & 128)) return rc = !1, jc(e, t, n);
			rc = !!(e.flags & 131072);
		}
		else rc = !1, V && t.flags & 1048576 && Oi(t, xi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ea(t.elementType), t.type = e, typeof e == "function") ci(e) ? (r = Ks(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = ac(null, t, e, r, n);
								break a;
							}
							if (a === E) {
								t.tag = 14, t = oc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ie(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return hc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ks(r, t.pendingProps), _c(e, t, r, a, n);
			case 3:
				a: {
					if (fe(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ba(e, t), qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ki(t, aa, r), r !== o.cache && Yi(t, [aa], n, !0), Ka(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = vc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = _i(Error(i(424)), t), Hi(a), t = vc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (B = cf(e.firstChild), Mi = t, V = !0, Ni = null, Pi = !0, n = La(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Bi(), r === a) {
							t = kc(e, t, n);
							break a;
						}
						ic(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return mc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : V || (n = t.type, e = t.pendingProps, r = Bd(F.current).createElement(n), r[st] = t, r[ct] = e, Pd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return me(t), e === null && V && (r = t.stateNode = ff(t.type, t.pendingProps, F.current), Mi = t, Pi = !0, a = B, Zd(t.type) ? (lf = a, B = cf(r.firstChild)) : B = a), ic(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && V && ((a = r = B) && (r = tf(r, t.type, t.pendingProps, Pi), r === null ? a = !1 : (t.stateNode = r, Mi = t, B = cf(r.firstChild), Pi = !1, a = !0)), a || Ii(t)), me(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = So(e, t, To, null, null, n), Qf._currentValue = a), mc(e, t), ic(e, t, r, n), t.child;
			case 6: return e === null && V && ((e = n = B) && (n = nf(n, t.pendingProps, Pi), n === null ? e = !1 : (t.stateNode = n, Mi = t, B = null, e = !0)), e || Ii(t)), null;
			case 13: return Sc(e, t, n);
			case 4: return fe(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ia(t, null, r, n) : ic(e, t, r, n), t.child;
			case 11: return ac(e, t, t.type, t.pendingProps, n);
			case 7: return ic(e, t, t.pendingProps, n), t.child;
			case 8: return ic(e, t, t.pendingProps.children, n), t.child;
			case 12: return ic(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ki(t, t.type, r.value), ic(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Qi(t), a = $i(a), r = r(a), t.flags |= 1, ic(e, t, r, n), t.child;
			case 14: return oc(e, t, t.type, t.pendingProps, n);
			case 15: return sc(e, t, t.type, t.pendingProps, n);
			case 19: return Oc(e, t, n);
			case 31: return pc(e, t, n);
			case 22: return cc(e, t, n, t.pendingProps);
			case 24: return Qi(t), r = $i(aa), e === null ? (a = _a(), a === null && (a = q, o = oa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, za(t), Ki(t, aa, a)) : ((e.lanes & n) !== 0 && (Ba(e, t), qa(t, null, null, n), Ka()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ki(t, aa, r), r !== a.cache && Yi(t, [aa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ki(t, aa, r))), ic(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e) {
		e.flags |= 4;
	}
	function Pc(e, t, n, r, i) {
		if ((t = !!(e.mode & 32)) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Da = Ca, xa;
		} else e.flags &= -16777217;
	}
	function Fc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Da = Ca, xa;
	}
	function Ic(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ye(), e.lanes |= t, Yl |= t);
	}
	function Lc(e, t) {
		if (!V) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function W(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Ai(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return W(t), null;
			case 1: return W(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), qi(aa), pe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (zi(t) ? Nc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Vi())), W(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Nc(t), o === null ? (W(t), Pc(t, a, null, r, n)) : (W(t), Fc(t, o))) : o ? o === e.memoizedState ? (W(t), t.flags &= -16777217) : (Nc(t), W(t), Fc(t, o)) : (e = e.memoizedProps, e !== r && Nc(t), W(t), Pc(t, a, e, r, n)), null;
			case 27:
				if (he(t), n = F.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					e = le.current, zi(t) ? Li(t, e) : (e = ff(a, r, n), t.stateNode = e, Nc(t));
				}
				return W(t), null;
			case 5:
				if (he(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					if (o = le.current, zi(t)) Li(t, o);
					else {
						var s = Bd(F.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[st] = t, o[ct] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Nc(t);
					}
				}
				return W(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = F.current, zi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Mi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[st] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ii(t, !0);
					} else e = Bd(e).createTextNode(r), e[st] = t, t.stateNode = e;
				}
				return W(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = zi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[st] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), e = !1;
					} else n = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (so(t), t) : (so(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return W(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = zi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[st] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), a = !1;
					} else a = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (so(t), t) : (so(t), null);
				}
				return so(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ic(t, t.updateQueue), W(t), null);
			case 4: return pe(), e === null && Sd(t.stateNode.containerInfo), W(t), null;
			case 10: return qi(t.type), W(t), null;
			case 19:
				if (N(co), r = t.memoizedState, r === null) return W(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) if (a) Lc(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = lo(e), o !== null) {
							for (t.flags |= 128, Lc(r, !1), e = o.updateQueue, t.updateQueue = e, Ic(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ui(n, e), n = n.sibling;
							return P(co, co.current & 1 | 2), V && Di(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && De() > tu && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = lo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ic(t, e), Lc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !V) return W(t), null;
					} else 2 * De() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (W(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = De(), e.sibling = null, n = co.current, P(co, a ? n & 1 | 2 : n & 1), V && Di(t, r.treeForkCount), e);
			case 22:
			case 23: return so(t), eo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), n = t.updateQueue, n !== null && Ic(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && N(ga), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), qi(aa), W(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e, t) {
		switch (Ai(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return qi(aa), pe(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return he(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (so(t), t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (so(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return N(co), null;
			case 4: return pe(), null;
			case 10: return qi(t.type), null;
			case 22:
			case 23: return so(t), eo(), e !== null && N(ga), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return qi(aa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Ai(t), t.tag) {
			case 3:
				qi(aa), pe();
				break;
			case 26:
			case 27:
			case 5:
				he(t);
				break;
			case 4:
				pe();
				break;
			case 31:
				t.memoizedState !== null && so(t);
				break;
			case 13:
				so(t);
				break;
			case 19:
				N(co);
				break;
			case 10:
				qi(t.type);
				break;
			case 22:
			case 23:
				so(t), eo(), e !== null && N(ga);
				break;
			case 24: qi(aa);
		}
	}
	function Vc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ya(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Ks(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function qc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[ct] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = en));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[st] = e, t[ct] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Dr(e), Or(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ks(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ks(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
				break;
			case 3:
				if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ya(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
				break;
			case 12:
				bl(e, n);
				break;
			case 31:
				bl(e, n), r & 4 && dl(e, n);
				break;
			case 13:
				bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Sl(e, n, !!(n.subtreeFlags & 8772)) : bl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var G = null, cl = !1;
	function ll(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (Le && typeof Le.onCommitFiberUnmount == "function") try {
			Le.onCommitFiberUnmount(Ie, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = G, i = cl;
				Zd(n.type) && (G = n.stateNode, cl = !1), ll(e, t, n), pf(n.stateNode), G = r, cl = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = G, i = cl, G = null, ll(e, t, n), G = r, cl = i, G !== null) if (cl) try {
					(G.nodeType === 9 ? G.body : G.nodeName === "HTML" ? G.ownerDocument.body : G).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					G.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				G !== null && (cl ? (e = G, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(G, n.stateNode));
				break;
			case 4:
				r = G, i = cl, G = n.stateNode.containerInfo, cl = !0, ll(e, t, n), G = r, cl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), ll(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), ll(e, t, n);
				break;
			case 21:
				ll(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, ll(e, t, n), tl = r;
				break;
			default: ll(e, t, n);
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function pl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ml(e, t) {
		var n = pl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function hl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							G = c.stateNode, cl = !1;
							break a;
						}
						break;
					case 5:
						G = c.stateNode, cl = !1;
						break a;
					case 3:
					case 4:
						G = c.stateNode.containerInfo, cl = !0;
						break a;
				}
				c = c.return;
			}
			if (G === null) throw Error(i(160));
			ul(o, s, a), G = null, cl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) _l(t, e), t = t.sibling;
	}
	var gl = null;
	function _l(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				hl(t, e), vl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[mt] || o[st] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[st] = e, bt(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[st] = e, bt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Kt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
				break;
			case 6:
				if (hl(t, e), vl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = gl, gl = gf(t.containerInfo), hl(t, e), gl = a, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				nl && (nl = !1, yl(e));
				break;
			case 4:
				r = gl, gl = gf(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
				break;
			case 12:
				hl(t, e), vl(e);
				break;
			case 31:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 13:
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = De()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || a, tl = d || l, hl(t, e), tl = d, el = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || xl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
				break;
			case 19:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: hl(t, e), vl(e);
		}
	}
	function vl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Qc(e, Xc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Kt(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function yl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), xl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), xl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), xl(t);
					break;
				case 22:
					t.memoizedState === null && xl(t);
					break;
				case 30:
					xl(t);
					break;
				default: xl(t);
			}
			e = e.sibling;
		}
	}
	function Sl(e, t, n) {
		for (n &&= !!(t.subtreeFlags & 8772), t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Sl(i, a, n), Vc(4, a);
					break;
				case 1:
					if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
					break;
				case 12:
					Sl(i, a, n);
					break;
				case 31:
					Sl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 13:
					Sl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 22:
					a.memoizedState === null && Sl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sa(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e));
	}
	function Tl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling;
	}
	function El(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e)));
				break;
			case 12:
				if (i & 2048) {
					Tl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Tl(e, t, n, r);
				break;
			case 31:
				Tl(e, t, n, r);
				break;
			case 13:
				Tl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, !!(t.subtreeFlags & 10256) || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
				break;
			case 24:
				Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
				break;
			default: Tl(e, t, n, r);
		}
	}
	function Dl(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Dl(a, o, s, c, i), Vc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
					break;
				case 24:
					Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
					break;
				default: Dl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ol(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				case 24:
					Ol(n, r), i & 2048 && wl(r.alternate, r);
					break;
				default: Ol(n, r);
			}
			t = t.sibling;
		}
	}
	var kl = 8192;
	function Al(e, t, n) {
		if (e.subtreeFlags & kl) for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling;
	}
	function jl(e, t, n) {
		switch (e.tag) {
			case 26:
				Al(e, t, n), e.flags & kl && e.memoizedState !== null && Gf(n, gl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Al(e, t, n);
				break;
			case 3:
			case 4:
				var r = gl;
				gl = gf(e.stateNode.containerInfo), Al(e, t, n), gl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
				break;
			default: Al(e, t, n);
		}
	}
	function Ml(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Pl(e), e = e.sibling;
	}
	function Pl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e), e.flags & 2048 && Hc(9, e, e.return);
				break;
			case 3:
				Nl(e);
				break;
			case 12:
				Nl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
				break;
			default: Nl(e);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				il = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Fl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
					break;
				default: Fl(t);
			}
			e = e.sibling;
		}
	}
	function Il(e, t) {
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: sa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = $i(aa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return $i(aa).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return K & 2 && Y !== 0 ? Y & -Y : j.T === null ? it() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(Y & 536870912) || V) {
			var e = Ue;
			Ue <<= 1, !(Ue & 3932160) && (Ue = 262144), Jl = e;
		} else Jl = 536870912;
		return e = to.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), Ze(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || qe(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !vu(n)) {
				a = Ou(e, t, !1), o = !1;
				continue;
			}
			if (a === 2) {
				if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
				else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
				if (s !== 0) {
					t = s;
					a: {
						var c = e;
						a = Xl;
						var l = c.current.memoizedState.isDehydrated;
						if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
							if (Hl && !l) {
								c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
								break a;
							}
							o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
						}
						a = s;
					}
					if (o = !1, a !== 2) continue;
				}
			}
			if (a === 1) {
				Su(e, 0), yu(e, t, 0, !0);
				break;
			}
			a: {
				switch (r = e, o = a, o) {
					case 0:
					case 1: throw Error(i(345));
					case 4: if ((t & 4194048) !== t) break;
					case 6:
						yu(r, t, Jl, !Bl);
						break a;
					case 2:
						Zl = null;
						break;
					case 3:
					case 5: break;
					default: throw Error(i(329));
				}
				if ((t & 62914560) === t && (a = $l + 300 - De(), 10 < a)) {
					if (yu(r, t, Jl, !Bl), Ke(r, 0, !0) !== 0) break a;
					su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
					break a;
				}
				_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: en
			}, jl(t, a, d);
			var m = (a & 62914560) === a ? $l - De() : (a & 4194048) === a ? eu - De() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Sr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - ze(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && $e(e, n, t);
	}
	function bu() {
		return K & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Gi = Wi = null, Oo(e), Aa = null, ja = 0, e = J;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), q = e, J = n = li(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = qe(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - ze(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, $r(), n;
	}
	function Cu(e, t) {
		H = null, j.H = Rs, t === ba || t === Sa ? (t = Oa(), X = 3) : t === xa ? (t = Oa(), X = 4) : X = t === nc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, Xs(e, _i(t, e.current)));
	}
	function wu() {
		var e = to.current;
		return e === null ? !0 : (Y & 4194048) === Y ? no === null : (Y & 62914560) === Y || Y & 536870912 ? e === no : !1;
	}
	function Tu() {
		var e = j.H;
		return j.H = Rs, e === null ? Rs : e;
	}
	function Eu() {
		var e = j.A;
		return j.A = Ll, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && to.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || q === null || yu(q, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = K;
		K |= 2;
		var i = Tu(), a = Eu();
		(q !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							to.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Gi = Wi = null, K = r, j.H = i, j.A = a, J === null && (q = null, Y = 0, $r()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = K;
		K |= 2;
		var r = Tu(), a = Eu();
		q !== e || Y !== t ? (nu = null, tu = De() + 500, Su(e, t)) : Vl = qe(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (wa(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							wa(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Gi = Wi = null, j.H = r, j.A = a, K = n, J === null ? (q = null, Y = 0, $r(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !Te();) Mu(J);
	}
	function Mu(e) {
		var t = Mc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = gc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = gc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Oo(t);
			default: Bc(n, t), t = J = ui(t, Ul), t = Mc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Gi = Wi = null, Oo(t), Aa = null, ja = 0;
		var i = t.return;
		try {
			if (tc(e, i, t, n, Y)) {
				Wl = 1, Xs(e, _i(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, Xs(e, _i(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (V || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = to.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = zc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (K & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Qr, Qe(e, n, o, s, c, l), e === q && (J = q = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(je, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
				r = j.T, j.T = null, a = M.p, M.p = 2, s = K, K |= 4;
				try {
					al(e, t, n);
				} finally {
					K = s, M.p = a, j.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || n) {
				n = j.T, j.T = null;
				var r = M.p;
				M.p = 2;
				var i = K;
				K |= 4;
				try {
					_l(t, e);
					var a = zd, o = Dr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Er(s.ownerDocument.documentElement, s)) {
						if (c !== null && Or(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Tr(s, h), v = Tr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					K = i, M.p = r, j.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = j.T, j.T = null;
				var r = M.p;
				M.p = 2;
				var i = K;
				K |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					K = i, M.p = r, j.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Ee();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), rt(n), t = t.stateNode, Le && typeof Le.onCommitFiberRoot == "function") try {
				Le.onCommitFiberRoot(Ie, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = j.T, i = M.p, M.p = 2, j.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					j.T = t, M.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = rt(su), r = j.T, a = M.p;
		try {
			M.p = 32 > n ? 32 : n, j.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Pl(o.current), El(o, o.current, s, n), K = c, id(0, !1), Le && typeof Le.onPostCommitFiberRoot == "function") try {
				Le.onPostCommitFiberRoot(Ie, o);
			} catch {}
			return !0;
		} finally {
			M.p = a, j.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = _i(n, t), t = Qs(e.stateNode, t, 2), e = Ha(e, t, 2), e !== null && (Ze(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = _i(n, e), n = $s(2), r = Ha(t, n, 2), r !== null && (ec(n, r, t, e), Ze(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Rl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > De() - $l ? !(K & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Ye()), e = ni(e, t), e !== null && (Ze(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return Ce(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - ze(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = Y, a = Ke(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || qe(r, a) || (n = !0, ld(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = De(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - ze(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Je(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = Ke(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && we(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || qe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && we(r), rt(n)) {
				case 2:
				case 8:
					n = Ae;
					break;
				case 32:
					n = je;
					break;
				case 268435456:
					n = Ne;
					break;
				default: n = je;
			}
			return r = cd.bind(null, e), n = Ce(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && we(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Ke(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, De()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			K & 6 ? Ce(ke, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = ua;
			e === 0 && (e = He, He <<= 1, !(He & 261888) && (He = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $t("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[ct] || null).action), o = r.submitter;
			o && (t = (t = o[ct] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Sn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								ws(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), ws(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < qr.length; hd++) {
		var gd = qr[hd];
		Jr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Jr(zr, "onAnimationEnd"), Jr(Br, "onAnimationIteration"), Jr(Vr, "onAnimationStart"), Jr("dblclick", "onDoubleClick"), Jr("focusin", "onFocus"), Jr("focusout", "onBlur"), Jr(Hr, "onTransitionRun"), Jr(Ur, "onTransitionStart"), Jr(Wr, "onTransitionCancel"), Jr(Gr, "onTransitionEnd"), wt("onMouseEnter", ["mouseout", "mouseover"]), wt("onMouseLeave", ["mouseout", "mouseover"]), wt("onPointerEnter", ["pointerout", "pointerover"]), wt("onPointerLeave", ["pointerout", "pointerover"]), Ct("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ct("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ct("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ct("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Yr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Yr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[ut];
		n === void 0 && (n = t[ut] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, xt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !dn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = gt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		cn(function() {
			var r = a, i = nn(n), s = [];
			a: {
				var c = Kr.get(e);
				if (c !== void 0) {
					var l = Sn, u = e;
					switch (e) {
						case "keypress": if (_n(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Bn;
							break;
						case "focusin":
							u = "focus", l = jn;
							break;
						case "focusout":
							u = "blur", l = jn;
							break;
						case "beforeblur":
						case "afterblur":
							l = jn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = kn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = An;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Vn;
							break;
						case zr:
						case Br:
						case Vr:
							l = Mn;
							break;
						case Gr:
							l = Hn;
							break;
						case "scroll":
						case "scrollend":
							l = wn;
							break;
						case "wheel":
							l = Un;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Nn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = R;
							break;
						case "toggle":
						case "beforetoggle": l = Wn;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = ln(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== tn && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[lt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = kn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = R, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = ur;
					else if (ir(c)) if (dr) v = br;
					else {
						v = vr;
						var y = _r;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Xt(r.elementType) && (v = ur) : v = yr;
					if (v &&= v(e, r)) {
						ar(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ht(c, "number", c.value);
				}
				switch (y = r ? vt(r) : window, e) {
					case "focusin":
						(ir(y) || y.contentEditable === "true") && (Ar = y, z = r, jr = null);
						break;
					case "focusout":
						jr = z = Ar = null;
						break;
					case "mousedown":
						Mr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Mr = !1, Nr(s, n, i);
						break;
					case "selectionchange": if (kr) break;
					case "keydown":
					case "keyup": Nr(s, n, i);
				}
				var b;
				if (Kn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else er ? Qn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Yn && n.locale !== "ko" && (er || x !== "onCompositionStart" ? x === "onCompositionEnd" && er && (b = gn()) : (pn = i, mn = "value" in pn ? pn.value : pn.textContent, er = !0)), y = Ed(r, x), 0 < y.length && (x = new Pn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = $n(n), b !== null && (x.data = b)))), (b = Jn ? tr(e, n) : nr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Pn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = ln(e, n), i != null && r.unshift(Td(e, i, a)), i = ln(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = ln(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = ln(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Kt(e, "" + r);
				break;
			case "className":
				At(e, "class", r);
				break;
			case "tabIndex":
				At(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				At(e, n, r);
				break;
			case "style":
				Yt(e, r, o);
				break;
			case "data": if (t !== "object") {
				At(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = $t("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), kt(e, "popover", r);
				break;
			case "xlinkActuate":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				kt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Zt.get(n) || n, kt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Yt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && Kt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!St.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[ct] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : kt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Vt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Ut(e, !!r, n, !0) : Ut(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Gt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Xt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Bt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Ut(e, !!n, n ? [] : "", !1) : Ut(e, !!n, t, !0)) : Ut(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Wt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Xt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== Wd && (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[mt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), ht(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[mt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		ht(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = M.d;
	M.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = _t(e);
		t !== null && t.tag === 5 && t.type === "form" ? Es(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = zt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + zt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + zt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + zt(n.imageSizes) + "\"]")) : i += "[href=\"" + zt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + zt(r) + "\"][href=\"" + zt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), bt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = yt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					bt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = F.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = yt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = yt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = yt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + zt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), bt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + zt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + zt(n.href) + "\"]");
				if (r) return t.instance = r, bt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), bt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, bt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), bt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, bt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), bt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[mt] || a[st] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, bt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), bt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: ae,
		_currentValue2: ae,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Xe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xe(0), this.hiddenUpdates = Xe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = si(3, null, null, t), e.current = a, a.stateNode = e, t = oa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, za(a), e;
	}
	function tp(e) {
		return e ? (e = ai, e) : ai;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Va(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ha(e, r, t), n !== null && (hu(n, e, t), Ua(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ni(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = nt(t);
			var n = ni(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = j.T;
		j.T = null;
		var a = M.p;
		try {
			M.p = 2, up(e, t, n, r);
		} finally {
			M.p = a, j.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = j.T;
		j.T = null;
		var a = M.p;
		try {
			M.p = 8, up(e, t, n, r);
		} finally {
			M.p = a, j.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = _t(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ge(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - ze(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(K & 6) && (tu = De() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ni(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = nn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = gt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Oe()) {
				case ke: return 2;
				case Ae: return 8;
				case je:
				case Me: return 32;
				case Ne: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = _t(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = gt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, at(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, at(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				tn = r, n.target.dispatchEvent(r), tn = null;
			} else return t = _t(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = _t(n);
				a !== null && (e.splice(t, 3), t -= 3, ws(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ct] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ct] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[lt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = it();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.8") throw Error(i(527, Lp, "19.2.8"));
	M.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.8",
		rendererPackageName: "react-dom",
		currentDispatcherRef: j,
		reconcilerVersion: "19.2.8"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ie = zp.inject(Rp), Le = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = qs, s = Js, c = Ys;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[lt] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = "-ms-", v = "-moz-", y = "-webkit-", b = "comm", x = "rule", S = "decl", C = "@import", w = "@namespace", T = "@keyframes", ee = "@layer", E = Math.abs, te = String.fromCharCode, ne = Object.assign;
function re(e, t) {
	return A(e, 0) ^ 45 ? (((t << 2 ^ A(e, 0)) << 2 ^ A(e, 1)) << 2 ^ A(e, 2)) << 2 ^ A(e, 3) : 0;
}
function D(e) {
	return e.trim();
}
function O(e, t) {
	return (e = t.exec(e)) ? e[0] : e;
}
function k(e, t, n) {
	return e.replace(t, n);
}
function ie(e, t, n) {
	return e.indexOf(t, n);
}
function A(e, t) {
	return e.charCodeAt(t) | 0;
}
function j(e, t, n) {
	return e.slice(t, n);
}
function M(e) {
	return e.length;
}
function ae(e) {
	return e.length;
}
function oe(e, t) {
	return t.push(e), e;
}
function se(e, t) {
	return e.map(t).join("");
}
function ce(e, t) {
	return e.filter(function(e) {
		return !O(e, t);
	});
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var N = 1, P = 1, le = 0, ue = 0, F = 0, de = "";
function fe(e, t, n, r, i, a, o, s) {
	return {
		value: e,
		root: t,
		parent: n,
		type: r,
		props: i,
		children: a,
		line: N,
		column: P,
		length: o,
		return: "",
		siblings: s
	};
}
function pe(e, t) {
	return ne(fe("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function me(e) {
	for (; e.root;) e = pe(e.root, { children: [e] });
	oe(e, e.siblings);
}
function he() {
	return F;
}
function ge() {
	return F = ue > 0 ? A(de, --ue) : 0, P--, F === 10 && (P = 1, N--), F;
}
function I() {
	return F = ue < le ? A(de, ue++) : 0, P++, F === 10 && (P = 1, N++), F;
}
function _e() {
	return A(de, ue);
}
function ve() {
	return ue;
}
function ye(e, t) {
	return j(de, e, t);
}
function be(e) {
	switch (e) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
function xe(e) {
	return N = P = 1, le = M(de = e), ue = 0, [];
}
function Se(e) {
	return de = "", e;
}
function Ce(e) {
	return D(ye(ue - 1, Ee(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function we(e) {
	for (; (F = _e()) && F < 33;) I();
	return be(e) > 2 || be(F) > 3 ? "" : " ";
}
function Te(e, t) {
	for (; --t && I() && !(F < 48 || F > 102 || F > 57 && F < 65 || F > 70 && F < 97););
	return ye(e, ve() + (t < 6 && _e() == 32 && I() == 32));
}
function Ee(e) {
	for (; I();) switch (F) {
		case e: return ue;
		case 34:
		case 39:
			e !== 34 && e !== 39 && Ee(F);
			break;
		case 40:
			e === 41 && Ee(e);
			break;
		case 92:
			I();
			break;
	}
	return ue;
}
function De(e, t) {
	for (; I() && e + F !== 57 && (e + F !== 84 || _e() !== 47););
	return "/*" + ye(t, ue - 1) + "*" + te(e === 47 ? e : I());
}
function Oe(e) {
	for (; !be(_e());) I();
	return ye(e, ue);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
function ke(e) {
	return Se(Ae("", null, null, null, [""], e = xe(e), 0, [0], e));
}
function Ae(e, t, n, r, i, a, o, s, c) {
	for (var l = 0, u = 0, d = o, f = 0, p = 0, m = 0, h = 1, g = 1, _ = 1, v = 0, y = "", b = i, x = a, S = r, C = y; g;) switch (m = v, v = I()) {
		case 40: if (m != 108 && A(C, d - 1) == 58) {
			ie(C += k(Ce(v), "&", "&\f"), "&\f", E(l ? s[l - 1] : 0)) != -1 && (_ = -1);
			break;
		}
		case 34:
		case 39:
		case 91:
			C += Ce(v);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			C += we(m);
			break;
		case 92:
			C += Te(ve() - 1, 7);
			continue;
		case 47:
			switch (_e()) {
				case 42:
				case 47:
					oe(Me(De(I(), ve()), t, n, c), c), (be(m || 1) == 5 || be(_e() || 1) == 5) && M(C) && j(C, -1, void 0) !== " " && (C += " ");
					break;
				default: C += "/";
			}
			break;
		case 123 * h: s[l++] = M(C) * _;
		case 125 * h:
		case 59:
		case 0:
			switch (v) {
				case 0:
				case 125: g = 0;
				case 59 + u:
					_ == -1 && (C = k(C, /\f/g, "")), p > 0 && (M(C) - d || h === 0 && m === 47) && oe(p > 32 ? Ne(C + ";", r, n, d - 1, c) : Ne(k(C, " ", "") + ";", r, n, d - 2, c), c);
					break;
				case 59: C += ";";
				default: if (oe(S = je(C, t, n, l, u, i, s, y, b = [], x = [], d, a), a), v === 123) if (u === 0) Ae(C, t, S, S, b, a, d, s, x);
				else {
					switch (f) {
						case 99: if (A(C, 3) === 110) break;
						case 108: if (A(C, 2) === 97) break;
						default: u = 0;
						case 100:
						case 109:
						case 115:
					}
					u ? Ae(e, S, S, r && oe(je(e, S, S, 0, 0, i, s, y, i, b = [], d, x), x), i, x, d, s, r ? b : x) : Ae(C, S, S, S, [""], x, 0, s, x);
				}
			}
			l = u = p = 0, h = _ = 1, y = C = "", d = o;
			break;
		case 58: d = 1 + M(C), p = m;
		default:
			if (h < 1) {
				if (v == 123) --h;
				else if (v == 125 && h++ == 0 && ge() == 125) continue;
			}
			switch (C += te(v), v * h) {
				case 38:
					_ = u > 0 ? 1 : (C += "\f", -1);
					break;
				case 44:
					s[l++] = (M(C) - 1) * _, _ = 1;
					break;
				case 64:
					_e() === 45 && (C += Ce(I())), f = _e(), u = d = M(y = C += Oe(ve())), v++;
					break;
				case 45: m === 45 && M(C) == 2 && (h = 0);
			}
	}
	return a;
}
function je(e, t, n, r, i, a, o, s, c, l, u, d) {
	for (var f = i - 1, p = i === 0 ? a : [""], m = ae(p), h = 0, g = 0, _ = 0; h < r; ++h) for (var v = 0, y = j(e, f + 1, f = E(g = o[h])), b = e; v < m; ++v) (b = D(g > 0 ? p[v] + " " + y : k(y, /&\f/g, p[v]))) && (c[_++] = b);
	return fe(e, t, n, i === 0 ? x : s, c, l, u, d);
}
function Me(e, t, n, r) {
	return fe(e, t, n, b, te(he()), j(e, 2, -2), 0, r);
}
function Ne(e, t, n, r, i) {
	return fe(e, t, n, S, j(e, 0, r), j(e, r + 1, -1), r, i);
}
//#endregion
//#region node_modules/stylis/src/Prefixer.js
function Pe(e, t, n) {
	switch (re(e, t)) {
		case 5103: return y + "print-" + e + e;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599: return y + e + e;
		case 4855: return y + e.replace("add", "source-over").replace("substract", "source-out").replace("intersect", "source-in").replace("exclude", "xor") + e;
		case 4789: return v + e + e;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return y + e + v + e + _ + e + e;
		case 5936: switch (A(e, t + 11)) {
			case 114: return y + e + _ + k(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
			case 108: return y + e + _ + k(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
			case 45: return y + e + _ + k(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
		}
		case 6828:
		case 4268:
		case 2903: return y + e + _ + e + e;
		case 6165: return y + e + _ + "flex-" + e + e;
		case 5187: return y + e + k(e, /(\w+).+(:[^]+)/, y + "box-$1$2" + _ + "flex-$1$2") + e;
		case 5443: return y + e + _ + "flex-item-" + k(e, /flex-|-self/g, "") + (O(e, /flex-|baseline/) ? "" : _ + "grid-row-" + k(e, /flex-|-self/g, "")) + e;
		case 4675: return y + e + _ + "flex-line-pack" + k(e, /align-content|flex-|-self/g, "") + e;
		case 5548: return y + e + _ + k(e, "shrink", "negative") + e;
		case 5292: return y + e + _ + k(e, "basis", "preferred-size") + e;
		case 6060: return y + "box-" + k(e, "-grow", "") + y + e + _ + k(e, "grow", "positive") + e;
		case 4554: return y + k(e, /([^-])(transform)/g, "$1" + y + "$2") + e;
		case 6187: return k(k(k(e, /(zoom-|grab)/, y + "$1"), /(image-set)/, y + "$1"), e, "") + e;
		case 5495:
		case 3959: return k(e, /(image-set\([^]*)/, y + "$1$`$1");
		case 4968: return k(k(e, /(.+:)(flex-)?(.*)/, y + "box-pack:$3" + _ + "flex-pack:$3"), /space-between/, "justify") + y + e + e;
		case 4200:
			if (!O(e, /flex-|baseline/)) return _ + "grid-column-align" + j(e, t) + e;
			break;
		case 2592:
		case 3360: return _ + k(e, "template-", "") + e;
		case 4384:
		case 3616: return n && n.some(function(e, n) {
			return t = n, O(e.props, /grid-\w+-end/);
		}) ? ~ie(e + (n = n[t].value), "span", 0) ? e : _ + k(e, "-start", "") + e + _ + "grid-row-span:" + (~ie(n, "span", 0) ? O(n, /\d+/) : O(n, /\d+/) - +O(e, /\d+/)) + ";" : _ + k(e, "-start", "") + e;
		case 4896:
		case 4128: return n && n.some(function(e) {
			return O(e.props, /grid-\w+-start/);
		}) ? e : _ + k(k(e, "-end", "-span"), "span ", "") + e;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return k(e, /(.+)-inline(.+)/, y + "$1$2") + e;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (M(e) - 1 - t > 6) switch (A(e, t + 1)) {
				case 109: if (A(e, t + 4) !== 45) break;
				case 102: return k(e, /(.+:)(.+)-([^]+)/, "$1" + y + "$2-$3$1" + v + (A(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
				case 115: return ~ie(e, "stretch", 0) ? Pe(k(e, "stretch", "fill-available"), t, n) + e : e;
			}
			break;
		case 5152:
		case 5920: return k(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(t, n, r, i, a, o, s) {
			return _ + n + ":" + r + s + (i ? _ + n + "-span:" + (a ? o : o - +r) + s : "") + e;
		});
		case 4949:
			if (A(e, t + 6) === 121) return k(e, ":", ":" + y) + e;
			break;
		case 6444:
			switch (A(e, A(e, 14) === 45 ? 18 : 11)) {
				case 120: return k(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + y + (A(e, 14) === 45 ? "inline-" : "") + "box$3$1" + y + "$2$3$1" + _ + "$2box$3") + e;
				case 100: return k(e, ":", ":" + _) + e;
			}
			break;
		case 5719:
		case 2647:
		case 2135:
		case 3927:
		case 2391: return k(e, "scroll-", "scroll-snap-") + e;
	}
	return e;
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
function Fe(e, t) {
	for (var n = "", r = 0; r < e.length; r++) n += t(e[r], r, e, t) || "";
	return n;
}
function Ie(e, t, n, r) {
	switch (e.type) {
		case ee: if (e.children.length) break;
		case C:
		case w:
		case S: return e.return = e.return || e.value;
		case b: return "";
		case T: return e.return = e.value + "{" + Fe(e.children, r) + "}";
		case x: if (!M(e.value = e.props.join(","))) return "";
	}
	return M(n = Fe(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
function Le(e) {
	var t = ae(e);
	return function(n, r, i, a) {
		for (var o = "", s = 0; s < t; s++) o += e[s](n, r, i, a) || "";
		return o;
	};
}
function Re(e) {
	return function(t) {
		t.root || (t = t.return) && e(t);
	};
}
function ze(e, t, n, r) {
	if (e.length > -1 && !e.return) switch (e.type) {
		case S:
			e.return = Pe(e.value, e.length, n);
			return;
		case T: return Fe([pe(e, { value: k(e.value, "@", "@" + y) })], r);
		case x: if (e.length) return se(n = e.props, function(t) {
			switch (O(t, r = /(::plac\w+|:read-\w+)/)) {
				case ":read-only":
				case ":read-write":
					me(pe(e, { props: [k(t, /:(read-\w+)/, ":" + v + "$1")] })), me(pe(e, { props: [t] })), ne(e, { props: ce(n, r) });
					break;
				case "::placeholder": me(pe(e, { props: [k(t, /:(plac\w+)/, ":" + y + "input-$1")] })), me(pe(e, { props: [k(t, /:(plac\w+)/, ":" + v + "$1")] })), me(pe(e, { props: [k(t, /:(plac\w+)/, _ + "input-$1")] })), me(pe(e, { props: [t] })), ne(e, { props: ce(n, r) });
			}
			return "";
		});
	}
}
//#endregion
//#region node_modules/styled-components/dist/styled-components.browser.esm.js
var Be = g(), L = /* @__PURE__ */ c(u()), Ve = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", He = "active", Ue = "data-styled-version", We = "6.4.4", Ge = "/*!sc*/\n", Ke = typeof window < "u" && typeof document < "u";
function qe(e) {
	if (typeof process < "u" && process.env !== void 0) {
		let t = process.env[e];
		if (t !== void 0 && t !== "") return t !== "false";
	}
}
var Je = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : qe("REACT_APP_SC_DISABLE_SPEEDY") ?? qe("SC_DISABLE_SPEEDY") ?? (typeof process < "u" && process.env !== void 0 && !1)), Ye = "sc-keyframes-", Xe = {};
function Ze(e, ...t) {
	return /* @__PURE__ */ Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length > 0 ? ` Args: ${t.join(", ")}` : ""}`);
}
var Qe = /* @__PURE__ */ new Map(), $e = /* @__PURE__ */ new Map(), et = 1, tt = (e) => {
	if (Qe.has(e)) return Qe.get(e);
	for (; $e.has(et);) et++;
	let t = et++;
	return Qe.set(e, t), $e.set(t, e), t;
}, nt = (e) => $e.get(e), rt = (e, t) => {
	et = t + 1, Qe.set(e, t), $e.set(t, e);
}, it = Object.freeze([]), at = Object.freeze({});
function ot(e, t, n = at) {
	return e.theme !== n.theme && e.theme || t || n.theme;
}
var st = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, ct = /(^-|-$)/g;
function lt(e) {
	return e.replace(st, "-").replace(ct, "");
}
var ut = /(a)(d)/gi, dt = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97));
function ft(e) {
	let t, n = "";
	for (t = Math.abs(e); t > 52; t = t / 52 | 0) n = dt(t % 52) + n;
	return (dt(t % 52) + n).replace(ut, "$1-$2");
}
var pt = 5381, mt = (e, t) => {
	let n = t.length;
	for (; n;) e = 33 * e ^ t.charCodeAt(--n);
	return e;
}, ht = (e) => mt(pt, e);
function gt(e) {
	return ft(ht(e) >>> 0);
}
function _t(e) {
	return e.displayName || e.name || "Component";
}
function vt(e) {
	return typeof e == "string" && !0;
}
function yt(e) {
	return vt(e) ? `styled.${e}` : `Styled(${_t(e)})`;
}
var bt = Symbol.for("react.memo"), xt = Symbol.for("react.forward_ref"), St = {
	contextType: !0,
	defaultProps: !0,
	displayName: !0,
	getDerivedStateFromError: !0,
	getDerivedStateFromProps: !0,
	propTypes: !0,
	type: !0
}, Ct = {
	name: !0,
	length: !0,
	prototype: !0,
	caller: !0,
	callee: !0,
	arguments: !0,
	arity: !0
}, wt = {
	$$typeof: !0,
	compare: !0,
	defaultProps: !0,
	displayName: !0,
	propTypes: !0,
	type: !0
}, Tt = {
	[xt]: {
		$$typeof: !0,
		render: !0,
		defaultProps: !0,
		displayName: !0,
		propTypes: !0
	},
	[bt]: wt
};
function Et(e) {
	return ("type" in (t = e) && t.type.$$typeof) === bt ? wt : "$$typeof" in e ? Tt[e.$$typeof] : St;
	var t;
}
var Dt = Object.defineProperty, Ot = Object.getOwnPropertyNames, kt = Object.getOwnPropertySymbols, At = Object.getOwnPropertyDescriptor, jt = Object.getPrototypeOf, Mt = Object.prototype;
function Nt(e, t, n) {
	if (typeof t != "string") {
		let r = jt(t);
		r && r !== Mt && Nt(e, r, n);
		let i = Ot(t).concat(kt(t)), a = Et(e), o = Et(t);
		for (let r = 0; r < i.length; ++r) {
			let s = i[r];
			if (!(s in Ct || n && n[s] || o && s in o || a && s in a)) {
				let n = At(t, s);
				try {
					Dt(e, s, n);
				} catch {}
			}
		}
	}
	return e;
}
function Pt(e) {
	return typeof e == "function";
}
var Ft = Symbol.for("react.forward_ref");
function It(e) {
	return e != null && (typeof e == "object" || typeof e == "function") && e.$$typeof === Ft && "styledComponentId" in e;
}
function Lt(e, t) {
	return e && t ? e + " " + t : e || t || "";
}
function Rt(e, t) {
	return e.join(t || "");
}
function zt(e) {
	return typeof e == "object" && !!e && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function Bt(e, t, n = !1) {
	if (!n && !zt(e) && !Array.isArray(e)) return t;
	if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e[n] = Bt(e[n], t[n]);
	else if (zt(t)) for (let n in t) e[n] = Bt(e[n], t[n]);
	return e;
}
function Vt(e, t) {
	Object.defineProperty(e, "toString", { value: t });
}
var Ht = class {
	constructor(e) {
		this.groupSizes = /* @__PURE__ */ new Uint32Array(512), this.length = 512, this.tag = e, this._cGroup = 0, this._cIndex = 0;
	}
	indexOfGroup(e) {
		if (e === this._cGroup) return this._cIndex;
		let t = this._cIndex;
		if (e > this._cGroup) for (let n = this._cGroup; n < e; n++) t += this.groupSizes[n];
		else for (let n = this._cGroup - 1; n >= e; n--) t -= this.groupSizes[n];
		return this._cGroup = e, this._cIndex = t, t;
	}
	insertRules(e, t) {
		if (e >= this.groupSizes.length) {
			let t = this.groupSizes, n = t.length, r = n;
			for (; e >= r;) if (r <<= 1, r < 0) throw Ze(16, `${e}`);
			this.groupSizes = new Uint32Array(r), this.groupSizes.set(t), this.length = r;
			for (let e = n; e < r; e++) this.groupSizes[e] = 0;
		}
		let n = this.indexOfGroup(e + 1), r = 0;
		for (let i = 0, a = t.length; i < a; i++) this.tag.insertRule(n, t[i]) && (this.groupSizes[e]++, n++, r++);
		r > 0 && this._cGroup > e && (this._cIndex += r);
	}
	clearGroup(e) {
		if (e < this.length) {
			let t = this.groupSizes[e], n = this.indexOfGroup(e), r = n + t;
			this.groupSizes[e] = 0;
			for (let e = n; e < r; e++) this.tag.deleteRule(n);
			t > 0 && this._cGroup > e && (this._cIndex -= t);
		}
	}
	getGroup(e) {
		let t = "";
		if (e >= this.length || this.groupSizes[e] === 0) return t;
		let n = this.groupSizes[e], r = this.indexOfGroup(e), i = r + n;
		for (let e = r; e < i; e++) t += this.tag.getRule(e) + Ge;
		return t;
	}
}, Ut = `style[${Ve}][${Ue}="${We}"]`, Wt = RegExp(`^${Ve}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`), Gt = (e) => typeof ShadowRoot < "u" && e instanceof ShadowRoot || "host" in e && e.nodeType === 11, Kt = (e) => {
	if (!e) return document;
	if (Gt(e)) return e;
	if ("getRootNode" in e) {
		let t = e.getRootNode();
		if (Gt(t)) return t;
	}
	return document;
}, qt = (e, t, n) => {
	let r = n.split(","), i;
	for (let n = 0, a = r.length; n < a; n++) (i = r[n]) && e.registerName(t, i);
}, Jt = (e, t) => {
	let n = (t.textContent ?? "").split(Ge), r = [];
	for (let t = 0, i = n.length; t < i; t++) {
		let i = n[t].trim();
		if (!i) continue;
		let a = i.match(Wt);
		if (a) {
			let t = 0 | parseInt(a[1], 10), n = a[2];
			t !== 0 && (rt(n, t), qt(e, n, a[3]), e.getTag().insertRules(t, r)), r.length = 0;
		} else r.push(i);
	}
}, Yt = (e) => {
	let t = Kt(e.options.target).querySelectorAll(Ut);
	for (let n = 0, r = t.length; n < r; n++) {
		let r = t[n];
		r && r.getAttribute(Ve) !== He && (Jt(e, r), r.parentNode && r.parentNode.removeChild(r));
	}
}, Xt = !1;
function Zt() {
	if (!1 !== Xt) return Xt;
	if (typeof document < "u") {
		let e = document.head.querySelector("meta[property=\"csp-nonce\"]");
		if (e) return Xt = e.nonce || e.getAttribute("content") || void 0;
		let t = document.head.querySelector("meta[name=\"sc-nonce\"]");
		if (t) return Xt = t.getAttribute("content") || void 0;
	}
	return Xt = typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : void 0;
}
var Qt = (e, t) => {
	let n = document.head, r = e || n, i = document.createElement("style"), a = ((e) => {
		let t = Array.from(e.querySelectorAll(`style[${Ve}]`));
		return t[t.length - 1];
	})(r), o = a === void 0 ? null : a.nextSibling;
	i.setAttribute(Ve, He), i.setAttribute(Ue, We);
	let s = t || Zt();
	return s && i.setAttribute("nonce", s), r.insertBefore(i, o), i;
}, $t = class {
	constructor(e, t) {
		this.element = Qt(e, t), this.element.appendChild(document.createTextNode("")), this.sheet = ((e) => {
			if (e.sheet) return e.sheet;
			let t = e.getRootNode().styleSheets ?? document.styleSheets;
			for (let n = 0, r = t.length; n < r; n++) {
				let r = t[n];
				if (r.ownerNode === e) return r;
			}
			throw Ze(17);
		})(this.element), this.length = 0;
	}
	insertRule(e, t) {
		try {
			return this.sheet.insertRule(t, e), this.length++, !0;
		} catch {
			return !1;
		}
	}
	deleteRule(e) {
		this.sheet.deleteRule(e), this.length--;
	}
	getRule(e) {
		let t = this.sheet.cssRules[e];
		return t && t.cssText ? t.cssText : "";
	}
}, en = class {
	constructor(e, t) {
		this.element = Qt(e, t), this.nodes = this.element.childNodes, this.length = 0;
	}
	insertRule(e, t) {
		if (e <= this.length && e >= 0) {
			let n = document.createTextNode(t);
			return this.element.insertBefore(n, this.nodes[e] || null), this.length++, !0;
		}
		return !1;
	}
	deleteRule(e) {
		this.element.removeChild(this.nodes[e]), this.length--;
	}
	getRule(e) {
		return e < this.length ? this.nodes[e].textContent : "";
	}
}, tn = Ke, nn = {
	isServer: !Ke,
	useCSSOMInjection: !Je
}, rn = class e {
	static registerId(e) {
		return tt(e);
	}
	constructor(e = at, t = {}, n) {
		this.options = Object.assign(Object.assign({}, nn), e), this.gs = t, this.keyframeIds = /* @__PURE__ */ new Set(), this.names = new Map(n), this.server = !!e.isServer, !this.server && Ke && tn && (tn = !1, Yt(this)), Vt(this, () => ((e) => {
			let t = e.getTag(), { length: n } = t, r = "";
			for (let i = 0; i < n; i++) {
				let n = nt(i);
				if (n === void 0) continue;
				let a = e.names.get(n);
				if (a === void 0 || !a.size) continue;
				let o = t.getGroup(i);
				if (o.length === 0) continue;
				let s = Ve + ".g" + i + "[id=\"" + n + "\"]", c = "";
				for (let e of a) e.length > 0 && (c += e + ",");
				r += o + s + "{content:\"" + c + "\"}/*!sc*/\n";
			}
			return r;
		})(this));
	}
	rehydrate() {
		!this.server && Ke && Yt(this);
	}
	reconstructWithOptions(t, n = !0) {
		let r = new e(Object.assign(Object.assign({}, this.options), t), this.gs, n && this.names || void 0);
		return r.keyframeIds = new Set(this.keyframeIds), !this.server && Ke && t.target !== this.options.target && Kt(this.options.target) !== Kt(t.target) && Yt(r), r;
	}
	allocateGSInstance(e) {
		return this.gs[e] = (this.gs[e] || 0) + 1;
	}
	getTag() {
		return this.tag ||= (e = (({ useCSSOMInjection: e, target: t, nonce: n }) => e ? new $t(t, n) : new en(t, n))(this.options), new Ht(e));
		var e;
	}
	hasNameForId(e, t) {
		var n;
		return (n = this.names.get(e)?.has(t)) != null && n;
	}
	registerName(e, t) {
		tt(e), e.startsWith(Ye) && this.keyframeIds.add(e);
		let n = this.names.get(e);
		n ? n.add(t) : this.names.set(e, /* @__PURE__ */ new Set([t]));
	}
	insertRules(e, t, n) {
		this.registerName(e, t), this.getTag().insertRules(tt(e), n);
	}
	clearNames(e) {
		this.names.has(e) && this.names.get(e).clear();
	}
	clearRules(e) {
		this.getTag().clearGroup(tt(e)), this.clearNames(e);
	}
	clearTag() {
		this.tag = void 0;
	}
}, an = /* @__PURE__ */ new WeakSet(), on = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexShrink: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
function sn(e, t) {
	return t == null || typeof t == "boolean" || t === "" ? "" : typeof t != "number" || t === 0 || e in on || e.startsWith("--") ? String(t).trim() : t + "px";
}
var cn = 47;
function ln(e) {
	if (e.charCodeAt(0) === 45 && e.charCodeAt(1) === 45) return e;
	let t = "";
	for (let n = 0; n < e.length; n++) {
		let r = e.charCodeAt(n);
		t += r >= 65 && r <= 90 ? "-" + String.fromCharCode(r + 32) : e[n];
	}
	return t.startsWith("ms-") ? "-" + t : t;
}
var un = Symbol.for("sc-keyframes");
function dn(e) {
	return typeof e == "object" && !!e && un in e;
}
function fn(e) {
	return Pt(e) && !(e.prototype && e.prototype.isReactComponent);
}
var pn = (e) => e == null || !1 === e || e === "", mn = Symbol.for("react.client.reference");
function hn(e) {
	return e.$$typeof === mn;
}
function gn(e, t) {
	for (let n in e) {
		let r = e[n];
		e.hasOwnProperty(n) && !pn(r) && (Array.isArray(r) && an.has(r) || Pt(r) ? t.push(ln(n) + ":", r, ";") : zt(r) ? (t.push(n + " {"), gn(r, t), t.push("}")) : t.push(ln(n) + ": " + sn(n, r) + ";"));
	}
}
function _n(e, t, n, r, i = []) {
	if (pn(e)) return i;
	let a = typeof e;
	if (a === "string") return i.push(e), i;
	if (a === "function") return hn(e) ? i : fn(e) && t ? _n(e(t), t, n, r, i) : (i.push(e), i);
	if (Array.isArray(e)) {
		for (let a = 0; a < e.length; a++) _n(e[a], t, n, r, i);
		return i;
	}
	return It(e) ? (i.push(`.${e.styledComponentId}`), i) : dn(e) ? (n ? (e.inject(n, r), i.push(e.getName(r))) : i.push(e), i) : hn(e) ? i : zt(e) && e.toString === Object.prototype.toString ? (gn(e, i), i) : (i.push(e.toString()), i);
}
var vn = ht(We), yn = class {
	constructor(e, t, n) {
		this.rules = e, this.componentId = t, this.baseHash = mt(vn, t), this.baseStyle = n, rn.registerId(t);
	}
	generateAndInjectStyles(e, t, n) {
		let r = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e, t, n) : "";
		{
			let i = "";
			for (let r = 0; r < this.rules.length; r++) {
				let a = this.rules[r];
				if (typeof a == "string") i += a;
				else if (a) if (fn(a)) {
					let r = a(e);
					typeof r == "string" ? i += r : r != null && !1 !== r && (i += Rt(_n(r, e, t, n)));
				} else i += Rt(_n(a, e, t, n));
			}
			if (i) {
				this.dynamicNameCache ||= /* @__PURE__ */ new Map();
				let e = n.hash ? n.hash + i : i, a = this.dynamicNameCache.get(e);
				if (!a) {
					if (a = ft(mt(mt(this.baseHash, n.hash), i) >>> 0), this.dynamicNameCache.size >= 200) {
						let e = this.dynamicNameCache.keys().next().value;
						e !== void 0 && this.dynamicNameCache.delete(e);
					}
					this.dynamicNameCache.set(e, a);
				}
				if (!t.hasNameForId(this.componentId, a)) {
					let e = n(i, "." + a, void 0, this.componentId);
					t.insertRules(this.componentId, a, e);
				}
				r = Lt(r, a);
			}
		}
		return r;
	}
}, bn = /&/g;
function xn(e, t) {
	let n = 0;
	for (; --t >= 0 && e.charCodeAt(t) === 92;) n++;
	return !(1 & ~n);
}
function Sn(e) {
	let t = e.length, n = "", r = 0, i = 0, a = 0, o = !1, s = !1;
	for (let c = 0; c < t; c++) {
		let l = e.charCodeAt(c);
		if (a !== 0 || o || l !== cn || e.charCodeAt(c + 1) !== 42) if (o) l === 42 && e.charCodeAt(c + 1) === cn && (o = !1, c++);
		else if (l !== 34 && l !== 39 || xn(e, c)) {
			if (a === 0) if (l === 123) i++;
			else if (l === 125) {
				if (i--, i < 0) {
					s = !0;
					let n = c + 1;
					for (; n < t;) {
						let t = e.charCodeAt(n);
						if (t === 59 || t === 10) break;
						n++;
					}
					n < t && e.charCodeAt(n) === 59 && n++, i = 0, c = n - 1, r = n;
					continue;
				}
				i === 0 && (n += e.substring(r, c + 1), r = c + 1);
			} else l === 59 && i === 0 && (n += e.substring(r, c + 1), r = c + 1);
		} else a === 0 ? a = l : a === l && (a = 0);
		else o = !0, c++;
	}
	return s || i !== 0 || a !== 0 ? (r < t && i === 0 && a === 0 && (n += e.substring(r)), n) : e;
}
function Cn(e, t) {
	let n = t + " ", r = "," + n;
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		if (a.type === "rule") {
			a.value = (n + a.value).replaceAll(",", r);
			let e = a.props, t = [];
			for (let r = 0; r < e.length; r++) t[r] = n + e[r];
			a.props = t;
		}
		Array.isArray(a.children) && a.type !== "@keyframes" && Cn(a.children, t);
	}
	return e;
}
function wn({ options: e = at, plugins: t = it } = at) {
	let n, r, i, a = (e, t, i) => i.startsWith(r) && i.endsWith(r) && i.replaceAll(r, "").length > 0 ? `.${n}` : e, o = t.slice();
	o.push((e) => {
		e.type === "rule" && e.value.includes("&") && (i ||= RegExp(`\\${r}\\b`, "g"), e.props[0] = e.props[0].replace(bn, r).replace(i, a));
	}), e.prefix && o.push(ze), o.push(Ie);
	let s = [], c = Le(o.concat(Re((e) => s.push(e)))), l = (t, a = "", o = "", l = "&") => {
		n = l, r = a, i = void 0;
		let u = function(e) {
			let t = e.indexOf("//") !== -1, n = e.indexOf("}") !== -1;
			if (!t && !n) return e;
			if (!t) return Sn(e);
			let r = e.length, i = "", a = 0, o = 0, s = 0, c = 0, l = 0, u = !1;
			for (; o < r;) {
				let t = e.charCodeAt(o);
				if (t !== 34 && t !== 39 || xn(e, o)) if (s === 0) if (t === cn && o + 1 < r && e.charCodeAt(o + 1) === 42) {
					for (o += 2; o + 1 < r && (e.charCodeAt(o) !== 42 || e.charCodeAt(o + 1) !== cn);) o++;
					o += 2;
				} else if (t !== 40) if (t !== 41) if (c > 0) o++;
				else if (t === 42 && o + 1 < r && e.charCodeAt(o + 1) === cn) i += e.substring(a, o), o += 2, a = o, u = !0;
				else if (t === cn && o + 1 < r && e.charCodeAt(o + 1) === cn) {
					for (i += e.substring(a, o); o < r && e.charCodeAt(o) !== 10;) o++;
					a = o, u = !0;
				} else t === 123 ? l++ : t === 125 && l--, o++;
				else c > 0 && c--, o++;
				else c++, o++;
				else o++;
				else s === 0 ? s = t : s === t && (s = 0), o++;
			}
			return u ? (a < r && (i += e.substring(a)), l === 0 ? i : Sn(i)) : l === 0 ? e : Sn(e);
		}(t), d = ke(o || a ? o + " " + a + " { " + u + " }" : u);
		return e.namespace && (d = Cn(d, e.namespace)), s = [], Fe(d, c), s;
	}, u = e, d = pt;
	for (let e = 0; e < t.length; e++) t[e].name || Ze(15), d = mt(d, t[e].name);
	return u != null && u.namespace && (d = mt(d, u.namespace)), u != null && u.prefix && (d = mt(d, "p")), l.hash = d === pt ? "" : d.toString(), l;
}
var Tn = new rn(), En = wn(), Dn = L.createContext({
	shouldForwardProp: void 0,
	styleSheet: Tn,
	stylis: En,
	stylisPlugins: void 0
});
Dn.Consumer;
function On() {
	return L.useContext(Dn);
}
var kn = L.createContext(void 0);
kn.Consumer;
function An(e) {
	let t = L.useContext(kn), n = L.useMemo(() => function(e, t) {
		if (!e) throw Ze(14);
		if (Pt(e)) return e(t);
		if (Array.isArray(e) || typeof e != "object") throw Ze(8);
		return t ? Object.assign(Object.assign({}, t), e) : e;
	}(e.theme, t), [e.theme, t]);
	return e.children ? L.createElement(kn.Provider, { value: n }, e.children) : null;
}
var jn = Object.prototype.hasOwnProperty, Mn = {};
function Nn(e, t) {
	let n = typeof e == "string" ? lt(e) : "sc";
	Mn[n] = (Mn[n] || 0) + 1;
	let r = n + "-" + gt(We + n + Mn[n]);
	return t ? t + "-" + r : r;
}
function Pn(e, t, n) {
	let r = It(e), i = e, a = !vt(e), { attrs: o = it, componentId: s = Nn(t.displayName, t.parentComponentId), displayName: c = yt(e) } = t, l = t.displayName && t.componentId ? lt(t.displayName) + "-" + t.componentId : t.componentId || s, u = r && i.attrs ? i.attrs.concat(o).filter(Boolean) : o, { shouldForwardProp: d } = t;
	if (r && i.shouldForwardProp) {
		let e = i.shouldForwardProp;
		if (t.shouldForwardProp) {
			let n = t.shouldForwardProp;
			d = (t, r) => e(t, r) && n(t, r);
		} else d = e;
	}
	let f = new yn(n, l, r ? i.componentStyle : void 0);
	function p(e, t) {
		return function(e, t, n) {
			let { attrs: r, componentStyle: i, defaultProps: a, foldedComponentIds: o, styledComponentId: s, target: c } = e, l = L.useContext(kn), u = On(), d = e.shouldForwardProp || u.shouldForwardProp, f = ot(t, l, a) || at, p, m;
			{
				let e = L.useRef(null), n = e.current;
				if (n !== null && n[1] === f && n[2] === u.styleSheet && n[3] === u.stylis && n[7] === i && function(e, t, n) {
					let r = e, i = t, a = 0;
					for (let e in i) if (jn.call(i, e) && (a++, r[e] !== i[e])) return !1;
					return a === n;
				}(n[0], t, n[4])) p = n[5], m = n[6];
				else {
					p = function(e, t, n) {
						let r = Object.assign(Object.assign({}, t), {
							className: void 0,
							theme: n
						}), i = e.length > 1;
						for (let n = 0; n < e.length; n++) {
							let a = e[n], o = Pt(a) ? a(i ? Object.assign({}, r) : r) : a;
							for (let e in o) e === "className" ? r.className = Lt(r.className, o[e]) : e === "style" ? r.style = Object.assign(Object.assign({}, r.style), o[e]) : e in t && t[e] === void 0 || (r[e] = o[e]);
						}
						return "className" in t && typeof t.className == "string" && (r.className = Lt(r.className, t.className)), r;
					}(r, t, f), m = function(e, t, n, r) {
						return e.generateAndInjectStyles(t, n, r);
					}(i, p, u.styleSheet, u.stylis);
					let n = 0;
					for (let e in t) jn.call(t, e) && n++;
					e.current = [
						t,
						f,
						u.styleSheet,
						u.stylis,
						n,
						p,
						m,
						i
					];
				}
			}
			let h = p.as || c, g = function(e, t, n, r) {
				let i = {};
				for (let a in e) e[a] === void 0 || a[0] === "$" || a === "as" || a === "theme" && e.theme === n || (a === "forwardedAs" ? i.as = e.forwardedAs : r && !r(a, t) || (i[a] = e[a]));
				return i;
			}(p, h, f, d), _ = Lt(o, s);
			return m && (_ += " " + m), p.className && (_ += " " + p.className), g[vt(h) && h.includes("-") ? "class" : "className"] = _, n && (g.ref = n), (0, L.createElement)(h, g);
		}(m, e, t);
	}
	p.displayName = c;
	let m = L.forwardRef(p);
	return m.attrs = u, m.componentStyle = f, m.displayName = c, m.shouldForwardProp = d, m.foldedComponentIds = r ? Lt(i.foldedComponentIds, i.styledComponentId) : "", m.styledComponentId = l, m.target = r ? i.target : e, Object.defineProperty(m, "defaultProps", {
		get() {
			return this._foldedDefaultProps;
		},
		set(e) {
			this._foldedDefaultProps = r ? function(e, ...t) {
				for (let n of t) Bt(e, n, !0);
				return e;
			}({}, i.defaultProps, e) : e;
		}
	}), Vt(m, () => `.${m.styledComponentId}`), a && Nt(m, e, {
		attrs: !0,
		componentStyle: !0,
		displayName: !0,
		foldedComponentIds: !0,
		shouldForwardProp: !0,
		styledComponentId: !0,
		target: !0
	}), m;
}
var Fn = /* @__PURE__ */ new Set(/* @__PURE__ */ "a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use".split("."));
function In(e, t) {
	let n = [e[0]];
	for (let r = 0, i = t.length; r < i; r += 1) n.push(t[r], e[r + 1]);
	return n;
}
var Ln = (e) => (an.add(e), e);
function Rn(e, ...t) {
	if (Pt(e) || zt(e)) return Ln(_n(In(it, [e, ...t])));
	let n = e;
	return t.length === 0 && n.length === 1 && typeof n[0] == "string" ? _n(n) : Ln(_n(In(n, t)));
}
function zn(e, t, n = at) {
	if (!t) throw Ze(1, t);
	let r = (r, ...i) => e(t, n, Rn(r, ...i));
	return r.attrs = (r) => zn(e, t, Object.assign(Object.assign({}, n), { attrs: Array.prototype.concat(n.attrs, r).filter(Boolean) })), r.withConfig = (r) => zn(e, t, Object.assign(Object.assign({}, n), r)), r;
}
var Bn = (e) => zn(Pn, e), R = Bn;
Fn.forEach((e) => {
	R[e] = Bn(e);
});
var Vn = class {
	constructor(e, t) {
		this.instanceRules = /* @__PURE__ */ new Map(), this.rules = e, this.componentId = t, this.isStatic = function(e) {
			for (let t = 0; t < e.length; t += 1) {
				let n = e[t];
				if (Pt(n) && !It(n)) return !1;
			}
			return !0;
		}(e), rn.registerId(this.componentId);
	}
	removeStyles(e, t) {
		this.instanceRules.delete(e), this.rebuildGroup(t);
	}
	renderStyles(e, t, n, r) {
		let i = this.componentId;
		if (this.isStatic) {
			if (n.hasNameForId(i, i + e)) this.instanceRules.has(e) || this.computeRules(e, t, n, r);
			else {
				let a = this.computeRules(e, t, n, r);
				n.insertRules(i, a.name, a.rules);
			}
			return;
		}
		let a = this.instanceRules.get(e);
		if (this.computeRules(e, t, n, r), !n.server && a) {
			let t = a.rules, n = this.instanceRules.get(e).rules;
			if (t.length === n.length) {
				let e = !0;
				for (let r = 0; r < t.length; r++) if (t[r] !== n[r]) {
					e = !1;
					break;
				}
				if (e) return;
			}
		}
		this.rebuildGroup(n);
	}
	computeRules(e, t, n, r) {
		let i = Rt(_n(this.rules, t, n, r)), a = {
			name: this.componentId + e,
			rules: r(i, "")
		};
		return this.instanceRules.set(e, a), a;
	}
	rebuildGroup(e) {
		let t = this.componentId;
		e.clearRules(t);
		for (let n of this.instanceRules.values()) e.insertRules(t, n.name, n.rules);
	}
};
function Hn(e, ...t) {
	let n = Rn(e, ...t), r = `sc-global-${gt(JSON.stringify(n))}`, i = new Vn(n, r), a = (e) => {
		let t = On(), n = L.useContext(kn), a;
		{
			let e = L.useRef(null);
			e.current === null && (e.current = t.styleSheet.allocateGSInstance(r)), a = e.current;
		}
		t.styleSheet.server && o(a, e, t.styleSheet, n, t.stylis);
		{
			let s = i.isStatic ? [
				a,
				t.styleSheet,
				i
			] : [
				a,
				e,
				t.styleSheet,
				n,
				t.stylis,
				i
			], c = L.useRef(i);
			L.useLayoutEffect(() => {
				t.styleSheet.server || (c.current !== i && (t.styleSheet.clearRules(r), c.current = i), o(a, e, t.styleSheet, n, t.stylis));
			}, s), L.useLayoutEffect(() => () => {
				t.styleSheet.server || i.removeStyles(a, t.styleSheet);
			}, [
				a,
				t.styleSheet,
				i
			]);
		}
		return t.styleSheet.server && i.instanceRules.delete(a), null;
	};
	function o(e, t, n, r, o) {
		if (i.isStatic) i.renderStyles(e, Xe, n, o);
		else {
			let s = Object.assign(Object.assign({}, t), { theme: ot(t, r, a.defaultProps) });
			i.renderStyles(e, s, n, o);
		}
	}
	return L.memo(a);
}
var Un, Wn = class {
	constructor(e, t) {
		this[Un] = !0, this.inject = (e, t = En) => {
			let n = this.getName(t);
			if (!e.hasNameForId(this.id, n)) {
				let r = t(this.rules, n, "@keyframes");
				e.insertRules(this.id, n, r);
			}
		}, this.name = e, this.id = Ye + e, this.rules = t, tt(this.id), Vt(this, () => {
			throw Ze(12, String(this.name));
		});
	}
	getName(e = En) {
		return e.hash ? this.name + ft(e.hash >>> 0) : this.name;
	}
};
function Gn(e, ...t) {
	let n = Rt(Rn(e, ...t));
	return new Wn(gt(n), n);
}
Un = un, `${Ve}`, `${Ve}`, `${Ve}`;
//#endregion
//#region src/lib/chordEngine.ts
var Kn = [
	{
		intervals: [
			0,
			4,
			7
		],
		suffix: "",
		quality: "maj",
		name: "major"
	},
	{
		intervals: [
			0,
			3,
			7
		],
		suffix: "m",
		quality: "min",
		name: "minor"
	},
	{
		intervals: [
			0,
			3,
			6
		],
		suffix: "°",
		quality: "other",
		name: "diminished"
	},
	{
		intervals: [
			0,
			4,
			8
		],
		suffix: "+",
		quality: "other",
		name: "augmented"
	},
	{
		intervals: [
			0,
			2,
			7
		],
		suffix: "sus2",
		quality: "other",
		name: "sus2"
	},
	{
		intervals: [
			0,
			5,
			7
		],
		suffix: "sus4",
		quality: "other",
		name: "sus4"
	},
	{
		intervals: [
			0,
			4,
			7,
			10
		],
		suffix: "7",
		quality: "dom",
		name: "dominant 7"
	},
	{
		intervals: [
			0,
			4,
			7,
			11
		],
		suffix: "maj7",
		quality: "maj",
		name: "major 7"
	},
	{
		intervals: [
			0,
			3,
			7,
			10
		],
		suffix: "m7",
		quality: "min",
		name: "minor 7"
	},
	{
		intervals: [
			0,
			4,
			7,
			9
		],
		suffix: "6",
		quality: "maj",
		name: "6th"
	},
	{
		intervals: [
			0,
			3,
			7,
			9
		],
		suffix: "m6",
		quality: "min",
		name: "minor 6"
	},
	{
		intervals: [
			0,
			3,
			6,
			9
		],
		suffix: "°7",
		quality: "other",
		name: "diminished 7"
	},
	{
		intervals: [
			0,
			3,
			6,
			10
		],
		suffix: "m7♭5",
		quality: "other",
		name: "half-diminished"
	},
	{
		intervals: [
			0,
			2,
			4,
			7
		],
		suffix: "add9",
		quality: "maj",
		name: "add 9"
	},
	{
		intervals: [
			0,
			3,
			7,
			11
		],
		suffix: "m(maj7)",
		quality: "min",
		name: "minor-major 7"
	},
	{
		intervals: [
			0,
			5,
			7,
			10
		],
		suffix: "7sus4",
		quality: "dom",
		name: "7 sus4"
	},
	{
		intervals: [
			0,
			2,
			4,
			7,
			10
		],
		suffix: "9",
		quality: "dom",
		name: "dominant 9"
	},
	{
		intervals: [
			0,
			2,
			4,
			7,
			11
		],
		suffix: "maj9",
		quality: "maj",
		name: "major 9"
	},
	{
		intervals: [
			0,
			2,
			3,
			7,
			10
		],
		suffix: "m9",
		quality: "min",
		name: "minor 9"
	},
	{
		intervals: [
			0,
			2,
			4,
			7,
			9
		],
		suffix: "6/9",
		quality: "maj",
		name: "6/9"
	},
	{
		intervals: [
			0,
			2,
			3,
			7,
			9
		],
		suffix: "m6/9",
		quality: "min",
		name: "minor 6/9"
	},
	{
		intervals: [
			0,
			3,
			4,
			7,
			10
		],
		suffix: "7♯9",
		quality: "dom",
		name: "7 sharp 9"
	},
	{
		intervals: [
			0,
			1,
			4,
			7,
			10
		],
		suffix: "7♭9",
		quality: "dom",
		name: "7 flat 9"
	},
	{
		intervals: [
			0,
			4,
			7,
			9,
			10
		],
		suffix: "13",
		quality: "dom",
		name: "dominant 13 (no 9)"
	},
	{
		intervals: [
			0,
			2,
			4,
			5,
			7,
			10
		],
		suffix: "11",
		quality: "dom",
		name: "dominant 11"
	},
	{
		intervals: [
			0,
			2,
			4,
			7,
			9,
			10
		],
		suffix: "13",
		quality: "dom",
		name: "dominant 13"
	}
], qn = [
	"C",
	"C♯",
	"D",
	"D♯",
	"E",
	"F",
	"F♯",
	"G",
	"G♯",
	"A",
	"A♯",
	"B"
], Jn = [
	"C",
	"D♭",
	"D",
	"E♭",
	"E",
	"F",
	"G♭",
	"G",
	"A♭",
	"A",
	"B♭",
	"B"
], Yn = (e) => (e % 12 + 12) % 12, Xn = (e) => Math.floor(e / 12) - 1, Zn = (e, t = !1) => (t ? Jn : qn)[(e % 12 + 12) % 12], Qn = (e, t = !1) => Zn(Yn(e), t) + Xn(e), $n = (e, t = !1) => Zn(e.rootPc, t) + e.suffix, er = [
	"R",
	"♭9",
	"9",
	"♭3",
	"3",
	"4",
	"♭5",
	"5",
	"♯5",
	"6",
	"♭7",
	"7"
], tr = (e, t = !1) => {
	let n = (e % 12 + 12) % 12;
	if (t) {
		if (n === 5) return "11";
		if (n === 9) return "13";
	}
	return er[n];
}, nr = (e, t) => e.length === t.length && e.every((e, n) => e === t[n]), rr = {
	maj: 0,
	dom: 1,
	min: 2,
	other: 3
};
function ir(e, t = null) {
	let n = Array.from(new Set(e.map((e) => (e % 12 + 12) % 12))).sort((e, t) => e - t);
	if (n.length < 3) return [];
	let r = [];
	for (let e of n) {
		let t = n.map((t) => (t - e + 12) % 12).sort((e, t) => e - t);
		for (let n of Kn) nr(t, n.intervals) && r.push({
			rootPc: e,
			suffix: n.suffix,
			quality: n.quality,
			formulaName: n.name,
			intervals: n.intervals
		});
	}
	if (t !== null) {
		let e = (t % 12 + 12) % 12;
		r.sort((t, n) => {
			let r = t.rootPc === e ? 0 : 1, i = n.rootPc === e ? 0 : 1;
			return r === i ? rr[t.quality] === rr[n.quality] ? (t.rootPc - e + 12) % 12 - (n.rootPc - e + 12) % 12 : rr[t.quality] - rr[n.quality] : r - i;
		});
	}
	return r;
}
function ar(e, t = null) {
	return ir(e, t)[0] ?? null;
}
var or = (e) => e[e.length - 1] - e[0] + 1 - e.length, sr = /* @__PURE__ */ new Map();
function cr(e) {
	let t = sr.get(e);
	if (t) return t;
	let n = [];
	for (let t = 3; t <= e; t++) for (let r = 0; r + t <= e; r++) n.push(Array.from({ length: t }, (e, t) => r + t));
	for (let t = 0; t < e; t++) for (let r = t + 3; r < e && r - t + 1 <= 7; r++) {
		let e = r - t + 1;
		if (e > 3) for (let e = t + 1; e < r; e++) n.push([
			t,
			e,
			r
		]);
		if (e > 4) for (let e = t + 1; e < r; e++) for (let i = e + 1; i < r; i++) n.push([
			t,
			e,
			i,
			r
		]);
	}
	return n.sort((e, t) => e.length - t.length || or(e) - or(t) || e[e.length - 1] - e[0] - (t[t.length - 1] - t[0]) || e[0] - t[0]), sr.set(e, n), n;
}
function lr(e, t) {
	let n = e.length;
	if (n < 3) return [];
	let r = [], i = /* @__PURE__ */ new Set(), a = (n, a) => {
		let o = n.map((n) => e[n] + t), s = Yn(Math.min(...o)), c = ar(o.map(Yn), s);
		if (!c) return;
		let l = `${c.rootPc}:${c.suffix}`;
		i.has(l) || (i.add(l), r.push({
			match: c,
			strings: n,
			isFullStack: a
		}));
	};
	a(Array.from({ length: n }, (e, t) => t), !0);
	for (let e of cr(n)) e.length !== n && a(e, !1);
	return r;
}
function ur(e, t, n, r = 12) {
	let i = new Set(t.map((e) => (e % 12 + 12) % 12)), a = (n % 12 + 12) % 12;
	if (i.size < 3 || !i.has(a)) return [];
	let o = e.length, s = [], c = cr(o);
	for (let t = 0; t <= r; t++) {
		let n = null, r = 0;
		for (let o of c) {
			let s = o.map((n) => Yn(e[n] + t)), c = new Set(s);
			if (c.size < 3 || !Array.from(c).every((e) => i.has(e)) || !c.has(a)) continue;
			let l = Yn(Math.min(...o.map((n) => e[n] + t))), u = ir(s, l).find((e) => e.rootPc === a);
			if (!u) continue;
			let d = Array.from(i).every((e) => c.has(e)), f = l === a, p = or(o), m = {
				fret: t,
				strings: o,
				match: u,
				isFullTarget: d,
				rootInBass: f
			};
			(!n || m.isFullTarget !== n.isFullTarget && m.isFullTarget || m.isFullTarget === n.isFullTarget && (p < r || p === r && (m.strings.length > n.strings.length || m.strings.length === n.strings.length && m.rootInBass && !n.rootInBass))) && (n = m, r = p);
		}
		n && s.push(n);
	}
	return s;
}
function dr(e, t, n = 12, r = !1) {
	return Array.from({ length: n + 1 }, (n, i) => e ? Zn(((e.rootPc - t + i) % 12 + 12) % 12, r) + e.suffix : null);
}
//#endregion
//#region src/lib/noteColors.ts
var fr = {
	root: "#ef5350",
	third: "#f2a33d",
	fifth: "#c6d43f",
	seventh: "#4cc178",
	ninth: "#4f9dea",
	color: "#a563d4"
}, pr = "#12141a";
function mr(e) {
	return e === "R" ? fr.root : e === "♭3" || e === "3" ? fr.third : e === "♭5" || e === "5" || e === "♯5" ? fr.fifth : e === "♭7" || e === "7" ? fr.seventh : e === "♭9" || e === "9" || e === "2" ? fr.ninth : fr.color;
}
function hr(e) {
	switch (e.replace(/[♯♭]/g, "")) {
		case "1": return fr.root;
		case "2": return fr.ninth;
		case "3": return fr.third;
		case "5": return fr.fifth;
		case "7": return fr.seventh;
		default: return fr.color;
	}
}
var gr = {
	tonic: "#45c07a",
	subdom: "#5aa2ea",
	dominant: "#ea6a3c"
}, _r = [
	"tonic",
	"subdom",
	"tonic",
	"subdom",
	"dominant",
	"tonic",
	"dominant"
];
function vr(e) {
	return gr[_r[e] ?? "tonic"];
}
//#endregion
//#region src/lib/boardStyles.ts
var yr = {
	rosewood: {
		label: "Rosewood",
		mode: "wood",
		swatch: "#4a2c1c",
		surface: "linear-gradient(180deg,#4a2d1d 0%,#3a2216 55%,#2d1a11 100%)",
		grain: "repeating-linear-gradient(92deg,rgba(0,0,0,0.42) 0 1px,rgba(255,255,255,0.05) 1px 3px,rgba(0,0,0,0.24) 3px 7px,rgba(140,90,55,0.16) 7px 13px)",
		grainOp: .28,
		wire: "linear-gradient(90deg,#5f666e,#98a1a9 42%,#767d85)",
		nut: "linear-gradient(90deg,#cbbf9f,#f2e9cf,#bdb08e)",
		stringPlain: "linear-gradient(180deg,#ffffff,#f0f4f8 30%,#98a1ab)",
		stringWound: "linear-gradient(180deg,#f0dcae,#c9a86e 34%,#7d6538)",
		stringCore: "rgba(255,255,255,0.95)",
		inlay: "#f6efe0",
		inlayBg: "linear-gradient(140deg,#fdf8ee,#ded2bd 60%,#f4ebd9)",
		inlayShadow: "inset 0 1px 0 rgba(255,255,255,0.8),0 1px 2px rgba(0,0,0,0.5)",
		ring: "rgba(255,255,255,0.92)",
		dimRing: "rgba(255,255,255,0.4)",
		dimInk: "rgba(255,255,255,0.72)",
		edge: "linear-gradient(180deg,#100d09,#1c1710)",
		ink: "#17150f"
	},
	paper: {
		label: "Shop drawing",
		swatch: "#efe9dc",
		mode: "paper",
		surface: "#f6f1e6",
		grain: "none",
		grainOp: 0,
		wire: "#17150f",
		nut: "#17150f",
		stringPlain: "#17150f",
		stringWound: "#17150f",
		stringCore: "transparent",
		inlay: "#17150f",
		inlayBg: "#17150f",
		inlayShadow: "none",
		ring: "rgba(0,0,0,0.85)",
		dimRing: "rgba(23,21,15,0.4)",
		dimInk: "rgba(23,21,15,0.55)",
		edge: "transparent",
		ink: "#17150f"
	},
	maple: {
		label: "Maple",
		mode: "wood",
		swatch: "#d9b478",
		surface: "linear-gradient(180deg,#e3c085 0%,#d3ad70 55%,#c29a5d 100%)",
		grain: "repeating-linear-gradient(89deg,rgba(120,78,36,0.3) 0 1px,rgba(255,255,255,0.22) 1px 4px,rgba(120,78,36,0.14) 4px 9px)",
		grainOp: .25,
		wire: "linear-gradient(90deg,#565c64,#8d959d 42%,#6d747c)",
		nut: "linear-gradient(90deg,#b8ab88,#efe6cd,#ab9e7d)",
		stringPlain: "linear-gradient(180deg,#7d8590,#4a5158 34%,#2f3439)",
		stringWound: "linear-gradient(180deg,#8a7346,#6a5228 34%,#3d2f14)",
		stringCore: "rgba(255,255,255,0.6)",
		inlay: "#241d15",
		inlayBg: "linear-gradient(140deg,#3a3026,#1c1710 60%,#332a20)",
		inlayShadow: "inset 0 1px 0 rgba(255,255,255,0.14),0 1px 1px rgba(0,0,0,0.28)",
		ring: "rgba(30,24,17,0.85)",
		dimRing: "rgba(40,32,22,0.45)",
		dimInk: "rgba(35,28,20,0.72)",
		edge: "linear-gradient(180deg,#8a6c3e,#6d5430)",
		ink: "#17150f"
	},
	ebony: {
		label: "Ebony",
		mode: "wood",
		swatch: "#1c1917",
		surface: "linear-gradient(180deg,#221e1b 0%,#171412 55%,#100e0d 100%)",
		grain: "repeating-linear-gradient(91deg,rgba(0,0,0,0.5) 0 2px,rgba(255,255,255,0.045) 2px 5px)",
		grainOp: .22,
		wire: "linear-gradient(90deg,#636a72,#9ba4ac 42%,#7a8189)",
		nut: "linear-gradient(90deg,#cdc2a4,#f4ecd4,#bfb392)",
		stringPlain: "linear-gradient(180deg,#ffffff,#eff3f8 30%,#9aa3ad)",
		stringWound: "linear-gradient(180deg,#f2dfb4,#cbaa71 34%,#7f673a)",
		stringCore: "rgba(255,255,255,0.95)",
		inlay: "#f4f1ea",
		inlayBg: "linear-gradient(140deg,#fffdf8,#e2ded4 60%,#f7f3ec)",
		inlayShadow: "inset 0 1px 0 rgba(255,255,255,0.85),0 1px 2px rgba(0,0,0,0.6)",
		ring: "rgba(255,255,255,0.92)",
		dimRing: "rgba(255,255,255,0.34)",
		dimInk: "rgba(255,255,255,0.7)",
		edge: "linear-gradient(180deg,#0b0a09,#161311)",
		ink: "#17150f"
	},
	flat: {
		label: "Flat UI",
		mode: "wood",
		swatch: "#20242f",
		surface: "linear-gradient(180deg,#232833 0%,#1e222c 100%)",
		grain: "none",
		grainOp: 0,
		wire: "#2f3644",
		nut: "#5b6478",
		stringPlain: "#4a5468",
		stringWound: "#3d465a",
		stringCore: "rgba(255,255,255,0.22)",
		inlay: "#8f97ab",
		inlayBg: "#8f97ab",
		inlayShadow: "none",
		ring: "#f0a63c",
		dimRing: "rgba(143,151,171,0.45)",
		dimInk: "rgba(190,198,214,0.75)",
		edge: "#080a0d",
		ink: "#17150f"
	}
}, br = [
	{
		id: "dots",
		label: "Dots",
		full: "Dot inlays"
	},
	{
		id: "trapezoid",
		label: "Trapezoid",
		full: "Trapezoid inlays"
	},
	{
		id: "blocks",
		label: "Blocks",
		full: "Block inlays"
	},
	{
		id: "split",
		label: "Split",
		full: "Split parallelogram inlays"
	},
	{
		id: "suits",
		label: "Suits",
		full: "Card suit inlays"
	}
], xr = [
	{
		id: "tonebar",
		label: "Tonebar",
		hint: "Dunlop-style flat-top tonebar — thumb scoop and brass screw at the tail"
	},
	{
		id: "steel",
		label: "Steel bar",
		hint: "Solid chrome pedal-steel bar with a bullet nose"
	},
	{
		id: "slim",
		label: "Slim",
		hint: "Flat slim indicator"
	}
], Sr = {
	finish: "rosewood",
	inlay: "dots",
	barStyle: "steel",
	grain: !0,
	wire: !0,
	gauges: !0,
	side: !0
}, Cr = "gfv.board.v1";
function wr() {
	try {
		let e = localStorage.getItem(Cr);
		if (!e) return Sr;
		let t = JSON.parse(e);
		return {
			finish: yr[t.finish] ? t.finish : Sr.finish,
			inlay: br.some((e) => e.id === t.inlay) ? t.inlay : Sr.inlay,
			barStyle: xr.some((e) => e.id === t.barStyle) ? t.barStyle : Sr.barStyle,
			grain: typeof t.grain == "boolean" ? t.grain : Sr.grain,
			wire: typeof t.wire == "boolean" ? t.wire : Sr.wire,
			gauges: typeof t.gauges == "boolean" ? t.gauges : Sr.gauges,
			side: typeof t.side == "boolean" ? t.side : Sr.side
		};
	} catch {
		return Sr;
	}
}
function Tr(e) {
	try {
		localStorage.setItem(Cr, JSON.stringify(e));
	} catch {}
}
function Er(e, t) {
	return t ? Math.max(1, Math.min(3.4, 3.2 - (e - 47) * (2.2 / 19))) : 1.6;
}
var Dr = (e, t) => t && e < 61, Or = {
	detail: 0,
	shade: 0,
	plate: 0,
	noseH: 0,
	tailH: 0,
	shadowTop: 0,
	crownX: 0,
	crownTop: -999,
	crownH: 0,
	sheenX: 0,
	sheenW: 0,
	sheenTop: 0,
	sheenBot: 0,
	specX: 0,
	specTop: 0,
	specW: 0,
	specH: 0,
	plateX: 0,
	plateTop: 0,
	plateBot: 0,
	plateR: "0",
	bandX: 0,
	bandW: 0,
	bandTop: 0,
	bandBot: 0,
	g1: -10,
	g2: -10,
	scoopX: 0,
	scoopBot: -999,
	scoopD: 0,
	screwX: 0,
	screwBot: -999,
	screwD: 0
};
function kr(e, t) {
	if (e === "tonebar") {
		let e = Math.round(Math.min(88, Math.max(56, t * 1.34))), n = Math.round(e * .62), r = Math.max(3, Math.round(e * .13)), i = Math.round(e * 1.05), a = Math.round(e * .36);
		return {
			...Or,
			w: e,
			top: -18,
			h: "calc(100% + 52px)",
			radius: `50% 50% 3px 3px / ${n}px ${n}px 3px 3px`,
			bg: "linear-gradient(90deg,#12171c 0%,#232a30 3%,#5a636b 6%,#a9b3bb 9%,#f2f6f9 12%,#ffffff 15%,#e9eff4 19%,#dee6ec 28%,#d6dee5 38%,#7d868f 43%,#4a525a 47%,#3f474e 52%,#6b747d 56%,#cfd8df 61%,#e2e9ef 72%,#f6f9fb 80%,#fdfeff 84%,#b6c0c8 89%,#69727a 93%,#2c3339 97%,#111619 100%)",
			shadow: "inset 0 0 0 1px rgba(255,255,255,0.24),0 0 20px rgba(255,255,255,0.08)",
			detail: 1,
			shade: 1,
			plate: 1,
			noseH: Math.round(n * .8),
			crownX: Math.max(2, Math.round(e * .06)),
			crownTop: 2,
			crownH: Math.round(n * .5),
			shadowTop: Math.round(n * .4),
			sheenX: Math.round(e * .135),
			sheenW: Math.max(2, Math.round(e * .035)),
			sheenTop: Math.round(n * .62),
			sheenBot: 8,
			specX: Math.round(e * .2),
			specTop: Math.round(n * .2),
			specW: Math.round(e * .3),
			specH: Math.round(e * .2),
			plateX: r,
			plateTop: Math.round(n * .34),
			plateBot: 3,
			plateR: `${a}px ${a}px 2px 2px / ${Math.round(n * .72)}px ${Math.round(n * .72)}px 2px 2px`,
			scoopX: Math.round((e - i) / 2),
			scoopBot: -Math.round(i * .66),
			scoopD: i,
			screwX: Math.round(e * .17),
			screwBot: Math.round(e * .05),
			screwD: Math.max(4, Math.round(e * .1))
		};
	}
	if (e === "steel") {
		let e = Math.round(Math.min(74, Math.max(46, t * 1.08))), n = Math.round(e * .9);
		return {
			...Or,
			w: e,
			top: -22,
			h: "calc(100% + 48px)",
			radius: `50% 50% 3px 3px / ${n}px ${n}px 3px 3px`,
			bg: "linear-gradient(90deg,#191d22 0%,#3f474f 3%,#79848f 9%,#b4bfc9 16%,#e9f0f6 22%,#ffffff 27%,#f6fafd 31%,#cfd8e1 37%,#97a1ab 42%,#5b646d 45%,#333a41 47%,#414951 53%,#626b74 62%,#8f99a3 71%,#c8d1da 80%,#e8eef4 85%,#9aa4ae 91%,#4d555d 96%,#1d2126 100%)",
			shadow: "inset 0 0 0 1px rgba(255,255,255,0.18),0 0 20px rgba(255,255,255,0.1)",
			detail: 1,
			shade: 1,
			noseH: n,
			crownX: Math.max(2, Math.round(e * .08)),
			crownTop: 2,
			crownH: Math.round(n * .44),
			shadowTop: Math.round(n * .5),
			sheenX: Math.round(e * .245),
			sheenW: Math.max(2, Math.round(e * .075)),
			sheenTop: Math.round(n * .4),
			sheenBot: 7,
			specX: Math.round(e * .17),
			specTop: Math.round(n * .3),
			specW: Math.round(e * .34),
			specH: Math.round(e * .26)
		};
	}
	return {
		...Or,
		w: 11,
		top: -3,
		h: "calc(100% + 6px)",
		radius: "5px",
		bg: "linear-gradient(90deg,#5c6268 0%,#aeb5bd 18%,#f7fbff 44%,#c7ced6 62%,#787f87 84%,#4d5359 100%)",
		shadow: "0 0 14px rgba(255,255,255,0.22),3px 0 8px rgba(0,0,0,0.5)"
	};
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Ar = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), z = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Ar();
})))(), jr = [
	3,
	5,
	7,
	9
], Mr = [12], Nr = [
	"♠",
	"♦",
	"♥",
	"♣"
], Pr = 44, Fr = 42, Ir = 30, Lr = 62, Rr = 26, zr = 30, Br = [
	"1",
	"♭2",
	"2",
	"♭3",
	"3",
	"4",
	"♭5",
	"5",
	"♭6",
	"6",
	"♭7",
	"7"
], Vr = 160, Hr = (e, t) => e === 0 ? Fr / 2 : Fr + (e - 1) * t + t / 2, Ur = R.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding-bottom: 6px;
`, Wr = R.div`
  margin: 0 auto;
`, Gr = R.div`
  position: relative;
  z-index: 5;
  display: flex;
  align-items: stretch;
`, Kr = R.div`
  width: ${Pr}px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`, qr = R.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  color: ${({ theme: e }) => e.colors.textSecondary};
  font-size: 11px;
  line-height: 1;

  &:hover {
    background: ${({ theme: e }) => `${e.colors.primary}22`};
    color: ${({ theme: e }) => e.colors.primary};
    border-color: ${({ theme: e }) => e.colors.primary};
  }
`, Jr = R.button`
  margin: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 3px 0 5px;
  border: none;
  border-radius: 5px 5px 0 0;
  cursor: pointer;
  background: ${({ $active: e, theme: t }) => e ? `${t.colors.primary}24` : "transparent"};
  transition: background ${({ theme: e }) => e.transitions.fast};

  &:hover {
    background: ${({ $active: e, theme: t }) => e ? `${t.colors.primary}24` : `${t.colors.primary}14`};
  }
`, Yr = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 12px;
  font-weight: ${({ $dot: e, $active: t }) => e || t ? 600 : 400};
  color: ${({ $active: e, $dot: t, theme: n }) => e ? n.colors.primary : t ? n.colors.text : n.colors.textSecondary};
  line-height: 1;
`, Xr = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 8px;
  font-weight: 500;
  letter-spacing: 0.04em;
  line-height: 1;
  color: ${({ $active: e, theme: t }) => e ? t.colors.primary : t.colors.textSecondary};
  opacity: ${({ $active: e }) => e ? 1 : .7};
  white-space: nowrap;
`, Zr = R.div`
  display: flex;
  margin-top: ${Rr}px;
`, Qr = R.div`
  width: ${Pr}px;
  flex-shrink: 0;
  position: relative;
`, $r = R.div`
  position: absolute;
  right: 10px;
  transform: translateY(-50%);
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: ${({ $pulled: e }) => e ? "9px" : "12px"};
  font-weight: 600;
  line-height: 1;
  color: ${({ $pulled: e, theme: t }) => e ? t.colors.primary : t.colors.textSecondary};
  user-select: none;
  white-space: nowrap;
`, ei = R.div`
  position: relative;
  border-radius: 4px;
  box-shadow:
    inset 0 0 0 1px rgba(0, 0, 0, 0.4),
    inset 0 14px 26px rgba(0, 0, 0, 0.28),
    0 12px 26px rgba(0, 0, 0, 0.5);
`, ti = R.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`, ni = R(ti)`
  border-radius: inherit;
  overflow: hidden;
  mix-blend-mode: overlay;
`, ri = R.div`
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 2;
  cursor: pointer;
`, ii = R.div`
  position: relative;
  height: 14px;
  border-radius: 0 0 4px 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
`, ai = R.div`
  position: absolute;
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
  transition: left ${Vr / 1e3}s cubic-bezier(0.3, 0.9, 0.4, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`, oi = Gn`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.7);
  }
`, si = R.button`
  position: absolute;
  z-index: 4;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  border: none;
  padding: 0;
  cursor: pointer;
  user-select: none;
  background: ${({ $fill: e }) => e ?? "transparent"};
  transform: translate(-50%, -50%) ${({ $isPlaying: e }) => e ? "scale(1.18)" : "scale(1)"};
  opacity: ${({ $fading: e }) => +!e};
  pointer-events: ${({ $fading: e }) => e ? "none" : "auto"};
  transition:
    transform ${({ theme: e }) => e.transitions.fast},
    box-shadow ${({ theme: e }) => e.transitions.fast},
    background ${({ theme: e }) => e.transitions.fast},
    opacity 0.12s ease;
  animation: ${oi} 0.14s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme: e }) => e.colors.primary};
    outline-offset: 2px;
  }
`, ci = R.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at 34% 26%, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.12) 42%, rgba(255, 255, 255, 0) 62%),
    radial-gradient(circle at 62% 108%, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 46%);
`, li = R.span`
  position: absolute;
  left: 20%;
  top: 11%;
  width: 38%;
  height: 26%;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
`, ui = "inset 0 -3px 7px rgba(0,0,0,0.36), inset 0 3px 5px rgba(255,255,255,0.45), inset 0 0 0 1px rgba(255,255,255,0.18), 0 5px 9px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.5)", di = ({ prefs: e, fretW: t, left: n, fin: r }) => {
	let i = kr(e.barStyle, t);
	if (r.mode === "paper") {
		let e = r.ink;
		return /* @__PURE__ */ (0, z.jsxs)(ai, {
			"aria-hidden": "true",
			style: {
				left: n,
				top: i.top,
				height: i.h,
				width: i.w,
				borderRadius: i.radius,
				overflow: "hidden",
				background: "#efe9dc",
				boxShadow: `inset 0 0 0 1.5px ${e}`
			},
			children: [
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: "50%",
					top: 2,
					bottom: 2,
					width: 0,
					transform: "translateX(-50%)",
					borderLeft: "1px dashed #8a8270"
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.plateX,
					right: i.plateX,
					top: i.plateTop,
					bottom: i.plateBot,
					border: `1px solid ${e}`,
					borderRadius: i.plateR,
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.scoopX,
					bottom: i.scoopBot,
					width: i.scoopD,
					height: i.scoopD,
					border: `1px solid ${e}`,
					borderRadius: "50%",
					background: "#efe9dc",
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.screwX,
					bottom: i.screwBot,
					width: i.screwD,
					height: i.screwD,
					borderRadius: "50%",
					border: `1px solid ${e}`,
					background: "#efe9dc",
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.screwX,
					bottom: i.screwBot + i.screwD / 2,
					width: i.screwD,
					height: 1,
					background: e,
					opacity: i.plate
				} })
			]
		});
	}
	return /* @__PURE__ */ (0, z.jsxs)(ai, {
		"aria-hidden": "true",
		style: {
			left: n,
			top: i.top,
			height: i.h,
			width: i.w
		},
		children: [/* @__PURE__ */ (0, z.jsx)("div", { style: {
			position: "absolute",
			left: 3,
			right: -7,
			top: i.shadowTop,
			bottom: 3,
			borderRadius: i.radius,
			background: "rgba(0,0,0,0.6)",
			filter: "blur(8px)",
			opacity: i.shade
		} }), /* @__PURE__ */ (0, z.jsxs)("div", {
			style: {
				position: "absolute",
				inset: 0,
				overflow: "hidden",
				borderRadius: i.radius,
				background: i.bg,
				boxShadow: i.shadow
			},
			children: [
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					inset: 0,
					background: "linear-gradient(180deg,rgba(0,0,0,0.14),rgba(255,255,255,0) 28%,rgba(255,255,255,0.16) 78%,rgba(255,255,255,0.02) 100%)",
					opacity: i.shade
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					height: i.noseH,
					background: "linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.05) 26%,rgba(16,21,26,0.28) 62%,rgba(16,21,26,0) 100%)",
					opacity: i.detail
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.crownX,
					right: i.crownX,
					top: i.crownTop,
					height: i.crownH,
					borderRadius: "50%",
					borderTop: "1.5px solid rgba(255,255,255,0.9)",
					opacity: i.detail
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.plateX,
					right: i.plateX,
					top: i.plateTop,
					bottom: i.plateBot,
					borderRadius: i.plateR,
					background: "linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.16) 44%,rgba(255,255,255,0.03))",
					boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 0 0 1px rgba(24,30,36,0.28)",
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.specX,
					top: i.specTop,
					width: i.specW,
					height: i.specH,
					borderRadius: "50%",
					background: "radial-gradient(closest-side,rgba(255,255,255,0.92),rgba(255,255,255,0))",
					opacity: i.detail
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.sheenX,
					top: i.sheenTop,
					bottom: i.sheenBot,
					width: i.sheenW,
					background: "linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.98) 12%,rgba(255,255,255,0.9) 80%,rgba(255,255,255,0.2))",
					filter: "blur(0.7px)",
					opacity: i.shade
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.bandX,
					top: i.bandTop,
					bottom: i.bandBot,
					width: i.bandW,
					background: "linear-gradient(180deg,rgba(28,34,40,0),rgba(28,34,40,0.5) 18%,rgba(28,34,40,0.42) 82%,rgba(28,34,40,0))",
					filter: "blur(1.4px)",
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.scoopX,
					bottom: i.scoopBot,
					width: i.scoopD,
					height: i.scoopD,
					borderRadius: "50%",
					background: "radial-gradient(ellipse at 50% 4%,rgba(28,34,40,0.82),rgba(96,106,116,0.6) 40%,rgba(206,215,222,0.72) 72%,rgba(250,252,254,0.85))",
					boxShadow: "inset 0 -2px 0 rgba(255,255,255,0.9), inset 0 5px 9px rgba(0,0,0,0.45)",
					opacity: i.plate
				} }),
				/* @__PURE__ */ (0, z.jsx)("div", { style: {
					position: "absolute",
					left: i.screwX,
					bottom: i.screwBot,
					width: i.screwD,
					height: i.screwD,
					borderRadius: "50%",
					background: "radial-gradient(circle at 34% 28%,#f7e2ab,#c49a44 58%,#7c6020)",
					boxShadow: "0 0 0 1px rgba(18,14,6,0.6)",
					opacity: i.plate
				} })
			]
		})]
	});
};
function fi(e, t, n, r) {
	let i = [];
	return [...jr, ...Mr].forEach((a, o) => {
		let s = Hr(a, t), c = Mr.includes(a);
		if (e.inlay === "dots") {
			let e = Math.round(Math.max(13, Math.min(26, Math.min(n * .62, t * .42))));
			c ? (i.push({
				left: s,
				top: r / 2 - n,
				w: e,
				h: e,
				radius: "50%"
			}), i.push({
				left: s,
				top: r / 2 + n,
				w: e,
				h: e,
				radius: "50%"
			})) : i.push({
				left: s,
				top: r / 2,
				w: e,
				h: e,
				radius: "50%"
			});
		} else if (e.inlay === "trapezoid") {
			let e = t * .44, n = "polygon(0 13%,100% 0,100% 100%,0 87%)";
			if (c) {
				let t = r * .31;
				i.push({
					left: s,
					top: r * .285,
					w: e,
					h: t,
					clip: n,
					radius: "1px"
				}), i.push({
					left: s,
					top: r * .715,
					w: e,
					h: t,
					clip: n,
					radius: "1px"
				});
			} else i.push({
				left: s,
				top: r / 2,
				w: e,
				h: r * .68,
				clip: n,
				radius: "1px"
			});
		} else if (e.inlay === "blocks") {
			let e = t * .68;
			i.push({
				left: s,
				top: r / 2,
				w: e,
				h: r * (c ? .78 : .62),
				radius: "2px"
			});
		} else if (e.inlay === "split") {
			let e = t * .52, n = Math.max(8, r * .17);
			i.push({
				left: s,
				top: r * (c ? .22 : .29),
				w: e,
				h: n,
				skew: "skewX(-20deg)",
				radius: "1px"
			}), i.push({
				left: s,
				top: r * (c ? .78 : .71),
				w: e,
				h: n,
				skew: "skewX(-20deg)",
				radius: "1px"
			}), c && i.push({
				left: s,
				top: r * .5,
				w: e,
				h: n,
				skew: "skewX(-20deg)",
				radius: "1px"
			});
		} else {
			let e = Math.max(15, Math.min(30, r * .26)), t = Nr[o % 4];
			c ? (i.push({
				left: s,
				top: r * .3,
				w: e * 1.1,
				h: e * 1.1,
				glyph: t,
				size: e,
				transparent: !0
			}), i.push({
				left: s,
				top: r * .7,
				w: e * 1.1,
				h: e * 1.1,
				glyph: t,
				size: e,
				transparent: !0
			})) : i.push({
				left: s,
				top: r / 2,
				w: e * 1.2,
				h: e * 1.2,
				glyph: t,
				size: e,
				transparent: !0
			});
		}
	}), i;
}
var pi = ({ midi: e, spellings: t, maxFret: n, barFret: r, onBarFretChange: i, view: a, activeStrings: o, rootPc: s, rootHasFlat7: c = !1, playingStrings: l, onNoteClick: u, scanLabels: d, scalePcs: f, keyRootPc: p, scaleDegreeLabels: m, pulled: h, baseSpellings: g, flats: _ = !1, onPlay: v, board: y }) => {
	let b = e.length, x = Array.from({ length: n + 1 }, (e, t) => t), S = yr[y.finish], C = S.mode === "paper", w = "'IBM Plex Mono', ui-monospace, monospace", [T, ee] = (0, L.useState)(r), E = T !== r;
	(0, L.useLayoutEffect)(() => {
		if (r === T) return;
		if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
			ee(r);
			return;
		}
		let e = window.setTimeout(() => ee(r), Vr);
		return () => window.clearTimeout(e);
	}, [r, T]);
	let te = (0, L.useRef)(null), [ne, re] = (0, L.useState)(0);
	(0, L.useLayoutEffect)(() => {
		let e = te.current;
		if (!e) return;
		let t = () => re(e.clientWidth);
		t();
		let n = requestAnimationFrame(t), r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(t), r.observe(e)), window.addEventListener("resize", t), () => {
			cancelAnimationFrame(n), r?.disconnect(), window.removeEventListener("resize", t);
		};
	}, [n]);
	let D = Math.max(Ir, Math.min(Lr, Math.floor(((ne || 900) - Pr - Fr) / n))), O = Math.round(b > 6 ? Math.max(22, Math.min(30, D * .48)) : Math.max(30, Math.min(44, D * .71))), k = Math.round(Math.min(34, O - 5, D - 8, 34)), ie = Math.round(Math.max(10, Math.min(15, k * .44))), A = Math.round(Math.max(7, Math.min(10, k * .3))), j = Fr + n * D, M = b * O, ae = (e) => (b - 1 - e) * O + O / 2, oe = (e) => e === 0 ? Fr : D, se = (e) => e === 0 ? 0 : Fr + (e - 1) * D, ce = (e) => m?.get(e) ?? (p == null ? "" : Br[(e - p + 12) % 12]), N = (e) => `string ${b - e}`, P = (t, n) => {
		let r = Yn(e[t] + n);
		if (a === "map") {
			if (!f?.has(r)) return null;
			let e = p != null && r === p, i = ce(r);
			return {
				kind: e ? "root" : "scale",
				note: Zn(r, _),
				label: i,
				fill: i ? hr(i) : void 0,
				aria: `${Zn(r, _)}, scale degree ${i} — ${N(t)}, fret ${n}`
			};
		}
		if (n !== T) return null;
		let i = o === null || o.has(t), l = s === null ? "" : tr((r - s + 12) % 12, c);
		return {
			kind: i ? s !== null && r === s ? "root" : "chord" : "dim",
			note: Zn(r, _),
			label: l,
			fill: i && l ? mr(l) : void 0,
			aria: `${Zn(r, _)}${l ? `, ${l}` : ""} — ${N(t)}, fret ${n}`
		};
	}, le = fi(y, D, O, M), ue = a === "map" ? x : [T];
	return /* @__PURE__ */ (0, z.jsx)(Ur, {
		ref: te,
		children: /* @__PURE__ */ (0, z.jsxs)(Wr, {
			style: { width: Pr + j },
			children: [
				/* @__PURE__ */ (0, z.jsxs)(Gr, { children: [/* @__PURE__ */ (0, z.jsx)(Kr, { children: v && /* @__PURE__ */ (0, z.jsx)(qr, {
					type: "button",
					onClick: v,
					title: "Strum the highlighted strings",
					"aria-label": "Strum the highlighted strings",
					children: "▶"
				}) }), x.map((e) => {
					let t = jr.includes(e) || Mr.includes(e);
					return /* @__PURE__ */ (0, z.jsxs)(Jr, {
						type: "button",
						style: { width: oe(e) },
						$active: e === r,
						onClick: () => i(e),
						title: d[e] ? `${d[e]} — bar at fret ${e}` : `Bar at fret ${e}`,
						children: [/* @__PURE__ */ (0, z.jsx)(Yr, {
							$active: e === r,
							$dot: t,
							children: e
						}), /* @__PURE__ */ (0, z.jsx)(Xr, {
							$active: e === r,
							children: d[e] ?? "·"
						})]
					}, e);
				})] }),
				/* @__PURE__ */ (0, z.jsxs)(Zr, { children: [/* @__PURE__ */ (0, z.jsx)(Qr, {
					style: { height: M },
					children: e.map((e, n) => {
						let r = !!h?.[n];
						return /* @__PURE__ */ (0, z.jsx)($r, {
							$pulled: r,
							style: { top: ae(n) },
							title: r ? `String ${b - n} — pulled ${g?.[n] ?? ""} → ${t[n]}` : `String ${b - n} — open ${t[n]}`,
							children: r ? `${g?.[n] ?? ""}→${t[n]}` : t[n]
						}, n);
					})
				}), /* @__PURE__ */ (0, z.jsxs)(ei, {
					style: {
						width: j,
						height: M,
						background: S.surface,
						...C ? {
							border: `1px solid ${S.ink}`,
							borderRadius: 0,
							boxShadow: "none"
						} : {}
					},
					children: [
						y.grain && S.grain !== "none" && /* @__PURE__ */ (0, z.jsx)(ni, { style: {
							background: S.grain,
							opacity: S.grainOp
						} }),
						y.wire && C && /* @__PURE__ */ (0, z.jsxs)(ti, { children: [x.slice(1).map((e) => /* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Fr + e * D,
							top: 0,
							bottom: 0,
							width: 1,
							transform: "translateX(-50%)",
							background: S.ink,
							opacity: .55
						} }, e)), /* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Fr,
							top: 0,
							bottom: 0,
							width: 5,
							transform: "translateX(-50%)",
							background: S.ink
						} })] }),
						y.wire && !C && /* @__PURE__ */ (0, z.jsxs)(ti, { children: [x.slice(1).map((e) => {
							let t = Fr + e * D;
							return /* @__PURE__ */ (0, z.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("div", { style: {
								position: "absolute",
								left: t,
								top: 0,
								bottom: 0,
								width: 4,
								transform: "translateX(-50%)",
								background: S.wire,
								boxShadow: "inset 1px 0 0 rgba(255,255,255,0.28), inset -1px 0 0 rgba(0,0,0,0.35), 3px 0 4px rgba(0,0,0,0.4)"
							} }), /* @__PURE__ */ (0, z.jsx)("div", { style: {
								position: "absolute",
								left: t + 2,
								top: 0,
								bottom: 0,
								width: 1,
								background: "rgba(0,0,0,0.55)"
							} })] }, e);
						}), /* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Fr,
							top: 0,
							bottom: 0,
							width: 7,
							transform: "translateX(-50%)",
							background: S.nut,
							boxShadow: "3px 0 6px rgba(0,0,0,0.5)"
						} })] }),
						/* @__PURE__ */ (0, z.jsx)(ti, { children: le.map((e, t) => /* @__PURE__ */ (0, z.jsx)("div", {
							style: {
								position: "absolute",
								left: e.left,
								top: e.top,
								width: e.w,
								height: e.h,
								transform: `translate(-50%,-50%) ${e.skew ?? ""}`,
								borderRadius: e.radius ?? 0,
								clipPath: e.clip ?? "none",
								background: e.transparent ? "transparent" : S.inlayBg,
								boxShadow: e.transparent ? "none" : S.inlayShadow,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								font: `400 ${e.size ?? 0}px/1 inherit`,
								color: S.inlay
							},
							children: e.glyph ?? ""
						}, t)) }),
						/* @__PURE__ */ (0, z.jsx)(ti, { children: e.map((e, t) => {
							let n = ae(t), r = Math.round(Er(e, y.gauges) * 10) / 10, i = Dr(e, y.gauges);
							return C ? /* @__PURE__ */ (0, z.jsx)("div", { style: {
								position: "absolute",
								left: 0,
								right: 0,
								top: n,
								height: r,
								transform: "translateY(-50%)",
								background: S.ink,
								opacity: .85
							} }, t) : /* @__PURE__ */ (0, z.jsxs)(L.Fragment, { children: [
								/* @__PURE__ */ (0, z.jsx)("div", { style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: n + r / 2 + .6,
									height: Math.max(1.5, r * .8),
									background: "rgba(0,0,0,0.55)",
									filter: "blur(1.6px)"
								} }),
								/* @__PURE__ */ (0, z.jsx)("div", { style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: n,
									height: r,
									transform: "translateY(-50%)",
									background: i ? S.stringWound : S.stringPlain,
									boxShadow: "0 0 1px rgba(0,0,0,0.5)"
								} }),
								i && /* @__PURE__ */ (0, z.jsx)("div", { style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: n,
									height: r,
									transform: "translateY(-50%)",
									background: "repeating-linear-gradient(76deg,rgba(0,0,0,0.4) 0 1px,rgba(255,255,255,0.3) 1px 2.4px)",
									opacity: .55
								} }),
								/* @__PURE__ */ (0, z.jsx)("div", { style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: n - r / 2 + .4,
									height: 1,
									background: S.stringCore,
									opacity: r >= 2 ? .9 : .7
								} }),
								y.gauges && /* @__PURE__ */ (0, z.jsx)("div", { style: {
									position: "absolute",
									left: 0,
									right: 0,
									top: n - r / 2,
									height: 1,
									background: "rgba(255,255,255,0.5)",
									opacity: .55
								} })
							] }, t);
						}) }),
						x.map((e) => /* @__PURE__ */ (0, z.jsx)(ri, {
							style: {
								left: se(e),
								width: oe(e)
							},
							title: `Bar at fret ${e}`,
							onClick: () => i(e)
						}, e)),
						a === "bar" && /* @__PURE__ */ (0, z.jsx)(di, {
							prefs: y,
							fretW: D,
							left: Hr(r, D),
							fin: S
						}),
						e.map((e, t) => ue.map((e) => {
							let n = P(t, e);
							if (!n) return null;
							let i = n.kind === "dim", o = l.has(t) && (a !== "map" || e === r);
							return /* @__PURE__ */ (0, z.jsxs)(si, {
								type: "button",
								style: {
									left: Hr(e, D),
									top: ae(t),
									width: k,
									height: k,
									color: i ? S.dimInk : pr,
									border: C && !i ? `1px solid ${S.ink}` : void 0,
									outline: n.kind === "root" ? `2px solid ${S.ring}` : i ? `1px dashed ${S.dimRing}` : "none",
									outlineOffset: +(n.kind === "root"),
									boxShadow: o ? `0 0 12px ${n.fill ?? S.ring}${C ? "" : `, ${ui}`}` : i || C ? "none" : ui
								},
								$dim: i,
								$fill: i ? void 0 : n.fill ?? S.inlay,
								$fading: a === "bar" && E,
								$isPlaying: o,
								onClick: (n) => {
									n.stopPropagation(), u(t, e);
								},
								title: n.aria,
								"aria-label": n.aria,
								children: [
									!i && !C && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(ci, { "aria-hidden": "true" }), /* @__PURE__ */ (0, z.jsx)(li, { "aria-hidden": "true" })] }),
									/* @__PURE__ */ (0, z.jsx)("span", {
										style: {
											position: "relative",
											fontWeight: 700,
											fontSize: ie,
											fontFamily: C ? w : void 0
										},
										children: n.note
									}),
									n.label && k >= 22 && /* @__PURE__ */ (0, z.jsx)("span", {
										style: {
											position: "relative",
											fontWeight: C ? 500 : 600,
											fontSize: A,
											opacity: .85,
											marginTop: 1,
											fontFamily: C ? w : void 0
										},
										children: n.label
									})
								]
							}, `${t}:${e}`);
						}))
					]
				})] }),
				y.side && /* @__PURE__ */ (0, z.jsxs)("div", {
					style: {
						display: "flex",
						marginBottom: zr
					},
					children: [C ? /* @__PURE__ */ (0, z.jsx)("div", {
						style: {
							width: Pr,
							flexShrink: 0,
							font: `400 8px/14px ${w}`,
							textAlign: "right",
							paddingRight: 10,
							color: "#8a8270"
						},
						children: "edge"
					}) : /* @__PURE__ */ (0, z.jsx)("div", { style: {
						width: Pr,
						flexShrink: 0
					} }), /* @__PURE__ */ (0, z.jsxs)(ii, {
						style: C ? {
							width: j,
							background: "transparent",
							border: "1px solid #c4bba6",
							borderTop: "none",
							borderRadius: 0,
							boxShadow: "none"
						} : {
							width: j,
							background: S.edge
						},
						children: [jr.map((e) => /* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Hr(e, D),
							top: 7,
							width: C ? 4 : 5,
							height: C ? 4 : 5,
							borderRadius: "50%",
							transform: "translate(-50%,-50%)",
							background: C ? S.ink : S.inlay,
							opacity: C ? 1 : .85
						} }, e)), Mr.map((e) => /* @__PURE__ */ (0, z.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Hr(e, D) - 5,
							top: 7,
							width: C ? 4 : 5,
							height: C ? 4 : 5,
							borderRadius: "50%",
							transform: "translate(-50%,-50%)",
							background: C ? S.ink : S.inlay,
							opacity: C ? 1 : .85
						} }), /* @__PURE__ */ (0, z.jsx)("div", { style: {
							position: "absolute",
							left: Hr(e, D) + 5,
							top: 7,
							width: C ? 4 : 5,
							height: C ? 4 : 5,
							borderRadius: "50%",
							transform: "translate(-50%,-50%)",
							background: C ? S.ink : S.inlay,
							opacity: C ? 1 : .85
						} })] }, e))]
					})]
				}),
				!y.side && /* @__PURE__ */ (0, z.jsx)("div", { style: { height: zr } })
			]
		})
	});
}, mi = m(), hi = [
	{
		id: "c6",
		name: "C6",
		group: "lap-steel",
		midi: [
			48,
			52,
			55,
			57,
			60,
			64
		],
		spellings: [
			"C",
			"E",
			"G",
			"A",
			"C",
			"E"
		],
		description: "The lap steel standard (Jerry Byrd). One bar = C major on the low strings, its relative A minor on top — a major chord and its relative minor under every fret."
	},
	{
		id: "a6",
		name: "A6",
		group: "lap-steel",
		midi: [
			49,
			52,
			54,
			57,
			61,
			64
		],
		spellings: [
			"C♯",
			"E",
			"F♯",
			"A",
			"C♯",
			"E"
		],
		description: "The classic western swing tuning — the same 6th-chord sound as C6, voiced with the 3rd in the bass: A major on the top three strings, F♯m just below."
	},
	{
		id: "c6-a7",
		name: "C6/A7",
		group: "lap-steel",
		midi: [
			49,
			52,
			55,
			57,
			60,
			64
		],
		spellings: [
			"C♯",
			"E",
			"G",
			"A",
			"C",
			"E"
		],
		description: "C6 with the low C raised to C♯ — the top four strings keep C6, the bottom four spell A7. Sixth and dominant worlds under one bar (Jerry Byrd).",
		key: {
			root: "C",
			scale: "Major"
		}
	},
	{
		id: "e7",
		name: "E7",
		group: "lap-steel",
		midi: [
			47,
			50,
			52,
			56,
			59,
			64
		],
		spellings: [
			"B",
			"D",
			"E",
			"G♯",
			"B",
			"E"
		],
		description: "The blues standard — a dominant 7th built in, while the top four strings stay a pure E major triad."
	},
	{
		id: "e13",
		name: "E13",
		group: "lap-steel",
		midi: [
			50,
			52,
			56,
			59,
			61,
			64
		],
		spellings: [
			"D",
			"E",
			"G♯",
			"B",
			"C♯",
			"E"
		],
		description: "Pre-pedal country. E7 plus the 13th (C♯) — crying parallel 6ths on top, the G♯–D tritone pull built in."
	},
	{
		id: "e9-lap",
		name: "E9 (lap)",
		group: "lap-steel",
		midi: [
			50,
			52,
			54,
			56,
			59,
			64
		],
		spellings: [
			"D",
			"E",
			"F♯",
			"G♯",
			"B",
			"E"
		],
		description: "A dominant-9th color tuning — ♭7, root and 9 stacked on the low strings for sultry blues colors. Not the pedal-steel E9."
	},
	{
		id: "b11",
		name: "B11",
		group: "lap-steel",
		midi: [
			47,
			51,
			54,
			57,
			61,
			64
		],
		spellings: [
			"B",
			"D♯",
			"F♯",
			"A",
			"C♯",
			"E"
		],
		description: "Jerry Byrd's Hawaiian specialty — B, F♯m, and A triads plus B7/B9 colors all under one straight bar, resolving a 4th up."
	},
	{
		id: "b11-tk-smith",
		name: "B11 (T.K. Smith)",
		group: "lap-steel",
		midi: [
			47,
			51,
			54,
			57,
			61,
			64
		],
		spellings: [
			"B",
			"D♯",
			"F♯",
			"A",
			"C♯",
			"E"
		],
		description: "T.K. Smith’s 6-string B11 (1·3·5·♭7·9·11 = B D♯ F♯ A C♯ E), his current setup on a 1934 Rickenbacher — B, F♯m and A triads plus B7/B9 colors under one straight bar."
	},
	{
		id: "cyrus-hybrid",
		name: "Cyrus Hybrid",
		group: "lap-steel",
		midi: [
			43,
			47,
			50,
			54,
			57,
			62
		],
		spellings: [
			"G",
			"B",
			"D",
			"F♯",
			"A",
			"D"
		],
		description: "Luke Cyrus Goetze’s G/D hybrid — G major on the low three strings, D major on the top three, so one bar covers both the I and the V. The open stack rings as a shimmering Gmaj9."
	},
	{
		id: "open-e",
		name: "Open E",
		group: "open",
		midi: [
			40,
			47,
			52,
			56,
			59,
			64
		],
		spellings: [
			"E",
			"B",
			"E",
			"G♯",
			"B",
			"E"
		],
		description: "A straight major triad, same as bottleneck open E — blues-rock and sacred steel. The easiest entry point for guitar players."
	},
	{
		id: "open-d",
		name: "Open D",
		group: "open",
		midi: [
			38,
			45,
			50,
			54,
			57,
			62
		],
		spellings: [
			"D",
			"A",
			"D",
			"F♯",
			"A",
			"D"
		],
		description: "Open E a whole step down — old-time, gospel, and Weissenborn territory. Lower tension, darker voice."
	},
	{
		id: "open-g-dobro",
		name: "Open G (Dobro)",
		group: "open",
		midi: [
			43,
			47,
			50,
			55,
			59,
			62
		],
		spellings: [
			"G",
			"B",
			"D",
			"G",
			"B",
			"D"
		],
		description: "Two stacked G triads (G-B-D twice) — the bluegrass and resonator standard, built for harmonized melody in 3rds."
	},
	{
		id: "open-g-low",
		name: "Open G (low bass)",
		group: "open",
		midi: [
			38,
			43,
			50,
			55,
			59,
			62
		],
		spellings: [
			"D",
			"G",
			"D",
			"G",
			"B",
			"D"
		],
		description: "Guitar-style 'Spanish' open G — the same top four strings over a deep D-G bass pair."
	},
	{
		id: "open-a-high",
		name: "Open A (high bass)",
		group: "open",
		midi: [
			45,
			49,
			52,
			57,
			61,
			64
		],
		spellings: [
			"A",
			"C♯",
			"E",
			"A",
			"C♯",
			"E"
		],
		description: "The classic 1920s Hawaiian tuning (Sol Hoopii) — the Dobro-G shape a whole step up, bright and singing."
	},
	{
		id: "standard",
		name: "Standard",
		group: "common",
		midi: [
			40,
			45,
			50,
			55,
			59,
			64
		],
		spellings: [
			"E",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		key: {
			root: "E",
			scale: "Minor"
		}
	},
	{
		id: "dadgad",
		name: "DADGAD",
		group: "common",
		midi: [
			38,
			45,
			50,
			55,
			57,
			62
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"A",
			"D"
		],
		description: "Modal \"Celtic\" tuning — the open strings ring a Dsus4. Pioneered by Davey Graham.",
		song: "\"She Moved Through the Fair\" — Davey Graham",
		key: {
			root: "D",
			scale: "Mixolydian"
		}
	},
	{
		id: "nashville",
		name: "Nashville",
		group: "common",
		midi: [
			52,
			57,
			62,
			67,
			59,
			64
		],
		spellings: [
			"E",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		description: "\"High-strung\" — the lower four strings swap to light gauges an octave up for a shimmering, 12-string-like chime. A studio doubling trick.",
		song: "\"Wild Horses\" — The Rolling Stones",
		key: {
			root: "E",
			scale: "Minor"
		},
		reentrant: !0
	},
	{
		id: "baritone",
		name: "Baritone",
		group: "common",
		midi: [
			35,
			40,
			45,
			50,
			54,
			59
		],
		spellings: [
			"B",
			"E",
			"A",
			"D",
			"F♯",
			"B"
		],
		description: "A long-scale guitar tuned a fourth low (B to B); born in surf and spaghetti-western scores.",
		song: "\"Wichita Lineman\" — Glen Campbell",
		key: {
			root: "B",
			scale: "Minor"
		}
	},
	{
		id: "bass-vi",
		name: "Bass VI",
		group: "common",
		midi: [
			28,
			33,
			38,
			43,
			47,
			52
		],
		spellings: [
			"E",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		description: "The whole guitar dropped a full octave — the Fender Bass VI's baritone-bass register, between guitar and bass.",
		song: "\"Lullaby\" — The Cure",
		key: {
			root: "E",
			scale: "Minor"
		}
	},
	{
		id: "hendrix",
		name: "Hendrix",
		group: "common",
		midi: [
			39,
			44,
			49,
			54,
			58,
			63
		],
		spellings: [
			"E♭",
			"A♭",
			"D♭",
			"G♭",
			"B♭",
			"E♭"
		],
		description: "Standard tuned down a half step to E♭ — slinkier strings and a darker, fatter tone. Jimi's default.",
		song: "\"Purple Haze\" — Jimi Hendrix",
		key: {
			root: "E♭",
			scale: "Minor"
		},
		preferFlats: !0
	},
	{
		id: "drop-d",
		name: "Drop D",
		group: "drop",
		midi: [
			38,
			45,
			50,
			55,
			59,
			64
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		description: "The low string dropped a whole step for one-finger power chords and a heavier low end.",
		song: "\"Everlong\" — Foo Fighters",
		key: {
			root: "D",
			scale: "Major"
		}
	},
	{
		id: "drop-db",
		name: "Drop Db",
		group: "drop",
		midi: [
			37,
			44,
			49,
			54,
			58,
			63
		],
		spellings: [
			"C♯",
			"G♯",
			"C♯",
			"F♯",
			"A♯",
			"D♯"
		],
		description: "Drop D shifted down a half step (Drop C#) for extra weight while staying playable.",
		song: "\"Them Bones\" — Alice in Chains",
		key: {
			root: "C♯",
			scale: "Minor"
		}
	},
	{
		id: "drop-c",
		name: "Drop C",
		group: "drop",
		midi: [
			36,
			43,
			48,
			53,
			57,
			62
		],
		spellings: [
			"C",
			"G",
			"C",
			"F",
			"A",
			"D"
		],
		description: "Drop D down a whole step — a huge nu-metal/metalcore rhythm tuning.",
		song: "\"Chop Suey!\" — System of a Down",
		key: {
			root: "C",
			scale: "Minor"
		},
		preferFlats: !0
	},
	{
		id: "drop-b",
		name: "Drop B",
		group: "drop",
		midi: [
			35,
			42,
			47,
			52,
			56,
			61
		],
		spellings: [
			"B",
			"F♯",
			"B",
			"E",
			"G♯",
			"C♯"
		],
		description: "Drop D down a minor third — heavy, tight and modern.",
		song: "\"Duality\" — Slipknot",
		key: {
			root: "B",
			scale: "Minor"
		}
	},
	{
		id: "drop-bb",
		name: "Drop Bb",
		group: "drop",
		midi: [
			34,
			41,
			46,
			51,
			55,
			60
		],
		spellings: [
			"B♭",
			"F",
			"B♭",
			"E♭",
			"G",
			"C"
		],
		description: "Drop D down a major third (Drop A#) for a crushing low register.",
		song: "\"Shadow Moses\" — Bring Me The Horizon",
		key: {
			root: "B♭",
			scale: "Minor"
		},
		preferFlats: !0
	},
	{
		id: "drop-a",
		name: "Drop A",
		group: "drop",
		midi: [
			33,
			40,
			45,
			50,
			54,
			59
		],
		spellings: [
			"A",
			"E",
			"A",
			"D",
			"F♯",
			"B"
		],
		description: "The low string down a fourth then dropped — a metalcore/deathcore staple.",
		song: "\"Psychosocial\" — Slipknot",
		key: {
			root: "A",
			scale: "Minor"
		}
	},
	{
		id: "fripp-nst",
		name: "Fripp NST",
		group: "artist",
		midi: [
			36,
			43,
			50,
			57,
			64,
			67
		],
		spellings: [
			"C",
			"G",
			"D",
			"A",
			"E",
			"G"
		],
		description: "Robert Fripp's New Standard Tuning — all fifths (plus a top minor third), built for wide, ringing intervals.",
		song: "\"Frame by Frame\" — King Crimson"
	},
	{
		id: "gambale",
		name: "Gambale",
		group: "artist",
		midi: [
			45,
			50,
			55,
			60,
			52,
			57
		],
		spellings: [
			"A",
			"D",
			"G",
			"C",
			"E",
			"A"
		],
		description: "Frank Gambale's tuning — the whole guitar up a fourth with the top two strings dropped an octave, so standard shapes yield piano-like close voicings. Invented for his own fusion playing.",
		key: {
			root: "A",
			scale: "Minor"
		},
		reentrant: !0
	},
	{
		id: "led-kashmir",
		name: "Led Kashmir",
		group: "artist",
		midi: [
			38,
			45,
			50,
			55,
			57,
			62
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"A",
			"D"
		],
		description: "Led Zeppelin · “Kashmir” (Jimmy Page, on his Danelectro)",
		key: {
			root: "D",
			scale: "Mixolydian"
		}
	},
	{
		id: "led-rain",
		name: "Led Rain",
		group: "artist",
		midi: [
			38,
			43,
			48,
			55,
			60,
			62
		],
		spellings: [
			"D",
			"G",
			"C",
			"G",
			"C",
			"D"
		],
		description: "Jimmy Page's lush DADGAD variation (a Gsus4/D voicing), written for one specific song.",
		song: "\"The Rain Song\" — Led Zeppelin",
		key: {
			root: "G",
			scale: "Major"
		}
	},
	{
		id: "blur-song2",
		name: "Blur Song2",
		group: "artist",
		midi: [
			38,
			45,
			50,
			55,
			59,
			64
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		description: "Drop D grunge-pop — the low string falls a whole step for the woo-hoo riff's punch.",
		song: "\"Song 2\" — Blur",
		key: {
			root: "D",
			scale: "Major"
		}
	},
	{
		id: "schizophrenia",
		name: "Schizophrenia",
		group: "artist",
		midi: [
			42,
			42,
			55,
			55,
			57,
			69
		],
		spellings: [
			"F♯",
			"F♯",
			"G",
			"G",
			"A",
			"A"
		],
		description: "Thurston Moore's clustered Sonic Youth drone tuning — three adjacent scale tones doubled, with no clear root.",
		song: "\"Schizophrenia\" — Sonic Youth",
		key: {
			root: "G",
			scale: "Major"
		}
	},
	{
		id: "nick-drake",
		name: "Nick Drake",
		group: "artist",
		midi: [
			36,
			43,
			48,
			53,
			60,
			64
		],
		spellings: [
			"C",
			"G",
			"C",
			"F",
			"C",
			"E"
		],
		description: "One of Nick Drake's signature open-C-based tunings (capo 2 on the record) — a wide, resonant shimmer.",
		song: "\"Pink Moon\" — Nick Drake"
	},
	{
		id: "keith-richards",
		name: "Keith Richards",
		group: "artist",
		midi: [
			43,
			43,
			50,
			55,
			59,
			62
		],
		spellings: [
			"G",
			"G",
			"D",
			"G",
			"B",
			"D"
		],
		description: "Keith's trademark — open G with the low string removed, played on a 5-string.",
		song: "\"Start Me Up\" — The Rolling Stones"
	},
	{
		id: "am-football",
		name: "Am. Football",
		group: "artist",
		midi: [
			41,
			45,
			48,
			55,
			60,
			64
		],
		spellings: [
			"F",
			"A",
			"C",
			"G",
			"C",
			"E"
		],
		description: "American Football's open-F(maj9) emo/math-rock tuning — the whole opening line falls under one finger.",
		song: "\"Never Meant\" — American Football"
	},
	{
		id: "soundg-wave",
		name: "SoundG Wave",
		group: "artist",
		midi: [
			40,
			40,
			47,
			59,
			59,
			59
		],
		spellings: [
			"E",
			"E",
			"B",
			"B",
			"B",
			"B"
		],
		description: "Chris Cornell & Kim Thayil's drone tuning — often written EEBBBB, but Thayil says it's really EEBBBE.",
		song: "\"My Wave\" — Soundgarden"
	},
	{
		id: "soundg-sun",
		name: "SoundG Sun",
		group: "artist",
		midi: [
			38,
			45,
			50,
			55,
			59,
			64
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"B",
			"E"
		],
		description: "Drop D — the low string falls a whole step; the swaying Leslie-swirl chords ride over it.",
		song: "\"Black Hole Sun\" — Soundgarden",
		key: {
			root: "G",
			scale: "Mixolydian"
		}
	},
	{
		id: "young-cinnamon",
		name: "Young Cinnamon",
		group: "artist",
		midi: [
			38,
			45,
			50,
			55,
			59,
			62
		],
		spellings: [
			"D",
			"A",
			"D",
			"G",
			"B",
			"D"
		],
		description: "Neil Young's crunch tuning — double drop D: BOTH E strings fall a whole step, the high D droning over the riff and carrying the one-note solo.",
		song: "\"Cinnamon Girl\" — Neil Young",
		key: {
			root: "D",
			scale: "Major"
		}
	},
	{
		id: "joni-cab",
		name: "Joni Cab",
		group: "artist",
		midi: [
			40,
			47,
			52,
			56,
			59,
			64
		],
		spellings: [
			"E",
			"B",
			"E",
			"G♯",
			"B",
			"E"
		],
		description: "Joni built her sound on personal open tunings, described by bass note plus fret offsets (her catalog uses 50+).",
		song: "\"Big Yellow Taxi\" — Joni Mitchell"
	},
	{
		id: "joni-sides",
		name: "Joni Sides",
		group: "artist",
		midi: [
			38,
			45,
			50,
			54,
			57,
			62
		],
		spellings: [
			"D",
			"A",
			"D",
			"F♯",
			"A",
			"D"
		],
		description: "Joni's open-D base — a D major chord rings on the open strings. On the record she capos 4 (sounding F# major); this is the no-capo tuning.",
		song: "\"Both Sides, Now\" — Joni Mitchell"
	},
	{
		id: "radio-pyramid",
		name: "Radio Pyramid",
		group: "artist",
		midi: [
			42,
			46,
			49,
			54,
			58,
			66
		],
		spellings: [
			"F♯",
			"A♯",
			"C♯",
			"F♯",
			"A♯",
			"F♯"
		],
		description: "Open F# major — let the top F# ring as a pedal while barre shapes slide beneath for the song's swaying, ambiguous chords.",
		song: "\"Pyramid Song\" — Radiohead"
	},
	{
		id: "radio-everything",
		name: "Radio Everything",
		group: "artist",
		midi: [
			36,
			43,
			48,
			55,
			56,
			60
		],
		spellings: [
			"C",
			"G",
			"C",
			"G",
			"A♭",
			"C"
		],
		description: "An \"Everything In Its Right Place\" voicing built around a C pedal on the top string (the same pedal-note trick as Pyramid Song's F#). Open strings ring C G C G G# C; hold the G → C bender to push the neutral G string up a fourth while the top C keeps ringing.",
		song: "\"Everything In Its Right Place\" — Radiohead",
		key: {
			root: "C",
			scale: "Phrygian"
		},
		preferFlats: !0
	},
	{
		id: "white-keys",
		name: "White Keys",
		group: "mode",
		midi: [
			48,
			50,
			52,
			53,
			55,
			57
		],
		spellings: [
			"C",
			"D",
			"E",
			"F",
			"G",
			"A"
		],
		description: "The natural notes C D E F G A on six strings — the white-key set every mode is drawn from, with C on the low string as home. Identical to C Ionian.",
		key: {
			root: "C",
			scale: "Major"
		}
	},
	{
		id: "c-lydian",
		name: "C Lydian",
		group: "mode",
		midi: [
			48,
			50,
			52,
			54,
			55,
			57
		],
		spellings: [
			"C",
			"D",
			"E",
			"F♯",
			"G",
			"A"
		],
		description: "The brightest mode — major with a raised 4th. Floating, film-score shimmer.",
		song: "\"Flying Theme\" — John Williams (E.T.)",
		key: {
			root: "C",
			scale: "Lydian"
		}
	},
	{
		id: "c-ionian",
		name: "C Ionian",
		group: "mode",
		midi: [
			48,
			50,
			52,
			53,
			55,
			57
		],
		spellings: [
			"C",
			"D",
			"E",
			"F",
			"G",
			"A"
		],
		description: "The plain major scale — the mode that feels like home.",
		song: "\"Let It Be\" — The Beatles",
		key: {
			root: "C",
			scale: "Major"
		}
	},
	{
		id: "c-mixolydian",
		name: "C Mixolydian",
		group: "mode",
		midi: [
			48,
			50,
			52,
			53,
			55,
			57
		],
		spellings: [
			"C",
			"D",
			"E",
			"F",
			"G",
			"A"
		],
		description: "Major with a flat 7th — the dominant, bluesy-rock colour. (The ♭7 has no open string in this set, so it shares the Ionian shape.)",
		song: "\"Sweet Home Alabama\" — Lynyrd Skynyrd",
		key: {
			root: "C",
			scale: "Mixolydian"
		},
		preferFlats: !0
	},
	{
		id: "c-dorian",
		name: "C Dorian",
		group: "mode",
		midi: [
			48,
			50,
			51,
			53,
			55,
			57
		],
		spellings: [
			"C",
			"D",
			"E♭",
			"F",
			"G",
			"A"
		],
		description: "Minor with a bright natural 6th — the hopeful, funky minor of jazz and modal rock.",
		song: "\"So What\" — Miles Davis",
		key: {
			root: "C",
			scale: "Dorian"
		},
		preferFlats: !0
	},
	{
		id: "c-aeolian",
		name: "C Aeolian",
		group: "mode",
		midi: [
			48,
			50,
			51,
			53,
			55,
			56
		],
		spellings: [
			"C",
			"D",
			"E♭",
			"F",
			"G",
			"A♭"
		],
		description: "The natural minor scale — ♭3 ♭6 ♭7. The default \"sad\" minor.",
		song: "\"Losing My Religion\" — R.E.M.",
		key: {
			root: "C",
			scale: "Minor"
		},
		preferFlats: !0
	},
	{
		id: "c-phrygian",
		name: "C Phrygian",
		group: "mode",
		midi: [
			48,
			49,
			51,
			53,
			55,
			56
		],
		spellings: [
			"C",
			"D♭",
			"E♭",
			"F",
			"G",
			"A♭"
		],
		description: "Minor with a flat 2nd — dark, Spanish/flamenco and metal tension.",
		song: "\"Wherever I May Roam\" — Metallica",
		key: {
			root: "C",
			scale: "Phrygian"
		},
		preferFlats: !0
	},
	{
		id: "c-locrian",
		name: "C Locrian",
		group: "mode",
		midi: [
			48,
			49,
			51,
			53,
			54,
			56
		],
		spellings: [
			"C",
			"D♭",
			"E♭",
			"F",
			"G♭",
			"A♭"
		],
		description: "The darkest mode — a flat 2nd AND flat 5th give an unstable, diminished tonic.",
		song: "\"YYZ\" — Rush (main riff)",
		key: {
			root: "C",
			scale: "Locrian"
		},
		preferFlats: !0
	},
	{
		id: "mandolin",
		name: "Mandolin",
		group: "world",
		midi: [
			55,
			62,
			69,
			76
		],
		spellings: [
			"G",
			"D",
			"A",
			"E"
		],
		description: "Standard mandolin, tuned in fifths like a violin.",
		song: "\"Losing My Religion\" — R.E.M. (Peter Buck)",
		key: {
			root: "G",
			scale: "Major"
		}
	},
	{
		id: "irish-bouzouki",
		name: "Irish Bouzouki",
		group: "world",
		midi: [
			43,
			50,
			57,
			62
		],
		spellings: [
			"G",
			"D",
			"A",
			"D"
		],
		description: "The Greek bouzouki adapted for Celtic music — flat-backed, tuned a fifth lower — as a rhythm and countermelody engine.",
		song: "Irish trad — Planxty (Andy Irvine & Dónal Lunny)",
		key: {
			root: "D",
			scale: "Major"
		}
	},
	{
		id: "greek-bouzouki",
		name: "Greek Bouzouki",
		group: "world",
		midi: [
			48,
			53,
			57,
			62
		],
		spellings: [
			"C",
			"F",
			"A",
			"D"
		],
		description: "The bright, tremolo-driven lead of Greek rebetiko and laïkó.",
		song: "\"Zorba's Dance (Sirtaki)\" — Mikis Theodorakis",
		key: {
			root: "D",
			scale: "Minor"
		},
		preferFlats: !0
	},
	{
		id: "oud",
		name: "Oud",
		group: "world",
		midi: [
			36,
			41,
			45,
			50,
			55,
			60
		],
		spellings: [
			"C",
			"F",
			"A",
			"D",
			"G",
			"C"
		],
		description: "The fretless lute at the heart of Arabic and Turkish maqam music (tuning varies by region and maqam).",
		song: "Arabic maqam tradition — e.g. Munir Bashir",
		key: {
			root: "C",
			scale: "Major"
		}
	},
	{
		id: "charango",
		name: "Charango",
		group: "world",
		midi: [
			67,
			72,
			76,
			69,
			76
		],
		spellings: [
			"G",
			"C",
			"E",
			"A",
			"E"
		],
		description: "A small Andean lute (traditionally armadillo-shell) with all strings inside one octave — the sparkle of Andean folk.",
		song: "\"El Cóndor Pasa\" — Los Incas",
		reentrant: !0
	},
	{
		id: "saz-baglama",
		name: "Saz / Bağlama",
		group: "world",
		midi: [
			47,
			52,
			57
		],
		spellings: [
			"B",
			"E",
			"A"
		],
		description: "Turkey's long-necked folk lute with microtonal, quarter-tone frets — the voice of the âşık poet-minstrels (many regional tunings).",
		song: "\"Uzun İnce Bir Yoldayım\" — Aşık Veysel"
	},
	{
		id: "sitar",
		name: "Sitar",
		group: "world",
		midi: [
			36,
			43,
			48,
			55,
			60,
			65
		],
		spellings: [
			"C",
			"G",
			"C",
			"G",
			"C",
			"F"
		],
		description: "India's long-necked lute with sympathetic strings — here as Sa–Pa drones in C with the Ma melody string on top (Kharaj-Pancham style). The pedals are meend: wide gliding pulls up to a full fifth.",
		song: "\"Norwegian Wood\" — The Beatles"
	},
	{
		id: "cavaquinho",
		name: "Cavaquinho",
		group: "world",
		midi: [
			62,
			67,
			71,
			74
		],
		spellings: [
			"D",
			"G",
			"B",
			"D"
		],
		description: "A small Brazilian 4-string (open G) — the rhythmic-harmonic engine of samba and choro.",
		song: "\"Brasileirinho\" — Waldir Azevedo"
	},
	{
		id: "ukulele",
		name: "Ukulele",
		group: "world",
		midi: [
			67,
			60,
			64,
			69
		],
		spellings: [
			"G",
			"C",
			"E",
			"A"
		],
		description: "The classic re-entrant soprano/concert uke tuning, with a high g.",
		song: "\"Over the Rainbow\" — Israel Kamakawiwoʻole",
		reentrant: !0
	},
	{
		id: "baritone-uke",
		name: "Baritone Uke",
		group: "world",
		midi: [
			50,
			55,
			59,
			64
		],
		spellings: [
			"D",
			"G",
			"B",
			"E"
		],
		description: "Tuned like a guitar's top four strings, an octave below a soprano uke — warm and mellow. Favoured in jazz and folk (e.g. Lyle Ritz)."
	},
	{
		id: "cuatro",
		name: "Cuatro",
		group: "world",
		midi: [
			57,
			62,
			66,
			59
		],
		spellings: [
			"A",
			"D",
			"F♯",
			"B"
		],
		description: "Venezuela's 4-string (re-entrant) — the rhythmic-harmonic base of joropo and música llanera.",
		song: "\"Alma Llanera\" (Venezuela's unofficial anthem)",
		key: {
			root: "D",
			scale: "Major"
		},
		reentrant: !0
	},
	{
		id: "balalaika",
		name: "Balalaika",
		group: "world",
		midi: [
			64,
			64,
			69
		],
		spellings: [
			"E",
			"E",
			"A"
		],
		description: "Russia's triangular folk lute, played with the fingers.",
		song: "\"Kalinka\" (traditional)",
		key: {
			root: "A",
			scale: "Major"
		}
	},
	{
		id: "banjo",
		name: "Banjo",
		group: "world",
		midi: [
			67,
			50,
			55,
			59,
			62
		],
		spellings: [
			"G",
			"D",
			"G",
			"B",
			"D"
		],
		description: "A re-entrant 5-string with a high drone — the bluegrass sound.",
		song: "\"Foggy Mountain Breakdown\" — Earl Scruggs",
		reentrant: !0
	},
	{
		id: "ps-e9-nashville",
		name: "E9 Nashville",
		group: "pedal-steel",
		midi: [
			47,
			50,
			52,
			54,
			56,
			59,
			64,
			68,
			63,
			66
		],
		spellings: [
			"B",
			"D",
			"E",
			"F♯",
			"G♯",
			"B",
			"E",
			"G♯",
			"D♯",
			"F♯"
		],
		description: "THE country pedal-steel tuning — the crying, gliding sound you picture when you think \"pedal steel\" (Bud Isaacs, Buddy Emmons).",
		song: "\"Slowly\" — Webb Pierce (Bud Isaacs, 1954)",
		key: {
			root: "E",
			scale: "Major"
		},
		copedent: "e9",
		reentrant: !0
	},
	{
		id: "ps-e9-lanois",
		name: "E9 Lanois",
		group: "pedal-steel",
		midi: [
			47,
			47,
			52,
			52,
			56,
			59,
			64,
			68,
			63,
			66
		],
		spellings: [
			"B",
			"B",
			"E",
			"E",
			"G♯",
			"B",
			"E",
			"G♯",
			"D♯",
			"F♯"
		],
		description: "ambient variant · doubled low strings for 12-string shimmer",
		key: {
			root: "E",
			scale: "Major"
		},
		copedent: "e9",
		reentrant: !0
	},
	{
		id: "ps-c6-swing-jazz",
		name: "C6 Swing/Jazz",
		group: "pedal-steel",
		midi: [
			36,
			41,
			45,
			48,
			52,
			55,
			57,
			60,
			64,
			62
		],
		spellings: [
			"C",
			"F",
			"A",
			"C",
			"E",
			"G",
			"A",
			"C",
			"E",
			"D"
		],
		description: "The \"back neck\" of a double-neck pedal steel — used for western swing and jazz's fuller chord voicings (Buddy Emmons, Cindy Cashdollar).",
		song: "western swing — Bob Wills; jazz steel — Buddy Emmons",
		key: {
			root: "C",
			scale: "Major"
		},
		copedent: "c6",
		reentrant: !0
	},
	{
		id: "ps-b6-universal",
		name: "B6 Universal",
		group: "pedal-steel",
		midi: [
			47,
			50,
			51,
			54,
			56,
			59,
			63,
			68,
			63,
			66
		],
		spellings: [
			"B",
			"D",
			"D♯",
			"F♯",
			"G♯",
			"B",
			"D♯",
			"G♯",
			"D♯",
			"F♯"
		],
		description: "Jeff Newman's universal tuning that fuses the E9 (country) and C6 (jazz/swing) necks so one neck covers both — here the 10-string cut of his 12-string original.",
		key: {
			root: "B",
			scale: "Major"
		},
		copedent: "e9",
		reentrant: !0
	}
], gi = [
	"lap-steel",
	"open",
	"pedal-steel",
	"common",
	"drop",
	"artist",
	"mode",
	"world"
], _i = {
	"lap-steel": "Lap steel",
	open: "Open majors",
	"pedal-steel": "Pedal steel",
	common: "Guitar — common",
	drop: "Guitar — drop",
	artist: "Artist tunings",
	mode: "Modal (white keys)",
	world: "World instruments"
}, vi = "custom", yi = new Map(hi.map((e) => [e.id, e]));
function bi(e) {
	return yi.get(e);
}
//#endregion
//#region src/components/TuningPicker.tsx
var xi = R.div`
  flex: 1;
  min-width: 220px;
  max-width: 420px;
  position: relative;
`, Si = R.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: 1px solid ${({ $open: e, theme: t }) => e ? t.colors.primary : t.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  background: ${({ theme: e }) => e.colors.inputBackground};
  color: ${({ theme: e }) => e.colors.text};
  font-family: inherit;
  font-size: ${({ theme: e }) => e.fontSizes.sm};
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: ${({ theme: e }) => e.colors.primary};
  }
`, Ci = R.span`
  font-weight: 700;
  flex-shrink: 0;
`, wi = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 11px;
  color: ${({ theme: e }) => e.colors.textSecondary};
  letter-spacing: 0.08em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`, Ti = R.span`
  margin-left: auto;
  font-size: 9px;
  color: ${({ theme: e }) => e.colors.textSecondary};
  transform: ${({ $open: e }) => e ? "rotate(180deg)" : "none"};
`, Ei = R.div`
  /* Portaled to document.body — outside any scoped wrapper, so it carries its
     own ground rules (a host page may not use border-box). */
  &,
  & * {
    box-sizing: border-box;
  }
  position: fixed;
  z-index: 9999;
  background: ${({ theme: e }) => e.colors.card};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  box-shadow: ${({ theme: e }) => e.shadows.large};
  max-height: 62vh;
  display: flex;
  flex-direction: column;
`, Di = R.input`
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-bottom: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => `${e.borderRadius.small} ${e.borderRadius.small} 0 0`};
  background: ${({ theme: e }) => e.colors.inputBackground};
  color: ${({ theme: e }) => e.colors.text};
  font-family: inherit;
  font-size: ${({ theme: e }) => e.fontSizes.sm};

  &:focus {
    outline: none;
    border-bottom-color: ${({ theme: e }) => e.colors.primary};
  }
`, Oi = R.div`
  overflow-y: auto;
`, ki = R.div`
  padding: 7px 12px 3px;
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme: e }) => e.colors.primary};
  letter-spacing: 1.2px;
  text-transform: uppercase;
  border-top: 1px solid ${({ theme: e }) => e.colors.border};
  background: ${({ theme: e }) => e.colors.card};
  position: sticky;
  top: 0;
`, Ai = R.button`
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  padding: 7px 12px;
  border: none;
  border-bottom: 1px solid ${({ theme: e }) => `${e.colors.border}44`};
  background: ${({ $selected: e, theme: t }) => e ? `${t.colors.primary}22` : "transparent"};
  color: ${({ theme: e }) => e.colors.text};
  cursor: pointer;
  text-align: left;
  font-family: inherit;

  &:hover {
    background: ${({ theme: e }) => `${e.colors.primary}11`};
  }
`, ji = R.span`
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  min-width: 92px;
`, Mi = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 11px;
  color: ${({ theme: e }) => e.colors.textSecondary};
  letter-spacing: 0.06em;
`, B = R.span`
  font-size: 10px;
  color: ${({ theme: e }) => e.colors.textSecondary};
  margin-left: auto;
  flex-shrink: 0;
`, V = R.div`
  padding: 18px 12px;
  text-align: center;
  font-size: ${({ theme: e }) => e.fontSizes.sm};
  color: ${({ theme: e }) => e.colors.textSecondary};
`, Ni = (e) => `${e.name} ${e.spellings.join(" ")} ${e.song ?? ""} ${e.description ?? ""}`.toLowerCase().replace(/♯/g, "#").replace(/♭/g, "b"), Pi = new Map(hi.map((e) => [e.id, Ni(e)])), Fi = ({ tuningId: e, current: t, onSelect: n, menuRef: r }) => {
	let [i, a] = (0, L.useState)(!1), [o, s] = (0, L.useState)(""), [c, l] = (0, L.useState)({
		top: 0,
		left: 0,
		width: 0
	}), u = (0, L.useRef)(null), d = (0, L.useRef)(null), f = (0, L.useRef)(null), p = () => {
		let e = u.current?.getBoundingClientRect();
		if (e) {
			let t = Math.max(e.width, 320), n = Math.min(e.left, window.innerWidth - t - 8);
			l({
				top: e.bottom + 4,
				left: Math.max(8, n),
				width: t
			});
		}
		s(""), a((e) => !e);
	};
	(0, L.useEffect)(() => {
		if (r) return r.current = {
			open: i,
			close: () => a(!1)
		}, () => {
			r.current = null;
		};
	}, [i, r]), (0, L.useEffect)(() => {
		if (!i) return;
		f.current?.focus();
		let e = (e) => {
			let t = e.target;
			d.current?.contains(t) || u.current?.contains(t) || a(!1);
		}, t = (e) => {
			e.key === "Escape" && (a(!1), u.current?.focus());
		};
		return window.addEventListener("mousedown", e), window.addEventListener("keydown", t), () => {
			window.removeEventListener("mousedown", e), window.removeEventListener("keydown", t);
		};
	}, [i]);
	let m = (0, L.useMemo)(() => {
		let e = o.trim().toLowerCase().replace(/♯/g, "#").replace(/♭/g, "b").split(/\s+/).filter(Boolean), t = (t) => {
			if (!e.length) return !0;
			let n = Pi.get(t.id) ?? "";
			return e.every((e) => n.includes(e));
		}, n = [];
		for (let e of gi) {
			let r = hi.filter((n) => n.group === e && t(n));
			r.length && n.push([e, r]);
		}
		return n;
	}, [o]), h = m.reduce((e, [, t]) => e + t.length, 0);
	return /* @__PURE__ */ (0, z.jsxs)(xi, { children: [/* @__PURE__ */ (0, z.jsxs)(Si, {
		ref: u,
		$open: i,
		onClick: p,
		"aria-haspopup": "listbox",
		"aria-expanded": i,
		"aria-label": "Tuning",
		children: [
			/* @__PURE__ */ (0, z.jsx)(Ci, { children: t.name }),
			/* @__PURE__ */ (0, z.jsx)(wi, { children: t.spellings.join(" ") }),
			/* @__PURE__ */ (0, z.jsx)(Ti, {
				$open: i,
				children: "▼"
			})
		]
	}), i && (0, mi.createPortal)(/* @__PURE__ */ (0, z.jsxs)(Ei, {
		ref: d,
		role: "listbox",
		"aria-label": "Tuning",
		style: {
			top: c.top,
			left: c.left,
			width: c.width
		},
		children: [/* @__PURE__ */ (0, z.jsx)(Di, {
			ref: f,
			value: o,
			onChange: (e) => s(e.target.value),
			placeholder: `Search ${hi.length} tunings — name, notes, or song…`,
			"aria-label": "Search tunings"
		}), /* @__PURE__ */ (0, z.jsxs)(Oi, { children: [
			h === 0 && /* @__PURE__ */ (0, z.jsxs)(V, { children: [
				"Nothing matches “",
				o,
				"”."
			] }),
			m.map(([t, r]) => /* @__PURE__ */ (0, z.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, z.jsxs)(ki, { children: [_i[t], /* @__PURE__ */ (0, z.jsx)(B, { children: r.length })] }), r.map((t) => /* @__PURE__ */ (0, z.jsxs)(Ai, {
				role: "option",
				"aria-selected": e === t.id,
				$selected: e === t.id,
				onClick: () => {
					n(t.id), a(!1);
				},
				title: [t.description, t.song].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ (0, z.jsx)(ji, { children: t.name }),
					/* @__PURE__ */ (0, z.jsx)(Mi, { children: t.spellings.join(" ") }),
					/* @__PURE__ */ (0, z.jsxs)(B, { children: [
						t.midi.length,
						" str",
						t.reentrant ? " · re-entrant" : ""
					] })
				]
			}, t.id))] }, t)),
			/* @__PURE__ */ (0, z.jsx)(ki, { children: "Your own" }),
			/* @__PURE__ */ (0, z.jsxs)(Ai, {
				role: "option",
				"aria-selected": e === "custom",
				$selected: e === "custom",
				onClick: () => {
					n("custom"), a(!1);
				},
				children: [/* @__PURE__ */ (0, z.jsx)(ji, { children: "Custom…" }), /* @__PURE__ */ (0, z.jsx)(Mi, { children: "tune each string yourself" })]
			})
		] })]
	}), document.body)] });
}, Ii = R.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.sm};
  padding: ${({ theme: e }) => e.spacing.md};
  background: ${({ theme: e }) => e.colors.card};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.medium};
`, Li = R.div`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
  flex-wrap: wrap;
`, Ri = R.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme: e }) => e.colors.textSecondary};
`, zi = R.span`
  font-size: ${({ theme: e }) => e.fontSizes.xs};
  color: ${({ theme: e }) => e.colors.textSecondary};
  line-height: 1.45;
`, Bi = R.div`
  display: flex;
  align-items: center;
  background: ${({ theme: e }) => e.colors.background};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.medium};
  padding: 2px;
`, Vi = R.button`
  padding: 4px 10px;
  border: none;
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  cursor: pointer;
  font-size: ${({ theme: e }) => e.fontSizes.xs};
  font-weight: 600;
  font-family: inherit;
  background: ${({ $active: e, theme: t }) => e ? `${t.colors.primary}22` : "transparent"};
  color: ${({ $active: e, theme: t }) => e ? t.colors.primary : t.colors.textSecondary};
  transition: all ${({ theme: e }) => e.transitions.fast};

  &:hover {
    background: ${({ $active: e, theme: t }) => e ? `${t.colors.primary}33` : t.colors.border};
  }
`, Hi = R.button`
  display: flex;
  align-items: baseline;
  gap: 5px;
  padding: 4px 9px;
  border: 1px solid ${({ $active: e, theme: t }) => e ? t.colors.primary : t.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  cursor: ${({ $disabled: e }) => e ? "default" : "pointer"};
  opacity: ${({ $disabled: e }) => e ? .4 : 1};
  background: ${({ $active: e, theme: t }) => e ? `${t.colors.primary}22` : "transparent"};
  color: ${({ $active: e, theme: t }) => e ? t.colors.primary : t.colors.text};
  font-family: inherit;
  font-size: ${({ theme: e }) => e.fontSizes.xs};
  font-weight: 700;
  transition: all ${({ theme: e }) => e.transitions.fast};

  &:hover {
    border-color: ${({ $disabled: e, theme: t }) => e ? t.colors.border : t.colors.primary};
  }
`;
R.select`
  padding: 5px 8px;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  background: ${({ theme: e }) => e.colors.inputBackground};
  color: ${({ theme: e }) => e.colors.text};
  font-family: inherit;
  font-size: ${({ theme: e }) => e.fontSizes.sm};
  cursor: pointer;
`;
var Ui = R.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: transparent;
  color: ${({ theme: e }) => e.colors.textSecondary};
  font-size: 11px;
  font-family: inherit;
  line-height: 1;

  &:hover {
    background: ${({ theme: e }) => `${e.colors.primary}22`};
    color: ${({ theme: e }) => e.colors.primary};
  }
`, Wi = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 11px;
  letter-spacing: 0.06em;
  color: ${({ theme: e }) => e.colors.textSecondary};
`, Gi = {
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "14px",
		lg: "22px"
	},
	borderRadius: {
		small: "6px",
		medium: "10px",
		large: "16px"
	},
	fontSizes: {
		xs: "11px",
		sm: "13px",
		md: "15px",
		lg: "19px"
	},
	fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
	monoFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
	titleFamily: "'Instrument Serif', Georgia, serif",
	transitions: { fast: "0.15s ease" }
}, Ki = {
	...Gi,
	name: "dark",
	colors: {
		background: "#12100c",
		card: "#16130f",
		inputBackground: "#221c14",
		border: "#3a3124",
		text: "#f0e9dc",
		textSecondary: "#8b7d68",
		primary: "#e0a55c",
		secondary: "#c8873c",
		accent: "#c8873c",
		warning: "#e5c04a",
		error: "#e2585d",
		buttonText: "#16130f"
	},
	shadows: {
		small: "0 1px 3px rgba(0,0,0,0.45)",
		large: "0 26px 50px rgba(0,0,0,0.65)"
	}
}, qi = {
	...Gi,
	name: "light",
	colors: {
		background: "#e6dfcf",
		card: "#efe9dc",
		inputBackground: "#f7f3e8",
		border: "#c9bfa6",
		text: "#17150f",
		textSecondary: "#6e6754",
		primary: "#a8442a",
		secondary: "#a8442a",
		accent: "#a8442a",
		warning: "#8a6d10",
		error: "#a8442a",
		buttonText: "#efe9dc"
	},
	shadows: {
		small: "0 1px 3px rgba(23,21,15,0.15)",
		large: "8px 8px 0 rgba(23,21,15,0.16)"
	}
};
function Ji() {
	return bi("c6");
}
function Yi(e, t = !1) {
	let n = e.map((e) => Math.min(96, Math.max(28, Math.round(e))));
	return {
		id: vi,
		name: "Custom",
		group: "lap-steel",
		midi: n,
		spellings: n.map((e) => Zn(Yn(e), t)),
		description: "Your own stack — tune each string and see what the bar gives you.",
		preferFlats: t || void 0
	};
}
function Xi(e, t) {
	return e === "custom" ? Yi(t ?? [...Ji().midi]) : bi(e) ?? Ji();
}
function Zi(e, t) {
	let n = e.midi.map(() => !1);
	if (!t || t.every((e) => !e)) return {
		tuning: e,
		pulled: n
	};
	let r = e.midi.map((e, n) => e + (t[n] || 0)), i = r.map((n, r) => t[r] ? Zn(Yn(n), !!e.preferFlats) : e.spellings[r]);
	return {
		tuning: {
			...e,
			midi: r,
			spellings: i
		},
		pulled: e.midi.map((e, n) => !!t[n])
	};
}
function Qi(e, t) {
	let n = Array(t).fill(0);
	if (!e) return n;
	for (let r = 0; r < t; r++) n[r] = Math.min(12, Math.max(-12, Math.round(e[r] || 0)));
	return n;
}
//#endregion
//#region src/lib/musicTheory.ts
var $i = [
	"C",
	"C♯",
	"D",
	"D♯",
	"E",
	"F",
	"F♯",
	"G",
	"G♯",
	"A",
	"A♯",
	"B"
], ea = [
	"C",
	"D♭",
	"D",
	"E♭",
	"E",
	"F",
	"G♭",
	"G",
	"A♭",
	"A",
	"B♭",
	"B"
], ta = [
	"C",
	"D",
	"E",
	"F",
	"G",
	"A",
	"B"
], na = {
	"C Major": {
		accidentals: 0,
		type: "none"
	},
	"G Major": {
		accidentals: 1,
		type: "sharps"
	},
	"D Major": {
		accidentals: 2,
		type: "sharps"
	},
	"A Major": {
		accidentals: 3,
		type: "sharps"
	},
	"E Major": {
		accidentals: 4,
		type: "sharps"
	},
	"B Major": {
		accidentals: 5,
		type: "sharps"
	},
	"F♯ Major": {
		accidentals: 6,
		type: "sharps"
	},
	"C♯ Major": {
		accidentals: 7,
		type: "sharps"
	},
	"F Major": {
		accidentals: 1,
		type: "flats"
	},
	"B♭ Major": {
		accidentals: 2,
		type: "flats"
	},
	"E♭ Major": {
		accidentals: 3,
		type: "flats"
	},
	"A♭ Major": {
		accidentals: 4,
		type: "flats"
	},
	"D♭ Major": {
		accidentals: 5,
		type: "flats"
	},
	"G♭ Major": {
		accidentals: 6,
		type: "flats"
	},
	"C♭ Major": {
		accidentals: 7,
		type: "flats"
	},
	"A Minor": {
		accidentals: 0,
		type: "none"
	},
	"E Minor": {
		accidentals: 1,
		type: "sharps"
	},
	"B Minor": {
		accidentals: 2,
		type: "sharps"
	},
	"F♯ Minor": {
		accidentals: 3,
		type: "sharps"
	},
	"C♯ Minor": {
		accidentals: 4,
		type: "sharps"
	},
	"G♯ Minor": {
		accidentals: 5,
		type: "sharps"
	},
	"D♯ Minor": {
		accidentals: 6,
		type: "sharps"
	},
	"A♯ Minor": {
		accidentals: 7,
		type: "sharps"
	},
	"D Minor": {
		accidentals: 1,
		type: "flats"
	},
	"G Minor": {
		accidentals: 2,
		type: "flats"
	},
	"C Minor": {
		accidentals: 3,
		type: "flats"
	},
	"F Minor": {
		accidentals: 4,
		type: "flats"
	},
	"B♭ Minor": {
		accidentals: 5,
		type: "flats"
	},
	"E♭ Minor": {
		accidentals: 6,
		type: "flats"
	},
	"A♭ Minor": {
		accidentals: 7,
		type: "flats"
	}
}, ra = [
	"F♯",
	"C♯",
	"G♯",
	"D♯",
	"A♯",
	"E♯",
	"B♯"
], ia = [
	"B♭",
	"E♭",
	"A♭",
	"D♭",
	"G♭",
	"C♭",
	"F♭"
], aa = {
	Major: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Minor: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Dorian: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Phrygian: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Lydian: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Mixolydian: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	Locrian: [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Harmonic Minor": [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Melodic Minor": [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Hungarian Minor": [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Double Harmonic": [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Phrygian Dominant": [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	],
	"Pentatonic Major": [
		0,
		1,
		2,
		4,
		5
	],
	"Pentatonic Minor": [
		0,
		2,
		3,
		4,
		6
	],
	Blues: [
		0,
		2,
		3,
		4,
		4,
		6
	]
}, oa = {
	C: 0,
	D: 2,
	E: 4,
	F: 5,
	G: 7,
	A: 9,
	B: 11
};
function sa(e) {
	if (!e || typeof e != "string") return null;
	let t = e[0].toUpperCase();
	if (!(t in oa)) return null;
	let n = 0, r = [...e.slice(1)];
	for (let e of r) if (e === "♯" || e === "#") n += 1;
	else if (e === "♭" || e === "b") --n;
	else if (e === "𝄪") n += 2;
	else return null;
	return n < -2 || n > 2 ? null : {
		letter: t,
		offset: n
	};
}
function ca(e) {
	let t = sa(e);
	return t ? ((oa[t.letter] + t.offset) % 12 + 12) % 12 : null;
}
function la(e) {
	let t = ca(e);
	return t === null ? 0 : t;
}
function ua(e, t) {
	let n = (e % 12 + 12) % 12;
	return t ? $i[n] : ea[n];
}
function da(e) {
	let t = ca(e);
	return t === null ? -1 : t;
}
function fa(e) {
	let t = e.replace(/#/g, "♯").replace(/b/g, "♭");
	if (t.includes("𝄪") || t.includes("♯♯") || t.includes("♭♭")) {
		let e = ca(t.replace(/♯♯/g, "𝄪"));
		if (e !== null) return ua(e, t.includes("𝄪") || t.includes("♯♯"));
	}
	return t;
}
function pa(e) {
	return e[0];
}
function ma(e, t, n) {
	let r = `${t} ${n}`, i = na[r];
	if (!i) return $i[e];
	let a = i.type === "sharps" || i.type === "none", o = ha(r), s = (a ? $i : ea)[e];
	if (o.length > 0) {
		for (let t of o) if (da(t) === e) return t;
	}
	if ((r === "F Major" || r === "D Minor") && e === 10) return "B♭";
	if (r === "C♯ Major" || r === "A♯ Minor") {
		if (e === 5) return "E♯";
		if (e === 0) return "B♯";
	}
	if ((r === "F♯ Major" || r === "D♯ Minor") && e === 5) return "E♯";
	if ((r === "G♭ Major" || r === "E♭ Minor") && e === 11) return "C♭";
	if (r === "C♭ Major" || r === "A♭ Minor") {
		if (e === 11) return "C♭";
		if (e === 4) return "F♭";
	}
	return s;
}
function ha(e) {
	let t = na[e];
	if (!t) return [];
	let n = [];
	if (t.type === "sharps") for (let e = 0; e < t.accidentals; e++) n.push(ra[e]);
	else if (t.type === "flats") for (let e = 0; e < t.accidentals; e++) n.push(ia[e]);
	return n;
}
function ga(e, t, n) {
	let r = da(e);
	if (r === -1) return [];
	let i = [e], a = ta.indexOf(pa(e)), o = r;
	for (let r = 0; r < t.length; r++) {
		o = (o + t[r]) % 12;
		let s = aa[n], c;
		if (s) {
			let e = s[r + 1];
			c = e === void 0 ? (a + r + 1) % 7 : (a + e) % 7;
		} else c = (a + r + 1) % 7;
		let l = ta[c], u = [
			l,
			l + "♯",
			l + "♭",
			l + "𝄪",
			l + "♭♭",
			l + "♯♯"
		], d = "";
		for (let e of u) if (da(e) === o) {
			d = e;
			break;
		}
		if (d && s && s.length < 7) {
			let e = {
				"F♭": "E",
				"C♭": "B",
				"B♯": "C",
				"E♯": "F"
			};
			e[d] && (d = e[d]);
		}
		d ? i.push(d) : i.push(ma(o, e, n));
	}
	return i;
}
function _a(e) {
	return {
		"A♯": "B♭",
		"D♯": "E♭",
		"G♯": "A♭",
		"C♯": "D♭",
		"F♯": "G♭"
	}[e] || e;
}
var va = {
	Major: [
		2,
		2,
		1,
		2,
		2,
		2,
		1
	],
	Minor: [
		2,
		1,
		2,
		2,
		1,
		2,
		2
	],
	Dorian: [
		2,
		1,
		2,
		2,
		2,
		1,
		2
	],
	Phrygian: [
		1,
		2,
		2,
		2,
		1,
		2,
		2
	],
	Lydian: [
		2,
		2,
		2,
		1,
		2,
		2,
		1
	],
	Mixolydian: [
		2,
		2,
		1,
		2,
		2,
		1,
		2
	],
	Locrian: [
		1,
		2,
		2,
		1,
		2,
		2,
		2
	],
	"Harmonic Minor": [
		2,
		1,
		2,
		2,
		1,
		3,
		1
	],
	"Melodic Minor": [
		2,
		1,
		2,
		2,
		2,
		2,
		1
	],
	"Hungarian Minor": [
		2,
		1,
		3,
		1,
		1,
		3,
		1
	],
	"Double Harmonic": [
		1,
		3,
		1,
		2,
		1,
		3,
		1
	],
	"Phrygian Dominant": [
		1,
		3,
		1,
		2,
		1,
		2,
		2
	],
	"Pentatonic Major": [
		2,
		2,
		3,
		2,
		3
	],
	"Pentatonic Minor": [
		3,
		2,
		2,
		3,
		2
	],
	Blues: [
		3,
		2,
		1,
		1,
		3,
		2
	]
}, ya = {
	"C♯": "D♭",
	"D♭": "C♯",
	"D♯": "E♭",
	"E♭": "D♯",
	"F♯": "G♭",
	"G♭": "F♯",
	"G♯": "A♭",
	"A♭": "G♯",
	"A♯": "B♭",
	"B♭": "A♯",
	"B♯": "C",
	"E♯": "F",
	"F♭": "E",
	"C♭": "B"
};
function ba(e) {
	return e.includes("𝄪") || e.includes("♭♭") || e.includes("♯♯");
}
function xa(e) {
	if (e.length === 0 || e.some(ba)) return !0;
	let t = e.map(pa), n = t[t.length - 1] === t[0] ? t.slice(0, -1) : t;
	return new Set(n).size !== n.length;
}
function Sa(e, t) {
	let n = va[t];
	if (!n) return [];
	let r = ga(e, n, t);
	if (!xa(r)) return r;
	let i = fa(e), a = _a(i), o = a === i ? ya[i] : a;
	if (o) {
		let e = ga(o, n, t);
		if (!xa(e)) return e;
	}
	return r.map((e) => ba(e) ? fa(e) : e);
}
var Ca = [
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII"
], wa = [
	"I",
	"♭II",
	"II",
	"♭III",
	"III",
	"IV",
	"♭V",
	"V",
	"♭VI",
	"VI",
	"♭VII",
	"VII"
];
function Ta(e, t) {
	return e === 4 && t === 3 ? "maj" : e === 3 && t === 4 ? "min" : e === 3 && t === 3 ? "dim" : e === 4 && t === 4 ? "aug" : e === 4 && t === 2 ? "majb5" : e === 5 && t === 2 ? "sus4" : e === 2 && t === 5 ? "sus2" : e === 5 && t === 5 ? "7sus4" : null;
}
var Ea = {
	maj: "",
	min: "m",
	dim: "dim",
	aug: "aug",
	majb5: "(♭5)",
	sus4: "sus4",
	sus2: "sus2",
	"7sus4": "7sus4"
};
function Da(e, t) {
	switch (e) {
		case "maj": return t === 11 ? "maj7" : t === 10 ? "7" : t === 9 ? "6" : null;
		case "min": return t === 10 ? "m7" : t === 11 ? "mMaj7" : t === 9 ? "m6" : null;
		case "dim": return t === 9 ? "dim7" : t === 10 ? "m7♭5" : null;
		case "aug": return t === 11 ? "maj7♯5" : t === 10 ? "7♯5" : null;
		case "majb5": return t === 10 ? "7♭5" : t === 11 ? "maj7♭5" : null;
		case "sus4": return t === 10 ? "7sus4" : t === 11 ? "maj7sus4" : null;
		case "sus2": return t === 10 ? "7sus2" : t === 11 ? "maj7sus2" : null;
		default: return null;
	}
}
function Oa(e, t, n, r) {
	let i = r ? Ca[e] || "?" : wa[(t % 12 + 12) % 12] || "?";
	switch (n) {
		case "min": return i.toLowerCase();
		case "dim": return i.toLowerCase() + "°";
		case "aug": return i + "+";
		default: return i;
	}
}
function ka(e, t) {
	let n = e.length, r = e.map(la), i = r[t], a = r[(t + 2) % n], o = r[(t + 4) % n], s = [
		i,
		a,
		o
	], c = n >= 7, l = ((i - r[0]) % 12 + 12) % 12, u = (e = null) => ({
		tonePcs: s,
		quality: e,
		triadName: null,
		roman: Oa(t, l, e, c),
		seventhInterval: null,
		seventhName: null
	});
	if (new Set(s).size !== 3) return u();
	let d = e[t], f = Ta(((a - i) % 12 + 12) % 12, ((o - a) % 12 + 12) % 12), p = null;
	if (f !== null) p = d + Ea[f];
	else {
		let t = (t) => e.find((e) => la(e) === t) ?? ua(t, !0), n = [[
			a,
			o,
			i
		], [
			o,
			i,
			a
		]];
		for (let [e, r, i] of n) {
			let n = Ta(((r - e) % 12 + 12) % 12, ((i - r) % 12 + 12) % 12);
			if (n === "maj" || n === "min") {
				f = "slash", p = `${t(e)}${Ea[n]}/${d}`;
				break;
			}
		}
		if (f !== "slash") return u();
	}
	let m = null, h = null;
	if (c) {
		m = ((r[(t + 6) % 7] - i) % 12 + 12) % 12;
		let e = f === "slash" ? null : Da(f, m);
		h = e === null ? null : d + e;
	}
	return {
		tonePcs: s,
		quality: f,
		triadName: p,
		roman: Oa(t, l, f, c),
		seventhInterval: m,
		seventhName: h
	};
}
function Aa(e) {
	return e.map((t, n) => ka(e, n));
}
Object.keys(va);
//#endregion
//#region src/lib/keyFromTuning.ts
var ja = [
	"Major",
	"Mixolydian",
	"Minor",
	"Dorian",
	"Lydian",
	"Phrygian",
	"Locrian"
];
function Ma(e, t) {
	let n = va[t] ?? va.Major, r = /* @__PURE__ */ new Set([(e % 12 + 12) % 12]), i = e;
	for (let e of n) i = (i + e) % 12, r.add(i);
	return r;
}
function Na(e) {
	let t = new Set(e.intervals);
	switch (e.quality) {
		case "maj": return t.has(6) ? "Lydian" : "Major";
		case "min": return t.has(11) ? "Harmonic Minor" : t.has(9) ? "Dorian" : "Minor";
		case "dom": return t.has(1) ? "Phrygian Dominant" : "Mixolydian";
		default: return e.suffix === "sus4" || e.suffix === "7sus4" ? "Mixolydian" : e.suffix === "sus2" ? "Major" : e.suffix.startsWith("°") || e.suffix === "m7♭5" ? "Locrian" : "Major";
	}
}
function Pa(e, t, n, r) {
	let i = Sa(t, n), a = i.length > 1 && ca(i[0]) === ca(i[i.length - 1]) ? i.slice(0, -1) : i, o = a[0] ?? t;
	return {
		root: o,
		scale: n,
		rootPc: ((ca(o) ?? e) % 12 + 12) % 12,
		notes: a,
		source: r
	};
}
function Fa(e) {
	let t = !!e.preferFlats;
	if (e.key) return Pa(ca(e.key.root) ?? 0, e.key.root, e.key.scale, "catalog");
	let n = e.midi.map(Yn), r = Yn(Math.min(...e.midi)), i = ar(n, r);
	if (i) return Pa(i.rootPc, Zn(i.rootPc, t), Na(i), "chord");
	let a = new Set(n);
	for (let e of ja) {
		let n = Ma(r, e);
		if (Array.from(a).every((e) => n.has(e))) return Pa(r, Zn(r, t), e, "fallback");
	}
	return Pa(r, Zn(r, t), "Major", "fallback");
}
var Ia = {
	maj: 0,
	min: 1,
	dom: 2,
	other: 3
}, La = (e) => `${e.rootPc}:${e.suffix}`;
function Ra(e, t, n) {
	let r = /* @__PURE__ */ new Set(), i = [], a = lr(e, 0).find((e) => e.isFullStack), o = a ? {
		match: a.match,
		fret: 0,
		strings: a.strings,
		home: !0
	} : null;
	t.length >= 7 && Aa(t).forEach((t, n) => {
		if (t.triadName === null || t.quality === null || t.quality === "slash" || new Set(t.tonePcs).size !== 3) return;
		let a = ur(e, t.tonePcs, t.tonePcs[0], 11)[0];
		if (!a) return;
		let o = La(a.match);
		r.has(o) || (r.add(o), i.push({
			match: a.match,
			fret: a.fret,
			strings: a.strings,
			roman: t.roman,
			degree: n
		}));
	}), o && r.has(La(o.match)) && (o = null), o && r.add(La(o.match));
	let s = /* @__PURE__ */ new Map();
	for (let t = 0; t <= 11; t++) for (let n of lr(e, t)) {
		let e = La(n.match);
		r.has(e) || s.has(e) || s.set(e, {
			match: n.match,
			fret: t,
			strings: n.strings
		});
	}
	let c = [...s.values()].sort((e, t) => {
		let r = (e.match.rootPc - n + 12) % 12, i = (t.match.rootPc - n + 12) % 12;
		if (r !== i) return r - i;
		let a = Ia[e.match.quality], o = Ia[t.match.quality];
		return a === o ? e.match.intervals.length === t.match.intervals.length ? e.match.suffix.localeCompare(t.match.suffix) : e.match.intervals.length - t.match.intervals.length : a - o;
	});
	return {
		home: o,
		degrees: i,
		others: c
	};
}
//#endregion
//#region src/lib/steelEngine.ts
var za = new URL("data:text/javascript;base64,LyogZXNsaW50LWRpc2FibGUgKi8KLyoqCiAqIHN0ZWVsLWtzIOKAlCBhIDEwLXZvaWNlIEV4dGVuZGVkIEthcnBsdXMtU3Ryb25nIHN0cmluZyBiYW5rLgogKgogKiBQbGFpbiBkZXBlbmRlbmN5LWZyZWUgSlMgb24gcHVycG9zZTogVml0ZSBzaGlwcyBBdWRpb1dvcmtsZXQgbW9kdWxlcyBhcyByYXcKICogYXNzZXRzIChuZXcgVVJMKCcuL3N0ZWVsLXByb2Nlc3Nvci5qcycsIGltcG9ydC5tZXRhLnVybCkpLCB1bnRyYW5zcGlsZWQuCiAqCiAqIFRoZSBkZXNpZ24gZm9sbG93cyBKdWxpdXMgTy4gU21pdGgncyBFS1MgcmVmZXJlbmNlIChjY3JtYS5zdGFuZm9yZC5lZHUsCiAqICJNYWtpbmcgVmlydHVhbCBFbGVjdHJpYyBHdWl0YXJzIGFuZCBBc3NvY2lhdGVkIEVmZmVjdHMgVXNpbmcgRmF1c3QiKToKICogICAtIGRlbGF5LWxpbmUgbG9vcCwgcmVhZCBkaXN0YW5jZSBEID0gc2FtcGxlUmF0ZS9mIOKIkiAyICh0aGUgRklSMyBkYW1waW5nCiAqICAgICBmaWx0ZXIgY29udHJpYnV0ZXMgZXhhY3RseSAxIHNhbXBsZSBvZiBwaGFzZSBkZWxheSwgdGhlIExhZ3JhbmdlIHJlYWQKICogICAgIGNlbnRlcmluZyBhbm90aGVyIH4xKQogKiAgIC0gNHRoLW9yZGVyIExhZ3JhbmdlIGZyYWN0aW9uYWwtZGVsYXkgcmVhZCDigJQgcm9idXN0IHVuZGVyIHRoZSBnbGlkaW5nCiAqICAgICBkZWxheSBvZiB0aGUgYmFyIHNjb29wIGFuZCB2aWJyYXRvIChhbGxwYXNzIGludGVycG9sYXRpb24gYXJ0aWZhY3RzCiAqICAgICB1bmRlciBmYXN0IGRlbGF5IGNoYW5nZXM7IGxpbmVhciBpbnRlcnAgYnV6emVzIHdpdGggbGlnaHQgZGFtcGluZykKICogICAtIGxpbmVhci1waGFzZSBGSVIzIGRhbXBpbmcgIHkgPSDPgcK3KGgwwrd4MSArIGgxwrcoeDAgKyB4MikpLAogKiAgICAgaDAgPSAoMStCKS8yLCBoMSA9ICgx4oiSQikvNCDigJQgYnJpZ2h0bmVzcyBCIG5ldmVyIGRldHVuZXMgdGhlIHN0cmluZwogKiAgIC0gbG9vcCBnYWluIM+BID0gMC4wMDFeKDEvKGbCt3Q2MCkpIOKAlCBldmVyeSByZWdpc3RlciBkZWNheXMg4oiSNjAgZEIgaW4gdGhlCiAqICAgICBzYW1lIHQ2MCwgc28gdHJlYmxlcyByaW5nIGxpa2UgYSByZWFsIHN0ZWVsCiAqICAgLSBleGNpdGF0aW9uOiBvbmUgcGVyaW9kIG9mIG1lYW4tc3VidHJhY3RlZCB3aGl0ZSBub2lzZSwgbG93cGFzc2VkIGJ5CiAqICAgICB2ZWxvY2l0eSAobG91ZGVyID0gYnJpZ2h0ZXIgcGljayksIG1pbnVzIGEgcGljay1wb3NpdGlvbiBjb21iIGNvcHkKICogICAtIERDIGJsb2NrZXIgb3V0c2lkZSB0aGUgbG9vcAogKgogKiBNZXNzYWdlczoge3R5cGU6J3BsdWNrJywgdm9pY2UsIGZyZXEsIHZlbCwgd2hlbiwgZ2wsIGdyfQogKiAgICAgICAgICAge3R5cGU6J29mZicsIHZvaWNlLCB3aGVufSAgIOKAlCBkYW1wIGxpa2UgYmxvY2tpbmcgKHQ2MCAwLjIgcykKICogICAgICAgICAgIHt0eXBlOidhbGxvZmYnLCB3aGVufQogKi8KCmNvbnN0IE5WID0gMTA7CmNvbnN0IEJVRkxFTiA9IDQwOTY7IC8vIHBvd2VyIG9mIHR3bzsgY292ZXJzIGZ1bmRhbWVudGFscyBkb3duIHRvIH4xMiBIegpjb25zdCBNQVNLID0gQlVGTEVOIC0gMTsKCmNvbnN0IEJSSUdIVE5FU1MgPSAwLjcyOyAvLyBzdGVlbCByYW5nZSAwLjbigJMwLjggKDAuNSA9IG9yZGluYXJ5IGd1aXRhcikKY29uc3QgVDYwX0hFTEQgPSA2LjA7IC8vIHNlY29uZHMg4oCUIHBlZGFsLXN0ZWVsIHN1c3RhaW4gYmFuZCA04oCTOCBzCmNvbnN0IFQ2MF9SRUxFQVNFID0gMC4yOyAvLyBibG9ja2luZyBkYW1wIG9uIG5vdGUtb2ZmCmNvbnN0IFNDT09QX0NFTlRTID0gLTQ1OyAvLyBiYXIgc2xpZGVzIGluIGZyb20gYmVsb3cKY29uc3QgU0NPT1BfVEFVID0gMC4wMjsgLy8gZXhwb25lbnRpYWwgYXBwcm9hY2gsIH45NSUgc2V0dGxlZCBhdCA2MCBtcwpjb25zdCBWSUJfUkFURSA9IDUuNzsgLy8gSHog4oCUIGNsYXNzaWMgYmFyIHZpYnJhdG8gYmFuZCA14oCTNi41CmNvbnN0IFZJQl9ERVBUSCA9IDAuMDA2OTU7IC8vIMKxMTIgY2VudHMgYXMgYSBmcmVxdWVuY3kgcmF0aW8KY29uc3QgVklCX1NUQVJUID0gMC4zNTsgLy8gc2lsZW50IHVudGlsIHRoZSBub3RlIHNldHRsZXPigKYKY29uc3QgVklCX0ZVTEwgPSAwLjc7IC8vIOKApmZ1bGwgZGVwdGggYnkgaGVyZQpjb25zdCBQSUNLX1BPUyA9IDAuMTI7IC8vIM6yOiBwaWNrLXBvc2l0aW9uIGNvbWIsIG5lYXItYnJpZGdlIHN0ZWVsIHBpY2tpbmcKY29uc3QgSURMRV9MRVZFTCA9IDMuMmUtNTsgLy8g4oiSOTAgZEIg4oCUIGJlbG93IHRoaXMgYSB2b2ljZSBzdG9wcyBidXJuaW5nIENQVQoKY29uc3QgSDAgPSAoMSArIEJSSUdIVE5FU1MpIC8gMjsKY29uc3QgSDEgPSAoMSAtIEJSSUdIVE5FU1MpIC8gNDsKY29uc3QgU0NPT1BfREVQVEggPSAxIC0gTWF0aC5wb3coMiwgU0NPT1BfQ0VOVFMgLyAxMjAwKTsgLy8g4omIIDAuMDI1NwoKY2xhc3MgU3RlZWxLUyBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7CiAgY29uc3RydWN0b3IoKSB7CiAgICBzdXBlcigpOwogICAgdGhpcy52b2ljZXMgPSBbXTsKICAgIGZvciAobGV0IHYgPSAwOyB2IDwgTlY7IHYrKykgewogICAgICB0aGlzLnZvaWNlcy5wdXNoKHsKICAgICAgICBhY3RpdmU6IGZhbHNlLAogICAgICAgIGJ1ZjogbmV3IEZsb2F0MzJBcnJheShCVUZMRU4pLAogICAgICAgIHdpOiAwLAogICAgICAgIGZyZXE6IDIyMCwKICAgICAgICByaG86IDAuOTk5LAogICAgICAgIHgxOiAwLAogICAgICAgIHgyOiAwLAogICAgICAgIGRjWDogMCwKICAgICAgICBkY1k6IDAsCiAgICAgICAgZXhjOiBudWxsLAogICAgICAgIGV4Y1BvczogMCwKICAgICAgICBzY29vcEVudjogMCwgLy8gMSDihpIgMCBleHBvbmVudGlhbDsgZiA9IGZyZXHCtygxIOKIkiBkZXB0aMK3ZW52KQogICAgICAgIHZpYlBoYXNlOiAwLAogICAgICAgIGFnZTogMCwgLy8gZnJhbWVzIHNpbmNlIHBsdWNrCiAgICAgICAgcGVhazogMCwKICAgICAgICBnbDogMC41LAogICAgICAgIGdyOiAwLjUsCiAgICAgIH0pOwogICAgfQogICAgdGhpcy5wZW5kaW5nID0gW107CiAgICB0aGlzLnNjb29wRGVjYXkgPSBNYXRoLmV4cCgtMSAvIChTQ09PUF9UQVUgKiBzYW1wbGVSYXRlKSk7CiAgICB0aGlzLnZpYkluYyA9ICgyICogTWF0aC5QSSAqIFZJQl9SQVRFKSAvIHNhbXBsZVJhdGU7CiAgICB0aGlzLnBvcnQub25tZXNzYWdlID0gKGUpID0+IHsKICAgICAgY29uc3QgbSA9IGUuZGF0YTsKICAgICAgaWYgKG0gJiYgKG0udHlwZSA9PT0gJ3BsdWNrJyB8fCBtLnR5cGUgPT09ICdvZmYnIHx8IG0udHlwZSA9PT0gJ2FsbG9mZicpKSB7CiAgICAgICAgdGhpcy5wZW5kaW5nLnB1c2gobSk7CiAgICAgIH0KICAgIH07CiAgfQoKICBtYWtlQnVyc3QoZnJlcSwgdmVsKSB7CiAgICBjb25zdCBQID0gTWF0aC5tYXgoMiwgTWF0aC5yb3VuZChzYW1wbGVSYXRlIC8gZnJlcSkpOwogICAgY29uc3QgYnVyc3QgPSBuZXcgRmxvYXQzMkFycmF5KFApOwogICAgbGV0IG1lYW4gPSAwOwogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBQOyBpKyspIHsKICAgICAgYnVyc3RbaV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7CiAgICAgIG1lYW4gKz0gYnVyc3RbaV07CiAgICB9CiAgICBtZWFuIC89IFA7CiAgICAvLyBNZWFuLXN1YnRyYWN0OiBEQyBuZXZlciBkZWNheXMgaW5zaWRlIHRoZSBsb29wLgogICAgZm9yIChsZXQgaSA9IDA7IGkgPCBQOyBpKyspIGJ1cnN0W2ldIC09IG1lYW47CiAgICAvLyBWZWxvY2l0eSDihpIgcGljayBicmlnaHRuZXNzOiBvbmUtcG9sZSBsb3dwYXNzLCBidyA9IDMwMCArIHZlbMK3OTAwMCBIei4KICAgIGNvbnN0IGJ3ID0gMzAwICsgdmVsICogOTAwMDsKICAgIGNvbnN0IFIgPSBNYXRoLmV4cCgoLU1hdGguUEkgKiBidykgLyBzYW1wbGVSYXRlKTsKICAgIGxldCB5ID0gMDsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUDsgaSsrKSB7CiAgICAgIHkgPSAoMSAtIFIpICogYnVyc3RbaV0gKyBSICogeTsKICAgICAgYnVyc3RbaV0gPSB5OwogICAgfQogICAgLy8gUGljay1wb3NpdGlvbiBjb21iOiBzdWJ0cmFjdCBhIGNvcHkgZGVsYXllZCBieSDOssK3UCAoc3BlY3RyYWwgemVyb3MgYXQKICAgIC8vIHRoZSBoYXJtb25pY3Mgd2l0aCBhIG5vZGUgdW5kZXIgdGhlIHBpY2spLgogICAgY29uc3QgY29tYkQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKFBJQ0tfUE9TICogUCkpOwogICAgZm9yIChsZXQgaSA9IFAgLSAxOyBpID49IGNvbWJEOyBpLS0pIGJ1cnN0W2ldIC09IGJ1cnN0W2kgLSBjb21iRF07CiAgICAvLyBIZWFkcm9vbSBmb3IgdGVuIHZvaWNlcyBiZWZvcmUgdGhlIGJ1cyBjb21wcmVzc29yLgogICAgY29uc3QgZyA9IDAuNiAqIHZlbDsKICAgIGZvciAobGV0IGkgPSAwOyBpIDwgUDsgaSsrKSBidXJzdFtpXSAqPSBnOwogICAgcmV0dXJuIGJ1cnN0OwogIH0KCiAgcmhvRm9yKGZyZXEsIHQ2MCkgewogICAgcmV0dXJuIE1hdGgucG93KDAuMDAxLCAxIC8gKE1hdGgubWF4KDIwLCBmcmVxKSAqIHQ2MCkpOwogIH0KCiAgaGFuZGxlTXNnKG0pIHsKICAgIGlmIChtLnR5cGUgPT09ICdhbGxvZmYnKSB7CiAgICAgIGZvciAoY29uc3QgdiBvZiB0aGlzLnZvaWNlcykgewogICAgICAgIGlmICh2LmFjdGl2ZSkgdi5yaG8gPSB0aGlzLnJob0Zvcih2LmZyZXEsIFQ2MF9SRUxFQVNFKTsKICAgICAgfQogICAgICByZXR1cm47CiAgICB9CiAgICBjb25zdCB2ID0gdGhpcy52b2ljZXNbbS52b2ljZV07CiAgICBpZiAoIXYpIHJldHVybjsKICAgIGlmIChtLnR5cGUgPT09ICdvZmYnKSB7CiAgICAgIGlmICh2LmFjdGl2ZSkgdi5yaG8gPSB0aGlzLnJob0Zvcih2LmZyZXEsIFQ2MF9SRUxFQVNFKTsKICAgICAgcmV0dXJuOwogICAgfQogICAgLy8gcGx1Y2sKICAgIGlmICghdi5hY3RpdmUpIHsKICAgICAgdi5idWYuZmlsbCgwKTsKICAgICAgdi54MSA9IDA7CiAgICAgIHYueDIgPSAwOwogICAgICB2LmRjWCA9IDA7CiAgICAgIHYuZGNZID0gMDsKICAgICAgdi53aSA9IDA7CiAgICB9CiAgICB2LmFjdGl2ZSA9IHRydWU7CiAgICB2LmZyZXEgPSBtLmZyZXE7CiAgICB2LnJobyA9IHRoaXMucmhvRm9yKG0uZnJlcSwgVDYwX0hFTEQpOwogICAgdi5leGMgPSB0aGlzLm1ha2VCdXJzdChtLmZyZXEsIG0udmVsKTsKICAgIHYuZXhjUG9zID0gMDsKICAgIHYuc2Nvb3BFbnYgPSAxOwogICAgdi52aWJQaGFzZSA9IDA7CiAgICB2LmFnZSA9IDA7CiAgICB2LnBlYWsgPSAxOyAvLyBnaXZlIHRoZSBuZXcgbm90ZSBhIGdyYWNlIHBlcmlvZCBiZWZvcmUgaWRsZSBkZXRlY3Rpb24KICAgIHYuZ2wgPSB0eXBlb2YgbS5nbCA9PT0gJ251bWJlcicgPyBtLmdsIDogMC41OwogICAgdi5nciA9IHR5cGVvZiBtLmdyID09PSAnbnVtYmVyJyA/IG0uZ3IgOiAwLjU7CiAgfQoKICBwcm9jZXNzKF9pbnB1dHMsIG91dHB1dHMpIHsKICAgIGNvbnN0IG91dCA9IG91dHB1dHNbMF07CiAgICBjb25zdCBMID0gb3V0WzBdOwogICAgY29uc3QgUiA9IG91dFsxXSB8fCBvdXRbMF07CiAgICBjb25zdCBmcmFtZXMgPSBMLmxlbmd0aDsKICAgIEwuZmlsbCgwKTsKICAgIGlmIChSICE9PSBMKSBSLmZpbGwoMCk7CgogICAgLy8gRmlyZSBhbnkgbWVzc2FnZXMgZHVlIHdpdGhpbiB0aGlzIGJsb2NrIChzYW1wbGUtYWNjdXJhdGUgdmlhIGB3aGVuYCkuCiAgICBjb25zdCB0QmxvY2sgPSBjdXJyZW50RnJhbWUgLyBzYW1wbGVSYXRlOwogICAgY29uc3QgdEVuZCA9IHRCbG9jayArIGZyYW1lcyAvIHNhbXBsZVJhdGU7CiAgICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCkgewogICAgICBjb25zdCBsYXRlciA9IFtdOwogICAgICBmb3IgKGNvbnN0IG0gb2YgdGhpcy5wZW5kaW5nKSB7CiAgICAgICAgY29uc3Qgd2hlbiA9IG0ud2hlbiB8fCAwOwogICAgICAgIGlmICh3aGVuIDwgdEVuZCkgewogICAgICAgICAgbS5fb2Zmc2V0ID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCgod2hlbiAtIHRCbG9jaykgKiBzYW1wbGVSYXRlKSk7CiAgICAgICAgICBpZiAobS5fb2Zmc2V0ID49IGZyYW1lcykgbS5fb2Zmc2V0ID0gZnJhbWVzIC0gMTsKICAgICAgICAgIGxhdGVyLnB1c2gobSk7IC8vIGhhbmRsZWQgaW5zaWRlIHRoZSBzYW1wbGUgbG9vcCBiZWxvdwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBsYXRlci5wdXNoKG0pOwogICAgICAgIH0KICAgICAgfQogICAgICB0aGlzLnBlbmRpbmcgPSBsYXRlcjsKICAgIH0KCiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lczsgaSsrKSB7CiAgICAgIC8vIGFjdGl2YXRlIG1lc3NhZ2VzIHNjaGVkdWxlZCBmb3IgdGhpcyBleGFjdCBmcmFtZQogICAgICBpZiAodGhpcy5wZW5kaW5nLmxlbmd0aCkgewogICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgdGhpcy5wZW5kaW5nLmxlbmd0aDsgaysrKSB7CiAgICAgICAgICBjb25zdCBtID0gdGhpcy5wZW5kaW5nW2tdOwogICAgICAgICAgaWYgKG0uX29mZnNldCA9PT0gaSAmJiAobS53aGVuIHx8IDApIDwgdEVuZCkgewogICAgICAgICAgICB0aGlzLmhhbmRsZU1zZyhtKTsKICAgICAgICAgICAgdGhpcy5wZW5kaW5nLnNwbGljZShrLCAxKTsKICAgICAgICAgICAgay0tOwogICAgICAgICAgfQogICAgICAgIH0KICAgICAgfQoKICAgICAgZm9yIChsZXQgdmkgPSAwOyB2aSA8IE5WOyB2aSsrKSB7CiAgICAgICAgY29uc3QgdiA9IHRoaXMudm9pY2VzW3ZpXTsKICAgICAgICBpZiAoIXYuYWN0aXZlKSBjb250aW51ZTsKCiAgICAgICAgLy8gQ3VycmVudCBwaXRjaDogc2Nvb3AgZnJvbSBiZWxvdyArIGRlbGF5ZWQtb25zZXQgYmFyIHZpYnJhdG8uCiAgICAgICAgY29uc3QgdEFnZSA9IHYuYWdlIC8gc2FtcGxlUmF0ZTsKICAgICAgICBsZXQgZiA9IHYuZnJlcSAqICgxIC0gU0NPT1BfREVQVEggKiB2LnNjb29wRW52KTsKICAgICAgICBpZiAodEFnZSA+IFZJQl9TVEFSVCkgewogICAgICAgICAgY29uc3QgZW52ID0gTWF0aC5taW4oMSwgKHRBZ2UgLSBWSUJfU1RBUlQpIC8gKFZJQl9GVUxMIC0gVklCX1NUQVJUKSk7CiAgICAgICAgICBmICo9IDEgKyBWSUJfREVQVEggKiBlbnYgKiBNYXRoLnNpbih2LnZpYlBoYXNlKTsKICAgICAgICB9CiAgICAgICAgdi5zY29vcEVudiAqPSB0aGlzLnNjb29wRGVjYXk7CiAgICAgICAgdi52aWJQaGFzZSArPSB0aGlzLnZpYkluYzsKCiAgICAgICAgLy8gTG9vcCBkZWxheTogdGhlIGxvb3AgcGVyaW9kIGlzIEQgKyAxICh0aGUgRklSMydzIG9uZSBzYW1wbGUgb2YKICAgICAgICAvLyBwaGFzZSBkZWxheTsgdGhlIHdyaXRl4oaScmVhZCByb3VuZCB0cmlwIHN1cHBsaWVzIEQgZXhhY3RseSwgYW5kIHRoZQogICAgICAgIC8vIExhZ3JhbmdlIHJlYWQgaXMgY2VudHJlZCBvbiBEKS4gVmVyaWZpZWQgYnkgb2ZmbGluZSBtZWFzdXJlbWVudDoKICAgICAgICAvLyBEID0gc3IvZiDiiJIgMiByZW5kZXJlZCArMTkgY2VudHMgc2hhcnAgYXQgNjYwIEh6OyDiiJIgMSBpcyBleGFjdC4KICAgICAgICBsZXQgRCA9IHNhbXBsZVJhdGUgLyBmIC0gMTsKICAgICAgICBpZiAoRCA8IDQpIEQgPSA0OwogICAgICAgIGlmIChEID4gQlVGTEVOIC0gOCkgRCA9IEJVRkxFTiAtIDg7CgogICAgICAgIC8vIDR0aC1vcmRlciBMYWdyYW5nZSByZWFkIChKT1MgZmRlbGF5NCk6IHRhcHMgaWQuLmlkKzQsIGZkIOKIiCBbMS41LDIuNSkKICAgICAgICBjb25zdCBpZCA9IE1hdGguZmxvb3IoRCAtIDEuNDk5OTk1KTsKICAgICAgICBjb25zdCBmZCA9IEQgLSBpZDsKICAgICAgICBjb25zdCBhID0gZmQgLSAxLCBiID0gZmQgLSAyLCBjID0gZmQgLSAzLCBkID0gZmQgLSA0OwogICAgICAgIGNvbnN0IHcwID0gKGEgKiBiICogYyAqIGQpIC8gMjQ7CiAgICAgICAgY29uc3QgdzEgPSAoLWZkICogYiAqIGMgKiBkKSAvIDY7CiAgICAgICAgY29uc3QgdzIgPSAoZmQgKiBhICogYyAqIGQpIC8gNDsKICAgICAgICBjb25zdCB3MyA9ICgtZmQgKiBhICogYiAqIGQpIC8gNjsKICAgICAgICBjb25zdCB3NCA9IChmZCAqIGEgKiBiICogYykgLyAyNDsKICAgICAgICBjb25zdCBiYXNlID0gdi53aSAtIGlkOwogICAgICAgIGNvbnN0IHgwID0KICAgICAgICAgIHcwICogdi5idWZbYmFzZSAmIE1BU0tdICsKICAgICAgICAgIHcxICogdi5idWZbKGJhc2UgLSAxKSAmIE1BU0tdICsKICAgICAgICAgIHcyICogdi5idWZbKGJhc2UgLSAyKSAmIE1BU0tdICsKICAgICAgICAgIHczICogdi5idWZbKGJhc2UgLSAzKSAmIE1BU0tdICsKICAgICAgICAgIHc0ICogdi5idWZbKGJhc2UgLSA0KSAmIE1BU0tdOwoKICAgICAgICAvLyBGSVIzIGRhbXBpbmcgw5cgbG9vcCBnYWluIChsaW5lYXIgcGhhc2U6IGJyaWdodG5lc3MgbmV2ZXIgZGV0dW5lcykuCiAgICAgICAgbGV0IHkgPSB2LnJobyAqIChIMCAqIHYueDEgKyBIMSAqICh4MCArIHYueDIpKTsKICAgICAgICB2LngyID0gdi54MTsKICAgICAgICB2LngxID0geDA7CgogICAgICAgIC8vIEluamVjdCB0aGUgcGljayBidXJzdCBhcyBsb29wIGlucHV0IG92ZXIgaXRzIGZpcnN0IHBlcmlvZC4KICAgICAgICBpZiAodi5leGMgJiYgdi5leGNQb3MgPCB2LmV4Yy5sZW5ndGgpIHsKICAgICAgICAgIHkgKz0gdi5leGNbdi5leGNQb3MrK107CiAgICAgICAgICBpZiAodi5leGNQb3MgPj0gdi5leGMubGVuZ3RoKSB2LmV4YyA9IG51bGw7CiAgICAgICAgfQogICAgICAgIHYuYnVmW3Yud2kgJiBNQVNLXSA9IHk7CiAgICAgICAgdi53aSA9ICh2LndpICsgMSkgJiBNQVNLOwoKICAgICAgICAvLyBEQyBibG9ja2VyIE9VVFNJREUgdGhlIGxvb3AgKGFkZHMgbm8gbG9vcCBwaGFzZSDihpIgbm8gZGV0dW5lKS4KICAgICAgICBjb25zdCBkYyA9IHkgLSB2LmRjWCArIDAuOTk1ICogdi5kY1k7CiAgICAgICAgdi5kY1ggPSB5OwogICAgICAgIHYuZGNZID0gZGM7CgogICAgICAgIExbaV0gKz0gZGMgKiB2LmdsOwogICAgICAgIFJbaV0gKz0gZGMgKiB2LmdyOwoKICAgICAgICAvLyBJZGxlIGRldGVjdGlvbjogc2lsZW50IHN0cmluZ3MgbXVzdCBub3QgYnVybiBDUFUuCiAgICAgICAgY29uc3QgbWFnID0gZGMgPCAwID8gLWRjIDogZGM7CiAgICAgICAgdi5wZWFrID0gbWFnID4gdi5wZWFrID8gbWFnIDogdi5wZWFrICogMC45OTk5NTsKICAgICAgICB2LmFnZSsrOwogICAgICAgIGlmICh2LmFnZSA+IHNhbXBsZVJhdGUgJiYgdi5wZWFrIDwgSURMRV9MRVZFTCkgewogICAgICAgICAgdi5hY3RpdmUgPSBmYWxzZTsKICAgICAgICAgIHYuZXhjID0gbnVsbDsKICAgICAgICB9CiAgICAgIH0KICAgIH0KICAgIHJldHVybiB0cnVlOwogIH0KfQoKcmVnaXN0ZXJQcm9jZXNzb3IoJ3N0ZWVsLWtzJywgU3RlZWxLUyk7Cg==", "" + import.meta.url), Ba = null;
function Va(e) {
	Ba = e;
}
function Ha(e) {
	let t = e.sampleRate, n = 2.8, r = Math.floor(1.3 * n * t), i = e.createBuffer(2, r, t), a = .001 ** (1 / (n * t)), o = Math.floor(.01 * t);
	for (let e = 0; e < 2; e++) {
		let n = i.getChannelData(e), s = 0, c = 0, l = 0, u = 1;
		for (let e = 0; e < r; e++) {
			let i = 4e3 - 2800 * e / r, d = Math.exp(-2 * Math.PI * i / t), f = Math.exp(-2 * Math.PI * 200 / t), p = (Math.random() * 2 - 1) * u;
			u *= a, s = (1 - d) * p + d * s, p = s;
			let m = f * (l + p - c);
			c = p, l = m, n[e] = m * (e < o ? e / o : 1);
		}
	}
	return i;
}
async function Ua(e, t) {
	await e.audioWorklet.addModule(Ba ? Ba() : za);
	let n = new AudioWorkletNode(e, "steel-ks", {
		numberOfInputs: 0,
		numberOfOutputs: 1,
		outputChannelCount: [2]
	}), r = e.createGain();
	r.gain.value = 1, n.connect(r);
	let i = e.createBiquadFilter();
	i.type = "lowpass", i.frequency.value = 3e3, i.Q.value = 2.2;
	let a = e.createGain();
	a.gain.value = 5;
	let o = e.createDynamicsCompressor();
	o.threshold.value = -38, o.knee.value = 20, o.ratio.value = 8, o.attack.value = .008, o.release.value = .3;
	let s = e.createGain();
	s.gain.value = .5;
	let c = e.createBiquadFilter();
	c.type = "peaking", c.frequency.value = 500, c.gain.value = -9, c.Q.value = .8;
	let l = e.createBiquadFilter();
	l.type = "lowshelf", l.frequency.value = 110, l.gain.value = 3;
	let u = e.createBiquadFilter();
	u.type = "highshelf", u.frequency.value = 2200, u.gain.value = 4;
	let d = e.createGain();
	d.gain.value = .9, r.connect(i), i.connect(a), a.connect(o), o.connect(s), s.connect(c), c.connect(l), l.connect(u);
	let f = e.createGain();
	f.gain.value = 1, u.connect(f), f.connect(d);
	let p = e.createGain();
	p.gain.value = .22, u.connect(p);
	let m = e.createChannelSplitter(2), h = e.createChannelMerger(2);
	p.connect(m);
	let g = (t, n) => {
		let r = e.createDelay(.05);
		r.delayTime.value = .009, m.connect(r, t), r.connect(h, 0, t);
		let i = e.createGain();
		return i.gain.value = n ? -.002 : .002, i.connect(r.delayTime), i;
	}, _ = g(0, !1), v = g(1, !0), y = e.createOscillator();
	y.type = "sine", y.frequency.value = .5, y.connect(_), y.connect(v), y.start(), h.connect(d);
	let b = e.createGain();
	b.gain.value = .15, u.connect(b);
	let x = e.createDelay(1);
	x.delayTime.value = .3;
	let S = e.createGain();
	S.gain.value = .25, b.connect(x), x.connect(S), S.connect(x), x.connect(d);
	let C = e.createGain();
	C.gain.value = .2, u.connect(C);
	let w = e.createConvolver();
	w.normalize = !0, w.buffer = Ha(e), C.connect(w), w.connect(d);
	let T = e.createGain();
	T.gain.value = 1, d.connect(T), T.connect(t ?? e.destination);
	let ee = .7, E = () => {
		d.gain.value = ee / .7 * .9;
	};
	return E(), {
		ctx: e,
		node: n,
		raw: r,
		master: d,
		pluck(e, t, r, i, a) {
			let o = (1 - .2 * a) / 2, s = (1 + .2 * a) / 2;
			n.port.postMessage({
				type: "pluck",
				voice: e,
				freq: t,
				vel: r,
				when: i,
				gl: o,
				gr: s
			});
		},
		damp(e, t = 0) {
			n.port.postMessage({
				type: "off",
				voice: e,
				when: t
			});
		},
		dampAll(e = 0) {
			n.port.postMessage({
				type: "alloff",
				when: e
			});
		},
		setVolume(e) {
			ee = e, E();
		},
		setSwell(e, t) {
			let n = T.gain;
			n.cancelScheduledValues(0), t > 0 ? (n.setValueAtTime(0, e), n.linearRampToValueAtTime(1, e + t)) : n.setValueAtTime(1, e);
		}
	};
}
//#endregion
//#region src/lib/audio.ts
var Wa = {
	swell: {
		label: "Swell",
		hint: "Volume-pedal fade-in — the pick disappears and the chord blooms"
	},
	strum: {
		label: "Strum",
		hint: "Picked low to high, one string after the next"
	},
	together: {
		label: "Together",
		hint: "Every string at once — a block chord"
	}
}, Ga = Object.keys(Wa), Ka = {
	steel: {
		label: "Guitar",
		osc: "sawtooth",
		filterHz: 3e3,
		filterQ: 2,
		scoop: .972
	},
	sine: {
		label: "Sine",
		osc: "sine",
		filterHz: 6e3,
		filterQ: .5,
		scoop: 1
	},
	saw: {
		label: "Saw",
		osc: "sawtooth",
		filterHz: 1500,
		filterQ: 1.2,
		scoop: .965
	}
}, qa = Object.keys(Ka), Ja = 1400, Ya = 55, Xa = .8, Za = .7, Qa = class e {
	ctx = null;
	voices = /* @__PURE__ */ new Map();
	timeouts = [];
	steel = null;
	steelInit = null;
	steelFailed = !1;
	_volume = .7;
	tone = "steel";
	mode = "swell";
	get volume() {
		return this._volume;
	}
	set volume(e) {
		this._volume = e, this.steel?.setVolume(e);
	}
	onPlayingChange = null;
	playing = /* @__PURE__ */ new Set();
	context() {
		if (!this.ctx) {
			let e = window.AudioContext ?? window.webkitAudioContext;
			this.ctx = new e();
		}
		return this.ctx;
	}
	async ensureSteel() {
		if (this.steel) return this.steel;
		if (this.steelFailed) return null;
		if (!this.steelInit) {
			let e = this.context();
			this.steelInit = (async () => {
				try {
					if (!e.audioWorklet) throw Error("no AudioWorklet");
					let t = await Ua(e);
					return t.setVolume(this.volume), this.steel = t, t;
				} catch {
					return this.steelFailed = !0, null;
				}
			})();
		}
		return this.steelInit;
	}
	emit() {
		this.onPlayingChange?.(new Set(this.playing));
	}
	stopVoice(e) {
		let t = this.voices.get(e);
		if (!t || !this.ctx) return;
		let n = this.ctx.currentTime;
		try {
			t.startAt > n ? (t.gain.gain.cancelScheduledValues(n), t.gain.gain.setValueAtTime(0, n), t.oscillator.stop(t.startAt)) : (t.gain.gain.cancelScheduledValues(n), t.gain.gain.setValueAtTime(t.gain.gain.value, n), t.gain.gain.exponentialRampToValueAtTime(.001, n + .3), t.oscillator.stop(n + .35));
		} catch {}
		this.voices.delete(e);
	}
	stopAll() {
		this.timeouts.forEach((e) => window.clearTimeout(e)), this.timeouts = [], Array.from(this.voices.keys()).forEach((e) => this.stopVoice(e)), this.steel?.dampAll(), this.playing.size && (this.playing.clear(), this.emit());
	}
	playVoice(e, t, n, r, i = .012) {
		let a = this.context();
		this.stopVoice(t);
		let o = Ka[this.tone], s = 440 * 2 ** ((e - 69) / 12) * (o.detune ?? 1), c = a.createOscillator();
		c.type = o.osc, c.frequency.setValueAtTime(s * o.scoop, r), c.frequency.exponentialRampToValueAtTime(s, r + .055);
		let l = a.createBiquadFilter();
		l.type = "lowpass", l.frequency.value = o.filterHz, l.Q.value = o.filterQ;
		let u = a.createGain();
		u.gain.setValueAtTime(0, r), u.gain.linearRampToValueAtTime(.22, r + i), u.gain.exponentialRampToValueAtTime(.12, r + i + .35);
		let d = a.createGain();
		d.gain.value = this.volume * n, c.connect(l), l.connect(u), u.connect(d), d.connect(a.destination), c.start(r), this.voices.set(t, {
			oscillator: c,
			gain: u,
			startAt: r
		});
	}
	static freqOf(e) {
		return 440 * 2 ** ((e - 69) / 12);
	}
	async resume() {
		let e = this.context();
		if (e.state === "suspended") try {
			await e.resume();
		} catch {}
		return e;
	}
	async strum(t, n, r) {
		if (this.stopAll(), n.length === 0) return;
		let i = await this.resume(), a = this.tone === "steel" ? await this.ensureSteel() : null, o = this.mode === "swell", s = this.mode === "strum" ? Ya : 0, c = o ? .55 : .85, l = Ja + (o ? Xa * 1e3 : 0), u = [...n].sort((e, t) => e - t), d = Math.min(1, 1 / Math.sqrt(u.length)), f = i.currentTime, p = t.length;
		a?.setSwell(f, o ? Xa : 0), u.forEach((n, i) => {
			let u = f + i * s / 1e3;
			if (a) {
				let i = p > 1 ? n / (p - 1) * 2 - 1 : 0;
				a.pluck(n, e.freqOf(t[n] + r), c, u, i);
			} else this.playVoice(t[n] + r, `s${n}`, d, u, o ? Za : void 0);
			this.timeouts.push(window.setTimeout(() => {
				this.playing.add(n), this.emit();
			}, i * s), window.setTimeout(() => {
				a || this.stopVoice(`s${n}`), this.playing.delete(n), this.emit();
			}, i * s + l));
		});
	}
	async pluck(t, n = "single") {
		this.stopAll();
		let r = await this.resume(), i = this.tone === "steel" ? await this.ensureSteel() : null;
		if (i) {
			i.setSwell(r.currentTime, 0), i.pluck(0, e.freqOf(t), .9, r.currentTime, 0);
			return;
		}
		this.playVoice(t, n, 1, r.currentTime), this.timeouts.push(window.setTimeout(() => this.stopVoice(n), Ja));
	}
	async pluckString(t, n) {
		this.stopAll();
		let r = await this.resume(), i = this.tone === "steel" ? await this.ensureSteel() : null, a = this.mode === "swell";
		i ? (i.setSwell(r.currentTime, a ? Xa : 0), i.pluck(t, e.freqOf(n), a ? .55 : .9, r.currentTime, 0)) : this.playVoice(n, `s${t}`, 1, r.currentTime, a ? Za : void 0), this.playing.add(t), this.emit(), this.timeouts.push(window.setTimeout(() => {
			i || this.stopVoice(`s${t}`), this.playing.delete(t), this.emit();
		}, Ja + (a ? Xa * 1e3 : 0)));
	}
	suspendSoon() {
		window.setTimeout(() => {
			this.ctx && this.ctx.state === "running" && this.ctx.suspend().catch(() => void 0);
		}, 450);
	}
	dispose() {
		this.stopAll(), this.steel = null, this.steelInit = null, this.ctx?.close().catch(() => void 0), this.ctx = null;
	}
}, $a = {
	tuningId: "c6",
	customTuning: [
		48,
		52,
		55,
		57,
		60,
		64
	],
	barFret: 0,
	chip: 0,
	view: "bar",
	pulls: [],
	tone: "steel",
	mode: "swell"
}, eo = "gfv.state.v1", to = (e, t, n) => Math.min(n, Math.max(t, Math.round(e)));
function no(e) {
	let t = new URLSearchParams();
	return t.set("t", e.tuningId), e.tuningId === "custom" && t.set("u", e.customTuning.join(".")), t.set("f", String(e.barFret)), e.chip !== $a.chip && t.set("i", String(e.chip)), e.view !== $a.view && t.set("v", e.view), e.pulls.some(Boolean) && t.set("p", e.pulls.join(".")), e.tone !== $a.tone && t.set("o", e.tone), e.mode !== $a.mode && t.set("m", e.mode), t.toString();
}
function ro(e, t = $a) {
	let n = new URLSearchParams(e.replace(/^#/, "")), r = { ...t }, i = n.get("t");
	i && (i === "custom" || bi(i)) && (r.tuningId = i);
	let a = n.get("u");
	if (a) {
		let e = a.split(".").map(Number).filter((e) => Number.isFinite(e));
		e.length >= 3 && e.length <= 10 && (r.customTuning = e);
	}
	let o = Number(n.get("f"));
	Number.isFinite(o) && (r.barFret = to(o, 0, 12));
	let s = Number(n.get("i"));
	Number.isFinite(s) && (r.chip = to(s, 0, 40));
	let c = n.get("v");
	(c === "bar" || c === "map") && (r.view = c);
	let l = n.get("p");
	l && (r.pulls = l.split(".").map(Number).map((e) => Number.isFinite(e) ? to(e, -12, 12) : 0));
	let u = n.get("o");
	u && qa.includes(u) && (r.tone = u);
	let d = n.get("m");
	return d && Ga.includes(d) && (r.mode = d), r;
}
function io() {
	let e = $a;
	try {
		let t = localStorage.getItem(eo);
		t && (e = ro(t, $a));
	} catch {}
	return window.location.hash.length > 1 ? ro(window.location.hash, e) : e;
}
function ao(e) {
	let t = no(e);
	try {
		localStorage.setItem(eo, t);
	} catch {}
	let n = `#${t}`;
	window.location.hash !== n && window.history.replaceState(null, "", n);
}
function oo(e) {
	let t = () => e(ro(window.location.hash));
	return window.addEventListener("hashchange", t), () => window.removeEventListener("hashchange", t);
}
//#endregion
//#region src/App.tsx
var so = [
	"C",
	"D",
	"E",
	"F",
	"G",
	"A",
	"B"
], co = () => /* @__PURE__ */ (0, z.jsxs)("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ (0, z.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), /* @__PURE__ */ (0, z.jsx)("path", { d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" })]
}), lo = () => /* @__PURE__ */ (0, z.jsx)("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" })
}), uo = () => /* @__PURE__ */ (0, z.jsxs)("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ (0, z.jsx)("path", { d: "M11 5 6 9H2v6h4l5 4V5z" }), /* @__PURE__ */ (0, z.jsx)("path", { d: "M15.5 8.5a5 5 0 0 1 0 7M18.4 5.6a9 9 0 0 1 0 12.8" })]
}), H = {
	steel: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, z.jsx)("path", {
			d: "M3 7h18M3 12h18M3 17h18",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round",
			opacity: "0.55"
		}), /* @__PURE__ */ (0, z.jsx)("rect", {
			x: "9.2",
			y: "3.2",
			width: "5.6",
			height: "17.6",
			rx: "2.8",
			fill: "currentColor"
		})]
	}), {}),
	sine: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M2 12c2.6-8.6 7.4-8.6 10 0s7.4 8.6 10 0" })
	}), {}),
	saw: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M3 17 11 7v10L19 7v10" })
	}), {})
}, U = {
	strum: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M5 19 17 7M17 7h-5.5M17 7v5.5" })
	}), {}),
	together: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsxs)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, z.jsx)("circle", {
				cx: "12",
				cy: "5.5",
				r: "2.6"
			}),
			/* @__PURE__ */ (0, z.jsx)("circle", {
				cx: "12",
				cy: "12",
				r: "2.6"
			}),
			/* @__PURE__ */ (0, z.jsx)("circle", {
				cx: "12",
				cy: "18.5",
				r: "2.6"
			})
		]
	}), {}),
	swell: /* @__PURE__ */ (0, z.jsx)(() => /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M20 6 4 12l16 6" })
	}), {})
}, fo = {
	dots: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "4.6"
		})
	}),
	trapezoid: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M7.2 7.5h9.6l3.4 9H3.8z" })
	}),
	blocks: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("rect", {
			x: "4.5",
			y: "7",
			width: "15",
			height: "10",
			rx: "1.4"
		})
	}),
	split: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M5.6 6.5h8.8l-2.5 5H3.1zM12.1 12.5h8.8l-2.5 5h-8.8z" })
	}),
	suits: /* @__PURE__ */ (0, z.jsx)("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, z.jsx)("path", { d: "M12 3.5c-3.8 4.3-6.7 6-6.7 9a3.1 3.1 0 0 0 5.4 2.1c-.1 1.9-.7 3.2-2 4.4h6.6c-1.3-1.2-1.9-2.5-2-4.4a3.1 3.1 0 0 0 5.4-2.1c0-3-2.9-4.7-6.7-9z" })
	})
}, po = () => /* @__PURE__ */ (0, z.jsxs)("svg", {
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ (0, z.jsx)("circle", {
		cx: "12",
		cy: "12",
		r: "3.2"
	}), /* @__PURE__ */ (0, z.jsx)("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.67 8.6a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1z" })]
}), mo = Hn`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    background: ${({ theme: e }) => e.colors.background};
    color: ${({ theme: e }) => e.colors.text};
    font-family: ${({ theme: e }) => e.fontFamily};
    -webkit-font-smoothing: antialiased;
  }
  button { font-family: inherit; }
`, ho = R.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: ${({ theme: e }) => e.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme: e }) => e.spacing.md};
`, go = R.header`
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.md};
  flex-wrap: wrap;
`, _o = R.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`, vo = R.h1`
  margin: 0;
  font-family: ${({ theme: e }) => e.titleFamily};
  font-size: 30px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${({ theme: e }) => e.colors.text};
`, yo = R.span`
  font-family: ${({ theme: e }) => e.monoFamily};
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme: e }) => e.colors.textSecondary};
`, bo = R.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme: e }) => e.spacing.sm};
`, xo = R.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid ${({ $open: e, theme: t }) => e ? t.colors.primary : t.colors.border};
  border-radius: 50%;
  background: ${({ $open: e, theme: t }) => e ? `${t.colors.primary}24` : `linear-gradient(180deg, ${t.colors.inputBackground}, ${t.colors.card})`};
  color: ${({ $open: e, theme: t }) => e ? t.colors.primary : t.colors.textSecondary};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme: e }) => e.colors.primary};
    color: ${({ theme: e }) => e.colors.primary};
  }
`, So = R.div`
  position: relative;
`, Co = R.div`
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  padding: 12px;
  background: ${({ theme: e }) => e.colors.card};
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.medium};
  box-shadow: ${({ theme: e }) => e.shadows.large};
`, wo = R(Co)`
  width: min(460px, calc(100vw - 32px));
  gap: 12px;
`, To = R.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $c: e }) => e};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
`, Eo = R.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
  border: none;
  background: transparent;
  color: ${({ theme: e }) => e.colors.text};
  font-family: inherit;
  font-size: ${({ theme: e }) => e.fontSizes.xs};
  font-weight: 500;
  cursor: ${({ $disabled: e }) => e ? "default" : "pointer"};
  opacity: ${({ $disabled: e }) => e ? .35 : 1};
  white-space: nowrap;
`, Do = R.span`
  position: relative;
  width: 28px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ $on: e, theme: t }) => e ? t.colors.primary : t.colors.border};
  transition: background ${({ theme: e }) => e.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $on: e }) => e ? "14px" : "2px"};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme: e }) => e.colors.card};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    transition: left ${({ theme: e }) => e.transitions.fast};
  }
`, Oo = R.input`
  width: 100%;
  accent-color: ${({ theme: e }) => e.colors.primary};
  cursor: pointer;
`, ko = R.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  border: 1px solid ${({ theme: e }) => e.colors.border};
  border-radius: ${({ theme: e }) => e.borderRadius.small};
  background: ${({ theme: e }) => e.colors.inputBackground};
  min-width: 48px;
`, Ao = R.div`
  font-size: ${({ theme: e }) => e.fontSizes.sm};
  font-weight: 700;
  color: ${({ theme: e }) => e.colors.text};
  text-align: center;
  line-height: 1.15;
`, jo = Gn`
  from {
    opacity: 0;
    transform: translateY(3px) scale(0.96);
  }
`, Mo = Gn`
  to {
    opacity: 0;
    transform: translateY(3px) scale(0.92);
  }
`, No = R(Hi)`
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 48px;
  /* pop in on mount — expanding "+ N more" cascades via animation-delay;
     collapsing runs the same cascade out before the cards unmount */
  ${({ $out: e }) => e ? Rn`
          animation: ${Mo} 0.16s ease forwards;
          pointer-events: none;
        ` : Rn`
          animation: ${jo} 0.18s ease backwards;
        `}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`, Po = R.span`
  font-weight: 500;
  font-size: 9px;
  color: ${({ theme: e }) => e.colors.textSecondary};
`, Fo = R.span`
  font-size: ${({ theme: e }) => e.fontSizes.md};
  font-weight: 800;
  color: ${({ theme: e }) => e.colors.accent};
`, Io = R.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: ${({ theme: e }) => e.spacing.sm};
  border-top: 1px solid ${({ theme: e }) => `${e.colors.border}66`};
`, Lo = R.div`
  &,
  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
  }
  color: ${({ theme: e }) => e.colors.text};
  font-family: ${({ theme: e }) => e.fontFamily};
  -webkit-font-smoothing: antialiased;

  button {
    font-family: inherit;
  }

  /* The host sheet already pads the modal — keep the shell lean inside it. */
  ${ho} {
    padding: 4px 0 10px;
    gap: 10px;
  }
`, Ro = ({ embedded: e = !1, embedTheme: t, externalTuning: n = null, externalPulls: r = null, onTuningChange: i, registerEmbedHandlers: a }) => {
	let [o, s] = (0, L.useState)(() => {
		if (!e) return io();
		let t = { ...$a };
		return n?.kind === "id" ? t.tuningId = n.id : n?.kind === "custom" && (t.tuningId = vi, t.customTuning = n.midi), t;
	}), [c, l] = (0, L.useState)(() => {
		try {
			let e = localStorage.getItem("gfv.theme");
			if (e === "dark" || e === "light") return e;
		} catch {}
		return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
	}), [u, d] = (0, L.useState)(() => {
		try {
			let e = Number(localStorage.getItem("gfv.volume"));
			if (Number.isFinite(e) && e >= 0 && e <= 1 && localStorage.getItem("gfv.volume") !== null) return e;
		} catch {}
		return .7;
	}), [f, p] = (0, L.useState)(!1), m = (0, L.useRef)(null), [h, g] = (0, L.useState)(() => {
		try {
			return localStorage.getItem("gfv.autoplay") !== "0";
		} catch {
			return !0;
		}
	});
	(0, L.useEffect)(() => {
		try {
			localStorage.setItem("gfv.autoplay", h ? "1" : "0");
		} catch {}
	}, [h]);
	let [_, v] = (0, L.useState)(wr), [y, b] = (0, L.useState)(!1), x = (0, L.useRef)(null), S = (0, L.useCallback)((e) => {
		v((t) => {
			let n = {
				...t,
				...e
			};
			return Tr(n), n;
		});
	}, []), C = (0, L.useCallback)((e) => {
		s((t) => ({
			...t,
			...e
		}));
	}, []);
	(0, L.useEffect)(() => {
		e || ao(o);
	}, [o, e]), (0, L.useEffect)(() => e ? void 0 : oo(s), [e]), (0, L.useEffect)(() => {
		if (!e) try {
			localStorage.setItem("gfv.theme", c);
		} catch {}
	}, [c, e]), (0, L.useEffect)(() => {
		try {
			localStorage.setItem("gfv.volume", String(u));
		} catch {}
	}, [u]), (0, L.useEffect)(() => {
		if (!f && !y) return;
		let e = (e) => {
			f && !m.current?.contains(e.target) && p(!1), y && !x.current?.contains(e.target) && b(!1);
		}, t = (e) => {
			e.key === "Escape" && (p(!1), b(!1));
		};
		return window.addEventListener("mousedown", e), window.addEventListener("keydown", t), () => {
			window.removeEventListener("mousedown", e), window.removeEventListener("keydown", t);
		};
	}, [f, y]), (0, L.useEffect)(() => {
		n && s((e) => {
			if (n.kind === "id") return e.tuningId === n.id ? e : {
				...e,
				tuningId: n.id,
				pulls: [],
				chip: 0,
				barFret: 0
			};
			let t = n.midi;
			return e.tuningId === "custom" && e.customTuning.length === t.length && e.customTuning.every((e, n) => e === t[n]) ? e : {
				...e,
				tuningId: vi,
				customTuning: t,
				pulls: [],
				chip: 0,
				barFret: 0
			};
		});
	}, [n]), (0, L.useEffect)(() => {
		!e || !r || s((e) => {
			let t = Xi(e.tuningId, e.customTuning).midi.length, n = Qi(r.vals.length === t ? r.vals : [], t), i = Qi(e.pulls, t);
			return n.every((e, t) => e === i[t]) ? e : {
				...e,
				pulls: n
			};
		});
	}, [e, r]);
	let w = (0, L.useMemo)(() => Xi(o.tuningId, o.customTuning), [o.tuningId, o.customTuning]), T = w.midi.length, ee = (0, L.useMemo)(() => Qi(o.pulls, T), [o.pulls, T]), { tuning: E, pulled: te } = (0, L.useMemo)(() => Zi(w, ee), [w, ee]), ne = (0, L.useMemo)(() => Fa(w), [w]), re = w.preferFlats ?? ne.notes.filter((e) => e.includes("♭")).length > ne.notes.filter((e) => e.includes("♯")).length, D = (0, L.useMemo)(() => lr(E.midi, o.barFret), [E, o.barFret]), O = w.midi.join(","), [k, ie] = (0, L.useState)(!1), [A, j] = (0, L.useState)(!1), M = (0, L.useRef)(void 0);
	(0, L.useEffect)(() => () => window.clearTimeout(M.current), []);
	let ae = (0, L.useCallback)(() => {
		window.clearTimeout(M.current), k ? (ie(!1), j(!0), M.current = window.setTimeout(() => j(!1), 260)) : (j(!1), ie(!0));
	}, [k]), oe = (0, L.useRef)(O);
	(0, L.useEffect)(() => {
		oe.current !== O && (oe.current = O, C({ chip: 0 }), ie(!1), j(!1));
	}, [O, C]);
	let se = D.length ? D[Math.min(o.chip, D.length - 1)] : null, ce = se ? se.match.rootPc : null, N = (0, L.useMemo)(() => dr(se ? se.match : null, o.barFret, 12, re), [
		se,
		o.barFret,
		re
	]), P = (0, L.useMemo)(() => se ? se.strings : E.midi.map((e, t) => t), [se, E]), le = (0, L.useMemo)(() => se ? new Set(se.strings) : null, [se]), ue = (0, L.useMemo)(() => {
		let e = ne.notes, t = new Set(e.map((e) => ((ca(e) ?? 0) % 12 + 12) % 12)), n = ne.rootPc, r = /* @__PURE__ */ new Map(), i = ne.root[0]?.toUpperCase(), a = [
			0,
			2,
			4,
			5,
			7,
			9,
			11
		];
		return e.forEach((e) => {
			let t = e[0]?.toUpperCase(), o = ((ca(e) ?? 0) % 12 + 12) % 12;
			if (!t || !i) return;
			let s = (so.indexOf(t) - so.indexOf(i) + 7) % 7 + 1, c = ((o - n + 12) % 12 - a[s - 1] + 18) % 12 - 6, l = c > 0 ? "♯".repeat(c) : c < 0 ? "♭".repeat(-c) : "";
			r.set(o, l + s);
		}), {
			core: e,
			pcs: t,
			keyRootPc: n,
			degreeLabels: r
		};
	}, [ne]), F = (0, L.useMemo)(() => Ra(E.midi, ne.notes, ne.rootPc), [E, ne]), de = (0, L.useCallback)((e) => {
		let t = lr(E.midi, e.fret), n = t.findIndex((t) => t.strings.length === e.strings.length && t.strings[0] === e.strings[0]);
		if (n < 0 && (n = t.findIndex((t) => t.match.rootPc === e.match.rootPc && t.match.suffix === e.match.suffix)), n < 0) {
			let r = new Set(e.strings.map((t) => Yn(E.midi[t] + e.fret)));
			n = t.findIndex((t) => {
				let n = new Set(t.strings.map((t) => Yn(E.midi[t] + e.fret)));
				return n.size === r.size && [...r].every((e) => n.has(e));
			});
		}
		C(n >= 0 ? {
			barFret: e.fret,
			chip: n
		} : { barFret: e.fret });
	}, [E, C]), fe = se ? `${se.match.rootPc}:${se.match.suffix}` : null, pe = (e) => `${e.rootPc}:${e.suffix}`, me = (0, L.useRef)(null), [he, ge] = (0, L.useState)(/* @__PURE__ */ new Set());
	me.current || (me.current = new Qa(), me.current.onPlayingChange = ge);
	let I = me.current;
	I.tone = o.tone, I.mode = o.mode, I.volume = u, (0, L.useEffect)(() => () => me.current?.dispose(), []);
	let _e = (0, L.useRef)(0), ve = (0, L.useCallback)((e) => {
		d(e), I.volume = e;
		let t = performance.now();
		t - _e.current > 180 && (_e.current = t, I.pluck(60));
	}, [I]), ye = (0, L.useRef)(!1);
	(0, L.useEffect)(() => {
		if (ye.current) {
			ye.current = !1;
			return;
		}
		me.current?.stopAll();
	}, [O, o.barFret]);
	let be = (0, L.useCallback)((e) => void I.strum(E.midi, e, o.barFret), [
		I,
		E,
		o.barFret
	]), xe = (0, L.useCallback)((e) => {
		h && (e.fret !== o.barFret && (ye.current = !0), I.strum(E.midi, e.strings, e.fret)), de(e);
	}, [
		h,
		I,
		E,
		o.barFret,
		de
	]), Se = (0, L.useCallback)((e, t) => {
		I.pluckString(e, E.midi[e] + t);
	}, [I, E]), Ce = (e) => {
		C(e === "custom" ? {
			tuningId: e,
			customTuning: [...w.midi],
			pulls: [],
			chip: 0
		} : {
			tuningId: e,
			pulls: [],
			chip: 0
		}), i?.(e);
	}, we = (e, t) => {
		let n = [...w.midi];
		n[e] = Math.min(96, Math.max(28, n[e] + t)), C({ customTuning: n });
	}, Te = () => {
		if (T >= 10) return;
		let e = [...w.midi, Math.min(96, w.midi[T - 1] + 5)];
		C({
			customTuning: e,
			pulls: []
		});
	}, Ee = () => {
		T <= 3 || C({
			customTuning: w.midi.slice(0, -1),
			pulls: []
		});
	}, De = (0, L.useCallback)((e) => C({ barFret: e }), [C]), Oe = e ? t ?? Ki : c === "dark" ? Ki : qi, ke = (0, L.useRef)(null);
	(0, L.useEffect)(() => {
		a?.({
			closeTopLayer: () => ke.current?.open ? (ke.current.close(), !0) : f ? (p(!1), !0) : y ? (b(!1), !0) : !1,
			stopAudio: () => {
				me.current?.stopAll(), me.current?.suspendSoon();
			}
		});
	});
	let Ae = (e, t = 0, n = !1) => /* @__PURE__ */ (0, z.jsxs)(No, {
		$out: n,
		$active: fe === pe(e.match),
		"aria-pressed": fe === pe(e.match),
		onClick: () => xe(e),
		style: t ? { animationDelay: `${Math.min(t * (n ? 8 : 12), n ? 96 : 260)}ms` } : void 0,
		title: e.home ? `${$n(e.match, re)} — every open string, strummed as-is` : `${$n(e.match, re)} — bar at fret ${e.fret}, strings ${T - e.strings[0]}–${T - e.strings[e.strings.length - 1]}`,
		children: [
			e.home && /* @__PURE__ */ (0, z.jsx)(Po, { children: "open" }),
			e.roman && /* @__PURE__ */ (0, z.jsx)(Po, {
				style: e.degree == null ? void 0 : {
					color: vr(e.degree),
					fontWeight: 700
				},
				children: e.roman
			}),
			$n(e.match, re),
			/* @__PURE__ */ (0, z.jsxs)(Po, { children: ["fret ", e.fret] })
		]
	}, `${e.home ? "home" : e.roman ?? ""}${pe(e.match)}`), je = /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [
		/* @__PURE__ */ (0, z.jsxs)(So, {
			ref: m,
			children: [/* @__PURE__ */ (0, z.jsx)(xo, {
				$open: f,
				onClick: () => p((e) => !e),
				"aria-label": "Sound",
				"aria-haspopup": "dialog",
				"aria-expanded": f,
				title: "Sound",
				children: /* @__PURE__ */ (0, z.jsx)(uo, {})
			}), f && /* @__PURE__ */ (0, z.jsxs)(Co, {
				role: "dialog",
				"aria-label": "Sound settings",
				children: [
					/* @__PURE__ */ (0, z.jsxs)(Eo, {
						"aria-pressed": h,
						onClick: () => g((e) => !e),
						title: "Chord cards sound the moment you tap them — no play button needed",
						children: [/* @__PURE__ */ (0, z.jsx)(Do, { $on: h }), "Play chords on tap"]
					}),
					/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Tone" }),
					/* @__PURE__ */ (0, z.jsx)(Bi, {
						role: "group",
						"aria-label": "Synth voice",
						style: { width: "fit-content" },
						children: qa.map((e) => /* @__PURE__ */ (0, z.jsxs)(Vi, {
							$active: o.tone === e,
							"aria-pressed": o.tone === e,
							onClick: () => C({ tone: e }),
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [H[e], Ka[e].label]
						}, e))
					}),
					/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Play" }),
					/* @__PURE__ */ (0, z.jsx)(Bi, {
						role: "group",
						"aria-label": "Chord delivery",
						style: { width: "fit-content" },
						children: Ga.map((e) => /* @__PURE__ */ (0, z.jsxs)(Vi, {
							$active: o.mode === e,
							"aria-pressed": o.mode === e,
							onClick: () => C({ mode: e }),
							title: Wa[e].hint,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [U[e], Wa[e].label]
						}, e))
					}),
					/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Volume" }),
					/* @__PURE__ */ (0, z.jsx)(Oo, {
						type: "range",
						min: 0,
						max: 1,
						step: .01,
						value: u,
						"aria-label": "Volume",
						onChange: (e) => ve(Number(e.target.value))
					})
				]
			})]
		}),
		!e && /* @__PURE__ */ (0, z.jsx)(xo, {
			onClick: () => l((e) => e === "dark" ? "light" : "dark"),
			"aria-label": c === "dark" ? "Switch to light theme" : "Switch to dark theme",
			title: c === "dark" ? "Light theme" : "Dark theme",
			children: c === "dark" ? /* @__PURE__ */ (0, z.jsx)(co, {}) : /* @__PURE__ */ (0, z.jsx)(lo, {})
		}),
		/* @__PURE__ */ (0, z.jsxs)(So, {
			ref: x,
			children: [/* @__PURE__ */ (0, z.jsx)(xo, {
				$open: y,
				onClick: () => b((e) => !e),
				"aria-label": "Board settings",
				"aria-haspopup": "dialog",
				"aria-expanded": y,
				title: "Board settings",
				children: /* @__PURE__ */ (0, z.jsx)(po, {})
			}), y && /* @__PURE__ */ (0, z.jsxs)(wo, {
				role: "dialog",
				"aria-label": "Board settings",
				children: [
					/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Board settings" }),
					/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)(Ri, {
						as: "span",
						style: { opacity: .75 },
						children: "Finish"
					}), /* @__PURE__ */ (0, z.jsx)(Bi, {
						role: "group",
						"aria-label": "Finish",
						style: {
							marginTop: 6,
							flexWrap: "wrap",
							width: "fit-content"
						},
						children: Object.keys(yr).filter((t) => !e || t !== "flat").map((e) => /* @__PURE__ */ (0, z.jsxs)(Vi, {
							$active: _.finish === e,
							"aria-pressed": _.finish === e,
							onClick: () => S({ finish: e }),
							title: `${yr[e].label} board`,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 6
							},
							children: [/* @__PURE__ */ (0, z.jsx)(To, { $c: yr[e].swatch }), yr[e].label]
						}, e))
					})] }),
					/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)(Ri, {
						as: "span",
						style: { opacity: .75 },
						children: "Inlay"
					}), /* @__PURE__ */ (0, z.jsx)(Bi, {
						role: "group",
						"aria-label": "Inlay",
						style: {
							marginTop: 6,
							flexWrap: "wrap",
							width: "fit-content"
						},
						children: br.map((e) => /* @__PURE__ */ (0, z.jsxs)(Vi, {
							$active: _.inlay === e.id,
							"aria-pressed": _.inlay === e.id,
							onClick: () => S({ inlay: e.id }),
							title: e.full,
							style: {
								display: "flex",
								alignItems: "center",
								gap: 5
							},
							children: [fo[e.id], e.label]
						}, e.id))
					})] }),
					/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)(Ri, {
						as: "span",
						style: { opacity: .75 },
						children: "Bar"
					}), /* @__PURE__ */ (0, z.jsx)(Bi, {
						role: "group",
						"aria-label": "Bar style",
						style: {
							marginTop: 6,
							flexWrap: "wrap",
							width: "fit-content"
						},
						children: xr.map((e) => /* @__PURE__ */ (0, z.jsx)(Vi, {
							$active: _.barStyle === e.id,
							"aria-pressed": _.barStyle === e.id,
							onClick: () => S({ barStyle: e.id }),
							title: e.hint,
							children: e.label
						}, e.id))
					})] }),
					/* @__PURE__ */ (0, z.jsxs)("div", { children: [/* @__PURE__ */ (0, z.jsx)(Ri, {
						as: "span",
						style: { opacity: .75 },
						children: "Details"
					}), /* @__PURE__ */ (0, z.jsxs)(Li, {
						style: {
							marginTop: 6,
							gap: 14,
							flexWrap: "nowrap"
						},
						children: [
							(() => {
								let e = yr[_.finish].grain === "none";
								return /* @__PURE__ */ (0, z.jsxs)(Eo, {
									$disabled: e,
									disabled: e,
									"aria-pressed": _.grain && !e,
									onClick: () => !e && S({ grain: !_.grain }),
									title: e ? `No grain on a ${yr[_.finish].label} board` : "Wood grain texture",
									children: [/* @__PURE__ */ (0, z.jsx)(Do, { $on: _.grain && !e }), "Grain"]
								});
							})(),
							/* @__PURE__ */ (0, z.jsxs)(Eo, {
								"aria-pressed": _.wire,
								onClick: () => S({ wire: !_.wire }),
								title: "Nut, fret wire and fret shadow",
								children: [/* @__PURE__ */ (0, z.jsx)(Do, { $on: _.wire }), "Nut & frets"]
							}),
							/* @__PURE__ */ (0, z.jsxs)(Eo, {
								"aria-pressed": _.gauges,
								onClick: () => S({ gauges: !_.gauges }),
								title: "String gauge variation and sheen",
								children: [/* @__PURE__ */ (0, z.jsx)(Do, { $on: _.gauges }), "Gauges"]
							}),
							/* @__PURE__ */ (0, z.jsxs)(Eo, {
								"aria-pressed": _.side,
								onClick: () => S({ side: !_.side }),
								title: "Fret markers on the neck edge",
								children: [/* @__PURE__ */ (0, z.jsx)(Do, { $on: _.side }), "Side dots"]
							})
						]
					})] })
				]
			})]
		})
	] }), Me = /* @__PURE__ */ (0, z.jsxs)(ho, { children: [
		!e && /* @__PURE__ */ (0, z.jsxs)(go, { children: [/* @__PURE__ */ (0, z.jsxs)(_o, { children: [/* @__PURE__ */ (0, z.jsx)(vo, { children: "Fretboard Visualizer" }), /* @__PURE__ */ (0, z.jsxs)(yo, { children: [
			_i[w.group],
			" · ",
			T,
			" string"
		] })] }), /* @__PURE__ */ (0, z.jsx)(bo, { children: je })] }),
		/* @__PURE__ */ (0, z.jsxs)(Ii, { children: [
			/* @__PURE__ */ (0, z.jsxs)(Li, { children: [
				/* @__PURE__ */ (0, z.jsx)(Fi, {
					tuningId: o.tuningId,
					current: w,
					onSelect: Ce,
					menuRef: ke
				}),
				/* @__PURE__ */ (0, z.jsxs)(Bi, {
					role: "group",
					"aria-label": "Neck view",
					children: [/* @__PURE__ */ (0, z.jsx)(Vi, {
						$active: o.view === "bar",
						"aria-pressed": o.view === "bar",
						onClick: () => C({ view: "bar" }),
						title: "One straight bar across every string — how a lap steel is played",
						children: "Bar"
					}), /* @__PURE__ */ (0, z.jsx)(Vi, {
						$active: o.view === "map",
						"aria-pressed": o.view === "map",
						onClick: () => C({ view: "map" }),
						title: "Every note of the key, everywhere on the neck",
						children: "Map"
					})]
				}),
				e && /* @__PURE__ */ (0, z.jsx)("div", {
					style: {
						marginLeft: "auto",
						display: "flex",
						alignItems: "center",
						gap: 8,
						paddingRight: 30
					},
					children: je
				})
			] }),
			(w.description || w.song) && /* @__PURE__ */ (0, z.jsxs)(zi, { children: [
				w.description,
				w.song && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [" ", /* @__PURE__ */ (0, z.jsx)("strong", { children: w.song })] }),
				w.reentrant && /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [" ", /* @__PURE__ */ (0, z.jsx)("em", { children: "Re-entrant: the strings do not run low-to-high." })] })
			] }),
			o.tuningId === "custom" && /* @__PURE__ */ (0, z.jsxs)(Li, { children: [
				/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Strings" }),
				w.midi.map((e, t) => /* @__PURE__ */ (0, z.jsxs)(ko, { children: [
					/* @__PURE__ */ (0, z.jsx)(Ui, {
						onClick: () => we(t, 1),
						title: "Tune up a semitone",
						children: "▲"
					}),
					/* @__PURE__ */ (0, z.jsx)(Ao, {
						title: `String ${T - t}`,
						children: Qn(e, re)
					}),
					/* @__PURE__ */ (0, z.jsx)(Ui, {
						onClick: () => we(t, -1),
						title: "Tune down a semitone",
						children: "▼"
					})
				] }, t)),
				/* @__PURE__ */ (0, z.jsx)(Hi, {
					onClick: Ee,
					$disabled: T <= 3,
					children: "− string"
				}),
				/* @__PURE__ */ (0, z.jsx)(Hi, {
					onClick: Te,
					$disabled: T >= 10,
					children: "+ string"
				})
			] }),
			/* @__PURE__ */ (0, z.jsxs)(Io, { children: [/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Scale" }), /* @__PURE__ */ (0, z.jsxs)(Li, {
				style: { alignItems: "baseline" },
				children: [/* @__PURE__ */ (0, z.jsxs)(Fo, { children: [
					ne.root,
					" ",
					ne.scale
				] }), /* @__PURE__ */ (0, z.jsx)(Wi, { children: ue.core.join(" · ") })]
			})] }),
			/* @__PURE__ */ (0, z.jsxs)(Io, { children: [/* @__PURE__ */ (0, z.jsx)(Ri, { children: "Chords" }), !F.home && F.degrees.length === 0 && F.others.length === 0 ? /* @__PURE__ */ (0, z.jsxs)(zi, { children: [
				"This tuning stacks no nameable chord — it is a scale ladder or a drone.",
				" ",
				/* @__PURE__ */ (0, z.jsx)("strong", { children: "Map" }),
				" view shows what it is for."
			] }) : /* @__PURE__ */ (0, z.jsxs)(Li, {
				role: "group",
				"aria-label": `Chords this tuning can play, in ${ne.root} ${ne.scale}`,
				children: [
					F.home && Ae(F.home),
					F.degrees.map((e) => Ae(e)),
					k || A ? F.others.map((e, t) => A && pe(e.match) === fe ? Ae(e) : Ae(e, t + 1, A)) : F.others.filter((e) => pe(e.match) === fe).map((e) => Ae(e)),
					F.others.length > 0 && /* @__PURE__ */ (0, z.jsxs)(No, {
						onClick: ae,
						"aria-expanded": k,
						title: k ? "Show only the scale-degree chords" : `Show every chord this tuning can play (${F.others.length} more)`,
						children: [k ? "− less" : `+ ${F.others.length} more`, /* @__PURE__ */ (0, z.jsx)(Po, { children: k ? "degrees only" : "all chords" })]
					})
				]
			})] })
		] }),
		/* @__PURE__ */ (0, z.jsx)(pi, {
			midi: E.midi,
			spellings: E.spellings,
			maxFret: 12,
			barFret: o.barFret,
			onBarFretChange: De,
			view: o.view,
			activeStrings: le,
			rootPc: ce,
			rootHasFlat7: se ? se.match.intervals.includes(10) : !1,
			playingStrings: he,
			onNoteClick: Se,
			scanLabels: N,
			scalePcs: ue.pcs,
			keyRootPc: ue.keyRootPc,
			scaleDegreeLabels: ue.degreeLabels,
			pulled: te,
			baseSpellings: w.spellings,
			flats: re,
			onPlay: h ? void 0 : () => be(P),
			board: _
		})
	] });
	return /* @__PURE__ */ (0, z.jsx)(An, {
		theme: Oe,
		children: e ? /* @__PURE__ */ (0, z.jsx)(Lo, { children: Me }) : /* @__PURE__ */ (0, z.jsxs)(z.Fragment, { children: [/* @__PURE__ */ (0, z.jsx)(mo, {}), Me] })
	});
}, zo = "/* eslint-disable */\n/**\n * steel-ks — a 10-voice Extended Karplus-Strong string bank.\n *\n * Plain dependency-free JS on purpose: Vite ships AudioWorklet modules as raw\n * assets (new URL('./steel-processor.js', import.meta.url)), untranspiled.\n *\n * The design follows Julius O. Smith's EKS reference (ccrma.stanford.edu,\n * \"Making Virtual Electric Guitars and Associated Effects Using Faust\"):\n *   - delay-line loop, read distance D = sampleRate/f − 2 (the FIR3 damping\n *     filter contributes exactly 1 sample of phase delay, the Lagrange read\n *     centering another ~1)\n *   - 4th-order Lagrange fractional-delay read — robust under the gliding\n *     delay of the bar scoop and vibrato (allpass interpolation artifacts\n *     under fast delay changes; linear interp buzzes with light damping)\n *   - linear-phase FIR3 damping  y = ρ·(h0·x1 + h1·(x0 + x2)),\n *     h0 = (1+B)/2, h1 = (1−B)/4 — brightness B never detunes the string\n *   - loop gain ρ = 0.001^(1/(f·t60)) — every register decays −60 dB in the\n *     same t60, so trebles ring like a real steel\n *   - excitation: one period of mean-subtracted white noise, lowpassed by\n *     velocity (louder = brighter pick), minus a pick-position comb copy\n *   - DC blocker outside the loop\n *\n * Messages: {type:'pluck', voice, freq, vel, when, gl, gr}\n *           {type:'off', voice, when}   — damp like blocking (t60 0.2 s)\n *           {type:'alloff', when}\n */\n\nconst NV = 10;\nconst BUFLEN = 4096; // power of two; covers fundamentals down to ~12 Hz\nconst MASK = BUFLEN - 1;\n\nconst BRIGHTNESS = 0.72; // steel range 0.6–0.8 (0.5 = ordinary guitar)\nconst T60_HELD = 6.0; // seconds — pedal-steel sustain band 4–8 s\nconst T60_RELEASE = 0.2; // blocking damp on note-off\nconst SCOOP_CENTS = -45; // bar slides in from below\nconst SCOOP_TAU = 0.02; // exponential approach, ~95% settled at 60 ms\nconst VIB_RATE = 5.7; // Hz — classic bar vibrato band 5–6.5\nconst VIB_DEPTH = 0.00695; // ±12 cents as a frequency ratio\nconst VIB_START = 0.35; // silent until the note settles…\nconst VIB_FULL = 0.7; // …full depth by here\nconst PICK_POS = 0.12; // β: pick-position comb, near-bridge steel picking\nconst IDLE_LEVEL = 3.2e-5; // −90 dB — below this a voice stops burning CPU\n\nconst H0 = (1 + BRIGHTNESS) / 2;\nconst H1 = (1 - BRIGHTNESS) / 4;\nconst SCOOP_DEPTH = 1 - Math.pow(2, SCOOP_CENTS / 1200); // ≈ 0.0257\n\nclass SteelKS extends AudioWorkletProcessor {\n  constructor() {\n    super();\n    this.voices = [];\n    for (let v = 0; v < NV; v++) {\n      this.voices.push({\n        active: false,\n        buf: new Float32Array(BUFLEN),\n        wi: 0,\n        freq: 220,\n        rho: 0.999,\n        x1: 0,\n        x2: 0,\n        dcX: 0,\n        dcY: 0,\n        exc: null,\n        excPos: 0,\n        scoopEnv: 0, // 1 → 0 exponential; f = freq·(1 − depth·env)\n        vibPhase: 0,\n        age: 0, // frames since pluck\n        peak: 0,\n        gl: 0.5,\n        gr: 0.5,\n      });\n    }\n    this.pending = [];\n    this.scoopDecay = Math.exp(-1 / (SCOOP_TAU * sampleRate));\n    this.vibInc = (2 * Math.PI * VIB_RATE) / sampleRate;\n    this.port.onmessage = (e) => {\n      const m = e.data;\n      if (m && (m.type === 'pluck' || m.type === 'off' || m.type === 'alloff')) {\n        this.pending.push(m);\n      }\n    };\n  }\n\n  makeBurst(freq, vel) {\n    const P = Math.max(2, Math.round(sampleRate / freq));\n    const burst = new Float32Array(P);\n    let mean = 0;\n    for (let i = 0; i < P; i++) {\n      burst[i] = Math.random() * 2 - 1;\n      mean += burst[i];\n    }\n    mean /= P;\n    // Mean-subtract: DC never decays inside the loop.\n    for (let i = 0; i < P; i++) burst[i] -= mean;\n    // Velocity → pick brightness: one-pole lowpass, bw = 300 + vel·9000 Hz.\n    const bw = 300 + vel * 9000;\n    const R = Math.exp((-Math.PI * bw) / sampleRate);\n    let y = 0;\n    for (let i = 0; i < P; i++) {\n      y = (1 - R) * burst[i] + R * y;\n      burst[i] = y;\n    }\n    // Pick-position comb: subtract a copy delayed by β·P (spectral zeros at\n    // the harmonics with a node under the pick).\n    const combD = Math.max(1, Math.floor(PICK_POS * P));\n    for (let i = P - 1; i >= combD; i--) burst[i] -= burst[i - combD];\n    // Headroom for ten voices before the bus compressor.\n    const g = 0.6 * vel;\n    for (let i = 0; i < P; i++) burst[i] *= g;\n    return burst;\n  }\n\n  rhoFor(freq, t60) {\n    return Math.pow(0.001, 1 / (Math.max(20, freq) * t60));\n  }\n\n  handleMsg(m) {\n    if (m.type === 'alloff') {\n      for (const v of this.voices) {\n        if (v.active) v.rho = this.rhoFor(v.freq, T60_RELEASE);\n      }\n      return;\n    }\n    const v = this.voices[m.voice];\n    if (!v) return;\n    if (m.type === 'off') {\n      if (v.active) v.rho = this.rhoFor(v.freq, T60_RELEASE);\n      return;\n    }\n    // pluck\n    if (!v.active) {\n      v.buf.fill(0);\n      v.x1 = 0;\n      v.x2 = 0;\n      v.dcX = 0;\n      v.dcY = 0;\n      v.wi = 0;\n    }\n    v.active = true;\n    v.freq = m.freq;\n    v.rho = this.rhoFor(m.freq, T60_HELD);\n    v.exc = this.makeBurst(m.freq, m.vel);\n    v.excPos = 0;\n    v.scoopEnv = 1;\n    v.vibPhase = 0;\n    v.age = 0;\n    v.peak = 1; // give the new note a grace period before idle detection\n    v.gl = typeof m.gl === 'number' ? m.gl : 0.5;\n    v.gr = typeof m.gr === 'number' ? m.gr : 0.5;\n  }\n\n  process(_inputs, outputs) {\n    const out = outputs[0];\n    const L = out[0];\n    const R = out[1] || out[0];\n    const frames = L.length;\n    L.fill(0);\n    if (R !== L) R.fill(0);\n\n    // Fire any messages due within this block (sample-accurate via `when`).\n    const tBlock = currentFrame / sampleRate;\n    const tEnd = tBlock + frames / sampleRate;\n    if (this.pending.length) {\n      const later = [];\n      for (const m of this.pending) {\n        const when = m.when || 0;\n        if (when < tEnd) {\n          m._offset = Math.max(0, Math.round((when - tBlock) * sampleRate));\n          if (m._offset >= frames) m._offset = frames - 1;\n          later.push(m); // handled inside the sample loop below\n        } else {\n          later.push(m);\n        }\n      }\n      this.pending = later;\n    }\n\n    for (let i = 0; i < frames; i++) {\n      // activate messages scheduled for this exact frame\n      if (this.pending.length) {\n        for (let k = 0; k < this.pending.length; k++) {\n          const m = this.pending[k];\n          if (m._offset === i && (m.when || 0) < tEnd) {\n            this.handleMsg(m);\n            this.pending.splice(k, 1);\n            k--;\n          }\n        }\n      }\n\n      for (let vi = 0; vi < NV; vi++) {\n        const v = this.voices[vi];\n        if (!v.active) continue;\n\n        // Current pitch: scoop from below + delayed-onset bar vibrato.\n        const tAge = v.age / sampleRate;\n        let f = v.freq * (1 - SCOOP_DEPTH * v.scoopEnv);\n        if (tAge > VIB_START) {\n          const env = Math.min(1, (tAge - VIB_START) / (VIB_FULL - VIB_START));\n          f *= 1 + VIB_DEPTH * env * Math.sin(v.vibPhase);\n        }\n        v.scoopEnv *= this.scoopDecay;\n        v.vibPhase += this.vibInc;\n\n        // Loop delay: the loop period is D + 1 (the FIR3's one sample of\n        // phase delay; the write→read round trip supplies D exactly, and the\n        // Lagrange read is centred on D). Verified by offline measurement:\n        // D = sr/f − 2 rendered +19 cents sharp at 660 Hz; − 1 is exact.\n        let D = sampleRate / f - 1;\n        if (D < 4) D = 4;\n        if (D > BUFLEN - 8) D = BUFLEN - 8;\n\n        // 4th-order Lagrange read (JOS fdelay4): taps id..id+4, fd ∈ [1.5,2.5)\n        const id = Math.floor(D - 1.499995);\n        const fd = D - id;\n        const a = fd - 1, b = fd - 2, c = fd - 3, d = fd - 4;\n        const w0 = (a * b * c * d) / 24;\n        const w1 = (-fd * b * c * d) / 6;\n        const w2 = (fd * a * c * d) / 4;\n        const w3 = (-fd * a * b * d) / 6;\n        const w4 = (fd * a * b * c) / 24;\n        const base = v.wi - id;\n        const x0 =\n          w0 * v.buf[base & MASK] +\n          w1 * v.buf[(base - 1) & MASK] +\n          w2 * v.buf[(base - 2) & MASK] +\n          w3 * v.buf[(base - 3) & MASK] +\n          w4 * v.buf[(base - 4) & MASK];\n\n        // FIR3 damping × loop gain (linear phase: brightness never detunes).\n        let y = v.rho * (H0 * v.x1 + H1 * (x0 + v.x2));\n        v.x2 = v.x1;\n        v.x1 = x0;\n\n        // Inject the pick burst as loop input over its first period.\n        if (v.exc && v.excPos < v.exc.length) {\n          y += v.exc[v.excPos++];\n          if (v.excPos >= v.exc.length) v.exc = null;\n        }\n        v.buf[v.wi & MASK] = y;\n        v.wi = (v.wi + 1) & MASK;\n\n        // DC blocker OUTSIDE the loop (adds no loop phase → no detune).\n        const dc = y - v.dcX + 0.995 * v.dcY;\n        v.dcX = y;\n        v.dcY = dc;\n\n        L[i] += dc * v.gl;\n        R[i] += dc * v.gr;\n\n        // Idle detection: silent strings must not burn CPU.\n        const mag = dc < 0 ? -dc : dc;\n        v.peak = mag > v.peak ? mag : v.peak * 0.99995;\n        v.age++;\n        if (v.age > sampleRate && v.peak < IDLE_LEVEL) {\n          v.active = false;\n          v.exc = null;\n        }\n      }\n    }\n    return true;\n  }\n}\n\nregisterProcessor('steel-ks', SteelKS);\n", Bo = "1.0.0", Vo = null;
Va(() => Vo ??= URL.createObjectURL(new Blob([zo], { type: "text/javascript" })));
var Ho = (e) => {
	let t = {};
	for (let [n, r] of Object.entries(e ?? {})) r !== void 0 && (t[n] = r);
	return t;
};
function Uo(e) {
	let t = e.base === "light" ? qi : Ki;
	return {
		...t,
		...Ho(e.fonts),
		colors: {
			...t.colors,
			...Ho(e.colors)
		}
	};
}
var Wo = (e) => e.trim().toLowerCase().replace(/\s+/g, " "), Go = new Map(hi.map((e) => [Wo(e.name), e.id])), Ko = [
	["E9 lap", "e9-lap"],
	["Open G Dobro", "open-g-dobro"],
	["Open G low", "open-g-low"],
	["Open A high", "open-a-high"]
], qo = new Map(Ko.map(([e, t]) => [Wo(e), t])), Jo = new Map(Ko.map(([e, t]) => [t, e]));
function Yo(e) {
	let t = Wo(e);
	return Go.get(t) ?? qo.get(t) ?? null;
}
function Xo(e) {
	return Jo.get(e) ?? bi(e)?.name ?? null;
}
var Zo = (e) => e === "light" ? qi : e === "dark" || e == null ? Ki : e;
function Qo(e, t = {}) {
	let n = null, r = 0, i = {}, a = () => {
		let [e, a] = (0, L.useState)(() => Zo(t.theme)), [o, s] = (0, L.useState)(() => t.tuningId && bi(t.tuningId) ? {
			kind: "id",
			id: t.tuningId,
			n: ++r
		} : null), [c, l] = (0, L.useState)(null);
		return (0, L.useEffect)(() => (i.setTheme = a, i.setExt = s, i.setPulls = l, i.pendingTheme && a(i.pendingTheme), i.pendingExt && s(i.pendingExt), i.pendingPulls && l(i.pendingPulls), i.pendingTheme = void 0, i.pendingExt = void 0, i.pendingPulls = void 0, () => {
			i.setTheme = void 0, i.setExt = void 0, i.setPulls = void 0;
		}), []), /* @__PURE__ */ (0, z.jsx)(Ro, {
			embedded: !0,
			embedTheme: e,
			externalTuning: o,
			externalPulls: c,
			onTuningChange: t.onTuningChange,
			registerEmbedHandlers: (e) => {
				n = e;
			}
		});
	}, o = (0, Be.createRoot)(e);
	o.render(/* @__PURE__ */ (0, z.jsx)(a, {}));
	let s = (e) => {
		i.setExt ? i.setExt(e) : i.pendingExt = e;
	};
	return {
		version: Bo,
		setTuning(e) {
			bi(e) && s({
				kind: "id",
				id: e,
				n: ++r
			});
		},
		setCustomTuning(e) {
			Array.isArray(e) && e.length >= 3 && e.length <= 10 && s({
				kind: "custom",
				midi: [...e],
				n: ++r
			});
		},
		setTheme(e) {
			let t = Zo(e);
			i.setTheme ? i.setTheme(t) : i.pendingTheme = t;
		},
		setPulls(e) {
			if (!Array.isArray(e)) return;
			let t = {
				vals: e.map((e) => Math.round(Number(e) || 0)),
				n: ++r
			};
			i.setPulls ? i.setPulls(t) : i.pendingPulls = t;
		},
		closeTopLayer() {
			return n?.closeTopLayer() ?? !1;
		},
		stopAudio() {
			n?.stopAudio();
		},
		unmount() {
			n?.stopAudio(), o.unmount();
		}
	};
}
//#endregion
export { Bo as EMBED_VERSION, Uo as makeEmbedTheme, Qo as mountFretboard, Yo as tuningIdForName, Xo as tuningNameForId };
