module.exports = [
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/config/address.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Centralized Address Configuration
 * 
 * This file contains all address-related information for the organization.
 * Update the address here and it will be reflected across the entire application.
 */ /**
 * Main office address information
 */ __turbopack_context__.s([
    "AddressUtils",
    ()=>AddressUtils,
    "CONTACT_INFO",
    ()=>CONTACT_INFO,
    "OFFICE_ADDRESS",
    ()=>OFFICE_ADDRESS
]);
const OFFICE_ADDRESS = {
    // Full formatted address for display
    full: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8",
    // Address components for different use cases
    suite: "Suite 1480",
    building: "RBC Building",
    street: "885 West Georgia Street",
    city: "Vancouver",
    province: "BC",
    country: "Canada",
    postalCode: "V6C 3E8",
    // Coordinates for mapping (if needed)
    coordinates: {
        lat: 49.2827,
        lng: -123.1207
    },
    // Formatted versions for different contexts
    short: "885 West Georgia Street, Vancouver, BC",
    oneLine: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC V6C 3E8",
    // Google Maps specific formats
    googleMaps: {
        search: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8",
        directions: "Suite 1480, RBC Building, 885 West Georgia Street, Vancouver, BC Canada V6C 3E8"
    }
};
const CONTACT_INFO = {
    address: OFFICE_ADDRESS,
    phone: "604.529.6259",
    email: "info@anhart.ca",
    officeHours: {
        weekdays: "Monday - Friday: 9:00 AM - 5:00 PM"
    }
};
const AddressUtils = {
    /**
   * Get the full address for display
   */ getFullAddress: ()=>OFFICE_ADDRESS.full,
    /**
   * Get the short address for compact display
   */ getShortAddress: ()=>OFFICE_ADDRESS.short,
    /**
   * Get the one-line address for forms
   */ getOneLineAddress: ()=>OFFICE_ADDRESS.oneLine,
    /**
   * Get the address formatted for Google Maps search
   */ getGoogleMapsAddress: ()=>OFFICE_ADDRESS.googleMaps.search,
    /**
   * Get the address formatted for Google Maps directions
   */ getGoogleMapsDirectionsAddress: ()=>OFFICE_ADDRESS.googleMaps.directions,
    /**
   * Get address components as an array for display
   */ getAddressLines: ()=>[
            OFFICE_ADDRESS.suite,
            OFFICE_ADDRESS.building,
            OFFICE_ADDRESS.street,
            `${OFFICE_ADDRESS.city}, ${OFFICE_ADDRESS.province} ${OFFICE_ADDRESS.postalCode}`,
            OFFICE_ADDRESS.country
        ],
    /**
   * Get coordinates for mapping
   */ getCoordinates: ()=>OFFICE_ADDRESS.coordinates
};
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/utils/externalLinks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSafeExternalLinkHandler",
    ()=>createSafeExternalLinkHandler,
    "isPopupBlockingLikely",
    ()=>isPopupBlockingLikely,
    "navigateToExternalLink",
    ()=>navigateToExternalLink,
    "openExternalLink",
    ()=>openExternalLink,
    "openGoogleMapsDirections",
    ()=>openGoogleMapsDirections,
    "openGoogleMapsSearch",
    ()=>openGoogleMapsSearch
]);
'use client';
const openExternalLink = (url, fallbackUrl)=>{
    // Validate URL first
    if (!url || !isValidUrl(url)) {
        console.error('Invalid URL provided:', url);
        showExternalLinkInstructions(url, fallbackUrl);
        return;
    }
    try {
        // Method 1: Direct window.open with immediate execution
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        // More robust popup blocking detection
        if (newWindow === null || newWindow === undefined) {
            throw new Error('Popup blocked - window.open returned null');
        }
        // Additional check for blocked popups
        setTimeout(()=>{
            try {
                if (newWindow.closed) {
                    throw new Error('Popup was closed immediately');
                }
            } catch (e) {
                console.warn('Popup may have been blocked:', e);
                fallbackToAlternativeMethods(url, fallbackUrl);
            }
        }, 100);
    } catch (error) {
        console.warn('window.open failed:', error);
        fallbackToAlternativeMethods(url, fallbackUrl);
    }
};
/**
 * Validates if a string is a valid URL
 */ const isValidUrl = (string)=>{
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};
/**
 * Alternative methods when window.open fails
 */ const fallbackToAlternativeMethods = (url, fallbackUrl)=>{
    try {
        // Method 2: Create and click a link element
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Make it invisible but accessible
        link.style.position = 'absolute';
        link.style.left = '-9999px';
        link.style.opacity = '0';
        link.setAttribute('aria-hidden', 'true');
        document.body.appendChild(link);
        // Trigger click programmatically
        link.click();
        // Clean up
        setTimeout(()=>{
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
        }, 100);
    } catch (fallbackError) {
        console.error('All automatic methods failed:', fallbackError);
        showExternalLinkInstructions(url, fallbackUrl);
    }
};
const openGoogleMapsDirections = (address, origin)=>{
    if (!address?.trim()) {
        console.error('No address provided for Google Maps');
        return;
    }
    const encodedAddress = encodeURIComponent(address.trim());
    const encodedOrigin = origin ? encodeURIComponent(origin.trim()) : '';
    const urls = [
        // Modern Google Maps API URL
        `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}${encodedOrigin ? `&origin=${encodedOrigin}` : ''}`,
        // Fallback: Traditional maps URL
        `https://maps.google.com/maps?daddr=${encodedAddress}${encodedOrigin ? `&saddr=${encodedOrigin}` : ''}`,
        // Last resort: Search URL
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`
    ];
    // Try the first URL with enhanced error handling
    openExternalLink(urls[0], urls[1]);
};
const openGoogleMapsSearch = (address)=>{
    if (!address?.trim()) {
        console.error('No address provided for Google Maps search');
        return;
    }
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    openExternalLink(url);
};
/**
 * Enhanced user instructions with better UX
 */ const showExternalLinkInstructions = (url, fallbackUrl)=>{
    const message = `Unable to open the link automatically due to browser security settings.\n\nPlease copy and paste this address into your browser:\n${url}${fallbackUrl ? `\n\nAlternative URL: ${fallbackUrl}` : ''}`;
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url).then(()=>{
            alert('Link copied to clipboard! You can now paste it in your browser address bar.');
        }).catch(()=>{
            // Fall back to legacy method
            legacyCopyToClipboard(url, message);
        });
    } else {
        // Use legacy method for older browsers or non-secure contexts
        legacyCopyToClipboard(url, message);
    }
};
/**
 * Legacy clipboard method for older browsers
 */ const legacyCopyToClipboard = (text, fallbackMessage)=>{
    const userWantsCopy = window.confirm('Link blocked by browser security. Would you like to copy the address to your clipboard?');
    if (!userWantsCopy) {
        alert(fallbackMessage);
        return;
    }
    try {
        // Create temporary textarea
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // Style to be invisible but still functional
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';
        textArea.setAttribute('readonly', '');
        textArea.setAttribute('aria-hidden', 'true');
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
            alert('Address copied to clipboard! You can now paste it in your browser.');
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        alert(fallbackMessage);
    }
};
const createSafeExternalLinkHandler = (url, fallbackUrl)=>{
    return (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // Ensure this is called synchronously with the user interaction
        openExternalLink(url, fallbackUrl);
    };
};
const navigateToExternalLink = (url)=>{
    if (!isValidUrl(url)) {
        console.error('Invalid URL provided:', url);
        return;
    }
    try {
        window.location.assign(url);
    } catch (error) {
        console.error('Navigation failed:', error);
        showExternalLinkInstructions(url);
    }
};
const isPopupBlockingLikely = ()=>{
    // Test if we can open a popup to about:blank
    try {
        const testWindow = window.open('', '_test', 'width=1,height=1');
        if (testWindow) {
            testWindow.close();
            return false;
        }
        return true;
    } catch  {
        return true;
    }
};
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;
const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST"
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_TOAST":
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case "UPDATE_TOAST":
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case "DISMISS_TOAST":
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: "UPDATE_TOAST",
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: "DISMISS_TOAST",
            toastId: id
        });
    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: "DISMISS_TOAST",
                toastId
            })
    };
}
;
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useNewsletterSubscription.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNewsletterSubscription",
    ()=>useNewsletterSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/use-toast.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
'use client';
;
;
const useNewsletterSubscription = ()=>{
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Google Apps Script URL for newsletter subscriptions
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfMQYjHKQSR5lOwodWizxUoY4NgB1y03O3tAbHSBCV4ZgpgDbu-4xNbkUTl18lTZzw/exec";
    const subscribe = async (email)=>{
        if (!email || !email.includes('@')) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            return false;
        }
        setIsSubmitting(true);
        try {
            console.log('Subscribing email to newsletter via Google Apps Script:', email);
            // Build URL-encoded body for Google Apps Script
            const body = new URLSearchParams();
            body.append("email", email);
            body.append("form_type", "newsletter");
            body.append("timestamp", new Date().toISOString());
            body.append("userAgent", navigator.userAgent);
            body.append("referrer", document.referrer);
            console.log("Newsletter request body:", body.toString());
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body.toString()
            });
            console.log("Newsletter response status:", response.status, response.statusText);
            if (!response.ok) {
                console.error("HTTP Error during newsletter subscription:", response.status, response.statusText);
                throw new Error(`Script responded with status ${response.status}.`);
            }
            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Successfully Subscribed!",
                    description: "Thank you for subscribing! Check your email for confirmation."
                });
                return true;
            } else {
                console.error("Google Script Error:", result.error || "No specific error message provided.");
                toast({
                    title: "Subscription Failed",
                    description: result.error || "Failed to subscribe to newsletter. Please try again.",
                    variant: "destructive"
                });
                return false;
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast({
                title: "Subscription Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive"
            });
            return false;
        } finally{
            setIsSubmitting(false);
        }
    };
    return {
        subscribe,
        isSubmitting
    };
};
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useScrollAnimation.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const useScrollAnimation = (options = {})=>{
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (triggerOnce) {
                    observer.unobserve(element);
                }
            } else if (!triggerOnce) {
                setIsVisible(false);
            }
        }, {
            threshold,
            rootMargin
        });
        observer.observe(element);
        return ()=>{
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [
        threshold,
        rootMargin,
        triggerOnce
    ]);
    return {
        ref,
        isVisible
    };
};
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/structuredData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Structured data for SEO
__turbopack_context__.s([
    "breadcrumbStructuredData",
    ()=>breadcrumbStructuredData,
    "faqStructuredData",
    ()=>faqStructuredData,
    "housingProjectStructuredData",
    ()=>housingProjectStructuredData,
    "localBusinessStructuredData",
    ()=>localBusinessStructuredData,
    "organizationStructuredData",
    ()=>organizationStructuredData,
    "projectStructuredData",
    ()=>projectStructuredData,
    "provinceBusinessSchemas",
    ()=>provinceBusinessSchemas,
    "websiteStructuredData",
    ()=>websiteStructuredData
]);
'use client';
const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": [
        "Organization",
        "NonProfitOrganization",
        "HousingProvider"
    ],
    "name": "Anhart Affordable Housing",
    "alternateName": [
        "Anhart",
        "Anhart Housing",
        "Anhart Non-Profit Housing"
    ],
    "url": "https://anhart.ca",
    "logo": "https://anhart.ca/images/anhart-logo.png",
    "description": "Leading non-profit affordable housing solutions across Canada. We develop, manage, and advocate for SROs, modular homes, micro-suites, and supportive housing that creates inclusive communities for low-income families and individuals.",
    "foundingDate": "2000",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "5003 Station Terminal",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "V6B 4A9",
        "addressCountry": "CA"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-6045296259",
        "contactType": "customer service",
        "email": "info@anhart.ca",
        "availableLanguage": "English"
    },
    "sameAs": [
        "https://twitter.com/anhart_housing",
        "https://linkedin.com/company/anhart-affordable-housing",
        "https://facebook.com/anhartaffordablehousing",
        "https://instagram.com/anhart_housing",
        "https://youtube.com/@anhartaffordablehousing",
        "https://vimeo.com/anharthousing",
        "https://flickr.com/photos/anhart-housing",
        "https://pinterest.com/anhart_housing",
        "https://tiktok.com/@anhart_housing",
        "https://medium.com/@anhart_housing",
        "https://issuu.com/anhart_housing",
        "https://slideshare.net/anhart_housing"
    ],
    "areaServed": [
        {
            "@type": "Country",
            "name": "Canada"
        },
        {
            "@type": "State",
            "name": "British Columbia",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Vancouver"
                },
                {
                    "@type": "City",
                    "name": "Hope"
                },
                {
                    "@type": "City",
                    "name": "Merritt"
                },
                {
                    "@type": "City",
                    "name": "Victoria"
                },
                {
                    "@type": "City",
                    "name": "Surrey"
                },
                {
                    "@type": "City",
                    "name": "Burnaby"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Alberta",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Calgary"
                },
                {
                    "@type": "City",
                    "name": "Edmonton"
                },
                {
                    "@type": "City",
                    "name": "Red Deer"
                },
                {
                    "@type": "City",
                    "name": "Lethbridge"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Manitoba",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Winnipeg"
                },
                {
                    "@type": "City",
                    "name": "Brandon"
                },
                {
                    "@type": "City",
                    "name": "Steinbach"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Ontario",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Toronto"
                },
                {
                    "@type": "City",
                    "name": "Ottawa"
                },
                {
                    "@type": "City",
                    "name": "Hamilton"
                },
                {
                    "@type": "City",
                    "name": "London"
                },
                {
                    "@type": "City",
                    "name": "Kitchener"
                },
                {
                    "@type": "City",
                    "name": "Windsor"
                }
            ]
        }
    ],
    "serviceType": [
        "Affordable Housing Development",
        "SRO Conversion",
        "Modular Housing",
        "Micro-Suite Development",
        "Supportive Housing",
        "Non-Profit Housing Management"
    ],
    "keywords": [
        "affordable housing",
        "SROs",
        "modular homes",
        "non-profit housing",
        "low-income housing",
        "subsidized housing",
        "below-market housing",
        "supportive housing",
        "inclusionary housing",
        "affordability",
        "micro-suites",
        "micro-units",
        "vacancy development",
        "derelict homes",
        "single room occupancy",
        "social housing",
        "community housing",
        "rental housing",
        "housing continuum",
        "transitional housing",
        "affordable housing Vancouver",
        "affordable housing Toronto",
        "affordable housing Calgary",
        "affordable housing Edmonton",
        "affordable housing Winnipeg",
        "affordable housing Ottawa",
        "affordable housing Hamilton",
        "affordable housing BC",
        "affordable housing Alberta",
        "affordable housing Manitoba",
        "affordable housing Ontario",
        "SRO conversion Vancouver",
        "SRO conversion Toronto",
        "modular housing BC",
        "modular housing Alberta",
        "modular housing Ontario",
        "micro-suites Vancouver",
        "micro-suites Toronto",
        "supportive housing Calgary",
        "supportive housing Winnipeg",
        "community housing development",
        "housing solutions Canada",
        "non-profit housing development"
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Affordable Housing Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Affordable Rental Housing Development",
                    "description": "Development of safe, secure, and reasonably priced rental homes for individuals and families"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "SRO and Hotel Conversions",
                    "description": "Revitalizing aging single-room occupancy buildings into modern, affordable homes"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Housing Continuum Development",
                    "description": "Creating micro-suites as transitional housing from shelters to permanent housing"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Modular Housing Solutions",
                    "description": "Innovative modular construction for rapid, cost-effective housing delivery"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Supportive Housing Services",
                    "description": "Housing with integrated support services for vulnerable populations"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Community Development",
                    "description": "Building thriving, inclusive communities through integrated housing and support services"
                }
            }
        ]
    },
    "knowsAbout": [
        "Affordable Housing Policy",
        "Housing Development",
        "Community Planning",
        "Social Housing",
        "Housing Finance",
        "Modular Construction",
        "SRO Management",
        "Housing Advocacy"
    ]
};
const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Anhart Affordable Housing",
    "url": "https://anhart.ca",
    "description": "Anhart Affordable Housing provides innovative affordable housing solutions coast to coast to coast. We lead, support, and advocate for non-profit housing that creates inclusive communities.",
    "publisher": {
        "@type": "Organization",
        "name": "Anhart Affordable Housing",
        "logo": {
            "@type": "ImageObject",
            "url": "https://anhart.ca/images/anhart-logo.png"
        }
    },
    "potentialAction": {
        "@type": "SearchAction",
        "target": "https://anhart.ca/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
    }
};
const breadcrumbStructuredData = (items)=>({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index)=>({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": `https://anhart.ca${item.url}`
            }))
    });
const projectStructuredData = (project)=>({
        "@context": "https://schema.org",
        "@type": "Project",
        "name": project.name,
        "description": project.description,
        "location": {
            "@type": "Place",
            "name": project.location
        },
        "dateCompleted": project.dateCompleted,
        "image": project.image,
        "sponsor": {
            "@type": "Organization",
            "name": "Anhart Affordable Housing"
        }
    });
const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is affordable housing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Affordable housing refers to housing units that are affordable to households with incomes below the median income in their area. This includes SROs, modular homes, micro-suites, and other below-market housing options that provide safe, secure, and reasonably priced homes for individuals and families."
            }
        },
        {
            "@type": "Question",
            "name": "What are SROs and how do they help with affordable housing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "SROs (Single Room Occupancy) are small, self-contained units that provide affordable housing in urban areas. We convert aging SRO buildings into modern, affordable homes that preserve community character while providing safe, secure housing for low-income individuals."
            }
        },
        {
            "@type": "Question",
            "name": "What are modular homes and how do they provide affordable housing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Modular homes are prefabricated housing units built in factories and assembled on-site. They provide rapid, cost-effective housing delivery while maintaining quality standards. Our modular housing solutions include tiny homes and multi-unit developments that create affordable communities."
            }
        },
        {
            "@type": "Question",
            "name": "What is supportive housing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Supportive housing combines affordable housing with integrated support services for vulnerable populations. This includes housing with on-site services for individuals experiencing homelessness, mental health challenges, or other barriers to stable housing."
            }
        },
        {
            "@type": "Question",
            "name": "What are micro-suites and how do they help with housing affordability?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Micro-suites are compact, self-contained living units that provide an affordable stepping stone from emergency shelters to permanent housing. They offer privacy and stability while being cost-effective to build and maintain, helping address housing shortages in urban areas."
            }
        },
        {
            "@type": "Question",
            "name": "How does Anhart develop affordable housing projects?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Anhart develops affordable housing through partnerships with communities, non-profit organizations, and government agencies. We provide no-cost pre-development services, architectural feasibility studies, and comprehensive project management to create sustainable, affordable housing solutions."
            }
        }
    ]
};
const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": [
        "LocalBusiness",
        "NonProfitOrganization"
    ],
    "name": "Anhart Affordable Housing",
    "image": "https://anhart.ca/images/anhart-logo.png",
    "description": "Non-profit affordable housing development organization serving communities across British Columbia, Alberta, Manitoba, and Ontario.",
    "url": "https://anhart.ca",
    "telephone": "+1-6045296259",
    "email": "info@anhart.ca",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "5003 Station Terminal",
        "addressLocality": "Vancouver",
        "addressRegion": "BC",
        "postalCode": "V6B 4A9",
        "addressCountry": "CA"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": "49.2827",
        "longitude": "-123.1207"
    },
    "openingHours": "Mo-Fr 09:00-17:00",
    "priceRange": "$$",
    "serviceArea": [
        {
            "@type": "State",
            "name": "British Columbia",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Vancouver"
                },
                {
                    "@type": "City",
                    "name": "Victoria"
                },
                {
                    "@type": "City",
                    "name": "Surrey"
                },
                {
                    "@type": "City",
                    "name": "Burnaby"
                },
                {
                    "@type": "City",
                    "name": "Richmond"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Alberta",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Calgary"
                },
                {
                    "@type": "City",
                    "name": "Edmonton"
                },
                {
                    "@type": "City",
                    "name": "Red Deer"
                },
                {
                    "@type": "City",
                    "name": "Lethbridge"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Manitoba",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Winnipeg"
                },
                {
                    "@type": "City",
                    "name": "Brandon"
                },
                {
                    "@type": "City",
                    "name": "Steinbach"
                }
            ]
        },
        {
            "@type": "State",
            "name": "Ontario",
            "containsPlace": [
                {
                    "@type": "City",
                    "name": "Toronto"
                },
                {
                    "@type": "City",
                    "name": "Ottawa"
                },
                {
                    "@type": "City",
                    "name": "Hamilton"
                },
                {
                    "@type": "City",
                    "name": "London"
                },
                {
                    "@type": "City",
                    "name": "Kitchener"
                },
                {
                    "@type": "City",
                    "name": "Windsor"
                }
            ]
        }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Affordable Housing Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Affordable Housing Development",
                    "description": "Complete development services for affordable housing projects across Canada"
                }
            }
        ]
    }
};
const provinceBusinessSchemas = {
    "BC": {
        "@context": "https://schema.org",
        "@type": [
            "LocalBusiness",
            "NonProfitOrganization"
        ],
        "name": "Anhart Affordable Housing - British Columbia",
        "description": "Affordable housing development services in British Columbia including Vancouver, Victoria, Surrey, and Burnaby.",
        "areaServed": {
            "@type": "State",
            "name": "British Columbia"
        },
        "keywords": "affordable housing BC, SRO conversion Vancouver, modular housing British Columbia, micro-suites Victoria, supportive housing Surrey"
    },
    "Alberta": {
        "@context": "https://schema.org",
        "@type": [
            "LocalBusiness",
            "NonProfitOrganization"
        ],
        "name": "Anhart Affordable Housing - Alberta",
        "description": "Affordable housing development services in Alberta including Calgary, Edmonton, Red Deer, and Lethbridge.",
        "areaServed": {
            "@type": "State",
            "name": "Alberta"
        },
        "keywords": "affordable housing Alberta, SRO conversion Calgary, modular housing Edmonton, micro-suites Red Deer, supportive housing Lethbridge"
    },
    "Manitoba": {
        "@context": "https://schema.org",
        "@type": [
            "LocalBusiness",
            "NonProfitOrganization"
        ],
        "name": "Anhart Affordable Housing - Manitoba",
        "description": "Affordable housing development services in Manitoba including Winnipeg, Brandon, and Steinbach.",
        "areaServed": {
            "@type": "State",
            "name": "Manitoba"
        },
        "keywords": "affordable housing Manitoba, SRO conversion Winnipeg, modular housing Brandon, micro-suites Steinbach, supportive housing Manitoba"
    },
    "Ontario": {
        "@context": "https://schema.org",
        "@type": [
            "LocalBusiness",
            "NonProfitOrganization"
        ],
        "name": "Anhart Affordable Housing - Ontario",
        "description": "Affordable housing development services in Ontario including Toronto, Ottawa, Hamilton, London, Kitchener, and Windsor.",
        "areaServed": {
            "@type": "State",
            "name": "Ontario"
        },
        "keywords": "affordable housing Ontario, SRO conversion Toronto, modular housing Ottawa, micro-suites Hamilton, supportive housing London"
    }
};
const housingProjectStructuredData = (project)=>({
        "@context": "https://schema.org",
        "@type": "Project",
        "name": project.name,
        "description": project.description,
        "location": {
            "@type": "Place",
            "name": project.location,
            "address": {
                "@type": "PostalAddress",
                "addressLocality": project.location
            }
        },
        "dateCompleted": project.completionDate,
        "image": project.image,
        "sponsor": {
            "@type": "Organization",
            "name": "Anhart Affordable Housing",
            "url": "https://anhart.ca"
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Number of Units",
                "value": project.units
            },
            {
                "@type": "PropertyValue",
                "name": "Housing Type",
                "value": project.type
            }
        ],
        "about": project.highlights.map((highlight)=>({
                "@type": "Thing",
                "name": highlight
            }))
    });
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/services/imageService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageService",
    ()=>ImageService
]);
/**
 * Image Service
 * 
 * Centralized service for handling optimized image loading,
 * format selection, and responsive image generation.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/registry.ts [app-ssr] (ecmascript)");
'use client';
;
class ImageService {
    /**
   * Get image source for specific format and size
   */ static getImageSrc(imageName, format = 'fallback', size = 'lg') {
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
        if (!image) {
            console.warn(`Image ${imageName} not found in registry`);
            return '';
        }
        if (format === 'fallback') {
            return image.fallback;
        }
        return image[format][size];
    }
    /**
   * Generate responsive srcSet for all sizes
   */ static getImageSrcSet(imageName, format = 'webp') {
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
        if (!image) {
            console.warn(`Image ${imageName} not found in registry`);
            return '';
        }
        const variants = image[format];
        if (typeof variants === 'string') {
            return variants;
        }
        return [
            `${variants.sm} 640w`,
            `${variants.md} 768w`,
            `${variants.lg} 1024w`,
            `${variants.xl} 1280w`
        ].join(', ');
    }
    /**
   * Get image configuration by category
   */ static getImageConfig(category) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["imageConfigs"][category];
    }
    /**
   * Check if image exists in registry
   */ static hasImage(imageName) {
        return imageName in __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["imageRegistry"];
    }
    /**
   * Get all available images by category
   */ static getImagesByCategory(category) {
        // This is a simplified implementation
        // In a real app, you might want to tag images with categories
        const categoryImages = {
            hero: [
                'about-hero',
                'contact-hero',
                'impact-hero',
                'media-hero',
                'partner-hero',
                'partner-hero-friendly',
                'portfolio-hero',
                'programs-hero',
                'research-hero'
            ],
            project: [
                '162Main',
                '162Main_2',
                'DodsonsRooms_1',
                'Meritt_TH_1',
                'Ryder_1',
                'Ryder_2',
                'ModularH_1',
                'AFS_1'
            ],
            portfolio: [
                'Jubilee-Sign',
                'affordapartment',
                'KLanding',
                'TheOppenhiemer',
                'skeena',
                '179Main',
                '1060howe'
            ],
            initiative: [
                'sustainable-homes-initiative',
                'affordable-living-complex',
                'urban-renewal-project'
            ],
            logo: []
        };
        return categoryImages[category] || [];
    }
    /**
   * Preload critical images
   */ static preloadImage(imageName, format = 'webp', size = 'lg') {
        return new Promise((resolve, reject)=>{
            const src = this.getImageSrc(imageName, format, size);
            if (!src) {
                reject(new Error(`Image ${imageName} not found`));
                return;
            }
            const img = new Image();
            img.onload = ()=>resolve();
            img.onerror = ()=>reject(new Error(`Failed to load image ${src}`));
            img.src = src;
        });
    }
    /**
   * Preload multiple images
   */ static async preloadImages(images) {
        const promises = images.map(({ name, format = 'webp', size = 'lg' })=>this.preloadImage(name, format, size));
        try {
            await Promise.all(promises);
        } catch (error) {
            console.warn('Some images failed to preload:', error);
        }
    }
    /**
   * Get optimal image format based on browser support
   */ static getOptimalFormat() {
        // Check for AVIF support
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return 'fallback';
    }
    /**
   * Generate responsive image data for a specific image
   */ static getResponsiveImageData(imageName) {
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
        if (!image) {
            return null;
        }
        return {
            webp: {
                srcSet: this.getImageSrcSet(imageName, 'webp'),
                fallback: image.webp.lg
            },
            avif: {
                srcSet: this.getImageSrcSet(imageName, 'avif'),
                fallback: image.avif.lg
            },
            fallback: image.fallback
        };
    }
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/about_staff.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boardMembers",
    ()=>boardMembers,
    "staff",
    ()=>staff
]);
const boardMembers = [
    {
        name: "Keith Gordon",
        role: "Co-Founder & Investments",
        bio: "Keith has spent over 25+ years bringing affordable housing projects to life across Canada. He's passionate about creating lasting communities where families can thrive.",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Crystal Wiebe",
        role: "CFO & Constructions",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Christine Wang",
        role: "Board Member",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Gradius Theonest",
        role: "Board Member",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Marcie Good",
        role: "Director",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    }
];
const staff = [
    {
        name: "Sheri King",
        role: "Business & Finances",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Reyah Sobretodo",
        role: "Operations Manager",
        bio: "",
        isLeadership: true,
        emailDomain: "anhart.ca"
    },
    {
        name: "Mariel Beltran",
        role: "Foundation Coordinator",
        bio: "",
        isLeadership: false,
        emailDomain: "anhartfoundation.ca"
    },
    {
        name: "Damon Hui",
        role: "Project Manager",
        bio: "",
        isLeadership: false,
        emailDomain: "anhart.ca"
    },
    {
        name: "Dillon Hui",
        role: "Technology & Development",
        bio: "",
        isLeadership: false,
        emailDomain: "anhart.ca"
    },
    {
        name: "Ivy Tsai",
        role: "Investments Coordinator",
        bio: "",
        isLeadership: false,
        emailDomain: "anhartinvestments.ca"
    }
];
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/about_values.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "values",
    ()=>values
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/heart.js [app-ssr] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
;
const values = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        title: "Altruism",
        description: "We guide impact investors to provide patient capital that supports sustainable growth and strengthens community well-being."
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"],
        title: "Multi-scale",
        description: "We believe that intelligence thrives at every level of a city, valuing insights from both local initiatives and regional systems."
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        title: "Systems",
        description: "We apply decentralized systems thinking to design interconnected housing solutions that empower and sustain communities."
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
        title: "Champions",
        description: "We collaborate with Community Housing Champions, local coordinators, and partners who bring expertise."
    }
];
}),
];

//# sourceMappingURL=Downloads_anhartca-main_anhartca-main_next-app_src_72a3d31f._.js.map