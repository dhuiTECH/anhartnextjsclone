module.exports = [
"[project]/merritt-backup/app/HomeClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/next/image.js [app-ssr] (ecmascript)");
// 1. IMPORT FRAMER MOTION
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
// GSAP imports for tree animation
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/merritt-backup/node_modules/@gsap/react/src/index.js [app-ssr] (ecmascript)");
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
// Register GSAP plugins
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
// NOTE: Navbar import removed because it is now in layout.tsx
const expertise = [
    {
        title: "Quality Cabins",
        description: "From timber-frame masterpieces to renovated A-frames, find a property that blends rustic charm with modern comfort.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Resorts & Investment",
        description: "Commercial opportunities for boutique resorts, rental compounds, and hospitality ventures in high-traffic tourist zones.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Land Acquisition",
        description: "Secure your legacy with pristine acreage. Expertise in zoning, water rights, and development potential.",
        image: "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=2070&auto=format&fit=crop"
    }
];
function HomeClient() {
    // --- UPDATED LOGIC FOR SECTION 2 (Sticky Parallax) ---
    const villageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollYProgress: villageScrollProgress } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useScroll"])({
        target: villageRef,
        offset: [
            'start start',
            'end start'
        ] // Tracks when top of section hits top of screen
    });
    // This makes the image move slightly slower than the scroll (Parallax effect)
    const villageY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTransform"])(villageScrollProgress, [
        0,
        1
    ], [
        "0%",
        "20%"
    ]);
    // Mobile image switching state
    const [gardenFlatImage, setGardenFlatImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0); // 0: exterior, 1: bedroom, 2: kitchen
    const [skyTownhomeImage, setSkyTownhomeImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0); // 0: exterior, 1: bedroom, 2: kitchen
    // GSAP refs for tree animation
    const featuredSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const leftTreeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rightTreeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // GSAP refs for mountain parallax
    const amenitiesSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mountainRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // --- EXISTING OBSERVERS ---
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1
        });
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach((el)=>observer.observe(el));
        // REMOVED: The manual navbar scroll listener. 
        // The Navbar component in layout.tsx now handles its own state.
        return ()=>{
            revealElements.forEach((el)=>observer.unobserve(el));
        };
    }, []);
    // GSAP Tree Animation - Very Grounded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        const tl = __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].timeline({
            scrollTrigger: {
                trigger: featuredSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
        // Animate Left Tree (Very grounded movement)
        tl.fromTo(leftTreeRef.current, {
            y: 60,
            x: -15
        }, {
            y: 20,
            x: 0,
            ease: 'none'
        }, 0 // Start at time 0
        );
        // Animate Right Tree (Very grounded movement)
        tl.fromTo(rightTreeRef.current, {
            y: 60,
            x: 15
        }, {
            y: 20,
            x: 0,
            ease: 'none'
        }, 0);
    }, {
        scope: featuredSectionRef
    });
    // GSAP Mountain Parallax Animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f40$gsap$2f$react$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGSAP"])(()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(mountainRef.current, {
            y: 150,
            ease: 'none',
            scrollTrigger: {
                trigger: amenitiesSectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }, {
        scope: amenitiesSectionRef
    });
    return(// UPDATED: Added min-h-screen and flex-col to prevent scroll locking
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "jsx-468171cc8097bfc1" + " " + "min-h-screen flex flex-col bg-[#f9f8f6] text-[#1a2621] font-sans antialiased selection:bg-[#1a2621] selection:text-white overflow-x-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "468171cc8097bfc1",
                children: 'html{scroll-behavior:smooth}.no-scrollbar::-webkit-scrollbar{display:none}.reveal{opacity:0;transition:all 1s cubic-bezier(.16,1,.3,1);transform:translateY(30px)}.reveal.active{opacity:1;transform:translateY(0)}.input-underlined{background:0 0;border-bottom:1px solid #1a26214d;outline:none;width:100%;padding:1rem 0;transition:border-color .3s}.input-underlined:focus{border-bottom-color:#a6906c}.glow-hover{isolation:isolate;position:relative;overflow:hidden}.glow-hover:after{content:"";opacity:0;filter:blur(16px);z-index:-1;background:linear-gradient(120deg,#a6906c00 0%,#a6906c8c 40%,#ffffffe6 50%,#a6906c8c 60%,#a6906c00 100%);transition:transform .7s,opacity .4s;position:absolute;inset:-120% -40%;transform:translate(-35%)}.glow-hover:hover:after{opacity:.9;transform:translate(35%)}@keyframes slow-zoom{0%{transform:scale(1)}to{transform:scale(1.1)}}.animate-slow-zoom{animation:20s ease-out infinite alternate slow-zoom}@keyframes fade-up{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.animate-fade-up{animation:2s ease-out forwards fade-up}.text-stroke-black{-webkit-text-stroke:1px #0003;text-shadow:0 0 5px #0000004d,0 1px 2px #0003,0 2px 4px #0000001a}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-468171cc8097bfc1" + " " + "hidden md:block fixed left-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"
            }, void 0, false, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-468171cc8097bfc1" + " " + "hidden md:block fixed right-0 top-0 w-6 md:w-16 h-full bg-white z-[60]"
            }, void 0, false, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "jsx-468171cc8097bfc1" + " " + "relative h-[85vh] md:h-[90vh] w-full overflow-hidden flex items-center justify-center bg-black",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 z-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: "/Heroheader.mp4",
                                autoPlay: true,
                                loop: true,
                                muted: true,
                                playsInline: true,
                                preload: "metadata",
                                poster: "/fullvillage.webp",
                                style: {
                                    filter: 'brightness(0.9)'
                                },
                                className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover border-0"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 bg-black/30"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "relative z-10 flex flex-col items-center justify-center text-center text-white px-8 md:px-6 mt-8 md:mt-12 min-h-[60vh]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "max-w-4xl w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            animationDelay: '0.4s'
                                        },
                                        className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl md:text-5xl lg:text-6xl mb-4 md:mb-8 leading-tight font-bold opacity-0 animate-fade-up uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center px-2",
                                        children: [
                                            "Affordable Homeownership",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                className: "jsx-468171cc8097bfc1"
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 231,
                                                columnNumber: 45
                                            }, this),
                                            "in Merritt, BC"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            animationDelay: '0.6s'
                                        },
                                        className: "jsx-468171cc8097bfc1" + " " + "text-sm md:text-base lg:text-lg font-bold tracking-[0.15em] leading-relaxed opacity-0 animate-fade-up text-white mb-4 md:mb-12 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.5)] text-stroke-black text-center max-w-3xl mx-auto px-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-468171cc8097bfc1" + " " + "md:hidden",
                                                children: "Modern townhomes for sale in Merritt, BC."
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 234,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-468171cc8097bfc1" + " " + "hidden md:inline",
                                                children: "Discover modern townhomes for sale in beautiful Merritt, BC. Your accessible gateway to homeownership in BC's scenic Nicola Valley."
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 235,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 233,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/Merritt/contact",
                                className: "inline-block bg-white text-[#1a2621] px-6 md:px-8 py-4 text-sm md:text-xs tracking-[0.2em] uppercase font-black rounded-full shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:bg-[#a6906c] hover:text-white transition-all duration-300 opacity-0 animate-fade-up glow-hover cursor-pointer",
                                style: {
                                    animationDelay: '0.8s'
                                },
                                children: "Contact Sales Team"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 238,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 228,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-0 left-0 w-full leading-none z-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            viewBox: "0 0 1440 200",
                            preserveAspectRatio: "none",
                            className: "jsx-468171cc8097bfc1" + " " + "relative block w-full h-[80px] md:h-[120px]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                fill: "#ffffff",
                                fillOpacity: "1",
                                className: "jsx-468171cc8097bfc1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "0,200 60,120 120,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 247,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "80,200 140,140 200,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 248,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "160,200 220,160 280,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 249,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "400,200 460,100 520,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 252,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "480,200 540,130 600,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 253,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "560,200 620,150 680,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 254,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "800,200 860,120 920,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 257,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "880,200 940,140 1000,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 258,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "960,200 1020,160 1080,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 259,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "300,200 340,170 380,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 262,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "700,200 740,180 780,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 263,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "1100,200 1140,150 1180,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 264,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "1200,200 1240,130 1280,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 265,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                        points: "1300,200 1340,160 1380,200",
                                        className: "jsx-468171cc8097bfc1"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 266,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 245,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 243,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-468171cc8097bfc1" + " " + "w-full py-16 md:py-24 lg:py-32 pb-24 md:pb-24 lg:pb-32 bg-white overflow-visible",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-468171cc8097bfc1" + " " + "max-w-7xl mx-auto px-6 md:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "flex flex-col items-start space-y-6 md:space-y-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-468171cc8097bfc1" + " " + "text-teal-500 font-bold text-xs tracking-[0.2em] uppercase",
                                        children: "Affordable Homeownership"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-468171cc8097bfc1" + " " + "text-3xl md:text-4xl lg:text-6xl font-serif text-slate-800 leading-tight",
                                        children: [
                                            "Simply the best ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                className: "jsx-468171cc8097bfc1"
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 284,
                                                columnNumber: 31
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-468171cc8097bfc1" + " " + "italic text-[#A05C4D] font-light",
                                                children: "value"
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 285,
                                                columnNumber: 15
                                            }, this),
                                            " in BC."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 283,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "space-y-4 md:space-y-6 text-gray-500 leading-relaxed",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-468171cc8097bfc1" + " " + "text-sm md:text-base",
                                                children: "We believe housing should be within reach. As a dedicated affordable housing developer, we are proud to introduce our newest community at 3757 De Wolf Way, Merritt, BC."
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 289,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-468171cc8097bfc1" + " " + "text-sm md:text-base",
                                                children: [
                                                    "We are developing 48 entry-level 2 and 3-bedroom townhomes designed for real families. Accessible homeownership is finally here, with prices starting at",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].span, {
                                                        className: "inline-block",
                                                        initial: {
                                                            color: '#6b7280'
                                                        },
                                                        whileInView: {
                                                            color: '#dc2626',
                                                            textShadow: '0 0 8px rgba(220, 38, 38, 0.5)'
                                                        },
                                                        transition: {
                                                            duration: 0.8,
                                                            ease: 'easeOut'
                                                        },
                                                        viewport: {
                                                            once: true,
                                                            margin: '-50px'
                                                        },
                                                        children: "$249k"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 288,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "https://anhart.ca/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-block bg-white text-[#1a2621] px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#a6906c] hover:text-white transition-all duration-300 cursor-pointer glow-hover",
                                            children: "Learn More About Anhart"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 312,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "relative mt-6 md:mt-12 lg:mt-0 md:pl-10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "relative z-10 rounded-2xl overflow-hidden shadow-xl",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/livingroom.jpg",
                                            alt: "Modern living room",
                                            width: 800,
                                            height: 600,
                                            priority: true,
                                            className: "w-full h-auto object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 328,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "absolute z-20 -bottom-12 md:-bottom-16 left-12 md:-left-6 w-[35%] md:w-[45%] border-[4px] md:border-[8px] border-white rounded-lg shadow-2xl overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-468171cc8097bfc1" + " " + "aspect-square relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                src: "/keithpicture.jpg",
                                                alt: "Keith",
                                                fill: true,
                                                className: "object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 344,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 343,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "absolute z-30 -bottom-16 md:-bottom-24 left-12 md:-left-6 w-[35%] md:w-[45%] flex justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-468171cc8097bfc1" + " " + "text-white font-black text-xs md:text-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_0px_8px_rgba(0,0,0,0.6)] text-center",
                                            children: "Co-Founder Keith Wiebe Gordon"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "absolute -top-12 -right-12 w-full h-full bg-white/50 rounded-full blur-3xl -z-10"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 362,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 325,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                    lineNumber: 274,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: villageRef,
                className: "jsx-468171cc8097bfc1" + " " + "relative w-full h-[80vh] md:h-[90vh] lg:h-screen sticky top-0 z-0 overflow-hidden bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "w-full h-full absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden",
                    style: {
                        y: villageY
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                        className: "jsx-468171cc8097bfc1" + " " + "w-full h-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                srcSet: "/fullvillage.webp",
                                type: "image/webp",
                                className: "jsx-468171cc8097bfc1"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/fullvillage.jpg",
                                alt: "Full village landscape",
                                className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover scale-110"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 381,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 379,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                    lineNumber: 375,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 374,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: featuredSectionRef,
                className: "jsx-468171cc8097bfc1" + " " + "relative bg-white py-12 md:py-16 lg:py-24 overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-468171cc8097bfc1" + " " + "container mx-auto px-6 md:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-468171cc8097bfc1" + " " + "text-center mb-8 md:mb-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "jsx-468171cc8097bfc1" + " " + "text-xs uppercase tracking-widest-xl text-[#1a2621]/50",
                                    children: "Available Properties"
                                }, void 0, false, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 394,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl md:text-3xl lg:text-4xl mt-4 text-[#1a2621]",
                                    children: "Featured Units & Homes"
                                }, void 0, false, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 395,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 393,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-468171cc8097bfc1" + " " + "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-468171cc8097bfc1" + " " + "bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setGardenFlatImage((prev)=>(prev + 1) % 3),
                                            className: "jsx-468171cc8097bfc1" + " " + "relative h-80 overflow-hidden group cursor-pointer md:cursor-default",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/seniorgarden.jpg",
                                                    alt: "Garden Flat - Ground level 2-bedroom townhome with garden access",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${gardenFlatImage === 0 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-0`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/gbedroom.jpg",
                                                    alt: "Garden Flat - Cozy bedroom interior",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${gardenFlatImage === 1 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 414,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/gkitchen.jpg",
                                                    alt: "Garden Flat - Functional kitchen interior",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${gardenFlatImage === 2 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 group-hover:delay-1000`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute top-4 left-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg",
                                                        children: "GROUND"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 432,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-16 right-4 md:hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm",
                                                        children: "Tap to explore"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-4 left-4 right-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
                                                            },
                                                            className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl text-white drop-shadow-lg",
                                                            children: "Garden Flat"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                                                            },
                                                            className: "jsx-468171cc8097bfc1" + " " + "text-white/90 text-sm",
                                                            children: "2-Bedroom • 807 sq ft • From $249,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 400,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-468171cc8097bfc1" + " " + "p-8 flex flex-col flex-grow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "mb-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-468171cc8097bfc1",
                                                                    children: "Best For:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 448,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " First-time buyers, seniors/downsizers, or those with mobility needs.",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                    className: "jsx-468171cc8097bfc1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 448,
                                                                    columnNumber: 116
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-468171cc8097bfc1",
                                                                    children: "Selling Point:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 449,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " Single-level living with zero stairs and direct patio access."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "hidden md:block space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "2 Bedrooms:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 453,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Primary with ensuite + guest/office"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 453,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 452,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "Open Concept:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 456,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Kitchen, dining & living flow together"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 456,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 455,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "Direct Access:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 459,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Grade-level patio for easy outdoor living"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 459,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 458,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "mt-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/Merritt/floorplans",
                                                        className: "w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg hover:bg-[#8b7355] transition-colors text-sm font-semibold inline-block text-center glow-hover",
                                                        children: "View Floor Plan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 399,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-468171cc8097bfc1" + " " + "bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>setSkyTownhomeImage((prev)=>(prev + 1) % 3),
                                            className: "jsx-468171cc8097bfc1" + " " + "relative h-80 overflow-hidden group cursor-pointer md:cursor-default",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/family.jpg",
                                                    alt: "Sky Townhome - Two-story 3-bedroom townhome exterior",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${skyTownhomeImage === 0 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-0`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 481,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/sbedroom.jpg",
                                                    alt: "Sky Townhome - Master bedroom interior",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${skyTownhomeImage === 1 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 490,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/skitchen.jpg",
                                                    alt: "Sky Townhome - Modern kitchen interior",
                                                    loading: "lazy",
                                                    className: "jsx-468171cc8097bfc1" + " " + `absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${skyTownhomeImage === 2 ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 group-hover:delay-1000`
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute top-4 left-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "w-20 md:w-16 h-8 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-[9px] md:text-[10px] shadow-lg px-2",
                                                        children: "2-STORY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 508,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 507,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-16 right-4 md:hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm",
                                                        children: "Tap to explore"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 512,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-4 left-4 right-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            style: {
                                                                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
                                                            },
                                                            className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl text-white drop-shadow-lg",
                                                            children: "Sky Townhome"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 517,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            style: {
                                                                textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                                                            },
                                                            className: "jsx-468171cc8097bfc1" + " " + "text-white/90 text-sm",
                                                            children: "3-Bedroom • 1,614 sq ft • From $279,000"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 518,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 516,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-468171cc8097bfc1" + " " + "p-8 flex flex-col flex-grow",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "mb-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-468171cc8097bfc1",
                                                                    children: "Best For:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 524,
                                                                    columnNumber: 21
                                                                }, this),
                                                                ' Growing families, young professionals, or buyers wanting a "house-like" feel.',
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                                    className: "jsx-468171cc8097bfc1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 524,
                                                                    columnNumber: 125
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    className: "jsx-468171cc8097bfc1",
                                                                    children: "Selling Point:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 525,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " Massive two-story home with separate living and sleeping floors."
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 523,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "hidden md:block space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "Master Suite:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 529,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Spacious with walk-in closet & ensuite"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 529,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 528,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "Entertainer's Kitchen:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 532,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Large U-shaped with window"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 532,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 531,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 text-sm",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                className: "jsx-468171cc8097bfc1",
                                                                                children: "Private Deck:"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                                lineNumber: 535,
                                                                                columnNumber: 67
                                                                            }, this),
                                                                            " Balcony off the living area"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                    lineNumber: 534,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 527,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 522,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-468171cc8097bfc1" + " " + "mt-6",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/Merritt/floorplans",
                                                        className: "w-full bg-[#a6906c] text-white py-3 px-4 rounded-lg hover:bg-[#8b7355] transition-colors text-sm font-semibold inline-block text-center glow-hover",
                                                        children: "View Floor Plan"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 539,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: leftTreeRef,
                            className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-0 left-8 md:left-12 w-96 md:w-[32rem] pointer-events-none z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/trees1.png",
                                alt: "Decorative pine tree",
                                width: 500,
                                height: 1500,
                                className: "object-contain w-full h-auto"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 553,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 552,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: rightTreeRef,
                            className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-0 right-8 md:right-12 w-96 md:w-[32rem] pointer-events-none z-20",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/trees2.png",
                                alt: "Decorative pine tree",
                                width: 500,
                                height: 1500,
                                className: "object-contain w-full h-auto"
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 563,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 562,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: amenitiesSectionRef,
                id: "expertise",
                className: "jsx-468171cc8097bfc1" + " " + "relative overflow-hidden py-12 md:py-20 border-t border-[#e6e2da]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: mountainRef,
                        className: "jsx-468171cc8097bfc1" + " " + "absolute top-[-100px] left-0 right-0 w-full h-full z-0 pointer-events-none opacity-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: "/mountains.png?v=2",
                            alt: "Merritt Mountains background",
                            fill: true,
                            className: "object-cover",
                            style: {
                                objectPosition: 'center 0%'
                            },
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 579,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "container mx-auto px-6 md:px-6 relative z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "text-center mb-8 md:mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-468171cc8097bfc1" + " " + "text-xs uppercase tracking-widest-xl text-[#1a2621]/50",
                                        children: "Location Advantages"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 592,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-468171cc8097bfc1" + " " + "font-serif text-3xl md:text-4xl mt-4 text-[#1a2621]",
                                        children: "Three Best Amenities"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 593,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 591,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "grid grid-cols-1 lg:grid-cols-3 gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "relative h-64 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/NVIT.jpg",
                                                        alt: "Nicola Valley Institute of Technology campus",
                                                        loading: "lazy",
                                                        className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute top-4 left-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 607,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 606,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-4 left-4 right-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl text-white drop-shadow-lg",
                                                                children: "Walking Distance"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 610,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "text-white/90 text-sm",
                                                                children: "Car-free lifestyle"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 611,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 609,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "p-8 md:p-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base",
                                                        children: "These quality amenities provide exceptional convenience, allowing residents to walk to education, dining, and entertainment - perfect for busy professionals and growing families."
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 615,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "NVIT Campus"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 620,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "850m walk • 12 minutes"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 621,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 619,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Game On Sports Bar"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "Next door • 3701 De Wolf Way"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 625,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 623,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 618,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 614,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 597,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "relative h-64 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/shoppingmerritt.jpg",
                                                        alt: "Merritt shopping and retail amenities",
                                                        loading: "lazy",
                                                        className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute top-4 left-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg",
                                                            children: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 642,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-4 left-4 right-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl text-white drop-shadow-lg",
                                                                children: "Shopping & Essentials"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 645,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "text-white/90 text-sm",
                                                                children: "2-5 minute drive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 646,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 633,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "p-8 md:p-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base",
                                                        children: "Located just north of the Coquihalla interchange - home to all major retailers and services."
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Walmart"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 655,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "1.9km • 6 min drive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 656,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "No Frills"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "Down the road"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 660,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 658,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Canadian Tire"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 663,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "Highway hub"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 664,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 662,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 649,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 632,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-468171cc8097bfc1" + " " + "bg-white rounded-xl shadow-xl border border-[#e6e2da] overflow-hidden group hover:shadow-2xl transition-all duration-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "relative h-64 overflow-hidden",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "/merrittpool.jpg",
                                                        alt: "Merritt aquatic centre and recreational facilities",
                                                        loading: "lazy",
                                                        className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 673,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute top-4 left-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-468171cc8097bfc1" + " " + "w-12 h-12 bg-[#a6906c] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg",
                                                            children: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                            lineNumber: 681,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 680,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "absolute bottom-4 left-4 right-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                style: {
                                                                    textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl text-white drop-shadow-lg",
                                                                children: "Schools & Recreation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 684,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                                                                },
                                                                className: "jsx-468171cc8097bfc1" + " " + "text-white/90 text-sm",
                                                                children: "5-10 minute drive"
                                                            }, void 0, false, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 685,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 683,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 672,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-468171cc8097bfc1" + " " + "p-8 md:p-8",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/70 leading-relaxed mb-4 text-sm md:text-base",
                                                        children: "Short commute to Merritt's educational and recreational facilities in the town center."
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 689,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-468171cc8097bfc1" + " " + "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Elementary & Secondary Schools"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 694,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "10 min drive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 693,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Aquatic Centre"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 698,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "10 min drive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 699,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 697,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-468171cc8097bfc1" + " " + "border-l-4 border-[#a6906c] pl-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "font-semibold text-[#1a2621] text-sm",
                                                                        children: "Central Park"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 702,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-xs",
                                                                        children: "10 min drive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                        lineNumber: 703,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                                lineNumber: 701,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 688,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 671,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 595,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "text-center mt-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/Merritt/neighbourhood",
                                    className: "inline-block bg-[#a6906c] text-white px-8 py-4 text-lg font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#8b7355] transition-all duration-300 cursor-pointer glow-hover",
                                    children: "Explore the Complete Neighbourhood Guide"
                                }, void 0, false, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 712,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 711,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 590,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 575,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "jsx-468171cc8097bfc1" + " " + "relative z-10 bg-[#1a2621] text-[#f9f8f6] py-24 relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"
                    }, void 0, false, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 724,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "container mx-auto px-6 md:px-6 relative z-10 flex flex-col lg:flex-row gap-12 md:gap-16 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "w-full lg:w-1/3 px-4 md:px-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#a6906c] text-xs tracking-widest uppercase mb-4 block",
                                        children: "Location"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 727,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "jsx-468171cc8097bfc1" + " " + "font-serif text-3xl mb-6",
                                        children: "3757 De Wolf Way"
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 728,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-468171cc8097bfc1" + " " + "text-[#e6e2da] leading-relaxed mb-8 font-light text-sm md:text-base",
                                        children: "Located in the heart of Merritt, BC, our 48-unit townhome development at 3757 De Wolf Way offers the perfect balance of urban convenience and natural beauty in the scenic Nicola Valley."
                                    }, void 0, false, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 729,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "jsx-468171cc8097bfc1" + " " + "space-y-4 text-sm tracking-wide",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-468171cc8097bfc1" + " " + "flex items-center gap-3 border-b border-white/10 pb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "text-[#a6906c] w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 91
                                                    }, this),
                                                    " Prime Merritt Location"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 731,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-468171cc8097bfc1" + " " + "flex items-center gap-3 border-b border-white/10 pb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "text-[#a6906c] w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 732,
                                                        columnNumber: 91
                                                    }, this),
                                                    " Walking Distance to Amenities"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 732,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "jsx-468171cc8097bfc1" + " " + "flex items-center gap-3 border-b border-white/10 pb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                        className: "text-[#a6906c] w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                        lineNumber: 733,
                                                        columnNumber: 91
                                                    }, this),
                                                    " Easy Highway Access"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 733,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                        lineNumber: 730,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 726,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-468171cc8097bfc1" + " " + "w-full lg:w-2/3 h-[400px] bg-[#23362b] rounded-lg overflow-hidden shadow-2xl border border-white/10 relative group px-4 md:px-0",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3254.789!2d-120.762!3d50.1205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54813f8b4e6c9b9f%3A0x3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!2s3757%20De%20Wolf%20Way%2C%20Merritt%2C%20BC!5e0!3m2!1sen!2sca!4v1715123456789!5m2!1sen!2sca",
                                    width: "100%",
                                    height: "100%",
                                    style: {
                                        border: 0
                                    },
                                    allowFullScreen: true,
                                    loading: "lazy",
                                    className: "jsx-468171cc8097bfc1" + " " + "opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                                }, void 0, false, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 737,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                lineNumber: 736,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 723,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "contact",
                className: "jsx-468171cc8097bfc1" + " " + "relative z-10 py-12 md:py-16 bg-[#f9f8f6] overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "absolute inset-0 opacity-5 pointer-events-none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "/happyfamily.jpg",
                            alt: "Happy family background",
                            className: "jsx-468171cc8097bfc1" + " " + "w-full h-full object-cover"
                        }, void 0, false, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 746,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 745,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-468171cc8097bfc1" + " " + "container mx-auto px-6 md:px-8 relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-468171cc8097bfc1" + " " + "max-w-4xl mx-auto bg-white p-6 md:p-8 lg:p-12 shadow-2xl shadow-[#1a2621]/5 relative overflow-hidden reveal",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-468171cc8097bfc1" + " " + "absolute top-0 left-0 w-full h-2 bg-[#1a2621]"
                                }, void 0, false, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 754,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-468171cc8097bfc1" + " " + "text-center mb-6 md:mb-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-468171cc8097bfc1" + " " + "font-serif text-2xl md:text-3xl text-[#1a2621] mb-3",
                                            children: "Register Your Interest"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 756,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "jsx-468171cc8097bfc1" + " " + "text-[#1a2621]/60 text-sm md:text-base",
                                            children: "Join our interest list for affordable housing in Merritt, BC."
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 757,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 755,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "jsx-468171cc8097bfc1" + " " + "space-y-4 md:space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-468171cc8097bfc1" + " " + "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "First Name",
                                                    className: "jsx-468171cc8097bfc1" + " " + "bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 761,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Last Name",
                                                    className: "jsx-468171cc8097bfc1" + " " + "bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 762,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 760,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            placeholder: "Email Address",
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 764,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "tel",
                                            placeholder: "Phone Number",
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 765,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Select Unit Type"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 767,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "2-Bedroom Garden Flat"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 768,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "3-Bedroom Sky Townhome"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 769,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Corner Unit"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "General Inquiry"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 771,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 766,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Current Location"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 774,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Kamloops Area"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 775,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Kelowna Area"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 776,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Vancouver Area"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 777,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Other BC Location"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 778,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 773,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors text-[#1a2621]/70 text-base md:text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "How did you hear about us?"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 781,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Online Search"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 782,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Social Media"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 783,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Referral from friend/family"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 784,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Real estate agent"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 785,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Newspaper/magazine"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 786,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Billboard/signage"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Community event"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    className: "jsx-468171cc8097bfc1",
                                                    children: "Other"
                                                }, void 0, false, {
                                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                    lineNumber: 789,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 780,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            rows: 3,
                                            placeholder: "Tell us about your housing needs and timeline...",
                                            className: "jsx-468171cc8097bfc1" + " " + "w-full bg-transparent border-b border-[#1a2621]/20 py-3 md:py-3 outline-none focus:border-[#a6906c] transition-colors placeholder-[#1a2621]/40 text-base md:text-sm resize-none"
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 791,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-468171cc8097bfc1" + " " + "pt-4 md:pt-6 text-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$merritt$2d$backup$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "jsx-468171cc8097bfc1" + " " + "inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 text-base font-bold uppercase tracking-wider hover:bg-white/30 hover:border-white/50 transition-all duration-300 rounded-lg shadow-lg cursor-pointer",
                                                children: "Register Interest"
                                            }, void 0, false, {
                                                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                                lineNumber: 794,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                            lineNumber: 793,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                                    lineNumber: 759,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                            lineNumber: 753,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                        lineNumber: 752,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/merritt-backup/app/HomeClient.tsx",
                lineNumber: 743,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/merritt-backup/app/HomeClient.tsx",
        lineNumber: 127,
        columnNumber: 5
    }, this));
}
}),
];

//# sourceMappingURL=merritt-backup_app_HomeClient_tsx_565783ea._.js.map