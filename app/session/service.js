import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Service.extend({
  headerSectionTitle: 'Dashboards',
  indicatorCards: [],
  dashboardReturnDisplay: 'dashboardReturnDisplayNone',
  layerListing: [],
  token: '',

  init() {
    let layerListing = [];
    this.set('layerListing', layerListing);

    // this.getToken()
    //   .then(function (response) {
    //     console.log(response);
    //     if (response.token) {
    //       this.set('token', response.token);
    //     }
    //   }.bind(this))
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  },

  getToken() {
    const url = 'https://www.arcgis.com/sharing/generateToken';
    const data = {
      username: 'prep_user',
      password: 'password123',
      referer: 'client',
      f: 'json'
    };

    return ajax({
      url: url,
      data: data,
      dataType: 'json'
    });
  }
});
