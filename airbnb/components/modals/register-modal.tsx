// Importing necessary dependencies and components
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
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

// Defining type for the props
type Props = {};

// Creating RegisterModal component
const RegisterModal = ({}: Props) => {
  // Using the useModal hook to manage modal state
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();

  // Checking if the modal should be open
  const isModalOpen = type === "register" && isOpen;

  // Initializing form with form validation schema
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  // Checking if form is currently submitting
  const isLoading = form.formState.isSubmitting;

  // Function to handle form submission
  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    try {
      // Making POST request to register user
      await axios.post(`/api/register`, data).then(() => {
        signIn("credentials", { redirect: true, ...data });
      });
      router.refresh();
      form.reset();
      // Displaying success message using toast
      toast.success("Account has been created!");
      onClose();
    } catch (error: any) {
      console.log(error);
      // Displaying error message using toast
      toast.error(`${error.response.data}`);
    }
  };

  // Rendering the RegisterModal component
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-360px flex max-h-[1/4] w-[400px] flex-col items-center justify-center gap-y-4 px-4 pb-2">
        <div className="flex flex-col items-center justify-center">
          <DialogHeader>
            <Image
              alt="logo"
              className="h-auto w-auto cursor-pointer"
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
            className="flex w-full flex-col gap-y-4 px-8"
          >
            {/* Form fields for email, name, and password */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="username@email.com"
                      {...field}
                    />
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
                    <Input
                      disabled={isLoading}
                      placeholder="john doe"
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit button */}
            <Button
              disabled={isLoading}
              variant={`destructive`}
              className="mt-4 w-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
        <DialogFooter className="mb-4 w-full px-8">
          <div className="flex w-full flex-col">
            <Button
              disabled={isLoading}
              variant={"link"}
              onClick={() => {
                onClose();
                onOpen("login");
              }}
              size={"sm"}
            >
              Log in with existing account or socials.
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
