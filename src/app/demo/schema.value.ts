export const schema = {
    definitions: {},
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'http://example.com/root.json',
    type: 'object',
    title: 'The Root Schema',
    required: [
      'randomNumber',
      'products'
    ],
    properties: {
      randomNumber: {
        $id: '#/properties/randomNumber',
        type: 'integer',
        title: 'The Randomnumber Schema',
        default: 0,
        examples: [
          10
        ],
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
      },
      products: {
        $id: '#/properties/products',
        type: 'array',
        title: 'The Products Schema',
        items: {
          $id: '#/properties/products/items',
          type: 'object',
          title: 'The Items Schema',
          required: [
            'name',
            'product'
          ],
          properties: {
            name: {
              $id: '#/properties/products/items/properties/name',
              type: 'string',
              title: 'The Name Schema',
              default: '',
              examples: [
                'car'
              ],
              pattern: '^(.*)$'
            },
            product: {
              $id: '#/properties/products/items/properties/product',
              type: 'array',
              title: 'The Product Schema',
              items: {
                $id: '#/properties/products/items/properties/product/items',
                type: 'object',
                title: 'The Items Schema',
                required: [
                  'name',
                  'model'
                ],
                properties: {
                  name: {
                    $id: '#/properties/products/items/properties/product/items/properties/name',
                    type: 'string',
                    title: 'The Name Schema',
                    default: '',
                    examples: [
                      'honda'
                    ],
                    pattern: '^(.*)$'
                  },
                  model: {
                    $id: '#/properties/products/items/properties/product/items/properties/model',
                    type: 'array',
                    title: 'The Model Schema',
                    items: {
                      $id: '#/properties/products/items/properties/product/items/properties/model/items',
                      type: 'object',
                      title: 'The Items Schema',
                      required: [
                        'id',
                        'name'
                      ],
                      properties: {
                        id: {
                          $id: '#/properties/products/items/properties/product/items/properties/model/items/properties/id',
                          type: 'string',
                          title: 'The Id Schema',
                          default: '',
                          examples: [
                            'civic'
                          ],
                          pattern: '^(.*)$'
                        },
                        name: {
                          $id: '#/properties/products/items/properties/product/items/properties/model/items/properties/name',
                          type: 'string',
                          title: 'The Name Schema',
                          default: '',
                          examples: [
                            'civic'
                          ],
                          pattern: '^(.*)$'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
