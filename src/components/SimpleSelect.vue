<template>
  <div class="vss">
    <div class="vss__options">
      <div
        v-for="option in options"
        @mousedown="selectOption"
        :key="option.text"
        class="vss__option"
      >
        <input
          class="vss__option-input"
          type="radio"
          :value="option.value"
          :id="`option-${option.value}`"
          name="selectGroup"
        />

        {{ option.text }}
      </div>
    </div>
    <div class="vss__selected" @mousedown="toggleDropdown($event)">
      {{ selected.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleSelect",
  props: {
    placeholder: {
      type: String,
      default: "Select option",
    },
    options: {
      type: Array,
      default: () => [
        { text: "Option 1", value: 1 },
        { text: "Option 2", value: 2 },
        { text: "Option 3", value: 3 },
        { text: "Option 4", value: 4 },
        { text: "Option 5", value: 5 },
      ],
      // required: true
    },
  },
  data() {
    return {
      selected: { text: null, value: 0 },
    };
  },
  created() {
    if (!this.selected.text) this.selected.text = this.placeholder;
  },
  methods: {
    toggleDropdown() {
      const selectOptions = document.querySelector(".vss__options");
      selectOptions.classList.toggle("vss__active");
    },
    selectOption(option) {
      console.log(option);
      const optionValue = option.target.childNodes[0].value;
      const optionText = option.target.childNodes[1].data.trim();

      this.selected = { text: optionText, value: optionValue };

      this.updateValue(optionValue);
      this.toggleDropdown();
    },
    updateValue(value) {
      this.$emit("select-value", value);
    },
  },
};
</script>

<style lang="scss" scoped>
 @import '@/scss/vss.scss';
</style>
