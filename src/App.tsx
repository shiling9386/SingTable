import { SingTable } from "./Components/SingTable/SingTable";
import { Switch } from "./Components/Elements/Switch";
import { useState } from "react";
import { SalaryCellRenderer } from "./Components/CellRenderers/SalaryCellRenderer";

interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  salary: number;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "John Smith",
    jobTitle: "Software Engineer",
    department: "Engineering",
    salary: 100000,
  },
  {
    id: 2,
    name: "Jane Doe",
    jobTitle: "Marketing Manager",
    department: "Marketing",
    salary: 90000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    jobTitle: "Sales Representative",
    department: "Sales",
    salary: 80000,
  },
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div>
      <h1>Table</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>Dark Mode</span>
        <Switch checked={isDarkMode} onToggle={() => setIsDarkMode((x) => !x)} />
      </div>
      <SingTable<Employee>
        data={mockEmployees}
        darkMode={isDarkMode}
        selectionMode="multi"
        onSelectionChanged={(x) => {
          console.table(x);
        }}
        columnDefs={[
          { key: "name", label: "Name" },
          { key: "jobTitle", label: "Job Title" },
          { key: "department", label: "Department" },
          { key: "salary", label: "Salary", cellRenderer: SalaryCellRenderer },
        ]}
      />
    </div>
  );
};

export default App;
