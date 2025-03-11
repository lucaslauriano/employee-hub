import Button from '@/components/Button';
import Page from '@/components/Page';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
//import Avatar from '@/components/Avatar';

export default function EmployeeForm({ id }: { id?: string }) {
  const hasId = id !== undefined;

  return (
    <Page>
      <form>
        <div className='border-b border-white/10 pb-12'>
          <h2 className='text-base/7 font-semibold text-white'>
            {hasId ? 'Edit' : 'Add'} Employee
          </h2>
        </div>

        <div className='border-b border-white/10 pb-12'>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm/6 font-medium text-white'
              >
                First name
              </label>
              <div className='mt-2'>
                <input
                  id='first-name'
                  name='first-name'
                  type='text'
                  autoComplete='given-name'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='last-name'
                className='block text-sm/6 font-medium text-white'
              >
                Last name
              </label>
              <div className='mt-2'>
                <input
                  id='last-name'
                  name='last-name'
                  type='text'
                  autoComplete='family-name'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-white'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-white'
              >
                Phone
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='country'
                className='block text-sm/6 font-medium text-white'
              >
                Country
              </label>
              <div className='mt-2 grid grid-cols-1'>
                <select
                  id='country'
                  name='country'
                  autoComplete='country-name'
                  className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/5 py-1.5 pl-3 pr-8 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
                <ChevronDownIcon
                  aria-hidden='true'
                  className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='region'
                className='block text-sm/6 font-medium text-white'
              >
                State / Province
              </label>
              <div className='mt-2'>
                <input
                  id='region'
                  name='region'
                  type='text'
                  autoComplete='address-level1'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='city'
                className='block text-sm/6 font-medium text-white'
              >
                City
              </label>
              <div className='mt-2'>
                <input
                  id='city'
                  name='city'
                  type='text'
                  autoComplete='address-level2'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='col-span-4'>
              <label
                htmlFor='street-address'
                className='block text-sm/6 font-medium text-white'
              >
                Street address
              </label>
              <div className='mt-2'>
                <input
                  id='street-address'
                  name='street-address'
                  type='text'
                  autoComplete='street-address'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>

            <div className='sm:col-span-2'>
              <label
                htmlFor='postal-code'
                className='block text-sm/6 font-medium text-white'
              >
                ZIP / Postal code
              </label>
              <div className='mt-2'>
                <input
                  id='postal-code'
                  name='postal-code'
                  type='text'
                  autoComplete='postal-code'
                  className='block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <Button
            appearance='outlined'
            className='text-sm/6 font-semibold text-white'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
          >
            Save
          </Button>
        </div>
      </form>
    </Page>
  );
}
