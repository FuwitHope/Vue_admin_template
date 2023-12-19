const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id++',
    TimeStamp: '2023-06-20T07:54:45.383Z',
    Format: 'RawData',
    BLEMAC: 'E4DC93C2DD40',
    RSSI: '-90',
    AdvType: 'Legacy-adv',
    RawData: '02010409FF4B4CE4DC93C2DD4011076C6F706F656269786F62796170696C61',
    temperature: '37.1',
    shock: '144Hz',
    voltage: '24V'
    // 'items|10': [{
    //   id: '@id',
    //   title: '@sentence(10, 20)',
    //   'status|1': ['published', 'draft', 'deleted'],
    //   author: 'name',
    //   display_time: '@datetime',
    //   pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
