<template>
  <div>
    <CRow v-if="this.postsData != '' ">
      <CCol>
        <CCard>
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Student Post</strong>
            <small>id: {{this.postsData.id}}</small>
          </CCardHeader>
          <CCardBody>
            <CJumbotron header="Bootstrap 4" lead>
              <h1 class="display-5">{{this.postsData.topic}}</h1>
              <p class="lead">{{this.postsData.description}}</p>
              Date: {{this.postsData.postDate}}
              <p class="text-align-right">username : {{this.postsData.user.username}}</p>
              <hr class="my-4" />
            </CJumbotron>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow v-for="postTutor in postTutorJoin" :key="postTutor.id" :value="postTutor.id">
      <CCol>
        <CCard v-if="postTutor != '' ">
          <CCardHeader>
            <CIcon name="cil-justify-center" />
            <strong>Tutor join</strong>
          </CCardHeader>
          <CCardBody>
            <CJumbotron header="Bootstrap 4" lead>
              <h1 class="display-5">{{postTutor.description}}</h1>
              <p class="lead">ราคา {{postTutor.price}} บาท</p>
              Date: {{postTutor.postDate}}
              <p class="text-align-right">username : {{postTutor.user.username}}</p>
              <hr class="my-4" />

              <CButton @click="onClickShowDetails(postTutor.id)" color="info" shape="pill">
                <CIcon name="cil-description" />&nbsp;More Details
              </CButton>
              <CCollapse :show="details.includes(postTutor.id)" class="mt-2">
                <CDataTable :items="studentJoin" :fields="fields" hover></CDataTable>
              </CCollapse>
            </CJumbotron>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import axios from "axios";
let axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api",
  timeout: 120000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json"
  }
});

const fields = [
  { key: "id", label: "ID", _style: "width:20%" },
  { key: "user", label: "Student", _style: "width:20%" }
];

export default {
  name: "Post",
  data() {
    return {
      details: [],
      postsData: [],
      postTutorJoin: [],
      items: [],
      activePage: 1,
      studentJoin: [],
      fields
    };
  },
  mounted() {
    this.getPostById();
    this.getPostTutorJoin();
  },
  methods: {
    pageChange(e) {
      this.activePage = e;
    },
    getPostById() {
      axiosInstance
        .get("/post/" + this.$route.params.id)
        .then(response => {
          this.postsData = response.data;
          //console.log(this.postsData);
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getPostTutorJoin() {
      axiosInstance
        .get("/post-tutor/" + this.$route.params.id)
        .then(response => {
          this.postTutorJoin = response.data;
          //console.log(this.postTutorJoin);
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAllStudentJoinByPostId(postTutorId) {
      axiosInstance
        .get("post-tutor/join/get/" + postTutorId)
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].user != undefined)
              str += response.data[j].user.username;
            for (let i = 1; i < response.data[j].user.length; i++) {
              str += ", " + response.data[j].user[i];
            }
            response.data[j].user = str;
          }
          this.studentJoin = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },

    goBack() {
      this.$router.go(-1);
    },
    onClickShowDetails(postTutorId) {
      this.getAllStudentJoinByPostId(postTutorId);
      console.log(postTutorId);
      const position = this.details.indexOf(postTutorId);
      position !== -1
        ? this.details.splice(position, 1)
        : this.details.push(postTutorId);
    },
    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status === "Pending"
        ? "warning"
        : status === "Banned"
        ? "danger"
        : "primary";
    }
  }
};
</script>
