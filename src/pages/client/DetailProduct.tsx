import { message } from 'antd'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook'
import { IProduct } from '../../interfaces/product'
import { useGetProductQuery, useGetProductsQuery } from '../../services/product'
import {
    addToCart,
    incrementQuantity,
    decrementQuantity,
} from '../../slice/cartSlice'
import { Money } from '../../utils/upload'

type Props = {}

const DetailProduct = (props: Props) => {
    const { id } = useParams()
    const { cart } = useAppSelector((state: any) => state.cart);
    const { data: product, isLoading, error } = useGetProductQuery(id as any)
    const { data: products = [] as IProduct[], error: err, isLoading: loading } = useGetProductsQuery(undefined);
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
                    <p className="text-gray-600 font-medium">Product</p>
                </div>
                {/* ./breadcrumb */}
                {/* product-detail */}
                <div className="container grid grid-cols-2 gap-6">
                    <div>
                        <img src={product?.image} alt="product" className="w-full" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-medium uppercase mb-2">{product?.name}</h2>
                        <div className="flex items-center mb-4">
                            <div className="flex gap-1 text-sm text-yellow-400">
                                <span><i className="fa-solid fa-star" /></span>
                                <span><i className="fa-solid fa-star" /></span>
                                <span><i className="fa-solid fa-star" /></span>
                                <span><i className="fa-solid fa-star" /></span>
                                <span><i className="fa-solid fa-star" /></span>
                            </div>
                            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
                        </div>
                        {/* <div className="space-y-2">
                            <p className="text-gray-800 font-semibold space-x-2">
                                <span>Availability: </span>
                                <span className="text-green-600">In Stock</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Brand: </span>
                                <span className="text-gray-600">Apex</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">Category: </span>
                                <span className="text-gray-600">Sofa</span>
                            </p>
                            <p className="space-x-2">
                                <span className="text-gray-800 font-semibold">SKU: </span>
                                <span className="text-gray-600">BE45VGRT</span>
                            </p>
                        </div> */}
                        <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                            <p className="text-xl text-primary font-semibold">{Money(product?.price)}</p>
                        </div>
                        <p className="mt-4 text-gray-600" dangerouslySetInnerHTML={{ __html: `${product?.desc}` }}></p>
                        {/* <div className="mt-4">
                            <h3 className="text-sm text-gray-800 uppercase mb-1">Số lượng</h3>
                            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                                <button onClick={() => dispatch(incrementQuantity(product.id))} className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">-</button>
                                <div className="h-8 w-8 text-base flex items-center justify-center">0</div>
                                <button onClick={() => dispatch(decrementQuantity(product.id))} className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">+</button>
                            </div>
                        </div> */}
                        <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                            <button onClick={() => addToCartProduct(product)} className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                                <i className="fa-solid fa-bag-shopping" /> Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                <i className="fa-brands fa-facebook-f" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                <i className="fa-brands fa-twitter" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center">
                                <i className="fa-brands fa-instagram" />
                            </a>
                        </div>
                    </div>
                </div>
                {/* ./product-detail */}
                {/* description */}
                <div className="container pb-16">
                    <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">Chi tiết sản phẩm</h3>
                    <div className="w-3/5 pt-6">
                        <div className="text-gray-600">
                            <p dangerouslySetInnerHTML={{ __html: `${product?.desc}` }}></p>

                        </div>

                    </div>
                </div>
                {/* ./description */}
                {/* related product */}
                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">Sản phẩm tương tự</h2>
                    <div className="grid grid-cols-4 gap-6">
                        {products.map((item: IProduct, index: number) => {
                            return (
                                <div className="bg-white shadow rounded overflow-hidden group" key={index}>
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
                                    <NavLink to={`/products/${item.id}`} className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                                        Thêm sản phẩm</NavLink>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* ./related product */}
            </div>

        </div>
    )
}

export default DetailProduct