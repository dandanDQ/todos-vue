<template>
  <v-list-item class="item" :class="{'editing2':editing2}">
    <v-list-item-action>
      <v-checkbox :input-value="event.done" @change="toggleEvent" color="primary" v-if="!editing2"></v-checkbox>
      <v-icon color="primary" v-else>mdi-file-document-edit-outline</v-icon>
    </v-list-item-action>

    <template v-if="!editing2">
      <v-list-tile-content
        :class="{'primary--text':event.done}"
        @dblclick="editing2=true"
      >{{event.name}}</v-list-tile-content>
    </template>

    <v-text-field
      v-else
      :value="event.name"
      @blur="editEvent"
      @keyup.enter="editEvent"
      color="primary"
      hide-details
    ></v-text-field>

    <v-list-item-action>
<v-btn
@click="removeEvent(event)"
flat
icon
color="primary"
left="false"
>
    <v-icon>mdi-close-box</v-icon>
</v-btn>

    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["event"],
  data() {
    return {
      editing2: false
    };
  },
  methods: {
    toggleEvent() {
      this.$store.dispatch("toggleEvent", this.event);
    },
    editEvent(e) {
      const value = e.target.value.trim();
      const event = this.event;
      this.editing2 = false;
      if (!value) {
        this.$store.dispatch("removeEvent", event);
      } else {
        this.$store.dispatch("editEvent", { event, value });
      }
    },
    removeEvent() {
      if (this.event) {
        this.$store.dispatch("removeEvent", this.event);
        this.event = {};
      }
    }
  }
};
</script>

