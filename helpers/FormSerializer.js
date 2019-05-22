export const serializeForm = formElement => {
  const selectors = [
    'input',
    'select',
    'textarea',
    '[aria-selected=true]',
    '[aria-checked=true]',
  ].join(',')
  const inputs = formElement.querySelectorAll(selectors)
  return Object.values(inputs).reduce(reduceFormInput, {})
}

const reduceFormInput = (obj, input) => {
  const name = input.name || input.dataset.name
  const value = input.value || input.dataset.value
  if (!name || !value) return obj
  if (name.match(/.*\[.*]$/)) return fromArray(value, name, obj)
  if (name.match(/.*\..*/)) return fromDotObject(value, name, obj)
  return { ...obj, [name]: value }
}

const fromArray = (value, name, obj) => {
  const arrName = name.replace(/\[.*/, '')
  const arr = obj[arrName] || []
  arr.push(value)
  return { ...obj, [arrName]: arr }
}

const fromDotObject = (value, name, obj) => {
  const [base, field] = name.split(/\.(.+)/)
  return { ...obj, [base]: { ...obj[base], [field]: value } }
}
