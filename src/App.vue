<template>
  <div id="app">
    <div>
      <h4>Simple select component</h4>
      <div>Value: {{ selectModel }}</div>
    </div>
    <div class="col">
      <SimpleSelect @select-value="getSelectValue" />
    </div>
  </div>
</template>

<script>
import SimpleSelect from "./components/SimpleSelect";

export default {
  name: "App",
  components: {
    SimpleSelect,
  },
  data() {
    return {
      selectModel: "",
    };
  },
  methods: {
    getSelectValue(value) {
      this.selectModel = value;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.col {
  width: 33.3%;
}
</style>
