<template>
  <CContainer class="d-flex content-center min-vh-100">
    <Alert
      v-show="success == true"
      :open="success"
      topic="แจ้งเตือน"
      desc="Login success"
      :callback="()=>this.success = false"
    />
    <Alert
      v-show="fall == true"
      :open="fall"
      topic="แจ้งเตือน"
      desc="Login fall"
      :callback="()=>this.fall = false"
    />
    <CRow>
      <CCol>
        <CCardGroup>
          <CCard class="p-5">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput v-model="username" placeholder="Username" autocomplete="username email">
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  v-model="password"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CRow>
                  <CCol>
                    <CButton
                      v-if="this.username != '' & this.password != '' "
                      @click="()=>sendRequesLogin(this)"
                      color="primary"
                      class="px-4"
                    >Login</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import Alert from "../../views/notifications/Alert";
import axios from "axios";
let axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api",
  timeout: 120000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json"
  }
});
export default {
  name: "Login",
  data() {
    return {
      success: false,
      fall: false,
      username: "",
      password: "",
      userData: []
    };
  },
  components: {
    Alert
  },
  mounted() {},

  methods: {
    sendRequesLogin() {
      axiosInstance({
        method: "post",
        url: "/auth/login",
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(response => {
          this.success = true;
          console.log(response.data);
          this.userData = response.data;
        })
        .catch(() => {
          this.fall = true;
        });
    }
  }
};
</script>
