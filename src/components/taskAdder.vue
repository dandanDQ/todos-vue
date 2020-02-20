<template>
  <v-row justify="center" align="center">
    <!-- 起止日期和时间选择器 -->
    <v-menu
      v-model="selectedOpen"
      :activator="$refs.choosedatebtn"
      :close-on-content-click="false"
      offset-x
    >
      <!-- 背景卡片 -->
      <v-card color="white">
        <v-row>
          <!-- 第一个col 开始日期选择 -->
          <v-col cols="1"></v-col>
          <v-col cols="4">
            <v-menu
              ref="startdateref"
              v-model="startdateref"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startdateFormatted"
                  label="Start Date"
                  prepend-icon="mdi-calendar-today"
                  @blur="date = parseDate(startdateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startdate" no-title @input="startdateref = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="2"></v-col>
          <!-- 第二个col 开始时间选择 -->
          <v-col cols="4">
            <v-menu
              ref="menu3"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time1"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time1"
                  label="Srart Time"
                  prepend-icon="mdi-alarm"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                v-model="time1"
                full-width
                @click:minute="$refs.menu3.save(time1)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="1"></v-col>

          <v-col cols="1"></v-col>
          <!-- 第三个col 完成日期选择 -->
          <v-col cols="4">
            <v-menu
              v-model="finishdateref"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="computedfinishDateFormatted"
                  label="Finish Date"
                  prepend-icon="mdi-calendar-today"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="finishdate" no-title @input="finishdateref = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="2"></v-col>
          <!-- 第四个col 完成时间选择 -->
          <v-col cols="4">
            <v-menu
              ref="picktime2"
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time2"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time2"
                  label="Finish Time"
                  prepend-icon="mdi-alarm"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu4"
                v-model="time2"
                full-width
                @click:minute="$refs.picktime2.save(time2)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="1"></v-col>
        </v-row>

        <v-card class="d-flex justify-center">
          <v-btn rounded color="primary" dark @click="submitDateRange">submit</v-btn>
        </v-card>
        <v-row></v-row>
      </v-card>
    </v-menu>

    <!-- 选颜色小卡片 -->
    <v-menu
      v-model="colorchooser"
      :close-on-content-click="false"
      :activator="$refs.choosecolorbtn"
      offset-x
    >
      <v-card color="white">
        <v-row justify="center">
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <v-color-picker v-model="newcolor"></v-color-picker>
          </v-col>
          <v-col cols="2"></v-col>
          <v-col cols="3">
            <v-btn rounded color="primary" dark @click="colorchooser=!colorchooser">submit</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-menu>

    <!-- 文本输入框 -->
    <v-col cols="12" sm="6">
      <v-text-field
        v-model="newtask"
        label="New Task"
        outlined
        shaped
        clear-icon="mdi-close-circle"
        clearable
        type="text"
        :append-outer-icon="newtask ? 'mdi-send' : ''"
        @click:clear="clearMessage"
        @click:append-outer="addEvent"
        @keyup.enter="addEvent"
      >
        <template v-slot:append>
          <v-btn @click="showdatechooser" icon ref="choosedatebtn">
            <v-icon>mdi-calendar-today</v-icon>
          </v-btn>
          <v-btn @click="showcolorchooser" icon ref="choosecolorbtn">
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      picker: null,
      selectedOpen: false,
      newtask: "",
      newstart: new Date().toISOString().substr(0, 10) + " " + "08:00",
      newend: new Date().toISOString().substr(0, 10) + " " + "09:00",
      newcolor: "#FF80AB",

      startdateFormatted: this.formatDate(
        new Date().toISOString().substr(0, 10)
      ),
      startdate: new Date().toISOString().substr(0, 10),
      finishdateFormatted: this.formatDate(
        new Date().toISOString().substr(0, 10)
      ),
      finishdate: new Date().toISOString().substr(0, 10),
      startdateref: false,
      finishdateref: false,

      time1: "08:00",
      time2: "09:00",
      menu3: false,
      modal2: false,
      menu4: false,

      colorchooser: false
    };
  },

  computed: {
    computedstartDateFormatted() {
      return this.formatDate(this.startdate);
    },
    computedfinishDateFormatted() {
      return this.formatDate(this.finishdate);
    }
  },
  watch: {
    startdate(val) {
      this.startdateFormatted = this.formatDate(this.startdate);
      console.log(val);
    },
    finishdate(val) {
      this.finishdateFormatted = this.formatDate(this.finishdate);
      console.log(val);
    }
  },
  methods: {
    showdatechooser() {
      const open = () => {
        setTimeout(() => (this.selectedOpen = true), 10);
      };
      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }
    },
    showcolorchooser() {
      const open = () => {
        setTimeout(() => (this.colorchooser = true), 10);
      };
      if (this.colorchooser) {
        this.colorchooser = false;
        setTimeout(open, 10);
      } else {
        open();
      }
    },
    clearMessage() {
      this.newtask = "";
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    addEvent() {
      const event = {
        name: this.newtask,
        start: this.newstart,
        end: this.newend,
        color: this.newcolor
      };
      if (event) {
        this.$store.dispatch("addEvent", event);
      }

      //change the variables to inital state
      this.newtask = "";
      this.time1 = "08:00";
      this.time2 = "09:00";
      this.startdate = new Date().toISOString().substr(0, 10);
      this.finishdate = new Date().toISOString().substr(0, 10);
      this.newstart = this.startdate + " " + this.time1;
      this.newend = this.startdate + " " + this.time1;
      this.newcolor = "#FF80AB";
    },
    submitDateRange() {
      this.newstart = this.startdate + " " + this.time1;
      this.newend = this.finishdate + " " + this.time2;
      this.selectedOpen = false;
    }
  }
};
</script>
<style>
</style>