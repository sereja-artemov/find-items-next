"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import sendForm from "../../lib/sendForm";

export default function ContactForm({ setIsSendGiftPopup, onClosePopups }) {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({ mode: "onChange" });

  // console.log(watch("email")) // watch input value by passing the name of it

  async function formSubmitHandler(event) {
    // event.preventDefault();
    if (isLoading) {
      return;
    }

    const res = await sendForm();
    setIsLoading(true);

    function returnPromiseError() {
      return Promise.reject(new Error("Ошибка. Что-то пошло не так..."));
    }

    try {
      setIsLoading(false);
      if (res.ok) {
        onClosePopups();
        setIsSendGiftPopup(true);
        // setSuccessMessage("Спасибо! Форма отправлена успешно.");
      } else {
        returnPromiseError().catch((error) => {
          setIsLoading(false);
          setSuccessMessage("Ой, что-то сломалось...");
          console.error(error);
        });
      }
    } catch (error) {
      return error;
    }
  }

  const isEmailDomainInBlacklist = (email) => {
    const blacklist = ["google.com", "google.ru", "gmail.ru"];
    const [, domain] = email.split("@");

    return blacklist.includes(domain);
  };

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="flex flex-col w-full"
      method="post"
      noValidate
    >
      <label className="relative top-[1.2em] z-0 mb-6 pb-6 font-medium text-[#a1a1a1] transition-all duration-200 ease-in-out">
        <input
          {...register("email", {
            required: "Введите email адрес",
            pattern: {
              value:
                /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "Это не email адрес",
            },
            validate: (value) =>
              !isEmailDomainInBlacklist(value) ||
              `Может вы имели в виду ${value.replace(value.split("@")[1], `gmail.com`)}?`,
          })}
          aria-invalid={errors.email ? "true" : "false"}
          className="w-full rounded-[12px] border-2 border-[#b3b3b3] bg-[#252525] p-4 text-inherit shadow-[inset_0_0_24px_rgba(0,0,0,.3)] shadow-inner"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        ></input>

        {errors.email && (
          <p
            role="alert"
            className="absolute bottom-0 left-0 text-sm text-red-600"
          >
            {errors.email.message}
          </p>
        )}
      </label>
      <p className="mb-5 text-center">{successMessage}</p>
      <div className="mx-auto inline-flex w-full max-w-[456px] rounded-full border-4 border-[#2b8c97] p-1 text-white shadow-[inset_0_0_0_2px_#dfbbd4] transition-colors duration-150 ease-in-out">
      <div className={`${(!isValid || isSubmitting) && "grayscale"} w-full max-w-none overflow-hidden rounded-full bg-gradient-to-br from-[#ff9afc] to-[#ee40a8] bg-cover bg-center bg-no-repeat p-1.5`}>
        <button
          type="submit"
          disabled={!isDirty || !isValid}
          className={`${(!isValid || isSubmitting) && "grayscale"} text-20 text-none leading-7.5 h-15 font-montserrat text-shadow-lg m-0 inline-flex w-full max-w-[440px] flex-row items-center justify-center overflow-hidden whitespace-nowrap rounded-full border-0 !bg-[url('/img/game/btn-bg.png')] bg-gradient-to-r from-[#ff9afc] to-[#ee40a8] bg-cover bg-center bg-no-repeat px-6 py-2.5 text-center align-top font-bold text-white transition-colors duration-150 ease-in-out`}
        >
          {isSubmitting ? "Отправляем email ..." : "Отправить"}
        </button>
      </div>
      </div>
    </form>
  );
}
