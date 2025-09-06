"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import Link from "next/link";
import { Product } from "@/core/interfaces/Products";
import { CartItems } from "@/core/interfaces/CartItems";
const CartCounter = ({
  product,
  setCartItems,
  initialQuantity = 0,
}: {
  product?: Product | CartItems;
  setCartItems?: React.Dispatch<React.SetStateAction<CartItems[]>>;
  initialQuantity?: number;
} = {}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    if (!product || !setCartItems) return;

    if (quantity < (product.orderQuantityLimit || 99)) {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === product.id
        );
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          return updatedItems;
        } else {
          return [
            ...prevItems,
            {
              ...product,
              quantity: 1,
            },
          ];
        }
      });

      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!product || !setCartItems) return; // Early return if props not provided

    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      setCartItems((prevItems) => {
        if (newQuantity === 0) {
          return prevItems.filter((item) => item.id !== product.id);
        } else {
          const existingItemIndex = prevItems.findIndex(
            (item) => item.id === product.id
          );
          if (existingItemIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: newQuantity,
            };
            return updatedItems;
          }
        }
        return prevItems;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product || !setCartItems) return;

    const value = e.target.value;
    const numericValue = parseInt(value, 10);

    // Allow empty input temporarily for manual edits
    if (value === "") {
      setQuantity(0);

      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    } else if (
      !isNaN(numericValue) &&
      numericValue >= 0 &&
      numericValue <= (product.orderQuantityLimit || 99)
    ) {
      setQuantity(numericValue);

      setCartItems((prevItems) => {
        if (numericValue === 0) {
          return prevItems.filter((item) => item.id !== product.id);
        }

        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: numericValue,
          };
          return updatedItems;
        } else if (numericValue > 0) {
          return [
            ...prevItems,
            {
              ...product,
              quantity: numericValue,
            },
          ];
        }

        return prevItems;
      });
    }
  };

  return (
    <>
      <Tooltip title="minus">
        <Link
          href="#"
          className="dec d-flex justify-content-center align-items-center"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="minus"
          onClick={handleDecrement}
        >
          <i className="ti ti-minus" />
        </Link>
      </Tooltip>
      <input
        type="text"
        className="form-control text-center"
        name="qty"
        value={quantity.toString()} // Convert number to string for input
        onChange={handleChange} // Allow manual edits
      />
      <Tooltip title="plus">
        <Link
          href="#"
          className="inc d-flex justify-content-center align-items-center"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="plus"
          onClick={handleIncrement}
        >
          <i className="ti ti-plus" />
        </Link>
      </Tooltip>
    </>
  );
};
CartCounter.propTypes = {
  defaultValue: PropTypes.number,
};
export default CartCounter;
