<script setup>
import { onMounted, ref } from 'vue'
import { webview, callNative } from './webview'

const preFetchResponse = ref({})

onMounted(() => {
  webview()
  console.log(window)

  if (typeof window !== 'undefined') {
    window.listeningPreFetchCreditCardCampaign.registerListener(
      (preFetchCreditCardCampaignData) => {
        preFetchResponse.value = preFetchCreditCardCampaignData
      }
    )
  }
})

function onClick() {
  callNative('preFetchCreditCardCampaign', {
    promotionCode: '200000',
    promotionType: 'CS'
  })
}

function onClickClear() {
  preFetchResponse.value = {}
}
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <button @click="onClick">Click Me Pls</button>
    <button @click="onClickClear">Clear</button>
    <div>preFetchResponse: {{ JSON.stringify(preFetchResponse) }}</div>
  </div>
</template>
