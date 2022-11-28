import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { CateType } from '../../../interfaces/category'
import { useAddCateMutation } from '../../../services/category'

type Props = {}

const addCategory = (props: Props) => {
  const [addCate, result] = useAddCateMutation()
  const [form] = Form.useForm()

  const onSubmit = (data: CateType) => {
    addCate(data);
    message.success("Thành công")
    form.resetFields()
  };
  return (
    <div>
      <h1 className="text-2xl py-2">Thêm Danh Mục</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Không được để trống mục này' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default addCategory