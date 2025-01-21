<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <span class="text-xl font-bold text-gray-900">Fleetnow</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium;
  @apply text-gray-500 border-transparent hover:border-gray-300 hover:text-gray-700;
}

.nav-link.nuxt-link-exact-active {
  @apply border-blue-500 text-gray-900;
}
</style> 