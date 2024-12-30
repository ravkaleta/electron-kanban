export type ValidationRule = {
  required?: boolean
  minLength?: number
}

export type ValidationRules = {
  [key: string]: ValidationRule
}

export type Errors = {
  [key: string]: string
}

export const validateInput = (
  value: string,
  validationRule: ValidationRule
) => {
  if (validationRule.required && !value) return 'This field is required.'
  if (validationRule.minLength && value.length < validationRule.minLength)
    return `Minimum ${validationRule.minLength} characters required`
  return ''
}
