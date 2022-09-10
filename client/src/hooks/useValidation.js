import React, { useState } from 'react'

export function useValidation(...args) {
  const [errors, setErrors] = useState()
  return errors
}
