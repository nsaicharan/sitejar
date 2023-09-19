import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CategoriesListbox({
  existingCategories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <div className="w-[150px] md:w-[180px]">
          <div className="relative">
            <div>
              <Listbox.Label className="block text-xs mb-2">
                Category
              </Listbox.Label>
              <Listbox.Button className="relative w-full cursor-default text-sm md:text-base text-left shadow rounded-md bg-white py-2 pl-3 pr-10 border border-gray-300 focus:border-indigo-300 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <span className="block truncate">{selectedCategory}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </Listbox.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-xs md:text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Listbox.Option
                  className={({ active }) =>
                    classNames(
                      active && 'bg-indigo-600 text-white',
                      'relative cursor-default select-none py-2 pl-3.5 pr-9'
                    )
                  }
                  value="all"
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        all
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>

                {Object.keys(existingCategories).map((category) => (
                  <Listbox.Option
                    key={category}
                    className={({ active }) =>
                      classNames(
                        active && 'bg-indigo-600 text-white',
                        'relative cursor-default select-none py-2 pl-3.5 pr-9'
                      )
                    }
                    value={category}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {category}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
