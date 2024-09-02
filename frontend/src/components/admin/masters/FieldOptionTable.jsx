import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import {
  addFieldOption,
  editFieldOption,
  removeFieldOption,
} from "@/features/formFieldSlice";
import { Pencil, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FieldOptionTable = () => {
  const dispatch = useDispatch();
  const [inputOption, setInputOption] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const { options } = useSelector((store) => store.formFields);

  const placeHolder =
    options.length === 0
      ? `One! At least one option, please!`
      : `Ok! We're good! Add another?`;

  const addOption = () => {
    if (!inputOption || inputOption.trim() === "") {
      toast({ description: `Enter an option` });
      return;
    }
    dispatch(addFieldOption(inputOption));
    setInputOption("");
  };

  const editOption = ({ option, index }) => {
    setEditMode(true);
    setInputOption(option);
    setEditIndex(index);
  };

  const resetOption = () => {
    setInputOption("");
    setEditMode(false);
    setEditIndex("");
  };

  const saveOption = () => {
    dispatch(editFieldOption({ index: editIndex, value: inputOption }));
    resetOption();
  };

  return (
    <>
      <div className="flex flex-row gap-3">
        <Input
          type="text"
          name="option"
          className="w-full"
          value={inputOption}
          onChange={(e) => setInputOption(e.target.value)}
          placeholder={placeHolder}
        />
        {editMode ? (
          <Button
            type="button"
            className="p-3 bg-blue-500 hover:bg-blue-400"
            onClick={saveOption}
          >
            Save
          </Button>
        ) : (
          <Button
            type="button"
            className="p-3 bg-blue-500 hover:bg-blue-400"
            onClick={addOption}
          >
            Add
          </Button>
        )}
        <Button
          type="button"
          variant="outline"
          className="p-3"
          onClick={resetOption}
        >
          Reset
        </Button>
      </div>
      <Table>
        <TableCaption className="capitalize"></TableCaption>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Sl. No.</TableHead>
            <TableHead>Option</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {options.length === 0 ? (
            <TableRow className="group">
              <TableCell colSpan={3} className="text-center">
                No option found
              </TableCell>
            </TableRow>
          ) : (
            options.map((option, index) => {
              return (
                <TableRow key={nanoid()} className="group">
                  <TableCell>{index + 1}.</TableCell>
                  <TableCell className="capitalize">{option}</TableCell>
                  <TableCell className="flex items-center">
                    <>
                      <Button type="button" variant="link" size="sm">
                        <Pencil
                          size={18}
                          className="text-green-500 group-hover:text-green-400"
                          onClick={() => editOption({ option, index })}
                        />
                      </Button>
                      <Button type="button" variant="link" size="sm">
                        <Trash2
                          size={18}
                          className="text-red-500 group-hover:text-red-400"
                          onClick={() => {
                            dispatch(removeFieldOption(option));
                          }}
                        />
                      </Button>
                    </>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
};
export default FieldOptionTable;
