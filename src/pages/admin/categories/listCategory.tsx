import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, message, Popconfirm, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CateType } from "../../../interfaces/category";
import { useGetCategorysQuery, useRemoveCateMutation } from "../../../services/category";
type Props = {}

const listCategory = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: categories = [] as CateType[], error, isLoading } = useGetCategorysQuery(undefined);
  const [removeCate, results] = useRemoveCateMutation()
  const dataTable = categories.map((item: CateType, index: number) => {
    return {
      key: index + 1,
      id: item.id,
      name: item.name,
      image: item.image
    }
  })

  const handleOk = (id: number) => {
    const key = 'updatable';
    setConfirmLoading(true);
    message.loading({ content: 'Loading...', key });
    removeCate(id)
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const columns: ColumnsType<CateType> = [
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
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <div>{text}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/admin/category/${record.id}/edit`} style={{ color: "white" }}><Button type="primary">Edit</Button></NavLink>
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
      <h1 className="text-2xl py-2">Danh sách danh mục</h1>
      <Button><Link to="/admin/category/add" className="my-6">Add Category</Link></Button>
      <Table columns={columns} dataSource={dataTable} />
    </div>
  )
}

export default listCategory