<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{ $t('signup') }}</h1>
        <form @submit.prevent="handleSignup" class="max-w-md">
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">{{ $t('username') }}</label>
                <input 
                    v-model="formData.username" 
                    type="text" 
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">{{ $t('email') }}</label>
                <input 
                    v-model="formData.email" 
                    type="email" 
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">{{ $t('password') }}</label>
                <input 
                    v-model="formData.password" 
                    type="password" 
                    class="w-full px-3 py-2 border rounded"
                    required
                />
            </div>
            <button 
                type="submit" 
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {{ $t('signup') }}
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
    username: '',
    email: '',
    password: ''
})

const handleSignup = async () => {
    try {
        // TODO: Implement signup logic
        console.log('Signup data:', formData.value)
    } catch (error) {
        console.error('Signup error:', error)
    }
}
</script> 