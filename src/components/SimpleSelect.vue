<template>
  <div
    ref="vssSelect"
    class="vss"
    :class="{ 'vss--disabled': disabled }"
    :tabindex="tabindex"
    @blur="closeDropdown"
  >
    <!-- Dropdown list with options -->
    <div
      ref="vssSelectOptions"
      class="vss__options"
      :class="{ vss__active: isOpen, 'vss__options--shadow': shadow }"
      :aria-label="placeholder"
      role="select"
    >
      <!-- Options -->
      <div
        v-for="option in options"
        :key="option.text"
        ref="vssSelectOption"
        class="vss__option"
        role="option"
        type="button"
        @mousedown="selectOption"
      >
        <input
          :id="`option-${option.value}`"
          class="vss__option-input"
          type="radio"
          :value="option.value"
          :disabled="disabled"
          name="selectGroup"
        />
        {{ option.text }}
      </div>
      <!-- /Options -->
    </div>
    <!-- /Dropdown list with options -->
    <div
      class="vss__selected"
      type="button"
      @mousedown="toggleDropdown($event)"
    >
      <!-- Floating label -->
      <span
        v-show="selected.value && floatingPlaceholder"
        class="vss__floating-label"
        >{{ placeholder }}</span
      >
      <!-- /Floating label -->

      <!-- Single label/ placeholder -->
      <span class="vss__selected-label">
        {{ selected.text ? selected.text : placeholder }}
      </span>
      <!-- /Single label/ placeholder -->
    </div>

    <!-- Clear button -->
    <span
      v-show="selected.value && clearBtn"
      class="vss__clear-button"
      @click.prevent="clearSelection"
      >X</span
    >
    <!-- /Clear button -->
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
    emptyText: {
      type: String,
      default: "No options",
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },

    /* The tabindex property allows our component to be focused, which in turn allows it to be blurred. The blur event closes our component when a user clicks outside of the component. */
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    /*
     *  @Style - Show a shadow under the dropdown
     */
    shadow: {
      type: Boolean,
      default: true,
    },
    /*
     *  @Style - Show floating placeholder text when selection is done
     */
    floatingPlaceholder: {
      type: Boolean,
      default: false,
    },
    /*
     *  @Function - disable component
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /*
     *  @Function + @Style - Show clear button as 'x' to clear selected option
     */
    clearBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: { text: null, value: null },
      noOptions: false,
      isOpen: false,
      isClosed: true,
    };
  },
  created() {
    this.checkOptions();
  },
  mounted() {
    this.$emit("input", this.selected.value);
  },
  methods: {
    checkOptions() {
      this.noOptions = this.options?.length === 0 || false;
    },
    setPlaceholder() {
      if (this.noOptions) {
        this.selected.text = this.emptyText;
        return;
      }
      this.selected.text = this.placeholder;
    },

    selectOption(option) {
      const optionValue = option.target.childNodes[0].value;
      const optionText = option.target.childNodes[1].data.trim();

      this.selected = { text: optionText, value: optionValue };

      this.updateValue(optionValue);
      this.toggleDropdown();
    },
    updateValue(value = null) {
      /* By emitting the selected option using the ‘input’ parameter, the parent component can react to changes. */
      this.$emit("input", value);
    },
    clearSelection() {
      this.closeDropdown();
      this.resetSelectedModel();
    },
    resetSelectedModel() {
      this.selected = { text: null, value: null };
      this.updateValue();
    },
    toggleDropdown() {
      if (this.noOptions) return;
      this.isOpen = !this.isOpen;

      // for future use, handle the check if dropdown is closed
      this.isClosed = !this.isClosed;
    },
    closeDropdown() {
      if (this.isOpen) this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/vss.scss";
</style>
