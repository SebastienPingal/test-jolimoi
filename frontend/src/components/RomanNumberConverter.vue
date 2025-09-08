<script setup lang="ts">
import { ref } from 'vue'

const decimalnumber = ref(0)
const romanNumber = ref('')

const convertToRoman = () => {
  console.log('convertToRoman', decimalnumber.value)
  romanNumber.value = decimalnumber.value.toString()
}
</script>

<template>
  <h1>Roman Number Converter</h1>

  <div class="card flex flex-col gap-2">
    <input type="number" v-model="decimalnumber" />
    <button @click="convertToRoman">Convert</button>
    <p v-if="romanNumber">{{ romanNumber }}</p>
  </div>
</template>
