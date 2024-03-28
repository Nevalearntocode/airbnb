'use client';

import React, { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
} from '../ui/form';
import { cn } from '@/lib/utils';
import Counter from '../rent/counter';
import ImageUpload from '../rent/image-upload';

const locationSchema = z.object({
  flag: z.string(),
  label: z.string(),
  latlng: z.array(z.number()),
  region: z.string(),
  value: z.string(),
});

export type LocationType = z.infer<typeof locationSchema>;

const formSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  location: locationSchema,
  imageUrl: z.string(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathRoomCount: z.number(),
  price: z.number(),
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

const RentModal = ({}: Props) => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = type === 'rent' && isOpen;

  const [step, setStep] = useState(STEPS.CATEGORY);

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

  const Map = useMemo(
    () =>
      dynamic(() => import('../map'), {
        ssr: false,
      }),
    [form.getFieldState('location')],
  );

  const onSubmit = async (data: formType) => {
    console.log(data);
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
                    <FormLabel>
                      Which of these best describe your place?
                    </FormLabel>
                    <FormDescription>Pick a category.</FormDescription>
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
                  <FormItem className="h-[407px]">
                    <FormLabel>Where is your place located?</FormLabel>
                    <FormDescription>Help guests find you!</FormDescription>
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
              <div className="flex h-[407px] flex-col gap-y-10">
                <FormField
                  control={form.control}
                  name="guestCount"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Share some basics about your place.</FormLabel>
                      <FormDescription>
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
                  <FormItem className="h-[407px]">
                    <FormLabel>Add a photo of your place.</FormLabel>
                    <FormDescription>
                      Show guests what your place look like!
                    </FormDescription>
                    <div className="h-full w-full pt-4">
                      <ImageUpload
                        onChange={field.onChange}
                        value={field.value}
                        endpoint="yourHomeImage"
                      />
                    </div>
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-2">
              <div className="flex w-full items-center gap-4">
                {step !== STEPS.CATEGORY ? (
                  <Button
                    variant={'outline'}
                    className="w-2/4"
                    onClick={(e) => {
                      e.preventDefault();
                      onBack();
                    }}
                  >
                    Back
                  </Button>
                ) : (
                  <div className="w-2/4" />
                )}
                <Button
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
                  {step === STEPS.PRICE ? 'Create' : 'Next'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;
