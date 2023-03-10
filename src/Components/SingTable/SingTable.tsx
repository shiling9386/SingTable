import { useCallback, useMemo, useState } from "react";
import { BasicRowModel, SortBy, SortByColumn, SingTableProps } from "./Types";
import { produce } from "immer";
import styles from "./SingTable.module.scss";
import CheckBox from "../Elements/CheckBox";
import RadioButton from "../Elements/RadioButton";
import { useIsMobile } from "../Hooks/useIsMobile";

export const SingTable = <T extends BasicRowModel>(props: SingTableProps<T>) => {
  const { data, columnDefs, selectionMode, onSelectionChanged, darkMode = false } = props;
  const [sortColumn, setSortColumn] = useState<SortByColumn>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const isMobile = useIsMobile();

  const handleSort = useCallback((columnKey: string) => {
    setSortColumn((currentSortCol) => {
      let sortBy: SortBy = "asc";
      if (currentSortCol?.field === columnKey) {
        if (currentSortCol.sortBy === "asc") {
          sortBy = "desc";
        } else {
          return null;
        }
      }
      return {
        field: columnKey,
        sortBy,
      };
    });
  }, []);

  const handleRowSelection = useCallback(
    (rowData: T, isMultiSelect: boolean) => {
      let updatedSelectedRows: T[] = [];
      if (isMultiSelect) {
        if (selectedRows.find((x) => x.id === rowData.id)) {
          updatedSelectedRows = selectedRows.filter((row) => row.id !== rowData.id);
        } else {
          updatedSelectedRows = [...selectedRows, rowData];
        }
      } else {
        updatedSelectedRows = selectedRows[0]?.id === rowData.id ? [] : [rowData];
      }
      const deepCopy = produce(updatedSelectedRows, () => {});
      setSelectedRows(deepCopy);
      if (onSelectionChanged) {
        onSelectionChanged(deepCopy);
      }
    },
    [selectedRows, onSelectionChanged]
  );

  const sortedData: T[] = useMemo(() => {
    return !!sortColumn
      ? data.slice().sort((a, b) => {
          const valueA = a[sortColumn.field];
          const valueB = b[sortColumn.field];
          if (valueA === valueB) {
            return 0;
          }
          const direction = sortColumn.sortBy === "asc" ? -1 : 1;
          return valueA < valueB ? direction : -direction;
        })
      : data;
  }, [data, sortColumn]);

  if (isMobile && columnDefs.length > 3) {
    return (
      <div className={darkMode ? styles.listViewDark : styles.listView}>
        {sortedData.map((rowData) => {
          const selected = !!selectedRows.find((s) => s.id === rowData.id);
          return (
            <div className={selected ? styles.listItemSelected : styles.listItem} key={rowData.id}>
              {!!selectionMode && (
                <div className={styles.checkBox}>
                  {selectionMode === "multi" ? (
                    <CheckBox
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, true)}
                    />
                  ) : (
                    <RadioButton
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, false)}
                    />
                  )}
                </div>
              )}
              <div className={styles.itemContent}>
                {columnDefs.map((colDef) => (
                  <div className={styles.itemKeyValue}>
                    <div>{colDef.label}:</div>
                    <div>{rowData[colDef.key]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <table className={darkMode ? styles.tableDark : styles.table}>
      <thead>
        <tr>
          {!!selectionMode && <th>Selected: {selectedRows.length}</th>}
          {columnDefs.map((colDef) => (
            <th key={colDef.key}>
              <div onClick={() => handleSort(colDef.key)} className={styles.header}>
                {colDef.label}{" "}
                <div className={styles.headerButton}>
                  {!!sortColumn &&
                    sortColumn.field === colDef.key &&
                    (sortColumn.sortBy === "asc" ? <span>&#42780;</span> : <span>&#42779;</span>)}
                </div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((rowData) => {
          const selected = !!selectedRows.find((s) => s.id === rowData.id);
          return (
            <tr key={rowData.id} className={selected ? styles.selectedRow : undefined}>
              {!!selectionMode && (
                <td>
                  {selectionMode === "multi" ? (
                    <CheckBox
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, true)}
                    />
                  ) : (
                    <RadioButton
                      checked={selected}
                      onSelect={() => handleRowSelection(rowData, false)}
                    />
                  )}
                </td>
              )}
              {columnDefs.map((colDef) => (
                <td key={colDef.key}>
                  {colDef.cellRenderer
                    ? colDef.cellRenderer({
                        data: rowData,
                        field: colDef.key,
                      })
                    : rowData[colDef.key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
