export type EnquirySubmitPayload = {
  website_slug?: string;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  subject?: string | null;
  enquiry_type?: string | null;
  service_interested_in?: string | null;
  message: string;
  source_page_url?: string | null;
  source_page_title?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type EnquiryFormContext = {
  formType: string;
  subject?: string | null;
  enquiryType?: string | null;
  serviceInterestedIn?: string | null;
  metadata?: Record<string, unknown>;
  sourcePageUrl?: string | null;
  sourcePageTitle?: string | null;
  websiteSlug?: string;
};
