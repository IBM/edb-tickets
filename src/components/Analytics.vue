<template>
  <div id="analyticsDivId" style="height: 800px;">
  </div>
</template>

<script>

  export default {
    name: 'analytics',
    data() {
      return {
        onError: '',
      }
    },
    mounted() {
      this.initCA()
    },
    methods: {
      async initCA() {
        try {
          console.log("Analytics ROUTE PATH: " + this.$route.path);

          // create a CA session
          let response = await fetch('http://localhost:8080/analytics/getCAcode/');
          let resp = await response.json();
          console.log('resp: ' + JSON.stringify(resp, null, 2));
          const caToken = resp['caSessionCode'];
          const caEndpointURL = resp['caEndpointURL'];
          console.log("CA TOKEN:", caToken);

          // create a api instance
          console.log("Create CA API instance");
          const CognosApi = require('../CognosApi');
          const cognosApi = new CognosApi({
            cognosRootURL: caEndpointURL,
            node: document.getElementById('analyticsDivId'),
            sessionCode: caToken,
            initTimeout: 10000,
            language: 'en'
          });

          console.log("Initialize CA API");
          await cognosApi.initialize();
          cognosApi.on(CognosApi.EVENTS.REQUEST_ERROR, this.onError);

          console.log('cognosApi: ' + cognosApi);

          // fetch our dashboard spec
          response = await fetch('http://localhost:8080/analytics/getDashboard/');
          resp = await response.json();
          console.log("CA Dashboard fetch results:", resp);

          // create a dashboard API instance
          console.log("Initialize CA Dashboard API");
          const dashboardAPI = await
            cognosApi.dashboard.openDashboard({
              dashboardSpec: resp
          });

          // or create a blank dashboard
          // const dashboardAPI = await 
          //   cognosApi.dashboard.createNew();

          console.log('dashboardAPI: ' + dashboardAPI);

        } catch (error) {
          console.error('INIT CA ERROR: ' + error);
        }
      },
    }
  }
</script>

<style scoped>
</style>
