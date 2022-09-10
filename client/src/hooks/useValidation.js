import React, { useState } from 'react'

export function useValidation(fields, validator) {
  const [errors, setErrors] = useState()
  return errors
}
