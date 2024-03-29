'use client';

import React from 'react';
import { useModal } from '@/hooks/use-modal-store';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';

type Props = {};

const LoginModal = ({}: Props) => {
  const { isOpen, onClose, type, onOpen } = useModal();
  const router = useRouter();

  const isModalOpen = type === 'login' && isOpen;

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      if (callback?.ok) {
        toast.success('Welcome to Airbnb');
        router.refresh();
        router.back();
        onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-360px flex max-h-[1/4] w-[400px] flex-col items-center justify-center gap-y-4 px-4 pb-2">
        <div className="flex flex-col items-center justify-center">
          <DialogHeader>
            <Image
              alt="logo"
              className="hidden h-auto w-auto cursor-pointer md:block"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
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
            <Button
              disabled={isLoading}
              variant={`destructive`}
              className="mt-4 w-full"
              type="submit"
            >
              Log In
            </Button>
          </form>
        </Form>
        <DialogFooter className="my-4 w-full px-8">
          <div className="flex w-full flex-col">
            <div className="mb-4 flex w-full gap-x-4">
              <Button
                disabled={isLoading}
                className="flex w-full items-center justify-center"
                onClick={() => signIn('google')}
              >
                <FcGoogle size={18} />
                <p className="m-auto">Google</p>
              </Button>
              <Button
                disabled={isLoading}
                className="flex w-full items-center justify-center"
                onClick={() => signIn('github')}
              >
                <AiFillGithub size={18} />
                <p className="m-auto">Github</p>
              </Button>
            </div>
            <Button
              disabled={isLoading}
              variant={'link'}
              onClick={() => {
                onClose();
                onOpen('register');
              }}
              size={'sm'}
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
