<script setup>
import { onMounted, ref } from 'vue'
import { webview, callNative } from './webView'

const response = ref({})

onMounted(() => {
  webview()
  console.log(window)

  if (typeof window !== 'undefined') {
    window.listeningPreFetchCreditCardCampaign.registerListener(
      (preFetchCreditCardCampaignData) => {
        console.log('response::', preFetchCreditCardCampaignData)
        response.value = preFetchCreditCardCampaignData
      }
    )
    window.listeningGetFlagAutoSaveSlip.registerListener((res) => {
      console.log('response::', res)
      response.value = res
    })
  }
})

function onClickPreFetchCreditCardCampaign() {
  callNative('preFetchCreditCardCampaign', {
    promotionCode: '200000',
    promotionType: 'CS'
  })
}

function onClickGetFlagAutoSaveSlipData() {
  callNative('getFlagAutoSaveSlip', {})
}

function onClickClear() {
  response.value = {}
}
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column' }">
    <button @click="onClickPreFetchCreditCardCampaign">preFetchCreditCardCampaign</button>
    <button @click="onClickGetFlagAutoSaveSlipData">getFlagAutoSaveSlip</button>
    <button @click="onClickClear">Clear</button>
    <div>response: {{ JSON.stringify(response) }}</div>
  </div>
</template>
