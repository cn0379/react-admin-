import React from 'react'
import { Modal } from 'antd';
import { Form, Input } from 'antd';
const { TextArea } = Input;

type PropsType = {
  visible: boolean,
  closeHander: () => void;
  confirmCreate: (data: CreateAtricleType) => void;
}


type CreateAtricleType = {
  auther: string;
  content: string;
  title: string;
}

const CreateArticle: React.FC<PropsType> = props => {
  const [form] = Form.useForm();
  // 点击提交时的逻辑
  const onFinish = (v: CreateAtricleType): void => {
    props.confirmCreate(form.getFieldsValue())
  }
  return (
    <React.Fragment >
      {/* onOk={handleOk} onCancel={handleCancel} */}
      <Modal width={'70%'} title="Basic Modal" visible={props.visible} onCancel={props.closeHander} onOk={onFinish}   >
        <Form
          form={form}
          labelCol={{
            span: 1
          }}
          wrapperCol={{
            span: 500
          }}
          onFinish={onFinish}
        >
          <Form.Item label={'标题'} name={'title'} >
            <Input autoComplete={'off'} placeholder={'请输入标题'} />
          </Form.Item>
          <Form.Item label={'内容'} name={'content'} >
            <TextArea placeholder={'请输入内容'} />
          </Form.Item>
          <Form.Item label={'作者'} name={'author'} >
            <Input autoComplete={'off'} placeholder={'请输入作者'} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default CreateArticle