import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup
  .object({
    url: yup.string().required().url(),
  })
  .required();

const customStyles = {
  content: {
    width: "30%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ModalComponent(props) {
  const { isOpen, setIsOpen, obj,onSubmit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setValue("id", obj?._id);
    setValue("url", obj?.weburl);
  }, [isOpen]);

  
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Example Modal">
      <div className="flex justify-center pt-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 ">
              URL
            </label>
            <input
              className={`shadow appearance-none border ${
                errors.email && "border-red-500"
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              type="url"
              placeholder="url"
              {...register("url")}
            />
            {errors.url && (
              <p className="text-red-500 text-xs italic">
                {errors.url?.message}
              </p>
            )}
          </div>

          <div className="space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalComponent;
