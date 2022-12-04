import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CateType } from '../../../interfaces/category'
import { useGetCategoryQuery, useUpdateCateMutation } from '../../../services/category'
import { uploadImage } from '../../../utils/upload'

type Props = {}

const editCategory = (props: Props) => {
  const [preview, setPreview] = useState<string>('');
  const { id } = useParams()
  const { data: getCate, isLoading, error } = useGetCategoryQuery(id)
  const [editCate, result] = useUpdateCateMutation()
  const [form] = Form.useForm()
  const navigate = useNavigate()
  useEffect(() => {
    form.setFieldsValue(getCate)
  }, [getCate])

  const onSubmit = (data: CateType) => {
    editCate({...data, image:preview});
    message.success("Thành công")
    setTimeout(() => {
      navigate('/admin/category')
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
      <h1 className="text-2xl py-2">Sửa danh mục</h1>
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
        <Form.Item name="image" valuePropName="src" label="Xem trước ảnh" >
          <img id="img-preview" style={{ width: "150px" }} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          tooltip="Ảnh dành cho Quiz"
        >
          <Input type="file" accept='.png,.jpg' className="form-control" onChange={handlePreview} />
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