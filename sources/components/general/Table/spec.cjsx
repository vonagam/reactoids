describe 'Table', ->

  Table = requireSubject()

  defaultProps = {

    'collection': [ { x: 0 }, { x: 2 }, { x: 3 } ]

    'columns': [ { td: 'x' } ]

  }


  it 'renders table [s]', ->

    props = _.defaults {

      'className': 'tably'

      'data-unknown': 3

    }, defaultProps


    instance = shallow <Table {... props } />


    expect( instance ).to.match 'table.table.tably[data-unknown]'

    expect( instance.find 'tr' ).to.have.lengthOf props.collection.length

  ##

  it 'renders simplest [s]', ->

    props = _.defaults {}, defaultProps


    instance = shallow <Table {... props } />


    expect( instance ).to.have.html(

      '
      <table class="table">\
        <tbody class="body">\
          <tr class="row"><td class="cell">0</td></tr>\
          <tr class="row"><td class="cell">2</td></tr>\
          <tr class="row"><td class="cell">3</td></tr>\
        </tbody>\
      </table>\
      '

    )

  ##

  it 'renders fullest [s]', ->

    props = _.defaults {

      'columns': [

        {

          th: 'id'

          td: ( item, key )->= key

        }

        ( collection )->=

          th: 'X'

          td: 'x'

          tf: _.sum _.map collection, 'x'

        ##

      ]

    }, defaultProps


    instance = shallow <Table {... props } />


    expect( instance ).to.have.html(

      '
      <table class="table">\
        <thead class="head">\
          <tr class="row">\
            <th class="cell">id</th>\
            <th class="cell">X</th>\
          </tr>\
        </thead>\
        <tbody class="body">\
          <tr class="row"><td class="cell">0</td><td class="cell">0</td></tr>\
          <tr class="row"><td class="cell">1</td><td class="cell">2</td></tr>\
          <tr class="row"><td class="cell">2</td><td class="cell">3</td></tr>\
        </tbody>\
        <tfoot class="foot">\
          <tr class="row">\
            <td class="cell"></td>\
            <td class="cell">5</td>\
          </tr>\
        </tfoot>\
      </table>\
      '

    )

  ##

  it 'renders custom head, body and foot [s]', ->

    props = _.defaults {

      'renderHead': ->= <thead className='head0' />

      'renderBody': ->= <tbody className='body0' />

      'renderFoot': ->= <tfoot className='foot0' />

    }, defaultProps


    instance = shallow <Table {... props } />


    expect( instance ).to.have.html(

      '
      <table class="table">\
        <thead class="head0"></thead>\
        <tbody class="body0"></tbody>\
        <tfoot class="foot0"></tfoot>\
      </table>\
      '

    )

  ##

  it 'adds stuff to body tr [s]', ->

    props = _.defaults {

      'tr': { 'className': 'check', 'data-unknown': 3 }

    }, defaultProps


    instance = shallow <Table {... props } />


    expect( instance ).to.have.descendants 'tr.row.check[data-unknown]'

  ##

  it 'may be tested better'

##
