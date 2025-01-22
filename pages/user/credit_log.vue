<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{ $t('credit_log') }}</h1>
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ $t('date') }}
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ $t('type') }}
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ $t('amount') }}
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {{ $t('balance') }}
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="log in creditLogs" :key="log.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ log.date }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ log.type }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ log.amount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ log.balance }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const creditLogs = ref([
    {
        id: 1,
        date: '2024-01-22',
        type: 'Deposit',
        amount: '+$100.00',
        balance: '$100.00'
    },
    // Add more mock data as needed
])

onMounted(async () => {
    try {
        // TODO: Fetch credit log data
    } catch (error) {
        console.error('Error fetching credit logs:', error)
    }
})
</script> 