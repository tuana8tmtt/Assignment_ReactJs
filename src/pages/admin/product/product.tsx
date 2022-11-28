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


type Props = {};

const Product = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data: products = [] as IProduct[], error, isLoading } = useGetProductsQuery(undefined);
    const { data: cate = [] as CateType[], error: err, isLoading: loading } = useGetCategorysQuery(undefined);
    const [removeProduct, results] = useRemoveProductMutation()

    const dataTable = products.map((item: IProduct, index: number) => {
        return {
            key: index + 1,
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            desc: item.desc,
            categoryId: cate.filter((cate: CateType) => { return cate.id == item.categoryId }).reduce((result: any, item: CateType) => {
                return `${result}${item.name}`
            }, ""),
        }
    })

    const handleOk = (id: number) => {
        const key = 'updatable';
        setConfirmLoading(true);
        message.loading({ content: 'Loading...', key });
        removeProduct(id)
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
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <div><img src={text} className="w-16" alt="" /></div>,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <div>{Money(text)}</div>
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            filters: cate.map((item: CateType) => { return { text: item.name, value: item.name } }),
            onFilter: (value, record) => {
                return record.categoryId == value
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'desc',
            render: (text) => <div><p dangerouslySetInnerHTML={{ __html: `${text}` }}></p></div>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <NavLink to={`/admin/products/${record.id}/edit`} style={{ color: "white" }}><Button className="bg-green-400 text-white">Edit</Button></NavLink>
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
            <h1 className="text-2xl py-2">Danh sách sản phẩm</h1>
            <Button><Link to="/admin/products/add" className="my-6">Add Product</Link></Button>
            <Table columns={columns} dataSource={dataTable} />
        </div>
    );
};

export default Product;
