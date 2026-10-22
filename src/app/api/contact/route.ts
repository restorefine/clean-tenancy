import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


const FROM = process.env.EMAIL_FROM!;
const ADMIN_TO = process.env.EMAIL_ADMIN_TO!;

const INQUIRY_LABELS: Record<string, string> = {
  serviceType:           "Service",
  bedrooms:              "Property Size",
  bathrooms:             "Bathrooms",
  livingAreas:           "Living Rooms",
  kitchen:               "Kitchens",
  cupboardTops:          "Kitchen Cupboard Tops",
  carpetCleaning:        "Carpet Cleaning",
  carpetAreas:           "Carpet Areas",
  windowCleaning:        "Window Cleaning",
  applianceCleaning:     "Appliances",
  appliances:            "Appliance List",
  additionalAreas:       "Extra Areas",
  softFurnishings:       "Steam Cleaning",
  furnished:             "Furnished",
  pressureWashingNeeded: "Pressure Washing",
  pressureWashSurfaces:  "Surfaces",
  otherServices:         "Other Services",
  propertyCondition:     "Property Condition",
  carpetedAreas:         "Carpeted Areas",
  rugCount:              "Rugs",
  upholsteryItems:       "Upholstery / Sofas",
  stairsHallways:        "Stairs / Hallways",
  carpetItems:           "Items",
  area:                  "Area Size",
  areaSize:              "Area Size",
  additionalInfo:        "Additional Info",
  premisesType:          "Premises",
  preferredDate:         "Preferred Date",
};

function inquiryRows(body: Record<string, unknown>): string {
  return Object.entries(INQUIRY_LABELS)
    .filter(([key]) => body[key])
    .map(([key, label]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap"><strong>${label}</strong></td><td style="padding:6px 0">${body[key]}</td></tr>`)
    .join("");
}

function adminHtml(body: Record<string, unknown>): string {
  const { name, phone, email, address1, address2, city, postcode, message } = body;
  const address = [address1, address2, city, postcode].filter(Boolean).join(", ");

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1e293b;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#2563eb;margin-bottom:4px">New Cleaning Enquiry</h2>
  <p style="color:#64748b;margin-top:0">Submitted via cleantenancy.co.uk</p>

  <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px">Contact Details</h3>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
    <tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap"><strong>Name</strong></td><td style="padding:6px 0">${name}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap"><strong>Email</strong></td><td style="padding:6px 0">${email}</td></tr>
    ${phone ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap"><strong>Phone</strong></td><td style="padding:6px 0">${phone}</td></tr>` : ""}
    ${address ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap"><strong>Address</strong></td><td style="padding:6px 0">${address}</td></tr>` : ""}
  </table>

  <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;margin-top:24px">Enquiry Details</h3>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%">
    ${inquiryRows(body)}
  </table>

  ${message ? `<h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;margin-top:24px">Additional Message</h3><p style="background:#f8fafc;border-left:4px solid #2563eb;padding:12px 16px;margin:0;border-radius:0 8px 8px 0">${message}</p>` : ""}
</body></html>`;
}

function clientHtml(body: Record<string, unknown>): string {
  const { name, message } = body;

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;color:#1e293b;max-width:600px;margin:0 auto;padding:24px">
  <div style="background:#2563eb;border-radius:12px 12px 0 0;padding:28px 32px">
    <h1 style="color:white;margin:0;font-size:22px">Enquiry Received</h1>
    <p style="color:rgba(255,255,255,0.8);margin:6px 0 0">Thank you for reaching out to Clean Tenancy</p>
  </div>
  <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:28px 32px">
    <p>Hi <strong>${name}</strong>,</p>
    <p>Thank you for your enquiry! We've received your request and our team will be in touch shortly to discuss your cleaning requirements and provide a quote.</p>
    <p style="color:#64748b;font-size:14px">Typical response time: <strong>within 24 hours</strong></p>

    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;margin-top:28px;color:#2563eb">Your Enquiry Summary</h3>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;background:#f8fafc;border-radius:8px;overflow:hidden">
      ${inquiryRows(body)}
    </table>

    ${message ? `<h3 style="margin-top:24px;color:#2563eb">Your Message</h3><p style="background:#f8fafc;border-left:4px solid #2563eb;padding:12px 16px;margin:0;border-radius:0 8px 8px 0">${message}</p>` : ""}

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0" />
    <p style="color:#64748b;font-size:13px;margin:0">If you have any urgent questions, feel free to call us on <strong>07000 000000</strong> or email <a href="mailto:hello@cleantenancy.co.uk" style="color:#2563eb">hello@cleantenancy.co.uk</a></p>
    <p style="color:#94a3b8;font-size:12px;margin:16px 0 0">Clean Tenancy, Glasgow, Scotland</p>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email } = body;
  console.log("[contact] received submission from:", name, email);

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const [adminResult, clientResult] = await Promise.all([
    resend.emails.send({
      from: FROM,
      to: ADMIN_TO,
      subject: `New Enquiry from ${name}, ${body.serviceType ?? "Clean Tenancy"}`,
      html: adminHtml(body),
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your Clean Tenancy enquiry has been received",
      html: clientHtml(body),
    }),
  ]);

  if (adminResult.error) console.error("[contact] admin email error:", adminResult.error);
  if (clientResult.error) console.error("[contact] client email error:", clientResult.error);

  if (adminResult.error || clientResult.error) {
    return NextResponse.json(
      { success: false, error: adminResult.error ?? clientResult.error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
