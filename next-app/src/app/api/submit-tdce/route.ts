/**
 * Proxy for TDCE form submissions to Google Apps Script.
 * Uses NEXT_PUBLIC_TDCE_GOOGLE_SCRIPT_URL (separate from main contact form).
 * Payload: application/x-www-form-urlencoded (name, email, message, form_type, etc.)
 */

const TDCE_GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_TDCE_GOOGLE_SCRIPT_URL;

export async function POST(request: Request) {
  if (!TDCE_GOOGLE_SCRIPT_URL) {
    return Response.json(
      { success: false, error: "TDCE form submission service is not configured." },
      { status: 503 }
    );
  }

  try {
    const contentType = request.headers.get("content-type") ?? "";
    let body: string;

    if (contentType.includes("application/x-www-form-urlencoded")) {
      body = await request.text();
    } else if (contentType.includes("application/json")) {
      const json = (await request.json()) as Record<string, string>;
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(json)) {
        if (v != null && v !== "") params.append(k, String(v));
      }
      body = params.toString();
    } else {
      return Response.json(
        { success: false, error: "Unsupported content type." },
        { status: 400 }
      );
    }

    const url = `${TDCE_GOOGLE_SCRIPT_URL}${TDCE_GOOGLE_SCRIPT_URL.includes("?") ? "&" : "?"}_t=${Date.now()}`;
    const gasResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const text = await gasResponse.text();
    let data: { success?: boolean; error?: string; message?: string };
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      return Response.json(
        { success: false, error: "Invalid response from form service." },
        { status: 502 }
      );
    }

    if (!gasResponse.ok) {
      return Response.json(
        { success: false, error: data?.error ?? "Form service error." },
        { status: gasResponse.status }
      );
    }

    return Response.json(data);
  } catch (err) {
    console.error("submit-tdce proxy error:", err);
    return Response.json(
      { success: false, error: "Failed to submit form." },
      { status: 500 }
    );
  }
}
