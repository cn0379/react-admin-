import React,{useEffect, useState} from 'react';
import {message, Upload} from 'antd';
// 引入富文本依赖
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
// 根据提示找到文件类型的位置 手动引入
import type { UploadFile } from 'antd/lib/upload/interface';
import type {EditorState,ControlType,ExtendControlType} from 'braft-editor/index';
import {getToken} from '@/utils/myAuth';
import {debounce} from 'lodash';
// 因为无法直接import 使用require引入
const {ContentUtils} = require('braft-utils');

/**
 * 整体思路: 
  1. 当前组件为受控组件
  2. 外部可以通过value初始化组件内容
  3. 内部可以通过onChange反馈最新值给外部
  4. 外部可以自定义插入图片的上传地址
  5. 富文本功能组件支持默认和自定义
  6. 扩展组件支持默认和自定义
*/
export type PropsT = {
  value?: string;
  onChange?: (v: string) => void;
  uploadAction?: string;
  controls?: ControlType[]; 
  extendControls?: ExtendControlType[];
}
const CommonBraftEditor: React.FC<PropsT> = props =>{
  const {value,uploadAction,onChange,controls:outControls,extendControls:outExtendControls} = props;
   // 给富文本添加关联值
   const [editorState,setEditorState] = useState<EditorState>(null);
  
  const controls  = outControls|| ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator','media'];

  const uploadCom: ExtendControlType = {
    key: 'antd-uploader',
    type: 'component',
    component: (
      <Upload
        action={uploadAction}
        accept="image/*"
        headers={{
          token: getToken() || '',
        }}
        showUploadList={false}
        onChange={({ file, fileList: files }: { file: UploadFile; fileList: UploadFile[] }) => {
          // clone数组,然后只需要一个
          let nowFiles = [...files];
          nowFiles = nowFiles.slice(-1);
          const { status, response } = file;
          if (status === 'done') {
            // 获取上传成功的回调结果
            const { success, data, message: err } = response;
            if (success) {
              message.success(`${file.name} 上传成功!`);
              // 避免因直接修改实参造成的报错
              if (nowFiles.length > 0) {
                nowFiles[0].url = data.fileUrl;
                setEditorState(
                  ContentUtils.insertMedias(editorState, [{
                    type: 'IMAGE',
                    url: data.fileUrl
                  }])
                )
              }
            } else {
              message.error(err);
            }
          } else if (status === 'error') {
            message.error(`${file.name} file upload failed.`);
          }
           
        }}
      >
        {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
        <button type="button" className="control-item button upload-button" data-title="插入图片">
          上传图片
        </button>
      </Upload>
    )
  }
  const extendControls: ExtendControlType[] = [];
  if(uploadAction){
    extendControls.push(uploadCom);
  }
  if(outExtendControls){
    extendControls.concat(outExtendControls);
  }
  /**
   *
   * @param v
   */
   const handleEditorChange = (v: EditorState) => {
    const contentValue = v.toHTML();
    onChange?.(contentValue);
  };


  useEffect(()=>{
    setEditorState(BraftEditor.createEditorState(value));
  },[value])
  return (
    <BraftEditor
          style={{ border: '1px solid #e5e5e5' }}
          value={editorState}
          onChange={debounce(handleEditorChange, 500)}
          onSave={debounce(handleEditorChange, 500)}
          controls={controls}
          extendControls={extendControls}
        />
  )
}

export default CommonBraftEditor;