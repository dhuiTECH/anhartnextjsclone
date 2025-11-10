/**
 * Enhanced External Links Utility
 * 
 * Provides more robust methods for opening external links with better
 * security handling and user experience.
 */

/**
 * Enhanced function to safely open external URLs
 * 
 * @param url - The URL to open
 * @param fallbackUrl - Optional fallback URL if the primary fails
 */
export const openExternalLink = (url: string, fallbackUrl?: string): void => {
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
    setTimeout(() => {
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
 */
const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Alternative methods when window.open fails
 */
const fallbackToAlternativeMethods = (url: string, fallbackUrl?: string): void => {
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
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);
    
  } catch (fallbackError) {
    console.error('All automatic methods failed:', fallbackError);
    showExternalLinkInstructions(url, fallbackUrl);
  }
};

/**
 * Enhanced Google Maps directions with better error handling
 */
export const openGoogleMapsDirections = (address: string, origin?: string): void => {
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

/**
 * Enhanced Google Maps search
 */
export const openGoogleMapsSearch = (address: string): void => {
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
 */
const showExternalLinkInstructions = (url: string, fallbackUrl?: string): void => {
  const message = `Unable to open the link automatically due to browser security settings.\n\nPlease copy and paste this address into your browser:\n${url}${fallbackUrl ? `\n\nAlternative URL: ${fallbackUrl}` : ''}`;
  
  // Try modern clipboard API first
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard! You can now paste it in your browser address bar.');
    }).catch(() => {
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
 */
const legacyCopyToClipboard = (text: string, fallbackMessage: string): void => {
  const userWantsCopy = window.confirm(
    'Link blocked by browser security. Would you like to copy the address to your clipboard?'
  );
  
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

/**
 * Creates a safe click handler that bypasses common security issues
 */
export const createSafeExternalLinkHandler = (url: string, fallbackUrl?: string) => {
  return (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure this is called synchronously with the user interaction
    openExternalLink(url, fallbackUrl);
  };
};

/**
 * Alternative approach: Use location.assign for same-tab navigation
 * Useful when opening in new tab is consistently blocked
 */
export const navigateToExternalLink = (url: string): void => {
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

/**
 * Check if popup blocking is likely
 * Useful for showing appropriate UI hints
 */
export const isPopupBlockingLikely = (): boolean => {
  // Test if we can open a popup to about:blank
  try {
    const testWindow = window.open('', '_test', 'width=1,height=1');
    if (testWindow) {
      testWindow.close();
      return false;
    }
    return true;
  } catch {
    return true;
  }
};