"use client";

import React from "react";
import { useModal } from "@/hooks/use-modal-store";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
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
import { useToast } from "../ui/use-toast";
import toast from "react-hot-toast";

type Props = { open?: boolean };

const RegisterModal = ({ open }: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();

  const isModalOpen = (type === "register" && isOpen) || open;

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      // await axios.post(`/api/register`, data);
      console.log(data);
      router.refresh();
      form.reset();
      toast.success("Account has been created!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john doe" {...field} />
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
              Submit
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
                onOpen("login");
              }}
              size={"sm"}
            >
              Log in with existing account.
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
