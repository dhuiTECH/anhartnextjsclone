/**
 * TDCE & General Form Handler
 * For: info@anhart.ca
 * 
 * Deploy as Web App:
 * - Execute as: Me
 * - Who has access: Anyone (required for fetch from Next.js)
 */

// 1. CONFIGURATION
var ADMIN_EMAIL = 'dillon.hui@anhart.ca';

/**
 * Main entry point for POST requests from Next.js / TDCE App
 */
function doPost(e) {
  var data = parseRequestData(e);

  var formType = data.form_type || 'unknown';
  var subject = '';
  var body = '';

  // 2. FORM TYPE LOGIC
  switch (formType) {
    case 'tdce_simplified':
      subject = 'New TDCE Basic Plan Submission (Homeowner)';
      body = buildEmailBody(data, 'TDCE Basic Plan (Homeowner Intake)');
      break;

    case 'tdce_full':
      subject = 'New TDCE Full Estimate Export (Developer)';
      body = buildEmailBody(data, 'TDCE Full Estimate (Developer Export)');
      break;

    case 'contact':
    case 'booking':
      subject = 'New General ' + (formType === 'booking' ? 'Booking' : 'Contact') + ' Request';
      body = buildEmailBody(data, 'General Website Inquiry');
      break;

    case 'newsletter_subscribe':
      subject = 'New Newsletter Signup';
      body = buildEmailBody(data, 'Newsletter Subscription');
      break;

    case 'home':
    case 'partner':
    case 'limited_partnership':
      subject = 'New Form: ' + formType.replace(/_/g, ' ');
      body = buildEmailBody(data, 'Website Form Submission');
      break;

    default:
      subject = 'New Form Submission: ' + formType;
      body = "Form type: " + formType + "\n\n" + buildEmailBody(data, 'Unknown Form Type');
  }

  // 3. SEND EMAIL
  try {
    MailApp.sendEmail(ADMIN_EMAIL, subject, body);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Email sent successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Parse incoming data - handles both JSON and form-urlencoded
 */
function parseRequestData(e) {
  if (e.postData && e.postData.contents) {
    var type = (e.postData.type || '').toLowerCase();
    if (type.indexOf('application/json') !== -1) {
      try {
        return JSON.parse(e.postData.contents);
      } catch (err) {
        // Fall through to parameter
      }
    }
  }
  return e.parameter || {};
}

/**
 * Helper to build a clean, readable email body
 */
function buildEmailBody(params, title) {
  var divider = "======================================";
  var name = params.name || params.fullName || 'N/A';
  var email = params.email || 'N/A';
  var org = params.organization || 'N/A';
  var message = params.message || '(no details provided)';
  var timestamp = params.timestamp || new Date().toISOString();

  return [
    title,
    divider,
    "",
    "Contact:      " + name,
    "Email:        " + email,
    "Organization: " + org,
    "Date/Time:    " + timestamp,
    "",
    "Details/Message:",
    divider,
    message,
    "",
    divider,
    "Sent via Google Apps Script Automation"
  ].join('\n');
}
