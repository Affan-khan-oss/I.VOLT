/** Owner WhatsApp number in international format (no +, spaces or dashes). */
export const OWNER_WHATSAPP_NUMBER = '919212676908';

export interface EnquiryForm {
  name: string;
  phone: string;
  city: string;
  message: string;
}

/** Strip common Indian prefixes and return the 10-digit mobile, or '' if none. */
export function normalizeIndianMobile(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  if (digits.length === 13 && digits.startsWith('910')) return digits.slice(3);
  return digits;
}

export function isValidIndianMobile(input: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(input));
}

export function buildEnquiryText(
  productName: string,
  form: EnquiryForm,
): string {
  const lines = [
    'New enquiry from I.VOLT website',
    `Product: ${productName}`,
    `Name: ${form.name.trim()}`,
    `Phone: ${normalizeIndianMobile(form.phone)}`,
  ];
  if (form.city.trim()) lines.push(`City: ${form.city.trim()}`);
  if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
  return lines.join('\n');
}

export function buildWhatsAppLink(productName: string, form: EnquiryForm): string {
  return `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildEnquiryText(productName, form),
  )}`;
}
