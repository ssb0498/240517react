import { z } from "zod"

import Data from "@/src/components/tasks/data/tasks.json"
import { columns } from "@/src/components/tasks/components/columns"
import { DataTable } from "@/src/components/tasks/components/data-table"
import { UserNav } from "@/src/components/tasks/components/user-nav"
import { taskSchema } from "@/src/components/tasks/data/schema"
import {Link} from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"

// Simulate a database read for tasks.
function getTasks() {    
  const tasks = Data

  return z.array(taskSchema).parse(tasks)
}

export default function Table() {
  const tasks = getTasks()

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Board</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Table</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { columns } from '@/src/components/tasks/components/columns';
// import { DataTable } from '@/src/components/tasks/components/data-table';
// import { UserNav } from '@/src/components/tasks/components/user-nav';

// const fetchTasks = async () => {
//   const response = await axios.get('/api/tasks');
//   return response.data;
// };

// const Table = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const getTasks = async () => {
//       const tasksData = await fetchTasks();
//       setTasks(tasksData);
//     };

//     getTasks();
//   }, []);

//   return (
//     <>
//       <div className="md:hidden">
//         <img
//           src="/examples/tasks-light.png"
//           alt="Playground"
//           className="block dark:hidden"
//         />
//         <img
//           src="/examples/tasks-dark.png"
//           alt="Playground"
//           className="hidden dark:block"
//         />
//       </div>
//       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//             <p className="text-muted-foreground">
//               Here&apos;s a list of your tasks for this month!
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UserNav />
//           </div>
//         </div>
//         <DataTable data={tasks} columns={columns} />
//       </div>
//     </>
//   );
// };

// export default Table;