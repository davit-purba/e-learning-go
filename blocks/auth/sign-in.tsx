"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CaptchaInput from "@/components/captcha-input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@mui/material";

type Inputs = {
    username: string;
    password: string;
    captcha: string;
};

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!data.captcha) {
            alert("Captcha wajib diisi");
            return;
        }

        const res = await signIn("credentials", {
            redirect: false,
            username: data.username,
            password: data.password,
            redirectTo: `/dashboard/home`
        });

        if (res?.error) {
            alert("Login gagal");
            return;
        }
        router.push(res.url || '/')
    };

    return (
       <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg_login">
            <div className="mb-3">
                <Image src="/images/thy.jpg" width={70} height={70} alt="" />
            </div>

            <div className="bg-white w-full max-w-md shadow-md p-7">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <h1 className="text-xl font-semibold text-center">Login</h1>

                    <input
                        placeholder="Username"
                        {...register("username", { required: "Username wajib diisi" })}
                        className="input w-full"
                    />
                    {errors.username && (
                        <span className="text-red-500 text-sm">
                            {errors.username.message}
                        </span>
                    )}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password", { required: "Password wajib diisi" })}
                            className="input w-full pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                        </button>
                                            {errors.password && (
                        <span className="text-red-500 text-sm">
                            {errors.password.message}
                        </span>
                    )}
                    </div>

                    <CaptchaInput register={register} errors={errors} />

                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}
