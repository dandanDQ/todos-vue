import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme:{
        themes:{
            light:{
                primary:colors.deepPurple.lighten1,
                secondary:colors.deepPurple.lighten3,
                accent:colors.indigo.base,

            }
        }
    }
});
