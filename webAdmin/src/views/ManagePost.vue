<template>
  <CRow>
    <CCol>
      <transition name="slide">
        <CCard>
          <CCardHeader>ManagePost</CCardHeader>
          <CCardBody>
            <CDataTable
              column-filter
              hover
              sorter
              striped
              :items="items"
              :fields="fields"
              :items-per-page="10"
              clickable-rows
              @row-clicked="rowClicked"
            >
              <template #status="data">
                <td>
                  <CBadge :color="getBadge(data.item.status)">{{data.item.status}}</CBadge>
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
          </CCardBody>
        </CCard>
      </transition>
    </CCol>
  </CRow>
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

export default {
  name: "ManagePost",
  data() {
    return {
      items: [],
      fields: [
        { key: "id", label: "ID", _classes: "font-weight-bold" },
        { key: "topic", label: "Topic" },
        { key: "postDate", label: "PostDate" },
        { key: "status" }
      ],
      activePage: 1
    };
  },
  methods: {
    pageChange(e) {
      this.activePage = e;
      this.getAllPost();
    },
    getAllPost() {
      axiosInstance
        .get("/post?page=" + (this.activePage - 1) + "&size=3")
        .then(response => {
          this.userPost = response.data;
          this.items = response.data;
          this.$nextTick();
          //console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    rowClicked(items) {
      this.$router.push({ path: `managePost/${items.id}` });
    }
  },
  mounted() {
    this.getAllPost();
    // console.log(this.items);
  }
};
</script>
