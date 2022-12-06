import { message } from 'antd';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Money } from '../../utils/upload';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { AuthType } from '../../interfaces/auth';
import { CartType } from '../../interfaces/cart';
import { useAddCheckoutsMutation } from '../../services/checkout';
import { removeAll } from '../../slice/cartSlice';

type Props = {}
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const schema = yup.object({
    email: yup.string().email("Vui lòng nhập đúng định dạng email").required("Không được để trống"),
    address: yup.string().required("Không được để trống").min(5, "Nhập ít nhất 5 ký tự"),
    username: yup.string().required("Không được để trống").min(5, "Nhập ít nhất 5 ký tự"),
    phone: yup.string().required("Không được để trống").matches(phoneRegExp, 'Số điện thoại không hợp lệ')
}).required();
const CheckOut = (props: Props) => {
    const { cart } = useAppSelector((state: any) => state.cart);
    const dispatch = useAppDispatch();
    const totalPrice = cart.reduce((total: any, current: any) => (total += current.price * current.quantity), 0)
    const [addCheckout] = useAddCheckoutsMutation()
    const {
        register,
        resetField,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CartType>({ resolver: yupResolver(schema) });
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            addCheckout({
                ...data,
                cart: {
                    order: cart,
                    totalPrice
                },
                status: 1
            })
            reset()
            dispatch(removeAll(cart))
            message.success("Đặt hàng thành công")
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <div>
                {/* breadcrumb */}
                <div className="container py-4 flex items-center gap-3">
                    <NavLink to="/" className="text-primary text-base">
                        <i className="fa-solid fa-house" />
                    </NavLink>
                    <span className="text-sm text-gray-400">
                        <i className="fa-solid fa-chevron-right" />
                    </span>
                    <p className="text-gray-600 font-medium">Thanh toán</p>
                </div>
                {/* ./breadcrumb */}
                {/* wrapper */}
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                        <div className="col-span-8 border border-gray-200 p-4 rounded">
                            <h3 className="text-lg font-medium capitalize mb-4">Thanh toán</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="company" className="text-gray-600">Họ và tên</label>
                                    <input type="text" {...register('username')} id="company" className="input-box" />
                                    <p className='text-red-500 text-sm'>{errors.username?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="region" className="text-gray-600">Địa chỉ</label>
                                    <input type="text" {...register('address')} id="region" className="input-box" />
                                    <p className='text-red-500 text-sm'>{errors.address?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="text-gray-600">Điện thoại</label>
                                    <input type="text" {...register('phone')} id="phone" className="input-box" />
                                    <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-gray-600">Email</label>
                                    <input type="email" {...register('email')} id="email" className="input-box" />
                                    <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 border border-gray-200 p-4 rounded">
                            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                            <div className="space-y-2">
                                {cart.map((item: any, index: number) => (
                                    <div className="flex justify-between" key={index + 1}>
                                        <div>
                                            <h5 className="text-gray-800 font-medium">{item.name}</h5>
                                        </div>
                                        <p className="text-gray-600">
                                            x{item.quantity}
                                        </p>
                                        <p className="text-gray-800 font-medium">{Money(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                                <p className="font-semibold">Tổng tiền</p>
                                <p>{Money(totalPrice)}</p>
                            </div>
                            <button type='submit' className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                                Đặt hàng</button>
                        </div>
                    </div>
                </form>
                {/* ./wrapper */}
            </div>

        </div >
    )
}

export default CheckOut