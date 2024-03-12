"use client";

import React from "react";
import { useModal } from "@/hooks/use-modal-store";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

const LoginModal = ({}: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();

  const isModalOpen = type === "login" && isOpen;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    try {
      // await axios.post(`/api/login`, data);
      console.log(data);
      router.refresh();
      form.reset();
      toast.success("Welcome to Airbnb");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="pb-2">
        <div className="flex flex-col items-center justify-center">
          <DialogHeader>
            <Image
              alt="logo"
              className="hidden md:block cursor-pointer w-auto h-auto"
              height={100}
              width={100}
              src={`/images/logo.png`}
              priority={true}
            />
          </DialogHeader>
          <DialogDescription>Welcome</DialogDescription>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="username@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={`destructive`} className="w-full" type="submit">
              Log In
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <div className="flex flex-col w-full">
            <div className="flex w-full gap-x-4">
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center"
              >
                <FcGoogle size={18} />
                <p className="m-auto">Continue with Google</p>
              </Button>
              <Button
                variant={"outline"}
                className="w-full flex items-center justify-center"
              >
                <AiFillGithub size={18} />
                <p className="m-auto">Continue with Github</p>
              </Button>
            </div>
            <Button
              variant={"link"}
              onClick={() => {
                onClose();
                onOpen("register");
              }}
              size={"sm"}
            >
              Create a new account
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
