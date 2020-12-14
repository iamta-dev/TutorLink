<template>
  <CRow>
    <CCol>
      <transition name="slide">
        <CCard>
          <CCardHeader>
            <CForm inline class="align-right">
              <CInput v-model="searchData" class="mr-2 my-0" placeholder="ใส่ข้อมูลเพิ่อค้นหา" size="sm" />
              <CDropdown toggler-text="Serch" class="m-1" color="outline-success" size="sm">
                <CDropdownItem
                  @click="onClickSearch(searchData,select.topic)"
                  v-for="select in selects"
                  :key="select.topic"
                  :value="select.topic"
                >Serch by {{select.topic}}</CDropdownItem>
              </CDropdown>
            </CForm>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              hover
              striped
              sorter
              :items="items"
              :fields="fields"
              :items-per-page="5"
              clickable-rows
              :active-page="activePage"
              @row-clicked="rowClicked"
            >
              <template #status>
                <td>
                  <!-- <CBadge :color="getBadge(data.items.status)">{{data.items.status}}</CBadge> -->
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
  name: "Users",
  data() {
    return {
      searchData: "",
      items: [],
      selects: [
        { topic: "username" },
        { topic: "email" },
        { topic: "fristname" },
        { topic: "phone" }
      ],
      fields: [
        { key: "username", label: "Username", _classes: "font-weight-bold" },
        { key: "regDate", label: "Registered" },
        { key: "roles", label: "Role" },
        { key: "status" }
      ],
      activePage: 1
    };
  },
  methods: {
    pageChange(e) {
      this.activePage = e;
      this.getAllUser();
    },
    getAllUser() {
      axiosInstance
        .get("/user/getAllUser" + "?page=" + (this.activePage - 1))
        .then(response => {
          //console.log(response.data);
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].roles[0] != undefined)
              str += response.data[j].roles[0].name;
            for (let i = 1; i < response.data[j].roles.length; i++) {
              str += ", " + response.data[j].roles[i].name;
            }
            //console.log(str)
            response.data[j].roles = str;
          }
          this.items = response.data;
          this.$nextTick();
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
      this.$router.push({ path: `ManageUser/${items.username}` });
    },
    onClickSearch(data,topic) {
      switch (topic) {
        case "username":
          axiosInstance
            .get("/user/username/" + data)
            .then(response => {
              this.$router.push({ path: `ManageUser/${response.data.username}` });
              this.$nextTick();
            })
            .catch(e => {
              alert("not found");
            });
          break;
        case "fristname":
          axiosInstance
            .get("/user/firstname/" + data)
            .then(response => {
              this.$router.push({ path: `ManageUser/${response.data.username}` });
              this.$nextTick();
            })
            .catch(e => {
              alert("not found");
            });
          break;
        case "phone":
          axiosInstance
            .get("/user/phone/" + data)
            .then(response => {
              this.$router.push({ path: `ManageUser/${response.data.username}` });
              this.$nextTick();
            })
            .catch(e => {
              alert("not found");
            });
          break;
        case "email":
          axiosInstance
            .get("/user/email/" + data)
            .then(response => {
              this.$router.push({ path: `ManageUser/${response.data.username}` });
              this.$nextTick();
            })
            .catch(e => {
              alert("not found");
            });
          break;
        default:
          console.log("error");
          break;
      }
    }
  },
  mounted() {
    this.getAllUser();
  }
};
</script>
