(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useCountUp.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCountUp",
    ()=>useCountUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const useCountUp = ({ start = 0, end, duration = 2000, startOnView = true })=>{
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(start);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountUp.useEffect": ()=>{
            if (!startOnView) {
                animateCount();
                return;
            }
            const observer = new IntersectionObserver({
                "useCountUp.useEffect": ([entry])=>{
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                        animateCount();
                    }
                }
            }["useCountUp.useEffect"], {
                threshold: 0.3
            });
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
            return ({
                "useCountUp.useEffect": ()=>observer.disconnect()
            })["useCountUp.useEffect"];
        }
    }["useCountUp.useEffect"], [
        isVisible,
        startOnView
    ]);
    const animateCount = ()=>{
        const startTime = Date.now();
        const startValue = start;
        const endValue = end;
        const updateCount = ()=>{
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for smooth animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(startValue + (endValue - startValue) * easedProgress);
            // Batch state update to avoid forced reflows
            requestAnimationFrame(()=>{
                setCount(currentCount);
            });
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        };
        requestAnimationFrame(updateCount);
    };
    return {
        count,
        elementRef
    };
};
_s(useCountUp, "yRVV/Rj9ddWG1XTRLSGc10VM6+s=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "useToast.useEffect": ()=>{
            listeners.push(setState);
            return ({
                "useToast.useEffect": ()=>{
                    const index = listeners.indexOf(setState);
                    if (index > -1) {
                        listeners.splice(index, 1);
                    }
                }
            })["useToast.useEffect"];
        }
    }["useToast.useEffect"], [
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
_s(useToast, "SPWE98mLGnlsnNfIwu/IAKTSZtk=");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useFormSubmission.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFormSubmission",
    ()=>useFormSubmission
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/use-toast.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
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
_s(useFormSubmission, "hN4RpLHLe0+G/hKFvSS+7K/ObDc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useScrollAnimation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useScrollAnimation",
    ()=>useScrollAnimation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const useScrollAnimation = (options = {})=>{
    _s();
    const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useScrollAnimation.useEffect": ()=>{
            const element = ref.current;
            if (!element) return;
            const observer = new IntersectionObserver({
                "useScrollAnimation.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        if (triggerOnce) {
                            observer.unobserve(element);
                        }
                    } else if (!triggerOnce) {
                        setIsVisible(false);
                    }
                }
            }["useScrollAnimation.useEffect"], {
                threshold,
                rootMargin
            });
            observer.observe(element);
            return ({
                "useScrollAnimation.useEffect": ()=>{
                    if (element) {
                        observer.unobserve(element);
                    }
                }
            })["useScrollAnimation.useEffect"];
        }
    }["useScrollAnimation.useEffect"], [
        threshold,
        rootMargin,
        triggerOnce
    ]);
    return {
        ref,
        isVisible
    };
};
_s(useScrollAnimation, "Wk8baY7uc+CWSrD2kMBp+I8qtIg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/useNewsletterSubscription.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useNewsletterSubscription",
    ()=>useNewsletterSubscription
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$components$2f$ui$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/components/ui/use-toast.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/hooks/use-toast.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const useNewsletterSubscription = ()=>{
    _s();
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
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
_s(useNewsletterSubscription, "hN4RpLHLe0+G/hKFvSS+7K/ObDc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/config/address.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/utils/externalLinks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/services/imageService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/assets/registry.ts [app-client] (ecmascript)");
'use client';
;
class ImageService {
    /**
   * Get image source for specific format and size
   */ static getImageSrc(imageName, format = 'fallback', size = 'lg') {
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
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
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageConfigs"][category];
    }
    /**
   * Check if image exists in registry
   */ static hasImage(imageName) {
        return imageName in __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageRegistry"];
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
        if ("TURBOPACK compile-time truthy", 1) {
            const canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = 1;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                try {
                    const dataURL = canvas.toDataURL('image/avif');
                    if (dataURL && dataURL.indexOf('data:image/avif') === 0) {
                        return 'avif';
                    }
                } catch (e) {
                // AVIF not supported
                }
            }
            // Check for WebP support
            try {
                const dataURL = canvas.toDataURL('image/webp');
                if (dataURL && dataURL.indexOf('data:image/webp') === 0) {
                    return 'webp';
                }
            } catch (e) {
            // WebP not supported
            }
        }
        return 'fallback';
    }
    /**
   * Generate responsive image data for a specific image
   */ static getResponsiveImageData(imageName) {
        const image = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$assets$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["imageRegistry"][imageName];
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/our-focus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ourFocusData",
    ()=>ourFocusData
]);
'use client';
const ourFocusData = {
    title: "Our Focus",
    pages: [
        {
            title: "Affordable Rental and Renewals & Support",
            description: "Transforming communities through innovative affordable housing.",
            cards: [
                {
                    id: 1,
                    title: "Affordable Rental Housing",
                    description: "Creating safe, secure, and reasonably priced rental homes for individuals and families.",
                    purpose: "Provide stable, affordable rental housing that serves as a foundation for community stability and individual growth.",
                    exampleProject: {
                        name: "The Ryder",
                        location: "Hope, British Columbia",
                        description: "40 affordable modular homes delivered to a rural community, prioritizing eligibility for underserved community members.",
                        image: "Ryder_1",
                        highlights: [
                            "40 affordable modular homes delivered",
                            "Rural and remote community focus",
                            "First development of affordable housing",
                            "Prioritization eligibility for under-served community members",
                            "Sustainable building materials"
                        ]
                    },
                    icon: "Home"
                },
                {
                    id: 2,
                    title: "Hotel & SRO Conversions",
                    description: "Revitalizing aging single-room occupancy buildings into modern, affordable homes.",
                    purpose: "Transform underutilized urban infrastructure into vibrant affordable housing while preserving community character.",
                    exampleProject: {
                        name: "Dodson Hotel",
                        location: "Vancouver, BC",
                        description: "Historic SRO building renovation creating 71 affordable housing units in the Downtown Eastside.",
                        image: "Dodson St",
                        highlights: [
                            "71 affordable housing units created",
                            "Historic SRO building renovation",
                            "Downtown Eastside community investment",
                            "Preserved architectural heritage",
                            "Community support services integrated"
                        ]
                    },
                    icon: "Building"
                },
                {
                    id: 3,
                    title: "Housing Continuums",
                    description: "Creating compact micro-suites as a vital first step from shelters to permanent housing.",
                    purpose: "Bridge the gap between emergency shelter and permanent housing through transitional support.",
                    exampleProject: {
                        name: "162 Main St",
                        location: "Vancouver, BC",
                        description: "69 micro-suite units providing transitional housing with comprehensive support services.",
                        image: "162MainSt",
                        highlights: [
                            "69 micro-suite units for transitional housing",
                            "Bridge from shelter to permanent housing",
                            "Comprehensive support services",
                            "Mix of micro-dwellings and retail markets",
                            "Community integration focus"
                        ]
                    },
                    icon: "Users"
                }
            ]
        },
        {
            title: "Affordable Home Ownership",
            description: "Providing low-cost intergenerational homes",
            cards: [
                {
                    id: 4,
                    title: "Affordable Home Ownership",
                    description: "Providing pathways to home ownership through innovative ownership models.",
                    purpose: "Create intergenerational wealth and community stability through accessible home ownership opportunities.",
                    exampleProject: {
                        name: "Merritt Townhomes",
                        location: "Merritt, BC",
                        description: "48 multigenerational townhome units designed to balance privacy, shared space, and equity.",
                        image: "merritt",
                        highlights: [
                            "48 multigenerational townhome units",
                            "Balanced privacy and community design",
                            "Affordable ownership opportunities",
                            "Rural community revitalization",
                            "Environmental efficient housing"
                        ]
                    },
                    icon: "Key"
                },
                {
                    id: 5,
                    title: "Modular Housing Solutions",
                    description: "Innovative modular construction for rapid, cost-effective, and local modular housing delivery.",
                    purpose: "Accelerate housing delivery through efficient, sustainable modular construction methods.",
                    exampleProject: {
                        name: "Modular Tiny Homes",
                        location: "Hope, BC",
                        description: "Modular homes combining private ownership with shared infrastructure to foster affordable, resilient communities.",
                        image: "ModularH_1",
                        highlights: [
                            "Modular tiny home units",
                            "Shared infrastructure model",
                            "Private ownership opportunities",
                            "Community resilience focus",
                            "Innovative modular construction"
                        ]
                    },
                    icon: "Layers",
                    link: "https://anhartconstruction.ca/modular"
                },
                {
                    id: 6,
                    title: "Community Development",
                    description: "Building not just homes, but thriving, inclusive communities.",
                    purpose: "Foster social cohesion and community resilience through integrated housing and support services.",
                    exampleProject: {
                        name: "Detached Homes Program",
                        location: "Various BC Locations",
                        description: "Various affordable detached home styles providing long-term ownership stability across multiple communities.",
                        image: "AFS_1",
                        highlights: [
                            "Various affordable detached home styles",
                            "Long-term ownership stability",
                            "Multiple community locations",
                            "Accessible design standards",
                            "Energy-efficient construction"
                        ]
                    },
                    icon: "Heart"
                }
            ]
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/projects.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projectPages",
    ()=>projectPages
]);
'use client';
const projectPages = [
    {
        title: "Affordable Rental and Renewals & Support",
        description: "Transforming communities through innovative affordable housing.",
        projects: [
            {
                id: 1,
                title: "Affordable Rental",
                originalTitle: "The Ryder",
                description: "Affordable rental housing provides safe, secure, and reasonably priced homes for individuals and families.",
                image: "Ryder_1",
                location: "Hope, British Columbia",
                completion_date: "2020",
                units: 40,
                status: "completed",
                type: "Modular Housing",
                highlights: [
                    "40 affordable modular homes delivered",
                    "Rural and remote community focus",
                    "First development of affordable housing",
                    "Priortization eligbility for under-served and or community members",
                    "Sustainable building materials"
                ]
            },
            {
                id: 2,
                title: "Hotel Conversion",
                originalTitle: "Dodson Hotel",
                description: "Revitalizing aging SROs into modern, affordable homes that renew communities and strengthen inner cities.",
                image: "DodsonsRooms_1",
                location: "Vancouver, BC",
                completion_date: "2025",
                units: 71,
                status: "completed",
                type: "Historic Renovation",
                highlights: [
                    "71 affordable housing units created",
                    "Historic SRO building renovation",
                    "Downtown Eastside community investment",
                    "Preserved architectural heritage",
                    "Community support services integrated"
                ]
            },
            {
                id: 3,
                title: "Housing Continuums",
                originalTitle: "162 Main St",
                description: "Creating compact micro-suites as a vital first step from shelters to permanent housing, offering stability to rebuild lives.",
                image: "162MainSt",
                location: "Vancouver, BC",
                completion_date: "2024",
                units: 69,
                status: "completed",
                type: "Micro-Suites",
                highlights: [
                    "69 micro-suite units for transitional housing",
                    "Bridge from shelter to permanent housing",
                    "Comprehensive support services",
                    "Mix of micro-dwellings and retail markets",
                    "Community integration focus"
                ]
            }
        ]
    },
    {
        title: "Affordable Home Ownership",
        description: "Providing low-cost intergenerational homes",
        projects: [
            {
                id: 4,
                title: "Affordable Town Homes",
                originalTitle: "Merritt, BC Townhomes",
                description: "Multigenerational townhomes designed to balance privacy, shared space and equity to strengthen communities.",
                image: "merritt",
                location: "Merritt, BC",
                completion_date: "2026",
                units: 35,
                status: "planned",
                type: "Townhomes",
                highlights: [
                    "48 multigenerational townhome units",
                    "Balanced privacy and community design",
                    "Affordable ownership opportunities",
                    "Rural community revitalization",
                    "Enviromental efficient housing"
                ]
            },
            {
                id: 5,
                title: "Low-cost standalone housing",
                originalTitle: "Detached Homes",
                description: "Durable, affordable homes, providing communities with accessible, long-term ownership to a path of stability.",
                image: "AFS_1",
                location: "Various BC Locations",
                units: 6,
                status: "in-progress",
                type: "Single-Family Homes",
                highlights: [
                    "Various affordable detached homes styles",
                    "Long-term ownership stability",
                    "Multiple community locations",
                    "Accessible design standards",
                    "Energy-efficient construction"
                ]
            },
            {
                id: 6,
                title: "Modular Villages",
                originalTitle: "Modular Tiny Homes",
                description: "Modular homes combining private ownership with shared infrastructure to foster affordable, resilient communities.",
                image: "ModularH_1",
                location: "Hope, BC",
                year: "2024",
                status: "in-progress",
                type: "Modular Tiny Homes",
                highlights: [
                    "Modular tiny home units",
                    "Shared infrastructure model",
                    "Private ownership opportunities",
                    "Community resilience focus",
                    "Innovative modular construction"
                ]
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "portfolioProjects",
    ()=>portfolioProjects
]);
'use client';
const portfolioProjects = [
    {
        id: 1,
        title: "Jubilee Rooms",
        location: "Vancouver, BC",
        year: "2000",
        units: 80,
        description: "Our foundational project in Vancouver's Downtown Eastside, transforming a historic building into affordable housing through innovative renovation.",
        image: "Jubilee-Sign",
        status: "completed",
        type: "Historic Renovation",
        highlights: [
            "80 affordable housing units created",
            "Historic building preservation",
            "Downtown Eastside community investment",
            "Foundational project that launched our mission",
            "Innovative renovation techniques",
            "Community support services integration"
        ]
    },
    {
        id: 2,
        title: "Dodson Hotel",
        location: "Vancouver, BC",
        year: "2004",
        units: 71,
        description: "A historical hotel renovation creating affordable housing units while preserving the character of Vancouver's Downtown Eastside. Established the early need for clean, safe and dignified housing for vulnerable individuals. ",
        image: "DodsonsRooms_1",
        status: "completed",
        type: "Hotel Conversion",
        highlights: [
            "71 affordable housing units",
            "Historic hotel conversion",
            "Preserved architectural character",
            "Downtown Eastside revitalization",
            "Community-centered design",
            "Long-term affordability secured"
        ]
    },
    {
        id: 3,
        title: "The Ryder",
        location: "Hope, BC",
        year: "2021",
        units: 40,
        description: "Delivering 40 units of modular homes that expand affordable housing efforts in rural and remote communities focusing on building and fostering residency self-sufficiency.",
        image: "Ryder_1",
        status: "completed",
        type: "Modular Housing",
        highlights: [
            "40 affordable modular homes delivered",
            "Rural and remote community focus",
            "First development of affordable housing",
            "Prioritization eligibility for under-served community members",
            "Sustainable building materials"
        ]
    },
    {
        id: 4,
        title: "162 Main",
        location: "Vancouver, BC",
        completion_date: "2023",
        units: 69,
        description: "Inner-city development that provides integrated support services and sustainable, resident-focused living environments for individuals experiencing homelessness with mental health callenges and low income.",
        image: "162Main",
        status: "completed",
        type: "Micro-Suites",
        highlights: [
            "69 micro-suite units for transitional housing",
            "Bridge from shelter to permanent housing",
            "Comprehensive support services",
            "Mix of micro-dwellings and retail markets",
            "Community integration focus"
        ]
    },
    {
        id: 5,
        title: "Merritt Village",
        location: "3757 De Wolf Way, Merritt, BC",
        year: "2026",
        units: 46,
        description: "Multigenerational townhomes community in Merritt, BC, offering affordable two- and three-bedroom units that balance privacy, shared spaces, and equity to strengthen community resilience",
        image: "Merritt",
        status: "in-progress",
        type: "Townhomes",
        highlights: [
            "46 multigenerational townhome units",
            "Balanced privacy and community design",
            "Affordable ownership opportunities",
            "Rural community revitalization",
            "Environmental efficient housing"
        ]
    },
    {
        id: 6,
        title: "179 Main & 626 Alexander",
        location: "Vancouver, BC",
        year: "2018, 2020",
        units: 14,
        description: "Development of low-income affordable inner-city housing, integrating modern designs with community needs.",
        image: "affordapartment",
        status: "completed",
        type: "Multi-Phase Development",
        highlights: [
            "14 affordable apartment units (9 + 5)",
            "Inner-city location advantages",
            "Modern design integration",
            "Community-focused amenities"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/pillars.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * =============================================================================
 * PILLARS DATA
 * =============================================================================
 *
 * How Do We Do It Section Data Structure
 *
 * Contains the three pillars of Anhart's approach structured for
 * the ThreeCardSection component.
 *
 * @source src/pages/Home.tsx - howDoWeDoItPillars variable
 */ // =============================================================================
// ASSET IMPORTS
// =============================================================================
// All image imports have been moved to the image registry system
// Images are now referenced by name and loaded through OptimizedImage component
// Note: These images are not yet optimized - using fallback paths
// =============================================================================
// PILLARS DATA
// =============================================================================
__turbopack_context__.s([
    "howDoWeDoItPillars",
    ()=>howDoWeDoItPillars
]);
const howDoWeDoItPillars = [
    {
        id: 1,
        title: "Experience",
        description: "We recognize that intelligence thrives at every level. Our solutions are built on insights from the ground up, from local residents to city planners.",
        image: "beaverConsturction",
        backTitle: "Trusted Technical Partners",
        backDescription: "We partner with proven architects, engineers, and builders who reduce costs and deliver quality—without cutting corners. Their expertise ensures innovation.",
        backImage: "Trusted-Partners"
    },
    {
        id: 2,
        title: "Altruism",
        description: "We apply insights from decentralized systems theory to our work, creating interconnected housing solutions that strengthen entire communities.",
        image: "expert-consultation",
        backTitle: "Altruism in Action",
        backDescription: "A key part of our system involves guiding impact investors to secure patient capital, ensuring financial goals are aligned with long-term community well-being.",
        backImage: "systemsNetwork"
    },
    {
        id: 3,
        title: "Multi-Scale",
        description: "Studying community intelligence at every level to design housing that strengthens resilience and belonging. Focusing on the macro and micro of bodies in a system.",
        image: "thinkingStatueLaptop",
        backTitle: "Partners in Development",
        backDescription: "Our champion partners bring invaluable local knowledge and passion. They are essential to creating housing that is not just built, but truly belongs.",
        backImage: "communityChampions"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio-detailed.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "portfolioDetailedProjects",
    ()=>portfolioDetailedProjects
]);
'use client';
const portfolioDetailedProjects = [
    {
        id: 1,
        title: "Jubilee Rooms",
        location: "235 Main, Vancouver, BC",
        year: "2000",
        units: 80,
        description: "Our foundational project in Vancouver's Downtown Eastside, transforming a historic building into affordable housing through innovative renovation.",
        briefDescription: "Historic rooming house revitalized into 80 affordable units, marking the beginning of our housing-first mission in Vancouver's Downtown Eastside.",
        comprehensiveDetails: "The Jubilee Rooms project represents the cornerstone of Anhart's affordable housing mission. This historic building renovation in Vancouver's Downtown Eastside created 80 affordable housing units while preserving the architectural character of the original structure. The project demonstrated our innovative approach to transforming existing buildings into dignified, safe, and affordable housing solutions. Through careful renovation techniques and community-centered design, we established a model for sustainable urban housing development that continues to guide our work today. The project includes integrated support services and community spaces, fostering a sense of belonging and stability for residents.",
        image: "Jubilee-Sign",
        status: "completed",
        type: "Historic Renovation",
        highlights: [
            "80 affordable housing units created",
            "Historic building preservation",
            "Downtown Eastside community investment",
            "Foundational project that launched our mission",
            "Innovative renovation techniques",
            "Community support services integration"
        ]
    },
    {
        id: 2,
        title: "The Ryder",
        location: "1270 Ryder, Hope, BC",
        year: "2021",
        units: 40,
        description: "Delivering 40 modular homes that expand affordable housing efforts in rural and remote communities while fostering resident stability and self-sufficiency.",
        briefDescription: "40 modular homes in Hope, BC, expanding affordable housing in rural communities with a focus on stability, self-sufficiency, and community-building.",
        comprehensiveDetails: "The Ryder project represents Anhart's commitment to addressing housing needs in rural and remote communities across British Columbia. This innovative modular housing development delivered 40 affordable homes to Hope, demonstrating our ability to adapt construction methods to meet the unique challenges of smaller communities. The project prioritizes resident self-sufficiency through thoughtful design and community support services. Using sustainable building materials and modern construction techniques, The Ryder provides high-quality, energy-efficient housing that serves as a model for rural affordable housing development. The project includes community spaces and support services designed to foster resident independence and community connection.",
        image: "Ryder_1",
        status: "completed",
        type: "Modular Housing",
        highlights: [
            "40 affordable modular homes delivered",
            "Rural and remote community focus",
            "First development of affordable housing",
            "Prioritization eligibility for under-served community members",
            "Sustainable building materials"
        ]
    },
    {
        id: 3,
        title: "162 Main St",
        location: "Vancouver, BC",
        year: "2023",
        units: 69,
        description: "Inner-city development that provides affordable homes with integrated support services for individuals facing mental health challenges and low incomes.",
        briefDescription: "69-unit affordable housing project combining independent suites with on-site support services for vulnerable inner-city residents.",
        comprehensiveDetails: "162 Main St represents a groundbreaking approach to addressing homelessness and mental health challenges in Vancouver's urban core. This innovative development provides 69 micro-suite units designed specifically for individuals transitioning from shelter to permanent housing. The project integrates comprehensive support services directly into the living environment, creating a bridge between emergency shelter and stable housing. Each micro-suite is thoughtfully designed to provide privacy and dignity while fostering community connection. The building includes on-site support staff, counseling services, and community spaces that promote healing and stability. The mixed-use design incorporates retail spaces that serve both residents and the broader community, creating economic opportunities and reducing stigma.",
        image: "162Main",
        status: "completed",
        type: "Micro-Suites",
        highlights: [
            "69 micro-suite units for transitional housing",
            "Bridge from shelter to permanent housing",
            "Comprehensive support services",
            "Mix of micro-dwellings and retail markets",
            "Community integration focus"
        ]
    },
    {
        id: 4,
        title: "Dodson Hotel",
        location: "25 East Hastings, Vancouver, BC",
        year: "2004",
        units: 71,
        description: "Historic hotel conversion providing 71 supportive housing units for low-income residents in Vancouver’s Downtown Eastside.",
        briefDescription: "71-unit affordable housing development created through the renovation of the historic Dodson Hotel.",
        comprehensiveDetails: "The Dodson Hotel was acquired and renovated by Anhart impact investors in 2004 to provide safe, clean, and supportive housing in Vancouver’s Downtown Eastside. With 71 units and additional community space, the project addressed pressing needs for individuals struggling with poverty, addiction, and mental health issues. Its 4,500 sq. ft. drop-in centre includes a kitchen, laundry, showers, and women’s lounge, demonstrating the benefits of integrating housing with community-based resources. The Dodson became a landmark example of estate-sharing and private-public impact investment.",
        image: "DodsonsRooms_1",
        status: "completed",
        type: "Hotel Conversion",
        highlights: [
            "65 affordable housing units",
            "Historic hotel conversion",
            "Preserved architectural character",
            "Downtown Eastside revitalization",
            "Community-centered design",
            "Long-term affordability secured"
        ]
    },
    {
        id: 5,
        title: "Skeena House",
        location: "3475 East Hastings, Vancouver, BC",
        year: "2012",
        units: 57,
        description: "Former Ramada Inn converted into permanent affordable housing through partnership between the City of Vancouver, BC Housing, Vancouver Aboriginal Friendship Centre Society, Community Builders Benevolence Group and Anhart Community Housing Society.",
        briefDescription: "57-unit housing project repurposing a former hotel into permanent homes for vulnerable residents.",
        comprehensiveDetails: "Skeena House transformed a former Ramada Inn into 57 units of affordable housing through collaboration between the City of Vancouver, BC Housing, Vancouver Aboriginal Friendship Centre Society, Community Builders Benevolence Group and Anhart Community Housing Society. The project provided stable, private accommodations for individuals previously sleeping on mats in shelters, with culturally appropriate engagement and support. Skeena House set a precedent for converting hotels into permanent housing and demonstrated the value of Indigenous-led partnerships in housing solutions.",
        image: "skeena",
        status: "Completed",
        type: "Temporary Housing",
        highlights: [
            "Conversion of hotels into permanent, affordable housing",
            "Provided initiatives for the transition of shelter mats to stable housing",
            "Partnership-driven solutions with Vancouver Aboriginal Friendship Centre Society",
            "Culturally Inclusive Community Engagement",
            "Priority for Indigenous communities"
        ]
    },
    {
        id: 6,
        title: "Metson Rooms",
        location: "1060 Howe, Vancouver, BC",
        year: "2013",
        units: 100,
        description: "Transformation of a 100-room hotel in downtown Vancouver into affordable housing through partnership between the City of Vancouver, Community Builders Benevolence Group and Anhart Community Housing Society.",
        briefDescription: "100-room hotel in Vancouver's business district converted into affordable housing with a self-organizing resident community.",
        comprehensiveDetails: "Metson Rooms (formerly the Bosman Hotel) was converted in partnership with the City of Vancouver, Community Builders Benevolence Group and Anhart Community Housing Society. This 100-room initiative provided semi-supportive housing for individuals with independent living skills in Vancouver's business district. With City subsidies for at-risk tenants and a resident-led community model, it demonstrated how hotel leases can provide stable, affordable housing in high-demand urban areas without ongoing operational partners.",
        image: "1060howe",
        status: "Completed",
        type: "Hotel Conversion",
        highlights: [
            "Provided affordable housing for at-risk individuals",
            "Long-term hotel lease as affordable housing model",
            "Provided housing in a high-demand urban area",
            "Self-organizing community with in-house resident support",
            "Stable housing in Vancouver's downtown location"
        ]
    },
    {
        id: 15,
        title: "Modular Villages",
        location: "1051 Nelson Avenue, Hope, BC",
        year: "2024",
        units: 6,
        description: "Display units showcasing 6 different types of modular homes. Check them out at https://anhartconstruction.ca/modular/",
        briefDescription: "6 display units showcasing different modular tiny home options with private ownership and shared community infrastructure.",
        comprehensiveDetails: "The Modular Villages project in Hope, BC, features 6 display units showcasing different varieties of modular tiny homes, each thoughtfully designed to balance privacy, functionality, and affordability. These display units demonstrate the range of options available for potential homeowners. Built on wheels to meet building code standards, these homes provide the flexibility and mobility often absent in conventional housing. By localizing construction and management, the project reduces the typical overhead costs associated with commercial development, passing these savings directly to residents. Shared community infrastructure—including utilities, common spaces, and maintenance—further enhances cost efficiency while fostering a supportive, connected neighborhood. Visit our showhomes at https://anhartconstruction.ca/modular/ to see all 6 different unit types and learn more about modular homeownership opportunities. For more information about our construction services, visit https://anhartconstruction.ca/",
        image: "ModularH_1",
        status: "in-progress",
        type: "Modular Tiny Homes",
        highlights: [
            "6 different display unit types",
            "Private ownership opportunities",
            "Shared infrastructure model reduces costs",
            "Community resilience focus",
            "Innovative modular construction methods",
            "Visit https://anhartconstruction.ca/modular/ for details",
            "Learn more at https://anhartconstruction.ca/"
        ]
    },
    {
        id: 7,
        title: "The Oppenheimer Park Initiative",
        location: "1335 Howe, Vancouver, BC",
        year: "2016",
        units: 160,
        description: "Relocation of 150 persons experiencing homelessness at an encampment in Oppenheimer Park that also housed another 150 persons over a 30 month period.",
        briefDescription: "160-room leased hotel provided emergency housing for 300 individuals displaced from Oppenheimer Park encampments over 30 months.",
        comprehensiveDetails: "The Oppenheimer Park Initiative addressed the critical housing crisis by relocating 150 persons experiencing homelessness from the Oppenheimer Park encampment. The initiative also provided housing for an additional 150 persons over a 30-month period. In 2015, Anhart partnered with the City of Vancouver to lease the Quality Inn at 1335 Howe Street, providing safe and secure temporary housing, wrap-around services, and transition supports to help residents move into permanent homes. The initiative demonstrated how hotel leases can serve as a rapid, scalable response to homelessness while bridging toward long-term solutions.",
        image: "TheOppenhiemer",
        status: "Completed",
        type: "Temporary Housing"
    },
    {
        id: 9,
        title: "Merritt Village",
        location: "3757 De Wolf Way, Merritt, BC",
        year: "2026",
        units: 46,
        description: "Strategic development addressing housing needs in rural BC communities with sustainable design.",
        briefDescription: "A townhouse development in Merritt, BC, designed to provide affordable housing while supporting local non-profits and fostering inclusive community living.",
        comprehensiveDetails: "The Merritt Village Housing Initiative delivers 46 units of entry-level two- and three-bedroom townhomes across a five-acre site at 3757 De Wolf Way in Merritt, British Columbia. Emerging as a response to the city's housing loss from the 2021 flood, the development represents a forward-looking model of resilience and affordability. Organized into 12 four-plexes, the homes are complemented by family-friendly amenities such as a children's playground and community green spaces with mountain views. To enhance accessibility, provisions have been made for local non-profits to purchase units, enabling them to house their constituents and strengthen social cohesion. By combining sustainable design with a community-centered ownership model, Merritt Village addresses rural housing shortages while fostering inclusivity, affordability, and long-term stability.",
        image: "Merritt",
        status: "in-progress",
        type: "Sustainable Development"
    },
    {
        id: 10,
        title: "179 Main & 626 Alexander",
        location: "Vancouver, BC",
        year: "2018, 2020",
        units: "14",
        description: "Two mixed-income projects providing affordable rental apartments through private investment at 626 Alexander and 179 Main.",
        briefDescription: "14 affordable rental units below market at 626 Alexander and 179 Main, blending market and non-market models geared towards low-income households.",
        comprehensiveDetails: "Anhart developed two key mixed-income affordable rental projects: 626 Alexander (2018) and 179 Main (2020). Both developments leveraged private investment to create deeply affordable units alongside market rentals. 626 Alexander focused on mixed-income housing with community engagement opportunities, while 179 Main delivered deeply affordable units within a market rental development. Together, they demonstrated how non-profits and market developers can collaborate to integrate affordable housing into urban neighbourhoods without reliance on public funds.",
        image: "affordapartment",
        status: "completed",
        type: "Multi-Phase Development",
        highlights: [
            "14 affordable apartment units (9 + 5)",
            "Inner-city location advantages",
            "Modern design integration",
            "Two-phase development approach",
            "Transit-accessible location",
            "Community-focused amenities"
        ]
    },
    {
        id: 11,
        title: "Anhart Sustainable Villages",
        location: "Multiple Locations",
        year: "2030",
        units: 50,
        description: "International development initiative working with local communities in regions of Africa to build 6 maternity clinics, approximately 50 homes, and 5 schools, contributing to our 20,000 homes goal by 2045.",
        briefDescription: "International initiative building 6 maternity clinics, ~50 homes, and 5 schools in African regions through local partnerships.",
        comprehensiveDetails: "Anhart Global Villages represents our commitment to international development and community building in regions of Africa. Through partnerships with local communities, we are working to construct 6 maternity clinics to improve healthcare access, approximately 50 homes to address housing needs, and 5 schools to enhance educational opportunities. This initiative demonstrates our belief that affordable housing and community infrastructure are fundamental human necessities that should be accessible globally. By working directly with local partners and communities, we ensure that our projects are culturally appropriate, sustainable, and truly serve the needs of the people they are designed to help. This international work complements our domestic efforts and contributes to our broader goal of creating 20,000 homes by 2045.",
        image: "Maternity",
        status: "in-progress",
        type: "Multi-Site Initiative",
        highlights: [
            "6 maternity clinics in African regions",
            "Approximately 50 homes built",
            "5 schools constructed",
            "Local community partnerships",
            "International development focus",
            "Contributes to 20,000-unit goal by 2045"
        ]
    },
    {
        id: 8,
        title: "Kwas House",
        location: "477 Hudson St, Hope, BC",
        year: "2026",
        units: 14,
        description: "A 14-unit supportive housing project in Hope, BC, for adults with cognitive challenges and seniors, featuring a community kitchen and shared living spaces, developed in partnership with the Fraser Inclusive and Supportive Housing Society (FISH).",
        briefDescription: "14-unit affordable housing for adults with cognitive challenges and seniors in Hope, BC, developed in partnership with the Fraser Inclusive and Supportive Housing Society.",
        comprehensiveDetails: "Kwas House is a community-driven vision that began in 2017 with parents from Hope's Tillicum Centre who wanted to ensure their adult children with cognitive challenges had a secure future. They formed the Fraser Inclusive and Supportive Housing Society (FISH) to create a home where their children could live independently among peers. The project was made possible by a generous donation of property at 477 Hudson Bay Street by community member Olga Kwas. In partnership with Anhart, FISH is developing a 14-unit apartment building designed for both people with intellectual challenges and seniors. The building will feature accessible design, a communal kitchen, social spaces, and an outdoor patio to foster a supportive community environment. This model aims to provide a 'forever home' that promotes independence, safety, and social connection.",
        image: "Kwas",
        status: "in-progress",
        type: "Supportive Housing",
        highlights: [
            "14 affordable housing units",
            "Partnership with Fraser Inclusive and Supportive Housing Society (FISH)",
            "Housing for adults with cognitive challenges and seniors",
            "Property generously donated by a community member",
            "Includes community kitchen and social spaces",
            "Focus on independent living with peer support"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio-stats.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * =============================================================================
 * PORTFOLIO STATISTICS DATA
 * =============================================================================
 * 
 * Portfolio Statistics Data Structure
 * 
 * Contains the statistics displayed on the Portfolio page showing
 * Anhart's overall impact and reach.
 * 
 * @source src/pages/Portfolio.tsx - portfolioStats variable
 */ // =============================================================================
// PORTFOLIO STATISTICS DATA
// =============================================================================
__turbopack_context__.s([
    "portfolioStats",
    ()=>portfolioStats
]);
const portfolioStats = [
    {
        value: "500+",
        label: "Housing Units"
    },
    {
        value: "15+",
        label: "Communities Served"
    },
    {
        value: "8",
        label: "Provinces"
    },
    {
        value: "24+",
        label: "Years Of Experience"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/media.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * =============================================================================
 * MEDIA DATA
 * =============================================================================
 *
 * Media Content Data Structures
 *
 * Contains all media-related data for the Media page including:
 * - Media gallery (videos and images)
 * - PDF documents for download and preview
 * - Press releases and news articles
 *
 * @source src/pages/Media.tsx - mediaGallery, pdfDocuments, pressReleases variables
 */ // =============================================================================
// TYPE IMPORTS
// =============================================================================
__turbopack_context__.s([
    "ANHART_BROCHURE_PDF",
    ()=>ANHART_BROCHURE_PDF,
    "ANHART_LP_PDF",
    ()=>ANHART_LP_PDF,
    "INVESTMENTS_PROSPECTUS_PDF",
    ()=>INVESTMENTS_PROSPECTUS_PDF,
    "TRI_BROCH_PDF",
    ()=>TRI_BROCH_PDF,
    "mediaGallery",
    ()=>mediaGallery,
    "pdfDocuments",
    ()=>pdfDocuments,
    "pressReleases",
    ()=>pressReleases
]);
const TRI_BROCH_PDF = "/mediaAssets/Display+Brochure+October+3+2025-compressed.pdf";
const ANHART_BROCHURE_PDF = "/mediaAssets/Anhart Brochure September 16 2025.pdf";
const ANHART_LP_PDF = "/mediaAssets/8-Pager-Slide-Version-January-30-2025.pdf";
const INVESTMENTS_PROSPECTUS_PDF = "/mediaAssets/Investments Prospectus March 24 2025.pdf";
const mediaGallery = [
    {
        id: 1,
        type: "video",
        title: "Ryder Village",
        description: "Ryder Village in Hope, BC is 40 affordable family apartments developed by Anhart in 2022 with impact investments and the CMHC's RCFI program.",
        date: "November 2020",
        thumbnail: "https://img.youtube.com/vi/LhDOnUN2SOw/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=LhDOnUN2SOw"
    },
    {
        id: 2,
        type: "video",
        title: "Winnipeg Revitalized",
        description: "Anhart is working with local non profits and community champion consultants to develop supportive and affordable housing in Winnipeg. Manitoba.",
        date: "July, 2024",
        thumbnail: "https://img.youtube.com/vi/RBy5tRKA8FM/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=RBy5tRKA8FM"
    },
    {
        id: 3,
        type: "video",
        title: "Hope Tiny Homes",
        description: "Hope Tiny Homes builds housing for as little at $99,000 with 5% down and 15% impact investments to qualified low income buyers.",
        date: "September, 2024",
        thumbnail: "https://img.youtube.com/vi/PxIIKiIyYzs/maxresdefault.jpg",
        youtubeUrl: "https://www.youtube.com/watch?v=PxIIKiIyYzs"
    }
];
const pdfDocuments = [
    {
        id: 1,
        title: "Anhart Brochure ONPHA October 3 2025",
        description: " A brochure for Anhart Affordable Housing, detailing our mission to provide sustainable, affordable homes.",
        date: "October 2025",
        pages: 2,
        size: "0.5 MB",
        url: TRI_BROCH_PDF
    },
    {
        id: 2,
        title: "Anhart Brochure September 16, 2025",
        description: "A comprehensive overview of what forms of housing do we at Anhart Affordable Housing provide to communities.",
        date: "September, 2025",
        pages: 2,
        size: "1.89 MB",
        url: ANHART_BROCHURE_PDF
    },
    {
        id: 3,
        title: "Anhart Affordable Limited Partnership",
        description: "An overview of the Anhart Affordable Housing Limited Partnership, including the investment terms and conditions.",
        date: "January, 2025",
        pages: 8,
        size: "1.15 MB",
        url: ANHART_LP_PDF
    },
    {
        id: 4,
        title: "Investments Prospectus March 24, 2025",
        description: "Detailed investment prospectus outlining Anhart'sopportunities and financial performance for potential investors.",
        date: "March, 2025",
        pages: 12,
        size: "2.1 MB",
        url: INVESTMENTS_PROSPECTUS_PDF
    }
];
const pressReleases = [
    {
        id: 1,
        title: "6-Storey Micro Dwelling Proposed for Vancouver's Main Street",
        source: "Vancouver Market",
        date: "August, 2019",
        excerpt: "A six-storey micro-suite building has been proposed for Main Street, aiming to provide an innonative urban housing solution.",
        type: "external",
        url: "https://vancouvermarket.ca/2019/08/26/6-storey-micro-dwelling-building-proposed-for-main-street/"
    },
    {
        id: 2,
        title: "Anhart Ryder Project Supports Affordable Housing",
        source: "Vancity Rethink",
        date: "2024",
        excerpt: "Vancity highlights Anhart Affordable Housing's Ryder project as a key contribution to affordable rental housing in Hope, BC.",
        type: "external",
        url: "https://rethink.vancity.com/actions/anhart-ryder"
    },
    {
        id: 3,
        title: "Province Buys The Ryder Apartment Building in Hope",
        source: "Hope Standard",
        date: "October, 2023",
        excerpt: "The provincial government purchases The Ryder building to secure affordable housing units in Hope, ensuring community stability.",
        type: "external",
        url: "https://www.hopestandard.com/local-news/province-buys-the-ryder-apartment-building-in-hope-to-ensure-affordable-housing-5887454"
    },
    {
        id: 4,
        title: "Anhart Stories: The Foundation of Community Housing",
        source: "Anhart Community Stories",
        date: "2024",
        excerpt: "The inspiring story of how Hart and Anita Molthagen's philanthropic vision grew into a comprehensive affordable housing organization.",
        type: "modal",
        fullText: `<h3>Anhart Stories: The Foundation of Community Housing</h3>
        <p><em>From the Anhart Community Stories Archive - 2024</em></p>
        
        <h4>A Vision Born from Success</h4>
        <p>In his 50th year, Hart Molthagen and his wife Anita decided to give back to a nearby community from their successful business profits. In 2000 they purchased and renovated a 80 single room occupancy run down building and renamed it Jubilee Rooms.</p>
        
        <p>This initial act of community service would become the foundation for what is now one of Canada's most respected affordable housing organizations.</p>
        
        <h4>Inspiring Others to Act</h4>
        <p>In 2004, David and Lise Ash followed the inspiration of the Molthagens and purchased and renovated the 71 room Dodson Hotel. Their commitment to community development demonstrated how individual acts of generosity could create lasting change.</p>
        
        <h4>Building an Organization</h4>
        <p>Since 2002, Anhart operated and managed the renovations for the two philanthropist families. In 2013, both buildings were sold to Anhart for 50% of their fair market value - a generous gift that provided the organization with the capital and experience needed to expand their mission.</p>
        
        <h4>Expanding Impact</h4>
        <p>The generosity of the Molthagens and Ashes was also the foundation of the efforts of the Community Builders Group to house 800 at-risk persons in Vancouver's core, and the creation of Clean Start, a large community contribution company that hires persons with barriers to employment.</p>
        
        <h4>A Legacy of Community Building</h4>
        <p>What began as a single act of philanthropy has grown into a comprehensive approach to community development. From those first 151 rooms in the Jubilee and Dodson buildings, Anhart has expanded to develop hundreds of affordable housing units across Western Canada.</p>
        
        <p>The story demonstrates how individual generosity, when combined with professional management and a long-term vision, can create sustainable solutions to housing challenges that continue to benefit communities for decades.</p>
        
        <p><em>This story is part of the Anhart Community Stories project, documenting the people and partnerships that have made affordable housing possible in communities across Canada.</em></p>`
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * =============================================================================
 * DATA EXPORTS INDEX
 * =============================================================================
 * 
 * Centralized exports for all data structures used throughout the application.
 * This provides a clean import interface and makes it easy to manage data
 * dependencies.
 */ // =============================================================================
// DATA EXPORTS
// =============================================================================
__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$projects$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/projects.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$pillars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/pillars.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$portfolio$2d$detailed$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio-detailed.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$portfolio$2d$stats$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/portfolio-stats.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$anhartca$2d$main$2f$anhartca$2d$main$2f$next$2d$app$2f$src$2f$data$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/anhartca-main/anhartca-main/next-app/src/data/media.ts [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/anhartca-main/anhartca-main/next-app/src/lib/structuredData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_anhartca-main_anhartca-main_next-app_src_bd121b4f._.js.map