import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { IProduct } from "../../../interfaces/product";
import { useGetProductsQuery, useRemoveProductMutation } from "../../../services/product";
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CateType } from "../../../interfaces/category";
import { useGetCategoryQuery, useGetCategorysQuery } from "../../../services/category";
import { Money } from "../../../utils/upload";
import { useGetCheckoutsQuery, useRemoveCheckoutsMutation } from "../../../services/checkout";
import { CartType } from "../../../interfaces/cart";
type Props = {}

const listOrder = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data: orders = [], isLoading, error } = useGetCheckoutsQuery(undefined)
    const [removeOrder] = useRemoveCheckoutsMutation()
    const dataTable = orders.map((item: CartType, index: number) => {
        return {
            key: index + 1,
            id: item.id,
            username: item.username,
            address: item.address,
            email: item.email,
            phone: item.phone,
            status: item.status
        }
    })

    const handleOk = (id: number) => {
        const key = 'updatable';
        setConfirmLoading(true);
        message.loading({ content: 'Loading...', key });
        removeOrder(id)
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const columns: ColumnsType<IProduct> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (order) => (
                order == '1' ? <Tag color={"geekblue"}>Chờ xác nhận</Tag>
                    : order == '2' ? <Tag color={"green"}>Đã xác nhận</Tag>
                        : <Tag color={"volcano"}>Đã hủy</Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <NavLink to={`/admin/order/${record.id}/order`} style={{ color: "white" }}><Button className="bg-green-400 text-white">Xem chi tiết</Button></NavLink>
                    <Popconfirm
                        placement="topRight"
                        title="Bạn Có Muốn Xóa?"
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => handleOk(record.id as number)}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleCancel}
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <h1 className="text-2xl py-2">Danh sách đặt hàng</h1>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    )
}

export default listOrder