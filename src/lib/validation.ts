export interface ValidationErrors {
  name?: string;
  phone?: string;
}

export function normalizePhoneNumber(rawPhone: string): string {
  // Remove spaces, hyphens, parentheses
  let cleaned = rawPhone.replace(/[\s\-()]/g, '');
  
  // Remove leading +91 or 91 if it's 12 digits
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.substring(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }
  
  return cleaned;
}

export function validateOrderForm(name: string, rawPhone: string): {
  isValid: boolean;
  errors: ValidationErrors;
  normalizedPhone: string;
} {
  const errors: ValidationErrors = {};
  const trimmedName = name.trim();
  const normalizedPhone = normalizePhoneNumber(rawPhone.trim());

  if (!trimmedName) {
    errors.name = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Please enter at least 2 characters for your name.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  // Indian mobile validation: starts with 6, 7, 8, or 9 followed by 9 digits
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!rawPhone.trim()) {
    errors.phone = 'Mobile number is required.';
  } else if (!indianMobileRegex.test(normalizedPhone)) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}
