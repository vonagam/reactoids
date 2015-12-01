describe 'simulateLink', ->

  simulateLink = requireSubject()


  hrefBefore = window.location.href

  hrefAfter = 'https://foo.bar/'


  afterEach ->

    window.location.href = hrefBefore


  _.each [ true, false ], ( prevented )->

    it "prevented: #{ prevented }", ->

      $( 'body' ).one 'click', _.method 'preventDefault' if prevented

      simulateLink hrefAfter

      expect( window.location.href ).equal if prevented then hrefBefore else hrefAfter
