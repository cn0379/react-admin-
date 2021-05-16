import React from 'react'
import { Modal } from 'antd';
import { Form, Input, Col } from 'antd';
const { TextArea } = Input;

type PropsType = {
  visible: boolean,
  closeHander: () => void;
}

const CreateArticle: React.FC<PropsType> = props => {
  const [form] = Form.useForm();
  return (
    <React.Fragment >
      {/* onOk={handleOk} onCancel={handleCancel} */}
      <Modal width={'70%'} title="Basic Modal" visible={props.visible} onCancel={props.closeHander} onOk={props.closeHander}   >
        <Form
          form={form}
          labelCol={{
            span: 1
          }}
          wrapperCol={{
            span: 500
          }}
          onFinish={props.closeHander}
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