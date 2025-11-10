(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/button.tsx",
        lineNumber: 42,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const anhartLogo = "/images/anhart-logo-text.png";
const navigation = [
    {
        name: "Home",
        href: "/"
    }
];
const aboutUsDropdown = [
    {
        name: "Our Story",
        href: "/about"
    },
    {
        name: "News & Media",
        href: "/media"
    },
    {
        name: "Blog",
        href: "/blog"
    }
];
const portfolioDropdown = [
    {
        name: "Projects",
        href: "/portfolio"
    },
    {
        name: "Impact Investing",
        href: "/limited-partnership"
    }
];
const connectDropdown = [
    {
        name: "Partner With Us",
        href: "/partner"
    },
    {
        name: "Contact Us",
        href: "/contact"
    }
];
const Header = ()=>{
    _s();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Desktop dropdown states
    const [aboutUsDropdownOpen, setAboutUsDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [portfolioDropdownOpen, setPortfolioDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connectDropdownOpen, setConnectDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mobile accordion state
    const [activeMobileDropdown, setActiveMobileDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Smooth scroll detection with throttling
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            let ticking = false;
            const handleScroll = {
                "Header.useEffect.handleScroll": ()=>{
                    if (!ticking) {
                        requestAnimationFrame({
                            "Header.useEffect.handleScroll": ()=>{
                                const scrollPosition = window.scrollY;
                                setIsScrolled(scrollPosition > 50);
                                ticking = false;
                            }
                        }["Header.useEffect.handleScroll"]);
                        ticking = true;
                    }
                }
            }["Header.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "Header.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    // Esc key to close mobile menu
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleEscape = {
                "Header.useEffect.handleEscape": (e)=>{
                    if (e.key === "Escape" && mobileMenuOpen) setMobileMenuOpen(false);
                }
            }["Header.useEffect.handleEscape"];
            if (mobileMenuOpen) {
                document.addEventListener("keydown", handleEscape);
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
            return ({
                "Header.useEffect": ()=>{
                    document.removeEventListener("keydown", handleEscape);
                    document.body.style.overflow = "";
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        mobileMenuOpen
    ]);
    const toggleMobileMenu = ()=>{
        setMobileMenuOpen(!mobileMenuOpen);
        if (mobileMenuOpen) {
            setActiveMobileDropdown(null);
        }
    };
    const handleMobileDropdownToggle = (dropdownName)=>{
        setActiveMobileDropdown(activeMobileDropdown === dropdownName ? null : dropdownName);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: `header ${isScrolled ? "shrunk" : ""}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 h-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex lg:flex-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/",
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: anhartLogo,
                                    alt: "Anhart",
                                    className: "header-logo",
                                    width: "405",
                                    height: "160",
                                    loading: "eager",
                                    fetchPriority: "high"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 92,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex lg:hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "icon",
                                onClick: toggleMobileMenu,
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-9 w-9"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 99,
                                    columnNumber: 33
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-9 w-9"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 99,
                                    columnNumber: 61
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex lg:gap-x-6 lg:ml-auto lg:mr-4 text-lg",
                            children: [
                                navigation.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: item.href,
                                        className: "header-nav-link pt-2.5",
                                        children: item.name
                                    }, item.name, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    title: "About Us",
                                    items: aboutUsDropdown,
                                    open: aboutUsDropdownOpen,
                                    setOpen: setAboutUsDropdownOpen
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    title: "Portfolio",
                                    items: portfolioDropdown,
                                    open: portfolioDropdownOpen,
                                    setOpen: setPortfolioDropdownOpen
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dropdown, {
                                    title: "Connect With Us",
                                    items: connectDropdown,
                                    open: connectDropdownOpen,
                                    setOpen: setConnectDropdownOpen
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `lg:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none -z-10"}`,
                onClick: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileMenu, {
                open: mobileMenuOpen,
                navigation: navigation,
                aboutUsDropdown: aboutUsDropdown,
                portfolioDropdown: portfolioDropdown,
                connectDropdown: connectDropdown,
                activeMobileDropdown: activeMobileDropdown,
                onDropdownToggle: handleMobileDropdownToggle,
                closeMenu: ()=>setMobileMenuOpen(false)
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(Header, "0Y+zPggliQBCa+jNOSm+pLaVnII=");
_c = Header;
const Dropdown = ({ title, items, open, setOpen })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "header-nav-link flex items-center",
                onMouseEnter: ()=>setOpen(true),
                onMouseLeave: ()=>setOpen(false),
                onClick: ()=>setOpen(!open),
                children: [
                    title,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "ml-1 h-7 w-7"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                        lineNumber: 167,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 160,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-full left-0 mt-1 w-48 bg-background/95 backdrop-blur-md border border-border shadow-lg z-50 transition-all duration-200 overflow-hidden rounded-lg ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`,
                onMouseEnter: ()=>setOpen(true),
                onMouseLeave: ()=>setOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "py-2",
                    children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.href,
                            className: "block px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-150 border-l-2 border-transparent",
                            style: {
                                transitionDelay: `${index * 25}ms`
                            },
                            children: item.name
                        }, item.name, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                    lineNumber: 176,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 169,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
        lineNumber: 159,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = Dropdown;
const MobileMenu = ({ open, navigation, aboutUsDropdown, portfolioDropdown, connectDropdown, activeMobileDropdown, onDropdownToggle, closeMenu })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lg:hidden fixed top-0 bottom-0 z-50 max-w-[80vw] w-80 overflow-y-auto bg-background/95 backdrop-blur-md border-r border-border shadow-2xl transition-transform duration-300",
        style: {
            transform: open ? "translateX(0)" : "translateX(-100%)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-6 border-b border-border bg-background/80 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: anhartLogo,
                        alt: "Anhart",
                        className: "h-10 w-auto",
                        width: "405",
                        height: "160",
                        loading: "lazy"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                    lineNumber: 208,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 207,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-6 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "space-y-1",
                    role: "navigation",
                    children: [
                        navigation.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: item.href,
                                className: "block px-4 py-3 text-base font-semibold text-foreground hover:text-primary rounded-lg transition-all duration-200",
                                onClick: closeMenu,
                                children: item.name
                            }, item.name, false, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordionDropdown, {
                            title: "About Us",
                            items: aboutUsDropdown,
                            isOpen: activeMobileDropdown === "about-us",
                            onToggle: ()=>onDropdownToggle("about-us"),
                            closeMenu: closeMenu
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 226,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordionDropdown, {
                            title: "Portfolio",
                            items: portfolioDropdown,
                            isOpen: activeMobileDropdown === "portfolio",
                            onToggle: ()=>onDropdownToggle("portfolio"),
                            closeMenu: closeMenu
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 233,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileAccordionDropdown, {
                            title: "Connect With Us",
                            items: connectDropdown,
                            isOpen: activeMobileDropdown === "connect",
                            onToggle: ()=>onDropdownToggle("connect"),
                            closeMenu: closeMenu
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 240,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                    lineNumber: 214,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 213,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
        lineNumber: 202,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c2 = MobileMenu;
const MobileAccordionDropdown = ({ title, items, isOpen, onToggle, closeMenu })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-foreground hover:text-primary rounded-lg transition-all duration-200",
                onClick: onToggle,
                children: [
                    title,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: `ml-1 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                        lineNumber: 271,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 266,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60" : "max-h-0"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-1 space-y-1",
                    children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: item.href,
                            className: "block px-8 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg transition-all duration-200 ml-4",
                            onClick: closeMenu,
                            children: item.name
                        }, item.name, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                    lineNumber: 274,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
                lineNumber: 273,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx",
        lineNumber: 265,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = MobileAccordionDropdown;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Header");
__turbopack_context__.k.register(_c1, "Dropdown");
__turbopack_context__.k.register(_c2, "MobileMenu");
__turbopack_context__.k.register(_c3, "MobileAccordionDropdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/use-toast.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-client] (ecmascript)");
'use client';
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/facebook.js [app-client] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/anhart-logo-white.png.mjs { IMAGE => "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/anhart-logo-white.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/config/address.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$utils$2f$externalLinks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/utils/externalLinks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useNewsletterSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useNewsletterSubscription.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// Social media links - only used section
const socialLinks = [
    {
        name: "Facebook",
        href: "https://www.facebook.com/anhartsolutions?rdid=RVW0ZiZ1JKyW8dI3&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FnG5gD4iinFYGjyeT%2F",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"]
    },
    {
        name: "Twitter",
        href: "https://x.com/anharthousing",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"]
    },
    {
        name: "LinkedIn",
        href: "https://ca.linkedin.com/company/anhart",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"]
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/anharthousing/",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"]
    }
];
const Footer = ()=>{
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { subscribe, isSubmitting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useNewsletterSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNewsletterSubscription"])();
    const handleNewsletterSubmit = async (e)=>{
        e.preventDefault();
        const success = await subscribe(email);
        if (success) {
            setEmail(""); // Clear form on success
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-foreground text-background",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:grid lg:grid-cols-3 lg:gap-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        className: "h-12 w-auto",
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                        alt: "Anhart",
                                        width: "405",
                                        height: "160",
                                        loading: "lazy"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-base leading-7 text-background/90 font-medium",
                                            children: "Building communities through affordable housing."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm leading-6 text-background/80",
                                            children: "Creating inclusive, sustainable communities where everyone has access to safe, quality homes across Canada."
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                            lineNumber: 56,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-6",
                                    children: socialLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-background/70 hover:text-background transition-colors duration-200",
                                            "aria-label": `Follow us on ${item.name}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                className: "h-6 w-6"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 62,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.name, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 42
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "col-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold leading-7 text-background mb-6",
                                                children: "Get In Touch"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: "text-sm font-semibold text-background mb-2 flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                        className: "h-4 w-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                        lineNumber: 79,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    "Main Office"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 78,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$utils$2f$externalLinks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openGoogleMapsSearch"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressUtils"].getGoogleMapsAddress()),
                                                                className: "block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 group text-left focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded p-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("address", {
                                                                    className: "not-italic group-hover:underline",
                                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressUtils"].getAddressLines().map((line, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Fragment, {
                                                                            children: [
                                                                                line,
                                                                                index < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressUtils"].getAddressLines().length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                                    lineNumber: 86,
                                                                                    columnNumber: 85
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, index, true, {
                                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                            lineNumber: 84,
                                                                            columnNumber: 80
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                    lineNumber: 83,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pl-[2px]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-sm font-semibold text-background mb-2",
                                                                        children: "Phone"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                        lineNumber: 94,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone.replace(/[^\d]/g, '')}`,
                                                                        className: "block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 pl-[6px] pr-[1px] -ml-1 focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded",
                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                        lineNumber: 95,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 93,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "pl-[2px]",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "text-sm font-semibold text-background mb-2",
                                                                        children: "Email"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                        lineNumber: 100,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
                                                                        className: "block text-sm leading-6 text-background/80 hover:text-background transition-colors duration-200 pl-[6px] pr-[1px] -ml-1 focus:outline-none focus:ring-2 focus:ring-background/50 focus:ring-opacity-50 rounded",
                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                        lineNumber: 101,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                        lineNumber: 92,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 76,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold leading-7 text-background mb-6",
                                                children: "Stay Updated"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 113,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm leading-6 text-background/80",
                                                        children: "Subscribe to our newsletter for the latest housing news, project updates, and community impact stories."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                        onSubmit: handleNewsletterSubmit,
                                                        className: "flex gap-x-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "email",
                                                                placeholder: "Enter your email",
                                                                value: email,
                                                                onChange: (e)=>setEmail(e.target.value),
                                                                required: true,
                                                                disabled: isSubmitting,
                                                                className: "flex-1 bg-background/10 text-background placeholder:text-background/60 border-background/30 focus:border-background/50"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                type: "submit",
                                                                variant: "secondary",
                                                                size: "sm",
                                                                className: "px-4",
                                                                disabled: isSubmitting,
                                                                "aria-label": "Subscribe to newsletter",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                    lineNumber: 123,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs text-background/60",
                                                        children: "We respect your privacy. Unsubscribe at any time."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                        lineNumber: 126,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 116,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 68,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                    lineNumber: 48,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden md:block lg:hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-8 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            className: "h-10 w-auto",
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                            alt: "Anhart",
                                            width: "405",
                                            height: "160",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                            lineNumber: 141,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm leading-6 text-background/90",
                                        children: "Building communities through affordable housing solutions."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-4",
                                        children: socialLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: item.href,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "text-background/70 hover:text-background transition-colors duration-200",
                                                "aria-label": `Follow us on ${item.name}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                    lineNumber: 148,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, item.name, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 147,
                                                columnNumber: 44
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 146,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-semibold text-background",
                                        children: "Contact"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 155,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone.replace(/[^\d]/g, '')}`,
                                                    className: "text-sm text-background/80 hover:text-background transition-colors block",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 157,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
                                                    className: "text-sm text-background/80 hover:text-background transition-colors block",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$utils$2f$externalLinks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openGoogleMapsSearch"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddressUtils"].getGoogleMapsAddress()),
                                                    className: "text-sm text-background/80 hover:text-background transition-colors text-left focus:outline-none",
                                                    children: "Vancouver, BC Office"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                    lineNumber: 168,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 167,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 156,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                    lineNumber: 136,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "md:hidden space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    className: "h-8 w-auto mx-auto",
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$anhart$2d$logo$2d$white$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                    alt: "Anhart",
                                    width: "405",
                                    height: "160",
                                    loading: "lazy"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-background/90",
                                    children: "Building communities through affordable housing solutions."
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 180,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center space-x-6 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `tel:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone.replace(/[^\d]/g, '')}`,
                                    className: "text-sm text-background/80 hover:text-background transition-colors",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phone
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$config$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].email}`,
                                    className: "text-sm text-background/80 hover:text-background transition-colors",
                                    children: "info@anhart.ca"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 192,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center space-x-4",
                                    children: socialLinks.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: item.href,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "text-background/70 hover:text-background transition-colors duration-200",
                                            "aria-label": `Follow us on ${item.name}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 200,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.name, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                            lineNumber: 199,
                                            columnNumber: 42
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 198,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleNewsletterSubmit,
                                        className: "flex gap-x-2 max-w-xs mx-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "email",
                                                placeholder: "Email for updates",
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                required: true,
                                                disabled: isSubmitting,
                                                className: "flex-1 bg-background/10 text-background placeholder:text-background/60 border-background/30 focus:border-background/50 text-xs"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 207,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                type: "submit",
                                                variant: "secondary",
                                                size: "sm",
                                                className: "px-2",
                                                disabled: isSubmitting,
                                                "aria-label": "Subscribe to newsletter",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                    className: "h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                                lineNumber: 216,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                        lineNumber: 206,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                    lineNumber: 205,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 196,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                    lineNumber: 178,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 md:mt-12 lg:mt-16 border-t border-background/20 pt-4 lg:pt-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://digitalbookkeeper.ca/Staff/",
                            className: "text-sm sm:text-base md:text-lg lg:text-xl font-medium text-background hover:text-background/80 transition-colors duration-200 underline hover:no-underline",
                            children: "Staff Login"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                            lineNumber: 234,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                        lineNumber: 233,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                    lineNumber: 232,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 border-t border-background/20 pt-6 lg:pt-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs leading-5 text-background/70",
                                children: "© 2025 Anhart Affordable Housing · Shared with the community."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                lineNumber: 246,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs leading-5 text-background/70 mt-2",
                                children: "This work is released under a Community Commons philosophy—free to use, adapt, and share for the public good."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                                lineNumber: 249,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                        lineNumber: 245,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
                    lineNumber: 244,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
            lineNumber: 45,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Footer, "32LeRBbRt32ct/wVEy3k+gFBvBU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useNewsletterSubscription$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNewsletterSubscription"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$noop$2d$head$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/client/components/noop-head.js [app-client] (ecmascript)");
;
;
const SEO = ({ title = "Anhart Affordable Housing - Building Communities Through Housing Solutions", description = "Anhart Affordable Housing provides innovative affordable housing solutions coast to coast to coast. We lead, support, and advocate for non-profit housing that creates inclusive communities.", keywords = "affordable housing, SROs, modular homes, non-profit housing, low-income housing, subsidized housing, below-market housing, supportive housing, inclusionary housing, affordability, micro-suites, micro-units, vacancy development, derelict homes, single room occupancy, social housing, community housing, rental housing, housing continuum, transitional housing, Vancouver, Toronto, Calgary, Edmonton, Winnipeg, Ottawa, Hamilton, London, BC, Alberta, Manitoba, Ontario, Canada, housing development, housing solutions, community development, sustainable housing, housing policy, housing finance, community planning, affordable housing Vancouver, affordable housing Toronto, affordable housing Calgary, affordable housing Edmonton, affordable housing Winnipeg, SRO conversion Vancouver, SRO conversion Toronto, modular housing BC, modular housing Alberta, modular housing Ontario, micro-suites Vancouver, micro-suites Toronto, supportive housing Calgary, supportive housing Winnipeg", image = "/images/anhart-logo.png", url = "https://anhart.ca", type = "website", structuredData })=>{
    const fullTitle = title.includes("Anhart") ? title : `${title} | Anhart Affordable Housing`;
    const fullUrl = url.startsWith("http") ? url : `https://anhart.ca${url}`;
    const fullImage = image.startsWith("http") ? image : `https://anhart.ca${image}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$noop$2d$head$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: fullTitle
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "description",
                content: description
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "keywords",
                content: keywords
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "author",
                content: "Anhart Affordable Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "robots",
                content: "index, follow"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "canonical",
                href: fullUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:title",
                content: fullTitle
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:description",
                content: description
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:type",
                content: type
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:url",
                content: fullUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image",
                content: fullImage
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image:width",
                content: "1200"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:image:height",
                content: "630"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:site_name",
                content: "Anhart Affordable Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:locale",
                content: "en_CA"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:title",
                content: fullTitle
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:description",
                content: description
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:image",
                content: fullImage
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:site",
                content: "@anhart_housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:creator",
                content: "@anhart_housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "theme-color",
                content: "#1e40af"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-TileColor",
                content: "#1e40af"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "language",
                content: "en-CA"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.region",
                content: "CA"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.placename",
                content: "Canada"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.position",
                content: "49.2827;-123.1207"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "ICBM",
                content: "49.2827, -123.1207"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.region",
                content: "CA-BC"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.region",
                content: "CA-AB"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.region",
                content: "CA-MB"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.region",
                content: "CA-ON"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "geo.placename",
                content: "Vancouver, Toronto, Calgary, Edmonton, Winnipeg, Ottawa, Hamilton, London"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "distribution",
                content: "global"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "rating",
                content: "general"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "revisit-after",
                content: "7 days"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "target",
                content: "all"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "audience",
                content: "all"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "coverage",
                content: "worldwide"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "classification",
                content: "business"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "category",
                content: "non-profit housing development"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "subject",
                content: "affordable housing, community development, social housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "abstract",
                content: "Anhart Affordable Housing develops innovative affordable housing solutions including SROs, modular homes, micro-suites, and supportive housing across Canada."
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "summary",
                content: "Leading non-profit affordable housing development organization creating inclusive communities through innovative housing solutions."
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "designer",
                content: "Anhart Development Team"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "copyright",
                content: "Anhart Affordable Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "reply-to",
                content: "info@anhart.ca"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "owner",
                content: "Anhart Affordable Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "url",
                content: fullUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "identifier-URL",
                content: fullUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "directory",
                content: "submission"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "pagename",
                content: title
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "category",
                content: "Housing, Non-Profit, Community Development"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "coverage",
                content: "Worldwide"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "distribution",
                content: "Global"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "rating",
                content: "General"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "revisit-after",
                content: "7 days"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "expires",
                content: "never"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "googlebot",
                content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "bingbot",
                content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:updated_time",
                content: new Date().toISOString()
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:see_also",
                content: "https://anhart.ca/portfolio"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:see_also",
                content: "https://anhart.ca/about"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                property: "og:see_also",
                content: "https://anhart.ca/contact"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:domain",
                content: "anhart.ca"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:url",
                content: fullUrl
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:label1",
                content: "Housing Type"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:data1",
                content: "Affordable Housing Development"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:label2",
                content: "Service Area"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "twitter:data2",
                content: "Canada"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "mobile-web-app-capable",
                content: "yes"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "apple-mobile-web-app-capable",
                content: "yes"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "apple-mobile-web-app-status-bar-style",
                content: "default"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "apple-mobile-web-app-title",
                content: "Anhart Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "application-name",
                content: "Anhart Affordable Housing"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-tooltip",
                content: "Anhart Affordable Housing - Building Communities Through Housing Solutions"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-starturl",
                content: "/"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-navbutton-color",
                content: "#1e40af"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-TileColor",
                content: "#1e40af"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                name: "msapplication-TileImage",
                content: "/images/anhart-logo.png"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "preconnect",
                href: "https://fonts.googleapis.com"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "preconnect",
                href: "https://fonts.gstatic.com",
                crossOrigin: "anonymous"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "preconnect",
                href: "https://www.google-analytics.com"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "dns-prefetch",
                href: "//fonts.googleapis.com"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                rel: "dns-prefetch",
                href: "//www.google-analytics.com"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            structuredData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: Array.isArray(structuredData) ? structuredData.map((data, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                        type: "application/ld+json",
                        children: JSON.stringify(data)
                    }, index, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                        lineNumber: 128,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("script", {
                    type: "application/ld+json",
                    children: JSON.stringify(structuredData)
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
                    lineNumber: 133,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = SEO;
const __TURBOPACK__default__export__ = SEO;
var _c;
__turbopack_context__.k.register(_c, "SEO");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 32,
        columnNumber: 37
    }, ("TURBOPACK compile-time value", void 0)));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/skeleton.tsx",
        lineNumber: 4,
        columnNumber: 10
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OptimizedImage",
    ()=>OptimizedImage,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/services/imageService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const OptimizedImage = ({ imageName, alt, category = 'project', format = 'webp', size = 'lg', className = '', loading = 'lazy', priority = false, aspectRatio, sizes, onLoad, onError, children })=>{
    _s();
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Get configuration from category
    const config = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageService"].getImageConfig(category);
    // Use provided props or fall back to config
    const finalAspectRatio = aspectRatio || config.aspectRatio;
    const finalSizes = sizes || config.sizes;
    const finalPriority = priority || config.priority;
    const finalLoading = loading || config.loading;
    const handleLoad = ()=>{
        setIsLoaded(true);
        onLoad?.();
    };
    const handleError = ()=>{
        setHasError(true);
        onError?.();
    };
    // Generate srcSet for responsive images
    const webpSrcSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OptimizedImage.useMemo[webpSrcSet]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageService"].getImageSrcSet(imageName, 'webp')
    }["OptimizedImage.useMemo[webpSrcSet]"], [
        imageName
    ]);
    const avifSrcSet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OptimizedImage.useMemo[avifSrcSet]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageService"].getImageSrcSet(imageName, 'avif')
    }["OptimizedImage.useMemo[avifSrcSet]"], [
        imageName
    ]);
    const fallbackSrc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OptimizedImage.useMemo[fallbackSrc]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageService"].getImageSrc(imageName, 'fallback', size)
    }["OptimizedImage.useMemo[fallbackSrc]"], [
        imageName,
        size
    ]);
    // Check if image exists
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$services$2f$imageService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageService"].hasImage(imageName)) {
        console.warn(`Image ${imageName} not found in registry`);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `relative overflow-hidden bg-gray-100 flex items-center justify-center ${className}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm text-gray-500",
                children: "Image not found"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `relative overflow-hidden ${className}`,
        children: [
            !isLoaded && !hasError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                className: "absolute inset-0"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                        type: "image/avif",
                        srcSet: avifSrcSet,
                        sizes: finalSizes
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                        type: "image/webp",
                        srcSet: webpSrcSet,
                        sizes: finalSizes
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: hasError ? '/placeholder.svg' : fallbackSrc,
                        alt: alt,
                        loading: finalPriority ? 'eager' : finalLoading,
                        onLoad: handleLoad,
                        onError: handleError,
                        className: `transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} w-full h-full object-cover`,
                        style: {
                            aspectRatio: finalAspectRatio
                        },
                        decoding: "async",
                        fetchPriority: finalPriority ? 'high' : 'auto'
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(OptimizedImage, "2wDLQcf2rKtGVlaCswE/nDpTMQY=");
_c = OptimizedImage;
const __TURBOPACK__default__export__ = OptimizedImage;
var _c;
__turbopack_context__.k.register(_c, "OptimizedImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroBanner",
    ()=>HeroBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$OptimizedImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/OptimizedImage.tsx [app-client] (ecmascript)");
;
;
const HeroBanner = ({ backgroundImage, title, subtitle, contentPosition = 'right', className = '', children })=>{
    const getContentAlignment = ()=>{
        switch(contentPosition){
            case 'left':
                return 'justify-start pl-12';
            case 'center':
                return 'justify-center';
            case 'right':
                return 'justify-end pr-12';
            default:
                return 'justify-end pr-12';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `relative h-80 overflow-hidden ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$OptimizedImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    imageName: backgroundImage,
                    alt: title,
                    category: "hero",
                    className: "w-full h-full object-cover object-left",
                    priority: true,
                    aspectRatio: "16/9",
                    sizes: "100vw"
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-red-400/80"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: `linear-gradient(135deg, transparent 40%, #E57373cc 40%)`
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `relative z-10 flex items-center h-full px-6 ${getContentAlignment()}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl text-white max-w-md text-center font-bold md:text-5xl animate-slide-in-right",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg text-white/90",
                            children: subtitle
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                            lineNumber: 66,
                            columnNumber: 24
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = HeroBanner;
var _c;
__turbopack_context__.k.register(_c, "HeroBanner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/animations/ScrollAnimationWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollAnimationWrapper",
    ()=>ScrollAnimationWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useScrollAnimation.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ScrollAnimationWrapper = ({ children, direction = "left", delay = 0, className = "" })=>{
    _s();
    const { ref, isVisible } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"])({
        threshold: 0.1,
        triggerOnce: true
    });
    const getAnimationClass = ()=>{
        if (!isVisible) return "opacity-0";
        switch(direction){
            case "left":
                return "animate-slide-in-left";
            case "right":
                return "animate-slide-in-right";
            case "top":
                return "animate-slide-in-down";
            case "bottom":
                return "animate-slide-in-up";
            default:
                return "animate-fade-in";
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: `transition-all duration-700 ease-in-out ${getAnimationClass()} ${className}`,
        style: {
            transitionDelay: `${delay}ms`,
            animationDelay: `${delay}ms`,
            willChange: isVisible ? 'auto' : 'transform, opacity'
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/animations/ScrollAnimationWrapper.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ScrollAnimationWrapper, "HYNv5rEifZ1S+vJhPkZEtot8gHg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$useScrollAnimation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScrollAnimation"]
    ];
});
_c = ScrollAnimationWrapper;
var _c;
__turbopack_context__.k.register(_c, "ScrollAnimationWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$SEO$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/SEO.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/newspaper.js [app-client] (ecmascript) <export default as Newspaper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$shared$2f$HeroBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/shared/HeroBanner.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/animations/ScrollAnimationWrapper.tsx [app-client] (ecmascript)");
// Hero image now uses image registry system
// =============================================================================
// EXTRACTED DATA IMPORTS
// =============================================================================
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/media.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$promotionalVideoThumbnail$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$promotionalVideoThumbnail$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/promotionalVideoThumbnail.jpg.mjs { IMAGE => "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/promotionalVideoThumbnail.jpg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
/**
 * Media Page Component
 * 
 * Displays media content including promotional videos, PDF documents,
 * press releases, and media gallery. Features modal viewers for different
 * content types and interactive elements for user engagement.
 */ const Media = ()=>{
    _s();
    // PDF modal state management
    const [selectedPdf, setSelectedPdf] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPdfModalOpen, setIsPdfModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pdfError, setPdfError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pdfLoading, setPdfLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pdfLoadTimeout, setPdfLoadTimeout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Video modal state management
    const [selectedVideo, setSelectedVideo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Article modal state management
    const [selectedArticle, setSelectedArticle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isArticleModalOpen, setIsArticleModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Carousel state for Document Library, Media Gallery, and Press Coverage
    const [currentDocumentIndex, setCurrentDocumentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentMediaIndex, setCurrentMediaIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPressIndex, setCurrentPressIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Pagination state for 2x2 grid layout (4 items per page)
    const [currentDocumentPage, setCurrentDocumentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentPressPage, setCurrentPressPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Calculate items per page and total pages
    const itemsPerPage = 4;
    const totalDocumentPages = Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"].length / itemsPerPage);
    const totalPressPages = Math.ceil(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"].length / itemsPerPage);
    // Get current page items
    const getCurrentPageItems = (items, currentPage)=>{
        const startIndex = currentPage * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    };
    // Touch handling state
    const [touchStart, setTouchStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [touchEnd, setTouchEnd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [touchTimeout, setTouchTimeout] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isTouchActive, setIsTouchActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Swipe animation state
    const [isAnimating, setIsAnimating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [swipeDirection, setSwipeDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Horizontal gesture locking state
    const [isHorizontalGesture, setIsHorizontalGesture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [gestureStartY, setGestureStartY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Video player refs and state
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handlePlay = ()=>{
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };
    // Handle body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Media.useEffect": ()=>{
            if (isPdfModalOpen) {
                document.body.style.overflow = 'hidden';
                return ({
                    "Media.useEffect": ()=>{
                        document.body.style.overflow = 'unset';
                    }
                })["Media.useEffect"];
            }
        }
    }["Media.useEffect"], [
        isPdfModalOpen
    ]);
    // Close PDF modal on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Media.useEffect": ()=>{
            if (!isPdfModalOpen) return;
            const handleKeyDown = {
                "Media.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        // Close only if currently open
                        if (isPdfModalOpen) {
                            setSelectedPdf(null);
                            setIsPdfModalOpen(false);
                        }
                    }
                }
            }["Media.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "Media.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["Media.useEffect"];
        }
    }["Media.useEffect"], [
        isPdfModalOpen
    ]);
    // Close Video modal on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Media.useEffect": ()=>{
            if (!isVideoModalOpen) return;
            const handleKeyDown = {
                "Media.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        if (isVideoModalOpen) {
                            setSelectedVideo(null);
                            setIsVideoModalOpen(false);
                        }
                    }
                }
            }["Media.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "Media.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["Media.useEffect"];
        }
    }["Media.useEffect"], [
        isVideoModalOpen
    ]);
    // Close Article modal on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Media.useEffect": ()=>{
            if (!isArticleModalOpen) return;
            const handleKeyDown = {
                "Media.useEffect.handleKeyDown": (e)=>{
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        if (isArticleModalOpen) {
                            setSelectedArticle(null);
                            setIsArticleModalOpen(false);
                        }
                    }
                }
            }["Media.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "Media.useEffect": ()=>window.removeEventListener('keydown', handleKeyDown)
            })["Media.useEffect"];
        }
    }["Media.useEffect"], [
        isArticleModalOpen
    ]);
    // Media data structures extracted to @/data/media.ts
    const getMediaIcon = (type)=>type === "video" ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"] : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"];
    {}
    const openPdfModal = async (pdf)=>{
        setSelectedPdf(pdf);
        setIsPdfModalOpen(true);
        setPdfError(false);
        setPdfLoading(true);
        setPdfLoadTimeout(false);
        // Set a shorter timeout for loading
        const timeoutId = setTimeout(()=>{
            setPdfLoadTimeout(true);
            setPdfError(true);
        }, 3000); // 3 second timeout
        // Test if PDF is accessible
        try {
            const response = await fetch(pdf.url, {
                method: 'HEAD',
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error('PDF not accessible');
            }
        } catch (error) {
            console.warn('PDF accessibility check failed:', error);
            setPdfError(true);
            setPdfLoadTimeout(false);
        } finally{
            setPdfLoading(false);
            clearTimeout(timeoutId);
        }
    };
    const closePdfModal = ()=>{
        setSelectedPdf(null);
        setIsPdfModalOpen(false);
        setPdfError(false);
        setPdfLoading(false);
        setPdfLoadTimeout(false);
    };
    const downloadPdf = (pdf)=>{
        try {
            const link = document.createElement('a');
            link.href = pdf.url;
            link.download = pdf.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.pdf';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback to opening in new tab
            window.open(pdf.url, '_blank', 'noopener,noreferrer');
        }
    };
    const openPdfInNewTab = (pdf)=>{
        window.open(pdf.url, '_blank', 'noopener,noreferrer');
    };
    const handleIframeError = ()=>{
        setPdfError(true);
    };
    const PdfFallbackOptions = ({ pdf })=>{
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full p-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "h-16 w-16 text-blue-500 mb-4"
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                    lineNumber: 236,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-lg font-semibold mb-2",
                    children: "PDF Preview Not Available"
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                    lineNumber: 237,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted-foreground mb-6 max-w-md",
                    children: "The PDF preview cannot be displayed in your browser. You can download the file or open it in a new tab to view it."
                }, void 0, false, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                    lineNumber: 238,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3 w-full max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>downloadPdf(pdf),
                            className: "w-full flex items-center gap-2",
                            variant: "default",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 244,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Download PDF"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 243,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: ()=>openPdfInNewTab(pdf),
                            className: "w-full flex items-center gap-2",
                            variant: "outline",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 249,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Open in New Tab"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 248,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                    lineNumber: 242,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-800",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium mb-1",
                            children: "Why can't I preview this?"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 255,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Some browsers block PDF previews for security reasons. Downloading or opening in a new tab ensures you can view the document properly."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 256,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                    lineNumber: 254,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
            lineNumber: 235,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    };
    {}
    const openVideoModal = (video)=>{
        setSelectedVideo(video);
        setIsVideoModalOpen(true);
    };
    const closeVideoModal = ()=>{
        setSelectedVideo(null);
        setIsVideoModalOpen(false);
    };
    {}
    const openArticleModal = (article)=>{
        setSelectedArticle(article);
        setIsArticleModalOpen(true);
    };
    const closeArticleModal = ()=>{
        setSelectedArticle(null);
        setIsArticleModalOpen(false);
    };
    const handleArticleAction = (article)=>{
        if (article.type === "external") {
            window.open(article.url, "_blank", "noopener,noreferrer");
        } else if (article.type === "modal") {
            openArticleModal(article);
        }
    };
    // Navigation functions for carousels
    const goToPreviousDocument = ()=>{
        setCurrentDocumentIndex((prev)=>prev > 0 ? prev - 1 : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"].length - 1);
    };
    const goToNextDocument = ()=>{
        setCurrentDocumentIndex((prev)=>prev < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"].length - 1 ? prev + 1 : 0);
    };
    const goToPreviousMedia = ()=>{
        setCurrentMediaIndex((prev)=>prev > 0 ? prev - 1 : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"].length - 1);
    };
    const goToNextMedia = ()=>{
        setCurrentMediaIndex((prev)=>prev < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"].length - 1 ? prev + 1 : 0);
    };
    const goToPreviousPress = ()=>{
        setCurrentPressIndex((prev)=>prev > 0 ? prev - 1 : __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"].length - 1);
    };
    const goToNextPress = ()=>{
        setCurrentPressIndex((prev)=>prev < __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"].length - 1 ? prev + 1 : 0);
    };
    // Pagination navigation functions
    const goToPreviousDocumentPage = ()=>{
        setCurrentDocumentPage((prev)=>prev > 0 ? prev - 1 : totalDocumentPages - 1);
    };
    const goToNextDocumentPage = ()=>{
        setCurrentDocumentPage((prev)=>prev < totalDocumentPages - 1 ? prev + 1 : 0);
    };
    const goToPreviousPressPage = ()=>{
        setCurrentPressPage((prev)=>prev > 0 ? prev - 1 : totalPressPages - 1);
    };
    const goToNextPressPage = ()=>{
        setCurrentPressPage((prev)=>prev < totalPressPages - 1 ? prev + 1 : 0);
    };
    // Touch handling functions
    const handleTouchStart = (e)=>{
        const touch = e.targetTouches[0];
        setTouchStart({
            x: touch.clientX,
            y: touch.clientY
        });
        setTouchEnd({
            x: 0,
            y: 0
        });
        setIsTouchActive(true);
        // Capture initial Y position for gesture detection
        setGestureStartY(touch.clientY);
        setIsHorizontalGesture(false);
        // Clear any existing timeout
        if (touchTimeout) {
            clearTimeout(touchTimeout);
        }
        // Set a timeout to reset touch state if no movement occurs
        const timeout = setTimeout(()=>{
            setTouchStart({
                x: 0,
                y: 0
            });
            setTouchEnd({
                x: 0,
                y: 0
            });
            setIsTouchActive(false);
        }, 1000); // Reset after 1 second of no movement
        setTouchTimeout(timeout);
    };
    const handleTouchMove = (e)=>{
        const touch = e.targetTouches[0];
        setTouchEnd({
            x: touch.clientX,
            y: touch.clientY
        });
        // Clear timeout since user is moving
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            setTouchTimeout(null);
        }
        // Calculate movement distances
        const deltaX = Math.abs(touch.clientX - touchStart.x);
        const deltaY = Math.abs(touch.clientY - gestureStartY);
        // Detect horizontal gesture if horizontal movement is dominant
        if (!isHorizontalGesture && deltaX > 20 && deltaX > deltaY * 2) {
            setIsHorizontalGesture(true);
        }
        // If horizontal gesture is detected, prevent vertical scrolling
        if (isHorizontalGesture) {
            e.preventDefault();
            e.stopPropagation();
        }
        // Determine swipe direction for animation
        if (deltaX > 10) {
            setSwipeDirection(touch.clientX - touchStart.x > 0 ? 'right' : 'left');
        }
    };
    const handleTouchEnd = (type)=>{
        // Clear any pending timeout
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            setTouchTimeout(null);
        }
        // Only process swipe if we have both start and end positions
        if (touchStart.x && touchEnd.x) {
            const distance = touchStart.x - touchEnd.x;
            const isLeftSwipe = distance > 50;
            const isRightSwipe = distance < -50;
            // Trigger swipe animation
            if (swipeDirection) {
                setIsAnimating(true);
                setTimeout(()=>{
                    setIsAnimating(false);
                    setSwipeDirection(null);
                }, 300);
            }
            if (isLeftSwipe) {
                if (type === 'document') goToNextDocument();
                if (type === 'media') goToNextMedia();
                if (type === 'press') goToNextPress();
            }
            if (isRightSwipe) {
                if (type === 'document') goToPreviousDocument();
                if (type === 'media') goToPreviousMedia();
                if (type === 'press') goToPreviousPress();
            }
        }
        // Always reset touch state after touch end to allow vertical scrolling
        setTouchStart({
            x: 0,
            y: 0
        });
        setTouchEnd({
            x: 0,
            y: 0
        });
        setIsTouchActive(false);
        setIsHorizontalGesture(false);
    };
    // Handle touch cancel events (when touch is interrupted)
    const handleTouchCancel = ()=>{
        // Clear any pending timeout
        if (touchTimeout) {
            clearTimeout(touchTimeout);
            setTouchTimeout(null);
        }
        // Reset touch state immediately on cancel
        setTouchStart({
            x: 0,
            y: 0
        });
        setTouchEnd({
            x: 0,
            y: 0
        });
        setIsTouchActive(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$SEO$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "News & Media - Anhart Affordable Housing",
                description: "Stay updated with the latest news, media coverage, and press releases about Anhart's affordable housing projects and community impact across Canada.",
                keywords: "anhart news, affordable housing media, housing press releases, community development news, housing coverage, anhart press, housing media",
                url: "/media"
            }, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                lineNumber: 457,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                lineNumber: 458,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$shared$2f$HeroBanner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeroBanner"], {
                        backgroundImage: "media-hero",
                        title: "Latest News and Media Coverage",
                        contentPosition: "right"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 461,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24 bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-5xl px-6 lg:px-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "top",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold tracking-tight text-foreground mb-6",
                                        children: "Featured Promotional Video"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 467,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "top",
                                    delay: 100,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg leading-8 text-muted-foreground mb-8",
                                        children: "Learn more about our mission and impact through this short feature."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 472,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 471,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "bottom",
                                    delay: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm sm:shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                ref: videoRef,
                                                poster: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$promotionalVideoThumbnail$2e$jpg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$promotionalVideoThumbnail$2e$jpg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                                className: "w-full h-full object-cover",
                                                controls: true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                        src: void 0,
                                                        type: "video/mp4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 480,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Your browser does not support the video tag."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 479,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            !isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer",
                                                onClick: handlePlay,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-white text-lg px-4 py-2 bg-red-600 rounded-lg",
                                                    children: "▶"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 485,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 484,
                                                columnNumber: 32
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-2 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition-colors pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    className: "pointer-events-auto",
                                                    href: "https://www.youtube.com/watch?v=LIjifKbBRpg",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: "Watch on YouTube"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 491,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 465,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-6xl px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold tracking-tight text-foreground mb-6",
                                                children: "Document Library"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 506,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 505,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 100,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg leading-8 text-muted-foreground max-w-2xl mx-auto",
                                                children: "Discover our comprehensive collection of PDF documents. Curated with detailed insights, specifications, and detailed resources."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 511,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 510,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 504,
                                    columnNumber: 14
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: goToPreviousDocumentPage,
                                                    className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                                                    "aria-label": "Previous page",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "‹"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 20
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Previous"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 18
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: [
                                                            "Page ",
                                                            currentDocumentPage + 1,
                                                            " of ",
                                                            totalDocumentPages
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 20
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 18
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: goToNextDocumentPage,
                                                    className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                                                    "aria-label": "Next page",
                                                    children: [
                                                        "Next",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "›"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 20
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 532,
                                                    columnNumber: 18
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 520,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-6",
                                            children: getCurrentPageItems(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"], currentDocumentPage).map((pdf, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                                    direction: "bottom",
                                                    delay: 200 + index * 50,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "border rounded-lg p-6 hover:shadow-sm sm:hover:shadow-lg transition-shadow",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-start justify-between mb-3",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-3",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "p-2 bg-red-100 text-red-600 rounded-lg",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                className: "h-6 w-6"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 545,
                                                                                columnNumber: 30
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                            lineNumber: 544,
                                                                            columnNumber: 28
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 543,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-muted-foreground",
                                                                        children: pdf.date
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 548,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 542,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold mb-2",
                                                                children: pdf.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 551,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4 text-sm text-muted-foreground mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            pdf.pages,
                                                                            " pages"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 553,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: pdf.size
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 554,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 552,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground mb-6 text-sm",
                                                                children: pdf.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 556,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        onClick: ()=>openPdfModal(pdf),
                                                                        className: "flex-1 flex items-center gap-2",
                                                                        size: "sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 560,
                                                                                columnNumber: 28
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            "Preview"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 559,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        onClick: ()=>downloadPdf(pdf),
                                                                        size: "sm",
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 564,
                                                                                columnNumber: 28
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            "Download"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 26
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 558,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 541,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, pdf.id, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 540,
                                                    columnNumber: 94
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 539,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center items-center mt-8 space-x-2",
                                            children: Array.from({
                                                length: totalDocumentPages
                                            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentDocumentPage(index),
                                                    className: `h-3 rounded-full transition-all duration-300 ${index === currentDocumentPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`,
                                                    "aria-label": `Go to page ${index + 1}`
                                                }, index, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 576,
                                                    columnNumber: 32
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 573,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 518,
                                    columnNumber: 14
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center items-center mb-6 space-x-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentDocumentIndex(index),
                                                        className: `h-3 rounded-full transition-all duration-300 ${index === currentDocumentIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`,
                                                        "aria-label": `Go to document ${index + 1}`
                                                    }, index, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 585,
                                                        columnNumber: 52
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 584,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 583,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "bottom",
                                            delay: 300,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${isAnimating ? swipeDirection === 'left' ? 'animate-slide-out-left' : 'animate-slide-out-right' : ''}`,
                                                onTouchStart: handleTouchStart,
                                                onTouchMove: handleTouchMove,
                                                onTouchEnd: ()=>handleTouchEnd('document'),
                                                onTouchCancel: handleTouchCancel,
                                                style: {
                                                    touchAction: 'auto'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToPreviousDocument,
                                                        className: "absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Previous document",
                                                        children: "‹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 601,
                                                        columnNumber: 20
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToNextDocument,
                                                        className: "absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Next document",
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 20
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-6",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full max-w-sm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                                                    direction: "top",
                                                                    delay: 200 + currentDocumentIndex * 100,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "border rounded-lg p-6 hover:shadow-sm sm:hover:shadow-lg transition-shadow",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-start justify-between mb-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-3",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "p-2 bg-red-100 text-red-600 rounded-lg",
                                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                                                                className: "h-6 w-6"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 619,
                                                                                                columnNumber: 38
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                            lineNumber: 618,
                                                                                            columnNumber: 36
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 617,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-sm text-muted-foreground",
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex].date
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 622,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 616,
                                                                                columnNumber: 32
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                                className: "text-lg font-semibold mb-2",
                                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex].title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 625,
                                                                                columnNumber: 32
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-4 text-sm text-muted-foreground mb-4",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: [
                                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex].pages,
                                                                                            " pages"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 627,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex].size
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 628,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 626,
                                                                                columnNumber: 32
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-muted-foreground mb-6 text-sm",
                                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex].description
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 630,
                                                                                columnNumber: 32
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        onClick: ()=>openPdfModal(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex]),
                                                                                        className: "flex-1 flex items-center gap-2",
                                                                                        size: "sm",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                                                                className: "h-4 w-4"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 634,
                                                                                                columnNumber: 36
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            "Preview"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 633,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "outline",
                                                                                        onClick: ()=>downloadPdf(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pdfDocuments"][currentDocumentIndex]),
                                                                                        size: "sm",
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                                                                className: "h-4 w-4"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 638,
                                                                                                columnNumber: 36
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            "Download"
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 637,
                                                                                        columnNumber: 34
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 632,
                                                                                columnNumber: 32
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 30
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 614,
                                                                    columnNumber: 28
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 613,
                                                                columnNumber: 26
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 612,
                                                            columnNumber: 61
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 20
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 591,
                                                columnNumber: 18
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 590,
                                            columnNumber: 16
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 581,
                                    columnNumber: 14
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 502,
                            columnNumber: 12
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 501,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    isPdfModalOpen && selectedPdf && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
                        onClick: (e)=>{
                            if (e.target === e.currentTarget) closePdfModal();
                        },
                        onKeyDown: (e)=>{
                            if (e.key === 'Escape') closePdfModal();
                        },
                        tabIndex: -1,
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-labelledby": "pdf-modal-title",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-6 border-b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-red-100 text-red-600 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 663,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            id: "pdf-modal-title",
                                                            className: "font-semibold text-lg",
                                                            children: selectedPdf.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4 text-sm text-muted-foreground",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        selectedPdf.pages,
                                                                        " pages"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 669,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: selectedPdf.size
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 670,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: selectedPdf.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 671,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 668,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 662,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "ghost",
                                                onClick: closePdfModal,
                                                size: "sm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 679,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 676,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 661,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full bg-gray-50 rounded-xl overflow-hidden shadow-inner relative",
                                        children: pdfLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center h-full",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 690,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-muted-foreground",
                                                        children: "Checking PDF availability..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 689,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 688,
                                            columnNumber: 31
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PdfFallbackOptions, {
                                            pdf: selectedPdf
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 693,
                                            columnNumber: 28
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 687,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 686,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 659,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 654,
                        columnNumber: 43
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24 bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-6xl px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold tracking-tight text-foreground mb-6",
                                                children: "Media Gallery"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 707,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 706,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 100,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg leading-8 text-muted-foreground",
                                                children: "Visual stories of our communities, construction progress, and the people we serve."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 712,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 711,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 705,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"].map((item, index)=>{
                                        const MediaIcon = getMediaIcon(item.type);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "bottom",
                                            delay: 200 + index * 50,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                className: "overflow-hidden hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>openVideoModal(item),
                                                        className: "relative h-48 rounded-xl overflow-hidden group cursor-pointer bg-muted",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: item.thumbnail,
                                                                alt: item.title,
                                                                className: "w-full h-full object-cover",
                                                                loading: "lazy",
                                                                onError: (e)=>{
                                                                    // Fallback to hqdefault if maxresdefault fails
                                                                    const img = e.target;
                                                                    if (img.src.includes('maxresdefault')) {
                                                                        img.src = img.src.replace('maxresdefault', 'hqdefault');
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 725,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                    className: "h-16 w-16 text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 739,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 738,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 724,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between mb-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `px-2 py-1 rounded-full text-xs font-medium ${item.type === "video" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`,
                                                                        children: item.type === "video" ? "Video" : "Image"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 744,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-1 text-sm text-muted-foreground",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 748,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            item.date
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 747,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 743,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                className: "text-lg line-clamp-2",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 752,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 742,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-muted-foreground mb-4 text-sm",
                                                                children: item.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 756,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                variant: "outline",
                                                                size: "sm",
                                                                className: "w-full",
                                                                onClick: ()=>openVideoModal(item),
                                                                children: "View Video"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 757,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 723,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.id, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 722,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 719,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center items-center mb-6 space-x-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentMediaIndex(index),
                                                        className: `h-3 rounded-full transition-all duration-300 ${index === currentMediaIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`,
                                                        "aria-label": `Go to media ${index + 1}`
                                                    }, index, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 771,
                                                        columnNumber: 51
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 770,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 769,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "bottom",
                                            delay: 300,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${isAnimating ? swipeDirection === 'left' ? 'animate-slide-out-left' : 'animate-slide-out-right' : ''}`,
                                                onTouchStart: handleTouchStart,
                                                onTouchMove: handleTouchMove,
                                                onTouchEnd: ()=>handleTouchEnd('media'),
                                                onTouchCancel: handleTouchCancel,
                                                style: {
                                                    touchAction: 'auto'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToPreviousMedia,
                                                        className: "absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Previous media",
                                                        children: "‹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 787,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToNextMedia,
                                                        className: "absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Next media",
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 792,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-6",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full max-w-sm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                                                    direction: "top",
                                                                    delay: 200 + currentMediaIndex * 100,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                                        className: "overflow-hidden hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300 group",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                onClick: ()=>openVideoModal(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex]),
                                                                                className: "relative h-48 rounded-xl overflow-hidden group cursor-pointer bg-muted",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].thumbnail,
                                                                                        alt: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].title,
                                                                                        className: "w-full h-full object-cover",
                                                                                        loading: "lazy",
                                                                                        onError: (e)=>{
                                                                                            // Fallback to hqdefault if maxresdefault fails
                                                                                            const img = e.target;
                                                                                            if (img.src.includes('maxresdefault')) {
                                                                                                img.src = img.src.replace('maxresdefault', 'hqdefault');
                                                                                            }
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 803,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
                                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                                                            className: "h-16 w-16 text-white"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                            lineNumber: 817,
                                                                                            columnNumber: 37
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 816,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 802,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center justify-between mb-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: `px-2 py-1 rounded-full text-xs font-medium ${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].type === "video" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`,
                                                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].type === "video" ? "Video" : "Image"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 822,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-1 text-sm text-muted-foreground",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                                        className: "h-4 w-4"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                        lineNumber: 826,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].date
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 825,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 821,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                                        className: "text-lg line-clamp-2",
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 830,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 820,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-muted-foreground mb-4 text-sm",
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex].description
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 834,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "outline",
                                                                                        size: "sm",
                                                                                        className: "w-full",
                                                                                        onClick: ()=>openVideoModal(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mediaGallery"][currentMediaIndex]),
                                                                                        children: "View Video"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 835,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 833,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 801,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 800,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 799,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 798,
                                                            columnNumber: 57
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 797,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 777,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 776,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 767,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 704,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 703,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isVideoModalOpen && selectedVideo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-6 border-b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-semibold text-lg",
                                            children: selectedVideo.title
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 854,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            onClick: closeVideoModal,
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 856,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 855,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 853,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 p-6 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                        width: "100%",
                                        height: "100%",
                                        className: "rounded-xl",
                                        src: selectedVideo.youtubeUrl.replace("watch?v=", "embed/"),
                                        title: selectedVideo.title,
                                        frameBorder: "0",
                                        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                                        allowFullScreen: true
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 860,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 859,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 852,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 851,
                        columnNumber: 47
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-6xl px-6 lg:px-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center mb-16",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-3xl font-bold tracking-tight text-foreground mb-6",
                                                children: "Press Coverage"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 870,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 869,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 100,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-lg leading-8 text-muted-foreground",
                                                children: "Recent news and media coverage of our work and impact in affordable housing."
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 875,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 874,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 868,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden md:block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: goToPreviousPressPage,
                                                    className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                                                    "aria-label": "Previous page",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "‹"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 886,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Previous"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 885,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-muted-foreground",
                                                        children: [
                                                            "Page ",
                                                            currentPressPage + 1,
                                                            " of ",
                                                            totalPressPages
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 891,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 890,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: goToNextPressPage,
                                                    className: "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                                                    "aria-label": "Next page",
                                                    children: [
                                                        "Next",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xl",
                                                            children: "›"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 898,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 884,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-6",
                                            children: getCurrentPageItems(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"], currentPressPage).map((article, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                                    direction: "bottom",
                                                    delay: 200 + index * 50,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                        className: "hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between mb-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium",
                                                                                children: "Press Coverage"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 908,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-1 text-sm text-muted-foreground",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                        className: "h-4 w-4"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 912,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    article.date
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 911,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 907,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                        className: "text-lg line-clamp-2 mb-2",
                                                                        children: article.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 916,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 text-sm text-muted-foreground",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                                                className: "h-4 w-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 918,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            article.source
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 917,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-muted-foreground mb-4",
                                                                        children: article.excerpt
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 924,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "outline",
                                                                        size: "sm",
                                                                        className: "flex items-center gap-2",
                                                                        onClick: ()=>handleArticleAction(article),
                                                                        children: article.type === "external" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                    className: "h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                    lineNumber: 927,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                "Read Full Article"
                                                                            ]
                                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                                                    className: "h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                    lineNumber: 930,
                                                                                    columnNumber: 33
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                "Read Article"
                                                                            ]
                                                                        }, void 0, true)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 925,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 923,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, article.id, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 904,
                                                    columnNumber: 95
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 903,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-center items-center mt-8 space-x-2",
                                            children: Array.from({
                                                length: totalPressPages
                                            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setCurrentPressPage(index),
                                                    className: `h-3 rounded-full transition-all duration-300 ${index === currentPressPage ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`,
                                                    "aria-label": `Go to page ${index + 1}`
                                                }, index, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 943,
                                                    columnNumber: 32
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 940,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 882,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "md:hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "top",
                                            delay: 200,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-center items-center mb-6 space-x-2",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setCurrentPressIndex(index),
                                                        className: `h-3 rounded-full transition-all duration-300 ${index === currentPressIndex ? 'bg-primary w-8 shadow-lg shadow-primary/30' : 'bg-primary/40 hover:bg-primary/60 w-3'}`,
                                                        "aria-label": `Go to article ${index + 1}`
                                                    }, index, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 52
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 951,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 950,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                            direction: "bottom",
                                            delay: 300,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `relative touch-pan-x transition-all duration-300 ${isTouchActive ? 'shadow-2xl shadow-primary/20' : ''} ${isAnimating ? swipeDirection === 'left' ? 'animate-slide-out-left' : 'animate-slide-out-right' : ''}`,
                                                onTouchStart: handleTouchStart,
                                                onTouchMove: handleTouchMove,
                                                onTouchEnd: ()=>handleTouchEnd('press'),
                                                onTouchCancel: handleTouchCancel,
                                                style: {
                                                    touchAction: 'auto'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToPreviousPress,
                                                        className: "absolute left-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Previous article",
                                                        children: "‹"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 968,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: goToNextPress,
                                                        className: "absolute right-1 top-1/2 -translate-y-1/2 z-20 text-foreground/60 hover:text-foreground text-3xl font-bold transition-all duration-200 hover:scale-110",
                                                        "aria-label": "Next article",
                                                        children: "›"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "px-6",
                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full max-w-sm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                                                    direction: "top",
                                                                    delay: 200 + currentPressIndex * 100,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                                                        className: "hover:shadow-sm sm:hover:shadow-lg transition-shadow duration-300",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center justify-between mb-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium",
                                                                                                children: "Press Coverage"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 985,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                className: "flex items-center gap-1 text-sm text-muted-foreground",
                                                                                                children: [
                                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                                                        className: "h-4 w-4"
                                                                                                    }, void 0, false, {
                                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                        lineNumber: 989,
                                                                                                        columnNumber: 39
                                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex].date
                                                                                                ]
                                                                                            }, void 0, true, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 988,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 984,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                                        className: "text-lg line-clamp-2 mb-2",
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex].title
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 993,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex items-center gap-2 text-sm text-muted-foreground",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                                                                className: "h-4 w-4"
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                lineNumber: 995,
                                                                                                columnNumber: 37
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex].source
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 994,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 983,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                        className: "text-muted-foreground mb-4",
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex].excerpt
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 1001,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                                        variant: "outline",
                                                                                        size: "sm",
                                                                                        className: "flex items-center gap-2",
                                                                                        onClick: ()=>handleArticleAction(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex]),
                                                                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pressReleases"][currentPressIndex].type === "external" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                    lineNumber: 1004,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                "Read Full Article"
                                                                                            ]
                                                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                                                                    className: "h-4 w-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                                    lineNumber: 1007,
                                                                                                    columnNumber: 41
                                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                                "Read Article"
                                                                                            ]
                                                                                        }, void 0, true)
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                        lineNumber: 1002,
                                                                                        columnNumber: 35
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                                lineNumber: 1000,
                                                                                columnNumber: 33
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                        lineNumber: 982,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 981,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                lineNumber: 980,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 979,
                                                            columnNumber: 58
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 958,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 957,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 948,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 867,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 866,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isArticleModalOpen && selectedArticle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-6 border-b",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2 bg-blue-100 text-blue-600 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$newspaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Newspaper$3e$__["Newspaper"], {
                                                        className: "h-5 w-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 1029,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 1028,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold text-lg",
                                                            children: selectedArticle.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 1032,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-4 text-sm text-muted-foreground",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: selectedArticle.source
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 1034,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: selectedArticle.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                                    lineNumber: 1035,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                            lineNumber: 1033,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 1031,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 1027,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            onClick: closeArticleModal,
                                            size: "sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                            lineNumber: 1039,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 1026,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-auto p-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "prose prose-lg max-w-none",
                                        dangerouslySetInnerHTML: {
                                            __html: selectedArticle.fullText
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 1044,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 1043,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 1025,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 1024,
                        columnNumber: 51
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "py-24 bg-muted/30",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-5xl px-6 lg:px-8 text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "top",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold tracking-tight text-foreground mb-6",
                                        children: "Anhart's 4-Step Process"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 1054,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "top",
                                    delay: 100,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-lg leading-8 text-muted-foreground mb-8",
                                        children: "Discover how we work with communities to get started with developing affordable housing solutions."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 1060,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 1059,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$animations$2f$ScrollAnimationWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAnimationWrapper"], {
                                    direction: "bottom",
                                    delay: 200,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm sm:shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                className: "w-full h-full object-cover",
                                                controls: true,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                                        src: void 0,
                                                        type: "video/mp4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                        lineNumber: 1068,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Your browser does not support the video tag."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 1067,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute top-2 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600 transition-colors pointer-events-none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    className: "pointer-events-auto",
                                                    href: "https://youtu.be/h-Y6aceJmaw?si=UgFVJbwXHdPMpgWi",
                                                    target: "_blank",
                                                    rel: "noopener noreferrer",
                                                    children: "Watch on YouTube"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                    lineNumber: 1073,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                                lineNumber: 1072,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                        lineNumber: 1066,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                                    lineNumber: 1065,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                            lineNumber: 1053,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                        lineNumber: 1052,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
                lineNumber: 1129,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/Media.tsx",
        lineNumber: 456,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Media, "Gyo+xvk55ojbV54xMqRuLjYs0QI=");
_c = Media;
const __TURBOPACK__default__export__ = Media;
var _c;
__turbopack_context__.k.register(_c, "Media");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_anhartca-main_anhartca-main_next-app_src_components_2b5b9a9f._.js.map