<template>
  <!-- 添加出库单对话框 -->
  <el-dialog v-model="visible" title="添加入库单" width="400px" @close="close" destroy-on-close>
    <el-form ref="instoreAddForm" :model="instoreAdd" :rules="rules" label-position="top" label-width="120px">
      <el-form-item label="仓库名称：" prop="storeName">
        <el-input v-model="instoreAdd.storeName" disabled />
      </el-form-item>
      <el-form-item label="商品名称：" prop="productName">
        <el-input v-model="instoreAdd.productName" disabled />
      </el-form-item>
      <el-form-item label="库存：" prop="productInvent">
        <el-input v-model="instoreAdd.productInvent" disabled />
      </el-form-item>
      <el-form-item label="入库数量：" prop="inNum">
        <el-input v-model="instoreAdd.inNum" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="addInstore">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { post, tip } from "@/common"

// 该页面的可见性
const visible = ref(false);

// 添加出库单对象
const instoreAdd = reactive({
  productId: '',
  productName: '',
  storeId: '',
  storeName: '',
  productInvent: '',
  inNum: ''
});

const validateInNum = (rule, inNum, callback) => {
  if (inNum === '') return callback(new Error('请输入入库数量！'));
  // 库存
  const productInvent = parseInt(instoreAdd.productInvent);
  if(parseInt(inNum)<=0) return callback(new Error('入库数量必须大于0！'));
  return true;
}

// 表单验证规则
const rules = reactive({
  inNum: [
    { validator: validateInNum, trigger: 'blur' }
  ]
})

// 关闭
const close = () => {
  instoreAdd.inNum = '';
  visible.value = false;
}

// 该对话框打开，进行数据初始化
const open = (commodity) => {
  visible.value = true;
  for(let prop in commodity){
    instoreAdd[prop] = commodity[prop];
  }
};

const instoreAddForm = ref();
// 定义
const emit = defineEmits(["ok"]);
// 入库单提交
const addInstore = () => {
  instoreAddForm.value.validate((valid) => {
    if(valid){
      post('/oistore/instore-add', instoreAdd).then(result => {
        emit('ok', instoreAdd.storeId);
        tip.success(result.message);
      });
      visible.value = false; // 关闭对话框
    }
  });
}

defineExpose({ open });
</script>

<style>


</style>