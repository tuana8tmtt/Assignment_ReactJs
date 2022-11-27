import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CateType } from '../../../interfaces/category'
import { useGetCategoryQuery, useUpdateCateMutation } from '../../../services/category'

type Props = {}

const editCategory = (props: Props) => {
  const { id } = useParams()
  const { data: getCate, isLoading, error } = useGetCategoryQuery(id)
  const [editCate, result] = useUpdateCateMutation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  useEffect(() => {
    form.setFieldsValue(getCate)
  },[getCate])
  
  const onSubmit = (data: CateType) => {
    editCate(data);
    message.success("Thành công")
    setTimeout(() => {
      navigate('/admin/category')
    },2000)
  };
  return (
    <div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item name="id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: 'Không được để trống mục này' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sửa danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default editCategory