<script setup>
import { onMounted, ref, watch } from 'vue'
import { webview, callNative } from './webView'
import { useRoute } from 'vue-router'

const route = useRoute()
const response = ref({})

onMounted(() => {
  console.log()
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

function onClickShowCreditCardAddressBottomSheet() {
  callNative('showCreditCardAddressBottomSheet', { accountId: '001100000000000000000025532654' })
}

function onClickCloseMyBenefitWebViewBottomSheet() {
  callNative('closeMyBenefitWebViewBottomSheet', {})
}

function onClickClear() {
  response.value = {}
}
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }"
  >
    <h1>current path: {{ route.fullPath }}</h1>
    <h1>
      <router-link to="/">Go to home</router-link>
    </h1>
    <h1>
      <router-link to="/test">Go to /test</router-link>
    </h1>
    <div>response: {{ JSON.stringify(response) }}</div>
    <button @click="onClickPreFetchCreditCardCampaign">preFetchCreditCardCampaign</button>
    <button @click="onClickGetFlagAutoSaveSlipData">getFlagAutoSaveSlip</button>
    <button @click="onClickShowCreditCardAddressBottomSheet">
      onClickShowCreditCardAddressBottomSheet
    </button>
    <button @click="onClickCloseMyBenefitWebViewBottomSheet">
      onClickCloseMyBenefitWebViewBottomSheet
    </button>

    <button @click="onClickClear">Clear</button>
  </div>
</template>
