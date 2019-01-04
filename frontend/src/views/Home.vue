<template>
  <div>
    <NavBar />
    <br/>
    <form>
      <div class="form-group required col-sm-4 col-md-4 offset-sm-4 offset-md-4 ">
        <label class="control-label" for="fullName" v-bind:class="{'text-danger': (form.fullNameClass === 'border border-danger')}">Họ tên</label>
        <input class="form-control" @keyup="checkValidation" ref="txtFullName" id="fullName" name="fullname" v-bind:class="form.fullNameClass" v-validate="'required'" placeholder="Nhập họ tên" v-model="form.fullName">
        <small v-if="errors.has('fullname')" class="form-text text-danger">{{ errors.first('fullname') }}</small>
      </div>
      <div class="form-group required col-sm-4 col-md-4 offset-sm-4 offset-md-4">
        <label class="control-label" for="phone" v-bind:class="{'text-danger': (form.phoneClass === 'border border-danger')}">Số điện thoại</label>
        <input min='0' type="number" @keyup="checkValidation" class="form-control number" ref="txtPhone" id="phone" name="phone" v-bind:class="form.phoneClass" v-validate="'required'" placeholder="Nhập số điện thoại" v-model="form.phone">
        <small v-if="errors.has('phone')" class="form-text text-danger">{{ errors.first('phone') }}</small>
      </div>
      <div class="form-group required col-sm-4 col-md-4 offset-sm-4 offset-md-4">
        <label class="control-label" for="nameLocation" v-bind:class="{'text-danger': (form.nameLocationClass === 'border border-danger')}">Địa chỉ đón khách</label>
        <input class="form-control" @keyup="checkValidation" ref="txtNameLocation" id="nameLocation" name="namelocation" v-bind:class="form.nameLocationClass" v-validate="'required'" placeholder="Nhập địa chỉ đón khách" v-model="form.nameLocation">
        <small v-if="errors.has('namelocation')" class="form-text text-danger">{{ errors.first('namelocation') }}</small>
      </div>
      <div class="form-group required col-sm-4 col-md-4 offset-sm-4 offset-md-4">
        <label class="control-label" for="finishLocationName" v-bind:class="{'text-danger': (form.finishLocationNameClass === 'border border-danger')}">Địa chỉ trả khách</label>
        <input class="form-control" @keyup="checkValidation" ref="txtFinishLocationName" id="finishLocationName" name="finishlocationname" v-bind:class="form.finishLocationNameClass" v-validate="'required'" placeholder="Nhập địa chỉ trả khách" v-model="form.finishLocationName">
        <small v-if="errors.has('finishlocationname')" class="form-text text-danger">{{ errors.first('finishlocationname') }}</small>
      </div>
      <div class="form-group col-sm-4 col-md-4 offset-sm-4 offset-md-4">
        <label for="note">Ghi chú</label>
        <textarea class="form-control" ref="txtNote" id="note" name="note" placeholder="Nhập ghi chú" v-model="form.note"></textarea>
      </div>
      <div class="form-group col-sm-4 col-md-4 offset-sm-4 offset-md-4 text-right">
        <button type="button" id="btnRefresh" class="btn btn-warning mr-2" @click="refreshForm">Làm mới</button>
        <button type="submit" id="btnSubmit" class="btn btn-primary" @click.prevent="handleSubmit">Ghi nhận</button>
      </div>
    </form>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

export default {
  data() {
    return {
      form: {
        fullName: '',
        phone: '',
        nameLocation: '',
        finishLocationName: '',
        note: '',
        fullNameClass: '',
        phoneClass: '',
        nameLocationClass: '',
        finishLocationNameClass: '',
        noteClass: ''
      },
      request: ''
    }
  },
  components: {
    NavBar
  },
  methods: {
    refreshForm() {
      var self = this;

      // Iterate through each object field, key is name of the object field
      Object.keys(self.form).forEach(function(key,index) {
        self.form[key] = '';
      });

      // Reset the validator
      self.$validator.reset();
      self.errors.clear();
    },
    handleSubmit() {
      var self = this;
      self.$validator.validate().then(result => {
          if (result) {
              var fullname = self.$refs.txtFullName.value.trim();
              var phone = self.$refs.txtPhone.value.trim();
              var nameLocation = self.$refs.txtNameLocation.value.trim();
              var finishLocationName = self.$refs.txtFinishLocationName.value.trim();
              var note = self.$refs.txtNote.value.trim();
              self.request = {
                'GuestName': fullname,
                'GuestTelephone': phone,
                'NameLocation': nameLocation,
                'FinishLocationName': finishLocationName,
                'Note': note
              }
              self.sendRequestToServer();
              self.sendRequestToRequestManagement();
          } else {
            self.checkValidation();
          }
      });
    },
    checkValidation() {
      var self = this;
      if (self.$validator.errors.has('fullname')) {
        self.form.fullNameClass = 'border border-danger';
      } else {
        self.form.fullNameClass = '';
      }
      if (self.$validator.errors.has('phone')) {
        self.form.phoneClass = 'border border-danger';
      } else {
        self.form.phoneClass = '';
      }
      if (self.$validator.errors.has('namelocation')) {
        self.form.nameLocationClass = 'border border-danger';
      } else {
        self.form.nameLocationClass = '';
      }
      if (self.$validator.errors.has('finishlocationname')) {
        self.form.finishLocationNameClass = 'border border-danger';
      } else {
        self.form.finishLocationNameClass = '';
      }
    },
    sendRequestToServer() {
      var self = this;
      var url = 'http://localhost:5000/requests/insert';
      axios({
        method: 'POST',
        url: url,
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
        },
        data: self.request,
        timeout: 10000
      })
      .then(res => {
        console.log(res.data);

        var url = 'http://localhost:3000/requests';
        var objToPost = {
          ID: res.data.id,
        }
        axios({
          method: 'POST',
          url: url,
          data: objToPost,
          headers: {
            'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
          },
          timeout: 10000
        })
        .then(res => {
          console.log(res.data);
          this.$message({ type: 'success', message: `Ghi nhận request thành công` });
        })
        .catch(err => {
          console.log(err);
          this.$message({ type: 'error', message: `Gửi request thất bại. Có lỗi xảy ra: ${err}` });
        })
      })
      .catch(err => {
        console.log(err);
        this.$message({ type: 'error', message: `Gửi request thất bại. Có lỗi xảy ra: ${err}` });
      })
    },
    sendRequestToRequestManagement() {
      var self = this;
      var url = 'http://localhost:3010/requests';
      var objToPost = {
        ID: 1,
      }
      axios({
        method: 'POST',
        url: url,
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken
        },
        data: objToPost,
        timeout: 10000
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
/* Hide HTML5 Up and Down arrows. */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
