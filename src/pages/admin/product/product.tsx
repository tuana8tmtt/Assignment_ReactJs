import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { IProduct } from "../../../interfaces/product";
import { useGetProductsQuery } from "../../../services/product";
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';


type Props = {};

const Product = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data: products = [] as IProduct[], error, isLoading } = useGetProductsQuery(undefined);
    const dataTable = products.map((item: IProduct, index: number) => {
        return {
            key: index + 1,
            id: item.id,
            name: item.name,
            price: item.price
        }
    })

    const handleOk = (id:number) => {
        const key = 'updatable';
        setConfirmLoading(true);
        message.loading({ content: 'Loading...', key });
        
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
            title: 'Product',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary"><NavLink to={`/admin/product/${record.id}/edit`} style={{ color: "white" }}>Edit</NavLink></Button>
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
            <Link to="/admin/products/add">Add</Link>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    );
};

export default Product;
