export const parseEditorData = (content, editor) => {
  const { targetElm } = editor
  const { name } = targetElm

  return {
    target: {
      name,
      value: content
    }
  }
}
