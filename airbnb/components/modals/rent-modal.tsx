'use client';

import React, { useState } from 'react';
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
import CategoryInput from '../category-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  category: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathRoomCount: z.number(),
  price: z.number(),
});

type FormKeys =
  | 'category'
  | 'title'
  | 'description'
  | 'location'
  | 'imageUrl'
  | 'guestCount'
  | 'roomCount'
  | 'bathRoomCount'
  | 'price';

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
      location: '',
      imageUrl: '',
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      price: 0,
    },
  });

  const formCategory = form.watch('category');

  console.log(typeof formSchema);

  const setCustomValue = (id: FormKeys, value: any) => {
    form.setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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
        <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              Which of these best describe your place?
            </h1>
            <DialogDescription>Pick a category</DialogDescription>
          </div>
          <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.label} className="col-span-1">
                <CategoryInput
                  onClick={(formCategory) =>
                    setCustomValue('category', formCategory)
                  }
                  description={category.description}
                  selected={formCategory === category.label}
                  icon={category.icon}
                  label={category.label}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="flex w-full items-center gap-2">
          {step !== STEPS.CATEGORY && (
            <Button variant={'outline'} className="w-1/4" onClick={onBack}>
              Back
            </Button>
          )}
          <Button
            variant={'destructive'}
            className="w-1/4"
            onClick={step < STEPS.PRICE ? onNext : () => {}}
          >
            {step === STEPS.PRICE ? 'Create' : 'Next'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal;