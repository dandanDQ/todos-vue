<template>
  <div class="grey lighten-5 pa-4">
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <h3 class="primary--text display-1 .font-italic font-weight-bold my-3">Todo List</h3>

        <v-card class="mt-3" v-show="events.length">
          <v-progress-linear class="my-0" v-model="progressPercentage"/>
          <!-- 每一个事项列表 -->
          <v-list class="pa-0">
            <template v-for="event in events">
              <v-divider :key="`${event.uid}-divider`"></v-divider>
              <listitem :key="event.uid" :event="event"></listitem>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>

<v-row justify="center">
    <v-btn
      @click="clearFinshed"
      >
        clear finished
      </v-btn>
</v-row>
      
    </v-row>
  </div>
</template>

<script>
import listitem from "./listItem";

const filters ={
    all:events => events,
    active:events => events.filter(event => !event.done),
    finished:events => events.filter(event => event.done)

}

export default {
  data() {
    return {
        filters:filters
    };
  },
  components: {
    listitem: listitem
  },

  computed: {
    events() {
      return this.$store.state.events;
    },
    progressPercentage() {
      const len = this.events.length
      return ((len - this.active)*100)/len
    },
    active(){
        return this.events.filter(event => !event.done).length
    }
  },
  methods:{
      clearFinshed(){          
          this.$store.dispatch("clearFinished")
      }
  }
};
</script>