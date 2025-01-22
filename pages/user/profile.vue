<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{ $t('profile') }}</h1>
        <div class="max-w-md">
            <div class="bg-white shadow rounded-lg p-6">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">{{ $t('username') }}</label>
                    <div class="text-gray-900">{{ profile.username }}</div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">{{ $t('email') }}</label>
                    <div class="text-gray-900">{{ profile.email }}</div>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">{{ $t('member_since') }}</label>
                    <div class="text-gray-900">{{ profile.memberSince }}</div>
                </div>
                <button 
                    @click="editProfile"
                    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {{ $t('edit_profile') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const profile = ref({
    username: 'User',
    email: 'user@example.com',
    memberSince: '2024-01-01'
})

const editProfile = () => {
    // TODO: Implement edit profile logic
    console.log('Edit profile clicked')
}

onMounted(async () => {
    try {
        // TODO: Fetch user profile data
    } catch (error) {
        console.error('Error fetching profile:', error)
    }
})
</script> 