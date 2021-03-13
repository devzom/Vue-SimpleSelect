<template>
  <div class="select">
    <div class="select__options">
      <div
        v-for="option in options"
        @mousedown="selectOption"
        :key="option.text"
        class="select__option"
      >
        <input
          class="select__option-input"
          type="radio"
          :value="option.value"
          :id="`option-${option.value}`"
          name="selectGroup"
        />

        {{ option.text }}
      </div>
    </div>
    <div class="select__selected" @mousedown="toggleDropdown($event)">
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
    toggleDropdown(e) {
      const selectOptions = document.querySelector(".select__options");
      selectOptions.classList.toggle("select__active");
    },
    selectOption(option) {
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
.select {
  display: flex;
  min-width: 140px;
  flex-direction: column;

  & &__options {
    background-color: grey;
    width: 100%;
    color: #ffffff;
    overflow: hidden;
    transition: all 0.2s;
    border-radius: 6px;
    opacity: 0;
    max-height: 0;
    order: 1;

    &::-webkit-scrollbar {
      width: 6px;
      background: #b9b9b9;
    }

    &::-webkit-scrollbar-thumb {
      background: grey;
    }

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      border-radius: 0 6px 6px 0;
    }
  }

  & &__options {
    padding-top: 2px;

    &.select__active {
      max-height: 140px;
      opacity: 1;
      overflow-y: scroll;

      & + .select__selected::after {
        transform: rotateX(180deg);
        top: -25px;

        /* transition */
        transition: all 0.3s;
      }
    }
  }

  &__selected {
    background-color: grey;
    color: #ffffff;
    border-radius: 6px;
    border: 1px solid rgb(88, 88, 88);
    margin-bottom: 2px;
    position: relative;
    order: 0;

    &::after {
      content: "";
      width: 0;
      height: 100%;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #ffffff;
      position: absolute;
      right: 10px;
      top: 40%;

      /* transition */
      transition: all 0.3s;
    }
  }

  &__option,
  &__selected {
    padding: 8px 20px;
  }

  &__option-input {
    display: none;
  }

  &__option,
  &__selected,
  &__option-label,
  &__option-input {
    cursor: pointer;
  }

  &__option:hover {
    background-color: #b8b8b8;
  }
}
</style>
