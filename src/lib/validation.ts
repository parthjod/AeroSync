export interface ValidationErrors {
  name?: string;
  phone?: string;
}

export function normalizePhoneNumber(rawPhone: string): string {
  // Strip all non-digit characters and restrict to maximum 10 digits
  return rawPhone.replace(/\D/g, '').slice(0, 10);
}

export function validateOrderForm(name: string, rawPhone: string): {
  isValid: boolean;
  errors: ValidationErrors;
  normalizedPhone: string;
} {
  const errors: ValidationErrors = {};
  const trimmedName = name.trim();
  const normalizedPhone = normalizePhoneNumber(rawPhone);

  if (!trimmedName) {
    errors.name = 'Full name is required.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Please enter at least 2 characters for your name.';
  } else if (trimmedName.length > 80) {
    errors.name = 'Name must be 80 characters or fewer.';
  }

  // Indian mobile validation: exactly 10 digits starting with 6, 7, 8, or 9
  const indianMobileRegex = /^[6-9]\d{9}$/;
  if (!rawPhone.trim()) {
    errors.phone = 'Mobile number is required.';
  } else if (normalizedPhone.length !== 10) {
    errors.phone = 'Mobile number must be exactly 10 digits.';
  } else if (!indianMobileRegex.test(normalizedPhone)) {
    errors.phone = 'Must be a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedPhone,
  };
}
