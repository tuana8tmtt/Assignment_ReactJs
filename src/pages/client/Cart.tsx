import { message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { IProduct } from "../../interfaces/product";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAll,
} from "../../slice/cartSlice";
import { cartTotalPriceSelector } from "../../slice/selector";
import { Money } from "../../utils/upload";

type Props = {};

const Cart = (props: Props) => {
  const { cart } = useAppSelector((state: any) => state.cart);
  console.log(cart);
  const dispatch = useAppDispatch();
  const totalPrice = cart.reduce(
    (total: any, current: any) => (total += current.price * current.quantity),
    0
  );
  const DeleteItem = (id: number) => {
    dispatch(removeItem(id));
    message.success("Xóa thành công");
  };
  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Sản phẩm</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Chi tiết sản phẩm
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Số lượng
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Giá
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                Tổng cộng
              </h3>
            </div>
            {cart?.map((item: IProduct) => (
              <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  {" "}
                  {/* product */}
                  <div className="w-20">
                    <img className="h-24" src={item.image} />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <span className="font-bold text-sm">{item.name}</span>
                    <button
                      onClick={() => DeleteItem(item.id as number)}
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-1/5">
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                  <input
                    className="mx-2 border text-center w-12 "
                    type="text"
                    value={item.quantity}
                  />
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>
                    <svg
                      className="fill-current text-gray-600 w-3"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </button>
                </div>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {Money(item.price)}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  {Money(item.price * item.quantity)}
                </span>
              </div>
            ))}

            <NavLink
              to="/products"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Quay lại trang SP
            </NavLink>
            {/* <button onClick={() => dispatch(removeAll(cart))}>Xóa all</button> */}
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Sản phẩm đã chọn
            </h1>
            {cart?.map((item: any) => (
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  {item.name}
                </span>
                <span className="font-semibold text-sm">
                  {Money(item.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Tổng cộng</span>
                <span>{Money(totalPrice)}</span>
              </div>
              <NavLink to={"/checkout"}>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                  Checkout
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
