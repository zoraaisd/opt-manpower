import api from "../../services/api";
import { ENQUIRY_WEBSITE_SLUG } from "./config";
import type { EnquiryFormContext, EnquirySubmitPayload } from "./types";

const INVALID_TEXT_PATTERNS = ["NaN", "Invalid Date"];

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (INVALID_TEXT_PATTERNS.some((pattern) => trimmed.includes(pattern))) return "";
  return trimmed;
}

function currentSourcePage() {
  if (typeof window === "undefined") {
    return { source_page_url: null, source_page_title: null };
  }
  return {
    source_page_url: window.location.href,
    source_page_title: document.title || null
  };
}

function buildPayload(values: Record<string, unknown>, context: EnquiryFormContext): EnquirySubmitPayload {
  const { source_page_url, source_page_title } = currentSourcePage();
  const metadata = context.metadata ?? {};

  return {
    website_slug: context.websiteSlug ?? ENQUIRY_WEBSITE_SLUG,
    form_type: context.formType,
    name: cleanText(values.contact_person ?? values.name),
    email: cleanText(values.email).toLowerCase(),
    phone: cleanText(values.phone),
    subject: cleanText(context.subject ?? values.subject) || null,
    enquiry_type: cleanText(context.enquiryType ?? values.hiring_requirement ?? values.enquiry_type) || null,
    service_interested_in: cleanText(context.serviceInterestedIn ?? values.service_interested_in ?? values.job_location) || null,
    message: cleanText(values.message),
    source_page_url: cleanText(context.sourcePageUrl ?? source_page_url) || null,
    source_page_title: cleanText(context.sourcePageTitle ?? source_page_title) || null,
    metadata: {
      ...metadata,
      company_name: cleanText(values.company_name) || null,
      hiring_requirement: cleanText(values.hiring_requirement) || null,
      job_location: cleanText(values.job_location) || null,
      number_of_positions:
        values.number_of_positions === undefined || values.number_of_positions === null
          ? null
          : Number(values.number_of_positions),
      ...("metadata" in values && typeof values.metadata === "object" && values.metadata !== null ? (values.metadata as Record<string, unknown>) : {})
    }
  };
}

export async function submitEnquiry(values: Record<string, unknown>, context: EnquiryFormContext) {
  const payload = buildPayload(values, context);
  const response = await api.post("/enquiries/", payload);
  return response.data;
}
