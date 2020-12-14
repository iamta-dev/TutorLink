<template>
  <div>
    <CCard class="card-details">
      <CCardBody class="card-body-details">
          <div class="card-img-avatar">
          <img  class="img-avatar" src="https://assets.skooldio.com/instructors/Ta2020.jpg" />
        </div>
         <hr color="#faa91a" />
        <CRow>
          <CCol>
            <CDataTable striped small fixed :items="visibleData" :fields="fields" />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
    <CRow>
      <CCol>
        <Header center>History</Header>
        <CDataTable
          :items="userPost"
          :fields="fields2"
          column-filter
          hover
          sorter
          pagination
          clickable-rows
          @row-clicked="rowClicked"
        >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
            </td>
          </template>
        </CDataTable>
        <CPagination
          align="center"
          :double-arrows="false"
          :active-page="activePage"
          :pages="100"
          @update:activePage="pageChange"
        />
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

const fields2 = [
  { key: "id", _style: "width:10%" },
  { key: "topic", _style: "width:40%" },
  { key: "postDate", _style: "width:20%;" },
  { key: "status", _style: "width:20%;" }
];

export default {
  name: "User",
  data() {
    return {
      fields2,
      item: [],
      details: [],
      usersData: [],
      userPost: [],
      activePage: 1
    };
  },
  mounted() {
    this.getUserByUsername();
    this.getAllUserPost();
    //console.log(this.$route.params.username);
  },

  computed: {
    fields() {
      return [
        { key: "key", label: this.username, _style: "width:150px" },
        { key: "value", label: "", _style: "width:150px;" }
      ];
    },
    userData() {
      const userDetails = this.usersData
        ? Object.entries(this.usersData)
        : [["username", "Not found"]];
      return userDetails.map(([key, value]) => {
        return { key, value };
      });
    },
    visibleData() {
      return this.userData.filter(param => param.key !== "id");
    }
  },
  methods: {
    pageChange(e) {
      this.activePage = e;
      this.getAllUserPost();
    },
    getAllUserPost() {
      axiosInstance
        .get("/post/users/" + this.$route.params.username)
        .then(response => {
          this.userPost = response.data;
          this.item = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getUserByUsername() {
      axiosInstance
        .get("/user/username/" + this.$route.params.username)
        .then(response => {
          let str = "";
          if (response.data.roles[0] != undefined)
            str += response.data.roles[0].name;
          for (let i = 1; i < response.data.roles.length; i++) {
            str += ", " + response.data.roles[i].name;
          }
          response.data.roles = str;
          this.usersData = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },

    goBack() {
      this.$router.go(-1);
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
    },
    rowClicked(userPost) {
      this.$router.push("/managePost/" + userPost.id);
    }
  }
};
</script>
<style>
.card-details {
  width: 100%;
  height: auto;
}
.img-avatar{
   width:250px;
   height: auto;
}
.card-img-avatar{
  text-align: center;
}
</style>
