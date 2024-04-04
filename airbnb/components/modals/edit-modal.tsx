'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { categories } from '@/constants';
import CategoryInput from '../rent/category-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CountrySelect from '../rent/country-select';
import dynamic from 'next/dynamic';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { cn } from '@/lib/utils';
import Counter from '../rent/counter';
import ImageUpload from '../rent/image-upload';
import { Input } from '../ui/input';
import { DollarSign } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Listing } from '@prisma/client';
import useCountries from '@/hooks/use-country';

const locationSchema = z.object({
  flag: z.string().min(1, { message: 'Flag field is required.' }),
  label: z.string().min(1, { message: 'Location label is required.' }),
  latlng: z
    .array(z.number())
    .min(1, { message: 'Latitude and longitude are required.' }),
  region: z.string().min(1, { message: 'Region field is required.' }),
  value: z.string().min(1, { message: 'Location value is required.' }),
});

export type LocationType = z.infer<typeof locationSchema>;

const formSchema = z.object({
  category: z
    .string()
    .min(1, { message: 'Please select a category for your listing.' }),
  title: z.string().min(1, { message: 'Give your listing a catchy title.' }),
  description: z
    .string()
    .min(1, { message: 'Describe your listing in detail.' }),
  location: locationSchema,
  imageUrl: z
    .string()
    .min(1, { message: 'Add an image URL to showcase your listing.' }),
  guestCount: z
    .number()
    .positive({ message: 'Guest count must be a positive number.' }),
  roomCount: z
    .number()
    .positive({ message: 'Room count must be a positive number.' }),
  bathRoomCount: z
    .number()
    .positive({ message: 'Bathroom count must be a positive number.' }),
  price: z
    .number()
    .positive({ message: 'Enter a positive price for your listing.' }),
});

type Props = {};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type formType = z.infer<typeof formSchema>;

// Add your form fields and logic here

const EditModal = ({}: Props) => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const isModalOpen = type === 'edit' && isOpen;
  const { getByValue } = useCountries();

  const { listing } = data as {
    listing: Listing;
  };

  let location: LocationType | undefined;

  if (listing) {
    location = getByValue(listing.locationValue);
  }

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      title: '',
      description: '',
      location: {
        flag: '',
        label: '',
        latlng: [51, -0.09],
        region: '',
        value: '',
      },
      imageUrl: '',
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      price: 0,
    },
  });

  useEffect(() => {
    if (listing) {
      form.setValue('category', listing.category);
      form.setValue('title', listing.title);
      form.setValue('description', listing.description);
      form.setValue('imageUrl', listing.imageUrl);
      form.setValue('guestCount', listing.guestCount);
      form.setValue('roomCount', listing.roomCount);
      form.setValue('bathRoomCount', listing.bathRoomCount);
      form.setValue('price', listing.price);
      form.setValue('location', location!);
    }
  }, [listing]);

  const isLoading = form.formState.isSubmitting;

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const Map = useMemo(
    () =>
      dynamic(() => import('../map'), {
        ssr: false,
      }),
    [form.getFieldState('location')],
  );

  const onSubmit = async (data: formType) => {
    try {
      await axios.patch(`/api/listings/${listing.slug}`, data);
      toast.success('Property updated');
      router.refresh();
      onClose();
      setStep(STEPS.CATEGORY);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader className="flex items-center justify-center">
          <DialogTitle>Airbnb your home</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* category form */}
            {step === STEPS.CATEGORY && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-2xl font-bold">
                      Which of these best describe your place?
                    </FormLabel>
                    <FormDescription className="text-sm italic">
                      Pick a category.
                    </FormDescription>
                    <FormControl>
                      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
                        {categories.map((category) => (
                          <div key={category.label} className="col-span-1">
                            <CategoryInput
                              onClick={(formCategory) => {
                                if (formCategory === field.value) {
                                  field.onChange('');
                                } else field.onChange(formCategory);
                              }}
                              description={category.description}
                              selected={field.value === category.label}
                              icon={category.icon}
                              label={category.label}
                            />
                          </div>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {/* location form */}
            {step === STEPS.LOCATION && (
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="h-[409px]">
                    <FormLabel className="text-2xl font-bold">
                      Where is your place located?
                    </FormLabel>
                    <FormDescription className="text-sm italic">
                      Help guests find you!
                    </FormDescription>
                    <div className="flex flex-col gap-y-4">
                      <CountrySelect
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <Map
                        center={field.value ? field.value.latlng : [51, -0.09]}
                      />
                    </div>
                  </FormItem>
                )}
              />
            )}
            {/* info form */}
            {step === STEPS.INFO && (
              <div className="flex h-[409px] flex-col gap-y-10">
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-2xl font-bold">
                        Share some basics about your place.
                      </FormLabel>
                      <FormDescription className="text-sm italic">
                        What amenities do you have?
                      </FormDescription>
                      <Counter
                        onChange={field.onChange}
                        title="Guests"
                        subtitle="Let us know how many people you're planning for."
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="roomCount"
                  render={({ field }) => (
                    <FormItem className="">
                      <Counter
                        onChange={field.onChange}
                        title="Bedrooms"
                        subtitle="How many bedrooms do you have?"
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
                <Separator />
                <FormField
                  control={form.control}
                  name="bathRoomCount"
                  render={({ field }) => (
                    <FormItem className="">
                      <Counter
                        onChange={field.onChange}
                        title="Bathrooms"
                        subtitle="Choose the number of bathrooms for your place."
                        value={field.value}
                      />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {/* images form */}
            {step === STEPS.IMAGES && (
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="h-[409px]">
                    <FormLabel className="text-2xl font-bold">
                      Add a photo of your place.
                    </FormLabel>
                    <FormDescription className="text-sm italic">
                      Show guests what your place looks like!
                    </FormDescription>
                    <div className="h-full w-full pt-4">
                      <ImageUpload
                        onChange={field.onChange}
                        value={field.value}
                        endpoint="yourHomeImage"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
            {/* description form */}
            {step === STEPS.DESCRIPTION && (
              <div className="mb-8 flex flex-col gap-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="">
                        <FormLabel className="text-2xl font-bold">
                          How would you describe your place?
                        </FormLabel>
                        <FormDescription className="text-sm italic">
                          Short and sweet works best!
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Title"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <Input
                          placeholder="Description"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {/* price form */}
            {step === STEPS.PRICE && (
              <div className="mb-8">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-y-4">
                      <div>
                        <FormLabel>Now, set your price.</FormLabel>
                        <FormDescription>
                          How much do you charge per night?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <div className="relative flex w-auto items-center">
                          <Input
                            {...field}
                            className="p-6"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                          <DollarSign className="absolute left-1 h-4 w-4 opacity-75" />
                        </div>
                      </FormControl>
                      {hasErrors && (
                        <p className="text-rose-500 dark:text-rose-900">
                          Please fill all {field.value ? 'previous' : 'the'}
                          fields before submiting.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            )}
            <DialogFooter className="mt-2">
              <div className="flex w-full items-center gap-4">
                <Button
                  variant={'outline'}
                  className="w-2/4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (step === STEPS.CATEGORY) {
                      onClose();
                    } else {
                      onBack();
                    }
                  }}
                >
                  Back
                </Button>
                <Button
                  disabled={hasErrors && step === STEPS.PRICE}
                  variant={'destructive'}
                  className={cn(
                    'ml-auto w-2/4',
                    step === STEPS.CATEGORY && 'p-0',
                  )}
                  onClick={
                    step < STEPS.PRICE
                      ? (e) => {
                          e.preventDefault();
                          onNext();
                        }
                      : () => {}
                  }
                >
                  {step === STEPS.PRICE ? 'Confirm' : 'Next'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
