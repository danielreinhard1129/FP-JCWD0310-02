// 'use client';
// import Link from 'next/link';

// import { type NavItem } from '@/components/dashboard/constants/SideNavItems';
// import { usePathname } from 'next/navigation';
// import { cn } from '@/lib/utils';
// import { useSidebar } from '@/hooks/useSidebar';
// import { buttonVariants } from '@/components/ui/button';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/dashboard/SubNavAccordion';
// import { useEffect, useState } from 'react';
// import { ChevronDownIcon } from '@radix-ui/react-icons';

// interface SideNavProps {
//   items: NavItem[];
//   setOpen?: (open: boolean) => void;
//   className?: string;
// }

// export function SideNav({ items, setOpen, className }: SideNavProps) {
//   const path = usePathname();
//   const { isOpen } = useSidebar();
//   const [openItem, setOpenItem] = useState('');
//   const [lastOpenItem, setLastOpenItem] = useState('');

//   useEffect(() => {
//     if (isOpen) {
//       setOpenItem(lastOpenItem);
//     } else {
//       setLastOpenItem(openItem);
//       setOpenItem('');
//     }
//     console.log('open', isOpen);
//     console.log('lastOpenItem', lastOpenItem);
//     console.log('openItem', openItem);
//   }, [isOpen, lastOpenItem, openItem]);

//   return (
//     <nav className="space-y-2 max-h-screen h-auto overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
//       <div className="h-[calc(100vh-80px)]">
//         {items.map((item) =>
//           item.isChidren ? (
//             <Accordion
//               type="single"
//               collapsible
//               className="space-y-2"
//               key={item.title}
//               value={openItem}
//               onValueChange={setOpenItem}
//             >
//               <AccordionItem value={item.title} className="border-none ">
//                 <AccordionTrigger
//                   className={cn(
//                     buttonVariants({ variant: 'ghost' }),
//                     'group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline',
//                   )}
//                 >
//                   <div>
//                     <item.icon className={cn('h-5 w-5', item.color)} />
//                   </div>
//                   <div
//                     className={cn(
//                       'absolute left-12 text-base duration-200 ',
//                       !isOpen && className,
//                     )}
//                   >
//                     {item.title}
//                   </div>
//                   {isOpen && (
//                     <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
//                   )}
//                 </AccordionTrigger>
//                 <AccordionContent className="mt-2 md:ml-8 ml-4 space-y-4 pb-1">
//                   {item.children?.map((child) => (
//                     <Link
//                       key={child.title}
//                       href={child.href}
//                       onClick={() => {
//                         if (setOpen) setOpen(false);
//                       }}
//                       className={cn(
//                         buttonVariants({ variant: 'ghost' }),
//                         'group relative flex h-12 justify-start gap-x-3',
//                         path === child.href && 'font-bold hover:bg-muted',
//                       )}
//                     >
//                       <child.icon className={cn('h-5 w-5', child.color)} />
//                       <div
//                         className={cn(
//                           'absolute left-12 text-base duration-200',
//                           !isOpen && className,
//                         )}
//                       >
//                         {child.title}
//                       </div>
//                     </Link>
//                   ))}
//                 </AccordionContent>
//               </AccordionItem>
//             </Accordion>
//           ) : (
//             <Link
//               key={item.title}
//               href={item.href}
//               onClick={() => {
//                 if (setOpen) setOpen(false);
//               }}
//               className={cn(
//                 buttonVariants({ variant: 'ghost' }),
//                 'group relative flex h-12 justify-start',
//                 path === item.href && 'hover:bg-muted',
//               )}
//             >
//               <item.icon className={cn('h-5 w-5', item.color)} />
//               <span
//                 className={cn(
//                   'absolute left-12 text-base duration-200',
//                   !isOpen && className,
//                 )}
//               >
//                 {item.title}
//               </span>
//             </Link>
//           ),
//         )}
//       </div>
//     </nav>
//   );
// }
'use client';
import Link from 'next/link';

import { type NavItem } from '@/components/dashboard/constants/SideNavItems';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { buttonVariants } from '@/components/ui/button';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/dashboard/SubNavAccordion';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState('');
  const [lastOpenItem, setLastOpenItem] = useState('');

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem('');
    }
  }, [isOpen]);

  return (
    <>
      {items.map((item) =>
        item.isChidren ? (
          <Accordion
            type="single"
            collapsible
            className=""
            key={item.title}
            value={openItem}
            onValueChange={setOpenItem}
          >
            <AccordionItem value={item.title} className="border-none">
              <AccordionTrigger
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'relative flex h-12 justify-between px-7 py-2 text-base duration-200 hover:bg-muted hover:no-underline',
                )}
              >
                <div>
                  <item.icon className={cn('h-5 w-5', item.color)} />
                </div>
                <div
                  className={cn(
                    'absolute left-14 text-base duration-200 ',
                    !isOpen && className,
                  )}
                >
                  {item.title}
                </div>
                {isOpen && (
                  <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                )}
              </AccordionTrigger>
              <AccordionContent className="mt-2 pb-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.title}
                    href={child.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'group relative ml-4 flex h-12 justify-start gap-x-3',
                      path === child.href &&
                        'bg-muted font-bold hover:bg-muted',
                    )}
                  >
                    <child.icon className={cn('h-5 w-5', child.color)} />
                    <div
                      className={cn(
                        'absolute left-14 text-base duration-200 ',
                        !isOpen && className,
                      )}
                    >
                      {child.title}
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <Link
            key={item.title}
            href={item.href}
            onClick={() => {
              if (setOpen) setOpen(false);
            }}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'group relative flex h-12 px-7 justify-start',
              path === item.href && 'bg-muted font-bold hover:bg-muted',
            )}
          >
            <item.icon className={cn('h-5 w-5', item.color)} />
            <div
              className={cn(
                'absolute left-14 text-base duration-200 ',
                !isOpen && className,
              )}
            >
              {item.title}
            </div>
          </Link>
        ),
      )}
    </>
  );
}
