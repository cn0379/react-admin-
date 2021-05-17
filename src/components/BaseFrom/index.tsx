import React from 'react'
import { Form, Input, Button, Row, Col, Select, DatePicker, Space } from 'antd';
const { Option } = Select;

type selectData = {
  name: string,
  id: string,
  key_id: string,
  key_name: string,
}

type fromDataType = {
  id?: string;
  title: string;
  colLayout: number,
  placeholder: string,
  name: string,
  type: string,
  width?: number,
  selectData?: selectData[],
  picker?: string,
  vertical?: string
}

type SearchType = {
  auther: string;
  title: string;
  info: string;
}

type FormPropsType = {
  formData: fromDataType[]
  getSearchData: any,
}

const BaseFrom: React.FC<FormPropsType> = (props) => {

  const { formData } = props
  const [form] = Form.useForm();
  
  // 默认宽度
  const defaultWidth: number = 300
  // 重置
  const onReset = () => {
    form.resetFields();
  }

  // 点击提交时的逻辑
  const onFinish = (v: SearchType): void => {
    props.getSearchData(v)
  }
  // 下拉的值
  const handleChange = (v: string): void => {
  }
  // 当type 和 shouldType 一样时才会显示
  const isShow = (type: string, shouldType: string): { display: string } => {
    if (type === shouldType) {
      return { display: 'block' }
    } else {
      return { display: 'none' }
    }
  }
  return (
    <div>
      <Form
        form={form}
        labelCol={{
          span: 4
        }}
        wrapperCol={{
          span: 20
        }}
        onFinish={onFinish}
      >
        <Row gutter={[30, 30]} style={{ width: '100%' }}>
          {
            formData.map(ele => {
              return (
                <React.Fragment key={ele.id} >
                  <Col style={isShow(ele.type, 'input')} span={ele.colLayout}  >
                    <Form.Item label={ele.title} name={ele.name} >
                      <Input autoComplete={'off'} placeholder={ele.placeholder} />
                    </Form.Item>
                  </Col>
                  <Col style={isShow(ele.type, 'select')} span={ele.colLayout} >
                    <Form.Item label={ele.title} name={ele.name} >
                      <Select value={undefined} placeholder={ele.placeholder} style={{ width: ele.width ?? defaultWidth }} onChange={handleChange}>
                        {
                          ele.selectData?.map(item => {
                            return (
                              <Option key={item[item.key_id]} value={item[item.key_id]}>{item[item.key_name]}</Option>
                            )
                          })
                        }
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col style={isShow(ele.type, 'date')} span={ele.colLayout} >
                    <Form.Item label={ele.title} name={ele.name} >
                      <Space direction={ele.vertical} >
                        <DatePicker picker={ele.picker} style={{ width: ele.width ?? defaultWidth }} />
                      </Space>
                    </Form.Item>
                  </Col>
                </React.Fragment>
              )
            })
          }
          <Col span={6} offset={0} >
            <Form.Item>
              <Button type="ghost" onClick={onReset} >重置</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '20px' }}>
                查询
               </Button>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </div>
  )
}

export default BaseFrom