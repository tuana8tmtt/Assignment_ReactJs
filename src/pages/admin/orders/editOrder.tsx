import { Button, Form, Input, Layout, message, Select, Table } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetDetailCheckoutQuery, useUpdateCheckoutsMutation } from '../../../services/checkout';
import { Money } from '../../../utils/upload';

const { Option } = Select;
type Props = {}
const select = [
    { id: 1, status: 1, title: "Chưa xác nhận" },
    { id: 2, status: 2, title: "Đã xác nhận" },
    { id: 3, status: 3, title: "Đã hủy" }

]
const editOrder = (props: Props) => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const [editOrders] = useUpdateCheckoutsMutation()
    console.log(id);
    const { data: orders, isLoading, error } = useGetDetailCheckoutQuery(id as any)
    
    console.log(orders);
    useEffect(() => {
        form.setFieldsValue(orders)
    }, [orders])
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Hình ảnh', dataIndex: 'image', key: 'image', render: (text: string | undefined) => <img src={text} alt="" width={100} /> },
        { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
        { title: 'Số lượng', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Đơn giá', dataIndex: 'price', key: 'price', render: (text: any) => <p>{Money(text)}</p> },
        { title: 'Tổng giá', dataIndex: 'itemTotal', key: 'itemTotal', render: (text: any) => <p>{Money(text)}</p> },
    ];

    const data = orders?.cart?.order?.map((order: any, index: number) => {
        return {
            stt: index + 1,
            image: order.image,
            name: order.name,
            quantity: order.quantity,
            price: order.price,
            itemTotal: order.price * order.quantity,
        }
    })
    const navigate = useNavigate()
    const onSubmit = (data: any) => {
        try {
            editOrders({ ...orders, status: data.status });
            message.success({ content: 'Cập nhật thành công', duration: 2 });
            setTimeout(() => navigate("/admin/order"), 1000)
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 500, padding: 24 }}>
                        <Title>Chi tiết đơn hàng</Title>
                        <Table columns={columns} dataSource={data} />

                        <Form
                            form={form}
                            initialValues={{}}
                            onFinish={onSubmit}
                            autoComplete="on"
                            labelCol={{ span: 24 }}>
                            <Form.Item
                                name="username"
                                labelCol={{ span: 24 }}
                                label="Họ và tên"

                                rules={[{ required: true, message: 'Họ và tên không được trống' }, { min: 3, message: 'Ít nhất 3 ký tự' }]}
                            >
                                <Input disabled size="large" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                labelCol={{ span: 24 }}
                                label="Email"
                                rules={[{ required: true, message: 'Email không được trống' }]}
                            >
                                <Input disabled size="large" />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                labelCol={{ span: 24 }}
                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Số điện thoại không được trống' }]}
                            >
                                <Input disabled size="large" />
                            </Form.Item>
                            <Form.Item
                                name="address"
                                labelCol={{ span: 24 }}
                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Địa chỉ phẩm không được trống' }]}
                            >
                                <Input disabled size="large" />
                            </Form.Item>
                            <Form.Item name="status" label="Tình trạng đơn hàng" rules={[{ required: true, message: 'Không được để trống' }]}>
                                <Select >
                                    {select.map((item: any, key: number) => (
                                        <Select.Option key={key + 1} value={item.status}>{item.title}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default editOrder