import { Avatar, Dropdown, Menu, message, Modal } from 'antd';
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CateType } from '../interfaces/category';
import { useGetCategorysQuery } from '../services/category';
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../app/hook';

type Props = {}

const Header = (props: Props) => {
    const { data: cate = [] as CateType[], error: err, isLoading: loading } = useGetCategorysQuery(undefined);
    const auth = JSON.parse(localStorage.getItem("user") as string);
    const navigate = useNavigate()
    const { cart } = useAppSelector((state: any) => state.cart);
    const onLogout = () => {
        Modal.confirm({
            title: "Bạn có chắc muốn đăng xuất không ?",
            onOk: () => {
                localStorage.removeItem("user")
                message.success("Đăng xuất thành công")
                navigate('/')
            }
        })
    }
    const menu = (
        <Menu>
            <Menu.Item>
                {auth &&
                    <span>Xin chào: {auth.user.username}</span>
                }
            </Menu.Item>
            {
                auth && auth.user.role === "admin" &&
                <Menu.Item>
                    <Link to="/admin" className='text-white my-auto'>
                        Admin
                    </Link>
                </Menu.Item>
            }
            <Menu.Item danger={true}>
                <span onClick={onLogout}>
                    Đăng xuất
                </span>
            </Menu.Item>

        </Menu>
    );
    return (
        <div>
            <header className="py-4 shadow-sm bg-white">
                <div className="container flex items-center justify-between">
                    <NavLink to="/">
                        <img src="../assets/images/logo.svg" alt="Logo" className="w-32" />
                    </NavLink>
                    <div className="w-full max-w-xl relative flex">
                        <span className="absolute left-4 top-3 text-lg text-gray-400">
                            <i className="fa-solid fa-magnifying-glass" />
                        </span>
                        <input type="text" name="search" id="search" className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none" placeholder="search" />
                        <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition">Search</button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <NavLink to="/cart" className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <i className="fa-solid fa-bag-shopping" />
                            </div>
                            <div className="text-xs leading-3">Cart</div>
                            <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                                {cart.length}</div>
                        </NavLink>
                    </div>
                </div>
            </header>
            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
                        <span className="text-white">
                            <i className="fa-solid fa-bars" />
                        </span>
                        <span className="capitalize ml-2 text-white">Tất cả danh mục</span>
                        {/* dropdown */}
                        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            {cate.map((item: CateType, index: number) => {
                                return (
                                    <NavLink to={'category/' + item.id} className="flex items-center px-6 py-3 hover:bg-gray-100 transition" key={index + 1}>
                                        <img src={item.image} alt="terrace" className="w-10 h-10 object-contain" />
                                        <span className="ml-6 text-gray-600 text-sm">{item.name}</span>
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex items-center justify-between flex-grow pl-12">
                        <div className="flex items-center space-x-6 capitalize">
                            <NavLink to="/" className="text-gray-200 hover:text-white transition">Trang chủ</NavLink>
                            <NavLink to="/products" className="text-gray-200 hover:text-white transition">Sản phẩm</NavLink>
                            <NavLink to="#" className="text-gray-200 hover:text-white transition">Về chúng tôi</NavLink>
                            <NavLink to="#" className="text-gray-200 hover:text-white transition">Liên hệ</NavLink>
                        </div>
                        {auth ?
                            <div>
                                <Dropdown overlay={menu} trigger={["click"]}>
                                    <img
                                        src={auth.user.image}
                                        className="text-sm w-10 h-10 text-white rounded-full cursor-pointer"
                                        alt=""
                                    />
                                </Dropdown>
                            </div> :
                            <NavLink to="/signin" className="text-gray-200 hover:text-white transition">Đăng nhập</NavLink>
                        }
                    </div>
                </div>
            </nav>
        </div>

    )
}

export default Header