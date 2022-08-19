const getOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

const createResourceOptions = (method, bodyObject) => {
  console.log(bodyObject)
  return {
    method,
    body: bodyObject
  }
}

const deleteOptions = {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}

export { getOptions, createResourceOptions, deleteOptions }
