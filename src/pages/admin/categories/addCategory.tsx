import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CateType } from '../../../interfaces/category'
import { useAddCateMutation } from '../../../services/category'
import { uploadImage } from '../../../utils/upload'

type Props = {}

const addCategory = (props: Props) => {
  const [preview, setPreview] = useState<string>('');
  const [addCate, result] = useAddCateMutation()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onSubmit = (data: CateType) => {
    addCate({ ...data, image: preview });
    message.success("Thành công")
    form.resetFields()
    setTimeout(() => {
      navigate("/admin/products")
    }, 2000)
  };
  const handlePreview = async (e: any) => {
    const imgLink = await uploadImage(e.target);
    message.loading({ content: "Đang thêm ảnh" });
    setPreview(imgLink as string);
    const imgPreview = document.getElementById("img-preview") as HTMLImageElement
    imgPreview.src = URL.createObjectURL(e.target.files[0])
  }
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

        <Form.Item name="image" valuePropName="src" label="Xem trước ảnh" >
          <img id="img-preview" style={{ width: "100px" }} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          tooltip="Ảnh dành cho Quiz"
        >
          <Input type="file" accept='.png,.jpg' className="form-control" onChange={handlePreview} />
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