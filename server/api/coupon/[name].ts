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
    const result = couponsList.find((coupon) => {
      return usedCoupon === coupon.name
    })
    return result?.discount || 0
  }

  return couponCheck()
})
