<template>
    <div id="home">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="话题(ask)" name="first"></el-tab-pane>
            <el-tab-pane label="共享(share)" name="second"></el-tab-pane>
            <el-tab-pane label="职业(job)" name="third"></el-tab-pane>
            <el-tab-pane label="优质的(good)" name="fourth"></el-tab-pane>
        </el-tabs>
        <div class="content">
            <!-- 数据展示 -->
             <el-table :data="topicsLists" border style="width: 100%">
                <el-table-column
                    fixed
                    prop="visit_count"
                    label="编号"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="author.loginname"
                    label="用户名"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="create_at"
                    label="日期"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="ID"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="zip"
                    label="头像"
                    width="120">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick2(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="100">
                </el-pagination>
            </div>
            
            <!-- 详情展示 -->
            <!-- <el-button type="danger" icon="el-icon-delete" circle v-if="detailshide" @click="detailshides"></el-button> -->
            <span v-if="detailshide" @click="detailshides" class="xq">隐藏详情</span>
            <div class="details" v-html="details" v-if="detailshide"></div>
            
        </div>
    </div>
</template>

<script>
import { topics,topic } from '@/http/api.js'; // 导入接口

export default {
  name: 'home',
  data () {
    return {
        activeName: "first",    //默认选中的tab
        tabIndex:0, // 默认请求tab
        pageIndex:1,    // 默认请求第一页
        pageSize:10,    // 默认的每页展示条数
        tabType:'', // 请求的参数类型
        topicsLists:[], // 数据
        currentPage2: 1, // 默认第1页
        details:'', // 详情
        topicId:'', // 主题id
        detailshide:false,
    }
  },
  created(){
      this.getTopics();
  },
  methods: {
      // tab切换
      handleClick(tab, event) {
        console.log(tab.index, event);
        this.tabIndex = tab.index;
        this.getTopics();
      },
      // 查看事件
      handleClick2(row) {
         console.log(row);
         this.detailshide = true;
         this.topicId = row.id;
         this.getTopicDetails();
      },
      // 选择每页展示条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getTopics();
      },
      // 分页
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getTopics();
      },
      // 隐藏详情
      detailshides(){
          this.detailshide = false;
      },
      // 获取主题首页
      getTopics(){
        if(this.tabIndex == 0){
            this.tabType = "ask";
        }else if(this.tabIndex == 1){
            this.tabType = "share"
        }else if(this.tabIndex == 2){
            this.tabType = "job"
        }else if(this.tabIndex == 3){
            this.tabType = "good"
        }
        topics({
            page:this.pageIndex,
            tab:this.tabType,
            limit:this.pageSize
        }).then( res=> {
            console.log(res)
            this.topicsLists = res.data;
        })
      },
      // 获取主题详情
      /**
       * 获取详情的id以拼接的形式 api中接口已做处理
       */
      getTopicDetails(){
          topic(this.topicId,{}).then( res=> {
              console.log(res)
              this.details = res.data.content;
          })
      }
  }
}

</script>

<style scoped>
    li{
        list-style: none;
    }
    .xq{
        font-size: 12px;
        color: blue;
        cursor: pointer;
    }
</style>
