import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../../interfaces/product";
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hook";
import { useAddProductMutation } from "../../../services/product";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useGetCategorysQuery } from "../../../services/category";
import { CateType } from "../../../interfaces/category";
import { Option } from "antd/es/mentions";
import { uploadImage } from "../../../utils/upload";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type Props = {};

const ProductAdd = (props: Props) => {
    const [preview, setPreview] = useState<string>('');
    const [addProduct, result] = useAddProductMutation();
    const { data: cate = [] as CateType[], isLoading, error } = useGetCategorysQuery(undefined)
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<IProduct> = (data) => {
        addProduct({...data, image:preview});
        message.success('Thêm sản phẩm thành công')
        setTimeout(() => {
            navigate("/admin/products")
        },2000)
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
            >
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
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAdd;
