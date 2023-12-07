module.exports = (request, options) => {
  if (request.includes('?worker')) {
    return options.defaultResolver(request.replace("?worker", ""), options)
  }

  return options.defaultResolver(request, options)
}