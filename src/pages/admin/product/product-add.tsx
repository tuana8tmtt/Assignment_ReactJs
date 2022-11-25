import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { IProduct } from "../../../interfaces/product";
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hook";
import { useAddProductMutation } from "../../../services/product";
import { Button, Form, Input } from "antd";

type Props = {};

const ProductAdd = (props: Props) => {
    const [addProduct, result] = useAddProductMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IProduct>();
    const onSubmit: SubmitHandler<IProduct> = (data) => {
        //
        addProduct(data);
    };

    return (
        <div>
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
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAdd;
