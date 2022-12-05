import { message, Modal } from 'antd';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../services/auth';
import { AuthType } from '../../interfaces/auth';
import { colors } from '../../utils/color';
type Props = {}
const schema = yup.object({
    email: yup.string().email("Vui lòng nhập đúng định dạng email").required("Không được để trống"),
    password: yup.string().required("Không được để trống").min(5, "Nhập ít nhất 5 ký tự"),
}).required();
const Signin = (props: Props) => {
    const [signIn, result] = useSignInMutation()
    const {
        register,
        resetField,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AuthType>({ resolver: yupResolver(schema) });
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<AuthType> = async (data: AuthType) => {
        try {
            signIn(data)
                .unwrap()
                .then((response) => localStorage.setItem("user", JSON.stringify(response)))

            reset()
            message.success("Đăng nhập thành công")
            setTimeout(() => {
                navigate("/")
            }, 1000)

        } catch (error) {
            alert(error)
        }

    }

    return (
        <div>
            {/* login */}
            <div className="contain py-16">
                <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
                    <h2 className="text-2xl uppercase font-medium mb-1">Đăng nhập</h2>
                    <p className="text-gray-600 mb-6 text-sm">
                        Chào mừng trở lại
                    </p>
                    <form action="#" method="post" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="email" className="text-gray-600 mb-2 block">Email</label>
                                <input type="email" {...register('email')} id="email" className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400" placeholder="youremail.@domain.com" />
                                <p className='text-red-500 text-sm'>{errors.email?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="password" className="text-gray-600 mb-2 block">Mật khẩu</label>
                                <input type="password" {...register('password')} id="password" className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400" placeholder="*******" />
                                <p className='text-red-500 text-sm'>{errors.password?.message}</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button type="submit" className="block w-full py-2 text-center text-black bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">Đăng nhập</button>
                        </div>
                    </form>
                    {/* login with */}
                    {/* <div className="mt-6 flex justify-center relative">
                        <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or login with</div>
                        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                        <a href="#" className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
                    </div> */}
                    {/* ./login with */}
                    <p className="mt-4 text-center text-gray-600">Chưa có tài khoản? <NavLink to="/signup" className="text-primary">Đăng ký
                        ngay</NavLink></p>
                </div>
            </div>
            {/* ./login */}

        </div>
    )
}

export default Signin