<template>
  <div class="mqtt-connect">
    <el-card>
      <h2>连接配置</h2>
      <el-form label-position="top">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-form-item prop="protocol" label="Protocol">
              <!-- <el-select
                v-model="connection.protocol"
                @change="handleProtocolChange"
              > -->
              <el-select>
                <el-option label="ws://" value="ws" />
                <el-option label="wss://" value="wss" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="host" label="Host">
              <el-input
                placeholder="服务器IP地址      如:120.79.33.216"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="port" label="Port">
              <el-input
                type="number"
                placeholder="8083/8084"
              />
            </el-form-item>
          </el-col>

          <!-- <el-col :span="8">
              <el-form-item prop="clientId" label="Client ID">
                <el-input placeholder="null" />
              </el-form-item>
            </el-col> -->
          <el-col :span="4">
            <el-form-item prop="username" label="Username">
              <el-input
                placeholder="root"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item prop="password" label="Password">
              <el-input
                placeholder="1234"
              />
            </el-form-item>
          </el-col>

          <el-button
            type="primary"
            class="space-btn"
            icon="el-icon-caret-right"
            @click="createConnection"
          >connect
            <!-- {{ client.connected ? "Connected" : "Connect" }} -->
          </el-button>

          <el-button
            type="danger"
            class="space-btn"
            icon="el-icon-error"
            @click="destroyConnection"
          >
            Disconnect
          </el-button>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <h2>网关</h2>
      <div class="card-wrapper">
        <el-card class="box-card" style="width:400px;">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px; font-weight: bold">网关列表</span>
            <el-button
              icon="el-icon-circle-plus-outline"
              style="float: right; padding: 3px 0"
              type="text"
              @click="openBgw"
            >添加</el-button>
          </div>
          <div v-for="o in 2" :key="o" class="text-item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>

        <el-card class="box-card">
          <el-descriptions class="margin-top" title="订阅列表" :column="4" direction="horizontal">
            <el-descriptions-item label="username" :span="4">kooriookami </el-descriptions-item>
            <el-descriptions-item label="备注" :span="2">
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px; font-weight: bold">标签列表</span>
            <el-button
              icon="el-icon-circle-plus-outline"
              style="float: right; padding: 3px 0"
              type="text"
              @click="openLabel"
            >添加</el-button>
          </div>
          <div v-for="o in 1" :key="o" class="text-item">
            {{ '列表内容 ' + o }}
          </div>
        </el-card>

      </div>
    </el-card>

    <!-- <el-card>
      <h2>网关</h2>
      <el-form label-position="top" :model="publish" style="text-align:left">
        <el-row :gutter="20" class="text-left">
          <el-col :span="6">
            <el-input
              v-model="BgwInfo"
              type="text"
              placeholder="蓝牙MAC地址"
            />
          </el-col>
          <el-col span="2" class="text-left ">
            <el-button
              type="primary"
              :loading="btnLoadingType === 'publish'"
              @click="doPublish"
            >添加网关
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card> -->

    <el-card>
      <h2>命令控制</h2>
      <el-form label-position="top" :model="publish" style="text-align:left">
        <el-row :gutter="20" class="text-left">
          <el-col :span="6">
            <el-form-item prop="topic" label="Topic">
              <el-input />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="payload" label="Payload">
              <el-input />
              <!-- <el-input v-model="publish.payload" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="qos" label="QoS">
              <el-select>
                <el-option
                  v-for="qos in qosList"
                  :key="qos"
                  :label="qos"
                  :value="qos"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col span="2" class="text-left ">
            <el-button
              type="primary"
              class="space-btn"
              :loading="btnLoadingType === 'publish'"
              @click="doPublish"
            >发送
            </el-button>
          </el-col>

          <!-- <el-col span="4" class="text-center" style="margin-top: 50px">
            <el-switch
              v-model="connected"
              sytle="margin-top:50px;"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="开启扫描"
              inactive-text="关闭扫描"
              @change="handleChange"
            />
          </el-col> -->
          <el-col span="4" class="text-center ">
            <el-button
              type="primary"
              class="space-btn"
              @click="startscan"
            >开启扫描
            </el-button>
            <el-button
              type="primary"
              class="space-btn"
              @click="stopscan"
            >关闭扫描
            </el-button>
          </el-col>
          <!-- <el-button
              type="primary"
              class="space-btn"
              @click="setUUID"
            >设置服务UUID
            </el-button>
            <el-button
              type="primary"
              class="space-btn"
              @click="setfilter"
            >设置过滤
            </el-button> -->
          <el-col span="3" class="text-right">
            <el-dropdown style="margin-top: 50px;">
              <el-button type="primary">
                其他指令<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item>开启扫描</el-dropdown-item> -->
                <!-- <el-dropdown-item>关闭扫描</el-dropdown-item> -->
                <el-dropdown-item>设置服务UUID</el-dropdown-item>
                <el-dropdown-item>设置过滤</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card>
      <h2>接收面板</h2>
      <el-col :span="24" style="margin-bottom: 25px">
        <el-input
          v-model="receivedMessages"
          type="textarea"
          :rows="5"
          readonly
        />
      </el-col>
    </el-card>

    <el-card>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="TimeStamp" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time" />
            <span>{{ scope.row.TimeStamp.replace("T"," ").substring(0,19) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Format" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Format }}</span>
          </template>
        </el-table-column>

        <el-table-column label="BLEMAC" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.BLEMAC }}</span>
          </template>
        </el-table-column>
        <el-table-column label="RSSI" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.RSSI }}
          </template>
        </el-table-column>
        <el-table-column label="AdvType" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.AdvType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="RawData" align="center">
          <template slot-scope="scope">
            {{ scope.row.RawData }}
          </template>
        </el-table-column>
        <el-table-column prop="temperature" label="温度" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.temperature }}
          </template>
        </el-table-column>
        <el-table-column prop="shock" label="振动次数(每分钟)" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.shock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="voltage" label="电压" width="110" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.voltage }}</span>
          </template>
        </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->

      </el-table>
    </el-card>
  </div>
</template>

<style >

h2 {
  font-size: 212x;
  margin-top: 0;
  text-align: left;
}
.el-card {
  margin-bottom: 10px;
}
.el-card__body {
  padding: 18px;
}
.space-btn {
  margin-top: 50px;
}
.el-select {
  width: 100%;
}
.text-right {
  text-align: right;
}
.text-left {
  text-align: left;
}
.text-center {
  text-align: center;
}
.el-switch {
  margin: 10px;
}
.margin-top{
   margin-top: 10px;
}
.card-wrapper {
  display: flex;
  flex-wrap: wrap;
}
.box-card {
  width: 500px;
  margin: 10px;
}
.text-item {
  font-size: 15px;
  margin-bottom: 10px;
}
</style>

<script>

// import * as mqtt from 'mqtt/dist/mqtt.min'
// import { reactive, ref } from 'vue'

// // topic, QoS & payload for publishing message
// const publish = ref({
//   topic: 'topic/browser',
//   payload: '{ "msg": "Hello, I am browser." }'
// })

export default {
  // data() {

  // },
  // created() {

  // },
  methods: {
    openBgw() {
      this.$prompt('请输入蓝牙网关的MAC地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\w{12}$/,
        inputErrorMessage: 'MAC地址格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你添加的蓝牙网关MAC地址为: ' + value

        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }

  }
}
// import { getList } from '@/api/table'
// export default {
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         published: 'success',
//         draft: 'gray',
//         deleted: 'danger'
//       }
//       return statusMap[status]
//     }
//   },

//   data() {
//     return {
//       list: null,
//       listLoading: true
//     }
//   },

//   created() {
//     this.fetchData()
//   },
//   methods: {
//     fetchData() {
//       this.listLoading = true
//       getList().then(response => {
//         this.list = response.data.items
//         this.listLoading = false
//       })
//     }
//   }
// }
</script>
