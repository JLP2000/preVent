
  const ease = window.Power4.easeInOut
  const el = document.querySelector('#el')
  const wrapper = document.querySelector('#wrapper')
  const slides = el.querySelectorAll('.El__slide')
  const amount = slides.length
  const controller = new window.ScrollMagic.Controller()
  const horizontalMovement = new window.TimelineMax()

  const controller2 = new window.ScrollMagic.Controller({
    vertical: false
  })

  horizontalMovement
    .add([
      window.TweenMax.to(wrapper, 1, { x: `-${(100 / amount) * (amount - 1)}%` })
    ])

  new window.ScrollMagic.Scene({
    triggerElement: el,
    triggerHook: 'onLeave',
    duration: `${amount * 100}%`
  })
    .setPin(el)
    .setTween(horizontalMovement)
    .addTo(controller)

  slides.forEach((item, index) => {
    const title = item.querySelector('h1')
    const subtitle = item.querySelector('h2')
    const tween = new window.TimelineMax()

    tween
      .fromTo(title, 1, { x: 0 }, { x: 500 }, 0)
      .fromTo(subtitle, 1, { x: 600 }, { x: 500 }, 0)

    new window.ScrollMagic.Scene({
      triggerElement: item,
      triggerHook: 1,
      duration: '100%'
    })
      .setTween(tween)
      .addTo(controller2)
  })