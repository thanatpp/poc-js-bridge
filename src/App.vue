<script setup>
import { onMounted, ref } from 'vue'
import { webview, callNative } from './webView'

const preFetchResponse = ref(null)

onMounted(() => {
  webview()
  console.log(window)

  if (typeof window !== 'undefined') {
    window.listeningPreFetchCreditCardCampaign.registerListener(
      (preFetchCreditCardCampaignData) => {
        console.log('PreFetchCreditCardCampaign=====>', preFetchCreditCardCampaignData)
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
</script>

<template>
  <button @click="onClick">Click Me Pls</button>
  <div>{{ preFetchResponse }}</div>
</template>
