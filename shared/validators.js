export function validateEmail(email) {
  if (!email) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value !== '';
}

export function validatePhone(phone) {
  if (!phone) return true; // Optional field
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone);
}

export function validateNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function validateDate(dateString) {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
