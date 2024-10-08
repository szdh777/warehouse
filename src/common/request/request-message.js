

import { ElMessage, ElMessageBox } from 'element-plus'

class Message {

  error = (info) => {
    return new Promise((resolve) => {
      // alert("错误：" + info);
      ElMessage.error(info)
      resolve();
    });
  };

  success = (info) => {
    return new Promise((resolve) => {
      ElMessage.suceess(info);
      resolve();
    });
  };

  confirm = ({ title, content }) => {
    return new Promise((resolve, reject) => {

      ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => resolve())
        .catch(() => reject());

    });

  };

}


export default new Message();