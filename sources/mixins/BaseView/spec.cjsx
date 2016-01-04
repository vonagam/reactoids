describe 'BaseView', ->

  BaseView = requireSubject()

  $ = requireDependency 'jquery'


  it 'works', ->

    handleLink = sinon.spy ( that, link )->=

      /hello/.test link.href

    ##


    BaseViewed = TestMixin.createMixinClass BaseView( handleLink: handleLink )


    component = TestReact.render(

      <BaseViewed>
        <a href='http://foo.bar/hello/world' />
      </BaseViewed>

    )


    $link = TestReact.$( component ).find 'a'

    $event = $.Event 'click'

    $link.trigger $event

    expect( $event.isDefaultPrevented() ).true

    expect( handleLink ).callCount 1

    expect( handleLink.calledWith component, $event.target, false ).true


    $link.attr 'href', 'http://foo.bar/godbye/world'

    $event = $.Event 'click'

    $link.trigger $event

    expect( $event.isDefaultPrevented() ).false


    TestReact.unmount component

  ##

##
