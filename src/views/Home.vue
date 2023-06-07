<template>
  <div class="home">
    <!-- <el-button @click="toggleMarker">新增</el-button> -->
    <div class="test">
      <p>你瞅啥?</p>
    </div>
    <div id="container">
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first"></el-tab-pane>
          <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        </el-tabs>
        <div class="searchBox">
          <el-form ref="form" :model="form" label-width="100px" :inline="true">
            <el-form-item label="筛选员工：">
              <el-input v-model="form.name"></el-input> </el-form-item
            ><el-button type="primary" class="searchBtn" @click="searchEmploy"
              >搜索</el-button
            >
          </el-form>
          <div class="models">
            <div
              class="model"
              @mouseenter="tioggleIcon('hover')"
              @mouseleave="tioggleIcon('icon')"
            >
              <img :src="icon_" alt="" class="icon" />
              模式区域盒子
            </div>
          </div>
        </div>
      </div>
      <div class="tables">
        <div class="title">
          {{ this.activeName == "first" ? "用户管理" : "配置管理" }}
        </div>
        <el-table
          :data="tableData_inTable"
          style="width: 100%"
          :header-cell-style="headStyle"
          :cell-style="rowStyle"
        >
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="180">
            <template slot-scope="scope">
              <span
                class="state"
                :style="{
                  color: scope.row.state == 'stoped' ? 'red' : 'green',
                }"
              >
                {{ scope.row.state == "normal" ? "启用" : "停用" }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                :style="{
                  color: scope.row.state == 'stoped' ? 'green' : 'red',
                }"
                @click="toggleState(scope.row)"
                type="text"
                size="small"
                >{{ scope.row.state == "normal" ? "停用" : "启用" }}</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteRow(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="paging">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="tableData_.length"
            :page-size="pageObj.size"
            :current-page="pageObj.pageNum"
            @current-change="changeCurrenPage"
            :hide-on-single-page="true"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      form: {
        name: "",
        name_: "",
      },
      pageObj: {
        size: 10,
        pageNum: 1,
      },
      map: {},
      mousetool: {},
      markMode: "none",
      activeName: "first",
      icon: require("../assets/icon.png"),
      icon_active: require("../assets/icon_hover.png"),
      iconState: "normal",
      tableData2: [],
      tableData: [],
    };
  },
  methods: {
    initList(num = 100) {
      for (let i = 0; i < num; i++) {
        let obj = {
          date: "2016-05-02",
          name: "王小虎" + (i + 1),
          state: "normal",
          address: "上海市普陀区金沙江路 1518 弄",
        };
        if (i % 2 == 0) {
          obj.state = "stoped";
        }
        this.tableData.push(obj);
      }
    },
    searchEmploy() {
      this.form.name_ = this.form.name;
    },
    headStyle() {
      return "text-align:center";
    },
    rowStyle() {
      return "text-align:center";
    },
    deleteRow() {
      let list = this.activeName == "first" ? this.tableData : this.tableData2;
      let { pageNum, size } = this.pageObj;
      list.splice(pageNum * size - size, 1);
      if (this.tableData_inTable.length == 0) {
        this.pageObj.pageNum = this.pageObj.pageNum - 1;
      }
    },
    toggleState(row) {
      row.state == "normal" ? (row.state = "stoped") : (row.state = "normal");
    },
    changeCurrenPage(pageNum) {
      this.pageObj.pageNum = pageNum;
    },
    tioggleIcon(type) {
      this.iconState = type == "icon" ? "normal" : "hover";
    },
  },
  computed: {
    tableData_() {
      let list = this.activeName == "first" ? this.tableData : this.tableData2;
      list = list.filter((item) => {
        return item.name.indexOf(this.form.name_) !== -1;
      });
      return list;
    },
    tableData_inTable() {
      let { pageNum, size } = this.pageObj;
      let start = pageNum * size - size;
      let end = size * pageNum;
      let list_ = this.tableData_.slice(start, end);
      return list_;
    },
    icon_() {
      return this.iconState == "normal" ? this.icon : this.icon_active;
    },
  },
  created() {
    this.initList(50);
  },
  mounted() {},
};
</script>

<style scoped lang="less">
.home {
  width: 100vw;
  height: 100vh;
  .test {
    height: 100%;
    display: flex;
    justify-content: center;

    p {
      margin-top: 80px;
      font-size: 80px;
      color: #333;
      cursor: pointer;
      user-select: none;
    }
  }
  #container {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f5f5f5;
    display: none;
    & > div {
      padding: 20px;
    }
    .tabs {
      background: #fff;
    }
    .tables {
      margin-top: 20px;
      flex: 1;
      background: #fff;
    }
  }
}
.searchBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .searchBtn {
    padding-left: 30px;
    padding-right: 30px;
  }
  .models {
    .model {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      padding: 10px 20px;
      background: #f5f5f5;
      cursor: pointer;
      &:hover {
        color: red;
      }
      .icon {
        width: 14px;
        margin-right: 10px;
      }
    }
  }
}
.tables {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 20px;
  }
}
.paging {
  padding: 10px;
  text-align: center;
}
</style>
