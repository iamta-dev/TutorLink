<template>
  <div>
    <div>
      <CButton
        @click="getAllPayment()"
        size="sm"
        color="primary"
        class="ml-1"
      >SHOW ALL</CButton>
      <CButton
        @click="getAllApprovePayment()"
        size="sm"
        color="success"
        class="ml-1"
      >SHOW ONLY APPROVE</CButton>
      <CButton
        @click="getAllUnApprovePayment()"
        size="sm"
        color="danger"
        class="ml-1"
      >SHOW ONLY UNAPPROVE</CButton>
      <CButton
        @click="getAllRejectPayment()"
        size="sm"
        color="warning"
        class="ml-1"
      >SHOW ONLY REJECT</CButton>
    </div>
    <CDataTable
      :items="payments"
      :fields="fields"
      column-filter
      hover
      sorter
      pagination
      :active-page="activePage"
      :pages="100"
      @update:activePage="pageChange"
    >
      <template #paymentStatus="{items, index}">
        <td>
          <CBadge :color="getBadge(payments[index].paymentStatus)">{{payments[index].paymentStatus}}</CBadge>
        </td>
      </template>
      <template #show_details="{payments, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(index)"
          >{{details.includes(index) ? 'Hide' : 'Show'}}</CButton>
        </td>
      </template>

      <template #details="{items, index}">
        <CCollapse :show="details.includes(index)">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <CRow>
                <CCol>
                  <p class="text-muted">PayDate: {{payments[index].payDate}}</p>
                  <p class="text-muted">ApproveDate: {{payments[index].approveDate}}</p>
                  <p class="text-muted">Status: {{payments[index].paymentStatus}}</p>
                  <p class="text-muted">ยอดเงินที่โอน: {{payments[index].amount}} บาท</p>
                </CCol>
                <CCol>
                  <p class="text-muted">PostTutor ID: {{payments[index].postTutorUser.postTutor.id}}</p>
                  <p
                    class="text-muted"
                  >Tutor: {{payments[index].postTutorUser.postTutor.user.username}}</p>
                  <p
                    class="text-muted"
                  >Description: {{payments[index].postTutorUser.postTutor.description}}</p>
                  <p
                    class="text-muted"
                  >ราคาที่ติวเตอร์ตั้ง: {{payments[index].postTutorUser.postTutor.price}} บาท</p>
                </CCol>
              </CRow>
              <CButton
                @click="onClickApprove(payments[index].id)"
                size="sm"
                color="info"
                class
              >Approve</CButton>
              <CButton
                @click="onClickReject(payments[index].id)"
                size="sm"
                color="danger"
                class="ml-1"
              >Reject</CButton>
            </CMedia>
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
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
  { key: "id", _style: "width:20%" },
  { key: "payDate", _style: "width:20%" },
  { key: "amount", _style: "width:20%;" },
  { key: "paymentStatus", _style: "width:20%;" },
  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false
  }
];

export default {
  name: "ManagePayment",
  data() {
    return {
      activePage: 1,
      payments: [],
      fields,
      details: []
    };
  },
  mounted() {
    this.getAllPayment();
  },
  methods: {
    pageChange(e) {
      this.activePage = e;
      this.getAllPayment();
    },
    getAllPayment() {
      axiosInstance
        .get("/payment" + "?page=" + (this.activePage - 1))
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].paymentStatus.name != undefined)
              str += response.data[j].paymentStatus.name;
            for (let i = 1; i < response.data[j].paymentStatus.length; i++) {
              str += ", " + response.data[j].paymentStatus[i].name;
            }
            response.data[j].paymentStatus = str;
          }

          this.payments = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAllApprovePayment() {
      axiosInstance
        .get("/payment/approve" + "?page=" + (this.activePage - 1))
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].paymentStatus.name != undefined)
              str += response.data[j].paymentStatus.name;
            for (let i = 1; i < response.data[j].paymentStatus.length; i++) {
              str += ", " + response.data[j].paymentStatus[i].name;
            }
            response.data[j].paymentStatus = str;
          }

          this.payments = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
     getAllUnApprovePayment() {
      axiosInstance
        .get("/payment/unApprove" + "?page=" + (this.activePage - 1))
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].paymentStatus.name != undefined)
              str += response.data[j].paymentStatus.name;
            for (let i = 1; i < response.data[j].paymentStatus.length; i++) {
              str += ", " + response.data[j].paymentStatus[i].name;
            }
            response.data[j].paymentStatus = str;
          }

          this.payments = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    getAllRejectPayment() {
      axiosInstance
        .get("/payment/reject" + "?page=" + (this.activePage - 1))
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            let str = "";
            if (response.data[j].paymentStatus.name != undefined)
              str += response.data[j].paymentStatus.name;
            for (let i = 1; i < response.data[j].paymentStatus.length; i++) {
              str += ", " + response.data[j].paymentStatus[i].name;
            }
            response.data[j].paymentStatus = str;
          }
          this.payments = response.data;
          this.$nextTick();
        })
        .catch(e => {
          console.log(e);
        });
    },
    putApprovePayment(index) {
      axiosInstance({
        method: "PUT",
        url: "/payment/approve/" + index
      })
        .then(() => {
          alert("Approve สำเร็จ");
          // this.success = true
        })
        .catch(() => {
          //this.fall = true
          alert("Approve ล้มเหลว!!");
        });
    },
    putRejectPayment(index) {
      axiosInstance({
        method: "PUT",
        url: "/payment/reject/" + index
      })
        .then(() => {
          alert("Reject สำเร็จ");
          // this.success = true
        })
        .catch(() => {
          //this.fall = true
          alert("Reject ล้มเหลว!!");
        });
    },
    getBadge(status) {
      return status === "APPROVE"
        ? "success"
        : status === "PENDING"
        ? "secondary"
        : status === "REJECT"
        ? "warning"
        : status === "Banned"
        ? "danger"
        : "primary";
    },
    toggleDetails(index) {
      console.log(index);
      const position = this.details.indexOf(index);
      position !== -1
        ? this.details.splice(position, 1)
        : this.details.push(index);
    },
    onClickApprove(index) {
      //console.log(index);
      this.putApprovePayment(index);
    },
    onClickReject(index) {
      //console.log(index);
      this.putRejectPayment(index);
    }
  }
};
</script>