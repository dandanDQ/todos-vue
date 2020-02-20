<template>
  <v-app>
    <v-card class="d-flex justify-center">
      <router-link to="/" class="routerlink">
        <v-chip class="ma-2" color="deep-purple lighten-1" label text-color="white">
          <v-icon left>mdi-format-list-bulleted</v-icon>Todo List
        </v-chip>
      </router-link>
      <router-link to="/calendar" class="routerlink">
        <v-chip class="ma-2" color="deep-purple lighten-1" label text-color="white">
          <v-icon left>mdi-calendar-today</v-icon>Calendar
        </v-chip>
      </router-link>
    </v-card>

    <router-view></router-view>

    <v-card>
      <taskadder></taskadder>
    </v-card>
    <v-footer bottom>
      <v-row>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">Todos@dq</v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import taskadder from "./components/taskAdder";
import store from "./store";
import pagerouter from "./router";
export default {
  name: "App",
  store,
  router: pagerouter,
  components: {
    taskadder
  }
};
</script>

<style>
.routerlink {
  text-decoration: none;
}
</style>