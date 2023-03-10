import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SingTable } from "./SingTable";
import { ColumnDef } from "./Types";

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}
const employees: Employee[] = [
  {
    id: 1,
    name: "John Doe",
    department: "Engineering",
    salary: 100000,
  },
  {
    id: 2,
    name: "Jane Smith",
    department: "Marketing",
    salary: 80000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 4,
    name: "Alice Lee",
    department: "Engineering",
    salary: 120000,
  },
  {
    id: 5,
    name: "Tom Jackson",
    department: "HR",
    salary: 75000,
  },
];

const columnDefs: ColumnDef[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "department", label: "Department" },
  { key: "salary", label: "Salary" },
];

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "SingTable",
  component: SingTable,
  args: {
    data: employees,
    columnDefs,
  },
} as ComponentMeta<typeof SingTable<Employee>>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SingTable<Employee>> = (args) => (
  <SingTable<Employee> {...args} />
);

export const Default = Template.bind({});

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  selectionMode: "single",
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  selectionMode: "multi",
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  selectionMode: "multi",
  darkMode: true
};
