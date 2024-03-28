{
  /* <div className="flex flex-col justify-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">
              {step === STEPS.CATEGORY &&
                'Which of these best describe your place?'}
              {step === STEPS.LOCATION && 'Where is your place located?'}
            </h1>
            <DialogDescription>
              {step === STEPS.CATEGORY && 'Pick a category'}
              {step === STEPS.LOCATION && 'Help guests find you!'}
            </DialogDescription>
          </div>
          {step === STEPS.CATEGORY && (
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
          )}
          {step === STEPS.LOCATION && (
            <div>
              <CountrySelect
                onChange={(value) => setCustomValue('location', value)}
                value={formLocation}
              />
              <Map center={formLocation.latlng} />
            </div>
          )}
        </div> */
}
