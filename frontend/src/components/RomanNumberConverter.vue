<script setup lang="ts">
import { ref } from 'vue'

const decimalnumber = ref(0)
const romanNumber = ref('')
const error = ref('')

const convertToRomanSSE = () => {
  try {
    romanNumber.value = ''
    error.value = ''

    const eventSource = new EventSource(
      `http://localhost:3000/api/decimal-to-roman-sse?decimal=${decimalnumber.value}`
    )

    eventSource.addEventListener('result', (event: any) => {
      romanNumber.value = event.data
      eventSource.close()
    })

    // Handle custom error events from backend
    eventSource.addEventListener('error', (event: any) => {
      console.error('🚨 SSE Error:', event.data)
      error.value = event.data
      eventSource.close()
    })

    // Handle connection errors
    eventSource.onerror = (event: any) => {
      console.error('🚨 Connection Error', event.data)
      error.value = event.data
      eventSource.close()
    }
  } catch (err) {
    console.error('🚨 Error:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }
}
</script>

<template>
  <h1>Roman Number Converter</h1>

  <div class="card flex flex-col gap-2">
    <input type="number" v-model="decimalnumber" />
    <button @click="convertToRomanSSE">Convert</button>
    <p v-if="romanNumber">{{ romanNumber }}</p>
    <p v-if="error" class="text-red-500">{{ error }}</p>
  </div>
</template>
