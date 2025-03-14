'use client';

const stats = [
  { id: 1, name: 'Employees', value: '4' },
  { id: 2, name: 'Departments', value: '5' },
  { id: 3, name: 'Managers', value: '' },
  { id: 4, name: 'Paid out to creators', value: '' },
];

export default function HomePage() {
  return (
    <div className=' py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='text-center'>
            <h2 className='text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
              Welcome to Employee HUB
            </h2>
            <p className='mt-4 text-lg/8 text-gray-600'>
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p>
          </div>
          <dl className='bg-gray-900 mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.id} className='flex flex-col bg-white/5 p-8'>
                <dt className='text-sm/6 font-semibold text-gray-300'>
                  {stat.name}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-white'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
