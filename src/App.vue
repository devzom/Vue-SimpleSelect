<template>
  <div id="app">
    <div>
      <h4>*Vue-SimpleSelect* component</h4>
      <div>Value of selection: {{ testData.selectModel }}</div>
    </div>
    <div class="col">
      <SimpleSelect
        :options="testData.selectOptions"
        clear-btn
        @input="getSelectValue"
      />
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
      testData: {
        selectModel: "",
        selectOptions: [
          { text: "Option 1", value: 1 },
          { text: "Option 2", value: 2 },
          { text: "Option 3", value: 3 },
          { text: "Option 4", value: 4 },
          { text: "Option 5", value: 5 },
          { text: "Option 6", value: 6 },
          { text: "Option 7", value: 7 },
          { text: "Option 8", value: 8 },
          { text: "Option 9", value: 9 },
          { text: "Option 10", value: 10 },
        ],
      },
    };
  },
  methods: {
    getSelectValue(value) {
      this.testData.selectModel = value;
    },
  },
};
</script>

<style lang="scss">
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
  margin-top: 2rem;
  width: 33.3%;
}
</style>
