<script setup>
import { onMounted, ref } from 'vue'
import { webview, callNative } from './webView'
import { useRoute } from 'vue-router'

const route = useRoute()
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
    window.listeningOpenMyBenefitWebViewBottomSheet.registerListener((res) => {
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

function onClickOpenMyBenefitWebViewBottomSheet() {
  callNative('openMyBenefitWebViewBottomSheet', {
    page: 'confirmMobilePhone'
  })
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
    <div>current path: {{ route.fullPath }}</div>
    <button>
      <router-link to="/">Go to home</router-link>
    </button>
    <button>
      <router-link to="/test">Go to /test</router-link>
    </button>
    <div
      :style="{
        paddingTop: '50px'
      }"
    >
      response: {{ JSON.stringify(response) }}
    </div>
    <button @click="onClickPreFetchCreditCardCampaign">preFetchCreditCardCampaign</button>
    <button @click="onClickGetFlagAutoSaveSlipData">getFlagAutoSaveSlip</button>
    <button @click="onClickOpenMyBenefitWebViewBottomSheet">
      onClickOpenMyBenefitWebViewBottomSheet
    </button>
    <button @click="onClickCloseMyBenefitWebViewBottomSheet">
      onClickCloseMyBenefitWebViewBottomSheet
    </button>
    <button @click="onClickClear">Clear</button>
  </div>
</template>
