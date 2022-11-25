import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    UnorderedListOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}
type Props = {};

const LayoutAdmin = (props: Props) => {
    const items: MenuItem[] = [
        getItem(<NavLink to={"/admin"}>Dashboard</NavLink>, '1', <PieChartOutlined />),
        getItem(<NavLink to={"/admin/category"}>Category</NavLink>, '4', <UnorderedListOutlined />),
        getItem(<NavLink to={"/admin/products"}>Product</NavLink>, '2', <DesktopOutlined />),
        getItem(<NavLink to={"/admin/user"}>User</NavLink>, '3', <ContainerOutlined />),
    ];
    return (
        <Layout style={{height: '100vh'}}>
            <Header className="header">
                <div className="logo" />
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={items}
                        
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;
