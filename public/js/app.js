(function() {
  var vueInstance = null;

  $('#open-modal-button').on('click', function() {

        $("#app-container").append(modalStringElement);

        var sucessComponent = Vue.component('success-component', {
            template: successStringElement,
            computed: Vuex.mapState([
                'message',
            ]),
        });

        var errorComponent = Vue.component('error-component', {
            template: errorStringElement,
            computed: Vuex.mapState([
                'message',
            ]),
        });

        var customerFormComponent = Vue.component('customer-form-component', {
            template: customerFormStringElement,
            mounted: function() {
                var vm = this;
                var customerMobileInput = document.getElementById('customer-mobile-input');
                var iti = window.intlTelInput(customerMobileInput, {
                    onlyCountries: this.$store.state.available_countries,
                    preferredCountries: [],
                });
                customerMobileInput.addEventListener('countrychange', function () {
                    var selectedCountry = iti.getSelectedCountryData();
                    vm.$store.commit('SET_YOUR_COUNTRY_CODE', {
                        value: selectedCountry.iso2
                    });
                });

                if (vm.your_country_code !== null) {
                    iti.setCountry(vm.your_country_code);
                } else {
                    var selectedCountry = iti.getSelectedCountryData();
                    vm.$store.commit('SET_YOUR_COUNTRY_CODE', {
                        value: selectedCountry.iso2
                    });
                }
            },
            methods: {
                next: function() {
                    this.$router.replace('/step-three');
                },
                back: function() {
                    this.$router.replace('/step-one');
                },
                setYourNickName: function(event) {
                    this.$store.commit('SET_YOUR_NICK_NAME', {
                        value: event.target.value
                    });
                },
                setYourMobile: function(event) {
                    this.$store.commit('SET_YOUR_MOBILE', {
                        value: event.target.value
                    });
                },
                setYourGender: function(event) {
                    this.$store.commit('SET_YOUR_GENDER', {
                        value: event.target.value
                    });
                }
            },
            computed: Vuex.mapState([
                'your_country_code',
                'your_mobile',
                'your_nick_name',
                'gender_options',
                'available_countries',
                'your_gender'
            ])
      });

      var occasionFormComponent = Vue.component('occasion-form-component', {
            template: occasionFormStringElement,
            computed: Vuex.mapState([
                'occasion_options',
                'occasion_date',
                'gift_name',
                'additional_info',
                'occasion',
                'is_showing_occasion_date_input'
            ]),
            methods: {
                next: function() {
                    this.$router.replace('/step-two');
                },
                setOccasion: function(event) {
                    this.$store.commit('SET_OCCASION', {
                        value: event.target.value
                    });
                },
                setAdditionalInfo: function(event) {
                    this.$store.commit('SET_ADDITIONAL_INFO', {
                        value: event.target.value
                    });
                }
            },
            watch: {
                occasion: function(newValue, oldValue) {
                    var vm = this;

                    var selectedOccasion = this.occasion_options.find(function(occasion) {
                        return occasion.id == newValue;
                    });

                    if (selectedOccasion !== undefined) {
                        if (selectedOccasion.has_exact_date) {
                            vm.$store.commit('SET_OCCASION_DATE', {
                                value: selectedOccasion.date
                            });
                            vm.$store.commit('SET_IS_SHOWING_OCCASION_DATE_INPUT', {
                                value: false
                            });
                        } else {
                            vm.$store.commit('SET_IS_SHOWING_OCCASION_DATE_INPUT', {
                                value: true
                            });
                        }
                    }
                }
            },
            mounted: function() {
                var vm = this;

                $('#occasion-date-input').datepicker({
                        format: 'yyyy-mm-dd',
                        startDate: new Date(),
                        autoclose: true
                    })
                    .on('changeDate', function(e) {
                        vm.$store.commit('SET_OCCASION_DATE', {
                            value: e.format('yyyy-mm-dd')
                        })
                    });
            }
      });

      var giftGiverFormComponent = Vue.component('gift-giver-form-component', {
            template: giftGiverFormStringElement,
            computed: Vuex.mapState([
                'relationship_options',

                'gift_giver_nick_name',
                'gift_giver_country_code',
                'gift_giver_mobile',
                'gift_giver_relationship',
                
                'occasion',
                'occasion_date',
                'custom_occasion_name',
                'is_creating_custom_occasion',

                'your_gender',
                'your_nick_name',
                'your_country_code',
                'your_mobile',

                'gift_name',
                'image_url',
                'product_url',
                'additional_info',
                
                'sms_wording',
            ]),
            methods: {
                back: function() {
                    this.$router.replace('/step-two');
                },
                sendGiftRequest: function() {
                    var vm = this;
                    
                    var url = "/process";

                    var data = {
                        gift_name: vm.gift_name,
                        product_url: vm.product_url,
                        image_url: vm.image_url,
                        additional_info: vm.additional_info,
                        
                        your_gender: vm.your_gender,
                        your_nick_name: vm.your_nick_name,
                        your_country_code: vm.your_country_code,
                        your_mobile: vm.your_mobile,
                        
                        occasion: vm.occasion,
                        occasion_date: vm.occasion_date,
                        is_creating_custom_occasion: 0,
                        custom_occasion_name: '',

                        gift_giver_name: vm.gift_giver_nick_name,
                        gift_giver_mobile_number: vm.gift_giver_mobile,
                        gift_giver_country_code: vm.gift_giver_country_code,
                        gift_giver_relationship: vm.gift_giver_relationship,

                        sms_wording: vm.sms_wording
                    };

                    var request = axios.post(url, data);
                    request
                        .then(function (response) {
                            vm.$store.commit('SET_MESSAGE', {
                                value: response.data.message
                            });
                            vm.$router.replace('/success');
                        })
                        .catch(function (error) {
                            vm.$store.commit('SET_MESSAGE', {
                                value: error.response.data.message
                            });
                            vm.$router.replace('/error');
                        })
                },
                setGiftGiverNickName: function (event) {
                    this.$store.commit('SET_GIFT_GIVER_NICK_NAME', {
                        value: event.target.value
                    });
                },
                setGiftGiverCountryCode: function (event) {
                    this.$store.commit('SET_GIFT_GIVER_COUNTRY_CODE', {
                        value: event.target.value
                    });
                },
                setGiftGiverMobile: function (event) {
                    this.$store.commit('SET_GIFT_GIVER_MOBILE', {
                        value: event.target.value
                    });
                },
                setGiftGiverRelationship: function (event) {
                    this.$store.commit('SET_GIFT_GIVER_RELATIONSHIP', {
                        value: event.target.value
                    });
                },
                setSmsWording: function (event) {
                    this.$store.commit('SET_SMS_WORDING', {
                        value: event.target.value
                    });
                },
                getSmsWording: function () {
                    var vm = this;
                    var url = "/sms-message";

                    var data = {
                        relation: vm.gift_giver_relationship,
                        gift_giver_name: vm.gift_giver_nick_name,
                        gift_giver_country_code: vm.gift_giver_country_code,
                        occasion: vm.occasion,
                        occasion_date: vm.occasion_date,
                        your_gender: vm.your_gender,
                        your_nick_name: vm.your_nick_name,
                        is_creating_custom_occasion: 0,
                        custom_occasion_name: '',
                        gift_name: vm.gift_name
                    };

                    var request = axios.post(url, data);
                    request
                        .then(function (response) {
                            vm.$store.commit('SET_SMS_WORDING', {
                                value: response.data.data.sms_wording
                            });
                        })
                        .catch(function (error) {

                        })
                }
            },
            mounted: function() {
                var vm = this;

                var giftGiverMobileInput = document.getElementById('gift-giver-mobile-input');
                var iti = window.intlTelInput(giftGiverMobileInput, {
                    onlyCountries: vm.$store.state.available_countries,
                    preferredCountries: [],
                });
                giftGiverMobileInput.addEventListener('countrychange', function () {
                    var selectedCountry = iti.getSelectedCountryData();
                    vm.$store.commit('SET_GIFT_GIVER_COUNTRY_CODE', {
                        value: selectedCountry.iso2
                    });
                });

                if (vm.gift_giver_country_code !== null) {
                    iti.setCountry(vm.gift_giver_country_code);
                  } else {
                    var selectedCountry = iti.getSelectedCountryData();
                    vm.$store.commit('SET_GIFT_GIVER_COUNTRY_CODE', {
                        value: selectedCountry.iso2
                    });
                  }
            },
            watch: {
                gift_giver_nick_name: function (newValue, oldValue) {
                    this.getSmsWording();
                },
                gift_giver_relationship: function (newValue, oldValue) {
                    this.getSmsWording();
                }
            }
      });

      var store = new Vuex.Store({
          state: {

              your_nick_name: null,
              your_gender: null,
              your_country_code: null,
              your_mobile: null,

              gift_giver_nick_name: null,
              gift_giver_country_code: null,
              gift_giver_mobile: null,
              gift_giver_relationship: null,

              occasion: null,
              occasion_date: null,
              is_creating_custom_occasion: null,
              custom_occasion_name: null,

              gift_name: null,
              product_url: null,
              image_url: null,
              additional_info: null,

              sms_wording: null,

              gender_options: [],
              available_countries: [],
              relationship_options: [],
              occasion_options: [],

              is_showing_occasion_date_input: true,

              message: null
          },
          mutations: {
              SET_YOUR_NICK_NAME: function(state, payload) {
                  state.your_nick_name = payload.value;
              },
              SET_YOUR_GENDER: function(state, payload) {
                  state.your_gender = payload.value;
              },
              SET_YOUR_COUNTRY_CODE: function(state, payload) {
                  state.your_country_code = payload.value;
              },
              SET_YOUR_MOBILE: function(state, payload) {
                  state.your_mobile = payload.value;
              },
              SET_GIFT_GIVER_NICK_NAME: function(state, payload) {
                  state.gift_giver_nick_name = payload.value;
              },
              SET_GIFT_GIVER_COUNTRY_CODE: function(state, payload) {
                  state.gift_giver_country_code = payload.value;
              },
              SET_GIFT_GIVER_MOBILE: function(state, payload) {
                  state.gift_giver_mobile = payload.value;
              },
              SET_GIFT_GIVER_RELATIONSHIP: function(state, payload) {
                  state.gift_giver_relationship = payload.value;
              },
              SET_OCCASION: function(state, payload) {
                  state.occasion = payload.value;
              },
              SET_OCCASION_DATE: function(state, payload) {
                  state.occasion_date = payload.value;
              },
              TOGGLE_IS_CREATING_CUSTOM_OCCASION: function(state, payload) {
                  state.is_creating_custom_occasion = payload.value;
              },
              SET_CUSTOM_OCCASION_NAME: function(state, payload) {
                  state.custom_occasion_name = payload.value;
              },
              SET_GIFT_NAME: function(state, payload) {
                  state.gift_name = payload.value;
              },
              SET_PRODUCT_URL: function(state, payload) {
                  state.product_url = payload.value;
              },
              SET_IMAGE_URL: function(state, payload) {
                  state.image_url = payload.value;
              },
              SET_ADDITIONAL_INFO: function(state, payload) {
                  state.additional_info = payload.value;
              },
              SET_SMS_WORDING: function(state, payload) {
                  state.sms_wording = payload.value;
              },
              SET_GENDER_OPTIONS: function(state, payload) {
                  state.gender_options = payload.value;
              },
              SET_AVAILABLE_COUNTRIES: function(state, payload) {
                  state.available_countries = payload.value;
              },
              SET_OCCASION_OPTIONS: function(state, payload) {
                    state.occasion_options = payload.value;
              },
              SET_RELATIONSHIP_OPTIONS: function(state, payload) {
                    state.relationship_options = payload.value;
              },
              SET_IS_SHOWING_OCCASION_DATE_INPUT: function(state, payload) {
                    state.is_showing_occasion_date_input = payload.value;
              },
              SET_MESSAGE: function (state, payload) {
                    state.message = payload.value;
              }
          }
      });

      var router = new VueRouter({
          routes: [
                {
                    path: '/step-one',
                    component: occasionFormComponent,
                    name: 'step-one'
                },
                {
                    path: '/step-two',
                    component: customerFormComponent,
                    name: 'step-two'
                },
                {
                    path: '/step-three',
                    component: giftGiverFormComponent,
                    name: 'step-three'
                },
                {
                    path: '/success',
                    component: sucessComponent,
                    name: 'success'
                },
                {
                    path: '/error',
                    component: errorComponent,
                    name: 'error'
                }
          ]
      });

      var request = axios.get('/data');

      request
          .then(function(response) {

              store.commit('SET_GENDER_OPTIONS', {
                  value: response.data.genders
              });
              store.commit('SET_AVAILABLE_COUNTRIES', {
                  value: response.data.available_countries
              });
              store.commit('SET_RELATIONSHIP_OPTIONS', {
                  value: response.data.relations
              });
              store.commit('SET_OCCASION_OPTIONS', {
                  value: response.data.occasions
              });
              store.commit('SET_PRODUCT_URL', {
                  value: window.location.href
              });
              store.commit('SET_GIFT_NAME', {
                  value: 'apple'
              });

              vueInstance = new Vue({
                    el: '#myModal',
                    store: store,
                    router: router,
                    mounted: function() {
                        var vm = this;
                        
                        vm.$router.replace('step-one');

                        vm.$store.commit('SET_YOUR_GENDER', {
                            value: response.data.genders[0].value
                        });
                        vm.$store.commit('SET_OCCASION', {
                            value: response.data.occasions[0].id
                        });
                        vm.$store.commit('SET_GIFT_GIVER_RELATIONSHIP', {
                            value: response.data.relations[0].id
                        });
                        vm.$store.commit('SET_IMAGE_URL', {
                            value: 'https://i5.walmartimages.ca/images/Large/094/514/6000200094514.jpg'
                        });
                  }
              });

              $('#myModal').modal();

              $('#myModal').on('hidden.bs.modal', function() {
                  vueInstance.$destroy();
                  vueInstance = null;

                  $('#app-container').empty();
              });
          });
  });
})();