<script setup lang="ts">
import { useUserStore } from '~/store/user'
import { useFirebaseFunctions } from '~/composables/useFirebaseFunctions'
import { navigateTo } from '#app/composables/router'

const { getCart } = useFirebaseFunctions()

const onAuthState = useFirebaseFunctions().onAuthUser
let cartUser = reactive({})
const userStore = await useUserStore()
</script>

<template>
  <div class="font-causten">
    {{ cartUser }}
    <div class="container xl:max-w-[1440px] py-[50px]">
      <div class="flex items-center gap-[15px] mb-[30px]">
        <nuxt-link
          to="/"
          class="text-[18px] leading-[22px] text-[#807D7E] font-medium"
        >
          Home
        </nuxt-link>

        <div class="flex">
          <svg
            width="5"
            height="12"
            viewBox="0 0 5 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.157568 10.9358C-0.0436482 10.7467 -0.0534543 10.4302 0.135666 10.229L3.92592 6.19633C4.02469 6.09124 4.02469 5.90878 3.92592 5.8037L0.135667 1.77102C-0.0534536 1.5698 -0.0436474 1.25337 0.157569 1.06425C0.358786 0.875128 0.675216 0.884934 0.864336 1.08615L4.65459 5.11883C5.11514 5.60883 5.11514 6.39119 4.65459 6.88119L0.864336 10.9139C0.675215 11.1151 0.358785 11.1249 0.157568 10.9358Z"
              fill="#807D7E"
            />
          </svg>
        </div>

        <p class="text-[18px] leading-[22px] text-black font-medium">
          Add To Cart
        </p>
      </div>

      <div>
        <p class="text-[14px] leading-[17px] text-[#807D7E]">
          Please fill in the fields below and click place order to complete your
          purchase!
        </p>

        <p
          v-if="!userStore.isAuthorization"
          class="text-[14px] leading-[17px] text-[#807D7E]"
        >
          Already registered?
          <nuxt-link
            to="/authorization/sign-in"
            class="font-medium text-purple"
          >
            Please login here
          </nuxt-link>
        </p>
      </div>
    </div>

    <div class="mx-auto xl:max-w-[1440px]">
      <!-- Заголовок -->
      <div
        class="container uppercase xl:max-w-[1440px] grid grid-cols-[1fr_160px_160px_160px_160px_160px] bg-black text-white font-semibold pt-[26px] pb-[28px]"
      >
        <div class="text-start">Project details</div>
        <div class="text-center">Price</div>
        <div class="text-center">Quantity</div>
        <div class="text-center">Shipping</div>
        <div class="text-center">Subtotal</div>
        <div class="text-right">Action</div>
      </div>

      <!-- Строки данных -->
      <div class="py-[50px]">
        <div
          class="container xl:max-w-[1440px] bg-white text-black items-center"
        >
          <div
            class="py-[50px] border-b border-[#BEBCBD] grid grid-cols-[1fr_160px_160px_160px_160px_160px]"
          >
            <div class="flex justify-start gap-[20px]">
              <div>
                <img src="#" alt="timg" class="flex w-[105px] h-auto" />
              </div>

              <div class="flex flex-col gap-[9px]">
                <b class="text-bold text-[18px] leading-[22px]">
                  Blue Flower Print Crop Top
                </b>

                <ul
                  class="flex flex-col gap-[5px] text-[14px] leading-[17px] text-[#807D7E]"
                >
                  <li>Color: Yellow</li>
                  <li>Size: M</li>
                </ul>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <b class="text-bold text-[18px] leading-[22px]"> $30.00 </b>
            </div>

            <div class="flex justify-center items-center">
              <div
                class="flex flex-row gap-[25px] items-center py-[11px] px-[23px] bg-[#F6F6F6] rounded-[12px]"
              >
                <button class="flex justify-center items-center py-[7px]">
                  <span
                    class="block border-t border-black block h-[1px] w-[10px] rounded-[10px]"
                  />
                </button>

                <p class="font-medium text-black">1</p>

                <button class="flex items-center justify-center py-[2px]">
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                      stroke="#3C4242"
                      stroke-width="1.03964"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <p
                class="uppercase font-bold text-[18px] leading-[22px] text-[#BEBCBD]"
              >
                free
              </p>
            </div>

            <div class="flex justify-center items-center">
              <b class="text-bold text-[18px] leading-[22px]"> $30.00 </b>
            </div>

            <div class="flex justify-end items-center">
              <button class="" aria-label="delete">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                    fill="#8A33FD"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          class="container xl:max-w-[1440px] bg-white text-black items-center"
        >
          <div
            class="py-[50px] grid grid-cols-[1fr_160px_160px_160px_160px_160px]"
          >
            <div class="flex justify-start gap-[20px]">
              <div>
                <img src="#" alt="timg" class="flex w-[105px] h-auto" />
              </div>

              <div class="flex flex-col gap-[9px]">
                <b class="text-bold text-[18px] leading-[22px]">
                  Blue Flower Print Crop Top
                </b>

                <ul
                  class="flex flex-col gap-[5px] text-[14px] leading-[17px] text-[#807D7E]"
                >
                  <li>Color: Yellow</li>
                  <li>Size: M</li>
                </ul>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <b class="text-bold text-[18px] leading-[22px]"> $30.00 </b>
            </div>

            <div class="flex justify-center items-center">
              <div
                class="flex flex-row gap-[25px] items-center py-[11px] px-[23px] bg-[#F6F6F6] rounded-[12px]"
              >
                <button class="flex justify-center items-center py-[7px]">
                  <span
                    class="block border-t border-black block h-[1px] w-[10px] rounded-[10px]"
                  />
                </button>

                <p class="font-medium text-black">1</p>

                <button class="flex items-center justify-center py-[2px]">
                  <svg
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.86181 1.37939V10.6206M10.4824 6L1.24121 6"
                      stroke="#3C4242"
                      stroke-width="1.03964"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <p
                class="uppercase font-bold text-[18px] leading-[22px] text-[#BEBCBD]"
              >
                free
              </p>
            </div>

            <div class="flex justify-center items-center">
              <b class="text-bold text-[18px] leading-[22px]"> $30.00 </b>
            </div>

            <div class="flex justify-end items-center">
              <button class="" aria-label="delete">
                <svg
                  width="17"
                  height="20"
                  viewBox="0 0 17 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.20702 8C7.20702 7.50294 6.80407 7.1 6.30702 7.1C5.80996 7.1 5.40702 7.50294 5.40702 8H7.20702ZM5.40702 16C5.40702 16.4971 5.80996 16.9 6.30702 16.9C6.80407 16.9 7.20702 16.4971 7.20702 16H5.40702ZM11.4526 8C11.4526 7.50294 11.0497 7.1 10.5526 7.1C10.0556 7.1 9.65263 7.50294 9.65263 8H11.4526ZM9.65263 16C9.65263 16.4971 10.0556 16.9 10.5526 16.9C11.0497 16.9 11.4526 16.4971 11.4526 16H9.65263ZM3.22048 18.782L3.60997 17.9707L3.22048 18.782ZM2.29278 17.908L3.08442 17.4799H3.08442L2.29278 17.908ZM14.5669 17.908L13.7752 17.4798V17.4799L14.5669 17.908ZM13.6392 18.782L13.2497 17.9707H13.2497L13.6392 18.782ZM1 4.1C0.502944 4.1 0.1 4.50294 0.1 5C0.1 5.49706 0.502944 5.9 1 5.9V4.1ZM15.8596 5.9C16.3567 5.9 16.7596 5.49706 16.7596 5C16.7596 4.50294 16.3567 4.1 15.8596 4.1V5.9ZM3.81491 5C3.81491 5.49706 4.21786 5.9 4.71491 5.9C5.21197 5.9 5.61491 5.49706 5.61491 5H3.81491ZM11.2447 5C11.2447 5.49706 11.6477 5.9 12.1447 5.9C12.6418 5.9 13.0447 5.49706 13.0447 5H11.2447ZM5.40702 8V16H7.20702V8H5.40702ZM9.65263 8V16H11.4526V8H9.65263ZM13.8982 5V15.8H15.6982V5H13.8982ZM11.4018 18.1H5.45789V19.9H11.4018V18.1ZM1.1614 5V15.8H2.9614V5H1.1614ZM5.45789 18.1C4.84945 18.1 4.44413 18.0994 4.13271 18.0754C3.83033 18.0521 3.69385 18.0109 3.60997 17.9707L2.83099 19.5934C3.2012 19.7711 3.58898 19.8389 3.99456 19.8701C4.39111 19.9006 4.87745 19.9 5.45789 19.9V18.1ZM1.1614 15.8C1.1614 16.3443 1.16062 16.81 1.19369 17.1914C1.22782 17.5849 1.30291 17.9696 1.50113 18.3361L3.08442 17.4799C3.05127 17.4186 3.01067 17.3093 2.98696 17.0358C2.96219 16.7502 2.9614 16.3758 2.9614 15.8H1.1614ZM3.60997 17.9707C3.37513 17.8579 3.19428 17.683 3.08442 17.4799L1.50113 18.3361C1.79832 18.8856 2.26696 19.3226 2.83099 19.5934L3.60997 17.9707ZM13.8982 15.8C13.8982 16.3758 13.8975 16.7502 13.8727 17.0358C13.849 17.3093 13.8084 17.4186 13.7752 17.4798L15.3585 18.3361C15.5567 17.9696 15.6318 17.5849 15.666 17.1914C15.699 16.81 15.6982 16.3443 15.6982 15.8H13.8982ZM11.4018 19.9C11.9822 19.9 12.4685 19.9006 12.8651 19.8701C13.2707 19.8389 13.6585 19.7711 14.0287 19.5934L13.2497 17.9707C13.1658 18.0109 13.0293 18.0521 12.7269 18.0754C12.4155 18.0994 12.0102 18.1 11.4018 18.1V19.9ZM13.7752 17.4799C13.6654 17.683 13.4845 17.8579 13.2497 17.9707L14.0287 19.5934C14.5927 19.3226 15.0613 18.8856 15.3585 18.3361L13.7752 17.4799ZM1 5.9H2.0614V4.1H1V5.9ZM2.0614 5.9H14.7982V4.1H2.0614V5.9ZM14.7982 5.9H15.8596V4.1H14.7982V5.9ZM5.61491 4.2C5.61491 3.05108 6.74448 1.9 8.42982 1.9V0.1C6.01179 0.1 3.81491 1.8143 3.81491 4.2H5.61491ZM8.42982 1.9C10.1152 1.9 11.2447 3.05108 11.2447 4.2H13.0447C13.0447 1.8143 10.8479 0.1 8.42982 0.1V1.9ZM3.81491 4.2V5H5.61491V4.2H3.81491ZM11.2447 4.2V5H13.0447V4.2H11.2447Z"
                    fill="#8A33FD"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container xl:max-w-[1440px] bg-[#F6F6F6]">
      <div class="flex gap-[20px] justify-between font-causten">
        <div class="py-[29px]">
          <b class="block text-[24px] leading-[29px] text-black mb-[10px]">
            Discount Codes
          </b>

          <p class="text-[16px] leading-[19px] text-[#807D7E] mb-[41px]">
            Enter your coupon code if you have one
          </p>

          <div
            class="rounded-[10px] border border-[#BEBCBD] flex overflow-hidden w-fit mb-[37px]"
          >
            <input />
            <button
              class="bg-purple text-white text-[16px] font-semibold leading-[19px] px-[31px] py-[13px] border-l border-[#BEBCBD]"
            >
              Apply Coupon
            </button>
          </div>

          <button
            class="bg-white rounded-[8px] border border-[#BEBCBD] text-black text-[16px] font-semibold leading-[19px] px-[49px] py-[11px]"
          >
            Continue Shopping
          </button>
        </div>

        <div class="bg-[#F3F3F3] max-w-[465px] w-full">
          <div
            class="flex items-center justify-center px-[10px] pt-[39px] pb-[50px]"
          >
            <table border="1" cellpadding="8" cellspacing="0">
              <tbody>
                <tr
                  class="font-medium font-causten text-black text-[22px] leading-[26px]"
                >
                  <td>Sub Total</td>
                  <td>$513.00</td>
                </tr>

                <tr
                  class="font-medium font-causten text-black text-[22px] leading-[26px]"
                >
                  <td>Shipping</td>
                  <td>$50.00</td>
                </tr>

                <tr
                  class="font-bold font-causten text-black text-[22px] leading-[26px]"
                >
                  <td>Grand Total</td>
                  <td>$563.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr class="border-[#BEBCBD]" />

          <div class="p-[50px] flex items-center justify-center">
            <button
              class="bg-purple text-white text-[18px] font-semibold leading-[22px] px-[33px] py-[12px] rounded-[8px]"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
