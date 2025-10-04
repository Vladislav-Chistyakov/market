export default defineEventHandler((event) => {
  const usedCoupon = getRouterParam(event, 'name')

  const couponsList = [
    {
      name: 'SALE',
      discount: 0.2,
    },
    {
      name: 'SALE-20',
      discount: 0.2,
    },
    {
      name: 'SALE-30',
      discount: 0.3,
    },
  ]

  function couponCheck() {
    // TODO Купоны на проде не работают
    const result = couponsList.find((coupon) => {
      console.log('TEST COUPON 1 __ ', usedCoupon === coupon.name)
      return usedCoupon === coupon.name
    })
    console.log('TEST COUPON 2 __ ', result || null)
    return result || null
  }

  return couponCheck()
})
