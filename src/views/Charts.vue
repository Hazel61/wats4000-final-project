<template>
  <div>
    <p>High and low temperatures for 2018</p>
    <p>
      <line-chart :options="chartOptions" :chart-data="chartData"/>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '@/components/LineChart';

export default {
  name: 'Seattle',
  data () {
    let a_dataset = [
      {
        label: 'High Temperature',
        backgroundColor: '#f87979',
        data: []
      },
      {
        label: 'Low Temperature',
        backgroundColor: 'blue',
        data: []
      }
    ]
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: a_dataset
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false

      },
      results: null,
      errors: [],
      Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  },

  mounted () {
    // High Temperature call
    let lowTemperatures = null, highTemperatures = null
    axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
      headers: {
        token: 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD',
      },
      params: {
        stationid: "GHCND:USW00024233",
        units: "standard",
        datatypeid: "EMXT",
        limit: 100,
        startdate: "2018-01-01",
        enddate: "2018-12-31",
        datasetid: "GSOM"
      }
    })
      .then(response => {
        this.results = response.data.results;
        let highTemperatures = this.results.map(item => { return item.value })
        //get low temps
        // Low Temperature call

        axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/data', {
          headers: {
            token: 'AlOCstuxmDrmZEVMyzYRHkJtzIOjDLBD',
          },
          params: {
            stationid: "GHCND:USW00024233",
            units: "standard",
            datatypeid: "EMNT",
            limit: 100,
            startdate: "2018-01-01",
            enddate: "2018-12-31",
            datasetid: "GSOM"
          }
        })
          .then(response => {
            this.results = response.data.results;

            let lowTemperatures = this.results.map(item => { return item.value })

            //put it all togther
            let a_dataset = [
              {
                label: 'High Temperature',
                backgroundColor: '#f87979',
                data: highTemperatures
              },
              {
                label: 'Low Temperature',
                backgroundColor: 'blue',
                data: lowTemperatures
              }
            ]

            this.chartData = { labels: this.labels, datasets: a_dataset, chartOptions: this.chartOptions }

          })
          .catch(error => {
            console.log("emnt", error)

            this.errors.push(error)
          });

      })
      .catch(error => {
        console.log("emxt", error)
        this.errors.push(error)
      });


  },
  components: {
    // 'error-list': ErrorList,
    'line-chart': LineChart
  },
  
}
</script>

<style scoped>
</style>