<template>
  <div id="analyticsDivId" style="height: 600px;">
  </div>
</template>

<script>

  export default {
    name: 'analytics',
    data() {
      return {
        onError: '',
        dashboardApi: 'undefined',
        dashboardSpec: 'undefined',
      }
    },
    mounted() {
      this.initCA()
    },
    // destroyed() {
    //   this.closeCA();
    // },
    methods: {
      /*eslint no-unused-vars: "warn"*/
      
      initCA() {
        let params = {
          token: 'undefined',
          caURL: 'undefined'
        }
        this.getCAcode(params)
          .then(params => this.createCognosApi(params))
          .then(params => this.initCognosApi(params))
          .then(params => this.getDashboardSpec(params))
          .then(params => this.createDashboardApi(params))
          .catch(err => {
            console.log(err);
          })
      },
      
      getCAcode(params) {
        return new Promise((resolve, reject) => {
          const status = response => {
            if (response.status >= 200 && response.status < 300) {
              return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText))
          }

          const json = response => response.json();

          console.log("Generate CA session code");
          fetch('http://localhost:8080/analytics/getCAcode/')
            .then(status)
            .then(json)
            .then(data => {
              console.log('getCAcode.resp: ' + JSON.stringify(data, null, 2));
              let caToken = data['caSessionCode'];
              params.token = caToken;
              params.caURL = data['caEndpointURL'];
              console.log('AFTER getCurrentCACode params: ' + JSON.stringify(params, null, 2));
              resolve(params);
            })
            .catch(error => {
              console.log('getCACode request failed', error);
              return reject(error);
            })
        });
      },

      createCognosApi(params) {
        return new Promise((resolve, reject) => {
          console.log("Create CA API instance");
          const CognosApi = require('../CognosApi');
          try {
            const cognosApi = new CognosApi({
              cognosRootURL: params.caURL,
              node: document.getElementById('analyticsDivId'),
              sessionCode: params.token,
              initTimeout: 10000,
              language: 'en'
            });
            this.cognosApi = cognosApi;
            console.log('AFTER createCognosApi params: ' + JSON.stringify(params, null, 2));
            resolve(params);
          } catch(error) {
            console.log('Error creating CognosAPI: ' + error);
            return reject(error);
          }
        });
      },

      initCognosApi(params) {
        return new Promise((resolve, reject) => {
          console.log("Init CA API instance");
          const CognosApi = require('../CognosApi');
          this.cognosApi.initialize()
            .then(response => {
              this.cognosApi.on(CognosApi.EVENTS.REQUEST_ERROR, this.onError);
              console.log('AFTER initCognosApi params: ' + JSON.stringify(params, null, 2));
              resolve(params);
            })
            .catch(error => {
              console.log('initCognosApi failed', error);
              return reject(error);
            })
        });
      },

      getDashboardSpec(params) {
        return new Promise((resolve, reject) => {
          const status = response => {
            if (response.status >= 200 && response.status < 300) {
              return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText))
          }

          const json = response => response.json();

          console.log("Get dashboard spec");
          fetch('http://localhost:8080/analytics/getDashboard/')
            .then(status)
            .then(json)
            .then(data => {
              console.log('getDashboardSpec success');
              this.dashboardSpec = data;
              resolve(params);
            })
            .catch(error => {
              console.log('getDashboardSpec request failed', error);
              return reject(error);
            })
        });
      },

      createDashboardApi(params) {
        return new Promise((resolve, reject) => {
          try {
            // create a dashboard API instance
            console.log("Initialize CA Dashboard API");
            const dashboardApi = 
              this.cognosApi.dashboard.openDashboard({
                dashboardSpec: this.dashboardSpec
            });
            //dashboardApi.toggleProperties();
            console.log('createDashboardApi success');
            params.dashboardApi = dashboardApi;
            console.log('AFTER createDashboardApi params: ' + JSON.stringify(params, null, 2));
            resolve(params);
          } catch(error) {
            console.log("Error creating CA Dashboard API: " + error);
            return reject(error);
          }
        });
      },     
    
      closeCA(cognosApi) {
        this.cognosApi.close();
        console.log('CLOSE CA WINDOW');
      }
    }
  }

</script>

<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';
</style>
