import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../../interfaces/product";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { useGetProductQuery, useUpdateProductMutation } from "../../../services/product";
import { useGetCategorysQuery } from "../../../services/category";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { uploadImage } from "../../../utils/upload";
import { CateType } from "../../../interfaces/category";
import ReactQuill from "react-quill";

type Props = {};

const ProductEdit = (props: Props) => {
    const [preview, setPreview] = useState<string>('');
    const [editProduct, result] = useUpdateProductMutation();
    const { id } = useParams()
    const [form] = Form.useForm()
    const { data: cate = [] as CateType[], isLoading, error } = useGetCategorysQuery(undefined)
    const { data: getProduct, isLoading: loading, error: loi } = useGetProductQuery(id as any)
    const navigate = useNavigate()
    useEffect(() => {
        form.setFieldsValue(getProduct)
        setPreview(getProduct?.image)
    }, [getProduct])

    const onSubmit: SubmitHandler<IProduct> = (data) => {
        editProduct({ ...data, image: preview });
        message.success('Sửa sản phẩm thành công')
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
            <h1 className="text-2xl py-2">Thêm sản phẩm</h1>
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
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Không được để trống mục này' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[{ required: true, message: 'Không được để trống mục này' }]}
                >
                    <InputNumber className="w-36" />
                </Form.Item>
                <Form.Item
                    label="Danh mục"
                    name="categoryId"
                    rules={[{ required: true, message: 'Không được để trống mục này' }]}
                >
                    <Select>
                        {cate.map((item: CateType, key: number) => (
                            <Select.Option key={key + 1} value={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
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

                <Form.Item
                    label="Mô tả"
                    name="desc"
                >
                    <ReactQuill className="bg-white" theme="snow" />
                </Form.Item>

                <Form.Item>
                    <Button className="bg-blue-400" htmlType="submit">
                        Sửa sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductEdit;
