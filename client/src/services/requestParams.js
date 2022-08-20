const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

const userCreateOptions = (method, bodyObject) => {
  return {
    method,
    body: JSON.stringify(bodyObject),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
}

const postCreateOptions = (method, bodyObject) => {
  return {
    method,
    body: bodyObject,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
}

const deleteOptions = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export { getOptions, userCreateOptions, deleteOptions }
