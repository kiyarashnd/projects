'use client';

import { CaretDownIcon } from '@radix-ui/react-icons';
import { Button, DropdownMenu, Flex, Heading, Link } from '@radix-ui/themes';

import { changeLanguage } from '@/utils/changeLanguage';
import { FormattedMessage } from 'react-intl';

const Navbar = () => {
  return (
    <Flex width='auto' justify='between' className='bg-[#ecf39e] py-5'>
      <Flex
        gap={{
          initial: '2',
          xs: '2',
          sm: '3',
          md: '4',
          lg: '5',
        }}
        align='center'
      >
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className='!ms-5 !bg-[#132a13]'>
            <Button variant='solid'>
              <FormattedMessage
                defaultMessage={'Options'}
                id='Navbar.options'
              />
              <CaretDownIcon width='12' height='12' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content variant='solid'>
            <DropdownMenu.Item
              className='hover:!bg-[#132a13]'
              onClick={() => changeLanguage('ltr')}
            >
              English
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className='hover:!bg-[#132a13]'
              onClick={() => changeLanguage('rtl')}
            >
              فارسی
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Flex>

      {/* <Heading
        size={{
          initial: '2',
          xs: '2',
          sm: '3',
          md: '4',
          lg: '5',
        }}
      >
        AnacletoLAB
      </Heading> */}

      <Flex
        gap={{
          initial: '2',
          xs: '2',
          sm: '3',
          md: '4',
          lg: '5',
        }}
        className='!me-7 sm:ms-0 ms-4'
      >
        <Link
          href='\'
          className='hover:!text-white hover:transition-all duration-1000 !text-[#132a13] border-b-2 border-black hover:border-white'
          size={{
            initial: '2',
            xs: '2',
            sm: '3',
            md: '4',
            lg: '5',
          }}
        >
          <FormattedMessage defaultMessage={'Home'} id='Navbar.Home' />
        </Link>
        <Link
          href='\project'
          className='hover:!text-white hover:transition-all duration-1000 !text-[#132a13] border-b-2 border-black hover:border-white'
          size={{
            initial: '2',
            xs: '2',
            sm: '3',
            md: '4',
            lg: '5',
          }}
        >
          <FormattedMessage defaultMessage={'Projects'} id='Navbar.Projects' />
        </Link>
        <Link
          href='\people'
          className='hover:!text-white hover:transition-all duration-1000 !text-[#132a13] border-b-2 border-black hover:border-white'
          size={{
            initial: '2',
            xs: '2',
            sm: '3',
            md: '4',
            lg: '5',
          }}
        >
          <FormattedMessage defaultMessage={'People'} id='Navbar.People' />
        </Link>
        <Link
          href='\research'
          className='hover:!text-white hover:transition-all duration-1000 !text-[#132a13] border-b-2 border-black hover:border-white'
          size={{
            initial: '2',
            xs: '2',
            sm: '3',
            md: '4',
            lg: '5',
          }}
        >
          <FormattedMessage defaultMessage={'Research'} id='Navbar.Research' />
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
