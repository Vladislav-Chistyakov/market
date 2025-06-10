<script setup lang="ts"></script>

<template>
  <header
    class="container flex flex-row items-center border-b border-solid border-b-gray-border xl:max-w-[1440px] py-[14px] xl:py-[32px]"
  >
    <nuxt-link to="/">
      <picture>
        <img src="@/assets/images/header/logo.svg" alt="logo" />
      </picture>
    </nuxt-link>

    <label
      class="flex gap-[12px] item-center ml-[163px] min-w-[184px] bg-gray-50 rounded-[8px] px-[48px] py-[12px]"
    >
      <img src="@/assets/images/header/search.svg" alt="search" />
      <input
        type="text"
        class="outline-none placeholder-text-gray-200 max-w-[120px] bg-gray-50 rounded-[8px] font-causten font-medium text-[18px] leading-[22px] text-text-gray-200"
        placeholder="Search"
      />
    </label>

    <ul class="ml-auto flex flex-row items-center gap-3">
      <li>
        <button
          class="h-[44px] w-[44px] rounded-[8px] bg-text-gray-50 p-1 flex items-center justify-center"
          aria-label="Wishlist"
        >
          <svg
            class="flex"
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99486 2.93014C7.49535 1.18262 4.99481 0.712545 3.11602 2.31275C1.23723 3.91295 0.972726 6.5884 2.44815 8.48096C3.67486 10.0545 7.38733 13.3732 8.60407 14.4474C8.7402 14.5675 8.80827 14.6276 8.88766 14.6512C8.95695 14.6718 9.03277 14.6718 9.10207 14.6512C9.18146 14.6276 9.24952 14.5675 9.38565 14.4474C10.6024 13.3732 14.3149 10.0545 15.5416 8.48096C17.017 6.5884 16.7848 3.89611 14.8737 2.31275C12.9626 0.729378 10.4944 1.18262 8.99486 2.93014Z"
              stroke="#807D7E"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </li>

      <li>
        <button
          class="h-[44px] w-[44px] rounded-[8px] bg-text-gray-50 p-1 flex items-center justify-center"
          aria-label="User"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00016 9.66668C10.3013 9.66668 12.1668 7.8012 12.1668 5.50001C12.1668 3.19882 10.3013 1.33334 8.00016 1.33334C5.69898 1.33334 3.8335 3.19882 3.8335 5.50001C3.8335 7.8012 5.69898 9.66668 8.00016 9.66668ZM8.00016 9.66668C4.31826 9.66668 1.3335 11.9053 1.3335 14.6667M8.00016 9.66668C11.6821 9.66668 14.6668 11.9053 14.6668 14.6667"
              stroke="#807D7E"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </li>

      <li>
        <button
          class="h-[44px] w-[44px] rounded-[8px] bg-text-gray-50 p-1 flex items-center justify-center"
          aria-label="Basket"
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1.33334H2.00526C2.85578 1.33334 3.56986 1.97376 3.6621 2.81926L4.3379 9.01409C4.43014 9.85959 5.14422 10.5 5.99474 10.5H13.205C13.9669 10.5 14.6317 9.98341 14.82 9.24519L15.9699 4.73593C16.2387 3.68213 15.4425 2.65742 14.355 2.65742H4.5M4.52063 13.5208H5.14563M4.52063 14.1458H5.14563M13.6873 13.5208H14.3123M13.6873 14.1458H14.3123M5.66667 13.8333C5.66667 14.2936 5.29357 14.6667 4.83333 14.6667C4.3731 14.6667 4 14.2936 4 13.8333C4 13.3731 4.3731 13 4.83333 13C5.29357 13 5.66667 13.3731 5.66667 13.8333ZM14.8333 13.8333C14.8333 14.2936 14.4602 14.6667 14 14.6667C13.5398 14.6667 13.1667 14.2936 13.1667 13.8333C13.1667 13.3731 13.5398 13 14 13C14.4602 13 14.8333 13.3731 14.8333 13.8333Z"
              stroke="#807D7E"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </li>
    </ul>
  </header>
</template>

<style scoped></style>