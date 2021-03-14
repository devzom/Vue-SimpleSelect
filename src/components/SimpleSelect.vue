<template>
  <div
    ref="vssSelect"
    v-click-out="closeDropdown"
    class="vss"
    :class="{ 'vss--disabled': disabled }"
  >
    <div
      ref="vssSelectOptions"
      class="vss__options"
      :class="{ vss__active: isOpen, 'vss__options--shadow': shadow }"
      :aria-label="placeholder"
      role="select"
    >
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
    </div>
    <div
      class="vss__selected"
      type="button"
      @mousedown="toggleDropdown($event)"
    >
      <span
        v-show="selected.value && floatingPlaceholder"
        class="vss__floating-label"
        >{{ placeholder }}</span
      >
      <span class="vss__selected-label">
        {{ selected.text ? selected.text : placeholder }}
      </span>
    </div>
    <span
      v-show="selected.value && clearBtn"
      class="vss__clear-button"
      @click.prevent="clearSelection"
      >X</span
    >
  </div>
</template>

<script>
export default {
  name: "SimpleSelect",
  directives: {
    "click-out": {
      bind: function (el, binding, vnode) {
        el.eventSetDrag = function () {
          el.setAttribute("data-dragging", "yes");
        };
        el.eventClearDrag = function () {
          el.removeAttribute("data-dragging");
        };
        el.eventOnClick = function (event) {
          var dragging = el.getAttribute("data-dragging");
          // Check that the click was outside the el and its children,  wasn't a drag
          if (!(el == event.target || el.contains(event.target)) && !dragging) {
            // call method provided in attribute value
            vnode.context[binding.expression](event);
          }
        };
        document.addEventListener("touchstart", el.eventClearDrag);
        document.addEventListener("touchmove", el.eventSetDrag);
        document.addEventListener("click", el.eventOnClick);
        document.addEventListener("touchend", el.eventOnClick);
      },
      unbind: function (el) {
        document.removeEventListener("touchstart", el.eventClearDrag);
        document.removeEventListener("touchmove", el.eventSetDrag);
        document.removeEventListener("click", el.eventOnClick);
        document.removeEventListener("touchend", el.eventOnClick);
        el.removeAttribute("data-dragging");
      },
    },
  },
  props: {
    placeholder: {
      type: String,
      default: "Select option",
    },
    emptyPlaceholder: {
      type: String,
      default: "No options",
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
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
  methods: {
    checkOptions() {
      this.noOptions = this.options?.length === 0 || false;
    },
    setPlaceholder() {
      if (this.noOptions) {
        this.selected.text = this.emptyPlaceholder;
        return;
      }
      this.selected.text = this.placeholder;
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
    selectOption(option) {
      const optionValue = option.target.childNodes[0].value;
      const optionText = option.target.childNodes[1].data.trim();

      this.selected = { text: optionText, value: optionValue };

      this.updateValue(optionValue);
      this.toggleDropdown();
    },
    updateValue(value) {
      if (value) {
        this.$emit("input", value);
        return;
      }
    },
    clearSelection() {
      this.closeDropdown();
      this.resetSelectedModel();
      this.$emit("clear", null);
    },
    resetSelectedModel() {
      this.selected = { text: null, value: null };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/vss.scss";
</style>
