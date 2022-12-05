import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../components/Sidebar';
import { IProduct } from '../../interfaces/product';
import { useGetProductsQuery } from '../../services/product';
import { Money } from '../../utils/upload';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../app/hook';
import { message } from 'antd';
import { addToCart } from '../../slice/cartSlice';

type Props = {}

const ProductList = (props: Props) => {
    const [dataProduct, setDataProduct] = useState<any>([])

    const { data: products = [] as IProduct[], error, isLoading } = useGetProductsQuery(undefined);
    useEffect(() => {
        setDataProduct(products)
    }, [products])
    console.log(dataProduct);
    
    const {
        register,
        resetField,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<any>();
    const getPrice: SubmitHandler<any> = (data) => {
        const productPrice = products.filter((item: IProduct) => item.price >= data.min && item.price <= data.max)
        setDataProduct(productPrice)
        reset()
    }
    const dispatch = useAppDispatch();
    const addToCartProduct = (data: any) => {
        dispatch(addToCart(data))
        message.success("Thêm vào giỏ hàng thành công")
    }
    return (
        <div>
            <div>
                {/* breadcrumb */}
                <div className="container py-4 flex items-center gap-3">
                    <a href="../index.html" className="text-primary text-base">
                        <i className="fa-solid fa-house" />
                    </a>
                    <span className="text-sm text-gray-400">
                        <i className="fa-solid fa-chevron-right" />
                    </span>
                    <p className="text-gray-600 font-medium">Shop</p>
                </div>
                {/* ./breadcrumb */}
                {/* shop wrapper */}
                <div className="container grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
                    {/* sidebar */}
                    <Sidebar />
                    {/* ./sidebar */}
                    {/* products */}
                    <div className="col-span-3">
                        <div className="flex items-center mb-4">
                            <select name="sort" id="sort" className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                                <option >Default sorting</option>
                                <option value="price-low-to-high">Price low to high</option>
                                <option value="price-high-to-low">Price high to low</option>
                                <option value="latest">Latest product</option>
                            </select>
                            <div className="flex gap-2 ml-auto">
                                <div>
                                    <h3 className="text-sm text-gray-800 uppercase font-medium">Tìm theo giá</h3>
                                    <form action="" onSubmit={handleSubmit(getPrice)}>
                                        <div className="mt-4 flex items-center">
                                            <input type="text" {...register("min")} id="min" className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm" placeholder="min" />
                                            <span className="mx-3 text-gray-500">-</span>
                                            <input type="text" {...register("max")} id="max" className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm" placeholder="max" />
                                            <button className='rounded bg-red-500 px-2 py-2 text-white ml-3' type='submit'>Tìm</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            {dataProduct.map((item: IProduct, index: number) => {
                                return (
                                    <div className="bg-white shadow rounded overflow-hidden group" key={index + 1}>
                                        <div className="relative">
                                            <div>
                                                <img src={item.image} alt="product 1" className="w-full" />
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                    justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                                <NavLink to={`/products/${item.id}`} className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                                    <i className="fa-solid fa-magnifying-glass" />
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="pt-4 pb-3 px-4">
                                            <NavLink to={`/products/${item.id}`}>
                                                <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{item.name}</h4>
                                            </NavLink>
                                            <div className="flex items-baseline mb-1 space-x-2">
                                                <p className="text-xl text-primary font-semibold">{Money(item.price)}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="flex gap-1 text-sm text-yellow-400">
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                    <span><i className="fa-solid fa-star" /></span>
                                                </div>
                                                <div className="text-xs text-gray-500 ml-3">(150)</div>
                                            </div>
                                        </div>
                                        <button onClick={() => addToCartProduct(item)} className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                                            Thêm sản phẩm</button>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    {/* ./products */}
                </div>
                {/* ./shop wrapper */}
            </div>
        </div>
    )
}

export default ProductList