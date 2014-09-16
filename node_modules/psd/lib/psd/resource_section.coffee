_ = require 'lodash'

module.exports = class ResourceSection
  RESOURCES = [
    require('./resources/layer_comps.coffee')
    require('./resources/link_layers.coffee')
  ]

  @factory: (resource) ->
    for Section in RESOURCES
      continue unless Section::id is resource.id
      return _.tap new Section(resource), (s) -> s.parse()

    null