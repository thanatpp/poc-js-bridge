export function webview() {
  if (typeof window !== 'undefined') {
    // This section for listen data received from native
    window.listeningPreFetchCreditCardCampaign = {
      aInternal: 10,
      aListener() {},
      set preFetchCreditCardCampaignData(val) {
        this.aInternal = val
        this.aListener(val)
      },
      get preFetchCreditCardCampaignData() {
        return this.aInternal
      },
      registerListener(listener) {
        this.aListener = listener
      }
    }

    window.listeningGetFlagAutoSaveSlip = {
      aInternal: 10,
      aListener() {},
      set getFlagAutoSaveSlipData(val) {
        this.aInternal = val
        this.aListener(val)
      },
      get getFlagAutoSaveSlipData() {
        return this.aInternal
      },
      registerListener(listener) {
        this.aListener = listener
      }
    }

    window.listeningOpenMyBenefitWebViewBottomSheet = {
      aInternal: 10,
      aListener() {},
      set getOpenMyBenefitWebViewBottomSheetData(val) {
        this.aInternal = val
        this.aListener(val)
      },
      get getOpenMyBenefitWebViewBottomSheetData() {
        return this.aInternal
      },
      registerListener(listener) {
        this.aListener = listener
      }
    }

    // This section code for native access to webview
    window.webview = {
      preFetchCreditCardCampaign: (data) => {
        window.listeningPreFetchCreditCardCampaign.preFetchCreditCardCampaignData = JSON.parse(data)
        return 'PreFetch Credit Card Campaign'
      },
      getFlagAutoSaveSlip: (data) => {
        window.listeningGetFlagAutoSaveSlip.getFlagAutoSaveSlipData = JSON.parse(data)
        return 'Get Flag Auto SaveSlip'
      },
      openMyBenefitWebViewBottomSheet: (data) => {
        window.listeningOpenMyBenefitWebViewBottomSheet.getOpenMyBenefitWebViewBottomSheetData =
          JSON.parse(data)
        return 'Open MyBenefit Web View Bottom Sheet'
      }
    }
  }
}

export function callNative(eventName, params = {}) {
  console.log('callNative')
  console.log(eventName)
  console.log(params)

  if (window.JSBridge) {
    // Call Android interface
    console.log('android call')
    window.JSBridge.callNative(eventName, JSON.stringify(params))
  } else if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.jsMessageHandler
  ) {
    // Call iOS interface
    const message = {
      eventName,
      params
    }
    window.webkit.messageHandlers.jsMessageHandler.postMessage({ message })
  } else {
    const message = {
      eventName,
      params
    }

    // No Android or iOS interface found
    console.log(message)
    console.log('Call Native Function.')
  }
}
