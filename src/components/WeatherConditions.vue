<template>
  <div>
    <dl>
      <dt v-if="conditions.temp !== conditions.temp_max">Current Temp</dt>
      <dd v-if="conditions.temp !== conditions.temp_max">{{ conditions.temp }}&deg;F</dd>
       <dt>Current Temp</dt>
       <dd>{{ conditions.temp }}&deg;F</dd>
      <dt>High</dt>
      <dd>{{ conditions.value }}&deg;F</dd>
      <dt>Low </dt>
      <dd>{{ conditions.value }}&deg;F</dd>
      <dt>Humidity </dt>
      <dd>{{ conditions.humidity }}%</dd>

    </dl>
  </div>
</template>

<script>
export default {
  name: 'WeatherConditions',
  data () {
    return {

    }
  },
  props: {
    conditions: {}
  }
}
</script>

<style scoped>
  dl {
    padding: 5px;
    background: #e8e8e8;
  }
  dt {
    float: left;
    clear: left;
    width: 120px;
    text-align: right;
    font-weight: bold;
    color: blue;
    padding: 5px;
  }
  dd {
    margin-top: 5px;
    padding: 0 0 0.5em 0;
  }
  dt::after {
    content: ":";
  }
</style>