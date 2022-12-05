import React from 'react'
import { NavLink } from 'react-router-dom'
import { CateType } from '../interfaces/category';
import { useGetCategorysQuery } from '../services/category';
import { useGetProductByCateQuery } from '../services/product';

type Props = {}

const Sidebar = (props: Props) => {
    const { data: cate = [], error: err, isLoading: loading } = useGetProductByCateQuery(undefined);

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Danh mục</h3>
                    <div className="space-y-2">
                        <div className='hover:bg-red-500 rounded cursor-pointer p-1'>
                            <NavLink to={'/products'} className="flex items-center">
                                <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer ">Tất cả sản phẩm</label>
                            </NavLink>
                        </div>
                        {cate.map((item: any, index: number) => {
                            return (
                                <div className='hover:bg-red-500 rounded cursor-pointer p-1' key={index + 1}>
                                    <NavLink to={'/category/' + item.id} className="flex items-center">
                                        <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer ">{item.name}</label>
                                        <div className="ml-auto text-gray-600 text-sm cusror-pointer">({item.products.length})</div>
                                    </NavLink>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar