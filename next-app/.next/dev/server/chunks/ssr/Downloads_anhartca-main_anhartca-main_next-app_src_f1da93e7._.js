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
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useFormSubmission.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFormSubmission",
    ()=>useFormSubmission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/use-toast.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-ssr] (ecmascript)");
'use client';
;
;
// Client-side validation function (assuming it's defined elsewhere or will be kept here)
const isValidEmail = (email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
const validateFormData = (data)=>{
    const errors = [];
    // Required fields
    if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters");
    }
    if (!data.email || !isValidEmail(data.email)) {
        errors.push("Valid email address is required");
    }
    if (!data.message || data.message.trim().length < 10) {
        errors.push("Message must be at least 10 characters");
    }
    // Check for suspicious content
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /href\s*=\s*["']javascript:/i,
        /<iframe/i,
        /<object/i,
        /<embed/i
    ];
    const allText = `${data.name} ${data.email} ${data.message}`.toLowerCase();
    for (const pattern of suspiciousPatterns){
        if (pattern.test(allText)) {
            errors.push("Suspicious content detected");
            break;
        }
    }
    // Check message length
    if (data.message && data.message.length > 5000) {
        errors.push("Message is too long");
    }
    return errors;
};
const useFormSubmission = ()=>{
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    // Google Apps Script URL for form submissions
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfMQYjHKQSR5lOwodWizxUoY4NgB1y03O3tAbHSBCV4ZgpgDbu-4xNbkUTl18lTZzw/exec";
    const submitForm = async (formData)=>{
        setIsSubmitting(true);
        try {
            // Client-side validation
            const validationErrors = validateFormData(formData);
            if (validationErrors.length > 0) {
                toast({
                    title: "Validation Error",
                    description: validationErrors.join(", "),
                    variant: "destructive"
                });
                console.error("Client-side validation errors:", validationErrors);
                return false;
            }
            console.log("Submitting form data to Google Sheets:", formData);
            // Build URL-encoded body exactly as Google Apps Script expects
            const body = new URLSearchParams();
            body.append("name", formData.name);
            body.append("email", formData.email);
            body.append("message", formData.message);
            body.append("form_type", formData.form_type);
            if (formData.phone) body.append("phone", formData.phone);
            if (formData.organization) body.append("organization", formData.organization);
            if (formData.subject) body.append("subject", formData.subject);
            if (formData.investment_amount) body.append("investment_amount", formData.investment_amount);
            body.append("timestamp", new Date().toISOString());
            body.append("userAgent", navigator.userAgent);
            body.append("referrer", document.referrer);
            console.log("Request body:", body.toString());
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: body.toString()
            });
            console.log("Response status:", response.status, response.statusText);
            // --- Enhanced HTTP Error Handling ---
            if (!response.ok) {
                // Log the full response status for debugging
                console.error("HTTP Error during submission:", response.status, response.statusText);
                // Try to get more info from the response body if it's text
                let errorBodyText = `Status: ${response.status} ${response.statusText}`;
                try {
                    // Clone the response so we can read the body without affecting later calls
                    const clonedResponse = response.clone();
                    errorBodyText += `. Body: ${await clonedResponse.text()}`;
                } catch (e) {
                // Ignore if reading the body fails
                }
                // Throw an error with the status for the catch block
                throw new Error(`Script responded with status ${response.status}.`);
            }
            // ------------------------------------
            const result = await response.json();
            if (result.success) {
                toast({
                    title: "Message Sent Successfully! ",
                    description: "Thank you! Check your email for confirmation. We'll connect with you as soon as possible."
                });
                return true;
            } else {
                // Log the specific error from the Google Apps Script response
                console.error("Google Script Error:", result.error || "No specific error message provided.");
                // Display the specific error from the script, if available
                const description = result.error || "The server rejected your submission. Please try again.";
                toast({
                    title: "Submission Failed ",
                    description: description,
                    variant: "destructive"
                });
                return false;
            }
        } catch (error) {
            // --- Enhanced Unexpected Error Handling ---
            console.error("Unexpected error:", error);
            // Determine the error message to display
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (error instanceof Error) {
                errorMessage = error.message;
                // Check if it's an HTTP status error thrown above
                const match = errorMessage.match(/Script responded with status (\d+)/);
                if (match) {
                    const statusCode = match[1];
                    // User-friendly message for HTTP errors
                    errorMessage = `Submission failed. Server responded with HTTP status **${statusCode}**.`;
                }
            }
            toast({
                title: "System Error ",
                description: errorMessage,
                variant: "destructive"
            });
            // -----------------------------------------
            return false;
        } finally{
            setIsSubmitting(false);
        }
    };
    return {
        submitForm,
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
];

//# sourceMappingURL=Downloads_anhartca-main_anhartca-main_next-app_src_f1da93e7._.js.map