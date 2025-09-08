<script setup lang="ts">
import { ref } from 'vue'

const decimalnumber = ref(0)
const romanNumber = ref('')
const error = ref('')

const convertToRoman = async () => {
  error.value = ''
  try {
    const response = await fetch('http://localhost:3000/api/decimal-to-roman', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ decimal: decimalnumber.value })
    })

    const data = await response.json()

    if (!response.ok) {
      // 🛑 HTTP error log
      console.error('🛑 HTTP Error:', response.status, data)
      error.value = data.error || `HTTP ${response.status}: ${response.statusText}`
      romanNumber.value = ''
      return
    }

    romanNumber.value = data.roman
    error.value = ''
  } catch (err: any) {
    // 🛑 network error log
    console.error('🛑 Network Error:', err)
    error.value = err?.message || 'Network error occurred'
    romanNumber.value = ''
  }
}
</script>

<template>
  <h1>Roman Number Converter</h1>

  <div class="card flex flex-col gap-2">
    <input type="number" v-model="decimalnumber" />
    <button @click="convertToRoman">Convert</button>
    <p v-if="romanNumber">{{ romanNumber }}</p>
    <p v-if="error" role="alert" class="text-red-500">{{ error }}</p>
  </div>
</template>
