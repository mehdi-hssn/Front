<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-sm-10 offset-sm-1">
      <form v-on:submit.prevent="insertUser()">
                                <div class="form-group">
                                    <input type="text" v-model="register.last_name" class="form-control"
                                           placeholder="Nom" value=""/>
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="register.first_name" class="form-control"
                                           placeholder="Prénom" value=""/>
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="register.email" class="form-control"
                                           placeholder="Email" value=""/>
                                </div>
                                <div class="form-group">
                                    <input type="text" v-model="register.phone" class="form-control"
                                           placeholder="Numéro de téléphone " value=""/>
                                </div>
                                
                                <div class="form-group">
                                    <input type="password" v-model="register.password" class="form-control"
                                           placeholder="Mot de passe" value=""/>
                                </div>
                                <div class="form-group">
                                    <input type="password" v-model="register.re_password" class="form-control"
                                           placeholder="Confirmation de mot de passe" value=""/>
                                </div>
                                <div class="form-group">
                                    <input type="submit" class="btn btn-black font-weight-bold "
                                           value="CREER MON COMPTE"/>
                                </div>

                            </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

const $ = jQuery;
    import axios from 'axios';
    import jQuery from 'jquery';

export default {
  data() {
    return {
      register: {
                    last_name: '',
                    first_name: '',
                    phone:'',
                    email: '',
                    password: '',
                    re_password: '',
                    join:1,
                    ref: ''
                },
    }
  },
  methods: {
    ...mapActions(['clearMessage', 'addMessage', 'registerByEmail']),

    validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
    insertUser() {
                this.register_error = [];
                if (!this.register.first_name) {
                    this.register_error.push('Prénom obligatoire');
                } else if (!this.register.last_name) {
                    this.register_error.push('Nom obligatoire');
                } else if (!this.register.email) {
                    this.register_error.push('Email obligatoire');
                } else if (!this.validEmail(this.register.email)) {
                    this.register_error.push('Email invalide');
                }  else if (!this.register.phone	) {
                    this.register_error.push('Numéro de téléphone obligatoire');
                } else if (!this.register.password) {
                    this.register_error.push('Mot de passe obligatoire');
                } else if (this.register.password.length < 6) {
                    this.register_error.push('Mot de passe doit contenir au mois 6 lettres');
                } else if (!this.register.re_password) {
                    this.register_error.push('Confirmation du mot de passe obligatoire');
                } else if (this.register.re_password != this.register.password) {
                    this.register_error.push('Mot de passe est different du confirmation du mot de passe');
                } else if (!this.register.CGVU) {
                    this.register_error.push('vous devez accepter les CGVU');
                }

                this.register.ref = this.ref;

                axios.post('api/user/create', this.register)
                        .then((res) => {
                            console.log(res.data);
                            if (res.data.status == false) {
                                this.register_error.push(res.data.message);
                            }
                            if (res.data.status == true) {
                                this.register_error.push(res.data.message);
                                if(res.data.block == true){
                                    $('#successRegisterModal').modal('show');
                                }
                                this.register_error = [];
                            }
                        }).catch((error) => {
                            console.log(error);
                        }).finally(() => {});


            }
  }
}
</script>
