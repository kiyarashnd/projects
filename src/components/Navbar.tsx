'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Flex } from '@radix-ui/themes';

import { changeLanguage } from '@/utils/changeLanguage';

const Navbar = () => {
  return (
    <div className='flex justify-between bg-red-400 py-10'>
      <Flex gap='3' align='center'>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant='solid'>
              Options
              <CaretDownIcon width='12' height='12' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant='solid'>
            <DropdownMenu.Item onClick={() => changeLanguage('ltr')}>
              English
            </DropdownMenu.Item>
            <DropdownMenu.Item onClick={() => changeLanguage('rtl')}>
              فارسی
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>
    </div>
  );
};

export default Navbar;
