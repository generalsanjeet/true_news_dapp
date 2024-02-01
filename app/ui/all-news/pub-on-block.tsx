import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
export default function PubOnBlock({ published_on_blockchain}: {published_on_blockchain : string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': published_on_blockchain === 'no',
          'bg-green-500 text-white': published_on_blockchain === 'yes',
        },
      )}
    >
      {published_on_blockchain === 'no' ? (
        <>
          No 
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {published_on_blockchain === 'yes' ? (
        <>
          Yes
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
